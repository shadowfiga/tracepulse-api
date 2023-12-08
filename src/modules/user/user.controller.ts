// user.controller.ts
import {
  Post,
  Controller,
  Put,
  Param,
  Body,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.userService.login(email, password);
      return { message: 'Login successful', user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new ForbiddenException('Invalid credentials.');
      }
    }
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: number,
    @Body('password') newPassword: string,
  ) {
    return this.userService.updatePassword(id, newPassword);
  }
}
