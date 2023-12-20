// account.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@account/account.service';
import { AccountRepository } from '@account/account.repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Account } from '@prisma/client';

describe('AccountService', () => {
  let userService: AccountService;
  let userRepositoryMock: jest.Mocked<AccountRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: 'AccountRepository',
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<AccountService>(AccountService);
    userRepositoryMock = module.get('AccountRepository');
  });

  describe('login', () => {
    it('should return the account on successful login', async () => {
      const mockAccount: Account = {
        accountId: 'aaeaeaeae',
        email: 'tesstuser',
        hashedPassword: 'testpassword',
      };
      userRepositoryMock.findByEmail.mockResolvedValue(mockAccount);

      const result = await userService.login('testuser', 'testpassword');

      expect(result).toEqual(mockAccount);
    });

    it('should throw NotFoundException if account is not found', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await expect(
        userService.login('nonexistentuser', 'password'),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockAccount: Account = {
        accountId: 'test',
        email: 'testuser',
        hashedPassword: 'testpassword',
      };
      userRepositoryMock.findByEmail.mockResolvedValue(mockAccount);

      await expect(
        userService.login('testuser', 'wrongpassword'),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
