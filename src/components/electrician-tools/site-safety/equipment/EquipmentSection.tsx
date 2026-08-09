/**
 * EquipmentSection — the card the equipment wizard and detail view are built from.
 *
 * Why not `FormCard` from `college/primitives`: that card's body is a flat
 * `bg-[hsl(0_0%_12%)]`, and the rest of Site Safety (Permit to Work, Inspection
 * Checklists, COSHH, Document Hub) has already moved to the card recipe — the
 * diagonal white-alpha ramp with an inset bevel under a volt hairline. Passing
 * `CARD_SURFACE` into `FormCard`'s className does NOT convert it: the ramp is a
 * background-IMAGE and the flat 12% is a background-COLOR, so tailwind-merge
 * keeps both and the gradient ends up sitting on a 12% base, which is a
 * different material from the same ramp over near-black. Same reasoning as
 * `common/SafetyList.tsx`, which rebuilt the list row for exactly this reason.
 *
 * Local to `equipment/` on purpose. Restyling `FormCard` at source would change
 * several hundred screens across the Study Centre and Employer Hub in one go.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow } from '@/components/college/primitives';

export function EquipmentSection({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-elec-yellow/35 p-5 space-y-3',
        CARD_SURFACE,
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {children}
    </div>
  );
}

/**
 * A read-out panel nested INSIDE a section card (next-test-due, warranty state).
 *
 * Deliberately not the card recipe again: a ramp inside a ramp reads as a
 * smudge. A flat inset with a hairline is what a recessed panel does.
 */
export function EquipmentInset({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-white/[0.1] bg-white/[0.04] p-3', className)}>
      {children}
    </div>
  );
}

export default EquipmentSection;
