import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorSection,
  CalculatorDivider,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import {
  calculateEmergencyLighting,
  occupancyProfiles,
  fixtureProfiles,
  batteryChemistries,
  type EmergencyLightingInputs,
  type EmergencyLightingResult,
} from '@/lib/emergency-lighting';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'lighting' as const;
const config = CALCULATOR_CONFIG[CAT];

const occupancyOptions = Object.entries(occupancyProfiles).map(([key, profile]) => ({
  value: key,
  label: profile.description,
}));

const fixtureOptions = Object.entries(fixtureProfiles).map(([key, fixture]) => ({
  value: key,
  label: fixture.description,
}));

const durationOptions = [
  { value: '1', label: '1 Hour (Occupied premises)' },
  { value: '3', label: '3 Hours (Unoccupied premises)' },
  { value: '24', label: '24 Hours (High risk areas)' },
];

const batteryOptions = Object.entries(batteryChemistries).map(([key, chem]) => ({
  value: key,
  label: chem.description,
}));

const EmergencyLightingCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Core inputs
  const [floorArea, setFloorArea] = useState<string>('');
  const [ceilingHeight, setCeilingHeight] = useState<string>('3');
  const [occupancyType, setOccupancyType] = useState<string>('office');
  const [exitRoutes, setExitRoutes] = useState<string>('2');
  const [emergencyDuration, setEmergencyDuration] = useState<string>('3');
  const [fixtureType, setFixtureType] = useState<string>('led-standard');
  const [batteryChemistry, setBatteryChemistry] = useState<string>('lead-acid');

  // Advanced inputs
  const [corridorLength, setCorridorLength] = useState<string>('');
  const [corridorWidth, setCorridorWidth] = useState<string>('');
  const [staircaseFlights, setStaircaseFlights] = useState<string>('');
  const [hasHighRiskTasks, setHasHighRiskTasks] = useState<boolean>(false);
  const [hasDisabledAccess, setHasDisabledAccess] = useState<boolean>(false);
  const [complexLayout, setComplexLayout] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const [result, setResult] = useState<EmergencyLightingResult | null>(null);

  const handleCalculate = useCallback(() => {
    const area = parseFloat(floorArea);
    if (!(area > 0)) return;

    const inputs: EmergencyLightingInputs = {
      floorArea: area,
      ceilingHeight: parseFloat(ceilingHeight),
      occupancyType,
      corridorLength: corridorLength ? parseFloat(corridorLength) : undefined,
      corridorWidth: corridorWidth ? parseFloat(corridorWidth) : undefined,
      staircaseFlights: staircaseFlights ? parseInt(staircaseFlights) : undefined,
      hasHighRiskTasks,
      emergencyDuration: parseFloat(emergencyDuration),
      fixtureType,
      exitRoutes: parseInt(exitRoutes),
      hasDisabledAccess,
      complexLayout,
      batteryChemistry,
    };

    setResult(calculateEmergencyLighting(inputs));
  }, [
    floorArea,
    ceilingHeight,
    occupancyType,
    corridorLength,
    corridorWidth,
    staircaseFlights,
    hasHighRiskTasks,
    emergencyDuration,
    fixtureType,
    exitRoutes,
    hasDisabledAccess,
    complexLayout,
    batteryChemistry,
  ]);

  const handleReset = useCallback(() => {
    setFloorArea('');
    setCeilingHeight('3');
    setOccupancyType('office');
    setExitRoutes('2');
    setEmergencyDuration('3');
    setFixtureType('led-standard');
    setBatteryChemistry('lead-acid');
    setCorridorLength('');
    setCorridorWidth('');
    setStaircaseFlights('');
    setHasHighRiskTasks(false);
    setHasDisabledAccess(false);
    setComplexLayout(false);
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Emergency Lighting Design',
      `Floor Area: ${floorArea}m²`,
      `Occupancy: ${occupancyProfiles[occupancyType as keyof typeof occupancyProfiles]?.description}`,
      `Duration: ${emergencyDuration}h`,
      `Fixture: ${fixtureProfiles[fixtureType as keyof typeof fixtureProfiles]?.description}`,
      '',
      `Total Luminaires: ${result.totalLuminaires}`,
      `  Escape Route: ${result.escapeRouteLights}`,
      `  Open Area: ${result.openAreaLights}`,
      `  Anti-Panic: ${result.antiPanicLights}`,
      `  High Risk: ${result.highRiskAreaLights}`,
      '',
      `SHR Spacing: ${result.shrSpacing}m`,
      `System Power: ${result.totalPower}W`,
      `Battery: ${result.batteryCapacity}Ah (${result.batteryWeight}kg)`,
      `Illuminance: ${result.illuminanceAchieved.toFixed(1)} lux`,
      `Estimated Cost: £${result.estimatedCost.toLocaleString()}`,
      `Recommended: ${result.recommendedSystem}`,
      `Status: ${result.complianceStatus}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = parseFloat(floorArea) > 0;

  return (
    <CalculatorCard
      category={CAT}
      title="Emergency Lighting Calculator"
      description="Calculate emergency lighting requirements per BS 5266-1"
    >
      {/* Core Parameters */}
      <CalculatorSection title="Core Parameters">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Floor Area"
            unit="m²"
            type="text"
            inputMode="decimal"
            value={floorArea}
            onChange={setFloorArea}
            placeholder="e.g. 500"
            hint="Total floor area requiring emergency lighting"
          />
          <CalculatorInput
            label="Ceiling Height"
            unit="m"
            type="text"
            inputMode="decimal"
            value={ceilingHeight}
            onChange={setCeilingHeight}
            placeholder="e.g. 3.0"
            hint="Average ceiling height"
          />
          <CalculatorSelect
            label="Occupancy Type"
            value={occupancyType}
            onChange={setOccupancyType}
            options={occupancyOptions}
          />
          <CalculatorInput
            label="Exit Routes"
            type="text"
            inputMode="numeric"
            value={exitRoutes}
            onChange={setExitRoutes}
            placeholder="e.g. 2"
            hint="Primary escape routes"
          />
          <CalculatorSelect
            label="Emergency Duration"
            value={emergencyDuration}
            onChange={setEmergencyDuration}
            options={durationOptions}
          />
          <CalculatorSelect
            label="Fixture Type"
            value={fixtureType}
            onChange={setFixtureType}
            options={fixtureOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Battery Chemistry */}
      <CalculatorSection title="Battery Configuration">
        <CalculatorSelect
          label="Battery Chemistry"
          value={batteryChemistry}
          onChange={setBatteryChemistry}
          options={batteryOptions}
          hint={`Derating: ${batteryChemistries[batteryChemistry as keyof typeof batteryChemistries]?.deratingFactor}, Cycle life: ${batteryChemistries[batteryChemistry as keyof typeof batteryChemistries]?.cycleLife}`}
        />
      </CalculatorSection>

      {/* Advanced Parameters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
          <span>Advanced Parameters</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showAdvanced && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-3">
          <CalculatorInputGrid columns={3}>
            <CalculatorInput
              label="Corridor Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={corridorLength}
              onChange={setCorridorLength}
              placeholder="Auto"
            />
            <CalculatorInput
              label="Corridor Width"
              unit="m"
              type="text"
              inputMode="decimal"
              value={corridorWidth}
              onChange={setCorridorWidth}
              placeholder="Standard"
            />
            <CalculatorInput
              label="Staircase Flights"
              type="text"
              inputMode="numeric"
              value={staircaseFlights}
              onChange={setStaircaseFlights}
              placeholder="0"
            />
          </CalculatorInputGrid>

          {/* Boolean Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                label: 'High Risk Tasks',
                checked: hasHighRiskTasks,
                onChange: setHasHighRiskTasks,
              },
              {
                label: 'Disabled Access',
                checked: hasDisabledAccess,
                onChange: setHasDisabledAccess,
              },
              { label: 'Complex Layout', checked: complexLayout, onChange: setComplexLayout },
            ].map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={opt.checked}
                  onChange={(e) => opt.onChange(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/50"
                />
                <span className="text-sm text-white">{opt.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!isValid}
        showReset={!!result}
        calculateLabel="Calculate Requirements"
      />

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <ResultBadge
                status={
                  result.complianceStatus === 'compliant'
                    ? 'pass'
                    : result.complianceStatus === 'warning'
                      ? 'warning'
                      : 'fail'
                }
                label={
                  result.complianceStatus === 'compliant'
                    ? 'Compliant'
                    : result.complianceStatus === 'warning'
                      ? 'Warning'
                      : 'Non-Compliant'
                }
              />
              <ResultBadge status="info" label={result.recommendedSystem} />
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Total Luminaires Required</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.totalLuminaires}
            </p>
            <p className="text-sm text-white mt-2">
              {result.totalPower}W total | {result.shrSpacing}m SHR spacing
            </p>
          </div>

          {/* Luminaire Breakdown */}
          <ResultsGrid columns={2}>
            <ResultValue
              category={CAT}
              label="Escape Route"
              value={result.escapeRouteLights}
              size="sm"
            />
            <ResultValue category={CAT} label="Open Area" value={result.openAreaLights} size="sm" />
            <ResultValue
              category={CAT}
              label="Anti-Panic"
              value={result.antiPanicLights}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="High Risk"
              value={result.highRiskAreaLights}
              size="sm"
            />
          </ResultsGrid>

          {/* System Details */}
          <ResultsGrid columns={3}>
            <ResultValue
              category={CAT}
              label="Battery"
              value={result.batteryCapacity}
              unit="Ah"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Weight"
              value={result.batteryWeight}
              unit="kg"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Cycle Life"
              value={result.batteryCycleLife}
              size="sm"
            />
          </ResultsGrid>

          {/* Illuminance & Compliance */}
          <ResultsGrid columns={3}>
            <ResultValue
              category={CAT}
              label="Illuminance"
              value={result.illuminanceAchieved.toFixed(1)}
              unit="lux"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Uniformity"
              value={`${result.uniformityRatio.toFixed(1)}:1`}
              size="sm"
            />
            <ResultValue category={CAT} label="Cable Size" value={result.cableSize} size="sm" />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* Compliance Issues */}
          {result.complianceIssues.length > 0 && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1">
              <p className="text-sm font-medium text-white mb-1">Compliance Issues</p>
              {result.complianceIssues.map((issue, i) => (
                <p key={i} className="text-sm text-white flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  {issue}
                </p>
              ))}
            </div>
          )}

          {/* Cost Comparison */}
          <CalculatorSection title="Cost Comparison">
            <div className="grid grid-cols-2 gap-3">
              <div
                className={cn(
                  'text-center p-3 rounded-xl border',
                  result.recommendedSystem === 'Self-Contained'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/10'
                )}
              >
                <p className="text-2xl font-bold text-white">
                  £{result.selfContainedCost.toLocaleString()}
                </p>
                <p className="text-xs text-white">Self-Contained</p>
                {result.recommendedSystem === 'Self-Contained' && (
                  <ResultBadge status="pass" label="Recommended" className="mt-2" />
                )}
              </div>
              <div
                className={cn(
                  'text-center p-3 rounded-xl border',
                  result.recommendedSystem === 'Central Battery'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/10'
                )}
              >
                <p className="text-2xl font-bold text-white">
                  £{result.centralBatteryCost.toLocaleString()}
                </p>
                <p className="text-xs text-white">Central Battery</p>
                {result.recommendedSystem === 'Central Battery' && (
                  <ResultBadge status="pass" label="Recommended" className="mt-2" />
                )}
              </div>
            </div>
            <p className="text-xs text-white mt-2">
              Central battery typically becomes cost-effective above ~{result.costCrossoverPoint}{' '}
              luminaires
            </p>
          </CalculatorSection>

          {/* Commissioning Checklist */}
          <Collapsible open={showChecklist} onOpenChange={setShowChecklist}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 5266-1 Commissioning Checklist</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showChecklist && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="rounded-xl border p-3 space-y-2"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                {result.commissioningChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white">
                    <span className="w-5 h-5 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <CalculatorDivider category={CAT} />

          {/* Calculation Steps */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'SHR-based luminaire spacing',
                formula: `SHR spacing = min(${fixtureProfiles[fixtureType as keyof typeof fixtureProfiles]?.lumens >= 400 ? 12 : fixtureProfiles[fixtureType as keyof typeof fixtureProfiles]?.lumens >= 200 ? 10 : 8}m, ${ceilingHeight}m × 4)`,
                value: `${result.shrSpacing}m`,
                description:
                  'The Spacing-to-Height Ratio (SHR) determines how far apart luminaires can be placed while maintaining adequate illuminance. BS 5266 limits SHR to 4:1 — spacing must not exceed 4× the mounting height.',
              },
              {
                label: 'Open area luminaires',
                formula: `${floorArea}m² ÷ (${result.shrSpacing}m × ${result.shrSpacing}m)`,
                value: `${result.openAreaLights} luminaires`,
                description:
                  'Open area lighting provides a minimum 0.5 lux at floor level to allow safe movement and prevent panic in large spaces.',
              },
              {
                label: 'Total luminaires',
                formula: `${result.escapeRouteLights} escape + ${result.openAreaLights} open + ${result.antiPanicLights} panic + ${result.highRiskAreaLights} high-risk`,
                value: `${result.totalLuminaires} luminaires`,
                description:
                  'Each category serves a different purpose: escape route lights guide people out, open area lights prevent panic, and high-risk lights illuminate dangerous machinery areas.',
              },
              {
                label: 'Battery capacity (with derating)',
                formula: `(${result.totalPower}W × ${emergencyDuration}h) ÷ 12V ÷ ${result.batteryDerating} × safety`,
                value: `${result.batteryCapacity} Ah`,
                description: `Battery derating factor of ${result.batteryDerating} accounts for temperature effects and ageing. The safety margin ensures the system works at end of battery life.`,
              },
              {
                label: 'Achieved illuminance',
                formula: `(${result.totalLuminaires} × ${fixtureProfiles[fixtureType as keyof typeof fixtureProfiles]?.lumens} lm) ÷ ${floorArea}m²`,
                value: `${result.illuminanceAchieved.toFixed(1)} lux`,
                description:
                  'BS 5266-1 requires minimum 1 lux on escape route centrelines and 0.5 lux in open areas. Uniformity ratio must not exceed 40:1.',
              },
            ]}
          />

          {/* What This Means */}
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
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Why Emergency Lighting Matters</p>
                  <p className="text-sm text-white">
                    Emergency lighting activates when the mains supply fails, providing enough light
                    for people to find their way out safely. Without it, a power failure in a
                    windowless building leaves occupants in complete darkness — a serious safety
                    risk.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Key BS 5266-1 Requirements</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Escape routes: minimum 1 lux on the centreline, changeover within 0.5 seconds
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Open areas (&gt;60m²): minimum 0.5 lux to prevent panic, changeover within 5
                      seconds
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      High-risk tasks: minimum 10% of normal maintained illuminance, or 15 lux
                      whichever is greater
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Uniformity: ratio must not exceed 40:1 on escape routes
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">
                    Self-Contained vs Central Battery
                  </p>
                  <p className="text-sm text-white">
                    Self-contained luminaires have their own battery and are simpler to install —
                    ideal for smaller installations. Central battery systems share a single battery
                    bank and become more cost-effective above about 25 luminaires, with the
                    advantage of centralised monitoring and easier battery replacement.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Duration Requirements</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      1 hour: premises that can be evacuated immediately and are not reoccupied
                      until mains is restored
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      3 hours: sleeping accommodation, premises likely to be reoccupied before mains
                      is restored
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <FormulaReference
        category={CAT}
        name="Emergency Lighting Spacing (BS 5266-1)"
        formula="N = A / (S × S)"
        variables={[
          { symbol: 'N', description: 'Number of luminaires' },
          { symbol: 'A', description: 'Floor area (m²)' },
          { symbol: 'S', description: 'SHR-based spacing (m)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default EmergencyLightingCalculator;
