import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, AlertCircle, Info } from "lucide-react";

interface RiskMatrixGuideProps {
  selectedRiskLevel?: string;
  identifiedHazards: string[];
  onRiskLevelChange?: (level: string) => void;
}

const RISK_LEVELS = [
  {
    value: 'low',
    label: 'Low Risk',
    color: 'bg-green-500/20 text-green-300 border-green-500/30',
    icon: Shield,
    description: 'Minimal risk, standard precautions sufficient',
    examples: [
      'Routine maintenance in de-energised systems',
      'Visual inspections with no live work',
      'Installation work in new, unoccupied buildings',
    ],
    ppe: ['Safety boots', 'Hi-vis vest', 'Safety glasses'],
    controls: ['Standard safe working practices', 'Basic toolbox talk', 'Permit to work (if required)'],
  },
  {
    value: 'medium',
    label: 'Medium Risk',
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    icon: AlertCircle,
    description: 'Moderate risk, additional controls required',
    examples: [
      'Live testing and fault finding',
      'Working at height (< 2m)',
      'Work in occupied premises with public access',
      'Manual handling of heavy equipment',
    ],
    ppe: ['All low-risk PPE', 'Insulated gloves', 'Hard hat', 'Arc-rated clothing (if applicable)'],
    controls: ['Detailed risk assessment', 'Toolbox talk & briefing', 'Supervision required', 'Isolation procedures'],
  },
  {
    value: 'high',
    label: 'High Risk',
    color: 'bg-red-500/20 text-red-300 border-red-500/30',
    icon: AlertTriangle,
    description: 'Significant risk, strict controls and supervision mandatory',
    examples: [
      'Live work on high voltage systems',
      'Arc flash risk present',
      'Confined space electrical work',
      'Working at height (> 2m) with live circuits',
      'Emergency response work',
    ],
    ppe: ['Full arc-rated suit', 'Arc-rated face shield', 'Insulated gloves (tested)', 'Dielectric footwear', 'Flame-resistant undergarments'],
    controls: ['Comprehensive risk assessment', 'Method statement', 'Competent person supervision', 'Emergency procedures in place', 'Arc flash boundary calculated', 'Rescue plan established'],
  },
];

export const RiskMatrixGuide = ({ 
  selectedRiskLevel, 
  identifiedHazards,
  onRiskLevelChange 
}: RiskMatrixGuideProps) => {
  
  // Auto-suggest risk level based on hazards
  const getSuggestedRiskLevel = (): string => {
    const highRiskHazards = ['high-voltage', 'arc-flash', 'confined-spaces'];
    const mediumRiskHazards = ['live-circuits', 'working-at-height', 'manual-handling'];
    
    const hasHighRisk = identifiedHazards.some(h => highRiskHazards.includes(h));
    const hasMediumRisk = identifiedHazards.some(h => mediumRiskHazards.includes(h));
    
    if (hasHighRisk) return 'high';
    if (hasMediumRisk || identifiedHazards.length >= 3) return 'medium';
    return 'low';
  };

  const suggestedLevel = getSuggestedRiskLevel();
  const showSuggestion = suggestedLevel && suggestedLevel !== selectedRiskLevel;

  return (
    <div className="space-y-4">
      {/* Risk Level Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {RISK_LEVELS.map((level) => {
          const Icon = level.icon;
          const isSelected = selectedRiskLevel === level.value;
          const isSuggested = suggestedLevel === level.value;
          
          return (
            <Card
              key={level.value}
              className={`
                relative cursor-pointer transition-all duration-200 p-4
                ${isSelected 
                  ? `${level.color} border-2 scale-105 shadow-lg` 
                  : 'bg-card border border-primary/30 hover:border-elec-yellow/40'
                }
              `}
              onClick={() => onRiskLevelChange?.(level.value)}
            >
              {isSuggested && !isSelected && (
                <Badge className="absolute -top-2 -right-2 bg-elec-yellow text-elec-dark text-xs">
                  Suggested
                </Badge>
              )}
              
              <div className="flex flex-col items-start text-left sm:items-center sm:text-center space-y-2">
                <Icon className={`h-6 w-6 ${isSelected ? '' : 'text-elec-yellow/70'}`} />
                <h4 className={`font-semibold text-sm ${isSelected ? '' : 'text-elec-light'}`}>
                  {level.label}
                </h4>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Suggestion Alert */}
      {showSuggestion && (
        <Alert className="bg-elec-yellow/10 border-elec-yellow/30">
          <Info className="h-4 w-4 text-elec-yellow" />
          <AlertDescription className="text-sm text-elec-light">
            Based on the hazards you've selected, we recommend <strong className="text-elec-yellow">{RISK_LEVELS.find(l => l.value === suggestedLevel)?.label}</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Risk Level Details */}
      {selectedRiskLevel && (
        <Card className="p-4 bg-card/50 border-primary/30">
          {(() => {
            const level = RISK_LEVELS.find(l => l.value === selectedRiskLevel);
            if (!level) return null;
            
            return (
              <div className="space-y-4 text-left">
                <div>
                  <h4 className="font-semibold text-elec-light mb-1 flex items-center gap-2">
                    <level.icon className="h-4 w-4 text-elec-yellow" />
                    {level.label}
                  </h4>
                  <p className="text-sm text-white text-left">{level.description}</p>
                </div>

                <div className="text-left">
                  <h5 className="text-xs font-semibold text-elec-yellow uppercase tracking-wide mb-2">
                    Examples
                  </h5>
                  <ul className="text-sm text-white space-y-1">
                    {level.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <span className="text-elec-yellow mt-1 shrink-0">•</span>
                        <span className="text-left">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-elec-yellow uppercase tracking-wide mb-2">
                    Required PPE
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {level.ppe.map((item, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="bg-elec-yellow/10 text-elec-light border-elec-yellow/30 text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-left">
                  <h5 className="text-xs font-semibold text-elec-yellow uppercase tracking-wide mb-2">
                    Required Controls
                  </h5>
                  <ul className="text-sm text-white space-y-1">
                    {level.controls.map((control, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <span className="text-elec-yellow mt-1 shrink-0">✓</span>
                        <span className="text-left">{control}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );
};
