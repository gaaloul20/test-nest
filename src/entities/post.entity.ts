/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('posts')
export class Post {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @Column({ default: true })
  statut: boolean;
}
