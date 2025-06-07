import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player-dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';

@Controller('players')
@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll(@Query() queryFilter: QueryFilterDto) {
    return this.playersService.findAll(queryFilter.filter, queryFilter.page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }
}
