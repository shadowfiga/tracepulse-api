import { Account } from '@prisma/client';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<Account | null> {
    return this.prisma.account.findUniqueOrThrow({ where: { email } });
  }

  async updatePassword(
    accountId: string,
    newPassword: string,
  ): Promise<Account | null> {
    const existingAccount = await this.prisma.account.update({
      where: { account_id: accountId },
      data: { hashedPassword: newPassword },
    });

    if (!existingAccount) {
      throw new NotFoundException(`Account not found.`);
    }
    return existingAccount;
  }
}
