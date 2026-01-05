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
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadEmployeePhoto:', error);
    return null;
  }
};

export const deleteEmployeePhoto = async (photoUrl: string): Promise<boolean> => {
  try {
    // Extract file path from URL
    const url = new URL(photoUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

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
