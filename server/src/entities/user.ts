import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Posts } from './posts';
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ length: 100 })
  password: string;

  @Field()
  @Column({ length: 100 })
  username: string;

  @Field()
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}
