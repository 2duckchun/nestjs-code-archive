import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // @PrimaryGeneratedColumn()
  // @PrimaryColumn()
  // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
  // 테이블 안에서 각각의 Row를 구분할 수 있는 칼럼이다.
  // uuid : Universally Unique Identifier
  // 12313sdf-455asdf-123gtgtg-13ggththt
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({
  //   // 컬럼 타입 지정
  //   type: 'varchar',

  //   // 컬럼 이름 지정
  //   name: 'title',

  //   // 컬럼 길이 지정 (varchar 등에 사용 가능)
  //   length: 255,

  //   // null 허용 여부
  //   nullable: true,

  //   // 업데이트 가능 여부
  //   // false면 처음 값 저장할때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: true,

  //   // find()를 실행할 때 기본으로 값을 불러올지 정함
  //   // 기본값은 true
  //   select: true,

  //   // 아무것도 입력 안했을 때 컬럼에 기본으로 입력되는 값
  //   default: 'test title!!',

  //   // 칼럼중에서 유일무이한 값이 되어야하는지 체크하는 값
  //   // 회원가입시 이메일 등에 많이 사용함
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  @CreateDateColumn()
  createdAt: number;

  // 데이터 업데이트 일자
  @UpdateDateColumn()
  updatedAt: string;

  // 데이터가 업데이트 될 때마다 버전이 1씩 증가
  // save() 함수가 몇번 불려졌는지 확인할 때 사용함
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid') // 자동으로 생성되는 값, @Column과 함께 사용해야한다.
  additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  profile: ProfileModel;
}
