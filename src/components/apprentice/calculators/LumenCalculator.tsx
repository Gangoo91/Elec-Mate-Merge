import { useState, useMemo } from 'react';
import { ChevronDown, Copy, Check, Settings } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorInputGrid,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';

const ROOM_PRESETS = {
  office: { name: 'Office/Workspace', lux: 500, description: 'General office work' },
  meeting: { name: 'Meeting Room', lux: 300, description: 'Conference and meetings' },
  corridor: { name: 'Corridor/Hallway', lux: 100, description: 'Navigation areas' },
  warehouse: { name: 'Warehouse', lux: 200, description: 'General storage areas' },
  workshop: { name: 'Workshop', lux: 750, description: 'Detailed manual work' },
  classroom: { name: 'Classroom', lux: 500, description: 'Educational spaces' },
  retail: { name: 'Retail Shop', lux: 750, description: 'Customer areas' },
  kitchen: { name: 'Kitchen', lux: 500, description: 'Food preparation' },
  bathroom: { name: 'Bathroom', lux: 200, description: 'General use' },
  stairwell: { name: 'Stairwell', lux: 150, description: 'Safety lighting' },
};

const CAT = 'lighting' as const;
const config = CALCULATOR_CONFIG[CAT];

interface LumenResult {
  type: 'lux-to-lumens' | 'lumens-to-lux' | 'fixtures-needed';
  primaryValue: string;
  primaryUnit: string;
  areaVal: number;
  totalLumens?: number;
  achievedLux?: number;
  fixturesNeeded?: number;
  spacingDistance?: number;
  totalPower?: number;
  annualCost?: number;
  complianceLevel: 'excellent' | 'good' | 'basic' | 'poor';
  uf: number;
  mf: number;
  efficacy: number;
  daylightReduction: number;
}

const LumenCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [calculationType, setCalculationType] = useState<
    'lux-to-lumens' | 'lumens-to-lux' | 'fixtures-needed'
  >('lux-to-lumens');
  const [inputMode, setInputMode] = useState<'area' | 'dimensions'>('area');
  const [area, setArea] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [lux, setLux] = useState('');
  const [lumens, setLumens] = useState('');
  const [fixtureOutput, setFixtureOutput] = useState('');
  const [mountingHeight, setMountingHeight] = useState('');
  const [workingHeight, setWorkingHeight] = useState('0.85');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [result, setResult] = useState<LumenResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [utilizationFactor, setUtilizationFactor] = useState('0.6');
  const [maintenanceFactor, setMaintenanceFactor] = useState('0.8');
  const [fixtureEfficacy, setFixtureEfficacy] = useState('100');
  const [daylightContribution, setDaylightContribution] = useState('0');

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (inputMode === 'area') {
      if (!area || parseFloat(area) <= 0) newErrors.area = 'Valid area is required';
    } else {
      if (!length || parseFloat(length) <= 0) newErrors.length = 'Valid length is required';
      if (!width || parseFloat(width) <= 0) newErrors.width = 'Valid width is required';
    }

    if (calculationType === 'lux-to-lumens') {
      if (!lux || parseFloat(lux) <= 0) newErrors.lux = 'Valid lux value is required';
    } else if (calculationType === 'lumens-to-lux') {
      if (!lumens || parseFloat(lumens) <= 0) newErrors.lumens = 'Valid lumens value is required';
    } else if (calculationType === 'fixtures-needed') {
      if (!lux || parseFloat(lux) <= 0) newErrors.lux = 'Valid lux value is required';
      if (!fixtureOutput || parseFloat(fixtureOutput) <= 0)
        newErrors.fixtureOutput = 'Valid fixture output is required';
    }

    if (showAdvanced) {
      const uf = parseFloat(utilizationFactor);
      const mf = parseFloat(maintenanceFactor);
      const efficacy = parseFloat(fixtureEfficacy);
      const daylight = parseFloat(daylightContribution);
      if (uf < 0.2 || uf > 1.0) newErrors.utilizationFactor = 'UF should be 0.2-1.0';
      if (mf < 0.5 || mf > 1.0) newErrors.maintenanceFactor = 'MF should be 0.5-1.0';
      if (efficacy < 20 || efficacy > 200) newErrors.fixtureEfficacy = '20-200 lm/W';
      if (daylight < 0 || daylight > 80) newErrors.daylightContribution = '0-80%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const areaVal =
      inputMode === 'area' ? parseFloat(area) : parseFloat(length) * parseFloat(width);
    const uf = parseFloat(utilizationFactor);
    const mf = parseFloat(maintenanceFactor);
    const efficacy = parseFloat(fixtureEfficacy);
    const daylightReduction = parseFloat(daylightContribution) / 100;
    const mountHeight = parseFloat(mountingHeight) || 3;
    const workHeight = parseFloat(workingHeight);
    const spacingDistance = (mountHeight - workHeight) * 1.2;

    const getComplianceLevel = (luxVal: number): 'excellent' | 'good' | 'basic' | 'poor' => {
      if (luxVal >= 500) return 'excellent';
      if (luxVal >= 300) return 'good';
      if (luxVal >= 100) return 'basic';
      return 'poor';
    };

    if (calculationType === 'lux-to-lumens') {
      const luxVal = parseFloat(lux);
      let calculatedLumens = luxVal * areaVal;
      if (showAdvanced) {
        calculatedLumens = (calculatedLumens / (uf * mf)) * (1 - daylightReduction);
      }
      const totalPower = calculatedLumens / efficacy;

      setResult({
        type: 'lux-to-lumens',
        primaryValue: calculatedLumens.toFixed(0),
        primaryUnit: 'lm',
        areaVal,
        totalLumens: calculatedLumens,
        spacingDistance: mountingHeight ? spacingDistance : undefined,
        totalPower,
        complianceLevel: getComplianceLevel(luxVal),
        uf,
        mf,
        efficacy,
        daylightReduction,
      });
    } else if (calculationType === 'lumens-to-lux') {
      const lumensVal = parseFloat(lumens);
      let calculatedLux = lumensVal / areaVal;
      if (showAdvanced) {
        calculatedLux = (calculatedLux * uf * mf) / (1 - daylightReduction);
      }
      const totalPower = lumensVal / efficacy;

      setResult({
        type: 'lumens-to-lux',
        primaryValue: calculatedLux.toFixed(1),
        primaryUnit: 'lux',
        areaVal,
        achievedLux: calculatedLux,
        totalLumens: lumensVal,
        totalPower,
        complianceLevel: getComplianceLevel(calculatedLux),
        uf,
        mf,
        efficacy,
        daylightReduction,
      });
    } else if (calculationType === 'fixtures-needed') {
      const luxVal = parseFloat(lux);
      const fixtureVal = parseFloat(fixtureOutput);
      let totalLumensNeeded = luxVal * areaVal;
      if (showAdvanced) {
        totalLumensNeeded = (totalLumensNeeded / (uf * mf)) * (1 - daylightReduction);
      }
      const fixturesNeeded = Math.ceil(totalLumensNeeded / fixtureVal);
      const totalPower = totalLumensNeeded / efficacy;
      const annualCost = (totalPower * 0.25 * 2500) / 1000;

      setResult({
        type: 'fixtures-needed',
        primaryValue: fixturesNeeded.toString(),
        primaryUnit: 'fixtures',
        areaVal,
        totalLumens: totalLumensNeeded,
        fixturesNeeded,
        spacingDistance: mountingHeight ? spacingDistance : undefined,
        totalPower,
        annualCost,
        complianceLevel: getComplianceLevel(luxVal),
        uf,
        mf,
        efficacy,
        daylightReduction,
      });
    }
  };

  const handleReset = () => {
    setArea('');
    setLength('');
    setWidth('');
    setLux('');
    setLumens('');
    setFixtureOutput('');
    setMountingHeight('');
    setWorkingHeight('0.85');
    setSelectedRoom('');
    setResult(null);
    setErrors({});
    setUtilizationFactor('0.6');
    setMaintenanceFactor('0.8');
    setFixtureEfficacy('100');
    setDaylightContribution('0');
    setShowAdvanced(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Lighting Calculator Results',
      `Type: ${calculationType}`,
      `Result: ${result.primaryValue} ${result.primaryUnit}`,
      `Area: ${result.areaVal.toFixed(1)} m²`,
      result.totalPower ? `Power: ${result.totalPower.toFixed(1)} W` : '',
      result.spacingDistance ? `Spacing: ${result.spacingDistance.toFixed(1)} m` : '',
      result.annualCost ? `Annual Cost: £${result.annualCost.toFixed(0)}` : '',
      `Compliance: ${result.complianceLevel.toUpperCase()}`,
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleRoomPreset = (roomKey: string) => {
    const preset = ROOM_PRESETS[roomKey as keyof typeof ROOM_PRESETS];
    if (preset) {
      setLux(preset.lux.toString());
      setSelectedRoom(roomKey);
      clearError('lux');
    }
  };

  const calculationTypeOptions = [
    { value: 'lux-to-lumens', label: 'Lux to Lumens' },
    { value: 'lumens-to-lux', label: 'Lumens to Lux' },
    { value: 'fixtures-needed', label: 'Fixtures Required' },
  ];

  const roomPresetOptions = Object.entries(ROOM_PRESETS).map(([key, preset]) => ({
    value: key,
    label: `${preset.name} (${preset.lux} lx)`,
  }));

  const canCalculate = useMemo(() => {
    const hasArea =
      inputMode === 'area' ? parseFloat(area) > 0 : parseFloat(length) > 0 && parseFloat(width) > 0;
    if (!hasArea) return false;
    if (calculationType === 'lux-to-lumens') return parseFloat(lux) > 0;
    if (calculationType === 'lumens-to-lux') return parseFloat(lumens) > 0;
    return parseFloat(lux) > 0 && parseFloat(fixtureOutput) > 0;
  }, [inputMode, area, length, width, calculationType, lux, lumens, fixtureOutput]);

  return (
    <CalculatorCard
      category={CAT}
      title="Professional Lighting Calculator"
      description="Calculate lighting requirements with room presets and fixture planning"
    >
      {/* Calculation Type */}
      <CalculatorSelect
        label="Calculation Type"
        value={calculationType}
        onChange={(value) => setCalculationType(value as typeof calculationType)}
        options={calculationTypeOptions}
      />

      {/* Room Presets */}
      {(calculationType === 'lux-to-lumens' || calculationType === 'fixtures-needed') && (
        <div className="space-y-1">
          <CalculatorSelect
            label="Room Type (Optional)"
            value={selectedRoom}
            onChange={handleRoomPreset}
            options={roomPresetOptions}
            placeholder="Select room type..."
          />
          {selectedRoom && (
            <p className="text-xs text-white pl-1">
              {ROOM_PRESETS[selectedRoom as keyof typeof ROOM_PRESETS].description}
            </p>
          )}
        </div>
      )}

      {/* Area Input Mode Toggle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" style={{ color: config.gradientFrom }} />
          <span className="text-sm font-medium text-white">Area Input</span>
        </div>
        <div className="flex gap-2">
          {[
            { value: 'area' as const, label: 'Direct Area' },
            { value: 'dimensions' as const, label: 'Length × Width' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setInputMode(opt.value)}
              className={cn(
                'flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation',
                inputMode === opt.value
                  ? 'text-black'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              )}
              style={
                inputMode === opt.value
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area/Dimension Inputs */}
      {inputMode === 'area' ? (
        <CalculatorInput
          label="Area"
          unit="m²"
          type="text"
          inputMode="decimal"
          value={area}
          onChange={(val) => {
            setArea(val);
            clearError('area');
          }}
          placeholder="e.g., 50"
          error={errors.area}
        />
      ) : (
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={length}
            onChange={(val) => {
              setLength(val);
              clearError('length');
            }}
            placeholder="e.g., 10"
            error={errors.length}
          />
          <CalculatorInput
            label="Width"
            unit="m"
            type="text"
            inputMode="decimal"
            value={width}
            onChange={(val) => {
              setWidth(val);
              clearError('width');
            }}
            placeholder="e.g., 5"
            error={errors.width}
          />
        </CalculatorInputGrid>
      )}

      {/* Main Calculation Inputs */}
      {calculationType === 'lux-to-lumens' && (
        <CalculatorInput
          label="Required Illuminance"
          unit="lx"
          type="text"
          inputMode="decimal"
          value={lux}
          onChange={(val) => {
            setLux(val);
            clearError('lux');
          }}
          placeholder="e.g., 500"
          hint="Target lux level for the space"
          error={errors.lux}
        />
      )}

      {calculationType === 'lumens-to-lux' && (
        <CalculatorInput
          label="Total Light Output"
          unit="lm"
          type="text"
          inputMode="decimal"
          value={lumens}
          onChange={(val) => {
            setLumens(val);
            clearError('lumens');
          }}
          placeholder="e.g., 25000"
          hint="Total fixture lumens installed"
          error={errors.lumens}
        />
      )}

      {calculationType === 'fixtures-needed' && (
        <>
          <CalculatorInput
            label="Required Illuminance"
            unit="lx"
            type="text"
            inputMode="decimal"
            value={lux}
            onChange={(val) => {
              setLux(val);
              clearError('lux');
            }}
            placeholder="e.g., 500"
            error={errors.lux}
          />
          <CalculatorInput
            label="Fixture Output"
            unit="lm"
            type="text"
            inputMode="decimal"
            value={fixtureOutput}
            onChange={(val) => {
              setFixtureOutput(val);
              clearError('fixtureOutput');
            }}
            placeholder="e.g., 3000"
            hint="Lumens per fixture"
            error={errors.fixtureOutput}
          />
        </>
      )}

      {/* Height Inputs */}
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Mounting Height"
          unit="m"
          type="text"
          inputMode="decimal"
          value={mountingHeight}
          onChange={setMountingHeight}
          placeholder="e.g., 3.0"
          hint="For spacing calculations"
        />
        <CalculatorInput
          label="Working Height"
          unit="m"
          type="text"
          inputMode="decimal"
          value={workingHeight}
          onChange={setWorkingHeight}
          placeholder="0.85"
          hint="Work plane level"
        />
      </CalculatorInputGrid>

      {/* Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger className="w-full flex items-center justify-between min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" style={{ color: config.gradientFrom }} />
            <span>Advanced Options</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showAdvanced && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-2">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <CalculatorInput
              label="Utilisation Factor (UF)"
              type="text"
              inputMode="decimal"
              value={utilizationFactor}
              onChange={(val) => {
                setUtilizationFactor(val);
                clearError('utilizationFactor');
              }}
              placeholder="0.6"
              hint="Light reaching work plane (0.2-1.0)"
              error={errors.utilizationFactor}
            />
            <CalculatorInput
              label="Maintenance Factor (MF)"
              type="text"
              inputMode="decimal"
              value={maintenanceFactor}
              onChange={(val) => {
                setMaintenanceFactor(val);
                clearError('maintenanceFactor');
              }}
              placeholder="0.8"
              hint="Depreciation over time (0.5-1.0)"
              error={errors.maintenanceFactor}
            />
            <CalculatorInput
              label="Fixture Efficacy"
              unit="lm/W"
              type="text"
              inputMode="decimal"
              value={fixtureEfficacy}
              onChange={(val) => {
                setFixtureEfficacy(val);
                clearError('fixtureEfficacy');
              }}
              placeholder="100"
              hint="LED: 80-150, Fluorescent: 60-100"
              error={errors.fixtureEfficacy}
            />
            <CalculatorInput
              label="Daylight Contribution"
              unit="%"
              type="text"
              inputMode="decimal"
              value={daylightContribution}
              onChange={(val) => {
                setDaylightContribution(val);
                clearError('daylightContribution');
              }}
              placeholder="0"
              hint="Natural light reduction (0-80%)"
              error={errors.daylightContribution}
            />
            <div
              className="p-3 rounded-lg border"
              style={{
                borderColor: `${config.gradientFrom}20`,
                background: `${config.gradientFrom}05`,
              }}
            >
              <p className="text-xs text-white">
                <strong>Pro Tip:</strong> Use UF 0.4-0.6 for most rooms, MF 0.8 for clean
                environments.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={
                result.complianceLevel === 'excellent' || result.complianceLevel === 'good'
                  ? 'pass'
                  : result.complianceLevel === 'basic'
                    ? 'warning'
                    : 'fail'
              }
              label={
                result.complianceLevel === 'excellent'
                  ? 'Excellent Lighting'
                  : result.complianceLevel === 'good'
                    ? 'Good Lighting'
                    : result.complianceLevel === 'basic'
                      ? 'Basic Lighting'
                      : 'Poor Lighting'
              }
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero Value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">
              {result.type === 'lux-to-lumens' && 'Lumens Required'}
              {result.type === 'lumens-to-lux' && 'Illuminance Level'}
              {result.type === 'fixtures-needed' && 'Fixtures Needed'}
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.primaryValue} {result.primaryUnit}
            </p>
            <p className="text-sm text-white mt-2">
              Area: {result.areaVal.toFixed(1)} m²
              {result.totalPower ? ` · ${result.totalPower.toFixed(1)} W` : ''}
            </p>
          </div>

          {/* Result Values */}
          <ResultsGrid columns={2}>
            {result.totalLumens && (
              <ResultValue
                label="Total Lumens"
                value={result.totalLumens.toFixed(0)}
                unit="lm"
                category={CAT}
                size="sm"
              />
            )}
            {result.totalPower && (
              <ResultValue
                label="Total Power"
                value={result.totalPower.toFixed(1)}
                unit="W"
                category={CAT}
                size="sm"
              />
            )}
            {result.spacingDistance && (
              <ResultValue
                label="Fixture Spacing"
                value={result.spacingDistance.toFixed(1)}
                unit="m"
                category={CAT}
                size="sm"
              />
            )}
            {result.annualCost !== undefined && (
              <ResultValue
                label="Annual Cost"
                value={`£${result.annualCost.toFixed(0)}`}
                category={CAT}
                size="sm"
              />
            )}
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={
              result.type === 'lux-to-lumens'
                ? [
                    {
                      label: 'Input values',
                      formula: `Target: ${lux} lux | Area: ${result.areaVal.toFixed(1)} m²${showAdvanced ? ` | UF: ${result.uf} | MF: ${result.mf}` : ''}`,
                    },
                    {
                      label: 'Total lumens required',
                      formula: showAdvanced
                        ? `(lux × area) ÷ (UF × MF) = (${lux} × ${result.areaVal.toFixed(1)}) ÷ (${result.uf} × ${result.mf})`
                        : `lux × area = ${lux} × ${result.areaVal.toFixed(1)}`,
                      value: `${result.totalLumens?.toFixed(0)} lm`,
                    },
                    {
                      label: 'Power estimate',
                      formula: `lumens ÷ efficacy = ${result.totalLumens?.toFixed(0)} ÷ ${result.efficacy}`,
                      value: `${result.totalPower?.toFixed(1)} W`,
                    },
                    ...(result.spacingDistance
                      ? [
                          {
                            label: 'Fixture spacing',
                            formula: `(mountHeight − workHeight) × 1.2 = (${mountingHeight} − ${workingHeight}) × 1.2`,
                            value: `${result.spacingDistance.toFixed(1)} m`,
                            description: 'Maximum distance between fixture centres',
                          },
                        ]
                      : []),
                  ]
                : result.type === 'lumens-to-lux'
                  ? [
                      {
                        label: 'Input values',
                        formula: `Lumens: ${lumens} lm | Area: ${result.areaVal.toFixed(1)} m²`,
                      },
                      {
                        label: 'Achieved illuminance',
                        formula: showAdvanced
                          ? `(lumens ÷ area) × UF × MF = (${lumens} ÷ ${result.areaVal.toFixed(1)}) × ${result.uf} × ${result.mf}`
                          : `lumens ÷ area = ${lumens} ÷ ${result.areaVal.toFixed(1)}`,
                        value: `${result.achievedLux?.toFixed(1)} lux`,
                      },
                      {
                        label: 'Assessment',
                        value:
                          result.complianceLevel === 'excellent'
                            ? 'EXCEEDS — suitable for precision work (≥500 lux)'
                            : result.complianceLevel === 'good'
                              ? 'MEETS — adequate for general work (≥300 lux)'
                              : result.complianceLevel === 'basic'
                                ? 'BASIC — suitable for navigation only (≥100 lux)'
                                : 'BELOW — insufficient for most tasks (<100 lux)',
                      },
                    ]
                  : [
                      {
                        label: 'Input values',
                        formula: `Target: ${lux} lux | Area: ${result.areaVal.toFixed(1)} m² | Fixture: ${fixtureOutput} lm`,
                      },
                      {
                        label: 'Total lumens needed',
                        formula: showAdvanced
                          ? `(lux × area) ÷ (UF × MF) = (${lux} × ${result.areaVal.toFixed(1)}) ÷ (${result.uf} × ${result.mf})`
                          : `lux × area = ${lux} × ${result.areaVal.toFixed(1)}`,
                        value: `${result.totalLumens?.toFixed(0)} lm`,
                      },
                      {
                        label: 'Fixtures needed',
                        formula: `totalLumens ÷ fixtureOutput = ${result.totalLumens?.toFixed(0)} ÷ ${fixtureOutput}`,
                        value: `${result.fixturesNeeded} fixtures (rounded up)`,
                      },
                      {
                        label: 'Total power',
                        formula: `totalLumens ÷ efficacy = ${result.totalLumens?.toFixed(0)} ÷ ${result.efficacy}`,
                        value: `${result.totalPower?.toFixed(1)} W`,
                      },
                      ...(result.annualCost !== undefined
                        ? [
                            {
                              label: 'Annual energy cost',
                              formula: `(watts × £0.25/kWh × 2500hrs) ÷ 1000`,
                              value: `£${result.annualCost.toFixed(0)}/year`,
                              description: 'Based on 2,500 operating hours per year',
                            },
                          ]
                        : []),
                    ]
            }
          />

          {/* ── What This Means ── */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    'Lux (lx): Light intensity per square metre — what you actually see',
                    'Lumens (lm): Total light output from source — what the fixture produces',
                    'Utilisation Factor (UF): How much light reaches the work surface',
                    'Maintenance Factor (MF): Light reduction over time due to dirt and ageing',
                    'Efficacy (lm/W): How efficient the light source is — higher is better',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'BS EN 12464-1',
                      desc: 'Indoor workplace lighting requirements',
                    },
                    {
                      reg: 'Regulation 559.1',
                      desc: 'Luminaire selection and installation',
                    },
                    {
                      reg: 'CIBSE LG7',
                      desc: 'Office lighting design guide',
                    },
                    {
                      reg: 'SLL Code for Lighting',
                      desc: 'Recommended lux levels by application',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm text-white font-medium">Common Levels</p>
                    <p className="text-sm text-white">Corridors: 100 lx</p>
                    <p className="text-sm text-white">Meetings: 300 lx</p>
                    <p className="text-sm text-white">Offices: 500 lx</p>
                    <p className="text-sm text-white">Workshops: 750 lx</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white font-medium">Energy Costs</p>
                    <p className="text-sm text-white">LED: £2-4/yr per 100W</p>
                    <p className="text-sm text-white">Fluorescent: £6-8/yr</p>
                    <p className="text-sm text-white">Halogen: £15-20/yr</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Lumen Method"
        formula="N = (E × A) / (F × UF × MF)"
        variables={[
          { symbol: 'N', description: 'Number of luminaires' },
          { symbol: 'E', description: 'Required illuminance (lux)' },
          { symbol: 'A', description: 'Area (m²)' },
          { symbol: 'F', description: 'Lamp lumens per fixture' },
          { symbol: 'UF', description: 'Utilisation factor' },
          { symbol: 'MF', description: 'Maintenance factor' },
        ]}
      />
    </CalculatorCard>
  );
};

export default LumenCalculator;
