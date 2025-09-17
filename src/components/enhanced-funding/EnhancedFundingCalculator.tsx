import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  PoundSterling, 
  TrendingUp, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  FUNDING_RATES_2025, 
  REGIONAL_FUNDING_2025, 
  PROFESSIONAL_BODY_FUNDING,
  COURSE_FUNDING_CATEGORIES,
  calculateMonthlyRepayment,
  calculateFundingGap,
  getEligibleFunding
} from "@/lib/funding-constants-2025";
import { copyToClipboard, downloadJSON } from "@/lib/calc-utils";

interface EnhancedFundingResult {
  totalCost: number;
  totalFunding: number;
  fundingGap: number;
  fundingCoverage: number;
  monthlyRepayment: number;
  fundingSources: FundingSource[];
  recommendations: string[];
  timeline: FundingTimeline[];
  taxBenefits: number;
}

interface FundingSource {
  name: string;
  amount: number;
  type: 'loan' | 'grant' | 'employer' | 'professional';
  description: string;
  eligibility: string;
  applicationUrl?: string;
  deadline?: string;
}

interface FundingTimeline {
  phase: string;
  action: string;
  timeframe: string;
  amount?: number;
}

const EnhancedFundingCalculator = () => {
  const [inputs, setInputs] = useState({
    courseLevel: "",
    courseCategory: "",
    courseCost: "",
    courseDuration: "",
    currentSalary: "",
    age: "",
    employmentStatus: "",
    employerSize: "",
    region: "",
    hasEmployerSupport: false,
    employerContribution: "",
    isVATRegistered: false,
    studyMode: "fullTime"
  });

  const [result, setResult] = useState<EnhancedFundingResult | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateEnhancedFunding = () => {
    const cost = parseFloat(inputs.courseCost) || 0;
    const salary = parseFloat(inputs.currentSalary) || 0;
    const age = parseInt(inputs.age) || 0;
    const employerContrib = parseFloat(inputs.employerContribution) || 0;

    if (!inputs.courseLevel || !inputs.courseCategory || cost <= 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const fundingSources: FundingSource[] = [];
    let totalFunding = 0;

    // Student Finance (Level 6)
    if (inputs.courseLevel === "level6") {
      const tuitionLoan = Math.min(cost, FUNDING_RATES_2025.undergraduate.tuitionFeeLimit);
      fundingSources.push({
        name: "Tuition Fee Loan",
        amount: tuitionLoan,
        type: "loan",
        description: "Government-backed loan for tuition fees",
        eligibility: "UK residents, age 18+",
        applicationUrl: "https://www.gov.uk/student-finance"
      });
      totalFunding += tuitionLoan;
    }

    // Postgraduate Loan (Level 7)
    if (inputs.courseLevel === "level7") {
      const pgLoan = Math.min(cost, FUNDING_RATES_2025.postgraduate.maxLoan);
      fundingSources.push({
        name: "Postgraduate Loan",
        amount: pgLoan,
        type: "loan",
        description: "Government loan for master's level study",
        eligibility: "UK residents, first master's degree",
        applicationUrl: "https://www.gov.uk/student-finance"
      });
      totalFunding += pgLoan;
    }

    // Advanced Learner Loan (Levels 3-6)
    if (["level3", "level4", "level5", "level6"].includes(inputs.courseLevel) && age >= 19) {
      const maxLoan = Math.min(cost - totalFunding, FUNDING_RATES_2025.advancedLearnerLoan.maxLoanPerCourse);
      if (maxLoan > 0) {
        fundingSources.push({
          name: "Advanced Learner Loan",
          amount: maxLoan,
          type: "loan",
          description: "Loan for higher-level qualifications",
          eligibility: "Age 19+, Level 3-6 courses",
          applicationUrl: "https://www.gov.uk/advanced-learner-loan"
        });
        totalFunding += maxLoan;
      }
    }

    // Skills Bank Funding
    if (["level3", "level4", "level5"].includes(inputs.courseLevel) && age >= 19) {
      const skillsBank = Math.min(
        cost - totalFunding, 
        FUNDING_RATES_2025.professionalQualifications.skillsBank.maxFunding
      );
      if (skillsBank > 0) {
        fundingSources.push({
          name: "Skills Bank Funding",
          amount: skillsBank,
          type: "grant",
          description: "Grant for professional qualifications",
          eligibility: "Age 19+, eligible qualifications",
          applicationUrl: "https://www.gov.uk/guidance/skills-bank"
        });
        totalFunding += skillsBank;
      }
    }

    // Employer Contribution
    if (employerContrib > 0) {
      fundingSources.push({
        name: "Employer Contribution",
        amount: employerContrib,
        type: "employer",
        description: "Direct funding from your employer",
        eligibility: "Confirmed with employer"
      });
      totalFunding += employerContrib;
    }

    // Apprenticeship Levy (Large employers)
    if (inputs.employerSize === "large" && inputs.employmentStatus === "employed") {
      const levyFunding = Math.min(cost * 0.8, 15000);
      fundingSources.push({
        name: "Apprenticeship Levy",
        amount: levyFunding,
        type: "employer",
        description: "Funding from apprenticeship levy",
        eligibility: "Employer with £3m+ payroll"
      });
      totalFunding += levyFunding;
    }

    // Regional Funding
    if (inputs.region && REGIONAL_FUNDING_2025.england[inputs.region as keyof typeof REGIONAL_FUNDING_2025.england]) {
      const multiplier = REGIONAL_FUNDING_2025.england[inputs.region as keyof typeof REGIONAL_FUNDING_2025.england].multiplier;
      const regionalSupport = cost * (multiplier - 1) * 0.1;
      if (regionalSupport > 0) {
        fundingSources.push({
          name: "Regional Skills Funding",
          amount: regionalSupport,
          type: "grant",
          description: "Additional regional support",
          eligibility: "Based on location"
        });
        totalFunding += regionalSupport;
      }
    }

    // Professional Body Funding
    if (inputs.courseCategory === "electrical" && PROFESSIONAL_BODY_FUNDING.iet) {
      const ietFunding = Math.min(1500, cost - totalFunding);
      if (ietFunding > 0) {
        fundingSources.push({
          name: "IET Education Support",
          amount: ietFunding,
          type: "professional",
          description: "Institution of Engineering and Technology funding",
          eligibility: "IET members, electrical qualifications",
          applicationUrl: "https://www.theiet.org/membership/awards-scholarships/"
        });
        totalFunding += ietFunding;
      }
    }

    // Calculate results
    const fundingGap = calculateFundingGap(cost, totalFunding);
    const fundingCoverage = (totalFunding / cost) * 100;
    const monthlyRepayment = calculateMonthlyRepayment(
      salary, 
      FUNDING_RATES_2025.advancedLearnerLoan.repaymentThreshold
    );

    // Tax benefits calculation
    const taxBenefits = inputs.isVATRegistered ? cost * 0.2 : 0;

    // Generate recommendations
    const recommendations: string[] = [];
    if (fundingGap > 0) {
      recommendations.push(`Consider employer funding - speak to your manager about the £${fundingGap.toLocaleString()} shortfall`);
    }
    if (inputs.courseCategory === "electrical") {
      recommendations.push("Check for additional IET or NICEIC funding opportunities");
    }
    if (inputs.employmentStatus === "employed" && !inputs.hasEmployerSupport) {
      recommendations.push("Discuss with your employer - they may benefit from apprenticeship levy credits");
    }

    // Generate timeline
    const timeline: FundingTimeline[] = [
      {
        phase: "Immediate",
        action: "Apply for government funding",
        timeframe: "2-4 weeks"
      },
      {
        phase: "Short-term",
        action: "Approach employer for support",
        timeframe: "1-2 weeks"
      },
      {
        phase: "Medium-term",
        action: "Start course and receive funding",
        timeframe: "Course start date"
      }
    ];

    const enhancedResult: EnhancedFundingResult = {
      totalCost: cost,
      totalFunding,
      fundingGap,
      fundingCoverage,
      monthlyRepayment,
      fundingSources,
      recommendations,
      timeline,
      taxBenefits
    };

    setResult(enhancedResult);
    setActiveTab("overview");

    toast({
      title: "Funding Calculated",
      description: `Found ${fundingSources.length} funding sources covering ${fundingCoverage.toFixed(0)}% of costs`
    });
  };

  const exportResults = () => {
    if (result) {
      downloadJSON(result, `funding-plan-${new Date().toISOString().split('T')[0]}.json`);
      toast({
        title: "Results Exported",
        description: "Funding plan downloaded as JSON file"
      });
    }
  };

  const shareResults = async () => {
    if (result) {
      const summary = `Funding Plan: £${result.totalFunding.toLocaleString()} available from ${result.fundingSources.length} sources (${result.fundingCoverage.toFixed(0)}% coverage)`;
      const success = await copyToClipboard(summary);
      toast({
        title: success ? "Copied to Clipboard" : "Copy Failed",
        description: success ? "Funding summary ready to share" : "Please try again"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Enhanced Funding Calculator 2025
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive funding analysis with updated 2025 rates and professional qualification support
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseLevel">Course Level *</Label>
              <Select value={inputs.courseLevel} onValueChange={(value) => handleInputChange("courseLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level3">Level 3 (A-Level equivalent)</SelectItem>
                  <SelectItem value="level4">Level 4 (HNC)</SelectItem>
                  <SelectItem value="level5">Level 5 (HND/Foundation)</SelectItem>
                  <SelectItem value="level6">Level 6 (Bachelor's Degree)</SelectItem>
                  <SelectItem value="level7">Level 7 (Master's Degree)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCategory">Course Category *</Label>
              <Select value={inputs.courseCategory} onValueChange={(value) => handleInputChange("courseCategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical Engineering</SelectItem>
                  <SelectItem value="management">Management & Leadership</SelectItem>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="safety">Health & Safety</SelectItem>
                  <SelectItem value="project">Project Management</SelectItem>
                  <SelectItem value="digital">Digital & Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCost">Course Cost (£) *</Label>
              <Input
                id="courseCost"
                type="number"
                placeholder="e.g. 6500"
                value={inputs.courseCost}
                onChange={(e) => handleInputChange("courseCost", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSalary">Annual Salary (£) *</Label>
              <Input
                id="currentSalary"
                type="number"
                placeholder="e.g. 32000"
                value={inputs.currentSalary}
                onChange={(e) => handleInputChange("currentSalary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 28"
                value={inputs.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select value={inputs.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="apprentice">Apprentice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={inputs.region} onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="northEast">North East</SelectItem>
                  <SelectItem value="northWest">North West</SelectItem>
                  <SelectItem value="yorkshire">Yorkshire & Humber</SelectItem>
                  <SelectItem value="eastMidlands">East Midlands</SelectItem>
                  <SelectItem value="westMidlands">West Midlands</SelectItem>
                  <SelectItem value="eastEngland">East of England</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="southEast">South East</SelectItem>
                  <SelectItem value="southWest">South West</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employerSize">Employer Size</Label>
              <Select value={inputs.employerSize} onValueChange={(value) => handleInputChange("employerSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-49 employees)</SelectItem>
                  <SelectItem value="medium">Medium (50-249 employees)</SelectItem>
                  <SelectItem value="large">Large (250+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employerContribution">Employer Contribution (£)</Label>
              <Input
                id="employerContribution"
                type="number"
                placeholder="e.g. 2000"
                value={inputs.employerContribution}
                onChange={(e) => handleInputChange("employerContribution", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateEnhancedFunding} size="lg" className="flex-1">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Enhanced Funding
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Funding Sources</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold">£{result.totalCost.toLocaleString()}</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Funding</p>
                      <p className="text-2xl font-bold text-green-600">£{result.totalFunding.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-${result.fundingGap > 0 ? 'orange' : 'green'}-500/20 bg-${result.fundingGap > 0 ? 'orange' : 'green'}-500/5`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Gap</p>
                      <p className={`text-2xl font-bold text-${result.fundingGap > 0 ? 'orange' : 'green'}-600`}>
                        £{result.fundingGap.toLocaleString()}
                      </p>
                    </div>
                    {result.fundingGap > 0 ? 
                      <AlertTriangle className="h-8 w-8 text-orange-600" /> :
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Funding Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coverage: {result.fundingCoverage.toFixed(1)}%</span>
                    <span>£{result.totalFunding.toLocaleString()} of £{result.totalCost.toLocaleString()}</span>
                  </div>
                  <Progress value={result.fundingCoverage} className="h-3" />
                </div>
                {result.monthlyRepayment > 0 && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly loan repayment:</span>
                      <span className="font-semibold">£{result.monthlyRepayment.toFixed(0)}/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on current salary, starts when earning over £{FUNDING_RATES_2025.advancedLearnerLoan.repaymentThreshold.toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Available Funding Sources</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={shareResults}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.fundingSources.map((source, index) => (
                <Card key={index} className="border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{source.name}</h4>
                      <Badge variant={
                        source.type === 'grant' ? 'default' : 
                        source.type === 'loan' ? 'secondary' :
                        source.type === 'employer' ? 'outline' : 'destructive'
                      }>
                        {source.type}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">
                      £{source.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {source.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Eligibility:</strong> {source.eligibility}
                    </p>
                    {source.applicationUrl && (
                      <Button variant="link" size="sm" className="p-0 mt-2 h-auto">
                        <a href={source.applicationUrl} target="_blank" rel="noopener noreferrer">
                          Apply Now →
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Funding Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.phase}</h4>
                        <p className="text-sm text-muted-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground">Timeline: {item.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Action Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>

                {result.taxBenefits > 0 && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Tax Benefits Available</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      As a VAT-registered business, you can reclaim £{result.taxBenefits.toLocaleString()} in VAT on course fees.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EnhancedFundingCalculator;