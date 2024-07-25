import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { EnvironmentName } from './app/common/constant';
import { createApp, SwaggerConfig } from './app/common/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await createApp();
  const configService = app.get(ConfigService);
  const port = +configService.get(EnvironmentName.SERVER_PORT);
  const host = configService.get(EnvironmentName.SERVER_HOST);
  const prefix = configService.get(EnvironmentName.SERVER_PREFIX);
  SwaggerConfig.setupOpenApi(app);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://${host}:${port}/${prefix}`);
}

bootstrap().then();
