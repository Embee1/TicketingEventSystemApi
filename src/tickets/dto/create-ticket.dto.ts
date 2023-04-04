import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
@IsString()
@IsNotEmpty()
name: string;


@IsString()
@IsNotEmpty()
description: string;

@IsString()
@IsNotEmpty()
ticket_type: string;

@IsString()
@IsNotEmpty()
stock: string;

@IsNumber()
@IsNotEmpty()
no_of_stock: number;

@IsNumber()
@IsNotEmpty()
purchase_limit: number;

@IsNumber()
@IsNotEmpty()
price: number;
}
