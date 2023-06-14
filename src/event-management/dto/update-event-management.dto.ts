import { PartialType } from '@nestjs/mapped-types';
import { CreateEventManagementDto } from './create-event-management.dto';

export class UpdateEventManagementDto extends PartialType(CreateEventManagementDto) {}
