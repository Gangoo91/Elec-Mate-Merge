import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface WiringScenario {
  scenario_id: string;
  scenario_name: string;
  use_case: string;
  complexity: 'simple' | 'intermediate' | 'advanced';
  recommended: boolean;
}

interface WiringScenarioSelectorProps {
  scenarios: WiringScenario[];
  selectedScenario: string;
  onSelectScenario: (scenarioId: string) => void;
  comparison?: {
    key_differences: string[];
    decision_factors: string[];
  };
}

export const WiringScenarioSelector = ({
  scenarios,
  selectedScenario,
  onSelectScenario,
  comparison
}: WiringScenarioSelectorProps) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-foreground border-border';
    }
  };

  if (scenarios.length === 1) return null;

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-blue-400" />
            <p className="text-sm font-semibold text-foreground">
              Multiple wiring options available - Choose your scenario:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.scenario_id}
                onClick={() => onSelectScenario(scenario.scenario_id)}
                className={`p-4 rounded-xl border-2 text-left transition-all touch-manipulation ${
                  selectedScenario === scenario.scenario_id
                    ? 'border-elec-yellow bg-elec-yellow/10 shadow-lg shadow-elec-yellow/20'
                    : 'border-border bg-muted/30 hover:border-elec-yellow/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm sm:text-base text-foreground flex-1">
                    {scenario.scenario_name}
                  </h4>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {scenario.recommended && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {selectedScenario === scenario.scenario_id && (
                      <div className="h-5 w-5 rounded-full bg-elec-yellow flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-background" />
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-foreground/70 mb-3 leading-relaxed">
                  {scenario.use_case}
                </p>
                
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getComplexityColor(scenario.complexity)}`}
                >
                  {scenario.complexity.charAt(0).toUpperCase() + scenario.complexity.slice(1)}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {comparison && (
        <Card className="bg-blue-500/5 border-blue-500/30">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Key Differences
            </h4>
            <ul className="space-y-2">
              {comparison.key_differences.map((diff, idx) => (
                <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
            
            {comparison.decision_factors && comparison.decision_factors.length > 0 && (
              <>
                <h4 className="text-sm font-semibold text-blue-400 mt-4 mb-2">
                  Consider:
                </h4>
                <ul className="space-y-1.5">
                  {comparison.decision_factors.map((factor, idx) => (
                    <li key={idx} className="text-xs text-foreground/70 flex items-start gap-2">
                      <span className="text-elec-yellow mt-0.5">→</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
