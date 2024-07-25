import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';
import { NullAble } from '@common/utils';

export interface IBaseService<EntityType> {
  index(): Promise<EntityType[]>;

  findById(id: EntityId): Promise<NullAble<EntityType>>;

  findByIds(id: [EntityId]): Promise<EntityType[]>;

  store<DataType = any>(data: DataType): Promise<EntityType>;

  update<DataType = any>(id: EntityId, data: DataType): Promise<EntityType>;

  delete(id: EntityId): Promise<DeleteResult>;
}
