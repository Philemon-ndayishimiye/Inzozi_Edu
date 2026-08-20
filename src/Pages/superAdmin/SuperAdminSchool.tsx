import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

type FilterTab = 'all' | 'approved' | 'pending' | 'rejected';

export default function SuperAdminSchool() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllSchoolsQuery();

  const TABS: { id: FilterTab; label: string }[] = [
    { id: 'all', label: t('allSchoolsPage.all') },
    { id: 'approved', label: t('allSchoolsPage.active') },
    { id: 'pending', label: t('allSchoolsPage.pending') },
    { id: 'rejected', label: t('allSchoolsPage.rejected') },
  ];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<FilterTab>('all');

  const schools = data?.data.schools ?? [];
  const counts = {
    all: schools.length,
    approved: schools.filter((s) => s.status === 'approved').length,
    pending: schools.filter((s) => s.status === 'pending').length,
    rejected: schools.filter((s) => s.status === 'rejected').length,
  };

  const filtered = schools.filter((s) => {
    const matchesTab = tab === 'all' || s.status === tab;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || s.schoolName.toLowerCase().includes(q) || s.district.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">{t('allSchoolsPage.intro')}</p>

      <Panel noBodyPadding>
        <div className="flex gap-2 px-4 pt-4 flex-wrap">
          {TABS.map((tab_) => (
            <button
              key={tab_.id}
              onClick={() => setTab(tab_.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer ${
                tab === tab_.id ? 'bg-[#05416B] border-[#05416B] text-white' : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              {tab_.label} ({counts[tab_.id]})
            </button>
          ))}
        </div>

        <div className="px-4 pt-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('allSchoolsPage.searchPlaceholder')}
            className="w-full sm:max-w-sm border border-gray-300 rounded-lg px-3.5 py-2 text-[13px] outline-none focus:border-[#F09C00]"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-[13.5px] text-gray-500 px-4">
            {isLoading ? t('allSchoolsPage.loading') : t('allSchoolsPage.noSchoolsMatch')}
          </div>
        ) : (
          <div className="overflow-x-auto mt-3">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-t border-b border-gray-200">
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-4 py-2.5">{t('allSchoolsPage.school')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('allSchoolsPage.location')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('allSchoolsPage.schoolManager')}</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">{t('table.status')}</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((school) => (
                  <tr key={school.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[13px] text-[#282C34]">{school.schoolName}</div>
                    </td>
                    <td className="px-3 py-3 text-[13px]">{school.district}</td>
                    <td className="px-3 py-3 text-[13px]">
                      {school.SchoolManager
                        ? `${school.SchoolManager.firstName} ${school.SchoolManager.lastName}`
                        : <span className="text-gray-400 italic">{t('allSchoolsPage.accountDeleted')}</span>}
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={school.status === 'approved' ? 'approved' : school.status === 'pending' ? 'pending' : 'rejected'}>
                        {school.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {school.licenseDocument && (
                          <a
                            href={school.licenseDocument}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:text-[#05416B] hover:border-[#05416B] flex items-center justify-center flex-shrink-0"
                            aria-label={t('allSchoolsPage.viewLegalDocument')}
                          >
                            <IoDocumentTextOutline className="text-[15px]" />
                          </a>
                        )}
                        <button
                          onClick={() => navigate(`/superAdmin/ViewSchool/${school.id}`)}
                          className="border border-gray-300 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold cursor-pointer hover:border-[#05416B] hover:text-[#05416B] whitespace-nowrap"
                        >
                          {t('allSchoolsPage.view')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
