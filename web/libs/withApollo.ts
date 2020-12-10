import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);
