import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  ChevronLeft,
  RotateCcw,
  Calculator,
  TrendingUp,
  PoundSterling,
  MapPin,
  Clock,
  CheckCircle,
  ChevronDown,
  GraduationCap,
  Building2,
  Users,
  Wrench,
  Car,
  Heart,
  Award,
  Briefcase,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type AgeRange = "16-18" | "19-24" | "25+";
type BusinessSize = "small" | "medium" | "large";
type Region = "london" | "southeast" | "southwest" | "midlands" | "northwest" | "northeast" | "scotland" | "wales" | "ni";
type Level = "level2" | "level3" | "level4";
type Provider = "fe-college" | "private-provider" | "university-tc" | "apprenticeship-company";
type Sector = "domestic" | "commercial" | "industrial" | "renewable" | "data-comms";
type Experience = "complete-beginner" | "some-construction" | "related-trade" | "electrical-helper";
type Pattern = "full-time" | "part-time" | "block-release" | "day-release";
type Benefit = "company-vehicle" | "health-insurance" | "performance-bonus" | "tool-allowance" | "pension-enhanced" | "training-budget";

interface SelectOption<T> {
  value: T;
  label: string;
  sublabel?: string;
}

// Data configurations
const wageRates = {
  "16-18": { apprentice: 6.81, minimum: 6.81 },
  "19-24": { apprentice: 6.81, minimum: 11.44 },
  "25+": { apprentice: 6.81, minimum: 11.44 }
};

const regionalMultipliers: Record<Region, number> = {
  london: 1.25, southeast: 1.15, southwest: 1.05, midlands: 1.0,
  northwest: 0.95, northeast: 0.92, scotland: 1.05, wales: 0.98, ni: 0.92
};

const apprenticeshipLevels = {
  level2: { duration: 18, baseCost: 4000, qualification: "Level 2" },
  level3: { duration: 42, baseCost: 9000, qualification: "Level 3" },
  level4: { duration: 48, baseCost: 15000, qualification: "Level 4" }
};

const trainingProviderMultipliers: Record<Provider, number> = {
  "fe-college": 1.0, "private-provider": 1.3, "university-tc": 1.5, "apprenticeship-company": 0.9
};

const sectorData = {
  domestic: { wageMultiplier: 1.0, equipmentCost: 800, demandFactor: 1.0 },
  commercial: { wageMultiplier: 1.15, equipmentCost: 1500, demandFactor: 1.2 },
  industrial: { wageMultiplier: 1.25, equipmentCost: 2200, demandFactor: 1.3 },
  renewable: { wageMultiplier: 1.4, equipmentCost: 1800, demandFactor: 1.5 },
  "data-comms": { wageMultiplier: 1.3, equipmentCost: 1200, demandFactor: 1.25 }
};

const experienceAdjustments = {
  "complete-beginner": { timeMultiplier: 1.0, supervisionCost: 2000 },
  "some-construction": { timeMultiplier: 0.9, supervisionCost: 1500 },
  "related-trade": { timeMultiplier: 0.8, supervisionCost: 1000 },
  "electrical-helper": { timeMultiplier: 0.7, supervisionCost: 500 }
};

const workingPatterns = {
  "full-time": { hoursPerWeek: 40, costMultiplier: 1.0, progressionRate: 1.0 },
  "part-time": { hoursPerWeek: 25, costMultiplier: 0.65, progressionRate: 0.7 },
  "block-release": { hoursPerWeek: 40, costMultiplier: 1.1, progressionRate: 1.1 },
  "day-release": { hoursPerWeek: 32, costMultiplier: 0.85, progressionRate: 0.9 }
};

const benefitsCosts: Record<Benefit, { cost: number; label: string; icon: typeof Car }> = {
  "company-vehicle": { cost: 3600, label: "Company Van", icon: Car },
  "health-insurance": { cost: 1200, label: "Health Cover", icon: Heart },
  "performance-bonus": { cost: 1500, label: "Bonus Scheme", icon: Award },
  "tool-allowance": { cost: 800, label: "Tool Allowance", icon: Wrench },
  "pension-enhanced": { cost: 600, label: "Enhanced Pension", icon: Briefcase },
  "training-budget": { cost: 1000, label: "Training Budget", icon: BookOpen }
};

const EnhancedCostCalculator = () => {
  const navigate = useNavigate();
  const [apprenticeAge, setApprenticeAge] = useState<AgeRange | "">("");
  const [businessSize, setBusinessSize] = useState<BusinessSize | "">("");
  const [region, setRegion] = useState<Region | "">("");
  const [apprenticeshipLevel, setApprenticeshipLevel] = useState<Level | "">("");
  const [trainingProvider, setTrainingProvider] = useState<Provider | "">("");
  const [sectorSpecialisation, setSectorSpecialisation] = useState<Sector | "">("");
  const [previousExperience, setPreviousExperience] = useState<Experience | "">("");
  const [workingPattern, setWorkingPattern] = useState<Pattern | "">("");
  const [additionalBenefits, setAdditionalBenefits] = useState<Benefit[]>([]);
  const [numberOfApprentices, setNumberOfApprentices] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("basic");

  const toggleBenefit = (benefit: Benefit) => {
    setAdditionalBenefits(prev =>
      prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit]
    );
  };

  const resetCalculator = () => {
    setApprenticeAge("");
    setBusinessSize("");
    setRegion("");
    setApprenticeshipLevel("");
    setTrainingProvider("");
    setSectorSpecialisation("");
    setPreviousExperience("");
    setWorkingPattern("");
    setAdditionalBenefits([]);
    setNumberOfApprentices(1);
  };

  const getIncentives = (age: AgeRange, biz: BusinessSize, level: Level) => {
    let incentive = 0;
    if (age === "16-18") incentive = 3000;
    else if (age === "19-24") incentive = 1500;
    if (biz === "small" && age === "16-18") incentive += 1000;
    if (level === "level4") incentive += 500;
    if (biz === "large") incentive += 2000;
    return incentive;
  };

  const calculatedResults = useMemo(() => {
    if (!apprenticeAge || !businessSize || !region || !apprenticeshipLevel ||
        !trainingProvider || !sectorSpecialisation || !previousExperience || !workingPattern) {
      return null;
    }

    const baseWage = wageRates[apprenticeAge].apprentice;
    const regionalMultiplier = regionalMultipliers[region];
    const sectorInfo = sectorData[sectorSpecialisation];
    const experienceInfo = experienceAdjustments[previousExperience];
    const patternInfo = workingPatterns[workingPattern];
    const levelInfo = apprenticeshipLevels[apprenticeshipLevel];
    const providerMultiplier = trainingProviderMultipliers[trainingProvider];

    const adjustedWage = baseWage * regionalMultiplier * sectorInfo.wageMultiplier * patternInfo.costMultiplier;
    const annualSalary = adjustedWage * patternInfo.hoursPerWeek * 52;

    const employerNI = annualSalary * 0.138;
    const pension = annualSalary * 0.03;
    const equipment = sectorInfo.equipmentCost * regionalMultiplier;
    const admin = 800;
    const supervisionCost = experienceInfo.supervisionCost;

    const baseTrainingCost = levelInfo.baseCost * providerMultiplier;
    const collegeContribution = businessSize === "small" ? baseTrainingCost * 0.1 : baseTrainingCost * 0.2;

    const benefitsCost = additionalBenefits.reduce((total, benefit) =>
      total + benefitsCosts[benefit].cost, 0);

    const incentive = getIncentives(apprenticeAge, businessSize, apprenticeshipLevel);

    const durationMonths = levelInfo.duration * experienceInfo.timeMultiplier / patternInfo.progressionRate;
    const yearTwoCosts = (annualSalary * 1.1 + employerNI * 1.1 + pension * 1.1) * patternInfo.costMultiplier;
    const yearThreeCosts = (annualSalary * 1.25 + employerNI * 1.25 + pension * 1.25) * patternInfo.costMultiplier;
    const yearFourCosts = durationMonths > 36 ? (annualSalary * 1.4 + employerNI * 1.4 + pension * 1.4) * patternInfo.costMultiplier : 0;

    const totalYearOne = annualSalary + employerNI + pension + equipment + admin + collegeContribution + supervisionCost + benefitsCost - incentive;
    const totalInvestment = totalYearOne + yearTwoCosts + yearThreeCosts + yearFourCosts;

    const baseQualifiedValue = 42000;
    const qualifiedElectricianValue = baseQualifiedValue * sectorInfo.demandFactor * regionalMultiplier * 5;
    const netROI = ((qualifiedElectricianValue - totalInvestment) / totalInvestment) * 100;

    return {
      baseWage: adjustedWage,
      annualSalary,
      totalYearOne,
      totalInvestment,
      netROI,
      durationMonths,
      incentive,
      benefitsCost,
      supervisionCost,
      sectorInfo,
      levelInfo,
      regionalMultiplier,
      yearTwoCosts,
      yearThreeCosts,
      yearFourCosts
    };
  }, [apprenticeAge, businessSize, region, apprenticeshipLevel, trainingProvider, sectorSpecialisation, previousExperience, workingPattern, additionalBenefits]);

  const multipleResults = useMemo(() => {
    if (!calculatedResults || numberOfApprentices <= 1) return null;
    const bulkDiscount = numberOfApprentices > 5 ? 0.15 : numberOfApprentices > 3 ? 0.1 : 0.05;
    const totalCost = calculatedResults.totalInvestment * numberOfApprentices * (1 - bulkDiscount);
    return { totalCost, bulkDiscount };
  }, [calculatedResults, numberOfApprentices]);

  // Selection button component
  const SelectButton = <T extends string>({
    options, value, onChange, placeholder
  }: { options: SelectOption<T>[]; value: T | ""; onChange: (v: T) => void; placeholder: string }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`p-3 rounded-xl border text-left transition-all touch-manipulation active:scale-[0.98] ${
            value === opt.value
              ? "bg-elec-yellow/20 border-elec-yellow/50"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <p className={`text-ios-subhead font-medium ${value === opt.value ? "text-elec-yellow" : "text-white"}`}>
            {opt.label}
          </p>
          {opt.sublabel && (
            <p className="text-ios-caption-2 text-white/50">{opt.sublabel}</p>
          )}
        </button>
      ))}
    </div>
  );

  const CollapsibleSection = ({ id, title, icon: Icon, children }: {
    id: string; title: string; icon: typeof Users; children: React.ReactNode
  }) => (
    <section>
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-elec-yellow/20 rounded-xl">
            <Icon className="h-5 w-5 text-elec-yellow" />
          </div>
          <span className="text-ios-headline font-semibold text-white">{title}</span>
        </div>
        <motion.div animate={{ rotate: expandedSection === id ? 180 : 0 }}>
          <ChevronDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/[0.02] border-x border-b border-white/10 rounded-b-2xl p-4 -mt-2 pt-6 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark to-black">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-ios-headline text-white font-semibold">Apprentice Costs</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetCalculator}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 pb-32 sm:pb-6 max-w-2xl mx-auto">
        {/* Hero Result */}
        {calculatedResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10
                       backdrop-blur-xl border border-green-500/30 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            <div className="relative space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Year 1 Investment</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
                    £{calculatedResults.totalYearOne.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-green-500/20 border border-green-500/30">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-ios-footnote text-green-400">
                  {calculatedResults.netROI.toFixed(0)}% expected ROI • {Math.round(calculatedResults.durationMonths)} months
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
            <Calculator className="h-12 w-12 text-white/30 mx-auto mb-3" />
            <p className="text-ios-body text-white/50">Complete all sections to see your cost projection</p>
          </div>
        )}

        {/* Summary Stats */}
        {calculatedResults && (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex-shrink-0 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 min-w-[110px]">
              <p className="text-ios-caption-1 text-blue-400">Total</p>
              <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
                £{(calculatedResults.totalInvestment / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 min-w-[110px]">
              <p className="text-ios-caption-1 text-green-400">Incentive</p>
              <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
                £{calculatedResults.incentive.toLocaleString()}
              </p>
            </div>
            <div className="flex-shrink-0 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 min-w-[110px]">
              <p className="text-ios-caption-1 text-amber-400">Hourly</p>
              <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
                £{calculatedResults.baseWage.toFixed(2)}
              </p>
            </div>
            <div className="flex-shrink-0 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 min-w-[110px]">
              <p className="text-ios-caption-1 text-purple-400">Region</p>
              <p className="text-ios-title-3 font-semibold text-white mt-1">
                {calculatedResults.regionalMultiplier}x
              </p>
            </div>
          </div>
        )}

        {/* Multi-apprentice badge */}
        {multipleResults && (
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ios-subhead font-medium text-elec-yellow">
                  {numberOfApprentices} Apprentices
                </p>
                <p className="text-ios-caption-1 text-amber-200/70">
                  {(multipleResults.bulkDiscount * 100).toFixed(0)}% bulk discount applied
                </p>
              </div>
              <p className="text-xl font-bold text-white tabular-nums">
                £{(multipleResults.totalCost / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        )}

        {/* Basic Info Section */}
        <CollapsibleSection id="basic" title="Basic Information" icon={Users}>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2">Age Range</p>
          <SelectButton<AgeRange>
            value={apprenticeAge}
            onChange={setApprenticeAge}
            placeholder="Select age"
            options={[
              { value: "16-18", label: "16-18", sublabel: "£6.81/hr" },
              { value: "19-24", label: "19-24", sublabel: "£6.81/hr" },
              { value: "25+", label: "25+", sublabel: "£6.81/hr" }
            ]}
          />

          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2 mt-4">Business Size</p>
          <SelectButton<BusinessSize>
            value={businessSize}
            onChange={setBusinessSize}
            placeholder="Select size"
            options={[
              { value: "small", label: "Small", sublabel: "<50 staff" },
              { value: "medium", label: "Medium", sublabel: "50-250" },
              { value: "large", label: "Large", sublabel: "250+" }
            ]}
          />

          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2 mt-4">Region</p>
          <SelectButton<Region>
            value={region}
            onChange={setRegion}
            placeholder="Select region"
            options={[
              { value: "london", label: "London", sublabel: "1.25x" },
              { value: "southeast", label: "South East", sublabel: "1.15x" },
              { value: "southwest", label: "South West", sublabel: "1.05x" },
              { value: "midlands", label: "Midlands", sublabel: "1.0x" },
              { value: "northwest", label: "North West", sublabel: "0.95x" },
              { value: "northeast", label: "North East", sublabel: "0.92x" },
              { value: "scotland", label: "Scotland", sublabel: "1.05x" },
              { value: "wales", label: "Wales", sublabel: "0.98x" },
              { value: "ni", label: "N. Ireland", sublabel: "0.92x" }
            ]}
          />
        </CollapsibleSection>

        {/* Training Section */}
        <CollapsibleSection id="training" title="Training Details" icon={GraduationCap}>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2">Level</p>
          <SelectButton<Level>
            value={apprenticeshipLevel}
            onChange={setApprenticeshipLevel}
            placeholder="Select level"
            options={[
              { value: "level2", label: "Level 2", sublabel: "18 months" },
              { value: "level3", label: "Level 3", sublabel: "42 months" },
              { value: "level4", label: "Level 4", sublabel: "48 months" }
            ]}
          />

          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2 mt-4">Provider Type</p>
          <SelectButton<Provider>
            value={trainingProvider}
            onChange={setTrainingProvider}
            placeholder="Select provider"
            options={[
              { value: "fe-college", label: "FE College", sublabel: "Standard" },
              { value: "private-provider", label: "Private", sublabel: "+30%" },
              { value: "university-tc", label: "UTC", sublabel: "+50%" },
              { value: "apprenticeship-company", label: "Apprenticeship Co", sublabel: "-10%" }
            ]}
          />

          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2 mt-4">Sector</p>
          <SelectButton<Sector>
            value={sectorSpecialisation}
            onChange={setSectorSpecialisation}
            placeholder="Select sector"
            options={[
              { value: "domestic", label: "Domestic", sublabel: "1.0x demand" },
              { value: "commercial", label: "Commercial", sublabel: "1.2x demand" },
              { value: "industrial", label: "Industrial", sublabel: "1.3x demand" },
              { value: "renewable", label: "Renewable", sublabel: "1.5x demand" },
              { value: "data-comms", label: "Data/Comms", sublabel: "1.25x demand" }
            ]}
          />
        </CollapsibleSection>

        {/* Experience Section */}
        <CollapsibleSection id="experience" title="Experience & Pattern" icon={Clock}>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2">Previous Experience</p>
          <SelectButton<Experience>
            value={previousExperience}
            onChange={setPreviousExperience}
            placeholder="Select experience"
            options={[
              { value: "complete-beginner", label: "Beginner", sublabel: "Full supervision" },
              { value: "some-construction", label: "Some Construction", sublabel: "10% faster" },
              { value: "related-trade", label: "Related Trade", sublabel: "20% faster" },
              { value: "electrical-helper", label: "Elec Helper", sublabel: "30% faster" }
            ]}
          />

          <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2 mt-4">Working Pattern</p>
          <SelectButton<Pattern>
            value={workingPattern}
            onChange={setWorkingPattern}
            placeholder="Select pattern"
            options={[
              { value: "full-time", label: "Full-Time", sublabel: "40 hrs/wk" },
              { value: "part-time", label: "Part-Time", sublabel: "25 hrs/wk" },
              { value: "block-release", label: "Block Release", sublabel: "40 hrs/wk" },
              { value: "day-release", label: "Day Release", sublabel: "32 hrs/wk" }
            ]}
          />

          <div className="mt-4">
            <IOSInput
              label="Number of Apprentices"
              icon={<Users className="h-5 w-5" />}
              type="number"
              value={numberOfApprentices || ""}
              onChange={(e) => setNumberOfApprentices(parseInt(e.target.value) || 1)}
              hint="Bulk discounts apply"
            />
          </div>
        </CollapsibleSection>

        {/* Benefits Section */}
        <CollapsibleSection id="benefits" title="Additional Benefits" icon={Award}>
          <p className="text-ios-caption-1 text-white/50 mb-3">
            Optional benefits to include in cost calculation
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(benefitsCosts) as [Benefit, typeof benefitsCosts[Benefit]][]).map(([key, benefit]) => {
              const Icon = benefit.icon;
              const isSelected = additionalBenefits.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleBenefit(key)}
                  className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] ${
                    isSelected
                      ? "bg-elec-yellow/20 border-elec-yellow/50"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isSelected && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
                    <Icon className={`h-4 w-4 ${isSelected ? "text-elec-yellow" : "text-white/50"}`} />
                  </div>
                  <p className={`text-ios-caption-1 font-medium ${isSelected ? "text-elec-yellow" : "text-white"}`}>
                    {benefit.label}
                  </p>
                  <p className="text-ios-caption-2 text-white/50">£{benefit.cost}/yr</p>
                </button>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* Cash Flow Analysis */}
        {calculatedResults && (
          <section>
            <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
              Yearly Cash Flow
            </p>
            <div className="space-y-2">
              {[
                { year: 1, cost: calculatedResults.totalYearOne, note: "Training period" },
                { year: 2, cost: calculatedResults.yearTwoCosts, note: "Developing skills" },
                { year: 3, cost: calculatedResults.yearThreeCosts, note: "Good productivity" },
                ...(calculatedResults.yearFourCosts > 0 ? [{ year: 4, cost: calculatedResults.yearFourCosts, note: "Near qualified" }] : [])
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-ios-caption-1 font-bold text-elec-yellow">{item.year}</span>
                    </div>
                    <span className="text-ios-body text-white/70">{item.note}</span>
                  </div>
                  <span className="text-ios-body font-semibold text-white tabular-nums">
                    £{item.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Desktop Reset */}
        <div className="hidden sm:block">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="w-full h-12 border-white/20 text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            Reset Calculator
          </Button>
        </div>
      </main>

      {/* Bottom Action Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 pb-safe">
        <Button
          onClick={resetCalculator}
          className="w-full h-14 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-ios-body active:scale-[0.98] touch-manipulation"
        >
          Reset Calculator
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCostCalculator;
