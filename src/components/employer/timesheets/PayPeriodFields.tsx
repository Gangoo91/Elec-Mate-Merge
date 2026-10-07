/**
 * Pay period and payday — set once by the office (ELE-2009).
 *
 * Lives in the Timesheets "Timesheet rules" sheet next to the default break.
 * Saved through set_firm_pay_settings (owner/admin only). Workers read it on
 * Worker Tools → My pay; the preview here uses the SAME utils/payPeriods module
 * so what the office sees is what the worker sees.
 */
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import {
  formatPeriodRange,
  payPeriodContaining,
  PAY_FREQUENCY_LABEL,
  type PayFrequency,
} from '@/utils/payPeriods';
import {
  draftToSettings,
  draftValid,
  thisMonday,
  type PayDraft,
} from '@/components/employer/timesheets/payDraft';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-3 text-[13px] touch-manipulation transition-colors';

/** Days from the period's last day to the first Friday after it. */
function fridayAfter(d: PayDraft): number {
  const p = payPeriodContaining({ ...draftToSettings({ ...d, offsetDays: 0 }) });
  if (!p) return 5;
  for (let i = 1; i <= 7; i++) if (addDays(p.end, i).getDay() === 5) return i;
  return 5;
}

export function PayPeriodFields({
  value,
  onChange,
}: {
  value: PayDraft;
  onChange: (d: PayDraft) => void;
}) {
  const set = (patch: Partial<PayDraft>) => onChange({ ...value, ...patch });
  const monthly = value.frequency === 'monthly';
  const fri = value.frequency && !monthly ? fridayAfter(value) : 5;
  const weeklyPresets = [
    { label: 'Last day of the period', off: 0 },
    { label: 'The Friday after', off: fri },
    { label: 'A week after that', off: fri + 7 },
  ];
  const isWeeklyPreset = weeklyPresets.some((p) => p.off === value.offsetDays);
  const anchorDay = Number(value.anchor.slice(8, 10)) || 1;

  const preview = (() => {
    if (!value.frequency || !draftValid(value)) return null;
    const s = draftToSettings(value);
    const now = payPeriodContaining(s);
    if (!now) return null;
    const next = payPeriodContaining(s, addDays(now.end, 1));
    const line = (p: typeof now) =>
      `${formatPeriodRange(p.start, p.end)}, paid ${format(p.payday, 'EEE d MMM')}`;
    return { now: line(now), next: next ? line(next) : null };
  })();

  return (
    <div className="space-y-4">
      <div>
        <p className={labelCn}>How often are people paid?</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {(['weekly', 'fortnightly', 'four_weekly', 'monthly'] as PayFrequency[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={value.frequency === f}
              onClick={() =>
                set({
                  frequency: f,
                  anchor:
                    f === 'monthly'
                      ? value.frequency === 'monthly'
                        ? value.anchor
                        : format(new Date(), 'yyyy-MM-01')
                      : value.frequency && value.frequency !== 'monthly'
                        ? value.anchor
                        : thisMonday(),
                })
              }
              className={cn(chip, value.frequency === f ? chipOn : chipOff)}
            >
              {PAY_FREQUENCY_LABEL[f]}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={!value.frequency}
            onClick={() => set({ frequency: null })}
            className={cn(chip, !value.frequency ? chipOn : chipOff)}
          >
            Not set
          </button>
        </div>
      </div>

      {value.frequency && !monthly && (
        <>
          <div>
            <label className={labelCn} htmlFor="pay-anchor">
              First day of a pay period
            </label>
            <input
              id="pay-anchor"
              type="date"
              value={value.anchor}
              onChange={(e) => e.target.value && set({ anchor: e.target.value })}
              className={inputCn}
            />
            <p className="mt-1 text-[11.5px] text-white">
              Any one period will do. The rest follow on from it.
            </p>
          </div>
          <div>
            <p className={labelCn}>Payday</p>
            <div className="flex flex-wrap gap-2">
              {weeklyPresets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={value.offsetDays === p.off}
                  onClick={() => set({ offsetDays: p.off })}
                  className={cn(chip, value.offsetDays === p.off ? chipOn : chipOff)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {!isWeeklyPreset && (
              <p className="mt-2 text-[12px] text-white">
                {value.offsetDays} day{Math.abs(value.offsetDays) === 1 ? '' : 's'} after the period ends.
              </p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <label className="text-[12px] text-white" htmlFor="pay-offset">
                Or days after the period ends
              </label>
              <input
                id="pay-offset"
                type="number"
                inputMode="numeric"
                min={-13}
                max={35}
                value={value.offsetDays}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  if (Number.isFinite(n)) set({ offsetDays: Math.max(-13, Math.min(35, n)) });
                }}
                className={cn(inputCn, 'w-20 text-center tabular-nums')}
              />
            </div>
          </div>
        </>
      )}

      {monthly && (
        <>
          <div>
            <p className={labelCn}>The month runs</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={anchorDay === 1}
                onClick={() => set({ anchor: format(new Date(), 'yyyy-MM-01') })}
                className={cn(chip, anchorDay === 1 ? chipOn : chipOff)}
              >
                1st to the end of the month
              </button>
              <button
                type="button"
                aria-pressed={anchorDay !== 1}
                onClick={() => anchorDay === 1 && set({ anchor: format(new Date(), 'yyyy-MM-21') })}
                className={cn(chip, anchorDay !== 1 ? chipOn : chipOff)}
              >
                From another day
              </button>
            </div>
            {anchorDay !== 1 && (
              <div className="mt-3 flex items-center gap-3">
                <label className="text-[12px] text-white" htmlFor="pay-start-day">
                  Starts on day
                </label>
                <input
                  id="pay-start-day"
                  type="number"
                  inputMode="numeric"
                  min={2}
                  max={28}
                  value={anchorDay}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (Number.isFinite(n)) {
                      const d = Math.max(2, Math.min(28, n));
                      set({ anchor: `${value.anchor.slice(0, 8)}${String(d).padStart(2, '0')}` });
                    }
                  }}
                  className={cn(inputCn, 'w-20 text-center tabular-nums')}
                />
              </div>
            )}
          </div>
          <div>
            <p className={labelCn}>Payday</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={value.dayOfMonth === 0 && !value.nextMonth}
                onClick={() => set({ dayOfMonth: 0, nextMonth: false })}
                className={cn(chip, value.dayOfMonth === 0 && !value.nextMonth ? chipOn : chipOff)}
              >
                Last working day
              </button>
              <button
                type="button"
                aria-pressed={value.dayOfMonth > 0 && !value.nextMonth}
                onClick={() => set({ dayOfMonth: value.dayOfMonth || 25, nextMonth: false })}
                className={cn(chip, value.dayOfMonth > 0 && !value.nextMonth ? chipOn : chipOff)}
              >
                A day that month
              </button>
              <button
                type="button"
                aria-pressed={value.nextMonth}
                onClick={() => set({ dayOfMonth: value.dayOfMonth || 5, nextMonth: true })}
                className={cn(chip, value.nextMonth ? chipOn : chipOff)}
              >
                A day the month after
              </button>
            </div>
            {value.dayOfMonth > 0 && (
              <div className="mt-3 flex items-center gap-3">
                <label className="text-[12px] text-white" htmlFor="pay-dom">
                  Day of the month
                </label>
                <input
                  id="pay-dom"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={31}
                  value={value.dayOfMonth}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (Number.isFinite(n)) set({ dayOfMonth: Math.max(1, Math.min(31, n)) });
                  }}
                  className={cn(inputCn, 'w-20 text-center tabular-nums')}
                />
              </div>
            )}
          </div>
        </>
      )}

      {preview ? (
        <div className="border-t border-white/[0.1] pt-3 text-[13px] leading-snug text-white">
          <p>
            This period: <span className="font-semibold">{preview.now}</span>
          </p>
          {preview.next && (
            <p className="mt-0.5">
              Next: <span className="font-semibold">{preview.next}</span>
            </p>
          )}
          <p className="mt-1.5 text-[12px]">
            A payday on a weekend moves to the Friday before. Workers see this on My pay, marked
            as an estimate.
          </p>
        </div>
      ) : (
        !value.frequency && (
          <p className="border-t border-white/[0.1] pt-3 text-[12.5px] leading-snug text-white">
            Not set: workers&rsquo; My pay says &ldquo;Your firm hasn&rsquo;t set a payday&rdquo; and
            shows the week or month instead.
          </p>
        )
      )}
    </div>
  );
}
