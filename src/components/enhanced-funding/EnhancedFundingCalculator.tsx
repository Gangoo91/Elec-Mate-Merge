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
  Calendar,
  Target,
  Phone,
  FileText,
  ExternalLink,
  Clock,
  MapPin,
  Building,
  User,
  Briefcase,
  Share,
  Download
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

    // Calculate results with more realistic funding coverage
    const fundingGap = calculateFundingGap(cost, totalFunding);
    const fundingCoverage = Math.min((totalFunding / cost) * 100, 100);
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
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Enhanced Funding Calculator 2025
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive funding analysis with updated 2025 rates and professional qualification support
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseLevel" className="text-foreground">Course Level *</Label>
              <Select value={inputs.courseLevel} onValueChange={(value) => handleInputChange("courseLevel", value)}>
                <SelectTrigger className="border-elec-yellow/20 focus:border-elec-yellow">
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
              <Label htmlFor="courseCategory" className="text-foreground">Course Category *</Label>
              <Select value={inputs.courseCategory} onValueChange={(value) => handleInputChange("courseCategory", value)}>
                <SelectTrigger className="border-elec-yellow/20 focus:border-elec-yellow">
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
              <Label htmlFor="courseCost" className="text-foreground">Course Cost (£) *</Label>
              <Input
                id="courseCost"
                type="number"
                placeholder="e.g. 6500"
                value={inputs.courseCost}
                onChange={(e) => handleInputChange("courseCost", e.target.value)}
                className="border-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSalary" className="text-foreground">Annual Salary (£) *</Label>
              <Input
                id="currentSalary"
                type="number"
                placeholder="e.g. 32000"
                value={inputs.currentSalary}
                onChange={(e) => handleInputChange("currentSalary", e.target.value)}
                className="border-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 28"
                value={inputs.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="border-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus" className="text-foreground">Employment Status *</Label>
              <Select value={inputs.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                <SelectTrigger className="border-elec-yellow/20 focus:border-elec-yellow">
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
              <Label htmlFor="region" className="text-foreground">Region</Label>
              <Select value={inputs.region} onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger className="border-elec-yellow/20 focus:border-elec-yellow">
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
              <Label htmlFor="employerSize" className="text-foreground">Employer Size</Label>
              <Select value={inputs.employerSize} onValueChange={(value) => handleInputChange("employerSize", value)}>
                <SelectTrigger className="border-elec-yellow/20 focus:border-elec-yellow">
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
              <Label htmlFor="employerContribution" className="text-foreground">Employer Contribution (£)</Label>
              <Input
                id="employerContribution"
                type="number"
                placeholder="e.g. 2000"
                value={inputs.employerContribution}
                onChange={(e) => handleInputChange("employerContribution", e.target.value)}
                className="border-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateEnhancedFunding} size="lg" className="flex-1 bg-elec-yellow text-background hover:bg-elec-yellow/90">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Enhanced Funding
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 md:gap-0 bg-elec-card/50 p-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm px-2 md:px-3 py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-background">Overview</TabsTrigger>
            <TabsTrigger value="sources" className="text-xs md:text-sm px-2 md:px-3 py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-background">Sources</TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs md:text-sm px-2 md:px-3 py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-background">Timeline</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs md:text-sm px-2 md:px-3 py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-background">Action Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Course Cost</p>
                      <p className="text-2xl font-bold text-foreground">£{result.totalCost.toLocaleString()}</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-elec-yellow" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Funding</p>
                      <p className="text-2xl font-bold text-elec-yellow">£{result.totalFunding.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-elec-yellow" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-elec-yellow/20 bg-elec-card ${result.fundingGap > 0 ? 'border-orange-500/30' : 'border-green-500/30'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Gap</p>
                      <p className={`text-2xl font-bold ${result.fundingGap > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                        £{result.fundingGap.toLocaleString()}
                      </p>
                    </div>
                    {result.fundingGap > 0 ? 
                      <AlertTriangle className="h-8 w-8 text-orange-500" /> :
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-foreground">Funding Coverage Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Comprehensive breakdown of your funding situation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">Coverage: {result.fundingCoverage.toFixed(1)}%</span>
                    <span className="text-foreground">£{result.totalFunding.toLocaleString()} of £{result.totalCost.toLocaleString()}</span>
                  </div>
                  <Progress value={result.fundingCoverage} className="h-4 bg-muted" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                {/* Funding Sources Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <h4 className="font-semibold text-foreground mb-2">Funding Sources</h4>
                    <p className="text-sm text-muted-foreground">{result.fundingSources.length} sources identified</p>
                    <div className="mt-2 space-y-1">
                      {result.fundingSources.slice(0, 3).map((source, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-foreground">{source.name}</span>
                          <span className="text-elec-yellow">£{source.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <h4 className="font-semibold text-foreground mb-2">Financial Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly repayment:</span>
                        <span className="text-foreground font-medium">£{result.monthlyRepayment.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Repayment starts:</span>
                        <span className="text-foreground font-medium">£{FUNDING_RATES_2025.advancedLearnerLoan.repaymentThreshold.toLocaleString()}+ salary</span>
                      </div>
                    </div>
                  </div>
                </div>

                {result.monthlyRepayment > 0 && (
                  <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-elec-yellow" />
                      <h4 className="font-semibold text-foreground">Repayment Information</h4>
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      Monthly loan repayments of <strong>£{result.monthlyRepayment.toFixed(0)}</strong> will start automatically when your salary exceeds £{FUNDING_RATES_2025.advancedLearnerLoan.repaymentThreshold.toLocaleString()} per year.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Repayments are calculated at 9% of income above the threshold and collected through PAYE.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-lg font-semibold text-foreground">Comprehensive Funding Sources</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {result.fundingSources.map((source, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <h4 className="font-semibold text-foreground">{source.name}</h4>
                      <Badge variant={
                        source.type === 'grant' ? 'default' : 
                        source.type === 'loan' ? 'secondary' :
                        source.type === 'employer' ? 'outline' : 'destructive'
                      } className="self-start">
                        {source.type}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-elec-yellow mb-3">
                      £{source.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {source.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Eligibility:</strong> {source.eligibility}
                      </p>
                      {source.deadline && (
                        <p className="text-xs text-orange-600">
                          <Clock className="inline h-3 w-3 mr-1" />
                          <strong>Deadline:</strong> {source.deadline}
                        </p>
                      )}
                      {source.applicationUrl && (
                        <Button variant="outline" size="sm" className="w-full mt-3 border-elec-yellow/50 hover:bg-elec-yellow hover:text-background">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <a href={source.applicationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Apply Now
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Funding Sources */}
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-foreground">Additional Funding Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Construction Skills Fund</h4>
                    <p className="text-sm text-muted-foreground mb-2">Up to £2,000 for electrical qualifications</p>
                    <p className="text-xs text-muted-foreground">Available for construction workers</p>
                  </div>
                  <div className="p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Energy & Utility Skills</h4>
                    <p className="text-sm text-muted-foreground mb-2">Industry-specific funding available</p>
                    <p className="text-xs text-muted-foreground">For renewable energy courses</p>
                  </div>
                  <div className="p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Regional Development Grants</h4>
                    <p className="text-sm text-muted-foreground mb-2">Location-based funding support</p>
                    <p className="text-xs text-muted-foreground">Varies by region and priority skills</p>
                  </div>
                  <div className="p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Tax Relief Options</h4>
                    <p className="text-sm text-muted-foreground mb-2">Corporation Tax relief available</p>
                    <p className="text-xs text-muted-foreground">For business-related training</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-foreground">Comprehensive Funding Timeline</CardTitle>
                <p className="text-sm text-muted-foreground">Your step-by-step guide to securing education funding</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Pre-Application Phase */}
                  <div className="flex items-start gap-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Pre-Application Phase</h4>
                      <p className="text-sm text-foreground mb-2">Research and prepare your applications</p>
                      <p className="text-xs text-foreground">Timeline: 4-6 weeks before course start</p>
                      <ul className="mt-2 space-y-1 text-xs text-foreground">
                        <li>• Research course providers and costs</li>
                        <li>• Check eligibility criteria for funding sources</li>
                        <li>• Gather required documentation</li>
                        <li>• Speak with employer about support options</li>
                      </ul>
                    </div>
                  </div>

                  {/* Application Phase */}
                  <div className="flex items-start gap-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Application Phase</h4>
                      <p className="text-sm text-foreground mb-2">Submit applications for funding</p>
                      <p className="text-xs text-foreground">Timeline: 2-4 weeks</p>
                      <ul className="mt-2 space-y-1 text-xs text-foreground">
                        <li>• Submit Student Finance application online</li>
                        <li>• Apply for Skills Bank funding if eligible</li>
                        <li>• Contact professional bodies for grants</li>
                        <li>• Finalise employer contribution agreements</li>
                      </ul>
                    </div>
                  </div>

                  {/* Approval Phase */}
                  <div className="flex items-start gap-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Approval & Enrollment</h4>
                      <p className="text-sm text-foreground mb-2">Receive funding decisions and enroll</p>
                      <p className="text-xs text-foreground">Timeline: 1-3 weeks</p>
                      <ul className="mt-2 space-y-1 text-xs text-foreground">
                        <li>• Receive funding approval notifications</li>
                        <li>• Complete course enrollment</li>
                        <li>• Set up payment schedules</li>
                        <li>• Confirm all funding arrangements</li>
                      </ul>
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div className="flex items-start gap-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">During Course</h4>
                      <p className="text-sm text-foreground mb-2">Maintain funding and track progress</p>
                      <p className="text-xs text-foreground">Timeline: Course duration</p>
                      <ul className="mt-2 space-y-1 text-xs text-foreground">
                        <li>• Monitor payment schedules</li>
                        <li>• Maintain academic progress requirements</li>
                        <li>• Keep employer informed of progress</li>
                        <li>• Plan for completion and career advancement</li>
                      </ul>
                    </div>
                  </div>

                  {/* Post-Completion */}
                  <div className="flex items-start gap-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Post-Completion</h4>
                      <p className="text-sm text-foreground mb-2">Transition to repayment and career advancement</p>
                      <p className="text-xs text-foreground">Timeline: After graduation</p>
                      <ul className="mt-2 space-y-1 text-xs text-foreground">
                        <li>• Begin loan repayments (if applicable)</li>
                        <li>• Update professional registrations</li>
                        <li>• Pursue career advancement opportunities</li>
                        <li>• Consider additional qualifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Personalised Action Plan</CardTitle>
                <p className="text-sm text-muted-foreground">Tailored next steps based on your funding analysis</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Immediate Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-elec-yellow" />
                    Immediate Actions (Next 7 Days)
                  </h4>
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                      <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>

                {/* Key Contacts */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Phone className="h-5 w-5 text-elec-yellow" />
                    Key Contacts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                      <h5 className="font-semibold text-foreground mb-2">Student Finance England</h5>
                      <p className="text-sm text-foreground mb-1">Phone: 0300 100 0607</p>
                      <p className="text-xs text-muted-foreground">For loan and grant applications</p>
                    </div>
                    <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                      <h5 className="font-semibold text-foreground mb-2">Skills Bank Team</h5>
                      <p className="text-sm text-foreground mb-1">Email: skillsbank@education.gov.uk</p>
                      <p className="text-xs text-muted-foreground">For professional qualification funding</p>
                    </div>
                    <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                      <h5 className="font-semibold text-foreground mb-2">IET Education Support</h5>
                      <p className="text-sm text-foreground mb-1">Phone: 01438 313311</p>
                      <p className="text-xs text-muted-foreground">For electrical engineering funding</p>
                    </div>
                    <div className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                      <h5 className="font-semibold text-foreground mb-2">Local Skills Hub</h5>
                      <p className="text-sm text-foreground mb-1">Search: gov.uk/guidance/local-skills-improvement-plans</p>
                      <p className="text-xs text-muted-foreground">For regional funding opportunities</p>
                    </div>
                  </div>
                </div>

                {/* Document Templates */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Document Templates
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start border-elec-yellow/20 hover:bg-elec-yellow hover:text-background">
                      <h5 className="font-semibold mb-1">Employer Request Letter</h5>
                      <p className="text-xs opacity-80">Template for requesting employer funding</p>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start border-elec-yellow/20 hover:bg-elec-yellow hover:text-background">
                      <h5 className="font-semibold mb-1">ROI Calculation</h5>
                      <p className="text-xs opacity-80">Show business benefits to employers</p>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start border-elec-yellow/20 hover:bg-elec-yellow hover:text-background">
                      <h5 className="font-semibold mb-1">Personal Statement</h5>
                      <p className="text-xs opacity-80">For funding applications</p>
                    </Button>
                  </div>
                </div>

                {/* ROI Calculator */}
                <div className="p-6 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    Return on Investment Analysis
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-elec-yellow">£{((parseFloat(inputs.currentSalary) || 0) * 0.15).toLocaleString()}</p>
                      <p className="text-sm text-foreground">Potential salary increase</p>
                      <p className="text-xs text-muted-foreground">15% average for qualified electricians</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-elec-yellow">{Math.round((parseFloat(inputs.courseCost) || 0) / (((parseFloat(inputs.currentSalary) || 0) * 0.15) || 1))} months</p>
                      <p className="text-sm text-foreground">Payback period</p>
                      <p className="text-xs text-muted-foreground">Time to recover investment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-elec-yellow">£{(((parseFloat(inputs.currentSalary) || 0) * 0.15) * 10 - (parseFloat(inputs.courseCost) || 0)).toLocaleString()}</p>
                      <p className="text-sm text-foreground">10-year net gain</p>
                      <p className="text-xs text-muted-foreground">Total career value increase</p>
                    </div>
                  </div>
                </div>

                {result.taxBenefits > 0 && (
                  <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-elec-yellow" />
                      <h4 className="font-semibold text-foreground">Tax Benefits Available</h4>
                    </div>
                    <p className="text-sm text-foreground">
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