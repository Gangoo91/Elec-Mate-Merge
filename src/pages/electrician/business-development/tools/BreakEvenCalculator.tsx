import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { MobileInput } from "@/components/ui/mobile-input";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Zap,
  PoundSterling,
  Clock,
  Wrench
} from "lucide-react";

const currency = (n: number) => `£${n.toFixed(2)}`;

const BreakEvenCalculator: React.FC = () => {
  const [annualOverheads, setAnnualOverheads] = React.useState(32000);
  const [chargeableHours, setChargeableHours] = React.useState(1200);
  const [labourCostHr, setLabourCostHr] = React.useState(28);
  const [materialShare, setMaterialShare] = React.useState(30);
  const [materialMarkup, setMaterialMarkup] = React.useState(18);
  const [targetMargin, setTargetMargin] = React.useState(20);
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState(20);
  const [exampleHours, setExampleHours] = React.useState(4);
  const [exampleMats, setExampleMats] = React.useState(130);

  const overheadPerHour = annualOverheads / Math.max(1, chargeableHours);
  const breakEvenHr = labourCostHr + overheadPerHour;
  const breakEvenDay = breakEvenHr * 8;

  // Example job pricing
  const exLabourCost = breakEvenHr * exampleHours;
  const exMatsSell = exampleMats * (1 + materialMarkup / 100);
  const basePrice = exLabourCost + exMatsSell;
  const targetUplift = targetMargin > 0 ? basePrice / (1 - targetMargin / 100) : basePrice;
  const priceExVat = targetUplift;
  const priceIncVat = vatRegistered ? priceExVat * (1 + vatRate / 100) : priceExVat;

  // Health checks
  const marginHealth = targetMargin >= 20 ? 'excellent' : targetMargin >= 15 ? 'good' : targetMargin >= 10 ? 'acceptable' : 'low';
  const utilisationRate = (chargeableHours / 2080) * 100; // 2080 = 52 weeks * 40 hours
  const utilisationHealth = utilisationRate >= 60 ? 'excellent' : utilisationRate >= 50 ? 'good' : utilisationRate >= 40 ? 'acceptable' : 'low';
  const markupHealth = materialMarkup >= 25 ? 'excellent' : materialMarkup >= 18 ? 'good' : materialMarkup >= 10 ? 'acceptable' : 'low';

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'good': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'acceptable': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-elec-light/60';
    }
  };

  return (
    <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-5xl overflow-x-hidden">
      <Helmet>
        <title>Break-even & Margin Guard | Electrician UK</title>
        <meta name="description" content="Work out your break-even point and minimum margin to protect profit on electrical jobs in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/break-even" />
      </Helmet>

      <header className="mb-4 sm:mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-elec-light mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3">
          <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
          Break-even & Margin Guard
        </h1>
        <p className="text-sm sm:text-base text-elec-light/80 px-2">
          Know the minimum price you must charge to cover costs and lock in your target margin.
        </p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <WhyThisMatters
        points={[
          "Prevents underquoting and protects target margins on every job.",
          "Adapts instantly to VAT registration and material markup changes.",
          "Shows real-time sensitivity to utilisation and overhead variations.",
        ]}
      />

      {/* Quick Health Dashboard */}
      <Card className="mt-4 sm:mt-6 bg-gradient-to-br from-elec-card to-elec-dark/50 border-elec-yellow/30 animate-fade-in">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Business Health Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Margin Health */}
            <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-elec-light/70">Target Margin</span>
                <Badge className={getHealthColor(marginHealth) + " text-xs"}>
                  {marginHealth.charAt(0).toUpperCase() + marginHealth.slice(1)}
                </Badge>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-light">{targetMargin}%</div>
              <Progress value={Math.min(targetMargin * 4, 100)} className="mt-2 h-2" />
            </div>

            {/* Utilisation */}
            <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-elec-light/70">Utilisation</span>
                <Badge className={getHealthColor(utilisationHealth) + " text-xs"}>
                  {utilisationHealth.charAt(0).toUpperCase() + utilisationHealth.slice(1)}
                </Badge>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-light">{utilisationRate.toFixed(0)}%</div>
              <Progress value={utilisationRate} className="mt-2 h-2" />
            </div>

            {/* Material Markup */}
            <div className="p-3 sm:p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-elec-light/70">Material Markup</span>
                <Badge className={getHealthColor(markupHealth) + " text-xs"}>
                  {markupHealth.charAt(0).toUpperCase() + markupHealth.slice(1)}
                </Badge>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-light">{materialMarkup}%</div>
              <Progress value={Math.min(materialMarkup * 3, 100)} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Inputs */}
      <section className="mt-4 sm:mt-6 grid gap-4 sm:gap-6">
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Business Settings
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-elec-light/60">
              Set your annual overheads and working capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <MobileInput
                  label="Annual Overheads (ex VAT)"
                  value={annualOverheads ?? ''}
                  onChange={(e) => setAnnualOverheads(Number(e.target.value) || 0)}
                  type="text"
                  inputMode="decimal"
                  unit="£"
                  hint="Insurance, van, tools, software, rent, etc."
                />
              </div>
              <div className="space-y-2">
                <MobileInput
                  label="Chargeable Hours / Year"
                  value={chargeableHours ?? ''}
                  onChange={(e) => setChargeableHours(Number(e.target.value) || 1)}
                  type="text"
                  inputMode="numeric"
                  hint={`Current utilisation: ${utilisationRate.toFixed(0)}%`}
                />
              </div>
            </div>

            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-xs sm:text-sm text-elec-light/80">
                <strong>Tip:</strong> Typical utilisation is 50-60% (1,040-1,248 hours/year). 
                The rest covers holidays, admin, quotes, and downtime.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Labour & Materials */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Labour & Materials
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-elec-light/60">
              Configure your cost structure and pricing strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <MobileInput
                label="Labour Cost / Hour"
                value={labourCostHr ?? ''}
                onChange={(e) => setLabourCostHr(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="£"
                hint="Your hourly cost inc. NI, pension"
              />
              <MobileInput
                label="Materials Share %"
                value={materialShare ?? ''}
                onChange={(e) => setMaterialShare(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="%"
                hint="Typical job materials %"
              />
              <MobileInput
                label="Material Markup %"
                value={materialMarkup ?? ''}
                onChange={(e) => setMaterialMarkup(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="%"
                hint="Add for time, waste, storage"
              />
            </div>

            {materialMarkup < 15 && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs sm:text-sm">
                  <strong>Warning:</strong> Material markup below 15% may not cover procurement time, 
                  wastage, and storage costs. Industry standard is 18-25%.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Margin & VAT */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Margin & VAT Settings
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-elec-light/60">
              Set your profit margin target and VAT configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <MobileInput
                label="Target Margin %"
                value={targetMargin ?? ''}
                onChange={(e) => setTargetMargin(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="%"
                hint="Aim for 15-25% for sustainability"
              />
              <MobileInput
                label="VAT Rate %"
                value={vatRate ?? ''}
                onChange={(e) => setVatRate(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="%"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-elec-light">VAT Registered?</label>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30 w-full">
                  <button 
                    className={`flex-1 h-12 px-4 font-medium transition-all touch-manipulation ${
                      vatRegistered 
                        ? "bg-elec-yellow text-black" 
                        : "text-elec-yellow hover:bg-elec-yellow/10"
                    }`} 
                    onClick={() => setVatRegistered(true)}
                  >
                    Yes
                  </button>
                  <button 
                    className={`flex-1 h-12 px-4 font-medium transition-all touch-manipulation ${
                      !vatRegistered 
                        ? "bg-elec-yellow text-black" 
                        : "text-elec-yellow hover:bg-elec-yellow/10"
                    }`} 
                    onClick={() => setVatRegistered(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {targetMargin < 10 && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs sm:text-sm">
                  <strong>Critical:</strong> Target margin below 10% leaves little room for 
                  unexpected costs or business growth. Consider raising to 15-20%.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Break-even Results */}
        <Card className="bg-gradient-to-br from-elec-card to-elec-dark/50 border-elec-yellow/30 animate-scale-in">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Your Break-Even Rates
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-elec-light/60">
              Minimum rates to cover all costs before profit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-lg bg-elec-dark/50 border border-green-500/20">
                <div className="text-xs text-elec-light/60 mb-1">Overhead / Hour</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-400">{currency(overheadPerHour)}</div>
              </div>
              <div className="p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/30">
                <div className="text-xs text-elec-light/60 mb-1">Break-Even / Hour</div>
                <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">{currency(breakEvenHr)}</div>
              </div>
              <div className="p-4 rounded-lg bg-elec-dark/50 border border-blue-500/20">
                <div className="text-xs text-elec-light/60 mb-1">Break-Even Day (8h)</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{currency(breakEvenDay)}</div>
              </div>
            </div>

            <Alert className="bg-green-500/10 border-green-500/30">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-xs sm:text-sm text-elec-light/80">
                <strong>Key Insight:</strong> Any quote below {currency(breakEvenHr)}/hour will lose money. 
                Add your {targetMargin}% target margin on top to hit {currency(breakEvenHr * (1 + targetMargin / 100))}/hour.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Example Job Calculator */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-elec-light flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              Example Job Pricing
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-elec-light/60">
              Test your pricing on a sample job with your target margin built in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <MobileInput
                label="Labour Hours"
                value={exampleHours ?? ''}
                onChange={(e) => setExampleHours(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                hint="Time on-site + travel"
              />
              <MobileInput
                label="Materials Cost (ex VAT)"
                value={exampleMats ?? ''}
                onChange={(e) => setExampleMats(Number(e.target.value) || 0)}
                type="text"
                inputMode="decimal"
                unit="£"
                hint="Your cost, not selling price"
              />
            </div>

            {/* Breakdown */}
            <div className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/20 space-y-3">
              <h4 className="font-semibold text-elec-light text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-elec-yellow" />
                Price Breakdown
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-elec-light/70">
                  <span>Labour cost ({exampleHours}h × {currency(breakEvenHr)})</span>
                  <strong className="text-elec-light">{currency(exLabourCost)}</strong>
                </div>
                <div className="flex justify-between text-elec-light/70">
                  <span>Materials sell ({currency(exampleMats)} + {materialMarkup}%)</span>
                  <strong className="text-elec-light">{currency(exMatsSell)}</strong>
                </div>
                <div className="flex justify-between text-elec-light/70">
                  <span>Base price (before margin)</span>
                  <strong className="text-elec-light">{currency(basePrice)}</strong>
                </div>
                <div className="flex justify-between text-elec-light/70 pt-2 border-t border-elec-yellow/20">
                  <span>Target margin uplift ({targetMargin}%)</span>
                  <strong className="text-green-400">+{currency(targetUplift - basePrice)}</strong>
                </div>
              </div>
            </div>

            {/* Final Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30">
                <div className="text-xs text-green-300/80 mb-1">Quote Price (ex VAT)</div>
                <div className="text-3xl sm:text-4xl font-bold text-green-400">{currency(priceExVat)}</div>
                <div className="text-xs text-green-300/60 mt-1">Includes {targetMargin}% margin</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30">
                <div className="text-xs text-elec-light/60 mb-1">
                  Total Price {vatRegistered ? "(inc VAT)" : ""}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-elec-yellow">{currency(priceIncVat)}</div>
                {vatRegistered && (
                  <div className="text-xs text-elec-light/60 mt-1">
                    VAT: {currency(priceIncVat - priceExVat)}
                  </div>
                )}
              </div>
            </div>

            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-xs sm:text-sm text-elec-light/80">
                <strong>Pro Tip:</strong> This quote protects your {targetMargin}% margin. 
                If competing on price, know that anything below {currency(basePrice)} will eat into profit.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default BreakEvenCalculator;
