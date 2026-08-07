import { useState, useEffect } from 'react';
import {
  Calculator,
  PoundSterling,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  History,
  Share2,
  Receipt,
  Users,
  Clock,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Info,
  Car,
  Percent,
  Settings,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultHeadline,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { copyToClipboard } from '@/utils/clipboard';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import type { Worker } from '@/components/electrician/business-development/job-profitability/WorkerManager';
import {
  labourHoursOptions,
  hourlyRateOptions,
  overheadPercentageOptions,
  profitMarginOptions,
} from '@/components/electrician/business-development/job-profitability/DropdownOptions';
import {
  jobTypePresets,
  getJobPresetsByCategory,
  getJobPresetOptions,
} from '@/components/electrician/business-development/job-profitability/JobTypePresets';
import { Helmet } from 'react-helmet';
import {
  calculateJobCosts,
  priceJob,
  MAX_MARGIN_PERCENT,
  VAT_STANDARD_RATE_PERCENT,
  VAT_REGISTRATION_THRESHOLD,
  type JobCostInputs,
} from '@/data/job-costing';
import { HubMasthead } from '@/components/hub/HubPrimitives';

/**
 * `materialMarkupPercent` and `discountPercent` used to live here. Both were
 * validated, both were set by "Load example" (10% and 0%), and NEITHER ever
 * entered a single formula — so the example quietly told the user a 10%
 * materials markup was being applied when nothing of the sort was happening.
 * They are gone rather than wired in: this tool prices on a target MARGIN over
 * total cost, and stacking a separate markup on the materials line on top of
 * that would double-count the profit on materials.
 */
interface JobInputs {
  materialCost: number;
  labourHours: number;
  hourlyRate: number;
  /**
   * Employer NI, holiday, pension, sick pay and downtime on top of the pay
   * rate. Was absent entirely: costing labour at the headline rate alone
   * understates the cost of every job and overstates the profit by the same
   * amount.
   */
  labourOnCostPercent: number;
  overheadPercentage: number;
  desiredProfitMargin: number;
  quoteAmount: number;
  travelHours: number;
  adminHours: number;
  miles: number;
  mileageRate: number;
  subcontractorCost: number;
  parkingTolls: number;
  consumablesPercent: number;
  contingencyPercent: number;
  warrantyReservePercent: number;
  workers: Worker[];
  useMultiWorker: boolean;
}

interface CalculationHistory {
  id: string;
  timestamp: Date;
  jobType: string;
  inputs: JobInputs;
  results: {
    totalCosts: number;
    actualProfit: number;
    /** null when nothing was quoted — a £0 quote has no margin, not a 0% one. */
    actualProfitMargin: number | null;
    vatAmount: number;
    totalWithVAT: number;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

const JobProfitabilityCalculator = () => {
  const config = CALCULATOR_CONFIG['business'];
  const { toast } = useToast();
  const haptic = useHaptic();

  // Seeded with a plausible domestic job rather than zeros. With results now
  // live, an empty form opened on a 42px "£0.00" profit — a confident answer
  // to a question nobody had asked yet. A worked example also teaches the tool:
  // labour on-cost and overhead are the two fields people forget, and starting
  // them at zero quietly models a business with neither.
  //
  // Labour rate is the JIB 2026 Electrician (Own Transport) rate; the on-cost
  // covers employer NI, holiday and pension.
  const [inputs, setInputs] = useState<JobInputs>({
    materialCost: 850,
    labourHours: 14,
    hourlyRate: 19.54,
    labourOnCostPercent: 28,
    overheadPercentage: 20,
    desiredProfitMargin: 20,
    // Costs on this example come to £1,551.83, so a 20% margin needs
    // 1551.83 / 0.8 = £1,939.79. Left at 0 the worked example opened on a
    // £1,551.83 LOSS in red — a calculator demonstrating a job priced at
    // nothing.
    quoteAmount: 1940,
    travelHours: 2,
    adminHours: 1,
    miles: 40,
    mileageRate: 0.45,
    subcontractorCost: 0,
    parkingTolls: 0,
    consumablesPercent: 0,
    contingencyPercent: 0,
    warrantyReservePercent: 0,
    workers: [
      {
        id: '1',
        role: 'Qualified Electrician',
        hours: 0,
        hourlyRate: 45,
        skillLevel: 'qualified',
      },
    ],
    useMultiWorker: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  // Results are LIVE. This was `useState(false)`, so a calculator with every
  // input already populated refused to answer until you pressed a button,
  // showing a dead "Ready to Calculate" panel in the meantime. Every value
  // needed is in state on first render, so there is nothing to wait for.
  // The `isValid` guards downstream still hold results back when the inputs
  // genuinely do not make sense.
  const [calculated, setCalculated] = useState(true);
  const [customValues, setCustomValues] = useState<{ [key: string]: boolean }>({});
  // Was a hardcoded 20. Sourced from the verified rate table so a rate change
  // lands in one place.
  const [vatRate, setVATRate] = useState(VAT_STANDARD_RATE_PERCENT);
  const [vatRegistered, setVATRegistered] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const rawHistory = storageGetJSONSync<any[]>('job-profitability-history', []);
    if (rawHistory.length > 0) {
      try {
        const parsedHistory = rawHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading calculation history:', error);
      }
    }
  }, []);

  const updateInput = (field: keyof JobInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (inputs.materialCost < 0) newErrors.materialCost = 'Material cost cannot be negative';

    if (inputs.useMultiWorker) {
      if (inputs.workers.length === 0) newErrors.workers = 'At least one worker is required';
      if (totalLabourHours <= 0)
        newErrors.labourHours = 'Total labour hours must be greater than 0';
      if (totalLabourCost <= 0) newErrors.hourlyRate = 'Worker rates must be greater than £0';
    } else {
      if (inputs.labourHours <= 0) newErrors.labourHours = 'Labour hours must be greater than 0';
      if (inputs.hourlyRate <= 0) newErrors.hourlyRate = 'Hourly rate must be greater than £0';
    }

    const percentFields: (keyof JobInputs)[] = [
      'overheadPercentage',
      'consumablesPercent',
      'contingencyPercent',
      'warrantyReservePercent',
      'labourOnCostPercent',
    ];
    percentFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0 || v > 100) newErrors[f as string] = 'Must be between 0–100%';
    });

    // A margin is a share of the SELLING price, so 100% would need an infinite
    // price. The old rule allowed exactly 100, which fell through to the
    // `Math.max(..., 0.01)` floor and quietly returned 100x total costs as the
    // "minimum quote".
    if (inputs.desiredProfitMargin < 0 || inputs.desiredProfitMargin > MAX_MARGIN_PERCENT) {
      newErrors.desiredProfitMargin = `Must be between 0–${MAX_MARGIN_PERCENT}%`;
    }

    const nonNegativeFields: (keyof JobInputs)[] = [
      'travelHours',
      'adminHours',
      'miles',
      'mileageRate',
      'subcontractorCost',
      'parkingTolls',
    ];
    nonNegativeFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0) newErrors[f as string] = 'Cannot be negative';
    });

    if (inputs.quoteAmount <= 0) newErrors.quoteAmount = 'Quote amount must be greater than £0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProfitability = () => {
    if (!validateInputs()) {
      haptic.warning();
      toast({
        title: 'Validation Error',
        description: 'Please correct the highlighted errors before calculating.',
        variant: 'destructive',
      });
      return;
    }

    haptic.light();
    setCalculated(true);

    // Reads the same `pricing`/`breakdown` the screen renders, so history can
    // never disagree with the result the user is looking at.
    const newHistoryItem: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      jobType: selectedJobType || 'Custom Job',
      inputs: { ...inputs },
      results: {
        totalCosts: pricing.totalCosts,
        actualProfit: pricing.profit,
        actualProfitMargin: pricing.marginPercent,
        vatAmount: pricing.vat,
        totalWithVAT: pricing.priceIncVat,
      },
    };

    const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    storageSetJSONSync('job-profitability-history', updatedHistory);

    toast({
      title: 'Calculation Complete',
      description: 'Your profitability analysis has been updated.',
      variant: 'success',
    });
  };

  const resetCalculator = () => {
    setInputs({
      materialCost: 0,
      labourHours: 0,
      hourlyRate: 0,
      labourOnCostPercent: 0,
      overheadPercentage: 0,
      desiredProfitMargin: 0,
      quoteAmount: 0,
      travelHours: 0,
      adminHours: 0,
      miles: 0,
      mileageRate: 0.45,
      subcontractorCost: 0,
      parkingTolls: 0,
      consumablesPercent: 0,
      contingencyPercent: 0,
      warrantyReservePercent: 0,
      workers: [
        {
          id: '1',
          role: 'Qualified Electrician',
          hours: 0,
          hourlyRate: 45,
          skillLevel: 'qualified',
        },
      ],
      useMultiWorker: false,
    });
    setErrors({});
    setCustomValues({});
    setSelectedJobType('');
    setSelectedCategory('All');
    setSelectedPreset('');
    toast({
      title: 'Calculator Reset',
      description: 'All fields have been cleared.',
      variant: 'default',
    });
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = jobTypePresets.find((p) => p.id === presetId);
    if (preset) {
      setInputs((prev) => ({
        ...prev,
        labourHours: preset.defaults.labourHours,
        hourlyRate: preset.defaults.hourlyRate,
        overheadPercentage: preset.defaults.overheadPercentage,
        desiredProfitMargin: preset.defaults.desiredProfitMargin,
      }));
      setSelectedJobType(preset.name);
      setCustomValues({});
      toast({
        title: 'Preset Applied',
        description: `Values loaded for ${preset.name}`,
        variant: 'success',
      });
    }
  };

  const categories = getJobPresetsByCategory();
  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));
  const presetOptions = getJobPresetOptions(selectedCategory);
  const selectedPresetData = jobTypePresets.find((p) => p.id === selectedPreset);

  const handleDropdownChange = (field: keyof JobInputs, value: string) => {
    if (value === 'custom') {
      setCustomValues((prev) => ({ ...prev, [field]: true }));
    } else {
      setCustomValues((prev) => ({ ...prev, [field]: false }));
      updateInput(field, parseFloat(value));
    }
  };

  const shareCalculation = () => {
    if (!calculated) {
      toast({
        title: 'Nothing to Share',
        description: 'Please calculate first before sharing.',
        variant: 'destructive',
      });
      return;
    }

    const shareData = {
      jobType: selectedJobType || 'Custom Job',
      materialCost: inputs.materialCost,
      labourHours: inputs.labourHours,
      hourlyRate: inputs.hourlyRate,
      totalCosts: totalCosts.toFixed(2),
      quoteAmount: inputs.quoteAmount,
      profitMargin: actualProfitMargin === null ? '—' : actualProfitMargin.toFixed(1),
    };

    if (navigator.share) {
      navigator.share({
        title: 'Job Profitability Calculation',
        text: `${shareData.jobType}: £${shareData.quoteAmount} quote with ${shareData.profitMargin}% margin`,
        url: window.location.href,
      });
    } else {
      copyToClipboard(
        `Job Profitability Analysis\n` +
          `Job Type: ${shareData.jobType}\n` +
          `Quote: £${shareData.quoteAmount}\n` +
          `Total Costs: £${shareData.totalCosts}\n` +
          `Profit Margin: ${shareData.profitMargin}%`
      );
      toast({
        title: 'Copied to Clipboard',
        description: 'Calculation summary copied to clipboard.',
        variant: 'success',
      });
    }
  };

  const loadExample = () => {
    setInputs({
      materialCost: 650,
      labourHours: 8,
      // A COST per hour, not a charge-out rate — the example previously used
      // £52, which is a domestic selling rate, as though it were a cost.
      hourlyRate: 18.38,
      labourOnCostPercent: 25,
      overheadPercentage: 20,
      desiredProfitMargin: 25,
      quoteAmount: 1100,
      travelHours: 1,
      adminHours: 0.5,
      miles: 20,
      mileageRate: 0.45,
      subcontractorCost: 0,
      parkingTolls: 15,
      consumablesPercent: 5,
      contingencyPercent: 5,
      warrantyReservePercent: 2,
      workers: [
        {
          id: '1',
          role: 'Qualified Electrician',
          hours: 8,
          hourlyRate: 18.38,
          skillLevel: 'qualified',
        },
      ],
      useMultiWorker: false,
    });
    setErrors({});
  };

  const handleWorkersChange = (workers: Worker[]) => {
    const totalHours = workers.reduce((sum, worker) => sum + worker.hours, 0);
    const totalCost = workers.reduce((sum, worker) => sum + worker.hours * worker.hourlyRate, 0);
    const blendedRate = totalHours > 0 ? totalCost / totalHours : 0;

    setInputs((prev) => ({
      ...prev,
      workers,
      labourHours: totalHours,
      hourlyRate: blendedRate,
    }));
  };

  const toggleMultiWorker = () => {
    setInputs((prev) => ({
      ...prev,
      useMultiWorker: !prev.useMultiWorker,
    }));
  };

  // Calculations
  const totalLabourHours = inputs.useMultiWorker
    ? inputs.workers.reduce((sum, worker) => sum + worker.hours, 0)
    : inputs.labourHours;

  const totalLabourCost = inputs.useMultiWorker
    ? inputs.workers.reduce((sum, worker) => sum + worker.hours * worker.hourlyRate, 0)
    : inputs.labourHours * inputs.hourlyRate;

  const blendedHourlyRate =
    totalLabourHours > 0 ? totalLabourCost / totalLabourHours : inputs.hourlyRate;

  /**
   * ONE cost engine. This file previously carried two: this block for the
   * screen, and a second, subtly different copy inside `calculateProfitability`
   * that costed labour as `inputs.labourHours * inputs.hourlyRate` and travel
   * at `inputs.hourlyRate` rather than the blended team rate. Those two stay in
   * step only while `handleWorkersChange` has just run — switch multi-worker on
   * with a stale single-worker rate still in state and the same Calculate press
   * wrote one profit to the screen and a different one to history.
   */
  const costInputs: JobCostInputs = {
    materialCost: inputs.materialCost,
    consumablesPercent: inputs.consumablesPercent,
    labourHours: totalLabourHours,
    labourCostPerHour: blendedHourlyRate,
    labourOnCostPercent: inputs.labourOnCostPercent,
    travelHours: inputs.travelHours,
    adminHours: inputs.adminHours,
    miles: inputs.miles,
    mileageRate: inputs.mileageRate,
    parkingTolls: inputs.parkingTolls,
    subcontractorCost: inputs.subcontractorCost,
    overheadPercentage: inputs.overheadPercentage,
    contingencyPercent: inputs.contingencyPercent,
    warrantyReservePercent: inputs.warrantyReservePercent,
  };

  const breakdown = calculateJobCosts(costInputs);
  // VAT is charged on the net quote and belongs to HMRC — it is never part of
  // cost or profit, so it is passed only for the inc-VAT display line.
  const pricing = priceJob(
    breakdown,
    inputs.quoteAmount,
    inputs.desiredProfitMargin,
    vatRegistered ? vatRate : 0
  );

  const labourCostBase = calculated ? breakdown.labour : 0;
  const nonBillableCost = calculated ? breakdown.nonBillableLabour : 0;
  const mileageCost = calculated ? breakdown.mileage : 0;
  const consumablesCost = calculated ? breakdown.consumables : 0;
  const directCosts = calculated ? breakdown.directCosts : 0;
  const overheadCosts = calculated ? breakdown.overheadCosts : 0;
  const contingencyCost = calculated ? breakdown.contingencyCost : 0;
  const warrantyReserveCost = calculated ? breakdown.warrantyReserveCost : 0;
  const totalCosts = calculated ? breakdown.totalCosts : 0;

  const minimumQuoteExVAT = calculated ? pricing.minimumPriceExVat : 0;
  const actualProfit = calculated ? pricing.profit : 0;
  const actualProfitMargin = calculated ? pricing.marginPercent : null;

  const vatAmount = calculated ? pricing.vat : 0;
  const totalWithVAT = calculated ? pricing.priceIncVat : 0;

  const isValid =
    (inputs.useMultiWorker ? totalLabourHours > 0 : inputs.labourHours > 0) &&
    (inputs.useMultiWorker ? totalLabourCost > 0 : inputs.hourlyRate > 0) &&
    inputs.quoteAmount > 0;

  const getProfitabilityStatus = () => {
    if (!calculated || actualProfitMargin === null) return null;

    if (actualProfitMargin >= inputs.desiredProfitMargin) {
      return {
        status: 'success',
        icon: <CheckCircle className="h-5 w-5" />,
        title: 'Profitable Quote',
        message: `Your quote exceeds the desired profit margin by ${(
          actualProfitMargin - inputs.desiredProfitMargin
        ).toFixed(1)}%`,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10 border-green-500/30',
      };
    } else {
      return {
        status: 'warning',
        icon: <AlertCircle className="h-5 w-5" />,
        title: 'Below Target Margin',
        message: `Increase quote by £${(minimumQuoteExVAT - inputs.quoteAmount).toFixed(
          2
        )} to achieve desired margin`,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/30',
      };
    }
  };

  const profitabilityStatus = getProfitabilityStatus();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Job Profitability Calculator - Electrical Cost Analysis | ElecMate</title>
        <meta
          name="description"
          content="Calculate electrical job profitability with our comprehensive calculator. Analyse quotes, labour costs, materials, and VAT to ensure sustainable profit margins for your electrical business."
        />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <HubMasthead
          section="Business"
          title="Job Profitability Calculator"
          backTo="/electrician/business-development/tools"
        />

        <CalculatorCard
          category="business"
          title="Job Profitability Calculator"
          description="Analyse quote profitability and calculate minimum pricing to achieve your desired profit margins"
          badge="Finance"
        >
          {/* Job Type Presets */}
          <Collapsible open={selectedPreset !== ''} onOpenChange={() => {}}>
            <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Job Type Presets</h3>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorSelect
                label="Job Category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categoryOptions}
              />

              <CalculatorSelect
                label="Job Type"
                value={selectedPreset}
                onChange={handlePresetChange}
                options={presetOptions}
              />
            </div>

            {selectedPresetData && (
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-2">{selectedPresetData.name}</p>
                <p className="text-xs text-white mb-3">{selectedPresetData.description}</p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <Clock className="h-3 w-3 text-elec-yellow mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.labourHours}h
                    </div>
                  </div>
                  <div className="text-center">
                    <PoundSterling className="h-3 w-3 text-elec-yellow mx-auto mb-1" />
                    <div className="text-white font-medium">
                      £{selectedPresetData.defaults.hourlyRate}/h
                    </div>
                  </div>
                  <div className="text-center">
                    <Settings className="h-3 w-3 text-elec-yellow mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.overheadPercentage}%
                    </div>
                    <div className="text-white">overhead</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-3 w-3 text-elec-yellow mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.desiredProfitMargin}%
                    </div>
                    <div className="text-white">margin</div>
                  </div>
                </div>
              </div>
            )}
          </Collapsible>

          {/* Basic Job Information */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Basic Job Information</h3>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Material Cost"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.materialCost || ''}
                onChange={(val) => updateInput('materialCost', parseFloat(val) || 0)}
                placeholder="e.g., 500"
                hint="What you pay, ex VAT"
                error={errors.materialCost}
              />

              <CalculatorInput
                label="Quote Amount (ex VAT)"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.quoteAmount || ''}
                onChange={(val) => updateInput('quoteAmount', parseFloat(val) || 0)}
                placeholder="e.g., 1200"
                error={errors.quoteAmount}
              />
            </div>
          </div>

          {/* Labour Configuration */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Labour Configuration</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-white">Multi-worker</span>
                <input
                  type="checkbox"
                  checked={inputs.useMultiWorker}
                  onChange={toggleMultiWorker}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-elec-yellow focus:ring-elec-yellow/60"
                />
              </label>
            </div>

            {inputs.useMultiWorker ? (
              <div className="space-y-3">
                {/* Team Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">Total Hours</div>
                      <div className="text-white font-medium">{totalLabourHours}h</div>
                    </div>
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">Blended Rate</div>
                      <div className="text-white font-medium">
                        £{blendedHourlyRate.toFixed(2)}/h
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">Total Cost</div>
                      <div className="text-white font-medium">£{totalLabourCost.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Workers */}
                {inputs.workers.map((worker, index) => (
                  <div
                    key={worker.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-elec-yellow">Worker {index + 1}</span>
                      {inputs.workers.length > 1 && (
                        <button
                          onClick={() => {
                            const newWorkers = inputs.workers.filter((w) => w.id !== worker.id);
                            handleWorkersChange(newWorkers);
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <CalculatorInput
                        label="Hours"
                        type="text"
                        inputMode="decimal"
                        value={worker.hours || ''}
                        onChange={(val) => {
                          const newWorkers = inputs.workers.map((w) =>
                            w.id === worker.id ? { ...w, hours: parseFloat(val) || 0 } : w
                          );
                          handleWorkersChange(newWorkers);
                        }}
                        placeholder="0"
                      />
                      <CalculatorInput
                        label="Rate (£/hr)"
                        unit="£"
                        type="text"
                        inputMode="decimal"
                        value={worker.hourlyRate || ''}
                        onChange={(val) => {
                          const newWorkers = inputs.workers.map((w) =>
                            w.id === worker.id ? { ...w, hourlyRate: parseFloat(val) || 0 } : w
                          );
                          handleWorkersChange(newWorkers);
                        }}
                        placeholder="45"
                      />
                    </div>

                    <CalculatorSelect
                      label="Role"
                      value={worker.role}
                      onChange={(value) => {
                        const newWorkers = inputs.workers.map((w) =>
                          w.id === worker.id ? { ...w, role: value } : w
                        );
                        handleWorkersChange(newWorkers);
                      }}
                      options={[
                        { value: 'Qualified Electrician', label: 'Qualified Electrician' },
                        { value: 'Electrician Mate', label: 'Electrician Mate' },
                        { value: 'Apprentice', label: 'Apprentice' },
                        { value: 'Subcontractor', label: 'Subcontractor' },
                      ]}
                    />
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newWorker: Worker = {
                      id: Date.now().toString(),
                      role: 'Qualified Electrician',
                      hours: 0,
                      hourlyRate: 45,
                      skillLevel: 'qualified',
                    };
                    handleWorkersChange([...inputs.workers, newWorker]);
                  }}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-elec-yellow hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Add Worker
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {customValues.labourHours ? (
                  <CalculatorInput
                    label="Labour Hours"
                    type="text"
                    inputMode="decimal"
                    value={inputs.labourHours || ''}
                    onChange={(val) => updateInput('labourHours', parseFloat(val) || 0)}
                    placeholder="e.g., 8"
                    error={errors.labourHours}
                  />
                ) : (
                  <CalculatorSelect
                    label="Labour Hours"
                    value={inputs.labourHours.toString()}
                    onChange={(value) => handleDropdownChange('labourHours', value)}
                    options={labourHoursOptions}
                  />
                )}

                {/* Labelled "Hourly Rate" and fed from a list of charge-out
                    rates ("Emergency Rate", "Expert/Consultant"), yet the value
                    lands in the COST total. A selling rate costed as a cost
                    makes every job look near-break-even. */}
                {customValues.hourlyRate ? (
                  <CalculatorInput
                    label="Labour Cost/hr"
                    unit="£"
                    type="text"
                    inputMode="decimal"
                    value={inputs.hourlyRate || ''}
                    onChange={(val) => updateInput('hourlyRate', parseFloat(val) || 0)}
                    placeholder="e.g., 28"
                    hint="Pay rate, not charge-out"
                    error={errors.hourlyRate}
                  />
                ) : (
                  <CalculatorSelect
                    label="Labour Cost/hr"
                    value={inputs.hourlyRate.toString()}
                    onChange={(value) => handleDropdownChange('hourlyRate', value)}
                    options={hourlyRateOptions}
                  />
                )}
              </div>
            )}

            {/* True labour cost. Without this the pay rate alone was booked as
                the cost of labour, understating cost and overstating profit on
                every job by the whole of employer NI, holiday and pension. */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <CalculatorInput
                label="Labour On-Costs %"
                unit="%"
                type="text"
                inputMode="decimal"
                value={inputs.labourOnCostPercent || ''}
                onChange={(val) => updateInput('labourOnCostPercent', parseFloat(val) || 0)}
                placeholder="e.g., 25"
                hint="Employer NI, holiday, pension"
                error={errors.labourOnCostPercent}
              />
            </div>
          </div>

          {/* Business Parameters */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Business Parameters</h3>

            <div className="grid grid-cols-2 gap-3">
              {customValues.overheadPercentage ? (
                <CalculatorInput
                  label="Overhead %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.overheadPercentage || ''}
                  onChange={(val) => updateInput('overheadPercentage', parseFloat(val) || 0)}
                  placeholder="e.g., 20"
                  error={errors.overheadPercentage}
                />
              ) : (
                <CalculatorSelect
                  label="Overhead %"
                  value={inputs.overheadPercentage.toString()}
                  onChange={(value) => handleDropdownChange('overheadPercentage', value)}
                  options={overheadPercentageOptions}
                />
              )}

              {/* MARGIN, not markup: a share of the selling price. The minimum
                  quote is cost / (1 − margin), never cost × (1 + margin). */}
              {customValues.desiredProfitMargin ? (
                <CalculatorInput
                  label="Target Margin %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.desiredProfitMargin || ''}
                  onChange={(val) => updateInput('desiredProfitMargin', parseFloat(val) || 0)}
                  placeholder="e.g., 25"
                  hint="Share of the price, not of cost"
                  error={errors.desiredProfitMargin}
                />
              ) : (
                <CalculatorSelect
                  label="Target Margin %"
                  value={inputs.desiredProfitMargin.toString()}
                  onChange={(value) => handleDropdownChange('desiredProfitMargin', value)}
                  options={profitMarginOptions}
                />
              )}
            </div>
          </div>

          {/* VAT Configuration */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">VAT Configuration</h3>

            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={vatRegistered}
                  onChange={() => setVATRegistered(true)}
                  className="h-4 w-4 text-elec-yellow focus:ring-elec-yellow/60"
                />
                <span className="text-sm text-white">VAT Registered</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!vatRegistered}
                  onChange={() => setVATRegistered(false)}
                  className="h-4 w-4 text-elec-yellow focus:ring-elec-yellow/60"
                />
                <span className="text-sm text-white">Not Registered</span>
              </label>
            </div>

            {vatRegistered && (
              <CalculatorSelect
                label="VAT Rate"
                value={vatRate.toString()}
                onChange={(value) => setVATRate(parseFloat(value))}
                options={[
                  {
                    value: String(VAT_STANDARD_RATE_PERCENT),
                    label: `${VAT_STANDARD_RATE_PERCENT}% - Standard Rate`,
                  },
                  { value: '5', label: '5% - Reduced Rate' },
                  { value: '0', label: '0% - Zero Rate' },
                ]}
              />
            )}

            {/* VAT is collected for HMRC — it is neither revenue nor a cost, so
                it stays out of every profit figure on this page. */}
            <p className="text-xs text-white mt-2">
              Profit and margin are worked out on the net (ex VAT) quote. VAT is added on top
              and passed to HMRC. Registration is compulsory once taxable turnover passes £
              {VAT_REGISTRATION_THRESHOLD.toLocaleString('en-GB')} in any rolling 12 months.
            </p>
          </div>

          {/* Advanced Options */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white">Additional Costs</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showAdvanced && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Travel Hours"
                  type="text"
                  inputMode="decimal"
                  value={inputs.travelHours || ''}
                  onChange={(val) => updateInput('travelHours', parseFloat(val) || 0)}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Admin Hours"
                  type="text"
                  inputMode="decimal"
                  value={inputs.adminHours || ''}
                  onChange={(val) => updateInput('adminHours', parseFloat(val) || 0)}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Miles"
                  type="text"
                  inputMode="decimal"
                  value={inputs.miles || ''}
                  onChange={(val) => updateInput('miles', parseFloat(val) || 0)}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Mileage Rate"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.mileageRate || ''}
                  onChange={(val) => updateInput('mileageRate', parseFloat(val) || 0)}
                  placeholder="0.45"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Subcontractor"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.subcontractorCost || ''}
                  onChange={(val) => updateInput('subcontractorCost', parseFloat(val) || 0)}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Parking/Tolls"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.parkingTolls || ''}
                  onChange={(val) => updateInput('parkingTolls', parseFloat(val) || 0)}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Relabelled: this is the only place waste/offcuts can be
                    captured, and "Consumables" alone read as clips and tape. */}
                <CalculatorInput
                  label="Consumables & Waste %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.consumablesPercent || ''}
                  onChange={(val) => updateInput('consumablesPercent', parseFloat(val) || 0)}
                  placeholder="0"
                  hint="% of materials"
                  error={errors.consumablesPercent}
                />
                <CalculatorInput
                  label="Contingency %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.contingencyPercent || ''}
                  onChange={(val) => updateInput('contingencyPercent', parseFloat(val) || 0)}
                  placeholder="0"
                  error={errors.contingencyPercent}
                />
              </div>

              {/* `warrantyReservePercent` was already in the cost total but had
                  no input anywhere, so it was permanently 0 and the reserve was
                  never actually priced in. */}
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Warranty Reserve %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.warrantyReservePercent || ''}
                  onChange={(val) => updateInput('warrantyReservePercent', parseFloat(val) || 0)}
                  placeholder="0"
                  hint="Call-backs & remedials"
                  error={errors.warrantyReservePercent}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={calculateProfitability}
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
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Lightbulb className="h-5 w-5" />
            </button>
            <button
              onClick={resetCalculator}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </CalculatorCard>

        {/* Results Section */}
        {calculated && (
          <div className="space-y-4 animate-fade-in">
            {/* Profitability Status */}
            {profitabilityStatus && (
              <div
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border',
                  profitabilityStatus.bgColor
                )}
              >
                <div className={profitabilityStatus.color}>{profitabilityStatus.icon}</div>
                <div>
                  <span className={cn('font-medium', profitabilityStatus.color)}>
                    {profitabilityStatus.title}
                  </span>
                  <p className="text-sm text-white">{profitabilityStatus.message}</p>
                </div>
              </div>
            )}

            <CalculatorResult category="business">
              <ResultHeadline
                label="Profit on this job"
                value={formatCurrency(actualProfit)}
                tone={actualProfit >= 0 ? 'default' : 'negative'}
                aside={actualProfitMargin === null ? undefined : `${actualProfitMargin.toFixed(1)}% margin`}
                caption={
                  actualProfitMargin === null
                    ? 'Enter a quote price to see the margin.'
                    : actualProfitMargin >= inputs.desiredProfitMargin
                      ? `Meets your ${inputs.desiredProfitMargin}% target.`
                      : `Short of your ${inputs.desiredProfitMargin}% target.`
                }
              />

              <ResultsGrid columns={2}>
                <ResultValue
                  label="Total Costs"
                  value={formatCurrency(totalCosts)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Min. Quote"
                  value={formatCurrency(minimumQuoteExVAT)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Direct Costs"
                  value={formatCurrency(directCosts)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Overhead Costs"
                  value={formatCurrency(overheadCosts)}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>

              {/* VAT Breakdown */}
              {vatRegistered && vatAmount > 0 && (
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs text-white mb-3">VAT Breakdown</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">Quote (ex VAT)</div>
                      <div className="text-white font-medium">
                        {formatCurrency(inputs.quoteAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">VAT ({vatRate}%)</div>
                      <div className="text-white font-medium">{formatCurrency(vatAmount)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-elec-yellow mb-1">Total (inc VAT)</div>
                      <div className="text-white font-medium">{formatCurrency(totalWithVAT)}</div>
                    </div>
                  </div>
                </div>
              )}
            </CalculatorResult>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={shareCalculation}
                className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Results
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <History className="h-4 w-4" />
                {history.length}
              </button>
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
                      <span>
                        <strong className="text-elec-yellow">Profit Margin:</strong> The percentage of
                        your quote that remains as profit after all costs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>
                        <strong className="text-elec-yellow">Minimum Quote:</strong> The lowest price
                        to achieve your target profit margin
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>
                        <strong className="text-elec-yellow">Direct Costs:</strong> Materials, labour,
                        travel, and other job-specific expenses
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>
                        <strong className="text-elec-yellow">Overhead Costs:</strong> Business running
                        costs allocated to each job
                      </span>
                    </li>
                  </ul>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        )}

        {/* History Section */}
        {showHistory && history.length > 0 && (
          <Collapsible open={showHistory} onOpenChange={setShowHistory}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">
                    Calculation History ({history.length})
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showHistory && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2">
                  {history.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-white">{item.jobType}</span>
                        <span className="text-xs text-white">
                          {item.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-white">Quote:</span>
                          <span className="text-white ml-1">£{item.inputs.quoteAmount}</span>
                        </div>
                        <div>
                          <span className="text-white">Profit:</span>
                          <span className="text-white ml-1">
                            £{item.results.actualProfit.toFixed(0)}
                          </span>
                        </div>
                        <div>
                          <span className="text-white">Margin:</span>
                          <span
                            className={cn(
                              'ml-1',
                              item.results.actualProfitMargin !== null &&
                                item.results.actualProfitMargin >= item.inputs.desiredProfitMargin
                                ? 'text-green-400'
                                : 'text-red-400'
                            )}
                          >
                            {item.results.actualProfitMargin === null
                              ? '—'
                              : `${item.results.actualProfitMargin.toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Quick Reference */}
        <Collapsible open={showReference} onOpenChange={setShowReference}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Pricing Reference
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
                  <p className="text-amber-300 font-medium">Typical Margins</p>
                  <p className="text-amber-200/70">Small jobs: 25-35%</p>
                  <p className="text-amber-200/70">Medium jobs: 20-30%</p>
                  <p className="text-amber-200/70">Large contracts: 15-25%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Overhead Rates</p>
                  <p className="text-amber-200/70">Sole trader: 10-20%</p>
                  <p className="text-amber-200/70">Small firm: 15-25%</p>
                  <p className="text-amber-200/70">Larger firm: 20-35%</p>
                </div>
                {/* These were charge-out rates sitting under a heading the
                    calculator treats as cost. Replaced with the JIB 2026
                    National Standard pay rates (Transport Provided), which is
                    what the Labour Cost/hr field actually wants. */}
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Labour Cost (JIB 2026)</p>
                  <p className="text-amber-200/70">Electrician: £18.38/hr</p>
                  <p className="text-amber-200/70">Approved: £20.08/hr</p>
                  <p className="text-amber-200/70">Add 20-30% on-costs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Contingency</p>
                  <p className="text-amber-200/70">New build: 5%</p>
                  <p className="text-amber-200/70">Refurb: 10-15%</p>
                  <p className="text-amber-200/70">Unknown scope: 15-20%</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </main>
    </div>
  );
};

export default JobProfitabilityCalculator;
