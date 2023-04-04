import {IsString, IsNotEmpty, IsNumber, Length} from "class-validator"

export class LoginUserDto{

@IsString()
@IsNotEmpty()
email: string;

@IsString()
@IsNotEmpty()
// @Length(3, 20)
password: string;

}