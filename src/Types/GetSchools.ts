export interface SchoolData {
  id: string; // UUID
  schoolName: string;
  schoolCode: string;
  email: string;
  profilePhoto:string,
  district: string;
  status: 'pending' | 'approved' | 'rejected';
  licenseDocument: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectedReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSchools {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  schools: SchoolData[];
}

export interface PaginatedSchoolResponse {
  data: PaginatedSchools;
  message: string;
  success: boolean;
}
