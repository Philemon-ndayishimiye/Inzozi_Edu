import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAdd } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import Select from '../../Components/Select';
import { TextInput } from '../../Components/seats/InputSeats';
import { category, categoryLabels } from '../../Types/Category';
import {
  useAddGalleryMutation,
  useGetAllGalleryQuery,
  useDeleteGalleryMutation,
  useUpdateGalleryMutation,
  type GalleryImage,
} from '../../App/api/gallery/Gallery';
import { useUser } from '../../Hooks/useUser';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ErrorResponse } from '../Login';
import GallerCard from '../../Components/cards/GalleryCard';
import ConfirmDialog from '../../Components/ConfirmDialog';
import { MdOutlinePhotoLibrary } from 'react-icons/md';

const CATEGORY_OPTIONS = category.filter((c) => c.value !== '------');

type FormState = { caption: string; category: string; imageUrl: File | null };
const EMPTY_FORM: FormState = { caption: '', category: '', imageUrl: null };

export default function Gallery() {
  const { t } = useTranslation();
  const { user } = useUser();

  const { data, refetch } = useGetAllGalleryQuery(user?.schoolId ?? skipToken);
  const [createGallery, { isLoading: creating, isError: createIsError, error: createError }] = useAddGalleryMutation();
  const [updateGallery, { isLoading: updating, isError: updateIsError, error: updateError }] = useUpdateGalleryMutation();
  const [deleteGallery, { isLoading: deleting }] = useDeleteGalleryMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<{ category?: string; caption?: string; imageUrl?: string }>({});

  const images = data?.data.images ?? [];
  const isSaving = creating || updating;
  const saveError = createIsError || updateIsError ? (createError ?? updateError) : undefined;

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.caption.trim()) {newErrors.caption = t('galleryPage.captionRequired');}
    if (!formData.category.trim()) {newErrors.category = t('galleryPage.categoryRequired');}
    if (!editing && !formData.imageUrl) {newErrors.imageUrl = t('galleryPage.imageRequired');}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    setEditing(null);
    setFormData(EMPTY_FORM);
    setErrors({});
    setOpen(true);
  };

  const openEditModal = (image: GalleryImage) => {
    setEditing(image);
    setFormData({ caption: image.caption, category: image.category, imageUrl: null });
    setErrors({});
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || !user?.schoolId) {return;}

    const form = new FormData();
    form.append('caption', formData.caption);
    form.append('category', formData.category);
    if (formData.imageUrl) {form.append('imageUrl', formData.imageUrl);}

    try {
      if (editing) {
        await updateGallery({ schoolId: user.schoolId, id: editing.id, data: form }).unwrap();
      } else {
        await createGallery({ data: form, schoolId: user.schoolId }).unwrap();
      }
      setFormData(EMPTY_FORM);
      setOpen(false);
      setEditing(null);
      refetch();
    } catch {
      // error surfaced below via `saveError`
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !user?.schoolId) {return;}
    try {
      await deleteGallery({ id: deleteTarget.id, schoolId: user.schoolId }).unwrap();
      refetch();
    } finally {
      setDeleteTarget(null);
    }
  };

  const sections = CATEGORY_OPTIONS.map((c) => ({
    value: c.value,
    label: c.label,
    items: images.filter((img) => img.category === c.value),
  })).filter((s) => s.items.length > 0);

  return (
    <>
      <div className="flex justify-between items-center pb-4 gap-3 flex-wrap">
        <p className="text-[13.5px] text-gray-500 max-w-md">
          {t('galleryPage.intro')}
        </p>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 border-none text-[13px] font-bold bg-gradient-to-r from-[#F09C00] to-[#FFB833] px-4 py-2.5 cursor-pointer text-white rounded-lg whitespace-nowrap transition-transform active:scale-[0.97]"
        >
          <IoIosAdd className="text-lg" /> {t('galleryPage.addFacility')}
        </button>
      </div>

      {images.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-lg py-16 text-center">
          <MdOutlinePhotoLibrary className="text-3xl text-gray-300 mx-auto mb-2" />
          <p className="text-[13.5px] text-gray-500">
            {t('galleryPage.noPhotosYet')}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {sections.map((section) => (
            <div key={section.value} className="bg-white border border-gray-200 py-5 rounded-lg">
              <h2 className="text-black font-bold text-[16px] text-center font-family-playfair pb-4">
                {section.label} <span className="text-gray-400 font-normal text-[13px]">({section.items.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
                {section.items.map((gallery) => (
                  <GallerCard
                    key={gallery.id}
                    image={gallery.imageUrl}
                    title={categoryLabels[gallery.category] ?? gallery.category}
                    description={gallery.caption}
                    onEdit={() => openEditModal(gallery)}
                    onDelete={() => setDeleteTarget(gallery)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="inzozi-backdrop fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="inzozi-dialog relative bg-white w-full max-w-md rounded-xl p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
              aria-label={t('galleryPage.close')}
            >
              <IoClose />
            </button>

            <div className="pb-5 text-center">
              <h1 className="font-bold font-family-playfair text-[21px] text-[#282C34]">
                {editing ? t('galleryPage.editPhoto') : t('galleryPage.addPhoto')}
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <Select options={category} value={formData.category} onChange={handleSelectChange('category')} />
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

              <TextInput label={t('galleryPage.caption')} placeholder={t('galleryPage.captionPlaceholder')} value={formData.caption} name="caption" onChange={handleChange} />
              {errors.caption && <p className="text-red-500 text-sm">{errors.caption}</p>}

              <TextInput
                label={editing ? t('galleryPage.replacePhoto') : t('galleryPage.photo')}
                placeholder="imageUrl"
                name="imageUrl"
                type="file"
                onChange={handleChange}
              />
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold rounded-lg py-3 text-[14px] mt-4 cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
              >
                {isSaving && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {isSaving ? t('galleryPage.saving') : editing ? t('galleryPage.saveChanges') : t('galleryPage.addFacility')}
              </button>
            </form>

            {saveError && (
              <p className="text-red-500 text-[13px] font-family-poppins pt-3 text-center">
                {'status' in (saveError as FetchBaseQueryError)
                  ? (saveError as FetchBaseQueryError & { data: ErrorResponse }).data?.message || t('galleryPage.somethingWentWrong')
                  : t('galleryPage.somethingWentWrong')}
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={t('galleryPage.deleteConfirmTitle')}
        message={t('galleryPage.deleteConfirmMessage')}
        confirmLabel={t('galleryPage.delete')}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
