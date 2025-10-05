import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, TrendingUp, DollarSign, Lightbulb, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InstallPlanDataV2, CalculationResult } from "./types";

interface InstallationInsightsProps {
  planData: InstallPlanDataV2;
  result: CalculationResult;
}

interface Insights {
  safetyChecks: string[];
  optimizations: string[];
  costSavings?: string[];
  warnings?: string[];
  recommendations?: string[];
}

export const InstallationInsights = ({ planData, result }: InstallationInsightsProps) => {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('validate-installation', {
          body: { planData, result }
        });

        if (error) throw error;
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [planData, result]);

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Analyzing design...</span>
        </CardContent>
      </Card>
    );
  }

  if (!insights) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-primary" />
          Professional Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {/* Safety Checks */}
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Safety Verification
          </h4>
          <div className="space-y-1">
            {insights.safetyChecks.map((check, idx) => (
              <div key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optimizations */}
        {insights.optimizations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Optimisation Opportunities
            </h4>
            <div className="space-y-1">
              {insights.optimizations.map((opt, idx) => (
                <div key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cost Savings */}
        {insights.costSavings && insights.costSavings.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
              <span className="text-primary">£</span>
              Cost Savings
            </h4>
            <div className="space-y-1">
              {insights.costSavings.map((saving, idx) => (
                <div key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">£</span>
                  <span>{saving}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {insights.warnings && insights.warnings.length > 0 && (
          <div className="bg-amber-500/10 rounded-lg p-3">
            <h4 className="text-sm font-semibold mb-2 text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important Considerations
            </h4>
            <div className="space-y-1">
              {insights.warnings.map((warning, idx) => (
                <div key={idx} className="text-xs text-foreground/90">• {warning}</div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {insights.recommendations && insights.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">Best Practice</h4>
            <div className="space-y-1">
              {insights.recommendations.map((rec, idx) => (
                <div key={idx} className="text-xs text-foreground/90">• {rec}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
