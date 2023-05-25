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
  query GetRepositories(
    $repositoryName: String!
    $first: Int!
    $after: String
  ) {
    search(
      query: $repositoryName
      type: REPOSITORY
      first: $first
      after: $after
    ) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_REPOSITORIES_COUNT = gql`
  query GetRepositoryCount($repositoryName: String!) {
    search(query: $repositoryName, type: REPOSITORY) {
      repositoryCount
    }
  }
`;

export const GET_MY_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $first: Int!, $after: String) {
    user(login: $username) {
      repositories(first: $first, after: $after) {
        totalCount
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export default client;
