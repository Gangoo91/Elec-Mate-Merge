import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { useMyCollegeContext, type LearnerCollegeContext } from '@/hooks/useMyCollegeContext';

/**
 * A college-linked learner already has a course: the college set it. Map the
 * qualification onto the wizard's own course values so the EPA / AM2 gates
 * that read `apprentice_course` work without ever asking the learner.
 */
function courseFromCollege(l: LearnerCollegeContext): string {
  const code = (l.qualification_code ?? '').trim();
  const level = (l.course_level ?? '').toLowerCase();
  if (code === '2365-02' || level.includes('level 2')) return 'level-2';
  if (['2357', '5357', '603/3895/8', '601/7345/2', 'EAL-NETP3', '603/3928/7'].includes(code)) return 'nvq-3';
  if (code === 'MOET') return 'other';
  if (code === '600/4337/4') return '2391';
  if (code === '603/3929/9') return '18th-edition';
  return 'level-3';
}

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
  const { learner, loading: collegeLoading } = useMyCollegeContext();

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
    // Wait for the college read: a linked learner must never be asked
    // "what are you studying?" — their college has already told us.
    if (collegeLoading) return;
    if (learner && profile?.id) {
      void supabase
        .from('profiles')
        .update({
          apprentice_course: courseFromCollege(learner),
          apprentice_college: learner.college_name,
        })
        .eq('id', profile.id)
        .then(({ error }) => {
          if (error) console.warn('ApprenticeSetupGate: could not set course from college', error);
        });
      return;
    }
    const hasSeenWizard = localStorage.getItem('setup_wizard_shown');
    if (!hasSeenWizard) {
      setOpen(true);
      localStorage.setItem('setup_wizard_shown', 'true');
    }
  }, [isApprentice, data, learner, collegeLoading, profile?.id]);

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
