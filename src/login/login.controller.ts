import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';
import { UserLoginDto } from 'src/dto/login.user.login.dto';
import { TwoTokenDto } from 'src/dto/auth.token.dto';
import { LoginGuard } from './login.guard';

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

    @UseGuards(LoginGuard)
    @Post('checkMyInfo')
    async checkMyInfo(@Body() body: TwoTokenDto) {
        return await this.loginService.checkMyInfo(body);
    }
}
