import { DesignInputs } from '@/types/installation-design';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface ReviewStepProps {
  inputs: DesignInputs;
}

export const ReviewStep = ({ inputs }: ReviewStepProps) => {
  const hasIssues =
    inputs.circuits.length === 0 ||
    !inputs.projectName ||
    !inputs.location ||
    inputs.circuits.some((c) => !c.name || !c.loadPower);

  const missingData = inputs.circuits.filter((c) => !c.cableLength);

  const overallLabel = hasIssues ? 'Incomplete' : 'Ready';
  const overallClass = hasIssues ? 'text-red-400' : 'text-emerald-400';

  const deliverables = [
    'BS 7671 compliant cable sizing for each circuit',
    'Protection device selection (MCB/RCBO ratings and curves)',
    'Voltage drop calculations with compliance verification',
    'Earth fault loop impedance (Zs) calculations',
    'Detailed justifications referencing BS 7671 regulations',
    'Expected test values (R1+R2, Zs, IR, RCD)',
    'BS 7671 compliance validation report',
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>06 · REVIEW</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Ready for the designer.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          Last look before generation. The designer will produce the cable schedule, MCB selection,
          validation report and install guidance.
        </p>
      </div>

      {/* Headline summary strip — gridline pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Status
          </div>
          <div
            className={cn(
              'mt-1 text-[13px] font-semibold uppercase tracking-[0.18em]',
              overallClass
            )}
          >
            {overallLabel}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Circuits
          </div>
          <div className="mt-1 text-[13px] font-semibold text-elec-yellow tabular-nums">
            {inputs.circuits.length}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Supply
          </div>
          <div className="mt-1 text-[13px] font-semibold text-white tabular-nums">
            {inputs.phases === 'single' ? '1Φ' : '3Φ'} · {inputs.voltage}V
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Earthing
          </div>
          <div className="mt-1 text-[13px] font-semibold text-white">{inputs.earthingSystem}</div>
        </div>
      </div>

      {/* Status banner */}
      {hasIssues ? (
        <div className="bg-[hsl(0_0%_10%)] border border-red-500/40 rounded-2xl p-4 sm:p-5">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-red-400 shrink-0">
              Fail
            </span>
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-white">Missing information</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
                Complete all required fields before generating the design.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[hsl(0_0%_10%)] border border-emerald-500/40 rounded-2xl p-4 sm:p-5">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-400 shrink-0">
              Pass
            </span>
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-white">Ready to generate</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
                All required information provided.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project details */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          Project details
        </span>
        <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1">
                Project name
              </div>
              <div className="text-[14px] font-medium text-white">
                {inputs.projectName || (
                  <span className="text-red-400 text-[11px] uppercase tracking-[0.18em]">
                    Not set
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1">
                Location
              </div>
              <div className="text-[14px] font-medium text-white">
                {inputs.location || (
                  <span className="text-red-400 text-[11px] uppercase tracking-[0.18em]">
                    Not set
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5 capitalize">
              {inputs.propertyType}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5">
              {inputs.phases === 'single' ? 'Single phase' : '3-phase'} {inputs.voltage}V
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
              {inputs.earthingSystem}
            </span>
          </div>
        </div>
      </div>

      {/* Circuits overview */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Circuits overview
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {inputs.circuits.length} circuit{inputs.circuits.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {inputs.circuits.map((circuit, index) => {
            const isMissing = !circuit.loadPower || !circuit.name;
            const borderClass = isMissing ? 'border-red-500/40' : 'border-white/[0.10]';
            const statusLabel = isMissing ? 'Fail' : 'Pass';
            const statusClass = isMissing ? 'text-red-400' : 'text-emerald-400';

            return (
              <div
                key={circuit.id}
                className={cn(
                  'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5',
                  borderClass
                )}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] uppercase tracking-[0.18em] font-semibold',
                      statusClass
                    )}
                  >
                    {statusLabel}
                  </span>
                </div>
                <div className="text-[16px] font-semibold tracking-tight text-white truncate mb-3">
                  {circuit.name || (
                    <span className="text-red-400 text-[13px] uppercase tracking-[0.18em]">
                      Unnamed circuit
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12.5px]">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-0.5">
                      Power
                    </div>
                    <div className="font-medium text-white tabular-nums">
                      {circuit.loadPower ? `${circuit.loadPower}W` : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-0.5">
                      Length
                    </div>
                    <div className="font-medium text-white tabular-nums">
                      {circuit.cableLength ? `${circuit.cableLength}m` : 'Auto'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-0.5">
                      Phase
                    </div>
                    <div className="font-medium text-white">
                      {circuit.phases === 'single' ? '1Φ' : '3Φ'}
                    </div>
                  </div>
                  {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-0.5">
                        Location
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.14em] text-amber-400 capitalize">
                        {circuit.specialLocation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cable length warning */}
      {missingData.length > 0 && (
        <div className="bg-[hsl(0_0%_10%)] border border-amber-500/40 rounded-2xl p-4 sm:p-5">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-400 shrink-0">
              Warning
            </span>
            <p className="text-[12.5px] leading-relaxed text-white/85 flex-1">
              {missingData.length} circuit{missingData.length > 1 ? 's' : ''} missing cable length
              — the designer will estimate based on typical installations.
            </p>
          </div>
        </div>
      )}

      {/* Expected output */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          What you'll get
        </span>
        <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5">
          <ul className="space-y-2.5">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[13px]">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow shrink-0 mt-0.5 w-7">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-white/85 leading-relaxed flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
