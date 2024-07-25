import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentName } from '@common/constant';
import { CreateUserDTO } from '@user/dto';
import { UserService } from '@user/user.service';
import { SignInDto, TokenResponseDto } from '@auth/dto';
import { JWTPayload, JwtPayloadCore, JWTPayloadType } from '@auth/types';
import { readFileSync } from 'fs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly privateKey = readFileSync(
    __dirname + '/assets/jwtRS256.key'
  );

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  async signUp(createUserDto: CreateUserDTO): Promise<unknown> {
    const newUser = await this.userService.createNewUser(createUserDto);
    const payload: JWTPayload = {
      userId: newUser.userId,
      sub: newUser.username,
      deviceId: '',
      fromSystem: ''
    };
    if (createUserDto.isReturnLoginToken) {
      return await this.getTokens(payload);
    }
    return null;
  }

  async getTokens(payloads: JWTPayload): Promise<{
    accessToken: string;
    accessTokenExp: number;
    refreshTokenExp: number;
    refreshToken: string;
  }> {
    const accessTokenExp = +this.configService.get(
      EnvironmentName.JWT_ACCESS_EXP
    );
    const refreshTokenExp = +this.configService.get(
      EnvironmentName.JWT_REFRESH_EXP
    );
    const accessTokenPayload: JwtPayloadCore = {
      ...payloads,
      type: JWTPayloadType.AccessToken
    };

    const refreshPayload: JwtPayloadCore = {
      ...payloads,
      type: JWTPayloadType.RefreshToken
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: accessTokenExp,
      algorithm: 'RS256',
      privateKey: this.privateKey
    });
    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: refreshTokenExp,
      algorithm: 'RS256',
      privateKey: this.privateKey
    });

    return {
      accessTokenExp,
      accessToken,
      refreshToken,
      refreshTokenExp
    };
  }

  public async signIn(dto: SignInDto) {
    const user = await this.userService.validUserNameAndPassword(
      dto.username,
      dto.password
    );
    if (!user) {
      throw new BadRequestException('Invalid username or password!');
    }
    return await this.getTokens({
      sub: user.username,
      userId: user.userId,
      deviceId: '',
      fromSystem: ''
    });
  }

  public async refresh(refreshToken: string): Promise<TokenResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayloadCore>(refreshToken, {
        algorithms: ['RS256']
      });

      if (payload.type !== JWTPayloadType.RefreshToken) {
        throw new BadRequestException('Invalid refresh token !');
      }

      if (payload) return this.getTokens(payload);
      throw new BadRequestException('Empty jwt payload!');
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.log('Refresh Token is expired ');
        throw new BadRequestException('Invalid refresh Token');
      }
      throw error;
    }
  }

  public async logout(...arg: any[]) {
    throw new Error('Method is not implement');
  }
}
