
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle } from "lucide-react";

interface RiskCalculationMatrixProps {
  onRiskCalculated: (likelihood: number, severity: number) => void;
}

const RiskCalculationMatrix = ({ onRiskCalculated }: RiskCalculationMatrixProps) => {
  const [selectedLikelihood, setSelectedLikelihood] = useState<number | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);

  const likelihoodLevels = [
    { value: 1, label: "Very Unlikely", description: "Extremely rare occurrence" },
    { value: 2, label: "Unlikely", description: "Could happen but rare" },
    { value: 3, label: "Possible", description: "Might happen occasionally" },
    { value: 4, label: "Likely", description: "Will probably happen" },
    { value: 5, label: "Very Likely", description: "Almost certain to happen" }
  ];

  const severityLevels = [
    { value: 1, label: "Negligible", description: "No injury or minor discomfort" },
    { value: 2, label: "Minor", description: "Minor injury requiring first aid" },
    { value: 3, label: "Moderate", description: "Medical treatment required" },
    { value: 4, label: "Major", description: "Serious injury or illness" },
    { value: 5, label: "Catastrophic", description: "Fatality or permanent disability" }
  ];

  const calculateRisk = () => {
    if (selectedLikelihood && selectedSeverity) {
      onRiskCalculated(selectedLikelihood, selectedSeverity);
    }
  };

  const getRiskScore = () => {
    if (selectedLikelihood && selectedSeverity) {
      return selectedLikelihood * selectedSeverity;
    }
    return 0;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 15) return { level: "Very High", color: "bg-red-600" };
    if (score >= 10) return { level: "High", color: "bg-red-500" };
    if (score >= 6) return { level: "Medium", color: "bg-yellow-500" };
    if (score >= 3) return { level: "Low", color: "bg-green-500" };
    return { level: "Very Low", color: "bg-green-400" };
  };

  const currentRisk = getRiskLevel(getRiskScore());

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Risk Calculation Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Likelihood Selection */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Likelihood of Occurrence</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {likelihoodLevels.map((level) => (
              <Button
                key={level.value}
                variant={selectedLikelihood === level.value ? "default" : "outline"}
                size="sm"
                className={`h-auto py-3 px-2 text-center ${
                  selectedLikelihood === level.value 
                    ? "bg-elec-yellow text-black" 
                    : "border-gray-600 hover:border-elec-yellow/50"
                }`}
                onClick={() => setSelectedLikelihood(level.value)}
              >
                <div>
                  <div className="font-medium text-xs">{level.value}</div>
                  <div className="font-medium text-xs">{level.label}</div>
                  <div className="text-[10px] opacity-70 mt-1">{level.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Severity Selection */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Severity of Consequences</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {severityLevels.map((level) => (
              <Button
                key={level.value}
                variant={selectedSeverity === level.value ? "default" : "outline"}
                size="sm"
                className={`h-auto py-3 px-2 text-center ${
                  selectedSeverity === level.value 
                    ? "bg-elec-yellow text-black" 
                    : "border-gray-600 hover:border-elec-yellow/50"
                }`}
                onClick={() => setSelectedSeverity(level.value)}
              >
                <div>
                  <div className="font-medium text-xs">{level.value}</div>
                  <div className="font-medium text-xs">{level.label}</div>
                  <div className="text-[10px] opacity-70 mt-1">{level.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Risk Calculation Result */}
        {selectedLikelihood && selectedSeverity && (
          <div className="p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span className="font-medium">Risk Calculation</span>
              </div>
              <Badge className={`${currentRisk.color} text-white`}>
                {currentRisk.level}
              </Badge>
            </div>
            <div className="text-sm space-y-1">
              <p>Likelihood: {selectedLikelihood} × Severity: {selectedSeverity} = <strong>{getRiskScore()}</strong></p>
              <p className="text-muted-foreground">
                Risk Score: {getRiskScore()} ({currentRisk.level})
              </p>
            </div>
            <Button 
              onClick={calculateRisk}
              className="w-full mt-3 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Apply Risk Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskCalculationMatrix;
