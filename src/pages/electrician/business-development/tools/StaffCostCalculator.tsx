import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;

const StaffCostCalculator: React.FC = () => {
  const [basePayHr, setBasePayHr] = React.useState(18);
  const [weeklyHours, setWeeklyHours] = React.useState(40);
  const [paidWeeks, setPaidWeeks] = React.useState(52);
  const [holidaysDays, setHolidaysDays] = React.useState(28);
  const [sickDays, setSickDays] = React.useState(3);
  const [niRate, setNiRate] = React.useState(13.8);
  const [pensionRate, setPensionRate] = React.useState(3);
  const [vanYear, setVanYear] = React.useState(3500);
  const [toolsYear, setToolsYear] = React.useState(800);
  const [insuranceYear, setInsuranceYear] = React.useState(1200);
  const [trainingYear, setTrainingYear] = React.useState(400);
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
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Fully Loaded Staff Cost Calculator UK</title>
        <meta name="description" content="Calculate fully loaded electrician staff cost: wages, NI, pension, holidays, van, tools and overheads." />
        <link rel="canonical" href="/electrician/business-development/tools/staff-cost" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Fully Loaded Staff Cost</h1>
        <p className="text-muted-foreground mt-2">See the real hourly cost of a spark or mate after all on-costs in the UK.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Prevents pricing below true labour cost.",
            "Includes NI, pension, holidays, training and downtime.",
            "Feeds directly into hourly rate and project pricing.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Base pay £/hr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={basePayHr} onChange={(e)=>setBasePayHr(Number(e.target.value)||0)} step={0.1} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Weekly hours</span>
                <input type="number" className="input input-bordered bg-elec-card" value={weeklyHours} onChange={(e)=>setWeeklyHours(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Paid weeks / yr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={paidWeeks} onChange={(e)=>setPaidWeeks(Number(e.target.value)||0)} />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Holidays (days)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={holidaysDays} onChange={(e)=>setHolidaysDays(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Sick (days)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={sickDays} onChange={(e)=>setSickDays(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Employer NI %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={niRate} onChange={(e)=>setNiRate(Number(e.target.value)||0)} step={0.1} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Pension %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={pensionRate} onChange={(e)=>setPensionRate(Number(e.target.value)||0)} step={0.1} />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Van / yr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={vanYear} onChange={(e)=>setVanYear(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Tools / yr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={toolsYear} onChange={(e)=>setToolsYear(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Insurance / yr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={insuranceYear} onChange={(e)=>setInsuranceYear(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Training / yr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={trainingYear} onChange={(e)=>setTrainingYear(Number(e.target.value)||0)} />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Utilisation % (time billed)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={utilisation} onChange={(e)=>setUtilisation(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Target margin %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={targetMargin} onChange={(e)=>setTargetMargin(Number(e.target.value)||0)} />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Results</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Annual base pay</span><strong>{currency(annualBase)}</strong></div>
            <div className="flex justify-between"><span>On-costs (NI, pension, van, tools, insurance, training)</span><strong>{currency(annualOnCosts)}</strong></div>
            <div className="flex justify-between"><span>Total annual cost</span><strong>{currency(totalAnnualCost)}</strong></div>
            <div className="flex justify-between"><span>Effective billed hours</span><strong>{effectiveHours.toFixed(0)}</strong></div>
            <div className="flex justify-between"><span>Loaded hourly cost</span><strong>{currency(loadedHourlyCost)}</strong></div>
            <div className="flex justify-between"><span>Recommended charge-out (incl margin)</span><strong>{currency(recommendedChargeOut)}</strong></div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default StaffCostCalculator;
