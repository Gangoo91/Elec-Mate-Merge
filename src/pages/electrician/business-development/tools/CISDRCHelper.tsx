import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const currency = (n: number) => `£${n.toFixed(2)}`;

type Role = "contractor" | "subcontractor";

const CISDRCHelper: React.FC = () => {
  const [role, setRole] = React.useState<Role>("subcontractor");
  const [cisRate, setCisRate] = React.useState(20);
  const [labour, setLabour] = React.useState(1000);
  const [materials, setMaterials] = React.useState(300);
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [drcApplies, setDrcApplies] = React.useState(true);
  const [vatRate, setVatRate] = React.useState(20);

  // Invoice logic (simplified):
  const subTotal = labour + materials;
  const vat = vatRegistered && !drcApplies ? subTotal * (vatRate/100) : 0;
  const cisDeduction = role === "subcontractor" ? labour * (cisRate/100) : 0;
  const totalDueFromCustomer = subTotal + vat; // if DRC, vat=0 and customer accounts for VAT
  const cashReceived = totalDueFromCustomer - cisDeduction;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>CIS Deductions & DRC Helper UK</title>
        <meta name="description" content="Calculate CIS deductions and Domestic Reverse Charge (DRC) VAT effects for UK electrical contracts." />
        <link rel="canonical" href="/electrician/business-development/tools/cis-drc" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">CIS & DRC Helper (UK)</h1>
        <p className="text-muted-foreground mt-2">Handle CIS deductions and DRC VAT rules cleanly on invoices and cash flow.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Avoids invoicing errors and cash flow shocks.",
            "Clarity for contractor vs subcontractor scenarios.",
            "Exports a clean summary for your accountant.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="grid gap-1">
                <span className="text-sm">Role</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <button className={(role==="contractor"?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setRole("contractor")}>Contractor</button>
                  <button className={(role==="subcontractor"?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setRole("subcontractor")}>Subcontractor</button>
                </div>
              </div>
              <label className="grid gap-1 text-sm">
                <span>CIS rate %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={cisRate} onChange={(e)=>setCisRate(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>VAT rate %</span>
                <input type="number" className="input input-bordered bg-elec-card" value={vatRate} onChange={(e)=>setVatRate(Number(e.target.value)||0)} step={0.1} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="grid gap-1 text-sm">
                <span>Labour (ex VAT)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={labour} onChange={(e)=>setLabour(Number(e.target.value)||0)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Materials (ex VAT)</span>
                <input type="number" className="input input-bordered bg-elec-card" value={materials} onChange={(e)=>setMaterials(Number(e.target.value)||0)} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div className="grid gap-1">
                <span className="text-sm">VAT registered?</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <button className={(vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setVatRegistered(true)}>Yes</button>
                  <button className={(!vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setVatRegistered(false)}>No</button>
                </div>
              </div>
              <div className="grid gap-1">
                <span className="text-sm">DRC applies?</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <button className={(drcApplies?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setDrcApplies(true)}>Yes</button>
                  <button className={(!drcApplies?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-12 px-4"} onClick={()=>setDrcApplies(false)}>No</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Invoice breakdown</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Sub-total (ex VAT)</span><strong>{currency(subTotal)}</strong></div>
            <div className="flex justify-between"><span>VAT on invoice</span><strong>{currency(vat)}</strong></div>
            <div className="flex justify-between"><span>CIS deduction</span><strong>-{currency(cisDeduction)}</strong></div>
            <div className="flex justify-between"><span>Cash received</span><strong>{currency(cashReceived)}</strong></div>
            {drcApplies && <p className="text-xs text-muted-foreground">DRC: VAT not charged; customer accounts for VAT.</p>}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CISDRCHelper;
