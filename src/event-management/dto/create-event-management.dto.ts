import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString,IsNumber, IsOptional } from 'class-validator';

export class CreateEventManagementDto {
  @ApiProperty({ description: 'testing event name', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ description: 'testing event name', example: '2022-01-22' })
  @IsDateString()
  @IsNotEmpty()
  eventDate: Date;

  @ApiProperty({ description: 'testing event name', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  eventTime: string;

  @ApiProperty({ description: 'testing event name', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @ApiProperty({ description: 'testing event name', example: 'xyasz' })
  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  @ApiProperty({ description: 'testing event name', example: '121223sdasd' })
  @IsOptional()
  @IsNotEmpty()
  eventOrganizer:string
}
