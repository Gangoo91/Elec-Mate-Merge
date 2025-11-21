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
  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Calculation Breakdown</h4>
      </div>
      
      <div className="space-y-3">
        {/* Formula */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-3 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-muted-foreground mb-1">Formula:</p>
          <p className="font-mono font-semibold text-lg text-blue-900 dark:text-blue-100">{calculation.formula}</p>
        </div>

        {/* Components */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-3 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-muted-foreground mb-2">Components:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(calculation.components).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <span className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-400">{key}:</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Result */}
        <div className="bg-white/80 dark:bg-elec-dark/80 p-3 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-muted-foreground mb-1">Expected Result:</p>
          <p className="font-mono text-2xl font-bold text-blue-900 dark:text-blue-100">{calculation.expectedResult}</p>
        </div>

        {/* Limit Check */}
        <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-300 dark:border-green-800">
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium text-green-900 dark:text-green-100">{calculation.limitCheck}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
