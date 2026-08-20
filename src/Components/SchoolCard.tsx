import { SlLocationPin } from 'react-icons/sl';
import { MdVerified } from 'react-icons/md';
import { IoDocumentTextOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type CustomSchool = {
  id: string;
  image: string;
  title: string;
  location: string;
  // The level/studentType the parent already picked while searching - carried
  // through so the school page can pre-filter its spot list instead of
  // making them re-specify the same thing again.
  level?: string;
  studentType?: string;
};

export default function SchoolCard({ id, image, title, location, level, studentType }: CustomSchool) {
  const navigate = useNavigate();
  const initial = title?.trim().charAt(0).toUpperCase() || '?';

  const buildLink = (hash = '') => {
    const params = new URLSearchParams();
    if (level) {params.set('level', level);}
    if (studentType) {params.set('studentType', studentType);}
    const query = params.toString();
    return `/viewSchool/${id}${query ? `?${query}` : ''}${hash}`;
  };

  return (
    <div className="w-full h-full flex flex-col cursor-pointer transform hover:scale-[1.01] duration-200 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100 overflow-hidden">
      <div
        onClick={() => navigate(buildLink())}
        className="relative w-full h-[190px] sm:h-[210px] flex justify-center items-center bg-gradient-to-r from-[#05416B] to-[#0867AA]"
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <h1 className="font-bold text-[48px] text-[#FAFAFA]/90 font-family-playfair select-none">
            {initial}
          </h1>
        )}
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-2xl text-[11px] text-[#05416B] font-semibold">
          <MdVerified className="text-[#F09C00]" /> Verified
        </span>
      </div>

      <div className="flex-1 flex flex-col px-4 pt-4 pb-4">
        <h1
          onClick={() => navigate(buildLink())}
          className="font-bold text-[18px] sm:text-[20px] font-family-playfair text-[#282C34] leading-snug"
        >
          {title}
        </h1>
        <div className="flex items-center gap-2 text-[#6B7280] text-[13.5px] pt-2 font-family-poppins">
          <SlLocationPin className="text-base flex-shrink-0" />
          <span>{location} District</span>
        </div>

        <div className="border-t border-gray-100 mt-4 mb-4" />

        <div className="mt-auto flex gap-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(buildLink());
            }}
            className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#05416B] text-[#05416B] font-bold text-[12.5px] sm:text-[13px] rounded-lg py-2.5 cursor-pointer transition-colors hover:bg-[#CFDCEA]/40 active:scale-[0.97]"
          >
            <IoEyeOutline className="text-[15px]" /> View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(buildLink('#spots'));
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold text-[12.5px] sm:text-[13px] rounded-lg py-2.5 cursor-pointer shadow-sm transition-transform active:scale-[0.97]"
          >
            <IoDocumentTextOutline className="text-[15px]" /> Apply
          </button>
        </div>
      </div>
    </div>
  );
}
