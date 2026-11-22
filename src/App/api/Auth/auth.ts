import {apiSlice} from '../EntryApi.ts';
import type{LoggedResponse} from '../../../Context/LoggedUser.tsx';

// The login response's `user` is a thin object, not the full LoggedUserType
// returned by /users/me — only what's needed for the immediate post-login
// redirect decision (role/subscription/must-change-password gating).
export type LoginUser = {
  email: string;
  name: string;
  roleName: string;
  mustChangePassword: boolean;
};

export type LoginResponseData = {
  user: LoginUser;
  token: string;
  schoolStatus?: 'not_registered' | 'pending' | 'approved' | 'rejected';
};

export type RefreshResponse = {
  data: { token: string } | null;
  message: string;
  success: boolean;
};

export type LoginResponse = {
  data: LoginResponseData;
  message: string;
  success: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const LoginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    Logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Trades the httpOnly refresh-token cookie (sent automatically by the
    // browser) for a new access token. Used both for silent reauth on a
    // 401 (see EntryApi's baseQueryWithReauth) and to rehydrate the
    // in-memory access token on app load, since that memory is wiped by a
    // page reload.
    Refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    VerifyOtp: builder.mutation({
      query: (otp:number) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body:{otp},
      }),
    }),
    getLoggedUser: builder.query<LoggedResponse, void>({
  query: () => ({
    url: '/users/me',
    method: 'GET',
  }),
}),

     ResetePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
     Registration: builder.mutation({
      query: (data) => ({
        url: '/users/school-manager',
        method: 'POST',
        body: data,
      }),
    }),
    
    ForgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body:data,
      }),
    }),
  }),
});

export const {
 useLoginMutation , useGetLoggedUserQuery, useRegistrationMutation, useLogoutMutation , useForgotPasswordMutation , useResetePasswordMutation, useVerifyOtpMutation, useRefreshMutation,
} = LoginApi;