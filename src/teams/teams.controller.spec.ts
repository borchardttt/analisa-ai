import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  const mockTeamsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        { provide: TeamsService, useValue: mockTeamsService },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar todos os times (GET /teams)', async () => {
    const teams = [{ id: 1, name: 'Barcelona', }, { id: 2, name: 'PSG' }];
    mockTeamsService.findAll.mockResolvedValue(teams);

    const result = await controller.findAll();

    expect(result).toEqual(teams);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar um time por id (GET /teams/:id)', async () => {
    const team = { id: 1, name: 'Barcelona' };
    mockTeamsService.findOne.mockResolvedValue(team);

    const result = await controller.findOne(1);

    expect(result).toEqual(team);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar um novo time (POST /teams)', async () => {
    const dto: CreateTeamDto = { name: 'Real Madrid', description: 'Time espanhol' };
    const created = { id: 1, ...dto };
    mockTeamsService.create.mockResolvedValue(created);

    const result = await controller.create(dto);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve atualizar um time (PATCH /teams/:id)', async () => {
    const updateDto = { name: 'Chelsea' };
    const updated = { id: 1, name: 'Chelsea' };

    mockTeamsService.update.mockResolvedValue(updated);

    const result = await controller.update(1, updateDto);

    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('deve remover um time (DELETE /teams/:id)', async () => {
    mockTeamsService.remove.mockResolvedValue({ message: 'Removido com sucesso' });

    const result = await controller.remove(1);

    expect(result).toEqual({ message: 'Removido com sucesso' });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
