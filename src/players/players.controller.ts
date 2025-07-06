import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player-dto';
import { UpdatePlayerDto } from './dto/update-player-dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { ResponseInterceptor } from '../response/response.interceptor';
import { CustomExceptionFilter } from '../custom-exception/custom-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('players')
@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() queryFilter: QueryFilterDto) {
    return this.playersService.findAll(queryFilter.filter, queryFilter.page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.remove(id);
  }
}
