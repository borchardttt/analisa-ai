import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player-dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

// 🛡️ Fake AuthGuard que sempre permite acesso
@Injectable()
class FakeAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  const mockPlayersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [{ provide: PlayersService, useValue: mockPlayersService }],
    })
      .overrideGuard(require('@nestjs/passport').AuthGuard('jwt')) // 🔐 substitui o AuthGuard real pelo fake
      .useClass(FakeAuthGuard)
      .compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um jogador (POST /players)', async () => {
    const dto: CreatePlayerDto = { name: 'Neymar', age: 32, teamId: 1 };
    const created = { id: 1, ...dto };

    mockPlayersService.create.mockResolvedValue(created);

    const result = await controller.create(dto);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todos os jogadores (GET /players)', async () => {
    const players = [
      { id: 1, name: 'Neymar', age: 32, teamId: 1 },
      { id: 2, name: 'Messi', age: 37, teamId: 2 },
    ];

    mockPlayersService.findAll.mockResolvedValue(players);

    const query: QueryFilterDto = { filter: undefined, page: 1 };

    const result = await controller.findAll(query);

    expect(result).toEqual(players);
    expect(service.findAll).toHaveBeenCalledWith(undefined, 1);
  });

  it('deve retornar jogador por id (GET /players/:id)', async () => {
    const player = { id: 1, name: 'Neymar', age: 32, teamId: 1 };

    mockPlayersService.findOne.mockResolvedValue(player);

    const result = await controller.findOne(1);

    expect(result).toEqual(player);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
