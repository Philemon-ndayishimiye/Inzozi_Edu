import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '../../Components/seats/Search';
import { SelectInput } from '../../Components/seats/SelectInput';
import { Levels, StudentType } from '../../Types/Seats';
import { useDeleteSpotMutation, useGetAllSpotsQuery, useUpdateSpotMutation } from '../../App/api/spots/spot';
import { useUser } from '../../Hooks/useUser';
import { skipToken } from '@reduxjs/toolkit/query';
import ConfirmDialog from '../../Components/ConfirmDialog';
import Panel from '../../Components/dashboard/Panel';
import Toggle from '../../Components/dashboard/Toggle';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5';

export default function Seats() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data, refetch } = useGetAllSpotsQuery(user?.schoolId ?? skipToken);
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteSpot] = useDeleteSpotMutation();
  const [updateSpot] = useUpdateSpotMutation();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [studentType, setStudentType] = useState('');

  const spots = data?.data.spots ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return spots.filter((s) => {
      const matchesQuery =
        !q || s.level.toLowerCase().includes(q) || s.yearofstudy.toLowerCase().includes(q) || s.studentType.toLowerCase().includes(q);
      const matchesLevel = !level || s.level === level;
      const matchesType = !studentType || s.studentType === studentType;
      return matchesQuery && matchesLevel && matchesType;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, search, level, studentType]);

  const confirmDelete = async () => {
    if (!deleteId) {return;}
    setDeleting(true);
    try {
      await deleteSpot({ schoolId: user?.schoolId ?? '', spotId: deleteId }).unwrap();
      refetch();
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleOpen = async (spotId: string, nextOpen: boolean) => {
    if (!user?.schoolId) {return;}
    setTogglingId(spotId);
    try {
      await updateSpot({ schoolId: user.schoolId, spotId, data: { registrationOpen: nextOpen } }).unwrap();
      refetch();
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13.5px] text-gray-500 max-w-xl">
          {t('seatsPage.intro')}
        </p>
        <button
          onClick={() => navigate('../addSeats')}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold text-[13px] px-4 py-2.5 rounded-lg cursor-pointer whitespace-nowrap"
        >
          <IoAddCircleOutline className="text-base" /> {t('seatsPage.addClass')}
        </button>
      </div>

      <Panel noBodyPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-200">
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('seatsPage.searchPlaceholder')} />
          <div className="flex gap-3">
            <SelectInput options={Levels} value={level} onChange={(e) => setLevel(e.target.value)} placeholder={t('seatsPage.allLevels')} />
            <SelectInput options={StudentType} value={studentType} onChange={(e) => setStudentType(e.target.value)} placeholder={t('seatsPage.allTypes')} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-[13.5px] text-gray-500">
            {spots.length === 0
              ? t('seatsPage.noClassesYet')
              : t('seatsPage.noClassesMatch')}
          </div>
        ) : (
          <div>
            {filtered.map((spot) => {
              const available = Number(spot.totalSpots) - Number(spot.occupiedSpots ?? 0);
              const isOpen = spot.registrationOpen ?? available > 0;
              return (
                <div
                  key={spot.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[13.5px] text-[#282C34]">
                      {spot.level} <span className="text-gray-400 font-normal">· {spot.yearofstudy}</span>
                    </div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">
                      {spot.studentType} · {t('seatsPage.seatsAvailable', { available, total: spot.totalSpots })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`font-mono text-[10.5px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        isOpen ? 'bg-[#E7F5EA] text-[#1E7A34]' : 'bg-[#FBEAE8] text-[#B10E1E]'
                      }`}
                    >
                      {isOpen ? t('seatsPage.open') : t('seatsPage.closed')}
                    </span>
                    <Toggle
                      checked={isOpen}
                      disabled={togglingId === spot.id}
                      onChange={(next) => toggleOpen(spot.id, next)}
                    />
                    <button
                      onClick={() => setDeleteId(spot.id)}
                      className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#B10E1E] hover:border-[#B10E1E] flex items-center justify-center cursor-pointer"
                      aria-label={t('seatsPage.deleteClassAria')}
                    >
                      <IoTrashOutline className="text-[15px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      <ConfirmDialog
        isOpen={!!deleteId}
        title={t('seatsPage.deleteConfirmTitle')}
        message={t('seatsPage.deleteConfirmMessage')}
        confirmLabel={t('seatsPage.delete')}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
