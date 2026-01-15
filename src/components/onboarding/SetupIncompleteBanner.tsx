import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, X, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function SetupIncompleteBanner() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: setupStatus } = useQuery({
    queryKey: ['setup-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Check profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed, setup_banner_dismissed')
        .eq('id', user.id)
        .single();

      // Check company profile
      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('company_name, bank_details, company_email')
        .eq('user_id', user.id)
        .single();

      return {
        onboardingComplete: profile?.onboarding_completed,
        bannerDismissed: profile?.setup_banner_dismissed,
        hasCompanyName: !!companyProfile?.company_name,
        hasBankDetails: !!companyProfile?.bank_details?.accountNumber,
        hasEmail: !!companyProfile?.company_email,
      };
    },
  });

  const dismissBanner = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ setup_banner_dismissed: true })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setup-status'] });
    },
  });

  const handleDismiss = () => {
    dismissBanner.mutate();
  };

  // Don't show if:
  // - Onboarding marked complete
  // - Banner permanently dismissed
  // - All critical fields present
  if (!setupStatus) return null;
  if (setupStatus.onboardingComplete) return null;
  if (setupStatus.bannerDismissed) return null;
  if (setupStatus.hasCompanyName && setupStatus.hasBankDetails && setupStatus.hasEmail) return null;

  const missingItems = [];
  if (!setupStatus.hasCompanyName) missingItems.push('company name');
  if (!setupStatus.hasEmail) missingItems.push('business email');
  if (!setupStatus.hasBankDetails) missingItems.push('bank details');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4"
    >
      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">
              Complete your setup to unlock full features
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              You're missing: <strong>{missingItems.join(', ')}</strong>
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-white h-9 touch-manipulation"
                onClick={() => navigate('/settings?tab=company')}
              >
                <Settings className="h-3.5 w-3.5 mr-1.5" />
                Complete Setup
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                disabled={dismissBanner.isPending}
                className="text-muted-foreground hover:text-foreground h-9 touch-manipulation"
              >
                Remind me later
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 touch-manipulation"
            onClick={handleDismiss}
            disabled={dismissBanner.isPending}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
