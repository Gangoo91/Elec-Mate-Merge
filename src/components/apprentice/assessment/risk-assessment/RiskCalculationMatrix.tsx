
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle } from "lucide-react";

interface RiskCalculationMatrixProps {
  onRiskCalculated: (likelihood: number, severity: number) => void;
}

const RiskCalculationMatrix = ({ onRiskCalculated }: RiskCalculationMatrixProps) => {
  const [selectedLikelihood, setSelectedLikelihood] = useState<number | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);

  const likelihoodLevels = [
    { value: 1, label: "Very Unlikely", description: "Extremely rare occurrence", color: "green" },
    { value: 2, label: "Unlikely", description: "Could happen but rare", color: "green" },
    { value: 3, label: "Possible", description: "Might happen occasionally", color: "yellow" },
    { value: 4, label: "Likely", description: "Will probably happen", color: "orange" },
    { value: 5, label: "Very Likely", description: "Almost certain to happen", color: "red" }
  ];

  const severityLevels = [
    { value: 1, label: "Negligible", description: "No injury or minor discomfort", color: "green" },
    { value: 2, label: "Minor", description: "Minor injury requiring first aid", color: "green" },
    { value: 3, label: "Moderate", description: "Medical treatment required", color: "yellow" },
    { value: 4, label: "Major", description: "Serious injury or illness", color: "orange" },
    { value: 5, label: "Catastrophic", description: "Fatality or permanent disability", color: "red" }
  ];

  const getColorConfig = (color: string, isSelected: boolean) => {
    const configs: Record<string, { bg: string; border: string; text: string }> = {
      green: { bg: isSelected ? 'bg-green-500/30' : 'bg-green-500/5', border: isSelected ? 'border-green-500' : 'border-green-500/30', text: 'text-green-400' },
      yellow: { bg: isSelected ? 'bg-elec-yellow/30' : 'bg-elec-yellow/5', border: isSelected ? 'border-elec-yellow' : 'border-elec-yellow/30', text: 'text-elec-yellow' },
      orange: { bg: isSelected ? 'bg-orange-500/30' : 'bg-orange-500/5', border: isSelected ? 'border-orange-500' : 'border-orange-500/30', text: 'text-orange-400' },
      red: { bg: isSelected ? 'bg-red-500/30' : 'bg-red-500/5', border: isSelected ? 'border-red-500' : 'border-red-500/30', text: 'text-red-400' }
    };
    return configs[color] || configs.green;
  };

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
    if (score >= 15) return { level: "Very High", bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
    if (score >= 10) return { level: "High", bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' };
    if (score >= 6) return { level: "Medium", bg: 'bg-elec-yellow/20', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
    if (score >= 3) return { level: "Low", bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' };
    return { level: "Very Low", bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30' };
  };

  const currentRisk = getRiskLevel(getRiskScore());

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Calculator className="h-5 w-5 text-elec-yellow" />
          </div>
          Risk Calculation Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        {/* Likelihood Selection */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-elec-yellow/20 rounded-lg flex items-center justify-center text-xs text-elec-yellow font-bold">L</span>
            Likelihood of Occurrence
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {likelihoodLevels.map((level) => {
              const isSelected = selectedLikelihood === level.value;
              const config = getColorConfig(level.color, isSelected);
              return (
                <button
                  key={level.value}
                  className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] ${config.bg} ${config.border} ${isSelected ? 'ring-2 ring-white/20' : ''}`}
                  onClick={() => setSelectedLikelihood(level.value)}
                >
                  <div className={`text-lg font-bold ${config.text} mb-1`}>{level.value}</div>
                  <div className="text-xs font-medium text-white">{level.label}</div>
                  <div className="text-[10px] text-white/80 mt-1">{level.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Severity Selection */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center text-xs text-red-400 font-bold">S</span>
            Severity of Consequences
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {severityLevels.map((level) => {
              const isSelected = selectedSeverity === level.value;
              const config = getColorConfig(level.color, isSelected);
              return (
                <button
                  key={level.value}
                  className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] ${config.bg} ${config.border} ${isSelected ? 'ring-2 ring-white/20' : ''}`}
                  onClick={() => setSelectedSeverity(level.value)}
                >
                  <div className={`text-lg font-bold ${config.text} mb-1`}>{level.value}</div>
                  <div className="text-xs font-medium text-white">{level.label}</div>
                  <div className="text-[10px] text-white/80 mt-1">{level.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Risk Calculation Result */}
        {selectedLikelihood && selectedSeverity && (
          <div className={`p-4 rounded-xl ${currentRisk.bg} border ${currentRisk.border}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <AlertTriangle className={`h-5 w-5 ${currentRisk.text}`} />
                </div>
                <span className="font-medium text-white">Risk Calculation</span>
              </div>
              <Badge className={`${currentRisk.bg} ${currentRisk.text} border ${currentRisk.border}`}>
                {currentRisk.level}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-xs text-white/60 mb-1">Likelihood</div>
                <div className="text-xl font-bold text-elec-yellow">{selectedLikelihood}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-xs text-white/60 mb-1">Severity</div>
                <div className="text-xl font-bold text-red-400">{selectedSeverity}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-xs text-white/60 mb-1">Risk Score</div>
                <div className={`text-xl font-bold ${currentRisk.text}`}>{getRiskScore()}</div>
              </div>
            </div>
            <Button
              onClick={calculateRisk}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Apply Risk Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskCalculationMatrix;
