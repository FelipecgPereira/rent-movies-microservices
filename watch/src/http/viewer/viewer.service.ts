import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';


@Injectable()
export class ViewerService {

  constructor(private readonly prisma: PrismaService){}

  async create({name,login,password}: CreateViewerDto) {

    const viewer = await this.prisma.viewer.create({
      data:{
        name,
        login,
        password
      }
    })

    return viewer;
  }

 
  async findOne(login: string) {
    return this.prisma.viewer.findUnique({
      where: {login: login}
    });
  }

 
}
