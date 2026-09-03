import { useState, type FormEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import LocationFilter from './LocationFilter';

export default function Hero() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const province = searchParams.get('province') ?? '';
  const district = searchParams.get('district') ?? '';

  const updateParams = (next: { q?: string; province?: string; district?: string }) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const merged = {
        q: next.q ?? prev.get('q') ?? '',
        province: next.province ?? prev.get('province') ?? '',
        district: next.district ?? prev.get('district') ?? '',
      };
      (Object.keys(merged) as Array<keyof typeof merged>).forEach((key) => {
        if (merged[key]) {
          params.set(key, merged[key]);
        } else {
          params.delete(key);
        }
      });
      return params;
    }, { replace: true });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateParams({ q: query });
    document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[600px] sm:h-screen bg-[#C8C1AD] overflow-hidden pt-[30px]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/HeroSection.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#054069]/80" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 pt-16 pb-10 sm:pt-20">
        <h1 className="font-medium text-3xl sm:text-5xl pt-4 sm:pt-[60px] font-family-playfair leading-tight">
          {t('hero.titleLine1')} <span className="text-[#F09C00]">{t('hero.titleSchools')}</span> {t('hero.titleLine2')} <br />
          <span className="text-2xl sm:text-4xl font-light">{t('hero.titleLine3')}</span>
        </h1>

        <h2 className="pt-5 sm:pt-11 font-normal text-[15px] sm:text-[17px] max-w-3xl font-family-poppins">
          {t('hero.subtitle1')}{' '}
          <span className="block sm:inline">{t('hero.subtitle2')}</span>{' '}
          <span className="text-[#F09C00]">{t('hero.subtitle3')}</span>
        </h2>

        <div className="w-full max-w-lg sm:max-w-2xl bg-white/95 sm:bg-white/40 backdrop-blur-sm pt-4 pb-5 px-4 sm:px-6 rounded-2xl mt-6 shadow-xl">
          <h1 className="text-black font-semibold text-xl sm:text-2xl py-1 font-family-playfair">
            {t('hero.startSearch')}
          </h1>
          <p className="text-[#6B7280] text-[13px] sm:text-base font-family-poppins">
            {t('hero.searchSubtitle')}
          </p>

          <form onSubmit={handleSubmit} className="pt-5 flex flex-col gap-3 text-left">
            <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#F09C00]/40">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="flex-1 min-w-0 px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-semibold text-[13px] cursor-pointer"
              >
                <CiSearch className="text-lg" />
                <span className="hidden sm:inline">{t('hero.search')}</span>
              </button>
            </div>

            <LocationFilter
              province={province}
              district={district}
              onChange={({ province: p, district: d }) => updateParams({ province: p, district: d })}
            />
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-10 pb-6">
          <Button
            label={t('hero.applyForChild')}
            variant="applychild"
            onClick={() => document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <Link to="/register">
            <Button label={t('hero.registerSchool')} variant="registerschool" />
          </Link>
        </div>
      </div>
    </div>
  );
}
