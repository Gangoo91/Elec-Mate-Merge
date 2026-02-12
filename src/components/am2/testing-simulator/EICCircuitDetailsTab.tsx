/**
 * EICCircuitDetailsTab
 *
 * Schedule of Circuit Details — BS 7671 columns 1-16.
 * Pre-filled from rig data. Read-only card layout for mobile.
 */

import { cn } from '@/lib/utils';
import type { EICCircuitDetail } from '@/types/am2-testing-simulator';

interface EICCircuitDetailsTabProps {
  circuitDetails: EICCircuitDetail[];
}

function DetailRow({ label, value, colNum }: { label: string; value: string; colNum?: number }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-0">
      <span className="text-[10px] text-white/80 flex items-center gap-1">
        {colNum != null && (
          <span className="text-[8px] text-white/40 font-mono w-3 text-right">{colNum}</span>
        )}
        {label}
      </span>
      <span className={cn('text-[11px] font-mono', value ? 'text-white/70' : 'text-white/20')}>
        {value || '—'}
      </span>
    </div>
  );
}

export function EICCircuitDetailsTab({ circuitDetails }: EICCircuitDetailsTabProps) {
  return (
    <div className="px-3 py-3 space-y-3">
      <div className="flex items-center gap-2 pb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Schedule of Circuit Details (Cols 1-16)
        </h3>
      </div>

      {circuitDetails.map((detail) => (
        <div
          key={detail.circuitNumber}
          className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          {/* Circuit header */}
          <div className="px-3 py-2 bg-white/[0.03] border-b border-white/5">
            <span className="text-xs font-semibold text-white">
              Circuit {detail.circuitNumber}: {detail.circuitDescription}
            </span>
          </div>

          <div className="px-3 py-1">
            <DetailRow label="Type of wiring" value={detail.typeOfWiring} colNum={3} />
            <DetailRow label="Reference method" value={detail.referenceMethod} colNum={4} />
            <DetailRow label="Points served" value={detail.pointsServed} colNum={5} />
            <DetailRow label="Live (mm²)" value={detail.liveMm2} colNum={6} />
            <DetailRow label="cpc (mm²)" value={detail.cpcMm2} colNum={7} />
            <DetailRow label="OCPD BS (EN)" value={detail.ocpdBsStandard} colNum={8} />
            <DetailRow label="OCPD type" value={detail.ocpdType} colNum={9} />
            <DetailRow label="Rating (A)" value={detail.ocpdRating} colNum={10} />
            <DetailRow label="Breaking cap. (kA)" value={detail.breakingCapacity} colNum={11} />
            <DetailRow label="Max Zs (Ω)" value={detail.maxPermittedZs} colNum={12} />
            {detail.rcdBsStandard && (
              <>
                <DetailRow label="RCD BS (EN)" value={detail.rcdBsStandard} colNum={13} />
                <DetailRow label="RCD type" value={detail.rcdType} colNum={14} />
                <DetailRow label="IΔn (mA)" value={detail.rcdIdn} colNum={15} />
                <DetailRow label="RCD rating (A)" value={detail.rcdRating} colNum={16} />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
