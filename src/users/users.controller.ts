import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateIndividualUserDto } from './dto/create-IndividualUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    
    private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateIndividualUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get('all')
  // async findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
 async  update(@Param('id') id: number, @Body() email: string) {
    return this.usersService.update(id, email);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
