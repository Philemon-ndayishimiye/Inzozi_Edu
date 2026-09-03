import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSearchSchoolsQuery, type SearchSchoolResult } from '../App/api/school/school';
import SchoolCard from './SchoolCard';
import SchoolCriteriaFilter from './SchoolCriteriaFilter';
import { provinceForDistrict } from '../Types/location';

const PAGE_SIZE = 12;

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
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const schoolName = searchParams.get('q') ?? '';
  const province = searchParams.get('province') ?? '';
  const district = searchParams.get('district') ?? '';
  const category = searchParams.get('category') ?? '';
  const type = searchParams.get('type') ?? '';
  const level = searchParams.get('level') ?? '';
  const studentType = searchParams.get('studentType') ?? '';

  const setParams = (patch: Record<string, string | undefined>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(patch).forEach(([key, value]) => {
        if (value) {params.set(key, value);} else {params.delete(key);}
      });
      return params;
    }, { replace: true });
  };

  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<SearchSchoolResult[]>([]);

  // Reset pagination whenever the search criteria change, so old results
  // from a different search don't stay mixed in.
  useEffect(() => {
    setPage(1);
    setAccumulated([]);
  }, [schoolName, province, district, category, type, level, studentType, i18n.language]);

  const { data, isLoading, isFetching, isError } = useSearchSchoolsQuery({
    schoolName: schoolName || undefined,
    district: district || undefined,
    schoolCategory: category || undefined,
    schoolType: type || undefined,
    schoolLevel: level || undefined,
    studentType: studentType || undefined,
    page,
    limit: PAGE_SIZE,
    lang: i18n.language !== 'en' ? i18n.language : undefined,
  });

  useEffect(() => {
    if (!data) {return;}
    setAccumulated((prev) => (page === 1 ? data.data.schools : [...prev, ...data.data.schools]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Province has no direct backend filter (only district does) - applied
  // client-side to the already-paginated, already-server-filtered results,
  // not the whole table.
  const schools = province
    ? accumulated.filter((s) => provinceForDistrict(s.district) === province)
    : accumulated;

  const total = data?.data.total ?? 0;
  const totalPages = data?.data.totalPages ?? 1;
  const locationLabel = [district, province].filter(Boolean).join(', ') || t('schoolSection.allOfRwanda');
  const hasFilters = Boolean(schoolName || province || district || category || type || level || studentType);

  return (
    <div id="schools" className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] py-[40px] px-6 sm:px-[40px] lg:px-[80px] scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
        <div>
          <h1 className="font-bold text-2xl sm:text-[30px] text-[#282C34] font-family-playfair">
            {t('schoolSection.title')}
          </h1>
          <p className="text-[#6B7280] text-[15px] sm:text-[16px] py-1 font-family-poppins">
            {t('schoolSection.subtitle')}
          </p>
        </div>
        {!isLoading && !isError && (
          <span className="text-[13px] font-family-poppins text-[#05416B] font-semibold">
            {t('schoolSection.schoolsCount', { count: total })} · {locationLabel}
          </span>
        )}
      </div>

      <SchoolCriteriaFilter
        category={category}
        type={type}
        level={level}
        studentType={studentType}
        onChange={setParams}
        className="mb-5"
      />

      {isError && (
        <div className="text-center py-16 text-[#6B7280] font-family-poppins">
          {t('schoolSection.loadError')}
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SchoolCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !isError && schools.length === 0 && (
        <div className="text-center py-16 px-4">
          <p className="text-[#282C34] font-semibold font-family-poppins mb-1">
            {t('schoolSection.noResultsTitle')}
          </p>
          <p className="text-[#6B7280] text-[13.5px] font-family-poppins">
            {hasFilters ? t('schoolSection.noResultsWithFilter') : t('schoolSection.noResultsNoFilter')}
          </p>
        </div>
      )}

      {!isLoading && !isError && schools.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {schools.map((school) => (
              <SchoolCard
                id={school.id}
                key={school.id}
                title={school.schoolName}
                location={school.district}
                image={school.profile?.profilePhoto ?? ''}
                level={level || undefined}
                studentType={studentType || undefined}
              />
            ))}
          </div>

          {page < totalPages && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                className="border border-[#05416B] text-[#05416B] font-semibold text-[13px] px-6 py-2.5 rounded-lg cursor-pointer disabled:opacity-60"
              >
                {isFetching ? t('schoolSection.loadingMore') : t('schoolSection.loadMore')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
