import { apiSlice } from '../EntryApi';
import type{SeatAvailability} from '../../../Pages/Admin/AddSeats';

export interface AllSeats {
  id:string;
  level: string;
  studentType: string;
  academicYear?: string;
  yearofstudy: string;
  totalSpots: string;
  occupiedSpots?: number;
  registrationOpen?: boolean;
  admissionConditions?: {
    minGrade?: string;
    requiredSubjects?: string[];
    examScore?: string;
    interviewRequired?: boolean;
    documents?: string[];
    notes?: string;
  };
}

export interface Seats {
  spots: AllSeats[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SeatsApiResponse {
  data: Seats;
  message: string;
  success: boolean;
}

export interface DeleteSpotInfo{
  success: boolean;
  message: string;
  data: string;
}


export const SpotsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
registerSpot: builder.mutation<SeatAvailability, { data: Partial<SeatAvailability>, id: string }>({
  query: ({ data, id }) => ({
    url: `/schools/${id}/spots`,
    method: 'POST',
    body: data, // RTK Query will serialize as JSON
  }),
}),

DeleteSpot: builder.mutation<DeleteSpotInfo, { schoolId:string, spotId: string }>({
  query: ({ schoolId, spotId }) => ({
    url: `/schools/${schoolId}/spots/${spotId}`,
    method: 'DELETE',
  }),
}),

UpdateSpot: builder.mutation<SeatAvailability, { schoolId: string, spotId: string, data: Partial<SeatAvailability> }>({
  query: ({ schoolId, spotId, data }) => ({
    url: `/schools/${schoolId}/spots/${spotId}`,
    method: 'PUT',
    body: data,
  }),
}),

getAllSpots: builder.query<SeatsApiResponse, string>({
      query: (id) => ({
        url: `/schools/${id}/spots`,
        method: 'GET',
      }),
 }),

  }),
});

export const {useRegisterSpotMutation , useGetAllSpotsQuery , useDeleteSpotMutation , useUpdateSpotMutation} = SpotsApi;
