import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString() // Phải là một chuỗi
  @IsNotEmpty() // Không được để trống
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Phải có ít nhất 6 ký tự
  password: string;
}
