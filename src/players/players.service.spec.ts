import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let prisma: PrismaService;

  const mockPrisma = {
    player: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um jogador', async () => {
    const dto = { name: 'Neymar',age:18, teamId: 1 };
    const created = { id: 1, ...dto };

    mockPrisma.player.create.mockResolvedValue(created);

    const result = await service.create(dto);

    expect(result).toEqual(created);
    expect(prisma.player.create).toHaveBeenCalledWith({ data: dto });
  });

  it('deve retornar lista de jogadores', async () => {
    const players = [
      { id: 1, name: 'Neymar', teamId: 1 },
      { id: 2, name: 'Messi', teamId: 2 },
    ];

    mockPrisma.player.findMany.mockResolvedValue(players);

    const result = await service.findAll(undefined, 1);

    expect(result).toEqual(players);
    expect(prisma.player.findMany).toHaveBeenCalled();
  });

  it('deve retornar um jogador por id', async () => {
    const player = { id: 1, name: 'Neymar', teamId: 1 };

    mockPrisma.player.findUnique.mockResolvedValue(player);

    const result = await service.findOne(1);

    expect(result).toEqual(player);
    expect(prisma.player.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
