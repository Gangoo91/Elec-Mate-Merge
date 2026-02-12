import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  FileText,
  AlertTriangle,
  Camera,
  Users,
  Wrench,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Activity,
} from 'lucide-react';

interface DashboardStats {
  activeRams: number;
  daysSinceLastNearMiss: number | null;
  equipmentDue: number;
  equipmentOverdue: number;
  upcomingBriefings: number;
  completedBriefingsThisMonth: number;
  totalPhotosThisWeek: number;
  totalNearMisses: number;
  equipmentTotal: number;
}

interface SafetyDashboardProps {
  stats: DashboardStats;
  isLoading?: boolean;
  onCardTap?: (section: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

function calculateSafetyScore(stats: DashboardStats): {
  score: number;
  label: string;
  colour: string;
  bgColour: string;
  borderColour: string;
} {
  let score = 100;

  // Deduct for overdue equipment (major issue)
  if (stats.equipmentOverdue > 0) {
    score -= Math.min(stats.equipmentOverdue * 10, 30);
  }

  // Deduct for equipment needing attention
  if (stats.equipmentDue > 0) {
    score -= Math.min(stats.equipmentDue * 3, 10);
  }

  // Bonus for recent briefings
  if (stats.completedBriefingsThisMonth === 0 && stats.upcomingBriefings === 0) {
    score -= 10;
  }

  // Deduct for recent near misses (within last 7 days)
  if (stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss < 7) {
    score -= 10;
  }

  // Bonus for active documentation
  if (stats.activeRams > 0) score = Math.min(score + 5, 100);
  if (stats.totalPhotosThisWeek > 0) score = Math.min(score + 3, 100);

  score = Math.max(0, Math.min(100, score));

  if (score >= 90) {
    return {
      score,
      label: 'Excellent',
      colour: 'text-green-400',
      bgColour: 'bg-green-500/10',
      borderColour: 'border-green-500/20',
    };
  } else if (score >= 70) {
    return {
      score,
      label: 'Good',
      colour: 'text-emerald-400',
      bgColour: 'bg-emerald-500/10',
      borderColour: 'border-emerald-500/20',
    };
  } else if (score >= 50) {
    return {
      score,
      label: 'Needs Attention',
      colour: 'text-amber-400',
      bgColour: 'bg-amber-500/10',
      borderColour: 'border-amber-500/20',
    };
  } else {
    return {
      score,
      label: 'Action Required',
      colour: 'text-red-400',
      bgColour: 'bg-red-500/10',
      borderColour: 'border-red-500/20',
    };
  }
}

function ScoreRing({ score, colour }: { score: number; colour: string }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeColour =
    colour === 'text-green-400'
      ? '#4ade80'
      : colour === 'text-emerald-400'
        ? '#34d399'
        : colour === 'text-amber-400'
          ? '#fbbf24'
          : '#f87171';

  return (
    <div className="relative w-[88px] h-[88px] flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={strokeColour}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-bold ${colour}`}>{score}</span>
        <span className="text-[10px] text-white/50">/ 100</span>
      </div>
    </div>
  );
}

export function SafetyDashboard({ stats, isLoading, onCardTap }: SafetyDashboardProps) {
  const safetyInfo = useMemo(() => calculateSafetyScore(stats), [stats]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-[120px] rounded-2xl bg-white/[0.03] animate-pulse" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[80px] rounded-xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const quickStats = [
    {
      id: 'rams',
      label: 'Active RAMS',
      value: stats.activeRams,
      icon: FileText,
      gradient: 'from-orange-400/20 to-red-500/20',
      iconColour: 'text-orange-400',
      borderColour: 'border-orange-500/20',
      section: 'saved-rams',
    },
    {
      id: 'near-miss',
      label: 'Days Safe',
      value: stats.daysSinceLastNearMiss !== null ? stats.daysSinceLastNearMiss : '–',
      icon:
        stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30
          ? TrendingUp
          : AlertTriangle,
      gradient:
        stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30
          ? 'from-green-400/20 to-emerald-500/20'
          : 'from-amber-400/20 to-yellow-500/20',
      iconColour:
        stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30
          ? 'text-green-400'
          : 'text-amber-400',
      borderColour:
        stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30
          ? 'border-green-500/20'
          : 'border-amber-500/20',
      section: 'near-miss',
    },
    {
      id: 'equipment',
      label: 'Equipment Due',
      value: stats.equipmentDue + stats.equipmentOverdue,
      icon: Wrench,
      gradient:
        stats.equipmentOverdue > 0
          ? 'from-red-400/20 to-rose-500/20'
          : 'from-cyan-400/20 to-teal-500/20',
      iconColour: stats.equipmentOverdue > 0 ? 'text-red-400' : 'text-cyan-400',
      borderColour: stats.equipmentOverdue > 0 ? 'border-red-500/20' : 'border-cyan-500/20',
      section: 'equipment',
    },
    {
      id: 'briefings',
      label: 'Upcoming Briefs',
      value: stats.upcomingBriefings,
      icon: Users,
      gradient: 'from-purple-400/20 to-purple-500/20',
      iconColour: 'text-purple-400',
      borderColour: 'border-purple-500/20',
      section: 'team-briefing',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Main Score Card */}
      <motion.div
        variants={itemVariants}
        className={`relative overflow-hidden rounded-2xl border ${safetyInfo.borderColour} ${safetyInfo.bgColour}`}
      >
        <div className="p-4">
          <div className="flex items-center gap-4">
            <ScoreRing score={safetyInfo.score} colour={safetyInfo.colour} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={`h-4 w-4 ${safetyInfo.colour}`} />
                <h3 className="text-sm font-bold text-white">Safety Score</h3>
              </div>
              <Badge
                className={`${safetyInfo.bgColour} ${safetyInfo.colour} border-none text-xs font-semibold mb-2`}
              >
                {safetyInfo.label}
              </Badge>

              {/* Quick status pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {stats.equipmentOverdue > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-[10px] text-red-300 font-medium">
                    <Clock className="h-2.5 w-2.5" />
                    {stats.equipmentOverdue} overdue
                  </span>
                )}
                {stats.completedBriefingsThisMonth > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-[10px] text-green-300 font-medium">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {stats.completedBriefingsThisMonth} briefings
                  </span>
                )}
                {stats.totalPhotosThisWeek > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/15 text-[10px] text-blue-300 font-medium">
                    <Camera className="h-2.5 w-2.5" />
                    {stats.totalPhotosThisWeek} photos
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 gap-2">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <motion.button
              key={stat.id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              onClick={() => onCardTap?.(stat.section)}
              className={`text-left p-3 rounded-xl border ${stat.borderColour} bg-gradient-to-br ${stat.gradient} touch-manipulation active:opacity-80 transition-opacity`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <IconComponent className={`h-4 w-4 ${stat.iconColour}`} />
                <span className="text-[11px] text-white/60 font-medium">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-white">{stat.value}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default SafetyDashboard;
