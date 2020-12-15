import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { HelloResolver } from './resolvers/helloResolver';
import { UserResolver } from './resolvers/userResolver';
import { PostsResolver } from './resolvers/postsResolver';
import { context } from './utils/context';
import { __prod__ } from './utils/constants';
(async () => {
  const app = express();
  config();
  app.use(
    cors({
      credentials: true,
      origin: ['https://setupy.vercel.app', 'http://localhost:3000'],
    })
  );
  app.use(cookieParser());
  app.use(express.static('images'));
  await createConnection({
    type: 'postgres',
    host: !__prod__ ? process.env.DB_HOST : 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  });
  const apolloServer = new ApolloServer({
    introspection: true,
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostsResolver],
      validate: false,
    }),
    context: ({ req, res }: context) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`started on ${port}`);
  });
})();
