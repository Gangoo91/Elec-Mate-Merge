import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileStrengthItem {
  id: string;
  label: string;
  description: string;
  points: number;
  completed: boolean;
  action?: () => void;
}

interface ProfileStrengthProps {
  items: ProfileStrengthItem[];
  currentTier: "basic" | "verified" | "premium";
  className?: string;
}

const TIER_CONFIG = {
  basic: {
    label: "Basic",
    color: "text-foreground/70",
    bg: "bg-muted",
    icon: Shield,
    minPoints: 0,
  },
  verified: {
    label: "Verified",
    color: "text-blue-500",
    bg: "bg-blue-500/20",
    icon: Shield,
    minPoints: 50,
  },
  premium: {
    label: "Premium",
    color: "text-elec-yellow",
    bg: "bg-elec-yellow/20",
    icon: Award,
    minPoints: 80,
  },
};

const MILESTONES = [
  { points: 25, label: "Getting Started", reward: "Basic listing" },
  { points: 50, label: "Verified", reward: "Verified badge" },
  { points: 75, label: "Almost Premium", reward: "Priority search" },
  { points: 100, label: "Premium", reward: "Top listing + employer alerts" },
];

export function ProfileStrength({
  items,
  currentTier,
  className,
}: ProfileStrengthProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showMilestoneUnlock, setShowMilestoneUnlock] = useState<number | null>(null);

  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);
  const earnedPoints = items
    .filter((item) => item.completed)
    .reduce((sum, item) => sum + item.points, 0);
  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  const tier = TIER_CONFIG[currentTier];
  const TierIcon = tier.icon;

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Check for milestone unlocks
  useEffect(() => {
    const unlockedMilestone = MILESTONES.find(
      (m) => earnedPoints >= m.points && earnedPoints - items.find((i) => i.completed)?.points! < m.points
    );
    if (unlockedMilestone) {
      setShowMilestoneUnlock(unlockedMilestone.points);
      setTimeout(() => setShowMilestoneUnlock(null), 3000);
    }
  }, [earnedPoints, items]);

  const nextMilestone = MILESTONES.find((m) => earnedPoints < m.points);
  const pointsToNext = nextMilestone ? nextMilestone.points - earnedPoints : 0;

  return (
    <Card className={cn("border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg", tier.bg)}>
              <TierIcon className={cn("h-5 w-5", tier.color)} />
            </div>
            <div>
              <CardTitle className="text-lg">Profile Strength</CardTitle>
              <p className="text-xs text-foreground/70">
                Complete actions to boost visibility
              </p>
            </div>
          </div>
          <Badge variant="outline" className={cn(tier.bg, tier.color, "border-0")}>
            {tier.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress ring and score */}
        <div className="flex items-center gap-4">
          {/* Circular progress indicator */}
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="text-elec-yellow transition-all duration-1000 ease-out"
                strokeDasharray={220}
                strokeDashoffset={220 - (220 * animatedProgress) / 100}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </div>

          {/* Score details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {earnedPoints}
              </span>
              <span className="text-sm text-foreground/70">
                / {totalPoints} points
              </span>
            </div>

            {nextMilestone && (
              <div className="flex items-center gap-2 text-sm">
                <Gift className="h-4 w-4 text-elec-yellow" />
                <span className="text-foreground/70">
                  {pointsToNext} points to{" "}
                  <span className="text-foreground font-medium">
                    {nextMilestone.label}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Milestone progress bar */}
        <div className="relative">
          <Progress value={animatedProgress} className="h-2" />
          <div className="flex justify-between mt-1">
            {MILESTONES.map((milestone, index) => (
              <div
                key={milestone.points}
                className={cn(
                  "flex flex-col items-center",
                  index === 0 && "items-start",
                  index === MILESTONES.length - 1 && "items-end"
                )}
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-full border-2 -mt-2.5 bg-background",
                    earnedPoints >= milestone.points
                      ? "border-elec-yellow bg-elec-yellow"
                      : "border-muted-foreground"
                  )}
                />
                <span className="text-[10px] text-foreground/70 mt-1">
                  {milestone.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
            Actions to boost your profile
          </p>
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                item.completed
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-foreground/70 shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-medium text-sm",
                    item.completed && "text-green-500"
                  )}
                >
                  {item.label}
                </p>
                <p className="text-xs text-foreground/70 truncate">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    item.completed
                      ? "bg-green-500/20 text-green-400 border-0"
                      : "bg-elec-yellow/20 text-elec-yellow border-0"
                  )}
                >
                  +{item.points} pts
                </Badge>

                {!item.completed && item.action && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={item.action}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Milestone unlock notification */}
        {showMilestoneUnlock && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="flex items-center gap-3 px-4 py-3 bg-elec-yellow text-elec-dark rounded-xl shadow-lg">
              <Sparkles className="h-5 w-5" />
              <div>
                <p className="font-bold">
                  {MILESTONES.find((m) => m.points === showMilestoneUnlock)?.label}{" "}
                  Unlocked!
                </p>
                <p className="text-xs opacity-80">
                  {MILESTONES.find((m) => m.points === showMilestoneUnlock)?.reward}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileStrength;
