import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Calendar, PoundSterling, AlertTriangle, TrendingDown } from "lucide-react";

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  cumulative: number;
}

interface CashFlowInputs {
  regularIncome: number;
  seasonalIncome: number;
  materialCosts: number;
  labourCosts: number;
  overheads: number;
  equipment: number;
  marketing: number;
  insurance: number;
  vehicleCosts: number;
  startingBalance: number;
}

const CashFlowPlanner = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CashFlowInputs>({
    regularIncome: 0,
    seasonalIncome: 0,
    materialCosts: 0,
    labourCosts: 0,
    overheads: 0,
    equipment: 0,
    marketing: 0,
    insurance: 0,
    vehicleCosts: 0,
    startingBalance: 0,
  });
  
  const [projection, setProjection] = useState<MonthlyData[]>([]);
  const [calculated, setCalculated] = useState(false);

  const handleInputChange = (field: keyof CashFlowInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateProjection = () => {
    const months = [];
    let cumulativeBalance = inputs.startingBalance;

    // Seasonal multipliers for electrical work (higher in summer/autumn, lower in winter)
    const seasonalMultipliers = [0.8, 0.7, 0.9, 1.1, 1.3, 1.4, 1.5, 1.4, 1.2, 1.1, 0.9, 0.8];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 12; i++) {
      const seasonalFactor = seasonalMultipliers[i];
      const monthlyIncome = inputs.regularIncome + (inputs.seasonalIncome * seasonalFactor);
      const monthlyExpenses = inputs.materialCosts + inputs.labourCosts + inputs.overheads + 
                             inputs.equipment + inputs.marketing + inputs.insurance + inputs.vehicleCosts;
      
      const monthlyBalance = monthlyIncome - monthlyExpenses;
      cumulativeBalance += monthlyBalance;

      months.push({
        month: monthNames[i],
        income: monthlyIncome,
        expenses: monthlyExpenses,
        balance: monthlyBalance,
        cumulative: cumulativeBalance
      });
    }

    setProjection(months);
    setCalculated(true);
    
    toast({
      title: "Cash Flow Calculated",
      description: "Your 12-month projection has been generated with seasonal adjustments.",
      variant: "success"
    });
  };

  const getInsights = () => {
    if (!projection.length) return [];
    
    const insights = [];
    const totalIncome = projection.reduce((sum, month) => sum + month.income, 0);
    const totalExpenses = projection.reduce((sum, month) => sum + month.expenses, 0);
    const worstMonth = projection.reduce((worst, month) => month.cumulative < worst.cumulative ? month : worst);
    const bestMonth = projection.reduce((best, month) => month.cumulative > best.cumulative ? month : best);

    if (worstMonth.cumulative < 0) {
      insights.push({
        type: "warning",
        message: `Cash flow dips negative in ${worstMonth.month} (£${worstMonth.cumulative.toFixed(0)}). Consider securing additional financing or adjusting expenses.`
      });
    }

    if (totalIncome > totalExpenses) {
      insights.push({
        type: "success",
        message: `Projected annual profit: £${(totalIncome - totalExpenses).toFixed(0)}. Strong financial outlook for the year.`
      });
    }

    insights.push({
      type: "info",
      message: `Peak cash flow occurs in ${bestMonth.month} (£${bestMonth.cumulative.toFixed(0)}). Consider reinvesting during high-cash periods.`
    });

    return insights;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-elec-yellow" />
          Cash Flow Planner
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Plan and forecast your cash flow over 12 months with seasonal adjustments for electrical contracting.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inputs">Income & Expenses</TabsTrigger>
          <TabsTrigger value="projection" disabled={!calculated}>12-Month Projection</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MobileInput
                  label="Regular Monthly Income"
                  value={inputs.regularIncome.toString()}
                  onChange={(e) => handleInputChange('regularIncome', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Consistent monthly revenue from contracts"
                />
                <MobileInput
                  label="Seasonal Income Base"
                  value={inputs.seasonalIncome.toString()}
                  onChange={(e) => handleInputChange('seasonalIncome', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Additional seasonal work (automatically adjusted by month)"
                />
                <MobileInput
                  label="Starting Cash Balance"
                  value={inputs.startingBalance.toString()}
                  onChange={(e) => handleInputChange('startingBalance', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Current cash on hand"
                />
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-elec-yellow" />
                  Monthly Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MobileInput
                  label="Material Costs"
                  value={inputs.materialCosts.toString()}
                  onChange={(e) => handleInputChange('materialCosts', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Cables, switches, fixtures etc."
                />
                <MobileInput
                  label="Labour Costs"
                  value={inputs.labourCosts.toString()}
                  onChange={(e) => handleInputChange('labourCosts', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Employee wages and subcontractor fees"
                />
                <MobileInput
                  label="Overheads"
                  value={inputs.overheads.toString()}
                  onChange={(e) => handleInputChange('overheads', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Rent, utilities, admin costs"
                />
                <MobileInput
                  label="Equipment & Tools"
                  value={inputs.equipment.toString()}
                  onChange={(e) => handleInputChange('equipment', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Tool purchases, maintenance, calibration"
                />
                <MobileInput
                  label="Marketing"
                  value={inputs.marketing.toString()}
                  onChange={(e) => handleInputChange('marketing', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Advertising, website, business development"
                />
                <MobileInput
                  label="Insurance & Compliance"
                  value={inputs.insurance.toString()}
                  onChange={(e) => handleInputChange('insurance', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Public liability, professional indemnity, NICEIC fees"
                />
                <MobileInput
                  label="Vehicle Costs"
                  value={inputs.vehicleCosts.toString()}
                  onChange={(e) => handleInputChange('vehicleCosts', e.target.value)}
                  type="number"
                  unit="£"
                  hint="Fuel, maintenance, insurance, van payments"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateProjection} 
              size="lg"
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Generate 12-Month Projection
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="projection" className="space-y-6">
          {calculated && (
            <>
              <Card className="border-elec-yellow/20 bg-elec-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-elec-yellow" />
                    Monthly Cash Flow Projection
                    <Badge variant="success" className="ml-auto">Calculated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projection.map((month, index) => (
                      <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                        <h4 className="font-semibold text-white mb-2">{month.month}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Income:</span>
                            <span className="text-green-400">£{month.income.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expenses:</span>
                            <span className="text-red-400">£{month.expenses.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between border-t border-secondary/40 pt-1">
                            <span className="text-muted-foreground">Net:</span>
                            <span className={month.balance >= 0 ? "text-green-400" : "text-red-400"}>
                              £{month.balance.toFixed(0)}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span className="text-white">Balance:</span>
                            <span className={month.cumulative >= 0 ? "text-green-400" : "text-red-400"}>
                              £{month.cumulative.toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                    Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getInsights().map((insight, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          insight.type === 'warning' ? 'bg-destructive/10 border-destructive/30 text-destructive' :
                          insight.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                          'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        }`}
                      >
                        {insight.message}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlowPlanner;