/**
 * EICTestResultsTab
 *
 * Schedule of Test Results — BS 7671 columns 17-31.
 * Auto-populated from MFT readings with colour coding:
 *   green = filled & compliant
 *   amber = empty
 *   red = failed / non-compliant
 */

import { cn } from '@/lib/utils';
import type { EICTestResult, EICScheduleState } from '@/types/am2-testing-simulator';
import type { EICValidation, CellStatus } from '@/hooks/am2/useEICSchedule';
import { cellColour } from './EICSheet';

interface EICTestResultsTabProps {
  testResults: EICTestResult[];
  headerFields: EICScheduleState['headerFields'];
  validations: EICValidation[];
  onUpdateResult: (circuitId: number, field: string, value: string) => void;
}

function ResultCell({
  label,
  value,
  status,
  colNum,
}: {
  label: string;
  value: string;
  status: CellStatus;
  colNum?: number;
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-0">
      <span className="text-[10px] text-white/80 flex items-center gap-1">
        {colNum != null && (
          <span className="text-[8px] text-white/40 font-mono w-3 text-right">{colNum}</span>
        )}
        {label}
      </span>
      <span className={cn('text-[11px] font-mono px-1.5 py-0.5 rounded', cellColour(status))}>
        {value || '—'}
      </span>
    </div>
  );
}

export function EICTestResultsTab({
  testResults,
  headerFields,
  validations,
  onUpdateResult,
}: EICTestResultsTabProps) {
  return (
    <div className="px-3 py-3 space-y-3">
      {/* Header fields */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="px-3 py-2 bg-white/[0.03] border-b border-white/5">
          <span className="text-xs font-semibold text-white">Schedule Header</span>
        </div>
        <div className="px-3 py-1">
          <ResultCell label="DB reference" value={headerFields.dbReference} status="filled" />
          <ResultCell label="Location" value={headerFields.location} status="filled" />
          <ResultCell label="Ze (Ω)" value={headerFields.ze} status="filled" />
          <ResultCell
            label="Ipf (kA)"
            value={headerFields.ipf}
            status={headerFields.ipf ? 'filled' : 'empty'}
          />
          <ResultCell label="Phase sequence" value={headerFields.phaseSequence} status="filled" />
        </div>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-2 pb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Test Results (Cols 17-31)
        </h3>
      </div>

      {/* Per-circuit test results */}
      {testResults.map((result) => {
        const circuitId = parseInt(result.circuitNumber);
        const validation = validations.find((v) => v.circuitId === circuitId);
        const cs = validation?.columnStatuses || {};

        return (
          <div
            key={result.circuitNumber}
            className={cn(
              'rounded-xl border overflow-hidden',
              validation?.overallComplete
                ? 'border-green-500/20 bg-green-500/[0.02]'
                : 'border-white/5 bg-white/[0.02]'
            )}
          >
            {/* Circuit header */}
            <div className="px-3 py-2 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Circuit {result.circuitNumber}
              </span>
              <span
                className={cn(
                  'text-[10px] font-mono',
                  validation?.overallComplete ? 'text-green-400' : 'text-amber-400/60'
                )}
              >
                {validation?.filledCount || 0}/{validation?.totalCount || 0}
              </span>
            </div>

            <div className="px-3 py-1">
              {/* Ring final columns (18-20) */}
              {(result.ringR1 || cs.ringR1 === 'empty') && (
                <>
                  <ResultCell
                    label="r₁ (line) Ω"
                    value={result.ringR1}
                    status={cs.ringR1 || 'empty'}
                    colNum={18}
                  />
                  <ResultCell
                    label="rₙ (neutral) Ω"
                    value={result.ringRn}
                    status={cs.ringRn || 'empty'}
                    colNum={19}
                  />
                  <ResultCell
                    label="r₂ (cpc) Ω"
                    value={result.ringR2}
                    status={cs.ringR2 || 'empty'}
                    colNum={20}
                  />
                </>
              )}

              {/* Continuity (21-22) */}
              <ResultCell
                label="R₁+R₂ (Ω)"
                value={result.r1r2}
                status={cs.r1r2 || 'empty'}
                colNum={21}
              />

              {/* Insulation resistance (23-25) */}
              <ResultCell
                label="Test voltage (V)"
                value={result.irTestVoltage}
                status={cs.irTestVoltage || 'empty'}
                colNum={23}
              />
              <ResultCell
                label="L-L (MΩ)"
                value={result.irLiveLive}
                status={cs.irLiveLive || 'empty'}
                colNum={24}
              />
              <ResultCell
                label="L-E (MΩ)"
                value={result.irLiveEarth}
                status={cs.irLiveEarth || 'empty'}
                colNum={25}
              />

              {/* Polarity (26) */}
              <ResultCell
                label="Polarity"
                value={result.polarity}
                status={
                  result.polarity ? (result.polarity === 'FAIL' ? 'failed' : 'filled') : 'empty'
                }
                colNum={26}
              />

              {/* Zs (27) */}
              <ResultCell
                label="Max Zs (Ω)"
                value={result.maxMeasuredZs}
                status={cs.maxMeasuredZs || 'empty'}
                colNum={27}
              />

              {/* RCD (28-29) */}
              {(result.rcdDisconnectionTime || cs.rcdDisconnectionTime === 'empty') && (
                <>
                  <ResultCell
                    label="Disc. time (ms)"
                    value={result.rcdDisconnectionTime}
                    status={cs.rcdDisconnectionTime || 'empty'}
                    colNum={28}
                  />
                  <ResultCell
                    label="Test button"
                    value={result.rcdTestButton}
                    status={cs.rcdTestButton || 'empty'}
                    colNum={29}
                  />
                </>
              )}

              {/* Remarks (31) */}
              <ResultCell
                label="Remarks"
                value={result.remarks}
                status={result.remarks ? 'filled' : 'empty'}
                colNum={31}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
