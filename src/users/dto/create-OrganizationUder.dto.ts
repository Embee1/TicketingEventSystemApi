import {IsString, IsNotEmpty, IsNumber, Length} from "class-validator"

export class CreateOrganizationUserDto {
@IsString()
@IsNotEmpty()
businessName: string;

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