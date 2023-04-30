export class CreateUserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly phone: number;
  readonly email: string;
  readonly password: string;
  readonly staus: string;
  readonly mermber_since: Date;
}

import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequest, RegisterRequest, ValidateRequest } from '../interface';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}
