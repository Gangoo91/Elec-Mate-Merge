/**
 * /college/net-checklist/:studentId — the tutor's side of NET's AM2S v1
 * Candidate Checklist (ELE-2050): the same form the apprentice fills in,
 * the training provider declaration, the employer's signing link, where the
 * completion certificate goes, and the NET booking pack.
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { CollegePageHeader } from '@/components/college/ui/CollegeUi';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { supabase } from '@/integrations/supabase/client';
import { NetChecklistEditor } from '@/components/epa/net-checklist/NetChecklistEditor';

const HELP: PageHelpContent = {
  id: 'college-net-checklist',
  title: 'NET’s AM2S checklist',
  what: 'NET needs its Candidate Checklist, the technical qualification and Level 2 maths and English before an AM2S booking. This is NET’s own form: filled in here, exported on NET’s PDF.',
  steps: [
    {
      title: 'Rate it with the apprentice',
      body: 'NET: completed by the apprentice with input from the employer and training provider. You and the apprentice see and change the same answers.',
    },
    {
      title: 'Get three signatures',
      body: 'The apprentice signs in the app, the employer signs through a link with no account, and you sign the training provider declaration. Signing needs every item at least Adequate.',
    },
    {
      title: 'Download the booking pack',
      body: 'A cover sheet with the gateway checks and what to attach, then NET’s complete, filled checklist. Send it to the assessment centre, not to NET head office.',
    },
  ],
  notes: [
    {
      title: 'If an answer changes after signing',
      body: 'Earlier signatures stay on record but are left off NET’s form, and show “Sign again”.',
    },
    {
      title: 'Six months',
      body: 'NET only accepts dated signatures within 6 months of the gateway application. The page shows the date to apply by.',
    },
  ],
  source:
    'NET, AM2S v1 Candidate Checklist, December 2025; NET booking and admin help (netservices.org.uk).',
};

export default function CollegeNetChecklistPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [learner, setLearner] = useState<{ user_id: string | null; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    supabase
      .from('college_students')
      .select('user_id, name')
      .eq('id', studentId)
      .maybeSingle()
      .then(({ data }) => {
        setLearner((data as { user_id: string | null; name: string } | null) ?? null);
        setLoading(false);
      });
  }, [studentId]);

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="Student 360"
        title="NET checklist"
        backTo={`/college?section=student360&studentId=${studentId ?? ''}#epa`}
      />
      <HubBody pushContext="Get told when the apprentice or employer signs">
        <div className="space-y-6 sm:space-y-8">
          <CollegePageHeader
            eyebrow="AM2S gateway"
            title={learner ? `${learner.name}: NET checklist` : 'NET checklist'}
            description="NET’s AM2S v1 Candidate Checklist, rated with the apprentice, signed by all three and exported as the NET booking pack."
            help={HELP}
          />
          {loading ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : !learner?.user_id ? (
            <p className="text-[14px] text-white">
              This learner has no Elec-Mate account linked yet, so the checklist cannot be filled in
              here.
            </p>
          ) : (
            <NetChecklistEditor learnerId={learner.user_id} audience="staff" />
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
