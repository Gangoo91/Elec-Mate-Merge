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
import { ContentSheet } from '@/components/apprentice/ApprenticeHomeUi';
import { RARITY_COLOURS, type AchievementDef } from '@/data/achievementDefinitions';
import type { NextUpAchievement } from '@/hooks/useAchievementChecker';
import { cn } from '@/lib/utils';

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
      {/* Header row: title + counter */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Achievements</h3>
        <span className="text-[12.5px] tabular-nums text-white">
          {unlockedCount} of {totalCount}
        </span>
      </div>

      {/* Next up — the one badge the checker tracks live progress for */}
      {nextUp && (
        <div
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5'
          )}
        >
          <NextUpIcon icon={nextUpIcon} />
          <span className="flex-1 min-w-0">
            <span className="flex items-baseline justify-between gap-2">
              <span className="min-w-0 text-[14px] font-semibold text-white">
                Next: {nextUp.title}
              </span>
              <span className="shrink-0 text-[13px] tabular-nums text-white">
                {nextUp.current} of {nextUp.target}
              </span>
            </span>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
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
              'flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.08] px-4 h-11 text-left touch-manipulation transition-colors hover:bg-white/[0.03]'
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
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {locked.map((badge) => (
                <BadgeTile key={badge.id} badge={badge} onSelect={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Badge detail — a sheet sized to its few lines */}
      <ContentSheet
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        eyebrow={
          selected
            ? selected.isUnlocked
              ? 'Achievement earned'
              : 'Achievement to earn'
            : 'Achievement'
        }
        title={selected?.title ?? 'Achievement'}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BadgeIcon
                icon={resolveIcon(selected.icon)}
                className={cn(
                  'h-7 w-7 shrink-0',
                  selected.isUnlocked ? RARITY_COLOURS[selected.rarity] : 'text-white'
                )}
              />
              <p className="text-[14px] font-medium capitalize text-white">
                {selected.rarity} · <span className="normal-case">+{selected.xpBonus} XP</span>
              </p>
            </div>

            <div className="space-y-1">
              {!selected.isUnlocked && (
                <p className="text-[13.5px] font-semibold text-white">How to earn it</p>
              )}
              <p className="text-[14.5px] leading-relaxed text-white">{selected.description}</p>
            </div>

            {/* Live progress — only the checker's nextUp badge has it */}
            {nextUp && nextUp.id === selected.id && !selected.isUnlocked && (
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13.5px] font-semibold text-white">Progress</p>
                  <span className="text-[13px] tabular-nums text-white">
                    {nextUp.current} of {nextUp.target}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-elec-yellow transition-all"
                    style={{ width: `${nextUp.pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </ContentSheet>
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
  // Icon beside the name, not stacked over it (10 Oct: icon-over-title tiles
  // at 10.5px read as generated).
  return (
    <button
      type="button"
      onClick={() => onSelect(badge)}
      aria-label={`${badge.title}, ${badge.rarity}, ${badge.isUnlocked ? 'unlocked' : 'locked'}`}
      className={cn(
        'flex min-h-[52px] min-w-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-left touch-manipulation transition-colors active:bg-white/[0.07]',
        badge.isUnlocked
          ? 'border-white/[0.12] bg-white/[0.04] hover:border-white/[0.25]'
          : 'border-dashed border-white/[0.12] hover:border-white/[0.25]'
      )}
    >
      <Icon
        className={cn(
          'h-[18px] w-[18px] shrink-0',
          badge.isUnlocked ? RARITY_COLOURS[badge.rarity] : 'text-white'
        )}
        strokeWidth={1.5}
        aria-hidden
      />
      <span
        className={cn(
          'min-w-0 text-[13px] leading-tight line-clamp-2 text-white',
          badge.isUnlocked ? 'font-semibold' : 'font-medium'
        )}
      >
        {badge.title}
      </span>
    </button>
  );
}

/* Tiny wrappers so dynamic icons render cleanly with typed props */

function NextUpIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-5 w-5 shrink-0 text-white" strokeWidth={1.5} aria-hidden />;
}

function BadgeIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

export default AchievementGallery;
