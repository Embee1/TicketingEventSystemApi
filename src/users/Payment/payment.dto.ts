import { IsNotEmpty } from "class-validator";

export class paymentDto{
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    user_id: number;


}