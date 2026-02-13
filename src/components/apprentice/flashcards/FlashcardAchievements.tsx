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
      {/* Header + overall progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-base font-bold text-white">Achievements</h2>
        </div>
        <span className="text-sm font-medium text-elec-yellow">
          {stats.unlocked}/{stats.total}
        </span>
      </div>

      {/* Overall progress bar */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-amber-500 transition-all duration-500"
          style={{ width: `${stats.percentage}%` }}
        />
      </div>

      {/* Achievement cards grouped by tier */}
      {tierOrder.map((tier) => {
        const tierAchievements = achievements.filter((a) => a.def.tier === tier);
        if (tierAchievements.length === 0) return null;
        const config = TIER_CONFIG[tier];

        return (
          <div key={tier} className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${config.colour.replace('text-', 'bg-')}`}
              />
              <span className={`text-xs font-semibold uppercase tracking-wide ${config.colour}`}>
                {config.label}
              </span>
            </div>
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
  const config = TIER_CONFIG[def.tier];
  const Icon = ICON_MAP[def.iconName] || Trophy;

  return (
    <div
      className={`
        relative rounded-xl border p-3 transition-all
        ${unlocked ? `${config.bgColour} ${config.borderColour}` : 'bg-white/5 border-white/10'}
      `}
    >
      {/* Icon + lock overlay */}
      <div className="flex items-start justify-between mb-2">
        <div
          className={`
            p-2 rounded-lg
            ${unlocked ? config.bgColour : 'bg-white/5'}
          `}
        >
          <Icon className={`h-5 w-5 ${unlocked ? config.colour : 'text-white'}`} />
        </div>
        {!unlocked && <Lock className="h-3.5 w-3.5 text-white" />}
        {unlocked && <CheckCircle className={`h-4 w-4 ${config.colour}`} />}
      </div>

      {/* Title + description */}
      <h3
        className={`text-sm font-semibold leading-tight mb-0.5 ${
          unlocked ? 'text-white' : 'text-white'
        }`}
      >
        {def.title}
      </h3>
      <p className="text-[10px] text-white leading-tight line-clamp-2">{def.description}</p>

      {/* Progress bar (only when not unlocked) */}
      {!unlocked && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white">
              {current}/{target}
            </span>
            <span className="text-[10px] text-white">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progress > 0 ? 'bg-gradient-to-r from-elec-yellow to-amber-500' : ''
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardAchievements;
