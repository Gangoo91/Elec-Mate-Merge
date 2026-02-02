import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Check, Clock, FileCheck, Sparkles, ArrowRight, Zap, LucideIcon } from "lucide-react";
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
  const [showContent, setShowContent] = useState(false);
  const [iconBounced, setIconBounced] = useState(false);

  // Trigger effects when dialog opens
  useEffect(() => {
    if (open) {
      setShowContent(false);
      setIconBounced(false);

      const timer1 = setTimeout(() => setShowContent(true), 150);
      const timer2 = setTimeout(() => setIconBounced(true), 400);

      // Trigger confetti
      triggerConfetti(config.confettiColors);

      // Trigger haptic feedback
      triggerHaptic();

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [open, config.confettiColors]);

  const defaultStats: StatItem[] = stats || [
    { icon: FileCheck, value: "1", label: "Document" },
    { icon: Sparkles, value: "AI", label: "Powered" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-white/[0.08] p-0 overflow-hidden rounded-3xl shadow-2xl">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              {/* Background glow effect */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] opacity-30 blur-[80px] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, ${config.gradientFrom}, transparent 70%)`,
                }}
              />

              {/* Main content */}
              <div className="relative px-6 pt-10 pb-8">
                {/* Success Icon with ring animation */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1
                  }}
                  className="relative mx-auto w-24 h-24 mb-6"
                >
                  {/* Outer pulse ring */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />

                  {/* Inner glow ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-60 blur-md"
                    style={{
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />

                  {/* Main icon circle */}
                  <motion.div
                    animate={iconBounced ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(145deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      boxShadow: `0 8px 32px ${config.gradientFrom}50`,
                    }}
                  >
                    <Check className="h-12 w-12 text-black" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-[22px] font-bold text-white mb-2"
                >
                  {config.successTitle.replace('!', '')}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-center text-white/50 text-sm mb-6"
                >
                  Your professional document is ready to view
                </motion.p>

                {/* Stats Row - Compact horizontal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-6 mb-6"
                >
                  {defaultStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                        }}
                      >
                        <stat.icon
                          className="h-4 w-4"
                          style={{ color: config.gradientFrom }}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white leading-tight">{stat.value}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wide">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Time Saved Highlight */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mx-auto w-fit px-5 py-2.5 rounded-2xl mb-8"
                  style={{
                    background: `linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}10)`,
                    border: `1px solid ${config.gradientFrom}30`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" style={{ color: config.gradientFrom }} />
                    <span className="text-sm font-medium" style={{ color: config.gradientFrom }}>
                      ~{timeSavedMinutes} minutes saved
                    </span>
                    <Zap className="h-3.5 w-3.5" style={{ color: config.gradientFrom }} />
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={() => {
                      onOpenChange(false);
                      onViewResults();
                    }}
                    className={cn(
                      "w-full h-14 text-base font-semibold rounded-2xl",
                      "touch-manipulation active:scale-[0.98] transition-all duration-150",
                      "border-0 shadow-lg"
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      boxShadow: `0 8px 24px ${config.gradientFrom}40`,
                      color: "#000",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      View {config.resultsTitle}
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced confetti with more celebratory burst
function triggerConfetti(colors: string[]) {
  const defaults = {
    spread: 360,
    ticks: 70,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 30,
    colors: colors,
    origin: { y: 0.4 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(150 * particleRatio),
    });
  }

  // Initial burst
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  // Second wave after short delay
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 30,
      spread: 50,
      startVelocity: 40,
      origin: { x: 0.3, y: 0.5 }
    });
    confetti({
      ...defaults,
      particleCount: 30,
      spread: 50,
      startVelocity: 40,
      origin: { x: 0.7, y: 0.5 }
    });
  }, 200);
}

// Haptic feedback helper
function triggerHaptic() {
  if ("vibrate" in navigator) {
    navigator.vibrate([50, 30, 80]);
  }
}
