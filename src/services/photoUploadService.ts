import { supabase } from '@/integrations/supabase/client';

const BUCKET_NAME = 'employee-photos';

export const uploadEmployeePhoto = async (
  employeeId: string,
  file: File
): Promise<string | null> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${employeeId}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      return null;
    }

    // Bare path, not a public URL: the bucket is going private and every
    // reader signs paths on demand (useStorageUrl('employee-photos', …)).
    // The name starts with the roster id — the storage policies key off it.
    return filePath;
  } catch (error) {
    console.error('Error in uploadEmployeePhoto:', error);
    return null;
  }
};

export const deleteEmployeePhoto = async (photoUrl: string): Promise<boolean> => {
  try {
    // Stored value may be a full URL (legacy rows) or a bare storage path
    // (privacy-ready rows) — extract the object name either way.
    let fileName: string;
    if (/^https?:\/\//i.test(photoUrl)) {
      const url = new URL(photoUrl);
      const pathParts = url.pathname.split('/');
      fileName = decodeURIComponent(pathParts[pathParts.length - 1].split('?')[0]);
    } else {
      fileName = photoUrl.replace(/^\/+/, '');
    }

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

    if (error) {
      console.error('Error deleting photo:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteEmployeePhoto:', error);
    return false;
  }
};
