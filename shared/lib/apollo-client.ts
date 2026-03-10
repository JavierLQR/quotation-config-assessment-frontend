import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ error, operation }) => {
  if (error) {
    console.error(
      `[Apollo error] Operation: ${operation.operationName} — ${error.message}`,
    )
  }
})

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    'http://localhost:4000/api-v1/graphql',
})

let apolloClient: ApolloClient | null = null

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { errorPolicy: 'all' },
      query: { errorPolicy: 'all' },
    },
  })
}

export function getApolloClient() {
  if (typeof window === 'undefined') return createApolloClient()
  if (!apolloClient) apolloClient = createApolloClient()
  return apolloClient
}
