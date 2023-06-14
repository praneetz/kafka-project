import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    exports: [UsersService],
    controllers:[UserController]
})
export class UsersModule {}