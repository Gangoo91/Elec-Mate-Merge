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
import { Building2, Factory, Home, Shield, Sparkles } from 'lucide-react';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import {
  LEARN_CALLOUT,
  LEARN_LABEL_ACCENT,
  LearnLinkList,
  LearnSectionTitle,
  learnChip,
  type LearnLinkItem,
} from '@/components/apprentice/learn-ui/learnUi';
import { quickRefCards } from '@/data/installation-guides/installationQuickRefData';
import { QuickReferencePanel } from '@/components/apprentice/installation-guides/QuickReferencePanel';
import { cn } from '@/lib/utils';

const BASE = '/apprentice/on-job-tools/electrical-installation-guides';

const installationTypes: (LearnLinkItem & { description: string; meta: string })[] = [
  {
    id: 'domestic',
    icon: Home,
    title: 'Domestic',
    description: 'Houses, flats, extensions and rewires.',
    meta: 'Part P, RCDs, ring finals, bathroom zones',
    to: `${BASE}/domestic`,
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial',
    description: 'Offices, retail and hospitality.',
    meta: 'Three-phase distribution, emergency lighting, fire alarm interfaces, Section 537',
    to: `${BASE}/commercial`,
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial',
    description: 'Heavy plant, factories and motor control.',
    meta: 'ATEX zones, hazardous areas, IP/IK ratings, prospective fault current',
    to: `${BASE}/industrial`,
  },
  {
    id: 'specialist',
    icon: Sparkles,
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

        <section className="space-y-3">
          <LearnSectionTitle title="Quick reference" sub="Tap a topic to open it here." />
          {/* A chip rail on a phone (one line, scrolls sideways), wrapping
              from sm: up. It was a 3-across grid of icon-over-label tiles at
              11px — the generated-looking tile the design language retires. */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
              {quickRefCards.map((card) => {
                const isActive = card.id === activeCardId;
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    aria-pressed={isActive}
                    className={cn(
                      learnChip(isActive),
                      'inline-flex items-center gap-1.5 px-4 text-[13px]'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                    {card.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {activeCard && <QuickReferencePanel card={activeCard} />}

        <section className="space-y-3">
          <LearnSectionTitle title="Choose the setting" />
          <LearnLinkList
            columns={2}
            items={installationTypes.map((t) => ({
              id: t.id,
              icon: t.icon,
              title: t.title,
              to: t.to,
              detail: (
                <>
                  {t.description}
                  <span className="mt-1 block text-[12.5px] leading-snug text-white">{t.meta}</span>
                </>
              ),
            }))}
          />
        </section>

        <div className={cn(LEARN_CALLOUT, 'space-y-1')}>
          <div className="flex items-center gap-2">
            <Shield
              className="h-4 w-4 flex-shrink-0 text-elec-yellow"
              strokeWidth={1.5}
              aria-hidden
            />
            <span className={LEARN_LABEL_ACCENT}>Compliance</span>
          </div>
          <p className="text-[14px] leading-relaxed text-white">
            All electrical work must comply with BS 7671:2018+A4:2026, Part P of the Building
            Regulations, and GN3 for inspection and testing. Check for the latest amendments before
            you rely on anything here.
          </p>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default ElectricalInstallationGuides;
