import { apiSlice } from '../EntryApi';

export interface RemoteUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  province: string | null;
  district: string;
  profileImage: string | null;
  roleId: string;
  schoolId: string | null;
  createdAt: string;
  updatedAt: string;
  role: { id: string; name: string };
  School?: { id: string; schoolName: string } | null;
}

export interface GetUsersResponse {
  data: RemoteUser[];
  message: string;
  success: boolean;
}

export interface GetUserByIdResponse {
  data: RemoteUser;
  message: string;
  success: boolean;
}

export interface CreateAdmissionManagerRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female' | 'Other';
  district: string;
  schoolId: string;
}

export interface CreateAdmissionManagerResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    district: string;
    schoolId: string;
    roleName: string;
    createdAt: string;
  };
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: 'Male' | 'Female' | 'Other';
  province?: string;
  district?: string;
  profileImage?: string;
  schoolId?: string;
}

export const UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({ url: '/users', method: 'GET' }),
    }),

    getUserById: builder.query<GetUserByIdResponse, string>({
      query: (userId) => ({ url: `/users/${userId}`, method: 'GET' }),
    }),

    createAdmissionManager: builder.mutation<
      CreateAdmissionManagerResponse,
      { schoolId: string; data: CreateAdmissionManagerRequest }
    >({
      query: ({ schoolId, data }) => ({
        url: `/users/${schoolId}/admission-manager`,
        method: 'POST',
        body: data,
      }),
    }),

    updateUser: builder.mutation<GetUserByIdResponse, { userId: string; data: UpdateUserRequest | FormData }>({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteUser: builder.mutation<{ message: string; success: boolean }, string>({
      query: (userId) => ({ url: `/users/${userId}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateAdmissionManagerMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UsersApi;
