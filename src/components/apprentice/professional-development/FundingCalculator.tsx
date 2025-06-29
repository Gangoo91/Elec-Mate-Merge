
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling, Info } from "lucide-react";

interface FundingCalculation {
  totalCost: number;
  advancedLearnerLoan: number;
  employerContribution: number;
  personalContribution: number;
  monthlyPayment: number;
  repaymentThreshold: number;
}

const FundingCalculator = () => {
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [courseCost, setCourseCost] = useState<string>("");
  const [employerSupport, setEmployerSupport] = useState<string>("");
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [calculation, setCalculation] = useState<FundingCalculation | null>(null);

  const calculateFunding = () => {
    const cost = parseFloat(courseCost) || 0;
    const salary = parseFloat(currentSalary) || 0;
    const employerContrib = parseFloat(employerSupport) || 0;

    let loanEligible = false;
    if (courseLevel === "level4" || courseLevel === "level5" || courseLevel === "level6") {
      loanEligible = true;
    }

    const advancedLearnerLoan = loanEligible ? Math.max(0, cost - employerContrib) : 0;
    const personalContribution = loanEligible ? 0 : Math.max(0, cost - employerContrib);
    
    // Estimate monthly repayment (9% of income over £25,000)
    const monthlyPayment = salary > 25000 ? ((salary - 25000) * 0.09) / 12 : 0;

    const result: FundingCalculation = {
      totalCost: cost,
      advancedLearnerLoan,
      employerContribution: employerContrib,
      personalContribution,
      monthlyPayment,
      repaymentThreshold: 25000
    };

    setCalculation(result);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Education Funding Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseLevel">Course Level</Label>
              <Select value={courseLevel} onValueChange={setCourseLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level3">Level 3 (A-Level equivalent)</SelectItem>
                  <SelectItem value="level4">Level 4 (HNC)</SelectItem>
                  <SelectItem value="level5">Level 5 (HND)</SelectItem>
                  <SelectItem value="level6">Level 6 (Bachelor's)</SelectItem>
                  <SelectItem value="level7">Level 7 (Master's)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCost">Course Cost (£)</Label>
              <Input
                id="courseCost"
                type="number"
                placeholder="e.g., 6000"
                value={courseCost}
                onChange={(e) => setCourseCost(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employerSupport">Employer Contribution (£)</Label>
              <Input
                id="employerSupport"
                type="number"
                placeholder="e.g., 2000"
                value={employerSupport}
                onChange={(e) => setEmployerSupport(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Annual Salary (£)</Label>
              <Input
                id="currentSalary"
                type="number"
                placeholder="e.g., 28000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateFunding} className="w-full">
            Calculate Funding Options
          </Button>
        </CardContent>
      </Card>

      {calculation && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <PoundSterling className="h-5 w-5" />
              Your Funding Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Course Cost:</span>
                  <span className="font-semibold">£{calculation.totalCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Employer Contribution:</span>
                  <span className="font-semibold text-green-400">£{calculation.employerContribution.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Advanced Learner Loan:</span>
                  <span className="font-semibold text-blue-400">£{calculation.advancedLearnerLoan.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Personal Contribution:</span>
                  <span className="font-semibold text-orange-400">£{calculation.personalContribution.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 border-l border-elec-yellow/20 pl-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Repayment Threshold:</span>
                  <span className="font-semibold">£{calculation.repaymentThreshold.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated Monthly Repayment:</span>
                  <span className="font-semibold">£{Math.round(calculation.monthlyPayment).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark/30 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="text-blue-400 font-medium">Important Notes:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Advanced Learner Loans are available for Level 3-6 qualifications</li>
                    <li>You only repay when earning over £25,000 per year</li>
                    <li>Repayments are 9% of income above the threshold</li>
                    <li>Speak to your employer about potential funding support</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FundingCalculator;
