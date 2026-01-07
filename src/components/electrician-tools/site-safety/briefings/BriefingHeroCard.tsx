import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  Shield,
  FileCheck,
  Clock,
  Users,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number;
  icon: typeof Shield;
  color: "yellow" | "green" | "blue" | "purple";
  suffix?: string;
}

interface BriefingHeroCardProps {
  totalBriefings: number;
  thisWeek: number;
  pendingSignatures: number;
  signatureRate: number;
  onCreateBriefing: () => void;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const colorMap = {
    yellow: "from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30 text-elec-yellow",
    green: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-500",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-500",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-500",
  };

  const iconBgMap = {
    yellow: "bg-elec-yellow/20 text-elec-yellow",
    green: "bg-emerald-500/20 text-emerald-500",
    blue: "bg-blue-500/20 text-blue-500",
    purple: "bg-purple-500/20 text-purple-500",
  };

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-xl p-4",
        "bg-gradient-to-br border",
        "backdrop-blur-sm",
        colorMap[stat.color]
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", iconBgMap[stat.color])}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-white leading-none">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-xs text-white/60 mt-1 truncate">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function BriefingHeroCard({
  totalBriefings,
  thisWeek,
  pendingSignatures,
  signatureRate,
  onCreateBriefing,
}: BriefingHeroCardProps) {
  const stats: StatItem[] = [
    {
      label: "Total",
      value: totalBriefings,
      icon: Shield,
      color: "yellow",
    },
    {
      label: "This Week",
      value: thisWeek,
      icon: Clock,
      color: "green",
    },
    {
      label: "Pending",
      value: pendingSignatures,
      icon: Users,
      color: "blue",
    },
    {
      label: "Sign Rate",
      value: signatureRate,
      icon: FileCheck,
      color: "purple",
      suffix: "%",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-elec-gray/90 via-elec-gray to-elec-dark",
        "border border-white/10",
        "p-5 md:p-8"
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-elec-yellow/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30"
            >
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-3xl font-bold text-white"
              >
                Team Briefings
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-sm md:text-base"
              >
                Keep your team safe on site
              </motion.p>
            </div>
          </div>

          {/* Desktop sparkle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20"
          >
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <span className="text-xs text-elec-yellow font-medium">AI-Powered</span>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            onClick={onCreateBriefing}
            className={cn(
              "w-full h-14 text-base font-semibold",
              "bg-elec-yellow text-black hover:bg-elec-yellow/90",
              "shadow-lg shadow-elec-yellow/20",
              "transition-all duration-300",
              "hover:shadow-xl hover:shadow-elec-yellow/30",
              "active:scale-[0.98]"
            )}
          >
            <Plus className="h-5 w-5 mr-2" />
            New Briefing
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
