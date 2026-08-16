
import Works from './Works';
import { FiUserPlus } from 'react-icons/fi';
import { RiSchoolFill } from 'react-icons/ri';
import { FaRegFileAlt } from 'react-icons/fa';
import { WiDirectionRight } from 'react-icons/wi';
import { LuCircleCheckBig } from 'react-icons/lu';
export default function HowItWorks() {
  return (
    <div className="py-[90px] bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA]">
      <h1 className="text-[#282C34] text-[40px] text-center font-bold font-family-playfair max-sm:text-[40px]">
        How It Works
      </h1>
      <p className="text-[#6B7280] text-[20px] py-3 text-center mb-[30px] font-family-poppins max-sm:text-[18px]" >
        Simple steps to connect schools and families across Rwanda
      </p>

      <div className="flex justify-between px-[120px] py-[40px] max-sm:flex-col max-sm:px-[30px]">
        <div>
          <h1 className="text-[#1672b4] text-[30px] font-medium text-center py-5">
            For Parents
          </h1>

          <Works
            icon={<FiUserPlus />}
            step="Step 1"
            description=" with your family details and preferences"
            variant="defolt"
            title="Visit Our sites"
          />
          <Works
            icon={<RiSchoolFill />}
            step="Step 2"
            description="Explore schools that match your criteria and location"
            variant="defolt"
            title="Browse School"
          />
          <Works
            icon={<FaRegFileAlt />}
            step="Step 3"
            description="Apply to multiple schools with a single application"
            variant="defolt"
            title="Submit Application"
          />
          <Works
            icon={<LuCircleCheckBig />}
            step="Step 4"
            description="Monitor status and communicate with schools"
            variant="defolt"
            title="Track Progreess"
          />
        </div>
        <div>
            <h1 className="text-black text-[30px] font-medium text-center py-5">
            For Schools
          </h1>

          <Works
            icon={<RiSchoolFill />}
            step="Step 1"
            description="Create your school profile with programs and facilities"
            variant="primary"
            title="Register School"
          />
          <Works
            icon={< FaRegFileAlt/>}
            step="Step 2"
            description="Define admission criteria and application requirements"
            variant="primary"
            title="Set Requirements"
          />
          <Works
            icon={<FiUserPlus />}
            step="Step 3"
            description="Manage incoming applications through your dashboard"
            variant="primary"
            title="Review Application"
          />
          <Works
            icon={<LuCircleCheckBig />}
            step="Step 4"
            description="Send acceptance letters and manage enrollment"
            variant="primary"
            title="Accept Student"
          />
        </div>
      </div>
      <div className='mx-auto w-[1000px] h-[240px] bg-[#053F69] rounded-xl max-sm:w-[350px] max-sm:h-[255px]'>
         <h1 className='text-center text-white text-[32px] py-3 font-family-playfair max-sm:text-[27px]'>Connect. Apply. Grow</h1>
         <p className='text-[16px] text-[#6B7280] mb-[30px] text-center font-family-poppins max-sm:text-[14px]'>Inzozi bridges the gap between educational institutions and families, creating opportunities for every child in Rwanda.</p>

         <div className='flex justify-center items-center'>
            <div>
                <Works variant='secondly' icon={<RiSchoolFill/>}/>
                <h1 className='text-[#6B7280]'>Schools</h1>
            </div>
            <div>
                <WiDirectionRight className='text-3xl text-white'/>
            </div>
            <div>
                <div className='rounded-[50%] bg-gradient-to-b  w-[48px] h-[48px] flex justify-center items-center text-3xl  text-white from-slate-700 to-slate-500'>I</div>
                <h1 className='text-[#6B7280] pt-5'>Inzozi</h1>
            </div>
            <div>
                <WiDirectionRight className='text-3xl text-white'/>
            </div>
              <div>
                <Works variant='secondly' icon={<FiUserPlus/>}/>
                <h1 className='text-[#6B7280]'>Families</h1>
            </div>
         </div>

      </div>
    </div>
  );
}
