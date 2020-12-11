import { User } from '../entities/user';
import { ObjectType, Field } from 'type-graphql';
@ObjectType()
class Error {
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;
  @Field(() => User, { nullable: true })
  user?: User;
}
