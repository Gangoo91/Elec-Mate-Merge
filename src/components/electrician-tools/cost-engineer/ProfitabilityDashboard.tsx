import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Target, Award } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProfitabilityDashboardProps {
  profitabilityAnalysis: {
    directCosts: {
      materials: number;
      labour: number;
      total: number;
    };
    jobOverheads: {
      estimatedDuration: string;
      overheadAllocation: number;
      travelCosts: number;
      permitsCosts: number;
      wasteCosts: number;
      total: number;
    };
    breakEven: {
      subtotal: number;
      vat: number;
      total: number;
      explanation: string;
    };
    quotingGuidance: {
      minimum: {
        margin: number;
        subtotal: number;
        vat: number;
        total: number;
        profit: number;
        explanation: string;
      };
      target: {
        margin: number;
        subtotal: number;
        vat: number;
        total: number;
        profit: number;
        explanation: string;
      };
      premium: {
        margin: number;
        subtotal: number;
        vat: number;
        total: number;
        profit: number;
        explanation: string;
      };
    };
    recommendations: string[];
  };
}

const ProfitabilityDashboard = ({ profitabilityAnalysis }: ProfitabilityDashboardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const { breakEven, quotingGuidance, recommendations } = profitabilityAnalysis;

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          Profitability Analysis
        </CardTitle>
        <CardDescription>
          Your break-even point, profit margins, and recommended quote pricing
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Break-Even Warning */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-sm sm:text-base">
            <span className="font-semibold text-foreground">Break-Even Point: {formatCurrency(breakEven.total)}</span>
            <br />
            <span className="text-white">{breakEven.explanation}</span>
          </AlertDescription>
        </Alert>

        {/* Quote Tiers */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Recommended Quote Tiers</h4>
          
          {/* Minimum Quote */}
          <div className="p-4 rounded-lg border-2 border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <h5 className="font-semibold text-foreground">Minimum Quote</h5>
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-500 text-xs">
                    {quotingGuidance.minimum.margin}% margin
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-white mb-2">
                  {quotingGuidance.minimum.explanation}
                </p>
                <div className="flex items-center gap-2 text-xs text-white">
                  <span>Profit: <span className="font-semibold text-yellow-500">{formatCurrency(quotingGuidance.minimum.profit)}</span></span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {formatCurrency(quotingGuidance.minimum.total)}
                </div>
                <div className="text-xs text-white">inc. VAT</div>
              </div>
            </div>
          </div>

          {/* Target Quote - Recommended */}
          <div className="p-4 rounded-lg border-2 border-green-500/50 bg-green-500/10 hover:border-green-500/70 transition-colors relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-500 text-white border-0 text-xs">
                <Target className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 pr-24">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h5 className="font-semibold text-foreground">Target Quote</h5>
                  <Badge variant="outline" className="border-green-500/30 text-green-500 text-xs">
                    {quotingGuidance.target.margin}% margin
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-white mb-2">
                  {quotingGuidance.target.explanation}
                </p>
                <div className="flex items-center gap-2 text-xs text-white">
                  <span>Profit: <span className="font-semibold text-green-500">{formatCurrency(quotingGuidance.target.profit)}</span></span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-bold text-green-500">
                  {formatCurrency(quotingGuidance.target.total)}
                </div>
                <div className="text-xs text-white">inc. VAT</div>
              </div>
            </div>
          </div>

          {/* Premium Quote */}
          <div className="p-4 rounded-lg border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <h5 className="font-semibold text-foreground">Premium Quote</h5>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-500 text-xs">
                    {quotingGuidance.premium.margin}% margin
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-white mb-2">
                  {quotingGuidance.premium.explanation}
                </p>
                <div className="flex items-center gap-2 text-xs text-white">
                  <span>Profit: <span className="font-semibold text-purple-500">{formatCurrency(quotingGuidance.premium.profit)}</span></span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {formatCurrency(quotingGuidance.premium.total)}
                </div>
                <div className="text-xs text-white">inc. VAT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide flex items-center gap-2">
              <Award className="h-4 w-4 text-elec-yellow" />
              Key Recommendations
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10"
                >
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-white flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitabilityDashboard;
