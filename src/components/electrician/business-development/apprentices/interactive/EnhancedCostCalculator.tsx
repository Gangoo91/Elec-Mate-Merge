import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, PoundSterling, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const EnhancedCostCalculator = () => {
  const [apprenticeAge, setApprenticeAge] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [region, setRegion] = useState("");
  const [numberOfApprentices, setNumberOfApprentices] = useState(1);
  const [calculatedResults, setCalculatedResults] = useState(null);

  // 2025 UK wage rates
  const wageRates = {
    "16-18": { apprentice: 6.81, minimum: 6.81 },
    "19-24": { apprentice: 6.81, minimum: 11.44 },
    "25+": { apprentice: 6.81, minimum: 11.44 }
  };

  // Regional cost multipliers (2025)
  const regionalMultipliers = {
    london: 1.25,
    southeast: 1.15,
    southwest: 1.05,
    midlands: 1.0,
    north: 0.95,
    scotland: 1.05,
    wales: 0.98,
    ni: 0.92
  };

  // Government incentives 2025
  const getIncentives = (age, businessSize) => {
    let incentive = 0;
    if (age === "16-18") incentive = 3000;
    else if (age === "19-24") incentive = 1500;
    
    // Small business bonus
    if (businessSize === "small" && age === "16-18") incentive += 1000;
    
    return incentive;
  };

  const calculateComprehensiveCosts = () => {
    if (!apprenticeAge || !businessSize || !region) return;

    const baseWage = wageRates[apprenticeAge].apprentice;
    const multiplier = regionalMultipliers[region] || 1.0;
    const adjustedWage = baseWage * multiplier;
    const annualSalary = adjustedWage * 40 * 52;
    
    // Employer costs
    const employerNI = annualSalary * 0.138;
    const pension = annualSalary * 0.03;
    const equipment = 1200 * multiplier; // Regional variation for equipment
    const admin = 800;
    const collegeContribution = businessSize === "small" ? 500 : 2500;
    
    // Government incentives
    const incentive = getIncentives(apprenticeAge, businessSize);
    
    // 4-year progression
    const yearTwoCosts = annualSalary * 1.1 + employerNI * 1.1 + pension * 1.1;
    const yearThreeCosts = annualSalary * 1.25 + employerNI * 1.25 + pension * 1.25;
    const yearFourCosts = annualSalary * 1.4 + employerNI * 1.4 + pension * 1.4;
    
    // ROI calculations
    const totalInvestment = annualSalary + employerNI + pension + equipment + admin + collegeContribution - incentive +
                          yearTwoCosts + yearThreeCosts + yearFourCosts;
    const qualifiedElectricianValue = 42000 * 5; // 5-year earning potential
    const netROI = ((qualifiedElectricianValue - totalInvestment) / totalInvestment) * 100;
    
    // Cash flow analysis
    const cashFlow = [
      { year: 1, cost: annualSalary + employerNI + pension + equipment + admin + collegeContribution - incentive, revenue: 0 },
      { year: 2, cost: yearTwoCosts, revenue: 8000 }, // Partial productivity
      { year: 3, cost: yearThreeCosts, revenue: 18000 }, // Increased productivity
      { year: 4, cost: yearFourCosts, revenue: 32000 }, // Near full productivity
    ];

    setCalculatedResults({
      baseWage: adjustedWage,
      annualSalary,
      employerNI,
      pension,
      equipment,
      admin,
      collegeContribution,
      incentive,
      totalYearOne: annualSalary + employerNI + pension + equipment + admin + collegeContribution - incentive,
      totalInvestment,
      qualifiedElectricianValue,
      netROI,
      cashFlow,
      multiplier,
      region
    });
  };

  const calculateMultipleApprentices = () => {
    if (!calculatedResults) return null;
    
    const baseTotal = calculatedResults.totalInvestment;
    const bulkDiscount = numberOfApprentices > 3 ? 0.1 : numberOfApprentices > 1 ? 0.05 : 0;
    const totalCost = baseTotal * numberOfApprentices * (1 - bulkDiscount);
    const totalROI = calculatedResults.qualifiedElectricianValue * numberOfApprentices - totalCost;
    
    return { totalCost, totalROI, bulkDiscount };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          2025 Advanced Apprenticeship Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age-range">Apprentice Age Range</Label>
              <Select value={apprenticeAge} onValueChange={setApprenticeAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16-18">16-18 years</SelectItem>
                  <SelectItem value="19-24">19-24 years</SelectItem>
                  <SelectItem value="25+">25+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="business-size">Business Size</Label>
              <Select value={businessSize} onValueChange={setBusinessSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (under 50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (50-250 employees)</SelectItem>
                  <SelectItem value="large">Large (over 250 employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="southeast">South East</SelectItem>
                  <SelectItem value="southwest">South West</SelectItem>
                  <SelectItem value="midlands">Midlands</SelectItem>
                  <SelectItem value="north">North England</SelectItem>
                  <SelectItem value="scotland">Scotland</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="ni">Northern Ireland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="apprentices">Number of Apprentices</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={numberOfApprentices}
                onChange={(e) => setNumberOfApprentices(parseInt(e.target.value) || 1)}
                placeholder="1"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <Button onClick={calculateComprehensiveCosts} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Advanced Costs & ROI
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {calculatedResults && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                  <PoundSterling className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-300">
                    £{calculatedResults.totalYearOne.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-200">Year 1 Investment</div>
                </div>
                
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-300">
                    {calculatedResults.netROI.toFixed(0)}%
                  </div>
                  <div className="text-sm text-green-200">4-Year ROI</div>
                </div>
                
                <div className="p-4 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
                  <div className="text-lg font-bold text-elec-yellow">
                    £{(calculatedResults.qualifiedElectricianValue / 5).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Value (Qualified)</div>
                </div>
              </div>

              {/* Regional Information */}
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="font-medium text-purple-300">Regional Adjustments</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-200">Wage Multiplier:</span>
                    <div className="text-white font-medium">{calculatedResults.multiplier}x</div>
                  </div>
                  <div>
                    <span className="text-purple-200">Adjusted Hourly Rate:</span>
                    <div className="text-white font-medium">£{calculatedResults.baseWage.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Cash Flow Analysis */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">4-Year Cash Flow Analysis</h4>
                {calculatedResults.cashFlow.map((year, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-3 bg-elec-dark/50 rounded">
                    <div>
                      <span className="text-muted-foreground">Year {year.year}</span>
                    </div>
                    <div className="text-red-300">
                      Cost: £{year.cost.toLocaleString()}
                    </div>
                    <div className="text-green-300">
                      Revenue: £{year.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Multiple Apprentices Calculation */}
              {numberOfApprentices > 1 && (() => {
                const multiple = calculateMultipleApprentices();
                return multiple && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h4 className="font-semibold text-amber-300 mb-3">
                      {numberOfApprentices} Apprentices Scenario
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-amber-200">Total Investment:</span>
                        <div className="text-white font-bold">£{multiple.totalCost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-amber-200">Bulk Discount:</span>
                        <div className="text-green-400 font-bold">{(multiple.bulkDiscount * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-amber-200">Total ROI:</span>
                        <div className="text-elec-yellow font-bold">£{multiple.totalROI.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCostCalculator;