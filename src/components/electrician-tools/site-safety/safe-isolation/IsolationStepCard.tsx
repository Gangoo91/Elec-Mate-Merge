import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Field, inputClass, PrimaryButton, SecondaryButton, Eyebrow } from '@/components/college/primitives';
import type { IsolationStep, VoltageReadings } from '@/hooks/useSafeIsolationRecords';

/** Data passed back when a step is completed */
export interface StepCompletionData {
  voltageReadings?: VoltageReadings;
  lockOffNumber?: string;
  provingUnitSerial?: string;
  instrumentModel?: string;
  instrumentSerial?: string;
}

interface IsolationStepCardProps {
  step: IsolationStep;
  stepNumber: number;
  isActive: boolean;
  onComplete: (data?: StepCompletionData) => void;
  onPhotoCapture?: () => void;
}

/** Threshold: any reading >=50V is a fail (GS38) */
const DEAD_THRESHOLD_V = 50;

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

  // Step 6 voltage state
  const [voltLN, setVoltLN] = useState<string>('');
  const [voltLE, setVoltLE] = useState<string>('');
  const [voltNE, setVoltNE] = useState<string>('');

  // Step 5 lock-off state
  const [lockOffNumber, setLockOffNumber] = useState<string>('');

  // Steps 3 & 7 proving unit + instrument state
  const [provingUnitSerial, setProvingUnitSerial] = useState<string>('');
  const [instrumentModel, setInstrumentModel] = useState<string>('');
  const [instrumentSerial, setInstrumentSerial] = useState<string>('');

  // Step 6: determine if all readings are provided and dead
  const isStep6 = stepNumber === 6;
  const isStep5 = stepNumber === 5;
  const isStep3or7 = stepNumber === 3 || stepNumber === 7;

  const parsedLN = voltLN.trim() ? parseFloat(voltLN) : null;
  const parsedLE = voltLE.trim() ? parseFloat(voltLE) : null;
  const parsedNE = voltNE.trim() ? parseFloat(voltNE) : null;

  const allReadingsEntered = parsedLN !== null && parsedLE !== null && parsedNE !== null;
  const allDead =
    allReadingsEntered &&
    isReadingDead(parsedLN) &&
    isReadingDead(parsedLE) &&
    isReadingDead(parsedNE);
  const anyLive =
    allReadingsEntered &&
    (!isReadingDead(parsedLN) || !isReadingDead(parsedLE) || !isReadingDead(parsedNE));

  // Can complete this step?
  const canComplete = isStep6 ? allReadingsEntered : true;

  const handleComplete = () => {
    const data: StepCompletionData = {};

    if (isStep6) {
      data.voltageReadings = {
        ln: parsedLN,
        le: parsedLE,
        ne: parsedNE,
        testedAt: new Date().toISOString(),
      };
    }
    if (isStep5 && lockOffNumber.trim()) {
      data.lockOffNumber = lockOffNumber.trim();
    }
    if (isStep3or7) {
      if (provingUnitSerial.trim()) data.provingUnitSerial = provingUnitSerial.trim();
      if (instrumentModel.trim()) data.instrumentModel = instrumentModel.trim();
      if (instrumentSerial.trim()) data.instrumentSerial = instrumentSerial.trim();
    }

    onComplete(Object.keys(data).length > 0 ? data : undefined);
  };

  // ── One colour dimension = status. Active = amber, done = emerald, pending = neutral.
  const accent = isCompleted ? 'bg-emerald-400' : isActive ? 'bg-amber-400' : 'bg-white/15';
  const numberBg = isCompleted
    ? 'bg-emerald-500 text-black'
    : isActive
      ? 'bg-amber-500 text-black'
      : 'bg-white/[0.08] text-white/70';
  const statusLabel = isCompleted ? 'Done' : isActive ? 'Active' : 'Pending';
  const statusPill = isCompleted
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
    : isActive
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
      : 'bg-white/[0.05] text-white/55 border-white/10';

  // Dead/live verdict for the completed voltage readings display
  const readingsDead =
    !!step.voltageReadings &&
    step.voltageReadings.ln !== null &&
    step.voltageReadings.le !== null &&
    step.voltageReadings.ne !== null &&
    isReadingDead(step.voltageReadings.ln) &&
    isReadingDead(step.voltageReadings.le) &&
    isReadingDead(step.voltageReadings.ne);

  return (
    <motion.div
      layout
      className={cn(
        'relative rounded-2xl border bg-[hsl(0_0%_12%)] overflow-hidden transition-colors duration-200',
        isActive ? 'border-amber-500/25' : isCompleted ? 'border-emerald-500/20' : 'border-white/[0.06]'
      )}
    >
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-[3px]', accent)} />
      <div className="flex items-start gap-3 p-4 pl-5">
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
          <div className="flex items-center gap-2 mb-1">
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
            <p className="text-[11px] text-white/55 tabular-nums mb-1">
              {new Date(step.completedAt).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}

          {/* Description */}
          <p className="text-xs leading-relaxed text-white/70">{step.description}</p>

          {/* Notes */}
          {step.notes && <p className="text-xs text-white/55 mt-1 italic">Note: {step.notes}</p>}

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
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-white/55">L-N</p>
                  <p className="text-sm font-bold text-white tabular-nums">{step.voltageReadings.ln ?? '-'}V</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55">L-E</p>
                  <p className="text-sm font-bold text-white tabular-nums">{step.voltageReadings.le ?? '-'}V</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55">N-E</p>
                  <p className="text-sm font-bold text-white tabular-nums">{step.voltageReadings.ne ?? '-'}V</p>
                </div>
              </div>
              {step.voltageReadings.testedAt && (
                <p className="text-[10px] text-white/55 mt-1.5 text-right tabular-nums">
                  Tested: {new Date(step.voltageReadings.testedAt).toLocaleString('en-GB', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit',
                  })}
                </p>
              )}
            </div>
          )}

          {/* Completed lock-off number display */}
          {isCompleted && step.lockOffNumber && (
            <p className="mt-2 text-xs text-white/70">Lock-off: {step.lockOffNumber}</p>
          )}

          {/* Completed instrument + proving unit display */}
          {isCompleted && (step.instrumentModel || step.instrumentSerial || step.provingUnitSerial) && (
            <div className="mt-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1">
              {(step.instrumentModel || step.instrumentSerial) && (
                <p className="text-xs text-white/70">
                  Test instrument: {[step.instrumentModel, step.instrumentSerial].filter(Boolean).join(' — ')}
                </p>
              )}
              {step.provingUnitSerial && (
                <p className="text-xs text-white/70">Proving unit: {step.provingUnitSerial}</p>
              )}
            </div>
          )}

          {/* Photo indicator */}
          {step.photoUrl && (
            <p className="text-[10px] text-white/55 mt-2">Photo attached</p>
          )}

          {/* Step 6: Voltage reading inputs */}
          {isActive && isStep6 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3"
            >
              <div className="p-3 rounded-xl bg-red-500/[0.06] border border-red-500/20 space-y-3">
                <Eyebrow className="text-red-300/90">Record voltage readings · GS38</Eyebrow>
                <p className="text-xs text-white/70">
                  Test between all conductors at the point of work. All readings must be below{' '}
                  {DEAD_THRESHOLD_V}V to confirm dead.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Field label="L-N (V)">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className={cn(inputClass, 'text-center text-base font-bold')}
                      value={voltLN}
                      onChange={(e) => setVoltLN(e.target.value)}
                    />
                  </Field>
                  <Field label="L-E (V)">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className={cn(inputClass, 'text-center text-base font-bold')}
                      value={voltLE}
                      onChange={(e) => setVoltLE(e.target.value)}
                    />
                  </Field>
                  <Field label="N-E (V)">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className={cn(inputClass, 'text-center text-base font-bold')}
                      value={voltNE}
                      onChange={(e) => setVoltNE(e.target.value)}
                    />
                  </Field>
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
                    <span className={cn('text-sm font-bold', allDead ? 'text-emerald-400' : 'text-red-400')}>
                      {allDead ? 'Confirmed dead — safe to proceed' : 'Live detected — do NOT proceed'}
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
                  className={inputClass}
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
              <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
                <Eyebrow className="text-amber-300/90">Test instrument details · GS38</Eyebrow>
                <Field label="Instrument make / model">
                  <input
                    placeholder="e.g. Fluke T6-1000, Martindale VI-15000"
                    className={inputClass}
                    value={instrumentModel}
                    onChange={(e) => setInstrumentModel(e.target.value)}
                  />
                </Field>
                <Field label="Instrument serial no.">
                  <input
                    placeholder="e.g. SN-987654"
                    className={inputClass}
                    value={instrumentSerial}
                    onChange={(e) => setInstrumentSerial(e.target.value)}
                  />
                </Field>
                <Field label="Proving unit serial no. (optional)">
                  <input
                    placeholder="e.g. PU-12345"
                    className={inputClass}
                    value={provingUnitSerial}
                    onChange={(e) => setProvingUnitSerial(e.target.value)}
                  />
                </Field>
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
                className={isStep6 && anyLive ? 'bg-red-500 text-white hover:bg-red-500/90' : undefined}
              >
                {isStep6
                  ? allReadingsEntered
                    ? anyLive
                      ? 'Record live readings'
                      : 'Confirm dead'
                    : 'Enter readings to continue'
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
