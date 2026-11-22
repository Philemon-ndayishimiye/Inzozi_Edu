import { createContext } from 'react';

type roleType={
    id:string;
    name:string;
}
// The user structure from your API
export type LoggedUserType = {
  id: string;
  name:string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  province: string;
  district: string;
  profileImage: string;
  roleId: string;
  role:roleType;
  schoolId: string;
  mustChangePassword?: boolean;
};

// API response structure
export type LoggedResponse = {
  data: LoggedUserType;
  message: string;
  success: boolean;
};

// The login endpoint returns a thinner user object than /users/me; context
// stores it as-is until the background /users/me refetch fills in the rest.
export type LoginUserPayload = {
  email: string;
  name: string;
  roleName: string;
  mustChangePassword?: boolean;
};

// Context type
export type UserCont = {
  user: LoggedUserType | null;
  token: string | null;
  // True only during the initial silent-refresh attempt on app load (trading
  // the httpOnly refresh cookie for an in-memory access token). Routes that
  // gate on `token` should wait for this before redirecting to /login, or a
  // plain page reload would always bounce an otherwise-still-logged-in user.
  bootstrapping: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  setUserFromLogin?: (payload: { user: LoginUserPayload; token: string }) => void;
  clearUser: () => void;
  refetchUser?: () => void;
};



// Create context with default values
export const UserContext = createContext<UserCont>({
  user: null,
  token: null,
  bootstrapping: true,
  loading: false,
  error: null,
  success: false,
  setUserFromLogin: () => {}, // default no-op
  clearUser: () => {},// default no-op
  refetchUser: () => {}, // default no-op
});
