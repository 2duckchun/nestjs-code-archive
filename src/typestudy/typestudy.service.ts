import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, StudyUserModel } from './entities/study-user.entity';
import { StudyProfileModel } from './entities/study-profile.entity';
import { StudyPostModel } from './entities/study-post.entity';
import { StudyTagModel } from './entities/study-tag.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TypestudyService {
  constructor(
    @InjectRepository(StudyUserModel)
    private readonly studyUserRepository: Repository<StudyUserModel>,
    @InjectRepository(StudyProfileModel)
    private readonly studyProfileRepository: Repository<StudyProfileModel>,
    @InjectRepository(StudyPostModel)
    private readonly studyPostRepository: Repository<StudyPostModel>,
    @InjectRepository(StudyTagModel)
    private readonly studyTagRepository: Repository<StudyTagModel>,
  ) {}

  async getSample() {
    // craete
    // 모델에 해당되는 객체 생성 - 저장은 안함 (객체만 생성)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user1 = this.studyUserRepository.create({
      email: '',
    });

    // save
    // 모델에 해당되는 객체 생성 - 저장까지 함
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user2 = await this.studyUserRepository.save({
      email: '',
    });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음. (find와 create가 섞인 것과 같음)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user3 = await this.studyUserRepository.preload({
      id: 100,
      email: 'cchhannggee',
    });

    // 삭제하기
    await this.studyUserRepository.delete({
      id: 101,
    });

    // 값 증가시키기
    await this.studyUserRepository.increment(
      {
        id: 1,
      },
      'count',
      2,
    );

    // 값 감소시키기
    await this.studyUserRepository.decrement(
      {
        id: 1,
      },
      'count',
      2,
    );

    // 갯수 카운팅하기
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const count = await this.studyUserRepository.count({
      where: {
        email: 'cchhannggee',
      },
    });

    // sum
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sum = await this.studyUserRepository.sum('count', {
      email: ILike('%0%'),
    });

    // average
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const average = await this.studyUserRepository.average('count', {
      email: ILike('%0%'),
    });

    // 최소값
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const min = await this.studyUserRepository.minimum('count', {
      email: ILike('%0%'),
    });

    // 최대값
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const max = await this.studyUserRepository.maximum('count', {
      email: ILike('%0%'),
    });

    // find
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = await this.studyUserRepository.find({
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
    const user = await this.studyUserRepository.findOne({
      where: {
        email: ILike('%0%'),
      },
    });

    // 페이지네이션 쓸 때 사용함
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userAndCount = await this.studyUserRepository.findAndCount({
      take: 10,
    });
    // take 만큼의 갯수에 해당하는 데이터를 가져온 후, 나머지 데이터의 갯수를 가져옴

    return 'sample';
  }

  async getUsers() {
    return await this.studyUserRepository.find();
  }

  async postUser() {
    return await this.studyUserRepository.save({
      role: Role.ADMIN,
      email: '',
      title: 'test',
    });
  }

  async patchUser(@Param('id') id: string) {
    const user = await this.studyUserRepository.findOne({
      where: {
        id: +id,
      },
    });

    const data = await this.studyUserRepository.save({
      ...user,
    });

    return data;
  }

  async deleteUserProfile(@Param('id') id: string) {
    const deletedData = await this.studyProfileRepository.delete(+id);
    return deletedData;
  }

  async createUserAndProfile() {
    const user = await this.studyUserRepository.save({
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

  async createUserAndPost() {
    const user = await this.studyUserRepository.save({
      email: 'postuser@gmail.com',
    });

    await this.studyPostRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.studyPostRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  async createPostsTags() {
    const post1 = await this.studyPostRepository.save({
      title: 'react lecture',
    });

    const post2 = await this.studyPostRepository.save({
      title: 'next lecture',
    });

    await this.studyTagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });
    await this.studyTagRepository.save({
      name: 'typescript',
      posts: [post2],
    });
    await this.studyTagRepository.save({
      name: 'backend',
      posts: [post2],
    });

    return true;
  }

  getPosts() {
    return this.studyPostRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  getTags() {
    return this.studyTagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
