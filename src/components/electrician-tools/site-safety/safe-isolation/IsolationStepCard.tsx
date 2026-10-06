import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Field, PrimaryButton, SecondaryButton, Eyebrow } from '@/components/college/primitives';
import { safetyInputCn } from '../common/SafetyDocField';
import {
  DEAD_THRESHOLD_V,
  readingPairsFor,
  readingsConfirmDead,
  type IsolationStep,
  type VoltageReadings,
} from '@/hooks/useSafeIsolationRecords';

/** Data passed back when a step is completed */
export interface StepCompletionData {
  voltageReadings?: VoltageReadings;
  lockOffNumber?: string;
  provingUnitSerial?: string;
  instrumentModel?: string;
  instrumentSerial?: string;
  /**
   * Set when prove-dead was attempted and something read live. The readings are
   * still saved — they are the evidence the isolation failed — but the step
   * must not count as complete, or the record walks on to "isolated".
   */
  proveDeadFailed?: boolean;
  /** Steps 3 & 7 — the user's own answer: did the tester indicate on the proving unit? */
  testerProvedOk?: boolean;
}

interface IsolationStepCardProps {
  step: IsolationStep;
  stepNumber: number;
  isActive: boolean;
  onComplete: (data?: StepCompletionData) => void;
  onPhotoCapture?: () => void;
}

function isReadingDead(v: number | null): boolean {
  return v !== null && v < DEAD_THRESHOLD_V;
}

export function IsolationStepCard({
  step,
  stepNumber,
  isActive,
  onComplete,
  onPhotoCapture,
}: IsolationStepCardProps) {
  const isCompleted = step.completed;
  const isPending = !isCompleted && !isActive;

  // Bring the step you are on into view. After a step is ticked the next one
  // becomes active further down the page; without this the electrician has to
  // hunt for it with gloves on. Also lands a resumed record on the right step.
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isActive || !cardRef.current) return;
    const t = window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
    return () => window.clearTimeout(t);
  }, [isActive]);

  // Step 6 voltage state, keyed by conductor pair so the same code serves a
  // single-phase circuit (3 readings) and a three-phase one (10).
  const [phases, setPhases] = useState<1 | 3>(1);
  const [volts, setVolts] = useState<Record<string, string>>({});
  const setVolt = (key: string, value: string) => setVolts((prev) => ({ ...prev, [key]: value }));

  // Step 5 lock-off state
  const [lockOffNumber, setLockOffNumber] = useState<string>('');

  // Steps 3 & 7 proving unit + instrument state
  const [provingUnitSerial, setProvingUnitSerial] = useState<string>('');
  const [instrumentModel, setInstrumentModel] = useState<string>('');
  const [instrumentSerial, setInstrumentSerial] = useState<string>('');
  // Starts unanswered on purpose. A preselected "yes" would let the step be
  // ticked without anyone looking at the indicator.
  const [testerProved, setTesterProved] = useState<boolean | null>(null);

  // Step 6: determine if all readings are provided and dead
  const isStep6 = stepNumber === 6;
  const isStep5 = stepNumber === 5;
  const isStep3or7 = stepNumber === 3 || stepNumber === 7;

  const pairs = readingPairsFor(phases);
  const parsed = (key: string): number | null => {
    const raw = volts[key]?.trim();
    return raw ? parseFloat(raw) : null;
  };

  const allReadingsEntered = pairs.every((p) => parsed(p.key) !== null);
  const allDead = allReadingsEntered && pairs.every((p) => isReadingDead(parsed(p.key)));
  const anyLive = allReadingsEntered && !allDead;

  // Prove dead is the one step that can fail. Readings still get recorded when
  // something is live — that is the evidence — but the step does not complete.
  // Steps 3 & 7 need an explicit "it lit on the proving unit". A "no" blocks
  // the step: a tester that did not prove cannot be trusted to show dead.
  const canComplete = isStep6 ? allReadingsEntered : isStep3or7 ? testerProved === true : true;

  const handleComplete = () => {
    const data: StepCompletionData = {};

    if (isStep6) {
      const readings: VoltageReadings = {
        ln: null,
        le: null,
        ne: null,
        phases,
        testedAt: new Date().toISOString(),
      };
      pairs.forEach((p) => {
        (readings as unknown as Record<string, number | null>)[p.key] = parsed(p.key);
      });
      data.voltageReadings = readings;
      data.proveDeadFailed = anyLive;
    }
    if (isStep5 && lockOffNumber.trim()) {
      data.lockOffNumber = lockOffNumber.trim();
    }
    if (isStep3or7) {
      if (provingUnitSerial.trim()) data.provingUnitSerial = provingUnitSerial.trim();
      if (instrumentModel.trim()) data.instrumentModel = instrumentModel.trim();
      if (instrumentSerial.trim()) data.instrumentSerial = instrumentSerial.trim();
      data.testerProvedOk = testerProved === true;
    }

    onComplete(Object.keys(data).length > 0 ? data : undefined);
  };

  // ── One colour dimension = status. Active = amber, done = emerald, pending = neutral.
  const accent = isCompleted ? 'bg-emerald-400' : isActive ? 'bg-amber-400' : 'bg-white/15';
  const numberBg = isCompleted
    ? 'bg-emerald-500 text-black'
    : isActive
      ? 'bg-amber-500 text-black'
      : 'bg-white/[0.08] text-white';
  const statusLabel = isCompleted ? 'Done' : isActive ? 'Active' : 'Pending';
  const statusPill = isCompleted
    ? 'bg-white/[0.05] text-emerald-400 border-white/10'
    : isActive
      ? 'bg-white/[0.05] text-amber-400 border-white/10'
      : 'bg-white/[0.05] text-white border-white/10';

  // Dead/live verdict for the completed voltage readings display
  const readingsDead = readingsConfirmDead(step.voltageReadings);

  return (
    <motion.div
      ref={cardRef}
      layout
      className={cn(
        'scroll-mt-24',
        'relative rounded-2xl border overflow-hidden transition-colors duration-200',
        CARD_SURFACE,
        isActive
          ? 'border-amber-500/25'
          : isCompleted
            ? 'border-emerald-500/20'
            : 'border-white/[0.06]'
      )}
    >
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-[3px]', accent)} />
      <div className={cn('flex items-start gap-3 pl-5', isPending ? 'p-3' : 'p-4')}>
        {/* Step number / done marker */}
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold tabular-nums',
            numberBg
          )}
        >
          {isCompleted ? '✓' : stepNumber}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title + status pill */}
          <div
            className={cn('flex items-center gap-2', !isPending && 'mb-1', isPending && 'min-h-8')}
          >
            <h4 className="text-sm font-semibold text-white">{step.title}</h4>
            <span
              className={cn(
                'ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
                statusPill
              )}
            >
              {statusLabel}
            </span>
          </div>

          {isCompleted && step.completedAt && (
            <p className="text-[11px] text-white tabular-nums mb-1">
              {new Date(step.completedAt).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}

          {/* Description — only for the step you are on. Pending steps show
              their title so the list reads as "what's left" at a glance; done
              steps show what was recorded instead of the instruction. */}
          {isActive && <p className="text-[13px] leading-relaxed text-white">{step.description}</p>}

          {/* Notes */}
          {isActive && step.notes && (
            <p className="text-xs text-white mt-1 italic">Note: {step.notes}</p>
          )}

          {/* Completed voltage readings display */}
          {isCompleted && step.voltageReadings && (
            <div className="mt-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-semibold text-white uppercase tracking-[0.12em]">
                  Voltage readings
                </span>
                <span
                  className={cn(
                    'ml-auto text-[10px] font-semibold uppercase tracking-[0.12em]',
                    readingsDead ? 'text-emerald-400' : 'text-red-400'
                  )}
                >
                  {readingsDead ? 'Dead' : 'Live'}
                </span>
              </div>
              {/* Driven off the record's own phase count. Hard-coded L-N/L-E/
                  N-E would have shown three of a three-phase test's ten
                  readings and silently dropped the rest. */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {readingPairsFor(step.voltageReadings.phases ?? 1).map((p) => {
                  const v = (step.voltageReadings as unknown as Record<string, number | null>)[
                    p.key
                  ];
                  const live = typeof v === 'number' && v >= DEAD_THRESHOLD_V;
                  return (
                    <div key={p.key}>
                      <p className="text-[10px] text-white">{p.label}</p>
                      <p
                        className={cn(
                          'text-sm font-bold tabular-nums',
                          live ? 'text-red-400' : 'text-white'
                        )}
                      >
                        {v ?? '-'}V
                      </p>
                    </div>
                  );
                })}
              </div>
              {step.voltageReadings.testedAt && (
                <p className="text-[10px] text-white mt-1.5 text-right tabular-nums">
                  Tested:{' '}
                  {new Date(step.voltageReadings.testedAt).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              )}
            </div>
          )}

          {/* Completed lock-off number display */}
          {isCompleted && step.lockOffNumber && (
            <p className="mt-2 text-xs text-white">Lock-off: {step.lockOffNumber}</p>
          )}

          {/* Completed instrument + proving unit display */}
          {isCompleted &&
            (step.instrumentModel || step.instrumentSerial || step.provingUnitSerial) && (
              <div className="mt-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1">
                {(step.instrumentModel || step.instrumentSerial) && (
                  <p className="text-xs text-white">
                    Test instrument:{' '}
                    {[step.instrumentModel, step.instrumentSerial].filter(Boolean).join(' — ')}
                  </p>
                )}
                {step.provingUnitSerial && (
                  <p className="text-xs text-white">Proving unit: {step.provingUnitSerial}</p>
                )}
              </div>
            )}

          {/* Photo indicator */}
          {step.photoUrl && <p className="text-[10px] text-white mt-2">Photo attached</p>}

          {/* Step 6: Voltage reading inputs */}
          {isActive && isStep6 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3"
            >
              <div className="p-3 rounded-xl bg-red-500/[0.06] border border-red-500/20 space-y-3">
                <Eyebrow className="text-red-400">Record voltage readings · GS38</Eyebrow>
                <p className="text-xs text-white">
                  Test between all conductors at the point of work. All readings must be below{' '}
                  {DEAD_THRESHOLD_V}V to confirm dead.
                </p>

                {/* Supply type. A three-phase board tested on three readings is
                    not a proved-dead three-phase board — HSG85 para 53 requires
                    every supply conductor. Choosing here rather than on the
                    record means it is picked standing at the board. */}
                <div className="grid grid-cols-2 gap-2">
                  {([1, 3] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPhases(p)}
                      className={cn(
                        'h-11 touch-manipulation rounded-full border text-[13px] transition-colors',
                        phases === p
                          ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                          : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                      )}
                    >
                      {p === 1 ? 'Single phase' : 'Three phase'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {pairs.map((p) => {
                    const v = parsed(p.key);
                    const live = v !== null && !isReadingDead(v);
                    return (
                      <Field key={p.key} label={`${p.label} (V)`}>
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.1"
                          placeholder="0"
                          className={cn(
                            safetyInputCn,
                            'text-center text-base font-bold',
                            // The one field that is live should be findable at a
                            // glance in a grid of ten.
                            live && 'text-red-400'
                          )}
                          value={volts[p.key] ?? ''}
                          onChange={(e) => setVolt(p.key, e.target.value)}
                        />
                      </Field>
                    );
                  })}
                </div>

                {/* Pass/Fail indicator */}
                {allReadingsEntered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      'p-2.5 rounded-xl flex items-center justify-center',
                      allDead
                        ? 'bg-emerald-500/10 border border-emerald-500/25'
                        : 'bg-red-500/10 border border-red-500/25'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-bold',
                        allDead ? 'text-emerald-400' : 'text-red-400'
                      )}
                    >
                      {/* States what was entered, not that the circuit is safe:
                          the app has only the numbers typed into it. */}
                      {allDead
                        ? `All readings below ${DEAD_THRESHOLD_V}V — recorded as dead`
                        : 'Live detected — isolation has failed'}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 5: Lock-off number input */}
          {isActive && isStep5 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3"
            >
              <Field label="Lock-off number (optional)">
                <input
                  placeholder="e.g. LOK-001"
                  className={safetyInputCn}
                  value={lockOffNumber}
                  onChange={(e) => setLockOffNumber(e.target.value)}
                />
              </Field>
            </motion.div>
          )}

          {/* Steps 3 & 7: Test instrument + proving unit inputs */}
          {isActive && isStep3or7 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3"
            >
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.1] space-y-2">
                <Eyebrow>Test instrument details · GS38</Eyebrow>
                <Field label="Instrument make / model">
                  <input
                    placeholder="e.g. Fluke T6-1000, Martindale VI-15000"
                    className={safetyInputCn}
                    value={instrumentModel}
                    onChange={(e) => setInstrumentModel(e.target.value)}
                  />
                </Field>
                <Field label="Instrument serial no.">
                  <input
                    placeholder="e.g. SN-987654"
                    className={safetyInputCn}
                    value={instrumentSerial}
                    onChange={(e) => setInstrumentSerial(e.target.value)}
                  />
                </Field>
                <Field label="Proving unit serial no. (optional)">
                  <input
                    placeholder="e.g. PU-12345"
                    className={safetyInputCn}
                    value={provingUnitSerial}
                    onChange={(e) => setProvingUnitSerial(e.target.value)}
                  />
                </Field>
                <div className="pt-1">
                  <p className="mb-2 text-[12px] font-medium text-white">
                    Did the tester indicate correctly on the proving unit or a known live source?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { v: true, label: 'Yes, it proved' },
                      { v: false, label: 'No' },
                    ].map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        aria-pressed={testerProved === o.v}
                        onClick={() => setTesterProved(o.v)}
                        className={
                          'h-11 rounded-xl border text-[13px] touch-manipulation ' +
                          (testerProved === o.v
                            ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                            : 'bg-white/[0.06] border-white/[0.12] text-white font-medium')
                        }
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {testerProved === false && (
                    <p className="mt-2 text-[12px] text-red-300">
                      Stop. Do not rely on this tester. Use a working voltage indicator and prove it
                      before continuing.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2 mt-3"
            >
              <PrimaryButton
                fullWidth
                onClick={handleComplete}
                disabled={!canComplete}
                className={
                  isStep6 && anyLive ? 'bg-red-500 text-white hover:bg-red-500/90' : undefined
                }
              >
                {isStep6
                  ? allReadingsEntered
                    ? anyLive
                      ? // Saves the readings and leaves the step open. It used
                        // to say "Record live readings" and then mark prove-dead
                        // done, which walked the record on to "isolated" — the
                        // app certifying as isolated a circuit it had just
                        // measured at mains voltage.
                        'Record readings — isolation failed'
                      : 'Confirm dead'
                    : 'Enter readings to continue'
                  : isStep3or7 && testerProved !== true
                    ? 'Confirm the tester proved'
                    : 'Complete step'}
              </PrimaryButton>

              {onPhotoCapture && (
                <SecondaryButton onClick={onPhotoCapture} className="px-4 shrink-0">
                  Photo
                </SecondaryButton>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default IsolationStepCard;
