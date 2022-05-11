import { JwtGuard } from './../account/guards/jwt.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';



@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}


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
