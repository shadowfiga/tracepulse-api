// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepositoryMock = module.get('UserRepository');
  });

  describe('login', () => {
    it('should return the user on successful login', async () => {
      const mockUser: User = {
        id: 1,
        email: 'tesstuser',
        password: 'testpassword',
      };
      userRepositoryMock.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.login('testuser', 'testpassword');

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await expect(
        userService.login('nonexistentuser', 'password'),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser: User = {
        id: 1,
        email: 'testuser',
        password: 'testpassword',
      };
      userRepositoryMock.findByEmail.mockResolvedValue(mockUser);

      await expect(
        userService.login('testuser', 'wrongpassword'),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
