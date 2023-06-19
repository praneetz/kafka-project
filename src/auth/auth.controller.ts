import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { SocketGateway } from 'src/socket/socket.gateway';



@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly socket:SocketGateway) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Body() Creds: LoginDto) {
        this.socket.server.emit("login",`Someone login to the server with id ${req.user.id}`)
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() user: SignupDto) {
        return await this.authService.signup(user);
    }
}