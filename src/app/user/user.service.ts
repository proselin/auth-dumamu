import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO, UserResponseDto } from '@user/dto';
import * as bcrypt from 'bcryptjs';
import { BaseService } from '@common/base';
import { NullAble } from '@common/utils';


@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, new Logger(UserService.name));
  }

  public async getDetail(id: string) {
    try {
      return UserResponseDto.mapEntityToDTO(
        await this.repository.findOneByOrFail({ id })
      );
    } catch (e) {
      throw new NotFoundException(`Not found user with id: ${id}`);
    }
  }

  public async createNewUser(dto: CreateUserDTO): Promise<UserResponseDto> {
    //Check if user exists
    const existedUser = await this.userRepository.findOneBy({
      username: dto.username
    });

    if (existedUser) {
      throw new BadRequestException('User is exist in system !');
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = await bcrypt.hash(dto.password, salt);
    const newUser = this.userRepository.create({
      username: dto.username,
      password: passwordHashed,
      salt,
      name: dto.name
    });
    await this.userRepository.save(newUser);
    return UserResponseDto.mapEntityToDTO(newUser);
  }

  async validUserNameAndPassword(
    username: string,
    password: string
  ): Promise<NullAble<UserResponseDto>> {
    const user = await this.repository.findOneBy({ username });
    if (!user) return null;
    const protoPassword = await bcrypt.hash(password, user.salt);
    if (user && password === protoPassword) {
      return UserResponseDto.mapEntityToDTO(user);
    }
    return null;
  }

  findByUsername(username: string, email?: string) {
    return this.repository.findOneBy({ username, email });
  }
}
