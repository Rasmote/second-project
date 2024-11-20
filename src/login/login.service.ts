import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from 'src/dto/login.user.login.dto';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';
import { UserSignUpEntity } from 'src/entity/login.user.signup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(UserSignUpEntity)
        private readonly userSignUpEntity: Repository<UserSignUpEntity>
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

        return { message: '로그인 성공', userId: user.id, name: user.name };
    }
}
