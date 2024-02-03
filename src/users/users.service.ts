import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByNickname(nickname: string) {
    return await this.userRepository.exists({
      where: {
        nickname: nickname,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUser(user: Pick<UserModel, 'nickname' | 'email' | 'password'>) {
    const isExistUser = await this.userRepository.exists({
      where: { nickname: user.nickname },
    });
    if (isExistUser) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }

    const isExistEmail = await this.userRepository.exists({
      where: { email: user.email },
    });
    if (isExistEmail) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const newUser = this.userRepository.create(user);

    return await this.userRepository.save(newUser);
  }
}
