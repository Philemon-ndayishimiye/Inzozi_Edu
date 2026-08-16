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
};

// API response structure
export type LoggedResponse = {
  data: LoggedUserType;
  message: string;
  success: boolean;
};

// Context type
export type UserCont = {
  user: LoggedUserType | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  setUserFromLogin?: (payload: { user: LoggedUserType; token: string }) => void;
  clearUser: () => void;
};



// Create context with default values
export const UserContext = createContext<UserCont>({
  user: null,
  loading: false,
  error: null,
  success: false,
  setUserFromLogin: () => {}, // default no-op
  clearUser: () => {},// default no-op
});
