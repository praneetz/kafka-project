
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWT_PayloadInterface } from 'src/core/interfaces';
import { UsersService } from 'src/users/user.services';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector,private readonly userService:UsersService){}
 
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles=this.reflector.get<string[]>('roles',context.getHandler())
    const request=context.switchToHttp().getRequest();
    let payload:JWT_PayloadInterface=request.user;
    let user=await this.userService.getUserById(payload.id)
    if(!user)
    return false
    return roles.includes(user.role)
  }
  
}