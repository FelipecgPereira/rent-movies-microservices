import { WatchService } from './watch.service';

import { GetUser } from './../account/decorator/get-user.decorator';
import { JwtGuard } from './../account/guards/jwt.guard';
import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';


@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}
  @UseGuards(JwtGuard)
  @Get()
  listAllMoviesRent(@GetUser('id') viewer_id: string) {
    return this.watchService.listAllMoviesRent(viewer_id);
  }

   @UseGuards(JwtGuard)
   @Get(':id')
   watchMovie( @Param('id') watch_id:string, @Body() movie_id: string){
       return this.watchService.watchMovie(watch_id,movie_id);
    }
  
}
