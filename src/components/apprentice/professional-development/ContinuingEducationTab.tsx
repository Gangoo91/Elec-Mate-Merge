
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Calculator, 
  Info, 
  TrendingUp, 
  PoundSterling, 
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

interface FundingResult {
  eligibleForFunding: boolean;
  fundingAmount: number;
  personalContribution: number;
  totalBenefit: number;
  paybackPeriod: number;
  annualROI: number;
  fundingSource: string;
  recommendations: string[];
}

const ContinuingEducationTab = () => {
  const [courseType, setCourseType] = useState<string>("");
  const [courseCost, setCourseCost] = useState<string>("");
  const [currentIncome, setCurrentIncome] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [studyMode, setStudyMode] = useState<string>("");
  const [result, setResult] = useState<FundingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  const courseTypes = [
    { value: "level-4-hnc", label: "Level 4 HNC Electrical Engineering", typical: 3500 },
    { value: "level-5-hnd", label: "Level 5 HND Electrical Engineering", typical: 4500 },
    { value: "solar-pv", label: "Solar PV Installation", typical: 800 },
    { value: "ev-charging", label: "EV Charging Installation", typical: 600 },
    { value: "heat-pump", label: "Heat Pump Installation", typical: 1200 },
    { value: "smart-home", label: "Smart Home Technology", typical: 900 },
    { value: "inspection-testing", label: "Inspection & Testing", typical: 1500 },
    { value: "pat-testing", label: "PAT Testing", typical: 400 },
    { value: "fire-alarm", label: "Fire Alarm Systems", typical: 1800 },
    { value: "emergency-lighting", label: "Emergency Lighting", typical: 700 },
    { value: "industrial-control", label: "Industrial Control Systems", typical: 2200 },
    { value: "renewable-energy", label: "Renewable Energy Systems", typical: 1600 },
    { value: "custom", label: "Other/Custom Course", typical: 0 }
  ];

  const validateInputs = () => {
    if (!courseType) return "Please select a course type";
    if (!courseCost || parseFloat(courseCost) <= 0) return "Please enter a valid course cost";
    if (!currentIncome || parseFloat(currentIncome) <= 0) return "Please enter your current annual income";
    if (!employmentStatus) return "Please select your employment status";
    return "";
  };

  const calculateFunding = async () => {
    const validation = validateInputs();
    if (validation) {
      setValidationError(validation);
      return;
    }

    setValidationError("");
    setIsCalculating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const cost = parseFloat(courseCost);
      const income = parseFloat(currentIncome);
      
      let fundingAmount = 0;
      let fundingSource = "";
      let eligibleForFunding = false;
      const recommendations: string[] = [];

      // Enhanced funding calculation logic
      if (employmentStatus === "employed") {
        // Apprenticeship Levy or government funding
        if (cost <= 1500) {
          fundingAmount = cost * 0.8; // 80% funding for smaller courses
          fundingSource = "Skills Development Fund";
          eligibleForFunding = true;
        } else if (cost <= 5000) {
          fundingAmount = cost * 0.6; // 60% funding for larger courses
          fundingSource = "Advanced Learner Loan";
          eligibleForFunding = true;
        } else {
          fundingAmount = 3000; // Capped funding
          fundingSource = "Advanced Learner Loan (Partial)";
          eligibleForFunding = true;
        }
        
        if (income < 25000) {
          fundingAmount += cost * 0.1; // Additional 10% for low income
          recommendations.push("You may qualify for additional hardship funding");
        }
      } else if (employmentStatus === "unemployed") {
        // Higher funding for unemployed
        fundingAmount = Math.min(cost * 0.9, 4000);
        fundingSource = "Adult Education Budget";
        eligibleForFunding = true;
        recommendations.push("Contact your local job centre for additional support");
      } else if (employmentStatus === "self-employed") {
        // Self-employed funding options
        if (cost <= 2000) {
          fundingAmount = cost * 0.5;
          fundingSource = "Self-Employment Support Fund";
          eligibleForFunding = true;
        } else {
          fundingAmount = 1000;
          fundingSource = "Tax Relief (estimated)";
          eligibleForFunding = true;
        }
        recommendations.push("Course costs may be tax-deductible as business expenses");
      }

      const personalContribution = Math.max(0, cost - fundingAmount);
      
      // Calculate ROI based on course type and current income
      let expectedSalaryIncrease = 0;
      const selectedCourse = courseTypes.find(c => c.value === courseType);
      
      if (selectedCourse) {
        switch (courseType) {
          case "level-4-hnc":
          case "level-5-hnd":
            expectedSalaryIncrease = income * 0.15; // 15% increase
            break;
          case "solar-pv":
          case "ev-charging":
          case "heat-pump":
            expectedSalaryIncrease = 5000; // Specialist skills premium
            break;
          case "inspection-testing":
            expectedSalaryIncrease = 4000;
            break;
          default:
            expectedSalaryIncrease = 2500;
        }
      }

      const totalBenefit = expectedSalaryIncrease * 5; // 5-year benefit
      const paybackPeriod = personalContribution > 0 ? personalContribution / expectedSalaryIncrease : 0;
      const annualROI = personalContribution > 0 ? (expectedSalaryIncrease / personalContribution) * 100 : 0;

      // Add recommendations based on calculations
      if (paybackPeriod < 1) {
        recommendations.push("Excellent ROI - course pays for itself within a year");
      } else if (paybackPeriod < 2) {
        recommendations.push("Good ROI - reasonable payback period");
      }

      if (annualROI > 100) {
        recommendations.push("Outstanding return on investment");
      }

      setResult({
        eligibleForFunding,
        fundingAmount,
        personalContribution,
        totalBenefit,
        paybackPeriod,
        annualROI,
        fundingSource,
        recommendations
      });

      toast.success("Funding calculation completed successfully!");
    } catch (error) {
      toast.error("Error calculating funding. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCourseTypeChange = (value: string) => {
    setCourseType(value);
    const selectedCourse = courseTypes.find(c => c.value === value);
    if (selectedCourse && selectedCourse.typical > 0) {
      setCourseCost(selectedCourse.typical.toString());
    }
  };

  const resetCalculator = () => {
    setCourseType("");
    setCourseCost("");
    setCurrentIncome("");
    setEmploymentStatus("");
    setStudyMode("");
    setResult(null);
    setValidationError("");
  };

  return (
    <div className="space-y-6">
      {/* Education Options Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Higher Education</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              HNC/HND qualifications for career advancement
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs">Level 4 HNC</span>
                <Badge variant="outline">£3,500</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Level 5 HND</span>
                <Badge variant="outline">£4,500</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Renewable Energy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Future-focused green technology skills
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs">Solar PV</span>
                <Badge variant="outline">£800</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Heat Pumps</span>
                <Badge variant="outline">£1,200</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Specialist Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              High-demand specialist qualifications
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs">EV Charging</span>
                <Badge variant="outline">£600</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Smart Home</span>
                <Badge variant="outline">£900</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Funding Calculator */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Enhanced Funding Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your funding eligibility and return on investment for electrical courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="course-type">Course Type *</Label>
                <Select value={courseType} onValueChange={handleCourseTypeChange}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {courseTypes.map((course) => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="course-cost">Course Cost (£) *</Label>
                <Input
                  id="course-cost"
                  type="number"
                  value={courseCost}
                  onChange={(e) => setCourseCost(e.target.value)}
                  placeholder="e.g., 1500"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="current-income">Current Annual Income (£) *</Label>
                <Input
                  id="current-income"
                  type="number"
                  value={currentIncome}
                  onChange={(e) => setCurrentIncome(e.target.value)}
                  placeholder="e.g., 30000"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="employment-status">Employment Status *</Label>
                <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select employment status" />
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
                    <SelectValue placeholder="Select study mode (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="evening">Evening Classes</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {validationError && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    {validationError}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={calculateFunding} 
                  disabled={isCalculating}
                  className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-elec-dark mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Funding
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
                {result ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {result.eligibleForFunding ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-yellow-500" />
                        )}
                        <h3 className="text-lg font-semibold text-elec-yellow">
                          Funding Analysis
                        </h3>
                      </div>
                      <Badge 
                        variant={result.eligibleForFunding ? "default" : "secondary"}
                        className="mb-4"
                      >
                        {result.eligibleForFunding ? "Funding Available" : "Limited Funding"}
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Funding Amount:</span>
                        <div className="font-mono text-elec-yellow text-lg">
                          £{result.fundingAmount.toFixed(0)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Your Contribution:</span>
                        <div className="font-mono text-elec-yellow text-lg">
                          £{result.personalContribution.toFixed(0)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected ROI:</span>
                        <div className="font-mono text-elec-yellow">
                          {result.annualROI.toFixed(0)}% annually
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payback Period:</span>
                        <div className="font-mono text-elec-yellow">
                          {result.paybackPeriod.toFixed(1)} years
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-muted-foreground text-sm">Funding Source:</span>
                      <div className="text-elec-yellow font-medium">{result.fundingSource}</div>
                    </div>

                    {result.recommendations.length > 0 && (
                      <div className="mt-4">
                        <span className="text-muted-foreground text-sm">Recommendations:</span>
                        <ul className="mt-2 space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-elec-light/80 flex items-start gap-2">
                              <span className="text-elec-yellow mt-1">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Calculator className="h-12 w-12 mx-auto mb-4 text-elec-yellow/50" />
                      <p>Complete the form to calculate your funding options</p>
                      <p className="text-sm mt-2">Fields marked with * are required</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-elec-yellow" />
            Why Continuing Education Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Stay Current</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Technology and regulations evolve rapidly. Continuing education ensures you remain 
                competitive and compliant with the latest industry standards.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Higher Earnings</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Specialist skills command premium rates. Qualified electricians with additional 
                certifications can earn 15-30% more than those without.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Future-Proof Career</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Green energy, smart technology, and EV infrastructure are the future. 
                Investing in these skills now secures your long-term career prospects.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
