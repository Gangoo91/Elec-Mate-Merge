
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { Clock, AlertTriangle, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const TrialBanner = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, isDevelopmentMode, profile } = useAuth();

  // Small delay to prevent flash during state transitions (e.g., scroll-triggered re-renders)
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate days remaining in trial
  const getDaysRemaining = () => {
    if (!trialEndsAt) return 0;

    const now = new Date();
    const diffTime = trialEndsAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Don't show for subscribed users, dev mode, free access users (founders), or during initial render delay
  if (!shouldRender || isSubscribed || isDevelopmentMode || profile?.free_access_granted) {
    return null;
  }

  const daysRemaining = getDaysRemaining();
  const progressPercent = Math.max(0, Math.min(100, ((7 - daysRemaining) / 7) * 100));

  // Determine urgency level
  const isUrgent = daysRemaining <= 2;
  const isWarning = daysRemaining <= 4 && daysRemaining > 2;
  const isExpired = !isTrialActive;

  // Color scheme based on urgency
  const getColors = () => {
    if (isExpired) {
      return {
        border: 'border-red-500/30',
        bg: 'bg-red-500/5',
        text: 'text-red-400',
        progress: 'bg-red-500',
        icon: AlertTriangle,
      };
    }
    if (isUrgent) {
      return {
        border: 'border-orange-500/30',
        bg: 'bg-orange-500/5',
        text: 'text-orange-400',
        progress: 'bg-orange-500',
        icon: AlertTriangle,
      };
    }
    if (isWarning) {
      return {
        border: 'border-yellow-500/30',
        bg: 'bg-yellow-500/5',
        text: 'text-yellow-400',
        progress: 'bg-yellow-500',
        icon: Clock,
      };
    }
    return {
      border: 'border-elec-yellow/20',
      bg: 'bg-elec-yellow/5',
      text: 'text-elec-yellow',
      progress: 'bg-elec-yellow',
      icon: Sparkles,
    };
  };

  const colors = getColors();
  const StatusIcon = colors.icon;

  if (isExpired) {
    return (
      <Card className={cn("overflow-hidden", colors.border, colors.bg)}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={cn("p-3 rounded-xl", colors.bg, colors.border, "border")}>
              <StatusIcon className={cn("h-6 w-6", colors.text)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn("font-semibold text-base sm:text-lg", colors.text)}>
                Your Free Trial Has Ended
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Subscribe now to continue accessing all features and keep your progress.
              </p>
            </div>
            <Button asChild className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold">
              <Link to="/subscriptions">
                Subscribe Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", colors.border, colors.bg)}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={cn("p-2.5 rounded-xl", colors.bg, colors.border, "border")}>
              <StatusIcon className={cn("h-5 w-5", colors.text)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm sm:text-base text-white">
                  Free Trial
                </h3>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  colors.bg, colors.text, colors.border, "border"
                )}>
                  {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {isUrgent
                  ? "Your trial is ending soon! Upgrade to keep full access."
                  : isWarning
                  ? "Enjoying Elec-Mate? Lock in your access with a subscription."
                  : "Full access to all features. No credit card required."}
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant={isUrgent ? "default" : "outline"}
              className={cn(
                "w-full sm:w-auto",
                isUrgent
                  ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              )}
            >
              <Link to="/subscriptions">
                <Zap className="mr-2 h-4 w-4" />
                {isUrgent ? 'Upgrade Now' : 'See Plans'}
              </Link>
            </Button>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Trial progress</span>
              <span className={cn("font-medium", colors.text)}>
                Day {7 - daysRemaining + 1} of 7
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", colors.progress)}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialBanner;
