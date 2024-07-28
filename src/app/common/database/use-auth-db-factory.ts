import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { TokenEntity, UserEntity } from '../../entities/';
import { EnvironmentName, NodeEnvironment } from '@common/constant';

export async function useAuthDbFactory(
  configService: ConfigService
): Promise<TypeOrmModuleOptions> {
  const logger = new Logger('AuthDBFactory');
  logger.log('Start connect to database');

  const isDevelopment = process.env.NODE_ENV == NodeEnvironment.development;

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get(EnvironmentName.POSTGRES_HOST),
    port: +configService.get(EnvironmentName.POSTGRES_PORT),
    database: configService.get(EnvironmentName.POSTGRES_DATABASE),
    username: configService.get(EnvironmentName.POSTGRES_USER),
    password: configService.get(EnvironmentName.POSTGRES_PASSWORD),
    entities: [UserEntity, TokenEntity],
    retryAttempts: 3,
    retryDelay: 2000,
    ssl: true,
    cache: true
  };

  if (isDevelopment) {
    return {
      ...config,
      dropSchema: true,
      synchronize: true,
      useUnifiedTopology: true,
      retryAttempts: 3,
      ssl: false,
      cache: false,
      logging: ['info', 'warn', 'error']
    } as TypeOrmModuleOptions;
  }
  return config;
}
