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
    <Card className="border-0 sm:border border-elec-yellow/30 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-yellow/5 to-background">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-xl font-bold text-white">Client Quote Summary</CardTitle>
          {getTierBadge(selectedTier)}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="space-y-6">
          {/* Quote Amount */}
          <div className="text-center p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="text-base sm:text-sm text-white font-medium mb-1">Recommended Quote</div>
            <div className="text-4xl sm:text-5xl font-bold text-elec-yellow mb-2">
              £{amount.toFixed(2)}
            </div>
            <div className="text-base sm:text-sm text-white">
              excl. VAT | £{totalIncVat.toFixed(2)} inc. VAT
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-white font-medium">Break-Even</span>
              </div>
              <div className="text-2xl sm:text-xl font-bold text-white">£{breakEven.toFixed(2)}</div>
            </div>

            <div className="p-4 rounded-lg bg-background/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm text-white font-medium">Margin</span>
              </div>
              <div className="text-2xl sm:text-xl font-bold text-green-500">{margin.toFixed(1)}%</div>
            </div>

            <div className="p-4 rounded-lg bg-background/20">
              <div className="flex items-center gap-2 mb-2">
                <PoundSterling className="h-5 w-5 text-green-400" />
                <span className="text-sm text-white font-medium">Profit</span>
              </div>
              <div className="text-2xl sm:text-xl font-bold text-green-500">£{profit.toFixed(0)}</div>
            </div>

            <div className="p-4 rounded-lg bg-background/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-white font-medium">Profit/hour</span>
              </div>
              <div className="text-2xl sm:text-xl font-bold text-green-500">£{profitPerHour.toFixed(0)}/hr</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuoteSummary;
