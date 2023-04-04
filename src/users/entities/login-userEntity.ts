import {IsString, IsNotEmpty, IsNumber, Length} from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum acct_type{
    INDIVIDUAL = 'expenses',
    ORGANIZATION = 'income'
}

@Entity()
export class LoginUserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({unique: true,
        type: 'varchar'
    })
    email: string;


    @Column(
        {
            type: 'varchar'
        }
    )
    password: string;



}