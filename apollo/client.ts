import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setting } from '../src/libs/settings'

export const client = new ApolloClient({
  uri: setting.api,
  cache: new InMemoryCache(),
})
