/**
 * Step 4: Installation Details Per Circuit
 * Collect detailed installation parameters for each circuit to refine the design output.
 */

import { CircuitInput } from '@/types/installation-design';
import { StepHeader, Section, SelectRow, ItemCard, Fact } from './wizardUi';

interface InstallationDetailsStepProps {
  circuits: CircuitInput[];
  onUpdate: (circuits: CircuitInput[]) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
}

const DOMESTIC_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let the designer decide)' },
  { value: 'clipped_direct', label: 'Clipped direct (most common)' },
  { value: 'pvc_conduit', label: 'PVC conduit (concealed)' },
  { value: 'in_wall', label: 'In wall (chased / buried)' },
  { value: 'surface_pvc', label: 'Surface mini-trunking' },
  { value: 'loft_joists', label: 'Across joists (loft)' },
  { value: 'thermal_insulation', label: 'In thermal insulation' },
];

const COMMERCIAL_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let the designer decide)' },
  { value: 'dado_trunking', label: 'Dado trunking (office desks)' },
  { value: 'pvc_trunking', label: 'PVC trunking (general office)' },
  { value: 'steel_trunking', label: 'Steel trunking (fire-rated)' },
  { value: 'cable_basket', label: 'Cable basket (ceiling void)' },
  { value: 'perforated_tray', label: 'Perforated cable tray' },
  { value: 'steel_conduit', label: 'Steel conduit (visible areas)' },
  { value: 'pvc_conduit', label: 'PVC conduit (concealed)' },
  { value: 'skirting_trunking', label: 'Skirting trunking (perimeter)' },
];

const INDUSTRIAL_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let the designer decide)' },
  { value: 'cable_ladder', label: 'Cable ladder (heavy cables)' },
  { value: 'heavy_duty_tray', label: 'Heavy-duty tray' },
  { value: 'galvanised_conduit', label: 'Galvanised conduit' },
  { value: 'flexible_conduit', label: 'Flexible conduit (motors)' },
  { value: 'swa_cleats', label: 'SWA cleats (clipped direct)' },
  { value: 'cable_basket', label: 'Cable basket' },
  { value: 'outdoor_tray', label: 'Outdoor tray (galvanised)' },
];

export const InstallationDetailsStep = ({
  circuits,
  onUpdate,
  installationType,
}: InstallationDetailsStepProps) => {
  const getInstallMethodOptions = () => {
    switch (installationType) {
      case 'domestic':
        return DOMESTIC_INSTALL_METHODS;
      case 'commercial':
        return COMMERCIAL_INSTALL_METHODS;
      case 'industrial':
        return INDUSTRIAL_INSTALL_METHODS;
      default:
        return DOMESTIC_INSTALL_METHODS;
    }
  };

  const updateCircuit = (index: number, field: keyof CircuitInput, value: any) => {
    const updated = [...circuits];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  return (
    <div className="space-y-8">
      <StepHeader
        title="Installation details"
        description="Set containment, route and special location handling for each circuit. These drive the install method and derating tables."
      />

      {circuits.length === 0 ? (
        <ItemCard className="text-center sm:py-12">
          <h3 className="text-[15px] font-semibold text-white">Nothing to configure yet</h3>
          <p className="mx-auto mt-1 max-w-md text-[14px] leading-relaxed text-white">
            Add circuits in the previous step to set per-circuit installation methods, protection
            preferences and special location handling.
          </p>
        </ItemCard>
      ) : (
        <Section
          title="Per-circuit configuration"
          aside={`${circuits.length} ${circuits.length === 1 ? 'circuit' : 'circuits'}`}
        >
          <div className="space-y-3">
            {circuits.map((circuit, index) => {
              const hasSpecialLocation =
                circuit.specialLocation && circuit.specialLocation !== 'none';
              const showDiversity = !!(
                circuit.calculatedDiversity && circuit.calculatedDiversity < 1
              );
              return (
                <ItemCard key={circuit.id}>
                  {/* Circuit header: name, summary line, special location */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[15px] font-semibold text-white">
                        {index + 1}. {circuit.name || 'Unnamed circuit'}
                      </h4>
                      <p className="mt-0.5 text-[13px] leading-snug text-white">
                        {circuit.loadType} · {circuit.loadPower}W · {circuit.cableLength}m
                      </p>
                    </div>
                    {hasSpecialLocation && (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[12px] font-medium capitalize text-orange-300">
                        {circuit.specialLocation}
                      </span>
                    )}
                  </div>

                  {/* Form group */}
                  <div className="grid grid-cols-1 gap-y-5 pt-4 sm:grid-cols-2 sm:gap-x-6">
                    <SelectRow
                      label="Cable installation method"
                      value={circuit.installMethod || 'auto'}
                      onValueChange={(value) => updateCircuit(index, 'installMethod', value)}
                      options={getInstallMethodOptions()}
                    />

                    <SelectRow
                      label="Protection device preference"
                      value={circuit.protectionType || 'auto'}
                      onValueChange={(value) => updateCircuit(index, 'protectionType', value)}
                      options={[
                        { value: 'auto', label: 'Auto (let the designer decide)' },
                        { value: 'MCB', label: 'MCB only' },
                        { value: 'RCBO', label: 'RCBO (30mA Type AC)' },
                        { value: 'RCBO-TypeA', label: 'RCBO (30mA Type A)' },
                        { value: 'RCBO-TypeB', label: 'RCBO (30mA Type B)' },
                      ]}
                    />

                    {circuit.specialLocation === 'bathroom' && (
                      <SelectRow
                        label="Bathroom zone"
                        value={circuit.bathroomZone || 'outside_zones'}
                        onValueChange={(value) => updateCircuit(index, 'bathroomZone', value)}
                        options={[
                          { value: 'zone_0', label: 'Zone 0' },
                          { value: 'zone_1', label: 'Zone 1' },
                          { value: 'zone_2', label: 'Zone 2' },
                          { value: 'outside_zones', label: 'Outside zones' },
                        ]}
                        hint="Determines IP rating and wiring requirements"
                      />
                    )}

                    {circuit.specialLocation === 'outdoor' && (
                      <SelectRow
                        label="Outdoor installation type"
                        value={circuit.outdoorInstall || 'wall_mounted'}
                        onValueChange={(value) => updateCircuit(index, 'outdoorInstall', value)}
                        options={[
                          { value: 'buried', label: 'Buried in ground' },
                          { value: 'overhead', label: 'Overhead line' },
                          { value: 'wall_mounted', label: 'Wall mounted' },
                          { value: 'other', label: 'Other' },
                        ]}
                        hint="Affects cable type and protection requirements"
                      />
                    )}
                  </div>

                  {/* Auto-calculated values */}
                  {circuit.calculatedIb && (
                    <div className="mt-5 border-t border-white/[0.08] pt-4">
                      <div className="text-[13px] font-semibold text-white">Auto-calculated</div>
                      <div className="mt-2 grid grid-cols-3 gap-3">
                        <Fact label="Design Ib" value={`${circuit.calculatedIb.toFixed(1)}A`} />
                        {circuit.suggestedMCB && (
                          <Fact label="MCB" value={`${circuit.suggestedMCB}A`} />
                        )}
                        {showDiversity && (
                          <Fact
                            label="Diversity"
                            value={`${((circuit.calculatedDiversity ?? 0) * 100).toFixed(0)}%`}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </ItemCard>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
};
