import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEmpty,
  IsIn,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { Role, Gender } from 'src/core/enum';

export class SignupDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name should be in string' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name should be in string' })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be in string' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'Password of the user', example: 'password12' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password should be in string' })
  @Length(3, 30, { message: 'Password length should be in range 3-10' })
  password: string;


  @ApiProperty({ description: 'Role of the user', example: 'user' })
  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role should be in string' })
  @IsIn(Object.values(Role), {
    message: "Role must be either 'user', 'admin' or 'superadmin'",
  })
  role: Role;
}
