import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

// 기본적인 class inheritance
export class StudyBaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends StudyBaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends StudyBaseModel {
  @Column()
  brand: string;
}

// Single inheritance
// 테이블 하나에서 두개의 자식 엔티티를 관리한다.
// (솔직히 사용할 일 없을 듯)
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class StudySingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends StudySingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModel extends StudySingleBaseModel {
  @Column()
  country: string;
}
