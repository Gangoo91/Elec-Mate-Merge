import { Link } from 'react-router-dom';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { ChevronRight } from 'lucide-react';

/**
 * Apprentice Inspection & Testing landing page.
 *
 * Reached from Exam Preparation, and its job is to hand people on to the
 * Inspection & Testing hub. Rebuilt in the certificate design language so the
 * whole route — landing, hub, certificate — reads as one product.
 *
 * The four "Quick Reference Topics" that used to sit here are gone. All four
 * linked to the same URL, so they were one destination wearing four hats, and
 * their subjects (safe isolation, testing methods, certificate completion) are
 * now covered properly by the hub's learning path rather than by a card that
 * claims a topic and delivers a generic page.
 */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5';

const headingCn = 'mb-3 text-[15px] font-semibold tracking-tight text-white';

/** Genuinely different destinations — unlike the topic cards this replaces. */
const RESOURCES = [
  {
    to: '/apprentice/on-job-tools/bs7671-runthrough',
    title: 'BS 7671 run-through',
    desc: 'Step-by-step walkthrough',
  },
  {
    to: '/apprentice/on-job-tools/testing-procedures',
    title: 'Test procedures',
    desc: 'Quick on-the-job toolkit',
  },
  {
    to: '/apprentice/on-job-tools/flashcards',
    title: 'Flashcards',
    desc: 'Quick revision',
  },
  {
    to: '/apprentice/calculators',
    title: 'Calculators',
    desc: 'Zs, R1+R2 and more',
  },
];

const InspectionTesting = () => {
  return (
    <div className="bg-background pb-24">
      <div className="px-4 py-4">
        <SmartBackButton />

        <header className="mb-6 mt-3">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Inspection &amp; Testing
          </h1>
          <p className="mt-1 text-[13px] text-white">BS 7671:2018+A4:2026</p>
        </header>

        {/* The hub is the point of this page, so it leads and nothing competes
            with it. It used to be one of several cards on a crowded screen. */}
        <section className="mb-6">
          <Link
            to="/apprentice/inspection-testing-hub"
            className="block touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50"
          >
            <div className={`${cardCn} transition-transform active:scale-[0.99]`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold tracking-tight text-white">
                    Open the Inspection &amp; Testing hub
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">
                    Work through the eight tests in the order they are carried out, with what to
                    expect and where it goes wrong at each step. Your progress is saved. There is
                    an on-site tab for looking a limit up on the job.
                  </p>
                </div>
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-white" />
              </div>
            </div>
          </Link>
        </section>

        <section className="mb-6">
          <h2 className={headingCn}>Also useful</h2>
          <div className="-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
            {RESOURCES.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-[3.25rem] touch-manipulation items-center justify-between gap-3 p-4 transition-colors active:bg-white/[0.04]"
              >
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium text-white">{item.title}</span>
                  <span className="mt-0.5 block text-[12px] text-white">{item.desc}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" />
              </Link>
            ))}
          </div>
        </section>

        {/* Red because supervision is a safety matter, not a styling choice. */}
        <section className="mb-4">
          <div className="-mx-4 border-y border-red-500/30 bg-red-500/[0.12] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
            <p className="text-[14px] font-semibold text-white">Work under supervision</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white">
              Always follow your employer&rsquo;s procedures when testing. Nothing here replaces
              being supervised by a competent person.
            </p>
          </div>
        </section>

        <div className={cardCn}>
          <p className="text-[14px] font-semibold text-white">A training aid, not a qualification</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            This material supports your 2391 training and is for learning only. For formal
            qualifications, speak to City &amp; Guilds, EAL or your training provider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InspectionTesting;
