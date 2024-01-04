// account.controller.ts
import {
  Body,
  Controller,
  Get, HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccountService } from '@account/account.service';
import { LoginInput } from '@account/dto/login.input';
import { JwtAuthGuard } from '@account/auth/guard/jwt-auth.guard';
import { UpdatePasswordInput } from '@account/dto/update-password.input';
import { Request, Response } from 'express';
import { Storage } from '@util/constants';

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

    response.cookie(Storage.accessToken, jwtPayload.accessToken);

    return this.accountService.login(loginInput.email, loginInput.password);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/reset-password')
  @UsePipes()
  async updatePassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    const user = request.user as any;
    const accountId = user.accountId;

    await this.accountService.updatePassword(
      accountId,
      updatePasswordInput.password,
    );

    return response
      .status(HttpStatus.OK)
      .json({ message: 'Password successfully updated.' });
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.cookie(Storage.accessToken, { expires: new Date() });
    response.redirect('/login');
  }
}
