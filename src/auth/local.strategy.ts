import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException,Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from "bcrypt"
import { Users } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
        @InjectRepository(Users)
    private userModel: Repository<Users>) {
        super();
    }

    async validate(username: string, password: string): Promise<any>{
        try {
       
        const user = await this.userModel.findOne({where:{email:username}})
        if (!user) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        

        // find if user password match
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new UnauthorizedException('Invalid user credentials');
        }

        // tslint:disable-next-line: no-string-literal
        const { password:tempPass, ...result } = user
        return result;
             
    } catch (error) {
        throw new UnauthorizedException('Invalid user credentials');
    }

    }
}