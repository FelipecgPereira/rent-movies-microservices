import { CreateWatchDto } from './dto/create-watch.dto';
import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateRentDto } from './dto/update-rent.dto';



@Injectable()
export class WatchService {

  constructor(private readonly prisma: PrismaService){}

  async create({viewerId, movieId, availability}:CreateWatchDto){

    const watch = await this.prisma.watch.create({
      data: { 
        viewerId, movieId, availability
      }
    });

    return watch;

  }

  async listAllMoviesRent(viewer_id: string) {
    const movies = this.prisma.watch.findMany({
      where:{
        viewerId: viewer_id
      }
    })
    return movies;
  }

  
  async watchMovie(watch_id: string,movie_id: string) {
      const movie = this.prisma.watch.findFirst({
        where:{
          id: watch_id,
          movieId: movie_id
        }
      });

      return movie;

  }

  
}
