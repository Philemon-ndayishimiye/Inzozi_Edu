import { IoOptionsOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { categ, schoolType, Levels, StudentType } from '../Types/Seats';

type CriteriaFields = {
  category: string;
  type: string;
  level: string;
  studentType: string;
};

type SchoolCriteriaFilterProps = CriteriaFields & {
  // A single callback carrying only the changed field(s) - firing several
  // separate onChange calls in one tick is unsafe here because consumers
  // built on react-router's setSearchParams resolve a functional update
  // against the same pre-update snapshot for every call issued before the
  // next render, so later calls silently clobber earlier ones (e.g. "Clear").
  onChange: (next: Partial<CriteriaFields>) => void;
  className?: string;
};

const selectClass =
  'w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30';

export default function SchoolCriteriaFilter({
  category,
  type,
  level,
  studentType,
  onChange,
  className = '',
}: SchoolCriteriaFilterProps) {
  const { t } = useTranslation();
  const hasFilter = Boolean(category || type || level || studentType);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#282C34] font-family-poppins">
          <IoOptionsOutline className="text-[#F09C00] text-base" />
          {t('criteriaFilter.refineBy')}
        </span>
        {hasFilter && (
          <button
            type="button"
            onClick={() => onChange({ category: '', type: '', level: '', studentType: '' })}
            className="text-[12px] font-semibold text-[#05416B] hover:underline cursor-pointer font-family-poppins"
          >
            {t('criteriaFilter.clear')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <select value={category} onChange={(e) => onChange({ category: e.target.value })} className={selectClass}>
          <option value="">{t('criteriaFilter.anyCurriculum')}</option>
          {categ.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => onChange({ type: e.target.value })} className={selectClass}>
          <option value="">{t('criteriaFilter.boysGirlsMixed')}</option>
          {schoolType.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={level} onChange={(e) => onChange({ level: e.target.value })} className={selectClass}>
          <option value="">{t('criteriaFilter.anyLevel')}</option>
          {Levels.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>

        <select value={studentType} onChange={(e) => onChange({ studentType: e.target.value })} className={selectClass}>
          <option value="">{t('criteriaFilter.newcomerOrTransfer')}</option>
          {StudentType.map((s) => (
            <option key={s.value} value={s.value}>{s.label === 'newcomer' ? t('criteriaFilter.newcomer') : t('criteriaFilter.transfer')}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
