import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Stocks API')
    .setDescription(
      'The Stocks API is a simple calculator for foreign exchange market.',
    )
    .setVersion('1.0')
    .addTag('stocks')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swui', app, document);

  const service: ConfigService = app.get(ConfigService);
  const port = service.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
