export interface SchoolManager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApprovedByAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface School {
  id: string;
  schoolName: string;
  district: string;
  status: 'pending' | 'approved' | 'rejected'; // extend if more statuses exist
  licenseDocument: string;
  approvedAt: string | null;
  SchoolManager: SchoolManager;
  ApprovedByAdmin: ApprovedByAdmin | null;
}

export interface SchoolsData {
  schools: School[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SchoolsResponse {
  data: SchoolsData;
  message: string;
  success: boolean;
}
