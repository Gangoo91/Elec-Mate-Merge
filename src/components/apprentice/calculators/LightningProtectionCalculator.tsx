import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  calculateLightningProtection,
  LightningInputs,
  LightningResult,
  UK_REGIONS,
} from '@/lib/lightning-protection';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

type IncomingService = 'overhead_lines' | 'buried_cables' | 'water_gas_pipes';

const regionOptions = Object.keys(UK_REGIONS).map((key) => ({
  value: key,
  label: `${key} (Ng = ${UK_REGIONS[key]} fl/km²/yr)`,
}));

const constructionOptions = [
  { value: 'steel_frame', label: 'Steel frame' },
  { value: 'reinforced_concrete', label: 'Reinforced concrete' },
  { value: 'brick', label: 'Brick / masonry' },
  { value: 'timber', label: 'Timber frame' },
];

const roofTypeOptions = [
  { value: 'metal', label: 'Metal roof' },
  { value: 'tile', label: 'Tile roof' },
  { value: 'flat_membrane', label: 'Flat membrane' },
];

const contentsRiskOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const occupancyOptions = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'public', label: 'Public building' },
  { value: 'hospital', label: 'Hospital / healthcare' },
];

const existingProtectionOptions = [
  { value: 'none', label: 'None' },
  { value: 'external_lps', label: 'External LPS only' },
  { value: 'spds', label: 'SPDs only' },
  { value: 'both', label: 'External LPS + SPDs' },
];

const serviceCheckboxes: { value: IncomingService; label: string }[] = [
  { value: 'overhead_lines', label: 'Overhead lines' },
  { value: 'buried_cables', label: 'Buried cables' },
  { value: 'water_gas_pipes', label: 'Water / gas pipes' },
];

const LightningProtectionCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<LightningResult | null>(null);

  // Inputs
  const [buildingLength, setBuildingLength] = useState<string>('');
  const [buildingWidth, setBuildingWidth] = useState<string>('');
  const [buildingHeight, setBuildingHeight] = useState<string>('');
  const [ukRegion, setUkRegion] = useState<string>('South East');
  const [buildingConstruction, setBuildingConstruction] = useState<string>('brick');
  const [roofType, setRoofType] = useState<string>('tile');
  const [contentsRisk, setContentsRisk] = useState<string>('normal');
  const [occupancy, setOccupancy] = useState<string>('commercial');
  const [incomingServices, setIncomingServices] = useState<IncomingService[]>([]);
  const [existingProtection, setExistingProtection] = useState<string>('none');

  // Collapsible
  const [showGuidance, setShowGuidance] = useState(false);

  const canCalculate = () => {
    const l = parseFloat(buildingLength);
    const w = parseFloat(buildingWidth);
    const h = parseFloat(buildingHeight);
    return l > 0 && w > 0 && h > 0;
  };

  const toggleService = (service: IncomingService) => {
    setIncomingServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleCalculate = useCallback(() => {
    const l = parseFloat(buildingLength);
    const w = parseFloat(buildingWidth);
    const h = parseFloat(buildingHeight);
    if (!l || !w || !h) return;

    const inputs: LightningInputs = {
      buildingLength: l,
      buildingWidth: w,
      buildingHeight: h,
      ukRegion,
      buildingConstruction: buildingConstruction as LightningInputs['buildingConstruction'],
      roofType: roofType as LightningInputs['roofType'],
      contentsRisk: contentsRisk as LightningInputs['contentsRisk'],
      occupancy: occupancy as LightningInputs['occupancy'],
      incomingServices,
      existingProtection: existingProtection as LightningInputs['existingProtection'],
    };

    const res = calculateLightningProtection(inputs);
    setResult(res);
  }, [
    buildingLength,
    buildingWidth,
    buildingHeight,
    ukRegion,
    buildingConstruction,
    roofType,
    contentsRisk,
    occupancy,
    incomingServices,
    existingProtection,
  ]);

  const handleReset = useCallback(() => {
    setBuildingLength('');
    setBuildingWidth('');
    setBuildingHeight('');
    setUkRegion('South East');
    setBuildingConstruction('brick');
    setRoofType('tile');
    setContentsRisk('normal');
    setOccupancy('commercial');
    setIncomingServices([]);
    setExistingProtection('none');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = 'BS EN 62305-2 Lightning Risk Assessment';
    text += `\nCollection Area (Ad): ${result.collectionArea.toLocaleString()} m\u00B2`;
    text += `\nExpected Strikes (Nd): ${result.expectedStrikes.toExponential(3)} /yr`;
    text += `\nRisk R1: ${result.riskR1.toExponential(2)}`;
    text += `\nRisk R2: ${result.riskR2.toExponential(2)}`;
    text += `\nRisk R3: ${result.riskR3.toExponential(2)}`;
    text += `\nRisk R4: ${result.riskR4.toExponential(2)}`;
    text += `\nTotal Risk: ${result.totalRisk.toExponential(2)}`;
    text += `\nTolerable Risk (RT): ${result.tolerableRisk.toExponential(2)}`;
    text += `\nProtection Required: ${result.protectionRequired ? 'YES' : 'NO'}`;
    if (result.lpsClass) text += `\nLPS Class: ${result.lpsClass}`;
    text += `\nSPD Required: ${result.spdRequired ? 'YES' : 'NO'}`;
    if (result.costEstimate.max > 0) {
      text += `\nEstimated Cost: \u00A3${result.costEstimate.min.toLocaleString()} \u2013 \u00A3${result.costEstimate.max.toLocaleString()}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Lightning Protection Calculator"
      description="BS EN 62305-2 risk assessment for lightning protection systems"
    >
      {/* Building Dimensions */}
      <CalculatorSection title="Building Dimensions">
        <CalculatorInputGrid columns={3} className="grid-cols-3">
          <CalculatorInput
            label="Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={buildingLength}
            onChange={setBuildingLength}
            placeholder="e.g. 30"
          />
          <CalculatorInput
            label="Width"
            unit="m"
            type="text"
            inputMode="decimal"
            value={buildingWidth}
            onChange={setBuildingWidth}
            placeholder="e.g. 20"
          />
          <CalculatorInput
            label="Height"
            unit="m"
            type="text"
            inputMode="decimal"
            value={buildingHeight}
            onChange={setBuildingHeight}
            placeholder="e.g. 10"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Environment and Construction */}
      <CalculatorSection title="Environment and Construction">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="UK Region"
            value={ukRegion}
            onChange={setUkRegion}
            options={regionOptions}
          />
          <CalculatorSelect
            label="Building Construction"
            value={buildingConstruction}
            onChange={setBuildingConstruction}
            options={constructionOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Roof Type"
            value={roofType}
            onChange={setRoofType}
            options={roofTypeOptions}
          />
          <CalculatorSelect
            label="Contents Risk"
            value={contentsRisk}
            onChange={setContentsRisk}
            options={contentsRiskOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Occupancy and Protection */}
      <CalculatorSection title="Occupancy and Protection">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Occupancy"
            value={occupancy}
            onChange={setOccupancy}
            options={occupancyOptions}
          />
          <CalculatorSelect
            label="Existing Protection"
            value={existingProtection}
            onChange={setExistingProtection}
            options={existingProtectionOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Incoming Services */}
      <CalculatorSection title="Incoming Services">
        <div className="space-y-3">
          {serviceCheckboxes.map((svc) => (
            <div key={svc.value} className="flex items-center gap-3">
              <Checkbox
                id={`svc-${svc.value}`}
                checked={incomingServices.includes(svc.value)}
                onCheckedChange={() => toggleService(svc.value)}
              />
              <Label
                htmlFor={`svc-${svc.value}`}
                className="text-sm font-medium text-white touch-manipulation cursor-pointer"
              >
                {svc.label}
              </Label>
            </div>
          ))}
        </div>
      </CalculatorSection>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate()}
        calculateLabel="Assess Risk"
        showReset={!!result}
      />

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status badges + Copy */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <ResultBadge
                status={result.protectionRequired ? 'fail' : 'pass'}
                label={
                  result.protectionRequired
                    ? `Protection Required${result.lpsClass ? ` \u2014 Class ${result.lpsClass}` : ''}`
                    : 'Protection Not Required'
                }
              />
              <ResultBadge
                status={result.spdRequired ? 'warning' : 'pass'}
                label={result.spdRequired ? 'SPDs Required' : 'SPDs Not Required'}
              />
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Risk values */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Collection Area (Ad)"
              value={result.collectionArea.toLocaleString()}
              unit="m\u00B2"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Expected Strikes (Nd)"
              value={result.expectedStrikes.toExponential(3)}
              unit="/yr"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <ResultsGrid columns={2}>
            <ResultValue
              label="Risk R1 (Injury)"
              value={result.riskR1.toExponential(2)}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Risk R2 (Physical damage)"
              value={result.riskR2.toExponential(2)}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Risk R3 (Electrical systems)"
              value={result.riskR3.toExponential(2)}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Risk R4 (Economic loss)"
              value={result.riskR4.toExponential(2)}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <ResultsGrid columns={2}>
            <ResultValue
              label="Total Risk (R)"
              value={result.totalRisk.toExponential(2)}
              category={CAT}
              size="md"
            />
            <ResultValue
              label="Tolerable Risk (RT)"
              value={result.tolerableRisk.toExponential(2)}
              category={CAT}
              size="md"
            />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* Verdict */}
          <div
            className={cn(
              'p-3 rounded-lg border text-sm',
              result.protectionRequired
                ? 'bg-red-500/5 border-red-500/20'
                : 'bg-green-500/5 border-green-500/20'
            )}
          >
            <p className="text-white">{result.verdict}</p>
          </div>

          {/* Cost estimate */}
          {result.costEstimate.max > 0 && (
            <div
              className="p-3 rounded-lg border text-sm"
              style={{
                borderColor: `${config.gradientFrom}20`,
                background: `${config.gradientFrom}05`,
              }}
            >
              <p className="text-white font-medium mb-1">Indicative Cost Estimate</p>
              <p className="text-white">
                {`\u00A3${result.costEstimate.min.toLocaleString()} \u2013 \u00A3${result.costEstimate.max.toLocaleString()}`}
                <span className="text-white ml-1">(typical UK installed cost)</span>
              </p>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* Calculation steps */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Collection area Ad',
                formula: `Ad = L\u00D7W + 2\u00D7(3H)\u00D7(L+W) + \u03C0\u00D7(3H)\u00B2 = ${parseFloat(buildingLength)}\u00D7${parseFloat(buildingWidth)} + 2\u00D7(${3 * parseFloat(buildingHeight)})\u00D7(${parseFloat(buildingLength)}+${parseFloat(buildingWidth)}) + \u03C0\u00D7(${3 * parseFloat(buildingHeight)})\u00B2`,
                value: `${result.collectionArea.toLocaleString()} m\u00B2`,
                description:
                  'The equivalent collection area represents the ground area within which a downward lightning leader is likely to strike the structure rather than the surrounding ground.',
              },
              {
                label: 'Expected direct strikes per year Nd',
                formula: `Nd = Ng \u00D7 Ad \u00D7 Cd \u00D7 10\u207B\u2076 = ${UK_REGIONS[ukRegion] ?? 1.0} \u00D7 ${result.collectionArea} \u00D7 Cd \u00D7 10\u207B\u2076`,
                value: `${result.expectedStrikes.toExponential(3)} strikes/yr`,
                description:
                  'Ng is the ground flash density for the selected UK region, Cd is the environment factor based on building construction.',
              },
              {
                label: 'Risk assessment R1\u2013R4',
                formula: `R = Nd \u00D7 PB \u00D7 L (adjusted for services, contents, existing protection)`,
                value: `Total R = ${result.totalRisk.toExponential(2)}`,
                description:
                  'Each risk component accounts for a different type of loss: R1 (injury), R2 (physical damage), R3 (electrical system failure), R4 (economic loss).',
              },
              {
                label: 'Compare with tolerable risk',
                formula: `R = ${result.totalRisk.toExponential(2)} ${result.protectionRequired ? '>' : '\u2264'} RT = ${result.tolerableRisk.toExponential(2)}`,
                value: result.protectionRequired
                  ? `PROTECTION REQUIRED${result.lpsClass ? ` \u2014 Class ${result.lpsClass} LPS` : ''}`
                  : 'PROTECTION NOT REQUIRED',
                description: result.protectionRequired
                  ? `Protection efficiency E = 1 \u2212 RT/R = ${(1 - result.tolerableRisk / result.totalRisk).toFixed(4)}, which determines the required LPS class.`
                  : 'Total risk is within the tolerable limit of 10\u207B\u2075 per BS EN 62305-2 Table 7.',
              },
            ]}
          />

          {/* Guidance */}
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
                  <p className="text-sm text-white font-medium">
                    Lightning Risk Assessment Overview
                  </p>
                  <p className="text-sm text-white">
                    BS EN 62305-2 requires a formal risk assessment for any structure where
                    lightning damage could result in loss of life, injury, damage to property, or
                    disruption of services. The assessment compares the calculated risk against a
                    tolerable threshold.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">LPS Classes</p>
                  <ul className="space-y-1">
                    {[
                      'Class I: Highest protection (E \u2265 0.98) \u2014 hospitals, munitions stores',
                      'Class II: High protection (E \u2265 0.95) \u2014 schools, public buildings',
                      'Class III: Standard protection (E \u2265 0.90) \u2014 commercial, industrial',
                      'Class IV: Basic protection (E \u2265 0.80) \u2014 residential, agricultural',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Surge Protective Devices (SPDs)</p>
                  <p className="text-sm text-white">
                    SPDs are recommended when the risk of internal electrical system failure (R3)
                    exceeds the tolerable limit, when overhead supply lines are present, or when
                    contents are high-value or critical. They should be installed at the origin and
                    distribution boards to BS EN 62305-4.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="BS EN 62305-2 Key Formulae"
        formula="Ad = L\u00D7W + 2(3H)(L+W) + \u03C0(3H)\u00B2"
        variables={[
          { symbol: 'Ad', description: 'Equivalent collection area (m\u00B2)' },
          {
            symbol: 'Nd',
            description:
              'Ng \u00D7 Ad \u00D7 Cd \u00D7 10\u207B\u2076 \u2014 expected strikes per year',
          },
          { symbol: 'E', description: '1 \u2212 RT/R \u2014 required protection efficiency' },
          {
            symbol: 'RT',
            description: 'Tolerable risk (10\u207B\u2075 per BS EN 62305-2 Table 7)',
          },
          {
            symbol: 'Refs',
            description:
              'BS EN 62305-1:2011, BS EN 62305-2:2012, BS EN 62305-3:2011, BS EN 62305-4:2011, IEC 62305',
          },
        ]}
      />
    </CalculatorCard>
  );
};

export default LightningProtectionCalculator;
