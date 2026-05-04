import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const PayCalculator = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('37.5');
  const [hourlyRate, setHourlyRate] = useState<string>('7.55');
  const [apprenticeYear, setApprenticeYear] = useState<string>('first');
  const [hasStudentLoan, setHasStudentLoan] = useState<boolean>(false);
  const [pensionContribution, setPensionContribution] = useState<string>('3');
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
        incomeTax = taxableIncome * 0.2; // 20% basic rate
      } else {
        incomeTax =
          (basicRateThreshold - personalAllowance) * 0.2 +
          (taxableIncome - (basicRateThreshold - personalAllowance)) * 0.4; // 40% higher rate
      }
    }

    // National Insurance calculation (8% on earnings £12,570 - £50,270, 2% above)
    if (annualGross > 12570) {
      const niableIncome = Math.min(annualGross - 12570, 50270 - 12570);
      nationalInsurance = niableIncome * 0.08;
      if (annualGross > 50270) {
        nationalInsurance += (annualGross - 50270) * 0.02;
      }
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
    const rate = parseFloat(hourlyRate);

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
    const overtimeTotalDeductions =
      overtimeTax.incomeTax +
      overtimeTax.nationalInsurance +
      overtimeTax.studentLoan +
      overtimeTax.pensionAmount;
    const annualNetWithOvertime = annualGross + annualOvertimeGross - overtimeTotalDeductions;
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
      totalDeductions: (totalDeductions / 12).toFixed(2),
    });
  };

  const getMinimumWageForYear = (year: string) => {
    switch (year) {
      case 'first':
        return '7.55';
      case 'second':
        return '12.21';
      case 'qualified':
        return '15.00';
      default:
        return '7.55';
    }
  };

  const handleYearChange = (year: string) => {
    setApprenticeYear(year);
    setHourlyRate(getMinimumWageForYear(year));
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Pay calculator
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="apprentice-year">Apprenticeship Stage</Label>
              <Select value={apprenticeYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Year 1 / Under 19 (£7.55/hr current)</SelectItem>
                  <SelectItem value="second">Year 2+ aged 21+ (£12.21/hr current)</SelectItem>
                  <SelectItem value="qualified">Newly Qualified</SelectItem>
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
                className="w-4 h-4 text-elec-yellow bg-white/5 border-white/20 rounded focus:ring-elec-yellow"
              />
              <Label htmlFor="student-loan" className="text-sm">
                I have a student loan (Plan 2)
              </Label>
            </div>

            <Button onClick={calculatePay} className="w-full h-11 touch-manipulation">
              Calculate Take-Home Pay
            </Button>
          </div>

          {results && (
            <div className="space-y-4">
              <h4 className="text-[14px] font-semibold text-white">Your pay breakdown</h4>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Gross pay (before tax)
                </span>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Hourly rate</span>
                  <span className="font-mono text-elec-yellow text-[13px]">£{results.hourlyRate}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Monthly gross</span>
                  <span className="font-mono text-white text-[13px]">£{results.monthlyGross}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Annual gross</span>
                  <span className="font-mono text-white text-[13px]">£{results.annualGross}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Monthly deductions
                </span>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Income tax</span>
                  <span className="font-mono text-white/85 text-[13px]">-£{results.incomeTax}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">National Insurance</span>
                  <span className="font-mono text-white/85 text-[13px]">
                    -£{results.nationalInsurance}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Pension ({pensionContribution}%)</span>
                  <span className="font-mono text-white/85 text-[13px]">-£{results.pension}</span>
                </div>

                {hasStudentLoan && (
                  <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                    <span className="text-[13px] text-white/85">Student loan</span>
                    <span className="font-mono text-white/85 text-[13px]">
                      -£{results.studentLoan}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.04]">
                  <span className="text-[13px] font-semibold text-white">Total deductions</span>
                  <span className="font-mono text-white text-[13px] font-semibold">
                    -£{results.totalDeductions}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Take-home pay (after tax)
                </span>

                <div className="flex justify-between items-center p-3 rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04]">
                  <span className="text-[14px] font-semibold text-white">Monthly net pay</span>
                  <span className="font-mono text-elec-yellow text-[18px] font-semibold">
                    £{results.monthlyNet}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">Weekly net pay</span>
                  <span className="font-mono text-white text-[13px]">£{results.weeklyNet}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[13px] text-white/85">With overtime (net)</span>
                  <span className="font-mono text-white text-[13px]">
                    £{results.monthlyNetWithOvertime}/month
                  </span>
                </div>
              </div>

              <div className="text-[12px] text-white/55 leading-relaxed space-y-1">
                <p>
                  Tax and NI based on 2025/26 UK rates (8% employee NI). Wage defaults are current
                  2025/26 minimums.
                </p>
                <p>Overtime assumes 5 hours/week at time-and-a-half rate.</p>
                <p>Student loan deduction applies to Plan 2 (earnings over £27,295).</p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default PayCalculator;
