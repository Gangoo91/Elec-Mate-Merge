import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  AlertTriangle,
  Users,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Clock,
  Activity,
  Lock,
  FlaskConical,
  ClipboardCheck,
  BookOpen,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';
import type { RecentDocument } from '@/hooks/useSafetyDashboardStats';
import { GettingStartedCard } from './GettingStartedCard';

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
  activePermits: number;
  coshhOverdueReviews: number;
  recentInspectionsPassed: number;
  recentInspectionsFailed: number;
  accidentCount30Days: number;
}

interface SafetyDashboardProps {
  stats: DashboardStats;
  isLoading?: boolean;
  onCardTap?: (section: string) => void;
  recentDocuments?: RecentDocument[];
  isLoadingDocuments?: boolean;
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
  strokeColour: string;
  glowColour: string;
} {
  let score = 100;

  if (stats.equipmentOverdue > 0) score -= Math.min(stats.equipmentOverdue * 10, 30);
  if (stats.equipmentDue > 0) score -= Math.min(stats.equipmentDue * 3, 10);
  if (stats.completedBriefingsThisMonth === 0 && stats.upcomingBriefings === 0) score -= 10;
  if (stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss < 7) score -= 10;
  if (stats.coshhOverdueReviews > 0) score -= Math.min(stats.coshhOverdueReviews * 5, 15);
  if (stats.accidentCount30Days > 0) score -= Math.min(stats.accidentCount30Days * 8, 20);
  if (stats.recentInspectionsFailed > 0) score -= Math.min(stats.recentInspectionsFailed * 5, 15);

  if (stats.activeRams > 0) score = Math.min(score + 5, 100);
  if (stats.totalPhotosThisWeek > 0) score = Math.min(score + 3, 100);
  if (stats.recentInspectionsPassed > 0) score = Math.min(score + 3, 100);
  if (stats.activePermits > 0) score = Math.min(score + 2, 100);

  score = Math.max(0, Math.min(100, score));

  if (score >= 90) {
    return { score, label: 'Excellent', colour: 'text-green-400', strokeColour: '#4ade80', glowColour: 'rgba(74,222,128,0.15)' };
  } else if (score >= 70) {
    return { score, label: 'Good', colour: 'text-emerald-400', strokeColour: '#34d399', glowColour: 'rgba(52,211,153,0.15)' };
  } else if (score >= 50) {
    return { score, label: 'Needs Attention', colour: 'text-amber-400', strokeColour: '#fbbf24', glowColour: 'rgba(251,191,36,0.15)' };
  } else {
    return { score, label: 'Action Required', colour: 'text-red-400', strokeColour: '#f87171', glowColour: 'rgba(248,113,113,0.15)' };
  }
}

function ScoreRing({ score, strokeColour, glowColour }: { score: number; strokeColour: string; glowColour: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-[100px] h-[100px] flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={strokeColour}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 6px ${glowColour})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-black text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-white -mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

const DOC_CONFIG: Record<string, { icon: React.ElementType; colour: string; gradient: string; navTarget: string }> = {
  rams: { icon: FileText, colour: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/20', navTarget: 'saved-rams' },
  permit: { icon: Lock, colour: 'text-amber-400', gradient: 'from-amber-500/20 to-amber-600/20', navTarget: 'permit-to-work' },
  inspection: { icon: ClipboardCheck, colour: 'text-indigo-400', gradient: 'from-indigo-500/20 to-indigo-600/20', navTarget: 'inspection-checklists' },
  coshh: { icon: FlaskConical, colour: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20', navTarget: 'coshh' },
  accident: { icon: BookOpen, colour: 'text-red-400', gradient: 'from-red-500/20 to-rose-500/20', navTarget: 'accident-book' },
  briefing: { icon: Users, colour: 'text-purple-400', gradient: 'from-purple-500/20 to-purple-600/20', navTarget: 'team-briefing' },
};

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function SafetyDashboard({
  stats,
  isLoading,
  onCardTap,
  recentDocuments,
  isLoadingDocuments,
}: SafetyDashboardProps) {
  const safetyInfo = useMemo(() => calculateSafetyScore(stats), [stats]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-[140px] rounded-2xl bg-white/[0.03] animate-pulse" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[72px] rounded-xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Show getting started card when all stats are zero
  const totalActivity =
    stats.activeRams +
    stats.totalNearMisses +
    stats.equipmentTotal +
    stats.completedBriefingsThisMonth +
    stats.upcomingBriefings +
    stats.totalPhotosThisWeek +
    stats.activePermits +
    stats.recentInspectionsPassed +
    stats.recentInspectionsFailed +
    stats.accidentCount30Days;

  if (totalActivity === 0) {
    return <GettingStartedCard onAction={(section) => onCardTap?.(section)} />;
  }

  // Build alerts for status pills
  const alerts: { text: string; icon: React.ElementType; colour: string }[] = [];
  if (stats.equipmentOverdue > 0) alerts.push({ text: `${stats.equipmentOverdue} overdue`, icon: Clock, colour: 'bg-red-500/15 text-red-300' });
  if (stats.activePermits > 0) alerts.push({ text: `${stats.activePermits} active permit${stats.activePermits > 1 ? 's' : ''}`, icon: Lock, colour: 'bg-green-500/15 text-green-300' });
  if (stats.coshhOverdueReviews > 0) alerts.push({ text: `${stats.coshhOverdueReviews} COSHH due`, icon: FlaskConical, colour: 'bg-amber-500/15 text-amber-300' });
  if (stats.completedBriefingsThisMonth > 0) alerts.push({ text: `${stats.completedBriefingsThisMonth} briefing${stats.completedBriefingsThisMonth > 1 ? 's' : ''} done`, icon: CheckCircle2, colour: 'bg-green-500/15 text-green-300' });
  if (stats.accidentCount30Days > 0) alerts.push({ text: `${stats.accidentCount30Days} accident${stats.accidentCount30Days > 1 ? 's' : ''} (30d)`, icon: AlertTriangle, colour: 'bg-red-500/15 text-red-300' });

  const statCards = [
    {
      label: 'RAMS',
      value: stats.activeRams,
      icon: FileText,
      iconColour: 'text-orange-400',
      bg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      border: 'border-orange-500/15',
      section: 'saved-rams',
    },
    {
      label: 'Days Safe',
      value: stats.daysSinceLastNearMiss !== null ? stats.daysSinceLastNearMiss : '–',
      icon: stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30 ? TrendingUp : AlertTriangle,
      iconColour: stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30 ? 'text-green-400' : 'text-amber-400',
      bg: stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30 ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
      border: stats.daysSinceLastNearMiss !== null && stats.daysSinceLastNearMiss > 30 ? 'border-green-500/15' : 'border-amber-500/15',
      section: 'near-miss',
    },
    {
      label: 'Equipment',
      value: stats.equipmentDue + stats.equipmentOverdue,
      icon: Wrench,
      iconColour: stats.equipmentOverdue > 0 ? 'text-red-400' : 'text-cyan-400',
      bg: stats.equipmentOverdue > 0 ? 'bg-gradient-to-br from-red-500/10 to-rose-500/10' : 'bg-gradient-to-br from-cyan-500/10 to-teal-500/10',
      border: stats.equipmentOverdue > 0 ? 'border-red-500/15' : 'border-cyan-500/15',
      section: 'equipment',
    },
    {
      label: 'Briefings',
      value: stats.upcomingBriefings,
      icon: Users,
      iconColour: 'text-purple-400',
      bg: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10',
      border: 'border-purple-500/15',
      section: 'team-briefing',
    },
    {
      label: 'Permits',
      value: stats.activePermits,
      icon: Lock,
      iconColour: 'text-amber-400',
      bg: 'bg-gradient-to-br from-amber-500/10 to-amber-600/10',
      border: 'border-amber-500/15',
      section: 'permit-to-work',
    },
    {
      label: 'Inspections',
      value: stats.recentInspectionsPassed + stats.recentInspectionsFailed,
      icon: ClipboardCheck,
      iconColour: stats.recentInspectionsFailed > 0 ? 'text-red-400' : 'text-indigo-400',
      bg: stats.recentInspectionsFailed > 0 ? 'bg-gradient-to-br from-red-500/10 to-rose-500/10' : 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10',
      border: stats.recentInspectionsFailed > 0 ? 'border-red-500/15' : 'border-indigo-500/15',
      section: 'inspection-checklists',
    },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
      {/* Score Card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: safetyInfo.glowColour }}
        />

        <div className="relative p-4">
          <div className="flex items-center gap-4">
            <ScoreRing
              score={safetyInfo.score}
              strokeColour={safetyInfo.strokeColour}
              glowColour={safetyInfo.glowColour}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className={`h-4 w-4 ${safetyInfo.colour}`} />
                <h3 className="text-sm font-bold text-white">Safety Score</h3>
              </div>
              <Badge
                className={`${safetyInfo.colour} bg-white/[0.06] border-none text-xs font-bold`}
              >
                {safetyInfo.label}
              </Badge>

              {/* Status pills */}
              {alerts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {alerts.slice(0, 3).map((alert, i) => {
                    const Icon = alert.icon;
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${alert.colour}`}
                      >
                        <Icon className="h-2.5 w-2.5" />
                        {alert.text}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid — 3 columns, 2 rows */}
      <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.label}
              variants={itemVariants}
              whileTap={{ scale: 0.96 }}
              onClick={() => onCardTap?.(stat.section)}
              className={`text-left p-3 rounded-xl border ${stat.border} ${stat.bg} touch-manipulation active:opacity-80 transition-opacity min-h-[72px] flex flex-col justify-between`}
            >
              <Icon className={`h-4.5 w-4.5 ${stat.iconColour} mb-1.5`} />
              <div>
                <span className="text-lg font-bold text-white block leading-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] text-white font-medium">{stat.label}</span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Recent Documents */}
      {!isLoadingDocuments && recentDocuments && recentDocuments.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white">Recent Documents</h3>
            </div>
            <button
              onClick={() => onCardTap?.('saved-rams')}
              className="text-[11px] text-elec-yellow font-medium flex items-center gap-0.5 touch-manipulation h-8 px-2 -mr-2 rounded-lg active:opacity-70"
            >
              View all
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-1.5">
            {recentDocuments.map((doc) => {
              const config = DOC_CONFIG[doc.type] || DOC_CONFIG.rams;
              const DocIcon = config.icon;
              return (
                <motion.button
                  key={`${doc.type}-${doc.id}`}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCardTap?.(config.navTarget)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] active:bg-white/[0.05] transition-colors touch-manipulation"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${config.gradient} flex-shrink-0`}>
                    <DocIcon className={`h-4 w-4 ${config.colour}`} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[13px] font-semibold text-white truncate">{doc.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-white capitalize">{doc.type}</span>
                      {doc.status && (
                        <>
                          <span className="text-white">·</span>
                          <span className="text-[10px] text-white capitalize">{doc.status}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-white flex-shrink-0">
                    {formatRelativeDate(doc.date)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Loading documents skeleton */}
      {isLoadingDocuments && (
        <div className="space-y-2">
          <div className="h-4 w-32 bg-white/[0.05] rounded animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default SafetyDashboard;
