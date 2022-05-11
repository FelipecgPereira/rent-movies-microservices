import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';


@Injectable()
export class MoviesService {
  constructor (private readonly prisma: PrismaService){}

  async create({id,title}: CreateMovieDto) {

    const movie = this.prisma.movie.create({
      data:{
        id,
        title
      }
    });

    return movie;
  }

  async findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: string) {
    return this.prisma.movie.findUnique({
      where: {id}
    });
  }

}
