import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { MobileInput } from "@/components/ui/mobile-input";

const currency = (n: number) => `£${n.toFixed(2)}`;
const roundTo = (n: number, step: number) => Math.round(n / step) * step;
const validateInput = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const MinimumChargeCalculator: React.FC = () => {
  const [travelMins, setTravelMins] = React.useState(30);
  const [adminMins, setAdminMins] = React.useState(15);
  const [hourlyRate, setHourlyRate] = React.useState(50);
  const [hourlyCost, setHourlyCost] = React.useState(30);
  const [overheadHr, setOverheadHr] = React.useState(10);
  const [firstHourPremium, setFirstHourPremium] = React.useState(25);
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState(20);
  const [rounding, setRounding] = React.useState(5);

  const timeCost = ((travelMins + adminMins) / 60) * (hourlyCost + overheadHr);
  const firstHourBase = (hourlyCost + overheadHr) + timeCost;
  const firstHourUplift = firstHourBase * (1 + firstHourPremium / 100);
  const firstHourRounded = roundTo(firstHourUplift, rounding);
  const firstHourIncVat = vatRegistered ? firstHourRounded * (1 + vatRate / 100) : firstHourRounded;

  const subsequentHourBase = hourlyCost + overheadHr;
  const subsequentHourRounded = roundTo(subsequentHourBase, rounding);
  const subsequentIncVat = vatRegistered ? subsequentHourRounded * (1 + vatRate / 100) : subsequentHourRounded;

  const exampleJobHours = 3;
  const exampleTotal = firstHourIncVat + (subsequentIncVat * (exampleJobHours - 1));

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Minimum Charge & First Hour Pricing UK</title>
        <meta name="description" content="Set profitable minimum call-out and first-hour pricing for domestic and commercial electrical work in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/minimum-charge" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-elec-light">Minimum Charge & First Hour</h1>
        <p className="text-elec-light/80 mt-2">Calculate profitable call-out pricing that covers travel, admin and setup costs.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4 sm:gap-5">
        <WhyThisMatters
          points={[
            "Many electricians lose money on small jobs by not accounting for travel and admin time",
            "A first-hour premium ensures every call-out is profitable, even if the work only takes 30 minutes",
            "Consistent pricing policy makes quoting faster and builds customer trust",
            "Adjust for VAT status - remember domestic work can qualify for reduced 5% VAT in some cases",
          ]}
        />

        {/* Time Costs Section */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg sm:text-xl">Time Costs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileInput
                label="Travel Time"
                type="number"
                inputMode="numeric"
                value={String(travelMins)}
                onChange={(e) => setTravelMins(validateInput(Number(e.target.value) || 0, 0, 180))}
                hint="Average one-way travel time to job sites"
                unit="mins"
              />
              <MobileInput
                label="Admin Time"
                type="number"
                inputMode="numeric"
                value={String(adminMins)}
                onChange={(e) => setAdminMins(validateInput(Number(e.target.value) || 0, 0, 120))}
                hint="Time for quotes, invoicing, phone calls per job"
                unit="mins"
              />
            </div>
          </CardContent>
        </Card>

        {/* Your Rates Section */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg sm:text-xl">Your Costs & Overheads</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MobileInput
                label="Your Hourly Cost"
                type="number"
                inputMode="decimal"
                value={String(hourlyCost)}
                onChange={(e) => setHourlyCost(validateInput(Number(e.target.value) || 0, 0, 200))}
                hint="Your actual cost per hour (wages, NI, pension, van)"
                unit="£/hr"
              />
              <MobileInput
                label="Business Overhead"
                type="number"
                inputMode="decimal"
                value={String(overheadHr)}
                onChange={(e) => setOverheadHr(validateInput(Number(e.target.value) || 0, 0, 100))}
                hint="Insurance, tools, marketing, office costs per hour"
                unit="£/hr"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Strategy Section */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg sm:text-xl">Pricing Strategy</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MobileInput
                label="First Hour Premium"
                type="number"
                inputMode="numeric"
                value={String(firstHourPremium)}
                onChange={(e) => setFirstHourPremium(validateInput(Number(e.target.value) || 0, 0, 100))}
                hint="Extra margin for short jobs to cover setup & call-out"
                unit="%"
              />
              <MobileInput
                label="Round Prices To"
                type="number"
                inputMode="numeric"
                value={String(rounding)}
                onChange={(e) => setRounding(validateInput(Number(e.target.value) || 0, 1, 50))}
                hint="Round final prices to nearest £5 or £10 for easier quoting"
                unit="£"
              />
              <MobileInput
                label="VAT Rate"
                type="number"
                inputMode="decimal"
                value={String(vatRate)}
                onChange={(e) => setVatRate(validateInput(Number(e.target.value) || 0, 0, 20))}
                hint="Standard 20% or reduced 5% for domestic work"
                unit="%"
              />
              <div className="grid gap-1">
                <span className="text-sm font-medium text-elec-light">VAT Registered?</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30 mt-1">
                  <button 
                    type="button"
                    className={(vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") + " h-12 px-6 font-medium transition-colors"}
                    onClick={() => setVatRegistered(true)}
                  >
                    Yes
                  </button>
                  <button 
                    type="button"
                    className={(!vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") + " h-12 px-6 font-medium transition-colors"}
                    onClick={() => setVatRegistered(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* First Hour Pricing with Breakdown */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg sm:text-xl">Your First Hour Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Calculation Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-elec-light/80">
                <span>Base labour (1 hour)</span>
                <span className="font-medium">{currency(hourlyCost + overheadHr)}</span>
              </div>
              <div className="flex justify-between text-elec-light/80">
                <span>Travel & admin time cost</span>
                <span className="font-medium">+ {currency(timeCost)}</span>
              </div>
              <div className="flex justify-between text-elec-light/80">
                <span>First hour premium ({firstHourPremium}%)</span>
                <span className="font-medium">+ {currency(firstHourUplift - firstHourBase)}</span>
              </div>
              <div className="h-px bg-elec-yellow/20 my-3"></div>
              
              {/* Final Prices - BIG and BOLD */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-base text-elec-light font-medium">First Hour (ex VAT)</span>
                  <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">{currency(firstHourRounded)}</div>
                </div>
                {vatRegistered && (
                  <div className="flex justify-between items-center">
                    <span className="text-base text-elec-light font-medium">First Hour (inc VAT)</span>
                    <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">{currency(firstHourIncVat)}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subsequent Hours - Separate Card */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg sm:text-xl">Subsequent Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base text-elec-light font-medium">Per Hour (ex VAT)</span>
              <div className="text-xl sm:text-2xl font-bold text-elec-light">{currency(subsequentHourRounded)}</div>
            </div>
            {vatRegistered && (
              <div className="flex justify-between items-center">
                <span className="text-base text-elec-light font-medium">Per Hour (inc VAT)</span>
                <div className="text-xl sm:text-2xl font-bold text-elec-light">{currency(subsequentIncVat)}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How to Use Example */}
        <Card className="bg-elec-yellow/5 border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">How to use this</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-elec-light/90 space-y-3">
            <div>
              <p className="font-semibold text-elec-light mb-2">Example quote:</p>
              <p className="leading-relaxed">
                {exampleJobHours}-hour job = {currency(firstHourIncVat)} (1st hour) + {currency(subsequentIncVat)} × {exampleJobHours - 1} (additional hours) 
                = <strong className="text-elec-yellow text-lg"> {currency(exampleTotal)}</strong> total
              </p>
            </div>
            <div className="h-px bg-elec-yellow/20"></div>
            <p className="text-xs text-elec-light/70 leading-relaxed">
              💡 <strong>Pro tip:</strong> Your first hour price covers travel, admin, and setup. After that, charge your standard hourly rate.
              This ensures even small 1-hour jobs are profitable and you don't lose money on call-outs.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default MinimumChargeCalculator;
