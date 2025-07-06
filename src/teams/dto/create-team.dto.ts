import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsString({ message: 'O nome do time deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do time é obrigatório.' })
  name: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição do time é obrigatória.' })
  description: string;
}
