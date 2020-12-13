import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
const link = createUploadLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/graphql'
      : 'https://setupy-api.vercel.app/graphl',
});
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);
