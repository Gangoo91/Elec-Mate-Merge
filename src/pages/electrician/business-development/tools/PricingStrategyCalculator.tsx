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
import WhyThisMatters from "@/components/common/WhyThisMatters";

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
    materialsCost: 1100, // Updated for 2025: 30% material inflation
    labourHours: 8,
    hourlyRate: 52, // Updated for 2025: market rate increase
    overheadPercent: 22, // Updated for 2025: increased business costs
    profitMarginPercent: 18, // Updated for 2025: competitive margin
    discountPercent: 0,
  });

  const [vatRegistered, setVatRegistered] = useState<boolean>(true);
  const [vatRate, setVatRate] = useState<number>(20);

  // Input validation helper
  const validateInput = (value: number, field: keyof PricingInputs): number => {
    const ranges = {
      materialsCost: { min: 0, max: 50000 },
      labourHours: { min: 0, max: 100 },
      hourlyRate: { min: 15, max: 150 },
      overheadPercent: { min: 0, max: 50 },
      profitMarginPercent: { min: 5, max: 50 },
      discountPercent: { min: 0, max: 30 }
    };
    
    const range = ranges[field];
    return Math.max(range.min, Math.min(range.max, value));
  };

  const update = (k: keyof PricingInputs, v: number) => {
    setCalculated(false);
    setInputs((p) => ({ ...p, [k]: validateInput(isFinite(v) ? v : 0, k) }));
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
    setInputs({ materialsCost: 0, labourHours: 0, hourlyRate: 0, overheadPercent: 22, profitMarginPercent: 18, discountPercent: 0 });
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

      <WhyThisMatters
        points={[
          "Connects materials, labour and overhead into a profitable selling price.",
          "Protects margins after discounts and VAT so quotes remain sustainable.",
          "Keeps pricing transparent and comparable for customers and teams."
        ]}
      />

      {/* Input Cards - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Job Costs */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Job Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MobileInput 
              label="Materials Cost" 
              value={String(inputs.materialsCost)} 
              type="number" 
              inputMode="decimal"
              onChange={(e) => update("materialsCost", parseFloat((e.target as HTMLInputElement).value || "0"))} 
              hint="Total cost of all materials, components, and consumables"
              unit="£" 
            />
            <MobileInput 
              label="Labour Hours" 
              value={String(inputs.labourHours)} 
              type="number" 
              inputMode="decimal"
              onChange={(e) => update("labourHours", parseFloat((e.target as HTMLInputElement).value || "0"))} 
              hint="Estimated time on-site to complete the work"
              unit="hrs" 
            />
            <MobileInput 
              label="Hourly Rate" 
              value={String(inputs.hourlyRate)} 
              type="number" 
              inputMode="decimal"
              onChange={(e) => update("hourlyRate", parseFloat((e.target as HTMLInputElement).value || "0"))} 
              hint="UK average for qualified electricians: £45-65/hr"
              unit="£/hr" 
            />
            <Link to="/electrician/business-development/tools/hourly-rate" className="text-elec-yellow text-sm inline-flex items-center gap-1 hover:underline">
              <LinkIcon className="h-3 w-3" /> Calculate your ideal hourly rate
            </Link>
          </CardContent>
        </Card>

        {/* Business Strategy */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Business Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative z-50">
              <MobileSelectWrapper
                label="Overhead %"
                placeholder="Select overhead"
                value={String(inputs.overheadPercent)}
                onValueChange={(val) => update("overheadPercent", parseFloat(val))}
                options={overheadOptions}
                hint="Typical: 20-25% for small businesses, 15-20% for established"
              />
            </div>
            <div className="relative z-40">
              <MobileSelectWrapper
                label="Target Margin %"
                placeholder="Select margin"
                value={String(inputs.profitMarginPercent)}
                onValueChange={(val) => update("profitMarginPercent", parseFloat(val))}
                options={marginOptions}
                hint="Standard: 15-25% depending on competition and job type"
              />
            </div>
            <MobileInput 
              label="Discount %" 
              value={String(inputs.discountPercent)} 
              type="number" 
              inputMode="decimal"
              onChange={(e) => update("discountPercent", parseFloat((e.target as HTMLInputElement).value || "0"))} 
              hint="Optional discount for repeat customers or larger jobs"
              unit="%" 
            />
          </CardContent>
        </Card>

        {/* VAT Configuration */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              VAT & Final Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VATCalculator
              quoteAmount={result.netAfterDiscount}
              vatRate={vatRate}
              onVATRateChange={setVatRate}
              vatRegistered={vatRegistered}
              onVATRegistrationChange={setVatRegistered}
            />
            <div className="pt-4">
              <Button onClick={calculatePricing} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 text-base font-semibold">
                Calculate Pricing Strategy
              </Button>
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" onClick={saveScenario} className="flex-1 gap-2">
                  <Save className="h-4 w-4" /> Save
                </Button>
                <Button variant="outline" onClick={reset} className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section - Full Width */}
      {calculated && (
        <div className="space-y-6">
          {/* Step-by-Step Calculation Breakdown */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <Info className="h-5 w-5 text-elec-yellow" />
                Pricing Calculation Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-elec-dark/30 rounded-lg p-4 sm:p-6">
                <h4 className="text-elec-light font-medium mb-4 text-base">How Your Price is Built</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                    <span className="text-elec-light/80">1. Materials Cost</span>
                    <span className="text-elec-light font-mono font-semibold">{currency(inputs.materialsCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                    <span className="text-elec-light/80">2. Labour Cost ({inputs.labourHours}h × {currency(inputs.hourlyRate)}/h)</span>
                    <span className="text-elec-light font-mono font-semibold">+ {currency(result.labourCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                    <span className="text-elec-light/80">3. Overhead ({inputs.overheadPercent}% of base costs)</span>
                    <span className="text-elec-light font-mono font-semibold">+ {currency(result.overheadCost)}</span>
                  </div>
                  <div className="h-px bg-elec-yellow/30 my-3"></div>
                  <div className="flex justify-between items-center py-2 font-medium">
                    <span className="text-elec-light">Total Base Cost</span>
                    <span className="text-elec-light font-mono text-base">{currency(result.subtotalNet)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                    <span className="text-elec-light/80">4. Profit Margin ({inputs.profitMarginPercent}%)</span>
                    <span className="text-elec-light font-mono font-semibold">+ {currency(result.priceBeforeDiscount - result.subtotalNet)}</span>
                  </div>
                  {inputs.discountPercent > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                      <span className="text-red-400/90">5. Discount ({inputs.discountPercent}%)</span>
                      <span className="text-red-400 font-mono font-semibold">- {currency(result.priceBeforeDiscount - result.netAfterDiscount)}</span>
                    </div>
                  )}
                  <div className="h-px bg-elec-yellow/30 my-3"></div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-elec-light/70 text-xs">Achieved Profit Margin</span>
                    <span className="text-elec-yellow text-sm font-semibold">{result.achievedMargin.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prominent Final Pricing Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-elec-yellow/10 border-elec-yellow/30">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="text-elec-yellow text-4xl sm:text-5xl font-bold mb-3">
                  {currency(result.netAfterDiscount)}
                </div>
                <div className="text-elec-light font-semibold text-lg mb-1">Net Price (ex VAT)</div>
                <div className="text-elec-light/70 text-sm">Quote this amount to your customer</div>
              </CardContent>
            </Card>
            
            {vatRegistered && (
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="text-center p-6 sm:p-8">
                  <div className="text-green-400 text-4xl sm:text-5xl font-bold mb-3">
                    {currency(result.totalGross)}
                  </div>
                  <div className="text-elec-light font-semibold text-lg mb-1">Total inc VAT ({vatRate}%)</div>
                  <div className="text-elec-light/70 text-sm">Final invoice amount</div>
                  <div className="text-elec-light/60 text-xs mt-2">VAT: {currency(result.vatAmount)}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chart Section */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-elec-light">Cost to Price Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.8)" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.8)" 
                        tickFormatter={(v) => `£${v}`}
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(v: any) => [currency(v as number), "Amount"]}
                        contentStyle={{ 
                          background: "#1a1f2e", 
                          border: "1px solid rgba(247, 209, 84, 0.3)",
                          borderRadius: "8px",
                          color: "white"
                        }}
                      />
                      <Bar dataKey="value" fill="#F7D154" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Mobile-friendly summary cards below chart */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="bg-elec-dark/50 rounded p-3 text-center">
                      <div className="text-elec-light/70 text-xs mb-1">{item.name}</div>
                      <div className="text-elec-light font-semibold text-sm">{currency(item.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidance Section */}
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Info className="h-5 w-5" />
                How to Use This Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-200/90 text-sm">
              <div>
                <h5 className="font-medium text-blue-200 mb-1">1. Enter Your Job Costs</h5>
                <p className="text-blue-200/80">Input your materials cost, estimated hours, and current hourly rate. Be realistic with labour hours to maintain profitability.</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-200 mb-1">2. Set Your Business Strategy</h5>
                <p className="text-blue-200/80">Typical overhead: 20-25% for small businesses, 15-20% for established ones. Target margin: 15-25% depending on competition and job complexity.</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-200 mb-1">3. Configure VAT</h5>
                <p className="text-blue-200/80">Most electrical work is 20% VAT. Some energy-efficiency installations qualify for 5% reduced rate under government schemes.</p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 mt-4">
                <h5 className="font-medium text-blue-200 mb-2">Example Scenario</h5>
                <p className="text-xs text-blue-200/80 leading-relaxed">
                  <strong>Consumer Unit Replacement:</strong><br />
                  £800 materials + 6 hours @ £50/hr (£300 labour) + 22% overhead (£242) = £1,342 base cost<br />
                  + 18% margin (£242) = <strong className="text-blue-300">£1,584 net price</strong><br />
                  + 20% VAT (£317) = <strong className="text-blue-300">£1,901 total invoice</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Notice */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-blue-200/80 text-sm">
                Prices shown are estimates for planning purposes. Always verify reduced VAT eligibility (5%) where applicable and ensure all designs comply with BS 7671:2018+A3:2024. CIS deductions may apply for subcontract labour.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Prompt to Calculate */}
      {!calculated && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="text-center py-12">
            <Info className="h-12 w-12 text-elec-yellow mx-auto mb-4 opacity-50" />
            <h3 className="text-elec-light text-xl font-semibold mb-2">Ready to Calculate</h3>
            <p className="text-elec-light/70 mb-6">Enter your job costs and business strategy above, then click "Calculate Pricing Strategy" to see your detailed breakdown.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PricingStrategyCalculator;
