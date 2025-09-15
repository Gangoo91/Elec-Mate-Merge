import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;

const BreakEvenCalculator: React.FC = () => {
  const [annualOverheads, setAnnualOverheads] = React.useState(32000); // Updated for 2025: increased insurance, tools, software costs
  const [chargeableHours, setChargeableHours] = React.useState(1200); // ~50% util of 40h/wk
  const [labourCostHr, setLabourCostHr] = React.useState(28); // Updated for 2025: higher minimum wage + on-costs
  const [materialShare, setMaterialShare] = React.useState(30); // % of job value
  const [materialMarkup, setMaterialMarkup] = React.useState(18); // Updated for 2025: supply chain costs
  const [targetMargin, setTargetMargin] = React.useState(20); // % margin target
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState(20);
  const [exampleHours, setExampleHours] = React.useState(4);
  const [exampleMats, setExampleMats] = React.useState(130); // Updated for 2025: material cost inflation

  const overheadPerHour = annualOverheads / Math.max(1, chargeableHours);
  const breakEvenHr = labourCostHr + overheadPerHour;
  const breakEvenDay = breakEvenHr * 8;

  // Example job pricing (simple model): price = labour + materials*(1+markup) with target margin uplift
  const exLabourCost = breakEvenHr * exampleHours;
  const exMatsSell = exampleMats * (1 + materialMarkup / 100);
  const basePrice = exLabourCost + exMatsSell;
  const targetUplift = targetMargin > 0 ? basePrice / (1 - targetMargin / 100) : basePrice;
  const priceExVat = targetUplift;
  const priceIncVat = vatRegistered ? priceExVat * (1 + vatRate / 100) : priceExVat;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Break-even & Margin Guard | Electrician UK</title>
        <meta name="description" content="Work out your break-even point and minimum margin to protect profit on electrical jobs in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/break-even" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Break-even & Margin Guard</h1>
        <p className="text-muted-foreground mt-2">Know the minimum price you must charge to cover costs and lock in your target margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Prevents underquoting and protects target margins.",
            "Adapts to VAT registration and material markup.",
            "Shows sensitivity to utilisation and overhead changes.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="grid gap-1">
                <span className="text-sm">Annual overheads (ex VAT)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={annualOverheads}
                  onChange={(e)=>setAnnualOverheads(Number(e.target.value)||0)} min={0} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Chargeable hours / year</span>
                <input type="number" className="input input-bordered bg-elec-card" value={chargeableHours}
                  onChange={(e)=>setChargeableHours(Number(e.target.value)||0)} min={1} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="grid gap-1">
                <span className="text-sm">Labour cost / hour</span>
                <input type="number" className="input input-bordered bg-elec-card" value={labourCostHr}
                  onChange={(e)=>setLabourCostHr(Number(e.target.value)||0)} step={0.01} min={0} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Materials share %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={materialShare}
                  onChange={(e)=>setMaterialShare(Number(e.target.value)||0)} min={0} max={100} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Material markup %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={materialMarkup}
                  onChange={(e)=>setMaterialMarkup(Number(e.target.value)||0)} min={0} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <label className="grid gap-1">
                <span className="text-sm">Target margin %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={targetMargin}
                  onChange={(e)=>setTargetMargin(Number(e.target.value)||0)} min={0} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">VAT rate %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={vatRate}
                  onChange={(e)=>setVatRate(Number(e.target.value)||0)} min={0} step={0.1} />
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
            <CardTitle className="text-elec-light">Results</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Overhead per hour</span><strong>{currency(overheadPerHour)}</strong></div>
            <div className="flex justify-between"><span>Break-even hourly rate</span><strong>{currency(breakEvenHr)}</strong></div>
            <div className="flex justify-between"><span>Break-even day rate (8h)</span><strong>{currency(breakEvenDay)}</strong></div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Example job</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Labour hours</span>
                <input type="number" className="input input-bordered bg-elec-card" value={exampleHours} onChange={(e)=>setExampleHours(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Materials (ex VAT)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={exampleMats} onChange={(e)=>setExampleMats(Number(e.target.value)||0)} />
              </label>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Base price (ex VAT)</span><strong>{currency(priceExVat)}</strong></div>
              <div className="flex justify-between"><span>Total price {vatRegistered?"(inc VAT)":""}</span><strong>{currency(priceIncVat)}</strong></div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default BreakEvenCalculator;
