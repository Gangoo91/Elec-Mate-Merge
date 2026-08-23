import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SetupWizard } from '@/components/onboarding/SetupWizard';

/**
 * Course-capture gate for apprentices, mounted in ApprenticeRoutes and
 * StudyCentreRoutes. The SetupWizard's apprentice step (course / year /
 * college) was previously mounted only on /electrician — a page apprentices
 * never visit — so apprentice_course was never captured and the EPA/AM2
 * simulators hard-gated on a qualification that couldn't be set.
 *
 * Same localStorage key as the ElectricalHub mount so nobody is prompted
 * twice, and "Skip for now" survives re-login.
 */
export function ApprenticeSetupGate() {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const isApprentice = profile?.role === 'apprentice';

  const { data } = useQuery({
    queryKey: ['apprentice-course-check'],
    enabled: isApprentice,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: row } = await supabase
        .from('profiles')
        .select('apprentice_course')
        .eq('id', user.id)
        .single();
      return { apprenticeCourse: row?.apprentice_course ?? null };
    },
  });

  useEffect(() => {
    if (!isApprentice || !data) return;
    if (data.apprenticeCourse) return;
    const hasSeenWizard = localStorage.getItem('setup_wizard_shown');
    if (!hasSeenWizard) {
      setOpen(true);
      localStorage.setItem('setup_wizard_shown', 'true');
    }
  }, [isApprentice, data]);

  if (!isApprentice) return null;

  return (
    <SetupWizard
      isOpen={open}
      role="apprentice"
      onComplete={() => setOpen(false)}
      onSkip={() => setOpen(false)}
    />
  );
}
