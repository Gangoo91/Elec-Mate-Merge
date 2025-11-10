import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock } from "lucide-react";

interface PricingOptionsTiersProps {
  profitability?: any;
  selectedTier: string;
  explanation?: string;
  breakEven: number;
  totalLabourHours: number;
}

const PricingOptionsTiers = ({
  profitability,
  selectedTier,
  explanation,
  breakEven,
  totalLabourHours
}: PricingOptionsTiersProps) => {
  
  const calculateTierMetrics = (tierData: any) => {
    const margin = tierData?.margin || 0;
    const profit = tierData?.margin || 0;
    const profitPerHour = totalLabourHours > 0 ? profit / totalLabourHours : 0;
    
    return { margin: tierData?.marginPercent || 0, profit, profitPerHour };
  };

  const sparse = calculateTierMetrics(profitability?.quoteTiers?.minimum);
  const normal = calculateTierMetrics(profitability?.quoteTiers?.target);
  const busy = calculateTierMetrics(profitability?.quoteTiers?.premium);

  const sparsePrice = profitability?.quoteTiers?.minimum?.price || breakEven * 1.2;
  const normalPrice = profitability?.quoteTiers?.target?.price || breakEven * 1.3;
  const busyPrice = profitability?.quoteTiers?.premium?.price || breakEven * 1.4;

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg">Pricing Options</CardTitle>
        {explanation && (
          <p className="text-sm text-muted-foreground mt-2">{explanation}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Work Sparse */}
          <div className={`p-4 rounded-lg border-2 ${
            selectedTier === 'sparse' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-3">
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 mb-2">
                Work Sparse
              </Badge>
              <div className="text-3xl font-bold">£{sparsePrice.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Low margin</div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin:</span>
                <span className="font-medium">{sparse.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit:</span>
                <span className="font-medium text-green-500">£{sparse.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per hour:</span>
                <span className="font-medium">£{sparse.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Normal */}
          <div className={`p-4 rounded-lg border-2 ${
            selectedTier === 'normal' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-3">
              <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/50 mb-2">
                Normal ⭐
              </Badge>
              <div className="text-3xl font-bold text-elec-yellow">£{normalPrice.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Target pricing</div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin:</span>
                <span className="font-medium">{normal.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit:</span>
                <span className="font-medium text-green-500">£{normal.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per hour:</span>
                <span className="font-medium">£{normal.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Busy */}
          <div className={`p-4 rounded-lg border-2 ${
            selectedTier === 'busy' 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-border/50 bg-background/30'
          }`}>
            <div className="text-center mb-3">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 mb-2">
                Busy Period
              </Badge>
              <div className="text-3xl font-bold">£{busyPrice.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">High margin</div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin:</span>
                <span className="font-medium">{busy.margin.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit:</span>
                <span className="font-medium text-green-500">£{busy.profit.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per hour:</span>
                <span className="font-medium">£{busy.profitPerHour.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingOptionsTiers;
