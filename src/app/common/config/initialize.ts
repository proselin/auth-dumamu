import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Versions } from '@common/constant';
import { LoggingInterceptor, TimeoutInterceptor, TransformInterceptor } from '@common/intercept';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: Versions.V1
  });

  app.use(cookieParser());

  app.enableShutdownHooks();

  return app;
}
