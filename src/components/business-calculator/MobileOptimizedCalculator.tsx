import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Calculator, PoundSterling, HelpCircle, TrendingUp, AlertCircle, CheckCircle, Download, Lightbulb, Settings, History, Share2, Receipt } from "lucide-react";
import { JobPresetSelector } from "@/components/electrician/business-development/job-profitability/JobPresetSelector";
import { VATCalculator } from "@/components/electrician/business-development/job-profitability/VATCalculator";
import { labourHoursOptions, hourlyRateOptions, overheadPercentageOptions, profitMarginOptions } from "@/components/electrician/business-development/job-profitability/DropdownOptions";
import { JobPreset } from "@/components/electrician/business-development/job-profitability/JobTypePresets";
import { Helmet } from "react-helmet";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import MultiWorkerManager, { Worker } from "@/components/business-calculator/MultiWorkerManager";
import AccuracyEnhancements, { AccuracyInputs } from "@/components/business-calculator/AccuracyEnhancements";
import { Market2025Insights } from "@/components/business-calculator/Market2025Insights";

interface JobInputs {
  materialCost: number;
  labourHours: number;
  hourlyRate: number;
  overheadPercentage: number;
  desiredProfitMargin: number;
  quoteAmount: number;
  travelHours: number;
  adminHours: number;
  miles: number;
  mileageRate: number; // £ per mile
  subcontractorCost: number;
  parkingTolls: number;
  consumablesPercent: number;
  materialMarkupPercent: number;
  contingencyPercent: number;
  warrantyReservePercent: number;
  discountPercent: number;
}

interface CalculationHistory {
  id: string;
  timestamp: Date;
  jobType: string;
  inputs: JobInputs;
  results: {
    totalCosts: number;
    actualProfit: number;
    actualProfitMargin: number;
    vatAmount: number;
    totalWithVAT: number;
    minimumQuoteExVAT: number;
    suggestedClientPriceExVAT: number;
  };
}

const MobileOptimizedCalculator = () => {
  const { toast } = useToast();

  // Basic job inputs
  const [inputs, setInputs] = useState<JobInputs>({
    materialCost: 500,
    labourHours: 8,
    hourlyRate: 35,
    overheadPercentage: 30,
    desiredProfitMargin: 20,
    quoteAmount: 1200,
    travelHours: 1,
    adminHours: 0.5,
    miles: 20,
    mileageRate: 0.45,
    subcontractorCost: 0,
    parkingTolls: 0,
    consumablesPercent: 5,
    materialMarkupPercent: 15,
    contingencyPercent: 5,
    warrantyReservePercent: 3,
    discountPercent: 0,
  });

  // VAT settings
  const [vatRegistered, setVatRegistered] = useState(true);
  const [vatRate, setVatRate] = useState(20);

  // Multi-worker support
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [teamEfficiency, setTeamEfficiency] = useState(1.0);
  const [useMultiWorker, setUseMultiWorker] = useState(false);

  // Accuracy enhancements
  const [accuracyInputs, setAccuracyInputs] = useState<AccuracyInputs>({
    // Risk & Contingency
    weatherDelayPercent: 2,
    partAvailabilityPercent: 3,
    reworkAllowancePercent: 5,
    clientChangePercent: 5,
    
    // Electrical-Specific
    testingHours: 1,
    certificationHours: 0.5,
    complianceHours: 0.5,
    remedialPercent: 8,
    
    // Market Intelligence
    seasonalMultiplier: 1.0,
    competitorAdjustment: 0,
    demandFactor: 1.0,
    
    // Business Metrics
    paymentTermsDays: 30,
    equipmentDepreciation: 25,
    trainingHours: 35,
  });

  // UI state
  const [calculated, setCalculated] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [showHistory, setShowHistory] = useState(false);
  const [showVATSettings, setShowVATSettings] = useState(false);

  const handleInputChange = (field: keyof JobInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset: JobPreset) => {
    setInputs(prev => ({
      ...prev,
      materialCost: preset.materialCost,
      labourHours: preset.labourHours,
      hourlyRate: preset.hourlyRate,
      overheadPercentage: preset.overheadPercentage,
      desiredProfitMargin: preset.desiredProfitMargin,
      quoteAmount: preset.quoteAmount,
      travelHours: preset.travelHours || prev.travelHours,
      adminHours: preset.adminHours || prev.adminHours,
      miles: preset.miles || prev.miles,
      subcontractorCost: preset.subcontractorCost || prev.subcontractorCost,
      consumablesPercent: preset.consumablesPercent || prev.consumablesPercent,
      materialMarkupPercent: preset.materialMarkupPercent || prev.materialMarkupPercent,
    }));
    setSelectedJobType(preset.name);
  };

  const getLabourCost = () => {
    if (useMultiWorker && workers.length > 0) {
      const teamEfficiency = workers.length <= 1 ? 1.0 : 
                           workers.length === 2 ? 0.95 : 
                           workers.length === 3 ? 0.90 : 0.85;
      const rawTeamCost = workers.reduce((total, worker) => 
        total + (worker.hourlyRate * worker.hoursOnJob), 0);
      return rawTeamCost / teamEfficiency;
    }
    
    return inputs.labourHours * inputs.hourlyRate;
  };

  return (
    <div className="mobile-container mobile-safe-area">
      <Helmet>
        <title>Job Profitability Calculator - Electrical Contractor Tools | ElecMate</title>
        <meta 
          name="description" 
          content="Professional job profitability calculator for electrical contractors. Calculate exact profit margins, VAT, overheads and pricing for electrical installations. Free tool." 
        />
        <meta name="keywords" content="electrical contractor calculator, job profitability, electrical pricing, VAT calculator, profit margin, electrical business tools" />
        <link rel="canonical" href="https://elecmate.co.uk/electrician/business-development/tools/job-profitability" />
      </Helmet>

      <div className="mobile-section-spacing">
        {/* Header */}
        <div className="mobile-card mb-6">
          <div className="flex items-start gap-3 mb-4">
            <BackButton />
            <div className="flex-1 min-w-0">
              <h1 className="mobile-heading text-white flex items-center gap-2 mb-2">
                <Calculator className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow flex-shrink-0" />
                <span className="leading-tight">Job Profitability Calculator</span>
              </h1>
              <p className="mobile-text text-white">
                Calculate accurate profit margins for electrical jobs with professional-grade precision. Include VAT, overheads, materials, labour and all hidden costs.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-elec-yellow border-elec-yellow text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Professional Tool
            </Badge>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="mobile-card-spacing">
          <WhyThisMatters
            title="Why Job Profitability Matters for Electrical Contractors"
            content={`
              **Cash Flow Crisis Prevention**: Unprofitable electrical jobs can destroy your contracting business within months. Even a single major loss-making project can trigger cash flow problems that spiral out of control, forcing you to take on more unprofitable work just to pay immediate bills.

              **BS7671 Compliance Costs**: Hidden costs like testing, certification, remedial work, and compliance inspections can easily consume 10-20% of your job value. Without proper accounting for these electrical-specific costs, jobs that appear profitable on paper become loss-makers in reality.

              **Electrical Market Intelligence**: Understanding your pricing position versus competitors in the electrical sector is crucial. Over-pricing loses you work to cheaper competitors, while under-pricing destroys your profit margins and prevents business growth.

              **Professional Growth Investment**: Proper pricing enables reinvestment in essential tools, training, and qualifications. Without adequate margins, you can't afford equipment upgrades, 18th Edition updates, or expanding into higher-value electrical specialisms.

              **Risk Management**: Electrical installations carry unique risks - from supply chain delays for specialist components to unexpected remedial work on older installations. Building appropriate contingencies into your pricing protects against cost overruns that can turn profitable jobs into financial disasters.
            `}
            className="mb-6"
          />
        </div>

        {/* Main Calculator Layout */}
        <div className="space-y-6">
          {/* Job Configuration - Mobile First */}
          <Card className="mobile-card bg-elec-darkgrey border-elec-grey">
            <CardHeader className="mobile-card-spacing">
              <CardTitle className="mobile-subheading text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Job Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="mobile-card-spacing">
              <JobPresetSelector 
                presets={[]} 
                onPresetSelect={applyPreset} 
              />
            </CardContent>
          </Card>

          {/* Multi-Worker Management */}
          <Card className="mobile-card bg-elec-darkgrey border-elec-grey">
            <CardHeader className="mobile-card-spacing">
              <CardTitle className="mobile-subheading text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Team Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="mobile-card-spacing">
              <MultiWorkerManager
                workers={workers}
                onWorkersChange={setWorkers}
              />
            </CardContent>
          </Card>

          {/* Basic Job Details */}
          <Card className="mobile-card bg-elec-darkgrey border-elec-grey">
            <CardHeader className="mobile-card-spacing">
              <CardTitle className="mobile-subheading text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Basic Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="mobile-card-spacing">
              <div className="mobile-grid-responsive gap-4">
                <MobileInput
                  label="Material Cost (£)"
                  type="number"
                  inputMode="decimal"
                  value={inputs.materialCost || ''}
                  onChange={(e) => handleInputChange('materialCost', parseFloat(e.target.value) || 0)}
                />
                
                <MobileSelectWrapper
                  label="Labour Hours"
                  value={inputs.labourHours.toString()}
                  onValueChange={(value) => handleInputChange('labourHours', parseFloat(value))}
                  options={labourHoursOptions}
                />
                
                <MobileSelectWrapper
                  label="Hourly Rate (£)"
                  value={inputs.hourlyRate.toString()}
                  onValueChange={(value) => handleInputChange('hourlyRate', parseFloat(value))}
                  options={hourlyRateOptions}
                />
                
                <MobileInput
                  label="Quote Amount (£)"
                  type="number"
                  inputMode="decimal"
                  value={inputs.quoteAmount || ''}
                  onChange={(e) => handleInputChange('quoteAmount', parseFloat(e.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Enhancements */}
          <AccuracyEnhancements
            inputs={accuracyInputs}
            onInputsChange={setAccuracyInputs}
            jobComplexity="standard"
          />

          {/* Calculate Button */}
          <div className="mobile-action-bar">
            <Button 
              onClick={() => setCalculated(true)}
              className="mobile-button-primary w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-target"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Profitability
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOptimizedCalculator;