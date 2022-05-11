import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateWatchDto {
    @IsNotEmpty()
    @IsString()
    viewerId: string
    @IsNotEmpty()
    @IsString()
    movieId: string
    @IsNotEmpty()
    @IsDateString()
    availability: Date
}
