import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, type LucideIcon } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CALLOUT_DANGER, PANEL_LABEL_DANGER } from '@/components/ui/panel-recipe';
import type { ToggleCardDef, SafetyNotice } from '@/types/installation-guides';
import { cn } from '@/lib/utils';

interface InstallationGuidePageShellProps {
  title: string;
  /** @deprecated Decorative icon — no longer rendered in editorial layout. */
  icon?: LucideIcon;
  cards: ToggleCardDef[];
  renderPanel: (cardId: string) => ReactNode;
  safetyNotice?: SafetyNotice;
  eyebrow?: string;
  description?: string;
  backRoute?: string;
}

/**
 * Shell for the installation-type guides — Domestic, Commercial, Industrial
 * and Specialist all render through here, so this file is where their design
 * lives.
 *
 * Moved onto the Business Hub shell (`HubPage`/`HubMasthead`/`HubBody`), the
 * same one the rest of the app uses. It was on `PageFrame`/`PageHero` from
 * `college/primitives` with a hand-rolled back button, which is why these four
 * pages looked like a different product to the hub that links to them.
 *
 * Colour follows `card-recipe.ts`: the selected toggle carried a translucent
 * volt fill and the safety notice a translucent red one — both muddy brown on
 * this ground. Selection is now a SOLID volt pill (the one volt fill that is
 * always safe) and the safety notice carries a solid red left bar.
 *
 * The per-card rainbow (blue/green/amber/cyan/purple) that callers still pass
 * on `ToggleCardDef` stays ignored — one accent, as before.
 */
const InstallationGuidePageShell = ({
  title,
  cards,
  renderPanel,
  safetyNotice,
  eyebrow = 'Apprentice · Installation',
  description = 'Reflects BS 7671:2018+A4:2026. Walk through the planning, circuits, testing and reference material for this installation type.',
  /* These four are reached from the guides index, not the hub — Back used to
     jump to /apprentice, two levels past where you came from. */
  backRoute = '/apprentice/on-job-tools/electrical-installation-guides',
}: InstallationGuidePageShellProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(cards[0]?.id ?? null);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <HubPage>
      <HubMasthead section={eyebrow} title={title} backTo={backRoute} />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">{description}</p>

        {/*
         * The section switcher.
         *
         * This was a grid of nine 72px-tall bordered cards — two rows of
         * billboards filling the whole first screen before a word of content,
         * every one wearing a gold edge so they competed with each other and
         * with the page. It is a tab bar; it should read as one.
         *
         * Now the pill row the safety-cases page already uses: solid volt for
         * the current section (a solid volt fill is the one that is always
         * safe), a quiet outline for the rest. Scrolls sideways on a phone
         * rather than stacking, so it never costs more than one line.
         */}
        <motion.div variants={itemVariants} className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Guide sections"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
          >
            {cards.map((card) => {
              const isActive = card.id === activeCardId;
              const CardIcon = card.icon;
              return (
                <button
                  key={card.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => toggleCard(card.id)}
                  className={cn(
                    'inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[13px]',
                    'transition-colors touch-manipulation active:scale-[0.98]',
                    isActive
                      ? 'bg-elec-yellow font-semibold text-black'
                      : 'border border-white/[0.16] font-medium text-white hover:border-white/[0.32]'
                  )}
                >
                  <CardIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {card.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {activeCardId && renderPanel(activeCardId)}

        {safetyNotice && (
          <motion.div variants={itemVariants}>
            <div className={cn(CALLOUT_DANGER, 'space-y-3')}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" aria-hidden />
                <span className={PANEL_LABEL_DANGER}>{safetyNotice.title}</span>
              </div>
              <ul className="space-y-2">
                {safetyNotice.points.map((point, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <p className="text-[13.5px] font-semibold leading-snug text-white">
                      {point.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white/85">{point.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </HubBody>
    </HubPage>
  );
};

export default InstallationGuidePageShell;
