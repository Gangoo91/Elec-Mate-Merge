import { useState } from "react";
import { ChevronDown, MapPin, Clock, Users, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ConfidenceMeter from "../ui/ConfidenceMeter";
import TrendArrow from "../ui/TrendArrow";

interface PriceCardProps {
  jobType: string;
  jobCategory?: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  region: string;
  postcodeDistrict?: string;
  confidenceScore: number;
  sampleSize: number;
  lastUpdated: string;
  trend?: number;
  complexityLevel?: "simple" | "medium" | "complex";
  onSubmitPrice?: () => void;
  className?: string;
}

const PriceCard = ({
  jobType,
  jobCategory,
  minPrice,
  maxPrice,
  avgPrice,
  region,
  postcodeDistrict,
  confidenceScore,
  sampleSize,
  lastUpdated,
  trend = 0,
  complexityLevel = "medium",
  onSubmitPrice,
  className
}: PriceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getComplexityConfig = () => {
    const configs: Record<string, { bg: string; text: string; border: string; label: string }> = {
      simple: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/40",
        label: "Quick Job"
      },
      medium: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/40",
        label: "Standard"
      },
      complex: {
        bg: "bg-rose-500/20",
        text: "text-rose-400",
        border: "border-rose-500/40",
        label: "Complex"
      }
    };
    return configs[complexityLevel] || configs.medium;
  };

  const complexity = getComplexityConfig();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
  };

  // Calculate position of average price on the bar (as percentage)
  const range = maxPrice - minPrice;
  const avgPosition = range > 0 ? ((avgPrice - minPrice) / range) * 100 : 50;

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-neutral-900 to-neutral-950",
        "border-2 border-white/10",
        "hover:border-yellow-400/40 active:scale-[0.99]",
        "touch-manipulation",
        isExpanded && "border-yellow-400/30",
        className
      )}
    >
      {/* Main Content - Tappable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5"
      >
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            {/* Job Type & Badge */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="text-lg font-bold text-white leading-tight">{jobType}</h3>
              <span className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg border",
                complexity.bg, complexity.text, complexity.border
              )}>
                {complexity.label}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 text-yellow-400 flex-shrink-0" />
              <span>{postcodeDistrict || region}</span>
            </div>
          </div>

          {/* Average Price - Hero Display */}
          <div className="text-right flex-shrink-0">
            <div className="text-3xl font-black text-yellow-400 tracking-tight">
              {formatPrice(avgPrice)}
            </div>
            <div className="text-xs text-white/60 font-medium mt-1">
              avg price
            </div>
          </div>
        </div>

        {/* Price Range Bar - Premium Design */}
        <div className="mb-4">
          <div className="relative h-14 rounded-xl overflow-hidden bg-neutral-800/80">
            {/* Gradient background bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 via-yellow-500/40 to-rose-600/30" />

            {/* Min price label - left */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <div className="text-lg font-bold text-white">{formatPrice(minPrice)}</div>
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-wide">Low</div>
            </div>

            {/* Max price label - right */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-right">
              <div className="text-lg font-bold text-white">{formatPrice(maxPrice)}</div>
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-wide">High</div>
            </div>

            {/* Average marker - positioned dynamically */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-20"
              style={{ left: `${Math.max(25, Math.min(75, avgPosition))}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-1 h-6 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
                <div className="mt-1 px-2 py-0.5 bg-yellow-400 rounded-md">
                  <span className="text-[10px] font-bold text-black uppercase">Avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <Users className="h-4 w-4 text-yellow-400/80" />
              <span className="font-medium">{sampleSize} quotes</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <Clock className="h-4 w-4 text-yellow-400/80" />
              <span className="font-medium">{formatDate(lastUpdated)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {trend !== 0 && <TrendArrow value={trend} size="sm" />}
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
              isExpanded ? "bg-yellow-400/20 rotate-180" : "bg-white/10"
            )}>
              <ChevronDown className={cn(
                "h-5 w-5 transition-colors",
                isExpanded ? "text-yellow-400" : "text-white/60"
              )} />
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
          {/* Confidence Score */}
          <ConfidenceMeter score={confidenceScore} size="sm" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {jobCategory && (
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xs text-white/60 font-medium mb-1">Category</div>
                <div className="text-sm font-semibold text-white">{jobCategory}</div>
              </div>
            )}

            {trend !== 0 && (
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xs text-white/60 font-medium mb-1">30-Day Trend</div>
                <TrendArrow value={trend} size="md" />
              </div>
            )}

            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-xs text-white/60 font-medium mb-1">Price Spread</div>
              <div className="text-sm font-semibold text-white">
                {formatPrice(maxPrice - minPrice)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-xs text-white/60 font-medium mb-1">Data Quality</div>
              <div className="text-sm font-semibold text-white">
                {confidenceScore >= 80 ? "High" : confidenceScore >= 60 ? "Good" : "Growing"}
              </div>
            </div>
          </div>

          {/* CTA */}
          {onSubmitPrice && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSubmitPrice();
              }}
              className="w-full p-4 bg-gradient-to-r from-yellow-400/15 to-amber-500/15 border border-yellow-400/30 rounded-xl hover:from-yellow-400/25 hover:to-amber-500/25 transition-all touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20 flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-yellow-400">Help Improve Pricing Data</p>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Submit your actual job prices to help fellow sparkies get accurate market rates
                  </p>
                </div>
                <Zap className="h-5 w-5 text-yellow-400/50 flex-shrink-0" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceCard;
