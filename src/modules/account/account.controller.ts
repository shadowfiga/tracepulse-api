// account.controller.ts
import {
  Post,
  Controller,
  Body,
  UsePipes,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { AccountService } from '@account/account.service';
import { LoginInput } from '@account/dto/login.input';
import { JwtAuthGuard } from '@account/auth/guard/jwt-auth.guard';
import { UpdatePasswordInput } from '@account/dto/update-password.input';
import { Request } from 'express';
import { storage } from '@util/constants';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/login')
  @UsePipes()
  async login(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) response,
  ) {
    const jwtPayload = await this.accountService.login(
      loginInput.email,
      loginInput.password,
    );

    response.cookie(storage.jwtTokenName, jwtPayload.accessToken);

    return this.accountService.login(loginInput.email, loginInput.password);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/reset-password')
  @UsePipes()
  async updatePassword(
    @Req() request: Request,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.accountService.updatePassword('', updatePasswordInput.password);
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.cookie(storage.jwtTokenName, { expires: new Date() });
    response.redirect('/login');
  }
}
