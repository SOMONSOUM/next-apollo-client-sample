import { createContext, PropsWithChildren, useContext, useState } from 'react';

export const TokenContext = createContext<{
  token?: string;
  setToken: (token: string) => void;
}>({ token: '', setToken: () => { } })

export function useToken() {
  return useContext(TokenContext);
}

export function TokenContainer(props: PropsWithChildren<{}>) {
  const [token, setToken] = useState(process.browser ? window.localStorage.getItem('token') || '' : '');

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken: token => {
          setToken(token);
          window.localStorage.setItem('token', token);
        },
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
}