import { gql, useMutation } from '@apollo/client';
import {
  Container,
  Button,
} from 'reactstrap'
import { useToken } from '../../components/Authentication/TokenContext';

const MUTATION = gql`
  mutation signOut($token: String!) {
    signOut(token: $token)
  }
`;

export const DashboardScreen = () => {
  const [signOut] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.signOut) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    },
  });

  const { token } = useToken();

  const onLogout = () => {
    signOut({
      variables: {
        token,
      },
    });
  };

  return (
    <Container fluid>
      <h1 className='text-center mt-4'>Sala Portal</h1>
      <Button className='btn-danger' onClick={onLogout}>Logout</Button>
    </Container>
  )
}