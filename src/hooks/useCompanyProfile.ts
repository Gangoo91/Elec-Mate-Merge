import { useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { QUERY_KEYS, QUERY_PRESETS } from '@/lib/queryConfig';
import { CompanyProfile } from '@/types/company';
import { toast } from '@/hooks/use-toast';
import { logger, generateRequestId } from '@/utils/logger';

/**
 * Shared cache via React Query (ELE-684).
 *
 * This hook has 54 call sites. It previously held the profile in local state and
 * ran `auth.getUser()` + `get_my_company_profile` on EVERY mount, so a screen
 * with several consumers fired several identical round trips. The queryKey now
 * dedupes them into one request — same fix as `useCourseProgress`.
 *
 * Only the READ path changed. `saveCompanyProfile` and `uploadLogo` still call
 * `supabase.auth.getUser()` themselves: they are user-initiated, they were never
 * part of the N+1, and they write `user_id`, so they keep verifying the session
 * against the server rather than trusting a cached context value.
 *
 * The hook's return shape is unchanged, so no call site needed touching.
 */
export const useCompanyProfile = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const queryKey = useMemo(() => [...QUERY_KEYS.COMPANY_PROFILE, userId] as const, [userId]);

  const {
    data: companyProfile = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<CompanyProfile | null> => {
      const requestId = generateRequestId();
      logger.api('company_profiles/fetch', requestId).start();

      // Use RPC function to bypass 406 error from direct table query
      const { data, error } = await supabase.rpc('get_my_company_profile');

      if (error) {
        logger.api('company_profiles/fetch', requestId).error(error);
        toast({
          title: 'Profile Load Failed',
          description:
            'Could not load your company profile. Pull down to refresh or try again later.',
          variant: 'destructive',
        });
        // Throw rather than return null: React Query then retries and, crucially,
        // does not cache a failure as though it were "this user has no profile".
        throw error;
      }

      // RPC returns an array, get first item
      const profile = Array.isArray(data) ? data[0] : data;

      if (!profile) {
        logger.info('No company profile found for user');
        return null;
      }

      logger.api('company_profiles/fetch', requestId).success({ companyName: profile.company_name });

      return {
        ...profile,
        bank_details: profile.bank_details || {},
        created_at: new Date(profile.created_at),
        updated_at: new Date(profile.updated_at),
      } as CompanyProfile;
    },
    enabled: !!userId,
    ...QUERY_PRESETS.USER_DATA,
  });

  const saveCompanyProfile = useCallback(
    async (profile: Partial<CompanyProfile>) => {
      const requestId = generateRequestId();
      const isUpdate = !!companyProfile?.id;
      logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).start({
        companyName: profile.company_name,
      });
      logger.action('Save company profile', 'company', { isUpdate });

      try {
        setSaving(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          logger.warn('Attempted to save company profile without authentication');
          toast({
            title: 'Authentication Required',
            description: 'Please log in to save company profile.',
            variant: 'destructive',
          });
          return false;
        }

        const { created_at, updated_at, id, ...profileData } = profile;
        const cleanProfileData = {
          ...profileData,
          user_id: user.id,
          // Preserve the existing company name on partial saves (e.g. saving the
          // Reviews / Invoice sub-sheets). Previously this defaulted to '' which
          // silently wiped the company name whenever any other sheet was saved.
          company_name: profileData.company_name ?? companyProfile?.company_name ?? '',
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

          // 23505: a concurrent save (or another surface, e.g. employer
          // Settings) created the row first — user_id is unique, so apply
          // this save as an update instead of failing.
          if (result.error?.code === '23505') {
            result = await supabase
              .from('company_profiles')
              .update(cleanProfileData)
              .eq('user_id', user.id)
              .select()
              .single();
          }
        }

        if (result.error) {
          logger
            .api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId)
            .error(result.error);
          toast({
            title: 'Save Failed',
            description: 'Failed to save company profile. Please try again.',
            variant: 'destructive',
          });
          return false;
        }

        logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).success({
          profileId: result.data.id,
        });

        // Write straight into the shared cache so every consumer updates at once
        // (this is what local setState used to do, for one component only).
        queryClient.setQueryData(queryKey, {
          ...result.data,
          bank_details: result.data.bank_details || {},
          created_at: new Date(result.data.created_at),
          updated_at: new Date(result.data.updated_at),
        } as CompanyProfile);

        // CRITICAL: Sync logo_url to inspector_profiles so EICR certificates show the logo
        // The EICR form uses inspector_profiles.company_logo, not company_profiles.logo_url
        if (cleanProfileData.logo_url !== undefined) {
          const { error: syncError } = await supabase
            .from('inspector_profiles')
            .update({ company_logo: cleanProfileData.logo_url })
            .eq('user_id', user.id);

          if (syncError) {
            console.warn(
              '[useCompanyProfile] Failed to sync logo to inspector profiles:',
              syncError
            );
          } else {
            console.log('[useCompanyProfile] Logo synced to inspector profiles');
          }
        }

        // Sync scheme logos to inspector profiles for PDF embedding
        if (cleanProfileData.registration_scheme_logo !== undefined) {
          const { error: syncError } = await supabase
            .from('inspector_profiles')
            .update({ registration_scheme_logo: cleanProfileData.registration_scheme_logo })
            .eq('user_id', user.id);
          if (syncError) {
            console.warn(
              '[useCompanyProfile] Failed to sync registration scheme logo to inspector profiles:',
              syncError
            );
          }
        }

        if (cleanProfileData.scheme_logo_data_url !== undefined) {
          const { error: syncError } = await supabase
            .from('inspector_profiles')
            .update({ scheme_logo_data_url: cleanProfileData.scheme_logo_data_url })
            .eq('user_id', user.id);
          if (syncError) {
            console.warn(
              '[useCompanyProfile] Failed to sync scheme logo data URL to inspector profiles:',
              syncError
            );
          }
        }

        toast({
          title: 'Profile Saved',
          description: 'Company profile has been saved successfully.',
          variant: 'success',
        });

        return true;
      } catch (error) {
        logger.api(`company_profiles/${isUpdate ? 'update' : 'create'}`, requestId).error(error);
        toast({
          title: 'Save Failed',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
        return false;
      } finally {
        setSaving(false);
      }
    },
    [companyProfile, queryClient, queryKey]
  );

  const uploadLogo = useCallback(
    async (file: File): Promise<{ url?: string; dataUrl?: string } | null> => {
      console.log(
        '[uploadLogo] Starting upload for file:',
        file.name,
        'size:',
        file.size,
        'type:',
        file.type
      );

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log('[uploadLogo] Auth check - user:', user?.id);

        if (!user) {
          console.error('[uploadLogo] No authenticated user');
          toast({
            title: 'Authentication Required',
            description: 'Please log in to upload a logo.',
            variant: 'destructive',
          });
          return null;
        }

        // Check file size (max 20MB)
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
          console.error('[uploadLogo] File too large:', file.size);
          toast({
            title: 'File Too Large',
            description: 'Logo must be under 20MB. Please compress or resize your image.',
            variant: 'destructive',
          });
          return null;
        }

        // Convert to base64 for PDF embedding
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });

        // Determine file extension (handle HEIC)
        let extension = file.name.split('.').pop()?.toLowerCase() || 'png';
        if (extension === 'heic' || extension === 'heif') {
          extension = 'jpg'; // HEIC files get converted by browser
        }

        // Upload to storage
        const fileName = `${user.id}/logo-${Date.now()}.${extension}`;
        console.log('[uploadLogo] Uploading to path:', fileName);

        const { data, error } = await supabase.storage
          .from('company-branding')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true, // Allow overwriting existing logos
          });

        if (error) {
          console.error('[uploadLogo] Storage upload failed:', error);
          toast({
            title: 'Upload Failed',
            description: error.message || 'Failed to upload logo. Please try again.',
            variant: 'destructive',
          });
          return null;
        }

        console.log('[uploadLogo] Upload successful, path:', data.path);

        const {
          data: { publicUrl },
        } = supabase.storage.from('company-branding').getPublicUrl(data.path);

        console.log('[uploadLogo] Public URL generated:', publicUrl);

        toast({
          title: 'Logo Uploaded',
          description: 'Your company logo has been uploaded successfully.',
          variant: 'success',
        });

        return { url: publicUrl, dataUrl };
      } catch (error) {
        console.error('[uploadLogo] Unexpected error:', error);
        toast({
          title: 'Upload Failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
        return null;
      }
    },
    []
  );

  // NOTE: no refetch-on-window-focus — it was resetting file pickers mid-selection.
  // QUERY_PRESETS.USER_DATA keeps the profile fresh for 5 minutes; saves write
  // through to the cache immediately, so a manual refetch is rarely needed.

  return {
    companyProfile,
    loading: isLoading || saving,
    saveCompanyProfile,
    uploadLogo,
    refetch,
  };
};
