import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Users, Calendar, Receipt, Truck, Wrench, Shield, GraduationCap, Target, TrendingUp } from "lucide-react";

const currency = (n: number) => `£${n.toFixed(2)}`;

const StaffCostCalculator: React.FC = () => {
  const [basePayHr, setBasePayHr] = React.useState(26); // Updated for 2025: above new minimum wage rates
  const [weeklyHours, setWeeklyHours] = React.useState(40);
  const [paidWeeks, setPaidWeeks] = React.useState(52);
  const [holidaysDays, setHolidaysDays] = React.useState(28);
  const [sickDays, setSickDays] = React.useState(3);
  const [niRate, setNiRate] = React.useState(13.8);
  const [pensionRate, setPensionRate] = React.useState(3);
  const [vanYear, setVanYear] = React.useState(4200); // Updated for 2025: increased fuel, insurance, maintenance
  const [toolsYear, setToolsYear] = React.useState(1000); // Updated for 2025: tool inflation
  const [insuranceYear, setInsuranceYear] = React.useState(1500); // Updated for 2025: public liability increases
  const [trainingYear, setTrainingYear] = React.useState(600); // Updated for 2025: course price increases
  const [utilisation, setUtilisation] = React.useState(65); // % of paid time billed
  const [targetMargin, setTargetMargin] = React.useState(20);

  const annualBase = basePayHr * weeklyHours * paidWeeks;
  const oncostNI = annualBase * (niRate / 100);
  const pension = annualBase * (pensionRate / 100);
  const annualOnCosts = vanYear + toolsYear + insuranceYear + trainingYear + oncostNI + pension;

  const totalAnnualCost = annualBase + annualOnCosts;
  const effectiveHours = weeklyHours * paidWeeks * (utilisation / 100);
  const loadedHourlyCost = effectiveHours > 0 ? totalAnnualCost / effectiveHours : 0;
  const recommendedChargeOut = targetMargin > 0 ? loadedHourlyCost / (1 - targetMargin / 100) : loadedHourlyCost;

  return (
    <main className="min-h-screen bg-elec-dark px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      <Helmet>
        <title>Fully Loaded Staff Cost Calculator UK</title>
        <meta name="description" content="Calculate fully loaded electrician staff cost: wages, NI, pension, holidays, van, tools and overheads." />
        <link rel="canonical" href="/electrician/business-development/tools/staff-cost" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <header className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-elec-light">Fully Loaded Staff Cost</h1>
          <p className="text-sm sm:text-base text-elec-light/70 mt-2">See the real hourly cost of a spark or mate after all on-costs in the UK.</p>
        </header>

        <BackButton customUrl="/electrician/business-development/tools" />

        <section className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <InfoBox
            title="Why this matters"
            points={[
              "Prevents pricing below true labour cost.",
              "Includes NI, pension, holidays, training and downtime.",
              "Feeds directly into hourly rate and project pricing.",
            ]}
          />

          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-elec-light flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                Basic Pay Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MobileInputWrapper
                  label="Base Pay"
                  value={basePayHr.toString()}
                  onChange={(val) => setBasePayHr(Number(val) || 0)}
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  unit="£/hr"
                  hint="Hourly wage before on-costs. UK min £12.21 (21+). Typical: £18-30/hr"
                  icon={<Users className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Weekly Hours"
                  value={weeklyHours.toString()}
                  onChange={(val) => setWeeklyHours(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="hrs"
                  hint="Standard working hours per week. Typical: 37-40 hours"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Paid Weeks"
                  value={paidWeeks.toString()}
                  onChange={(val) => setPaidWeeks(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="wks/yr"
                  hint="Weeks paid per year. Usually 52 for full-time staff"
                  icon={<Calendar className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-elec-light flex items-center gap-2">
                <Receipt className="h-5 w-5 text-purple-400" />
                Employment Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInputWrapper
                  label="Holiday Days"
                  value={holidaysDays.toString()}
                  onChange={(val) => setHolidaysDays(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="days"
                  hint="UK statutory minimum: 28 days (inc. bank holidays)"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Sick Days"
                  value={sickDays.toString()}
                  onChange={(val) => setSickDays(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="days"
                  hint="Average sick days per year. UK average: 3-5 days"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Employer NI"
                  value={niRate.toString()}
                  onChange={(val) => setNiRate(Number(val) || 0)}
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  unit="%"
                  hint="UK rate: 13.8% on earnings above £175/week (2025)"
                  icon={<Receipt className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Pension"
                  value={pensionRate.toString()}
                  onChange={(val) => setPensionRate(Number(val) || 0)}
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  unit="%"
                  hint="UK minimum: 3% employer contribution (auto-enrolment)"
                  icon={<Receipt className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-elec-light flex items-center gap-2">
                <Wrench className="h-5 w-5 text-orange-400" />
                Equipment & Overheads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInputWrapper
                  label="Van Costs"
                  value={vanYear.toString()}
                  onChange={(val) => setVanYear(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="£/yr"
                  hint="Lease/finance, fuel, insurance, servicing. Typical: £3-5k"
                  icon={<Truck className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Tools & Equipment"
                  value={toolsYear.toString()}
                  onChange={(val) => setToolsYear(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="£/yr"
                  hint="Annual tool replacement & upgrades. Typical: £800-1.5k"
                  icon={<Wrench className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Insurance"
                  value={insuranceYear.toString()}
                  onChange={(val) => setInsuranceYear(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="£/yr"
                  hint="Public liability, professional indemnity. Typical: £1-2k"
                  icon={<Shield className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Training & Certs"
                  value={trainingYear.toString()}
                  onChange={(val) => setTrainingYear(Number(val) || 0)}
                  type="number"
                  inputMode="numeric"
                  unit="£/yr"
                  hint="18th Edition updates, testing courses. Typical: £500-800"
                  icon={<GraduationCap className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-elec-light flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                Efficiency & Margins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInputWrapper
                  label="Utilisation"
                  value={utilisation.toString()}
                  onChange={(val) => setUtilisation(Number(val) || 0)}
                  type="number"
                  inputMode="decimal"
                  unit="%"
                  hint="% of paid time that's billable. Industry avg: 60-70%. Includes admin, travel."
                  icon={<Target className="h-4 w-4" />}
                />
                <MobileInputWrapper
                  label="Target Margin"
                  value={targetMargin.toString()}
                  onChange={(val) => setTargetMargin(Number(val) || 0)}
                  type="number"
                  inputMode="decimal"
                  unit="%"
                  hint="Profit margin on labour. Typical: 15-25% for small firms"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-card to-elec-dark border-elec-yellow/30">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-elec-light">Results Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-primary/20">
                  <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Annual Base Pay</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-400">{currency(annualBase)}</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-primary/20">
                  <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Total On-costs</p>
                  <p className="text-lg sm:text-xl font-bold text-purple-400">{currency(annualOnCosts)}</p>
                  <p className="text-xs text-elec-light/60 mt-1">NI, pension, van, tools, insurance, training</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-orange-400/30">
                  <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Total Annual Cost</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-400">{currency(totalAnnualCost)}</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-primary/20">
                  <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Effective Billable Hours</p>
                  <p className="text-lg sm:text-xl font-bold text-elec-light">{effectiveHours.toFixed(0)} hrs/yr</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20 space-y-3">
                <div className="p-4 sm:p-5 rounded-lg bg-elec-dark/70 border-2 border-elec-yellow/40">
                  <p className="text-sm text-elec-light/80 mb-1">True Hourly Cost</p>
                  <p className="text-2xl sm:text-3xl font-bold text-elec-yellow">{currency(loadedHourlyCost)}/hr</p>
                  <p className="text-xs text-elec-light/60 mt-1">This is what one hour actually costs your business</p>
                </div>
                
                <div className="p-4 sm:p-5 rounded-lg bg-green-500/10 border-2 border-green-400/40">
                  <p className="text-sm text-elec-light/80 mb-1">Recommended Charge-Out Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">{currency(recommendedChargeOut)}/hr</p>
                  <p className="text-xs text-elec-light/60 mt-1">At {targetMargin}% target margin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default StaffCostCalculator;
