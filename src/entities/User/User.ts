import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { BaseEntity } from '../BaseEntity';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn({ type: 'varchar' })
  userId: ObjectID | String;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ unique: true, type: 'varchar' })
  emailId: string;


  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'int' })
  MobileNo: number;

  @Column({ type: 'varchar' })
  Address: String;

  @Column({ type: 'varchar' })
  Occupation: String;

  @Column()
  OccupationHistory: string[];

  @Column()
  position: string;


  @Column({ type: 'varchar' })
  Organization: String

  // @Column(type => Product)
  // products: Product[];
}
