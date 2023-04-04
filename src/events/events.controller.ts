import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('explore')
  findAll() {
    return this.eventsService.findAll();
  }


  @Get(':id')
  async findOne(@Body('id') id: number) {
    return this.eventsService.findOne(id);
  }


  @Patch(':id')
  async update(@Body('id') id: number, @Body() description: string) {
    return this.eventsService.update(id, description);
  }


  @Post('create')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

 
  @Delete(':id')
  remove(@Body('id') id: number) {
    return this.eventsService.remove(id);
  }
}
