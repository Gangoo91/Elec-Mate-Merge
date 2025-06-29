
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, PoundSterling, Info, AlertTriangle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdvancedFundingCalculation {
  totalCost: number;
  advancedLearnerLoan: number;
  employerContribution: number;
  personalContribution: number;
  governmentFunding: number;
  apprenticeshipLevy: number;
  monthlyPayment: number;
  repaymentThreshold: number;
  estimatedCompletionTime: number;
  regionalSupport: number;
  industrySpecificFunding: number;
  totalFunding: number;
  fundingGap: number;
}

interface FundingSource {
  name: string;
  amount: number;
  description: string;
  eligibility: string;
}

const AdvancedFundingCalculator = () => {
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [courseCost, setCourseCost] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [employerSupport, setEmployerSupport] = useState<string>("");
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [calculation, setCalculation] = useState<AdvancedFundingCalculation | null>(null);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const { toast } = useToast();

  const validateInputs = (): boolean => {
    if (!courseLevel || !courseCost || !courseDuration || !currentSalary || !region || !industry || !employmentStatus) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate funding options.",
        variant: "destructive",
      });
      return false;
    }

    const cost = parseFloat(courseCost);
    if (cost <= 0 || cost > 50000) {
      toast({
        title: "Invalid Course Cost",
        description: "Course cost must be between £1 and £50,000.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const calculateAdvancedFunding = () => {
    if (!validateInputs()) return;

    const cost = parseFloat(courseCost) || 0;
    const salary = parseFloat(currentSalary) || 0;
    const employerContrib = parseFloat(employerSupport) || 0;
    const duration = parseFloat(courseDuration) || 1;

    // Advanced Learner Loan eligibility
    let loanEligible = false;
    if (["level4", "level5", "level6"].includes(courseLevel)) {
      loanEligible = true;
    }

    // Government funding based on level and employment status
    let governmentFunding = 0;
    if (employmentStatus === "apprentice") {
      // Apprenticeship funding rates
      if (courseLevel === "level2") governmentFunding = cost * 0.95;
      if (courseLevel === "level3") governmentFunding = cost * 0.90;
      if (["level4", "level5"].includes(courseLevel)) governmentFunding = cost * 0.85;
    } else if (employmentStatus === "unemployed") {
      governmentFunding = cost * 0.80; // Higher support for unemployed
    }

    // Apprenticeship levy for larger employers
    let apprenticeshipLevy = 0;
    if (salary > 30000 && employerContrib > 0) {
      apprenticeshipLevy = Math.min(cost * 0.15, 3000);
    }

    // Regional funding variations
    let regionalSupport = 0;
    const regionalRates: { [key: string]: number } = {
      "north-east": 0.15,
      "north-west": 0.12,
      "yorkshire": 0.12,
      "west-midlands": 0.10,
      "east-midlands": 0.10,
      "wales": 0.15,
      "scotland": 0.14,
      "northern-ireland": 0.16,
      "south-west": 0.08,
      "south-east": 0.05,
      "london": 0.03,
      "east": 0.07
    };
    regionalSupport = cost * (regionalRates[region] || 0);

    // Industry-specific funding
    let industrySpecificFunding = 0;
    const industryRates: { [key: string]: number } = {
      "electrical": 0.08,
      "renewable-energy": 0.12,
      "construction": 0.07,
      "manufacturing": 0.06,
      "healthcare": 0.10,
      "digital": 0.09
    };
    industrySpecificFunding = cost * (industryRates[industry] || 0);

    // Calculate loan amount
    const advancedLearnerLoan = loanEligible ? 
      Math.max(0, cost - employerContrib - governmentFunding - regionalSupport - industrySpecificFunding) : 0;
    
    // Personal contribution
    const totalFunding = employerContrib + governmentFunding + regionalSupport + industrySpecificFunding + advancedLearnerLoan;
    const personalContribution = Math.max(0, cost - totalFunding);

    // Monthly repayment calculation (9% of income over £25,000)
    const monthlyPayment = salary > 25000 ? ((salary - 25000) * 0.09) / 12 : 0;

    // Funding gap analysis
    const fundingGap = Math.max(0, cost - totalFunding);

    const result: AdvancedFundingCalculation = {
      totalCost: cost,
      advancedLearnerLoan,
      employerContribution: employerContrib,
      personalContribution,
      governmentFunding,
      apprenticeshipLevy,
      monthlyPayment,
      repaymentThreshold: 25000,
      estimatedCompletionTime: duration,
      regionalSupport,
      industrySpecificFunding,
      totalFunding,
      fundingGap
    };

    // Build funding sources array
    const sources: FundingSource[] = [];
    
    if (employerContrib > 0) {
      sources.push({
        name: "Employer Contribution",
        amount: employerContrib,
        description: "Direct funding from your employer",
        eligibility: "Confirmed with employer"
      });
    }

    if (governmentFunding > 0) {
      sources.push({
        name: "Government Funding",
        amount: governmentFunding,
        description: "Public funding based on course level and employment status",
        eligibility: "Subject to eligibility criteria"
      });
    }

    if (advancedLearnerLoan > 0) {
      sources.push({
        name: "Advanced Learner Loan",
        amount: advancedLearnerLoan,
        description: "Government-backed loan for higher-level qualifications",
        eligibility: "Available for Level 3-6 qualifications"
      });
    }

    if (regionalSupport > 0) {
      sources.push({
        name: "Regional Support",
        amount: regionalSupport,
        description: "Additional funding based on your location",
        eligibility: "Automatic based on postcode"
      });
    }

    if (industrySpecificFunding > 0) {
      sources.push({
        name: "Industry-Specific Funding",
        amount: industrySpecificFunding,
        description: "Sector-specific training support",
        eligibility: "Industry partnership programmes"
      });
    }

    setCalculation(result);
    setFundingSources(sources);

    toast({
      title: "Funding Calculated",
      description: `Found ${sources.length} potential funding sources totalling £${totalFunding.toLocaleString()}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Advanced Education Funding Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive funding analysis including government support, regional variations, and industry-specific options
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseLevel">Course Level *</Label>
              <Select value={courseLevel} onValueChange={setCourseLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level2">Level 2 (GCSE equivalent)</SelectItem>
                  <SelectItem value="level3">Level 3 (A-Level equivalent)</SelectItem>
                  <SelectItem value="level4">Level 4 (HNC)</SelectItem>
                  <SelectItem value="level5">Level 5 (HND)</SelectItem>
                  <SelectItem value="level6">Level 6 (Bachelor's)</SelectItem>
                  <SelectItem value="level7">Level 7 (Master's)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCost">Course Cost (£) *</Label>
              <Input
                id="courseCost"
                type="number"
                placeholder="e.g., 6000"
                value={courseCost}
                onChange={(e) => setCourseCost(e.target.value)}
                min="1"
                max="50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseDuration">Duration (years) *</Label>
              <Select value={courseDuration} onValueChange={setCourseDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Course duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">6 months</SelectItem>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="1.5">18 months</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="4">4 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apprentice">Apprentice</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="south-east">South East</SelectItem>
                  <SelectItem value="south-west">South West</SelectItem>
                  <SelectItem value="east">East of England</SelectItem>
                  <SelectItem value="west-midlands">West Midlands</SelectItem>
                  <SelectItem value="east-midlands">East Midlands</SelectItem>
                  <SelectItem value="yorkshire">Yorkshire & Humber</SelectItem>
                  <SelectItem value="north-west">North West</SelectItem>
                  <SelectItem value="north-east">North East</SelectItem>
                  <SelectItem value="wales">Wales</SelectItem>
                  <SelectItem value="scotland">Scotland</SelectItem>
                  <SelectItem value="northern-ireland">Northern Ireland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry Sector *</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="digital">Digital & Tech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employerSupport">Employer Contribution (£)</Label>
              <Input
                id="employerSupport"
                type="number"
                placeholder="e.g., 2000"
                value={employerSupport}
                onChange={(e) => setEmployerSupport(e.target.value)}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Annual Salary (£) *</Label>
              <Input
                id="currentSalary"
                type="number"
                placeholder="e.g., 28000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <Button onClick={calculateAdvancedFunding} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Advanced Funding Options
          </Button>
        </CardContent>
      </Card>

      {calculation && (
        <>
          {/* Funding Summary */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <PoundSterling className="h-5 w-5" />
                Comprehensive Funding Breakdown
              </CardTitle>
              {calculation.fundingGap > 0 && (
                <div className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Funding gap of £{calculation.fundingGap.toLocaleString()} identified</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Course Cost:</span>
                    <span className="font-semibold text-lg">£{calculation.totalCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Funding Available:</span>
                    <span className="font-semibold text-green-400">£{calculation.totalFunding.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Coverage:</span>
                    <Badge variant={calculation.fundingGap === 0 ? "default" : "secondary"}>
                      {Math.round((calculation.totalFunding / calculation.totalCost) * 100)}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Personal Contribution:</span>
                    <span className={`font-semibold ${calculation.personalContribution > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                      £{calculation.personalContribution.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Repayment:</span>
                    <span className="font-semibold">£{Math.round(calculation.monthlyPayment).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Course Duration:</span>
                    <span className="font-semibold">{calculation.estimatedCompletionTime} year{calculation.estimatedCompletionTime !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Regional Support:</span>
                    <span className="font-semibold text-blue-400">£{calculation.regionalSupport.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Industry Funding:</span>
                    <span className="font-semibold text-purple-400">£{calculation.industrySpecificFunding.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Repayment Threshold:</span>
                    <span className="font-semibold">£{calculation.repaymentThreshold.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Sources Breakdown */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Available Funding Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fundingSources.map((source, index) => (
                  <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-elec-yellow">{source.name}</h4>
                      <span className="font-bold text-green-400">£{source.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {source.eligibility}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Info className="h-5 w-5" />
                Important Information & Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Loan Repayment Details</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>You only repay when earning over £{calculation.repaymentThreshold.toLocaleString()}</li>
                    <li>Repayments are 9% of income above the threshold</li>
                    <li>Outstanding debt is written off after 30 years</li>
                    <li>No early repayment penalties</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Application Process</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Apply for Advanced Learner Loan through Student Finance England</li>
                    <li>Confirm employer contribution agreements</li>
                    <li>Check regional funding eligibility with local authorities</li>
                    <li>Explore industry-specific grants and bursaries</li>
                  </ul>
                </div>
              </div>

              {calculation.fundingGap > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-orange-400">Funding Gap Solutions</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Consider payment plans with training providers</li>
                    <li>Look into hardship funds and bursaries</li>
                    <li>Explore charity and foundation grants</li>
                    <li>Discuss additional employer support</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdvancedFundingCalculator;
