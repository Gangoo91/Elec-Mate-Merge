import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Target,
  Info,
  RotateCcw,
  Save,
  Link as LinkIcon,
  Calculator,
  PoundSterling,
  Percent,
  TrendingUp,
  ChevronDown,
  BookOpen,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
  const config = CALCULATOR_CONFIG["business"];
  const { toast } = useToast();

  const [calculated, setCalculated] = useState(false);
  const [inputs, setInputs] = useState<PricingInputs>({
    materialsCost: 1100,
    labourHours: 8,
    hourlyRate: 52,
    overheadPercent: 22,
    profitMarginPercent: 18,
    discountPercent: 0,
  });

  const [vatRegistered, setVatRegistered] = useState<boolean>(true);
  const [vatRate, setVatRate] = useState<number>(20);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const validateInput = (value: number, field: keyof PricingInputs): number => {
    const ranges = {
      materialsCost: { min: 0, max: 50000 },
      labourHours: { min: 0, max: 100 },
      hourlyRate: { min: 15, max: 150 },
      overheadPercent: { min: 0, max: 50 },
      profitMarginPercent: { min: 5, max: 50 },
      discountPercent: { min: 0, max: 30 },
    };

    const range = ranges[field];
    return Math.max(range.min, Math.min(range.max, value));
  };

  const update = (k: keyof PricingInputs, v: string) => {
    setCalculated(false);
    const parsed = parseFloat(v) || 0;
    setInputs((p) => ({ ...p, [k]: validateInput(isFinite(parsed) ? parsed : 0, k) }));
  };

  const overheadOptions = [
    { value: "10", label: "10% - Minimal" },
    { value: "15", label: "15% - Low" },
    { value: "20", label: "20% - Standard" },
    { value: "25", label: "25% - Average" },
    { value: "30", label: "30% - High" },
  ];

  const marginOptions = [
    { value: "10", label: "10% - Entry" },
    { value: "15", label: "15% - Low" },
    { value: "20", label: "20% - Standard" },
    { value: "25", label: "25% - Good" },
    { value: "30", label: "30% - Premium" },
    { value: "40", label: "40% - High-end" },
  ];

  const vatOptions = [
    { value: "0", label: "0% - Not VAT Registered" },
    { value: "5", label: "5% - Reduced Rate" },
    { value: "20", label: "20% - Standard Rate" },
  ];

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
    setInputs({
      materialsCost: 1100,
      labourHours: 8,
      hourlyRate: 52,
      overheadPercent: 22,
      profitMarginPercent: 18,
      discountPercent: 0,
    });
    setVatRegistered(true);
    setVatRate(20);
    setCalculated(false);
  };

  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  };

  const isValid = inputs.materialsCost > 0 || inputs.labourHours > 0;

  const getMarginStatus = () => {
    if (result.achievedMargin >= 25)
      return { color: "text-green-400", label: "Excellent", bg: "bg-green-500/10 border-green-500/30" };
    if (result.achievedMargin >= 15)
      return { color: "text-amber-400", label: "Good", bg: "bg-amber-500/10 border-amber-500/30" };
    return { color: "text-red-400", label: "Low", bg: "bg-red-500/10 border-red-500/30" };
  };

  const marginStatus = getMarginStatus();

  const chartData = useMemo(
    () => [
      { name: "Materials", value: inputs.materialsCost },
      { name: "Labour", value: result.labourCost },
      { name: "Overhead", value: result.overheadCost },
      { name: "Profit", value: result.priceBeforeDiscount - result.subtotalNet },
      { name: "Discount", value: -(result.priceBeforeDiscount - result.netAfterDiscount) },
      { name: "VAT", value: result.vatAmount },
    ],
    [inputs.materialsCost, result]
  );

  return (
    <div className="min-h-screen bg-background pt-safe pb-safe">
      <div className="space-y-4 px-4 py-6 animate-fade-in">
        <Helmet>
          <title>Pricing Strategy Calculator UK | Electrician Tools</title>
        <meta
          name="description"
          content="Build profitable UK quotes with cost, overhead, margin and VAT handled. Mobile-friendly and fast."
        />
        <link rel="canonical" href="/electrician/business-development/tools/pricing-strategy" />
      </Helmet>

      <CalculatorCard
        category="business"
        title="Pricing Strategy Calculator"
        description="Build profitable quotes with cost, overhead, margin and VAT"
        badge="Pricing"
      >
        {/* Job Costs Section */}
        <div className="flex items-center gap-2 mb-3">
          <PoundSterling className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Job Costs</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Materials Cost"
            unit="£"
            type="text"
            inputMode="decimal"
            value={String(inputs.materialsCost)}
            onChange={(val) => update("materialsCost", val)}
            placeholder="e.g., 1100"
            hint="Total materials & parts"
          />

          <CalculatorInput
            label="Labour Hours"
            unit="hrs"
            type="text"
            inputMode="decimal"
            value={String(inputs.labourHours)}
            onChange={(val) => update("labourHours", val)}
            placeholder="e.g., 8"
            hint="Time on-site"
          />
        </div>

        <CalculatorInput
          label="Hourly Rate"
          unit="£/hr"
          type="text"
          inputMode="decimal"
          value={String(inputs.hourlyRate)}
          onChange={(val) => update("hourlyRate", val)}
          placeholder="e.g., 52"
          hint="Your charge-out rate (UK avg: £45-65)"
        />

        <Link
          to="/electrician/business-development/tools/hourly-rate"
          className="text-blue-400 text-xs inline-flex items-center gap-1 hover:underline mt-1"
        >
          <LinkIcon className="h-3 w-3" /> Calculate your ideal hourly rate
        </Link>

        {/* Business Strategy Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Target className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Business Strategy</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Overhead %"
            value={String(inputs.overheadPercent)}
            onChange={(val) => update("overheadPercent", val)}
            options={overheadOptions}
            hint="Business running costs"
          />

          <CalculatorSelect
            label="Target Margin %"
            value={String(inputs.profitMarginPercent)}
            onChange={(val) => update("profitMarginPercent", val)}
            options={marginOptions}
            hint="Profit on top"
          />
        </div>

        <CalculatorInput
          label="Discount"
          unit="%"
          type="text"
          inputMode="decimal"
          value={String(inputs.discountPercent)}
          onChange={(val) => update("discountPercent", val)}
          placeholder="e.g., 0"
          hint="Optional discount for repeat customers"
        />

        {/* VAT Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Percent className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">VAT Configuration</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm text-white">VAT Registered</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setVatRegistered(true);
                  setVatRate(20);
                  setCalculated(false);
                }}
                className={cn(
                  "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                  vatRegistered ? "text-black" : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  vatRegistered
                    ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                    : undefined
                }
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setVatRegistered(false);
                  setVatRate(0);
                  setCalculated(false);
                }}
                className={cn(
                  "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                  !vatRegistered ? "text-black" : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  !vatRegistered
                    ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                    : undefined
                }
              >
                No
              </button>
            </div>
          </div>

          {vatRegistered && (
            <CalculatorSelect
              label="VAT Rate"
              value={String(vatRate)}
              onChange={(val) => {
                setVatRate(parseFloat(val));
                setCalculated(false);
              }}
              options={vatOptions.filter((o) => o.value !== "0")}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={calculatePricing}
            disabled={!isValid}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid ? "text-black" : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={
              isValid
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate Pricing
          </button>
          <button
            onClick={saveScenario}
            disabled={!calculated}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={reset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {calculated && isValid && (
        <div className="space-y-4 animate-fade-in">
          {/* Margin Status */}
          <div className={cn("flex items-center gap-2 p-3 rounded-xl border", marginStatus.bg)}>
            {result.achievedMargin >= 15 ? (
              <TrendingUp className={cn("h-5 w-5", marginStatus.color)} />
            ) : (
              <AlertCircle className={cn("h-5 w-5", marginStatus.color)} />
            )}
            <span className={cn("font-medium text-sm", marginStatus.color)}>
              {marginStatus.label} Margin - {result.achievedMargin.toFixed(1)}% Achieved Profit
            </span>
          </div>

          {/* Primary Result Cards */}
          <div className="grid grid-cols-2 gap-4">
            <CalculatorResult category="business">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Net Price (ex VAT)</p>
                <div
                  className="text-3xl font-bold"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {formatCurrency(result.netAfterDiscount)}
                </div>
                <p className="text-xs text-white mt-1">Quote this to customer</p>
              </div>
            </CalculatorResult>

            {vatRegistered && (
              <CalculatorResult category="business">
                <div className="text-center">
                  <p className="text-sm text-white mb-1">Total inc VAT</p>
                  <div className="text-3xl font-bold text-green-400">
                    {formatCurrency(result.totalGross)}
                  </div>
                  <p className="text-xs text-white mt-1">
                    VAT: {formatCurrency(result.vatAmount)}
                  </p>
                </div>
              </CalculatorResult>
            )}
          </div>

          {/* Cost Breakdown Grid */}
          <CalculatorResult category="business">
            <ResultsGrid columns={3}>
              <ResultValue
                label="Materials"
                value={formatCurrency(inputs.materialsCost)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Labour"
                value={formatCurrency(result.labourCost)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Overhead"
                value={formatCurrency(result.overheadCost)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Base Cost"
                value={formatCurrency(result.subtotalNet)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Profit Added"
                value={formatCurrency(result.priceBeforeDiscount - result.subtotalNet)}
                category="business"
                size="sm"
              />
              {inputs.discountPercent > 0 && (
                <ResultValue
                  label="Discount"
                  value={`-${formatCurrency(result.priceBeforeDiscount - result.netAfterDiscount)}`}
                  category="business"
                  size="sm"
                />
              )}
            </ResultsGrid>
          </CalculatorResult>

          {/* Step-by-Step Breakdown */}
          <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Detailed Calculation Breakdown
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/80 transition-transform duration-200",
                    showBreakdown && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">1. Materials Cost</span>
                    <span className="text-white font-mono font-semibold">
                      {formatCurrency(inputs.materialsCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">
                      2. Labour ({inputs.labourHours}h × {formatCurrency(inputs.hourlyRate)}/h)
                    </span>
                    <span className="text-white font-mono font-semibold">
                      + {formatCurrency(result.labourCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">
                      3. Overhead ({inputs.overheadPercent}% of base)
                    </span>
                    <span className="text-white font-mono font-semibold">
                      + {formatCurrency(result.overheadCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium bg-white/5 px-2 rounded">
                    <span className="text-white">= Base Cost Total</span>
                    <span className="text-white font-mono">{formatCurrency(result.subtotalNet)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">
                      4. Profit Margin ({inputs.profitMarginPercent}%)
                    </span>
                    <span className="text-green-400 font-mono font-semibold">
                      + {formatCurrency(result.priceBeforeDiscount - result.subtotalNet)}
                    </span>
                  </div>
                  {inputs.discountPercent > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/80">5. Discount ({inputs.discountPercent}%)</span>
                      <span className="text-red-400 font-mono font-semibold">
                        - {formatCurrency(result.priceBeforeDiscount - result.netAfterDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 font-medium bg-blue-500/10 px-2 rounded">
                    <span className="text-blue-300">= Net Price (ex VAT)</span>
                    <span className="text-blue-400 font-mono text-base">
                      {formatCurrency(result.netAfterDiscount)}
                    </span>
                  </div>
                  {vatRegistered && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-white/80">6. VAT ({vatRate}%)</span>
                        <span className="text-white font-mono font-semibold">
                          + {formatCurrency(result.vatAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 font-medium bg-green-500/10 px-2 rounded">
                        <span className="text-green-300">= Total (inc VAT)</span>
                        <span className="text-green-400 font-mono text-base">
                          {formatCurrency(result.totalGross)}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Chart */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-sm text-white mb-3">Cost to Price Visualization</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.filter((d) => d.value !== 0)} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="name"
                          stroke="rgba(255,255,255,0.6)"
                          fontSize={10}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v) => `£${v}`} fontSize={10} />
                        <Tooltip
                          formatter={(v: number) => [formatCurrency(Math.abs(v)), "Amount"]}
                          contentStyle={{
                            background: "#1a1f2e",
                            border: "1px solid rgba(96, 165, 250, 0.3)",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#60a5fa"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Low Margin Warning */}
          {result.achievedMargin < 15 && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Low Margin Warning</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">*</span>
                  Consider increasing your hourly rate or reducing discount
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">*</span>
                  Review overhead allocation for accuracy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">*</span>
                  Aim for 20-25% margin for sustainable business growth
                </li>
              </ul>
            </div>
          )}

          {/* Guidance Section */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    How to Use This Calculator
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/80 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-1">1. Enter Your Job Costs</h5>
                    <p className="text-blue-200/70">
                      Input materials cost, estimated hours, and hourly rate. Be realistic with labour
                      hours to maintain profitability.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-1">2. Set Business Strategy</h5>
                    <p className="text-blue-200/70">
                      Typical overhead: 20-25% for small businesses. Target margin: 15-25% depending on
                      competition.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-1">3. Configure VAT</h5>
                    <p className="text-blue-200/70">
                      Most electrical work is 20% VAT. Some energy-efficiency installations qualify for 5%
                      reduced rate.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-3 mt-4">
                    <h5 className="font-medium text-blue-300 mb-2">Example: Consumer Unit Replacement</h5>
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                      £800 materials + 6h @ £50/hr (£300) + 22% overhead (£242) = £1,342 base
                      <br />+ 18% margin (£242) = <strong className="text-blue-300">£1,584 net</strong>
                      <br />+ 20% VAT (£317) = <strong className="text-blue-300">£1,901 total</strong>
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Prompt to Calculate */}
      {!calculated && (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
          <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-white text-lg font-semibold mb-2">Ready to Calculate</h3>
          <p className="text-white text-sm">
            Enter your job costs and business strategy above, then click "Calculate Pricing" to see your
            detailed breakdown.
          </p>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                Pricing Reference Guide
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Overhead Guidelines</p>
                <p className="text-amber-200/70">Start-up: 25-30%</p>
                <p className="text-amber-200/70">Small business: 20-25%</p>
                <p className="text-amber-200/70">Established: 15-20%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Margin Targets</p>
                <p className="text-amber-200/70">Competitive: 15-20%</p>
                <p className="text-amber-200/70">Standard: 20-25%</p>
                <p className="text-amber-200/70">Premium: 25-35%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">VAT Rates (2025)</p>
                <p className="text-amber-200/70">Standard: 20%</p>
                <p className="text-amber-200/70">Reduced: 5%</p>
                <p className="text-amber-200/70">Threshold: £90,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Discounts</p>
                <p className="text-amber-200/70">Repeat customer: 5-10%</p>
                <p className="text-amber-200/70">Large job: 10-15%</p>
                <p className="text-amber-200/70">Max recommended: 20%</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <p className="text-xs text-amber-200/60">
                <Info className="h-3 w-3 inline mr-1" />
                Prices are estimates. Verify reduced VAT eligibility where applicable. CIS deductions may
                apply for subcontract labour. All designs must comply with BS 7671:2018+A3:2024.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </div>
    </div>
  );
};

export default PricingStrategyCalculator;
