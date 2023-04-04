import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEntity } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {

constructor(@InjectRepository(TicketEntity) private ticketRepository: Repository<TicketEntity>){}


  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    return await this.ticketRepository.save(createTicketDto)
  }

  async findAll(): Promise<TicketEntity[]>{
    return this.ticketRepository.find();
  }

  async findOne(id: number): Promise<TicketEntity> {
   const ticket = await this.ticketRepository.findOne({
    where: {id}
   })
   return ticket;
  }

  async update(id: number, description: string):Promise<void> {
    await this.ticketRepository.update(id, {description})
  }

  async remove(id: number) {
    await this.ticketRepository.delete({id})
  }
}
