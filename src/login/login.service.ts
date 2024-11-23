import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from 'src/dto/login.user.login.dto';
import { UserSignUpDto } from 'src/dto/login.user.signup.dto';
import { UserSignUpEntity } from 'src/entity/login.user.signup.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TwoTokenDto } from 'src/dto/auth.token.dto';


@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(UserSignUpEntity)
        private readonly userSignUpEntity: Repository<UserSignUpEntity>,
        private readonly jwtService: JwtService,
    ) { }


    async signUp(body: UserSignUpDto) {     //회원가입
        const tempEntity = new UserSignUpEntity;
        tempEntity.id = body.id;
        tempEntity.password = body.password;
        tempEntity.name = body.name;
        return await this.userSignUpEntity.save(tempEntity);
    }


    async login(body: UserLoginDto) {       //로그인
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
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1m' });
        // Refresh Token 생성
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '2m' });

        return {
            message: '로그인 성공',
            accessToken,
            refreshToken,
        };
    }

    /*
    필요한거
    1. 엑세스 토큰을 검증하여 참이면 내 아이디 비밀번호 반환
    2. 액세스 토큰이 뭐가 안맞으면 리프레시 토큰 검증하여 액세스토큰 새로발급
    3. 리프레시 토큰이 뭐가 안맞으면 다시 로그인하라하기
    */

    async checkMyInfo(body: TwoTokenDto) {  //토큰확인후, 아이디 비번 출력
        try {
            //1. 엑세스 토큰을 검증하여 참이면 내 아이디 비밀번호 반환
            const aTokenDecode = this.jwtService.verify(body.accessToken);
            return {
                message: '토큰 유효함',
                id: aTokenDecode.id,
                password: aTokenDecode.password,
            }
        }
        catch (error) {
            try {
                //2. 액세스 토큰이 뭐가 안맞으면 리프레시 토큰 검증하여
                const dTokenDecode = this.jwtService.verify(body.refreshToken);
                // 액세스토큰 새로발급
                const newAccessToken = this.jwtService.sign(
                    {
                        sub: dTokenDecode.userPK,
                        id: dTokenDecode.id,
                        password: dTokenDecode.password,
                    },
                    { expiresIn: '60s' },
                );
                return {
                    message: '새 엑세스 토큰 발급',
                    newAccessToken,
                }
            }
            catch (secondError) {
                //3. 리프레시 토큰이 뭐가 안맞으면 다시 로그인하라하기
                return {
                    message: '다시 로그인하세요',
                }
            }
        }
    }


}
//https://docs.nestjs.com/security/authentication#jwt-token
