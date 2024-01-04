import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from '@account/account.repository';
import { Storage } from '@util/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'cookieJwt') {
  constructor(
    configService: ConfigService,
    private accountRepository: AccountRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      usernameField: 'email',
    });
  }

  async validate(payload: any) {
    await this.accountRepository.findById(payload.sub);
    return { accountId: payload.sub };
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (
      req.cookies &&
      Storage.accessToken in req.cookies &&
      req.cookies.accessToken.length > 0
    ) {
      return req.cookies.accessToken;
    }
    return null;
  }
}
