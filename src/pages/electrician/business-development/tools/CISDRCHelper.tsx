import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Hammer, Package, Percent, Receipt, PoundSterling, AlertCircle, CheckCircle2, XCircle, Info, Lightbulb } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

  const getConditionalWarnings = () => {
    const warnings = [];
    if (role === "contractor" && cisRate > 0) {
      warnings.push({ type: "info", text: "As a contractor, you deduct CIS from subcontractor payments, not your own invoices." });
    }
    if (drcApplies && vatRegistered) {
      warnings.push({ type: "info", text: "DRC applies - don't charge VAT on invoice. Your contractor accounts for it." });
    }
    if (!drcApplies && vatRegistered) {
      warnings.push({ type: "info", text: "Standard VAT applies - charge VAT on invoice as normal." });
    }
    if (cisRate === 30) {
      warnings.push({ type: "warning", text: "30% CIS rate applies to unregistered subcontractors. Higher deduction!" });
    }
    if (materials > labour * 2 && role === "subcontractor") {
      warnings.push({ type: "info", text: "Materials exceed labour significantly. Remember: CIS deduction only applies to labour." });
    }
    return warnings;
  };

  const warnings = getConditionalWarnings();

  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-4xl">
      <Helmet>
        <title>CIS Deductions & DRC Helper UK</title>
        <meta name="description" content="Calculate CIS deductions and Domestic Reverse Charge (DRC) VAT effects for UK electrical contracts." />
        <link rel="canonical" href="/electrician/business-development/tools/cis-drc" />
      </Helmet>

      <header className="mb-5 sm:mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-elec-light">CIS & DRC Helper (UK)</h1>
        <p className="text-elec-light/70 mt-2 text-sm sm:text-base">Calculate CIS deductions and DRC VAT rules for invoices and cash flow</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-5 sm:mt-6 space-y-5 sm:space-y-7">
        
        {/* Educational Content */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-elec-light flex items-center gap-2 text-lg sm:text-xl">
              <Lightbulb className="w-5 h-5 text-elec-yellow" />
              Understanding CIS & DRC
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-elec-grey/30 hover:bg-elec-grey/40 transition-colors">
                <span className="font-semibold text-sm sm:text-base text-elec-light">What is CIS (Construction Industry Scheme)?</span>
                <Info className="w-4 h-4 text-elec-yellow" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 p-3 sm:p-4 text-xs sm:text-sm text-elec-light/80 space-y-2 text-left">
                <p>HMRC scheme where contractors deduct money from subcontractor payments and pass it to HMRC as advance tax payment.</p>
                <ul className="list-disc pl-5 space-y-1.5 sm:space-y-2 text-left">
                  <li>Contractors must register and verify subcontractors</li>
                  <li>Deductions: 20% (registered), 30% (not registered), or 0% (gross status)</li>
                  <li>Deducted from labour costs only, not materials</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-elec-grey/30 hover:bg-elec-grey/40 transition-colors">
                <span className="font-semibold text-sm sm:text-base text-elec-light">What is DRC (Domestic Reverse Charge)?</span>
                <Info className="w-4 h-4 text-elec-yellow" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 p-3 sm:p-4 text-xs sm:text-sm text-elec-light/80 space-y-2 text-left">
                <p>VAT rule where the customer (contractor) accounts for VAT, not the supplier (subcontractor).</p>
                <ul className="list-disc pl-5 space-y-1.5 sm:space-y-2 text-left">
                  <li>Applies to specified CIS building/construction services</li>
                  <li>Started 1 March 2021</li>
                  <li>Subcontractor doesn't charge VAT on invoice</li>
                  <li>Prevents VAT fraud in construction supply chains</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-elec-grey/30 hover:bg-elec-grey/40 transition-colors">
                <span className="font-semibold text-sm sm:text-base text-elec-light">When do both apply together?</span>
                <Info className="w-4 h-4 text-elec-yellow" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 p-3 sm:p-4 text-xs sm:text-sm text-elec-light/80 space-y-2 text-left">
                <p>If you're a CIS subcontractor working for a CIS contractor: Both CIS and DRC apply.</p>
                <ul className="list-disc pl-5 space-y-1.5 sm:space-y-2 text-left">
                  <li>Your invoice shows: Labour + Materials (no VAT)</li>
                  <li>CIS deduction applies to labour only</li>
                  <li>Contractor accounts for the VAT separately</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-elec-light text-lg sm:text-xl">Your Details</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-5">
            
            {/* Role Selection */}
            <div className="bg-elec-grey/30 p-4 rounded-xl space-y-3">
              <div className="space-y-2">
                <span className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Your Role
                </span>
                <div className="w-full flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <button 
                    className={(role==="contractor"?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                    onClick={()=>setRole("contractor")}
                  >
                    {role === "contractor" && <CheckCircle2 className="w-4 h-4" />}
                    Contractor
                  </button>
                  <button 
                    className={(role==="subcontractor"?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                    onClick={()=>setRole("subcontractor")}
                  >
                    {role === "subcontractor" && <CheckCircle2 className="w-4 h-4" />}
                    Subcontractor
                  </button>
                </div>
                <p className="text-xs text-elec-light/70">
                  Contractor: You hire subcontractors. Subcontractor: You work for contractors.
                </p>
              </div>
            </div>

            {/* Job Costs */}
            <div className="bg-elec-grey/30 p-4 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Job Costs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MobileInputWrapper
                  label="Labour cost (ex VAT)"
                  value={labour}
                  onChange={(v) => setLabour(Number(v) || 0)}
                  type="number"
                  inputMode="decimal"
                  icon={<Hammer className="w-5 h-5" />}
                  unit="£"
                  hint="Cost of your work/time. Typical day rate: £200-£400"
                />
                <MobileInputWrapper
                  label="Materials cost (ex VAT)"
                  value={materials}
                  onChange={(v) => setMaterials(Number(v) || 0)}
                  type="number"
                  inputMode="decimal"
                  icon={<Package className="w-5 h-5" />}
                  unit="£"
                  hint="Cables, accessories, fittings etc."
                />
              </div>
            </div>

            {/* Tax Settings */}
            <div className="bg-elec-grey/30 p-4 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Tax Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MobileInputWrapper
                  label="CIS deduction rate"
                  value={cisRate}
                  onChange={(v) => setCisRate(Number(v) || 0)}
                  type="number"
                  inputMode="decimal"
                  icon={<Percent className="w-5 h-5" />}
                  unit="%"
                  hint="Standard: 20% (registered), 30% (not registered), 0% (gross)"
                />
                <MobileInputWrapper
                  label="VAT rate"
                  value={vatRate}
                  onChange={(v) => setVatRate(Number(v) || 0)}
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  icon={<Receipt className="w-5 h-5" />}
                  unit="%"
                  hint="Standard: 20%, Reduced (energy saving): 5%"
                />
              </div>
            </div>

            {/* VAT & DRC Status */}
            <div className="bg-elec-grey/30 p-4 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                VAT & DRC Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-elec-light">VAT registered?</span>
                  <div className="w-full flex rounded-xl overflow-hidden border border-elec-yellow/30">
                    <button 
                      className={(vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                      onClick={()=>setVatRegistered(true)}
                    >
                      {vatRegistered && <CheckCircle2 className="w-4 h-4" />}
                      Yes
                    </button>
                    <button 
                      className={(!vatRegistered?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                      onClick={()=>setVatRegistered(false)}
                    >
                      {!vatRegistered && <XCircle className="w-4 h-4" />}
                      No
                    </button>
                  </div>
                  <p className="text-xs text-elec-light/70">
                    Required if turnover exceeds £90,000
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-elec-light">DRC applies?</span>
                  <div className="w-full flex rounded-xl overflow-hidden border border-elec-yellow/30">
                    <button 
                      className={(drcApplies?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                      onClick={()=>setDrcApplies(true)}
                    >
                      {drcApplies && <CheckCircle2 className="w-4 h-4" />}
                      Yes
                    </button>
                    <button 
                      className={(!drcApplies?"bg-elec-yellow text-black":"text-elec-yellow hover:bg-elec-yellow/10")+" h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2"} 
                      onClick={()=>setDrcApplies(false)}
                    >
                      {!drcApplies && <XCircle className="w-4 h-4" />}
                      No
                    </button>
                  </div>
                  <p className="text-xs text-elec-light/70">
                    Applies to CIS building/construction services since March 2021
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conditional Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-2">
            {warnings.map((warning, idx) => (
              <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl ${warning.type === "warning" ? "bg-orange-500/10 border border-orange-500/30" : "bg-blue-500/10 border border-blue-500/30"}`}>
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${warning.type === "warning" ? "text-orange-500" : "text-blue-500"}`} />
                <p className="text-sm text-elec-light">{warning.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Invoice Breakdown */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-elec-light text-lg sm:text-xl">Invoice Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-4">
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center justify-between pb-2">
                <span className="flex items-center gap-2 text-elec-light/80">
                  <Hammer className="w-4 h-4 text-elec-yellow/70" />
                  Labour cost
                </span>
                <strong className="text-elec-light">{currency(labour)}</strong>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="flex items-center gap-2 text-elec-light/80">
                  <Package className="w-4 h-4 text-elec-yellow/70" />
                  Materials cost
                </span>
                <strong className="text-elec-light">{currency(materials)}</strong>
              </div>
              <div className="border-t border-elec-yellow/20 pt-2"></div>
              <div className="flex items-center justify-between py-2 bg-elec-grey/30 px-3 rounded-lg">
                <span className="font-semibold text-elec-light">Sub-total (ex VAT)</span>
                <strong className="text-elec-light text-lg">{currency(subTotal)}</strong>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <span className="flex items-center gap-2 text-elec-light/80">
                  <Receipt className="w-4 h-4 text-elec-yellow/70" />
                  VAT to charge
                  {vat === 0 && drcApplies && <Info className="w-3 h-3 text-blue-500" />}
                </span>
                <strong className="text-elec-light">{currency(vat)}</strong>
              </div>
              {vat === 0 && drcApplies && (
                <p className="text-xs text-blue-500 pl-6">£0 because DRC applies - contractor accounts for VAT</p>
              )}
              
              <div className="border-t border-elec-yellow/20 pt-2"></div>
              <div className="flex items-center justify-between py-2 bg-elec-grey/30 px-3 rounded-lg">
                <span className="font-semibold text-elec-light">Invoice total</span>
                <strong className="text-elec-light text-lg">{currency(totalDueFromCustomer)}</strong>
              </div>
              
              {cisDeduction > 0 && (
                <>
                  <div className="flex items-center justify-between pb-2">
                    <span className="flex items-center gap-2 text-elec-light/80">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Less: CIS deduction ({cisRate}%)
                    </span>
                    <strong className="text-red-500">-{currency(cisDeduction)}</strong>
                  </div>
                  <p className="text-xs text-elec-light/70 pl-6">
                    Calculated on labour only: {currency(labour)} × {cisRate}%
                  </p>
                </>
              )}
              
              <div className="border-t border-elec-yellow/20 pt-3"></div>
              <div className="flex items-center justify-between py-3 bg-green-500/10 border border-green-500/30 px-4 rounded-xl">
                <span className="flex items-center gap-2 font-bold text-elec-light">
                  <PoundSterling className="w-5 h-5 text-green-500" />
                  Cash you receive
                </span>
                <strong className="text-green-500 text-2xl sm:text-3xl">{currency(cashReceived)}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What This Means */}
        {role === "subcontractor" && cisDeduction > 0 && (
          <Card className="bg-blue-500/5 border-blue-500/30">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-elec-light flex items-center gap-2 text-base sm:text-lg">
                <Info className="w-5 h-5 text-blue-500" />
                What This Means
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 text-left">
              <ul className="list-disc pl-5 space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-elec-light/80">
                <li>You invoice <strong className="text-elec-light">{currency(totalDueFromCustomer)}</strong> but receive <strong className="text-green-500">{currency(cashReceived)}</strong></li>
                <li>Contractor pays <strong className="text-elec-light">{currency(cisDeduction)}</strong> directly to HMRC as your tax</li>
                {drcApplies && (
                  <li>Contractor accounts for <strong className="text-elec-light">{currency(subTotal * (vatRate/100))}</strong> VAT to HMRC (not shown on your invoice)</li>
                )}
                <li>Claim your <strong className="text-elec-light">{currency(cisDeduction)}</strong> CIS deduction on your Self Assessment tax return</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
};

export default CISDRCHelper;
