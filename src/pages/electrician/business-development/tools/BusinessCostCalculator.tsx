import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Calculator, PoundSterling, HelpCircle, TrendingUp, AlertCircle, CheckCircle, Download, Lightbulb, Building } from "lucide-react";

interface StartupInputs {
  tools: number;
  testEquipment: number;
  vehicle: number;
  insurance: number;
  qualifications: number;
  marketing: number;
  workingCapital: number;
}

interface MonthlyInputs {
  insurance: number;
  fuel: number;
  toolMaintenance: number;
  marketing: number;
  phoneInternet: number;
  accountancy: number;
  rent: number;
  utilities: number;
}

interface ValidationErrors {
  [key: string]: string;
}

const BusinessCostCalculator = () => {
  const { toast } = useToast();
  const [startupInputs, setStartupInputs] = useState<StartupInputs>({
    tools: 0,
    testEquipment: 0,
    vehicle: 0,
    insurance: 0,
    qualifications: 0,
    marketing: 0,
    workingCapital: 0,
  });

  const [monthlyInputs, setMonthlyInputs] = useState<MonthlyInputs>({
    insurance: 0,
    fuel: 0,
    toolMaintenance: 0,
    marketing: 0,
    phoneInternet: 0,
    accountancy: 0,
    rent: 0,
    utilities: 0,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);

  const updateStartupInput = (field: keyof StartupInputs, value: number) => {
    setStartupInputs(prev => ({
      ...prev,
      [field]: value
    }));
    clearError(field);
    setCalculated(false);
  };

  const updateMonthlyInput = (field: keyof MonthlyInputs, value: number) => {
    setMonthlyInputs(prev => ({
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

    // Check if at least some startup costs are entered
    const totalStartup = Object.values(startupInputs).reduce((sum, value) => sum + value, 0);
    if (totalStartup <= 0) {
      newErrors.general = "Please enter some startup costs to calculate your business investment";
    }

    // Validate individual fields for negative values
    Object.entries(startupInputs).forEach(([key, value]) => {
      if (value < 0) newErrors[key] = `${key} cannot be negative`;
    });

    Object.entries(monthlyInputs).forEach(([key, value]) => {
      if (value < 0) newErrors[key] = `${key} cannot be negative`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCosts = () => {
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
      title: "Calculation Complete",
      description: "Your business cost analysis has been updated.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setStartupInputs({
      tools: 0,
      testEquipment: 0,
      vehicle: 0,
      insurance: 0,
      qualifications: 0,
      marketing: 0,
      workingCapital: 0,
    });
    setMonthlyInputs({
      insurance: 0,
      fuel: 0,
      toolMaintenance: 0,
      marketing: 0,
      phoneInternet: 0,
      accountancy: 0,
      rent: 0,
      utilities: 0,
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
    setStartupInputs({
      tools: 5000,
      testEquipment: 2000,
      vehicle: 15000,
      insurance: 2000,
      qualifications: 3000,
      marketing: 2000,
      workingCapital: 8000,
    });
    setMonthlyInputs({
      insurance: 300,
      fuel: 400,
      toolMaintenance: 150,
      marketing: 250,
      phoneInternet: 80,
      accountancy: 150,
      rent: 0,
      utilities: 100,
    });
    setErrors({});
    setCalculated(false);
  };

  // Calculations (only if calculated is true)
  const totalStartupCosts = calculated ? Object.values(startupInputs).reduce((sum, value) => sum + value, 0) : 0;
  const totalMonthlyCosts = calculated ? Object.values(monthlyInputs).reduce((sum, value) => sum + value, 0) : 0;
  const yearOneTotal = calculated ? totalStartupCosts + (totalMonthlyCosts * 12) : 0;
  const yearTwoTotal = calculated ? totalMonthlyCosts * 12 : 0;
  const yearThreeTotal = calculated ? totalMonthlyCosts * 12 : 0;

  const getCostAnalysis = () => {
    if (!calculated) return null;
    
    const monthlyRequiredRevenue = totalMonthlyCosts * 1.5; // 50% buffer for profit and unexpected costs
    const dailyRequiredRevenue = monthlyRequiredRevenue / 22; // 22 working days per month
    
    if (totalStartupCosts > 50000) {
      return {
        status: "high",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "High Investment Required",
        message: `Your startup costs are quite substantial at £${totalStartupCosts.toFixed(2)}`,
        color: "text-orange-300",
        bgColor: "bg-orange-500/20 border-orange-500/30"
      };
    } else if (totalStartupCosts > 25000) {
      return {
        status: "medium",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Moderate Investment",
        message: `A reasonable startup investment of £${totalStartupCosts.toFixed(2)}`,
        color: "text-yellow-300",
        bgColor: "bg-yellow-500/20 border-yellow-500/30"
      };
    } else {
      return {
        status: "low",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Modest Investment",
        message: `A conservative startup investment of £${totalStartupCosts.toFixed(2)}`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    }
  };

  const costAnalysis = getCostAnalysis();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Building className="h-8 w-8 text-elec-yellow" />
          Business Cost Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate startup costs and ongoing expenses for your electrical contracting business.
          Plan your investment and understand cash flow requirements for BS7671 18th Edition compliant operations.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Startup Costs Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Initial Startup Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Professional Tools"
              type="number"
              value={startupInputs.tools || ""}
              onChange={(e) => updateStartupInput('tools', parseFloat(e.target.value) || 0)}
              error={errors.tools}
              clearError={() => clearError('tools')}
              unit="£"
              hint="Hand tools, power tools, testing equipment"
            />

            <MobileInput
              label="Test Equipment"
              type="number"
              value={startupInputs.testEquipment || ""}
              onChange={(e) => updateStartupInput('testEquipment', parseFloat(e.target.value) || 0)}
              error={errors.testEquipment}
              clearError={() => clearError('testEquipment')}
              unit="£"
              hint="Multifunction testers, PAT testers, calibration"
            />

            <MobileInput
              label="Vehicle & Equipment"
              type="number"
              value={startupInputs.vehicle || ""}
              onChange={(e) => updateStartupInput('vehicle', parseFloat(e.target.value) || 0)}
              error={errors.vehicle}
              clearError={() => clearError('vehicle')}
              unit="£"
              hint="Van purchase/lease, racking, signage"
            />

            <MobileInput
              label="Initial Insurance"
              type="number"
              value={startupInputs.insurance || ""}
              onChange={(e) => updateStartupInput('insurance', parseFloat(e.target.value) || 0)}
              error={errors.insurance}
              clearError={() => clearError('insurance')}
              unit="£"
              hint="Public liability, professional indemnity, vehicle"
            />

            <MobileInput
              label="Qualifications & Certifications"
              type="number"
              value={startupInputs.qualifications || ""}
              onChange={(e) => updateStartupInput('qualifications', parseFloat(e.target.value) || 0)}
              error={errors.qualifications}
              clearError={() => clearError('qualifications')}
              unit="£"
              hint="18th Edition, ECS card, Part P, courses"
            />

            <MobileInput
              label="Initial Marketing"
              type="number"
              value={startupInputs.marketing || ""}
              onChange={(e) => updateStartupInput('marketing', parseFloat(e.target.value) || 0)}
              error={errors.marketing}
              clearError={() => clearError('marketing')}
              unit="£"
              hint="Website, business cards, uniforms, advertising"
            />

            <MobileInput
              label="Working Capital"
              type="number"
              value={startupInputs.workingCapital || ""}
              onChange={(e) => updateStartupInput('workingCapital', parseFloat(e.target.value) || 0)}
              error={errors.workingCapital}
              clearError={() => clearError('workingCapital')}
              unit="£"
              hint="Cash flow buffer for first few months"
            />
          </CardContent>
        </Card>

        {/* Monthly Running Costs Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Monthly Running Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Insurance"
              type="number"
              value={monthlyInputs.insurance || ""}
              onChange={(e) => updateMonthlyInput('insurance', parseFloat(e.target.value) || 0)}
              error={errors.insurance}
              clearError={() => clearError('insurance')}
              unit="£/month"
              hint="All business insurance policies"
            />

            <MobileInput
              label="Fuel & Travel"
              type="number"
              value={monthlyInputs.fuel || ""}
              onChange={(e) => updateMonthlyInput('fuel', parseFloat(e.target.value) || 0)}
              error={errors.fuel}
              clearError={() => clearError('fuel')}
              unit="£/month"
              hint="Vehicle fuel and parking costs"
            />

            <MobileInput
              label="Tool Maintenance"
              type="number"
              value={monthlyInputs.toolMaintenance || ""}
              onChange={(e) => updateMonthlyInput('toolMaintenance', parseFloat(e.target.value) || 0)}
              error={errors.toolMaintenance}
              clearError={() => clearError('toolMaintenance')}
              unit="£/month"
              hint="Equipment servicing and calibration"
            />

            <MobileInput
              label="Marketing & Advertising"
              type="number"
              value={monthlyInputs.marketing || ""}
              onChange={(e) => updateMonthlyInput('marketing', parseFloat(e.target.value) || 0)}
              error={errors.marketing}
              clearError={() => clearError('marketing')}
              unit="£/month"
              hint="Online ads, directory listings, printed materials"
            />

            <MobileInput
              label="Phone & Internet"
              type="number"
              value={monthlyInputs.phoneInternet || ""}
              onChange={(e) => updateMonthlyInput('phoneInternet', parseFloat(e.target.value) || 0)}
              error={errors.phoneInternet}
              clearError={() => clearError('phoneInternet')}
              unit="£/month"
              hint="Mobile, broadband, business line"
            />

            <MobileInput
              label="Accountancy & Legal"
              type="number"
              value={monthlyInputs.accountancy || ""}
              onChange={(e) => updateMonthlyInput('accountancy', parseFloat(e.target.value) || 0)}
              error={errors.accountancy}
              clearError={() => clearError('accountancy')}
              unit="£/month"
              hint="Professional services and compliance"
            />

            <MobileInput
              label="Office/Storage Rent"
              type="number"
              value={monthlyInputs.rent || ""}
              onChange={(e) => updateMonthlyInput('rent', parseFloat(e.target.value) || 0)}
              error={errors.rent}
              clearError={() => clearError('rent')}
              unit="£/month"
              hint="Workshop, storage, or office space"
            />

            <MobileInput
              label="Utilities"
              type="number"
              value={monthlyInputs.utilities || ""}
              onChange={(e) => updateMonthlyInput('utilities', parseFloat(e.target.value) || 0)}
              error={errors.utilities}
              clearError={() => clearError('utilities')}
              unit="£/month"
              hint="Electricity, heating, water for premises"
            />
          </CardContent>
        </Card>
      </div>

      {/* Control Buttons */}
      <Card className="border-elec-yellow/20 bg-elec-card mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={calculateCosts}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={Object.keys(errors).length > 0}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Business Costs
            </Button>
            <Button 
              onClick={loadExample}
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Load Example
            </Button>
            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset All
            </Button>
          </div>
          {errors.general && (
            <p className="text-destructive text-sm text-center mt-3">{errors.general}</p>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Business Investment Analysis
            {calculated && (
              <Badge variant="success" className="ml-auto">
                Calculated
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!calculated ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
              <p className="text-muted-foreground">
                Enter your startup and monthly costs, then click "Calculate" to see your business investment analysis.
              </p>
            </div>
          ) : (
            <>
              {/* Cost Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Startup Investment</h4>
                    <p className="text-2xl font-bold text-elec-yellow">£{totalStartupCosts.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-2">One-time costs</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Monthly Running</h4>
                    <p className="text-2xl font-bold text-elec-yellow">£{totalMonthlyCosts.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-2">Ongoing expenses</p>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/10 bg-elec-gray">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-white font-semibold mb-2">Year One Total</h4>
                    <p className="text-2xl font-bold text-elec-yellow">£{yearOneTotal.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-2">Total investment</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-elec-yellow/30" />

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Startup Cost Breakdown</h4>
                  <div className="space-y-3">
                    {Object.entries(startupInputs).map(([key, value]) => {
                      if (value > 0) {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                          <div key={key} className="flex justify-between text-white">
                            <span>{label}:</span>
                            <span>£{value.toFixed(2)}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Monthly Cost Breakdown</h4>
                  <div className="space-y-3">
                    {Object.entries(monthlyInputs).map(([key, value]) => {
                      if (value > 0) {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                          <div key={key} className="flex justify-between text-white">
                            <span>{label}:</span>
                            <span>£{value.toFixed(2)}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              {/* Investment Analysis */}
              {costAnalysis && (
                <>
                  <Separator className="bg-elec-yellow/30" />
                  <div className={`p-6 rounded-lg border ${costAnalysis.bgColor}`}>
                    <div className={`flex items-center gap-3 mb-3 ${costAnalysis.color}`}>
                      {costAnalysis.icon}
                      <h3 className="font-semibold text-lg">{costAnalysis.title}</h3>
                    </div>
                    <p className={`${costAnalysis.color.replace('300', '200')} mb-4`}>
                      {costAnalysis.message}
                    </p>
                    
                    {/* Business Insights */}
                    <div className="bg-background/10 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                        <div>
                          <h4 className="text-white font-medium mb-2">Business Planning Insights</h4>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>• Monthly revenue target: £{(totalMonthlyCosts * 1.8).toFixed(2)} (includes profit & contingency)</p>
                            <p>• Daily revenue target: £{((totalMonthlyCosts * 1.8) / 22).toFixed(2)} (22 working days/month)</p>
                            <p>• Break-even timeframe: {totalStartupCosts > 0 ? Math.ceil(totalStartupCosts / (totalMonthlyCosts * 0.3)) : 0} months of trading</p>
                            <p>• Consider securing a credit facility of £{(totalMonthlyCosts * 3).toFixed(2)} for cash flow management</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Three Year Projection */}
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Three Year Financial Projection</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Year 1</h4>
                    <div className="text-lg">
                      <div className="flex justify-between text-white">
                        <span>Startup:</span>
                        <span>£{totalStartupCosts.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Running:</span>
                        <span>£{(totalMonthlyCosts * 12).toFixed(2)}</span>
                      </div>
                      <Separator className="bg-elec-yellow/20 my-2" />
                      <div className="flex justify-between text-white font-bold">
                        <span>Total:</span>
                        <span className="text-elec-yellow">£{yearOneTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Year 2</h4>
                    <div className="text-lg">
                      <div className="flex justify-between text-white">
                        <span>Running only:</span>
                        <span className="text-elec-yellow font-bold">£{yearTwoTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Year 3</h4>
                    <div className="text-lg">
                      <div className="flex justify-between text-white">
                        <span>Running only:</span>
                        <span className="text-elec-yellow font-bold">£{yearThreeTotal.toFixed(2)}</span>
                      </div>
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
                      description: "PDF export functionality coming soon!",
                      variant: "default"
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Business Plan
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Professional Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            UK Electrical Business Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Essential Equipment</h4>
              <p className="text-sm text-muted-foreground">
                Multifunction tester (£800-2000), insulation resistance tester, RCD tester, 
                and calibration certificates for BS7671 compliance.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Insurance Requirements</h4>
              <p className="text-sm text-muted-foreground">
                Minimum £2M public liability, professional indemnity, employer's liability, 
                and vehicle insurance for comprehensive coverage.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Cash Flow Management</h4>
              <p className="text-sm text-muted-foreground">
                Maintain 3-6 months of operating expenses as working capital. 
                Factor in 30-60 day payment terms from commercial clients.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCostCalculator;