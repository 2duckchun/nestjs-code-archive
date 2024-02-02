import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyUserModel } from './study-user.entity';

@Entity()
export class StudyProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => StudyUserModel, (user) => user.profile)
  @JoinColumn()
  user: StudyUserModel;

  @Column()
  profileImg: string;
}
