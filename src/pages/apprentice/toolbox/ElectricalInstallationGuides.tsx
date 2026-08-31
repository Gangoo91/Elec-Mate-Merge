/**
 * Installation guides index.
 *
 * Rebuilt on the Business Hub shell so it matches the on-the-job hub that
 * links to it and the four guides it links on to.
 *
 * What changed beyond the shell:
 *
 * - The four installation types were colour-coded blue, green, orange and
 *   amber, each with a translucent fill. Four different washes on a near-black
 *   page is both off-brand — the app is volt and white — and the muddy-fill
 *   problem four times over (see `card-recipe.ts`). They are now standard hub
 *   tool cards, told apart by their words rather than by a colour key nobody
 *   was given.
 *
 * - The quick-reference toggles were `bg-white/5` on `bg-white/10` chips with a
 *   coloured ring when selected. Same lit surface as everything else now, with
 *   selection carried on the border.
 *
 * - Headings were Title Case ("Quick Reference", "Installation Types"); the
 *   house style is sentence case, and the section label comes from the grid.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  HubSectionHeading,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import { CALLOUT, PANEL_LABEL_ACCENT } from '@/components/ui/panel-recipe';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { quickRefCards } from '@/data/installation-guides/installationQuickRefData';
import { QuickReferencePanel } from '@/components/apprentice/installation-guides/QuickReferencePanel';
import { cn } from '@/lib/utils';

const BASE = '/apprentice/on-job-tools/electrical-installation-guides';

const installationTypes: HubTool[] = [
  {
    id: 'domestic',
    title: 'Domestic',
    description: 'Houses, flats, extensions and rewires.',
    meta: 'Part P, RCDs, ring finals, bathroom zones',
    to: `${BASE}/domestic`,
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Offices, retail and hospitality.',
    meta: 'Three-phase distribution, emergency lighting, fire alarm interfaces, Section 537',
    to: `${BASE}/commercial`,
  },
  {
    id: 'industrial',
    title: 'Industrial',
    description: 'Heavy plant, factories and motor control.',
    meta: 'ATEX zones, hazardous areas, IP/IK ratings, prospective fault current',
    to: `${BASE}/industrial`,
  },
  {
    id: 'specialist',
    title: 'Specialist',
    description: 'Special locations with their own Part 7 rules.',
    meta: 'EV charging, solar PV, heat pumps, swimming pools and saunas',
    to: `${BASE}/specialist`,
  },
];

const ElectricalInstallationGuides = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const activeCard = quickRefCards.find((c) => c.id === activeCardId) ?? null;

  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Installation guides"
        title="Installation guides"
        backTo="/apprentice/on-job-tools"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Planning, circuits, testing and reference material for each kind of installation you will
          work on. Reflects BS 7671:2018+A4:2026.
        </p>

        <div className="space-y-3">
          <HubSectionHeading>Quick reference</HubSectionHeading>
          {/* Four across from sm up: there are seven cards, so three columns
              leaves a lone chip on a third row. */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
            {quickRefCards.map((card) => {
              const isActive = card.id === activeCardId;
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl border p-3',
                    'transition-colors touch-manipulation active:scale-[0.98]',
                    CARD_SURFACE,
                    isActive
                      ? 'border-elec-yellow'
                      : 'border-elec-yellow/25 hover:border-elec-yellow/50'
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5', isActive ? 'text-elec-yellow' : 'text-white')}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'text-center text-[11px] font-medium leading-tight',
                      isActive ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {card.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {activeCard && <QuickReferencePanel card={activeCard} />}

        <HubToolGrid label="Choose the setting" cards={installationTypes} columns="four" />

        <motion.div variants={itemVariants} className={cn(CALLOUT, 'space-y-1')}>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 flex-shrink-0 text-elec-yellow" aria-hidden />
            <span className={PANEL_LABEL_ACCENT}>Compliance</span>
          </div>
          <p className="text-[14px] leading-relaxed text-white/85">
            All electrical work must comply with BS 7671:2018+A4:2026, Part P of the Building
            Regulations, and GN3 for inspection and testing. Check for the latest amendments before
            you rely on anything here.
          </p>
        </motion.div>
      </HubBody>
    </HubPage>
  );
};

export default ElectricalInstallationGuides;
