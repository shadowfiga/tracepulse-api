import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AccountModule } from '@account/account.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { PrismaModule } from '@modules/prisma/prisma.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TEST: Joi.string(),
        JWT_SECRET: Joi.string().required(),
        SERVER_PORT: Joi.number().default(3000),
        JWT_EXP_TIME: Joi.number().default(3600),
        DATABASE_URL: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    AccountModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
