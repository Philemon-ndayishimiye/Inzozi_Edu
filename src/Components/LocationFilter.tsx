import { IoLocationOutline } from 'react-icons/io5';
import { PROVINCE_OPTIONS, districtsForProvince } from '../Types/location';

type LocationFilterProps = {
  province: string;
  district: string;
  onProvinceChange: (province: string) => void;
  onDistrictChange: (district: string) => void;
  className?: string;
};

export default function LocationFilter({
  province,
  district,
  onProvinceChange,
  onDistrictChange,
  className = '',
}: LocationFilterProps) {
  const districtOptions = districtsForProvince(province);
  const hasFilter = Boolean(province || district);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#282C34] font-family-poppins">
          <IoLocationOutline className="text-[#F09C00] text-base" />
          Filter by location
        </span>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              onProvinceChange('');
              onDistrictChange('');
            }}
            className="text-[12px] font-semibold text-[#05416B] hover:underline cursor-pointer font-family-poppins"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <select
          value={province}
          onChange={(e) => {
            onProvinceChange(e.target.value);
            onDistrictChange('');
          }}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30"
        >
          <option value="">All provinces</option>
          {PROVINCE_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={district}
          disabled={!province}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">All districts</option>
          {districtOptions.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
