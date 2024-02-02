import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyUserModel } from './typestudy/entities/study-user.entity';
import {
  StudyStudentModel,
  StudyTeacherModel,
} from './typestudy/entities/study-person.entity';
import {
  AirplaneModel,
  BookModel,
  CarModel,
  ComputerModel,
  StudySingleBaseModel,
} from './typestudy/entities/study-inheritance.entity';
import { StudyProfileModel } from './typestudy/entities/study-profile.entity';
import { StudyPostModel } from './typestudy/entities/study-post.entity';
import { StudyTagModel } from './typestudy/entities/study-tag.entity';
import { TypestudyModule } from './typestudy/typestudy.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [
        StudyUserModel,
        StudyStudentModel,
        StudyTeacherModel,
        BookModel,
        CarModel,
        StudySingleBaseModel,
        ComputerModel,
        AirplaneModel,
        StudyProfileModel,
        StudyPostModel,
        StudyTagModel,
      ],
      synchronize: true,
    }),
    TypestudyModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
