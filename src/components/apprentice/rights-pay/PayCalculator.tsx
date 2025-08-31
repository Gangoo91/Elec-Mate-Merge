
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling } from "lucide-react";
import { useState } from "react";

const PayCalculator = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("37.5");
  const [hourlyRate, setHourlyRate] = useState<string>("7.55");
  const [apprenticeYear, setApprenticeYear] = useState<string>("first");
  const [region, setRegion] = useState<string>("standard");
  const [hasStudentLoan, setHasStudentLoan] = useState<boolean>(false);
  const [pensionContribution, setPensionContribution] = useState<string>("3");
  const [results, setResults] = useState<any>(null);

  const calculateTax = (annualGross: number) => {
    // 2025 UK tax thresholds
    const personalAllowance = 12570;
    const basicRateThreshold = 50270;
    const higherRateThreshold = 125140;
    
    let incomeTax = 0;
    let nationalInsurance = 0;
    
    // Income Tax calculation
    if (annualGross > personalAllowance) {
      const taxableIncome = annualGross - personalAllowance;
      if (taxableIncome <= basicRateThreshold - personalAllowance) {
        incomeTax = taxableIncome * 0.20; // 20% basic rate
      } else {
        incomeTax = (basicRateThreshold - personalAllowance) * 0.20 + 
                   (taxableIncome - (basicRateThreshold - personalAllowance)) * 0.40; // 40% higher rate
      }
    }
    
    // National Insurance calculation (12% on earnings £12,570 - £50,270)
    if (annualGross > 12570) {
      const niableIncome = Math.min(annualGross - 12570, 50270 - 12570);
      nationalInsurance = niableIncome * 0.12;
    }
    
    // Student loan calculation (Plan 2: 9% on earnings over £27,295)
    let studentLoan = 0;
    if (hasStudentLoan && annualGross > 27295) {
      studentLoan = (annualGross - 27295) * 0.09;
    }
    
    // Pension contribution
    const pensionAmount = annualGross * (parseFloat(pensionContribution) / 100);
    
    return { incomeTax, nationalInsurance, studentLoan, pensionAmount };
  };

  const calculatePay = () => {
    const hours = parseFloat(hoursPerWeek);
    let rate = parseFloat(hourlyRate);
    
    // Apply regional multiplier
    const regionalMultipliers: { [key: string]: number } = {
      london: 1.25,
      southeast: 1.15,
      standard: 1.0,
      wales: 0.95,
      ni: 0.95
    };
    
    rate *= regionalMultipliers[region] || 1.0;
    
    const weeklyGross = hours * rate;
    const monthlyGross = weeklyGross * 4.33;
    const annualGross = weeklyGross * 52;
    
    // Calculate tax deductions
    const { incomeTax, nationalInsurance, studentLoan, pensionAmount } = calculateTax(annualGross);
    
    // Calculate net pay
    const totalDeductions = incomeTax + nationalInsurance + studentLoan + pensionAmount;
    const annualNet = annualGross - totalDeductions;
    const monthlyNet = annualNet / 12;
    const weeklyNet = annualNet / 52;
    
    // Calculate overtime potential (5 hours overtime per week at 1.5x rate)
    const overtimeHours = 5;
    const overtimeRate = rate * 1.5;
    const weeklyOvertimeGross = overtimeHours * overtimeRate;
    const annualOvertimeGross = weeklyOvertimeGross * 52;
    const overtimeTax = calculateTax(annualGross + annualOvertimeGross);
    const overtimeTotalDeductions = overtimeTax.incomeTax + overtimeTax.nationalInsurance + overtimeTax.studentLoan + overtimeTax.pensionAmount;
    const annualNetWithOvertime = (annualGross + annualOvertimeGross) - overtimeTotalDeductions;
    const monthlyNetWithOvertime = annualNetWithOvertime / 12;
    
    setResults({
      hourlyRate: rate.toFixed(2),
      weeklyGross: weeklyGross.toFixed(2),
      monthlyGross: monthlyGross.toFixed(2),
      annualGross: annualGross.toFixed(2),
      weeklyNet: weeklyNet.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      annualNet: annualNet.toFixed(2),
      monthlyNetWithOvertime: monthlyNetWithOvertime.toFixed(2),
      incomeTax: (incomeTax / 12).toFixed(2),
      nationalInsurance: (nationalInsurance / 12).toFixed(2),
      studentLoan: (studentLoan / 12).toFixed(2),
      pension: (pensionAmount / 12).toFixed(2),
      totalDeductions: (totalDeductions / 12).toFixed(2)
    });
  };

  const getMinimumWageForYear = (year: string) => {
    switch (year) {
      case "first": return "7.55";
      case "second": return "12.21";
      case "qualified": return "14.00";
      default: return "7.55";
    }
  };

  const handleYearChange = (year: string) => {
    setApprenticeYear(year);
    setHourlyRate(getMinimumWageForYear(year));
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Interactive Pay Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="apprentice-year">Apprenticeship Stage</Label>
              <Select value={apprenticeYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Year (Under 19)</SelectItem>
                  <SelectItem value="second">Year 2+ (Over 19)</SelectItem>
                  <SelectItem value="qualified">Newly Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="london">London (+25%)</SelectItem>
                  <SelectItem value="southeast">South East (+15%)</SelectItem>
                  <SelectItem value="standard">Standard Rate</SelectItem>
                  <SelectItem value="wales">Wales (-5%)</SelectItem>
                  <SelectItem value="ni">Northern Ireland (-5%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="hourly-rate">Hourly Rate (£)</Label>
              <Input
                id="hourly-rate"
                type="number"
                step="0.01"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="hours-per-week">Hours per Week</Label>
              <Input
                id="hours-per-week"
                type="number"
                step="0.5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="pension">Pension Contribution (%)</Label>
              <Input
                id="pension"
                type="number"
                step="0.1"
                min="0"
                max="40"
                value={pensionContribution}
                onChange={(e) => setPensionContribution(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="student-loan"
                checked={hasStudentLoan}
                onChange={(e) => setHasStudentLoan(e.target.checked)}
                className="w-4 h-4 text-elec-yellow bg-gray-100 border-gray-300 rounded focus:ring-elec-yellow"
              />
              <Label htmlFor="student-loan" className="text-sm">
                I have a student loan (Plan 2)
              </Label>
            </div>
            
            <Button onClick={calculatePay} className="w-full">
              Calculate Take-Home Pay
            </Button>
          </div>
          
          {results && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white mb-3">Your Pay Breakdown</h4>
              
              {/* Gross Pay Section */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-elec-yellow mb-2">Gross Pay (Before Tax)</h5>
                
                <div className="flex justify-between items-center p-2 bg-elec-yellow/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Hourly Rate:</span>
                  <span className="font-bold text-elec-yellow text-sm">£{results.hourlyRate}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-blue-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Monthly Gross:</span>
                  <span className="font-bold text-blue-400 text-sm">£{results.monthlyGross}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-purple-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Annual Gross:</span>
                  <span className="font-bold text-purple-400 text-sm">£{results.annualGross}</span>
                </div>
              </div>
              
              {/* Tax Deductions Section */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-red-400 mb-2">Monthly Deductions</h5>
                
                <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Income Tax:</span>
                  <span className="font-medium text-red-400 text-sm">-£{results.incomeTax}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">National Insurance:</span>
                  <span className="font-medium text-red-400 text-sm">-£{results.nationalInsurance}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Pension ({pensionContribution}%):</span>
                  <span className="font-medium text-red-400 text-sm">-£{results.pension}</span>
                </div>
                
                {hasStudentLoan && (
                  <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg">
                    <span className="text-xs text-muted-foreground">Student Loan:</span>
                    <span className="font-medium text-red-400 text-sm">-£{results.studentLoan}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                  <span className="text-xs font-medium text-red-300">Total Deductions:</span>
                  <span className="font-bold text-red-300 text-sm">-£{results.totalDeductions}</span>
                </div>
              </div>
              
              {/* Net Pay Section */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-green-400 mb-2">Take-Home Pay (After Tax)</h5>
                
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm font-medium text-green-300">Monthly Net Pay:</span>
                  <span className="font-bold text-green-400 text-lg">£{results.monthlyNet}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">Weekly Net Pay:</span>
                  <span className="font-medium text-green-400 text-sm">£{results.weeklyNet}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <span className="text-xs text-orange-400">With Overtime (Net):</span>
                  <span className="font-bold text-orange-400 text-sm">£{results.monthlyNetWithOvertime}/month</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-3 space-y-1">
                <p>* Tax calculations based on 2025 UK rates</p>
                <p>* Overtime assumes 5 hours/week at time-and-a-half rate</p>
                <p>* Student loan deduction applies to Plan 2 (earnings over £27,295)</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayCalculator;
