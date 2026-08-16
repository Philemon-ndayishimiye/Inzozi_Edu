//import { IoIosArrowBack } from 'react-icons/io';
//import { Link } from 'react-router-dom';
import { useState } from 'react';
import profile from '../assets/profile.png';
import LogoutComp from './school/LogoutComp';
import { useUser } from '../Hooks/useUser';

const classVariant = {
  defoult: 'bg-[#0b4d7c]',
  primary: 'bg-primary-color',
};

type Navigation = {
  variant?: keyof typeof classVariant;
};

export default function ContNav({ variant = 'defoult' }: Navigation) {
   
  const {user}=useUser();
   const [open, setOpen] = useState(false);


  return (

    <>
     <div
      className={`px-[50px] flex justify-between py-2  ${classVariant[variant]}  border-none max-sm:hidden`}
    >
      {/* <div className='flex gap-1 justify-center items-center cursor-pointer' onClick={handleGoBack}>
        <div>
          <IoIosArrowBack className='text-2xl text-white'/>
        </div>
        <h1 className='text-white font-medium text-[16px]'>Back</h1>
      </div> */}

      <div className=" ml-[68%] flex gap-[60px]">
        <nav className="flex items-center text-white max-sm:hidden">
          <h1 className='text-white font-bold '>{user?.email}</h1>
        </nav>
        <div onClick={() => setOpen(!open)} className="flex items-center text-white">
          <div className="flex justify-center">
            <div className="flex justify-center items-center rounded-[50%]  w-[40px] h-[40px]">
              <img src={profile} className="w-[40px] h-[40px] rounded-[50%]" />
              <span className={`text-white text-[10px] cursor-pointer pt-1 pl-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>

            </div>
          </div>
        </div>
      </div>
    </div>

    {open &&(
      <div className='absolute top-14 right-0'>
        <LogoutComp/>
      </div>
    )}
    </>
   
  );
}
