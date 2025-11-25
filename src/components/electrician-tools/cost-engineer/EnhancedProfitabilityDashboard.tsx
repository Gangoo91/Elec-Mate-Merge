import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertTriangle, CheckCircle2, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfitabilityTier {
  label: string;
  price: number;
  margin: number;
  marginPercent: number;
  recommended?: boolean;
}

interface EnhancedProfitabilityDashboardProps {
  directCosts: {
    materials: number;
    labour: number;
    total: number;
  };
  jobOverheads: {
    allocatedBusinessOverheads: number;
    travel: number;
    permitsAndFees: number;
    wasteDisposal: number;
    total: number;
  };
  breakEvenPoint: number;
  quoteTiers: {
    minimum: ProfitabilityTier;
    target: ProfitabilityTier;
    premium: ProfitabilityTier;
  };
  recommendations: string[];
}

export const EnhancedProfitabilityDashboard = ({
  directCosts,
  jobOverheads,
  breakEvenPoint,
  quoteTiers,
  recommendations
}: EnhancedProfitabilityDashboardProps) => {
  const totalCosts = directCosts.total + jobOverheads.total;
  const safetyMarginPercent = ((quoteTiers.target.price - breakEvenPoint) / breakEvenPoint * 100);

  const getTierIcon = (tier: string) => {
    if (tier === 'minimum') return <AlertTriangle className="h-4 w-4" />;
    if (tier === 'target') return <Target className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  const getTierColor = (tier: string) => {
    if (tier === 'minimum') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
    if (tier === 'target') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    return 'bg-primary/10 text-primary border-primary/30';
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Profitability Analysis
            </CardTitle>
            <CardDescription className="mt-1">
              Understand your costs, margins, and optimal pricing tiers
            </CardDescription>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            {safetyMarginPercent.toFixed(0)}% Safety Margin
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Break-Even Summary */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Break-Even Point</span>
            <CheckCircle2 className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            £{breakEvenPoint.toFixed(2)}
          </p>
          <p className="text-xs text-white">
            Minimum price to cover all costs (no profit)
          </p>
        </div>

        {/* Cost Breakdown */}
        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
            <TabsTrigger value="overheads">Overheads</TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-3 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Direct Materials</span>
                <span className="font-semibold">£{directCosts.materials.toFixed(2)}</span>
              </div>
              <Progress 
                value={(directCosts.materials / totalCosts) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Direct Labour</span>
                <span className="font-semibold">£{directCosts.labour.toFixed(2)}</span>
              </div>
              <Progress 
                value={(directCosts.labour / totalCosts) * 100} 
                className="h-2 [&>div]:bg-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Job Overheads</span>
                <span className="font-semibold">£{jobOverheads.total.toFixed(2)}</span>
              </div>
              <Progress 
                value={(jobOverheads.total / totalCosts) * 100} 
                className="h-2 [&>div]:bg-orange-500"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/50 border-2 border-border mt-4">
              <span className="font-bold">Total Costs</span>
              <span className="font-bold text-lg">£{totalCosts.toFixed(2)}</span>
            </div>
          </TabsContent>

          <TabsContent value="overheads" className="space-y-2 mt-4">
            <div className="flex items-center justify-between px-3 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">Business Overheads</span>
              <span className="font-medium">£{jobOverheads.allocatedBusinessOverheads.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">Travel & Fuel</span>
              <span className="font-medium">£{jobOverheads.travel.toFixed(2)}</span>
            </div>
            {jobOverheads.permitsAndFees > 0 && (
              <div className="flex items-center justify-between px-3 py-2 rounded bg-muted/30">
                <span className="text-sm text-white">Permits & Fees</span>
                <span className="font-medium">£{jobOverheads.permitsAndFees.toFixed(2)}</span>
              </div>
            )}
            {jobOverheads.wasteDisposal > 0 && (
              <div className="flex items-center justify-between px-3 py-2 rounded bg-muted/30">
                <span className="text-sm text-white">Waste Disposal</span>
                <span className="font-medium">£{jobOverheads.wasteDisposal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/30 mt-3">
              <span className="font-bold text-sm">Total Overheads</span>
              <span className="font-bold">£{jobOverheads.total.toFixed(2)}</span>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quote Tiers */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Recommended Quote Tiers</h4>
          
          {Object.entries(quoteTiers).map(([key, tier]) => (
            <Card 
              key={key}
              className={`border-2 ${
                key === 'target' 
                  ? 'border-emerald-500/40 bg-emerald-500/5' 
                  : 'border-border/50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTierColor(key)}>
                      {getTierIcon(key)}
                      <span className="ml-1.5">{tier.label}</span>
                    </Badge>
                    {key === 'target' && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                        RECOMMENDED
                      </Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    £{tier.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-white">Your Profit</span>
                    <span className="font-semibold text-foreground">£{tier.margin.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white">Margin</span>
                    <span className="font-semibold text-foreground">{tier.marginPercent.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Pricing Recommendations
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 px-3 py-2 rounded bg-primary/5 border border-primary/20">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
