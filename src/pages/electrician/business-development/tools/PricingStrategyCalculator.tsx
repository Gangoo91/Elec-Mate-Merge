import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Target, Info, RefreshCw, Save, Link as LinkIcon } from "lucide-react";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { VATCalculator } from "@/components/electrician/business-development/job-profitability/VATCalculator";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface PricingInputs {
  materialsCost: number;
  labourHours: number;
  hourlyRate: number;
  overheadPercent: number;
  profitMarginPercent: number;
  discountPercent: number;
}

const STORAGE_KEY = "pricing_strategy_scenarios";

const PricingStrategyCalculator = () => {
  const { toast } = useToast();
  const [calculated, setCalculated] = useState(false);
  const [inputs, setInputs] = useState<PricingInputs>({
    materialsCost: 850,
    labourHours: 8,
    hourlyRate: 45,
    overheadPercent: 20,
    profitMarginPercent: 15,
    discountPercent: 0,
  });

  const [vatRegistered, setVatRegistered] = useState<boolean>(true);
  const [vatRate, setVatRate] = useState<number>(20);

  const update = (k: keyof PricingInputs, v: number) => {
    setCalculated(false);
    setInputs((p) => ({ ...p, [k]: isFinite(v) ? v : 0 }));
  };

  const overheadOptions = [10, 15, 20, 25, 30].map((v) => ({ value: String(v), label: `${v}%` }));
  const marginOptions = [10, 15, 20, 25, 30, 40].map((v) => ({ value: String(v), label: `${v}%` }));

  const result = useMemo(() => {
    const labourCost = inputs.labourHours * inputs.hourlyRate;
    const baseCost = inputs.materialsCost + labourCost;
    const overheadCost = baseCost * (inputs.overheadPercent / 100);
    const subtotalNet = baseCost + overheadCost;
    const priceBeforeDiscount = subtotalNet * (1 + inputs.profitMarginPercent / 100);
    const netAfterDiscount = priceBeforeDiscount * (1 - inputs.discountPercent / 100);
    const vatAmount = vatRegistered ? netAfterDiscount * (vatRate / 100) : 0;
    const totalGross = netAfterDiscount + vatAmount;

    const achievedMargin = baseCost > 0 ? ((netAfterDiscount - baseCost) / netAfterDiscount) * 100 : 0;

    return {
      labourCost,
      overheadCost,
      subtotalNet,
      priceBeforeDiscount,
      netAfterDiscount,
      vatAmount,
      totalGross,
      achievedMargin,
    };
  }, [inputs, vatRate, vatRegistered]);

  const calculatePricing = () => {
    setCalculated(true);
    toast({
      title: "Pricing Strategy Calculated",
      description: "Your strategic pricing analysis has been updated.",
      variant: "success",
    });
  };

  const saveScenario = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inputs,
      vat: { vatRegistered, vatRate },
      result,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 20)));
    toast({ title: "Scenario saved", description: "Saved locally on this device.", variant: "success" });
  };

  const reset = () => {
    setInputs({ materialsCost: 0, labourHours: 0, hourlyRate: 0, overheadPercent: 20, profitMarginPercent: 15, discountPercent: 0 });
    setVatRegistered(false);
    setVatRate(0);
    setCalculated(false);
  };

  const currency = (n: number) => `£${(n || 0).toFixed(2)}`;

  const chartData = useMemo(() => [
    { name: "Materials", value: inputs.materialsCost },
    { name: "Labour", value: result.labourCost },
    { name: "Overhead", value: result.overheadCost },
    { name: "Net Price", value: result.netAfterDiscount },
    { name: "VAT", value: result.vatAmount },
    { name: "Total", value: result.totalGross },
  ], [inputs.materialsCost, result.labourCost, result.overheadCost, result.netAfterDiscount, result.vatAmount, result.totalGross]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>Pricing Strategy Calculator UK | Electrician Tools</title>
        <meta name="description" content="Build profitable UK quotes with cost, overhead, margin and VAT handled. Mobile-friendly and fast." />
        <link rel="canonical" href="/electrician/business-development/tools/pricing-strategy" />
      </Helmet>

      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Target className="h-8 w-8 text-elec-yellow" />
          Pricing Strategy Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Develop optimal pricing based on cost, overheads, target margin, discounts and VAT.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Pricing Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <MobileInput label="Materials Cost" value={String(inputs.materialsCost)} type="number" onChange={(e) => update("materialsCost", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Labour Hours" value={String(inputs.labourHours)} type="number" onChange={(e) => update("labourHours", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="h" />
              <MobileInput label="Hourly Rate" value={String(inputs.hourlyRate)} type="number" onChange={(e) => update("hourlyRate", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£/hr" />
              <div className="relative z-[var(--dropdown-z,50)]">
                <MobileSelectWrapper
                  label="Overhead %"
                  placeholder="Select overhead"
                  value={String(inputs.overheadPercent)}
                  onValueChange={(val) => update("overheadPercent", parseFloat(val))}
                  options={overheadOptions}
                />
              </div>
              <div className="flex items-end justify-between gap-2">
                <div className="flex-1 relative z-[var(--dropdown-z,50)]">
                  <MobileSelectWrapper
                    label="Target Margin %"
                    placeholder="Select margin"
                    value={String(inputs.profitMarginPercent)}
                    onValueChange={(val) => update("profitMarginPercent", parseFloat(val))}
                    options={marginOptions}
                  />
                </div>
                <Link to="/electrician/business-development/tools/hourly-rate" className="text-elec-yellow text-xs inline-flex items-center gap-1 mb-1">
                  <LinkIcon className="h-3 w-3" /> Get your rate
                </Link>
              </div>
              <MobileInput label="Discount %" value={String(inputs.discountPercent)} type="number" onChange={(e) => update("discountPercent", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="%" />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={calculatePricing} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Calculate Pricing Strategy
              </Button>
              <Button variant="secondary" onClick={saveScenario} className="gap-2">
                <Save className="h-4 w-4" /> Save Scenario
              </Button>
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Strategic Pricing Analysis
              {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!calculated ? (
              <div className="text-elec-light text-sm flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-elec-yellow" />
                Enter inputs then press Calculate to see a full breakdown and VAT totals.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Materials</div>
                    <div className="text-white text-lg font-semibold">{currency(inputs.materialsCost)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Labour</div>
                    <div className="text-white text-lg font-semibold">{currency(result.labourCost)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Overhead</div>
                    <div className="text-white text-lg font-semibold">{currency(result.overheadCost)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Net (after discount)</div>
                    <div className="text-elec-yellow text-lg font-semibold">{currency(result.netAfterDiscount)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">VAT</div>
                    <div className="text-white text-lg font-semibold">{currency(result.vatAmount)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Total (incl. VAT)</div>
                    <div className="text-white text-lg font-semibold">{currency(result.totalGross)}</div>
                  </div>
                </div>

                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Cost to Price Breakdown</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                        <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v) => `£${v}`} />
                        <Tooltip formatter={(v: any) => currency(v as number)} contentStyle={{ background: "#0b0f15", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <Bar dataKey="value" fill="#F7D154" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-elec-light text-xs mt-2">Achieved margin on net: {result.achievedMargin.toFixed(1)}%</div>
                </div>

                <VATCalculator
                  quoteAmount={result.netAfterDiscount}
                  vatRate={vatRate}
                  onVATRateChange={setVatRate}
                  vatRegistered={vatRegistered}
                  onVATRegistrationChange={setVatRegistered}
                />

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-200/80 text-xs">
                      Prices shown are estimates. Check reduced VAT eligibility (5%) where applicable and ensure BS 7671 compliant designs. CIS may apply for subcontract labour.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingStrategyCalculator;
