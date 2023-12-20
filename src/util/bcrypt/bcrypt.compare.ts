import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<void> => {
  const compare = await bcrypt.compare(plainPassword, hashedPassword);
  if (!compare) {
    throw new UnauthorizedException('Unauthorized');
  }
};
