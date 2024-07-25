import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/base/entites/abstract-entity';
import { TokenEntity } from './token.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  salt: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  googleId: string;

  @OneToMany(() => TokenEntity, (tokenEntity) => tokenEntity.userId)
  tokens: TokenEntity[];
}
