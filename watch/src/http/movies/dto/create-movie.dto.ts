import { IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly id?: string;
    @IsString()
    readonly title: string;
  
}
