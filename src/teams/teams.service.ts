import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '../interfaces/team.interface';

@Injectable()
export class TeamsService {
  private teams: Team[] = [];
  private currentId = 1;

  create(team: Omit<Team, 'id'>): Team {
    const newTeam: Team = {
      id: this.currentId.toString(),
      ...team,
    };
    this.currentId++;
    this.teams.push(newTeam);
    return newTeam;
  }

  findAll(): Team[] {
    return this.teams;
  }

  findOne(id: string): Team {
    const team = this.teams.find((t) => t.id === id);
    if (!team) throw new NotFoundException('Time não encontrado');
    return team;
  }

  update(id: string, updateData: Partial<Omit<Team, 'id'>>): Team {
    const team = this.findOne(id);
    Object.assign(team, updateData);
    return team;
  }

  remove(id: string): void {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Time não encontrado');
    this.teams.splice(index, 1);
  }
}
