import * as React from 'react';
import { Helmet } from 'react-helmet';
import {
  Clock,
  PoundSterling,
  Target,
  Calculator,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Info,
  Lightbulb,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorResult,
  ResultValue,
  ResultHeadline,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { HubMasthead } from '@/components/hub/HubPrimitives';

const currency = (n: number) =>
  `£${(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/**
 * Round a price UP to the next step. This used to be `Math.round`, which on a
 * £5 step pulled a £62 minimum down to £60 — a "minimum charge" that is £2 below
 * the minimum it just calculated. A floor price may only ever be rounded up.
 */
const roundUpTo = (n: number, step: number) => Math.ceil(n / step) * step;
const validateInput = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const MinimumChargeCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG['business'];

  const [travelMins, setTravelMins] = React.useState('30');
  const [adminMins, setAdminMins] = React.useState('15');
  const [hourlyCost, setHourlyCost] = React.useState('30');
  const [overheadHr, setOverheadHr] = React.useState('10');
  // Both inputs above are COSTS. Without a margin the tool priced every hour
  // after the first at exactly cost, so a "profitable call-out pricing" tool
  // returned a break-even price. Margin is now explicit and applies to all hours.
  const [targetMargin, setTargetMargin] = React.useState('20');
  const [firstHourPremium, setFirstHourPremium] = React.useState('25');
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState('20');
  const [rounding, setRounding] = React.useState('5');
  // Results are LIVE. This was `useState(false)`, so a calculator with every
  // input already populated refused to answer until you pressed a button,
  // showing a dead "Ready to Calculate" panel in the meantime. Every value
  // needed is in state on first render, so there is nothing to wait for.
  // The `isValid` guards downstream still hold results back when the inputs
  // genuinely do not make sense.

  const [calculated, setCalculated] = React.useState(true);
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showReference, setShowReference] = React.useState(false);

  const travelMinsNum = validateInput(parseFloat(travelMins) || 0, 0, 180);
  const adminMinsNum = validateInput(parseFloat(adminMins) || 0, 0, 120);
  const hourlyCostNum = validateInput(parseFloat(hourlyCost) || 0, 0, 200);
  const overheadHrNum = validateInput(parseFloat(overheadHr) || 0, 0, 100);
  const targetMarginNum = validateInput(parseFloat(targetMargin) || 0, 0, 95);
  const firstHourPremiumNum = validateInput(parseFloat(firstHourPremium) || 0, 0, 100);
  const vatRateNum = validateInput(parseFloat(vatRate) || 0, 0, 20);
  const roundingNum = validateInput(parseFloat(rounding) || 1, 1, 50);

  const costPerHour = hourlyCostNum + overheadHrNum;
  // Travel is a RETURN journey. The input is labelled "average one-way travel"
  // but only one leg was ever costed, so half the driving on every job was
  // unpaid. 30 minutes each way at £40/hr is £40, not £20.
  const travelMinsReturn = travelMinsNum * 2;
  const timeCost = ((travelMinsReturn + adminMinsNum) / 60) * costPerHour;

  // MARGIN, not markup: margin is a share of the SELLING price, so
  // price = cost / (1 − margin). Applied to every hour — previously nothing
  // carried a margin and subsequent hours were sold at cost.
  const priceFromMargin = (cost: number) =>
    targetMarginNum > 0 ? cost / (1 - targetMarginNum / 100) : cost;

  const firstHourCost = costPerHour + timeCost;
  const firstHourAtMargin = priceFromMargin(firstHourCost);
  // The first-hour premium is deliberately a MARKUP on top of the margin-priced
  // hour — it is a short-job surcharge, not a second margin.
  const firstHourUplift = firstHourAtMargin * (1 + firstHourPremiumNum / 100);
  const firstHourRounded = roundUpTo(firstHourUplift, roundingNum);
  const firstHourIncVat = vatRegistered
    ? firstHourRounded * (1 + vatRateNum / 100)
    : firstHourRounded;

  const subsequentHourBase = priceFromMargin(costPerHour);
  const subsequentHourRounded = roundUpTo(subsequentHourBase, roundingNum);
  const subsequentIncVat = vatRegistered
    ? subsequentHourRounded * (1 + vatRateNum / 100)
    : subsequentHourRounded;

  const exampleJobHours = 3;
  const exampleTotal = firstHourIncVat + subsequentIncVat * (exampleJobHours - 1);

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setTravelMins('30');
    setAdminMins('15');
    setHourlyCost('30');
    setOverheadHr('10');
    setTargetMargin('20');
    setFirstHourPremium('25');
    setVatRegistered(true);
    setVatRate('20');
    setRounding('5');
  };

  const isValid = hourlyCostNum > 0;

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Minimum Charge & First Hour Pricing UK</title>
        <meta
          name="description"
          content="Set profitable minimum call-out and first-hour pricing for domestic and commercial electrical work in the UK."
        />
        <link rel="canonical" href="/electrician/business-development/tools/minimum-charge" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <HubMasthead
          section="Business"
          title="Minimum Charge Calculator"
          backTo="/electrician/business-development/tools"
        />

        <CalculatorCard
          category="business"
          title="Minimum Charge Calculator"
          description="Calculate profitable call-out pricing that covers travel, admin and setup costs"
          badge="Pricing"
        >
          {/* Time Costs Section */}
          <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Time Costs</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Travel Time"
              unit="mins"
              type="text"
              inputMode="numeric"
              value={travelMins}
              onChange={(val) => {
                setTravelMins(val);
              }}
              placeholder="e.g., 30"
              hint="One way — the return leg is added for you"
            />

            <CalculatorInput
              label="Admin Time"
              unit="mins"
              type="text"
              inputMode="numeric"
              value={adminMins}
              onChange={(val) => {
                setAdminMins(val);
              }}
              placeholder="e.g., 15"
              hint="Quotes, invoicing, calls"
            />
          </div>

          {/* Costs Section */}
          <h3 className="mb-3 mt-6 pt-4 border-t border-white/10 text-[13px] font-semibold tracking-tight text-white">Your Costs & Overheads</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Hourly Cost"
              unit="£/hr"
              type="text"
              inputMode="decimal"
              value={hourlyCost}
              onChange={(val) => {
                setHourlyCost(val);
              }}
              placeholder="e.g., 30"
              hint="Loaded cost per BILLABLE hour (Staff Cost Calculator)"
            />

            <CalculatorInput
              label="Business Overhead"
              unit="£/hr"
              type="text"
              inputMode="decimal"
              value={overheadHr}
              onChange={(val) => {
                setOverheadHr(val);
              }}
              placeholder="e.g., 10"
              hint="Insurance, tools, office"
            />
          </div>

          {/* Pricing Strategy Section */}
          <h3 className="mb-3 mt-6 pt-4 border-t border-white/10 text-[13px] font-semibold tracking-tight text-white">Pricing Strategy</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Target Margin"
              unit="%"
              type="text"
              inputMode="decimal"
              value={targetMargin}
              onChange={(val) => {
                setTargetMargin(val);
              }}
              placeholder="e.g., 20"
              hint="Share of the price, applied to every hour"
            />

            <CalculatorInput
              label="First Hour Premium"
              unit="%"
              type="text"
              inputMode="numeric"
              value={firstHourPremium}
              onChange={(val) => {
                setFirstHourPremium(val);
              }}
              placeholder="e.g., 25"
              hint="Short-job surcharge on top of margin"
            />

            <CalculatorInput
              label="Round Prices To"
              unit="£"
              type="text"
              inputMode="numeric"
              value={rounding}
              onChange={(val) => {
                setRounding(val);
              }}
              placeholder="e.g., 5"
              hint="Rounded up — never below your minimum"
            />
          </div>

          {/* VAT Section */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="space-y-2">
              <label className="text-sm text-white">VAT Registered</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setVatRegistered(true);
                  }}
                  className={cn(
                    'flex-1 h-10 rounded-xl font-medium text-sm transition-all',
                    vatRegistered ? 'text-black' : 'bg-white/5 border border-white/10 text-white'
                  )}
                  style={
                    vatRegistered
                      ? {
                          background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                        }
                      : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setVatRegistered(false);
                  }}
                  className={cn(
                    'flex-1 h-10 rounded-xl font-medium text-sm transition-all',
                    !vatRegistered ? 'text-black' : 'bg-white/5 border border-white/10 text-white'
                  )}
                  style={
                    !vatRegistered
                      ? {
                          background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                        }
                      : undefined
                  }
                >
                  No
                </button>
              </div>
            </div>

            {vatRegistered && (
              <CalculatorInput
                label="VAT Rate"
                unit="%"
                type="text"
                inputMode="decimal"
                value={vatRate}
                onChange={(val) => {
                  setVatRate(val);
                }}
                placeholder="e.g., 20"
                hint="20% standard, 5% reduced"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleCalculate}
              disabled={!isValid}
              className={cn(
                'flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation',
                isValid ? 'text-black' : 'bg-white/10 text-white cursor-not-allowed'
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
              onClick={handleReset}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </CalculatorCard>

        {/* Results Section */}
        {calculated && isValid && (
          <div className="space-y-4 animate-fade-in">
            {/* First Hour Pricing */}
            <CalculatorResult category="business">
              <ResultHeadline
                label="Minimum call-out charge"
                value={currency(vatRegistered ? firstHourIncVat : firstHourRounded)}
                aside={vatRegistered ? 'inc VAT' : 'ex VAT'}
                caption="Below this a short job costs you money once travel and admin are paid for."
              />
              <div className="hidden">
                <p className="text-xs text-white mt-1">
                  {vatRegistered ? 'inc VAT' : 'ex VAT'} - Your minimum call-out charge
                </p>
              </div>

              <ResultsGrid columns={2}>
                <ResultValue
                  label="First Hour (ex VAT)"
                  value={currency(firstHourRounded)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label={`Subsequent Hours (${vatRegistered ? 'inc' : 'ex'} VAT)`}
                  value={currency(vatRegistered ? subsequentIncVat : subsequentHourRounded)}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>
            </CalculatorResult>

            {/* Example Quote */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
              <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Example Quote</h3>
              <p className="text-sm text-amber-200/80">
                <strong className="text-amber-300">{exampleJobHours}-hour job:</strong>
                <br />
                {currency(firstHourIncVat)} (1st hour) + {currency(subsequentIncVat)} ×{' '}
                {exampleJobHours - 1} (additional hours) ={' '}
                <strong
                  className="text-lg"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {currency(exampleTotal)}
                </strong>{' '}
                total {vatRegistered ? 'inc VAT' : 'ex VAT'}
              </p>
            </div>

            {/* Calculation Breakdown */}
            <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#FFC80015' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm sm:text-base font-medium text-elec-yellow">
                      Calculation Breakdown
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showBreakdown && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white">Base cost (1 hour)</span>
                      <span className="text-white font-mono font-semibold">
                        {currency(costPerHour)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white">
                        Travel ({travelMinsReturn} mins return) &amp; admin ({adminMinsNum} mins)
                      </span>
                      <span className="text-white font-mono font-semibold">
                        + {currency(timeCost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white">Margin ({targetMarginNum}% of price)</span>
                      <span className="text-white font-mono font-semibold">
                        + {currency(firstHourAtMargin - firstHourCost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white">
                        First hour premium ({firstHourPremiumNum}%)
                      </span>
                      <span className="text-white font-mono font-semibold">
                        + {currency(firstHourUplift - firstHourAtMargin)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white">Rounded up to nearest £{roundingNum}</span>
                      <span className="text-white font-mono font-semibold">
                        + {currency(firstHourRounded - firstHourUplift)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-medium bg-white/5 px-2 rounded">
                      <span className="text-white">= First Hour (ex VAT)</span>
                      <span className="text-white font-mono">{currency(firstHourRounded)}</span>
                    </div>
                    {vatRegistered && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-white">VAT ({vatRateNum}%)</span>
                          <span className="text-white font-mono font-semibold">
                            + {currency(firstHourIncVat - firstHourRounded)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 font-medium bg-white/[0.04] px-2 rounded">
                          <span className="text-elec-yellow">= First Hour (inc VAT)</span>
                          <span className="text-elec-yellow font-mono text-base">
                            {currency(firstHourIncVat)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        )}

        {/* Prompt to Calculate */}
        {!calculated && (
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
            <Info className="h-10 w-10 text-elec-yellow mx-auto mb-3 opacity-50" />
            <h3 className="text-white text-lg font-semibold mb-2">Ready to Calculate</h3>
            <p className="text-white text-sm">
              Enter your time costs and business overheads above, then click "Calculate Pricing" to
              see your first hour and minimum charge rates.
            </p>
          </div>
        )}

        {/* Quick Reference */}
        <Collapsible open={showReference} onOpenChange={setShowReference}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Pricing Reference Guide
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Why First Hour Premium?</p>
                  <p className="text-amber-200/70">Covers fixed costs: travel, setup, admin</p>
                  <p className="text-amber-200/70">Small jobs stay profitable</p>
                  <p className="text-amber-200/70">Typical: 20-35% premium</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">UK Typical Rates</p>
                  <p className="text-amber-200/70">Call-out: £60-100</p>
                  <p className="text-amber-200/70">Hourly rate: £40-65</p>
                  <p className="text-amber-200/70">Emergency: £80-150</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">VAT Considerations</p>
                  <p className="text-amber-200/70">Standard: 20%</p>
                  <p className="text-amber-200/70">Reduced 5%: Energy saving</p>
                  <p className="text-amber-200/70">Threshold: £90,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Price Rounding</p>
                  <p className="text-amber-200/70">£5 increments: Most common</p>
                  <p className="text-amber-200/70">£10 increments: Easier quotes</p>
                  <p className="text-amber-200/70">Builds trust with customers</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/20">
                <p className="text-xs text-amber-200/60">
                  <Info className="h-3 w-3 inline mr-1" />
                  Your first hour price should cover travel, admin, and setup so even 30-minute jobs
                  are profitable. After the first hour, charge your standard hourly rate.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </main>
    </div>
  );
};

export default MinimumChargeCalculator;
