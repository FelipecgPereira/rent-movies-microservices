import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewerService } from './viewer.service';

@Controller('viewer')
export class ViewerController {
  constructor(private readonly viewerService: ViewerService) {}

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewerService.findOne(id);
  }

 
  
}
