import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
