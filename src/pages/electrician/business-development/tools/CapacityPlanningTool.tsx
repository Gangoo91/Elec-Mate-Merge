import { useState } from "react";
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
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface CapacityInputs {
  totalElectricians: number;
  workingHoursPerDay: number;
  workingDaysPerWeek: number;
  weeksPerYear: number;
  adminTimePercentage: number;
  travelTimePercentage: number;
  holidayDays: number;
  sickDays: number;
  trainingDays: number;
  averageJobHours: number;
  emergencyWorkPercentage: number;
  plannedMaintenancePercentage: number;
  growthTargetPercentage: number;
}

const CapacityPlanningTool = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [inputs, setInputs] = useState<CapacityInputs>({
    totalElectricians: 1,
    workingHoursPerDay: 8,
    workingDaysPerWeek: 5,
    weeksPerYear: 52,
    adminTimePercentage: 15,
    travelTimePercentage: 20,
    holidayDays: 28,
    sickDays: 5,
    trainingDays: 3,
    averageJobHours: 6,
    emergencyWorkPercentage: 20,
    plannedMaintenancePercentage: 30,
    growthTargetPercentage: 25,
  });

  const [calculated, setCalculated] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof CapacityInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
    setCalculated(false);
  };

  const calculateCapacity = () => {
    setCalculated(true);
  };

  const resetTool = () => {
    setInputs({
      totalElectricians: 1,
      workingHoursPerDay: 8,
      workingDaysPerWeek: 5,
      weeksPerYear: 52,
      adminTimePercentage: 15,
      travelTimePercentage: 20,
      holidayDays: 28,
      sickDays: 5,
      trainingDays: 3,
      averageJobHours: 6,
      emergencyWorkPercentage: 20,
      plannedMaintenancePercentage: 30,
      growthTargetPercentage: 25,
    });
    setCalculated(false);
  };

  const loadExample = () => {
    setInputs({
      totalElectricians: 3,
      workingHoursPerDay: 8,
      workingDaysPerWeek: 5,
      weeksPerYear: 50,
      adminTimePercentage: 18,
      travelTimePercentage: 25,
      holidayDays: 28,
      sickDays: 7,
      trainingDays: 5,
      averageJobHours: 4,
      emergencyWorkPercentage: 25,
      plannedMaintenancePercentage: 35,
      growthTargetPercentage: 30,
    });
    setCalculated(false);
  };

  // Calculate capacity metrics
  const calculateMetrics = () => {
    // Calculate total available hours
    const totalWorkingDays =
      inputs.weeksPerYear * inputs.workingDaysPerWeek -
      inputs.holidayDays -
      inputs.sickDays -
      inputs.trainingDays;
    const totalAvailableHours =
      inputs.totalElectricians * totalWorkingDays * inputs.workingHoursPerDay;

    // Calculate non-billable time
    const adminHours = totalAvailableHours * (inputs.adminTimePercentage / 100);
    const travelHours =
      totalAvailableHours * (inputs.travelTimePercentage / 100);
    const nonBillableHours = adminHours + travelHours;

    // Calculate billable hours
    const billableHours = totalAvailableHours - nonBillableHours;

    // Calculate job capacity
    const jobsPerYear =
      inputs.averageJobHours > 0 ? billableHours / inputs.averageJobHours : 0;
    const jobsPerWeek = jobsPerYear / inputs.weeksPerYear;
    const jobsPerDay = jobsPerWeek / inputs.workingDaysPerWeek;

    // Calculate utilization
    const utilizationRate =
      totalAvailableHours > 0
        ? (billableHours / totalAvailableHours) * 100
        : 0;

    // Calculate work type distribution
    const emergencyCapacity =
      billableHours * (inputs.emergencyWorkPercentage / 100);
    const maintenanceCapacity =
      billableHours * (inputs.plannedMaintenancePercentage / 100);
    const newWorkCapacity =
      billableHours - emergencyCapacity - maintenanceCapacity;

    // Calculate growth capacity
    const targetHours =
      billableHours * (1 + inputs.growthTargetPercentage / 100);
    const capacityGap = targetHours - billableHours;
    const additionalStaffNeeded =
      capacityGap > 0
        ? Math.ceil(
            capacityGap /
              ((totalAvailableHours / inputs.totalElectricians) *
                (utilizationRate / 100))
          )
        : 0;

    return {
      totalAvailableHours,
      billableHours,
      nonBillableHours,
      jobsPerYear: Math.round(jobsPerYear),
      jobsPerWeek: Math.round(jobsPerWeek * 10) / 10,
      jobsPerDay: Math.round(jobsPerDay * 10) / 10,
      utilizationRate,
      additionalStaffNeeded,
      emergencyCapacity,
      maintenanceCapacity,
      newWorkCapacity,
    };
  };

  const metrics = calculateMetrics();

  const getCapacityStatus = () => {
    if (metrics.utilizationRate >= 85) {
      return {
        color: "text-red-400",
        label: "Overutilized",
        bg: "bg-red-500/10 border-red-500/30",
      };
    }
    if (metrics.utilizationRate >= 70) {
      return {
        color: "text-green-400",
        label: "Optimal",
        bg: "bg-green-500/10 border-green-500/30",
      };
    }
    if (metrics.utilizationRate >= 50) {
      return {
        color: "text-amber-400",
        label: "Underutilized",
        bg: "bg-amber-500/10 border-amber-500/30",
      };
    }
    return {
      color: "text-orange-400",
      label: "Very Low",
      bg: "bg-orange-500/10 border-orange-500/30",
    };
  };

  const isValid =
    inputs.totalElectricians > 0 &&
    inputs.workingHoursPerDay > 0 &&
    inputs.weeksPerYear > 0;
  const capacityStatus = getCapacityStatus();

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="business"
        title="Capacity Planning Tool"
        description="Plan workforce capacity and analyze utilization to optimize productivity"
        badge="Business"
      >
        {/* Team Structure */}
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">
            Team Structure
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Total Electricians"
            type="text"
            inputMode="decimal"
            value={inputs.totalElectricians.toString()}
            onChange={(val) => updateInput("totalElectricians", val)}
            placeholder="e.g., 1"
            hint="Qualified staff"
          />

          <CalculatorInput
            label="Hours per Day"
            type="text"
            inputMode="decimal"
            value={inputs.workingHoursPerDay.toString()}
            onChange={(val) => updateInput("workingHoursPerDay", val)}
            placeholder="e.g., 8"
            hint="Working hours"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Days per Week"
            type="text"
            inputMode="decimal"
            value={inputs.workingDaysPerWeek.toString()}
            onChange={(val) => updateInput("workingDaysPerWeek", val)}
            placeholder="e.g., 5"
            hint="Operating days"
          />

          <CalculatorInput
            label="Weeks per Year"
            type="text"
            inputMode="decimal"
            value={inputs.weeksPerYear.toString()}
            onChange={(val) => updateInput("weeksPerYear", val)}
            placeholder="e.g., 52"
            hint="Annual weeks"
          />
        </div>

        {/* Time Allocation */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">
            Time Allocation
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Admin Time"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.adminTimePercentage.toString()}
            onChange={(val) => updateInput("adminTimePercentage", val)}
            placeholder="e.g., 15"
            hint="Paperwork, quotes"
          />

          <CalculatorInput
            label="Travel Time"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.travelTimePercentage.toString()}
            onChange={(val) => updateInput("travelTimePercentage", val)}
            placeholder="e.g., 20"
            hint="Between jobs"
          />
        </div>

        {/* Time Off */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Calendar className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">
            Time Off (Days/Year)
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CalculatorInput
            label="Holiday"
            type="text"
            inputMode="decimal"
            value={inputs.holidayDays.toString()}
            onChange={(val) => updateInput("holidayDays", val)}
            placeholder="28"
            hint="Leave + bank"
          />

          <CalculatorInput
            label="Sick"
            type="text"
            inputMode="decimal"
            value={inputs.sickDays.toString()}
            onChange={(val) => updateInput("sickDays", val)}
            placeholder="5"
            hint="Average"
          />

          <CalculatorInput
            label="Training"
            type="text"
            inputMode="decimal"
            value={inputs.trainingDays.toString()}
            onChange={(val) => updateInput("trainingDays", val)}
            placeholder="3"
            hint="CPD days"
          />
        </div>

        {/* Work Profile */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Briefcase className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Work Profile</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Avg Job Duration"
            unit="hrs"
            type="text"
            inputMode="decimal"
            value={inputs.averageJobHours.toString()}
            onChange={(val) => updateInput("averageJobHours", val)}
            placeholder="e.g., 6"
            hint="Typical job time"
          />

          <CalculatorInput
            label="Growth Target"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.growthTargetPercentage.toString()}
            onChange={(val) => updateInput("growthTargetPercentage", val)}
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
            onChange={(val) => updateInput("emergencyWorkPercentage", val)}
            placeholder="e.g., 20"
            hint="Urgent jobs"
          />

          <CalculatorInput
            label="Maintenance"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.plannedMaintenancePercentage.toString()}
            onChange={(val) => updateInput("plannedMaintenancePercentage", val)}
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
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid
                ? "text-black"
                : "bg-white/10 text-white/30 cursor-not-allowed"
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
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors touch-manipulation text-sm"
          >
            Example
          </button>
          <button
            onClick={resetTool}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {calculated && isValid && (
        <div className="space-y-4 animate-fade-in">
          {/* Utilization Status */}
          <div
            className={cn(
              "flex items-center gap-2 p-3 rounded-xl border",
              capacityStatus.bg
            )}
          >
            {metrics.utilizationRate >= 70 && metrics.utilizationRate < 85 ? (
              <CheckCircle className={cn("h-5 w-5", capacityStatus.color)} />
            ) : (
              <AlertCircle className={cn("h-5 w-5", capacityStatus.color)} />
            )}
            <span className={cn("font-medium text-sm", capacityStatus.color)}>
              {capacityStatus.label} - {metrics.utilizationRate.toFixed(1)}%
              Utilization
            </span>
          </div>

          <CalculatorResult category="business">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white mb-1">Annual Billable Hours</p>
              <div
                className="text-4xl font-bold"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {metrics.billableHours.toFixed(0)}
              </div>
            </div>

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
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#60a5fa15" }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Time Allocation Analysis
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-white text-xs font-medium">
                    Annual Hours
                  </p>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Available:</span>
                    <span className="text-white">
                      {metrics.totalAvailableHours.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Billable:</span>
                    <span className="text-green-400">
                      {metrics.billableHours.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Non-billable:</span>
                    <span className="text-red-400">
                      {metrics.nonBillableHours.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-white text-xs font-medium">
                    Work Distribution
                  </p>
                  <div className="flex justify-between">
                    <span className="text-white/70">Emergency:</span>
                    <span className="text-red-300">
                      {metrics.emergencyCapacity.toFixed(0)} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Maintenance:</span>
                    <span className="text-blue-300">
                      {metrics.maintenanceCapacity.toFixed(0)} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">New Projects:</span>
                    <span className="text-green-300">
                      {metrics.newWorkCapacity.toFixed(0)} hrs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planning Insights */}
          <div
            className={cn(
              "p-4 rounded-xl border",
              capacityStatus.bg
            )}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium mb-2">Planning Insight</h4>
                <p className="text-sm text-white/70">
                  {metrics.utilizationRate >= 85
                    ? "Consider hiring additional staff or reducing workload to prevent burnout and maintain quality standards. High utilization can lead to mistakes and safety issues."
                    : metrics.utilizationRate >= 70
                    ? "Your team is operating at an ideal utilization level. You have capacity for emergency work while maintaining quality and work-life balance."
                    : metrics.utilizationRate >= 50
                    ? "There's opportunity to take on more work or improve efficiency. Consider marketing efforts, expanding services, or optimizing scheduling."
                    : "Very low utilization suggests serious capacity management issues. Review pricing, marketing, and operational efficiency."}
                </p>
              </div>
            </div>
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
                    <strong className="text-blue-300">Utilization 70-80%:</strong>{" "}
                    Optimal range with flexibility for emergencies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">Above 85%:</strong> Risk of
                    burnout and quality issues
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">Below 50%:</strong> Capacity
                    being wasted, review marketing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">Staff for growth:</strong>{" "}
                    Additional electricians needed to hit target
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
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
                Capacity Planning Tips
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
                <p className="text-amber-300 font-medium">Optimal Utilization</p>
                <p className="text-amber-200/70">Target: 70-80%</p>
                <p className="text-amber-200/70">Buffer for emergencies</p>
                <p className="text-amber-200/70">Prevents burnout</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Growth Planning</p>
                <p className="text-amber-200/70">Plan 3-6 months ahead</p>
                <p className="text-amber-200/70">Training takes time</p>
                <p className="text-amber-200/70">BS7671 compliance</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">UK Holidays</p>
                <p className="text-amber-200/70">Min: 28 days (inc bank)</p>
                <p className="text-amber-200/70">Avg sick: 4-7 days</p>
                <p className="text-amber-200/70">CPD: 35hrs/year</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Efficiency</p>
                <p className="text-amber-200/70">Monitor travel time</p>
                <p className="text-amber-200/70">Reduce admin burden</p>
                <p className="text-amber-200/70">Optimize scheduling</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default CapacityPlanningTool;
