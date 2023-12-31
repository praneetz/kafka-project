import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';
import { Event } from './entities/event-management.entity';
import kafkaConfig from '../kafka.config';
import { SocketGateway } from 'src/socket/socket.gateway';
import {JWT_PayloadInterface }from "src/core/interfaces"
import { Joinee } from 'src/joinee/entities/joinee.entity';

@Injectable()
export class EventManagementService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Joinee)
    private JoineeModel: Repository<Joinee>,
    private readonly socket: SocketGateway
  ) {}

  // kafka producer
  async kafkaProducer(topic: string, msg: string) {
    const producer = kafkaConfig.producer();

    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [{ value: msg }],
    });
  }
  // kafka consumner
  async kafkaConsumer(topic: string) {
    const consumer = kafkaConfig.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  }

  async create(createEventManagementDto: CreateEventManagementDto,User:JWT_PayloadInterface) {
    try {
      const dataToCreate={...createEventManagementDto,eventOrganizerId:User.id,eventOrganizer:User.id}
      await this.eventsRepository.insert(dataToCreate);
      this.socket.server.emit('create_event', "Event created")
      // this.kafkaProducer('eventCreated', 'event created successfully');
      // this.kafkaConsumer('eventCreated');
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Event Inserted successfull.',
      };
      
    } catch (error) {
      this.socket.server.emit('eventcreated', "event error")
    }
   
  }

  async getOrganizerEvents(id: string) {
    const events = await this.eventsRepository.find({
      where: { eventOrganizer: id },
    });
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event fetched successfull.',
      data: events,
    };
  }

  async findAll() {
    const data = await this.eventsRepository.find({
      relations: ['joinee', 'eventOrganizer'],
    });
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Event fetched successfull.',
      data,
    };
  }

  async findOne(id: number) {
    try {
      const event = await this.eventsRepository.findOne({
        where: { id },
        relations: ['eventOrganizer','joinee'],
      });
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

  async update(
    id: number,
    updateEventManagementDto: UpdateEventManagementDto,
    req,
  ) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (
      (event && req.user.id == event.eventOrganizer) ||
      (event && req.user.role === 'admin')
    ) {
      await this.eventsRepository.save({ id: id, ...updateEventManagementDto });
      this.socket.server.emit('update_event', "Event updated")
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Event Updated successfull.',
      };
    }
    return {
      status: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      message: 'Event Update Failed .',
    };
  }

  async remove(id: number, req) {
    const payload:JWT_PayloadInterface=req.user;
    await this.JoineeModel.delete({event:`${id}`})
    const event = await this.eventsRepository.findOne({ where: { id }});
    
    if (
      (event && payload.id === event.eventOrganizer) ||
      (event && payload.role === 'admin') 
    ) {
      await this.eventsRepository.delete(id);
      this.socket.server.emit('delete_event', "Event deleted")
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Event deleted successfull.',
      };
    }

    return {
      status: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      message: 'Event deleted failed.',
    };
  }
}
