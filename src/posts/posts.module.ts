import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './entities/posts.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel, UserModel])],
  controllers: [PostsController],
  providers: [PostsService, AuthService, JwtService, UsersService],
})
export class PostsModule {}
