/**
 * ProgrammeSetupSheet — the apprentice's off-the-job envelope: total hours,
 * start date, planned gateway date. Everything the forecast is computed from.
 *
 * Off-the-job training (starts from 1 Aug 2025) is a FIXED total number of
 * hours per apprenticeship standard (DfE Annex C) — not 20% of working hours.
 * So the apprentice picks their standard (→ its fixed total) and sets their
 * dates; the weekly figure is just the delivery pace (total ÷ weeks).
 *
 * Three things were wrong with this sheet, and together they explain why
 * `user_otj_programmes` had zero rows in it — nobody had ever completed it:
 *
 *   1. THE SAVE BUTTON WAS UNREACHABLE (now guaranteed by FormSheet, which
 *      this sheet's column became). The grab handle sat OUTSIDE the
 *      `flex flex-col h-full` column, so the column was 100% of the sheet's
 *      height PLUS the handle, and the footer was pushed past the bottom edge.
 *      `pb-20` on that footer pushed it further. Everything is now inside one
 *      column, and the footer is a shrink-0 sibling of the scroll area.
 *   2. It ignored the college. `useOtjProgramme` ranks college dates above
 *      anything set here, so a linked student could fill this in, save it, and
 *      watch nothing change. It now says so instead of taking the input.
 *   3. On a desktop the fields ran the full width of the window — a date box
 *      1,900px wide. Content is capped and centred.
 */

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { OTJ_STANDARDS, OTJ_HOURS_FLOOR } from '@/data/otjStandards';
import type { SelfProgramme } from '@/hooks/useOtjProgramme';

const WEEK_MS = 7 * 86_400_000;
const CUSTOM = '__custom__';
// The fixed-hours-per-standard model applies to apprenticeship starts from
// 1 Aug 2025. Earlier starts stay on the old "6 hours per week / 20%" rule for
// the whole apprenticeship.
const NEW_MODEL_CUTOFF = '2025-08-01';
const OLD_MODEL_WEEKLY_HOURS = 6;

const fmtDate = (iso: string | null) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

export function ProgrammeSetupSheet({
  open,
  onOpenChange,
  initial,
  onSave,
  college,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: SelfProgramme | null;
  onSave: (p: SelfProgramme) => void;
  /**
   * Set when the programme comes from the college. The form is replaced with
   * what the provider holds, because anything entered here would be outranked
   * by it and silently ignored.
   */
  college?: { startDate: string | null; endDate: string | null; totalHours: number } | null;
}) {
  const [standardCode, setStandardCode] = useState('');
  const [customHours, setCustomHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Hydrate from the current programme each time the sheet opens.
  useEffect(() => {
    if (!open) return;
    setStartDate(initial?.start_date ?? '');
    setEndDate(initial?.end_date ?? '');
    if (initial?.standard_code) {
      setStandardCode(initial.standard_code);
      setCustomHours('');
    } else if (initial?.total_hours) {
      // No code stored — match a known standard by its hours, else custom.
      const match = OTJ_STANDARDS.find((s) => s.otjHours === initial.total_hours);
      setStandardCode(match ? match.code : CUSTOM);
      setCustomHours(match ? '' : String(initial.total_hours));
    } else {
      setStandardCode('');
      setCustomHours('');
    }
  }, [open, initial]);

  const totalHours = useMemo(() => {
    if (standardCode === CUSTOM) {
      const h = parseInt(customHours, 10);
      return isFinite(h) && h > 0 ? h : 0;
    }
    return OTJ_STANDARDS.find((s) => s.code === standardCode)?.otjHours ?? 0;
  }, [standardCode, customHours]);

  const preview = useMemo(() => {
    if (!startDate || !endDate || totalHours <= 0) return null;
    const weeks = (new Date(endDate).getTime() - new Date(startDate).getTime()) / WEEK_MS;
    if (!isFinite(weeks) || weeks <= 0) return null;
    return {
      weeks: Math.round(weeks),
      weeklyTarget: Math.round((totalHours / weeks) * 10) / 10,
      total: totalHours,
    };
  }, [startDate, endDate, totalHours]);

  // Apprentices who started before Aug 2025 are on the older 6h/week rule —
  // surface their figure so they don't use the (wrong-for-them) fixed total.
  const weeks =
    startDate && endDate
      ? (new Date(endDate).getTime() - new Date(startDate).getTime()) / WEEK_MS
      : 0;
  const oldModel = !!startDate && startDate < NEW_MODEL_CUTOFF;
  const oldModelTotal = oldModel && weeks > 0 ? Math.round(OLD_MODEL_WEEKLY_HOURS * weeks) : 0;

  const belowFloor = totalHours > 0 && totalHours < OTJ_HOURS_FLOOR;
  const datesBackwards = !!startDate && !!endDate && endDate <= startDate;
  const canSave = preview !== null && !belowFloor && !datesBackwards;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      start_date: startDate,
      end_date: endDate,
      total_hours: totalHours,
      standard_code: standardCode === CUSTOM ? null : standardCode,
    });
    onOpenChange(false);
  };

  const collegeManaged = !!college;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Your programme"
      title={collegeManaged ? 'Set by your college' : 'Set your apprenticeship'}
      description={
        collegeManaged
          ? 'Your provider holds these dates and your hours target, so they are used everywhere on this page. If anything looks wrong, your college can correct it at source.'
          : "Off-the-job training is a fixed number of hours set for your apprenticeship standard. Pick yours and add your dates — we'll work out the pace you need to stay on track."
      }
      footer={
        collegeManaged ? (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonPrimaryCn, 'w-full')}
          >
            Got it
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className={buttonPrimaryCn}
            >
              Save
            </button>
          </div>
        )
      }
    >
      {collegeManaged ? (
        <div className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
          <dl className="space-y-3">
            {[
              { k: 'Off-the-job target', v: `${college?.totalHours ?? 0}h` },
              { k: 'Start date', v: fmtDate(college?.startDate ?? null) },
              { k: 'Planned gateway', v: fmtDate(college?.endDate ?? null) },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] text-white">{row.k}</dt>
                <dd className="text-[15px] font-semibold tabular-nums text-white">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <>
          <div>
            <span className={labelCn}>Apprenticeship standard</span>
            <SelectField
              value={standardCode}
              onValueChange={setStandardCode}
              placeholder="Select your standard"
              title="Apprenticeship standard"
              options={[
                ...OTJ_STANDARDS.map((s) => ({
                  value: s.code,
                  label: `${s.name} (L${s.level}) · ${s.otjHours}h`,
                })),
                { value: CUSTOM, label: 'Other / enter hours manually' },
              ]}
            />
            {standardCode && standardCode !== CUSTOM && (
              <p className="mt-1.5 text-[11.5px] leading-snug text-white">
                DfE off-the-job minimum for this standard. Your provider may set a higher figure —
                use "Other" to match it.
              </p>
            )}
          </div>

          {standardCode === CUSTOM && (
            <div>
              <label className={labelCn} htmlFor="otj-hours">
                Total off-the-job hours
              </label>
              <Input
                id="otj-hours"
                type="number"
                step="1"
                min={OTJ_HOURS_FLOOR}
                inputMode="numeric"
                placeholder="e.g. 1066"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                className={inputCn}
              />
              <p className="mt-1.5 text-[11.5px] leading-snug text-white">
                The figure on your training plan / commitment statement.
              </p>
            </div>
          )}

          {/* Two-up from sm: — they are a pair and reading one needs the
              other. One per row was what made this sheet scroll. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="otj-start">
                Start date
              </label>
              <Input
                id="otj-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="otj-end">
                Planned end date (gateway)
              </label>
              <Input
                id="otj-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputCn}
              />
            </div>
          </div>

          {datesBackwards && (
            <p className="text-[12px] leading-snug text-red-300">
              Your gateway date needs to be after your start date.
            </p>
          )}

          {oldModel && (
            <div
              className={cn('space-y-2 rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
            >
              <p className="text-[12.5px] leading-snug text-white">
                You started before August 2025, so your apprenticeship uses the older{' '}
                <span className="font-semibold">6 hours per week</span> rule — not the fixed
                per-standard hours.
                {oldModelTotal > 0 && (
                  <>
                    {' '}
                    That's about{' '}
                    <span className="font-semibold text-elec-yellow">{oldModelTotal}h</span> across
                    your programme.
                  </>
                )}
              </p>
              {oldModelTotal > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStandardCode(CUSTOM);
                    setCustomHours(String(oldModelTotal));
                  }}
                  className="inline-flex h-11 items-center rounded-lg bg-elec-yellow px-3.5 text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90"
                >
                  Use {oldModelTotal}h (6h/week)
                </button>
              )}
            </div>
          )}

          {belowFloor && (
            <p className="text-[12px] leading-snug text-red-300">
              Off-the-job delivery can't be evidenced below the {OTJ_HOURS_FLOOR}-hour statutory
              floor — check your figure.
            </p>
          )}

          {/* Live preview of the pace — the reason to finish the form. */}
          {preview && (
            <div
              className={cn('rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                Your off-the-job target
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[30px] font-semibold leading-none tabular-nums text-elec-yellow">
                  {preview.total}h
                </span>
                <span className="text-[12.5px] text-white">over {preview.weeks} weeks</span>
              </div>
              <p className="mt-2 text-[12.5px] leading-snug text-white">
                That's about{' '}
                <span className="font-semibold text-elec-yellow">{preview.weeklyTarget}h/week</span>{' '}
                to clear your hours by gateway.
              </p>
            </div>
          )}
        </>
      )}
    </FormSheet>
  );
}

export default ProgrammeSetupSheet;
