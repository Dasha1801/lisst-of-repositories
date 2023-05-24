import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization:
      'Bearer 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',
  },
  cache: new InMemoryCache(),
});

export const GET_REPOSITORIES = gql`
  query GetRepositoriesByName($repositoryName: String!) {
    search(query: $repositoryName, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          url
          pushedAt
          stargazerCount
          id
        }
      }
    }
  }
`;

export default client;
