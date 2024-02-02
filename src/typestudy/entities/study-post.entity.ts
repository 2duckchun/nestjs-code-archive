import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyUserModel } from './study-user.entity';
import { StudyTagModel } from './study-tag.entity';

@Entity()
export class StudyPostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudyUserModel, (user) => user.posts)
  author: StudyUserModel;

  @ManyToMany(() => StudyTagModel, (tag) => tag.posts)
  @JoinTable()
  tags: StudyTagModel[];

  @Column()
  title: string;
}
