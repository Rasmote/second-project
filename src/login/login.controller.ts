import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';
import { UserLoginDto } from 'src/dto/login.user.login.dto';

@Controller('login')
export class LoginController {
    private readonly loginService: LoginService
    constructor(__loginService: LoginService) {
        this.loginService = __loginService;
    }

    @Post('signup')
    async signUp(@Body() body: UserSignUpDto) {
        return await this.loginService.signUp(body);
    }

    @Post('login')
    async login(@Body() body: UserLoginDto) {
        return await this.loginService.login(body);
    }
}
