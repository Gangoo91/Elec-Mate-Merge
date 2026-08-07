/**
 * Electrical calculations — one page, both routes.
 *
 * This existed twice: `/electrician/calculations` (a 269-line page with 64
 * EAGER imports and its own switch) and the apprentice `OnJobCalculations`
 * (400 lines, lazy imports, its own switch). Same 63 calculators, two shells,
 * two registries, two bundle profiles. They had already drifted.
 *
 * Now: `src/data/calculators.ts` is the registry, `calculatorComponents.ts` is
 * the lazy switch, and this is the only shell. A check script asserts the two
 * stay in step.
 *
 * What went from the header:
 *
 *   THE BACK BUTTON ON THE RIGHT. Every other page in the app puts `← Back`
 *   top-left in the masthead; this one had "Back to Hub" as an outlined button
 *   on the far right, which on a phone is the corner your thumb reaches last.
 *
 *   THE BLUE ICON TILE. `bg-blue-500/10` with a `text-blue-400` calculator
 *   glyph — blue, in an app whose accent is volt, next to a 30px headline and a
 *   "BS 7671 compliant professional tools" strapline. That is a marketing
 *   header on a tool you opened deliberately.
 *
 *   THE 63-ITEM DROPDOWN. See CalculatorPicker.
 *
 * The chosen calculator lives in the URL (`?calc=`), so a volt-drop result is
 * linkable, survives a refresh, and the browser Back button steps through the
 * calculators you used rather than leaving the page.
 */
import { Suspense, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CalculatorPicker } from '@/components/calculators/shared/CalculatorPicker';
import { CALCULATOR_COMPONENTS } from '@/components/calculators/shared/calculatorComponents';
import { CALCULATOR_BY_SLUG, CALCULATORS } from '@/data/calculators';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

const DEFAULT_SLUG = 'ohms-law';

interface Props {
  /** Where `← Back` returns to. Differs per route, nothing else does. */
  backTo?: string;
  title?: string;
  section?: string;
}

const Calculations = ({
  backTo = '/electrician',
  title = 'Calculations',
  section = 'Electrician',
}: Props) => {
  const [params, setParams] = useSearchParams();

  const slug = params.get('calc') ?? DEFAULT_SLUG;
  const entry = CALCULATOR_BY_SLUG.get(slug) ?? CALCULATOR_BY_SLUG.get(DEFAULT_SLUG)!;
  const Active = CALCULATOR_COMPONENTS[entry.value] ?? CALCULATOR_COMPONENTS[DEFAULT_SLUG];

  useSEO({
    // No " | Elec-Mate" here — useSEO appends it, and passing it gave
    // "… | BS 7671 | Elec-Mate | Elec-Mate" in the tab and the search snippet.
    title: `${entry.label} Calculator | BS 7671`,
    description: `${entry.label} calculator for UK electricians — BS 7671:2018+A4:2026. Part of ${CALCULATORS.length} electrical calculators.`,
  });

  const choose = useCallback(
    (next: string) => {
      // `replace: false` so Back walks the calculators you opened.
      setParams((p) => {
        const n = new URLSearchParams(p);
        n.set('calc', next);
        return n;
      });
    },
    [setParams]
  );

  // Keyed on the slug so switching calculators remounts rather than trying to
  // reconcile two different forms — stale values bleeding between calculators
  // is worse than a frame of skeleton.
  const body = useMemo(
    () => (
      <Suspense key={entry.value} fallback={<CalculatorSkeleton />}>
        <Active />
      </Suspense>
    ),
    [Active, entry.value]
  );

  return (
    <HubPage>
      <HubMasthead section={section} title={title} backTo={backTo} />
      <HubBody>
        <CalculatorPicker value={entry.value} onChange={choose} />
        {body}
      </HubBody>
    </HubPage>
  );
};

/** Matches the calculator card's box so the swap doesn't jump the page. */
const CalculatorSkeleton = () => (
  <div
    className={cn(
      'min-h-[420px] animate-pulse rounded-2xl border border-elec-yellow/35 p-4 sm:p-5',
      CARD_SURFACE
    )}
  >
    <div className="h-4 w-40 rounded-full bg-white/[0.10]" />
    <div className="mt-2 h-3 w-64 rounded-full bg-white/[0.06]" />
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-3 w-20 rounded-full bg-white/[0.08]" />
          <div className="mt-2 h-9 w-full rounded-lg bg-white/[0.05]" />
        </div>
      ))}
    </div>
  </div>
);

export default Calculations;
