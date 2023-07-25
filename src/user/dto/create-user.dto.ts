import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class LoginUserDto {
  /**
   * User's email
   */
  @IsString()
  email: string;

  /**
   * User's password
   */
  @IsString()
  password: string;
}

export class CreateUserDto {
  /**
   * User's full name
   */
  @IsString()
  email: string;
  
  @IsOptional()
  @IsString()
  role: string;

  @IsString()
  password?: string;

}
