import {
  Trophy,
  Lock,
  Footprints,
  Layers,
  Flame,
  Zap,
  BookOpen,
  Star,
  Award,
  CheckCircle,
  Brain,
  Crown,
  Shield,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { TIER_CONFIG, type FlashcardAchievementTier } from '@/data/flashcardAchievements';
import type { FlashcardAchievementStatus } from '@/hooks/useFlashcardAchievements';
import { cn } from '@/lib/utils';
import { eyebrowCn } from '@/components/shared/surfaceStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ICON_MAP: Record<string, LucideIcon> = {
  Footprints,
  Layers,
  Flame,
  Zap,
  BookOpen,
  Star,
  Award,
  CheckCircle,
  Brain,
  Crown,
  Shield,
  ShieldCheck,
  Rocket,
  Trophy,
};

interface FlashcardAchievementsProps {
  achievements: FlashcardAchievementStatus[];
  stats: { total: number; unlocked: number; percentage: number };
}

const FlashcardAchievements = ({ achievements, stats }: FlashcardAchievementsProps) => {
  const tierOrder: FlashcardAchievementTier[] = ['bronze', 'silver', 'gold', 'platinum'];

  return (
    <div className="space-y-4">
      <div className={cn('space-y-3 rounded-2xl border border-elec-yellow/35 p-4', CARD_SURFACE)}>
        <div className="flex items-baseline justify-between">
          <span className={eyebrowCn}>Achievements</span>
          <span className="text-[12px] font-semibold tabular-nums text-white">
            {stats.unlocked}/{stats.total} · {stats.percentage}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.10]">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {tierOrder.map((tier) => {
        const tierAchievements = achievements.filter((a) => a.def.tier === tier);
        if (tierAchievements.length === 0) return null;
        const config = TIER_CONFIG[tier];

        return (
          <div key={tier} className="space-y-2">
            <span className={eyebrowCn}>{config.label}</span>
            <div className="grid grid-cols-2 gap-2">
              {tierAchievements.map((a) => (
                <AchievementCard key={a.def.id} achievement={a} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function AchievementCard({ achievement }: { achievement: FlashcardAchievementStatus }) {
  const { def, unlocked, progress, current, target } = achievement;
  const Icon = ICON_MAP[def.iconName] || Trophy;

  /*
   * Unlocked reads as volt-edged, not a `/[0.04]` wash over near-black — that
   * mixed into sludge and made an earned badge look the same as a locked one.
   */
  const cardClass = unlocked
    ? 'rounded-2xl border border-elec-yellow/60 bg-white/[0.06] p-3 space-y-2'
    : cn('rounded-2xl border border-elec-yellow/35 p-3 space-y-2', CARD_SURFACE);

  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between">
        <Icon className={cn('h-5 w-5 text-white', unlocked && 'text-elec-yellow')} />
        {!unlocked && <Lock className="h-3.5 w-3.5 text-white opacity-60" />}
        {unlocked && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
      </div>

      <div className="space-y-0.5">
        <h3 className="text-[14px] font-medium text-white leading-tight">{def.title}</h3>
        <p className="line-clamp-2 text-[12px] leading-tight text-white opacity-80">
          {def.description}
        </p>
      </div>

      {!unlocked && (
        <div className="space-y-1">
          <div className="flex items-baseline justify-between text-[10px] font-semibold tabular-nums text-white opacity-80">
            <span>
              {current}/{target}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.10]">
            <div
              className="h-full rounded-full bg-elec-yellow transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardAchievements;
