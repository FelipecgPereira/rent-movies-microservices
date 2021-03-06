import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRentDto {
    @IsNotEmpty()
    @IsString()
    movieId: string
    @IsNotEmpty()
    @IsDateString()
    returnDay: Date
}
