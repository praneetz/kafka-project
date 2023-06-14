import { Module } from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { EventManagementController } from './event-management.controller';
import { Event } from './entities/event-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/user.module';


@Module({
  imports:[TypeOrmModule.forFeature([Event]),UsersModule],
  controllers: [EventManagementController],
  providers: [EventManagementService]
})
export class EventManagementModule {}
