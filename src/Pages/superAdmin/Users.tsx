import { useMemo, useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation, type RemoteUser } from '../../App/api/users/users';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';
import ConfirmDialog from '../../Components/ConfirmDialog';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoTrashOutline } from 'react-icons/io5';

const PAGE_SIZE = 8;

const roleVariant = (roleName: string) => {
  if (roleName === 'Admin') {return 'admin' as const;}
  if (roleName === 'AdmissionManager') {return 'admissionManager' as const;}
  return 'schoolManager' as const;
};

const roleLabel = (roleName: string) => {
  if (roleName === 'AdmissionManager') {return 'Admission Manager';}
  if (roleName === 'SchoolManager') {return 'School Manager';}
  return roleName;
};

export default function Users() {
  const { data, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [removeTarget, setRemoveTarget] = useState<RemoteUser | null>(null);

  const users = useMemo(() => data?.data ?? [], [data]);
  const roles = useMemo(() => Array.from(new Set(users.map((u) => u.role?.name).filter(Boolean))), [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.School?.schoolName ?? '').toLowerCase().includes(q);
      const matchesRole = roleFilter === 'all' || u.role?.name === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleRemove = async () => {
    if (!removeTarget) {return;}
    try {
      await deleteUser(removeTarget.id).unwrap();
      refetch();
    } finally {
      setRemoveTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        Everyone with an account on Inzozi — School Managers, Admission Managers, and Admins.
      </p>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, or school..."
            className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[#F09C00]"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#F09C00]"
        >
          <option value="all">All roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {roleLabel(r as string)}
            </option>
          ))}
        </select>
      </div>

      <Panel noBodyPadding>
        {isLoading ? (
          <div className="py-14 text-center text-[13.5px] text-gray-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-14 text-center text-[13.5px] text-gray-500">No users match that filter.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-4 py-2.5">Name</th>
                    <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Role</th>
                    <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">Email</th>
                    <th className="text-left font-mono text-[10px] uppercase text-gray-400 px-3 py-2.5">School</th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {paged.map((u) => (
                    <tr key={u.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 font-semibold text-[13px] text-[#282C34]">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={roleVariant(u.role?.name ?? '')}>{roleLabel(u.role?.name ?? '—')}</Badge>
                      </td>
                      <td className="px-3 py-3 text-[13px] text-gray-600">{u.email}</td>
                      <td className="px-3 py-3 text-[13px] text-gray-600">{u.School?.schoolName ?? '—'}</td>
                      <td className="px-3 py-3">
                        {u.role?.name !== 'Admin' && (
                          <button
                            onClick={() => setRemoveTarget(u)}
                            className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#B10E1E] cursor-pointer"
                          >
                            <IoTrashOutline /> Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <span className="text-[12px] text-gray-500">
                  Page {currentPage} of {totalPages} · {filtered.length} users
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                  >
                    <IoChevronBack className="text-[14px]" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                  >
                    <IoChevronForward className="text-[14px]" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Panel>

      <ConfirmDialog
        isOpen={!!removeTarget}
        title="Remove this account?"
        message={`${removeTarget?.firstName ?? ''} ${removeTarget?.lastName ?? ''} will immediately lose access. This can't be undone.`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleRemove}
        onCancel={() => setRemoveTarget(null)}
      />
    </div>
  );
}
