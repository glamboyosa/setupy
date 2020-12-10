import {
  Query,
  Mutation,
  InputType,
  Field,
  Ctx,
  Resolver,
  Arg,
} from 'type-graphql';
import { User } from '../entities/user';
import { hash, genSalt, compare } from 'bcryptjs';
import { context } from '../utils/context';
import { COOKIE_NAME, __prod__ } from '../utils/constants';
import { createAccessToken } from '../utils/tokens';
import { verify } from 'jsonwebtoken';
@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async Register(@Arg('UserInput') { username, email, password }: UserInput) {
    try {
      const emailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });
      if (emailExists) {
        throw new Error('User with the given email exists');
      }
      if (usernameExists) {
        throw new Error('Username is taken');
      }
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);
      await User.insert({
        email,
        password: hashedPassword,
        username,
      });
    } catch (e) {
      throw new Error(e.message);
    }

    return true;
  }
  @Mutation(() => User)
  async Login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: context
  ) {
    let user: User;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error('email or password incorrect');
      }
      const isValidPassword = await compare(password, existingUser.password);
      if (!isValidPassword) {
        throw new Error('email or password incorrect');
      }
      user = existingUser;
    } catch (e) {
      throw new Error(e.message);
    }
    res.cookie(COOKIE_NAME, createAccessToken(user), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      secure: __prod__,
      sameSite: 'none',
    });
    console.log(res);
    return user;
  }
  @Mutation(() => Boolean)
  Logout(@Ctx() { res }: context) {
    res.clearCookie(COOKIE_NAME);
    return true;
  }
  @Query(() => User, { nullable: true })
  async Me(@Ctx() { req }: context) {
    console.log(req.cookies);
    const { jid } = req.cookies;
    if (!jid) {
      return null;
    }
    const token = verify(jid, process.env.ACCESS_TOKEN!) as any;
    if (!token) {
      return null;
    }
    const user = await User.findOne({ id: token.userId });
    if (!user) {
      return null;
    }
    return user;
  }
}
