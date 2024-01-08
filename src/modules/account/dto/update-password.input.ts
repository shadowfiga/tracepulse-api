import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordInput {
  @IsNotEmpty()
  password: string;
}
