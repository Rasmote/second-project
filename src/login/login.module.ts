import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSignUpEntity } from 'src/entity/login.user.signup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSignUpEntity])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
