import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
