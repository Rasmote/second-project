import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

}
