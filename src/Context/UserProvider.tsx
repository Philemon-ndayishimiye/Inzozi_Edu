import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './LoggedUser';
import type { LoggedUserType } from './LoggedUser';
import { useGetLoggedUserQuery } from '../App/api/Auth/auth';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const { data, isError, isLoading, error, refetch } = useGetLoggedUserQuery(undefined, {
    skip: !token,
  });

  const [user, setUser] = useState<LoggedUserType | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setSuccess(false);
      setErrMsg(null);
      return;
    }

    if (data) {
      if (data.success) {
        setUser(data.data);
        setSuccess(true);
        setErrMsg(null);
      } else {
        setUser(null);
        setSuccess(false);
        setErrMsg(data.message || 'Failed to fetch user.');
      }
    } else if (isError) {
      setUser(null);
      setSuccess(false);
      const message =
        'status' in error && error.status === 401
          ? 'Unauthorized. Please login again.'
          : 'Failed to fetch user.';
      setErrMsg(message);
    }
  }, [data, isError, error, token]);

  useEffect(() => {
  if (token) {
    refetch();
  }
}, [token, refetch]);

 const setUserFromLogin = (payload: { user: LoggedUserType; token: string }) => {
  localStorage.setItem('token', payload.token);
  setToken(payload.token);
  setUser(payload.user);
  setSuccess(true);
  setErrMsg(null);
};


  const clearUser = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setSuccess(false);
    setErrMsg(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading: isLoading,
        error: errMsg,
        success,
        setUserFromLogin,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
