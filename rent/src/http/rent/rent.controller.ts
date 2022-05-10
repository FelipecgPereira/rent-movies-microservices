import { GetUser } from './../account/decorator/get-user.decorator';
import { JwtGuard } from './../account/guards/jwt.guard';
import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('id') customerId: string,@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(customerId,createRentDto);
  }

   @UseGuards(JwtGuard)
   @Patch('delivery/:id')
   updateEndDate( @Param('id') rent_id:string, @Body() updateRentDto: UpdateRentDto){
       return this.rentService.update(rent_id,updateRentDto);
    }
  
}
