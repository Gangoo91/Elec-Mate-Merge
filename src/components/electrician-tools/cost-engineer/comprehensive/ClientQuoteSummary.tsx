import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, TrendingUp, Target } from "lucide-react";

interface ClientQuoteSummaryProps {
  selectedTier: string;
  amount: number;
  vatAmount: number;
  totalIncVat: number;
  breakEven: number;
  margin: number;
  profit: number;
  profitPerHour: number;
}

const ClientQuoteSummary = ({
  selectedTier,
  amount,
  vatAmount,
  totalIncVat,
  breakEven,
  margin,
  profit,
  profitPerHour
}: ClientQuoteSummaryProps) => {
  const getTierBadge = (tier: string) => {
    switch(tier) {
      case 'sparse':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Work Sparse</Badge>;
      case 'busy':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Busy Period</Badge>;
      default:
        return <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/50">Normal</Badge>;
    }
  };

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Client Quote Summary</CardTitle>
          {getTierBadge(selectedTier)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quote Amount */}
          <div className="text-center p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="text-sm text-muted-foreground mb-1">Recommended Quote</div>
            <div className="text-4xl sm:text-5xl font-bold text-elec-yellow mb-2">
              £{amount.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              excl. VAT | £{totalIncVat.toFixed(2)} inc. VAT
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-1 mb-1">
                <Target className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Break-even</span>
              </div>
              <div className="text-lg font-bold">£{breakEven.toFixed(0)}</div>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Margin</span>
              </div>
              <div className="text-lg font-bold text-green-500">{margin.toFixed(1)}%</div>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-1 mb-1">
                <PoundSterling className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Profit</span>
              </div>
              <div className="text-lg font-bold text-green-500">£{profit.toFixed(0)}</div>
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-muted-foreground">Per Hour</span>
              </div>
              <div className="text-lg font-bold text-green-500">£{profitPerHour.toFixed(0)}/hr</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuoteSummary;
