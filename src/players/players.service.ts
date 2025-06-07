import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from 'src/interfaces/player';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  create(player) {
    const newPlayer: Player = {
      id: (this.players.length + 1).toString(),
      ...player,
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  findAll(filter?: string, page: number = 1): Player[] {
    let result = this.players;

    if (filter) {
      result = result.filter((player) =>
        player.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    const pageSize = 5;
    return result.slice((page - 1) * pageSize, page * pageSize);
  }

  findOne(id: string): Player {
    const player = this.players.find((p) => p.id === id);
    if (!player) throw new NotFoundException('Jogador não encontrado');
    return player;
  }
}
