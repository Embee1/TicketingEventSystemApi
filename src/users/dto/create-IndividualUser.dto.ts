import {IsString, IsNotEmpty, IsNumber, Length} from "class-validator"

export class CreateIndividualUserDto {
@IsString()
@IsNotEmpty()
firstName: string;

@IsString()
@IsNotEmpty()
lastName: string;

@IsString()
@IsNotEmpty()
email: string;

@IsString()
@IsNotEmpty()
// @Length(3, 20)
password: string;

@IsString()
country: string;


}
