/**
 * Step 4: Installation Details Per Circuit
 * Collect detailed installation parameters for each circuit to refine the design output.
 */

import { CircuitInput } from '@/types/installation-design';
import { IOSSelect } from '@/components/ui/ios-select';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

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
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>04 · INSTALL</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Installation details.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          Per-circuit install setup — containment, route, special location considerations. Drives
          the install method and derating tables.
        </p>
      </div>

      {/* Empty state — editorial centred */}
      {circuits.length === 0 ? (
        <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl px-6 py-14 sm:py-20 text-center">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50 tabular-nums">
            00 · NO CIRCUITS
          </span>
          <h3 className="mt-3 text-[20px] sm:text-[24px] font-semibold tracking-tight leading-[1.15] text-white">
            Nothing to configure yet.
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70 max-w-md mx-auto">
            Add circuits in the previous step to set per-circuit installation methods, protection
            preferences and special location handling.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Per-circuit configuration
            </span>
            <span className="text-[11px] text-white/50 tabular-nums">
              {circuits.length} {circuits.length === 1 ? 'circuit' : 'circuits'}
            </span>
          </div>

          <div className="space-y-4">
            {circuits.map((circuit, index) => {
              const hasSpecialLocation =
                circuit.specialLocation && circuit.specialLocation !== 'none';
              return (
                <div
                  key={circuit.id}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5"
                >
                  {/* Circuit header strip — number + name + special tag */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                          Circuit
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-[17px] sm:text-[18px] font-semibold tracking-tight leading-[1.2] text-white truncate">
                        {circuit.name || 'Unnamed circuit'}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-snug text-white/70">
                        {circuit.loadType} · {circuit.loadPower}W · {circuit.cableLength}m
                      </p>
                    </div>
                    {hasSpecialLocation && (
                      <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-orange-500/[0.12] border border-orange-400/30 text-orange-300 text-[10.5px] font-semibold uppercase tracking-[0.14em] capitalize">
                        {circuit.specialLocation}
                      </span>
                    )}
                  </div>

                  {/* Form group */}
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                        Cable installation method
                      </span>
                      <IOSSelect
                        label=""
                        value={circuit.installMethod || 'auto'}
                        onValueChange={(value) => updateCircuit(index, 'installMethod', value)}
                        options={getInstallMethodOptions()}
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                        Protection device preference
                      </span>
                      <IOSSelect
                        label=""
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
                    </div>

                    {circuit.specialLocation === 'bathroom' && (
                      <div className="space-y-2">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                          Bathroom zone
                        </span>
                        <IOSSelect
                          label=""
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
                      </div>
                    )}

                    {circuit.specialLocation === 'outdoor' && (
                      <div className="space-y-2">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                          Outdoor installation type
                        </span>
                        <IOSSelect
                          label=""
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
                      </div>
                    )}

                    {/* Auto-calculated values — gridline summary strip */}
                    {circuit.calculatedIb && (
                      <div className="mt-2">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                          Auto-calculated
                        </span>
                        <div
                          className={cn(
                            'mt-2 grid gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
                            circuit.suggestedMCB && circuit.calculatedDiversity && circuit.calculatedDiversity < 1
                              ? 'grid-cols-3'
                              : circuit.suggestedMCB || (circuit.calculatedDiversity && circuit.calculatedDiversity < 1)
                              ? 'grid-cols-2'
                              : 'grid-cols-1'
                          )}
                        >
                          <div className="bg-[hsl(0_0%_10%)] px-3 py-3 sm:px-4 sm:py-4 min-h-11 flex flex-col justify-center">
                            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                              Design Ib
                            </span>
                            <span className="mt-1 text-[16px] sm:text-[18px] font-semibold tracking-tight tabular-nums text-elec-yellow">
                              {circuit.calculatedIb.toFixed(1)}A
                            </span>
                          </div>
                          {circuit.suggestedMCB && (
                            <div className="bg-[hsl(0_0%_10%)] px-3 py-3 sm:px-4 sm:py-4 min-h-11 flex flex-col justify-center">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                MCB
                              </span>
                              <span className="mt-1 text-[16px] sm:text-[18px] font-semibold tracking-tight tabular-nums text-white">
                                {circuit.suggestedMCB}A
                              </span>
                            </div>
                          )}
                          {circuit.calculatedDiversity && circuit.calculatedDiversity < 1 && (
                            <div className="bg-[hsl(0_0%_10%)] px-3 py-3 sm:px-4 sm:py-4 min-h-11 flex flex-col justify-center">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                Diversity
                              </span>
                              <span className="mt-1 text-[16px] sm:text-[18px] font-semibold tracking-tight tabular-nums text-white">
                                {(circuit.calculatedDiversity * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
