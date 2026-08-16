import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAllApprovedSchoolQuery } from '../App/api/school/school';
import SchoolCard from './SchoolCard';
import { provinceForDistrict } from '../Types/location';

function SchoolCardSkeleton() {
  return (
    <div className="w-full rounded-lg bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-[225px] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-full mt-4" />
      </div>
    </div>
  );
}

export default function SchoolSection() {
  const { data, isLoading, isError } = useGetAllApprovedSchoolQuery();
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q')?.trim().toLowerCase() ?? '';
  const province = searchParams.get('province') ?? '';
  const district = searchParams.get('district') ?? '';

  const schools = data?.data.schools ?? [];

  const filtered = useMemo(
    () =>
      schools.filter((school) => {
        const matchesQuery = !q || school.schoolName.toLowerCase().includes(q);
        const matchesDistrict = !district || school.district === district;
        const matchesProvince = !province || provinceForDistrict(school.district) === province;
        return matchesQuery && matchesDistrict && matchesProvince;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, q, province, district],
  );

  const locationLabel = [district, province].filter(Boolean).join(', ') || 'All of Rwanda';
  const hasFilters = Boolean(q || province || district);

  return (
    <div id="schools" className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] py-[40px] px-6 sm:px-[40px] lg:px-[80px] scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
        <div>
          <h1 className="font-bold text-2xl sm:text-[30px] text-[#282C34] font-family-playfair">
            Featured Schools
          </h1>
          <p className="text-[#6B7280] text-[15px] sm:text-[16px] py-1 font-family-poppins">
            Discover quality education opportunities across Rwanda
          </p>
        </div>
        {!isLoading && !isError && (
          <span className="text-[13px] font-family-poppins text-[#05416B] font-semibold">
            {filtered.length} school{filtered.length === 1 ? '' : 's'} · {locationLabel}
          </span>
        )}
      </div>

      {isError && (
        <div className="text-center py-16 text-[#6B7280] font-family-poppins">
          We couldn&apos;t load schools right now. Please refresh the page or try again shortly.
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SchoolCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center py-16 px-4">
          <p className="text-[#282C34] font-semibold font-family-poppins mb-1">
            No schools match that search yet
          </p>
          <p className="text-[#6B7280] text-[13.5px] font-family-poppins">
            Try a different name, or widen your location filter{hasFilters ? '.' : ' — more schools are added regularly.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((school) => (
            <SchoolCard
              id={school.id}
              key={school.id}
              title={school.schoolName}
              location={school.district}
              image={school.profilePhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
}
