import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, PoundSterling, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

const EnhancedCostCalculator = () => {
  const [apprenticeAge, setApprenticeAge] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [region, setRegion] = useState("");
  const [apprenticeshipLevel, setApprenticeshipLevel] = useState("");
  const [trainingProvider, setTrainingProvider] = useState("");
  const [sectorSpecialisation, setSectorSpecialisation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [workingPattern, setWorkingPattern] = useState("");
  const [additionalBenefits, setAdditionalBenefits] = useState<string[]>([]);
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
    northwest: 0.95,
    northeast: 0.92,
    scotland: 1.05,
    wales: 0.98,
    ni: 0.92
  };

  // Apprenticeship level data
  const apprenticeshipLevels = {
    "level2": { duration: 18, baseCost: 4000, qualification: "Level 2 Electrical Installation" },
    "level3": { duration: 42, baseCost: 9000, qualification: "Level 3 Electrical Installation" },
    "level4": { duration: 48, baseCost: 15000, qualification: "Level 4 Electrical & Electronic Engineering" }
  };

  // Training provider multipliers
  const trainingProviderMultipliers = {
    "fe-college": 1.0,
    "private-provider": 1.3,
    "university-tc": 1.5,
    "apprenticeship-company": 0.9
  };

  // Sector specialisation data
  const sectorData = {
    "domestic": { wageMultiplier: 1.0, equipmentCost: 800, demandFactor: 1.0 },
    "commercial": { wageMultiplier: 1.15, equipmentCost: 1500, demandFactor: 1.2 },
    "industrial": { wageMultiplier: 1.25, equipmentCost: 2200, demandFactor: 1.3 },
    "renewable": { wageMultiplier: 1.4, equipmentCost: 1800, demandFactor: 1.5 },
    "data-comms": { wageMultiplier: 1.3, equipmentCost: 1200, demandFactor: 1.25 }
  };

  // Previous experience impact
  const experienceAdjustments = {
    "complete-beginner": { timeMultiplier: 1.0, supervisionCost: 2000, wageReduction: 0 },
    "some-construction": { timeMultiplier: 0.9, supervisionCost: 1500, wageReduction: 0 },
    "related-trade": { timeMultiplier: 0.8, supervisionCost: 1000, wageReduction: 0 },
    "electrical-helper": { timeMultiplier: 0.7, supervisionCost: 500, wageReduction: 0.1 }
  };

  // Working pattern adjustments
  const workingPatterns = {
    "full-time": { hoursPerWeek: 40, costMultiplier: 1.0, progressionRate: 1.0 },
    "part-time": { hoursPerWeek: 25, costMultiplier: 0.65, progressionRate: 0.7 },
    "block-release": { hoursPerWeek: 40, costMultiplier: 1.1, progressionRate: 1.1 },
    "day-release": { hoursPerWeek: 32, costMultiplier: 0.85, progressionRate: 0.9 }
  };

  // Additional benefits costs
  const benefitsCosts = {
    "company-vehicle": 3600,
    "health-insurance": 1200,
    "performance-bonus": 1500,
    "tool-allowance": 800,
    "pension-enhanced": 600,
    "training-budget": 1000
  };

  // Government incentives 2025
  const getIncentives = (age, businessSize, level) => {
    let incentive = 0;
    if (age === "16-18") incentive = 3000;
    else if (age === "19-24") incentive = 1500;
    
    // Small business bonus
    if (businessSize === "small" && age === "16-18") incentive += 1000;
    
    // Level-based incentives
    if (level === "level4") incentive += 500;
    
    // Apprenticeship levy benefit for large companies
    if (businessSize === "large") {
      incentive += 2000; // Levy fund utilisation
    }
    
    return incentive;
  };

  const toggleBenefit = (benefit: string) => {
    setAdditionalBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const calculateComprehensiveCosts = () => {
    if (!apprenticeAge || !businessSize || !region || !apprenticeshipLevel || 
        !trainingProvider || !sectorSpecialisation || !previousExperience || !workingPattern) return;

    const baseWage = wageRates[apprenticeAge].apprentice;
    const regionalMultiplier = regionalMultipliers[region] || 1.0;
    const sectorInfo = sectorData[sectorSpecialisation];
    const experienceInfo = experienceAdjustments[previousExperience];
    const patternInfo = workingPatterns[workingPattern];
    const levelInfo = apprenticeshipLevels[apprenticeshipLevel];
    const providerMultiplier = trainingProviderMultipliers[trainingProvider];
    
    // Calculate adjusted wage
    const adjustedWage = baseWage * regionalMultiplier * sectorInfo.wageMultiplier * patternInfo.costMultiplier;
    const annualSalary = adjustedWage * patternInfo.hoursPerWeek * 52;
    
    // Enhanced employer costs
    const employerNI = annualSalary * 0.138;
    const pension = annualSalary * 0.03;
    const equipment = sectorInfo.equipmentCost * regionalMultiplier;
    const admin = 800;
    const supervisionCost = experienceInfo.supervisionCost;
    
    // Training costs with provider and level adjustments
    const baseTrainingCost = levelInfo.baseCost * providerMultiplier;
    const collegeContribution = businessSize === "small" ? baseTrainingCost * 0.1 : baseTrainingCost * 0.2;
    
    // Additional benefits costs
    const benefitsCost = additionalBenefits.reduce((total, benefit) => 
      total + (benefitsCosts[benefit] || 0), 0);
    
    // Government incentives with enhanced calculation
    const incentive = getIncentives(apprenticeAge, businessSize, apprenticeshipLevel);
    
    // Multi-year progression with experience and pattern adjustments
    const durationMonths = levelInfo.duration * experienceInfo.timeMultiplier / patternInfo.progressionRate;
    const yearTwoCosts = (annualSalary * 1.1 + employerNI * 1.1 + pension * 1.1) * patternInfo.costMultiplier;
    const yearThreeCosts = (annualSalary * 1.25 + employerNI * 1.25 + pension * 1.25) * patternInfo.costMultiplier;
    const yearFourCosts = durationMonths > 36 ? (annualSalary * 1.4 + employerNI * 1.4 + pension * 1.4) * patternInfo.costMultiplier : 0;
    
    // Enhanced ROI calculations
    const totalInvestment = annualSalary + employerNI + pension + equipment + admin + 
                           collegeContribution + supervisionCost + benefitsCost - incentive +
                           yearTwoCosts + yearThreeCosts + yearFourCosts;
    
    // Sector-specific qualified electrician value
    const baseQualifiedValue = 42000;
    const qualifiedElectricianValue = baseQualifiedValue * sectorInfo.demandFactor * regionalMultiplier * 5;
    const netROI = ((qualifiedElectricianValue - totalInvestment) / totalInvestment) * 100;
    
    // Enhanced cash flow analysis
    const cashFlow = [
      { 
        year: 1, 
        cost: annualSalary + employerNI + pension + equipment + admin + collegeContribution + supervisionCost + benefitsCost - incentive, 
        revenue: 0,
        notes: "Training period - minimal productivity"
      },
      { 
        year: 2, 
        cost: yearTwoCosts, 
        revenue: 8000 * sectorInfo.demandFactor, 
        notes: "Developing skills - partial productivity"
      },
      { 
        year: 3, 
        cost: yearThreeCosts, 
        revenue: 18000 * sectorInfo.demandFactor, 
        notes: "Competent worker - good productivity"
      }
    ];
    
    if (yearFourCosts > 0) {
      cashFlow.push({ 
        year: 4, 
        cost: yearFourCosts, 
        revenue: 32000 * sectorInfo.demandFactor, 
        notes: "Near qualified - high productivity"
      });
    }

    setCalculatedResults({
      baseWage: adjustedWage,
      annualSalary,
      employerNI,
      pension,
      equipment,
      admin,
      supervisionCost,
      collegeContribution,
      benefitsCost,
      incentive,
      totalYearOne: annualSalary + employerNI + pension + equipment + admin + collegeContribution + supervisionCost + benefitsCost - incentive,
      totalInvestment,
      qualifiedElectricianValue,
      netROI,
      cashFlow,
      multiplier: regionalMultiplier,
      region,
      levelInfo,
      sectorInfo,
      experienceInfo,
      patternInfo,
      durationMonths
    });
  };

  const calculateMultipleApprentices = () => {
    if (!calculatedResults) return null;
    
    const baseTotal = calculatedResults.totalInvestment;
    const bulkDiscount = numberOfApprentices > 5 ? 0.15 : numberOfApprentices > 3 ? 0.1 : numberOfApprentices > 1 ? 0.05 : 0;
    const totalCost = baseTotal * numberOfApprentices * (1 - bulkDiscount);
    const totalROI = calculatedResults.qualifiedElectricianValue * numberOfApprentices - totalCost;
    
    return { totalCost, totalROI, bulkDiscount };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-elec-yellow flex items-center justify-center gap-3 text-xl md:text-2xl">
          <Calculator className="h-6 w-6" />
          2025 Advanced Apprenticeship Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Enhanced Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Row 1 - Basic Information */}
            <div className="space-y-3">
              <Label htmlFor="age-range" className="text-white font-medium text-base">
                Apprentice Age Range
              </Label>
              <Select value={apprenticeAge} onValueChange={setApprenticeAge}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select age range..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="16-18">16-18 years</SelectItem>
                  <SelectItem value="19-24">19-24 years</SelectItem>
                  <SelectItem value="25+">25+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="business-size" className="text-white font-medium text-base">
                Business Size
              </Label>
              <Select value={businessSize} onValueChange={setBusinessSize}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select business size..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="small">Small (under 50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (50-250 employees)</SelectItem>
                  <SelectItem value="large">Large (over 250 employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="region" className="text-white font-medium text-base">
                Region
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select region..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="southeast">South East</SelectItem>
                  <SelectItem value="southwest">South West</SelectItem>
                  <SelectItem value="midlands">Midlands</SelectItem>
                  <SelectItem value="northwest">North West</SelectItem>
                  <SelectItem value="northeast">North East</SelectItem>
                  <SelectItem value="scotland">Scotland</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="ni">Northern Ireland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 2 - Training Details */}
            <div className="space-y-3">
              <Label htmlFor="apprenticeship-level" className="text-white font-medium text-base">
                Apprenticeship Level
              </Label>
              <Select value={apprenticeshipLevel} onValueChange={setApprenticeshipLevel}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select level..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="level2">Level 2 (18 months)</SelectItem>
                  <SelectItem value="level3">Level 3 (42 months)</SelectItem>
                  <SelectItem value="level4">Level 4 (48 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="training-provider" className="text-white font-medium text-base">
                Training Provider Type
              </Label>
              <Select value={trainingProvider} onValueChange={setTrainingProvider}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select provider..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="fe-college">FE College</SelectItem>
                  <SelectItem value="private-provider">Private Training Provider</SelectItem>
                  <SelectItem value="university-tc">University Technical College</SelectItem>
                  <SelectItem value="apprenticeship-company">Apprenticeship Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="sector" className="text-white font-medium text-base">
                Sector Specialisation
              </Label>
              <Select value={sectorSpecialisation} onValueChange={setSectorSpecialisation}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select sector..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="domestic">Domestic Installation</SelectItem>
                  <SelectItem value="commercial">Commercial & Industrial</SelectItem>
                  <SelectItem value="industrial">Heavy Industrial</SelectItem>
                  <SelectItem value="renewable">Renewable Energy Systems</SelectItem>
                  <SelectItem value="data-comms">Data & Communications</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 3 - Experience & Working Pattern */}
            <div className="space-y-3">
              <Label htmlFor="experience" className="text-white font-medium text-base">
                Previous Experience
              </Label>
              <Select value={previousExperience} onValueChange={setPreviousExperience}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select experience..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                  <SelectItem value="some-construction">Some Construction Experience</SelectItem>
                  <SelectItem value="related-trade">Related Trade Background</SelectItem>
                  <SelectItem value="electrical-helper">Electrical Helper/Mate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="working-pattern" className="text-white font-medium text-base">
                Working Pattern
              </Label>
              <Select value={workingPattern} onValueChange={setWorkingPattern}>
                <SelectTrigger className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base">
                  <SelectValue placeholder="Select pattern..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="full-time">Full-Time (40 hrs/week)</SelectItem>
                  <SelectItem value="part-time">Part-Time (25 hrs/week)</SelectItem>
                  <SelectItem value="block-release">Block Release</SelectItem>
                  <SelectItem value="day-release">Day Release</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="apprentices" className="text-white font-medium text-base">
                Number of Apprentices
              </Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={numberOfApprentices}
                onChange={(e) => setNumberOfApprentices(parseInt(e.target.value) || 1)}
                placeholder="1"
                className="h-14 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50 text-base"
              />
            </div>
          </div>

          {/* Additional Benefits Section */}
          <div className="space-y-4">
            <Label className="text-white font-medium text-base">Additional Benefits (Optional)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(benefitsCosts).map(([benefit, cost]) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Button
                    variant={additionalBenefits.includes(benefit) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleBenefit(benefit)}
                    className={`w-full justify-start text-xs ${
                      additionalBenefits.includes(benefit) 
                        ? "bg-elec-yellow text-elec-dark" 
                        : "border-elec-yellow/30 hover:bg-elec-yellow/20"
                    }`}
                  >
                    {additionalBenefits.includes(benefit) && <CheckCircle className="h-3 w-3 mr-1" />}
                    {benefit.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} (£{cost})
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateComprehensiveCosts} 
              className="w-full md:w-auto px-8 h-14 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold text-base"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate
            </Button>
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
                  <div className="text-sm text-green-200">Expected ROI</div>
                </div>
                
                <div className="p-4 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
                  <div className="text-lg font-bold text-elec-yellow">
                    {Math.round(calculatedResults.durationMonths)} months
                  </div>
                  <div className="text-sm text-muted-foreground">Training Duration</div>
                </div>
              </div>

              {/* Enhanced Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regional & Sector Information */}
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-purple-300">Location & Sector Analysis</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-200">Regional Multiplier:</span>
                      <span className="text-white font-medium">{calculatedResults.multiplier}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Sector Demand:</span>
                      <span className="text-white font-medium">{calculatedResults.sectorInfo.demandFactor}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Hourly Rate:</span>
                      <span className="text-white font-medium">£{calculatedResults.baseWage.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Training & Experience Details */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-amber-300">Training & Experience</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-200">Level:</span>
                      <span className="text-white font-medium">{calculatedResults.levelInfo.qualification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200">Supervision Cost:</span>
                      <span className="text-white font-medium">£{calculatedResults.supervisionCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200">Benefits Cost:</span>
                      <span className="text-white font-medium">£{calculatedResults.benefitsCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Cash Flow Analysis */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Enhanced Cash Flow Analysis</h4>
                {calculatedResults.cashFlow.map((year, index) => (
                  <div key={index} className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-muted-foreground font-medium">Year {year.year}</span>
                      </div>
                      <div className="text-red-300">
                        <span className="text-xs text-muted-foreground block">Cost</span>
                        <span className="font-bold">£{year.cost.toLocaleString()}</span>
                      </div>
                      <div className="text-green-300">
                        <span className="text-xs text-muted-foreground block">Revenue</span>
                        <span className="font-bold">£{year.revenue.toLocaleString()}</span>
                      </div>
                      <div className="text-blue-300">
                        <span className="text-xs text-muted-foreground block">Net</span>
                        <span className="font-bold">£{(year.revenue - year.cost).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground italic">
                      {year.notes}
                    </div>
                  </div>
                ))}
              </div>

              {/* Multiple Apprentices Calculation */}
              {numberOfApprentices > 1 && (() => {
                const multiple = calculateMultipleApprentices();
                return multiple && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-3">
                      {numberOfApprentices} Apprentices Scenario
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-green-200">Total Investment:</span>
                        <div className="text-white font-bold">£{multiple.totalCost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-green-200">Bulk Discount:</span>
                        <div className="text-green-400 font-bold">{(multiple.bulkDiscount * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-green-200">Total ROI:</span>
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