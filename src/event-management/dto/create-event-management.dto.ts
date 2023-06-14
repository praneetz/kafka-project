import { IsDateString, IsNotEmpty, IsString,IsNumber } from 'class-validator';

export class CreateEventManagementDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsDateString()
  @IsNotEmpty()
  eventDate: Date;

  @IsString()
  @IsNotEmpty()
  eventTime: string;

  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  @IsNumber()
  @IsNotEmpty()
  eventOrganizer:number
}
