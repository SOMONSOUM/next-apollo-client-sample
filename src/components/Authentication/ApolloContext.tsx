import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren, useMemo } from 'react';
import createApolloClient from '../../../apollo/client';
import { useToken } from './TokenContext';

export default function ApolloContext(props: PropsWithChildren<{}>) {
  const { token } = useToken();
  const client = createApolloClient(token);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
