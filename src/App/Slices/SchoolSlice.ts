import type { SchoolState } from '../../Types/SchoolType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: SchoolState = {
  schools: [
    {
      id: 1,
      name: 'Green valley',
      description:
        'Green Valley Academy is known for its focus on science and technology. The school provides modern labs, interactive classrooms, and strong extracurricular programs. Students are encouraged to be innovative while also developing leadership and teamwork skills.',
      availableSeats: 50,
    },
    {
      id: 2,
      name: 'Sunrise International School',
      description:
        'Sunrise International offers a diverse curriculum that combines local and international standards. It emphasizes language learning, cultural exchange, and global awareness. The school community values creativity and celebrates traditions from around the world.',
      availableSeats: 20,
    },
    {
      id: 3,
      name: 'Bright Future Secondary School',
      description:
        'Sunrise International offers a diverse curriculum that combines local and international standards. It emphasizes language learning, cultural exchange, and global awareness. The school community values creativity and celebrates traditions from around the world.',
      availableSeats: 30,
    },
  ],
};

const SchoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    addSchool: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        description: string;
        availableSeats: number;
      }>,
    ) => {
      state.schools.push({ ...action.payload, id: Date.now() });
    },
  },
});

export const { addSchool } = SchoolSlice.actions;
export default SchoolSlice.reducer;
