import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('create')
 async  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get('all')
  async findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Body('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  async update(@Body('id') id: number, @Body() description: string) {
    return this.ticketsService.update(id, description);
  }

  @Delete(':id')
  remove(@Body('id') id: number) {
    return this.ticketsService.remove(id);
  }
}
