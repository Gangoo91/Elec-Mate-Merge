import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, type LucideIcon } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import {
  Eyebrow,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
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
 * Editorial shell for installation-type guides (Commercial, Industrial,
 * Domestic). Replaces per-card multi-colour metadata with single
 * elec-yellow accent. Card colour properties are still accepted on the
 * ToggleCardDef for backwards-compat but ignored.
 */
const InstallationGuidePageShell = ({
  title,
  cards,
  renderPanel,
  safetyNotice,
  eyebrow = 'Apprentice · Installation',
  description = 'Reflects BS 7671:2018+A4:2026. Walk through the planning, circuits, testing and reference material for this installation type.',
  backRoute = '/apprentice',
}: InstallationGuidePageShellProps) => {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = useState<string | null>(cards[0]?.id ?? null);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate(backRoute)}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow={eyebrow} title={title} description={description} tone="yellow" />
      </motion.div>

      {/* ── Toggle card grid (editorial) ────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
        {cards.map((card) => {
          const isActive = card.id === activeCardId;
          const CardIcon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 sm:p-4 min-h-[72px] transition-all touch-manipulation',
                isActive
                  ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
                  : 'border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04]'
              )}
            >
              <CardIcon
                className={cn(
                  'h-4 w-4',
                  isActive ? 'text-elec-yellow' : 'text-white/55'
                )}
              />
              <span
                className={cn(
                  'text-[11px] leading-tight text-center font-medium',
                  isActive ? 'text-elec-yellow' : 'text-white/85'
                )}
              >
                {card.label}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Active panel ────────────────────────────────────────── */}
      {activeCardId && renderPanel(activeCardId)}

      {/* ── Safety notice ───────────────────────────────────────── */}
      {safetyNotice && (
        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0" />
              <Eyebrow className="text-red-300">{safetyNotice.title}</Eyebrow>
            </div>
            <ul className="space-y-2">
              {safetyNotice.points.map((point, idx) => (
                <li key={idx} className="space-y-0.5">
                  <p className="text-[13.5px] font-semibold text-white leading-snug">
                    {point.title}
                  </p>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {point.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </PageFrame>
  );
};

export default InstallationGuidePageShell;
