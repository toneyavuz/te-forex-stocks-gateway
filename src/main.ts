// import * as csurf from 'csurf';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Stocks API')
    .setDescription(
      'The Stocks API is a simple calculator for foreign exchange market.',
    )
    .setVersion('1.0')
    .addTag('stocks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  // app.use(csurf());


  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
