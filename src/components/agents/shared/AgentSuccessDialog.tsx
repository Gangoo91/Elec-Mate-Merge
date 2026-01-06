import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, FileText, Sparkles, ArrowRight, LucideIcon } from "lucide-react";
import { AgentType, AGENT_CONFIG } from "./AgentConfig";
import confetti from "canvas-confetti";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface AgentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentType: AgentType;
  onViewResults: () => void;
  stats?: StatItem[];
  timeSavedMinutes?: number;
}

export function AgentSuccessDialog({
  open,
  onOpenChange,
  agentType,
  onViewResults,
  stats,
  timeSavedMinutes = 30,
}: AgentSuccessDialogProps) {
  const config = AGENT_CONFIG[agentType];
  const Icon = config.icon;
  const [showContent, setShowContent] = useState(false);

  // Trigger effects when dialog opens
  useEffect(() => {
    if (open) {
      // Delay content appearance for animation
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 100);

      // Trigger confetti
      triggerConfetti(config.confettiColors);

      // Trigger haptic feedback
      triggerHaptic();

      return () => clearTimeout(timer);
    }
  }, [open, config.confettiColors]);

  const defaultStats: StatItem[] = stats || [
    { icon: FileText, value: "1", label: "Document" },
    { icon: Clock, value: `${timeSavedMinutes}min`, label: "Saved" },
    { icon: Check, value: "100%", label: "Complete" },
    { icon: Sparkles, value: "AI", label: "Generated" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-white/10 p-0 overflow-hidden">
        {/* Success Header with Gradient */}
        <div
          className="relative pt-8 pb-6 px-6"
          style={{
            background: `linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}15)`,
          }}
        >
          {/* Glow effect behind icon */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-40"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            }}
          />

          {/* Animated success icon */}
          <div
            className={cn(
              "relative mx-auto w-20 h-20 rounded-full flex items-center justify-center",
              "transition-all duration-500 ease-out",
              showContent ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              boxShadow: `0 0 40px ${config.gradientFrom}60`,
            }}
          >
            <Check className="h-10 w-10 text-black animate-bounce-subtle" />
          </div>

          <DialogHeader className="mt-4">
            <DialogTitle
              className={cn(
                "text-center text-xl font-bold transition-all duration-500 delay-150",
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {config.successTitle}
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Stats Grid */}
        <div
          className={cn(
            "px-6 py-4 transition-all duration-500 delay-300",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="grid grid-cols-2 gap-3">
            {defaultStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-3 text-center border border-white/10"
              >
                <stat.icon className="h-5 w-5 mx-auto mb-1 text-white/60" />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Time Saved Badge */}
          <div className="flex justify-center mt-4">
            <Badge
              className="px-4 py-1.5 text-sm font-medium border-0"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                color: config.gradientFrom,
              }}
            >
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              ~{timeSavedMinutes} minutes saved
            </Badge>
          </div>
        </div>

        {/* Action Button */}
        <div
          className={cn(
            "px-6 pb-6 transition-all duration-500 delay-500",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button
            onClick={() => {
              onOpenChange(false);
              onViewResults();
            }}
            className="w-full h-14 text-base font-semibold rounded-xl touch-manipulation active:scale-[0.98] transition-all duration-150"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              boxShadow: `0 4px 20px ${config.gradientFrom}40`,
              color: "#000",
            }}
          >
            View {config.resultsTitle}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Confetti helper
function triggerConfetti(colors: string[]) {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    colors: colors,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// Haptic feedback helper
function triggerHaptic() {
  if ("vibrate" in navigator) {
    navigator.vibrate([50, 50, 100]);
  }
}
