/**
 * Fire-and-rehire guardrail (ELE-2075). Advisory only: it never blocks and
 * gives no legal advice.
 *
 * Employment Rights Act 2025 s.28 (from January 2027): dismissing someone for
 * refusing a "restricted variation" (pay, pension, hours, shift pattern, time
 * off) is automatically unfair unless the firm was in financial difficulty and
 * could not reasonably avoid the change.
 * https://www.legislation.gov.uk/ukpga/2025/36/section/28
 */
import { cn } from '@/lib/utils';
import { panel } from '@/components/employer/overview/HomeSections';

export const FIRE_REHIRE_LINES = [
  'Changing pay, pension, hours, shifts or holiday normally needs their agreement.',
  'From January 2027, dismissing someone for refusing a change like this is automatically unfair in most cases, unless the business is in financial difficulty and could not reasonably avoid it.',
  'Talk it through with them and put the change in writing. This is a guide, not legal advice. Acas has free help.',
];

export function FireRehireNotice({
  title = 'This changes their contracted terms',
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn(panel, 'space-y-2 px-4 py-3.5 sm:px-5', className)} role="note">
      <p className="text-[14px] font-semibold text-white">{title}</p>
      {FIRE_REHIRE_LINES.map((l) => (
        <p key={l} className="text-[13px] leading-snug text-white">
          {l}
        </p>
      ))}
    </div>
  );
}

/** Did the edit reduce a contracted term? Pay down, overtime worse, pay basis changed. */
export function termsReduced(
  before: {
    hourly_rate?: number | null;
    annual_salary?: number | null;
    pay_type?: string | null;
    overtime_multiplier?: number | null;
    overtime_threshold_hours?: number | null;
  },
  after: {
    hourly_rate?: number | null;
    annual_salary?: number | null;
    pay_type?: string | null;
    overtime_multiplier?: number | null;
    overtime_threshold_hours?: number | null;
  }
): string[] {
  const out: string[] = [];
  const n = (v: number | null | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
  if (n(before.hourly_rate) > 0 && n(after.hourly_rate) < n(before.hourly_rate) - 0.005)
    out.push('pay rate goes down');
  else if (n(before.annual_salary) > 0 && n(after.annual_salary) < n(before.annual_salary) - 0.5)
    out.push('salary goes down');
  if ((before.pay_type || 'hourly') !== (after.pay_type || 'hourly') && n(before.hourly_rate) > 0)
    out.push('pay basis changes');
  if (n(after.overtime_multiplier) < n(before.overtime_multiplier) - 0.001)
    out.push('overtime rate goes down');
  if (n(after.overtime_threshold_hours) > n(before.overtime_threshold_hours) + 0.001)
    out.push('overtime starts later');
  return out;
}
