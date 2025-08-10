import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;

const VATSchemeComparison: React.FC = () => {
  const [annualRevenue, setAnnualRevenue] = React.useState(120000);
  const [labourShare, setLabourShare] = React.useState(60); // % of revenue
  const [materialsShare, setMaterialsShare] = React.useState(40);
  const [flatRate, setFlatRate] = React.useState(14.5);
  const [vatRate, setVatRate] = React.useState(20);
  const [vatRegistered, setVatRegistered] = React.useState(true);

  React.useEffect(()=>{
    const mats = 100 - labourShare;
    setMaterialsShare(mats < 0 ? 0 : mats);
  },[labourShare]);

  const labour = annualRevenue * (labourShare/100);
  const materials = annualRevenue * (materialsShare/100);

  // Standard scheme (simplified): charge VAT on sales, reclaim input VAT on materials
  const standardOutputVat = vatRegistered ? annualRevenue * (vatRate/100) : 0;
  const standardInputVat = vatRegistered ? materials * (vatRate/100) : 0;
  const standardVatPayable = Math.max(0, standardOutputVat - standardInputVat);

  // Flat Rate scheme (simplified): pay flat % on VAT-inclusive turnover, limited reclaim
  const frsVatPayable = vatRegistered ? (annualRevenue * (1 + vatRate/100)) * (flatRate/100) : 0;

  const diff = frsVatPayable - standardVatPayable; // + = FRS worse

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>VAT Scheme Comparison for Electricians UK</title>
        <meta name="description" content="Compare Flat Rate vs Standard VAT schemes for UK electricians to see net take-home impact." />
        <link rel="canonical" href="/electrician/business-development/tools/vat-scheme" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">VAT Scheme Comparison</h1>
        <p className="text-muted-foreground mt-2">Understand which VAT scheme suits your business model best.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Shows real impact on cash flow and margin.",
            "Accounts for materials-heavy vs labour-heavy jobs.",
            "Helps plan pricing and invoicing policies.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Annual revenue (ex VAT)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={annualRevenue} onChange={(e)=>setAnnualRevenue(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Labour share %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={labourShare} onChange={(e)=>setLabourShare(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Flat rate %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={flatRate} onChange={(e)=>setFlatRate(Number(e.target.value)||0)} step={0.1} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
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
              <div className="text-sm text-muted-foreground">Materials share auto = {materialsShare}%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Comparison</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Standard scheme VAT payable</span><strong>{currency(standardVatPayable)}</strong></div>
            <div className="flex justify-between"><span>Flat Rate scheme VAT payable</span><strong>{currency(frsVatPayable)}</strong></div>
            <div className="flex justify-between"><span>Difference (FRS - Standard)</span><strong className={diff>0?"text-red-400":"text-green-400"}>{currency(diff)}</strong></div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default VATSchemeComparison;
