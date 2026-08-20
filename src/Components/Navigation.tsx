// import { FaUser } from 'react-icons/fa6';
import logo from '../assets/logo 2.png';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Language from './Language';

const classVariant ={
  defoult:'bg-[#0b4d7c]',
  primary:'bg-primary-color',
};

type Navigation={
  variant?:keyof typeof classVariant
};

export default function Navigation({variant='defoult'}:Navigation) {

  const languages =[
     {label:'English' , value:'English'},
     {label:'Kinyarwanda' , value:'kinyarwanda'},
     {label:'French' , value:'French'},
  ];
  const [open, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleSelect = (value: string) => {
    setSelectedLanguage(value);
    const selected = languages.find((lang) => lang.value === value);
    console.log('Selected Language:', selected?.label);
  };

  const handleClick = () => {
    setIsOpen(!open);
  };
  return (
    <>
      <div className={` fixed w-full z-50 px-[50px] flex justify-between py-2  ${classVariant[variant]}  border-none max-sm:hidden`}>
        <Link to='/'>
          <div className="flex items-center">
          <div className="text-white font-bold text-xl">
            <img className="w-[70px]" src={logo} />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="m-0 font-bold text-[25px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent max-sm:text-[18px]">
              inzozI
            </h1>
            <span className="m-0 text-[11px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent font-semibold max-sm:text-[8px]">
              Smart Dreams. Bright Futures
            </span>
          </div>
        </div>
        </Link>

        <nav className="flex items-center gap-[32px] text-white max-sm:hidden">
          <Link to='/'><a className="text-[15px] font-family-poppins" href="#">
            Home
          </a></Link>
          <a className="text-[15px] font-family-poppins" href="#howitWorks">
            How It Works
          </a>
          <Link to='/track' className="text-[15px] font-family-poppins">
            Track Application
          </Link>
            <Language options={languages} value={selectedLanguage} variant='defoult' onChange={handleSelect} />
        </nav>
        <div className="flex items-center text-white">
         <Link to='/login' className="text-[15px] font-family-poppins"> 
            Login
          </Link>

         {/* <Link to='/login'> <div className='flex justify-center'>
            <div className='flex justify-center items-center rounded-[50%] bg-[#D9D9D9] w-[40px] h-[40px]'><FaUser className='text-2xl  text-[#605F5F]'/></div>
            <div className='text-[12px] pt-3 pl-1 text-[#605F5F]' >▼</div>
          </div>
          </Link> */}
        </div>
      </div>
   {/* phone responsiveness */}
      <div className=" px-4 py-3 bg-[#0b4d7c] text-white text-3xl  max-sm:block max-md:hidden max-lg:hidden max-xl:hidden max-2xl:hidden">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              {' '}
              {open ? (
                <IoClose className='pt-1 text-4xl' onClick={handleClick} />
              ) : (
                <IoMdMenu className='pt-1 text-4xl' onClick={handleClick} />
              )}
            </div>

            <div>
              <div className="flex items-center">
                <div className="text-white font-bold text-xl">
                  <img className="w-[70px]" src={logo} />
                </div>
                <div className="flex flex-col gap-0">
                  <h1 className="m-0 font-bold text-[25px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent max-sm:text-[18px]">
                    inzozI
                  </h1>
                  <span className="m-0 text-[11px] leading-none bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] bg-clip-text text-transparent font-semibold max-sm:text-[8px]">
                    Smart Dreams. Bright Futures
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Language options={languages} variant='defoult' value={selectedLanguage} onChange={handleSelect} />
        </div>

      </div>
<div className="max-sm:block max-md:hidden max-lg:hidden max-xl:hidden max-2xl:hidden">
  {open && (
    <div className="flex flex-col gap-3  h-[100vh]">
      <a className="text-[15px] pt-3 font-family-poppins px-4 py-2 hover:bg-[#0b4d7c] hover:text-white " href="#">
        Home
      </a>
      <a className="text-[15px] font-family-poppins px-4 py-2 hover:bg-[#0b4d7c] hover:text-white" href="#">
        How It Works
      </a>
      <Link to='/track' className="text-[15px] font-family-poppins px-4 py-2 hover:bg-[#0b4d7c] hover:text-white">
        Track Application
      </Link>
      <Link to='/login' className="text-[15px] font-family-poppins px-4 py-2 hover:bg-[#0b4d7c] hover:text-white">
        Login
      </Link>
    </div>
  )}
</div>
      
    </>
  );
}
