/**
 * Welsh Level 3 — the closed door.
 *
 * The course card is not clickable for anyone but an admin, so nobody should
 * arrive here by tapping. This is the backstop for a typed or shared URL: the
 * route guard in `WelshLevel3Routes` sends every non-admin request to this page
 * at every depth, so a link to a criterion cannot open an empty criterion.
 */

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';

export default function WelshInDevelopment() {
  useSEO({
    title: 'Welsh Level 3 | In development | Elec-Mate',
    description: 'The Welsh Level 3 course is being built and is not open yet.',
    noindex: true,
  });

  return (
    <HubPage>
      <HubMasthead
        section="Welsh Level 3"
        title="Building Services Engineering — Electrotechnical Installation"
        backTo="/study-centre/apprentice"
      />
      <HubBody>
        <section
          className={cn(
            CARD_BASE,
            CARD_NEUTRAL,
            '-mx-4 rounded-none border-x-0 border-y border-amber-500/30 bg-amber-500/[0.06] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5'
          )}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            In development
          </span>
          <h2 className="mt-2 text-[15px] font-semibold leading-snug text-white">
            This course is being built and is not open yet
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white">
            It will open when there is enough of it to be worth your time. Until then the{' '}
            <a
              href="/study-centre/apprentice/level3"
              className="font-semibold text-elec-yellow underline underline-offset-2"
            >
              Level 3
            </a>{' '}
            course covers most of the same electrical ground — the unit numbers differ, the
            engineering does not.
          </p>
        </section>
      </HubBody>
    </HubPage>
  );
}
