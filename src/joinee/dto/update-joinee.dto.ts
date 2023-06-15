import { PartialType } from '@nestjs/swagger';
import { CreateJoineeDto } from './create-joinee.dto';

export class UpdateJoineeDto extends PartialType(CreateJoineeDto) {}
