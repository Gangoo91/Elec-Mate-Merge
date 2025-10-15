import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Textarea } from "@/components/ui/textarea";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const currency = (n: number) => `£${n.toFixed(2)}`;

const QuoteVarianceTracker: React.FC = () => {
  const [quotedHours, setQuotedHours] = React.useState(16);
  const [actualHours, setActualHours] = React.useState(18);
  const [hourlyRate, setHourlyRate] = React.useState(55);
  const [quotedMats, setQuotedMats] = React.useState(300);
  const [actualMats, setActualMats] = React.useState(380);
  const [notes, setNotes] = React.useState("");
  
  // Calculations
  const hoursVar = actualHours - quotedHours;
  const hoursVarCost = hoursVar * hourlyRate;
  const matsVar = actualMats - quotedMats;
  const totalVar = hoursVarCost + matsVar;
  
  // Percentage calculations
  const hoursVarPercent = quotedHours > 0 ? ((hoursVar / quotedHours) * 100).toFixed(1) : '0';
  const matsVarPercent = quotedMats > 0 ? ((matsVar / quotedMats) * 100).toFixed(1) : '0';
  const quotedTotal = (quotedHours * hourlyRate) + quotedMats;
  const totalVarPercent = quotedTotal > 0 ? ((totalVar / quotedTotal) * 100).toFixed(1) : '0';
  
  // Variance indicators
  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 0.01) return "text-muted-foreground";
    return variance > 0 ? "text-destructive" : "text-green-500";
  };
  
  const getVarianceIcon = (variance: number) => {
    if (Math.abs(variance) < 0.01) return <AlertCircle className="h-4 w-4" />;
    return variance > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

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

      <section className="mt-6 grid gap-4 sm:gap-6">
        <WhyThisMatters
          points={[
            "Track exactly where your quotes differ from reality - labour overruns, material cost changes, or scope creep.",
            "Build a feedback loop to sharpen your estimates over time and protect your margins.",
            "Spot patterns in variance (e.g., certain job types always overrun) so you can price more accurately.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-elec-light text-lg sm:text-xl">Quote Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MobileInput
                label="Quoted Hours"
                type="number"
                inputMode="decimal"
                value={quotedHours.toString()}
                onChange={(e) => setQuotedHours(Math.max(0, Number(e.target.value) || 0))}
                hint="Hours in your original quote"
                min={0}
                step={0.5}
                placeholder="16"
              />
              <MobileInput
                label="Actual Hours"
                type="number"
                inputMode="decimal"
                value={actualHours.toString()}
                onChange={(e) => setActualHours(Math.max(0, Number(e.target.value) || 0))}
                hint="Hours the job actually took"
                min={0}
                step={0.5}
                placeholder="18"
              />
              <MobileInput
                label="Charge-Out Rate"
                type="number"
                inputMode="decimal"
                value={hourlyRate.toString()}
                onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value) || 0))}
                hint="Your hourly rate (£/hr)"
                unit="£/hr"
                min={0}
                step={1}
                placeholder="55"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileInput
                label="Quoted Materials"
                type="number"
                inputMode="decimal"
                value={quotedMats.toString()}
                onChange={(e) => setQuotedMats(Math.max(0, Number(e.target.value) || 0))}
                hint="Materials cost in quote"
                unit="£"
                min={0}
                step={10}
                placeholder="300"
              />
              <MobileInput
                label="Actual Materials"
                type="number"
                inputMode="decimal"
                value={actualMats.toString()}
                onChange={(e) => setActualMats(Math.max(0, Number(e.target.value) || 0))}
                hint="Actual materials spent"
                unit="£"
                min={0}
                step={10}
                placeholder="380"
              />
            </div>
            
            <div>
              <label htmlFor="variance-notes" className="block text-sm font-medium mb-2">
                Notes / Reason for Variance
              </label>
              <Textarea
                id="variance-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Client changed sockets from 6 to 10 mid-job, extra materials needed, underestimated cable runs..."
                className="min-h-[100px] sm:min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Document why the variance occurred to improve future estimates
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-elec-light text-lg sm:text-xl">Variance Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:gap-4">
            {/* Hours Variance */}
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-sm sm:text-base text-elec-light font-medium">Hours Variance</span>
              <div className="flex items-center gap-2">
                <span className={`${getVarianceColor(hoursVar)}`}>
                  {getVarianceIcon(hoursVar)}
                </span>
                <strong className={`text-sm sm:text-base ${getVarianceColor(hoursVar)}`}>
                  {hoursVar > 0 ? '+' : ''}{hoursVar.toFixed(1)} hrs ({hoursVar > 0 ? '+' : ''}{hoursVarPercent}%)
                </strong>
              </div>
            </div>

            {/* Labour Variance */}
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-sm sm:text-base text-elec-light font-medium">Labour Cost Variance</span>
              <div className="flex items-center gap-2">
                <span className={`${getVarianceColor(hoursVarCost)}`}>
                  {getVarianceIcon(hoursVarCost)}
                </span>
                <strong className={`text-sm sm:text-base ${getVarianceColor(hoursVarCost)}`}>
                  {hoursVarCost > 0 ? '+' : ''}{currency(hoursVarCost)}
                </strong>
              </div>
            </div>

            {/* Materials Variance */}
            <div className="flex items-center justify-between py-2 border-b border-border/40">
              <span className="text-sm sm:text-base text-elec-light font-medium">Materials Variance</span>
              <div className="flex items-center gap-2">
                <span className={`${getVarianceColor(matsVar)}`}>
                  {getVarianceIcon(matsVar)}
                </span>
                <strong className={`text-sm sm:text-base ${getVarianceColor(matsVar)}`}>
                  {matsVar > 0 ? '+' : ''}{currency(matsVar)} ({matsVar > 0 ? '+' : ''}{matsVarPercent}%)
                </strong>
              </div>
            </div>

            {/* Total Variance */}
            <div className="flex items-center justify-between py-3 mt-2 bg-background/50 rounded-md px-3 sm:px-4">
              <span className="text-base sm:text-lg font-semibold text-elec-light">Total Job Variance</span>
              <div className="flex items-center gap-2">
                <span className={`${getVarianceColor(totalVar)}`}>
                  {getVarianceIcon(totalVar)}
                </span>
                <strong className={`text-base sm:text-lg ${getVarianceColor(totalVar)}`}>
                  {totalVar > 0 ? '+' : ''}{currency(totalVar)} ({totalVar > 0 ? '+' : ''}{totalVarPercent}%)
                </strong>
              </div>
            </div>

            {/* Variance Interpretation */}
            <div className="mt-2 p-3 sm:p-4 bg-background/30 rounded-md border border-border/20">
              <p className="text-xs sm:text-sm text-elec-light/90 leading-relaxed">
                {Math.abs(Number(totalVarPercent)) < 5 ? (
                  <><strong className="text-elec-yellow">On target!</strong> Your quote was within 5% of actual costs - excellent estimating.</>
                ) : totalVar > 0 ? (
                  <><strong className="text-destructive">Over budget.</strong> The job cost {currency(Math.abs(totalVar))} more than quoted. Review your notes to understand why and adjust future estimates.</>
                ) : (
                  <><strong className="text-green-500">Under budget.</strong> The job cost {currency(Math.abs(totalVar))} less than quoted. Good margin protection, but consider if you could be more competitive.</>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default QuoteVarianceTracker;
