
import { useTranslation } from 'react-i18next';
import Works from './Works';
import { FiUserPlus } from 'react-icons/fi';
import { RiSchoolFill } from 'react-icons/ri';
import { FaRegFileAlt } from 'react-icons/fa';
import { WiDirectionRight } from 'react-icons/wi';
import { LuCircleCheckBig } from 'react-icons/lu';
export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <div className="py-[90px] bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA]">
      <h1 className="text-[#282C34] text-[40px] text-center font-bold font-family-playfair max-sm:text-[40px]">
        {t('howItWorks.title')}
      </h1>
      <p className="text-[#6B7280] text-[20px] py-3 text-center mb-[30px] font-family-poppins max-sm:text-[18px]" >
        {t('howItWorks.subtitle')}
      </p>

      <div className="flex justify-between px-[120px] py-[40px] max-sm:flex-col max-sm:px-[30px]">
        <div>
          <h1 className="text-[#1672b4] text-[30px] font-medium text-center py-5">
            {t('howItWorks.forParents')}
          </h1>

          <Works
            icon={<FiUserPlus />}
            step={t('howItWorks.step', { n: 1 })}
            description={t('howItWorks.p1Desc')}
            variant="defolt"
            title={t('howItWorks.p1Title')}
          />
          <Works
            icon={<RiSchoolFill />}
            step={t('howItWorks.step', { n: 2 })}
            description={t('howItWorks.p2Desc')}
            variant="defolt"
            title={t('howItWorks.p2Title')}
          />
          <Works
            icon={<FaRegFileAlt />}
            step={t('howItWorks.step', { n: 3 })}
            description={t('howItWorks.p3Desc')}
            variant="defolt"
            title={t('howItWorks.p3Title')}
          />
          <Works
            icon={<LuCircleCheckBig />}
            step={t('howItWorks.step', { n: 4 })}
            description={t('howItWorks.p4Desc')}
            variant="defolt"
            title={t('howItWorks.p4Title')}
          />
        </div>
        <div>
            <h1 className="text-black text-[30px] font-medium text-center py-5">
            {t('howItWorks.forSchools')}
          </h1>

          <Works
            icon={<RiSchoolFill />}
            step={t('howItWorks.step', { n: 1 })}
            description={t('howItWorks.s1Desc')}
            variant="primary"
            title={t('howItWorks.s1Title')}
          />
          <Works
            icon={< FaRegFileAlt/>}
            step={t('howItWorks.step', { n: 2 })}
            description={t('howItWorks.s2Desc')}
            variant="primary"
            title={t('howItWorks.s2Title')}
          />
          <Works
            icon={<FiUserPlus />}
            step={t('howItWorks.step', { n: 3 })}
            description={t('howItWorks.s3Desc')}
            variant="primary"
            title={t('howItWorks.s3Title')}
          />
          <Works
            icon={<LuCircleCheckBig />}
            step={t('howItWorks.step', { n: 4 })}
            description={t('howItWorks.s4Desc')}
            variant="primary"
            title={t('howItWorks.s4Title')}
          />
        </div>
      </div>
      <div className='mx-auto w-[1000px] h-[240px] bg-[#053F69] rounded-xl max-sm:w-[350px] max-sm:h-[255px]'>
         <h1 className='text-center text-white text-[32px] py-3 font-family-playfair max-sm:text-[27px]'>{t('howItWorks.connectTitle')}</h1>
         <p className='text-[16px] text-[#6B7280] mb-[30px] text-center font-family-poppins max-sm:text-[14px]'>{t('howItWorks.connectBody')}</p>

         <div className='flex justify-center items-center'>
            <div>
                <Works variant='secondly' icon={<RiSchoolFill/>}/>
                <h1 className='text-[#6B7280]'>{t('howItWorks.schools')}</h1>
            </div>
            <div>
                <WiDirectionRight className='text-3xl text-white'/>
            </div>
            <div>
                <div className='rounded-[50%] bg-gradient-to-b  w-[48px] h-[48px] flex justify-center items-center text-3xl  text-white from-slate-700 to-slate-500'>I</div>
                <h1 className='text-[#6B7280] pt-5'>{t('howItWorks.brand')}</h1>
            </div>
            <div>
                <WiDirectionRight className='text-3xl text-white'/>
            </div>
              <div>
                <Works variant='secondly' icon={<FiUserPlus/>}/>
                <h1 className='text-[#6B7280]'>{t('howItWorks.families')}</h1>
            </div>
         </div>

      </div>
    </div>
  );
}
