import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PaymentEntity{
@PrimaryGeneratedColumn('uuid')
id: number;

@Column({type: "varchar"})
token: string;

@Column({type: 'int'})
userId: number;

@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;


}