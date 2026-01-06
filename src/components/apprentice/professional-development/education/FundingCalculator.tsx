
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, PoundSterling, Info, TrendingUp, RotateCcw, CheckCircle } from "lucide-react";
import { useState } from "react";

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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
            <Calculator className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Education Funding Calculator</h3>
            <p className="text-sm text-white/70">
              Calculate your funding options and understand the financial commitment of further education
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Section */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Calculator className="h-5 w-5 text-elec-yellow" />
              </div>
              Course & Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div>
              <Label htmlFor="course-type" className="text-white/80">Course Type</Label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-11 mt-1.5">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/20">
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
              <Label htmlFor="course-cost" className="text-white/80">Course Cost (£)</Label>
              <Input
                id="course-cost"
                type="number"
                value={courseCost}
                onChange={(e) => setCourseCost(e.target.value)}
                placeholder="e.g., 6000"
                className="bg-white/5 border-white/20 text-white h-11 mt-1.5 placeholder:text-white/40"
              />
            </div>

            <div>
              <Label htmlFor="current-income" className="text-white/80">Current Annual Income (£)</Label>
              <Input
                id="current-income"
                type="number"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
                placeholder="e.g., 32000"
                className="bg-white/5 border-white/20 text-white h-11 mt-1.5 placeholder:text-white/40"
              />
            </div>

            <div>
              <Label htmlFor="employment-status" className="text-white/80">Employment Status</Label>
              <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-11 mt-1.5">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/20">
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="study-mode" className="text-white/80">Preferred Study Mode</Label>
              <Select value={studyMode} onValueChange={setStudyMode}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-11 mt-1.5">
                  <SelectValue placeholder="Select study mode" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/20">
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="distance">Distance Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={calculateFunding}
                className="flex-1 h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Funding
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="h-11 border-white/20 hover:border-white/40 touch-manipulation active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <PoundSterling className="h-5 w-5 text-green-400" />
              </div>
              Funding Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {result ? (
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <div className="text-3xl font-bold text-elec-yellow">
                    £{result.totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Total Course Cost</div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Available Funding Options
                  </h4>
                  {result.availableFunding.map((funding, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-white">{funding.name}</div>
                        <Badge className="bg-green-500/10 text-green-400 border border-green-500/30">
                          {typeof funding.amount === 'number' ? `£${funding.amount.toLocaleString()}` : funding.amount}
                        </Badge>
                      </div>
                      <div className="text-xs text-white/60 mb-1">
                        {funding.description}
                      </div>
                      <div className="text-xs text-elec-yellow">
                        {funding.eligibility}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-white/10" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <div className="text-xs text-white/60 mb-1">Out of pocket</div>
                    <div className="font-bold text-xl text-blue-400">£{result.outOfPocketCost.toLocaleString()}</div>
                  </div>
                  {result.monthlyRepayment !== undefined && result.monthlyRepayment > 0 && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <div className="text-xs text-white/60 mb-1">Monthly repayment</div>
                      <div className="font-bold text-xl text-purple-400">£{result.monthlyRepayment.toFixed(0)}</div>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="font-semibold text-green-400">Return on Investment</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-white/60 text-xs">Expected salary increase</div>
                      <div className="font-bold text-white">£{result.roi.salaryIncrease.toLocaleString()}/year</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Payback period</div>
                      <div className="font-bold text-white">{result.roi.paybackPeriod}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="p-4 rounded-full bg-white/5 mb-4">
                  <Calculator className="h-8 w-8 text-white/30" />
                </div>
                <p className="text-white/50 text-sm">
                  Enter your details to see<br />funding options and ROI
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Important Note */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">Important</p>
            <p className="text-sm text-white/70">
              Funding eligibility varies by individual circumstances. Always check with official sources
              and course providers for the most current information. This calculator provides estimates based on typical scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingCalculator;
