import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserIndividualEntity } from "src/users/entities/user.IndividualEntity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class EventEntity {
@PrimaryGeneratedColumn('uuid')
id: number;

@Column({type: 'varchar'})
description: string;

@Column({type: 'varchar'})
location: string;

@Column({type: 'varchar'})
location_tip: string;

@Column()
event_type: string

@Column({type: 'varchar'})
virtual_meet_link : string;

@Column()
category: string

@Column({type: 'varchar'})
custom_url: string;

@Column()
frequency: string


// @Column({type: "datetime"})
// start_time: Date;

// @Column({type: Date})
// end_date: Date;


// @Column({type: "datetime"})
// end_time: Date

// @Column()
// twitter_url: string;

// @Column()
// facebook_url:string;



@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;


@ManyToOne(() => UserIndividualEntity,userIndividualEntity => userIndividualEntity.event)
userIndividualEntity: UserIndividualEntity;

@OneToMany(() => TicketEntity, ticketEntity => ticketEntity.event, {cascade: true, eager: true})
ticketEntity: TicketEntity[];
}
