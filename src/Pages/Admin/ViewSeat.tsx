import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoArrowBack, IoCreateOutline } from 'react-icons/io5';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetAllSpotsQuery } from '../../App/api/spots/spot';
import { useUser } from '../../Hooks/useUser';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

// Read-only - just displays what's already in AddSeats/edit; no field here
// is ever editable. Use the pencil action (editSeats/:spotId) to change
// anything.
export default function ViewSeat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { spotId } = useParams<{ spotId: string }>();
  const { user } = useUser();
  const { data, isFetching } = useGetAllSpotsQuery(user?.schoolId ?? skipToken);

  const spot = data?.data.spots.find((s) => s.id === spotId);

  if (!spot) {
    return (
      <div className="px-6 py-6">
        <button
          onClick={() => navigate('../seats')}
          className="flex items-center gap-1.5 text-[13px] text-gray-600 cursor-pointer mb-4"
        >
          <IoArrowBack /> {t('viewSeatPage.backToSeats')}
        </button>
        <p className="text-[13.5px] text-gray-500">
          {isFetching ? t('table.loading') : t('viewSeatPage.notFound')}
        </p>
      </div>
    );
  }

  const available = Number(spot.totalSpots) - Number(spot.occupiedSpots ?? 0);
  const isOpen = spot.registrationOpen ?? available > 0;
  const ac = spot.admissionConditions;

  return (
    <div className="px-6 py-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate('../seats')}
          className="flex items-center gap-1.5 text-[13px] text-gray-600 cursor-pointer"
        >
          <IoArrowBack /> {t('viewSeatPage.backToSeats')}
        </button>
        <div className="flex items-center gap-2">
          <Badge variant={isOpen ? 'approved' : 'rejected'}>{isOpen ? t('seatsPage.open') : t('seatsPage.closed')}</Badge>
          <button
            onClick={() => navigate(`../editSeats/${spot.id}`)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold text-[13px] px-4 py-2 rounded-lg cursor-pointer"
          >
            <IoCreateOutline /> {t('viewSeatPage.edit')}
          </button>
        </div>
      </div>

      <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair">
        {spot.level} <span className="text-gray-400 font-normal">· {spot.yearofstudy}</span>
      </h2>

      <Panel title={t('viewSeatPage.classDetails')}>
        <div className="divide-y divide-gray-100 -mx-5">
          {[
            [t('addSeatsPage.level'), spot.level],
            [t('addSeatsPage.studentType'), spot.studentType],
            [t('addSeatsPage.academicYear'), spot.academicYear],
            [t('addSeatsPage.yearOfStudy'), spot.yearofstudy],
            [t('addSeatsPage.totalSpots'), spot.totalSpots],
            [t('addSeatsPage.occupiedSpots'), spot.occupiedSpots ?? 0],
            [t('viewSeatPage.available'), available],
            ...(spot.combination && spot.combination.length > 0
              ? [[t('addSeatsPage.combination'), spot.combination.join(', ')]]
              : []),
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-5 py-2.5 text-[13.5px]">
              <span className="text-gray-500">{k}</span>
              <span className="font-semibold text-[#282C34] text-right">{v ?? t('viewSeatPage.noneValue')}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t('addSeatsPage.admissionCondition')}>
        {!ac || Object.keys(ac).length === 0 ? (
          <p className="text-[13px] text-gray-500">{t('viewSeatPage.noAdmissionConditions')}</p>
        ) : (
          <div className="divide-y divide-gray-100 -mx-5">
            {[
              [t('addSeatsPage.minimumGrade'), ac.minGrade],
              [t('addSeatsPage.examScore'), ac.examScore],
              [t('viewSeatPage.interviewRequired'), ac.interviewRequired ? t('viewSeatPage.yes') : t('viewSeatPage.no')],
              [t('addSeatsPage.requiredDocuments'), ac.documents && ac.documents.length > 0 ? ac.documents.join(', ') : undefined],
              [t('addSeatsPage.additionalNotes'), ac.notes],
            ]
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-2.5 text-[13.5px]">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-[#282C34] text-right">{v}</span>
                </div>
              ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
