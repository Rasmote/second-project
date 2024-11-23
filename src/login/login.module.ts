import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSignUpEntity } from 'src/entity/login.user.signup.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([UserSignUpEntity]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
