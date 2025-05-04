import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '../interfaces/team';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTeam: Omit<Team, 'id'>) {
    return this.teamsService.create(createTeam);
  }

  @Get()
  findAll(): Team[] {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Team {
    return this.teamsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Team>): Team {
    return this.teamsService.update(id, data);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() data: Partial<Team>): Team {
    return this.teamsService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    return this.teamsService.remove(id);
  }
}
