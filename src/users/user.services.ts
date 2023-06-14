import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userModel: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<Users> {
    try {
      return await this.userModel.findOne({ where: { id: id } });
    } catch (error) {
      return null;
    }
  }
}
