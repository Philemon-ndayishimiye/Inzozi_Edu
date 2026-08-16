import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApplicationRecord, ApplicationStatus } from '../../Helper/applicationsStore';
import Panel from './Panel';
import Badge from './Badge';

type FilterTab = 'all' | ApplicationStatus;

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'submitted', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

type ApplicationsTableProps = {
  applications: ApplicationRecord[];
  detailBasePath: string;
  emptyMessage: string;
};

export default function ApplicationsTable({ applications, detailBasePath, emptyMessage }: ApplicationsTableProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<FilterTab>('all');

  const counts = {
    all: applications.length,
    submitted: applications.filter((a) => a.status === 'submitted').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const filtered = applications.filter((a) => {
    const matchesTab = tab === 'all' || a.status === tab;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || a.studentName.toLowerCase().includes(q) || a.guardianEmail.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <Panel noBodyPadding>
      <div className="flex gap-2 px-4 pt-4 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer ${
              tab === t.id ? 'bg-[#05416B] border-[#05416B] text-white' : 'bg-white border-gray-300 text-gray-600'
            }`}
          >
            {t.label} ({counts[t.id]})
          </button>
        ))}
      </div>

      <div className="px-4 pt-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student or guardian email..."
          className="w-full sm:max-w-sm border border-gray-300 rounded-lg px-3.5 py-2 text-[13px] outline-none focus:border-[#F09C00]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-14 text-center text-[13.5px] text-gray-500 px-4">
          {applications.length === 0 ? emptyMessage : 'No applications match that filter.'}
        </div>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-t border-b border-gray-200">
                <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-4 py-2.5">Student</th>
                <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Class</th>
                <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Submitted</th>
                <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.referenceCode} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[13px] text-[#282C34]">{app.studentName}</div>
                    <div className="text-[11px] text-gray-400">{app.guardianEmail}</div>
                  </td>
                  <td className="px-3 py-3 text-[13px]">{app.level ?? '—'}</td>
                  <td className="px-3 py-3 font-mono text-[12px] text-gray-500">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={app.status === 'submitted' ? 'pending' : app.status}>
                      {app.status === 'submitted' ? 'Pending' : app.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => navigate(`${detailBasePath}/${app.referenceCode}`)}
                      className="border border-gray-300 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold cursor-pointer hover:border-[#05416B] hover:text-[#05416B]"
                    >
                      {app.status === 'submitted' ? 'Review' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
