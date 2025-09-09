import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CompanyProfile } from '@/types/company';
import { toast } from '@/hooks/use-toast';

export const useCompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanyProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching company profile:', error);
        return;
      }

      if (data) {
        setCompanyProfile({
          ...data,
          bank_details: data.bank_details || {},
          created_at: new Date(data.created_at),
          updated_at: new Date(data.updated_at),
        } as CompanyProfile);
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCompanyProfile = useCallback(async (profile: Partial<CompanyProfile>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
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
        console.error('Error saving company profile:', result.error);
        toast({
          title: "Save Failed",
          description: "Failed to save company profile. Please try again.",
          variant: "destructive"
        });
        return false;
      }

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
      console.error('Error saving company profile:', error);
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

  return {
    companyProfile,
    loading,
    saveCompanyProfile,
    uploadLogo,
    refetch: fetchCompanyProfile,
  };
};