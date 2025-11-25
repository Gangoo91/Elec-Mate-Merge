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
  
  const sparsePrice = profitability?.quoteTiers?.minimum?.price || breakEven * 1.2;
  const normalPrice = profitability?.quoteTiers?.target?.price || breakEven * 1.3;
  const busyPrice = profitability?.quoteTiers?.premium?.price || breakEven * 1.4;

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
  const getBenchmark = (projectType?: string, jobDescription?: string, normalPrice?: number) => {
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
    if (normalPrice && normalPrice < 2000) {
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

  const benchmark = getBenchmark(projectType, jobDescription, normalPrice);

  const sparse = calculateTierMetrics(sparsePrice);
  const normal = calculateTierMetrics(normalPrice);
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
          <div className="space-y-2 sm:space-y-1 text-base sm:text-sm">
            <div className="flex justify-between">
              <span className="text-white">{benchmark.name} typical range:</span>
              <span className="font-medium text-white">{benchmark.range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">This quote (Normal tier):</span>
              <span className={`font-bold ${
                normalPrice < benchmark.min ? 'text-red-500' : 
                normalPrice > benchmark.max ? 'text-red-500' : 
                'text-green-600'
              }`}>
                £{normalPrice.toFixed(0)}
                {normalPrice < benchmark.min && ' ⚠️ Below market rate'}
                {normalPrice > benchmark.max && ' ⚠️ Above market rate'}
                {normalPrice >= benchmark.min && normalPrice <= benchmark.max && ' ✅ Within range'}
              </span>
            </div>
            <div className="text-sm sm:text-xs text-white mt-3 sm:mt-2">
              {normalPrice < benchmark.min && 'Consider if materials or labour are underestimated'}
              {normalPrice > benchmark.max && 'Review for over-specification or excessive margins'}
              {normalPrice >= benchmark.min && normalPrice <= benchmark.max && 'Competitive pricing for your region'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Work Sparse */}
          <div className={`p-5 sm:p-4 rounded-xl border-2 ${
            selectedTier === 'sparse' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-4 sm:mb-3">
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 mb-2">
                Work Sparse
              </Badge>
              <div className="text-5xl sm:text-4xl font-bold text-white">£{sparsePrice.toFixed(0)}</div>
              <div className="text-sm sm:text-xs text-white mt-1">Low margin</div>
            </div>
            
            <div className="space-y-2 text-base sm:text-sm">
              <div className="flex justify-between">
                <span className="text-white">Margin:</span>
                <span className="font-medium text-white">{sparse.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Profit:</span>
                <span className="font-medium text-green-500">£{sparse.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Per hour:</span>
                <span className="font-medium text-white">£{sparse.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Normal */}
          <div className={`p-5 sm:p-4 rounded-xl border-2 ${
            selectedTier === 'normal' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-4 sm:mb-3">
              <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/50 mb-2">
                Normal ⭐
              </Badge>
              <div className="text-5xl sm:text-4xl font-bold text-elec-yellow">£{normalPrice.toFixed(0)}</div>
              <div className="text-sm sm:text-xs text-white mt-1">Target pricing</div>
            </div>
            
            <div className="space-y-2 text-base sm:text-sm">
              <div className="flex justify-between">
                <span className="text-white">Margin:</span>
                <span className="font-medium text-white">{normal.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Profit:</span>
                <span className="font-medium text-green-500">£{normal.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Per hour:</span>
                <span className="font-medium text-white">£{normal.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Busy */}
          <div className={`p-5 sm:p-4 rounded-xl border-2 ${
            selectedTier === 'busy' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-4 sm:mb-3">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 mb-2">
                Busy Period
              </Badge>
              <div className="text-5xl sm:text-4xl font-bold text-white">£{busyPrice.toFixed(0)}</div>
              <div className="text-sm sm:text-xs text-white mt-1">High margin</div>
            </div>
            
            <div className="space-y-2 text-base sm:text-sm">
              <div className="flex justify-between">
                <span className="text-white">Margin:</span>
                <span className="font-medium text-white">{busy.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Profit:</span>
                <span className="font-medium text-green-500">£{busy.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Per hour:</span>
                <span className="font-medium text-white">£{busy.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingOptionsTiers;
