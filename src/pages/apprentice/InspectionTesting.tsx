import { useNavigate } from 'react-router-dom';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubQuickStart, HubToolGrid } from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

/**
 * Apprentice Inspection & Testing landing page.
 *
 * Reached from Exam Preparation, and its job is to hand people on to the
 * Inspection & Testing hub. On the shared hub shell: one solid quick-start
 * card for the hub itself, a tool group for the four genuinely different
 * destinations that used to be a list, and the two notes underneath.
 *
 * The four "Quick Reference Topics" that used to sit here are gone. All four
 * linked to the same URL, so they were one destination wearing four hats.
 */

const InspectionTesting = () => {
  const navigate = useNavigate();
  return (
    <HubSubPage title="Inspection & Testing" description="BS 7671:2018+A4:2026">
      <HubQuickStart
        label="Start here"
        items={[
          {
            title: 'Open the Inspection & Testing hub',
            description:
              'The eight tests in the order they are carried out, what to expect, and where each goes wrong. Progress saved; an on-site tab for looking a limit up on the job.',
            onClick: () => navigate('/apprentice/inspection-testing-hub'),
            primary: true,
          },
        ]}
      />

      <HubToolGrid
        label="Also useful"
        columns="four"
        cards={[
          {
            id: 'runthrough',
            title: 'BS 7671 run-through',
            description: 'Step-by-step walkthrough',
            to: '/apprentice/on-job-tools/bs7671-runthrough',
          },
          {
            id: 'procedures',
            title: 'Test procedures',
            description: 'Quick on-the-job toolkit',
            to: '/apprentice/on-job-tools/testing-procedures',
          },
          {
            id: 'flashcards',
            title: 'Flashcards',
            description: 'Quick revision',
            to: '/apprentice/on-job-tools/flashcards',
          },
          {
            id: 'calculators',
            title: 'Calculators',
            description: 'Zs, R1+R2 and more',
            to: '/apprentice/calculators',
          },
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Red because supervision is a safety matter, not a styling choice. */}
        <div className="rounded-2xl border border-red-500/40 bg-red-500/[0.10] p-4 sm:p-5">
          <p className="text-[14px] font-semibold text-white">Work under supervision</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            Always follow your employer&rsquo;s procedures when testing. Nothing here replaces being
            supervised by a competent person.
          </p>
        </div>
        <div className={cn('rounded-2xl border border-white/[0.14] p-4 sm:p-5', CARD_SURFACE)}>
          <p className="text-[14px] font-semibold text-white">
            A training aid, not a qualification
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            This material supports your 2391 training and is for learning only. For formal
            qualifications, speak to City &amp; Guilds, EAL or your training provider.
          </p>
        </div>
      </div>
    </HubSubPage>
  );
};

export default InspectionTesting;
