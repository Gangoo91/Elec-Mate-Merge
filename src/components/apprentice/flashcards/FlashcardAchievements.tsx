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
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Achievements
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {stats.unlocked}/{stats.total} · {stats.percentage}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
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
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {config.label}
            </span>
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

  const cardClass = unlocked
    ? 'rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2'
    : 'rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2';

  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between">
        <Icon className={`h-5 w-5 ${unlocked ? 'text-elec-yellow' : 'text-white/55'}`} />
        {!unlocked && <Lock className="h-3.5 w-3.5 text-white/40" />}
        {unlocked && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
      </div>

      <div className="space-y-0.5">
        <h3 className="text-[14px] font-medium text-white leading-tight">{def.title}</h3>
        <p className="text-[12px] text-white/55 leading-tight line-clamp-2">{def.description}</p>
      </div>

      {!unlocked && (
        <div className="space-y-1">
          <div className="flex items-baseline justify-between text-[10px] text-white/55 font-mono">
            <span>
              {current}/{target}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
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
