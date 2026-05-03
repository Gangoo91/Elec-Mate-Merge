import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import type { ToggleCardDef, SafetyNotice } from '@/types/installation-guides';

interface InstallationGuidePageShellProps {
  title: string;
  /** @deprecated Decorative icon — no longer rendered in editorial layout. Kept for backwards compatibility. */
  icon?: LucideIcon;
  cards: ToggleCardDef[];
  renderPanel: (cardId: string) => ReactNode;
  safetyNotice?: SafetyNotice;
  eyebrow?: string;
  description?: string;
  backRoute?: string;
}

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
        <Button
          variant="ghost"
          onClick={() => navigate(backRoute)}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow={eyebrow} title={title} description={description} tone="yellow" />
      </motion.div>

      {/* ── Toggle Card Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => {
          const isActive = card.id === activeCardId;
          const CardIcon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 min-h-[72px] transition-all touch-manipulation ${
                isActive
                  ? `${card.bgColour} ${card.borderColour} ring-2 ${card.ringColour}`
                  : 'bg-white/5 border-white/10 active:bg-white/10'
              }`}
            >
              <CardIcon className={`h-5 w-5 ${isActive ? card.textColour : 'text-white'}`} />
              <span
                className={`text-[11px] leading-tight text-center font-medium ${isActive ? card.textColour : 'text-white'}`}
              >
                {card.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active Panel ───────────────────────────────────────────── */}
      {activeCardId && renderPanel(activeCardId)}

      {/* ── Safety Notice Banner ───────────────────────────────────── */}
      {safetyNotice && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-3">
            <p className="text-white text-sm font-semibold">{safetyNotice.title}</p>
            {safetyNotice.points.map((point, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="text-white text-sm font-medium">{point.title}</p>
                <p className="text-white text-sm">{point.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageFrame>
  );
};

export default InstallationGuidePageShell;
