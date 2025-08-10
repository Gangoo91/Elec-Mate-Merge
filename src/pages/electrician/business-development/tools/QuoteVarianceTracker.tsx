import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;

const QuoteVarianceTracker: React.FC = () => {
  const [quotedHours, setQuotedHours] = React.useState(16);
  const [actualHours, setActualHours] = React.useState(18);
  const [hourlyRate, setHourlyRate] = React.useState(55);
  const [quotedMats, setQuotedMats] = React.useState(300);
  const [actualMats, setActualMats] = React.useState(380);
  const [notes, setNotes] = React.useState("");
  const hoursVar = actualHours - quotedHours;
  const hoursVarCost = hoursVar * hourlyRate;
  const matsVar = actualMats - quotedMats;
  const totalVar = hoursVarCost + matsVar;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Quote vs Actual Variance Tracker UK</title>
        <meta name="description" content="Track quote vs actual hours, materials and costs to improve estimating accuracy for UK electrical jobs." />
        <link rel="canonical" href="/electrician/business-development/tools/quote-variance" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Quote vs Actual Tracker</h1>
        <p className="text-muted-foreground mt-2">Capture variances to refine your pricing and protect margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Reveals where jobs overrun and why.",
            "Builds a feedback loop to sharpen estimates.",
            "Highlights scope creep and rework quickly.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Quoted hours</span>
                <input type="number" className="input input-bordered bg-elec-card" value={quotedHours} onChange={(e)=>setQuotedHours(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Actual hours</span>
                <input type="number" className="input input-bordered bg-elec-card" value={actualHours} onChange={(e)=>setActualHours(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Charge-out £/hr</span>
                <input type="number" className="input input-bordered bg-elec-card" value={hourlyRate} onChange={(e)=>setHourlyRate(Number(e.target.value)||0)} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Quoted materials</span>
                <input type="number" className="input input-bordered bg-elec-card" value={quotedMats} onChange={(e)=>setQuotedMats(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Actual materials</span>
                <input type="number" className="input input-bordered bg-elec-card" value={actualMats} onChange={(e)=>setActualMats(Number(e.target.value)||0)} />
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span>Notes / reason</span>
              <textarea className="textarea bg-elec-card min-h-24" value={notes} onChange={(e)=>setNotes(e.target.value)} />
            </label>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Variance summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Hours variance</span><strong>{hoursVar.toFixed(2)} h</strong></div>
            <div className="flex justify-between"><span>Labour variance</span><strong>{currency(hoursVarCost)}</strong></div>
            <div className="flex justify-between"><span>Materials variance</span><strong>{currency(matsVar)}</strong></div>
            <div className="flex justify-between text-elec-light"><span>Total variance</span><strong>{currency(totalVar)}</strong></div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default QuoteVarianceTracker;
