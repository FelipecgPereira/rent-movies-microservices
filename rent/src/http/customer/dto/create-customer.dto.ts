import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
