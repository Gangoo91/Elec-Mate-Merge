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

interface JobInputs {
  materialCost: number;
  labourHours: number;
  hourlyRate: number;
  overheadPercentage: number;
  desiredProfitMargin: number;
  quoteAmount: number;
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
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);
  const [customValues, setCustomValues] = useState<{[key: string]: boolean}>({});
  const [vatRate, setVATRate] = useState(20);
  const [vatRegistered, setVATRegistered] = useState(true);
  const [selectedJobType, setSelectedJobType] = useState<string>("");
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
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Reset calculation state when inputs change
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

    if (inputs.materialCost <= 0) newErrors.materialCost = "Material cost must be greater than £0";
    if (inputs.labourHours <= 0) newErrors.labourHours = "Labour hours must be greater than 0";
    if (inputs.hourlyRate <= 0) newErrors.hourlyRate = "Hourly rate must be greater than £0";
    if (inputs.overheadPercentage < 0 || inputs.overheadPercentage > 100) {
      newErrors.overheadPercentage = "Overhead percentage must be between 0-100%";
    }
    if (inputs.desiredProfitMargin < 0 || inputs.desiredProfitMargin > 100) {
      newErrors.desiredProfitMargin = "Profit margin must be between 0-100%";
    }
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
    
    // Save to history
    const vatAmount = vatRegistered ? (inputs.quoteAmount * vatRate) / 100 : 0;
    const labourCost = inputs.labourHours * inputs.hourlyRate;
    const directCosts = inputs.materialCost + labourCost;
    const overheadCosts = directCosts * (inputs.overheadPercentage / 100);
    const totalCosts = directCosts + overheadCosts;
    const actualProfit = inputs.quoteAmount - totalCosts;
    const actualProfitMargin = inputs.quoteAmount > 0 ? (actualProfit / inputs.quoteAmount) * 100 : 0;
    
    const newHistoryItem: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      jobType: selectedJobType || "Custom Job",
      inputs: { ...inputs },
      results: {
        totalCosts,
        actualProfit,
        actualProfitMargin,
        vatAmount,
        totalWithVAT: inputs.quoteAmount + vatAmount
      }
    };
    
    const updatedHistory = [newHistoryItem, ...history.slice(0, 9)]; // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem('job-profitability-history', JSON.stringify(updatedHistory));
    
    toast({
      title: "Calculation Complete",
      description: "Your profitability analysis has been updated and saved to history.",
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
    });
    setErrors({});
    setCalculated(false);
    setCustomValues({});
    setSelectedJobType("");
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const handlePresetSelected = (preset: JobPreset) => {
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
  };

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
      materialCost: 500,
      labourHours: 8,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25,
      quoteAmount: 900,
    });
    setErrors({});
    setCalculated(false);
  };

  // Calculations (only if calculated is true)
  const labourCost = calculated ? inputs.labourHours * inputs.hourlyRate : 0;
  const directCosts = calculated ? inputs.materialCost + labourCost : 0;
  const overheadCosts = calculated ? directCosts * (inputs.overheadPercentage / 100) : 0;
  const totalCosts = calculated ? directCosts + overheadCosts : 0;
  
  const minimumQuote = calculated ? totalCosts / (1 - inputs.desiredProfitMargin / 100) : 0;
  const actualProfit = calculated ? inputs.quoteAmount - totalCosts : 0;
  const actualProfitMargin = calculated && inputs.quoteAmount > 0 ? (actualProfit / inputs.quoteAmount) * 100 : 0;
  
  // VAT calculations
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
        message: `Increase quote by £${(minimumQuote - inputs.quoteAmount).toFixed(2)} to achieve desired margin`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    }
  };

  const profitabilityStatus = getProfitabilityStatus();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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

      <div className="grid lg:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto">
        {/* Job Presets */}
        <div className="lg:col-span-1">
          <JobPresetSelector onPresetSelected={handlePresetSelected} />
        </div>

        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <PoundSterling className="h-5 w-5 text-elec-yellow" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MobileInput
                label="Material Cost"
                type="number"
                value={inputs.materialCost || ""}
                onChange={(e) => updateInput('materialCost', parseFloat(e.target.value) || 0)}
                error={errors.materialCost}
                clearError={() => clearError('materialCost')}
                unit="£"
                hint="Include all materials, cables, accessories, and components"
              />

              {customValues.labourHours ? (
                <MobileInput
                  label="Labour Hours"
                  type="number"
                  value={inputs.labourHours || ""}
                  onChange={(e) => updateInput('labourHours', parseFloat(e.target.value) || 0)}
                  error={errors.labourHours}
                  clearError={() => clearError('labourHours')}
                  hint="Total hours including testing and certification"
                />
              ) : (
                <MobileSelectWrapper
                  label="Labour Hours"
                  placeholder="Select labour hours"
                  value={inputs.labourHours.toString()}
                  onValueChange={(value) => handleDropdownChange('labourHours', value)}
                  options={labourHoursOptions}
                  error={errors.labourHours}
                  hint="Choose typical duration or select custom"
                />
              )}

              {customValues.hourlyRate ? (
                <MobileInput
                  label="Hourly Rate"
                  type="number"
                  value={inputs.hourlyRate || ""}
                  onChange={(e) => updateInput('hourlyRate', parseFloat(e.target.value) || 0)}
                  error={errors.hourlyRate}
                  clearError={() => clearError('hourlyRate')}
                  unit="£"
                  hint="Your standard hourly charging rate"
                />
              ) : (
                <MobileSelectWrapper
                  label="Hourly Rate"
                  placeholder="Select hourly rate"
                  value={inputs.hourlyRate.toString()}
                  onValueChange={(value) => handleDropdownChange('hourlyRate', value)}
                  options={hourlyRateOptions}
                  error={errors.hourlyRate}
                  hint="Choose standard rate or select custom"
                />
              )}

              {customValues.overheadPercentage ? (
                <MobileInput
                  label="Overhead Percentage"
                  type="number"
                  value={inputs.overheadPercentage || ""}
                  onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
                  error={errors.overheadPercentage}
                  clearError={() => clearError('overheadPercentage')}
                  unit="%"
                  hint="Vehicle, insurance, tools, office costs"
                />
              ) : (
                <MobileSelectWrapper
                  label="Overhead Percentage"
                  placeholder="Select overhead percentage"
                  value={inputs.overheadPercentage.toString()}
                  onValueChange={(value) => handleDropdownChange('overheadPercentage', value)}
                  options={overheadPercentageOptions}
                  error={errors.overheadPercentage}
                  hint="Business running costs as percentage"
                />
              )}

              {customValues.desiredProfitMargin ? (
                <MobileInput
                  label="Desired Profit Margin"
                  type="number"
                  value={inputs.desiredProfitMargin || ""}
                  onChange={(e) => updateInput('desiredProfitMargin', parseFloat(e.target.value) || 0)}
                  error={errors.desiredProfitMargin}
                  clearError={() => clearError('desiredProfitMargin')}
                  unit="%"
                  hint="Target profit percentage"
                />
              ) : (
                <MobileSelectWrapper
                  label="Desired Profit Margin"
                  placeholder="Select profit margin"
                  value={inputs.desiredProfitMargin.toString()}
                  onValueChange={(value) => handleDropdownChange('desiredProfitMargin', value)}
                  options={profitMarginOptions}
                  error={errors.desiredProfitMargin}
                  hint="Target profit for sustainability"
                />
              )}

              <MobileInput
                label="Your Quote Amount"
                type="number"
                value={inputs.quoteAmount || ""}
                onChange={(e) => updateInput('quoteAmount', parseFloat(e.target.value) || 0)}
                error={errors.quoteAmount}
                clearError={() => clearError('quoteAmount')}
                unit="£"
                hint="The total amount you're quoting to the customer"
              />

              <div className="flex gap-3">
                <Button 
                  onClick={calculateProfitability}
                  className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  disabled={Object.keys(errors).length > 0}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button 
                  onClick={loadExample}
                  variant="outline"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  Example
                </Button>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={resetCalculator}
                  variant="outline"
                  className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  Reset All
                </Button>
                {calculated && (
                  <Button 
                    onClick={shareCalculation}
                    variant="outline"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VAT Calculator */}
        <div className="lg:col-span-1">
          <VATCalculator
            quoteAmount={inputs.quoteAmount}
            vatRate={vatRate}
            onVATRateChange={setVATRate}
            vatRegistered={vatRegistered}
            onVATRegistrationChange={setVATRegistered}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Profitability Analysis
                {calculated && (
                  <Badge variant="success" className="ml-auto">
                    Calculated
                  </Badge>
                )}
                <div className="ml-auto flex gap-2">
                  {history.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!calculated ? (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                  <p className="text-muted-foreground">
                    Fill in all job details and click "Calculate" to see your profitability analysis.
                  </p>
                </div>
              ) : (
                <>
                  {/* Cost Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center justify-center gap-2">
                      <PoundSterling className="h-4 w-4 text-elec-yellow" />
                      Cost Breakdown
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-white">
                        <span>Material Costs:</span>
                        <span>£{inputs.materialCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Labour Costs ({inputs.labourHours}h × £{inputs.hourlyRate}):</span>
                        <span>£{labourCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Overhead Costs ({inputs.overheadPercentage}%):</span>
                        <span>£{overheadCosts.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-elec-yellow/20" />
                      <div className="flex justify-between text-white font-semibold text-lg">
                        <span>Total Project Costs:</span>
                        <span className="text-elec-yellow">£{totalCosts.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-elec-yellow/30" />

                  {/* Profitability Analysis */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center justify-center gap-2">
                      <TrendingUp className="h-4 w-4 text-elec-yellow" />
                      Profitability Metrics
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-white">
                          <span>Minimum Quote Required:</span>
                          <span className="text-elec-yellow font-semibold">£{minimumQuote.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span>Your Quote:</span>
                          <span>£{inputs.quoteAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-white">
                          <span>Actual Profit:</span>
                          <span className={actualProfit >= 0 ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                            £{actualProfit.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span>Actual Profit Margin:</span>
                          <span className={actualProfitMargin >= inputs.desiredProfitMargin ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                            {actualProfitMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Alert */}
                  {profitabilityStatus && (
                    <>
                      <Separator className="bg-elec-yellow/30" />
                      <div className={`p-6 rounded-lg border ${profitabilityStatus.bgColor}`}>
                        <div className={`flex items-center gap-3 mb-3 ${profitabilityStatus.color}`}>
                          {profitabilityStatus.icon}
                          <h3 className="font-semibold text-lg">{profitabilityStatus.title}</h3>
                        </div>
                        <p className={`${profitabilityStatus.color.replace('300', '200')} mb-4`}>
                          {profitabilityStatus.message}
                        </p>
                        
                        {/* Educational Insight */}
                        <div className="bg-background/10 rounded-lg p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                            <div>
                              <h4 className="text-white font-medium mb-2">Professional Insight</h4>
                              <p className="text-sm text-muted-foreground">
                                {actualProfitMargin >= inputs.desiredProfitMargin
                                  ? "Excellent! Your quote maintains healthy margins while remaining competitive. Consider this pricing structure for similar projects to ensure consistent profitability."
                                  : "Your current quote may not cover all business costs and desired profit. Consider increasing the quote or reviewing your overhead calculations to ensure sustainable business operations."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                   {/* VAT Summary */}
                   {vatRegistered && (
                     <>
                       <Separator className="bg-elec-yellow/30" />
                       <div className="space-y-4">
                         <h4 className="text-white font-semibold flex items-center justify-center gap-2">
                           <Receipt className="h-4 w-4 text-elec-yellow" />
                           VAT Summary
                         </h4>
                         <div className="grid md:grid-cols-2 gap-4">
                           <div className="space-y-3">
                             <div className="flex justify-between text-white">
                               <span>Net Amount:</span>
                               <span>£{inputs.quoteAmount.toFixed(2)}</span>
                             </div>
                             <div className="flex justify-between text-white">
                               <span>VAT ({vatRate}%):</span>
                               <span>£{vatAmount.toFixed(2)}</span>
                             </div>
                           </div>
                           <div className="space-y-3">
                             <div className="flex justify-between text-white font-semibold text-lg">
                               <span>Total with VAT:</span>
                               <span className="text-elec-yellow">£{totalWithVAT.toFixed(2)}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </>
                   )}

                   {/* Export Button */}
                  <div className="flex justify-center pt-4">
                    <Button 
                      variant="outline"
                      className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      onClick={() => {
                        toast({
                          title: "Export Feature",
                          description: "PDF export functionality coming soon!",
                          variant: "default"
                        });
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History Section */}
      {showHistory && history.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="h-5 w-5 text-elec-yellow" />
              Calculation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.slice(0, 5).map((item) => (
                <div key={item.id} className="bg-elec-dark/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{item.jobType}</h4>
                      <p className="text-xs text-elec-light/60">
                        {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-elec-yellow font-semibold">£{item.inputs.quoteAmount.toFixed(2)}</p>
                      <p className={`text-sm ${item.results.actualProfitMargin >= 20 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.results.actualProfitMargin.toFixed(1)}% margin
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-elec-light/70">
                    <span>Labour: {item.inputs.labourHours}h × £{item.inputs.hourlyRate}</span>
                    <span>Materials: £{item.inputs.materialCost.toFixed(2)}</span>
                    <span>Profit: £{item.results.actualProfit.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {history.length > 5 && (
                <p className="text-center text-elec-light/60 text-sm">
                  Showing 5 of {history.length} calculations
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Professional Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Overhead Costs</h4>
              <p className="text-sm text-muted-foreground">
                Include vehicle costs, insurance, test equipment calibration, office rent, 
                and tool replacement in your overhead percentage.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Profit Margins</h4>
              <p className="text-sm text-muted-foreground">
                Aim for 20-30% profit margins on domestic work and 15-25% on commercial projects 
                to ensure business sustainability and growth.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">BS7671 Compliance</h4>
              <p className="text-sm text-muted-foreground">
                Always factor in time for proper testing, certification, and documentation 
                required by the 18th Edition regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobProfitabilityCalculator;