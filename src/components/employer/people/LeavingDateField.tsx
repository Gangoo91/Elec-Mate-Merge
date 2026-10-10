/**
 * The leaving date, asked for on every archive path (ELE-2075, gap 3C #30):
 * the person sheet, Edit profile's Archive button and its Status select.
 * It starts the retention periods, so it is the real last day, never a guess.
 * Home Office: right-to-work copies are kept for the employment and 2 years
 * after it ends.
 */
import { Field, inputClass } from '@/components/employer/editorial';
import { todayIso } from '@/lib/leavingDate';

export function LeavingDateField({
  value,
  onChange,
  firstName,
  id = 'leaving-date',
}: {
  value: string;
  onChange: (v: string) => void;
  firstName?: string;
  id?: string;
}) {
  const today = todayIso();
  const future = !!value && value > today;
  return (
    <Field
      label={firstName ? `${firstName}'s last day` : 'Last day'}
      required
      hint={
        future
          ? 'Archive on or after their last day. Their access stops when you archive.'
          : 'Starts the retention periods. Right-to-work copies are kept for 2 years after it.'
      }
    >
      <input
        id={id}
        type="date"
        value={value}
        max={today}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </Field>
  );
}
