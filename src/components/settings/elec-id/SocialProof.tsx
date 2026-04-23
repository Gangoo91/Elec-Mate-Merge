import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ViewerActivity {
  id: string;
  employerName: string;
  employerLogo?: string;
  location: string;
  viewedAt: Date;
  action?: 'viewed' | 'saved' | 'contacted';
}

interface SocialProofStats {
  profileViews: number;
  profileViewsChange: number;
  savedByEmployers: number;
  contactRequests: number;
  searchAppearances: number;
  rankInArea: number;
  totalInArea: number;
}

interface SocialProofProps {
  stats: SocialProofStats;
  recentViewers: ViewerActivity[];
  className?: string;
}

export function SocialProof({ stats, recentViewers, className }: SocialProofProps) {
  const [animatedViews, setAnimatedViews] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = stats.profileViews / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), stats.profileViews);
      setAnimatedViews(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats.profileViews]);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getActionLabel = (action?: string) => {
    switch (action) {
      case 'saved':
        return 'Saved';
      case 'contacted':
        return 'Contacted';
      default:
        return 'Viewed';
    }
  };

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden p-5 space-y-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Profile activity
          </div>
          <div className="mt-1 text-base font-semibold text-white">Last 30 days</div>
        </div>
        <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-sm text-white">Profile views</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-white tabular-nums">{animatedViews}</span>
            <span className={cn('text-sm', stats.profileViewsChange >= 0 ? 'text-emerald-400' : 'text-red-400')}>
              {stats.profileViewsChange >= 0 ? '▲' : '▼'} {Math.abs(stats.profileViewsChange)}%
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-xs text-white">Saved</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{stats.savedByEmployers}</p>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-xs text-white">Messages</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{stats.contactRequests}</p>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-xs text-white">In searches</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{stats.searchAppearances}</p>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-xs text-white">Area rank</p>
          <p className="text-2xl font-semibold text-white tabular-nums">
            #{stats.rankInArea}
            <span className="text-sm text-white font-normal"> / {stats.totalInArea}</span>
          </p>
        </div>
      </div>

      {recentViewers.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Recent activity
          </div>
          <div className="space-y-2">
            {recentViewers.slice(0, 4).map((viewer) => (
              <div
                key={viewer.id}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]"
              >
                <Avatar className="h-8 w-8">
                  {viewer.employerLogo ? (
                    <AvatarImage src={viewer.employerLogo} alt={viewer.employerName} />
                  ) : null}
                  <AvatarFallback className="bg-purple-500/20 text-purple-400 text-xs">
                    {viewer.employerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{viewer.employerName}</p>
                  <p className="text-xs text-white truncate">
                    {viewer.location} · {formatTimeAgo(viewer.viewedAt)}
                  </p>
                </div>
                <span className="text-xs text-white shrink-0">{getActionLabel(viewer.action)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentViewers.length === 0 && (
        <div className="text-center py-6">
          <p className="text-sm text-white">No recent activity yet</p>
          <p className="text-xs text-white mt-1">Complete your profile to attract employers</p>
        </div>
      )}
    </div>
  );
}

export default SocialProof;
