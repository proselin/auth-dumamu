import { BaseEntity, DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { LoggerService } from '@nestjs/common';
import { IBaseService } from '@common/base';
import { EntityId } from 'typeorm/repository/EntityId';
import { NullAble } from '@common/utils';

export abstract class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T> {
  protected readonly repository: R;
  protected readonly logger?: LoggerService;

  constructor(repository: R, logger?: LoggerService) {
    this.repository = repository;
    this.logger = logger;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.find({
      where: ids.map((id) => ({ id } as any)) as FindOptionsWhere<T>
    });
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id) as Promise<T>;
  }

  findById(id: EntityId): Promise<NullAble<T>> {
    return this.repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      where: { id }
    });
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
