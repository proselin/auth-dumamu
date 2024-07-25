import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { EnvironmentName, Versions } from '@common/constant';

export class SwaggerConfig {
  static setupOpenApi(app: INestApplication) {
    const configService = app.get(ConfigService);
    const host = configService.get(EnvironmentName.SERVER_HOST);
    const port = +configService.get(EnvironmentName.SERVER_PORT);
    const prefix = configService.get('SERVER_API_DOCUMENT_PREFIX') ?? 'doc';
    const config = new DocumentBuilder()
      .setTitle('Authentication API Document')
      .setVersion(Versions.V1)
      .addTag('Authentication')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(prefix, app, document);
    Logger.log(
      `API document host at http://${host}:${port}/${prefix}`,
      SwaggerConfig.name
    );
  }
}
