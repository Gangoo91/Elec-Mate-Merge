import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Info, RefreshCw, Save } from "lucide-react";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Helmet } from "react-helmet";

interface ROIInputs {
  equipmentCost: number;
  installationCost: number;
  maintenancePerYear: number;
  lifespanYears: number;
  residualValue: number;
  annualSavings: number; // extra revenue or cost reduction
  utilisationRate: number; // % multiplier applied to savings
  discountRate: number; // % for NPV
}

interface ROIResults {
  capex: number;
  annualNetBenefit: number;
  simplePaybackYears: number | null;
  npv: number;
  npvLow: number; // sensitivity -5%
  npvHigh: number; // sensitivity +5%
  roiPercent: number;
  irrPercent: number | null;
  cashflowSeries: { year: number; cumulative: number }[];
}

const STORAGE_KEY = "equipment_roi_scenarios";

const EquipmentROICalculator = () => {
  const { toast } = useToast();
  const [calculated, setCalculated] = useState(false);
  const [inputs, setInputs] = useState<ROIInputs>({
    equipmentCost: 7500,
    installationCost: 800,
    maintenancePerYear: 200,
    lifespanYears: 5,
    residualValue: 500,
    annualSavings: 3000,
    utilisationRate: 85,
    discountRate: 5,
  });

  const update = (key: keyof ROIInputs, val: number) => {
    setCalculated(false);
    setInputs((p) => ({ ...p, [key]: isFinite(val) ? val : 0 }));
  };

  const discountOptions = [3, 5, 7, 10].map((v) => ({ value: String(v), label: `${v}%` }));

  const results: ROIResults = useMemo(() => {
    const capex = inputs.equipmentCost + inputs.installationCost;
    const annualNetBenefit = (inputs.annualSavings * (inputs.utilisationRate / 100)) - inputs.maintenancePerYear;

    // cumulative cashflow for simple payback and chart (no discount in simple payback)
    let cumulative = -capex;
    const series: { year: number; cumulative: number }[] = [{ year: 0, cumulative }];
    let payback: number | null = null;
    for (let y = 1; y <= inputs.lifespanYears; y++) {
      cumulative += annualNetBenefit;
      series.push({ year: y, cumulative });
      if (payback === null && cumulative >= 0) payback = y;
    }

    // NPV
    const r = inputs.discountRate / 100;
    let npv = -capex;
    for (let y = 1; y <= inputs.lifespanYears; y++) {
      npv += annualNetBenefit / Math.pow(1 + r, y);
    }
    npv += inputs.residualValue / Math.pow(1 + r, inputs.lifespanYears);

    const rLow = Math.max(r - 0.05, 0.001);
    const rHigh = r + 0.05;
    const calcNPV = (rate: number) => {
      let val = -capex;
      for (let y = 1; y <= inputs.lifespanYears; y++) val += annualNetBenefit / Math.pow(1 + rate, y);
      val += inputs.residualValue / Math.pow(1 + rate, inputs.lifespanYears);
      return val;
    };

    const npvLow = calcNPV(rLow);
    const npvHigh = calcNPV(rHigh);

    // ROI over life (simple total return vs cost)
    const totalReturn = annualNetBenefit * inputs.lifespanYears + inputs.residualValue;
    const roiPercent = capex > 0 ? ((totalReturn - capex) / capex) * 100 : 0;

    // IRR (bisection)
    const cashflows: number[] = [-capex, ...Array.from({ length: inputs.lifespanYears }, () => annualNetBenefit)];
    cashflows[cashflows.length - 1] += inputs.residualValue;
    const irr = (() => {
      let low = -0.9, high = 1.0; // -90% to 100%
      const npvAt = (rate: number) => cashflows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0);
      let mid = 0;
      for (let i = 0; i < 60; i++) {
        mid = (low + high) / 2;
        const v = npvAt(mid);
        if (Math.abs(v) < 0.01) break;
        if (v > 0) low = mid; else high = mid;
      }
      const candidate = mid * 100;
      return isFinite(candidate) ? candidate : null;
    })();

    return {
      capex,
      annualNetBenefit,
      simplePaybackYears: payback,
      npv,
      npvLow,
      npvHigh,
      roiPercent,
      irrPercent: irr,
      cashflowSeries: series,
    };
  }, [inputs]);

  const calculateROI = () => {
    setCalculated(true);
    toast({
      title: "ROI Calculated",
      description: "Your equipment investment analysis has been updated.",
      variant: "success",
    });
  };

  const saveScenario = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inputs,
      results,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 20)));
    toast({ title: "Scenario saved", description: "Saved locally on this device.", variant: "success" });
  };

  const reset = () => {
    setInputs({
      equipmentCost: 0,
      installationCost: 0,
      maintenancePerYear: 0,
      lifespanYears: 5,
      residualValue: 0,
      annualSavings: 0,
      utilisationRate: 100,
      discountRate: 5,
    });
    setCalculated(false);
  };

  useEffect(() => {
    // ensure dropdowns are above other content on mobile
    // (addresses transparency/z-index issue from context)
    document.documentElement.style.setProperty("--dropdown-z", "9999");
  }, []);

  const currency = (n: number) => `£${(n || 0).toFixed(2)}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>Equipment ROI Calculator UK | Electrician Tools</title>
        <meta name="description" content="Analyse ROI, NPV, IRR and payback for equipment purchases. UK electrician-focused, mobile friendly." />
        <link rel="canonical" href="/electrician/business-development/tools/equipment-roi" />
      </Helmet>

      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-elec-yellow" />
          Equipment ROI Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Analyse the return on investment for new equipment purchases.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
              ROI Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <MobileInput label="Equipment Cost" value={String(inputs.equipmentCost)} type="number" onChange={(e) => update("equipmentCost", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Installation Cost" value={String(inputs.installationCost)} type="number" onChange={(e) => update("installationCost", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Maintenance per Year" value={String(inputs.maintenancePerYear)} type="number" onChange={(e) => update("maintenancePerYear", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Lifespan" value={String(inputs.lifespanYears)} type="number" onChange={(e) => update("lifespanYears", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="years" />
              <MobileInput label="Residual Value (end)" value={String(inputs.residualValue)} type="number" onChange={(e) => update("residualValue", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Annual Savings/Revenue" value={String(inputs.annualSavings)} type="number" onChange={(e) => update("annualSavings", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="£" />
              <MobileInput label="Utilisation" value={String(inputs.utilisationRate)} type="number" onChange={(e) => update("utilisationRate", parseFloat((e.target as HTMLInputElement).value || "0"))} unit="%" />
              <div className="relative z-[var(--dropdown-z,50)]">
                <MobileSelectWrapper
                  label="Discount Rate"
                  placeholder="Select rate"
                  value={String(inputs.discountRate)}
                  onValueChange={(val) => update("discountRate", parseFloat(val))}
                  options={discountOptions}
                  hint="Used for NPV calculation"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={calculateROI} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Calculate ROI
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
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
              ROI Analysis
              {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!calculated ? (
              <div className="text-elec-light text-sm flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-elec-yellow" />
                Enter inputs then press Calculate to see your NPV, payback and ROI. All values are estimates.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">CapEx</div>
                    <div className="text-white text-lg font-semibold">{currency(results.capex)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Annual Net Benefit</div>
                    <div className="text-white text-lg font-semibold">{currency(results.annualNetBenefit)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">Simple Payback</div>
                    <div className="text-white text-lg font-semibold">{results.simplePaybackYears ?? "—"} years</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">NPV @ {inputs.discountRate}%</div>
                    <div className={`text-lg font-semibold ${results.npv >= 0 ? "text-elec-yellow" : "text-red-300"}`}>{currency(results.npv)}</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">ROI (life)</div>
                    <div className={`text-lg font-semibold ${results.roiPercent >= 0 ? "text-elec-yellow" : "text-red-300"}`}>{results.roiPercent.toFixed(1)}%</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-3">
                    <div className="text-elec-light text-xs">IRR</div>
                    <div className="text-white text-lg font-semibold">{results.irrPercent !== null ? `${results.irrPercent.toFixed(1)}%` : "—"}</div>
                  </div>
                </div>

                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Cumulative Cash Flow</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.cashflowSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                        <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v) => `£${v}`} />
                        <Tooltip formatter={(v: any) => currency(v as number)} labelFormatter={(l) => `Year ${l}`} contentStyle={{ background: "#0b0f15", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <Line type="monotone" dataKey="cumulative" stroke="#F7D154" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-200/80 text-xs">
                      NPV sensitivity: {currency(results.npvLow)} at lower rate, {currency(results.npvHigh)} at higher rate. Always verify assumptions for BS 7671 compliant installation planning and HMRC capital allowances.
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

export default EquipmentROICalculator;
