import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEmpty,
  IsIn,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username should be email or mobile', example: 'john@example.com' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username should be in string' })
  username: string;


  @ApiProperty({ description: 'Password of the user', example: 'password12' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

}
