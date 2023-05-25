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
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            pushedAt
            id
            url
            owner {
              avatarUrl
              login
            }
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              nodes {
                name
              }
            }
            description
          }
        }
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
  query GetUserRepos($username: String!, $after: String) {
    user(login: $username) {
      repositories(
        first: 100
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          stargazerCount
          pushedAt
          id
          url
          owner {
            avatarUrl
            login
          }
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
            }
          }
          description
        }
      }
    }
  }
`;

export default client;
