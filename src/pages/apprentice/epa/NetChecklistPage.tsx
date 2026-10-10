/**
 * /apprentice/net-checklist — the apprentice fills in NET's AM2S v1
 * Candidate Checklist and signs their declaration (ELE-2050). Their tutor
 * sees and edits the same form in Student 360; the employer signs through a
 * link the college sends.
 */
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { CollegePageHeader } from '@/components/college/ui/CollegeUi';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { useAuth } from '@/contexts/AuthContext';
import { NetChecklistEditor } from '@/components/epa/net-checklist/NetChecklistEditor';

const HELP: PageHelpContent = {
  id: 'apprentice-net-checklist',
  title: 'NET’s AM2S checklist',
  what: 'NET will not book your AM2S without its Candidate Checklist, signed by you, your employer and your college. This is NET’s own form, filled in here.',
  steps: [
    {
      title: 'Rate yourself honestly',
      body: 'For every item, tick one box for Knowledge and one for Experience. NET says you are unlikely to pass if you cannot confidently tick at least Adequate for every one.',
    },
    {
      title: 'Talk it through',
      body: 'NET finds a three-way talk with your employer and tutor works best. Your tutor sees the same form and can change it with you.',
    },
    {
      title: 'Sign when it is true',
      body: 'Signing opens when every item is at least Adequate. If you change an answer later, everyone who signed signs again.',
    },
  ],
  source: 'NET, AM2S v1 Candidate Checklist, December 2025 (netservices.org.uk/am2s-v1).',
};

export default function NetChecklistPage() {
  const { user } = useAuth();
  return (
    <HubPage ground="landing">
      <HubMasthead
        section="EPA"
        title="NET checklist"
        backTo="/apprentice/epa-simulator?tab=readiness"
      />
      <HubBody pushContext="Get told when your tutor or employer signs">
        <div className="space-y-6 sm:space-y-8">
          <CollegePageHeader
            eyebrow="AM2S gateway"
            title="NET’s AM2S checklist"
            description="NET’s Candidate Checklist for the AM2S v1, filled in here and signed by you, your employer and your college before your AM2S is booked."
            help={HELP}
          />
          {user ? (
            <NetChecklistEditor learnerId={user.id} audience="learner" />
          ) : (
            <p className="text-[14px] text-white">Sign in to see your checklist.</p>
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
