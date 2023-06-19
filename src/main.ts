import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors'
let port=process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors())

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(Object.values(errors[0].constraints)[0]),
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest project')
    .setDescription('The Nest Project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Swagger setup
  await app.listen(port);
}
bootstrap();
