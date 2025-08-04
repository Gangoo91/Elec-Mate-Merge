import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Target, PoundSterling, TrendingUp, Users, Clock, CheckCircle, Download, Lightbulb, BarChart3 } from "lucide-react";

interface PricingInputs {
  hourlyRate: number;
  materialsMarkup: number;
  overheadPercentage: number;
  profitMargin: number;
  averageJobSize: number;
  targetMonthlyRevenue: number;
  workingDaysPerMonth: number;
  hoursPerDay: number;
}

interface CompetitorData {
  name: string;
  estimatedRate: number;
  marketPosition: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const PricingStrategyCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<PricingInputs>({
    hourlyRate: 0,
    materialsMarkup: 0,
    overheadPercentage: 0,
    profitMargin: 0,
    averageJobSize: 0,
    targetMonthlyRevenue: 0,
    workingDaysPerMonth: 22,
    hoursPerDay: 8,
  });

  const [competitors, setCompetitors] = useState<CompetitorData[]>([
    { name: "Local Competitor A", estimatedRate: 45, marketPosition: "Premium" },
    { name: "Local Competitor B", estimatedRate: 38, marketPosition: "Mid-range" },
    { name: "Local Competitor C", estimatedRate: 32, marketPosition: "Budget" },
  ]);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);

  const updateInput = (field: keyof PricingInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearError(field);
    setCalculated(false);
  };

  const updateCompetitor = (index: number, field: keyof Omit<CompetitorData, 'marketPosition'>, value: string | number) => {
    setCompetitors(prev => prev.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    ));
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

    if (inputs.hourlyRate <= 0) newErrors.hourlyRate = "Hourly rate must be greater than £0";
    if (inputs.materialsMarkup < 0 || inputs.materialsMarkup > 200) {
      newErrors.materialsMarkup = "Materials markup must be between 0-200%";
    }
    if (inputs.overheadPercentage < 0 || inputs.overheadPercentage > 100) {
      newErrors.overheadPercentage = "Overhead percentage must be between 0-100%";
    }
    if (inputs.profitMargin < 0 || inputs.profitMargin > 100) {
      newErrors.profitMargin = "Profit margin must be between 0-100%";
    }
    if (inputs.averageJobSize <= 0) newErrors.averageJobSize = "Average job size must be greater than £0";
    if (inputs.targetMonthlyRevenue <= 0) newErrors.targetMonthlyRevenue = "Target monthly revenue must be greater than £0";
    if (inputs.workingDaysPerMonth < 1 || inputs.workingDaysPerMonth > 31) {
      newErrors.workingDaysPerMonth = "Working days must be between 1-31";
    }
    if (inputs.hoursPerDay < 1 || inputs.hoursPerDay > 16) {
      newErrors.hoursPerDay = "Hours per day must be between 1-16";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePricing = () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted errors before calculating.",
        variant: "destructive"
      });
      return;
    }

    setCalculated(true);
    toast({
      title: "Pricing Strategy Calculated",
      description: "Your pricing analysis has been updated.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setInputs({
      hourlyRate: 0,
      materialsMarkup: 0,
      overheadPercentage: 0,
      profitMargin: 0,
      averageJobSize: 0,
      targetMonthlyRevenue: 0,
      workingDaysPerMonth: 22,
      hoursPerDay: 8,
    });
    setErrors({});
    setCalculated(false);
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const loadExample = () => {
    setInputs({
      hourlyRate: 45,
      materialsMarkup: 25,
      overheadPercentage: 20,
      profitMargin: 25,
      averageJobSize: 800,
      targetMonthlyRevenue: 8000,
      workingDaysPerMonth: 22,
      hoursPerDay: 8,
    });
    setErrors({});
    setCalculated(false);
  };

  // Calculations
  const calculateMetrics = () => {
    if (!calculated) return null;

    const totalAvailableHours = inputs.workingDaysPerMonth * inputs.hoursPerDay;
    const requiredHourlyRate = inputs.targetMonthlyRevenue / totalAvailableHours;
    
    // Job costing calculations
    const averageJobHours = inputs.averageJobSize / inputs.hourlyRate;
    const materialCost = inputs.averageJobSize * 0.3; // Assume 30% materials
    const materialPrice = materialCost * (1 + inputs.materialsMarkup / 100);
    const labourCost = averageJobHours * inputs.hourlyRate;
    const totalDirectCosts = labourCost + materialCost;
    const overheadCosts = totalDirectCosts * (inputs.overheadPercentage / 100);
    const totalCosts = totalDirectCosts + overheadCosts;
    const minimumQuote = totalCosts / (1 - inputs.profitMargin / 100);
    
    // Market position analysis
    const avgCompetitorRate = competitors.reduce((sum, comp) => sum + comp.estimatedRate, 0) / competitors.length;
    const rateComparison = ((inputs.hourlyRate - avgCompetitorRate) / avgCompetitorRate) * 100;
    
    // Revenue projections
    const jobsPerMonth = totalAvailableHours / averageJobHours;
    const projectedMonthlyRevenue = jobsPerMonth * minimumQuote;
    const revenueGap = inputs.targetMonthlyRevenue - projectedMonthlyRevenue;

    return {
      totalAvailableHours,
      requiredHourlyRate,
      averageJobHours,
      materialPrice,
      minimumQuote,
      avgCompetitorRate,
      rateComparison,
      jobsPerMonth,
      projectedMonthlyRevenue,
      revenueGap,
      utilizationRate: (inputs.targetMonthlyRevenue / (totalAvailableHours * inputs.hourlyRate)) * 100
    };
  };

  const metrics = calculateMetrics();

  const getMarketPosition = () => {
    if (!metrics) return null;

    if (metrics.rateComparison > 15) {
      return {
        position: "Premium",
        color: "text-blue-300",
        bgColor: "bg-blue-500/20",
        message: "Positioned above market average - ensure value justification"
      };
    } else if (metrics.rateComparison > -10) {
      return {
        position: "Competitive",
        color: "text-green-300",
        bgColor: "bg-green-500/20",
        message: "Well-positioned within market range"
      };
    } else {
      return {
        position: "Budget",
        color: "text-orange-300",
        bgColor: "bg-orange-500/20",
        message: "Below market average - consider value positioning"
      };
    }
  };

  const marketPosition = getMarketPosition();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Target className="h-8 w-8 text-elec-yellow" />
          Pricing Strategy Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Develop competitive pricing strategies based on costs, market analysis, and revenue targets.
          Ensure profitability while maintaining BS7671 18th Edition compliance standards.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Pricing Inputs */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Pricing Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Current Hourly Rate"
              type="number"
              value={inputs.hourlyRate || ""}
              onChange={(e) => updateInput('hourlyRate', parseFloat(e.target.value) || 0)}
              error={errors.hourlyRate}
              clearError={() => clearError('hourlyRate')}
              unit="£"
              hint="Your current or proposed hourly rate"
            />

            <MobileInput
              label="Materials Markup"
              type="number"
              value={inputs.materialsMarkup || ""}
              onChange={(e) => updateInput('materialsMarkup', parseFloat(e.target.value) || 0)}
              error={errors.materialsMarkup}
              clearError={() => clearError('materialsMarkup')}
              unit="%"
              hint="Markup percentage on material costs (typically 20-40%)"
            />

            <MobileInput
              label="Overhead Percentage"
              type="number"
              value={inputs.overheadPercentage || ""}
              onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
              error={errors.overheadPercentage}
              clearError={() => clearError('overheadPercentage')}
              unit="%"
              hint="Business overhead costs (insurance, vehicle, tools)"
            />

            <MobileInput
              label="Target Profit Margin"
              type="number"
              value={inputs.profitMargin || ""}
              onChange={(e) => updateInput('profitMargin', parseFloat(e.target.value) || 0)}
              error={errors.profitMargin}
              clearError={() => clearError('profitMargin')}
              unit="%"
              hint="Desired profit percentage (typically 20-30%)"
            />

            <MobileInput
              label="Average Job Size"
              type="number"
              value={inputs.averageJobSize || ""}
              onChange={(e) => updateInput('averageJobSize', parseFloat(e.target.value) || 0)}
              error={errors.averageJobSize}
              clearError={() => clearError('averageJobSize')}
              unit="£"
              hint="Typical job value for your business"
            />

            <MobileInput
              label="Target Monthly Revenue"
              type="number"
              value={inputs.targetMonthlyRevenue || ""}
              onChange={(e) => updateInput('targetMonthlyRevenue', parseFloat(e.target.value) || 0)}
              error={errors.targetMonthlyRevenue}
              clearError={() => clearError('targetMonthlyRevenue')}
              unit="£"
              hint="Monthly revenue goal"
            />

            <div className="grid grid-cols-2 gap-4">
              <MobileInput
                label="Working Days/Month"
                type="number"
                value={inputs.workingDaysPerMonth || ""}
                onChange={(e) => updateInput('workingDaysPerMonth', parseInt(e.target.value) || 22)}
                error={errors.workingDaysPerMonth}
                clearError={() => clearError('workingDaysPerMonth')}
                hint="Typically 22 days"
              />

              <MobileInput
                label="Hours/Day"
                type="number"
                value={inputs.hoursPerDay || ""}
                onChange={(e) => updateInput('hoursPerDay', parseInt(e.target.value) || 8)}
                error={errors.hoursPerDay}
                clearError={() => clearError('hoursPerDay')}
                hint="Billable hours per day"
              />
            </div>
          </CardContent>
        </Card>

        {/* Market Analysis */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Market Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Update competitor rates to understand your market position:
            </p>
            
            {competitors.map((competitor, index) => (
              <div key={index} className="space-y-3 p-4 bg-elec-gray rounded-lg">
                <MobileInput
                  label={`${competitor.name} Rate`}
                  type="number"
                  value={competitor.estimatedRate || ""}
                  onChange={(e) => updateCompetitor(index, 'estimatedRate', parseFloat(e.target.value) || 0)}
                  unit="£/hour"
                  hint={`${competitor.marketPosition} positioning`}
                />
              </div>
            ))}

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Market Insights</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Research local competitors through online directories</p>
                <p>• Check Checkatrade, Rated People for rate comparisons</p>
                <p>• Consider specialization premium (e.g., EV charging)</p>
                <p>• Factor in your qualifications and experience</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculatePricing}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={Object.keys(errors).length > 0}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyse Pricing
              </Button>
              <Button 
                onClick={loadExample}
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Example
              </Button>
            </div>

            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <Card className="border-elec-yellow/20 bg-elec-card mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Pricing Strategy Analysis
            {calculated && (
              <Badge variant="success" className="ml-auto">
                Calculated
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!calculated ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Analyse</h3>
              <p className="text-muted-foreground">
                Enter your pricing parameters and click "Analyse Pricing" to see your strategy recommendations.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Required Rate</h4>
                    <p className="text-xl font-bold text-elec-yellow">£{metrics?.requiredHourlyRate.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">To hit target</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Market Average</h4>
                    <p className="text-xl font-bold text-elec-yellow">£{metrics?.avgCompetitorRate.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Competitor avg</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Jobs/Month</h4>
                    <p className="text-xl font-bold text-elec-yellow">{metrics?.jobsPerMonth.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground mt-1">At current rate</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Utilization</h4>
                    <p className={`text-xl font-bold ${
                      metrics && metrics.utilizationRate <= 100 ? "text-green-400" : "text-red-400"
                    }`}>
                      {metrics?.utilizationRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Of capacity</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-elec-yellow/30" />

              {/* Market Position Analysis */}
              {marketPosition && (
                <div className={`p-6 rounded-lg border ${marketPosition.bgColor}`}>
                  <div className={`flex items-center gap-3 mb-3 ${marketPosition.color}`}>
                    <Target className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">Market Position: {marketPosition.position}</h3>
                  </div>
                  <p className={`${marketPosition.color.replace('300', '200')} mb-4`}>
                    {marketPosition.message}
                  </p>
                  
                  <div className="bg-background/10 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium mb-2">Strategic Recommendations</h4>
                        <div className="text-sm text-muted-foreground space-y-2">
                          {metrics && metrics.rateComparison > 15 && (
                            <>
                              <p>• Emphasize premium qualifications and certifications</p>
                              <p>• Highlight advanced equipment and testing capabilities</p>
                              <p>• Focus on quality and compliance guarantees</p>
                            </>
                          )}
                          {metrics && metrics.rateComparison <= 15 && metrics.rateComparison > -10 && (
                            <>
                              <p>• Maintain current positioning with value differentiation</p>
                              <p>• Consider specialized services (EV charging, smart homes)</p>
                              <p>• Build customer relationships for repeat business</p>
                            </>
                          )}
                          {metrics && metrics.rateComparison <= -10 && (
                            <>
                              <p>• Consider gradual rate increases with existing customers</p>
                              <p>• Reduce costs where possible to maintain margins</p>
                              <p>• Focus on efficiency and quick turnaround times</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-elec-yellow/30" />

              {/* Job Costing Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Job Costing Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Average job hours:</span>
                      <span>{metrics?.averageJobHours.toFixed(1)}h</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Labour cost:</span>
                      <span>£{(inputs.hourlyRate * (metrics?.averageJobHours || 0)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Material cost (with markup):</span>
                      <span>£{metrics?.materialPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Overhead allocation:</span>
                      <span>£{((inputs.hourlyRate * (metrics?.averageJobHours || 0) + (inputs.averageJobSize * 0.3)) * (inputs.overheadPercentage / 100)).toFixed(2)}</span>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div className="flex justify-between text-white font-semibold">
                      <span>Minimum quote required:</span>
                      <span className="text-elec-yellow">£{metrics?.minimumQuote.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Revenue Projection</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Available hours/month:</span>
                      <span>{metrics?.totalAvailableHours}h</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Potential jobs/month:</span>
                      <span>{metrics?.jobsPerMonth.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Projected revenue:</span>
                      <span>£{metrics?.projectedMonthlyRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Target revenue:</span>
                      <span>£{inputs.targetMonthlyRevenue.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div className="flex justify-between text-white font-semibold">
                      <span>Revenue gap:</span>
                      <span className={metrics && metrics.revenueGap <= 0 ? "text-green-400" : "text-red-400"}>
                        £{metrics?.revenueGap.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <div className="flex justify-end pt-4">
                <Button 
                  variant="outline"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  onClick={() => {
                    toast({
                      title: "Export Feature",
                      description: "Pricing strategy export functionality coming soon!",
                      variant: "default"
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Strategy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Pricing Strategy Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Value-Based Pricing</h4>
              <p className="text-sm text-muted-foreground">
                Price based on value delivered, not just costs. BS7671 compliance, 
                certification quality, and professional service justify premium rates.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Market Research</h4>
              <p className="text-sm text-muted-foreground">
                Regularly review competitor pricing, especially for specialized work 
                like EV charging, smart homes, or commercial installations.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Pricing Communication</h4>
              <p className="text-sm text-muted-foreground">
                Always explain what's included: materials, labour, testing, certification, 
                warranty, and compliance with current regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingStrategyCalculator;