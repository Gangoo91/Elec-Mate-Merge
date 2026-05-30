import type { ReactNode } from 'react';
import { TagMap } from './diagramKit';

/* M9 S1 — Section 551 generating-set taxonomy mapped onto Module 9. */
export function Section551Taxonomy({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="Section 551 taxonomy"
      caption={caption}
      items={[
        { label: 'Wind turbine', sub: 'HAWT / VAWT', tags: ['551.1.1(b) turbines'] },
        { label: 'Micro-hydro', sub: 'Pelton / Archimedes', tags: ['551.1.1(b) turbines'] },
        { label: 'CHP · biomass-CHP', sub: 'engine / Stirling', tags: ['551.1.1(a) combustion'] },
        { label: 'Fuel-cell micro-CHP', sub: '', tags: ['551.1.1(f) other source'] },
        { label: 'Solar thermal', sub: 'heat only', tags: ['Not a generating set'] },
        { label: 'Biomass boiler', sub: 'heat only', tags: ['Not a generating set'] },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">Section 551 governs generating sets</span> — anything that produces electricity. Solar thermal and heat-only biomass don't generate, so they fall <strong className="text-white">outside 551</strong>: electrically they're just loads (pumps, controls, ignition).
        </>
      }
    />
  );
}
