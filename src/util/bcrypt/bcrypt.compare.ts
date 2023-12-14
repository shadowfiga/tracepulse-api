import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<void> => {
  await bcrypt.compare(plainPassword, hashedPassword).then(function (
    isValid: boolean,
  ) {
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials.');
    } else {
      return isValid;
    }
  });
};
