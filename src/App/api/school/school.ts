import { apiSlice } from '../EntryApi';
import type{SchoolsResponse} from '../../../Types/SchoolResponse';
import type{SchoolInformation} from '../../../Types/schoolProfile';
import type{PaginatedSchoolResponse} from '../../../Types/GetSchools';
import type{AllSeats} from '../spots/spot';

export type SchoolManager = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  district: string;
  profileImage: string | null;
};

export interface schooldetail{
 id: string;
  schoolName: string;
  schoolCode: string;
  schoolCategory: string; // e.g. "REB"
  schoolLevel: string[] | null; // e.g. ["Primary", "Nursery"]
  schoolType: string; // e.g. "Mixed"
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  email: string;
  telephone: string;
  status: 'approved' | 'rejected' | 'pending'; // narrow union is safer
  userId: string;
  approvedBy: string | null;
  approvedAt: string | null; // ISO date string
  rejectedReason: string | null;
  licenseDocument: string | null;
  deletedAt: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  SchoolManager: SchoolManager;
}

export interface schoolProfile{
  description:string;
  mission:string;
  vision:string;
  foundedYear:number;
  profilePhoto:string;
}

export interface SchoolDetailsResponse{
    data:schooldetail;
    message:string;
    success:boolean;
}

export interface RegisterSchoolResponse {
  message: string
  schoolId: string
}

export interface SearchSchoolsParams {
  schoolName?: string;
  district?: string;
  schoolType?: string;
  schoolLevel?: string;
  schoolCategory?: string;
  yearOfStudy?: string;
  academicYear?: string;
  combination?: string;
  studentType?: string;
  minAvailableSpots?: number;
  page?: number;
  limit?: number;
  // Current UI language ('rw'/'fr') - the backend machine-translates dynamic
  // fields (mission/vision/description) into this before responding.
  lang?: string;
}

export interface SearchSchoolResult {
  id: string;
  schoolName: string;
  schoolCode: string;
  schoolCategory: string | null;
  schoolLevel: string[] | null;
  schoolType: string | null;
  province: string | null;
  district: string;
  sector: string | null;
  cell: string | null;
  village: string | null;
  email: string;
  telephone: string | null;
  status: string;
  spots: AllSeats[];
  profile: {
    profilePhoto: string | null;
    mission: string | null;
    vision: string | null;
    description: string | null;
    foundedYear: number | null;
  } | null;
}

export interface SearchSchoolsData {
  schools: SearchSchoolResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchSchoolsResponse {
  data: SearchSchoolsData;
  message: string;
  success: boolean;
}

// Define the individual profile structure
interface Profile {
  id: string;
  foundedYear:string;
  profilePhoto:string;
  schoolId: string;
  description: string | null;
  mission: string | null;
  vision: string | null;
  // Add other properties here if needed
}

// Define the data object containing pagination info and profiles
interface ProfileData {
  limit: number;
  page: number;
  profiles: Profile[];
  total: number;
  totalPages: number;
}

// Define the full API response
interface ProfileResponse {
  data: ProfileData;
  message: string;
  success: boolean;
}


export const SchoolsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerSchool: builder.mutation<RegisterSchoolResponse , FormData>({
      query: (data) => ({
        url: '/schools/register',
        method: 'POST',
        body: data,
        headers: undefined,
      }),
    }),

      getSchoolDetails: builder.query<SchoolDetailsResponse, string>({
      query: (id) => ({
        url: `/schools/${id}`,
        method: 'GET',
      }),
    }),

      getAllApprovedSchool: builder.query<PaginatedSchoolResponse, void>({
      query: () => ({
        url: '/schools/approved',
        method: 'GET',
      }),
    }),

    searchSchools: builder.query<SearchSchoolsResponse, SearchSchoolsParams>({
      query: (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {query.set(key, String(value));}
        });
        return {
          url: `/schools/search?${query.toString()}`,
          method: 'GET',
        };
      },
    }),

       getProfile: builder.query<ProfileResponse, { id: string; lang?: string } | string>({
      query: (arg) => {
        const { id, lang } = typeof arg === 'string' ? { id: arg, lang: undefined } : arg;
        return {
          url: `/schools/${id}/profile${lang ? `?lang=${lang}` : ''}`,
          method: 'GET',
        };
      },
    }),

      getAllSchools: builder.query<SchoolsResponse, void>({
      query: () => ({
        url: '/schools',
        method: 'GET',
      }),
    }),

     getSchoolById: builder.query<SchoolDetailsResponse, string>({
      query: (id) => ({
        url: `/schools/${id}`,
        method: 'GET',
      }),
    }),

      ApproveSchool: builder.mutation<SchoolDetailsResponse, string>({
      query: (id) => ({
        url: `/schools/approve/${id}`,
        method: 'PATCH',
      }),
    }),

      RejectSchool: builder.mutation<SchoolDetailsResponse, {id:string, message:string}>({
      query: ({id , message}) => ({
        url: `/schools/reject/${id}`,
        method: 'PATCH',
        body:{ reason: message },
      }),
    }),
    
    UpdateProfile: builder.mutation<schoolProfile,{id:string, data:FormData}>({
      query: ({id , data}) => ({
        url: `/schools/${id}/profile`,
        method: 'PUT',
        body:data,
      }),
    }),
    
       UpdateSchoolInfo: builder.mutation<SchoolInformation,{id:string, data:Partial<SchoolInformation>}>({
      query: ({id , data}) => ({
        url: `/schools/${id}`,
        method: 'PUT',
        body:data,
      }),
    }),
  

     DeleteSchool: builder.mutation<SchoolDetailsResponse, string>({
      query: (id) => ({
        url: `/schools/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useRegisterSchoolMutation , useGetSchoolDetailsQuery , useGetAllSchoolsQuery , useGetSchoolByIdQuery , useApproveSchoolMutation , useRejectSchoolMutation , useDeleteSchoolMutation, useUpdateProfileMutation , useGetProfileQuery, useUpdateSchoolInfoMutation , useGetAllApprovedSchoolQuery, useSearchSchoolsQuery} = SchoolsApi;
