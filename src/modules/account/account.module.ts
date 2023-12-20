import { Module } from '@nestjs/common';
import { AccountRepository } from '@account/account.repository';
import { AccountService } from '@account/account.service';
import { AccountController } from '@account/account.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@account/auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: 'accountService',
      useClass: AccountService,
    },
    AccountService,
    AccountRepository,
    JwtStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXP_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AccountModule {}
