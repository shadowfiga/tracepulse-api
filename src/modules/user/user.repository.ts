import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  updatePassword(id: number, newPassword: string): Promise<User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async updatePassword(id: number, newPassword: string): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }
}
