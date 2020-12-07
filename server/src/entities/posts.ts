import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
@ObjectType()
@Entity()
export class Posts extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  photoPath: string;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field()
  @Column({ default: 0 })
  votes: number;
}
