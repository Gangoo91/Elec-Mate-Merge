import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { swimmingPoolContent } from './content/swimming-pool';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSwimmingPoolCalculator } from '@/hooks/useSwimmingPoolCalculator';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const poolTypeOptions = [
  { value: 'private', label: 'Private (Domestic)' },
  { value: 'public', label: 'Public' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'therapy', label: 'Therapy/Medical' },
];

const filtrationOptions = [
  { value: 'sand', label: 'Sand Filter' },
  { value: 'cartridge', label: 'Cartridge Filter' },
  { value: 'de', label: 'Diatomaceous Earth' },
];

const heatingOptions = [
  { value: 'electric', label: 'Electric' },
  { value: 'gas', label: 'Gas' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'solar', label: 'Solar' },
];

const voltageOptions = [
  { value: '230', label: '230V Single Phase' },
  { value: '400', label: '400V Three Phase' },
];

const earthingOptions = [
  { value: 'TN-S', label: 'TN-S' },
  { value: 'TN-C-S', label: 'TN-C-S' },
  { value: 'TT', label: 'TT' },
];

const zoneOptions = [
  { value: 'zone0', label: 'Zone 0 (inside pool)' },
  { value: 'zone1', label: 'Zone 1 (up to 2m)' },
  { value: 'zone2', label: 'Zone 2 (2-3.5m)' },
];

const installMethodOptions = [
  { value: 'underground', label: 'Underground' },
  { value: 'overhead', label: 'Overhead' },
  { value: 'indoor', label: 'Indoor' },
];

const SwimmingPoolCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const { inputs, result, errors, handleInputChange, calculateValues, resetCalculator } =
    useSwimmingPoolCalculator();

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const canCalculate = inputs.poolVolume > 0 && inputs.pumpPower > 0;

  const handleCopy = () => {
    if (!result) return;
    let text = 'Swimming Pool Electrical Calculator Results';
    text += `\nTotal Load: ${result.totalLoad} W`;
    text += `\nTotal Current: ${result.totalCurrent} A`;
    text += `\nSupply: ${result.supplyRequirements}`;
    text += `\nProtection: ${result.mainProtection}`;
    text += `\nCircuits: ${result.circuits.length}`;
    result.circuits.forEach((c) => {
      text += `\n  ${c.name}: ${c.load}W, ${c.cableSize}, ${c.protectionRating}A MCB, ${c.ipRating}`;
    });
    text += `\nBonding: ${result.bondingRequirements.join('; ')}`;
    text += `\nBS 7671 Section 702: ${result.regulatoryCompliance.bs7671Section702 ? 'Compliant' : 'Issues found'}`;
    copyToClipboard(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getComplianceStatus = (): { status: 'pass' | 'warning' | 'fail'; label: string } => {
    if (!result) return { status: 'pass', label: '' };
    if (!result.regulatoryCompliance.bs7671Section702)
      return { status: 'fail', label: 'Issues Found' };
    const hasWarning = result.circuits.some((c) => c.complianceStatus === 'warning');
    if (hasWarning) return { status: 'warning', label: 'Warnings' };
    return { status: 'pass', label: 'Section 702 Compliant' };
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Swimming Pool Electrical Calculator"
      description="Zone compliance, circuit analysis and bonding per BS 7671 Section 702"
    >
      {/* Pool Details */}
      <CalculatorSection title="Pool Details">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Pool Type"
            value={inputs.poolType}
            onChange={(val) => handleInputChange('poolType', val)}
            options={poolTypeOptions}
          />
          <CalculatorInput
            label="Pool Volume"
            unit="L"
            type="text"
            inputMode="decimal"
            value={inputs.poolVolume || ''}
            onChange={(val) => handleInputChange('poolVolume', parseFloat(val) || 0)}
            placeholder="e.g., 50000"
            error={errors.poolVolume}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Cable Run Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={inputs.cableRunLength || ''}
            onChange={(val) => handleInputChange('cableRunLength', parseFloat(val) || 0)}
            placeholder="e.g., 30"
            error={errors.cableRunLength}
          />
          <CalculatorInput
            label="Ambient Temp"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={inputs.ambientTemperature || ''}
            onChange={(val) => handleInputChange('ambientTemperature', parseFloat(val) || 20)}
            placeholder="20"
            error={errors.ambientTemperature}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Electrical Loads */}
      <CalculatorSection title="Electrical Loads">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Heater Power"
            unit="W"
            type="text"
            inputMode="decimal"
            value={inputs.heaterPower || ''}
            onChange={(val) => handleInputChange('heaterPower', parseFloat(val) || 0)}
            placeholder="e.g., 3000"
            error={errors.heaterPower}
          />
          <CalculatorInput
            label="Pump Motor"
            unit="W"
            type="text"
            inputMode="decimal"
            value={inputs.pumpPower || ''}
            onChange={(val) => handleInputChange('pumpPower', parseFloat(val) || 0)}
            placeholder="e.g., 750"
            error={errors.pumpPower}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Lighting"
            unit="W"
            type="text"
            inputMode="decimal"
            value={inputs.lighting || ''}
            onChange={(val) => handleInputChange('lighting', parseFloat(val) || 0)}
            placeholder="e.g., 300"
          />
          <CalculatorSelect
            label="Heating Type"
            value={inputs.heatingType}
            onChange={(val) => handleInputChange('heatingType', val)}
            options={heatingOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Filtration System"
            value={inputs.filtrationSystem}
            onChange={(val) => handleInputChange('filtrationSystem', val)}
            options={filtrationOptions}
          />
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px] touch-manipulation">
              <input
                type="checkbox"
                checked={inputs.hasUnderwaterLighting}
                onChange={(e) => handleInputChange('hasUnderwaterLighting', e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-orange-400 focus:ring-orange-400/50 h-5 w-5"
              />
              <span className="text-sm text-white">Underwater lighting (SELV)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px] touch-manipulation">
              <input
                type="checkbox"
                checked={inputs.hasEmergencyStop}
                onChange={(e) => handleInputChange('hasEmergencyStop', e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-orange-400 focus:ring-orange-400/50 h-5 w-5"
              />
              <span className="text-sm text-white">Emergency stop system</span>
            </label>
          </div>
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Protection & Installation */}
      <CalculatorSection title="Protection and Installation">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Supply Voltage"
            value={inputs.supplyVoltage.toString()}
            onChange={(val) => handleInputChange('supplyVoltage', parseInt(val))}
            options={voltageOptions}
          />
          <CalculatorSelect
            label="Earthing System"
            value={inputs.earthingSystem}
            onChange={(val) => handleInputChange('earthingSystem', val)}
            options={earthingOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Installation Zone"
            value={inputs.zone}
            onChange={(val) => handleInputChange('zone', val)}
            options={zoneOptions}
          />
          <CalculatorSelect
            label="Installation Method"
            value={inputs.installationMethod}
            onChange={(val) => handleInputChange('installationMethod', val)}
            options={installMethodOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={calculateValues}
        onReset={resetCalculator}
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
              status={getComplianceStatus().status}
              label={getComplianceStatus().label}
            />
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
            <p className="text-sm font-medium text-white mb-1">Total Load</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.totalLoad} W
            </p>
            <p className="text-sm text-white mt-2">
              {result.totalCurrent} A | {result.supplyRequirements}
            </p>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Total Current"
              value={result.totalCurrent.toString()}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Circuits"
              value={result.circuits.length.toString()}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Circuit schedule */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Circuit Schedule</p>
            {result.circuits.map((circuit, idx) => (
              <div
                key={idx}
                className={cn(
                  'p-3 rounded-lg border text-sm space-y-1',
                  circuit.complianceStatus === 'compliant'
                    ? 'bg-green-500/5 border-green-500/20'
                    : circuit.complianceStatus === 'warning'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{circuit.name}</span>
                  <span className="text-white text-xs">{circuit.ipRating}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 text-xs text-white">
                  <span>
                    Load: {circuit.load}W ({circuit.current.toFixed(1)}A)
                  </span>
                  <span>Cable: {circuit.cableSize}</span>
                  <span>MCB: {circuit.protectionRating}A</span>
                  <span>RCD: {circuit.rcdRequired ? '30mA required' : 'Not required'}</span>
                </div>
                {circuit.specialRequirements.length > 0 && (
                  <div className="text-xs text-white pt-1">
                    {circuit.specialRequirements.join(' | ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Earthing & bonding */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-white">Earthing</p>
            <p className="text-sm text-white">{result.earthingArrangements}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-white">Bonding Requirements</p>
            {result.bondingRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-white">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: config.gradientFrom }}
                />
                {req}
              </div>
            ))}
          </div>

          {/* Compliance issues */}
          {result.regulatoryCompliance.issues.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-white">Compliance Issues</p>
              {result.regulatoryCompliance.issues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-white">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  {issue}
                </div>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Zone classification',
                formula: `Installation zone: ${inputs.zone.replace('zone', 'Zone ')}`,
                // Reg 702.410.3.4.1 ("Zones 0 and 1") sets 12 V AC RMS / 30 V
                // ripple-free DC in zone 0 and 25 V AC RMS / 60 V ripple-free DC
                // in zone 1. ⚠️ Zone 1 previously read "limited 230V with
                // additional protection" — 230 V is not a general permission in
                // zone 1. Zone 2 IP: Reg 702.512.2(c) makes IPX4 mandatory
                // outdoors, IPX2 is the indoor figure.
                description:
                  inputs.zone === 'zone0'
                    ? 'Zone 0 (inside pool) — SELV only, not exceeding 12V AC RMS or 30V ripple-free DC, source outside zones 0, 1 and 2 (Reg 702.410.3.4.1). IPX8 required.'
                    : inputs.zone === 'zone1'
                      ? 'Zone 1 (up to 2m from the rim) — SELV only, not exceeding 25V AC RMS or 60V ripple-free DC, source outside zones 0, 1 and 2 (Reg 702.410.3.4.1). Narrow exceptions for fixed pool equipment under Reg 702.55.4. IPX4 minimum, IPX5 where water jets are used for cleaning.'
                      : 'Zone 2 (a further 1.5m, so to 3.5m) — equipment protected by SELV, a 30mA RCD or electrical separation (Reg 702.410.3.4.3). IPX2 indoors, IPX4 outdoors.',
              },
              {
                label: 'Circuit analysis',
                formula: `${result.circuits.length} circuits designed for ${result.totalLoad}W total load`,
                value: `${result.totalCurrent}A at ${inputs.supplyVoltage}V`,
                description: `Diversity factors applied: heater ${inputs.poolType === 'private' ? '0.75' : '1.0'}, pump 1.0, lighting ${inputs.poolType === 'private' ? '0.8' : '1.0'}.`,
              },
              {
                label: 'Protection selection',
                formula: `${result.mainProtection}`,
                value: result.supplyRequirements,
                description:
                  'All pool circuits require RCD protection. Underwater equipment must use SELV transformers.',
              },
              {
                label: 'Bonding requirements',
                formula: `${result.bondingRequirements.length} bonding connections required`,
                value: '4mm² minimum bonding conductor',
                // ⚠️ Was "all metalwork within 2m of pool". Reg 702.415.2 scopes
                // supplementary bonding to zones 0, 1 AND 2 — zone 1 reaches 2 m
                // from the rim (Reg 702.32(b)) and zone 2 a further 1.50 m
                // (Reg 702.32(c)), so 3.5 m horizontally and 2.50 m vertically.
                description:
                  'Reg 702.415.2: all extraneous-conductive-parts in zones 0, 1 and 2 — 3.5m horizontally from the rim and 2.50m above the occupied surface — bonded to the protective conductors of exposed-conductive-parts in those zones.',
              },
            ]}
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
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Zone Rules (BS 7671 Section 702)</p>
                  <ul className="space-y-1">
                    {[
                      // Reg 702.410.3.4.1 (zones 0 and 1 of pools/basins),
                      // Reg 702.53 (no switchgear/controlgear or socket-outlets
                      // in zones 0 or 1), Reg 702.512.2 (IP ratings).
                      'Zone 0 (inside pool): SELV only, not exceeding 12V AC RMS or 30V ripple-free DC, source outside zones 0, 1 and 2. IPX8. No sockets, no switchgear or controlgear, no junction boxes.',
                      // ⚠️ Was "IPX5 for commercial" — Reg 702.512.2(b) keys
                      // IPX5 to water jets being likely for cleaning, not to the
                      // pool being commercial. And zone 1 is not "limited 230V".
                      'Zone 1 (up to 2m from the rim): SELV only, not exceeding 25V AC RMS or 60V ripple-free DC. IPX4 minimum, IPX5 where water jets are likely for cleaning. Narrow exceptions for fixed pool equipment under Reg 702.55.4.',
                      // ⚠️ Was "IPX2 minimum" flat — Reg 702.512.2(c) makes IPX4
                      // mandatory outdoors.
                      'Zone 2 (a further 1.5m, so to 3.5m): IPX2 indoors, IPX4 outdoors, IPX5 where water jets are likely for cleaning. Socket-outlets and switches only where protected by SELV, a 30mA RCD or electrical separation.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
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
                  <p className="text-sm text-white font-medium">Supplementary Bonding</p>
                  <ul className="space-y-1">
                    {[
                      // ⚠️ Was "within 2m" — Reg 702.415.2 covers zones 0, 1 and 2.
                      'Reg 702.415.2: every extraneous-conductive-part in zones 0, 1 and 2 must be bonded — 3.5m horizontally from the rim, 2.50m above the occupied surface — using 4mm² minimum conductor',
                      'Includes pool structure, pipework, ladders, handrails, reinforcing steel, and any metallic sheath or covering of a wiring system (Reg 702.522.21)',
                      // ⚠️ Was "must be tested at less than 0.05Ω", stated as a
                      // pass/fail limit. GN3 2.16 says readings across clamp
                      // joints should APPROACH 0.05Ω once instrument resolution,
                      // low-value accuracy and contact resistance are allowed
                      // for; GN3 Ch.6 uses 0.1Ω as the guideline acceptance. The
                      // BS 7671 requirement is Reg 415.2.2, R ≤ 50V / Ia.
                      'Bonding continuity readings should approach 0.05Ω across clamp joints (GN3 2.16), with 0.1Ω the guideline acceptance where the instrument cannot resolve lower (GN3 Ch.6). The requirement itself is R ≤ 50V / Ia (Reg 415.2.2)',
                      'Annual inspection of bonding connections recommended',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
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
                  <p className="text-sm text-white font-medium">RCD Requirements</p>
                  <ul className="space-y-1">
                    {[
                      '30mA RCD protection mandatory for all circuits serving the pool area',
                      // ⚠️ Was "Public pools: additional 10mA RCD for underwater
                      // equipment". Every RCD call in Section 702
                      // (702.410.3.4.1/.2/.3, 702.53, 702.55.1, 702.55.4) points
                      // at Reg 415.1.1, which specifies "a rated residual
                      // operating current not exceeding 30 mA". No 10 mA device
                      // appears anywhere in Section 702, for any pool type.
                      'Section 702 refers to Reg 415.1.1 throughout — 30mA, whatever the pool type. There is no 10mA requirement in Section 702',
                      'RCD operating time verified at IΔn (Reg 643.8)',
                      'Testing: monthly button test, 6-monthly instrument test recommended',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── Standards Reference ── */}
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
                      reg: 'Section 702',
                      desc: 'Swimming pools and other basins — special location requirements covering zones, SELV, bonding, and IP ratings.',
                    },
                    {
                      reg: 'Regulation 702.410.3.4.1',
                      desc: 'Zones 0 and 1 — SELV only: 12V AC RMS / 30V ripple-free DC in zone 0, 25V AC RMS / 60V ripple-free DC in zone 1, the source installed outside zones 0, 1 and 2.',
                    },
                    {
                      reg: 'Regulation 702.415.2',
                      desc: 'Supplementary equipotential bonding — all extraneous-conductive-parts in zones 0, 1 and 2 connected to the protective conductors of exposed-conductive-parts in those zones.',
                    },
                    {
                      reg: 'Regulations 702.53 / 702.512.2',
                      desc: 'No switchgear, controlgear or socket-outlet in zones 0 or 1. IP: IPX8 zone 0, IPX4 zone 1, IPX2 indoors / IPX4 outdoors zone 2 — IPX5 anywhere water jets are likely for cleaning.',
                    },
                    // ⚠️ Replaced "IET Code of Practice — Swimming pool
                    // electrical installations". That publication was cited
                    // without a source, and the boolean it fed
                    // (`ietCodeOfPractice: poolType === 'private'`) carried no
                    // meaning. These are the product standards Section 702
                    // actually invokes.
                    {
                      reg: 'Product standards',
                      desc: 'BS EN 60529 (IP code, Reg 702.512.2); BS EN 60598-2-18 (underwater luminaires, Regs 702.55.2/702.55.3); BS EN 60335-2-41 (pumps, Reg 702.55.3); BS EN 60335-2-60 (hot tubs, Reg 702.55.5).',
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
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Pool Zone Classification"
        formula="Zone 0 → SELV ≤12V AC | Zone 1 → SELV ≤25V AC | Zone 2 → SELV, 30mA RCD or electrical separation"
        variables={[
          {
            symbol: 'Zone 0',
            description: 'Inside the basin — SELV ≤12V AC RMS / 30V ripple-free DC, IPX8',
          },
          {
            symbol: 'Zone 1',
            description:
              'To 2m from the rim, 2.50m high — SELV ≤25V AC RMS / 60V ripple-free DC, IPX4 (IPX5 for water jets)',
          },
          {
            symbol: 'Zone 2',
            description: 'A further 1.5m (to 3.5m) — IPX2 indoors, IPX4 outdoors',
          },
          {
            // ⚠️ Was "to all metalwork within 2m" — Reg 702.415.2 covers all
            // three zones, i.e. 3.5m horizontally and 2.50m vertically.
            symbol: 'Bonding',
            description: '4mm² min conductor to all extraneous-conductive-parts in zones 0, 1 and 2',
          },
        ]}
      />
      <CalculatorEditorial content={swimmingPoolContent} category={CAT} />
    </CalculatorCard>
  );
};

export default SwimmingPoolCalculator;
