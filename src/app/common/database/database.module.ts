import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { useAuthDbFactory } from './use-auth-db-factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: useAuthDbFactory,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
