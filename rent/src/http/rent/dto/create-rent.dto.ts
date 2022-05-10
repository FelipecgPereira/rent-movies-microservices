import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateRentDto {
    @IsNotEmpty()
    @IsString()
    movieId: string
    @IsNotEmpty()
    @IsDate()
    returnDay: Date
}
