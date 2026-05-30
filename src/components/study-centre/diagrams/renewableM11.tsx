import type { ReactNode } from 'react';
import { TagMap, DecisionCascade } from './diagramKit';

/* M11 S1 — Part 8 (Functional Requirements) framework. */
export function Part8Framework({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="Part 8 — Functional Requirements"
      caption={caption}
      items={[
        { label: 'Chapter 81 — Energy efficiency', sub: 'new in A4:2026; a signpost (replaced Appendix 17)', tags: ['Building Regs', 'BS HD 60364-8-1:2019'] },
        { label: "Chapter 82 — Prosumer's installation", sub: 'any site that consumes + produces', tags: ['Reg 826.x', 'Section 825 (EEMS)'] },
      ]}
      note={
        <>
          Part 8 is layered <strong className="text-white">on top of</strong> the traditional safety regs — Reg 433/434 (overload + short-circuit), Reg 525 (voltage drop), Reg 643 (Part 6 verification). It <span className="font-semibold text-elec-yellow">adds</span> efficiency and prosumer requirements; it doesn't replace any of them.
        </>
      }
    />
  );
}

/* M11 S7 — anti-islanding / loss-of-mains: RoCoF + the G98/G99 test route. */
export function AntiIslandingDecisionTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="Anti-islanding route"
      caption={caption}
      steps={[
        {
          q: 'Does the inverter use type-tested G98/G99 interface protection? (virtually all PV / BESS / micro-CHP)',
          branches: [{ cond: 'Yes', to: 'Loss-of-mains = RoCoF + voltage/frequency. Vector Shift is NOT permitted for type-tested generation.', tone: 'go' }],
        },
        {
          q: 'How is anti-islanding proven at commissioning — by output per phase?',
          branches: [
            { cond: '≤ 16 A (G98)', to: 'Installer-run simulated grid-loss test; self-certified + manufacturer DoC', tone: 'go' },
            { cond: '> 16 A (G99)', to: 'DNO-witnessed (or accepted-equivalent) test before connection', tone: 'warn' },
          ],
        },
      ]}
    />
  );
}
