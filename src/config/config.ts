import { validateConfig } from '@config/config.validate';
import { registerAs } from '@nestjs/config';
import { configInterface } from '@config/config.interface';

export default registerAs('tracepulseConfig', (): configInterface => {
  validateConfig(process.env);
  return {
    SERVER_PORT: parseInt(process.env.SERVER_PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXP_TIME: parseInt(process.env.JWT_EXP_TIME)
  };
});