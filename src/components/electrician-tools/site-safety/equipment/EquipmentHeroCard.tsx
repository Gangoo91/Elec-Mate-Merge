import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  Wrench,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number;
  icon: typeof Wrench;
  color: "yellow" | "green" | "amber" | "red";
}

interface EquipmentHeroCardProps {
  totalEquipment: number;
  goodCount: number;
  attentionCount: number;
  overdueCount: number;
  onAddEquipment: () => void;
}

function AnimatedCounter({ value }: { value: number }) {
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

  return <span className="tabular-nums">{displayValue}</span>;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const colorMap = {
    yellow: "from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30 text-elec-yellow",
    green: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-500",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-500",
    red: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-500",
  };

  const iconBgMap = {
    yellow: "bg-elec-yellow/20 text-elec-yellow",
    green: "bg-emerald-500/20 text-emerald-500",
    amber: "bg-amber-500/20 text-amber-500",
    red: "bg-red-500/20 text-red-500",
  };

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-lg p-2.5",
        "bg-gradient-to-br border",
        "backdrop-blur-sm",
        colorMap[stat.color]
      )}
    >
      <div className="flex flex-col items-center text-center gap-1">
        <div className={cn("p-1.5 rounded-lg", iconBgMap[stat.color])}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <p className="text-lg font-bold text-white leading-none">
          <AnimatedCounter value={stat.value} />
        </p>
        <p className="text-[9px] text-white uppercase tracking-wide">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export function EquipmentHeroCard({
  totalEquipment,
  goodCount,
  attentionCount,
  overdueCount,
  onAddEquipment,
}: EquipmentHeroCardProps) {
  const stats: StatItem[] = [
    {
      label: "Total",
      value: totalEquipment,
      icon: Wrench,
      color: "yellow",
    },
    {
      label: "Good",
      value: goodCount,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Attention",
      value: attentionCount,
      icon: AlertTriangle,
      color: "amber",
    },
    {
      label: "Overdue",
      value: overdueCount,
      icon: AlertCircle,
      color: "red",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent",
        "border border-white/[0.08]",
        "p-3"
      )}
    >
      {/* Background decoration - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-32 h-32 rounded-full bg-elec-yellow/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {/* Header - compact */}
        <div className="flex items-center gap-2.5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30"
          >
            <Wrench className="h-5 w-5 text-elec-yellow" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base font-bold text-white"
            >
              Equipment Tracker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-[10px]"
            >
              Track PPE & safety equipment
            </motion.p>
          </div>
        </div>

        {/* Stats Grid - 4 columns on mobile */}
        <div className="grid grid-cols-4 gap-1.5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Button - compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onAddEquipment}
            className={cn(
              "w-full h-10 text-sm font-semibold",
              "bg-elec-yellow text-black hover:bg-elec-yellow/90",
              "shadow-lg shadow-elec-yellow/20",
              "transition-all duration-300",
              "active:scale-[0.98]"
            )}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Equipment
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
