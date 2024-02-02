import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// entity embedding
// 주입할 클래스에는 Entity() 데코레이터를 붙이지 않는다.
export class Name {
  @Column()
  first: string;
  @Column()
  last: string;
}

@Entity()
export class StudyStudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Name 클래스를 컬럼에 주입
  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class StudyTeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Name 클래스를 컬럼에 주입
  @Column(() => Name)
  name: Name;

  @Column()
  salary: number;
}
