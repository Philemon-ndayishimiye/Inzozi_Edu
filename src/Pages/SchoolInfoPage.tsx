import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetProfileQuery, useGetSchoolDetailsQuery } from '../App/api/school/school';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetAllSpotsQuery } from '../App/api/spots/spot';
import { useGetAllGalleryQuery } from '../App/api/gallery/Gallery';
import { categoryLabels } from '../Types/Category';
import SpotRow from '../Components/seats/SpotRow';
import { IoArrowBack, IoInformationCircleOutline, IoClose } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const SchoolInfoPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { data, isLoading: profileLoading } = useGetProfileQuery(id ?? skipToken);
  const { data: informations, isLoading: infoLoading } = useGetSchoolDetailsQuery(id ?? skipToken);
  const { data: spots } = useGetAllSpotsQuery(id ?? skipToken);
  const { data: gallery } = useGetAllGalleryQuery(id ?? skipToken);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Level/studentType the parent already picked while searching - carried
  // over via the URL so they don't have to re-scan the whole spot list to
  // find the class they were originally looking for.
  const wantedLevel = searchParams.get('level') ?? '';
  const wantedStudentType = searchParams.get('studentType') ?? '';
  const [showAllSpots, setShowAllSpots] = useState(false);

  const profile = data?.data.profiles?.[0];
  const images = gallery?.data.images ?? [];
  const allSpotList = spots?.data.spots ?? [];
  const matchingSpotList = allSpotList.filter(
    (s) =>
      (!wantedLevel || s.level === wantedLevel) &&
      (!wantedStudentType || s.studentType === wantedStudentType),
  );
  const hasSpotFilter = Boolean((wantedLevel || wantedStudentType) && matchingSpotList.length > 0);
  const spotList = hasSpotFilter && !showAllSpots ? matchingSpotList : allSpotList;
  const openSpotCount = spotList.filter(
    (s) => Number(s.totalSpots) - Number(s.occupiedSpots ?? 0) > 0,
  ).length;

  const isLoading = profileLoading || infoLoading;

  const galleryCategories = Array.from(new Set(images.map((img) => img.category)));
  const visibleImages = activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory);

  useEffect(() => {
    if (location.hash === '#spots' && !isLoading) {
      document.getElementById('spots')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const goApply = (spotId?: string) =>
    navigate(`/apply/${id}${spotId ? `?spot=${spotId}` : ''}`);

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-[60px]">
        {isLoading && (
          <div className="h-[260px] sm:h-[340px] lg:h-[400px] bg-gray-200 animate-pulse" />
        )}

        {!isLoading && (
          <div
            className="relative h-[260px] sm:h-[340px] lg:h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url(${profile?.profilePhoto})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 w-9 h-9 rounded-full bg-white/20 backdrop-blur border border-white/40 flex items-center justify-center text-white cursor-pointer"
              aria-label={t('schoolInfoPage.goBack')}
            >
              <IoArrowBack />
            </button>

            <div className="absolute bottom-5 left-0 right-0 px-5 sm:px-8 flex flex-wrap items-center justify-center gap-3">
              <div className="bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] px-5 py-2 rounded-lg shadow-lg max-w-[80vw]">
                <h1 className="text-white text-lg sm:text-2xl font-bold text-center font-family-playfair truncate">
                  {informations?.data.schoolName}
                </h1>
              </div>
              <button
                onClick={() => goApply()}
                className="bg-white text-[#05416B] px-4 py-2 rounded-lg text-sm font-bold cursor-pointer shadow-lg"
              >
                {t('schoolInfoPage.applyForChild')}
              </button>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-8 space-y-10">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#6B7280] text-[13.5px] font-family-poppins">
            <HiOutlineLocationMarker className="text-[#F09C00]" />
            <span>
              {informations?.data.sector}, {informations?.data.district} {t('schoolInfoPage.district')}
            </span>
            {informations?.data.schoolType && (
              <>
                <span className="text-gray-300">·</span>
                <span>{informations.data.schoolType}</span>
              </>
            )}
            {informations?.data.schoolCategory && (
              <>
                <span className="text-gray-300">·</span>
                <span>{informations.data.schoolCategory}</span>
              </>
            )}
          </div>

          <div className="flex gap-3 items-start bg-[#FFF3E0] border border-[#F09C00]/40 rounded-xl px-4 py-3.5">
            <IoInformationCircleOutline className="text-[#B77300] text-xl flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] sm:text-[13.5px] text-[#6B4A0A] leading-relaxed font-family-poppins">
              <b className="text-[#5c4a10]">{t('schoolInfoPage.freeToApplyBold')}</b>{' '}
              {t('schoolInfoPage.freeToApplyRest')}
            </p>
          </div>

          {images.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#282C34] font-family-playfair">
                  {t('schoolInfoPage.photosAndFacilities')}
                </h3>
                <span className="font-mono text-[11px] text-[#6B7280]">{t('schoolInfoPage.photosCount', { count: images.length })}</span>
              </div>

              {galleryCategories.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-3 -mt-1">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border whitespace-nowrap cursor-pointer transition-colors ${
                      activeCategory === 'all' ? 'bg-[#05416B] border-[#05416B] text-white' : 'bg-white border-gray-300 text-gray-600'
                    }`}
                  >
                    {t('schoolInfoPage.allCategories')}
                  </button>
                  {galleryCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border whitespace-nowrap cursor-pointer transition-colors ${
                        activeCategory === cat ? 'bg-[#05416B] border-[#05416B] text-white' : 'bg-white border-gray-300 text-gray-600'
                      }`}
                    >
                      {categoryLabels[cat] ?? cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-x-auto sm:overflow-visible pb-2">
                {visibleImages.map((img) => {
                  const globalIndex = images.findIndex((i) => i.id === img.id);
                  return (
                    <div key={img.id} className="relative flex-shrink-0">
                      <img
                        src={img.imageUrl}
                        alt={img.caption || t('schoolInfoPage.schoolPhotoAlt')}
                        onClick={() => setLightboxIndex(globalIndex)}
                        className="w-[150px] sm:w-full h-[110px] sm:h-[130px] object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90"
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[9.5px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {categoryLabels[img.category] ?? img.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div id="spots">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#282C34] font-family-playfair">
                {t('schoolInfoPage.availableSpots')}
              </h3>
              {spotList.length > 0 && (
                <span className="font-mono text-[11px] text-[#6B7280]">
                  {t('schoolInfoPage.openSpotsNow', { count: openSpotCount })}
                </span>
              )}
            </div>
            {hasSpotFilter && (
              <div className="flex items-center flex-wrap gap-2 mb-3 text-[12px] font-family-poppins">
                <span className="text-[#6B7280]">
                  {showAllSpots
                    ? t('schoolInfoPage.showingAllClasses')
                    : t('schoolInfoPage.showingMatchesFor', { criteria: [wantedLevel, wantedStudentType].filter(Boolean).join(' · ') })}
                </span>
                <button
                  onClick={() => setShowAllSpots((v) => !v)}
                  className="text-[#05416B] font-semibold underline cursor-pointer"
                >
                  {showAllSpots ? t('schoolInfoPage.showOnlyMySearch') : t('schoolInfoPage.showAllClasses')}
                </button>
              </div>
            )}
            {spotList.length === 0 ? (
              <p className="text-[13.5px] text-[#6B7280] font-family-poppins">
                {t('schoolInfoPage.noSpotsYet')}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spotList.map((spot) => (
                  <SpotRow
                    key={spot.id}
                    level={spot.level}
                    yearofstudy={spot.yearofstudy}
                    totalSeats={Number(spot.totalSpots)}
                    occupiedSeats={Number(spot.occupiedSpots ?? 0)}
                    onApply={() => goApply(spot.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[16px] sm:text-[18px] font-bold text-[#282C34] font-family-playfair mb-3">
              {t('schoolInfoPage.location')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                [t('schoolInfoPage.district'), informations?.data.district],
                [t('schoolInfoPage.sector'), informations?.data.sector],
                [t('schoolInfoPage.cell'), informations?.data.cell],
                [t('schoolInfoPage.village'), informations?.data.village],
              ].map(([label, value]) => (
                <div key={label} className="bg-white border border-gray-200 rounded-lg px-3.5 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-wide text-[#F09C00]">
                    {label}
                  </div>
                  <div className="font-semibold text-[13.5px] text-[#282C34] mt-0.5 font-family-poppins">
                    {value || t('schoolInfoPage.noneValue')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {profile && (profile.mission || profile.vision || profile.description) && (
            <div className="space-y-6">
              {profile.description && (
                <div>
                  <h3 className="text-[16px] font-bold text-[#282C34] font-family-playfair mb-2">
                    {t('schoolInfoPage.aboutTheSchool')}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[#6B7280] font-family-poppins">
                    {profile.description}
                  </p>
                </div>
              )}
              {profile.mission && (
                <div>
                  <h3 className="text-[15px] font-bold text-[#282C34] font-family-playfair mb-2">
                    {t('schoolInfoPage.mission')}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[#6B7280] font-family-poppins">
                    {profile.mission}
                  </p>
                </div>
              )}
              {profile.vision && (
                <div>
                  <h3 className="text-[15px] font-bold text-[#282C34] font-family-playfair mb-2">
                    {t('schoolInfoPage.vision')}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[#6B7280] font-family-poppins">
                    {profile.vision}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-5"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center cursor-pointer"
            aria-label={t('schoolInfoPage.close')}
          >
            <IoClose />
          </button>
          <img
            src={images[lightboxIndex].imageUrl}
            alt=""
            className="max-w-full max-h-[70vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex items-center gap-6 mt-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
              }}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              ‹
            </button>
            <span className="font-mono text-[12px] text-white/75">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => ((prev ?? 0) + 1) % images.length);
              }}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SchoolInfoPage;
