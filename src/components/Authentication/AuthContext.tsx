import React, { useContext } from 'react';

const AuthContext = React.createContext<{
  me?: any;
}>({});

export default AuthContext;

export const useAuthContext = () => {
  const { me } = useContext(AuthContext);

  return { me };
};
