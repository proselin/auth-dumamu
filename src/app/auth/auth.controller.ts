import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { TokenResponseDto } from './dto/token-request.dto';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiBearerAuth()
  @ApiBody({
    type: () => SignInDto,
  })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() dto: CreateUserDTO) {
    return this.authService.signUp(dto);
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string
  ): Promise<TokenResponseDto> {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(@Request() req: Record<any, any>): Promise<void> {
    const userId = req.user.id;
    return this.authService.logout(userId);
  }
}
