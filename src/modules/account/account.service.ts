import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@account/account.repository';
import { Account } from '@prisma/client';
import { comparePasswords } from '@util/bcrypt/bcrypt.compare';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const account = await this.accountRepository.findByEmail(email);
    await comparePasswords(password, account.hashedPassword);
    const payload = { sub: account.accountId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async updatePassword(
    accountId: string,
    newPassword: string,
  ): Promise<Account | null> {
    return await this.accountRepository.updatePassword(accountId, newPassword);
  }
}
