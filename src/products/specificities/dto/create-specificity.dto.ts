import { IsNotEmpty } from 'class-validator';

export class CreateSpecificityDto {
  @IsNotEmpty()
  name: string;
}
