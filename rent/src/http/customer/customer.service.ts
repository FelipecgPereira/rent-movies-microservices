import { PrismaService } from './../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as argon from 'argon2';


@Injectable()
export class CustomerService {

  constructor(private readonly prisma: PrismaService){}

  async create({name,login,password}: CreateCustomerDto) {
    const hashPassword = await argon.hash(password);
    const customer = await this.prisma.customer.create({
      data:{
        name,
        login,
        password: hashPassword
      }
    })
    return customer;
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where:{id}
    });
  }

}
