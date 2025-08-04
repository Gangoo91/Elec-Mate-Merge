import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, PoundSterling, Clock, Wrench, TrendingUp, CheckCircle, AlertTriangle, Download, Lightbulb } from "lucide-react";

interface EquipmentInput {
  name: string;
  purchasePrice: number;
  monthlyMaintenance: number;
  expectedLifespan: number;
  hoursPerMonth: number;
  rateIncrease: number;
  timesSaved: number;
  calibrationCost: number;
}

interface ValidationErrors {
  [key: string]: string;
}

const EquipmentROICalculator = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<EquipmentInput>({
    name: "",
    purchasePrice: 0,
    monthlyMaintenance: 0,
    expectedLifespan: 0,
    hoursPerMonth: 0,
    rateIncrease: 0,
    timesSaved: 0,
    calibrationCost: 0,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);

  const updateInput = (field: keyof EquipmentInput, value: string | number) => {
    setEquipment(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearError(field);
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

    if (!equipment.name.trim()) newErrors.name = "Equipment name is required";
    if (equipment.purchasePrice <= 0) newErrors.purchasePrice = "Purchase price must be greater than £0";
    if (equipment.monthlyMaintenance < 0) newErrors.monthlyMaintenance = "Monthly maintenance cannot be negative";
    if (equipment.expectedLifespan <= 0 || equipment.expectedLifespan > 50) {
      newErrors.expectedLifespan = "Expected lifespan must be between 1-50 years";
    }
    if (equipment.hoursPerMonth < 0) newErrors.hoursPerMonth = "Hours per month cannot be negative";
    if (equipment.rateIncrease < 0) newErrors.rateIncrease = "Rate increase cannot be negative";
    if (equipment.timesSaved < 0) newErrors.timesSaved = "Time savings cannot be negative";
    if (equipment.calibrationCost < 0) newErrors.calibrationCost = "Calibration cost cannot be negative";

    // At least one benefit must be specified
    if (equipment.rateIncrease === 0 && equipment.timesSaved === 0 && equipment.hoursPerMonth === 0) {
      newErrors.general = "Please specify at least one benefit: additional hours, rate increase, or time savings";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateROI = () => {
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
      title: "ROI Calculated",
      description: "Equipment return on investment analysis complete.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setEquipment({
      name: "",
      purchasePrice: 0,
      monthlyMaintenance: 0,
      expectedLifespan: 0,
      hoursPerMonth: 0,
      rateIncrease: 0,
      timesSaved: 0,
      calibrationCost: 0,
    });
    setErrors({});
    setCalculated(false);
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const loadExample = (type: 'tester' | 'van' | 'tools') => {
    switch (type) {
      case 'tester':
        setEquipment({
          name: "Megger MFT1741 Multifunction Tester",
          purchasePrice: 1200,
          monthlyMaintenance: 25,
          expectedLifespan: 8,
          hoursPerMonth: 40,
          rateIncrease: 5,
          timesSaved: 2,
          calibrationCost: 120,
        });
        break;
      case 'van':
        setEquipment({
          name: "Ford Transit Custom (with racking)",
          purchasePrice: 28000,
          monthlyMaintenance: 400,
          expectedLifespan: 7,
          hoursPerMonth: 20,
          rateIncrease: 0,
          timesSaved: 8,
          calibrationCost: 0,
        });
        break;
      case 'tools':
        setEquipment({
          name: "Professional Power Tool Set",
          purchasePrice: 2500,
          monthlyMaintenance: 50,
          expectedLifespan: 5,
          hoursPerMonth: 15,
          rateIncrease: 3,
          timesSaved: 5,
          calibrationCost: 0,
        });
        break;
    }
    setErrors({});
    setCalculated(false);
  };

  // ROI Calculations
  const calculateMetrics = () => {
    if (!calculated) return null;

    const monthsInLifespan = equipment.expectedLifespan * 12;
    const annualCalibrationCost = equipment.calibrationCost;
    const totalMaintenanceCost = (equipment.monthlyMaintenance * monthsInLifespan) + (annualCalibrationCost * equipment.expectedLifespan);
    const totalCostOfOwnership = equipment.purchasePrice + totalMaintenanceCost;

    // Revenue benefits
    const additionalMonthlyRevenue = equipment.hoursPerMonth * equipment.rateIncrease;
    const timeSavingsRevenue = equipment.timesSaved * 45; // Assume £45/hour rate
    const totalMonthlyBenefit = additionalMonthlyRevenue + timeSavingsRevenue;
    const totalLifespanBenefit = totalMonthlyBenefit * monthsInLifespan;

    // ROI calculations
    const netBenefit = totalLifespanBenefit - totalCostOfOwnership;
    const roiPercentage = ((netBenefit / equipment.purchasePrice) * 100);
    const paybackMonths = totalCostOfOwnership / totalMonthlyBenefit;
    const monthlyROI = (netBenefit / monthsInLifespan);

    // Break-even analysis
    const breakEvenPoint = equipment.purchasePrice / totalMonthlyBenefit;

    return {
      monthsInLifespan,
      totalMaintenanceCost,
      totalCostOfOwnership,
      totalMonthlyBenefit,
      totalLifespanBenefit,
      netBenefit,
      roiPercentage,
      paybackMonths,
      monthlyROI,
      breakEvenPoint,
      isPositiveROI: netBenefit > 0,
      annualRevenue: totalMonthlyBenefit * 12
    };
  };

  const metrics = calculateMetrics();

  const getROIStatus = () => {
    if (!metrics) return null;

    if (metrics.roiPercentage > 100) {
      return {
        status: "excellent",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Excellent Investment",
        message: `Outstanding ROI of ${metrics.roiPercentage.toFixed(1)}% over equipment lifespan`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    } else if (metrics.roiPercentage > 20) {
      return {
        status: "good",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Good Investment",
        message: `Solid ROI of ${metrics.roiPercentage.toFixed(1)}% justifies the purchase`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    } else if (metrics.roiPercentage > 0) {
      return {
        status: "marginal",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Marginal Investment",
        message: `Low ROI of ${metrics.roiPercentage.toFixed(1)}% - consider alternatives`,
        color: "text-orange-300",
        bgColor: "bg-orange-500/20 border-orange-500/30"
      };
    } else {
      return {
        status: "poor",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Poor Investment",
        message: `Negative ROI of ${metrics.roiPercentage.toFixed(1)}% - not recommended`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    }
  };

  const roiStatus = getROIStatus();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-elec-yellow" />
          Equipment ROI Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate return on investment for equipment purchases. Make informed decisions about 
          test equipment, vehicles, and tools required for BS7671 18th Edition compliance.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Equipment Details */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Equipment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Equipment Name"
              type="text"
              value={equipment.name}
              onChange={(e) => updateInput('name', e.target.value)}
              error={errors.name}
              clearError={() => clearError('name')}
              hint="e.g., Multifunction Tester, Van, Tool Set"
            />

            <MobileInput
              label="Purchase Price"
              type="number"
              value={equipment.purchasePrice || ""}
              onChange={(e) => updateInput('purchasePrice', parseFloat(e.target.value) || 0)}
              error={errors.purchasePrice}
              clearError={() => clearError('purchasePrice')}
              unit="£"
              hint="Total cost including delivery and setup"
            />

            <MobileInput
              label="Monthly Maintenance Cost"
              type="number"
              value={equipment.monthlyMaintenance || ""}
              onChange={(e) => updateInput('monthlyMaintenance', parseFloat(e.target.value) || 0)}
              error={errors.monthlyMaintenance}
              clearError={() => clearError('monthlyMaintenance')}
              unit="£"
              hint="Insurance, servicing, consumables"
            />

            <MobileInput
              label="Expected Lifespan"
              type="number"
              value={equipment.expectedLifespan || ""}
              onChange={(e) => updateInput('expectedLifespan', parseFloat(e.target.value) || 0)}
              error={errors.expectedLifespan}
              clearError={() => clearError('expectedLifespan')}
              unit="years"
              hint="How long will you use this equipment"
            />

            <MobileInput
              label="Annual Calibration Cost"
              type="number"
              value={equipment.calibrationCost || ""}
              onChange={(e) => updateInput('calibrationCost', parseFloat(e.target.value) || 0)}
              error={errors.calibrationCost}
              clearError={() => clearError('calibrationCost')}
              unit="£"
              hint="Test equipment calibration (if applicable)"
            />

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Quick Examples</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => loadExample('tester')}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs"
                >
                  Multifunction Tester
                </Button>
                <Button 
                  onClick={() => loadExample('van')}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs"
                >
                  Work Van
                </Button>
                <Button 
                  onClick={() => loadExample('tools')}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs"
                >
                  Power Tools
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Benefits */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Revenue Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              How will this equipment generate additional revenue or savings?
            </p>

            <MobileInput
              label="Additional Billable Hours/Month"
              type="number"
              value={equipment.hoursPerMonth || ""}
              onChange={(e) => updateInput('hoursPerMonth', parseFloat(e.target.value) || 0)}
              error={errors.hoursPerMonth}
              clearError={() => clearError('hoursPerMonth')}
              unit="hours"
              hint="Extra work capacity this equipment enables"
            />

            <MobileInput
              label="Rate Increase Enabled"
              type="number"
              value={equipment.rateIncrease || ""}
              onChange={(e) => updateInput('rateIncrease', parseFloat(e.target.value) || 0)}
              error={errors.rateIncrease}
              clearError={() => clearError('rateIncrease')}
              unit="£/hour"
              hint="Premium rate for specialized work"
            />

            <MobileInput
              label="Time Savings per Month"
              type="number"
              value={equipment.timesSaved || ""}
              onChange={(e) => updateInput('timesSaved', parseFloat(e.target.value) || 0)}
              error={errors.timesSaved}
              clearError={() => clearError('timesSaved')}
              unit="hours"
              hint="Hours saved through efficiency gains"
            />

            <div className="bg-elec-gray rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Benefit Examples</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• <strong>Test Equipment:</strong> Faster testing, compliance premium, new service offerings</p>
                <p>• <strong>Vehicle:</strong> More jobs per day, professional image, equipment transport</p>
                <p>• <strong>Tools:</strong> Faster installation, reduced callbacks, premium work capability</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculateROI}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={Object.keys(errors).length > 0}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Calculate ROI
              </Button>
              <Button 
                onClick={resetCalculator}
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Reset
              </Button>
            </div>

            {errors.general && (
              <p className="text-destructive text-sm">{errors.general}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <Card className="border-elec-yellow/20 bg-elec-card mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            ROI Analysis
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
              <BarChart3 className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
              <p className="text-muted-foreground">
                Enter equipment details and revenue benefits, then click "Calculate ROI" for your analysis.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* ROI Status */}
              {roiStatus && (
                <div className={`p-6 rounded-lg border ${roiStatus.bgColor}`}>
                  <div className={`flex items-center gap-3 mb-3 ${roiStatus.color}`}>
                    {roiStatus.icon}
                    <h3 className="font-semibold text-lg">{roiStatus.title}</h3>
                  </div>
                  <p className={`${roiStatus.color.replace('300', '200')} mb-4`}>
                    {roiStatus.message}
                  </p>
                  
                  <div className="bg-background/10 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium mb-2">Investment Recommendation</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {metrics && metrics.roiPercentage > 20 && (
                            <>
                              <p>• This equipment shows strong financial returns</p>
                              <p>• Consider purchasing as soon as cash flow allows</p>
                              <p>• Look for financing options to accelerate benefits</p>
                            </>
                          )}
                          {metrics && metrics.roiPercentage <= 20 && metrics.roiPercentage > 0 && (
                            <>
                              <p>• Marginal financial returns - consider necessity</p>
                              <p>• Explore used equipment or alternative solutions</p>
                              <p>• Ensure you can maximize the stated benefits</p>
                            </>
                          )}
                          {metrics && metrics.roiPercentage <= 0 && (
                            <>
                              <p>• Current assumptions don't justify the purchase</p>
                              <p>• Review benefit estimates and find additional value</p>
                              <p>• Consider renting or leasing options instead</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">ROI</h4>
                    <p className={`text-2xl font-bold ${
                      metrics && metrics.roiPercentage > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {metrics?.roiPercentage.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Over lifespan</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Payback</h4>
                    <p className="text-2xl font-bold text-elec-yellow">
                      {metrics?.paybackMonths.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Months</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Net Benefit</h4>
                    <p className={`text-2xl font-bold ${
                      metrics && metrics.netBenefit > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      £{metrics?.netBenefit.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Total profit</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Monthly ROI</h4>
                    <p className={`text-2xl font-bold ${
                      metrics && metrics.monthlyROI > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      £{metrics?.monthlyROI.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Average/month</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-elec-yellow/30" />

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Cost Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Initial purchase:</span>
                      <span>£{equipment.purchasePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Maintenance ({equipment.expectedLifespan} years):</span>
                      <span>£{metrics?.totalMaintenanceCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Calibration costs:</span>
                      <span>£{(equipment.calibrationCost * equipment.expectedLifespan).toFixed(2)}</span>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div className="flex justify-between text-white font-semibold">
                      <span>Total cost of ownership:</span>
                      <span className="text-elec-yellow">£{metrics?.totalCostOfOwnership.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Revenue Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Monthly revenue benefit:</span>
                      <span>£{metrics?.totalMonthlyBenefit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Annual revenue benefit:</span>
                      <span>£{metrics?.annualRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Total lifespan benefit:</span>
                      <span>£{metrics?.totalLifespanBenefit.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div className="flex justify-between text-white font-semibold">
                      <span>Break-even point:</span>
                      <span className="text-elec-yellow">{metrics?.breakEvenPoint.toFixed(1)} months</span>
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
                      description: "Equipment ROI export functionality coming soon!",
                      variant: "default"
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
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
            Equipment Investment Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Essential vs. Nice-to-Have</h4>
              <p className="text-sm text-muted-foreground">
                Prioritize equipment required for BS7671 compliance (testing equipment) 
                over convenience items. Calibrated test equipment is non-negotiable.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Financing Options</h4>
              <p className="text-sm text-muted-foreground">
                Consider lease/hire purchase for expensive items. This preserves cash flow 
                and often includes maintenance. Compare total cost vs. outright purchase.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Future-Proofing</h4>
              <p className="text-sm text-muted-foreground">
                Invest in equipment that supports future regulations and technology trends 
                (e.g., EV charging testers, smart home compatibility).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentROICalculator;