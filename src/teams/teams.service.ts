import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTeamDto) {
    return this.prisma.team.create({ data });
  }

  async findAll() {
    return this.prisma.team.findMany();
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException('Time não encontrado');
    return team;
  }

  async update(id: number, data: UpdateTeamDto) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException('Time não encontrado');

    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException('Time não encontrado');

    return this.prisma.team.delete({ where: { id } });
  }
}
