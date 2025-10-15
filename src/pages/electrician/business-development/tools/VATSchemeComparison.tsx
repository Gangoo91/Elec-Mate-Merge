import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Percent, TrendingDown, PoundSterling, Calculator, CheckCircle2, AlertCircle } from "lucide-react";

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-7 max-w-4xl">
        <Helmet>
          <title>VAT Scheme Comparison for Electricians UK</title>
          <meta name="description" content="Compare Flat Rate vs Standard VAT schemes for UK electricians to see net take-home impact." />
          <link rel="canonical" href="/electrician/business-development/tools/vat-scheme" />
        </Helmet>

        <header className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-elec-light">VAT Scheme Comparison</h1>
          <p className="text-elec-light/70 mt-2 text-sm sm:text-base">Understand which VAT scheme suits your business model best.</p>
        </header>

        <BackButton customUrl="/electrician/business-development/tools" />

        <section className="mt-5 sm:mt-7 space-y-5 sm:space-y-7">
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
              <CardTitle className="text-elec-light text-lg sm:text-xl">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6">
              <div className="bg-elec-grey/30 p-4 rounded-xl space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <MobileInputWrapper
                    label="Annual Revenue (ex VAT)"
                    type="number"
                    inputMode="numeric"
                    value={annualRevenue}
                    onChange={(val) => setAnnualRevenue(Number(val) || 0)}
                    icon={<PoundSterling className="w-5 h-5" />}
                    unit="£"
                    hint="Typical UK electrician: £40k-£150k. VAT threshold: £90,000"
                  />
                
                <MobileInputWrapper
                  label="Labour Share"
                  type="number"
                  inputMode="numeric"
                  value={labourShare}
                  onChange={(val) => setLabourShare(Number(val) || 0)}
                  icon={<Percent className="w-5 h-5" />}
                  unit="%"
                  hint="Domestic/rewires: 60-80%. Commercial with materials: 30-50%"
                />
                </div>
              </div>

              <div className="bg-elec-grey/30 p-4 rounded-xl space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                <MobileInputWrapper
                  label="Flat Rate"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={flatRate}
                  onChange={(val) => setFlatRate(Number(val) || 0)}
                  icon={<Calculator className="w-5 h-5" />}
                  unit="%"
                  hint="Building services: 14.5% (first year), 12.5% (after)"
                />
                
                <MobileInputWrapper
                  label="VAT Rate"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={vatRate}
                  onChange={(val) => setVatRate(Number(val) || 0)}
                  icon={<TrendingDown className="w-5 h-5" />}
                  unit="%"
                  hint="20% standard, 5% reduced for energy-saving installations"
                />
                </div>
              </div>

              <div className="space-y-3 bg-elec-grey/30 p-4 rounded-xl">
                <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  VAT Registered?
                </label>
                <div className="flex rounded-xl overflow-hidden border border-elec-yellow/30 h-14">
                  <button 
                    className={`flex-1 font-medium transition-all ${
                      vatRegistered 
                        ? "bg-elec-yellow text-black" 
                        : "text-elec-yellow hover:bg-elec-yellow/10"
                    }`}
                    onClick={() => setVatRegistered(true)}
                  >
                    Yes
                  </button>
                  <button 
                    className={`flex-1 font-medium transition-all ${
                      !vatRegistered 
                        ? "bg-elec-yellow text-black" 
                        : "text-elec-yellow hover:bg-elec-yellow/10"
                    }`}
                    onClick={() => setVatRegistered(false)}
                  >
                    No
                  </button>
                </div>
                <p className="text-xs text-elec-light/70 flex items-center gap-1">
                  <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                  Materials share auto-calculated: {materialsShare}%
                </p>
              </div>
            </CardContent>
          </Card>

          {vatRegistered && (
            <>
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardHeader className="pb-3 px-4 sm:px-6">
                    <CardTitle className="text-elec-light text-base sm:text-lg flex items-center gap-2">
                      <PoundSterling className="w-5 h-5 text-elec-yellow" />
                      Standard VAT Scheme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-4 sm:px-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-elec-light/70">
                        <span>Output VAT charged</span>
                        <span className="font-medium text-elec-light">{currency(standardOutputVat)}</span>
                      </div>
                      <div className="flex justify-between text-elec-light/70">
                        <span>Input VAT reclaimable</span>
                        <span className="font-medium text-green-400">-{currency(standardInputVat)}</span>
                      </div>
                      <div className="h-px bg-elec-yellow/20 my-2"></div>
                      <div className="flex justify-between font-semibold text-elec-light">
                        <span>Net VAT payable</span>
                        <span className="text-lg">{currency(standardVatPayable)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardHeader className="pb-3 px-4 sm:px-6">
                    <CardTitle className="text-elec-light text-base sm:text-lg flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-elec-yellow" />
                      Flat Rate VAT Scheme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-4 sm:px-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-elec-light/70">
                        <span>VAT-inclusive turnover</span>
                        <span className="font-medium text-elec-light">{currency(annualRevenue * (1 + vatRate/100))}</span>
                      </div>
                      <div className="flex justify-between text-elec-light/70">
                        <span>Flat rate applied</span>
                        <span className="font-medium text-elec-light">{flatRate}%</span>
                      </div>
                      <div className="h-px bg-elec-yellow/20 my-2"></div>
                      <div className="flex justify-between font-semibold text-elec-light">
                        <span>VAT payable</span>
                        <span className="text-lg">{currency(frsVatPayable)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={`border-2 ${diff > 0 ? "bg-red-950/20 border-red-500/30" : "bg-green-950/20 border-green-500/30"}`}>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-elec-light text-lg sm:text-xl flex items-center gap-2">
                    {diff > 0 ? (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    )}
                    Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg bg-card">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Annual difference</p>
                      <p className={`text-3xl sm:text-4xl font-bold ${diff > 0 ? "text-red-400" : "text-green-400"}`}>
                        {diff > 0 ? "+" : ""}{currency(diff)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-elec-light/70 mb-1">Better choice</p>
                      <p className="text-xl sm:text-2xl font-semibold text-elec-yellow">
                        {diff > 0 ? "Standard VAT" : "Flat Rate VAT"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-elec-light/90 space-y-2">
                    {diff > 0 ? (
                      <p>
                        💡 <strong>Standard VAT</strong> is better for your business. You can reclaim {currency(standardInputVat)} 
                        in input VAT on materials, saving you {currency(Math.abs(diff))} annually compared to Flat Rate.
                      </p>
                    ) : (
                      <p>
                        💡 <strong>Flat Rate VAT</strong> is better for your business. Despite not reclaiming input VAT, 
                        you save {currency(Math.abs(diff))} annually with simplified accounting and the lower flat rate percentage.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <InfoBox
                title="Understanding the schemes"
                points={[
                  "Standard VAT: Charge 20% VAT, reclaim VAT on purchases. More admin, better for materials-heavy work.",
                  "Flat Rate VAT: Pay flat % (e.g., 12.5%) on turnover. Simpler admin, better for labour-heavy work.",
                  "Consider your labour/materials split, admin capacity, and annual turnover when choosing.",
                ]}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default VATSchemeComparison;
