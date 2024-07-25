import { UserEntity } from '../../entities/user.entity';

export class UserResponseDto {
  name: string;
  username: string;
  userId: string;
  email?: string;
  googleId?: string;
  createDate: string;
  lastModifiedDate: string;

  static mapEntityToDTO(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.userId = entity.id;
    dto.email = entity.email;
    dto.name = entity.name;
    dto.username = entity.username;
    dto.googleId = entity.googleId;
    dto.createDate = entity.createDate.toISOString();
    dto.lastModifiedDate = entity.lastModifiedDate.toISOString();
    return dto;
  }
}
