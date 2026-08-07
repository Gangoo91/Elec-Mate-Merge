/**
 * Validate the whole schedule of test results in one action.
 *
 * The regulation checks have always run — per cell, and in a panel below the
 * desktop table. Neither is much use at a consumer unit: the per-cell badge
 * tells you nothing until you find the cell, and the panel does not exist on a
 * phone, which is where this app is actually used.
 *
 * This is one button and one answer: every circuit, grouped, with the numbers
 * the verdict turns on and an honest label saying whether the rule is BS 7671
 * or ours.
 */
import React, { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import type { RegulationWarning } from '@/utils/regulationChecker';
import { isRealCircuit } from '@/utils/validation/applicability';
import { cn } from '@/lib/utils';

interface CircuitFindings {
  id: string;
  /** What the electrician calls it — "Way 7", "Ct3", "—". */
  reference: string;
  description: string;
  warnings: RegulationWarning[];
}

interface ScheduleValidateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testResults: TestResult[];
  earthingArrangement?: string;
  /** Board name, so a multi-board schedule says which one was checked. */
  boardName?: string;
  /**
   * Turn a finding into an EICR observation.
   *
   * The checks already know the circuit, the defect and the regulation; without
   * this the electrician reads it here and retypes it there. The classification
   * code stays theirs — see the picker below.
   */
  onCreateObservation?: (observation: {
    item: string;
    defectCode: 'C1' | 'C2' | 'C3' | 'FI';
    description: string;
    recommendation: string;
  }) => void;
}

/**
 * What this tool actually checks, in the electrician's order of work.
 *
 * Shown on the all-clear state. "No issues" is only meaningful if you know what
 * was looked at — and it is the honest way to say what the tool does *not*
 * cover, which matters more on a document someone signs than a green tick does.
 *
 * These mirror the validators in `utils/regulationChecker/`.
 */
const CHECKS_PERFORMED: { label: string; source: string }[] = [
  { label: 'Device rating against cable capacity', source: 'Reg 433.1.1' },
  { label: 'CPC size against the live conductor', source: 'Table 54.7' },
  { label: 'Measured Zs against the maximum permitted', source: 'Tables 41.2–41.4' },
  { label: 'Insulation resistance minimums', source: 'Table 64' },
  { label: 'Polarity and ring final continuity', source: 'Reg 643.6, 643.2' },
  { label: 'RCD protection where required', source: 'Reg 411.3.3' },
  { label: 'Device suitability for bidirectional supplies', source: 'Reg 530.3.201' },
];

/**
 * The four EICR classification codes, with what each one means.
 *
 * Deliberately NOT auto-assigned from severity. A code is a professional
 * judgement about danger — C1 means someone could be hurt now, C2 that they
 * could be if something else fails — and it decides whether the certificate can
 * be Satisfactory at all. The tool can find the defect and word it; the
 * electrician codes it.
 */
const OBSERVATION_CODES: { code: 'C1' | 'C2' | 'C3' | 'FI'; meaning: string }[] = [
  { code: 'C1', meaning: 'Danger present' },
  { code: 'C2', meaning: 'Potentially dangerous' },
  { code: 'C3', meaning: 'Improvement recommended' },
  { code: 'FI', meaning: 'Further investigation' },
];

/** Severity order, worst first — a critical must never sit below an info. */
const SEVERITY_RANK: Record<string, number> = { critical: 0, warning: 1, info: 2 };

const severityStyles: Record<string, { chip: string; dot: string; label: string }> = {
  // Orange on a near-black ground goes muddy brown. Amber holds its colour at
  // low opacity and sits beside the app's elec-yellow without fighting it.
  critical: {
    chip: 'border-red-400/30 bg-red-400/[0.12] text-red-300',
    dot: 'bg-red-400',
    label: 'Failure',
  },
  warning: {
    chip: 'border-amber-400/30 bg-amber-400/[0.12] text-amber-200',
    dot: 'bg-amber-400',
    label: 'Check',
  },
  info: {
    chip: 'border-white/[0.16] bg-white/[0.06] text-white',
    dot: 'bg-white/60',
    label: 'Note',
  },
};

/**
 * True when the rule is ours rather than the standard's.
 *
 * The checker now labels its own thresholds explicitly, so the panel can show
 * the difference instead of printing a regulation number beside a house rule.
 * An electrician defending a certificate needs to know which is which.
 */
const isHouseRule = (regulation: string): boolean => regulation.startsWith('Elec-Mate check');

const ScheduleValidateSheet: React.FC<ScheduleValidateSheetProps> = ({
  open,
  onOpenChange,
  testResults,
  earthingArrangement,
  boardName,
  onCreateObservation,
}) => {
  // Findings already raised, so a second tap cannot create a duplicate. Keyed
  // per finding, not per circuit — one circuit can have several.
  const [raised, setRaised] = useState<Set<string>>(new Set());
  // Which finding is showing its code picker.
  const [picking, setPicking] = useState<string | null>(null);
  const { findings, circuitsChecked, skipped, totals } = useMemo(() => {
    const found: CircuitFindings[] = [];
    let checked = 0;
    let skippedRows = 0;
    const counts = { critical: 0, warning: 0, info: 0 };

    for (const circuit of testResults) {
      // Spare ways and device rows carry no circuit, so they have nothing to
      // measure and nothing to fail. Counting them would make a board of
      // twelve ways with six spares look half-tested.
      if (!isRealCircuit(circuit)) {
        skippedRows += 1;
        continue;
      }
      checked += 1;

      const { warnings } = checkRegulationCompliance(circuit, earthingArrangement);
      if (warnings.length === 0) continue;

      warnings.forEach((w) => {
        counts[w.severity as keyof typeof counts] =
          (counts[w.severity as keyof typeof counts] ?? 0) + 1;
      });

      found.push({
        id: circuit.id,
        reference: circuit.circuitDesignation || circuit.circuitNumber || '—',
        description: circuit.circuitDescription || 'Circuit',
        warnings: [...warnings].sort(
          (a, b) => (SEVERITY_RANK[a.severity] ?? 9) - (SEVERITY_RANK[b.severity] ?? 9)
        ),
      });
    }

    // Worst circuits first — the one that fails is what you want to see.
    found.sort((a, b) => {
      const aWorst = Math.min(...a.warnings.map((w) => SEVERITY_RANK[w.severity] ?? 9));
      const bWorst = Math.min(...b.warnings.map((w) => SEVERITY_RANK[w.severity] ?? 9));
      return aWorst - bWorst || b.warnings.length - a.warnings.length;
    });

    return { findings: found, circuitsChecked: checked, skipped: skippedRows, totals: counts };
  }, [testResults, earthingArrangement]);

  const issueCount = totals.critical + totals.warning + totals.info;
  const allClear = circuitsChecked > 0 && issueCount === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-2xl border-white/[0.1] p-0 overflow-hidden"
      >
        <div className="flex h-full flex-col bg-background">
          {/* Header.
              No colour wash. Orange at 10% over a near-black ground reads as
              muddy brown, and a full-bleed tint on a 2500px-wide sheet is a lot
              of colour to carry a one-word status. The meaning lives in a solid
              status dot and the counts; the surface stays the app's own. */}
          <div className="border-b border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent px-5 pb-4 pt-5">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  aria-hidden
                  className={cn(
                    'h-2.5 w-2.5 shrink-0 rounded-full',
                    allClear ? 'bg-green-400' : issueCount > 0 ? 'bg-amber-400' : 'bg-white/40'
                  )}
                />
                <h2 className="text-[20px] font-bold tracking-tight text-white">
                  {circuitsChecked === 0
                    ? 'Nothing to check yet'
                    : allClear
                      ? 'All checks passed'
                      : `${issueCount} thing${issueCount === 1 ? '' : 's'} to look at`}
                </h2>

                {issueCount > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['critical', 'warning', 'info'] as const)
                      .filter((sev) => totals[sev] > 0)
                      .map((sev) => (
                        <span
                          key={sev}
                          className={cn(
                            'rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold tabular-nums',
                            severityStyles[sev].chip
                          )}
                        >
                          {totals[sev]} {severityStyles[sev].label.toLowerCase()}
                          {totals[sev] === 1 ? '' : 's'}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              <p className="mt-1.5 text-[13px] font-medium text-white/85 tabular-nums">
                {circuitsChecked} circuit{circuitsChecked === 1 ? '' : 's'} checked
                {boardName ? ` on ${boardName}` : ''}
                {skipped > 0 && ` · ${skipped} spare or device row skipped`}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            <div className="mx-auto w-full max-w-6xl">
            {circuitsChecked === 0 && (
              <p className="text-sm text-white">
                Add circuits to the schedule and their test values, then validate.
              </p>
            )}

            {/* All clear.
                "No issues" means nothing unless you know what was looked at, so
                this shows its working. It is also the honest place to say what
                the tool does NOT cover — which matters more on a document
                someone signs than a green tick does. */}
            {allClear && (
              <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5">
                <p className="text-[14px] leading-relaxed text-white">
                  Every circuit passes the checks that can be made from the values recorded. This
                  is not a substitute for your own judgement — it only tests what is on the
                  schedule.
                </p>

                <h3 className="mb-3 mt-5 border-t border-white/[0.1] pt-4 text-[13px] font-semibold text-white">
                  What was checked
                </h3>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {CHECKS_PERFORMED.map((check) => (
                    <li key={check.label} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"
                      />
                      <span className="text-[13px] leading-snug text-white">
                        {check.label}
                        <span className="ml-1.5 text-[11.5px] font-medium text-elec-yellow">
                          {check.source}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Two across from `sm` up. One column on a 2500px sheet gave a
                measure of ~1800px — unreadable, and it buried the second circuit
                below the fold when both would have fitted side by side.
                `items-start` so a card with one finding does not stretch to
                match a card with four. */}
            <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
              {findings.map((circuit) => (
                <div
                  key={circuit.id}
                  className="overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.07] to-white/[0.03]"
                >
                  {/* Circuit header — the way reference as a pill, so it reads
                      as an identifier rather than emphasis. */}
                  <div className="flex items-center gap-2.5 border-b border-white/[0.1] bg-white/[0.04] px-4 py-2.5">
                    <span className="shrink-0 rounded-md bg-elec-yellow px-2 py-0.5 text-[11px] font-bold tabular-nums text-black">
                      {circuit.reference}
                    </span>
                    <h3 className="min-w-0 flex-1 truncate text-[14.5px] font-semibold text-white">
                      {circuit.description}
                    </h3>
                    <span className="shrink-0 text-[11.5px] font-semibold text-white/85 tabular-nums">
                      {circuit.warnings.length}
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.08]">
                    {circuit.warnings.map((w, i) => (
                      <div key={`${circuit.id}-${i}`} className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden
                            className={cn(
                              'mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full',
                              severityStyles[w.severity]?.dot ?? severityStyles.info.dot
                            )}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-semibold leading-snug text-white">
                              {w.title}
                            </p>
                            <p className="mt-1 text-[13px] leading-relaxed text-white/90">
                              {w.description}
                            </p>
                            {w.suggestion && (
                              <p className="mt-1.5 text-[13px] leading-relaxed text-white/90">
                                {w.suggestion}
                              </p>
                            )}

                            {/* Provenance. A house threshold is never dressed up
                                as a regulation — the checker labels its own, and
                                this renders that difference plainly. */}
                            <p
                              className={cn(
                                'mt-2 text-[11.5px] font-medium',
                                isHouseRule(w.regulation) ? 'text-white/85' : 'text-elec-yellow'
                              )}
                            >
                              {w.regulation}
                            </p>

                            {/* Finding → observation. The code picker is the
                                second tap on purpose: the tool knows the defect,
                                the electrician decides how dangerous it is. */}
                            {onCreateObservation &&
                              (() => {
                                const key = `${circuit.id}-${i}`;
                                if (raised.has(key)) {
                                  return (
                                    <p className="mt-2.5 text-[12px] font-semibold text-green-300">
                                      Added to observations
                                    </p>
                                  );
                                }
                                if (picking !== key) {
                                  return (
                                    <button
                                      type="button"
                                      onClick={() => setPicking(key)}
                                      className="mt-2.5 h-9 rounded-lg border border-white/[0.16] bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.1]"
                                    >
                                      Add as observation
                                    </button>
                                  );
                                }
                                return (
                                  <div className="mt-2.5">
                                    <p className="mb-1.5 text-[11.5px] font-medium text-white/85">
                                      Classify it
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {OBSERVATION_CODES.map(({ code, meaning }) => (
                                        <button
                                          key={code}
                                          type="button"
                                          title={meaning}
                                          onClick={() => {
                                            onCreateObservation({
                                              item: `${circuit.reference} — ${circuit.description}`,
                                              defectCode: code,
                                              description: `${w.title}. ${w.description}`,
                                              // The rule's own suggestion where
                                              // it has one, otherwise empty —
                                              // not a boilerplate sentence that
                                              // would print as the remedial
                                              // action on a signed certificate.
                                              recommendation: w.suggestion || '',
                                            });
                                            setRaised((prev) => new Set(prev).add(key));
                                            setPicking(null);
                                          }}
                                          className="h-9 rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 text-[12.5px] font-bold text-white touch-manipulation transition-colors hover:border-elec-yellow hover:bg-elec-yellow hover:text-black"
                                        >
                                          {code}
                                        </button>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => setPicking(null)}
                                        className="h-9 px-2 text-[12.5px] font-medium text-white/85 touch-manipulation"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                );
                              })()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>

          <div className="border-t border-white/[0.08] p-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 w-full touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform active:scale-[0.99]"
            >
              Close
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleValidateSheet;
