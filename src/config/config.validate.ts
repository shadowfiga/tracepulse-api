import { plainToClass } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min, validateSync } from 'class-validator';


class EnvVariables {

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(65536)
  SERVER_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsInt()
  JWT_EXP_TIME: number
}
export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}