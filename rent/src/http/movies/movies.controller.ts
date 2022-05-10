import { JwtGuard } from './../account/guards/jwt.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
 
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
  
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

}
