import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useUser } from '../../Hooks/useUser';
import { useGetSchoolDetailsQuery } from '../../App/api/school/school';
import { useGetUsersQuery, useCreateAdmissionManagerMutation, useDeleteUserMutation } from '../../App/api/users/users';
import Panel from '../../Components/dashboard/Panel';
import ConfirmDialog from '../../Components/ConfirmDialog';
import { TextInput } from '../../Components/seats/InputSeats';
import { SelectInput } from '../../Components/seats/SelectInput';
import { gender } from '../../Types/Seats';
import { districts } from '../../Types/district';
import { IoEyeOutline, IoTrashOutline, IoCheckmarkCircle } from 'react-icons/io5';

type ErrorResponse = { message?: string };

const EMPTY_FORM = { firstName: '', lastName: '', email: '', password: '', gender: '', district: '' };

export default function AdmissionManager() {
  const { user } = useUser();
  const { data } = useGetSchoolDetailsQuery(user?.schoolId ?? skipToken);
  const navigate = useNavigate();
  const schoolId = user?.schoolId ?? '';
  const schoolName = data?.data.schoolName ?? 'your school';

  const { data: usersData, isLoading: loadingUsers, refetch } = useGetUsersQuery();
  const [createAdmissionManager, { isLoading: creating, error: createError }] = useCreateAdmissionManagerMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const admissionManagers = (usersData?.data ?? []).filter((u) => u.role?.name === 'AdmissionManager');

  const [form, setForm] = useState(EMPTY_FORM);
  const [created, setCreated] = useState(false);
  const [revokeId, setRevokeId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!schoolId) {return;}
    try {
      await createAdmissionManager({
        schoolId,
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          gender: form.gender as 'Male' | 'Female' | 'Other',
          district: form.district,
          schoolId,
        },
      }).unwrap();
      setForm(EMPTY_FORM);
      setCreated(true);
      setTimeout(() => setCreated(false), 3500);
      refetch();
    } catch {
      // error surfaced below via `createError`
    }
  };

  const handleRevoke = async () => {
    if (!revokeId) {return;}
    try {
      await deleteUser(revokeId).unwrap();
      refetch();
    } finally {
      setRevokeId(null);
    }
  };

  const createErrorMessage =
    createError && 'status' in (createError as FetchBaseQueryError)
      ? (createError as FetchBaseQueryError & { data: ErrorResponse }).data?.message || 'Failed to create account'
      : createError
        ? 'Failed to create account'
        : '';

  return (
    <div className="space-y-5">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        Give someone their own login to review and decide on applications for {schoolName}. If no Admission
        Manager is assigned, applications are reviewed by you.
      </p>

      {created && (
        <div className="flex items-center gap-2 bg-[#E7F5EA] border border-[#1E7A34]/30 text-[#1E7A34] rounded-lg px-4 py-3 text-[13px] font-semibold">
          <IoCheckmarkCircle /> Admission Manager account created — they can log in with the email and password you set.
        </div>
      )}

      <Panel title={`Admission Managers — ${schoolName}`} noBodyPadding>
        {loadingUsers ? (
          <div className="text-center py-8 text-[13px] text-gray-500">Loading…</div>
        ) : admissionManagers.length === 0 ? (
          <div className="text-center py-8 text-[13px] text-gray-500 px-5">
            No Admission Manager assigned yet — you&apos;re currently reviewing all applications yourself.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {admissionManagers.map((manager) => (
              <div key={manager.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <div>
                  <div className="font-semibold text-[13.5px] text-[#282C34]">
                    {manager.firstName} {manager.lastName}
                  </div>
                  <div className="text-[11.5px] text-gray-400">{manager.email}</div>
                </div>
                <button
                  onClick={() => setRevokeId(manager.id)}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#B10E1E] cursor-pointer"
                >
                  <IoTrashOutline /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Add an Admission Manager">
        <form onSubmit={handleCreate} className="space-y-1">
          {createErrorMessage && (
            <div className="mb-3 bg-[#FBEAE8] border border-[#B10E1E]/30 text-[#B10E1E] rounded-lg px-4 py-3 text-[13px] font-semibold">
              {createErrorMessage}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <TextInput label="First name" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
            <TextInput label="Last name" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
          </div>
          <TextInput label="Email address" name="email" type="email" placeholder="manager@email.com" value={form.email} onChange={handleChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <TextInput label="Temporary password" name="password" type="password" placeholder="They can change this later" value={form.password} onChange={handleChange} />
            <SelectInput label="Gender" name="gender" placeholder="Select gender" options={gender.map((g) => ({ value: g.value, label: g.label }))} value={form.gender} onChange={handleSelectChange} />
          </div>
          <SelectInput label="District" name="district" placeholder="Select district" options={districts.filter((d) => d.value !== '------')} value={form.district} onChange={handleSelectChange} />

          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold text-[13px] px-5 py-2.5 rounded-lg cursor-pointer disabled:opacity-60 mt-3"
          >
            {creating && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {creating ? 'Creating…' : 'Create account'}
          </button>
        </form>
      </Panel>

      <button
        onClick={() => navigate('/admissionManager/dashboard')}
        className="flex items-center gap-1.5 text-[13px] text-[#05416B] font-semibold cursor-pointer"
      >
        <IoEyeOutline /> Preview the Admission Manager dashboard
      </button>

      <ConfirmDialog
        isOpen={!!revokeId}
        title="Remove this Admission Manager?"
        message="They'll immediately lose access to your school's applications. This can't be undone."
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleRevoke}
        onCancel={() => setRevokeId(null)}
      />
    </div>
  );
}
