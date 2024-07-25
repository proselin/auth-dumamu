import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user';
import { JwtConfigModule } from '@common/jwt-config/jwt-config.module';
import { envValidation } from '@common/utils';
import { Environment } from '@common/models/environment.model';
import { DatabaseModule } from '@common/database';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    JwtConfigModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => envValidation(Environment)
    }),
    DatabaseModule,
    AuthModule
  ]
})
export class AppModule {
}
