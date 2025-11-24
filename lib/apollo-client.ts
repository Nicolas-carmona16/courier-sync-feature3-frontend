import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { loadSession, refreshSession, isSessionExpired } from '@/lib/auth'
import { demoMockLink } from '@/lib/demo-mock'

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8081/graphql',
})
// Demo por defecto; solo se desactiva con NEXT_PUBLIC_DEMO_MODE="false"
const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false"

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

const link = isDemo ? demoMockLink() : authLink.concat(httpLink)

export const apolloClient = new ApolloClient({
  link,
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
