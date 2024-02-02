import { Module } from '@nestjs/common';
import { TypestudyService } from './typestudy.service';
import { TypestudyController } from './typestudy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyUserModel } from './entities/study-user.entity';
import { StudyProfileModel } from './entities/study-profile.entity';
import { StudyPostModel } from './entities/study-post.entity';
import { StudyTagModel } from './entities/study-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyUserModel,
      StudyProfileModel,
      StudyPostModel,
      StudyTagModel,
    ]),
  ],
  controllers: [TypestudyController],
  providers: [TypestudyService],
})
export class TypestudyModule {}
