import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create-date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createDate!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'last-modified-date',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastModifiedDate!: Date;
}
