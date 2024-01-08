import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { DatabaseExceptionsEnum } from '@util/constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code == DatabaseExceptionsEnum.notFound) {
      const status = HttpStatus.NOT_FOUND;
      response.status(status).json({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    } else {
      super.catch(exception, host);
    }
  }
}
