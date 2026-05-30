import type { ReactNode } from 'react';
import { TagMap, ComparisonGrid } from './diagramKit';

/* M10 S1 — Chapter 82 Prosumer's Electrical Installation framework. */
export function Chapter82Framework({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="Chapter 82 — PEI"
      caption={caption}
      items={[
        { label: 'Types of PEI', sub: 'Reg 826.7', tags: ['Individual', 'Collective', 'Shared'] },
        { label: 'Operating modes', sub: 'Reg 824.2', tags: ['Direct feed', 'Reverse feed', 'Island'] },
        { label: 'Multi-source isolation', sub: 'main switch per source + notice/interlock', tags: ['Reg 826.1.1.4'] },
        { label: 'Island-mode earthing', sub: 'neutral–earth handling in island', tags: ['Reg 826.1.1.2.2'] },
        { label: 'Overcurrent — all directions', sub: 'every configuration, min + max', tags: ['Reg 826.1.2.1'] },
        { label: 'Energy management (EEMS)', sub: 'coordinated PV/BESS/EV/HP', tags: ['Section 825 / 825.1'] },
        { label: 'Transient overvoltage', sub: 'source switching, load shedding', tags: ['Reg 826.1.4'] },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">Chapter 82</span> is the A4:2026 framework for a <strong className="text-white">prosumer's installation</strong> — any site that both consumes and produces. It sits on top of the technology-specific sections (712, 722, 551…), adding the multi-source rules.
        </>
      }
    />
  );
}

/* M10 S6 — grid-forming vs grid-following inverters (the marquee concept). */
export function GridFormingVsFollowing({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Inverter behaviour"
      caption={caption}
      columns={[
        { name: 'Grid-following', rows: [
          { label: 'Reference', value: "Follows the grid's V & f" },
          { label: 'Control', value: 'Current source, locks via PLL' },
          { label: 'On loss of mains', value: 'Must disconnect — cannot island' },
        ], footer: 'Standard PV / BESS inverters' },
        { name: 'Grid-forming', rows: [
          { label: 'Reference', value: 'Sets its own V & f' },
          { label: 'Control', value: 'Voltage source, droop control' },
          { label: 'On loss of mains', value: 'Can keep an island alive' },
        ], footer: 'Backup / EPS, microgrids, off-grid' },
      ]}
      note={
        <>
          Almost all PV/BESS inverters are <span className="font-semibold text-elec-yellow">grid-following</span> — they ride on the grid and <strong className="text-white">must trip on loss of mains</strong> (anti-islanding). <span className="font-semibold text-elec-yellow">Grid-forming</span> inverters create the reference themselves, so they can run a building as an island during an outage.
        </>
      }
    />
  );
}
