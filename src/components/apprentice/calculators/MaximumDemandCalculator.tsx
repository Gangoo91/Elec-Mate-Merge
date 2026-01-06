import { Badge } from "@/components/ui/badge";
import { TrendingUp, Info, Calculator, Plus, Trash2, Zap, AlertTriangle, BookOpen, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Load {
  id: number;
  name: string;
  power: string;
  diversityFactor: string;
  loadType: string;
}

const LOAD_PRESETS = {
  "lighting": { name: "Lighting", diversityFactor: "0.9" },
  "socket-outlets": { name: "Socket Outlets", diversityFactor: "0.6" },
  "cooking": { name: "Cooking Appliances", diversityFactor: "0.6" },
  "water-heating": { name: "Water Heating", diversityFactor: "1.0" },
  "space-heating": { name: "Space Heating", diversityFactor: "1.0" },
  "motors": { name: "Motors", diversityFactor: "0.8" },
  "immersion": { name: "Immersion Heaters", diversityFactor: "1.0" },
  "shower": { name: "Electric Showers", diversityFactor: "1.0" },
  "custom": { name: "Custom Load", diversityFactor: "1.0" }
} as const;

const loadTypeOptions = [
  { value: "lighting", label: "Lighting Circuits" },
  { value: "socket-outlets", label: "Socket Outlets" },
  { value: "cooking", label: "Cooking Appliances" },
  { value: "water-heating", label: "Water Heating" },
  { value: "space-heating", label: "Space Heating" },
  { value: "motors", label: "Motors" },
  { value: "immersion", label: "Immersion Heaters" },
  { value: "shower", label: "Electric Showers" },
  { value: "custom", label: "Custom Load" },
];

const MaximumDemandCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, name: "Lighting", power: "", diversityFactor: "0.9", loadType: "lighting" },
    { id: 2, name: "Socket Outlets", power: "", diversityFactor: "0.6", loadType: "socket-outlets" },
  ]);
  const [result, setResult] = useState<{
    totalConnectedLoad: number;
    maximumDemand: number;
    overallDiversityFactor: number;
    loadReduction: number;
  } | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showWorkings, setShowWorkings] = useState(false);

  const config = CALCULATOR_CONFIG['power'];

  const addLoad = (loadType: string = "custom") => {
    const preset = LOAD_PRESETS[loadType as keyof typeof LOAD_PRESETS];
    const newLoad: Load = {
      id: Date.now(),
      name: preset.name,
      power: "",
      diversityFactor: preset.diversityFactor,
      loadType
    };
    setLoads([...loads, newLoad]);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) {
      setLoads(loads.filter(load => load.id !== id));
    }
  };

  const updateLoad = (id: number, field: keyof Load, value: string) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        let updatedLoad = { ...load, [field]: value };

        if (field === 'loadType') {
          const preset = LOAD_PRESETS[value as keyof typeof LOAD_PRESETS];
          updatedLoad.diversityFactor = preset.diversityFactor;
          updatedLoad.name = preset.name;
        }

        return updatedLoad;
      }
      return load;
    }));

    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const validateAndCalculate = () => {
    const newErrors: { [key: number]: string } = {};

    loads.forEach(load => {
      const power = parseFloat(load.power) || 0;
      const diversity = parseFloat(load.diversityFactor) || 0;

      if (power < 0) {
        newErrors[load.id] = "Power cannot be negative";
      } else if (power > 1000) {
        newErrors[load.id] = "Power seems unreasonably high";
      } else if (diversity < 0 || diversity > 1) {
        newErrors[load.id] = "Diversity factor must be between 0 and 1";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const totalConnectedLoad = loads.reduce((sum, load) => sum + (parseFloat(load.power) || 0), 0);
      const maximumDemand = loads.reduce((sum, load) => sum + ((parseFloat(load.power) || 0) * (parseFloat(load.diversityFactor) || 0)), 0);
      const overallDiversityFactor = totalConnectedLoad > 0 ? maximumDemand / totalConnectedLoad : 0;
      const loadReduction = totalConnectedLoad - maximumDemand;

      setResult({
        totalConnectedLoad,
        maximumDemand: Math.round(maximumDemand * 100) / 100,
        overallDiversityFactor: Math.round(overallDiversityFactor * 1000) / 1000,
        loadReduction: Math.round(loadReduction * 100) / 100
      });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setLoads([
      { id: 1, name: "Lighting", power: "", diversityFactor: "0.9", loadType: "lighting" },
      { id: 2, name: "Socket Outlets", power: "", diversityFactor: "0.6", loadType: "socket-outlets" },
    ]);
    setResult(null);
    setErrors({});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loads.some(load => parseFloat(load.power) > 0)) {
        validateAndCalculate();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [loads]);

  const calculateSupplyRequirements = (totalAfterDiversity: number) => {
    const estimatedCurrent = (totalAfterDiversity * 1000) / 230;

    let supplyAdequacy = "";
    let mainSwitchRecommendation = "";

    if (estimatedCurrent <= 63) {
      supplyAdequacy = "Standard single phase supply adequate (100A service fuse)";
      mainSwitchRecommendation = estimatedCurrent <= 32 ? "63A Main Switch" : "100A Main Switch";
    } else if (estimatedCurrent <= 200) {
      supplyAdequacy = "Three phase supply recommended";
      mainSwitchRecommendation = "Three phase distribution board required";
    } else {
      supplyAdequacy = "High load installation - DNO consultation required";
      mainSwitchRecommendation = "Professional electrical design needed";
    }

    return { estimatedCurrent, supplyAdequacy, mainSwitchRecommendation };
  };

  const loadsWithPower = loads.filter(l => parseFloat(l.power) > 0);

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Maximum Demand Calculator"
        description="Calculate maximum demand with BS 7671 diversity factors and supply adequacy assessment"
      >
        {/* Add Load Section */}
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{
            borderColor: `${config.gradientFrom}30`,
            background: `${config.gradientFrom}08`
          }}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
              Load Configuration
            </h4>
            <Badge
              variant="outline"
              className="text-xs"
              style={{ borderColor: `${config.gradientFrom}40`, color: config.gradientFrom }}
            >
              {loads.length} Load{loads.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <CalculatorSelect
            label="Add Load Type"
            value=""
            onChange={(value) => {
              if (value) addLoad(value);
            }}
            options={[{ value: "", label: "Select load type to add..." }, ...loadTypeOptions]}
          />
        </div>

        {/* Loads List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {loads.map((load) => (
            <div
              key={load.id}
              className={cn(
                "p-4 rounded-xl border transition-colors",
                errors[load.id] ? "border-red-500/50 bg-red-500/5" : "bg-white/5 border-white/10"
              )}
            >
              <div className="space-y-3">
                {/* Load Type and Remove Button */}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <CalculatorSelect
                      label="Load Type"
                      value={load.loadType}
                      onChange={(value) => updateLoad(load.id, 'loadType', value)}
                      options={loadTypeOptions}
                    />
                  </div>
                  {loads.length > 1 && (
                    <button
                      onClick={() => removeLoad(load.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-red-400 transition-colors touch-manipulation mt-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Power and Diversity Factor */}
                <CalculatorInputGrid columns={2}>
                  <CalculatorInput
                    label="Power"
                    unit="kW"
                    type="text"
                    inputMode="decimal"
                    value={load.power}
                    onChange={(value) => updateLoad(load.id, 'power', value)}
                    placeholder="e.g. 3.0"
                    error={errors[load.id]}
                  />
                  <CalculatorInput
                    label="Diversity Factor"
                    type="text"
                    inputMode="decimal"
                    value={load.diversityFactor}
                    onChange={(value) => updateLoad(load.id, 'diversityFactor', value)}
                    placeholder="0.0 - 1.0"
                  />
                </CalculatorInputGrid>

                {/* Load Contribution */}
                {parseFloat(load.power) > 0 && (
                  <div
                    className="text-xs p-2 rounded-lg"
                    style={{ background: `${config.gradientFrom}10`, color: config.gradientFrom }}
                  >
                    Contribution: {((parseFloat(load.power) || 0) * (parseFloat(load.diversityFactor) || 0)).toFixed(2)} kW
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Calculate Actions */}
        <CalculatorActions
          category="power"
          onCalculate={validateAndCalculate}
          onReset={reset}
          isDisabled={!loadsWithPower.length}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Maximum Demand</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.maximumDemand} kW
              </div>
              <p className="text-sm text-white/80 mt-1">
                {(result.overallDiversityFactor * 100).toFixed(1)}% overall diversity
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Connected Load"
                value={result.totalConnectedLoad.toFixed(2)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Load Reduction"
                value={result.loadReduction.toFixed(2)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Estimated Current"
                value={calculateSupplyRequirements(result.maximumDemand).estimatedCurrent.toFixed(1)}
                unit="A"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Reduction %"
                value={((result.loadReduction / result.totalConnectedLoad) * 100).toFixed(1)}
                unit="%"
                category="power"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Supply Assessment */}
          {(() => {
            const supplyInfo = calculateSupplyRequirements(result.maximumDemand);
            return (
              <div className="calculator-card p-4 space-y-3">
                <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
                  Supply Assessment
                </h4>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-blue-300 mb-1">Supply Adequacy</p>
                  <p className="text-sm text-blue-200">{supplyInfo.supplyAdequacy}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <p className="text-xs text-emerald-300">Recommended</p>
                  </div>
                  <p className="text-sm text-emerald-200 mt-1">{supplyInfo.mainSwitchRecommendation}</p>
                </div>
              </div>
            );
          })()}

          {/* How It Worked Out - Collapsible */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showWorkings && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="text-sm font-mono text-purple-300 space-y-3">
                  <div>
                    <p className="text-xs text-purple-400 mb-2">Step 1: Calculate each load contribution</p>
                    {loadsWithPower.map((load) => (
                      <div key={load.id} className="pl-3 border-l-2 border-purple-500/30 mb-1">
                        {load.name}: {load.power}kW × {load.diversityFactor} = <span className="text-purple-200 font-bold">{((parseFloat(load.power) || 0) * (parseFloat(load.diversityFactor) || 0)).toFixed(2)}kW</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 2: Sum all contributions</p>
                    <p>MD = {loadsWithPower.map(l => `${((parseFloat(l.power) || 0) * (parseFloat(l.diversityFactor) || 0)).toFixed(2)}`).join(' + ')}</p>
                    <p>MD = <span className="text-purple-200 font-bold">{result.maximumDemand}kW</span></p>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 3: Calculate current (230V single phase)</p>
                    <p>I = (P × 1000) ÷ V</p>
                    <p>I = ({result.maximumDemand} × 1000) ÷ 230</p>
                    <p>I = <span className="text-purple-200 font-bold">{((result.maximumDemand * 1000) / 230).toFixed(1)}A</span></p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* What This Means - Collapsible */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Maximum Demand:</strong> The calculated peak load after applying diversity factors based on realistic usage patterns.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Diversity Factor:</strong> Accounts for the fact that not all loads operate at full capacity simultaneously. Lower factors = more diversity.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Supply Assessment:</strong> Helps determine if your electrical supply is adequate for the calculated demand.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Regs at a Glance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showBsRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p>• <strong className="text-amber-300">311.1:</strong> Assessment of maximum demand shall take diversity into account</p>
                  <p>• <strong className="text-amber-300">Appendix 1:</strong> Guidance on diversity factors for different installation types</p>
                  <p>• <strong className="text-amber-300">433.1:</strong> Overcurrent protection coordination with calculated demand</p>
                  <p>• <strong className="text-amber-300">314.1:</strong> Division of installation relative to the maximum demand</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Maximum Demand</strong> = Σ(Load Power × Diversity Factor). Design current I = (MD × 1000) ÷ V
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaximumDemandCalculator;
