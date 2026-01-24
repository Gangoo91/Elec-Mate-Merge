import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CompanyProfile } from '@/types/company';
import { toast } from '@/hooks/use-toast';
import { logger, generateRequestId } from '@/utils/logger';

export const useCompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanyProfile = useCallback(async () => {
    const requestId = generateRequestId();
    logger.api('company_profiles/fetch', requestId).start();

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        logger.info('No user found, skipping company profile fetch');
        return;
      }

      // Use RPC function to bypass 406 error from direct table query
      const { data, error } = await supabase
        .rpc('get_my_company_profile');

      if (error) {
        logger.api('company_profiles/fetch', requestId).error(error);
        return;
      }

      // RPC returns an array, get first item
      const profile = Array.isArray(data) ? data[0] : data;

      if (profile) {
        logger.api('company_profiles/fetch', requestId).success({ companyName: profile.company_name });
        setCompanyProfile({
          ...profile,
          bank_details: profile.bank_details || {},
          created_at: new Date(profile.created_at),
          updated_at: new Date(profile.updated_at),
        } as CompanyProfile);
      } else {
        logger.info('No company profile found for user');
      }
    } catch (error) {
      logger.api('company_profiles/fetch', requestId).error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCompanyProfile = useCallback(async (profile: Partial<CompanyProfile>) => {
    const requestId = generateRequestId();
    const isUpdate = !!companyProfile?.id;
    logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).start({
      companyName: profile.company_name
    });
    logger.action('Save company profile', 'company', { isUpdate });

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        logger.warn('Attempted to save company profile without authentication');
        toast({
          title: "Authentication Required",
          description: "Please log in to save company profile.",
          variant: "destructive"
        });
        return false;
      }

      const { created_at, updated_at, id, ...profileData } = profile;
      const cleanProfileData = {
        ...profileData,
        user_id: user.id,
        company_name: profileData.company_name || 'Untitled Company',
      };

      let result;
      if (companyProfile?.id) {
        // Update existing
        result = await supabase
          .from('company_profiles')
          .update(cleanProfileData)
          .eq('id', companyProfile.id)
          .select()
          .single();
      } else {
        // Create new
        result = await supabase
          .from('company_profiles')
          .insert(cleanProfileData)
          .select()
          .single();
      }

      if (result.error) {
        logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).error(result.error);
        toast({
          title: "Save Failed",
          description: "Failed to save company profile. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).success({
        profileId: result.data.id
      });

      setCompanyProfile({
        ...result.data,
        bank_details: result.data.bank_details || {},
        created_at: new Date(result.data.created_at),
        updated_at: new Date(result.data.updated_at),
      } as CompanyProfile);

      toast({
        title: "Profile Saved",
        description: "Company profile has been saved successfully.",
        variant: "success"
      });

      return true;
    } catch (error) {
      logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).error(error);
      toast({
        title: "Save Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [companyProfile]);

  const uploadLogo = useCallback(async (file: File): Promise<{ url?: string; dataUrl?: string } | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Convert to base64 for PDF embedding
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Upload to storage
      const fileName = `${user.id}/logo-${Date.now()}.${file.name.split('.').pop()}`;
      const { data, error } = await supabase.storage
        .from('company-branding')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading logo:', error);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('company-branding')
        .getPublicUrl(data.path);

      return { url: publicUrl, dataUrl };
    } catch (error) {
      console.error('Error uploading logo:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchCompanyProfile();
  }, [fetchCompanyProfile]);

  // Refetch when window regains focus (e.g., after editing in settings)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchCompanyProfile();
      }
    };

    const handleFocus = () => {
      fetchCompanyProfile();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchCompanyProfile]);

  return {
    companyProfile,
    loading,
    saveCompanyProfile,
    uploadLogo,
    refetch: fetchCompanyProfile,
  };
};