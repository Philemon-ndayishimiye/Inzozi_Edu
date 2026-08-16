import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IoCheckmarkCircle, IoImagesOutline } from 'react-icons/io5';
import { CiCamera } from 'react-icons/ci';
import { useGetProfileQuery, useGetSchoolDetailsQuery, useUpdateProfileMutation } from '../../App/api/school/school';
import { useUser } from '../../Hooks/useUser';
import Panel from '../../Components/dashboard/Panel';
import SchoolDescriptionTextarea from '../../Components/schoolProfile/TextArea';
import { TextInput } from '../../Components/seats/InputSeats';
import EditProfileButton from '../../Components/schoolProfile/EditComp';

type ErrorResponse = { message?: string };

type ProfileForm = {
  description: string;
  mission: string;
  vision: string;
  foundedYear: string;
  profilePhoto: File | null;
};

const EMPTY_FORM: ProfileForm = { description: '', mission: '', vision: '', foundedYear: '', profilePhoto: null };

export default function Settings() {
  const { user } = useUser();
  const { data: schoolDetails } = useGetSchoolDetailsQuery(user?.schoolId ?? skipToken);
  const { data: profileData, refetch: refetchProfile } = useGetProfileQuery(user?.schoolId ?? skipToken);
  const [updateProfile, { isLoading: saving, error }] = useUpdateProfileMutation();

  const profile = profileData?.data.profiles?.[0];
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Resync the form once the real profile loads, without clobbering
  // whatever the user is actively typing.
  useEffect(() => {
    if (!profile) {return;}
    setForm((prev) => ({
      description: prev.description || profile.description || '',
      mission: prev.mission || profile.mission || '',
      vision: prev.vision || profile.vision || '',
      foundedYear: prev.foundedYear || profile.foundedYear || '',
      profilePhoto: prev.profilePhoto,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    if (target.type === 'file') {
      const input = target as HTMLInputElement;
      const file = input.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, profilePhoto: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append('description', form.description);
    body.append('mission', form.mission);
    body.append('vision', form.vision);
    body.append('foundedYear', form.foundedYear);
    if (form.profilePhoto) {body.append('profilePhoto', form.profilePhoto);}

    try {
      await updateProfile({ id: user?.schoolId || '', data: body }).unwrap();
      refetchProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch {
      // error surfaced below via the mutation's `error` state
    }
  };

  const errorMessage =
    error && 'status' in (error as FetchBaseQueryError)
      ? (error as FetchBaseQueryError & { data: ErrorResponse }).data?.message || 'Failed to save changes'
      : error
        ? 'Failed to save changes'
        : '';

  const photoSrc = preview || profile?.profilePhoto || '/images/school.png';

  return (
    <div className="space-y-5">
      <p className="text-[13.5px] text-gray-500 max-w-xl">
        Your school&apos;s story and profile photo — this is what parents see on {schoolDetails?.data.schoolName ?? 'your'} page.
      </p>

      {saved && (
        <div className="flex items-center gap-2 bg-[#E7F5EA] border border-[#1E7A34]/30 text-[#1E7A34] rounded-lg px-4 py-3 text-[13px] font-semibold">
          <IoCheckmarkCircle /> Profile updated.
        </div>
      )}
      {errorMessage && (
        <div className="bg-[#FBEAE8] border border-[#B10E1E]/30 text-[#B10E1E] rounded-lg px-4 py-3 text-[13px] font-semibold">
          {errorMessage}
        </div>
      )}

      <Panel title="Profile photo">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img src={photoSrc} alt="School profile" className="w-24 h-24 rounded-full object-cover border border-gray-200" />
            <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white flex items-center justify-center cursor-pointer shadow">
              <CiCamera className="text-lg" />
              <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
            </label>
          </div>
          <div className="text-[12.5px] text-gray-500 max-w-sm">
            Square photos work best. This is saved together with the rest of the form below — pick a photo, then
            hit &quot;Save changes&quot;.
          </div>
        </div>
      </Panel>

      <Panel title="Vision, mission & story">
        <form onSubmit={handleSubmit} className="space-y-1">
          <SchoolDescriptionTextarea label="About / description" name="description" value={form.description} onChange={handleChange} placeholder="Tell parents what makes your school special" />
          <SchoolDescriptionTextarea label="Mission" name="mission" value={form.mission} onChange={handleChange} placeholder="Enter mission statement" />
          <SchoolDescriptionTextarea label="Vision" name="vision" value={form.vision} onChange={handleChange} placeholder="Enter vision statement" />
          <div className="max-w-xs">
            <TextInput label="Founded year" type="number" name="foundedYear" value={form.foundedYear} onChange={handleChange} placeholder="e.g. 2005" />
          </div>
          <div className="flex justify-end pt-3">
            <EditProfileButton label={saving ? 'Saving…' : 'Save changes'} type="submit" disabled={saving} loading={saving} />
          </div>
        </form>
      </Panel>

      <Panel title="Facility photos">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[12.5px] text-gray-500 max-w-sm">
            Photos of your classrooms, dormitories, library and more are managed on the Facilities page, organized
            by category.
          </p>
          <Link
            to="/schoolAdmin/gallery"
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold text-[13px] px-4 py-2.5 rounded-lg whitespace-nowrap"
          >
            <IoImagesOutline /> Manage facility photos
          </Link>
        </div>
      </Panel>
    </div>
  );
}
