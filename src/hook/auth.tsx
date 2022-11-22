import React, { useState, useContext, createContext } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import { TokenContext } from '../components/Authentication/TokenContext';
import createApolloClient from '../../apollo/client';
import Swal from 'sweetalert2';
import { setting } from '../libs/settings';

const authContext = createContext<{ isSignedIn?: any; signOut?: any; signIn?: any; createApolloClient?: any }>({});

export function AuthProvider({ children }: any) {
  const { token } = useContext(TokenContext);

  const auth = useProvideAuth(token);

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient(token)}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(token?: string) {
  const [authToken, setAuthToken] = useState<any>(token);

  const signOut = () => {
    setAuthToken(null);
  };

  const signIn = async ({ username, password }: any) => {
    const client = createApolloClient();

    const LOGIN_MUTATION = gql`
      mutation signIn($input: SignInInput) {
        signIn(input: $input) {
          token
        }
      }
    `;

    const result: any = await client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input: {
            username,
            password,
          },
        },
      })
      .catch(err => {
        const error = JSON.parse(err?.message);
        Swal.fire({
          icon: 'error',
          title: "Failed",
          text: `${error.errorMessage}`,
          footer: 'Click to see more',
          confirmButtonText: 'Ok',
        });
      });

    if (result?.data?.signIn?.token) {
      setAuthToken(result?.data?.signIn?.token);
      process.browser && localStorage.setItem('token', result?.data?.signIn?.token);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login to System',
        footer: `Welcome to ${setting.title}`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.replace(`/`);
      });
    }
  };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
  };
}
