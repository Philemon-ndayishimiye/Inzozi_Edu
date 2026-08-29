import { apiSlice } from '../EntryApi';

export type StudentStatus = 'pending' | 'approved' | 'rejected';
export type StudentLevel = 'Nursery' | 'Primary' | 'O-level' | 'A-level';

export interface StudentRecord {
  id: string;
  trackingCode?: string;
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
  rejectedReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackApplicationResult {
  id: string;
  trackingCode: string;
  status: StudentStatus;
  firstName: string;
  lastName: string;
  level: StudentLevel;
  yearOfStudy: string;
  studentType: 'newcomer' | 'transfer';
  representerEmail: string;
  schoolName: string | null;
  rejectedReason: string | null;
  babyeyiDocument: string | null;
  submittedAt: string;
  decidedAt: string | null;
}

export interface TrackApplicationResponse {
  data: TrackApplicationResult;
  message: string;
  success: boolean;
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
        body: { reason: rejectionReason },
      }),
    }),

    trackApplication: builder.query<TrackApplicationResponse, { code: string; lang?: string }>({
      query: ({ code, lang }) => ({
        url: `/students/track/${code}${lang ? `?lang=${lang}` : ''}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useApplyStudentMutation,
  useGetPendingApplicationsQuery,
  useApproveApplicationMutation,
  useRejectApplicationMutation,
  useLazyTrackApplicationQuery,
} = StudentsApi;
