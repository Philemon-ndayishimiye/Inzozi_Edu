import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getAccessToken, setAccessToken } from './tokenStore';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // Required so the browser sends/accepts the httpOnly refresh-token cookie
  // on cross-origin requests (frontend and backend run on different ports).
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// The access token is short-lived (30min) and kept in memory only. On a
// 401, try once to silently trade the httpOnly refresh-token cookie for a
// new access token before giving up - most 401s are just an expired access
// token mid-session, not a real logout.
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);
    const refreshData = refreshResult.data as { success: boolean; data?: { token: string } } | undefined;

    if (refreshData?.success && refreshData.data?.token) {
      setAccessToken(refreshData.data.token);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      setAccessToken(null);
      window.location.href = '/login';
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Gallery'],
  endpoints: () => ({}),
});
