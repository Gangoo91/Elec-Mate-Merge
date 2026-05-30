import type { ReactNode } from 'react';
import { ComparisonGrid } from './diagramKit';

/* M4 S4 (and M5 S5) — DC- vs AC-coupled vs hybrid storage. */
export function CouplingComparison({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Coupling architectures"
      caption={caption}
      columns={[
        { name: 'DC-coupled', rows: [
          { label: 'PV connects', value: 'DC side of one inverter' },
          { label: 'Battery', value: 'Same DC bus' },
          { label: 'Conversions', value: 'Fewest (one)' },
        ], footer: 'New-build PV + battery together' },
        { name: 'AC-coupled', rows: [
          { label: 'PV connects', value: 'Its own PV inverter (AC)' },
          { label: 'Battery', value: 'Its own battery inverter (AC)' },
          { label: 'Conversions', value: 'More (DC→AC→DC)' },
        ], footer: 'Adding a battery to existing PV' },
        { name: 'Hybrid', rows: [
          { label: 'PV + battery', value: 'One hybrid inverter' },
          { label: 'Battery', value: 'Shared DC bus' },
          { label: 'Conversions', value: 'Few' },
        ], footer: 'PV + storage in one box (most new installs)' },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">DC-coupled</span> keeps PV and the battery on one DC bus through a single inverter — fewest conversions, best efficiency, ideal for new installs. <span className="font-semibold text-elec-yellow">AC-coupled</span> gives each its own inverter — more conversion losses, but the clean way to add a battery to an existing PV system.
        </>
      }
    />
  );
}
