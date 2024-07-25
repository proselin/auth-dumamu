import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtFactory } from './jwt.factory.';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtFactory,
    }),
  ],
})
export class JwtConfigModule {}
