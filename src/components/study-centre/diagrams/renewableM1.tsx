import type { ReactNode } from 'react';
import { DecisionCascade, TagMap } from './diagramKit';

/* Module 1 diagrams. */

/* M1 S2 — which BS 7671 chapters apply to each LCT. */
export function LctChapterMap({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="LCT → BS 7671 map"
      caption={caption}
      items={[
        { label: 'Solar PV', sub: 'rooftop / ground', tags: ['Section 712', 'Chapter 82*'] },
        { label: 'Battery storage (BESS)', sub: 'DC + AC side', tags: ['Section 712', 'Section 551', 'Chapter 82*'] },
        { label: 'EV charging', sub: 'Mode 3 / 4', tags: ['Section 722', 'Chapter 82*'] },
        { label: 'Heat pump', sub: 'ASHP / GSHP', tags: ['Section 554', 'Part 4 (ADS)'] },
        { label: 'Wind · micro-hydro · CHP', sub: 'generating sets', tags: ['Section 551'] },
        { label: 'Energy efficiency', sub: 'A4:2026 new', tags: ['Chapter 81'] },
        { label: "Prosumer (multi-source)", sub: 'PV + BESS + EV…', tags: ['Chapter 82', 'Reg 826.x'] },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">The two cross-cutting anchors: </span>
          <strong className="text-white">Section 551</strong> (generating sets) applies to anything that produces power, and{' '}
          <strong className="text-white">Chapter 82</strong> (prosumer's installation, marked <strong className="text-white">*</strong>) applies whenever a site both consumes and produces. Everything else is technology-specific.
        </>
      }
    />
  );
}

/* M1 S5 — DNO notification route: EREC G98 / G99 / G100. */
export function DnoDecisionTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="DNO connection route"
      caption={caption}
      steps={[
        {
          q: 'Does the installation generate or store-and-export to the grid?',
          branches: [{ cond: 'No (load only)', to: 'No DNO generation notice needed', tone: 'info' }],
        },
        {
          q: 'Is the output ≤ 16 A per phase? (≈ 3.68 kW single-phase / 11 kW three-phase)',
          branches: [{ cond: '≤ 16 A', to: 'EREC G98 — connect, then notify the DNO within 28 days', tone: 'go' }],
        },
        {
          q: 'Is the output greater than 16 A per phase?',
          branches: [{ cond: '> 16 A', to: 'EREC G99 — apply and get a DNO connection offer BEFORE installing', tone: 'warn' }],
        },
        {
          q: 'Want more generation/storage than the DNO will let you export?',
          branches: [{ cond: 'Yes', to: 'EREC G100 — export-limitation scheme caps export to the agreed limit', tone: 'info' }],
        },
      ]}
    />
  );
}
