import { apiSlice } from '../EntryApi';

export type StudentStatus = 'pending' | 'approved' | 'rejected';
export type StudentLevel = 'Nursery' | 'Primary' | 'O-level' | 'A-level';

export interface StudentRecord {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  DOB: string;
  studentType: 'newcomer' | 'transfer';
  level: StudentLevel;
  status: StudentStatus;
  schoolId: string;
  schoolSpotId?: string;
  fathersNames?: string;
  mothersNames?: string;
  representerEmail?: string;
  representerPhone?: string;
  nationality?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  passportPhoto?: string | null;
  resultSlip?: string | null;
  previousReport?: string | null;
  mitationLetter?: string | null;
  babyeyiDocument?: string | null;
  rejectionReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentResponse {
  data: StudentRecord;
  message: string;
  success: boolean;
}

export interface PendingApplicationsResponse {
  data: StudentRecord[];
  message: string;
  success: boolean;
}

export const StudentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyStudent: builder.mutation<StudentResponse, FormData>({
      query: (data) => ({
        url: '/students/apply',
        method: 'POST',
        body: data,
      }),
    }),

    getPendingApplications: builder.query<PendingApplicationsResponse, void>({
      query: () => ({
        url: '/students/applications/pending',
        method: 'GET',
      }),
    }),

    approveApplication: builder.mutation<StudentResponse, { studentId: string; babyeyiDocument: File }>({
      query: ({ studentId, babyeyiDocument }) => {
        const form = new FormData();
        form.append('babyeyiDocument', babyeyiDocument);
        return {
          url: `/students/${studentId}/approve`,
          method: 'PUT',
          body: form,
        };
      },
    }),

    rejectApplication: builder.mutation<StudentResponse, { studentId: string; rejectionReason: string }>({
      query: ({ studentId, rejectionReason }) => ({
        url: `/students/${studentId}/reject`,
        method: 'PUT',
        body: { rejectionReason },
      }),
    }),
  }),
});

export const {
  useApplyStudentMutation,
  useGetPendingApplicationsQuery,
  useApproveApplicationMutation,
  useRejectApplicationMutation,
} = StudentsApi;
