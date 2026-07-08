import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SetupWizardData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  paymentTerms: string;
  logoFile: File | null;
  primaryColor: string;
  accentColor: string;
}

interface ApprenticeProfileData {
  apprenticeCourse: string;
  apprenticeYear: string;
  apprenticeCollege: string;
}

export function useSetupWizard() {
  const queryClient = useQueryClient();

  const saveData = useMutation({
    mutationFn: async (data: SetupWizardData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload logo if provided
      let logoUrl = null;
      if (data.logoFile) {
        const fileExt = data.logoFile.name.split('.').pop();
        const fileName = `${user.id}/logo-${Date.now()}.${fileExt}`;

        // 'company-branding' is the live logo bucket (owner-folder RLS). The
        // previous 'company-logos' bucket never existed, so wizard logos
        // silently failed to persist.
        const { error: uploadError } = await supabase.storage
          .from('company-branding')
          .upload(fileName, data.logoFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (!uploadError) {
          const {
            data: { publicUrl },
          } = supabase.storage.from('company-branding').getPublicUrl(fileName);
          logoUrl = publicUrl;
        }
      }

      // Save company profile. We select first then insert or update because
      // `company_profiles.user_id` does not currently have a UNIQUE constraint,
      // so `.upsert({ onConflict: 'user_id' })` fails with Postgres 42P10.
      const payload = {
        user_id: user.id,
        company_name: data.companyName || null,
        company_email: data.email || null,
        company_phone: data.phone || null,
        company_address: data.address || null,
        bank_details:
          data.bankName || data.accountNumber
            ? {
                bankName: data.bankName,
                accountName: data.accountName,
                accountNumber: data.accountNumber,
                sortCode: data.sortCode,
              }
            : null,
        payment_terms: data.paymentTerms,
        logo_url: logoUrl,
        primary_color: data.primaryColor,
        secondary_color: data.accentColor,
        updated_at: new Date().toISOString(),
      };

      const { data: existing, error: selectError } = await supabase
        .from('company_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (selectError && selectError.code !== 'PGRST116') throw selectError;

      if (existing?.id) {
        const { error: updateError } = await supabase
          .from('company_profiles')
          .update(payload)
          .eq('id', existing.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('company_profiles')
          .insert(payload);
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
    },
    onError: (error) => {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Apprentice fast-path. Writes course/year/college straight to profiles
  // and skips the company_profiles table entirely — apprentices don't have
  // a business yet and we shouldn't pretend they do.
  const saveApprenticeProfile = useMutation({
    mutationFn: async (data: ApprenticeProfileData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({
          apprentice_course: data.apprenticeCourse || null,
          apprentice_year: data.apprenticeYear || null,
          apprentice_college: data.apprenticeCollege?.trim() || null,
        })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const completeOnboarding = useMutation({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "You're all set",
        description: 'Welcome to Elec-Mate.',
      });
    },
  });

  return {
    saveData: saveData.mutateAsync,
    saveApprenticeProfile: saveApprenticeProfile.mutateAsync,
    completeOnboarding: completeOnboarding.mutateAsync,
    isLoading:
      saveData.isPending || saveApprenticeProfile.isPending || completeOnboarding.isPending,
  };
}
