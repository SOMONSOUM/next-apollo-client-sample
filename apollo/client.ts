import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setting } from '../src/libs/settings'

export default function createApolloClient(token = '') {
  const uri = setting.api + '?token=' + token

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  })
}
