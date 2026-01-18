import { useState, useEffect } from "react";
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
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import type { Worker } from "@/components/electrician/business-development/job-profitability/WorkerManager";
import {
  labourHoursOptions,
  hourlyRateOptions,
  overheadPercentageOptions,
  profitMarginOptions,
} from "@/components/electrician/business-development/job-profitability/DropdownOptions";
import {
  jobTypePresets,
  getJobPresetsByCategory,
  getJobPresetOptions,
} from "@/components/electrician/business-development/job-profitability/JobTypePresets";
import { Helmet } from "react-helmet";

interface JobInputs {
  materialCost: number;
  labourHours: number;
  hourlyRate: number;
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
  materialMarkupPercent: number;
  contingencyPercent: number;
  warrantyReservePercent: number;
  discountPercent: number;
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
    actualProfitMargin: number;
    vatAmount: number;
    totalWithVAT: number;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

const JobProfitabilityCalculator = () => {
  const config = CALCULATOR_CONFIG["business"];
  const { toast } = useToast();

  const [inputs, setInputs] = useState<JobInputs>({
    materialCost: 0,
    labourHours: 0,
    hourlyRate: 0,
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
    materialMarkupPercent: 0,
    contingencyPercent: 0,
    warrantyReservePercent: 0,
    discountPercent: 0,
    workers: [
      {
        id: "1",
        role: "Qualified Electrician",
        hours: 0,
        hourlyRate: 45,
        skillLevel: "qualified",
      },
    ],
    useMultiWorker: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [calculated, setCalculated] = useState(false);
  const [customValues, setCustomValues] = useState<{ [key: string]: boolean }>({});
  const [vatRate, setVATRate] = useState(20);
  const [vatRegistered, setVATRegistered] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("job-profitability-history");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error("Error loading calculation history:", error);
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

    setCalculated(false);
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (inputs.materialCost < 0)
      newErrors.materialCost = "Material cost cannot be negative";

    if (inputs.useMultiWorker) {
      if (inputs.workers.length === 0)
        newErrors.workers = "At least one worker is required";
      if (totalLabourHours <= 0)
        newErrors.labourHours = "Total labour hours must be greater than 0";
      if (totalLabourCost <= 0)
        newErrors.hourlyRate = "Worker rates must be greater than £0";
    } else {
      if (inputs.labourHours <= 0)
        newErrors.labourHours = "Labour hours must be greater than 0";
      if (inputs.hourlyRate <= 0)
        newErrors.hourlyRate = "Hourly rate must be greater than £0";
    }

    const percentFields: (keyof JobInputs)[] = [
      "overheadPercentage",
      "desiredProfitMargin",
      "consumablesPercent",
      "materialMarkupPercent",
      "contingencyPercent",
      "warrantyReservePercent",
      "discountPercent",
    ];
    percentFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0 || v > 100) newErrors[f as string] = "Must be between 0–100%";
    });

    const nonNegativeFields: (keyof JobInputs)[] = [
      "travelHours",
      "adminHours",
      "miles",
      "mileageRate",
      "subcontractorCost",
      "parkingTolls",
    ];
    nonNegativeFields.forEach((f) => {
      const v = inputs[f] as number;
      if (v < 0) newErrors[f as string] = "Cannot be negative";
    });

    if (inputs.quoteAmount <= 0)
      newErrors.quoteAmount = "Quote amount must be greater than £0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProfitability = () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted errors before calculating.",
        variant: "destructive",
      });
      return;
    }

    setCalculated(true);

    const vatAmount = vatRegistered ? (inputs.quoteAmount * vatRate) / 100 : 0;
    const labourCostBaseLocal = inputs.labourHours * inputs.hourlyRate;
    const nonBillableCostLocal =
      (inputs.travelHours + inputs.adminHours) * inputs.hourlyRate;
    const mileageCostLocal = inputs.miles * inputs.mileageRate;
    const consumablesCostLocal =
      inputs.materialCost * (inputs.consumablesPercent / 100);
    const directCostsLocal =
      inputs.materialCost +
      labourCostBaseLocal +
      nonBillableCostLocal +
      mileageCostLocal +
      inputs.parkingTolls +
      inputs.subcontractorCost +
      consumablesCostLocal;
    const overheadCostsLocal =
      directCostsLocal * (inputs.overheadPercentage / 100);
    const contingencyCostLocal =
      directCostsLocal * (inputs.contingencyPercent / 100);
    const warrantyReserveCostLocal =
      directCostsLocal * (inputs.warrantyReservePercent / 100);
    const totalCostsLocal =
      directCostsLocal +
      overheadCostsLocal +
      contingencyCostLocal +
      warrantyReserveCostLocal;
    const actualProfitLocal = inputs.quoteAmount - totalCostsLocal;
    const actualProfitMarginLocal =
      inputs.quoteAmount > 0
        ? (actualProfitLocal / inputs.quoteAmount) * 100
        : 0;

    const newHistoryItem: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      jobType: selectedJobType || "Custom Job",
      inputs: { ...inputs },
      results: {
        totalCosts: totalCostsLocal,
        actualProfit: actualProfitLocal,
        actualProfitMargin: actualProfitMarginLocal,
        vatAmount,
        totalWithVAT: inputs.quoteAmount + vatAmount,
      },
    };

    const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem("job-profitability-history", JSON.stringify(updatedHistory));

    toast({
      title: "Calculation Complete",
      description: "Your profitability analysis has been updated.",
      variant: "success",
    });
  };

  const resetCalculator = () => {
    setInputs({
      materialCost: 0,
      labourHours: 0,
      hourlyRate: 0,
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
      materialMarkupPercent: 0,
      contingencyPercent: 0,
      warrantyReservePercent: 0,
      discountPercent: 0,
      workers: [
        {
          id: "1",
          role: "Qualified Electrician",
          hours: 0,
          hourlyRate: 45,
          skillLevel: "qualified",
        },
      ],
      useMultiWorker: false,
    });
    setErrors({});
    setCalculated(false);
    setCustomValues({});
    setSelectedJobType("");
    setSelectedCategory("All");
    setSelectedPreset("");
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default",
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
      setCalculated(false);
      setCustomValues({});
      toast({
        title: "Preset Applied",
        description: `Values loaded for ${preset.name}`,
        variant: "success",
      });
    }
  };

  const categories = getJobPresetsByCategory();
  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));
  const presetOptions = getJobPresetOptions(selectedCategory);
  const selectedPresetData = jobTypePresets.find((p) => p.id === selectedPreset);

  const handleDropdownChange = (field: keyof JobInputs, value: string) => {
    if (value === "custom") {
      setCustomValues((prev) => ({ ...prev, [field]: true }));
    } else {
      setCustomValues((prev) => ({ ...prev, [field]: false }));
      updateInput(field, parseFloat(value));
    }
  };

  const shareCalculation = () => {
    if (!calculated) {
      toast({
        title: "Nothing to Share",
        description: "Please calculate first before sharing.",
        variant: "destructive",
      });
      return;
    }

    const shareData = {
      jobType: selectedJobType || "Custom Job",
      materialCost: inputs.materialCost,
      labourHours: inputs.labourHours,
      hourlyRate: inputs.hourlyRate,
      totalCosts: totalCosts.toFixed(2),
      quoteAmount: inputs.quoteAmount,
      profitMargin: actualProfitMargin.toFixed(1),
    };

    if (navigator.share) {
      navigator.share({
        title: "Job Profitability Calculation",
        text: `${shareData.jobType}: £${shareData.quoteAmount} quote with ${shareData.profitMargin}% margin`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `Job Profitability Analysis\n` +
          `Job Type: ${shareData.jobType}\n` +
          `Quote: £${shareData.quoteAmount}\n` +
          `Total Costs: £${shareData.totalCosts}\n` +
          `Profit Margin: ${shareData.profitMargin}%`
      );
      toast({
        title: "Copied to Clipboard",
        description: "Calculation summary copied to clipboard.",
        variant: "success",
      });
    }
  };

  const loadExample = () => {
    setInputs({
      materialCost: 650,
      labourHours: 8,
      hourlyRate: 52,
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
      materialMarkupPercent: 10,
      contingencyPercent: 5,
      warrantyReservePercent: 0,
      discountPercent: 0,
      workers: [
        {
          id: "1",
          role: "Qualified Electrician",
          hours: 8,
          hourlyRate: 52,
          skillLevel: "qualified",
        },
      ],
      useMultiWorker: false,
    });
    setErrors({});
    setCalculated(false);
  };

  const handleWorkersChange = (workers: Worker[]) => {
    const totalHours = workers.reduce((sum, worker) => sum + worker.hours, 0);
    const totalCost = workers.reduce(
      (sum, worker) => sum + worker.hours * worker.hourlyRate,
      0
    );
    const blendedRate = totalHours > 0 ? totalCost / totalHours : 0;

    setInputs((prev) => ({
      ...prev,
      workers,
      labourHours: totalHours,
      hourlyRate: blendedRate,
    }));
    setCalculated(false);
  };

  const toggleMultiWorker = () => {
    setInputs((prev) => ({
      ...prev,
      useMultiWorker: !prev.useMultiWorker,
    }));
    setCalculated(false);
  };

  // Calculations
  const totalLabourHours = inputs.useMultiWorker
    ? inputs.workers.reduce((sum, worker) => sum + worker.hours, 0)
    : inputs.labourHours;

  const totalLabourCost = inputs.useMultiWorker
    ? inputs.workers.reduce(
        (sum, worker) => sum + worker.hours * worker.hourlyRate,
        0
      )
    : inputs.labourHours * inputs.hourlyRate;

  const labourCostBase = calculated ? totalLabourCost : 0;
  const blendedHourlyRate =
    totalLabourHours > 0 ? totalLabourCost / totalLabourHours : inputs.hourlyRate;
  const nonBillableCost = calculated
    ? (inputs.travelHours + inputs.adminHours) * blendedHourlyRate
    : 0;
  const mileageCost = calculated ? inputs.miles * inputs.mileageRate : 0;
  const consumablesCost = calculated
    ? inputs.materialCost * (inputs.consumablesPercent / 100)
    : 0;
  const directCosts = calculated
    ? inputs.materialCost +
      labourCostBase +
      nonBillableCost +
      mileageCost +
      inputs.parkingTolls +
      inputs.subcontractorCost +
      consumablesCost
    : 0;
  const overheadCosts = calculated
    ? directCosts * (inputs.overheadPercentage / 100)
    : 0;
  const contingencyCost = calculated
    ? directCosts * (inputs.contingencyPercent / 100)
    : 0;
  const warrantyReserveCost = calculated
    ? directCosts * (inputs.warrantyReservePercent / 100)
    : 0;
  const totalCosts = calculated
    ? directCosts + overheadCosts + contingencyCost + warrantyReserveCost
    : 0;

  const minimumQuoteExVAT = calculated
    ? totalCosts / Math.max(1 - inputs.desiredProfitMargin / 100, 0.01)
    : 0;
  const actualProfit = calculated ? inputs.quoteAmount - totalCosts : 0;
  const actualProfitMargin =
    calculated && inputs.quoteAmount > 0
      ? (actualProfit / inputs.quoteAmount) * 100
      : 0;

  const vatAmount =
    calculated && vatRegistered ? (inputs.quoteAmount * vatRate) / 100 : 0;
  const totalWithVAT = calculated ? inputs.quoteAmount + vatAmount : 0;

  const isValid =
    (inputs.useMultiWorker ? totalLabourHours > 0 : inputs.labourHours > 0) &&
    (inputs.useMultiWorker ? totalLabourCost > 0 : inputs.hourlyRate > 0) &&
    inputs.quoteAmount > 0;

  const getProfitabilityStatus = () => {
    if (!calculated) return null;

    if (actualProfitMargin >= inputs.desiredProfitMargin) {
      return {
        status: "success",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Profitable Quote",
        message: `Your quote exceeds the desired profit margin by ${(
          actualProfitMargin - inputs.desiredProfitMargin
        ).toFixed(1)}%`,
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/30",
      };
    } else {
      return {
        status: "warning",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Below Target Margin",
        message: `Increase quote by £${(minimumQuoteExVAT - inputs.quoteAmount).toFixed(
          2
        )} to achieve desired margin`,
        color: "text-red-400",
        bgColor: "bg-red-500/10 border-red-500/30",
      };
    }
  };

  const profitabilityStatus = getProfitabilityStatus();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="px-4 py-8  ">
      <Helmet>
        <title>Job Profitability Calculator - Electrical Cost Analysis | ElecMate</title>
        <meta
          name="description"
          content="Calculate electrical job profitability with our comprehensive calculator. Analyse quotes, labour costs, materials, and VAT to ensure sustainable profit margins for your electrical business."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-4">
        <CalculatorCard
          category="business"
          title="Job Profitability Calculator"
          description="Analyse quote profitability and calculate minimum pricing to achieve your desired profit margins"
          badge="Finance"
        >
          {/* Job Type Presets */}
          <Collapsible open={selectedPreset !== ""} onOpenChange={() => {}}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">Job Type Presets</span>
            </div>

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
                <p className="text-sm font-medium text-white mb-2">
                  {selectedPresetData.name}
                </p>
                <p className="text-xs text-white mb-3">
                  {selectedPresetData.description}
                </p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <Clock className="h-3 w-3 text-blue-400 mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.labourHours}h
                    </div>
                  </div>
                  <div className="text-center">
                    <PoundSterling className="h-3 w-3 text-blue-400 mx-auto mb-1" />
                    <div className="text-white font-medium">
                      £{selectedPresetData.defaults.hourlyRate}/h
                    </div>
                  </div>
                  <div className="text-center">
                    <Settings className="h-3 w-3 text-blue-400 mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.overheadPercentage}%
                    </div>
                    <div className="text-white">overhead</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-3 w-3 text-blue-400 mx-auto mb-1" />
                    <div className="text-white font-medium">
                      {selectedPresetData.defaults.desiredProfitMargin}%
                    </div>
                    <div className="text-white">profit</div>
                  </div>
                </div>
              </div>
            )}
          </Collapsible>

          {/* Basic Job Information */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">
                Basic Job Information
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Material Cost"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.materialCost || ""}
                onChange={(val) => updateInput("materialCost", parseFloat(val) || 0)}
                placeholder="e.g., 500"
                error={errors.materialCost}
              />

              <CalculatorInput
                label="Quote Amount (ex VAT)"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.quoteAmount || ""}
                onChange={(val) => updateInput("quoteAmount", parseFloat(val) || 0)}
                placeholder="e.g., 1200"
                error={errors.quoteAmount}
              />
            </div>
          </div>

          {/* Labour Configuration */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white/80">
                  Labour Configuration
                </span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-white">Multi-worker</span>
                <input
                  type="checkbox"
                  checked={inputs.useMultiWorker}
                  onChange={toggleMultiWorker}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                />
              </label>
            </div>

            {inputs.useMultiWorker ? (
              <div className="space-y-3">
                {/* Team Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <div className="text-xs text-blue-400 mb-1">Total Hours</div>
                      <div className="text-white font-medium">{totalLabourHours}h</div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-400 mb-1">Blended Rate</div>
                      <div className="text-white font-medium">
                        £{blendedHourlyRate.toFixed(2)}/h
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-400 mb-1">Total Cost</div>
                      <div className="text-white font-medium">
                        £{totalLabourCost.toFixed(2)}
                      </div>
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
                      <span className="text-xs font-medium text-blue-400">
                        Worker {index + 1}
                      </span>
                      {inputs.workers.length > 1 && (
                        <button
                          onClick={() => {
                            const newWorkers = inputs.workers.filter(
                              (w) => w.id !== worker.id
                            );
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
                        value={worker.hours || ""}
                        onChange={(val) => {
                          const newWorkers = inputs.workers.map((w) =>
                            w.id === worker.id
                              ? { ...w, hours: parseFloat(val) || 0 }
                              : w
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
                        value={worker.hourlyRate || ""}
                        onChange={(val) => {
                          const newWorkers = inputs.workers.map((w) =>
                            w.id === worker.id
                              ? { ...w, hourlyRate: parseFloat(val) || 0 }
                              : w
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
                        { value: "Qualified Electrician", label: "Qualified Electrician" },
                        { value: "Electrician Mate", label: "Electrician Mate" },
                        { value: "Apprentice", label: "Apprentice" },
                        { value: "Subcontractor", label: "Subcontractor" },
                      ]}
                    />
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newWorker: Worker = {
                      id: Date.now().toString(),
                      role: "Qualified Electrician",
                      hours: 0,
                      hourlyRate: 45,
                      skillLevel: "qualified",
                    };
                    handleWorkersChange([...inputs.workers, newWorker]);
                  }}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-blue-400 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
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
                    value={inputs.labourHours || ""}
                    onChange={(val) => updateInput("labourHours", parseFloat(val) || 0)}
                    placeholder="e.g., 8"
                    error={errors.labourHours}
                  />
                ) : (
                  <CalculatorSelect
                    label="Labour Hours"
                    value={inputs.labourHours.toString()}
                    onChange={(value) => handleDropdownChange("labourHours", value)}
                    options={labourHoursOptions}
                  />
                )}

                {customValues.hourlyRate ? (
                  <CalculatorInput
                    label="Hourly Rate"
                    unit="£"
                    type="text"
                    inputMode="decimal"
                    value={inputs.hourlyRate || ""}
                    onChange={(val) => updateInput("hourlyRate", parseFloat(val) || 0)}
                    placeholder="e.g., 45"
                    error={errors.hourlyRate}
                  />
                ) : (
                  <CalculatorSelect
                    label="Hourly Rate"
                    value={inputs.hourlyRate.toString()}
                    onChange={(value) => handleDropdownChange("hourlyRate", value)}
                    options={hourlyRateOptions}
                  />
                )}
              </div>
            )}
          </div>

          {/* Business Parameters */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">
                Business Parameters
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {customValues.overheadPercentage ? (
                <CalculatorInput
                  label="Overhead %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.overheadPercentage || ""}
                  onChange={(val) =>
                    updateInput("overheadPercentage", parseFloat(val) || 0)
                  }
                  placeholder="e.g., 20"
                  error={errors.overheadPercentage}
                />
              ) : (
                <CalculatorSelect
                  label="Overhead %"
                  value={inputs.overheadPercentage.toString()}
                  onChange={(value) => handleDropdownChange("overheadPercentage", value)}
                  options={overheadPercentageOptions}
                />
              )}

              {customValues.desiredProfitMargin ? (
                <CalculatorInput
                  label="Target Profit %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.desiredProfitMargin || ""}
                  onChange={(val) =>
                    updateInput("desiredProfitMargin", parseFloat(val) || 0)
                  }
                  placeholder="e.g., 25"
                  error={errors.desiredProfitMargin}
                />
              ) : (
                <CalculatorSelect
                  label="Target Profit %"
                  value={inputs.desiredProfitMargin.toString()}
                  onChange={(value) =>
                    handleDropdownChange("desiredProfitMargin", value)
                  }
                  options={profitMarginOptions}
                />
              )}
            </div>
          </div>

          {/* VAT Configuration */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <PoundSterling className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">VAT Configuration</span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={vatRegistered}
                  onChange={() => setVATRegistered(true)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-white/80">VAT Registered</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!vatRegistered}
                  onChange={() => setVATRegistered(false)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-white/80">Not Registered</span>
              </label>
            </div>

            {vatRegistered && (
              <CalculatorSelect
                label="VAT Rate"
                value={vatRate.toString()}
                onChange={(value) => setVATRate(parseInt(value))}
                options={[
                  { value: "20", label: "20% - Standard Rate" },
                  { value: "5", label: "5% - Reduced Rate" },
                  { value: "0", label: "0% - Zero Rate" },
                ]}
              />
            )}
          </div>

          {/* Advanced Options */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white/80">
                  Additional Costs
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showAdvanced && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Travel Hours"
                  type="text"
                  inputMode="decimal"
                  value={inputs.travelHours || ""}
                  onChange={(val) => updateInput("travelHours", parseFloat(val) || 0)}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Admin Hours"
                  type="text"
                  inputMode="decimal"
                  value={inputs.adminHours || ""}
                  onChange={(val) => updateInput("adminHours", parseFloat(val) || 0)}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Miles"
                  type="text"
                  inputMode="decimal"
                  value={inputs.miles || ""}
                  onChange={(val) => updateInput("miles", parseFloat(val) || 0)}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Mileage Rate"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.mileageRate || ""}
                  onChange={(val) => updateInput("mileageRate", parseFloat(val) || 0)}
                  placeholder="0.45"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Subcontractor"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.subcontractorCost || ""}
                  onChange={(val) =>
                    updateInput("subcontractorCost", parseFloat(val) || 0)
                  }
                  placeholder="0"
                />
                <CalculatorInput
                  label="Parking/Tolls"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.parkingTolls || ""}
                  onChange={(val) => updateInput("parkingTolls", parseFloat(val) || 0)}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Consumables %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.consumablesPercent || ""}
                  onChange={(val) =>
                    updateInput("consumablesPercent", parseFloat(val) || 0)
                  }
                  placeholder="0"
                />
                <CalculatorInput
                  label="Contingency %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.contingencyPercent || ""}
                  onChange={(val) =>
                    updateInput("contingencyPercent", parseFloat(val) || 0)
                  }
                  placeholder="0"
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
              Calculate
            </button>
            <button
              onClick={loadExample}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Lightbulb className="h-5 w-5" />
            </button>
            <button
              onClick={resetCalculator}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors touch-manipulation"
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
                  "flex items-center gap-3 p-4 rounded-xl border",
                  profitabilityStatus.bgColor
                )}
              >
                <div className={profitabilityStatus.color}>{profitabilityStatus.icon}</div>
                <div>
                  <span className={cn("font-medium", profitabilityStatus.color)}>
                    {profitabilityStatus.title}
                  </span>
                  <p className="text-sm text-white">{profitabilityStatus.message}</p>
                </div>
              </div>
            )}

            <CalculatorResult category="business">
              <div className="text-center pb-4 border-b border-white/10">
                <p className="text-sm text-white mb-1">Actual Profit</p>
                <div
                  className={cn(
                    "text-4xl font-bold",
                    actualProfit >= 0 ? "" : "text-red-400"
                  )}
                  style={
                    actualProfit >= 0
                      ? {
                          backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : undefined
                  }
                >
                  {formatCurrency(actualProfit)}
                </div>
                <p
                  className={cn(
                    "text-sm mt-1",
                    actualProfitMargin >= inputs.desiredProfitMargin
                      ? "text-green-400"
                      : "text-red-400"
                  )}
                >
                  {actualProfitMargin.toFixed(1)}% Margin
                </p>
              </div>

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
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-blue-400 mb-1">Quote (ex VAT)</div>
                      <div className="text-white font-medium">
                        {formatCurrency(inputs.quoteAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-400 mb-1">VAT ({vatRate}%)</div>
                      <div className="text-white font-medium">
                        {formatCurrency(vatAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-400 mb-1">Total (inc VAT)</div>
                      <div className="text-white font-medium">
                        {formatCurrency(totalWithVAT)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CalculatorResult>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={shareCalculation}
                className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Results
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <History className="h-4 w-4" />
                {history.length}
              </button>
            </div>

            {/* What This Means */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div
                className="calculator-card overflow-hidden"
                style={{ borderColor: "#60a5fa15" }}
              >
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      What This Means
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
                  <ul className="space-y-2 text-sm text-blue-200/80">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Profit Margin:</strong> The
                        percentage of your quote that remains as profit after all costs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Minimum Quote:</strong> The
                        lowest price to achieve your target profit margin
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Direct Costs:</strong> Materials,
                        labour, travel, and other job-specific expenses
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Overhead Costs:</strong> Business
                        running costs allocated to each job
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
            <div
              className="calculator-card overflow-hidden"
              style={{ borderColor: "#fbbf2415" }}
            >
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">
                    Calculation History ({history.length})
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/80 transition-transform duration-200",
                    showHistory && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-white">
                          {item.jobType}
                        </span>
                        <span className="text-xs text-white">
                          {item.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-white">Quote:</span>
                          <span className="text-white ml-1">
                            £{item.inputs.quoteAmount}
                          </span>
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
                              "ml-1",
                              item.results.actualProfitMargin >=
                                item.inputs.desiredProfitMargin
                                ? "text-green-400"
                                : "text-red-400"
                            )}
                          >
                            {item.results.actualProfitMargin.toFixed(1)}%
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
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#fbbf2415" }}
          >
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Pricing Reference
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
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Labour Rates (UK)</p>
                  <p className="text-amber-200/70">Apprentice: £15-25/hr</p>
                  <p className="text-amber-200/70">Qualified: £35-55/hr</p>
                  <p className="text-amber-200/70">Specialist: £50-80/hr</p>
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
      </div>
    </div>
  );
};

export default JobProfitabilityCalculator;
