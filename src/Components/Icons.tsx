
import type{ReactNode} from 'react';

type IconsType={
    icons:ReactNode;
}

export default function Icons({icons}:IconsType) {
  return (
    <div className='bg-[#054069] w-[40px] h-[40px] flex justify-center rounded-xl text-white
     items-center'>{icons}</div>
  );
}
