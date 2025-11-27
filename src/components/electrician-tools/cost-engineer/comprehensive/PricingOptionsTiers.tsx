import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock } from "lucide-react";

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
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-white">Pricing Options</CardTitle>
        {explanation && (
          <p className="text-base sm:text-sm text-white mt-2">{explanation}</p>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        {/* Price Sanity Check */}
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-5 sm:p-4 mb-6">
          <h4 className="font-bold text-white text-lg sm:text-base mb-3 sm:mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 sm:h-4 sm:w-4 text-blue-400" />
            Industry Benchmark Check
          </h4>
          <div className="space-y-4 text-base sm:text-sm text-left">
            <div className="space-y-1">
              <span className="text-white/70 text-sm">{benchmark.name} typical range:</span>
              <div className="font-medium text-white text-lg">{benchmark.range}</div>
            </div>
            <div className="space-y-1">
              <span className="text-white/70 text-sm">This quote (Standard tier):</span>
              <div className={`font-bold text-lg ${
                standardPrice < benchmark.min ? 'text-red-500' : 
                standardPrice > benchmark.max ? 'text-red-500' : 
                'text-green-600'
              }`}>
                £{standardPrice.toFixed(0)}
                {standardPrice < benchmark.min && ' ⚠️ Below market rate'}
                {standardPrice > benchmark.max && ' ⚠️ Above market rate'}
                {standardPrice >= benchmark.min && standardPrice <= benchmark.max && ' ✅ Within range'}
              </div>
            </div>
            <div className="text-sm text-white mt-3 pt-3 border-t border-blue-500/20">
              {standardPrice < benchmark.min && 'Consider if materials or labour are underestimated'}
              {standardPrice > benchmark.max && 'Review for over-specification or excessive margins'}
              {standardPrice >= benchmark.min && standardPrice <= benchmark.max && 'Competitive pricing for your region'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Standard */}
          <div className={`p-5 sm:p-4 rounded-xl border-2 ${
            selectedTier === 'standard' 
              ? 'border-primary bg-primary/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-4 sm:mb-3">
              <Badge className="bg-primary/30 text-primary border-primary/50 mb-2">
                Standard (20%) ⭐
              </Badge>
              <div className="text-5xl sm:text-4xl font-bold text-primary">£{standardPrice.toFixed(0)}</div>
              <div className="text-sm sm:text-xs text-white mt-1">Healthy business margin</div>
            </div>
            
            <div className="space-y-2 text-base sm:text-sm">
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Profit Margin:</span>
                <span className="font-medium text-white whitespace-nowrap">{standard.margin.toFixed(0)}%</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Your Profit:</span>
                <span className="font-medium text-green-500 whitespace-nowrap">£{standard.profit.toFixed(0)}</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Profit/hour:</span>
                <span className="font-medium text-white whitespace-nowrap">£{standard.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Busy Period */}
          <div className={`p-5 sm:p-4 rounded-xl border-2 ${
            selectedTier === 'busy' 
              ? 'border-primary bg-primary/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-4 sm:mb-3">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 mb-2">
                Busy Period (35%)
              </Badge>
              <div className="text-5xl sm:text-4xl font-bold text-white">£{busyPrice.toFixed(0)}</div>
              <div className="text-sm sm:text-xs text-white mt-1">When demand is high</div>
            </div>
            
            <div className="space-y-2 text-base sm:text-sm">
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Profit Margin:</span>
                <span className="font-medium text-white whitespace-nowrap">{busy.margin.toFixed(0)}%</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Your Profit:</span>
                <span className="font-medium text-green-500 whitespace-nowrap">£{busy.profit.toFixed(0)}</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                <span className="text-white">Profit/hour:</span>
                <span className="font-medium text-white whitespace-nowrap">£{busy.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingOptionsTiers;
