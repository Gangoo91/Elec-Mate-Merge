import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Building,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Calculator,
  RotateCcw,
  ChevronDown,
  Info,
  BookOpen,
  Calendar,
  Briefcase,
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
import {
  calculateCapacityMetrics,
  CapacityInputs,
  CALENDAR_WEEKS_PER_YEAR,
  JIB_WEEKLY_HOURS,
  STATUTORY_HOLIDAY_WEEKS,
} from '@/utils/business-planning-maths';
import { HubMasthead } from '@/components/hub/HubPrimitives';

const DEFAULT_INPUTS: CapacityInputs = {
  totalElectricians: 1,
  workingHoursPerDay: JIB_WEEKLY_HOURS / 5, // 7.5, not 8
  workingDaysPerWeek: 5,
  weeksPerYear: CALENDAR_WEEKS_PER_YEAR,
  adminTimePercentage: 15,
  travelTimePercentage: 20,
  holidayDays: STATUTORY_HOLIDAY_WEEKS * 5, // 28 days for a 5-day week
  sickDays: 5,
  trainingDays: 3,
  averageJobHours: 6,
  emergencyWorkPercentage: 20,
  plannedMaintenancePercentage: 30,
  growthTargetPercentage: 25,
};

const CapacityPlanningTool = () => {
  const config = CALCULATOR_CONFIG['business'];

  const [inputs, setInputs] = useState<CapacityInputs>(DEFAULT_INPUTS);
  // Results are LIVE. This was `useState(false)`, so a calculator with every
  // input already populated refused to answer until you pressed a button,
  // showing a dead "Ready to Calculate" panel in the meantime. Every value
  // needed is in state on first render, so there is nothing to wait for.
  // The `isValid` guards downstream still hold results back when the inputs
  // genuinely do not make sense.

  const [calculated, setCalculated] = useState(true);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof CapacityInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const calculateCapacity = () => {
    setCalculated(true);
  };

  const resetTool = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const loadExample = () => {
    // Weeks per year stays at 52. The old example used 50 AND deducted 28
    // holiday days, double-counting two weeks of leave.
    setInputs({
      ...DEFAULT_INPUTS,
      totalElectricians: 3,
      adminTimePercentage: 18,
      travelTimePercentage: 25,
      sickDays: 7,
      trainingDays: 5,
      averageJobHours: 4,
      emergencyWorkPercentage: 25,
      plannedMaintenancePercentage: 35,
      growthTargetPercentage: 30,
    });
  };

  const metrics = calculateCapacityMetrics(inputs);

  // Bands describe how much of a paid hour is chargeable. A healthy field
  // trade loses 25-35% to travel and paperwork, so 65-75% billable is normal;
  // above 85% usually means quoting and certification are not being counted.
  const getCapacityStatus = () => {
    if (metrics.billableRatio >= 85) {
      return {
        color: 'text-amber-400',
        label: 'Overhead looks understated',
        bg: 'bg-amber-500/10 border-amber-500/30',
      };
    }
    if (metrics.billableRatio >= 65) {
      return {
        color: 'text-green-400',
        label: 'Typical',
        bg: 'bg-green-500/10 border-green-500/30',
      };
    }
    if (metrics.billableRatio >= 50) {
      return {
        color: 'text-amber-400',
        label: 'High overhead',
        bg: 'bg-amber-500/10 border-amber-500/30',
      };
    }
    return {
      color: 'text-orange-400',
      label: 'Very high overhead',
      bg: 'bg-orange-500/10 border-orange-500/30',
    };
  };

  // workingDaysPerWeek was missing from this guard, so a blank value reached
  // the maths and produced Infinity in the jobs-per-day figure.
  const isValid =
    inputs.totalElectricians > 0 &&
    inputs.workingHoursPerDay > 0 &&
    inputs.workingDaysPerWeek > 0 &&
    inputs.weeksPerYear > 0 &&
    metrics.workingDaysPerHead > 0;
  const capacityStatus = getCapacityStatus();

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Capacity Planning Tool for UK Electricians</title>
        <meta
          name="description"
          content="Plan workforce capacity and analyse utilisation to optimise productivity."
        />
        <link rel="canonical" href="/electrician/business-development/tools/capacity-planning" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <HubMasthead
          section="Business"
          title="Capacity Planning Tool"
          backTo="/electrician/business-development/tools"
        />

        <CalculatorCard
          category="business"
          title="Capacity Planning Tool"
          description="Plan workforce capacity and analyse utilisation to optimise productivity"
          badge="Business"
        >
          {/* Team Structure */}
          <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Team Structure</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Total Electricians"
              type="text"
              inputMode="decimal"
              value={inputs.totalElectricians.toString()}
              onChange={(val) => updateInput('totalElectricians', val)}
              placeholder="e.g., 1"
              hint="Qualified staff"
            />

            <CalculatorInput
              label="Hours per Day"
              type="text"
              inputMode="decimal"
              value={inputs.workingHoursPerDay.toString()}
              onChange={(val) => updateInput('workingHoursPerDay', val)}
              placeholder="e.g., 7.5"
              hint="JIB week is 37.5h"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Days per Week"
              type="text"
              inputMode="decimal"
              value={inputs.workingDaysPerWeek.toString()}
              onChange={(val) => updateInput('workingDaysPerWeek', val)}
              placeholder="e.g., 5"
              hint="Operating days"
            />

            <CalculatorInput
              label="Weeks per Year"
              type="text"
              inputMode="decimal"
              value={inputs.weeksPerYear.toString()}
              onChange={(val) => updateInput('weeksPerYear', val)}
              placeholder="52"
              hint="Calendar weeks - leave is deducted below"
            />
          </div>

          {/* Time Allocation */}
          <h3 className="mb-3 mt-4 text-[13px] font-semibold tracking-tight text-white">Time Allocation</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Admin Time"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.adminTimePercentage.toString()}
              onChange={(val) => updateInput('adminTimePercentage', val)}
              placeholder="e.g., 15"
              hint="Paperwork, quotes"
            />

            <CalculatorInput
              label="Travel Time"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.travelTimePercentage.toString()}
              onChange={(val) => updateInput('travelTimePercentage', val)}
              placeholder="e.g., 20"
              hint="Between jobs"
            />
          </div>

          {/* Time Off */}
          <h3 className="mb-3 mt-4 text-[13px] font-semibold tracking-tight text-white">Time Off (Days/Year)</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CalculatorInput
              label="Holiday"
              type="text"
              inputMode="decimal"
              value={inputs.holidayDays.toString()}
              onChange={(val) => updateInput('holidayDays', val)}
              placeholder="28"
              hint="5.6 weeks statutory"
            />

            <CalculatorInput
              label="Sick"
              type="text"
              inputMode="decimal"
              value={inputs.sickDays.toString()}
              onChange={(val) => updateInput('sickDays', val)}
              placeholder="5"
              hint="Average"
            />

            <CalculatorInput
              label="Training"
              type="text"
              inputMode="decimal"
              value={inputs.trainingDays.toString()}
              onChange={(val) => updateInput('trainingDays', val)}
              placeholder="3"
              hint="CPD days"
            />
          </div>

          {/* Work Profile */}
          <h3 className="mb-3 mt-4 text-[13px] font-semibold tracking-tight text-white">Work Profile</h3>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Avg Job Duration"
              unit="hrs"
              type="text"
              inputMode="decimal"
              value={inputs.averageJobHours.toString()}
              onChange={(val) => updateInput('averageJobHours', val)}
              placeholder="e.g., 6"
              hint="Typical job time"
            />

            <CalculatorInput
              label="Growth Target"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.growthTargetPercentage.toString()}
              onChange={(val) => updateInput('growthTargetPercentage', val)}
              placeholder="e.g., 25"
              hint="Desired increase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Emergency Work"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.emergencyWorkPercentage.toString()}
              onChange={(val) => updateInput('emergencyWorkPercentage', val)}
              placeholder="e.g., 20"
              hint="Urgent jobs"
            />

            <CalculatorInput
              label="Maintenance"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.plannedMaintenancePercentage.toString()}
              onChange={(val) => updateInput('plannedMaintenancePercentage', val)}
              placeholder="e.g., 30"
              hint="Scheduled work"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={calculateCapacity}
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
              Calculate
            </button>
            <button
              onClick={loadExample}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation text-sm"
            >
              Example
            </button>
            <button
              onClick={resetTool}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </CalculatorCard>

        {/* Results Section */}
        {calculated && isValid && (
          <div className="space-y-4 animate-fade-in">
            {/* Utilisation Status */}
            <div className={cn('flex items-center gap-2 p-3 rounded-xl border', capacityStatus.bg)}>
              {metrics.billableRatio >= 65 && metrics.billableRatio < 85 ? (
                <CheckCircle className={cn('h-5 w-5', capacityStatus.color)} />
              ) : (
                <AlertCircle className={cn('h-5 w-5', capacityStatus.color)} />
              )}
              <span className={cn('font-medium text-sm', capacityStatus.color)}>
                {capacityStatus.label} - {metrics.billableRatio.toFixed(1)}% of paid hours are
                chargeable
              </span>
            </div>

            {metrics.mixOverAllocated && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-orange-500/30 bg-orange-500/10">
                <AlertCircle className="h-5 w-5 text-orange-400" />
                <span className="font-medium text-sm text-orange-300">
                  Emergency and maintenance together exceed 100% of billable hours - there is no
                  room left for new projects.
                </span>
              </div>
            )}

            <CalculatorResult category="business">
              <ResultHeadline
                label="Billable hours you actually have"
                value={`${metrics.billableHours.toFixed(0)}h`}
                aside="a year"
                caption={`${metrics.workingDaysPerHead.toFixed(0)} working days per electrician after leave, sickness and training, at ${inputs.workingHoursPerDay}h/day. Chargeable hours only — not hours sold.`}
              />

              <ResultsGrid columns={2}>
                <ResultValue
                  label="Jobs per Year"
                  value={metrics.jobsPerYear.toString()}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Jobs per Week"
                  value={metrics.jobsPerWeek.toString()}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Jobs per Day"
                  value={metrics.jobsPerDay.toString()}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Staff for Growth"
                  value={`+${metrics.additionalStaffNeeded}`}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>
            </CalculatorResult>

            {/* Time Breakdown */}
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#FFC80015' }}>
              <div className="p-4">
                <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Time Allocation Analysis</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-white text-xs font-medium">Annual Hours</p>
                    <div className="flex justify-between">
                      <span className="text-white">Total Available:</span>
                      <span className="text-white">{metrics.totalAvailableHours.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Billable:</span>
                      <span className="text-green-400">{metrics.billableHours.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Non-billable:</span>
                      <span className="text-red-400">{metrics.nonBillableHours.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white text-xs font-medium">Work Distribution</p>
                    <div className="flex justify-between">
                      <span className="text-white">Emergency:</span>
                      <span className="text-red-300">
                        {metrics.emergencyCapacity.toFixed(0)} hrs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Maintenance:</span>
                      <span className="text-elec-yellow">
                        {metrics.maintenanceCapacity.toFixed(0)} hrs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">New Projects:</span>
                      <span className="text-green-300">
                        {metrics.newWorkCapacity.toFixed(0)} hrs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Planning Insights */}
            <div className={cn('p-4 rounded-xl border', capacityStatus.bg)}>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-2">Planning Insight</h4>
                  <p className="text-sm text-white">
                    {metrics.billableRatio >= 85
                      ? 'Under 15% for admin and travel is unusually low for a field trade. Check that quoting, certification, van stock runs and merchant trips are all being counted - if they are not, your charge-out rate is being spread over hours you cannot sell.'
                      : metrics.billableRatio >= 65
                        ? 'Admin and travel are in the normal range for an electrical contractor. Remember this is the share of paid hours you CAN bill, not the share you have actually sold - price against the billable figure, not the headline hours.'
                        : metrics.billableRatio >= 50
                          ? 'A third to a half of every paid hour is going on travel and paperwork. Tighter job clustering by postcode and moving certification onto site usually recovers the most.'
                          : 'More than half of every paid hour is non-chargeable. Either the overhead percentages are overstated, or routing and administration need serious attention before taking on more work.'}
                  </p>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#FFC80015' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm sm:text-base font-medium text-elec-yellow">
                      What This Means
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showGuidance && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-elec-yellow/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Billable ratio:</strong> the share of paid
                      hours you can charge for. It is 100% less admin and travel - it does not
                      measure whether those hours were sold.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">65-75% is normal</strong> for a field trade.
                      Above 85% usually means quoting or certification time is uncounted.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Assumptions:</strong> 37.5-hour JIB week
                      over 52 calendar weeks, less 5.6 weeks statutory holiday, sickness and
                      training. Overtime and on-call are not modelled.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Staff for growth:</strong> the shortfall
                      divided by the billable hours one electrician delivers, rounded up.
                    </li>
                  </ul>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        )}

        {/* Quick Reference */}
        <Collapsible open={showReference} onOpenChange={setShowReference}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Capacity Planning Tips
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
                  <p className="text-amber-300 font-medium">JIB Working Week</p>
                  <p className="text-amber-200/70">37.5 hours (NWR 3.1)</p>
                  <p className="text-amber-200/70">1,950h/yr before leave</p>
                  <p className="text-amber-200/70">Not 40h / 2,080h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Growth Planning</p>
                  <p className="text-amber-200/70">Plan 3-6 months ahead</p>
                  <p className="text-amber-200/70">Training takes time</p>
                  <p className="text-amber-200/70">BS7671 compliance</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Statutory Leave</p>
                  <p className="text-amber-200/70">5.6 weeks (28 days at 5/wk)</p>
                  <p className="text-amber-200/70">Bank holidays may count in</p>
                  <p className="text-amber-200/70">Avg sick: 4-7 days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Efficiency</p>
                  <p className="text-amber-200/70">Monitor travel time</p>
                  <p className="text-amber-200/70">Reduce admin burden</p>
                  <p className="text-amber-200/70">Optimise scheduling</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </main>
    </div>
  );
};

export default CapacityPlanningTool;
