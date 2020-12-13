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
(async () => {
  const app = express();
  config();
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:8000/graphql'],
    })
  );
  app.use(cookieParser());
  app.use(express.static('images'));
  await createConnection();
  const apolloServer = new ApolloServer({
    introspection: true,
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostsResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`started on ${port}`);
  });
})();
