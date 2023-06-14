import { Controller, Get, UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './user.services';


@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(){
     return await this.usersService.getUsers() 
  }
}
