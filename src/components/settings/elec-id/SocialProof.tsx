import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Heart,
  MessageSquare,
  Calendar,
  Zap,
  Star,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewerActivity {
  id: string;
  employerName: string;
  employerLogo?: string;
  location: string;
  viewedAt: Date;
  action?: "viewed" | "saved" | "contacted";
}

interface SocialProofStats {
  profileViews: number;
  profileViewsChange: number; // percentage change from last period
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

  // Animate view counter on mount
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

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats.profileViews]);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getActionIcon = (action?: string) => {
    switch (action) {
      case "saved":
        return <Heart className="h-3 w-3 text-pink-500" />;
      case "contacted":
        return <MessageSquare className="h-3 w-3 text-blue-500" />;
      default:
        return <Eye className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getActionLabel = (action?: string) => {
    switch (action) {
      case "saved":
        return "Saved your profile";
      case "contacted":
        return "Sent a message";
      default:
        return "Viewed your profile";
    }
  };

  return (
    <Card className={cn("border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Eye className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Profile Activity</CardTitle>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-0">
            Live
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Profile Views - Featured */}
          <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    {animatedViews}
                  </span>
                  <div
                    className={cn(
                      "flex items-center text-sm",
                      stats.profileViewsChange >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {stats.profileViewsChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(stats.profileViewsChange)}%
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 relative">
                {/* Mini activity graph */}
                <svg className="w-full h-full" viewBox="0 0 80 60">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                    points="5,45 15,35 25,40 35,25 45,30 55,15 65,20 75,10"
                  />
                  {/* Dots at data points */}
                  {[
                    [5, 45],
                    [15, 35],
                    [25, 40],
                    [35, 25],
                    [45, 30],
                    [55, 15],
                    [65, 20],
                    [75, 10],
                  ].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      className="fill-purple-500"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Saved by employers */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="text-xs text-muted-foreground">Saved</span>
            </div>
            <p className="text-2xl font-bold">{stats.savedByEmployers}</p>
          </div>

          {/* Contact requests */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Messages</span>
            </div>
            <p className="text-2xl font-bold">{stats.contactRequests}</p>
          </div>

          {/* Search appearances */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-xs text-muted-foreground">In Searches</span>
            </div>
            <p className="text-2xl font-bold">{stats.searchAppearances}</p>
          </div>

          {/* Area ranking */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Area Rank</span>
            </div>
            <p className="text-2xl font-bold">
              #{stats.rankInArea}
              <span className="text-sm text-muted-foreground font-normal">
                /{stats.totalInArea}
              </span>
            </p>
          </div>
        </div>

        {/* Recent viewers */}
        {recentViewers.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Activity
            </p>
            <div className="space-y-2">
              {recentViewers.slice(0, 4).map((viewer) => (
                <div
                  key={viewer.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <Avatar className="h-8 w-8">
                    {viewer.employerLogo ? (
                      <AvatarImage src={viewer.employerLogo} alt={viewer.employerName} />
                    ) : null}
                    <AvatarFallback className="bg-purple-500/20 text-purple-400 text-xs">
                      {viewer.employerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium truncate">
                        {viewer.employerName}
                      </p>
                      {getActionIcon(viewer.action)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{viewer.location}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(viewer.viewedAt)}</span>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground shrink-0">
                    {getActionLabel(viewer.action).split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>

            {recentViewers.length > 4 && (
              <button className="w-full text-center text-sm text-purple-400 hover:text-purple-300 py-2">
                View all {recentViewers.length} activities
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {recentViewers.length === 0 && (
          <div className="text-center py-6">
            <Building2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No recent activity yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Complete your profile to attract employers
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SocialProof;
