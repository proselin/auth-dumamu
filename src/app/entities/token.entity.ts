import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractEntity } from '@common/base/entites';

@Entity('token')
export class TokenEntity extends AbstractEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    name: 'device_name'
  })
  deviceName: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'expired_at'
  })
  expiredAt: Date;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 12,
    comment: 'Ip config all'
  })
  ip: string;

  @Column({
    name: 'last_time_login',
    nullable: false,
    type: 'varchar',
    comment: 'Last time login on device'
  })
  lastTimeLogin: string;

  @Column({
    name: 'is_active',
    nullable: false,
    default: true,
    type: 'bool',
    comment: 'Using for engine revoke and remove token'
  })
  isRevoke: boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.tokens)
  userId: string;
}
