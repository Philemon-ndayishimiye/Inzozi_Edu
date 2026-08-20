import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditProfileButton from '../../Components/schoolProfile/EditComp';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { TextInput } from '../../Components/seats/InputSeats';
import { SelectInput } from '../../Components/seats/SelectInput';
import LocationCascade from '../../Components/LocationCascade';
import {categ, Levels , schoolType} from '../../Types/Seats';
import { useGetProfileQuery,useGetSchoolDetailsQuery, useUpdateSchoolInfoMutation } from '../../App/api/school/school';
import { useUser } from '../../Hooks/useUser';
import type{SchoolInformation} from '../../Types/schoolProfile';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';


type ErrorResponse = { message?: string };

export default function SchoolProfile() {
  const { t } = useTranslation();
  const{user}=useUser();
  const{data:schoolDetails, refetch:refetchSchoolDetails}=useGetSchoolDetailsQuery(user?.schoolId ??skipToken);
  const[updateSchoolInfo, {isLoading: savingInfo, error: infoError}]=useUpdateSchoolInfoMutation();
  const { data} = useGetProfileQuery(user?.schoolId ?? skipToken);

    const[editSchoolInformation , setEditSchoolInformation]=useState(false);
    const[savedBanner , setSavedBanner]=useState(false);

   // Input handler (receives event)
const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, files } = e.target;

  if (type === 'file' && files) {
    setSchoolInfo((prev) => ({
      ...prev,
      [name]: files[0], // store the uploaded file object
    }));
  } else {
    setSchoolInfo((prev) => ({
      ...prev,
      [name]: value, // update text/email/number inputs
    }));
  }
};


// Select handler ()
const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>)=> {
  const { name, value } = e.target;
  setSchoolInfo((prev) => ({ ...prev, [name]: value }));
};

// Multi-select handler for levels - a school can offer several (e.g. Nursery + Primary)
const handleLevelToggle = (level: string) => {
  setSchoolInfo((prev) => ({
    ...prev,
    schoolLevel: prev.schoolLevel.includes(level)
      ? prev.schoolLevel.filter((l) => l !== level)
      : [...prev.schoolLevel, level],
  }));
};

  const[schoolInfo , setSchoolInfo]=useState<SchoolInformation>({
  schoolName:schoolDetails?.data.schoolName || '',
  schoolCode:schoolDetails?.data.schoolCode || '',
  schoolLevel:schoolDetails?.data.schoolLevel || [],
  schoolCategory:schoolDetails?.data.schoolCategory || '',
  schoolType: schoolDetails?.data.schoolType || '',
  province:schoolDetails?.data.province || '',
  district:schoolDetails?.data.district || '',
  sector:schoolDetails?.data.sector || '',
  cell:schoolDetails?.data.cell || '',
  village: schoolDetails?.data.village || '',
  email: schoolDetails?.data.email || '',
  telephone: schoolDetails?.data.telephone || '',
  licenseDocument:null,
  });

  // schoolDetails resolves asynchronously after mount, so the form state
  // needs to resync once real data arrives — otherwise the edit modal shows
  // blank fields even after the school's details have loaded.
  useEffect(() => {
    if (!schoolDetails?.data) {return;}
    setSchoolInfo((prev) => ({
      ...prev,
      schoolName: schoolDetails.data.schoolName || prev.schoolName,
      schoolCode: schoolDetails.data.schoolCode || prev.schoolCode,
      schoolLevel: schoolDetails.data.schoolLevel && schoolDetails.data.schoolLevel.length > 0 ? schoolDetails.data.schoolLevel : prev.schoolLevel,
      schoolCategory: schoolDetails.data.schoolCategory || prev.schoolCategory,
      schoolType: schoolDetails.data.schoolType || prev.schoolType,
      province: schoolDetails.data.province || prev.province,
      district: schoolDetails.data.district || prev.district,
      sector: schoolDetails.data.sector || prev.sector,
      cell: schoolDetails.data.cell || prev.cell,
      village: schoolDetails.data.village || prev.village,
      email: schoolDetails.data.email || prev.email,
      telephone: schoolDetails.data.telephone || prev.telephone,
    }));
  }, [schoolDetails]);

  const handleInformation =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const payload ={
      schoolName:schoolInfo.schoolName,
      schoolCode:schoolInfo.schoolCode,
      schoolLevel:schoolInfo.schoolLevel,
      email:schoolInfo.email,
      schoolCategory:schoolInfo.schoolCategory,
      schoolType:schoolInfo.schoolType,
      province:schoolInfo.province,
      telephone:schoolInfo.telephone,
      district:schoolInfo.district,
      sector:schoolInfo.sector,
      cell:schoolInfo.cell,
      village:schoolInfo.village,
    };
    try {
      await updateSchoolInfo({data:payload , id:user?.schoolId ?? ''}).unwrap();
      setEditSchoolInformation(false);
      refetchSchoolDetails();
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 3500);
    } catch {
      // error surfaced below via `infoError` from the mutation hook
    }

  };

  const infoErrorMessage =
    infoError && 'status' in (infoError as FetchBaseQueryError)
      ? (infoError as FetchBaseQueryError & { data: ErrorResponse }).data?.message || t('schoolProfilePage.failedToSave')
      : infoError
        ? t('schoolProfilePage.failedToSave')
        : '';

  return (
    <>
    <div>
        <div className='flex items-center justify-between pb-5'>
          <p className='text-gray-500 font-family-poppins'>{t('schoolProfilePage.manageIntro')}</p>
        </div>

        {savedBanner && (
          <div className="mb-5 flex items-center gap-2 bg-[#E7F5EA] border border-[#1E7A34]/30 text-[#1E7A34] rounded-lg px-4 py-3 text-[13px] font-semibold">
            <IoCheckmarkCircle /> {t('schoolProfilePage.infoUpdated')}
          </div>
        )}

        <div className='bg-white rounded-lg shadow-xl p-3 py-3 mb-6'>
           {data?.data.profiles.map((profile)=>(

            <div key={profile.id}>
           <div className='flex justify-center items-center py-5'>
              <div className='relative '>
               <img src={profile.profilePhoto?profile.profilePhoto:'/images/school.png'} alt="" className='rounded-[50%] h-[150px] w-[150px] object-cover' />
              </div>
           </div>


            <div>
              <div >
                 <h1 className='text-primary-color font-semibold text-center py-2 font-family-playfair text-[23px]'>{schoolDetails?.data.schoolName ?schoolDetails.data.schoolName :t('schoolProfilePage.schoolNameFallback')}</h1>
                 <p className='text-gray-500 text-center text-[14px] font-family-poppins'>{t('schoolProfilePage.founded', { year: profile.foundedYear || '—' })}</p>

              </div>

                <div className='flex justify-center py-2'>
                <Link to='/schoolAdmin/settings'>
                  <EditProfileButton label={t('schoolProfilePage.editInSettings')}/>
                </Link>
                </div>

            </div>

            <div className='px-7'>
                <div className=' pt-12 '>
                  <h2 className='text-primary-color font-bold text-[17px] py-2'>{t('schoolProfilePage.about')}</h2>
                  <h3 className='text-gray-500 text-[16px] font-medium pb-4'>{profile.description || t('schoolProfilePage.notWrittenYet')}</h3>
                  <div className='border-b border-gray-500'></div>
                </div>

                 <div className=' pt-3'>
                  <h2 className='text-primary-color font-bold text-[17px] py-2'>{t('schoolProfilePage.mission')}</h2>
                  <h3 className='text-gray-500 text-[16px] font-medium pb-4'>{profile.mission || t('schoolProfilePage.notWrittenYet')}</h3>
                </div>

                  <div className=' pt-3 pb-4'>
                  <h2 className='text-primary-color font-bold text-[17px] py-2'>{t('schoolProfilePage.vision')}</h2>
                  <h3 className='text-gray-500 text-[16px] font-medium pb-4'>{profile.vision || t('schoolProfilePage.notWrittenYet')}</h3>
                </div>

            </div>

            </div>

           ))}
        </div>

        <div className='bg-white rounded-lg shadow-xl p-3 py-3 px-7 '>

            <div className='flex justify-between py-8 '>
                <div>
                    <h1 className='font-family-playfair text-[27px] text-primary-color font-semibold'>{t('schoolProfilePage.schoolInformation')}</h1>
                    <h2 className='text-gray-500 py-3 font-family-poppins'>{t('schoolProfilePage.basicInstitutionalDetails')}</h2>
                </div>
                <div>
                    <EditProfileButton label={t('schoolProfilePage.updateInformation')} onClick={()=>setEditSchoolInformation(true)}/>
                </div>


            </div>

            <h1 className='text-primary-color font-bold text-[16px]'>{t('schoolProfilePage.basicInformation')}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-4'>
                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.schoolName')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.schoolName ?schoolDetails.data.schoolName :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.category')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.schoolCategory ?schoolDetails.data.schoolCategory :t('schoolProfilePage.notSpecified')}</h3>
                        </div>

                         <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.type')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.schoolType ?schoolDetails.data.schoolType :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                    </div>

                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.schoolCode')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.schoolCode ?schoolDetails.data.schoolCode :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                          <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.levels')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.schoolLevel && schoolDetails.data.schoolLevel.length > 0 ? schoolDetails.data.schoolLevel.join(', ') : t('schoolProfilePage.notSpecified')}</h3>
                        </div>


                    </div>

            </div>
            <div className='border-b border-gray-200 pt-3'></div>

             <h1 className='text-primary-color font-bold text-[16px] pt-7'>{t('schoolProfilePage.locationDetails')}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-4'>
                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.province')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.province ?schoolDetails.data.province :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.sector')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.sector ?schoolDetails.data.sector :t('schoolProfilePage.notSpecified')}</h3>
                        </div>

                         <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.village')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.village ?schoolDetails.data.village :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                    </div>

                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.district')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.district ?schoolDetails.data.district :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                          <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.cell')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.cell ?schoolDetails.data.cell :t('schoolProfilePage.notSpecified')}</h3>
                        </div>


                    </div>

            </div>
            <div className='border-b border-gray-200 pt-3'></div>

            <h1 className='text-primary-color font-bold text-[16px] pt-7'>{t('schoolProfilePage.contactInformation')}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-4'>
                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.email')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.email ?schoolDetails.data.email :t('schoolProfilePage.notSpecified')}</h3>
                        </div>
                    </div>

                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.telephoneNumber')}</h1>
                            <h3 className='font-semibold text-[16px]'>{schoolDetails?.data.telephone ?schoolDetails.data.telephone :t('schoolProfilePage.notSpecified')}</h3>
                        </div>

                    </div>

            </div>
            <div className='border-b border-gray-200 pt-3'></div>

                 <h1 className='text-primary-color font-bold text-[16px] pt-7'>{t('schoolProfilePage.legalDocuments')}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-4'>
                    <div className='py-3'>
                        <div className='pt-2'>
                            <h1 className='text-gray-400 font-semibold text-[14px]'>{t('schoolProfilePage.licenseDocument')}</h1>
                            {schoolDetails?.data.licenseDocument ? (
                              <a
                                href={schoolDetails.data.licenseDocument}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[15px] text-[#05416B] underline"
                              >
                                {t('schoolProfilePage.viewDocument')}
                              </a>
                            ) : (
                              <h3 className='font-semibold text-[16px]'>{t('schoolProfilePage.notSpecified')}</h3>
                            )}
                        </div>
                    </div>

            </div>



        </div>
     </div>

  {editSchoolInformation && (
  <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center px-4">
    <div className="bg-white p-6 rounded-xl shadow-lg z-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
       <div className='flex justify-between pb-7'>
        <div>
         <h1 className='text-primary-color font-bold font-family-playfair py-2 text-[23px]'>{t('schoolProfilePage.updateSchoolInformation')}</h1>
         <h3 className='text-gray-500 font-medium text-[16px]'>{t('schoolProfilePage.editModalSubtitle')}</h3>
        </div>

         <IoClose className='text-2xl cursor-pointer hover:text-red-600' onClick={()=>setEditSchoolInformation(false)}/>
       </div>

       {infoErrorMessage && (
         <div className="mb-5 bg-[#FBEAE8] border border-[#B10E1E]/30 text-[#B10E1E] rounded-lg px-4 py-3 text-[13px] font-semibold">
           {infoErrorMessage}
         </div>
       )}

       <div>
        <form onSubmit={handleInformation}>
         <div>
           <h2 className='text-primary-color font-bold font-family-playfair text-[17px]' >{t('schoolProfilePage.basicInformation')}</h2>
         </div>
           <div className='pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <TextInput label={t('schoolProfilePage.schoolName')} placeholder={t('schoolProfilePage.enterSchoolName')} name='schoolName' value={schoolInfo.schoolName} onChange={handleInfoChange}/>
            <TextInput label={t('schoolProfilePage.schoolCode')} placeholder={t('schoolProfilePage.enterSchoolCode')} onChange={handleInfoChange} name='schoolCode' value={schoolInfo.schoolCode}/>
           </div>

           <div className='pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
             <SelectInput options={categ} label={t('schoolProfilePage.category')} onChange={handleSelectChange} name='schoolCategory' value={schoolInfo.schoolCategory}/>
             <SelectInput options={schoolType} label={t('schoolProfilePage.type')} placeholder='e.g., mixed' name='schoolType' value={schoolInfo.schoolType} onChange={handleSelectChange}/>
           </div>

           <div className='pt-3'>
             <h1 className='text-gray-500 font-semibold text-[14px] pb-2'>{t('schoolProfilePage.levelsOffered')}</h1>
             <div className='flex flex-wrap gap-3'>
               {Levels.map((level) => (
                 <label
                   key={level.value}
                   className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-[13.5px] font-family-poppins ${
                     schoolInfo.schoolLevel.includes(level.value)
                       ? 'border-[#05416B] bg-[#CFDCEA]/40 text-[#05416B] font-semibold'
                       : 'border-gray-300 text-gray-600'
                   }`}
                 >
                   <input
                     type='checkbox'
                     className='accent-[#05416B]'
                     checked={schoolInfo.schoolLevel.includes(level.value)}
                     onChange={() => handleLevelToggle(level.value)}
                   />
                   {level.label}
                 </label>
               ))}
             </div>
           </div>

           <div className='py-5'><h1 className='text-primary-color font-bold font-family-playfair text-[17px]'>{t('schoolProfilePage.locationDetails')}</h1></div>

           <LocationCascade
             value={{ province: schoolInfo.province, district: schoolInfo.district, sector: schoolInfo.sector, cell: schoolInfo.cell }}
             onChange={(next) => setSchoolInfo((prev) => ({ ...prev, province: next.province ?? '', district: next.district ?? '', sector: next.sector ?? '', cell: next.cell ?? '' }))}
             levels={4}
           />
           <TextInput label={t('schoolProfilePage.village')} placeholder={t('schoolProfilePage.enterVillage')} value={schoolInfo.village} name='village' onChange={handleInfoChange}/>

          <div className='py-5'><h1 className='text-primary-color font-bold font-family-playfair text-[17px]'>{t('schoolProfilePage.contactInformation')}</h1></div>

         <div className='pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <TextInput label={t('schoolProfilePage.email')} placeholder='example@gmail.com' type='email' name='email' value={schoolInfo.email} onChange={handleInfoChange}/>
            <TextInput label={t('schoolProfilePage.phoneNumber')} placeholder='+2507888876' name='telephone' value={schoolInfo.telephone} onChange={handleInfoChange}/>
        </div>

        <div className='flex justify-end mr-8 pt-6'>
            <EditProfileButton label={savingInfo ? t('schoolProfilePage.saving') : t('schoolProfilePage.saveInformation')} type='submit' disabled={savingInfo} loading={savingInfo}/>
        </div>
        </form>
       </div>
    </div>
  </div>
)}


</>
  );
}
