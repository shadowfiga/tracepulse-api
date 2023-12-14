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
import { LocalAuthGuard } from '@account/auth/guard/local-auth.guard';
import { UpdatePasswordInput } from '@account/dto/update-password.input';
import { Request } from 'express';
import { dateNow } from '@util/date/date.specific-dates';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(LocalAuthGuard)
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
    response.cookie('access_token', jwtPayload.access_token);

    return this.accountService.login(loginInput.email, loginInput.password);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/reset-password')
  @UsePipes()
  async updatePassword(
    @Req() request: Request,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    console.log(request.cookies);
    return this.accountService.updatePassword('', updatePasswordInput.password);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.cookie('access_token', { expires: dateNow });
    response.redirect('/login');
  }
}
