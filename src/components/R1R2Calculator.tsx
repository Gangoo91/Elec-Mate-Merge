import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, CheckCircle2, AlertTriangle, ArrowDownToLine } from 'lucide-react';
import { analyseR1R2, R1R2Calculation } from '@/utils/r1r2Calculator';
import { TestResult } from '@/types/testResult';
import { cn } from '@/lib/utils';

interface R1R2CalculatorProps {
  result: TestResult;
  onUpdate?: (field: keyof TestResult, value: string) => void;
  className?: string;
}

/**
 * R1+R2 Calculator — expected (R1 + R2) from conductor CSA, length and
 * temperature correction. Grounded in BS 7671 Table 9A conductor resistances
 * (mΩ/m at 20 °C); the 1.20 factor corrects 20 °C → 70 °C operating temperature
 * (GN3). See src/utils/r1r2Calculator.ts.
 */
const R1R2Calculator: React.FC<R1R2CalculatorProps> = ({ result, onUpdate, className }) => {
  const [cableLength, setCableLength] = useState<string>('');
  const [temperatureCorrection, setTemperatureCorrection] = useState<string>('1.2');
  const [calculation, setCalculation] = useState<R1R2Calculation | null>(null);

  useEffect(() => {
    const length = parseFloat(cableLength);
    if (length > 0) {
      const tempCorrection = parseFloat(temperatureCorrection) || 1.2;
      setCalculation(analyseR1R2(result, length, tempCorrection));
    } else {
      setCalculation(null);
    }
  }, [cableLength, temperatureCorrection, result]);

  const expected = calculation?.expectedR1R2;
  const hasResult = !!calculation && !!expected;

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-[hsl(0_0%_9%)] shadow-2xl overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="h-7 w-7 rounded-lg bg-elec-yellow/15 flex items-center justify-center">
          <Calculator className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white leading-tight">R1+R2 Calculator</div>
          <div className="text-[10.5px] text-white/45 leading-tight">
            Live {result.liveSize || '—'} · CPC {result.cpcSize || result.liveSize || '—'} mm²
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-white/60">Cable length (m)</label>
            <Input
              type="number"
              inputMode="decimal"
              placeholder="0.0"
              value={cableLength}
              onChange={(e) => setCableLength(e.target.value)}
              step="0.1"
              min="0"
              autoFocus
              className="h-10 text-base text-center touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-white/60">Temp factor</label>
            <Input
              type="number"
              inputMode="decimal"
              value={temperatureCorrection}
              onChange={(e) => setTemperatureCorrection(e.target.value)}
              step="0.05"
              min="1"
              max="2"
              className="h-10 text-base text-center touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/30"
            />
          </div>
        </div>

        {/* Expected result — the headline number */}
        <div className="rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/20 px-4 py-3 text-center">
          <div className="text-[10px] uppercase tracking-[0.14em] text-elec-yellow/70 font-semibold">
            Expected R1+R2
          </div>
          <div className="mt-0.5 text-3xl font-bold text-elec-yellow tabular-nums">
            {hasResult ? `${expected!.toFixed(2)} Ω` : '—'}
          </div>
        </div>

        {/* Comparison against the measured reading */}
        {hasResult && calculation!.actualR1R2 != null && (
          <div
            className={cn(
              'flex items-center justify-between rounded-xl border px-3.5 py-2.5',
              calculation!.isWithinTolerance
                ? 'bg-green-500/[0.08] border-green-500/25'
                : 'bg-red-500/[0.08] border-red-500/25'
            )}
          >
            <div className="text-[12px] text-white/70">
              Measured{' '}
              <span className="font-semibold text-white tabular-nums">
                {calculation!.actualR1R2} Ω
              </span>
            </div>
            <div
              className={cn(
                'flex items-center gap-1.5 text-[12px] font-semibold',
                calculation!.isWithinTolerance ? 'text-green-400' : 'text-red-400'
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
          <div className="flex items-start gap-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/20 px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-[11.5px] text-amber-200/90 leading-snug">{calculation!.warnings[0]}</p>
          </div>
        )}

        {/* Apply */}
        {onUpdate && (
          <Button
            onClick={() => expected != null && onUpdate('r1r2', expected.toFixed(2))}
            disabled={!hasResult}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation disabled:opacity-40"
          >
            <ArrowDownToLine className="h-4 w-4 mr-1.5" />
            {hasResult ? `Use ${expected!.toFixed(2)} Ω` : 'Enter a length'}
          </Button>
        )}

        <p className="text-[10px] text-white/35 leading-snug text-center">
          BS 7671 Table 9A · ×1.20 corrects 20°C → 70°C operating temp (GN3)
        </p>
      </div>
    </div>
  );
};

export default R1R2Calculator;
