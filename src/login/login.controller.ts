import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';

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
}
