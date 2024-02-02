import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPostModel } from './study-post.entity';

@Entity()
export class StudyTagModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => StudyPostModel, (post) => post.tags)
  posts: StudyPostModel[];

  @Column()
  name: string;
}
