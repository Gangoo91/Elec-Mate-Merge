import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, AlertTriangle } from "lucide-react";

interface FinancialHealthSummaryProps {
  financialMetrics: {
    netProfit: number;
    minBalance: number;
    cashRunway: number;
    profitMargin: number;
  };
  emergencyFundTarget: number;
  monthWithNegativeBalance?: number;
}

export const FinancialHealthSummary = ({ 
  financialMetrics, 
  emergencyFundTarget,
  monthWithNegativeBalance 
}: FinancialHealthSummaryProps) => {
  const { netProfit, minBalance, cashRunway, profitMargin } = financialMetrics;

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-card to-elec-dark/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-light">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Financial Health Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Annual Profit */}
          <div className="text-center p-3 sm:p-4 rounded-lg bg-elec-dark/50">
            <div className={`text-2xl sm:text-3xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              £{netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-elec-light/70 mt-1">Annual Profit</div>
            <div className="mt-2">
              {netProfit >= 0 ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Profitable ✓</Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">Loss ✗</Badge>
              )}
            </div>
          </div>
          
          {/* Lowest Balance */}
          <div className="text-center p-3 sm:p-4 rounded-lg bg-elec-dark/50">
            <div className={`text-2xl sm:text-3xl font-bold ${minBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              £{minBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-elec-light/70 mt-1">Lowest Balance</div>
            <div className="mt-2">
              {minBalance >= emergencyFundTarget ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Safe ✓</Badge>
              ) : minBalance >= 0 ? (
                <Badge variant="yellow" className="text-xs">Tight ⚠</Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">Negative ✗</Badge>
              )}
            </div>
          </div>
          
          {/* Cash Runway */}
          <div className="text-center p-3 sm:p-4 rounded-lg bg-elec-dark/50">
            {cashRunway === 0 ? (
              <>
                <div className="text-lg sm:text-xl text-elec-light/60 font-medium">Not calculated</div>
                <div className="text-xs text-elec-light/50 mt-1">Add expenses</div>
              </>
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                  {cashRunway} months
                </div>
                <div className="text-xs text-elec-light/70 mt-1">Cash Runway</div>
                <div className="mt-2">
                  {cashRunway >= 6 ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Strong ✓</Badge>
                  ) : cashRunway >= 3 ? (
                    <Badge variant="yellow" className="text-xs">Moderate ⚠</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">Weak ✗</Badge>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Profit Margin */}
          <div className="text-center p-3 sm:p-4 rounded-lg bg-elec-dark/50">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">
              {profitMargin.toFixed(1)}%
            </div>
            <div className="text-xs text-elec-light/70 mt-1">Profit Margin</div>
            <div className="mt-2">
              {profitMargin >= 20 ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Excellent ✓</Badge>
              ) : profitMargin >= 10 ? (
                <Badge variant="yellow" className="text-xs">Good ⚠</Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">Low ✗</Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Critical Warnings */}
        {minBalance < 0 && monthWithNegativeBalance && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical:</strong> Your cash balance goes negative in Month {monthWithNegativeBalance}. 
              You need to secure additional funding or reduce expenses.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
