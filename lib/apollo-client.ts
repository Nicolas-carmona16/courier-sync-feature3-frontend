import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { loadSession, refreshSession, isSessionExpired } from '@/lib/auth'

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8081/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  let session = loadSession()
  if (session && isSessionExpired(session)) {
    session = await refreshSession(session) || null
  }

  const token = session?.accessToken

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})
