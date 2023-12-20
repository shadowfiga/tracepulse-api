import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AccountModule } from '@account/account.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/config';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({

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
