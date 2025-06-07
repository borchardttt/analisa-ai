import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlayerDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name: string;

  @IsInt({ message: 'A idade deve ser um número inteiro.' })
  @Min(12, { message: 'A idade mínima é 12 anos.' })
  @Max(100, { message: 'A idade máxima é 100 anos.' })
  @Type(() => Number)
  age: number;

  @IsInt({ message: 'O teamId deve ser um número inteiro.' })
  @Type(() => Number)
  teamId: number;
  @IsString({ message: 'A posição deve ser uma string válida.' })
  position: string;
}
