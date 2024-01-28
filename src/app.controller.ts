import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Get('users')
  getHello() {
    return this.userRepository.find({});
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
      title: user.title + '0',
    });

    console.log(data);
    return data;
  }
}
