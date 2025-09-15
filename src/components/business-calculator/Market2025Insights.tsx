import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

interface Market2025InsightsProps {
  calculatedRate?: number;
  experienceLevel?: string;
  region?: string;
}

export const Market2025Insights: React.FC<Market2025InsightsProps> = ({
  calculatedRate,
  experienceLevel = 'qualified',
  region = 'other'
}) => {
  const marketRates = MARKET_RATES_2025.hourlyRates[experienceLevel as keyof typeof MARKET_RATES_2025.hourlyRates];
  const regionalMultiplier = MARKET_RATES_2025.regionalMultipliers[region as keyof typeof MARKET_RATES_2025.regionalMultipliers];
  const adjustedMarketRate = marketRates?.typical ? marketRates.typical * regionalMultiplier : 0;

  const getCompetitiveStatus = () => {
    if (!calculatedRate || !adjustedMarketRate) return null;
    
    const difference = ((calculatedRate - adjustedMarketRate) / adjustedMarketRate) * 100;
    
    if (difference > 20) {
      return {
        status: 'premium',
        color: 'text-blue-300',
        bgColor: 'bg-blue-500/20 border-blue-500/30',
        icon: <Target className="h-4 w-4" />,
        message: `${difference.toFixed(0)}% above market - premium positioning`
      };
    } else if (difference > 5) {
      return {
        status: 'competitive',
        color: 'text-green-300',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: <TrendingUp className="h-4 w-4" />,
        message: `${difference.toFixed(0)}% above market - competitive rate`
      };
    } else if (difference > -10) {
      return {
        status: 'market',
        color: 'text-yellow-300',
        bgColor: 'bg-yellow-500/20 border-yellow-500/30',
        icon: <Lightbulb className="h-4 w-4" />,
        message: 'Aligned with market rates'
      };
    } else {
      return {
        status: 'below',
        color: 'text-red-300',
        bgColor: 'bg-red-500/20 border-red-500/30',
        icon: <AlertTriangle className="h-4 w-4" />,
        message: `${Math.abs(difference).toFixed(0)}% below market - consider increasing`
      };
    }
  };

  const competitiveStatus = getCompetitiveStatus();

  const insights2025 = [
    {
      title: "Material Cost Impact",
      value: `+${((MARKET_RATES_2025.materialInflation.general - 1) * 100).toFixed(0)}%`,
      description: "Average material cost increase for 2025"
    },
    {
      title: "Fuel & Vehicle Costs",
      value: `+£${(MARKET_RATES_2025.businessCosts.fuel - 2000).toLocaleString()}`,
      description: "Increased annual fuel costs vs 2024"
    },
    {
      title: "Professional Fees",
      value: `£${MARKET_RATES_2025.businessCosts.niceicMembership + MARKET_RATES_2025.businessCosts.publicLiabilityInsurance}`,
      description: "Typical annual membership + insurance"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            2025 Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Market Rate Comparison */}
          {adjustedMarketRate > 0 && (
            <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/10">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Your Rate</div>
                <div className="text-lg font-semibold">£{calculatedRate?.toFixed(2) || '—'}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Market Rate</div>
                <div className="text-lg font-semibold text-elec-yellow">£{adjustedMarketRate.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Competitive Status */}
          {competitiveStatus && (
            <div className={`p-3 rounded-lg border ${competitiveStatus.bgColor}`}>
              <div className={`flex items-center gap-2 ${competitiveStatus.color}`}>
                {competitiveStatus.icon}
                <span className="font-medium">{competitiveStatus.message}</span>
              </div>
            </div>
          )}

          {/* 2025 Market Insights */}
          <div className="grid gap-3">
            <h4 className="font-semibold text-elec-light">Key 2025 Cost Factors</h4>
            {insights2025.map((insight, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/5">
                <div>
                  <div className="font-medium text-sm">{insight.title}</div>
                  <div className="text-xs text-muted-foreground">{insight.description}</div>
                </div>
                <Badge variant="secondary" className="text-elec-yellow">
                  {insight.value}
                </Badge>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center p-2 bg-muted/5 rounded">
            Market data updated for 2025 inflation, minimum wage increases, and industry trends.
            Regional adjustments reflect local cost of living and demand patterns.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};