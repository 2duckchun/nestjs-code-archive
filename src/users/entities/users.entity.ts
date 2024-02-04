import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entities/base.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column({
    nullable: false,
    unique: true,
    length: 20,
  })
  nickname: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostModel, (post) => post)
  posts: PostModel[];
}
