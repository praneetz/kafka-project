import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateJoineeDto } from './dto/create-joinee.dto';
import { UpdateJoineeDto } from './dto/update-joinee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Joinee } from './entities/joinee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JoineeService {
  constructor(
    @InjectRepository(Joinee)
    private joineeRepository: Repository<Joinee>,
  ) {}

  async create(createJoineeDto: CreateJoineeDto) {
    await this.joineeRepository.insert(createJoineeDto);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'This action adds a new joinee',
    };
  }

  findAll() {
    return `This action returns all joinee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} joinee`;
  }

  update(id: number, updateJoineeDto: UpdateJoineeDto) {
    return `This action updates a #${id} joinee`;
  }

  remove(id: number) {
    return `This action removes a #${id} joinee`;
  }
}
