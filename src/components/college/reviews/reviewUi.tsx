import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { chipBase, chipOff } from '@/components/forms/fieldStyles';

/* Small shared pieces for the tripartite review screens. */

export function Chips<T extends string>({
  value,
  options,
  onChange,
  disabled,
  cols,
}: {
  value: T | null | undefined;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
  disabled?: boolean;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        'grid gap-2',
        cols === 3 ? 'grid-cols-3' : cols === 2 ? 'grid-cols-2' : 'flex flex-wrap'
      )}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          disabled={disabled}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            chipBase,
            'px-3 text-[13px] leading-tight',
            cols ? 'w-full' : '',
            // Chosen reads white, like the College Hub's joined toggles; solid
            // yellow is kept for the sheet's one action (10 Oct 2026).
            value === o.value ? 'border-white bg-white font-semibold text-black' : chipOff
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-medium text-white">{label}</p>
      <p className="mt-0.5 text-[20px] font-semibold tabular-nums leading-tight text-white">
        {value}
      </p>
      {note && <p className="mt-0.5 text-[12px] leading-snug text-white">{note}</p>}
    </div>
  );
}

export function SectionTitle({ children, rule }: { children: ReactNode; rule?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">{children}</h3>
      {rule && <span className="shrink-0 text-[12px] font-medium text-white">{rule}</span>}
    </div>
  );
}

/** A signature line: who, when, or what is still needed. */
export function SignatureLine({
  party,
  name,
  at,
  waiting,
}: {
  party: string;
  name?: string | null;
  at?: string | null;
  waiting: string;
}) {
  const signed = !!at;
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-white">{party}</p>
        <p className="break-words text-[15px] font-semibold text-white">
          {signed ? name || 'Signed' : waiting}
        </p>
      </div>
      <span
        className={cn(
          'shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold',
          signed ? 'bg-emerald-500 text-black' : 'border border-white/[0.2] text-white'
        )}
      >
        {signed
          ? new Date(at as string).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          : 'Not yet'}
      </span>
    </div>
  );
}

/** The 3-question view (apprentice or employer), read-only. */
export function InputView({
  input,
  who,
}: {
  input: {
    progress: string;
    going_well?: string;
    focus_next?: string;
    concerns?: string;
    name?: string;
    role?: string;
    at?: string;
  } | null;
  who: string;
}) {
  if (!input) return null;
  const progress =
    input.progress === 'ahead' ? 'Ahead' : input.progress === 'behind' ? 'Behind' : 'On track';
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-white">
          {who}
          {input.name ? `: ${input.name}${input.role ? `, ${input.role}` : ''}` : ''}
        </p>
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold',
            input.progress === 'behind'
              ? 'bg-orange-500 text-black'
              : input.progress === 'ahead'
                ? 'bg-emerald-500 text-black'
                : 'bg-white text-black'
          )}
        >
          {progress}
        </span>
      </div>
      {[
        ['Going well', input.going_well],
        ['To focus on next', input.focus_next],
        ['Concerns', input.concerns],
      ]
        .filter(([, v]) => v)
        .map(([l, v]) => (
          <div key={l as string}>
            <p className="text-[12px] font-medium text-white">{l}</p>
            <p className="mt-0.5 whitespace-pre-wrap text-[14px] leading-relaxed text-white">{v}</p>
          </div>
        ))}
    </div>
  );
}

export const fmtHours = (h: number | null | undefined) => {
  const v = Number(h ?? 0);
  if (v <= 0) return '0h';
  return v < 10 ? `${v.toFixed(1)}h` : `${Math.round(v).toLocaleString('en-GB')}h`;
};
