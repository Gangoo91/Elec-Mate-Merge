import { DesignInputs } from '@/types/installation-design';
import { cn } from '@/lib/utils';
import { StepHeader, Section, Fact } from './wizardUi';

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
    <div className="space-y-8">
      <StepHeader
        title="Ready for the designer"
        description="Last look before generation. The designer will produce the cable schedule, MCB selection, validation report and install guidance."
      />

      {/* Headline figures */}
      <div className="grid grid-cols-4 gap-3 border-y border-white/[0.10] py-4">
        <Fact label="Status" value={overallLabel} tone={hasIssues ? 'bad' : 'good'} />
        <Fact label="Circuits" value={inputs.circuits.length} />
        <Fact
          label="Supply"
          value={`${inputs.phases === 'single' ? '1Φ' : '3Φ'} · ${inputs.voltage}V`}
        />
        <Fact label="Earthing" value={inputs.earthingSystem} />
      </div>

      {/* Status banner */}
      {hasIssues ? (
        <div className="rounded-xl border border-red-500/40 px-4 py-3">
          <div className="text-[15px] font-semibold text-red-400">Missing information</div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            Complete all required fields before generating the design.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-500/40 px-4 py-3">
          <div className="text-[15px] font-semibold text-emerald-400">Ready to generate</div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            All required information provided.
          </p>
        </div>
      )}

      {/* Project details */}
      <Section title="Project details">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
          <Fact
            label="Project name"
            value={inputs.projectName || <span className="text-red-400">Not set</span>}
          />
          <Fact
            label="Location"
            value={inputs.location || <span className="text-red-400">Not set</span>}
          />
          <Fact
            label="Property type"
            value={<span className="capitalize">{inputs.propertyType}</span>}
          />
          <Fact
            label="Supply"
            value={`${inputs.phases === 'single' ? 'Single phase' : '3-phase'} ${inputs.voltage}V, ${inputs.earthingSystem}`}
          />
        </div>
      </Section>

      {/* Circuits overview */}
      <Section
        title="Circuits overview"
        aside={`${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`}
      >
        <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {inputs.circuits.map((circuit, index) => {
            const isMissing = !circuit.loadPower || !circuit.name;
            return (
              <li key={circuit.id} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-semibold text-white">
                    {index + 1}.{' '}
                    {circuit.name || <span className="text-red-400">Unnamed circuit</span>}
                  </div>
                  <div className="mt-0.5 text-[13px] tabular-nums text-white">
                    {circuit.loadPower ? `${circuit.loadPower}W` : '-'} ·{' '}
                    {circuit.cableLength ? `${circuit.cableLength}m` : 'Auto length'} ·{' '}
                    {circuit.phases === 'single' ? '1Φ' : '3Φ'}
                    {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                      <span className="capitalize"> · {circuit.specialLocation}</span>
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-[13px] font-semibold',
                    isMissing ? 'text-red-400' : 'text-emerald-400'
                  )}
                >
                  {isMissing ? 'Fail' : 'Pass'}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Cable length warning */}
      {missingData.length > 0 && (
        <div className="rounded-xl border border-amber-500/40 px-4 py-3">
          <div className="text-[13px] font-semibold text-amber-400">Warning</div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            {missingData.length} circuit{missingData.length > 1 ? 's' : ''} missing cable length.
            The designer will estimate based on typical installations.
          </p>
        </div>
      )}

      {/* Expected output */}
      <Section title="What you'll get">
        <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {deliverables.map((item, index) => (
            <li key={index} className="py-2.5 text-[14px] leading-relaxed text-white">
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
