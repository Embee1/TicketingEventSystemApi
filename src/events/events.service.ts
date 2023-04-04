import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {

constructor(@InjectRepository(EventEntity) private eventReository: Repository<EventEntity>){}


async findAll(): Promise<EventEntity[]> {
  return this.eventReository.find();
 }


 async findOne(id: number): Promise<EventEntity> {
  const event = await this.eventReository.findOne({
   where: {id}
  });
  // if(!event){
  //  throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
  // }
  return event
 }



 async update(id: number, description: string): Promise<void> {
    await this.eventReository.update(id, {description})
 }

 
  async create(createEventDto: CreateEventDto): Promise<EventEntity>{
   return await this.eventReository.save(createEventDto)
  }


  async remove(id: number) {
    await this.eventReository.delete({id});
  }
}
