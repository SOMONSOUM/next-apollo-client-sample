import { gql, useQuery } from '@apollo/client';
import { PropsWithChildren, useContext } from 'react';
import AuthContext from './AuthContext';
import Notiflix from 'notiflix';
import { TokenContext } from './TokenContext';
import LoginScreen from '../../Screens/Authentication/LoginScreen';
import { Spinner } from 'reactstrap';

const ME = gql`
  query adminMe($token: String!) {
    adminMe(token: $token) {
      id
      email
      username
      fullname
      phoneNumber
      profilePicture
      roleName
      roleId
      roleAccess {
        read
        write
        modify
        remove
      }
    }
  }
`;

export default function LoginVerification(props: PropsWithChildren<{}>) {
  const { token } = useContext(TokenContext);

  const { data, loading } = useQuery(ME, {
    variables: {
      token
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      if (token === '') {
        Notiflix.Notify.failure('Failed');
      } else if (error) {
        Notiflix.Notify.failure('Please contact to you admin');
        localStorage.removeItem('token');
        window.location.reload();
      }
    },
  });

  if (loading || !data) return <Spinner className='mx-4 mt-4'>Loading...</Spinner>;

  if (data === undefined || data.adminMe === null) {
    return <LoginScreen />;
  }

  if (data && data?.adminMe) {
    return (
      <AuthContext.Provider
        value={{
          me: data?.adminMe,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }

  return null;
}
