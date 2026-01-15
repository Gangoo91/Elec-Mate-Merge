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

export function useSetupWizard() {
  const queryClient = useQueryClient();

  const saveData = useMutation({
    mutationFn: async (data: SetupWizardData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload logo if provided
      let logoUrl = null;
      if (data.logoFile) {
        const fileExt = data.logoFile.name.split('.').pop();
        const fileName = `${user.id}/logo-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(fileName, data.logoFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('company-logos')
            .getPublicUrl(fileName);
          logoUrl = publicUrl;
        }
      }

      // Upsert company profile
      const { error } = await supabase
        .from('company_profiles')
        .upsert({
          user_id: user.id,
          company_name: data.companyName || null,
          company_email: data.email || null,
          company_phone: data.phone || null,
          company_address: data.address || null,
          bank_details: (data.bankName || data.accountNumber) ? {
            bankName: data.bankName,
            accountName: data.accountName,
            accountNumber: data.accountNumber,
            sortCode: data.sortCode,
          } : null,
          payment_terms: data.paymentTerms,
          logo_url: logoUrl,
          primary_color: data.primaryColor,
          accent_color: data.accentColor,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;
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

  const completeOnboarding = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
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
        title: 'Setup complete!',
        description: 'You can now start creating quotes and invoices.',
      });
    },
  });

  return {
    saveData: saveData.mutateAsync,
    completeOnboarding: completeOnboarding.mutateAsync,
    isLoading: saveData.isPending || completeOnboarding.isPending,
  };
}
