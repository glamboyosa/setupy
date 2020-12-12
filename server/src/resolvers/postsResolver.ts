import { Arg, Resolver, Mutation, Query } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { PostsResponse } from '../utils/response';
import { Upload } from '../utils/context';
import { User } from '../entities/user';
import { Posts } from '../entities/posts';
import { createWriteStream } from 'fs';
@Resolver()
export class PostsResolver {
  @Mutation(() => PostsResponse)
  async CreatePosts(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Arg('description') description: string,
    @Arg('userId') userId: number
  ) {
    let user: User;
    // send in user's ID to test bc it isn't setting a cookie on the server
    // eventually replace with a `Me` Query or alternatively run me query when the modal is rendered and pass in userId
    try {
      const existingUser = await User.findOne({ where: { id: userId } });
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
    } catch (e) {
      return {
        error: {
          message: e.message,
        },
      };
    }
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on('finish', async () => {
          const post = await Posts.insert({
            description,
            photoPath: filename,
            user,
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
          user.posts = [...user.posts, recentPost];
          return resolve({
            recentPost,
          });
        })
        .on('error', () => reject(false))
    );
  }
}