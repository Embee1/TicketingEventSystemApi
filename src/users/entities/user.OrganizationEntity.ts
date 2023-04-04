import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum acct_type{
    INDIVIDUAL = 'expenses',
    ORGANIZATION = 'income'
}


@Entity()
export class UserOrganizationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'varchar'
    })
    businessName: string;
   
    @Column({
        unique: true,
    
        type: 'varchar'
    })

    email: string;

    @Column(

        {
            type: 'varchar'
        }
    )
    password: string;

    @Column()
    country: string;

    // @Column()
    // created_at: Date;

    // @Column()
    // updated_at: Date;

    // @Column()
    // acct_type: "income"

    // @Column({
    //     type: "timestamp"
    // })
    //  acct_type: ""

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}