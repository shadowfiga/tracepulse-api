import { Module } from '@nestjs/common';
import { AccountRepository } from '@account/account.repository';
import { AccountService } from '@account/account.service';
import { AccountController } from '@account/account.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@account/auth/local.strategy';
import configuration from 'config/configuration';
import { JwtStrategy } from '@account/auth/jwt.strategy';

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: 'accountService',
      useClass: AccountService,
    },
    AccountService,
    AccountRepository,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
      secret: configuration().jwtSecret,
      global: true,
    }),
  ],
})
export class AccountModule {}
