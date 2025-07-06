import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TeamsService', () => {
  let service: TeamsService;
  let prisma: PrismaService;

  const mockPrisma = {
    team: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um time', async () => {
    const dto = { name: 'Barcelona', description: 'Time espanhol' };
    const created = { id: 1, ...dto };

    mockPrisma.team.create.mockResolvedValue(created);

    const result = await service.create(dto);

    expect(result).toEqual(created);
    expect(prisma.team.create).toHaveBeenCalledWith({ data: dto });
  });

  it('deve retornar todos os times', async () => {
    const times = [{ id: 1, name: 'Barcelona' }, { id: 2, name: 'PSG' }];

    mockPrisma.team.findMany.mockResolvedValue(times);

    const result = await service.findAll();

    expect(result).toEqual(times);
    expect(prisma.team.findMany).toHaveBeenCalled();
  });

  it('deve retornar um time por ID', async () => {
    const time = { id: 1, name: 'Chelsea' };

    mockPrisma.team.findUnique.mockResolvedValue(time);

    const result = await service.findOne(1);

    expect(result).toEqual(time);
    expect(prisma.team.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve lançar NotFoundException se time não for encontrado', async () => {
    mockPrisma.team.findUnique.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    expect(prisma.team.findUnique).toHaveBeenCalledWith({ where: { id: 99 } });
  });

  it('deve atualizar um time', async () => {
    const updated = { id: 1, name: 'Atualizado FC' };

    mockPrisma.team.update.mockResolvedValue(updated);

    const result = await service.update(1, { name: 'Atualizado FC' });

    expect(result).toEqual(updated);
    expect(prisma.team.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Atualizado FC' },
    });
  });

  it('deve deletar um time', async () => {
    const deleted = { id: 1, name: 'Removido FC' };

    mockPrisma.team.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(result).toEqual(deleted);
    expect(prisma.team.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
