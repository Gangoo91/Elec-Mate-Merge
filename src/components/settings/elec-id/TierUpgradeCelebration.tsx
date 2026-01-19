import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Confetti, StarBurst } from "@/components/ui/confetti";
import {
  Shield,
  Award,
  Crown,
  CheckCircle2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Eye,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type VerificationTier = "basic" | "verified" | "premium";

interface TierUpgradeCelebrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previousTier: VerificationTier;
  newTier: VerificationTier;
  onContinue: () => void;
}

const TIER_CONFIG: Record<
  VerificationTier,
  {
    label: string;
    icon: typeof Shield;
    color: string;
    bgGradient: string;
    benefits: { icon: typeof Star; text: string }[];
  }
> = {
  basic: {
    label: "Basic",
    icon: Shield,
    color: "text-foreground/70",
    bgGradient: "from-gray-500/20 to-gray-600/20",
    benefits: [
      { icon: Users, text: "Listed in Talent Pool" },
      { icon: Eye, text: "Profile visible to employers" },
    ],
  },
  verified: {
    label: "Verified",
    icon: Shield,
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-blue-600/20",
    benefits: [
      { icon: CheckCircle2, text: "Verified badge on profile" },
      { icon: TrendingUp, text: "Priority in search results" },
      { icon: Users, text: "Employer notifications" },
    ],
  },
  premium: {
    label: "Premium",
    icon: Crown,
    color: "text-elec-yellow",
    bgGradient: "from-elec-yellow/20 to-amber-500/20",
    benefits: [
      { icon: Crown, text: "Premium badge & top listing" },
      { icon: Zap, text: "Instant employer alerts" },
      { icon: Star, text: "QR code verification" },
      { icon: Users, text: "Direct employer access" },
    ],
  },
};

export function TierUpgradeCelebration({
  open,
  onOpenChange,
  previousTier,
  newTier,
  onContinue,
}: TierUpgradeCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const tier = TIER_CONFIG[newTier];
  const TierIcon = tier.icon;

  // Trigger animations in sequence
  useEffect(() => {
    if (open) {
      // Reset state
      setAnimationStep(0);
      setShowConfetti(false);

      // Start confetti after a brief delay
      const confettiTimer = setTimeout(() => {
        setShowConfetti(true);
      }, 300);

      // Animate badge appearance
      const step1Timer = setTimeout(() => setAnimationStep(1), 400);
      const step2Timer = setTimeout(() => setAnimationStep(2), 800);
      const step3Timer = setTimeout(() => setAnimationStep(3), 1200);

      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(step1Timer);
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
      };
    }
  }, [open]);

  return (
    <>
      {/* Confetti overlay - outside dialog to cover full screen */}
      <Confetti active={showConfetti} duration={4000} particleCount={80} />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-gradient-to-b from-card to-background border-white/20 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={cn(
                "absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30",
                newTier === "premium" ? "bg-elec-yellow" : "bg-blue-500"
              )}
            />
            <div
              className={cn(
                "absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30",
                newTier === "premium" ? "bg-amber-500" : "bg-purple-500"
              )}
            />
          </div>

          <DialogHeader className="relative z-10 text-center pt-4">
            {/* Animated tier badge */}
            <div className="relative mx-auto mb-4">
              {/* Glow ring */}
              <div
                className={cn(
                  "absolute inset-0 rounded-full blur-xl opacity-50 transition-all duration-1000",
                  animationStep >= 1 ? "scale-100 opacity-50" : "scale-0 opacity-0",
                  newTier === "premium" ? "bg-elec-yellow" : "bg-blue-500"
                )}
                style={{ width: "120px", height: "120px", margin: "-10px" }}
              />

              {/* Main badge */}
              <div
                className={cn(
                  "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                  `bg-gradient-to-br ${tier.bgGradient}`,
                  animationStep >= 1
                    ? "scale-100 rotate-0"
                    : "scale-0 rotate-180"
                )}
              >
                <TierIcon
                  className={cn(
                    "h-12 w-12 transition-all duration-500",
                    tier.color,
                    animationStep >= 2 ? "scale-100" : "scale-0"
                  )}
                />

                {/* Star burst effect */}
                <StarBurst active={animationStep >= 2} count={12} />
              </div>
            </div>

            <DialogTitle className="text-2xl font-bold">
              <span
                className={cn(
                  "transition-all duration-500",
                  animationStep >= 2 ? "opacity-100" : "opacity-0"
                )}
              >
                Congratulations!
              </span>
            </DialogTitle>

            <p className="text-foreground/70 mt-2">
              <span
                className={cn(
                  "transition-all duration-500",
                  animationStep >= 2 ? "opacity-100" : "opacity-0"
                )}
              >
                You've unlocked{" "}
                <span className={cn("font-bold", tier.color)}>{tier.label}</span>{" "}
                status
              </span>
            </p>
          </DialogHeader>

          {/* Tier upgrade visual */}
          <div
            className={cn(
              "flex items-center justify-center gap-3 py-4 transition-all duration-500",
              animationStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Badge
              variant="outline"
              className={cn(
                "px-3 py-1.5",
                TIER_CONFIG[previousTier].color,
                "border-current/30"
              )}
            >
              {TIER_CONFIG[previousTier].label}
            </Badge>
            <div className="flex items-center">
              <div className="h-px w-8 bg-gradient-to-r from-muted-foreground/50 to-transparent" />
              <Sparkles className={cn("h-5 w-5 mx-1", tier.color)} />
              <div className="h-px w-8 bg-gradient-to-l from-muted-foreground/50 to-transparent" />
            </div>
            <Badge
              variant="outline"
              className={cn(
                "px-3 py-1.5 font-bold animate-pulse",
                tier.color,
                newTier === "premium"
                  ? "bg-elec-yellow/20 border-elec-yellow/30"
                  : "bg-blue-500/20 border-blue-500/30"
              )}
            >
              {tier.label}
            </Badge>
          </div>

          {/* New benefits */}
          <div
            className={cn(
              "space-y-2 transition-all duration-500",
              animationStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <p className="text-sm font-medium text-center text-foreground/70 mb-3">
              New benefits unlocked:
            </p>
            <div className="space-y-2">
              {tier.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-lg",
                      newTier === "premium"
                        ? "bg-elec-yellow/20"
                        : "bg-blue-500/20"
                    )}
                  >
                    <benefit.icon
                      className={cn(
                        "h-4 w-4",
                        newTier === "premium" ? "text-elec-yellow" : "text-blue-400"
                      )}
                    />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <Button
            className={cn(
              "w-full h-12 mt-4 font-semibold transition-all duration-500",
              newTier === "premium"
                ? "bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                : "bg-blue-500 hover:bg-blue-600 text-white",
              animationStep >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            onClick={onContinue}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TierUpgradeCelebration;
