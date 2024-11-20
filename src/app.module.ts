import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSignUpEntity } from './entity/login.user.signup.entity';

@Module({
  imports: [LoginModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'loginDB',
      entities: [UserSignUpEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
