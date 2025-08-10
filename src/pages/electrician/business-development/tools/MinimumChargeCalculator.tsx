import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

const MinimumChargeCalculator: React.FC = () => {
  const [travelMins, setTravelMins] = React.useState(30);
  const [adminMins, setAdminMins] = React.useState(15);
  const [baseCostHr, setBaseCostHr] = React.useState(30); // loaded hourly cost
  const [overheadHr, setOverheadHr] = React.useState(10);
  const [firstHourPremium, setFirstHourPremium] = React.useState(25);
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState(20);
  const [rounding, setRounding] = React.useState(5); // nearest £

  const timeCost = ((travelMins + adminMins) / 60) * (baseCostHr + overheadHr);
  const firstHourBase = (baseCostHr + overheadHr) + timeCost;
  const firstHourUplift = firstHourBase * (1 + firstHourPremium / 100);
  const firstHourRounded = roundTo(firstHourUplift, rounding);
  const firstHourIncVat = vatRegistered ? firstHourRounded * (1 + vatRate / 100) : firstHourRounded;

  const subsequentHourBase = baseCostHr + overheadHr;
  const subsequentHourRounded = roundTo(subsequentHourBase, rounding);
  const subsequentIncVat = vatRegistered ? subsequentHourRounded * (1 + vatRate / 100) : subsequentHourRounded;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Minimum Charge & First Hour Pricing UK</title>
        <meta name="description" content="Set profitable minimum call-out and first-hour pricing for domestic and commercial electrical work in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/minimum-charge" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minimum Charge & First Hour</h1>
        <p className="text-muted-foreground mt-2">Ensure short jobs still cover travel, admin and margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Protects profit on small call-outs.",
            "Consistent policy for first hour and subsequent hours.",
            "Adjusts for VAT and domestic vs commercial.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Travel (mins)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={travelMins} onChange={(e)=>setTravelMins(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Admin (mins)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={adminMins} onChange={(e)=>setAdminMins(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Base cost £/hr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={baseCostHr} onChange={(e)=>setBaseCostHr(Number(e.target.value)||0)} step={0.1} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Overhead £/hr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={overheadHr} onChange={(e)=>setOverheadHr(Number(e.target.value)||0)} step={0.1} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <label className="grid gap-1 text-sm">
                <span>First hour premium %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={firstHourPremium} onChange={(e)=>setFirstHourPremium(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Rounding to £</span>
                <input type="number" className="input input-bordered bg-elec-card" value={rounding} onChange={(e)=>setRounding(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>VAT rate %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={vatRate} onChange={(e)=>setVatRate(Number(e.target.value)||0)} step={0.1} />
              </label>
              <div className="grid gap-1">
                <span className="text-sm">VAT registered?</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <button className={(vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setVatRegistered(true)}>Yes</button>
                  <button className={(!vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setVatRegistered(false)}>No</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Suggested pricing</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>First hour (ex VAT)</span><strong>{currency(firstHourRounded)}</strong></div>
            <div className="flex justify-between"><span>First hour {vatRegistered?"(inc VAT)":""}</span><strong>{currency(firstHourIncVat)}</strong></div>
            <div className="flex justify-between"><span>Subsequent hour (ex VAT)</span><strong>{currency(subsequentHourRounded)}</strong></div>
            <div className="flex justify-between"><span>Subsequent hour {vatRegistered?"(inc VAT)":""}</span><strong>{currency(subsequentIncVat)}</strong></div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default MinimumChargeCalculator;
