import type { ReactNode } from 'react';
import { DecisionCascade } from './diagramKit';

/* M8 S5 — RCD type selection for a heat pump. */
export function RcdTypeTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="RCD type selection"
      caption={caption}
      steps={[
        {
          q: "Does the manufacturer's DoC / instructions specify the RCD type?",
          branches: [{ cond: 'Yes', to: 'Fit the type the manufacturer specifies — it overrides the general rule', tone: 'go' }],
        },
        {
          q: 'What DC fault current can the load produce?',
          branches: [
            { cond: 'None / pulsating', to: 'Type A (Type AC is prohibited for this load)', tone: 'go' },
            { cond: 'Smooth DC (inverter compressor)', to: 'Type B — or Type A + an RDC-DD if the unit provides one', tone: 'warn' },
          ],
        },
        {
          q: 'Always verify at commissioning:',
          branches: [{ cond: 'Test', to: 'Trip time at 1× and 5× IΔn; Type-B-capable instrument if Type B', tone: 'info' }],
        },
      ]}
    />
  );
}
