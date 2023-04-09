import { IsNotEmpty } from "class-validator";

export class PaymentDto{
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    id: number;


}