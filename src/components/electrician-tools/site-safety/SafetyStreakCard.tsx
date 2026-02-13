import { motion } from "framer-motion";
import {
  Shield,
  Camera,
  FileText,
  CheckCircle2,
  Flame,
  Trophy,
  Zap,
} from "lucide-react";
import type { SafetyStreak } from "@/hooks/useSafetyStreak";

interface SafetyStreakCardProps {
  streak: SafetyStreak;
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  FileText,
  Camera,
  Shield,
  CheckCircle2,
};

export function SafetyStreakCard({ streak }: SafetyStreakCardProps) {
  const unlockedCount = streak.badges.filter((b) => b.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">Safety Streak</h3>
          </div>
          {unlockedCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
              <Trophy className="h-3 w-3 text-elec-yellow" />
              <span className="text-[10px] font-bold text-elec-yellow">
                {unlockedCount}/{streak.badges.length}
              </span>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-lg font-bold text-white block">
              {streak.daysIncidentFree}
            </span>
            <span className="text-[10px] text-white font-medium">
              Days Safe
            </span>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-lg font-bold text-white block">
              {streak.weeklyActionCount}
            </span>
            <span className="text-[10px] text-white font-medium">
              This Week
            </span>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-lg font-bold text-white block">
              {streak.consecutiveWeeksActive}
            </span>
            <span className="text-[10px] text-white font-medium">
              Weeks Active
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          {streak.badges.map((badge) => {
            const IconComponent = BADGE_ICONS[badge.icon] || Zap;
            return (
              <div
                key={badge.key}
                className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-colors ${
                  badge.unlocked
                    ? "bg-elec-yellow/10 border-elec-yellow/20"
                    : "bg-white/[0.02] border-white/[0.06]"
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 ${
                    badge.unlocked ? "text-elec-yellow" : "text-white"
                  }`}
                />
                <span
                  className={`text-[9px] font-semibold text-center leading-tight ${
                    badge.unlocked ? "text-white" : "text-white"
                  }`}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default SafetyStreakCard;
