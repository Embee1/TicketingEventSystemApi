import EventEmitter from "events";
import { EventEntity } from "src/events/entities/event.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class TicketEntity {
@PrimaryGeneratedColumn('uuid')
id: number;

@Column({type: 'varchar'})
name: string;

@Column({type: 'varchar'})
description: string;

@Column()
ticket_type: string;

@Column()
stock: string;

@Column({type: 'integer'})
no_of_stock: number;

@Column({type: 'integer'})
purchase_limit: number

@Column({type: 'integer'})
price: number;



@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;

@ManyToOne(() => EventEntity, eventEntity => eventEntity.ticketEntity)
event: EventEntity;

}
