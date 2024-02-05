import { BaseModel } from 'src/common/entities/base.entity';
import { UserModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PostModel extends BaseModel {
  @ManyToOne(() => UserModel, (user) => user.posts, { nullable: false })
  author: UserModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: 0,
  })
  likeCount: number;

  @Column({
    default: 0,
  })
  commentCount: number;
}
