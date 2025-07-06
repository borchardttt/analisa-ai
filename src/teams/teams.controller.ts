import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseInterceptor } from '../response/response.interceptor';
import { CustomExceptionFilter } from '../custom-exception/custom-exception.filter';

@Controller('teams')
@UseGuards(AuthGuard('jwt'))
@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateTeamDto) {
    return this.teamsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.remove(id);
  }
}
