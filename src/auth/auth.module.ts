import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/user.module';
import { Users } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketModule } from 'src/socket/socket.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
        SocketModule
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule { }