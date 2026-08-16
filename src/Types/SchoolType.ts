export interface School {
  id: number;
  name: string;
  description: string;
  availableSeats: number;
}

export interface SchoolState {
  schools: School[];
}
