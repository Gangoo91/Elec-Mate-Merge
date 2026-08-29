import React from 'react';
import { cn } from '@/lib/utils';

/**
 * One section of a document builder, shared by the quote and invoice wizards.
 *
 * On a phone this is the wizard it has always been: one step visible, the rest
 * hidden, driven by the step rail. On a desktop every section is on screen at
 * once in a two-column grid — there is room for the whole document, and paging
 * through five screens to change one number is a phone compromise being paid
 * for on a 27" monitor.
 *
 * All steps have always been mounted together and toggled with `hidden`, so
 * showing them costs nothing and cannot double-fire an effect.
 *
 * Shared rather than copied. The quote and invoice Items steps are ~2,000 lines
 * each and have already drifted apart badly enough that a sweep of one missed
 * nine instances in the other; a second copy of this would go the same way.
 *
 * Declared at module level, not inside a wizard's render. A component defined
 * inside a render is a new type on every pass, so React unmounts and remounts
 * its whole subtree — the remount-per-tap bug from ELE-1459.
 */
export const DocumentStepPanel = ({
  isDesktop,
  active,
  wide,
  title,
  sub,
  children,
}: {
  isDesktop: boolean;
  active: boolean;
  /** Items carries a whole price build, and the totals are a conclusion — both
   *  run the full width rather than sharing a row. */
  wide?: boolean;
  title: string;
  sub: string;
  children: React.ReactNode;
}) => {
  if (!isDesktop) return <section className={cn(!active && 'hidden')}>{children}</section>;

  // No card here. The step's own sections are the cards — wrapping them in
  // another one produces boxes inside boxes. The certificates put sections
  // straight on the page background and let type carry the hierarchy.
  /*
   * 🔴 `min-h-0` is NOT wanted here, and `h-full` is actively harmful.
   *
   * The panels overlapped: the Job details panel measured 684px while its own
   * content needed 837px, so 153px of it spilled over the "Build the price"
   * row beneath and the two market-rate cards drew on top of each other.
   *
   * Two causes, and BOTH have to go:
   *  • `flex-1` is `flex: 1 1 0%`. A zero flex-basis makes this column
   *    under-report its intrinsic height, so the grid sized the row from the
   *    shorter Client panel instead. `grow` is `flex-grow: 1` with basis auto —
   *    same fill behaviour, honest measurement.
   *  • `h-full` is `height: 100%` against that (too short) auto row, pinning
   *    the panel to it. Grid already stretches items to the row by default, so
   *    it bought nothing and cost the overflow.
   */
  return (
    <div className={cn('flex flex-col gap-4', wide ? 'col-span-2' : 'col-span-1')}>
      <div>
        <h2 className="text-[17px] font-bold leading-tight text-white">{title}</h2>
        <p className="mt-0.5 text-[12px] text-white">{sub}</p>
      </div>
      {/*
       * 🔴 A flex column, and `[&>section]:grow` rather than `:h-full`.
       *
       * This is what actually caused the overlap. `h-full` is `height: 100%`,
       * and it assumed the step renders exactly ONE `<section>` — the old
       * comment here said as much. Step 1 passes TWO children: JobDetailsStep
       * (a section) and the market-rate card beside it. The section's 100% ate
       * the whole wrapper, the wrapper measured itself as just the section, and
       * the card was left rendering 133px outside its own parent — straight
       * over the "Build the price" row below it.
       *
       * As a flex column the section grows into the spare room and any siblings
       * keep their natural height, so a step can render one card or several
       * without the layout caring.
       */}
      <div className="flex grow flex-col [&>section]:grow">{children}</div>
    </div>
  );
};

export default DocumentStepPanel;
