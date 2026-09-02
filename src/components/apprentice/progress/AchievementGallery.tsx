/**
 * AchievementGallery — every badge, finally on display.
 *
 * Rarity tiers have lived in achievementDefinitions since day one but were
 * never rendered anywhere; this gallery is where they show. Pure render
 * from the checker's getAllAchievements() — no queries of its own, all
 * data arrives as props from ProgressDashboard's existing hook instance.
 *
 * Unlocked tiles get a rarity-tinted border/icon; locked tiles are dimmed
 * but readable (description doubles as "how to earn it"). Tapping a tile
 * opens a bottom sheet with the full story. The single nextUp badge (the
 * only one the checker computes live progress for) gets a slim progress
 * strip up top — same visual language as the Today page's next-badge row,
 * minus the navigation (we're already here).
 */

import { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Crown,
  FileText,
  Flame,
  FolderOpen,
  Hash,
  Layers,
  Medal,
  Notebook,
  PenLine,
  PieChart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import {
  RARITY_COLOURS,
  RARITY_BG_COLOURS,
  type AchievementDef,
  type AchievementRarity,
} from '@/data/achievementDefinitions';
import type { NextUpAchievement } from '@/hooks/useAchievementChecker';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/** Defs store icons as lucide component names (strings) — resolve here. */
const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  BookOpen,
  ClipboardCheck,
  Clock,
  Crown,
  FileText,
  Flame,
  FolderOpen,
  Hash,
  Layers,
  Medal,
  Notebook,
  PenLine,
  PieChart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
};

const resolveIcon = (name: string): LucideIcon => ICON_MAP[name] ?? Trophy;

/**
 * Border tints per rarity — derived locally to match the RARITY_COLOURS
 * palette (the data file only exports text + bg classes).
 */
const RARITY_BORDERS: Record<AchievementRarity, string> = {
  common: 'border-white/[0.10]',
  uncommon: 'border-white/[0.14]',
  rare: 'border-white/[0.18]',
  epic: 'border-elec-yellow/20',
  legendary: 'border-elec-yellow/30',
};

type GalleryAchievement = AchievementDef & { isUnlocked: boolean };

interface AchievementGalleryProps {
  achievements: GalleryAchievement[];
  unlockedCount: number;
  totalCount: number;
  nextUp: NextUpAchievement | null;
}

export function AchievementGallery({
  achievements,
  unlockedCount,
  totalCount,
  nextUp,
}: AchievementGalleryProps) {
  const [selected, setSelected] = useState<GalleryAchievement | null>(null);
  const [showLocked, setShowLocked] = useState(false);

  /*
   * 🔴 Locked badges used to be rendered inline with the unlocked ones, all
   * 38 of them. Early on that is thirty-odd dim tiles — eight rows of grey
   * carrying no information the learner can act on — sitting between the
   * grade card and the topic mastery they came for. Earned badges stay on
   * show; the rest live behind one line they can open.
   */
  const { unlocked, locked } = useMemo(
    () => ({
      unlocked: achievements.filter((a) => a.isUnlocked),
      locked: achievements.filter((a) => !a.isUnlocked),
    }),
    [achievements]
  );

  const nextUpIcon = useMemo(() => {
    if (!nextUp) return Trophy;
    const def = achievements.find((a) => a.id === nextUp.id);
    return def ? resolveIcon(def.icon) : Trophy;
  }, [nextUp, achievements]);

  return (
    <section aria-label="Achievements" className="space-y-3">
      {/* Header row — eyebrow + mono counter */}
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>Achievements</Eyebrow>
        <span className="text-[11px] font-mono tabular-nums text-white">
          {unlockedCount} of {totalCount}
        </span>
      </div>

      {/* Next up — the one badge the checker tracks live progress for */}
      {nextUp && (
        <div
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-white/[0.06] px-4 py-3.5',
            CARD_SURFACE
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-elec-yellow/20 bg-white/[0.05]">
            <NextUpIcon icon={nextUpIcon} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[13.5px] font-medium text-white truncate">{nextUp.title}</span>
              <span className="text-[11px] font-mono tabular-nums text-white shrink-0">
                {nextUp.current}/{nextUp.target}
              </span>
            </span>
            <span className="mt-1.5 block h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <span
                className="block h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${nextUp.pct}%` }}
              />
            </span>
          </span>
        </div>
      )}

      {/* Earned badges — always on show */}
      {unlocked.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {unlocked.map((badge) => (
            <BadgeTile key={badge.id} badge={badge} onSelect={setSelected} />
          ))}
        </div>
      )}

      {/* Locked shelf — one line by default, the full set one tap away */}
      {locked.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setShowLocked((v) => !v)}
            aria-expanded={showLocked}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.06] px-4 h-11 text-left touch-manipulation transition-colors hover:bg-white/[0.03]',
              CARD_SURFACE
            )}
          >
            <span className="text-[13px] font-medium text-white">
              {showLocked ? 'Hide locked badges' : `${locked.length} more to unlock`}
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-white transition-transform',
                showLocked && 'rotate-180'
              )}
              strokeWidth={2}
            />
          </button>

          {showLocked && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {locked.map((badge) => (
                <BadgeTile key={badge.id} badge={badge} onSelect={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Badge detail — bottom sheet */}
      <FormSheet
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        eyebrow="Achievement"
        title={selected?.title ?? 'Achievement'}
      >
        {selected && (
          <div className="pt-1">
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Big icon in rarity-tinted square */}
              <span
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-2xl border',
                  selected.isUnlocked
                    ? cn(RARITY_BORDERS[selected.rarity], RARITY_BG_COLOURS[selected.rarity])
                    : 'border-white/[0.08] bg-white/[0.03]'
                )}
              >
                <BadgeIcon
                  icon={resolveIcon(selected.icon)}
                  className={cn(
                    'h-8 w-8',
                    selected.isUnlocked ? RARITY_COLOURS[selected.rarity] : 'text-white'
                  )}
                />
              </span>

              {/* Rarity chip */}
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]',
                  RARITY_COLOURS[selected.rarity],
                  RARITY_BG_COLOURS[selected.rarity]
                )}
              >
                {selected.rarity}
              </span>

              <div className="space-y-1">
                {!selected.isUnlocked && <Eyebrow>How to earn it</Eyebrow>}
                <p className="text-[13px] text-white leading-relaxed">{selected.description}</p>
              </div>

              <span className="text-[12px] font-mono tabular-nums text-elec-yellow">
                +{selected.xpBonus} XP
              </span>

              {/* Live progress — only the checker's nextUp badge has it */}
              {nextUp && nextUp.id === selected.id && !selected.isUnlocked && (
                <div className="w-full max-w-xs space-y-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <Eyebrow>Progress</Eyebrow>
                    <span className="text-[11px] font-mono tabular-nums text-white">
                      {nextUp.current}/{nextUp.target}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-elec-yellow transition-all"
                      style={{ width: `${nextUp.pct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </FormSheet>
    </section>
  );
}

/**
 * One badge tile. Locked tiles stay legible rather than near-invisible —
 * the title is the whole point of showing them, and a learner scanning for
 * what to chase next cannot read text at 40% white.
 */
function BadgeTile({
  badge,
  onSelect,
}: {
  badge: GalleryAchievement;
  onSelect: (b: GalleryAchievement) => void;
}) {
  const Icon = resolveIcon(badge.icon);
  return (
    <button
      type="button"
      onClick={() => onSelect(badge)}
      aria-label={`${badge.title} — ${badge.rarity}, ${badge.isUnlocked ? 'unlocked' : 'locked'}`}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-4 text-center touch-manipulation transition-colors',
        badge.isUnlocked
          ? cn(
              RARITY_BORDERS[badge.rarity],
              RARITY_BG_COLOURS[badge.rarity],
              'hover:bg-white/[0.06]'
            )
          : 'border-white/[0.06] hover:bg-white/[0.03]'
      )}
    >
      <Icon
        className={cn('h-5 w-5', badge.isUnlocked ? RARITY_COLOURS[badge.rarity] : 'text-white')}
        strokeWidth={2}
      />
      <span
        className={cn(
          'text-[10.5px] leading-tight line-clamp-2 text-white',
          badge.isUnlocked && 'font-medium'
        )}
      >
        {badge.title}
      </span>
    </button>
  );
}

/* Tiny wrappers so dynamic icons render cleanly with typed props */

function NextUpIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-4 w-4 text-elec-yellow" strokeWidth={2} />;
}

function BadgeIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={className} strokeWidth={2} />;
}

export default AchievementGallery;
