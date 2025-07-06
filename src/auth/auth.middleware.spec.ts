import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve retornar token se email e senha forem válidos', async () => {
    const fakeUser = {
      id: 1,
      email: 'teste@teste.com',
      password: await bcrypt.hash('123456', 10),
    };

    (usersService.findByEmail as jest.Mock).mockResolvedValue(fakeUser);

    const result = await service.login({
      email: fakeUser.email,
      password: '123456',
    });

    expect(result).toEqual({ access_token: 'fake-jwt-token' });
  });

  it('deve lançar UnauthorizedException se usuário não for encontrado', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ email: 'x@x.com', password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se senha for inválida', async () => {
    const fakeUser = {
      id: 1,
      email: 'teste@teste.com',
      password: await bcrypt.hash('senhaerrada', 10),
    };

    (usersService.findByEmail as jest.Mock).mockResolvedValue(fakeUser);

    await expect(
      service.login({ email: fakeUser.email, password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
