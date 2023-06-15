import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { JWT_PayloadInterface } from 'src/core/interfaces';
import { Users } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userModel: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async login(UserInfo: any) {
    try {
      let payload: JWT_PayloadInterface = {
        id: UserInfo.id,
        role: UserInfo.role,
        tokenVersion: UserInfo.tokenVersion,
      };
      let token = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      });
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Login successfull.',
        data: {
          user: UserInfo,
          token,
        },
      };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signup(signupData: SignupDto) {
    try {
      signupData.password = await bcrypt.hash(signupData.password, 10);
      const data = {
        ...signupData,
        fullName: signupData.firstName + ' ' + signupData.lastName,
      };
      await this.userModel.insert(data);
      return {
        status: HttpStatus.CREATED,
        message: 'Signup successfull.',
        data: {},
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
