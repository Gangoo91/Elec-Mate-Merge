import { Card } from "@/components/ui/card";
import { Calculator, Check } from "lucide-react";

interface CalculationBreakdownProps {
  calculation: {
    formula: string;
    components: Record<string, string>;
    expectedResult: string;
    limitCheck: string;
  };
}

export const CalculationBreakdown = ({ calculation }: CalculationBreakdownProps) => {
  // Defensive check - ensure we have required fields
  if (!calculation || !calculation.formula || !calculation.components || !calculation.expectedResult) {
    return null;
  }

  return (
    <Card className="p-5 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      {/* Mobile: Icon centered on top, Desktop: Icon on left */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-2 mb-4 sm:mb-3">
        <Calculator className="h-8 w-8 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
        <h4 className="text-lg sm:text-base font-semibold text-blue-900 dark:text-blue-100 text-center sm:text-left">Calculation Breakdown</h4>
      </div>
      
      <div className="space-y-4 sm:space-y-3">
        {/* Formula */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-4 sm:p-3 rounded border-2 sm:border border-blue-200 dark:border-blue-800">
          <p className="text-base sm:text-sm text-white mb-2 sm:mb-1 text-center sm:text-left">Formula:</p>
          <p className="font-mono font-semibold text-xl sm:text-lg text-blue-900 dark:text-blue-100 text-center sm:text-left break-all">{calculation.formula}</p>
        </div>

        {/* Components */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-4 sm:p-3 rounded border-2 sm:border border-blue-200 dark:border-blue-800">
          <p className="text-base sm:text-sm text-white mb-3 sm:mb-2 text-center sm:text-left font-semibold">Components:</p>
          <div className="grid grid-cols-1 gap-3 sm:gap-2">
            {calculation.components && typeof calculation.components === 'object' && 
              Object.entries(calculation.components).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 text-center sm:text-left">
                  <span className="font-mono text-base sm:text-sm font-bold text-blue-700 dark:text-blue-400">{key}:</span>
                  <span className="text-base sm:text-sm text-foreground">{value}</span>
                </div>
              ))
            }
          </div>
        </div>

        {/* Expected Result */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-4 sm:p-3 rounded border-2 sm:border border-blue-200 dark:border-blue-800">
          <p className="text-base sm:text-sm text-white mb-2 sm:mb-1 text-center sm:text-left">Expected Result:</p>
          <p className="font-mono text-3xl sm:text-2xl font-bold text-blue-900 dark:text-blue-100 text-center sm:text-left break-all">{calculation.expectedResult}</p>
        </div>

        {/* Limit Check */}
        <div className="bg-green-50 dark:bg-green-950/30 p-4 sm:p-3 rounded border-2 sm:border border-green-300 dark:border-green-800">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-2 text-center sm:text-left">
            <Check className="h-7 w-7 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-base sm:text-sm font-medium text-green-900 dark:text-green-100">{calculation.limitCheck}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
