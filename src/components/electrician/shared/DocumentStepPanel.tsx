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
  return (
    <div className={cn('flex h-full flex-col gap-4', wide ? 'col-span-2' : 'col-span-1')}>
      <div>
        <h2 className="text-[17px] font-bold leading-tight text-white">{title}</h2>
        <p className="mt-0.5 text-[12px] text-white">{sub}</p>
      </div>
      {/* `[&>section]` reaches a step that renders one card so it grows to the
          row height. Steps rendering a stack of cards are left alone. */}
      <div className="flex-1 [&>section]:h-full">{children}</div>
    </div>
  );
};

export default DocumentStepPanel;
