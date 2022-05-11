import { CreateWatchDto } from './create-watch.dto';
import { IsNotEmpty, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRentDto extends PartialType(CreateWatchDto) {
    @IsNotEmpty()
    @IsDate()
    deliveryDate: Date
}
