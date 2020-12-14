import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
const link = createUploadLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/graphql'
      : 'https://setupy-api.heroku.app/graphql',
});
const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/graphql'
      : 'https://setupy-api.heroku.app/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);
