import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface QuoteHeroCardProps {
  amount: number;
  tier: string;
  profit: number;
  margin: number;
  profitPerHour: number;
  confidence: number;
  totalLabourHours: number;
}

const QuoteHeroCard = ({
  amount,
  tier,
  profit,
  margin,
  profitPerHour,
  confidence,
  totalLabourHours
}: QuoteHeroCardProps) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [displayProfit, setDisplayProfit] = useState(0);

  // Animated count-up effect
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const amountStep = amount / steps;
    const profitStep = profit / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setDisplayAmount(Math.min(amountStep * current, amount));
      setDisplayProfit(Math.min(profitStep * current, profit));
      if (current >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [amount, profit]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTierConfig = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'busy':
      case 'premium':
        return {
          label: 'PREMIUM',
          gradient: 'from-emerald-500/30 to-emerald-600/20',
          textClass: 'text-emerald-400',
          iconBg: 'bg-emerald-500/20',
          badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
        };
      case 'sparse':
      case 'minimum':
        return {
          label: 'MINIMUM',
          gradient: 'from-amber-500/30 to-amber-600/20',
          textClass: 'text-amber-400',
          iconBg: 'bg-amber-500/20',
          badge: 'bg-amber-500/20 border-amber-500/40 text-amber-400'
        };
      default:
        return {
          label: 'STANDARD',
          gradient: 'from-elec-yellow/30 to-amber-500/20',
          textClass: 'text-elec-yellow',
          iconBg: 'bg-elec-yellow/20',
          badge: 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow'
        };
    }
  };

  const tierConfig = getTierConfig(tier);

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* Hero Section */}
      <div className={`relative p-6 bg-gradient-to-br ${tierConfig.gradient}`}>
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-50"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 space-y-4">
          {/* Top Row: Label + Badge */}
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Recommended Quote
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className={`px-3 py-1 text-xs font-bold border-2 ${tierConfig.badge}`}>
                {tierConfig.label}
              </Badge>
            </motion.div>
          </div>

          {/* Main Price - Left Aligned */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="text-left"
          >
            <span className="text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
              {formatCurrency(displayAmount)}
            </span>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-semibold text-white"
          >
            Based on {totalLabourHours.toFixed(1)} hours labour + materials
          </motion.p>
        </div>
      </div>

      {/* Metrics Grid - Mobile First */}
      <div className="grid grid-cols-2 gap-0.5 bg-white/5 p-0.5">
        {/* Profit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-5 rounded-lg"
        >
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shadow-md">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Profit</span>
            </div>
            <p className="text-3xl font-black text-emerald-400 tabular-nums tracking-tight">
              {formatCurrency(displayProfit)}
            </p>
          </div>
        </motion.div>

        {/* Margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-5 rounded-lg"
        >
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-elec-yellow/20 flex items-center justify-center shadow-md">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Margin</span>
            </div>
            <p className="text-3xl font-black text-elec-yellow tabular-nums tracking-tight">
              {margin.toFixed(1)}%
            </p>
          </div>
        </motion.div>

        {/* Profit Per Hour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-5 rounded-lg"
        >
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shadow-md">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Per Hour</span>
            </div>
            <p className="text-2xl font-black text-emerald-400 tabular-nums tracking-tight">
              {formatCurrency(profitPerHour)}/hr
            </p>
          </div>
        </motion.div>

        {/* Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-5 rounded-lg"
        >
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shadow-md">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Confidence</span>
            </div>
            <p className="text-2xl font-black text-blue-400 tabular-nums tracking-tight">
              {confidence}%
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteHeroCard;
