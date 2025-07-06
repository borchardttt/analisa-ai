import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePlayerDto } from './dto/create-player-dto';
import { UpdatePlayerDto } from './dto/update-player-dto';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePlayerDto): Promise<any> {
    return this.prisma.player.create({ data });
  }

  async findAll(filter?: string, page = 1): Promise<any[]> {
    const pageSize = 5;

    const where = filter
      ? { name: { contains: filter, mode: 'insensitive' } }
      : {};

    return this.prisma.player.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async update(id: number, data: UpdatePlayerDto): Promise<any> {
    const player = await this.prisma.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException('Jogador não encontrado');

    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<any> {
    const player = await this.prisma.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException('Jogador não encontrado');

    return this.prisma.player.delete({
      where: { id },
    });
  }

  async findOne(id: number): Promise<any> {
    const player = await this.prisma.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException('Jogador não encontrado');
    return player;
  }
}
