import type { ReactNode } from 'react';
import { DecisionCascade, TagMap, ComparisonGrid, LayeredFramework } from './diagramKit';

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

/* M1 S4 — MCS / MIS standards / competent-person umbrella. */
export function McsCompetenceMap({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="MCS + the competent-person umbrella"
      caption={caption}
      bands={[
        { title: 'MCS umbrella scheme', tone: 'info', items: ['Product certification', 'Installer certification', 'Consumer protection (RECC / HIES)'] },
        { title: 'MIS standards — per technology', tone: 'info', items: ['MIS 3001 solar thermal', 'MIS 3002 PV', 'MIS 3003 wind', 'MIS 3004 biomass', 'MIS 3005 heat pumps', 'MIS 3012 storage'] },
        { title: 'What MCS certification unlocks', tone: 'go', items: ['SEG export payments', 'BUS £7,500 grant', 'Customer confidence'] },
      ]}
      note={
        <>
          MCS sits <strong className="text-white">alongside</strong> BS 7671 and Part P competent-person registration — not instead of them. The BS 7671 work still has to be certified the normal way; MCS is the layer that <span className="font-semibold text-elec-yellow">unlocks the financial incentives</span>.
        </>
      }
    />
  );
}

/* M1 S7 — Part L vs Part P vs Building Control for LCT. */
export function BuildingRegsComparison({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Building Regs for LCT"
      caption={caption}
      columns={[
        { name: 'Part L', rows: [
          { label: 'Covers', value: 'Energy efficiency' },
          { label: 'Triggers', value: 'New build, extensions, retrofit' },
          { label: 'For LCT', value: 'PV + heat pump aid compliance' },
        ] },
        { name: 'Part P', rows: [
          { label: 'Covers', value: 'Electrical safety (dwellings)' },
          { label: 'Triggers', value: 'Most fixed electrical work' },
          { label: 'For LCT', value: 'EV / PV / BESS / HP circuits' },
        ] },
        { name: 'Building Control', rows: [
          { label: 'Covers', value: 'Notification + sign-off' },
          { label: 'Triggers', value: 'Notifiable work' },
          { label: 'For LCT', value: 'MCS / scheme self-certifies' },
        ] },
      ]}
      note={
        <>
          The trap is treating these as one thing. Part L is about <span className="font-semibold text-elec-yellow">efficiency</span>, Part P about <span className="font-semibold text-elec-yellow">safety</span>; Building Control is the <strong className="text-white">route</strong> — and a competent-person scheme (MCS / NICEIC) lets you self-certify the Part P side instead of a separate LABC notice.
        </>
      }
    />
  );
}

/* M1 S8 — which certificate / notification for which job. */
export function CertPaperworkMap({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="Job → paperwork trail"
      caption={caption}
      items={[
        { label: 'New PV install', sub: 'new circuit(s)', tags: ['EIC', 'MCS cert', 'G98 / G99', 'BC via MCS'] },
        { label: 'Battery storage', sub: 'DC + AC side', tags: ['EIC', 'MCS cert', 'G98 / G99'] },
        { label: 'EV charger', sub: 'dedicated final circuit', tags: ['EIC', 'Part P notify', 'DNO notify'] },
        { label: 'Heat pump', sub: 'dedicated circuit', tags: ['EIC', 'MCS cert', 'DNO notify', 'Part L'] },
        { label: 'Alter an existing circuit', sub: 'no new circuit', tags: ['MEIWC'] },
      ]}
      note={
        <>
          <strong className="text-white">EIC</strong> for any new circuit; <strong className="text-white">MEIWC</strong> for an addition/alteration to an existing one. The <span className="font-semibold text-elec-yellow">MCS certificate</span> is what unlocks SEG / BUS, and the DNO notice follows the G98 / G99 route — every job carries its own combination.
        </>
      }
    />
  );
}
