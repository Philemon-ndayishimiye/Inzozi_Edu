
import type{Option} from '../Components/Select';

export const category:Option[] = [
   { value: '------', label: '--Category--' },
   { value: 'classroom', label: 'Classroom' },
   { value: 'library', label: 'Library' },
   { value: 'sports', label: 'Sports / Playground' },
   { value: 'dormitory', label: 'Dormitory / Hostel' },
   { value: 'computerLab', label: 'Computer Lab' },
   { value: 'dining', label: 'Dining Hall' },
   { value: 'administration', label: 'Administration Block' },
   { value: 'playground', label: 'Playground' },
];

export const categoryLabels: Record<string, string> = category.reduce(
  (acc, c) => ({ ...acc, [c.value]: c.label }),
  {} as Record<string, string>,
);
