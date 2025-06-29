
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, PoundSterling, Info, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FundingCalculator = () => {
  const [courseType, setCourseType] = useState<string>("");
  const [courseCost, setCourseCost] = useState<string>("");
  const [currentIncome, setCurrentIncome] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [studyMode, setStudyMode] = useState<string>("");
  const [result, setResult] = useState<{
    totalCost: number;
    availableFunding: Array<{
      name: string;
      amount: number | string;
      description: string;
      eligibility: string;
    }>;
    outOfPocketCost: number;
    monthlyRepayment?: number;
    roi: {
      salaryIncrease: number;
      paybackPeriod: string;
    };
  } | null>(null);

  const calculateFunding = () => {
    const cost = parseFloat(courseCost) || 0;
    const income = parseFloat(currentIncome) || 0;
    
    const funding = [];
    let totalFundingAvailable = 0;

    // Advanced Learner Loan (Level 4-6)
    if (["hnc", "hnd", "degree"].includes(courseType)) {
      funding.push({
        name: "Advanced Learner Loan",
        amount: cost,
        description: "Covers full course fees. Repay only when earning £25,000+",
        eligibility: "UK resident, studying Level 4-6 qualification"
      });
      totalFundingAvailable += cost;
    }

    // Employer Funding
    if (employmentStatus === "employed") {
      const employerContribution = Math.min(cost * 0.7, 3000);
      funding.push({
        name: "Employer Funding",
        amount: employerContribution,
        description: "Many employers fund job-related training",
        eligibility: "Discuss with your employer or HR department"
      });
      totalFundingAvailable += employerContribution;
    }

    // Skills Development Funding
    if (["renewable", "ev", "smart-home"].includes(courseType)) {
      funding.push({
        name: "Skills Development Grant",
        amount: "Up to £1,000",
        description: "Government funding for emerging technology skills",
        eligibility: "Qualified electricians in England"
      });
      totalFundingAvailable += 1000;
    }

    // Professional Body Grants
    funding.push({
      name: "IET Education Grant",
      amount: "£500 - £2,000",
      description: "Institution of Engineering and Technology support",
      eligibility: "IET members studying engineering qualifications"
    });

    const outOfPocket = Math.max(0, cost - totalFundingAvailable);
    const monthlyRepayment = income > 25000 ? (cost * 0.09 * (income - 25000)) / (12 * 100) : 0;

    // ROI Calculation
    const salaryIncrease = courseType === "hnc" ? 4000 : 
                          courseType === "hnd" ? 6500 : 
                          courseType === "degree" ? 9500 : 3000;
    
    const paybackPeriod = cost > 0 ? (cost / salaryIncrease).toFixed(1) : "0";

    setResult({
      totalCost: cost,
      availableFunding: funding,
      outOfPocketCost: outOfPocket,
      monthlyRepayment: monthlyRepayment,
      roi: {
        salaryIncrease,
        paybackPeriod: `${paybackPeriod} years`
      }
    });
  };

  const reset = () => {
    setCourseType("");
    setCourseCost("");
    setCurrentIncome("");
    setEmploymentStatus("");
    setStudyMode("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Education Funding Calculator</h3>
        <p className="text-muted-foreground">
          Calculate your funding options and understand the financial commitment of further education
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Course & Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="course-type">Course Type</Label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="hnc">HNC Electrical Engineering</SelectItem>
                  <SelectItem value="hnd">HND Electrical Engineering</SelectItem>
                  <SelectItem value="degree">Degree Top-Up</SelectItem>
                  <SelectItem value="renewable">Renewable Energy Course</SelectItem>
                  <SelectItem value="ev">EV Charging Course</SelectItem>
                  <SelectItem value="smart-home">Smart Home Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="course-cost">Course Cost (£)</Label>
              <Input
                id="course-cost"
                type="number"
                value={courseCost}
                onChange={(e) => setCourseCost(e.target.value)}
                placeholder="e.g., 6000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="current-income">Current Annual Income (£)</Label>
              <Input
                id="current-income"
                type="number"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
                placeholder="e.g., 32000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="employment-status">Employment Status</Label>
              <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="study-mode">Preferred Study Mode</Label>
              <Select value={studyMode} onValueChange={setStudyMode}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select study mode" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="distance">Distance Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateFunding} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Funding
              </Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Funding Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-elec-yellow">
                    £{result.totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Course Cost</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Available Funding Options:</h4>
                  {result.availableFunding.map((funding, idx) => (
                    <div key={idx} className="bg-elec-dark/50 p-3 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{funding.name}</div>
                        <Badge variant="default">
                          {typeof funding.amount === 'number' ? `£${funding.amount.toLocaleString()}` : funding.amount}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {funding.description}
                      </div>
                      <div className="text-xs text-elec-yellow">
                        {funding.eligibility}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Out of pocket:</div>
                    <div className="font-bold text-lg">£{result.outOfPocketCost.toLocaleString()}</div>
                  </div>
                  {result.monthlyRepayment > 0 && (
                    <div>
                      <div className="text-muted-foreground">Monthly repayment:</div>
                      <div className="font-bold text-lg">£{result.monthlyRepayment.toFixed(0)}</div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="bg-green-900/20 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="font-semibold text-green-400">Return on Investment</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Expected salary increase: <span className="font-bold">£{result.roi.salaryIncrease.toLocaleString()}/year</span></div>
                    <div>Payback period: <span className="font-bold">{result.roi.paybackPeriod}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Enter your details to see funding options
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert className="border-blue-500/20 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          <strong>Important:</strong> Funding eligibility varies by individual circumstances. Always check with official sources 
          and course providers for the most current information. This calculator provides estimates based on typical scenarios.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FundingCalculator;
