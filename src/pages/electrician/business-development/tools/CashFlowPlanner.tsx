import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, PoundSterling, Calendar, AlertTriangle, CheckCircle, Download, Lightbulb, BarChart3 } from "lucide-react";

interface MonthlyData {
  revenue: number;
  materialCosts: number;
  labourCosts: number;
  overheads: number;
  taxReserve: number;
}

interface CashFlowInputs {
  startingBalance: number;
  monthlyData: MonthlyData[];
  planningMonths: number;
}

interface ValidationErrors {
  [key: string]: string;
}

const CashFlowPlanner = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CashFlowInputs>({
    startingBalance: 0,
    planningMonths: 12,
    monthlyData: Array(12).fill(null).map(() => ({
      revenue: 0,
      materialCosts: 0,
      labourCosts: 0,
      overheads: 0,
      taxReserve: 0,
    }))
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const updateInput = (field: keyof Omit<CashFlowInputs, 'monthlyData'>, value: number) => {
    setInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      
      // Adjust monthly data array when planning months changes
      if (field === 'planningMonths') {
        const newLength = Math.min(Math.max(value, 1), 24);
        const currentData = [...prev.monthlyData];
        
        if (newLength > currentData.length) {
          // Add new months
          const additionalMonths = Array(newLength - currentData.length).fill(null).map(() => ({
            revenue: 0,
            materialCosts: 0,
            labourCosts: 0,
            overheads: 0,
            taxReserve: 0,
          }));
          newInputs.monthlyData = [...currentData, ...additionalMonths];
        } else {
          // Remove excess months
          newInputs.monthlyData = currentData.slice(0, newLength);
        }
        
        // Reset selected month if out of range
        if (selectedMonth >= newLength) {
          setSelectedMonth(0);
        }
      }
      
      return newInputs;
    });
    
    clearError(field);
    setCalculated(false);
  };

  const updateMonthlyData = (monthIndex: number, field: keyof MonthlyData, value: number) => {
    setInputs(prev => ({
      ...prev,
      monthlyData: prev.monthlyData.map((month, index) => 
        index === monthIndex ? { ...month, [field]: value } : month
      )
    }));
    
    clearError(`month_${monthIndex}_${field}`);
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

    if (inputs.startingBalance < 0) {
      newErrors.startingBalance = "Starting balance cannot be negative";
    }

    if (inputs.planningMonths < 1 || inputs.planningMonths > 24) {
      newErrors.planningMonths = "Planning period must be between 1-24 months";
    }

    // Check if at least some monthly data is entered
    const hasData = inputs.monthlyData.some(month => 
      month.revenue > 0 || month.materialCosts > 0 || month.labourCosts > 0 || month.overheads > 0
    );
    
    if (!hasData) {
      newErrors.general = "Please enter some revenue or cost data for your cash flow projection";
    }

    // Validate individual monthly entries
    inputs.monthlyData.forEach((month, index) => {
      if (month.revenue < 0) newErrors[`month_${index}_revenue`] = "Revenue cannot be negative";
      if (month.materialCosts < 0) newErrors[`month_${index}_materialCosts`] = "Material costs cannot be negative";
      if (month.labourCosts < 0) newErrors[`month_${index}_labourCosts`] = "Labour costs cannot be negative";
      if (month.overheads < 0) newErrors[`month_${index}_overheads`] = "Overheads cannot be negative";
      if (month.taxReserve < 0) newErrors[`month_${index}_taxReserve`] = "Tax reserve cannot be negative";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCashFlow = () => {
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
      title: "Cash Flow Calculated",
      description: "Your cash flow projection has been updated.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setInputs({
      startingBalance: 0,
      planningMonths: 12,
      monthlyData: Array(12).fill(null).map(() => ({
        revenue: 0,
        materialCosts: 0,
        labourCosts: 0,
        overheads: 0,
        taxReserve: 0,
      }))
    });
    setErrors({});
    setCalculated(false);
    setSelectedMonth(0);
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const loadExample = () => {
    setInputs({
      startingBalance: 5000,
      planningMonths: 12,
      monthlyData: [
        { revenue: 4500, materialCosts: 800, labourCosts: 1200, overheads: 600, taxReserve: 450 },
        { revenue: 5200, materialCosts: 900, labourCosts: 1400, overheads: 600, taxReserve: 520 },
        { revenue: 6800, materialCosts: 1200, labourCosts: 1800, overheads: 650, taxReserve: 680 },
        { revenue: 7500, materialCosts: 1400, labourCosts: 2000, overheads: 650, taxReserve: 750 },
        { revenue: 8200, materialCosts: 1500, labourCosts: 2200, overheads: 700, taxReserve: 820 },
        { revenue: 7800, materialCosts: 1300, labourCosts: 2100, overheads: 700, taxReserve: 780 },
        { revenue: 9200, materialCosts: 1600, labourCosts: 2500, overheads: 750, taxReserve: 920 },
        { revenue: 8500, materialCosts: 1400, labourCosts: 2300, overheads: 750, taxReserve: 850 },
        { revenue: 6200, materialCosts: 1000, labourCosts: 1700, overheads: 650, taxReserve: 620 },
        { revenue: 7200, materialCosts: 1200, labourCosts: 1900, overheads: 700, taxReserve: 720 },
        { revenue: 5800, materialCosts: 900, labourCosts: 1500, overheads: 650, taxReserve: 580 },
        { revenue: 4200, materialCosts: 700, labourCosts: 1100, overheads: 600, taxReserve: 420 }
      ]
    });
    setErrors({});
    setCalculated(false);
    setSelectedMonth(0);
  };

  // Calculate cash flow projections
  const calculateProjections = () => {
    if (!calculated) return null;

    let runningBalance = inputs.startingBalance;
    const projections = [];

    for (let i = 0; i < inputs.planningMonths; i++) {
      const month = inputs.monthlyData[i];
      const totalCosts = month.materialCosts + month.labourCosts + month.overheads + month.taxReserve;
      const netCashFlow = month.revenue - totalCosts;
      runningBalance += netCashFlow;

      projections.push({
        month: i + 1,
        revenue: month.revenue,
        costs: totalCosts,
        netCashFlow,
        runningBalance,
        isNegative: runningBalance < 0
      });
    }

    return projections;
  };

  const projections = calculateProjections();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getCashFlowStatus = () => {
    if (!projections) return null;

    const lowestBalance = Math.min(...projections.map(p => p.runningBalance));
    const negativeMonths = projections.filter(p => p.isNegative).length;

    if (lowestBalance < -5000) {
      return {
        status: "critical",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Critical Cash Flow Risk",
        message: `Severe cash shortfall detected. Lowest balance: £${lowestBalance.toFixed(2)}`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    } else if (negativeMonths > 0) {
      return {
        status: "warning",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Cash Flow Concerns",
        message: `${negativeMonths} month(s) with negative cash flow. Plan accordingly.`,
        color: "text-orange-300",
        bgColor: "bg-orange-500/20 border-orange-500/30"
      };
    } else {
      return {
        status: "good",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Healthy Cash Flow",
        message: "Positive cash flow projected throughout the period.",
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    }
  };

  const cashFlowStatus = getCashFlowStatus();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-elec-yellow" />
          Cash Flow Planner
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Project your business cash flow and identify potential shortfalls. 
          Essential for maintaining BS7671 compliance and business continuity.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Setup Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" />
              Planning Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Starting Cash Balance"
              type="number"
              value={inputs.startingBalance || ""}
              onChange={(e) => updateInput('startingBalance', parseFloat(e.target.value) || 0)}
              error={errors.startingBalance}
              clearError={() => clearError('startingBalance')}
              unit="£"
              hint="Your current business bank balance"
            />

            <MobileInput
              label="Planning Period"
              type="number"
              value={inputs.planningMonths || ""}
              onChange={(e) => updateInput('planningMonths', parseInt(e.target.value) || 12)}
              error={errors.planningMonths}
              clearError={() => clearError('planningMonths')}
              unit="months"
              hint="How many months to project (1-24)"
            />

            <div className="space-y-3">
              <h4 className="text-white font-medium">Select Month to Edit</h4>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: inputs.planningMonths }, (_, i) => (
                  <Button
                    key={i}
                    onClick={() => setSelectedMonth(i)}
                    variant={selectedMonth === i ? "default" : "outline"}
                    className={`text-xs ${
                      selectedMonth === i 
                        ? "bg-elec-yellow text-black" 
                        : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }`}
                  >
                    {monthNames[i % 12]} {Math.floor(i / 12) + 1}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculateCashFlow}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={Object.keys(errors).length > 0}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
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

            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset All
            </Button>

            {errors.general && (
              <p className="text-destructive text-sm">{errors.general}</p>
            )}
          </CardContent>
        </Card>

        {/* Monthly Data Entry */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              {monthNames[selectedMonth % 12]} {Math.floor(selectedMonth / 12) + 1} Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Revenue"
              type="number"
              value={inputs.monthlyData[selectedMonth]?.revenue || ""}
              onChange={(e) => updateMonthlyData(selectedMonth, 'revenue', parseFloat(e.target.value) || 0)}
              error={errors[`month_${selectedMonth}_revenue`]}
              clearError={() => clearError(`month_${selectedMonth}_revenue`)}
              unit="£"
              hint="Total income for this month"
            />

            <MobileInput
              label="Material Costs"
              type="number"
              value={inputs.monthlyData[selectedMonth]?.materialCosts || ""}
              onChange={(e) => updateMonthlyData(selectedMonth, 'materialCosts', parseFloat(e.target.value) || 0)}
              error={errors[`month_${selectedMonth}_materialCosts`]}
              clearError={() => clearError(`month_${selectedMonth}_materialCosts`)}
              unit="£"
              hint="Cables, accessories, components"
            />

            <MobileInput
              label="Labour Costs"
              type="number"
              value={inputs.monthlyData[selectedMonth]?.labourCosts || ""}
              onChange={(e) => updateMonthlyData(selectedMonth, 'labourCosts', parseFloat(e.target.value) || 0)}
              error={errors[`month_${selectedMonth}_labourCosts`]}
              clearError={() => clearError(`month_${selectedMonth}_labourCosts`)}
              unit="£"
              hint="Subcontractor payments, wages"
            />

            <MobileInput
              label="Overheads"
              type="number"
              value={inputs.monthlyData[selectedMonth]?.overheads || ""}
              onChange={(e) => updateMonthlyData(selectedMonth, 'overheads', parseFloat(e.target.value) || 0)}
              error={errors[`month_${selectedMonth}_overheads`]}
              clearError={() => clearError(`month_${selectedMonth}_overheads`)}
              unit="£"
              hint="Insurance, fuel, tools, office costs"
            />

            <MobileInput
              label="Tax Reserve"
              type="number"
              value={inputs.monthlyData[selectedMonth]?.taxReserve || ""}
              onChange={(e) => updateMonthlyData(selectedMonth, 'taxReserve', parseFloat(e.target.value) || 0)}
              error={errors[`month_${selectedMonth}_taxReserve`]}
              clearError={() => clearError(`month_${selectedMonth}_taxReserve`)}
              unit="£"
              hint="Set aside for tax payments"
            />

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Month Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white">
                  <span>Total Revenue:</span>
                  <span className="text-green-400">£{inputs.monthlyData[selectedMonth]?.revenue?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Total Costs:</span>
                  <span className="text-red-400">
                    £{((inputs.monthlyData[selectedMonth]?.materialCosts || 0) + 
                        (inputs.monthlyData[selectedMonth]?.labourCosts || 0) + 
                        (inputs.monthlyData[selectedMonth]?.overheads || 0) + 
                        (inputs.monthlyData[selectedMonth]?.taxReserve || 0)).toFixed(2)}
                  </span>
                </div>
                <Separator className="bg-elec-yellow/20" />
                <div className="flex justify-between text-white font-semibold">
                  <span>Net Cash Flow:</span>
                  <span className={
                    (inputs.monthlyData[selectedMonth]?.revenue || 0) - 
                    ((inputs.monthlyData[selectedMonth]?.materialCosts || 0) + 
                     (inputs.monthlyData[selectedMonth]?.labourCosts || 0) + 
                     (inputs.monthlyData[selectedMonth]?.overheads || 0) + 
                     (inputs.monthlyData[selectedMonth]?.taxReserve || 0)) >= 0 
                      ? "text-green-400" : "text-red-400"
                  }>
                    £{((inputs.monthlyData[selectedMonth]?.revenue || 0) - 
                        ((inputs.monthlyData[selectedMonth]?.materialCosts || 0) + 
                         (inputs.monthlyData[selectedMonth]?.labourCosts || 0) + 
                         (inputs.monthlyData[selectedMonth]?.overheads || 0) + 
                         (inputs.monthlyData[selectedMonth]?.taxReserve || 0))).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Results */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
              Cash Flow Projection
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
                <TrendingUp className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Project</h3>
                <p className="text-muted-foreground">
                  Enter your monthly data and click "Calculate" to see your cash flow projection.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Alert */}
                {cashFlowStatus && (
                  <div className={`p-4 rounded-lg border ${cashFlowStatus.bgColor}`}>
                    <div className={`flex items-center gap-3 mb-2 ${cashFlowStatus.color}`}>
                      {cashFlowStatus.icon}
                      <h3 className="font-semibold">{cashFlowStatus.title}</h3>
                    </div>
                    <p className={`text-sm ${cashFlowStatus.color.replace('300', '200')}`}>
                      {cashFlowStatus.message}
                    </p>
                  </div>
                )}

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-elec-gray rounded-lg p-4 text-center">
                    <h4 className="text-white font-medium mb-1">Starting Balance</h4>
                    <p className="text-lg font-bold text-elec-yellow">£{inputs.startingBalance.toFixed(2)}</p>
                  </div>
                  <div className="bg-elec-gray rounded-lg p-4 text-center">
                    <h4 className="text-white font-medium mb-1">Final Balance</h4>
                    <p className={`text-lg font-bold ${
                      projections && projections[projections.length - 1]?.runningBalance >= 0 
                        ? "text-green-400" : "text-red-400"
                    }`}>
                      £{projections ? projections[projections.length - 1]?.runningBalance.toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <h4 className="text-white font-medium">Monthly Breakdown</h4>
                  {projections?.slice(0, 6).map((projection, index) => (
                    <div key={index} className="bg-elec-gray rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">
                          {monthNames[index % 12]} {Math.floor(index / 12) + 1}
                        </span>
                        <span className={`font-semibold ${
                          projection.runningBalance >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                          £{projection.runningBalance.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Revenue: £{projection.revenue.toFixed(2)} | 
                        Costs: £{projection.costs.toFixed(2)} | 
                        Net: £{projection.netCashFlow.toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {projections && projections.length > 6 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Showing first 6 months. Full projection calculated.
                    </p>
                  )}
                </div>

                {/* Export Button */}
                <Button 
                  variant="outline"
                  className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  onClick={() => {
                    toast({
                      title: "Export Feature",
                      description: "Cash flow export functionality coming soon!",
                      variant: "default"
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Cash Flow
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Professional Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Cash Flow Management Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Payment Terms</h4>
              <p className="text-sm text-muted-foreground">
                Domestic customers typically pay within 7-14 days. Commercial clients may take 30-60 days.
                Factor these delays into your projections.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Seasonal Variations</h4>
              <p className="text-sm text-muted-foreground">
                Electrical work often peaks in autumn/winter (heating) and spring/summer (outdoor work).
                Plan for quieter periods.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Emergency Fund</h4>
              <p className="text-sm text-muted-foreground">
                Maintain 3-6 months of expenses as emergency cash. Essential for equipment failures,
                calibration requirements, and unexpected costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowPlanner;