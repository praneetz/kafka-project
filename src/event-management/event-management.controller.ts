import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  MiddlewareConsumer,
  UseInterceptors,
} from '@nestjs/common';
import { EventManagementService } from './event-management.service';
import { CreateEventManagementDto } from './dto/create-event-management.dto';
import { UpdateEventManagementDto } from './dto/update-event-management.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/core/enum';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('event-management')
@Controller('event')
export class EventManagementController {
  constructor(
    private readonly eventManagementService: EventManagementService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @ApiBearerAuth()
  @Post()
  async create(
    @Req() req: { user: { id: string } },
    @Body() createEventManagementDto: CreateEventManagementDto,
  ) {
    createEventManagementDto.eventOrganizer = req.user.id;
    return this.eventManagementService.create(createEventManagementDto);
  }

  // get organizer event
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Organizer)
  @ApiBearerAuth()
  @Get('organizer/events')
  async getOrganizerEvents(@Req() req: { user: { id: string } }) {
    return this.eventManagementService.getOrganizerEvents(req.user.id);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.Admin, Role.Organizer)
  @Get()
  async findAll() {
    return this.eventManagementService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.Admin, Role.Organizer)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventManagementService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateEventManagementDto: UpdateEventManagementDto,
  ) {
    return this.eventManagementService.update(
      +id,
      updateEventManagementDto,
      req,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.Organizer)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.eventManagementService.remove(+id, req);
  }
}
