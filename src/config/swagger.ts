import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tracepulse')
  .setDescription('Tracepulse API description')
  .setVersion('0.1')
  .build();
