import { Arg, Resolver, Mutation, Query } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { PostsResponse } from '../utils/response';
import { Upload } from '../utils/context';
import { User } from '../entities/user';
import { Posts } from '../entities/posts';
import { createWriteStream } from 'fs';
@Resolver()
export class PostsResolver {
  @Query(() => PostsResponse)
  async GetPosts() {
    const posts = await Posts.find();
    if (!posts) {
      return {
        error: {
          message: 'Register and be the first one to add some posts',
        },
      };
    }
    return {
      posts,
    };
  }
  @Query(() => PostsResponse)
  async GetPostsByUser(@Arg('username') username: string) {
    let posts: Posts[];
    try {
      const userPosts = await Posts.find({ where: { username } });
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return {
          error: {
            message: 'Sorry this user does not exist :/',
          },
        };
      }
      if (userPosts.length < 1) {
        return {
          error: {
            message: 'Sorry the user has no posts :/',
          },
        };
      }
      posts = userPosts;
    } catch (e) {
      return {
        error: {
          message: e.message,
        },
      };
    }
    return {
      post: posts,
    };
  }
  @Mutation(() => PostsResponse)
  async CreatePosts(
    @Arg('picture') picture: string,
    @Arg('description') description: string,
    @Arg('username') username: string
  ) {
    let user: User;
    let newPost: Posts;
    // send in user's ID to test bc it isn't setting a cookie on the server
    // eventually replace with a `Me` Query or alternatively run me query when the modal is rendered and pass in userId
    try {
      const existingUser = await User.findOne({ where: { username } });
      if (!existingUser) {
        return {
          error: {
            message: 'you need to have an account to post',
          },
        };
      }
      if (description.length < 10) {
        return {
          error: {
            message: 'your description needs to be a bit longer buddy',
          },
        };
      }

      user = existingUser;
      console.log(user);
      const post = await Posts.insert({
        description,
        photoPath: picture,
        username,
      });
      const recentPost = await Posts.findOne({
        where: { id: post.generatedMaps[0].id },
      });
      if (!recentPost) {
        return {
          error: {
            message: 'failed to insert post',
          },
        };
      }
      newPost = recentPost;
    } catch (e) {
      return {
        error: {
          message: e.message,
        },
      };
    }

    return {
      post: newPost,
    };
  }
}
