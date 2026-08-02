import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { analyseR1R2, R1R2Calculation } from '@/utils/r1r2Calculator';
import { TestResult } from '@/types/testResult';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

interface R1R2CalculatorProps {
  result: TestResult;
  onUpdate?: (field: keyof TestResult, value: string) => void;
  className?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-center text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

/**
 * R1+R2 Calculator — expected (R1 + R2) from conductor CSA, length and the test
 * ambient temperature. Grounded in BS 7671 Table 9A conductor resistances
 * (mΩ/m at 20 °C), corrected to the test ambient via GN3's 1 + 0.004×(T−20)
 * factor (= 1.0 at 20 °C). R1+R2 continuity is RECORDED at ambient — the
 * operating-temperature (×1.20) factor is for Zs, not this value.
 * See src/utils/r1r2Calculator.ts.
 */
const R1R2Calculator: React.FC<R1R2CalculatorProps> = ({ result, onUpdate, className }) => {
  const haptic = useHaptic();
  const [cableLength, setCableLength] = useState<string>('');
  const [ambientTemp, setAmbientTemp] = useState<string>('20');
  const [calculation, setCalculation] = useState<R1R2Calculation | null>(null);

  useEffect(() => {
    const length = parseFloat(cableLength);
    if (length > 0) {
      // GN3 test-temperature correction: 1 + 0.004 × (ambient − 20); 1.0 at 20 °C.
      const amb = parseFloat(ambientTemp);
      const factor = isFinite(amb) ? 1 + 0.004 * (amb - 20) : 1;
      setCalculation(analyseR1R2(result, length, factor));
    } else {
      setCalculation(null);
    }
  }, [cableLength, ambientTemp, result]);

  const expected = calculation?.expectedR1R2;
  const hasResult = !!calculation && !!expected;
  const hasSizes = !!result.liveSize;

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[hsl(0_0%_9%)] shadow-2xl',
        className
      )}
    >
      {/* Header — typography only */}
      <div className="border-b border-white/[0.08] px-4 py-3">
        <div className="text-sm font-semibold tracking-tight text-white">R1+R2 calculator</div>
        <div className="text-[11px] leading-tight text-white/85 tabular-nums">
          {hasSizes
            ? `Live ${result.liveSize} · CPC ${result.cpcSize || result.liveSize} mm²`
            : 'Set the live and CPC sizes on the circuit first'}
        </div>
      </div>

      <div className="space-y-3.5 p-4">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label className={labelCn}>Cable length (m)</label>
            <Input
              type="number"
              inputMode="decimal"
              placeholder="0.0"
              value={cableLength}
              onChange={(e) => setCableLength(e.target.value)}
              step="0.1"
              min="0"
              autoFocus
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn}>Test ambient (°C)</label>
            <Input
              type="number"
              inputMode="decimal"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(e.target.value)}
              step="1"
              min="0"
              max="40"
              className={inputCn}
            />
          </div>
        </div>

        {/* Expected result — the headline number */}
        <div className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-center">
          <div className="text-[12px] font-medium text-white">Expected R1+R2</div>
          <div className="mt-0.5 text-3xl font-bold tabular-nums text-elec-yellow">
            {hasResult ? `${expected!.toFixed(2)} Ω` : '—'}
          </div>
        </div>

        {/* Comparison against the measured reading */}
        {hasResult && calculation!.actualR1R2 != null && (
          <div
            className={cn(
              'flex items-center justify-between rounded-xl border px-3.5 py-2.5',
              calculation!.isWithinTolerance
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-red-500/30 bg-red-500/10'
            )}
          >
            <div className="text-[12px] text-white">
              Measured{' '}
              <span className="font-semibold tabular-nums text-white">
                {calculation!.actualR1R2} Ω
              </span>
            </div>
            <div
              className={cn(
                'flex items-center gap-1.5 text-[12px] font-semibold',
                calculation!.isWithinTolerance ? 'text-green-300' : 'text-red-300'
              )}
            >
              {calculation!.isWithinTolerance ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5" />
              )}
              {calculation!.tolerancePercentage > 0 ? '+' : ''}
              {calculation!.tolerancePercentage}%
            </div>
          </div>
        )}

        {/* Warnings (only the first, kept terse for the popover) */}
        {hasResult && calculation!.warnings.length > 0 && (
          <div className="flex items-start gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-300" />
            <p className="text-[11.5px] leading-snug text-orange-300">
              {calculation!.warnings[0]}
            </p>
          </div>
        )}

        {/* Apply — solid volt only when there's a value to use; neutral
            otherwise (a washed-out volt bar reads brown). */}
        {onUpdate && (
          <button
            type="button"
            onClick={() => {
              if (expected == null) return;
              haptic.success();
              onUpdate('r1r2', expected.toFixed(2));
            }}
            disabled={!hasResult}
            className={cn(
              'h-12 w-full rounded-xl text-sm font-semibold touch-manipulation transition-transform active:scale-[0.98] outline-none focus:outline-none focus-visible:outline-none',
              hasResult
                ? 'bg-elec-yellow text-black'
                : 'cursor-default border border-white/[0.12] bg-white/[0.04] text-white/85'
            )}
          >
            {hasResult ? `Use ${expected!.toFixed(2)} Ω` : 'Enter a length'}
          </button>
        )}

        <p className="text-center text-[10.5px] leading-snug text-white/80">
          BS 7671 Table 9A resistances at 20°C, corrected to test ambient (GN3). R1+R2 is
          recorded at ambient — not operating temperature.
        </p>
      </div>
    </div>
  );
};

export default R1R2Calculator;
