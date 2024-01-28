import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get('users')
  getUser() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
      select: {
        profile: {
          profileImg: true,
        },
      },
    });
  }

  @Post('users')
  postUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
      title: 'test',
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });

    const data = await this.userRepository.save({
      ...user,
    });

    console.log(data);
    return data;
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: '1234@naver.com',
    });

    await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });

    return user;
  }
}
