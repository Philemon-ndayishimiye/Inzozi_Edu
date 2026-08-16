import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useGetAllSchoolsQuery } from '../../App/api/school/school';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';

export default function SchoolApprovals() {
  const { data, isLoading } = useGetAllSchoolsQuery();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const pending = useMemo(() => (data?.data.schools ?? []).filter((s) => s.status === 'pending'), [data]);
  const filtered = pending.filter((s) => {
    const q = search.trim().toLowerCase();
    return !q || s.schoolName.toLowerCase().includes(q) || s.district.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        New school registrations waiting for your review. Approving makes a school visible to parents immediately.
      </p>

      <Panel noBodyPadding>
        <div className="p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school or district..."
            className="w-full sm:max-w-sm border border-gray-300 rounded-lg px-3.5 py-2 text-[13px] outline-none focus:border-[#F09C00]"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-[13.5px] text-gray-500 px-4">
            {isLoading ? 'Loading…' : pending.length === 0 ? 'No schools are waiting for approval right now.' : 'No matches.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-t border-b border-gray-200">
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-4 py-2.5">School</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Submitted by</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Location</th>
                  <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((school) => (
                  <tr key={school.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[13px] text-[#282C34]">{school.schoolName}</div>
                      <div className="text-[11px] text-gray-400">New registration</div>
                    </td>
                    <td className="px-3 py-3 text-[13px]">
                      {school.SchoolManager.firstName} {school.SchoolManager.lastName}
                    </td>
                    <td className="px-3 py-3 text-[13px]">{school.district}</td>
                    <td className="px-3 py-3">
                      <Badge variant="pending">Pending</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {school.licenseDocument && (
                          <a
                            href={school.licenseDocument}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:text-[#05416B] hover:border-[#05416B] flex items-center justify-center flex-shrink-0"
                            aria-label="View legal document"
                          >
                            <IoDocumentTextOutline className="text-[15px]" />
                          </a>
                        )}
                        <button
                          onClick={() => navigate(`/superAdmin/ViewSchool/${school.id}`)}
                          className="border border-gray-300 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold cursor-pointer hover:border-[#05416B] hover:text-[#05416B] whitespace-nowrap"
                        >
                          Review
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
