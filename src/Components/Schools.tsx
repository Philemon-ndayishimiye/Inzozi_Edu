import { useSelector } from 'react-redux';
import type { RootState } from '../App/store/index';

export default function Schools() {
  const Schools = useSelector((state: RootState) => state.school.schools);
  return (
    <div>
      <h1 className="text-green-500 text-2xl">
        Hello philemon this is Inzozi School
      </h1>

      <div className="grid grid-cols-3 gap-5">
        {Schools.map((school) => (
          <div className="shadow-md p-4 px-3 py-2" key={school.id}>
            <h1 className="py-4">{school.name}</h1>
            <span className="text-5xl text-black">
              {school.availableSeats} <span className="text-sm">Seats</span>
            </span>
            <p className="text-[12px] py-5 ">{school.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
