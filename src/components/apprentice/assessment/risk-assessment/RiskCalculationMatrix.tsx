import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface RiskCalculationMatrixProps {
  onRiskCalculated: (likelihood: number, severity: number) => void;
}

const RiskCalculationMatrix = ({ onRiskCalculated }: RiskCalculationMatrixProps) => {
  const [selectedLikelihood, setSelectedLikelihood] = useState<number | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);

  const likelihoodLevels = [
    { value: 1, label: 'Very Unlikely', description: 'Extremely rare occurrence' },
    { value: 2, label: 'Unlikely', description: 'Could happen but rare' },
    { value: 3, label: 'Possible', description: 'Might happen occasionally' },
    { value: 4, label: 'Likely', description: 'Will probably happen' },
    { value: 5, label: 'Very Likely', description: 'Almost certain to happen' },
  ];

  const severityLevels = [
    { value: 1, label: 'Negligible', description: 'No injury or minor discomfort' },
    { value: 2, label: 'Minor', description: 'Minor injury requiring first aid' },
    { value: 3, label: 'Moderate', description: 'Medical treatment required' },
    { value: 4, label: 'Major', description: 'Serious injury or illness' },
    { value: 5, label: 'Catastrophic', description: 'Fatality or permanent disability' },
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

  const getRiskLevelLabel = (score: number): string => {
    if (score >= 15) return 'Very High';
    if (score >= 10) return 'High';
    if (score >= 6) return 'Medium';
    if (score >= 3) return 'Low';
    return 'Very Low';
  };

  const score = getRiskScore();
  const riskLabel = getRiskLevelLabel(score);
  const isDanger = score >= 10;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Risk calculation matrix
        </span>
        <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
          Calculate likelihood × severity
        </h3>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Likelihood of occurrence
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {likelihoodLevels.map((level) => {
            const isSelected = selectedLikelihood === level.value;
            return (
              <button
                key={level.value}
                className={`p-3 rounded-lg border transition-all touch-manipulation active:scale-[0.98] text-left ${
                  isSelected
                    ? 'bg-elec-yellow/[0.08] border-elec-yellow/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                }`}
                onClick={() => setSelectedLikelihood(level.value)}
              >
                <div
                  className={`text-[18px] font-semibold mb-1 font-mono ${isSelected ? 'text-elec-yellow' : 'text-white'}`}
                >
                  {level.value}
                </div>
                <div className="text-[12px] text-white">{level.label}</div>
                <div className="text-[10px] text-white/55 mt-1 leading-relaxed">
                  {level.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Severity of consequences
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {severityLevels.map((level) => {
            const isSelected = selectedSeverity === level.value;
            return (
              <button
                key={level.value}
                className={`p-3 rounded-lg border transition-all touch-manipulation active:scale-[0.98] text-left ${
                  isSelected
                    ? 'bg-elec-yellow/[0.08] border-elec-yellow/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                }`}
                onClick={() => setSelectedSeverity(level.value)}
              >
                <div
                  className={`text-[18px] font-semibold mb-1 font-mono ${isSelected ? 'text-elec-yellow' : 'text-white'}`}
                >
                  {level.value}
                </div>
                <div className="text-[12px] text-white">{level.label}</div>
                <div className="text-[10px] text-white/55 mt-1 leading-relaxed">
                  {level.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedLikelihood && selectedSeverity && (
        <div
          className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDanger ? 'border-red-500/30 bg-red-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'
          }`}
        >
          <div className="flex items-baseline justify-between">
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.18em] ${isDanger ? 'text-red-300' : 'text-white/55'}`}
            >
              Risk calculation
            </span>
            <span className="text-[12px] text-white/85 font-mono">{riskLabel}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                Likelihood
              </div>
              <div className="text-[20px] font-semibold text-white font-mono">
                {selectedLikelihood}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Severity</div>
              <div className="text-[20px] font-semibold text-white font-mono">
                {selectedSeverity}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Score</div>
              <div
                className={`text-[20px] font-semibold font-mono ${isDanger ? 'text-red-300' : 'text-elec-yellow'}`}
              >
                {score}
              </div>
            </div>
          </div>
          <Button
            onClick={calculateRisk}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Apply risk assessment
          </Button>
        </div>
      )}
    </div>
  );
};

export default RiskCalculationMatrix;
