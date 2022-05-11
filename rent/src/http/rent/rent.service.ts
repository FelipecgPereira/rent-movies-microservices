import { KafkaService } from './../../messaging/kafka.service';
import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';



@Injectable()
export class RentService {

  constructor(private readonly prisma: PrismaService,private kafka: KafkaService){}

  async create(customerId: string,{movieId, returnDay}: CreateRentDto) {
    const rent = await this.prisma.rent.create({
      data:{
        movieId,
        customerId,
        returnDay
      }
    });

    await this.prisma.movie.update({
      where:{
        id: movieId
      },
      data:{
        status:'RENTEND'
      }
    });

    const customer = await this.prisma.customer.findUnique({
      where:{
        id: customerId
      }
    });

    const movie = await this.prisma.movie.findUnique({
      where:{
        id:movieId
      }
    })

    this.kafka.emit('rent.new-rent',{
      customer:{ 
        name: customer.name,
        login: customer.login,
        password: customer.password
      }, 
      movie:{
        id: movie.id, 
        title: movie.title
      },
      availability: rent.returnDay
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
