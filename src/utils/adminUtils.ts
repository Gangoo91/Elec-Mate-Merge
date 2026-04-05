/**
 * Shared utilities for admin panel components
 */

/**
 * Get initials from a name (first + last initial)
 * @example getInitials("John Doe") => "JD"
 * @example getInitials("John") => "J"
 * @example getInitials(null) => "?"
 */
export const getInitials = (name: string | null): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Role color configuration for consistent styling across admin components
 */
export const ROLE_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  apprentice: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  electrician: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  employer: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  college: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  visitor: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    badge: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
};

/**
 * Get role color configuration with fallback to visitor colors
 */
export const getRoleColor = (role: string | null | undefined) =>
  ROLE_COLORS[role?.toLowerCase() || ''] || ROLE_COLORS.visitor;

/**
 * Default role color for unknown/missing roles
 */
export const DEFAULT_ROLE_COLOR = ROLE_COLORS.visitor;

/* ── Engagement scoring ─────────────────────────────────────── */

export interface EngagementData {
  login_count: number;
  page_view_count: number;
  total_seconds_tracked: number;
  feature_use_count: number;
  active_days: number;
  unique_pages_visited: number;
}

/**
 * Calculate a 0-100 engagement score from activity summary data.
 *
 * Breakdown (max 100):
 *   Time     — 1pt per min, cap 30
 *   Features — 5pts per feature use, cap 25
 *   Logins   — 4pts per login, cap 20
 *   Pages    — 0.5pt per unique page, cap 15
 *   Days     — 3pts per active day, cap 10
 */
export const calculateEngagementScore = (e: EngagementData | null | undefined): number => {
  if (!e) return 0;
  const time = Math.min(30, (e.total_seconds_tracked / 60) * 1);
  const features = Math.min(25, e.feature_use_count * 5);
  const logins = Math.min(20, e.login_count * 4);
  const pages = Math.min(15, e.unique_pages_visited * 0.5);
  const days = Math.min(10, e.active_days * 3);
  return Math.round(time + features + logins + pages + days);
};

/** Red < 25, Amber 25-55, Green > 55 */
export const getScoreColor = (score: number): 'red' | 'amber' | 'green' =>
  score < 25 ? 'red' : score <= 55 ? 'amber' : 'green';

export const SCORE_COLOR_MAP = {
  red: { stroke: '#ef4444', text: 'text-red-400', bg: 'bg-red-500/15' },
  amber: { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-500/15' },
  green: { stroke: '#22c55e', text: 'text-green-400', bg: 'bg-green-500/15' },
} as const;

/** Compact time format: "12m", "2h", "1h 30m" */
export const formatTimeShort = (seconds: number): string => {
  if (!seconds || seconds === 0) return '0m';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};
