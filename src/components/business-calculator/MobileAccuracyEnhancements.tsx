import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle, Zap, TrendingUp, Settings } from "lucide-react";

export interface AccuracyInputs {
  // Risk & Contingency
  weatherDelayPercent: number;
  partAvailabilityPercent: number;
  reworkAllowancePercent: number;
  clientChangePercent: number;

  // Electrical-Specific
  testingHours: number;
  certificationHours: number;
  complianceHours: number;
  remedialPercent: number;

  // Market Intelligence
  seasonalMultiplier: number;
  competitorAdjustment: number;
  demandFactor: number;

  // Business Metrics
  paymentTermsDays: number;
  equipmentDepreciation: number;
  trainingHours: number;
}

interface MobileAccuracyEnhancementsProps {
  inputs: AccuracyInputs;
  onInputsChange: (inputs: AccuracyInputs) => void;
  jobComplexity: 'simple' | 'standard' | 'complex' | 'specialist';
  className?: string;
}

const jobComplexityOptions = [
  { value: "simple", label: "Simple (Socket outlets, lights)" },
  { value: "standard", label: "Standard (Rewires, DB upgrades)" },
  { value: "complex", label: "Complex (Commercial installs)" },
  { value: "specialist", label: "Specialist (Industrial, HV)" },
];

const seasonalOptions = [
  { value: "0.85", label: "Low Season (-15%)" },
  { value: "1.00", label: "Standard Season" },
  { value: "1.15", label: "High Season (+15%)" },
  { value: "1.25", label: "Peak Season (+25%)" },
];

const competitorOptions = [
  { value: "-10", label: "Very Competitive (-10%)" },
  { value: "-5", label: "Competitive (-5%)" },
  { value: "0", label: "Market Rate" },
  { value: "5", label: "Premium (+5%)" },
  { value: "10", label: "Specialist (+10%)" },
];

const MobileAccuracyEnhancements: React.FC<MobileAccuracyEnhancementsProps> = ({
  inputs,
  onInputsChange,
  jobComplexity,
  className
}) => {
  const [isRiskOpen, setIsRiskOpen] = useState(false);
  const [isElectricalOpen, setIsElectricalOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

  const handleInputChange = (field: keyof AccuracyInputs, value: number) => {
    onInputsChange({ ...inputs, [field]: value });
  };

  const applyDefaults = () => {
    onInputsChange({
      weatherDelayPercent: 2,
      partAvailabilityPercent: 3,
      reworkAllowancePercent: 5,
      clientChangePercent: 5,
      testingHours: 1.5,
      certificationHours: 0.5,
      complianceHours: 0.5,
      remedialPercent: 8,
      seasonalMultiplier: 1.0,
      competitorAdjustment: 0,
      demandFactor: 1.0,
      paymentTermsDays: 30,
      equipmentDepreciation: 25,
      trainingHours: 35,
    });
  };

  return (
    <Card className={`mobile-card bg-elec-darkgrey border-elec-grey ${className}`}>
      <CardHeader className="mobile-card-spacing">
        <CardTitle className="mobile-subheading text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Accuracy Enhancements
        </CardTitle>
        <Button 
          variant="outline"
          size="sm"
          onClick={applyDefaults}
          className="mobile-button-secondary self-start text-elec-yellow border-elec-yellow hover:bg-elec-yellow hover:text-black touch-target"
        >
          Apply standard defaults
        </Button>
      </CardHeader>

      <CardContent className="mobile-card-spacing">
        {/* Risk & Contingency */}
        <Collapsible open={isRiskOpen} onOpenChange={setIsRiskOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between mobile-interactive touch-target h-auto border-red-900/50 bg-red-950/30 hover:bg-red-950/50 text-white p-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <span className="font-medium mobile-text truncate">Risk & Contingency</span>
                <Badge variant="secondary" className="text-red-400 text-xs flex-shrink-0">
                  {(inputs.weatherDelayPercent + inputs.partAvailabilityPercent + inputs.reworkAllowancePercent + inputs.clientChangePercent).toFixed(1)}% total
                </Badge>
              </div>
              {isRiskOpen ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="mobile-grid-responsive gap-4 p-4 bg-red-950/20 rounded-lg border border-red-900/30">
              <MobileInput
                label="Weather Delays (%)"
                type="number"
                inputMode="decimal"
                value={inputs.weatherDelayPercent}
                onChange={(e) => handleInputChange('weatherDelayPercent', parseFloat(e.target.value) || 0)}
                hint="External work delays"
              />
              <MobileInput
                label="Part Availability (%)"
                type="number"
                inputMode="decimal"
                value={inputs.partAvailabilityPercent}
                onChange={(e) => handleInputChange('partAvailabilityPercent', parseFloat(e.target.value) || 0)}
                hint="Supply chain contingency"
              />
              <MobileInput
                label="Rework Allowance (%)"
                type="number"
                inputMode="decimal"
                value={inputs.reworkAllowancePercent}
                onChange={(e) => handleInputChange('reworkAllowancePercent', parseFloat(e.target.value) || 0)}
                hint="Complex installation buffer"
              />
              <MobileInput
                label="Client Changes (%)"
                type="number"
                inputMode="decimal"
                value={inputs.clientChangePercent}
                onChange={(e) => handleInputChange('clientChangePercent', parseFloat(e.target.value) || 0)}
                hint="Scope change buffer"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Electrical-Specific Costs */}
        <Collapsible open={isElectricalOpen} onOpenChange={setIsElectricalOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between mobile-interactive touch-target h-auto border-yellow-900/50 bg-yellow-950/30 hover:bg-yellow-950/50 text-white p-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="font-medium mobile-text truncate">Electrical-Specific Costs</span>
                <Badge variant="secondary" className="text-yellow-400 text-xs flex-shrink-0">
                  {(inputs.testingHours + inputs.certificationHours + inputs.complianceHours).toFixed(1)}h total
                </Badge>
              </div>
              {isElectricalOpen ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="mobile-grid-responsive gap-4 p-4 bg-yellow-950/20 rounded-lg border border-yellow-900/30">
              <MobileInput
                label="Testing Hours"
                type="number"
                inputMode="decimal"
                value={inputs.testingHours}
                onChange={(e) => handleInputChange('testingHours', parseFloat(e.target.value) || 0)}
                hint="PIR, EICR testing time"
              />
              <MobileInput
                label="Certification Hours"
                type="number"
                inputMode="decimal"
                value={inputs.certificationHours}
                onChange={(e) => handleInputChange('certificationHours', parseFloat(e.target.value) || 0)}
                hint="EIC completion time"
              />
              <MobileInput
                label="Compliance Hours"
                type="number"
                inputMode="decimal"
                value={inputs.complianceHours}
                onChange={(e) => handleInputChange('complianceHours', parseFloat(e.target.value) || 0)}
                hint="Part P notification"
              />
              <MobileInput
                label="Remedial Work (%)"
                type="number"
                inputMode="decimal"
                value={inputs.remedialPercent}
                onChange={(e) => handleInputChange('remedialPercent', parseFloat(e.target.value) || 0)}
                hint="Unexpected fixes"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Market Intelligence */}
        <Collapsible open={isMarketOpen} onOpenChange={setIsMarketOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between mobile-interactive touch-target h-auto border-blue-900/50 bg-blue-950/30 hover:bg-blue-950/50 text-white p-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <TrendingUp className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="font-medium mobile-text truncate">Market Intelligence</span>
                <Badge variant="secondary" className="text-blue-400 text-xs flex-shrink-0">
                  {Math.round(inputs.seasonalMultiplier * 100)}% season
                </Badge>
              </div>
              {isMarketOpen ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="mobile-grid-responsive gap-4 p-4 bg-blue-950/20 rounded-lg border border-blue-900/30">
              <MobileSelectWrapper
                label="Seasonal Factor"
                value={inputs.seasonalMultiplier.toString()}
                onValueChange={(value) => handleInputChange('seasonalMultiplier', parseFloat(value))}
                options={seasonalOptions}
              />
              <MobileSelectWrapper
                label="Competition Level"
                value={inputs.competitorAdjustment.toString()}
                onValueChange={(value) => handleInputChange('competitorAdjustment', parseFloat(value))}
                options={competitorOptions}
              />
              <MobileInput
                label="Local Demand Factor"
                type="number"
                inputMode="decimal"
                value={inputs.demandFactor}
                onChange={(e) => handleInputChange('demandFactor', parseFloat(e.target.value) || 1.0)}
                hint="1.0 = normal, >1.0 = high demand"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Business Metrics */}
        <Collapsible open={isBusinessOpen} onOpenChange={setIsBusinessOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between mobile-interactive touch-target h-auto border-green-900/50 bg-green-950/30 hover:bg-green-950/50 text-white p-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Settings className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="font-medium mobile-text">Business Metrics</span>
              </div>
              {isBusinessOpen ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="mobile-grid-responsive gap-4 p-4 bg-green-950/20 rounded-lg border border-green-900/30">
              <MobileInput
                label="Payment Terms (days)"
                type="number"
                inputMode="numeric"
                value={inputs.paymentTermsDays}
                onChange={(e) => handleInputChange('paymentTermsDays', parseFloat(e.target.value) || 0)}
                hint="Cash flow impact"
              />
              <MobileInput
                label="Equipment Depreciation (£/job)"
                type="number"
                inputMode="decimal"
                value={inputs.equipmentDepreciation}
                onChange={(e) => handleInputChange('equipmentDepreciation', parseFloat(e.target.value) || 0)}
                hint="Tool wear allocation"
              />
              <MobileInput
                label="Training Hours (annual)"
                type="number"
                inputMode="decimal"
                value={inputs.trainingHours}
                onChange={(e) => handleInputChange('trainingHours', parseFloat(e.target.value) || 0)}
                hint="CPD time allocation"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default MobileAccuracyEnhancements;