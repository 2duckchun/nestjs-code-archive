import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { ILike, Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('sample')
  async getSample() {
    // craete
    // 모델에 해당되는 객체 생성 - 저장은 안함 (객체만 생성)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user1 = this.userRepository.create({
      email: '',
    });

    // save
    // 모델에 해당되는 객체 생성 - 저장까지 함
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user2 = await this.userRepository.save({
      email: '',
    });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음. (find와 create가 섞인 것과 같음)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user3 = await this.userRepository.preload({
      id: 100,
      email: 'cchhannggee',
    });

    // 삭제하기
    await this.userRepository.delete({
      id: 101,
    });

    // 값 증가시키기
    await this.userRepository.increment(
      {
        id: 1,
      },
      'count',
      2,
    );

    // 값 감소시키기
    await this.userRepository.decrement(
      {
        id: 1,
      },
      'count',
      2,
    );

    // 갯수 카운팅하기
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const count = await this.userRepository.count({
      where: {
        email: 'cchhannggee',
      },
    });

    // sum
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sum = await this.userRepository.sum('count', {
      email: ILike('%0%'),
    });

    // average
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const average = await this.userRepository.average('count', {
      email: ILike('%0%'),
    });

    // 최소값
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const min = await this.userRepository.minimum('count', {
      email: ILike('%0%'),
    });

    // 최대값
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const max = await this.userRepository.maximum('count', {
      email: ILike('%0%'),
    });

    // find
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = await this.userRepository.find({
      where: {
        email: ILike('%0%'),
      },
      order: {
        email: 'ASC',
      },
      skip: 0,
      take: 10,
    });

    // fineOne
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userRepository.findOne({
      where: {
        email: ILike('%0%'),
      },
    });

    // 페이지네이션 쓸 때 사용함
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userAndCount = await this.userRepository.findAndCount({
      take: 10,
    });
    // take 만큼의 갯수에 해당하는 데이터를 가져온 후, 나머지 데이터의 갯수를 가져옴

    return 'sample';
  }

  @Get('users')
  getUser() {}

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

    return data;
  }

  @Delete('users/profile/:id')
  async deleteUserProfile(@Param('id') id: string) {
    const deletedData = await this.profileRepository.delete(+id);
    return deletedData;
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: '1234@naver.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });
    // 관계 정의에 eager를 쓰면 아래처럼 profileRepository를 따로 쓸 필요가 없다.
    // await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'postuser@gmail.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'react lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'next lecture',
    });

    await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });
    await this.tagRepository.save({
      name: 'typescript',
      posts: [post2],
    });
    await this.tagRepository.save({
      name: 'backend',
      posts: [post2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
