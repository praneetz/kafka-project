import {  Module } from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { EventManagementController } from './event-management.controller';
import { Event } from './entities/event-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/user.module';
import { SocketModule } from 'src/socket/socket.module';
import { Joinee } from 'src/joinee/entities/joinee.entity';



@Module({
  imports:[TypeOrmModule.forFeature([Event,Joinee]),SocketModule,UsersModule],
  controllers: [EventManagementController],
  providers: [EventManagementService,]
})
export class EventManagementModule {}
