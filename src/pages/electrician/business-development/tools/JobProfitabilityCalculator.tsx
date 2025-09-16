import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Calculator, PoundSterling, HelpCircle, TrendingUp, AlertCircle, CheckCircle, Lightbulb, Settings, History, Share2, Receipt, Users, Clock } from "lucide-react";
import type { Worker } from "@/components/electrician/business-development/job-profitability/WorkerManager";
import { labourHoursOptions, hourlyRateOptions, overheadPercentageOptions, profitMarginOptions } from "@/components/electrician/business-development/job-profitability/DropdownOptions";
import type { JobPreset } from "@/components/electrician/business-development/job-profitability/JobTypePresets";
import { jobTypePresets, getJobPresetsByCategory, getJobPresetOptions } from "@/components/electrician/business-development/job-profitability/JobTypePresets";
import { Helmet } from "react-helmet";
import WhyThisMatters from "@/components/common/WhyThisMatters";

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
  mileageRate: number;
  subcontractorCost: number;
  parkingTolls: number;
  consumablesPercent: number;
  materialMarkupPercent: number;
  contingencyPercent: number;
  warrantyReservePercent: number;
  discountPercent: number;
  workers: Worker[];
  useMultiWorker: boolean;
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
  };
}

interface ValidationErrors {
  [key: string]: string;
}

const JobProfitabilityCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<JobInputs>({
    materialCost: 0,
    labourHours: 0,
    hourlyRate: 0,
    overheadPercentage: 0,
    desiredProfitMargin: 0,
    quoteAmount: 0,
    travelHours: 0,
    adminHours: 0,
    miles: 0,
    mileageRate: 0.45,
    subcontractorCost: 0,
    parkingTolls: 0,
    consumablesPercent: 0,
    materialMarkupPercent: 0,
    contingencyPercent: 0,
    warrantyReservePercent: 0,
    discountPercent: 0,
    workers: [{
      id: '1',
      role: 'Qualified Electrician',
      hours: 0,
      hourlyRate: 45,
      skillLevel: 'qualified'
    }],
    useMultiWorker: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);
  const [customValues, setCustomValues] = useState<{[key: string]: boolean}>({});
  const [vatRate, setVATRate] = useState(20);
  const [vatRegistered, setVATRegistered] = useState(true);
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('job-profitability-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading calculation history:', error);
      }
    }
  }, []);

  const updateInput = (field: keyof JobInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    setCalculated(false);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (inputs.materialCost < 0) newErrors.materialCost = "Material cost cannot be negative";
    
    if (inputs.useMultiWorker) {
      if (inputs.workers.length === 0) newErrors.workers = "At least one worker is required";
      if (totalLabourHours <= 0) newErrors.labourHours = "Total labour hours must be greater than 0";
      if (totalLabourCost <= 0) newErrors.hourlyRate = "Worker rates must be greater than £0";
    } else {
      if (inputs.labourHours <= 0) newErrors.labourHours = "Labour hours must be greater than 0";
      if (inputs.hourlyRate <= 0) newErrors.hourlyRate = "Hourly rate must be greater than £0";
    }

    const percentFields: (keyof JobInputs)[] = [
      'overheadPercentage', 'desiredProfitMargin', 'consumablesPercent', 'materialMarkupPercent', 'contingencyPercent', 'warrantyReservePercent', 'discountPercent'
    ];
    percentFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0 || v > 100) newErrors[f as string] = 'Must be between 0–100%';
    });

    const nonNegativeFields: (keyof JobInputs)[] = [
      'travelHours','adminHours','miles','mileageRate','subcontractorCost','parkingTolls'
    ];
    nonNegativeFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0) newErrors[f as string] = 'Cannot be negative';
    });

    if (inputs.quoteAmount <= 0) newErrors.quoteAmount = "Quote amount must be greater than £0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProfitability = () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted errors before calculating.",
        variant: "destructive"
      });
      return;
    }

    setCalculated(true);
    
    const vatAmount = vatRegistered ? (inputs.quoteAmount * vatRate) / 100 : 0;
    const labourCostBaseLocal = inputs.labourHours * inputs.hourlyRate;
    const nonBillableCostLocal = (inputs.travelHours + inputs.adminHours) * inputs.hourlyRate;
    const mileageCostLocal = inputs.miles * inputs.mileageRate;
    const consumablesCostLocal = inputs.materialCost * (inputs.consumablesPercent / 100);
    const directCostsLocal = inputs.materialCost + labourCostBaseLocal + nonBillableCostLocal + mileageCostLocal + inputs.parkingTolls + inputs.subcontractorCost + consumablesCostLocal;
    const overheadCostsLocal = directCostsLocal * (inputs.overheadPercentage / 100);
    const contingencyCostLocal = directCostsLocal * (inputs.contingencyPercent / 100);
    const warrantyReserveCostLocal = directCostsLocal * (inputs.warrantyReservePercent / 100);
    const totalCostsLocal = directCostsLocal + overheadCostsLocal + contingencyCostLocal + warrantyReserveCostLocal;
    const minimumQuoteExVATLocal = totalCostsLocal / Math.max(1 - inputs.desiredProfitMargin / 100, 0.01);
    const materialMarkupValueLocal = inputs.materialCost * (inputs.materialMarkupPercent / 100);
    const discountBaseLocal = minimumQuoteExVATLocal + materialMarkupValueLocal;
    const discountValueLocal = discountBaseLocal * (inputs.discountPercent / 100);
    const suggestedClientPriceExVATLocal = discountBaseLocal - discountValueLocal;
    const actualProfitLocal = inputs.quoteAmount - totalCostsLocal;
    const actualProfitMarginLocal = inputs.quoteAmount > 0 ? (actualProfitLocal / inputs.quoteAmount) * 100 : 0;
    
    const newHistoryItem: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      jobType: selectedJobType || "Custom Job",
      inputs: { ...inputs },
      results: {
        totalCosts: totalCostsLocal,
        actualProfit: actualProfitLocal,
        actualProfitMargin: actualProfitMarginLocal,
        vatAmount,
        totalWithVAT: inputs.quoteAmount + vatAmount,
      }
    };
    
    const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem('job-profitability-history', JSON.stringify(updatedHistory));
    
    toast({
      title: "Calculation Complete",
      description: "Your profitability analysis has been updated.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setInputs({
      materialCost: 0,
      labourHours: 0,
      hourlyRate: 0,
      overheadPercentage: 0,
      desiredProfitMargin: 0,
      quoteAmount: 0,
      travelHours: 0,
      adminHours: 0,
      miles: 0,
      mileageRate: 0.45,
      subcontractorCost: 0,
      parkingTolls: 0,
      consumablesPercent: 0,
      materialMarkupPercent: 0,
      contingencyPercent: 0,
      warrantyReservePercent: 0,
      discountPercent: 0,
      workers: [{
        id: '1',
        role: 'Qualified Electrician',
        hours: 0,
        hourlyRate: 45,
        skillLevel: 'qualified'
      }],
      useMultiWorker: false,
    });
    setErrors({});
    setCalculated(false);
    setCustomValues({});
    setSelectedJobType("");
    setSelectedCategory("All");
    setSelectedPreset("");
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = jobTypePresets.find(p => p.id === presetId);
    if (preset) {
      setInputs(prev => ({
        ...prev,
        labourHours: preset.defaults.labourHours,
        hourlyRate: preset.defaults.hourlyRate,
        overheadPercentage: preset.defaults.overheadPercentage,
        desiredProfitMargin: preset.defaults.desiredProfitMargin,
      }));
      setSelectedJobType(preset.name);
      setCalculated(false);
      setCustomValues({});
      toast({
        title: "Preset Applied",
        description: `Values loaded for ${preset.name}`,
        variant: "success"
      });
    }
  };

  const categories = getJobPresetsByCategory();
  const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));
  const presetOptions = getJobPresetOptions(selectedCategory);
  const selectedPresetData = jobTypePresets.find(p => p.id === selectedPreset);

  const handleDropdownChange = (field: keyof JobInputs, value: string) => {
    if (value === "custom") {
      setCustomValues(prev => ({ ...prev, [field]: true }));
    } else {
      setCustomValues(prev => ({ ...prev, [field]: false }));
      updateInput(field, parseFloat(value));
    }
  };

  const shareCalculation = () => {
    if (!calculated) {
      toast({
        title: "Nothing to Share",
        description: "Please calculate first before sharing.",
        variant: "destructive"
      });
      return;
    }

    const shareData = {
      jobType: selectedJobType || "Custom Job",
      materialCost: inputs.materialCost,
      labourHours: inputs.labourHours,
      hourlyRate: inputs.hourlyRate,
      totalCosts: totalCosts.toFixed(2),
      quoteAmount: inputs.quoteAmount,
      profitMargin: actualProfitMargin.toFixed(1)
    };

    if (navigator.share) {
      navigator.share({
        title: 'Job Profitability Calculation',
        text: `${shareData.jobType}: £${shareData.quoteAmount} quote with ${shareData.profitMargin}% margin`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(
        `Job Profitability Analysis\n` +
        `Job Type: ${shareData.jobType}\n` +
        `Quote: £${shareData.quoteAmount}\n` +
        `Total Costs: £${shareData.totalCosts}\n` +
        `Profit Margin: ${shareData.profitMargin}%`
      );
      toast({
        title: "Copied to Clipboard",
        description: "Calculation summary copied to clipboard.",
        variant: "success"
      });
    }
  };

  const loadExample = () => {
    setInputs({
      materialCost: 650,
      labourHours: 8,
      hourlyRate: 52,
      overheadPercentage: 20,
      desiredProfitMargin: 25,
      quoteAmount: 1100,
      travelHours: 1,
      adminHours: 0.5,
      miles: 20,
      mileageRate: 0.45,
      subcontractorCost: 0,
      parkingTolls: 15,
      consumablesPercent: 5,
      materialMarkupPercent: 10,
      contingencyPercent: 5,
      warrantyReservePercent: 0,
      discountPercent: 0,
      workers: [{
        id: '1',
        role: 'Qualified Electrician',
        hours: 8,
        hourlyRate: 52,
        skillLevel: 'qualified'
      }],
      useMultiWorker: false,
    });
    setErrors({});
    setCalculated(false);
  };

  const handleWorkersChange = (workers: Worker[]) => {
    const totalHours = workers.reduce((sum, worker) => sum + worker.hours, 0);
    const totalCost = workers.reduce((sum, worker) => sum + (worker.hours * worker.hourlyRate), 0);
    const blendedRate = totalHours > 0 ? totalCost / totalHours : 0;

    setInputs(prev => ({
      ...prev,
      workers,
      labourHours: totalHours,
      hourlyRate: blendedRate
    }));
    setCalculated(false);
  };

  const toggleMultiWorker = () => {
    setInputs(prev => ({
      ...prev,
      useMultiWorker: !prev.useMultiWorker
    }));
    setCalculated(false);
  };

  const totalLabourHours = inputs.useMultiWorker 
    ? inputs.workers.reduce((sum, worker) => sum + worker.hours, 0)
    : inputs.labourHours;
  
  const totalLabourCost = inputs.useMultiWorker 
    ? inputs.workers.reduce((sum, worker) => sum + (worker.hours * worker.hourlyRate), 0)
    : inputs.labourHours * inputs.hourlyRate;

  const labourCostBase = calculated ? totalLabourCost : 0;
  const blendedHourlyRate = totalLabourHours > 0 ? totalLabourCost / totalLabourHours : inputs.hourlyRate;
  const nonBillableCost = calculated ? (inputs.travelHours + inputs.adminHours) * blendedHourlyRate : 0;
  const mileageCost = calculated ? inputs.miles * inputs.mileageRate : 0;
  const consumablesCost = calculated ? inputs.materialCost * (inputs.consumablesPercent / 100) : 0;
  const directCosts = calculated 
    ? inputs.materialCost + labourCostBase + nonBillableCost + mileageCost + inputs.parkingTolls + inputs.subcontractorCost + consumablesCost 
    : 0;
  const overheadCosts = calculated ? directCosts * (inputs.overheadPercentage / 100) : 0;
  const contingencyCost = calculated ? directCosts * (inputs.contingencyPercent / 100) : 0;
  const warrantyReserveCost = calculated ? directCosts * (inputs.warrantyReservePercent / 100) : 0;
  const totalCosts = calculated ? directCosts + overheadCosts + contingencyCost + warrantyReserveCost : 0;

  const minimumQuoteExVAT = calculated ? totalCosts / Math.max(1 - inputs.desiredProfitMargin / 100, 0.01) : 0;
  const materialMarkupValue = calculated ? inputs.materialCost * (inputs.materialMarkupPercent / 100) : 0;
  const discountBase = calculated ? minimumQuoteExVAT + materialMarkupValue : 0;
  const discountValue = calculated ? discountBase * (inputs.discountPercent / 100) : 0;
  const suggestedClientPriceExVAT = calculated ? discountBase - discountValue : 0;
  const actualProfit = calculated ? inputs.quoteAmount - totalCosts : 0;
  const actualProfitMargin = calculated && inputs.quoteAmount > 0 ? (actualProfit / inputs.quoteAmount) * 100 : 0;
  
  const vatAmount = calculated && vatRegistered ? (inputs.quoteAmount * vatRate) / 100 : 0;
  const totalWithVAT = calculated ? inputs.quoteAmount + vatAmount : 0;

  const getProfitabilityStatus = () => {
    if (!calculated) return null;
    
    if (actualProfitMargin >= inputs.desiredProfitMargin) {
      return {
        status: "success",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Profitable Quote",
        message: `Your quote exceeds the desired profit margin by ${(actualProfitMargin - inputs.desiredProfitMargin).toFixed(1)}%`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    } else {
      return {
        status: "warning",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Unprofitable Quote",
        message: `Increase quote by £${(minimumQuoteExVAT - inputs.quoteAmount).toFixed(2)} to achieve desired margin`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    }
  };

  const profitabilityStatus = getProfitabilityStatus();

  return (
    <div className="min-h-screen px-4 py-8">
      <Helmet>
        <title>Job Profitability Calculator - Electrical Cost Analysis | ElecMate</title>
        <meta name="description" content="Calculate electrical job profitability with our comprehensive calculator. Analyse quotes, labour costs, materials, and VAT to ensure sustainable profit margins for your electrical business." />
        <meta name="keywords" content="job profitability calculator, electrical pricing, quote analysis, profit margin, electrical business tools, BS7671 costing, VAT calculator" />
        <link rel="canonical" href="/electrician/business-development/tools/job-profitability" />
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-elec-yellow" />
            Job Profitability Calculator
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mb-6">
            Analyse quote profitability and calculate minimum pricing to achieve your desired profit margins. 
            BS7671 18th Edition compliant electrical work requires accurate costing for sustainable business growth.
          </p>
          <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
        </div>

        <WhyThisMatters
          points={[
            "Accurate pricing ensures sustainable profit margins - 25% of electrical businesses fail due to cash flow issues from underpricing",
            "Understanding all cost components prevents hidden expenses eroding profits - overhead costs typically represent 15-25% of project value",
            "Multi-worker calculations optimise team efficiency - proper planning can reduce labour costs by 15-20% while improving quality",
            "VAT implications affect cash flow significantly - ensure your pricing accounts for VAT registration thresholds and payment timing",
            "Market positioning through data-driven pricing builds customer trust and professional credibility in competitive tenders",
            "BS7671 18th Edition compliance costs include certification, testing equipment, and ongoing training - factor these into overheads",
            "Competitive advantage comes from understanding true costs - many contractors operate at break-even without realising",
            "Cash flow management requires accurate profit forecasting - delays in payment can impact business sustainability",
            "Regional rate variations affect profitability - London rates may be 30-40% higher than other UK regions",
            "Emergency and out-of-hours work commands premium pricing - factor in weekend/evening rates for maximum profitability"
          ]}
        />

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Job Profitability Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Job Type Presets</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <MobileSelectWrapper
                  label="Job Category"
                  placeholder="Select category"
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  options={categoryOptions}
                  hint="Filter presets by work type"
                />

                <MobileSelectWrapper
                  label="Job Type"
                  placeholder="Select a preset job type"
                  value={selectedPreset}
                  onValueChange={handlePresetChange}
                  options={presetOptions}
                  hint="Choose a preset to auto-fill typical values"
                />
              </div>

              {selectedPresetData && (
                <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
                  <div className="text-center">
                    <h4 className="text-white font-medium">{selectedPresetData.name}</h4>
                  </div>
                  <p className="text-sm text-elec-light/70">{selectedPresetData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div className="text-white font-medium">{selectedPresetData.defaults.labourHours}h</div>
                    </div>
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                        <PoundSterling className="h-3 w-3" />
                      </div>
                      <div className="text-white font-medium">£{selectedPresetData.defaults.hourlyRate}/h</div>
                    </div>
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      <div className="text-white font-medium">{selectedPresetData.defaults.overheadPercentage}%</div>
                      <div className="text-xs text-elec-light/70">overhead</div>
                    </div>
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      <div className="text-white font-medium">{selectedPresetData.defaults.desiredProfitMargin}%</div>
                      <div className="text-xs text-elec-light/70">profit</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Basic Job Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <MobileInput
                  label="Material Cost"
                  type="number"
                  placeholder="Enter material cost"
                  value={inputs.materialCost || ""}
                  onChange={(e) => updateInput('materialCost', parseFloat(e.target.value) || 0)}
                  onFocus={() => clearError('materialCost')}
                  error={errors.materialCost}
                />

                <MobileInput
                  label="Quote Amount (ex VAT)"
                  type="number"
                  placeholder="Enter your quote amount"
                  value={inputs.quoteAmount || ""}
                  onChange={(e) => updateInput('quoteAmount', parseFloat(e.target.value) || 0)}
                  onFocus={() => clearError('quoteAmount')}
                  error={errors.quoteAmount}
                />
              </div>
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Labour Configuration</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-elec-light">Multi-worker</span>
                  <input
                    type="checkbox"
                    checked={inputs.useMultiWorker}
                    onChange={toggleMultiWorker}
                    className="h-4 w-4 rounded border-gray-300 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-0"
                  />
                </div>
              </div>

              {inputs.useMultiWorker ? (
                <div className="space-y-4">
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Team Summary</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-elec-yellow text-xs mb-1">Total Hours</div>
                        <div className="text-white font-medium">{totalLabourHours}h</div>
                      </div>
                      <div className="text-center">
                        <div className="text-elec-yellow text-xs mb-1">Blended Rate</div>
                        <div className="text-white font-medium">£{blendedHourlyRate.toFixed(2)}/h</div>
                      </div>
                      <div className="text-center">
                        <div className="text-elec-yellow text-xs mb-1">Total Cost</div>
                        <div className="text-white font-medium">£{totalLabourCost.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {inputs.workers.map((worker, index) => (
                      <div key={worker.id} className="bg-elec-dark/30 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                            Worker {index + 1}
                          </Badge>
                          {inputs.workers.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const newWorkers = inputs.workers.filter(w => w.id !== worker.id);
                                handleWorkersChange(newWorkers);
                              }}
                              className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <MobileInput
                            label="Hours"
                            type="number"
                            placeholder="0"
                            value={worker.hours || ""}
                            onChange={(e) => {
                              const newWorkers = inputs.workers.map(w => 
                                w.id === worker.id 
                                  ? { ...w, hours: parseFloat(e.target.value) || 0 }
                                  : w
                              );
                              handleWorkersChange(newWorkers);
                            }}
                          />
                          <MobileInput
                            label="Rate (£/hr)"
                            type="number"
                            placeholder="0"
                            value={worker.hourlyRate || ""}
                            onChange={(e) => {
                              const newWorkers = inputs.workers.map(w => 
                                w.id === worker.id 
                                  ? { ...w, hourlyRate: parseFloat(e.target.value) || 0 }
                                  : w
                              );
                              handleWorkersChange(newWorkers);
                            }}
                          />
                        </div>
                        
                        <MobileSelectWrapper
                          label="Role"
                          value={worker.role}
                          onValueChange={(value) => {
                            const newWorkers = inputs.workers.map(w => 
                              w.id === worker.id 
                                ? { ...w, role: value }
                                : w
                            );
                            handleWorkersChange(newWorkers);
                          }}
                          options={[
                            { value: 'Qualified Electrician', label: 'Qualified Electrician' },
                            { value: 'Electrician Mate', label: 'Electrician Mate' },
                            { value: 'Apprentice', label: 'Apprentice' },
                            { value: 'Subcontractor', label: 'Subcontractor' },
                          ]}
                        />
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newWorker: Worker = {
                          id: Date.now().toString(),
                          role: 'Qualified Electrician',
                          hours: 0,
                          hourlyRate: 45,
                          skillLevel: 'qualified'
                        };
                        handleWorkersChange([...inputs.workers, newWorker]);
                      }}
                      className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add Worker
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {customValues.labourHours ? (
                    <MobileInput
                      label="Labour Hours"
                      type="number"
                      placeholder="Enter labour hours"
                      value={inputs.labourHours || ""}
                      onChange={(e) => updateInput('labourHours', parseFloat(e.target.value) || 0)}
                      onFocus={() => clearError('labourHours')}
                      error={errors.labourHours}
                    />
                  ) : (
                    <MobileSelectWrapper
                      label="Labour Hours"
                      placeholder="Select labour hours"
                      value={inputs.labourHours.toString()}
                      onValueChange={(value) => handleDropdownChange('labourHours', value)}
                      options={labourHoursOptions}
                      hint="Select typical hours or choose custom"
                      error={errors.labourHours}
                    />
                  )}

                  {customValues.hourlyRate ? (
                    <MobileInput
                      label="Hourly Rate (£)"
                      type="number"
                      placeholder="Enter hourly rate"
                      value={inputs.hourlyRate || ""}
                      onChange={(e) => updateInput('hourlyRate', parseFloat(e.target.value) || 0)}
                      onFocus={() => clearError('hourlyRate')}
                      error={errors.hourlyRate}
                    />
                  ) : (
                    <MobileSelectWrapper
                      label="Hourly Rate"
                      placeholder="Select hourly rate"
                      value={inputs.hourlyRate.toString()}
                      onValueChange={(value) => handleDropdownChange('hourlyRate', value)}
                      options={hourlyRateOptions}
                      hint="Select rate by experience level"
                      error={errors.hourlyRate}
                    />
                  )}
                </div>
              )}
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Business Parameters</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {customValues.overheadPercentage ? (
                  <MobileInput
                    label="Overhead Percentage (%)"
                    type="number"
                    placeholder="Enter overhead %"
                    value={inputs.overheadPercentage || ""}
                    onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
                    onFocus={() => clearError('overheadPercentage')}
                    error={errors.overheadPercentage}
                  />
                ) : (
                  <MobileSelectWrapper
                    label="Overhead Percentage"
                    placeholder="Select overhead %"
                    value={inputs.overheadPercentage.toString()}
                    onValueChange={(value) => handleDropdownChange('overheadPercentage', value)}
                    options={overheadPercentageOptions}
                    hint="Business overhead costs"
                    error={errors.overheadPercentage}
                  />
                )}

                {customValues.desiredProfitMargin ? (
                  <MobileInput
                    label="Desired Profit Margin (%)"
                    type="number"
                    placeholder="Enter profit margin %"
                    value={inputs.desiredProfitMargin || ""}
                    onChange={(e) => updateInput('desiredProfitMargin', parseFloat(e.target.value) || 0)}
                    onFocus={() => clearError('desiredProfitMargin')}
                    error={errors.desiredProfitMargin}
                  />
                ) : (
                  <MobileSelectWrapper
                    label="Desired Profit Margin"
                    placeholder="Select profit margin %"
                    value={inputs.desiredProfitMargin.toString()}
                    onValueChange={(value) => handleDropdownChange('desiredProfitMargin', value)}
                    options={profitMarginOptions}
                    hint="Target profit margin"
                    error={errors.desiredProfitMargin}
                  />
                )}
              </div>
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">VAT Configuration</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-elec-light">VAT Registration Status</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={vatRegistered}
                        onChange={() => setVATRegistered(true)}
                        className="h-4 w-4 text-elec-yellow focus:ring-elec-yellow"
                      />
                      <span className="text-sm text-elec-light">VAT Registered</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={!vatRegistered}
                        onChange={() => setVATRegistered(false)}
                        className="h-4 w-4 text-elec-yellow focus:ring-elec-yellow"
                      />
                      <span className="text-sm text-elec-light">Not Registered</span>
                    </label>
                  </div>
                </div>

                {vatRegistered && (
                  <MobileSelectWrapper
                    label="VAT Rate"
                    placeholder="Select VAT rate"
                    value={vatRate.toString()}
                    onValueChange={(value) => setVATRate(parseInt(value))}
                    options={[
                      { value: "20", label: "20% - Standard Rate" },
                      { value: "5", label: "5% - Reduced Rate" },
                      { value: "0", label: "0% - Zero Rate" }
                    ]}
                    hint="Standard rate for most electrical work"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={calculateProfitability} 
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium"
                size="lg"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Profitability
              </Button>
              <Button 
                onClick={loadExample} 
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                size="lg"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Load Example
              </Button>
              <Button 
                onClick={resetCalculator} 
                variant="ghost"
                className="text-elec-light hover:text-white hover:bg-elec-dark/50"
                size="lg"
              >
                Reset
              </Button>
            </div>

            {calculated && (
              <>
                <Separator className="bg-elec-yellow/20" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-elec-yellow" />
                    Profitability Analysis
                  </h3>

                  {profitabilityStatus && (
                    <div className={`p-4 rounded-lg border ${profitabilityStatus.bgColor}`}>
                      <div className={`flex items-center gap-2 ${profitabilityStatus.color} mb-2`}>
                        {profitabilityStatus.icon}
                        <span className="font-medium">{profitabilityStatus.title}</span>
                      </div>
                      <p className="text-sm text-elec-light">{profitabilityStatus.message}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">£{totalCosts.toFixed(2)}</div>
                      <div className="text-sm text-elec-light">Total Costs</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">£{actualProfit.toFixed(2)}</div>
                      <div className="text-sm text-elec-light">Actual Profit</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                      <div className={`text-2xl font-bold ${actualProfitMargin >= inputs.desiredProfitMargin ? 'text-green-300' : 'text-red-300'}`}>
                        {actualProfitMargin.toFixed(1)}%
                      </div>
                      <div className="text-sm text-elec-light">Profit Margin</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white">£{minimumQuoteExVAT.toFixed(2)}</div>
                      <div className="text-sm text-elec-light">Min. Quote</div>
                    </div>
                  </div>

                  {vatRegistered && vatAmount > 0 && (
                    <div className="bg-elec-dark/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">VAT Breakdown</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-elec-yellow text-xs mb-1">Quote (ex VAT)</div>
                          <div className="text-white font-medium">£{inputs.quoteAmount.toFixed(2)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-elec-yellow text-xs mb-1">VAT ({vatRate}%)</div>
                          <div className="text-white font-medium">£{vatAmount.toFixed(2)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-elec-yellow text-xs mb-1">Total (inc VAT)</div>
                          <div className="text-white font-medium">£{totalWithVAT.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    onClick={shareCalculation} 
                    variant="outline"
                    className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Results
                  </Button>
                  <Button 
                    onClick={() => setShowHistory(!showHistory)} 
                    variant="ghost"
                    className="text-elec-light hover:text-white hover:bg-elec-dark/50"
                  >
                    <History className="h-4 w-4 mr-2" />
                    History ({history.length})
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobProfitabilityCalculator;