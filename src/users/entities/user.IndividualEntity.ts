import { EventEntity } from "src/events/entities/event.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum acct_type{
    INDIVIDUAL = 'expenses',
    ORGANIZATION = 'income'
   }

@Entity()
export class UserIndividualEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'varchar'
    })
    firstName: string;

    @Column(
        {
            type: 'varchar'
        }
    )
    lastName: string;

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

    @Column()
    country: string;

    // @Column()
    // created_at: Date;

    // @Column()
    // updated_at: Date;

    // @Column({
    //     type: "timestamp"
    // })
    //  acct_type: "expenses"
    

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;


@OneToMany(() => EventEntity, eventEntity => eventEntity.userIndividualEntity, {cascade: true, eager:true})
event: EventEntity[];

}
