import { Badge } from "@/components/ui/badge";
import { TrendingUp, Coins } from "lucide-react";
import { motion } from "framer-motion";

interface PricingOptionsTiersProps {
  profitability?: any;
  selectedTier: string;
  explanation?: string;
  breakEven: number;
  totalLabourHours: number;
  projectType?: string;
  jobDescription?: string;
}

const PricingOptionsTiers = ({
  profitability,
  selectedTier,
  explanation,
  breakEven,
  totalLabourHours,
  projectType,
  jobDescription
}: PricingOptionsTiersProps) => {
  
  const standardPrice = profitability?.quoteTiers?.standard?.price || breakEven * 1.20;
  const busyPrice = profitability?.quoteTiers?.busy?.price || breakEven * 1.35;

  const calculateTierMetrics = (price: number) => {
    const profit = price - breakEven;
    const margin = price > 0 ? ((profit / price) * 100) : 0;
    const profitPerHour = totalLabourHours > 0 ? profit / totalLabourHours : 0;
    
    return { 
      margin: Math.max(0, margin),
      profit: Math.max(0, profit),
      profitPerHour: Math.max(0, profitPerHour)
    };
  };

  // Intelligent benchmark detection
  const getBenchmark = (projectType?: string, jobDescription?: string, targetPrice?: number) => {
    const desc = jobDescription?.toLowerCase() || '';
    
    // Domestic benchmarks
    if (projectType === 'domestic' || desc.includes('house') || desc.includes('flat') || desc.includes('home')) {
      if (desc.includes('rewire') || desc.includes('full rewire')) {
        return {
          name: '3-bed house full rewire',
          range: '£4,000-6,500',
          min: 4000,
          max: 6500
        };
      }
      if (desc.includes('consumer unit') || desc.includes('fuse board') || desc.includes('cu replacement')) {
        return {
          name: 'Consumer unit replacement',
          range: '£500-1,200',
          min: 500,
          max: 1200
        };
      }
      if (desc.includes('socket') || desc.includes('extension')) {
        return {
          name: 'Socket circuits & extensions',
          range: '£200-800',
          min: 200,
          max: 800
        };
      }
      // Default domestic
      return {
        name: 'Typical domestic work',
        range: '£500-3,000',
        min: 500,
        max: 3000
      };
    }
    
    // Commercial benchmarks
    if (projectType === 'commercial' || desc.includes('shop') || desc.includes('office') || desc.includes('restaurant') || desc.includes('kitchen') || desc.includes('commercial')) {
      if (desc.includes('restaurant') || desc.includes('kitchen') || desc.includes('catering')) {
        return {
          name: 'Commercial kitchen/restaurant',
          range: '£8,000-20,000',
          min: 8000,
          max: 20000
        };
      }
      if (desc.includes('shop') || desc.includes('retail')) {
        return {
          name: 'Small shop fit-out',
          range: '£3,000-8,000',
          min: 3000,
          max: 8000
        };
      }
      if (desc.includes('office')) {
        return {
          name: 'Office electrical refit',
          range: '£5,000-15,000',
          min: 5000,
          max: 15000
        };
      }
      // Default commercial
      return {
        name: 'Commercial installation',
        range: '£5,000-15,000',
        min: 5000,
        max: 15000
      };
    }
    
    // Industrial benchmarks
    if (projectType === 'industrial' || desc.includes('factory') || desc.includes('warehouse') || desc.includes('3-phase') || desc.includes('industrial')) {
      return {
        name: 'Industrial installation',
        range: '£10,000-50,000',
        min: 10000,
        max: 50000
      };
    }
    
    // Default fallback based on price
    if (targetPrice && targetPrice < 2000) {
      return {
        name: 'Small electrical job',
        range: '£200-2,000',
        min: 200,
        max: 2000
      };
    }
    
    return {
      name: 'General electrical work',
      range: '£1,000-10,000',
      min: 1000,
      max: 10000
    };
  };

  const benchmark = getBenchmark(projectType, jobDescription, standardPrice);

  const standard = calculateTierMetrics(standardPrice);
  const busy = calculateTierMetrics(busyPrice);

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shadow-md"
          >
            <Coins className="h-5 w-5 text-elec-yellow" />
          </motion.div>
          <div>
              <h3 className="text-base sm:text-lg text-white font-semibold">Pricing Options</h3>
              {explanation && (
                <p className="text-xs sm:text-sm text-white/50">{explanation}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Price Sanity Check */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-semibold text-white">Industry Benchmark</span>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs sm:text-sm text-white/50">{benchmark.name} typical range:</span>
                <div className="text-sm sm:text-base font-medium text-white">{benchmark.range}</div>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-white/50">This quote (Standard tier):</span>
                <div className={`text-sm sm:text-base font-bold ${
                  standardPrice < benchmark.min ? 'text-red-400' :
                  standardPrice > benchmark.max ? 'text-red-400' :
                  'text-emerald-400'
                }`}>
                  £{standardPrice.toFixed(0)}
                  {standardPrice < benchmark.min && ' — Below market'}
                  {standardPrice > benchmark.max && ' — Above market'}
                  {standardPrice >= benchmark.min && standardPrice <= benchmark.max && ' — Competitive'}
                </div>
              </div>
            </div>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                selectedTier === 'standard'
                  ? 'border-elec-yellow bg-elec-yellow/10'
                  : 'border-white/10 bg-black/20'
              }`}
            >
              <div className="text-center mb-3">
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs mb-2">
                  Standard 20%
                </Badge>
                <div className="text-3xl font-bold text-elec-yellow">£{standardPrice.toFixed(0)}</div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">Business margin</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Margin:</span>
                  <span className="font-medium text-white">{standard.margin.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Profit:</span>
                  <span className="font-medium text-emerald-400">£{standard.profit.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Per hour:</span>
                  <span className="font-medium text-white">£{standard.profitPerHour.toFixed(0)}</span>
                </div>
              </div>
            </motion.div>

            {/* Busy Period */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`p-4 rounded-xl border-2 ${
                selectedTier === 'busy'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 bg-black/20'
              }`}
            >
              <div className="text-center mb-3">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs mb-2">
                  Premium 35%
                </Badge>
                <div className="text-3xl font-bold text-white">£{busyPrice.toFixed(0)}</div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">High demand</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Margin:</span>
                  <span className="font-medium text-white">{busy.margin.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Profit:</span>
                  <span className="font-medium text-emerald-400">£{busy.profit.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Per hour:</span>
                  <span className="font-medium text-white">£{busy.profitPerHour.toFixed(0)}</span>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingOptionsTiers;
