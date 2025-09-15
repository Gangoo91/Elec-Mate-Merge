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

interface AccuracyEnhancementsProps {
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

const AccuracyEnhancements: React.FC<AccuracyEnhancementsProps> = ({
  inputs,
  onInputsChange,
  jobComplexity,
  className
}) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    risk: false,
    electrical: false,
    market: false,
    business: false
  });

  const updateInput = (field: keyof AccuracyInputs, value: number) => {
    onInputsChange({
      ...inputs,
      [field]: value
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const applyComplexityDefaults = () => {
    const defaults = {
      simple: {
        testingHours: 0.5,
        certificationHours: 0.25,
        complianceHours: 0.25,
        reworkAllowancePercent: 3,
      },
      standard: {
        testingHours: 1.5,
        certificationHours: 0.5,
        complianceHours: 0.5,
        reworkAllowancePercent: 5,
      },
      complex: {
        testingHours: 3,
        certificationHours: 1,
        complianceHours: 1,
        reworkAllowancePercent: 10,
      },
      specialist: {
        testingHours: 6,
        certificationHours: 2,
        complianceHours: 2,
        reworkAllowancePercent: 15,
      }
    };

    const complexityDefaults = defaults[jobComplexity];
    onInputsChange({
      ...inputs,
      ...complexityDefaults
    });
  };

  const getTotalRiskFactor = () => {
    return inputs.weatherDelayPercent + inputs.partAvailabilityPercent + 
           inputs.reworkAllowancePercent + inputs.clientChangePercent;
  };

  const getTotalElectricalHours = () => {
    return inputs.testingHours + inputs.certificationHours + inputs.complianceHours;
  };

  return (
    <Card className={`border-elec-yellow/20 bg-elec-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Accuracy Enhancements
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={applyComplexityDefaults}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            Apply {jobComplexity} defaults
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk & Contingency */}
        <Collapsible open={expandedSections.risk} onOpenChange={() => toggleSection('risk')}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-white">Risk & Contingency</span>
                <Badge variant="outline" className="border-red-400/30 text-red-400">
                  {getTotalRiskFactor().toFixed(1)}% total
                </Badge>
              </div>
              {expandedSections.risk ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3 p-3 bg-elec-dark/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MobileInput
                label="Weather Delays"
                type="number"
                value={inputs.weatherDelayPercent || ""}
                onChange={(e) => updateInput('weatherDelayPercent', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="External work delays"
              />
              <MobileInput
                label="Part Availability"
                type="number"
                value={inputs.partAvailabilityPercent || ""}
                onChange={(e) => updateInput('partAvailabilityPercent', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Supply chain delays"
              />
              <MobileInput
                label="Rework Allowance"
                type="number"
                value={inputs.reworkAllowancePercent || ""}
                onChange={(e) => updateInput('reworkAllowancePercent', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Quality issues buffer"
              />
              <MobileInput
                label="Client Changes"
                type="number"
                value={inputs.clientChangePercent || ""}
                onChange={(e) => updateInput('clientChangePercent', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Scope change buffer"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Electrical-Specific */}
        <Collapsible open={expandedSections.electrical} onOpenChange={() => toggleSection('electrical')}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 bg-elec-yellow/10 border border-elec-yellow/20 hover:bg-elec-yellow/20"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <span className="text-white">Electrical-Specific Costs</span>
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                  {getTotalElectricalHours().toFixed(1)}h total
                </Badge>
              </div>
              {expandedSections.electrical ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3 p-3 bg-elec-dark/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MobileInput
                label="Testing Hours"
                type="number"
                value={inputs.testingHours || ""}
                onChange={(e) => updateInput('testingHours', parseFloat(e.target.value) || 0)}
                unit="hrs"
                hint="Circuit testing time"
              />
              <MobileInput
                label="Certification Hours"
                type="number"
                value={inputs.certificationHours || ""}
                onChange={(e) => updateInput('certificationHours', parseFloat(e.target.value) || 0)}
                unit="hrs"
                hint="EIC/EICR documentation"
              />
              <MobileInput
                label="Compliance Hours"
                type="number"
                value={inputs.complianceHours || ""}
                onChange={(e) => updateInput('complianceHours', parseFloat(e.target.value) || 0)}
                unit="hrs"
                hint="BS7671 compliance checks"
              />
              <MobileInput
                label="Remedial Work"
                type="number"
                value={inputs.remedialPercent || ""}
                onChange={(e) => updateInput('remedialPercent', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Existing installation fixes"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Market Intelligence */}
        <Collapsible open={expandedSections.market} onOpenChange={() => toggleSection('market')}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span className="text-white">Market Intelligence</span>
                <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                  {((inputs.seasonalMultiplier || 1) * 100).toFixed(0)}% season
                </Badge>
              </div>
              {expandedSections.market ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3 p-3 bg-elec-dark/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MobileSelectWrapper
                label="Seasonal Demand"
                value={(inputs.seasonalMultiplier || 1).toString()}
                onValueChange={(value) => updateInput('seasonalMultiplier', parseFloat(value))}
                options={seasonalOptions}
                hint="Market demand adjustment"
              />
              <MobileInput
                label="Competitor Adjustment"
                type="number"
                value={inputs.competitorAdjustment || ""}
                onChange={(e) => updateInput('competitorAdjustment', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Market positioning"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Business Metrics */}
        <Collapsible open={expandedSections.business} onOpenChange={() => toggleSection('business')}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-green-400" />
                <span className="text-white">Business Metrics</span>
              </div>
              {expandedSections.business ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3 p-3 bg-elec-dark/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MobileInput
                label="Payment Terms"
                type="number"
                value={inputs.paymentTermsDays || ""}
                onChange={(e) => updateInput('paymentTermsDays', parseFloat(e.target.value) || 0)}
                unit="days"
                hint="Cash flow impact"
              />
              <MobileInput
                label="Equipment Depreciation"
                type="number"
                value={inputs.equipmentDepreciation || ""}
                onChange={(e) => updateInput('equipmentDepreciation', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Tool wear per job"
              />
              <MobileInput
                label="Training Hours"
                type="number"
                value={inputs.trainingHours || ""}
                onChange={(e) => updateInput('trainingHours', parseFloat(e.target.value) || 0)}
                unit="hrs"
                hint="CPD allocation"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AccuracyEnhancements;