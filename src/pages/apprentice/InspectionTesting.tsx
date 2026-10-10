import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, ClipboardList, Calculator, Layers } from 'lucide-react';
import { HubSubPage } from '@/components/hub/HubSubPage';
import {
  LEARN_CARD,
  LEARN_BTN_PRIMARY,
  LEARN_CALLOUT_DANGER,
  LEARN_INSET,
  LearnLinkList,
  LearnSectionTitle,
} from '@/components/apprentice/learn-ui/learnUi';
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

const InspectionTesting = () => (
  <HubSubPage title="Inspection & Testing" description="BS 7671:2018+A4:2026">
    {/* Start here — the hub is the one thing this page exists to open, so it
        is the one solid volt action, full width at the bottom of its card on
        a phone. It used to be a half-width solid yellow tile. */}
    <section className={cn(LEARN_CARD, 'space-y-4 lg:flex lg:items-end lg:gap-8 lg:space-y-0')}>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-elec-yellow">Start here</p>
        <h2 className="mt-1 text-[19px] font-semibold leading-snug tracking-tight text-white">
          Open the Inspection &amp; Testing hub
        </h2>
        <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-white">
          The eight tests in the order they are carried out, what to expect, and where each goes
          wrong. Progress saved; an on-site tab for looking a limit up on the job.
        </p>
      </div>
      <Link
        to="/apprentice/inspection-testing-hub"
        className={cn(LEARN_BTN_PRIMARY, 'w-full lg:w-auto lg:shrink-0 lg:px-6')}
      >
        Open the hub
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>

    <section className="space-y-3">
      <LearnSectionTitle title="Also useful" />
      <LearnLinkList
        columns={2}
        items={[
          {
            id: 'runthrough',
            icon: BookOpenCheck,
            title: 'BS 7671 run-through',
            detail: 'Step-by-step walkthrough',
            to: '/apprentice/on-job-tools/bs7671-runthrough',
          },
          {
            id: 'procedures',
            icon: ClipboardList,
            title: 'Test procedures',
            detail: 'Quick on-the-job toolkit',
            to: '/apprentice/on-job-tools/testing-procedures',
          },
          {
            id: 'flashcards',
            icon: Layers,
            title: 'Flashcards',
            detail: 'Quick revision',
            to: '/apprentice/on-job-tools/flashcards',
          },
          {
            id: 'calculators',
            icon: Calculator,
            title: 'Calculators',
            detail: 'Zs, R1+R2 and more',
            to: '/apprentice/calculators',
          },
        ]}
      />
    </section>

    <div className="grid gap-3 sm:grid-cols-2">
      {/* Red bar because supervision is a safety matter, not a styling choice. */}
      <div className={LEARN_CALLOUT_DANGER}>
        <p className="text-[14px] font-semibold text-white">Work under supervision</p>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          Always follow your employer&rsquo;s procedures when testing. Nothing here replaces being
          supervised by a competent person.
        </p>
      </div>
      <div className={LEARN_INSET}>
        <p className="text-[14px] font-semibold text-white">A training aid, not a qualification</p>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          This material supports your 2391 training and is for learning only. For formal
          qualifications, speak to City &amp; Guilds, EAL or your training provider.
        </p>
      </div>
    </div>
  </HubSubPage>
);

export default InspectionTesting;
