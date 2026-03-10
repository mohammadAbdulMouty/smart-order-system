import { IsOptional } from 'class-validator';


export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  categoryId?: string;
}
