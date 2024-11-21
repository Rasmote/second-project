import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from 'src/dto/login.user.login.dto';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';
import { UserSignUpEntity } from 'src/entity/login.user.signup.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(UserSignUpEntity)
        private readonly userSignUpEntity: Repository<UserSignUpEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(body: UserSignUpDto) {
        const tempEntity = new UserSignUpEntity;
        tempEntity.id = body.id;
        tempEntity.password = body.password;
        tempEntity.name = body.name;
        return await this.userSignUpEntity.save(tempEntity);
    }

    async login(body: UserLoginDto) {
        const { id, password } = body;

        const user = await this.userSignUpEntity.findOne({ where: { id } });

        if (!user) {
            return { message: '사용자 ID가 존재하지 않습니다.' };
        }

        if (user.password !== body.password) {
            return { message: '비밀번호가 일치하지 않습니다.' };
        }

        //페이로드 수정
        const payload = { sub: user.userPk, id: user.id, password: user.password };

        // AccessToken 생성
        const accessToken = this.jwtService.sign(payload);
        // Refresh Token 생성
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '60s' });

        return {
            message: '로그인 성공',
            accessToken,
            refreshToken,
        };
    }
}
//https://docs.nestjs.com/security/authentication#jwt-token
