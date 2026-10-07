/**
 * Under18Badge — ELE-1911. A learner under 18 today is a child in law: the
 * register, Student 360 and the safeguarding queue all flag them the same way
 * so a tutor running a workshop knows who needs the procedures for a minor
 * (supervision, young-worker risk assessment, who to tell). Ages come from
 * college_students.date_of_birth; no date of birth means no badge here (the
 * safeguarding queue shows "Age unknown" for those).
 */
import { cn } from '@/lib/utils';
import { ageOn } from '@/components/college/quality/useSafeguardingRouting';

export function isUnder18(dob: string | null | undefined, at = new Date()): boolean {
  const a = ageOn(dob, at);
  return a != null && a < 18;
}

export function Under18Badge({
  dob,
  className,
  showAge = false,
}: {
  dob: string | null | undefined;
  className?: string;
  /** "Under 18 · 16" instead of "Under 18". */
  showAge?: boolean;
}) {
  const age = ageOn(dob);
  if (age == null || age >= 18) return null;
  return (
    <span
      className={cn(
        'inline-flex h-5 shrink-0 items-center rounded-full border border-sky-400/60 bg-sky-500/[0.12] px-2 text-[11px] font-semibold text-white',
        className
      )}
      title={`Under 18 (age ${age}). Follow the procedures for a minor.`}
    >
      Under 18{showAge ? ` · ${age}` : ''}
    </span>
  );
}

export default Under18Badge;
