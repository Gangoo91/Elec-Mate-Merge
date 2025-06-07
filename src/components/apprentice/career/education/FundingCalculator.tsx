
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, PoundSterling, TrendingUp, Info, CheckCircle } from "lucide-react";

interface FundingCalculation {
  totalCost: number;
  upfrontCost: number;
  monthlyRepayment: number;
  totalRepayment: number;
  fundingType: string;
  eligibleSupport: string[];
  paybackPeriod: number;
}

const FundingCalculator = () => {
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [courseCost, setCourseCost] = useState<string>("");
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [calculation, setCalculation] = useState<FundingCalculation | null>(null);

  const calculateFunding = () => {
    const cost = parseFloat(courseCost) || 0;
    const salary = parseFloat(currentSalary) || 0;
    const ageNum = parseInt(age) || 0;

    let fundingType = "";
    let upfrontCost = cost;
    let monthlyRepayment = 0;
    let totalRepayment = cost;
    let eligibleSupport: string[] = [];
    let paybackPeriod = 0;

    // Determine funding type based on course level and circumstances
    if (courseLevel === "Level 4" || courseLevel === "Level 5") {
      if (ageNum >= 19) {
        fundingType = "Advanced Learner Loan";
        upfrontCost = 0;
        // Repayment starts at £25,000 salary, 9% above threshold
        if (salary > 25000) {
          monthlyRepayment = ((salary - 25000) * 0.09) / 12;
          paybackPeriod = cost / (monthlyRepayment * 12);
        }
        totalRepayment = cost * 1.02; // Assuming 2% interest
        eligibleSupport.push("No upfront fees", "Income-contingent repayment");
      }
    } else if (courseLevel === "Level 6" || courseLevel === "Level 7") {
      if (courseLevel === "Level 6") {
        fundingType = "Student Finance";
        eligibleSupport.push("Tuition fee loan up to £9,250", "Maintenance loan available");
      } else {
        fundingType = "Postgraduate Loan";
        eligibleSupport.push("Loan up to £12,167", "6% interest rate");
      }
      upfrontCost = 0;
      if (salary > 27295) {
        monthlyRepayment = ((salary - 27295) * 0.09) / 12;
        paybackPeriod = cost / (monthlyRepayment * 12);
      }
    } else if (courseLevel === "Level 3") {
      fundingType = "Professional Certification";
      if (employmentStatus === "employed") {
        eligibleSupport.push("Employer funding possible", "Skills Bank funding");
        upfrontCost = cost * 0.5; // Assuming 50% employer contribution
      }
    }

    // Add universal support options
    if (ageNum >= 19) {
      eligibleSupport.push("Career Development Loan");
    }
    if (employmentStatus === "employed") {
      eligibleSupport.push("Apprenticeship Levy", "Professional Development Fund");
    }

    setCalculation({
      totalCost: cost,
      upfrontCost,
      monthlyRepayment,
      totalRepayment,
      fundingType,
      eligibleSupport,
      paybackPeriod
    });
  };

  const resetCalculator = () => {
    setCourseLevel("");
    setCourseCost("");
    setCurrentSalary("");
    setEmploymentStatus("");
    setAge("");
    setCalculation(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          Interactive Funding Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your education funding options and repayment estimates
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="courseLevel">Course Level</Label>
            <Select value={courseLevel} onValueChange={setCourseLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Level 3">Level 3 (Professional Cert)</SelectItem>
                <SelectItem value="Level 4">Level 4 (HNC)</SelectItem>
                <SelectItem value="Level 5">Level 5 (HND/Foundation)</SelectItem>
                <SelectItem value="Level 6">Level 6 (Bachelor's)</SelectItem>
                <SelectItem value="Level 7">Level 7 (Master's)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCost">Course Cost (£)</Label>
            <Input
              id="courseCost"
              type="number"
              placeholder="e.g. 9250"
              value={courseCost}
              onChange={(e) => setCourseCost(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSalary">Current Annual Salary (£)</Label>
            <Input
              id="currentSalary"
              type="number"
              placeholder="e.g. 30000"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g. 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={calculateFunding}
            className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            disabled={!courseLevel || !courseCost || !currentSalary || !age || !employmentStatus}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Funding
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            Reset
          </Button>
        </div>

        {/* Results */}
        {calculation && (
          <div className="space-y-4 pt-4 border-t border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow">Your Funding Options</h3>
            
            {/* Main Funding Type */}
            <Card className="border-elec-yellow/10 bg-elec-dark/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Recommended Funding</h4>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                    {calculation.fundingType}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Cost</div>
                    <div className="font-semibold text-white">£{calculation.totalCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Upfront Cost</div>
                    <div className="font-semibold text-white">£{calculation.upfrontCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Monthly Repayment</div>
                    <div className="font-semibold text-white">
                      £{calculation.monthlyRepayment.toFixed(0)}/month
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Payback Period</div>
                    <div className="font-semibold text-white">
                      {calculation.paybackPeriod > 0 ? `${calculation.paybackPeriod.toFixed(1)} years` : "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligible Support */}
            <div>
              <h4 className="font-medium mb-3 text-amber-400">You May Be Eligible For:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {calculation.eligibleSupport.map((support, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{support}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <Card className="bg-elec-yellow/5 border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-2">
                      <strong>Important:</strong> This calculator provides estimates based on current UK funding rules. 
                      Actual amounts may vary depending on your specific circumstances.
                    </p>
                    <p>
                      For detailed advice, contact Student Finance England or speak to your chosen education provider's 
                      finance team. Some employers offer additional support not reflected in these calculations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundingCalculator;
