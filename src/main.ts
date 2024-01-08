import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@config/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from '@util/filter/fliter.notFoundException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(port);
}
bootstrap();
