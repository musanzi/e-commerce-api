import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: string;

  @IsArray()
  tags: string[];

  @IsArray()
  specificities: string[];
}
