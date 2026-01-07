import { Card, CardContent } from "@/components/ui/card";
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
          bgClass: 'bg-emerald-500/20',
          textClass: 'text-emerald-400',
          borderClass: 'border-emerald-500/30'
        };
      case 'sparse':
      case 'minimum':
        return {
          label: 'MINIMUM',
          bgClass: 'bg-amber-500/20',
          textClass: 'text-amber-400',
          borderClass: 'border-amber-500/30'
        };
      default:
        return {
          label: 'STANDARD',
          bgClass: 'bg-elec-yellow/20',
          textClass: 'text-elec-yellow',
          borderClass: 'border-elec-yellow/30'
        };
    }
  };

  const tierConfig = getTierConfig(tier);

  return (
    <Card variant="ios-elevated" className="overflow-hidden">
      <CardContent className="p-0">
        {/* Hero Section with Glow */}
        <div className="relative p-6 pb-8 text-center">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-elec-yellow/10 blur-[60px]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 space-y-4">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-ios-caption-1 text-white/50 font-medium uppercase tracking-wider"
            >
              Recommended Quote
            </motion.p>

            {/* Main Price */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            >
              <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">
                {formatCurrency(displayAmount)}
              </span>
            </motion.div>

            {/* Tier Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className={`px-4 py-1.5 text-ios-caption-1 font-bold border ${tierConfig.bgClass} ${tierConfig.textClass} ${tierConfig.borderClass}`}>
                {tierConfig.label} TIER
              </Badge>
            </motion.div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-px bg-white/5">
          {/* Profit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-black/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-ios-caption-1 text-white/50">Profit</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400 tabular-nums">
              {formatCurrency(displayProfit)}
            </p>
          </motion.div>

          {/* Margin */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 bg-black/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-ios-caption-1 text-white/50">Margin</span>
            </div>
            <p className="text-2xl font-bold text-elec-yellow tabular-nums">
              {margin.toFixed(1)}%
            </p>
          </motion.div>

          {/* Profit Per Hour */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-black/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-ios-caption-1 text-white/50">Per Hour</span>
            </div>
            <p className="text-xl font-bold text-emerald-400 tabular-nums">
              {formatCurrency(profitPerHour)}/hr
            </p>
          </motion.div>

          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 bg-black/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-ios-caption-1 text-white/50">Confidence</span>
            </div>
            <p className="text-xl font-bold text-blue-400 tabular-nums">
              {confidence}%
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 py-3 bg-white/5 border-t border-white/5"
        >
          <p className="text-ios-caption-1 text-white/40 text-center">
            Based on <span className="font-semibold text-white/60">{totalLabourHours.toFixed(1)} hours</span> labour + materials
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuoteHeroCard;
