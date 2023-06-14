import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';



@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Body() Creds: LoginDto) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() user: SignupDto) {
        return await this.authService.signup(user);
    }
}