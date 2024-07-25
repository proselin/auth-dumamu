import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  // @IsStrongPassword()
  @ApiProperty({
    nullable: false,
    example: 'Qwerty123123123A@#',
    maxLength: 255,
    description: 'User password'
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    example: 'hungnq1872',
    maxLength: 255,
    description: 'User username'
  })
  username: string;

  @IsString()
  @ApiProperty({
    nullable: true,
    example: 'hung',
    maxLength: 255,
    description: 'Full name of user'
  })
  name: string;

  @ApiProperty({
    nullable: false,
    default: false,
    description: 'Check is return access_token or not'
  })
  @IsBoolean()
  isReturnLoginToken = false;
}
