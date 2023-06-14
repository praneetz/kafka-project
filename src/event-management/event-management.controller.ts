import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/core/enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('event-management')
export class EventManagementController {
  constructor(
    private readonly eventManagementService: EventManagementService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @Post()
  async create(@Body() createEventManagementDto: CreateEventManagementDto) {
    return this.eventManagementService.create(createEventManagementDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @Get()
  async findAll() {
    return this.eventManagementService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventManagementService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventManagementDto: UpdateEventManagementDto,
  ) {
    return this.eventManagementService.update(+id, updateEventManagementDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventManagementService.remove(+id);
  }
}
