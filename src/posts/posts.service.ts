import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostModel } from './entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}

  async getAllPosts() {
    return this.postRepository.find({
      select: {
        author: {
          nickname: true,
        },
      },
      relations: {
        author: true,
      },
    });
  }

  async getPostById(id: number) {
    const findData = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findData)
      throw new BadRequestException('id에 매칭되는 포스트가 없습니다.');

    return findData;
  }

  async postPosts(authorId: number, title: string, content: string) {
    const newPost = this.postRepository.create({
      author: {
        id: authorId,
      },
      title: title,
      content: content,
    });

    return await this.postRepository.save(newPost);
  }

  async deletePost(id: number) {
    const deletedPost = this.postRepository.delete(id);
    return deletedPost;
  }
}
