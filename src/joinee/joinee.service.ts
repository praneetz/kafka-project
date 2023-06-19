import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateJoineeDto } from './dto/create-joinee.dto';
import { UpdateJoineeDto } from './dto/update-joinee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Joinee } from './entities/joinee.entity';
import { Repository } from 'typeorm';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class JoineeService {
  constructor(
    @InjectRepository(Joinee)
    private joineeRepository: Repository<Joinee>,
    private readonly socket:SocketGateway
  ) {}

  async create(createJoineeDto: CreateJoineeDto) {
    await this.joineeRepository.insert(createJoineeDto);
    this.socket.server.emit('join_event', `${createJoineeDto.username} joined the event.`)
    return {
      status: HttpStatus.ACCEPTED,
      message: 'This action adds a new joinee',
    };
  }

  async findAll() {
    const data = await this.joineeRepository.find({ relations: ['event'] });
    return {
      status: HttpStatus.ACCEPTED,
      message: 'This action returns all joinee`',
      data,
    };
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
