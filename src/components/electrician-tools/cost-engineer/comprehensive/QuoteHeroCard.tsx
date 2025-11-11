import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp } from "lucide-react";

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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTierBadgeColor = (tier: string) => {
    switch(tier.toLowerCase()) {
      case 'sparse': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'normal': return 'bg-elec-yellow text-elec-dark border-elec-yellow';
      case 'busy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-elec-yellow text-elec-dark border-elec-yellow';
    }
  };

  return (
    <Card className="border-0 sm:border-2 border-elec-yellow/30 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-green-500/10 shadow-none sm:shadow-2xl overflow-hidden animate-scale-in">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-white/80 font-medium uppercase tracking-wide">
              💰 Recommended Quote
            </p>
            
            {/* Main Price - HUGE */}
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
              {formatCurrency(amount)}
            </div>
            
            {/* Tier Badge */}
            <div className="flex justify-center pt-2">
              <Badge className={`px-4 py-1.5 text-sm font-bold border-2 ${getTierBadgeColor(tier)}`}>
                {tier.toUpperCase()} TIER
              </Badge>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            {/* Profit */}
            <div className="bg-background/30 rounded-lg p-3 sm:p-4 border border-green-500/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-xs text-white/70">Profit</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-green-400">
                {formatCurrency(profit)}
              </p>
            </div>

            {/* Margin */}
            <div className="bg-background/30 rounded-lg p-3 sm:p-4 border border-elec-yellow/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-white/70">Margin</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-elec-yellow">
                {margin.toFixed(1)}%
              </p>
            </div>

            {/* Profit Per Hour */}
            <div className="bg-background/30 rounded-lg p-3 sm:p-4 border border-green-500/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs text-white/70">Per Hour</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-400">
                {formatCurrency(profitPerHour)}/hr
              </p>
            </div>

            {/* Confidence */}
            <div className="bg-background/30 rounded-lg p-3 sm:p-4 border border-blue-500/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs text-white/70">Confidence</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-400">
                {confidence}%
              </p>
            </div>
          </div>

          {/* Quick Explanation */}
          <div className="pt-2">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Based on <span className="font-bold text-elec-yellow">{totalLabourHours.toFixed(1)} hours</span> labour + materials
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteHeroCard;
