import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';
import { Event } from './entities/event-management.entity';

@Injectable()
export class EventManagementService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}
  async create(createEventManagementDto: CreateEventManagementDto) {
    await this.eventsRepository.insert(createEventManagementDto);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event Inserted successfull.',
    };
  }

  async findAll() {
    const data = await this.eventsRepository.find();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event fetched successfull.',
      data,
    };
  }

  async findOne(id: number) {
    try {
      const event = await this.eventsRepository.findOne({ where: { id } });
      if (!event) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'event not found',
        };
      }
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Event fetched successfull.',
        data: event,
      };
    } catch (error) {
      throw new HttpException(
        'Server failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateEventManagementDto: UpdateEventManagementDto) {
    await this.eventsRepository.save({ id: id, ...updateEventManagementDto });
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event Updated successfull.',
    };
  }

  async remove(id: number) {
    await this.eventsRepository.delete(id);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event deleted successfull.',
    };
  }
}
