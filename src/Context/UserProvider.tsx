import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './LoggedUser';
import type { LoggedUserType, LoginUserPayload } from './LoggedUser';
import { useGetLoggedUserQuery, useRefreshMutation } from '../App/api/Auth/auth';
import { getAccessToken, setAccessToken } from '../App/api/tokenStore';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState<string | null>(() => getAccessToken());
  const [bootstrapping, setBootstrapping] = useState(true);
  const [refresh] = useRefreshMutation();

  const { data, isError, isLoading, error, refetch } = useGetLoggedUserQuery(undefined, {
    skip: !token,
  });

  const [user, setUser] = useState<LoggedUserType | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // The access token lives only in memory (tokenStore), so a page reload
  // wipes it. On mount, try the httpOnly refresh cookie once to silently
  // get a new one back before deciding the user is logged out.
  useEffect(() => {
    (async () => {
      try {
        const res = await refresh().unwrap();
        if (res.success && res.data?.token) {
          setAccessToken(res.data.token);
          setToken(res.data.token);
        }
      } catch {
        // No valid refresh cookie (never logged in, or it expired) - stay logged out.
      } finally {
        setBootstrapping(false);
      }
    })();
    // Only ever run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

 // The login endpoint returns a thinner user object than /users/me. We stash
 // what we have immediately (role/mustChangePassword are needed right away
 // for the post-login redirect); the token-change effect above triggers a
 // /users/me refetch that fills in the rest a moment later.
 const setUserFromLogin = (payload: { user: LoginUserPayload; token: string }) => {
  const [firstName = '', ...rest] = payload.user.name.split(' ');
  setAccessToken(payload.token);
  setToken(payload.token);
  setUser({
    id: '',
    name: payload.user.name,
    firstName,
    lastName: rest.join(' '),
    email: payload.user.email,
    gender: '',
    province: '',
    district: '',
    profileImage: '',
    roleId: '',
    role: { id: '', name: payload.user.roleName },
    schoolId: '',
    mustChangePassword: payload.user.mustChangePassword,
  });
  setSuccess(true);
  setErrMsg(null);
};


  const clearUser = () => {
    setAccessToken(null);
    setToken(null);
    setUser(null);
    setSuccess(false);
    setErrMsg(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        bootstrapping,
        loading: isLoading,
        error: errMsg,
        success,
        setUserFromLogin,
        clearUser,
        refetchUser: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
