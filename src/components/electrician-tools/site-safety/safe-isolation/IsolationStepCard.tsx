import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Camera, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
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
  const isPending = !isCompleted && !isActive;

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

  // Styling
  const borderColour = isCompleted
    ? 'border-green-500/30'
    : isActive
      ? 'border-amber-500/40'
      : 'border-white/[0.06]';

  const bgColour = isCompleted
    ? 'bg-green-500/[0.06]'
    : isActive
      ? 'bg-amber-500/[0.06]'
      : 'bg-white/[0.02]';

  const numberBg = isCompleted
    ? 'bg-green-500 text-white'
    : isActive
      ? 'bg-amber-500 text-black'
      : 'bg-white/[0.08] text-white';

  return (
    <motion.div
      layout
      className={`rounded-xl border ${borderColour} ${bgColour} p-4 transition-colors duration-200`}
      animate={isActive ? { scale: [1, 1.005, 1] } : {}}
      transition={isActive ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <div className="flex items-start gap-3">
        {/* Step number / check */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${numberBg}`}
        >
          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`text-sm font-bold ${
                isCompleted ? 'text-green-400' : isActive ? 'text-amber-400' : 'text-white'
              }`}
            >
              {step.title}
            </h4>
            {isCompleted && step.completedAt && (
              <span className="text-[10px] text-white">
                {new Date(step.completedAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>

          {/* Description */}
          <p className={`text-xs leading-relaxed ${isPending ? 'text-white' : 'text-white'}`}>
            {step.description}
          </p>

          {/* Notes */}
          {step.notes && <p className="text-xs text-white mt-1 italic">Note: {step.notes}</p>}

          {/* Completed voltage readings display */}
          {isCompleted && step.voltageReadings && (
            <div className="mt-2 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="h-3 w-3 text-elec-yellow" />
                <span className="text-[10px] font-semibold text-white">Voltage Readings</span>
                {step.voltageReadings.ln !== null &&
                step.voltageReadings.le !== null &&
                step.voltageReadings.ne !== null &&
                isReadingDead(step.voltageReadings.ln) &&
                isReadingDead(step.voltageReadings.le) &&
                isReadingDead(step.voltageReadings.ne) ? (
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-green-400">
                    <ShieldCheck className="h-3 w-3" /> DEAD
                  </span>
                ) : (
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-red-400">
                    <AlertTriangle className="h-3 w-3" /> LIVE
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-white">L-N</p>
                  <p className="text-sm font-bold text-white">{step.voltageReadings.ln ?? '-'}V</p>
                </div>
                <div>
                  <p className="text-[10px] text-white">L-E</p>
                  <p className="text-sm font-bold text-white">{step.voltageReadings.le ?? '-'}V</p>
                </div>
                <div>
                  <p className="text-[10px] text-white">N-E</p>
                  <p className="text-sm font-bold text-white">{step.voltageReadings.ne ?? '-'}V</p>
                </div>
              </div>
              {step.voltageReadings.testedAt && (
                <p className="text-[10px] text-white mt-1.5 text-right">
                  Tested: {new Date(step.voltageReadings.testedAt).toLocaleString('en-GB', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit',
                  })}
                </p>
              )}
            </div>
          )}

          {/* Completed lock-off number display */}
          {isCompleted && step.lockOffNumber && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-white">
              <ShieldCheck className="h-3 w-3 text-elec-yellow" />
              Lock-off: {step.lockOffNumber}
            </div>
          )}

          {/* Completed instrument + proving unit display */}
          {isCompleted && (step.instrumentModel || step.instrumentSerial || step.provingUnitSerial) && (
            <div className="mt-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1">
              {(step.instrumentModel || step.instrumentSerial) && (
                <div className="flex items-center gap-1.5 text-xs text-white">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  Test instrument: {[step.instrumentModel, step.instrumentSerial].filter(Boolean).join(' \u2014 ')}
                </div>
              )}
              {step.provingUnitSerial && (
                <div className="flex items-center gap-1.5 text-xs text-white">
                  <ShieldCheck className="h-3 w-3 text-elec-yellow" />
                  Proving unit: {step.provingUnitSerial}
                </div>
              )}
            </div>
          )}

          {/* Photo indicator */}
          {step.photoUrl && (
            <div className="flex items-center gap-1.5 mt-2">
              <Camera className="h-3 w-3 text-elec-yellow" />
              <span className="text-[10px] text-white">Photo attached</span>
            </div>
          )}

          {/* Step 6: Voltage reading inputs */}
          {isActive && isStep6 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 space-y-3"
            >
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-red-400" />
                  <span className="text-xs font-semibold text-white">
                    Record Voltage Readings (GS38)
                  </span>
                </div>
                <p className="text-xs text-white mb-3">
                  Test between all conductors at the point of work. All readings must be below{' '}
                  {DEAD_THRESHOLD_V}V to confirm dead.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      L-N (V)
                    </label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className="h-11 text-center text-base font-bold bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={voltLN}
                      onChange={(e) => setVoltLN(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      L-E (V)
                    </label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className="h-11 text-center text-base font-bold bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={voltLE}
                      onChange={(e) => setVoltLE(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      N-E (V)
                    </label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className="h-11 text-center text-base font-bold bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={voltNE}
                      onChange={(e) => setVoltNE(e.target.value)}
                    />
                  </div>
                </div>

                {/* Pass/Fail indicator */}
                {allReadingsEntered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-3 p-2.5 rounded-lg flex items-center justify-center gap-2 ${
                      allDead
                        ? 'bg-green-500/15 border border-green-500/30'
                        : 'bg-red-500/15 border border-red-500/30'
                    }`}
                  >
                    {allDead ? (
                      <>
                        <ShieldCheck className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-bold text-green-400">
                          CONFIRMED DEAD — Safe to proceed
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-red-400">
                          LIVE DETECTED — DO NOT proceed
                        </span>
                      </>
                    )}
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
              <label className="text-xs font-semibold text-white mb-1.5 block">
                Lock-Off Number (Optional)
              </label>
              <Input
                placeholder="e.g. LOK-001"
                className="h-11 bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                value={lockOffNumber}
                onChange={(e) => setLockOffNumber(e.target.value)}
              />
            </motion.div>
          )}

          {/* Steps 3 & 7: Test instrument + proving unit inputs */}
          {isActive && isStep3or7 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 space-y-3"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold text-white">
                    Test Instrument Details (GS38)
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      Instrument Make / Model
                    </label>
                    <Input
                      placeholder="e.g. Fluke T6-1000, Martindale VI-15000"
                      className="h-11 bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={instrumentModel}
                      onChange={(e) => setInstrumentModel(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      Instrument Serial No.
                    </label>
                    <Input
                      placeholder="e.g. SN-987654"
                      className="h-11 bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={instrumentSerial}
                      onChange={(e) => setInstrumentSerial(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-white mb-1 block">
                      Proving Unit Serial No. (Optional)
                    </label>
                    <Input
                      placeholder="e.g. PU-12345"
                      className="h-11 bg-white/5 border-white/10 text-white touch-manipulation focus:ring-1 focus:ring-elec-yellow/50"
                      value={provingUnitSerial}
                      onChange={(e) => setProvingUnitSerial(e.target.value)}
                    />
                  </div>
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
              <Button
                onClick={handleComplete}
                disabled={!canComplete}
                className={`h-11 flex-1 font-bold rounded-xl touch-manipulation active:scale-[0.97] disabled:opacity-40 ${
                  isStep6 && anyLive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isStep6
                  ? allReadingsEntered
                    ? anyLive
                      ? 'Record Live Readings'
                      : 'Confirm Dead'
                    : 'Enter Readings to Continue'
                  : 'Complete Step'}
              </Button>

              {onPhotoCapture && (
                <Button
                  onClick={onPhotoCapture}
                  variant="outline"
                  className="h-11 w-11 p-0 border-white/20 rounded-xl touch-manipulation active:scale-[0.97]"
                >
                  <Camera className="h-4 w-4 text-white" />
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* Right side status indicator */}
        {isPending && <Circle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />}
      </div>
    </motion.div>
  );
}

export default IsolationStepCard;
