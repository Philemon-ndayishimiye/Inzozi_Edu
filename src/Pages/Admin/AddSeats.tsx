

import { TextInput } from '../../Components/seats/InputSeats';
import { SelectInput } from '../../Components/seats/SelectInput';
import {Levels, StudentType, MinimumGrade} from '../../Types/Seats';
import {Button} from '../../Components/seats/AddSeats';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegisterSpotMutation } from '../../App/api/spots/spot';
import { useUser } from '../../Hooks/useUser';

interface ErrorState {
  level: string;
  studentType: string;
  academicYear: string;
  yearofstudy: string;
  totalSpots: string;
}

export interface AdmissionConditions {
minGrade?: string;
requiredSubjects?: string[];
examScore?: string; // e.g. "75%"
interviewRequired?: boolean;
documents?: string[]; // <-- array of document names (checkboxes)
notes?: string;
}


export interface SeatAvailability {
// first five fields are required (non-optional)
level:string;
studentType: string;
academicYear: string;
yearofstudy: string;
totalSpots: number;


// optional fields
occupiedSpots?: number;
registrationOpen?: boolean;
waitingListCount?: number;
combination?: string[]; // use checkboxes for multiple combinations
admissionConditions?: AdmissionConditions;
}

  

export default function AddSeats() {
 
  const navigate =useNavigate();
  const{user}=useUser();
  const[registerSpot, {isLoading: submitting}]=useRegisterSpotMutation();
    // handle select 
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

// toogle document

function toggleDocument(value: string) {
  setFormData((prev) => {
    const docs = prev.admissionConditions?.documents || [];
    const next = docs.includes(value) ? docs.filter((d) => d !== value) : [...docs, value];

    return {
      ...prev,
      admissionConditions: {
        ...(prev.admissionConditions || {}),
        documents: next.length > 0 ? next : undefined,
      },
    };
  });
}


    // handle input 
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === 'number'
        ? Number(value) // convert numeric fields
        : type === 'checkbox'
        ? checked // true/false for checkbox
        : value, // default string/text/select
  }));
};

// handle admission change

// update admissionConditions (text, select, checkbox inside admissionConditions)
const handleAdmissionChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked; // safe cast

  setFormData((prev) => ({
    ...prev,
    admissionConditions: {
      ...(prev.admissionConditions || {}),
      [name]:
        type === 'number'
          ? Number(value)
          : type === 'checkbox'
          ? checked
          : value,
    },
  }));
};

 const [formData, setFormData] = useState<SeatAvailability>({
  level: 'O-level',
  studentType: 'newcomer',
  academicYear: '2025/2026',
  yearofstudy: 'Year 3',
  totalSpots: 50,
  occupiedSpots: 10,
  registrationOpen: true,
  waitingListCount: 5,
  combination: ['Math', 'Physics'], // must match backend expectations
  admissionConditions: {
    minGrade: 'B',
    requiredSubjects: ['English', 'Math'], // must match backend expectations
    examScore: '75%',
    interviewRequired: true,
    documents: ['Birth Certificate', 'ID'], // correct strings
    notes: 'Priority for siblings of current students',
  },
});




const [errors, setErrors] = useState<ErrorState>({
  level: '',
  studentType: '',
  academicYear: '',
  yearofstudy: '',
  totalSpots: '',
});

const validateFields = (): ErrorState => {
  const newErrors: ErrorState = {
    level: '',
    studentType: '',
    academicYear: '',
    yearofstudy: '',
    totalSpots: '',
  };

  if (!formData.level) {newErrors.level = 'Level is required';}
  if (!formData.studentType) {newErrors.studentType = 'Student type is required';}
  if (!formData.academicYear) {newErrors.academicYear = 'Enter a valid academic year (e.g. 2025/2026)';}
  if (!formData.yearofstudy) {newErrors.yearofstudy = 'Year of study is required';}
  if (!formData.totalSpots || formData.totalSpots <= 0){
    newErrors.totalSpots = 'Total spots must be greater than 0';
  }
    // optional fields — only send if they have values

  setErrors(newErrors);
  return newErrors;
};

const handleCancel=()=>{
  navigate('/schoolAdmin/seats');
};

const createSeats = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 1️⃣ Validate required fields
  const validationResult = validateFields();
  const hasErrors = Object.values(validationResult).some((val) => val !== '');
  if (hasErrors) {
    console.log('Validation failed:', validationResult);
    return;
  }

  try {
    // 2️⃣ Clean admissionConditions to send only non-empty fields
    const ac = formData.admissionConditions;
    const cleanAdmissionConditions: AdmissionConditions = {};
    if (ac) {
      if (ac.minGrade){cleanAdmissionConditions.minGrade = ac.minGrade;} 
      if (ac.requiredSubjects && ac.requiredSubjects.length > 0){cleanAdmissionConditions.requiredSubjects = ac.requiredSubjects;} 
      if (ac.examScore){cleanAdmissionConditions.examScore = ac.examScore;}
      if (ac.interviewRequired) {cleanAdmissionConditions.interviewRequired = ac.interviewRequired;}
      if (ac.documents && ac.documents.length > 0) {cleanAdmissionConditions.documents = ac.documents;}
      if (ac.notes) {cleanAdmissionConditions.notes = ac.notes;}
    }

    // 3️⃣ Build payload — required fields first, optional fields only if valid
    const payload= {
      level: formData.level,
      studentType: formData.studentType,
      academicYear: formData.academicYear,
      yearofstudy: formData.yearofstudy,
      totalSpots: Number(formData.totalSpots), // ensure number
      ...(formData.occupiedSpots !== undefined ? { occupiedSpots: Number(formData.occupiedSpots) } : {}),
      ...(formData.registrationOpen !== undefined ? { registrationOpen: formData.registrationOpen } : {}),
      ...(formData.waitingListCount !== undefined ? { waitingListCount: formData.waitingListCount } : {}),
      ...(formData.combination && formData.combination.length > 0 ? { combination: formData.combination } : {}),
      ...(Object.keys(cleanAdmissionConditions).length > 0
          ? { admissionConditions: cleanAdmissionConditions }
          : {}),
    };

    // 4️⃣ Call backend
    await registerSpot({ data: payload, id: user?.schoolId ?? '' }).unwrap();
    console.log('Submitted successfully:', payload);
    navigate('/schoolAdmin/seats');
    
    
  } catch (error) {
    console.log('error is', error);
  }
};



 
  return (
    <div className='px-6 py-6'>
         <div className='border border-gray-300 py-5 px-3 rounded-lg'>
            <h1 className='text-primary-color font-bold text-[22px] px-8 pb-10 font-family-playfair'>Add Available Seats</h1>

            <div>
                <form action="" onSubmit={createSeats} className='px-10'>
                    <div className='flex gap-13'>
                     <SelectInput options={Levels} label=' Level' placeholder='Select Level' name='level' value={formData.level} onChange={handleSelectChange} />
                     {errors &&(
                      <span className='text-red-600 text-[15px]'>{errors.level}</span>
                     )}
                     <SelectInput options={StudentType} label=' Student Type' placeholder='Select Student Level' onChange={handleSelectChange} name='studentType' value={formData.studentType} />
                     {errors &&(
                      <span className='text-red-600 text-[15px]'>{errors.studentType}</span>
                     )}
                    </div>
                     
                    <div className='flex gap-13 py-2'>
                      <TextInput label={'Academic Year *'} placeholder='e.g., 2025/2026' type='text' name='academicYear' value={formData.academicYear} onChange={handleInputChange}/>
                      {errors &&(
                      <span className='text-red-600 text-[15px]'>{errors.academicYear}</span>
                     )}
                      <TextInput label={'Year of Study *'} onChange={handleInputChange} value={formData.yearofstudy} name='yearofstudy'/>
                      {errors &&(
                      <span className='text-red-600 text-[15px]'>{errors.yearofstudy}</span>
                     )}
                    </div>

                    <div className='flex gap-13 py-2'>
                      <TextInput label={'Total Spots *'} placeholder='50' type='number' name='totalSpots' value={formData.totalSpots.toString()} onChange={handleInputChange} />
                      {errors &&(
                      <span className='text-red-600 text-[15px]'>{errors.totalSpots}</span>
                     )}
                      <TextInput label={'Occupied Spots *'} name='occupiedSpots' value={formData.occupiedSpots} onChange={handleInputChange} type='number' placeholder='0'/>
                    </div>

                    <div>
                      
                    </div>
                    
                    <h1 className='text-black py-12 font-semibold text-[18px] pb-4 font-family-playfair'>Admission Condition</h1>
                        
                    <div className='flex gap-13 py-2'>
                      <SelectInput options={MinimumGrade} name="minGrade" value={formData.admissionConditions?.minGrade || ''} onChange={handleAdmissionChange} label=' minimum grade' placeholder='Select Level' />
                      <TextInput label={'Exam Score *'} name='examScore' value={formData.admissionConditions?.examScore} onChange={handleAdmissionChange} placeholder='e.g.,,75%'/>
                    </div>

                    {/* <div className='flex gap-13 py-2'>
                      <TextInput label={' Required Documents'} type='text' placeholder='transcript and letter'/>
                    </div> */}

                    {/* documents */}

                    <div className="flex flex-col gap-2 py-2">
  <label className="font-semibold">Required Documents</label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Birth Certificate')}
      onChange={() => toggleDocument('Birth Certificate')}
    />
    Birth Certificate
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Recent passport-size photograph (2 copies)')}
      onChange={() => toggleDocument('Recent passport-size photograph (2 copies)')}
    />
    Recent passport-size photograph (2 copies)
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Transfer certificate (if applicable)')}
      onChange={() => toggleDocument('Transfer certificate (if applicable)')}
    />
    Transfer certificate (if applicable)
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Previous school report card / academic records')}
      onChange={() => toggleDocument('Previous school report card / academic records')}
    />
    Previous school report card / academic records
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Proof of residence (utility bill or ID)')}
      onChange={() => toggleDocument('Proof of residence (utility bill or ID)')}
    />
    Proof of residence (utility bill or ID)
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('ID')}
      onChange={() => toggleDocument('ID')}
    />
   Parent / guardian ID
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={(formData.admissionConditions?.documents || []).includes('Result slip')}
      onChange={() => toggleDocument('Result slip')}
    />
    Result slip
  </label>
</div>


                     <div className='flex gap-13 py-2'>
                      <TextInput label={' Additional Notes'} value={formData.admissionConditions?.notes} onChange={handleAdmissionChange} name='notes' type='text' placeholder='other unique condition for specific school year'/>
                    </div>

                    <div className='flex justify-between py-2'>
                        <Button label={submitting ? 'Adding…' : 'Add Seat Availability'} type='submit' variant='secondary' loading={submitting} disabled={submitting}/>
                         <Button label='Cancel' variant='third' onClick={handleCancel} disabled={submitting}/>
                    </div>
                </form>
            </div>
         </div>

         
    </div>
  );
}
