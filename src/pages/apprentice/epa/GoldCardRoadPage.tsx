/**
 * /apprentice/gold-card — the road from the AM2S to the ECS Gold Card and
 * JIB grading (ELE-2055). The apprentice ticks each step; their college sees
 * the same list. Every step links to the official ECS or NET page.
 */
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { CollegePageHeader } from '@/components/college/ui/CollegeUi';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { useAuth } from '@/contexts/AuthContext';
import { GoldCardRoad } from '@/components/epa/GoldCardRoad';

const HELP: PageHelpContent = {
  id: 'apprentice-gold-card',
  title: 'Road to Gold Card',
  what: 'What to do after your AM2S to get your ECS Gold Card, and then your JIB grade. Each step links to the ECS or NET page it comes from.',
  steps: [
    {
      title: 'Follow the steps in order',
      body: 'MyECS, the ECS Health, Safety and Environmental Assessment, your documents, then the application.',
    },
    {
      title: 'Tick each one when done',
      body: 'Your tutor sees how far you have got, so they can help if you get stuck.',
    },
    {
      title: 'Check the official page',
      body: 'ECS and the JIB set the rules and can change them. Read their page before you pay for anything.',
    },
  ],
  source:
    'ECS (ecscard.org.uk), NET (netservices.org.uk), Electrical Contracting News on the ECS/NET integration (3 August 2026).',
};

export default function GoldCardRoadPage() {
  const { user } = useAuth();
  return (
    <HubPage ground="landing">
      <HubMasthead
        section="EPA"
        title="Road to Gold Card"
        backTo="/apprentice/epa-simulator?tab=readiness"
      />
      <HubBody pushContext="Get reminders for the next step to your Gold Card">
        <div className="space-y-6 sm:space-y-8">
          <CollegePageHeader
            eyebrow="After your AM2S"
            title="Road to Gold Card"
            description="From your AM2S pass to the ECS Gold Card and your JIB grade, one step at a time, each linked to the official page."
            help={HELP}
          />
          {user ? (
            <GoldCardRoad learnerId={user.id} audience="learner" />
          ) : (
            <p className="text-[14px] text-white">Sign in to see your steps.</p>
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
