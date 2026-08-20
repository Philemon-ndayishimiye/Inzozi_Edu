export interface SchoolInformation {
  // Basic Information
  schoolName: string;
  schoolCode: string;
  schoolCategory: 'REB' | 'RTB' | string; // restrict if only "REB", or keep string if more values
  schoolLevel: string[]; // e.g. ['Nursery', 'Primary'] - a school can offer several levels
  schoolType: string; // e.g., "mixed", "boys", "girls"

  // Location Details
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  // Contact Information
  email: string;
  telephone: string;

  // Documents
  licenseDocument?: string | null; // optional, since it might not always exist
}
