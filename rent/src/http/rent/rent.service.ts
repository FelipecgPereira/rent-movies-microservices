import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';



@Injectable()
export class RentService {

  constructor(private readonly prisma: PrismaService){}

  async create(customerId: string,{movieId, returnDay}: CreateRentDto) {
    const rent = await this.prisma.rent.create({
      data:{
        movieId,
        customerId,
        returnDay
      }
    })

    await this.prisma.movie.update({
      where:{
        id: movieId
      },
      data:{
        status:'RENTEND'
      }
    })
    return rent;
  }

  
  async update(id: string, {deliveryDate}: UpdateRentDto) {
    const rent = await this.prisma.rent.update({
      where:{id},
      data:{
        deliveryDate,
      }
      
    });

    await this.prisma.movie.update({
      where:{
        id: rent.movieId
      },
      data:{
        status:'AVAILABLE'
      }
    })
   


    return `This action updates a #${id} rent`;
  }

  
}
