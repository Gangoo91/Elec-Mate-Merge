/**
 * ProgrammeSetupSheet — lets an apprentice with no college link set their own
 * programme so the OTJ forecast is grounded in their real timeline.
 *
 * Off-the-job training (starts from 1 Aug 2025) is a FIXED total number of
 * hours per apprenticeship standard (DfE Annex C) — not 20% of working hours.
 * So the apprentice picks their standard (→ its fixed total) and sets their
 * dates; the weekly figure is just the delivery pace (total ÷ weeks).
 */

import { useEffect, useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { OTJ_STANDARDS, OTJ_HOURS_FLOOR } from '@/data/otjStandards';
import type { SelfProgramme } from '@/hooks/useOtjProgramme';

const WEEK_MS = 7 * 86_400_000;
const CUSTOM = '__custom__';
// The fixed-hours-per-standard model applies to apprenticeship starts from
// 1 Aug 2025. Earlier starts stay on the old "6 hours per week / 20%" rule for
// the whole apprenticeship.
const NEW_MODEL_CUTOFF = '2025-08-01';
const OLD_MODEL_WEEKLY_HOURS = 6;

export function ProgrammeSetupSheet({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: SelfProgramme | null;
  onSave: (p: SelfProgramme) => void;
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
  const oldModelTotal =
    oldModel && weeks > 0 ? Math.round(OLD_MODEL_WEEKLY_HOURS * weeks) : 0;

  const belowFloor = totalHours > 0 && totalHours < OTJ_HOURS_FLOOR;
  const canSave = preview !== null && !belowFloor;

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[86vh] sm:h-[78vh] rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.06] p-0"
      >
        <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-2" />
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 sm:px-6 pb-4">
            <SheetTitle className="text-left">
              <Eyebrow>Your programme</Eyebrow>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white mt-1">
                Set your apprenticeship
              </h2>
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white/70 leading-snug">
              Off-the-job training is a fixed number of hours set for your
              apprenticeship standard. Pick yours and add your dates — we'll work
              out the pace you need to stay on track.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 space-y-4">
            <div className="space-y-2">
              <Eyebrow>Apprenticeship standard</Eyebrow>
              <Select value={standardCode} onValueChange={setStandardCode}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                  <SelectValue placeholder="Select your standard" />
                </SelectTrigger>
                <SelectContent>
                  {OTJ_STANDARDS.map((s) => (
                    <SelectItem key={s.code} value={s.code}>
                      {s.name} (L{s.level}) · {s.otjHours}h
                    </SelectItem>
                  ))}
                  <SelectItem value={CUSTOM}>Other / enter hours manually</SelectItem>
                </SelectContent>
              </Select>
              {standardCode && standardCode !== CUSTOM && (
                <p className="text-[11px] text-white/45 leading-snug">
                  DfE off-the-job minimum for this standard. Your provider may set
                  a higher figure — use "Other" to match it.
                </p>
              )}
            </div>

            {standardCode === CUSTOM && (
              <div className="space-y-2">
                <Eyebrow>Total off-the-job hours</Eyebrow>
                <Input
                  type="number"
                  step="1"
                  min={OTJ_HOURS_FLOOR}
                  inputMode="numeric"
                  placeholder="e.g. 1066"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                />
                <p className="text-[11px] text-white/45 leading-snug">
                  The figure on your training plan / commitment statement.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Eyebrow>Start date</Eyebrow>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white"
              />
            </div>

            <div className="space-y-2">
              <Eyebrow>Planned end date (gateway)</Eyebrow>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white"
              />
            </div>

            {oldModel && (
              <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-3.5 space-y-2">
                <p className="text-[12px] text-white/80 leading-snug">
                  You started before August 2025, so your apprenticeship uses the older
                  <span className="text-white"> 6 hours per week</span> rule — not the fixed
                  per-standard hours.
                  {oldModelTotal > 0 && (
                    <> That's about <span className="text-elec-yellow">{oldModelTotal}h</span> across your programme.</>
                  )}
                </p>
                {oldModelTotal > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStandardCode(CUSTOM);
                      setCustomHours(String(oldModelTotal));
                    }}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                  >
                    Use {oldModelTotal}h (6h/week)
                  </button>
                )}
              </div>
            )}

            {belowFloor && (
              <p className="text-[12px] text-red-300 leading-snug">
                Off-the-job delivery can't be evidenced below the {OTJ_HOURS_FLOOR}-hour
                statutory floor — check your figure.
              </p>
            )}

            {/* Live preview of the pace */}
            {preview && (
              <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 space-y-2">
                <Eyebrow>Your off-the-job target</Eyebrow>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-semibold text-elec-yellow tabular-nums leading-none">
                    {preview.total}h
                  </span>
                  <span className="text-[12px] text-white/45">
                    over {preview.weeks} weeks
                  </span>
                </div>
                <p className="text-[12px] text-white/70 leading-snug">
                  That's about{' '}
                  <span className="text-elec-yellow">
                    {preview.weeklyTarget}h/week
                  </span>{' '}
                  to clear your hours by gateway.
                </p>
              </div>
            )}
          </div>

          <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-20 sm:pb-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] text-white text-[13px] font-semibold hover:bg-white/[0.04]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!canSave}
                className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 disabled:opacity-40 inline-flex items-center justify-center gap-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ProgrammeSetupSheet;
