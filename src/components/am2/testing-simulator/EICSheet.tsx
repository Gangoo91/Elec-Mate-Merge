/**
 * EICSheet — the paperwork for Section B.
 *
 * Rebuilt 5 Oct 2026 (Andrew: "in the tabs we need to make it all 10x better…
 * think about the users"). What an apprentice needs from this screen:
 *   - see at a glance what is on the schedule and what is still missing,
 *   - get from an empty box straight to the circuit that fills it,
 *   - read the schedule the way the printed model form lays it out
 *     (numbered columns, grouped), with N/A where a column doesn't apply,
 *   - know what finishing now will do to their result.
 * Tabs are in the order they use them: test results first.
 */

import { useState } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CircuitProgress, EICScheduleState } from '@/types/am2-testing-simulator';
import type { SimMode } from '@/data/am2/sectionBRules';
import { useEICSchedule } from '@/hooks/am2/useEICSchedule';
import { EICCertificateTab } from './EICCertificateTab';
import { EICCircuitDetailsTab } from './EICCircuitDetailsTab';
import { EICTestResultsTab } from './EICTestResultsTab';

type TabId = 'test-results' | 'circuit-details' | 'certificate';

interface EICSheetProps {
  eic: EICScheduleState;
  circuitProgress: Record<number, CircuitProgress>;
  backLabel: string;
  mode: SimMode;
  onClose: () => void;
  onUpdateResult: (circuitId: number, field: string, value: string) => void;
  /** Columns 3–16 and the certificate's supply details (Practise and Assessment). */
  onUpdateDetail?: (circuitNumber: string, field: string, value: string) => void;
  onUpdateCert?: (field: string, value: string) => void;
  onGoToCircuit: (circuitId: number) => void;
  onFinish: () => void;
}

export function EICSheet({
  eic,
  circuitProgress,
  backLabel,
  mode,
  onClose,
  onUpdateResult,
  onUpdateDetail,
  onUpdateCert,
  onGoToCircuit,
  onFinish,
}: EICSheetProps) {
  const [tab, setTab] = useState<TabId>('test-results');
  const [confirming, setConfirming] = useState(false);
  const { validations } = useEICSchedule(eic);

  const filled = validations.reduce((n, v) => n + v.filledCount, 0);
  const total = validations.reduce((n, v) => n + v.totalCount, 0);
  const failed = validations.reduce(
    (n, v) => n + Object.values(v.columnStatuses).filter((s) => s === 'failed').length,
    0
  );
  const circuitsLeft = Object.values(circuitProgress).filter(
    (p) => p.completedTests.length < p.totalTests
  ).length;
  const complete = filled >= total;

  const tabs: { id: TabId; label: string; short: string; meta: string }[] = [
    { id: 'test-results', label: 'Test results', short: 'Results', meta: `${filled}/${total}` },
    {
      id: 'circuit-details',
      label: 'Circuit details',
      short: 'Circuits',
      meta: mode === 'learn' ? 'Cols 1–16' : 'You write 3–16',
    },
    {
      id: 'certificate',
      label: 'Certificate',
      short: 'Certificate',
      meta: mode === 'learn' ? 'Supply' : 'You write it',
    },
  ];

  // Always confirm: finishing ends the run, and a full schedule isn't
  // necessarily a finished one (remarks, a test to repeat).
  const finish = () => {
    if (confirming) onFinish();
    else setConfirming(true);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Bar */}
      <div className="shrink-0 border-b border-white/[0.08] px-3 py-2.5 sm:px-4 lg:px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-xl border border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] pl-2 pr-3.5 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13)] touch-manipulation hover:border-elec-yellow/60 active:scale-[0.97]"
          >
            <ChevronLeft className="h-5 w-5" /> {backLabel}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-bold leading-tight text-white lg:text-[18px]">
              <span className="sm:hidden">Schedule</span>
              <span className="hidden sm:inline">Electrical Installation Certificate</span>
            </p>
            <p className="truncate text-[12.5px] text-white">
              {filled} of {total} test boxes filled
              {failed > 0 && mode !== 'assessment' && (
                <span className="font-semibold text-white"> · {failed} outside the limit</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={finish}
            className={cn(
              'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-4 text-[14px] font-bold touch-manipulation active:scale-[0.97]',
              complete ? 'bg-elec-yellow text-black' : 'border border-white/[0.22] text-white'
            )}
          >
            <span className="hidden sm:inline">
              {mode === 'learn' ? 'Finish' : 'Finish and mark'}
            </span>
            <span className="sm:hidden">Finish</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              complete ? 'bg-emerald-400' : 'bg-elec-yellow'
            )}
            style={{ width: `${total ? (filled / total) * 100 : 0}%` }}
          />
        </div>

        {/* Tabs */}
        <div role="tablist" className="mt-2.5 grid grid-cols-3 gap-1.5 sm:flex sm:gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex h-11 flex-col items-center justify-center rounded-xl px-2 leading-tight touch-manipulation sm:flex-row sm:gap-2 sm:px-4',
                tab === t.id
                  ? 'bg-elec-yellow text-black'
                  : 'border border-white/[0.14] text-white hover:border-white/[0.3]'
              )}
            >
              <span className="text-[13px] font-bold">
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </span>
              <span
                className={cn(
                  'text-[10.5px] font-semibold sm:text-[11.5px]',
                  tab === t.id ? 'text-black' : 'text-white'
                )}
              >
                {t.meta}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Finishing early — say what it means */}
      {confirming && (
        <div className="shrink-0 border-b border-white/[0.08] px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-3 rounded-xl border-2 border-elec-yellow px-4 py-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-[13.5px] text-white">
              {complete ? (
                <>
                  <span className="font-bold">Every box is filled.</span> Checked the remarks and
                  each reading against its limit? Finishing ends the run
                  {mode === 'learn' ? ' and shows how it went.' : ' and marks it.'}
                </>
              ) : (
                <>
                  <span className="font-bold">
                    {total - filled} box{total - filled === 1 ? ' is' : 'es are'} still empty
                  </span>
                  {/* Not in Assessment: which circuits still have tests is for the learner to know */}
                  {mode !== 'assessment' &&
                    circuitsLeft > 0 &&
                    ` across ${circuitsLeft} circuit${circuitsLeft === 1 ? '' : 's'}`}
                  . Finishing now marks the schedule on what is filled in.
                </>
              )}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-11 rounded-xl bg-elec-yellow px-4 text-[13.5px] font-bold text-black touch-manipulation"
              >
                Keep testing
              </button>
              <button
                type="button"
                onClick={onFinish}
                className="h-11 rounded-xl border border-white/[0.22] px-4 text-[13.5px] font-semibold text-white touch-manipulation"
              >
                Mark it now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === 'test-results' && (
          <EICTestResultsTab
            testResults={eic.testResults}
            headerFields={eic.headerFields}
            validations={validations}
            circuitDetails={eic.circuitDetails}
            onGoToCircuit={onGoToCircuit}
            writable={mode !== 'learn'}
            showLimits={mode !== 'assessment'}
            readings={Object.fromEntries(
              Object.entries(circuitProgress).map(([id, p]) => [Number(id), p.readings])
            )}
            onWrite={onUpdateResult}
          />
        )}
        {tab === 'circuit-details' && (
          <EICCircuitDetailsTab
            circuitDetails={eic.circuitDetails}
            assessment={mode === 'assessment'}
            writable={mode !== 'learn'}
            onWrite={onUpdateDetail}
          />
        )}
        {tab === 'certificate' && (
          <EICCertificateTab
            certificate={eic.certificate}
            headerFields={eic.headerFields}
            writable={mode !== 'learn'}
            onWrite={onUpdateCert}
          />
        )}
      </div>
    </div>
  );
}
