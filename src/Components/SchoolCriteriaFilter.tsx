import { IoOptionsOutline } from 'react-icons/io5';
import { categ, schoolType, Levels, StudentType } from '../Types/Seats';

type SchoolCriteriaFilterProps = {
  category: string;
  type: string;
  level: string;
  studentType: string;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onStudentTypeChange: (value: string) => void;
  className?: string;
};

const selectClass =
  'w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30';

export default function SchoolCriteriaFilter({
  category,
  type,
  level,
  studentType,
  onCategoryChange,
  onTypeChange,
  onLevelChange,
  onStudentTypeChange,
  className = '',
}: SchoolCriteriaFilterProps) {
  const hasFilter = Boolean(category || type || level || studentType);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#282C34] font-family-poppins">
          <IoOptionsOutline className="text-[#F09C00] text-base" />
          Refine by school criteria
        </span>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              onCategoryChange('');
              onTypeChange('');
              onLevelChange('');
              onStudentTypeChange('');
            }}
            className="text-[12px] font-semibold text-[#05416B] hover:underline cursor-pointer font-family-poppins"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)} className={selectClass}>
          <option value="">Any curriculum</option>
          {categ.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => onTypeChange(e.target.value)} className={selectClass}>
          <option value="">Boys, Girls or Mixed</option>
          {schoolType.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <select value={level} onChange={(e) => onLevelChange(e.target.value)} className={selectClass}>
          <option value="">Any level</option>
          {Levels.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>

        <select value={studentType} onChange={(e) => onStudentTypeChange(e.target.value)} className={selectClass}>
          <option value="">Newcomer or transfer</option>
          {StudentType.map((s) => (
            <option key={s.value} value={s.value}>{s.label === 'newcomer' ? 'Newcomer' : 'Transfer'}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
