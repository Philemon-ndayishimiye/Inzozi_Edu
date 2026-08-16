
import {apiSlice} from '../EntryApi.ts';

type galleryData ={
    id:string;
    isFeatured:string;
    category:string;
    caption:string;
    imageUrl:string;
    schoolId:string
}

type galleryResponse={
    data:galleryData;
    message:string;
    success:string;
}

export interface GalleryImage {
  id: string;
  schoolId: string;
  imageUrl: string;
  category: string;
  caption: string;
  isFeatured: boolean;
  order: number | null;
  deletedAt: string | null;
  createdAt: string; 
  updatedAt: string;
}

export interface getGalleryData {
  images: GalleryImage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface getGalleryResponse {
  data: getGalleryData;
  message: string;
  success: boolean;
}

export interface DeleteGalleryResponse{
    message:string;
    success:boolean;
}

export const GalleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
  addGallery: builder.mutation<galleryResponse,{ schoolId: string; data: FormData }>({
      query: ({data , schoolId}) => ({
        url: `/schools/${schoolId}/gallery`,
        method: 'POST',
        body: data,
      }),
    }),

   getAllGallery:builder.query<getGalleryResponse , string>({
    query:(schoolId)=>({
        url: `/schools/${schoolId}/gallery`,
        method:'GET',
    }),
   }),
  // response and arguments
   DeleteGallery:builder.mutation<DeleteGalleryResponse , {schoolId:string , id:string}>({
       query:({schoolId , id})=>({
          url:`/schools/${schoolId}/gallery/${id}`,
          method:'DELETE',
       }),
   }),

   UpdateGallery: builder.mutation<galleryResponse, { schoolId: string; id: string; data: FormData }>({
       query: ({ schoolId, id, data }) => ({
          url: `/schools/${schoolId}/gallery/${id}`,
          method: 'PUT',
          body: data,
       }),
   }),

  }),
});

export const {
  useAddGalleryMutation,useGetAllGalleryQuery,useDeleteGalleryMutation,useUpdateGalleryMutation,
} = GalleryApi;