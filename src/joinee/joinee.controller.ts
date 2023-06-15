import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoineeService } from './joinee.service';
import { CreateJoineeDto } from './dto/create-joinee.dto';
import { UpdateJoineeDto } from './dto/update-joinee.dto';

@Controller('joinee')
export class JoineeController {
  constructor(private readonly joineeService: JoineeService) {}

  @Post()
  create(@Body() createJoineeDto: CreateJoineeDto) {
    return this.joineeService.create(createJoineeDto);
  }

  @Get()
  findAll() {
    return this.joineeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joineeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJoineeDto: UpdateJoineeDto) {
    return this.joineeService.update(+id, updateJoineeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joineeService.remove(+id);
  }
}
