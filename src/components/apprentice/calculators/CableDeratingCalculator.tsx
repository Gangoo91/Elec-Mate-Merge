import { useState } from 'react';
import {
  Cable,
  Info,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { cableDeratingContent } from './content/cable-derating';

const CableDeratingCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [baseRating, setBaseRating] = useState('');
  const [cableType, setCableType] = useState('tp70');
  const [installationMethod, setInstallationMethod] = useState('method-c');
  const [ambientTemp, setAmbientTemp] = useState('30');
  const [numberOfCables, setNumberOfCables] = useState('1');
  const [thermalInsulation, setThermalInsulation] = useState('none');
  const [soilThermalResistivity, setSoilThermalResistivity] = useState('2.5');
  const [burialClearance, setBurialClearance] = useState('touching');
  const [deviceType, setDeviceType] = useState('other');

  // Enhanced inputs for protective device compliance
  const [designCurrent, setDesignCurrent] = useState<string>('');
  const [deviceRating, setDeviceRating] = useState<string>('32');

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactor: number;
    thermalInsulationFactor: number;
    soilFactor: number;
    deviceFactor: number;
    buriedFactor: number;
    totalDerating: number;
    finalRating: number;
    deratingPercentage: number;
    warnings: string[];
    compliance: {
      Ib: number;
      In: number;
      Iz: number;
      ibInCompliant: boolean;
      inIzCompliant: boolean;
      overallCompliant: boolean;
      safetyMargin: number;
    } | null;
  } | null>(null);

  /**
   * The COLUMNS of BS 7671 Table 4B1. Ca is set by the insulation's permitted
   * operating temperature, so the column is the input — not a free-text °C.
   * Silicone 180 °C was offered here before; Table 4B1 does not cover it and no
   * factor was ever published for it, so it is gone rather than guessed.
   */
  const cableTypes = [
    { value: 'tp70', label: '70°C thermoplastic (PVC)' },
    { value: 'ts90', label: '90°C thermosetting (XLPE)' },
    { value: 'ts60', label: '60°C thermosetting (rubber)' },
    { value: 'mineral70', label: 'Mineral, covered or exposed to touch (70°C)' },
    { value: 'mineral105', label: 'Mineral, bare and not exposed to touch (105°C)' },
  ];
  // BS 7671 Reference Installation Methods
  const installationMethods = [
    { value: 'method-a1', label: 'Method A1 - Enclosed in conduit on wall' },
    { value: 'method-a2', label: 'Method A2 - Enclosed in trunking on wall' },
    { value: 'method-b1', label: 'Method B1 - Enclosed in conduit in masonry' },
    { value: 'method-b2', label: 'Method B2 - Enclosed in trunking in masonry' },
    { value: 'method-c', label: 'Method C - Clipped direct to surface' },
    { value: 'method-d1', label: 'Method D1 - In conduit or duct in the ground' },
    { value: 'method-d2', label: 'Method D2 - Direct in the ground' },
    { value: 'method-e', label: 'Method E - In free air' },
    { value: 'method-f', label: 'Method F - On cable tray (perforated)' },
    { value: 'method-g', label: 'Method G - On cable tray (unperforated)' },
  ];

  // Ambient temperatures
  const ambientTemperatures = [
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
  ];

  /**
   * The COLUMNS of Table 4C1. These were ranges ("4-5 cables", "6-8 cables")
   * mapped to one factor each, which forced a wrong pick: 4 and 5 circuits have
   * different factors (0.65 / 0.60), as do 6, 7 and 8 (0.57 / 0.54 / 0.52).
   * Every range resolved to the most generous member, always over-stating Iz.
   */
  const cableQuantities = [
    { value: '1', label: '1 circuit' },
    { value: '2', label: '2 circuits' },
    { value: '3', label: '3 circuits' },
    { value: '4', label: '4 circuits' },
    { value: '5', label: '5 circuits' },
    { value: '6', label: '6 circuits' },
    { value: '7', label: '7 circuits' },
    { value: '8', label: '8 circuits' },
    { value: '9', label: '9 circuits' },
    { value: '12', label: '12 circuits' },
    { value: '16', label: '16 circuits' },
    { value: '20', label: '20 or more circuits' },
  ];

  /** Cable-to-cable clearance — the second axis of Table 4C2. Buried only. */
  const burialClearances = [
    { value: 'touching', label: 'Touching (no spacing)' },
    { value: 'onedia', label: 'One cable diameter apart' },
    { value: '0.125', label: '0.125 m apart' },
    { value: '0.25', label: '0.25 m apart' },
    { value: '0.5', label: '0.5 m apart' },
  ];
  /**
   * Lengths from the Ci table in Appendix 4, Section 2.6.
   * ⚠️ The old list mixed two different things. It offered "touching insulation
   * on one side" options carrying extra factors (0.89/0.81/0.68) — but Reg 523.9
   * handles a cable in contact with a thermally conductive surface on one side
   * through the TABULATED capacities (Installation Methods 100-103), not through
   * an extra factor. Applying one on top double-counts. It also had the
   * totally-surrounded factors wrong in the other direction (0.63 for 50 mm
   * where the standard prints 0.88) and ran down to 0.36, below the 0.5 floor
   * that Reg 523.9 sets for any length of 0.5 m or more.
   */
  const thermalInsulationTypes = [
    { value: 'none', label: 'Not in thermal insulation' },
    { value: '50', label: 'Totally surrounded, 50 mm' },
    { value: '100', label: 'Totally surrounded, 100 mm' },
    { value: '200', label: 'Totally surrounded, 200 mm' },
    { value: '400', label: 'Totally surrounded, 400 mm' },
    { value: '500', label: 'Totally surrounded, 0.5 m or more' },
  ];

  /** Protective device type — sets Cf per Appendix 4, Section 5.1.1(i). */
  const deviceTypes = [
    { value: 'other', label: 'Circuit-breaker or cartridge fuse' },
    { value: 'bs3036', label: 'Semi-enclosed (rewireable) fuse to BS 3036' },
  ];
  const deviceRatingOptions = [
    { value: '6', label: '6A' },
    { value: '10', label: '10A' },
    { value: '16', label: '16A' },
    { value: '20', label: '20A' },
    { value: '25', label: '25A' },
    { value: '32', label: '32A' },
    { value: '40', label: '40A' },
    { value: '50', label: '50A' },
    { value: '63', label: '63A' },
  ];

  /**
   * TABLE 4B1 — rating factors (Ca) for ambient air temperatures other than 30 °C.
   * Transcribed from the printed standard (BS 7671:2018+A4:2026), verified
   * 2026-08-06. Keyed by ambient °C; the table starts at 25 °C and has no rows
   * below it.
   *
   * ⚠️ WHAT WAS WRONG: Ca was computed as √((tp − ta) / (tp − 30)). That formula
   * is the theoretical basis for the table and does track it closely ABOVE 30 °C
   * — but it diverges badly elsewhere, always by over-stating capacity:
   *   - at 25 °C it returns 1.06 against the printed 1.03;
   *   - below 25 °C the table has no value at all, yet the formula ran on up to
   *     a hard-coded ceiling of 1.20, and the UI offered 10/15/20 °C;
   *   - for mineral 105 °C it drifts steadily (at 90 °C: 0.45 vs printed 0.40).
   * Ca multiplies the tabulated Iz, so an over-stated Ca under-sizes the cable.
   */
  const TABLE_4B1: Record<string, Record<number, number>> = {
    ts60: { 25: 1.02, 30: 1.0, 35: 0.91, 40: 0.82, 45: 0.71, 50: 0.58, 55: 0.41 },
    tp70: { 25: 1.03, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.5 },
    ts90: {
      25: 1.04, 30: 1.0, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76,
      60: 0.71, 65: 0.65, 70: 0.58, 75: 0.5, 80: 0.41,
    },
    mineral70: { 25: 1.07, 30: 1.0, 35: 0.93, 40: 0.85, 45: 0.78, 50: 0.67, 55: 0.57, 60: 0.45 },
    mineral105: {
      25: 1.04, 30: 1.0, 35: 0.96, 40: 0.92, 45: 0.88, 50: 0.84, 55: 0.8, 60: 0.75,
      65: 0.7, 70: 0.65, 75: 0.6, 80: 0.54, 85: 0.47, 90: 0.4, 95: 0.32,
    },
  };

  /**
   * TABLE 4C1 — grouping factors (Cg), by reference method.
   * ⚠️ The previous figures were invented and every one of them over-stated Cg
   * from six circuits up (bunched: 0.60/0.55/0.50/0.45/0.40 against the printed
   * 0.57/0.50/0.45/0.41/0.38). Under-stating the reduction under-sizes the cable.
   */
  const TABLE_4C1 = {
    // Row 1 — bunched in air, on a surface, embedded or enclosed (Methods A to F)
    bunched: { 1: 1.0, 2: 0.8, 3: 0.7, 4: 0.65, 5: 0.6, 6: 0.57, 7: 0.54, 8: 0.52, 9: 0.5, 12: 0.45, 16: 0.41, 20: 0.38 },
    // Row 2 — single layer on wall or floor (Method C)
    singleLayer: { 1: 1.0, 2: 0.85, 3: 0.79, 4: 0.75, 5: 0.73, 6: 0.72, 7: 0.72, 8: 0.71, 9: 0.7, 12: 0.7, 16: 0.7, 20: 0.7 },
    // Row 3 — single layer on a perforated cable tray (Method E)
    tray: { 1: 1.0, 2: 0.88, 3: 0.82, 4: 0.77, 5: 0.75, 6: 0.73, 7: 0.73, 8: 0.72, 9: 0.72, 12: 0.72, 16: 0.72, 20: 0.72 },
    // Row 4 — single layer on ladder system or cleats
    ladder: { 1: 1.0, 2: 0.87, 3: 0.82, 4: 0.8, 5: 0.8, 6: 0.79, 7: 0.79, 8: 0.78, 9: 0.78, 12: 0.78, 16: 0.78, 20: 0.78 },
  } as const;

  /**
   * TABLE 4C2 — cables buried directly in the ground (Method D2). Two axes:
   * circuit count AND cable-to-cable clearance.
   * ⚠️ The old code used a single invented column that matched no row of 4C2 —
   * it gave 0.90 for two buried circuits, which is the 0.5 m-spaced figure, when
   * two touching circuits are 0.75. A 20 % over-statement on the worst case.
   */
  const TABLE_4C2: Record<string, Record<number, number>> = {
    touching: { 1: 1.0, 2: 0.75, 3: 0.65, 4: 0.6, 5: 0.55, 6: 0.5 },
    onedia: { 1: 1.0, 2: 0.8, 3: 0.7, 4: 0.6, 5: 0.55, 6: 0.5 },
    '0.125': { 1: 1.0, 2: 0.85, 3: 0.75, 4: 0.7, 5: 0.65, 6: 0.6 },
    '0.25': { 1: 1.0, 2: 0.9, 3: 0.8, 4: 0.75, 5: 0.7, 6: 0.7 },
    '0.5': { 1: 1.0, 2: 0.9, 3: 0.85, 4: 0.8, 5: 0.8, 6: 0.8 },
  };

  /**
   * Reads a factor out of a sparse table row. Where the exact circuit count is
   * not a printed column, step DOWN to the next lower factor rather than
   * interpolating — the standard prints discrete columns and rounding toward the
   * more onerous factor is the only safe direction.
   */
  const lookupStepDown = (row: Record<number, number>, n: number): number => {
    const keys = Object.keys(row)
      .map(Number)
      .sort((a, b) => a - b);
    if (row[n] !== undefined) return row[n];
    const above = keys.filter((k) => k > n);
    if (above.length) return row[above[0]];
    return row[keys[keys.length - 1]];
  };

  /** Ca from Table 4B1. Linear interpolation between printed rows; never above 1.0
   *  below the table's first row, because the standard publishes nothing there. */
  const calculateTemperatureFactor = (ambient: number, cableTypeValue: string): number => {
    const col = TABLE_4B1[cableTypeValue] ?? TABLE_4B1.tp70;
    const temps = Object.keys(col)
      .map(Number)
      .sort((a, b) => a - b);
    if (col[ambient] !== undefined) return col[ambient];
    // Below the table (under 25 °C): no published factor. Take 1.0 rather than
    // extrapolating a bonus the standard does not grant.
    if (ambient < temps[0]) return 1.0;
    if (ambient > temps[temps.length - 1]) return 0;
    const hiIdx = temps.findIndex((t) => t > ambient);
    const lo = temps[hiIdx - 1];
    const hi = temps[hiIdx];
    return col[lo] + ((col[hi] - col[lo]) * (ambient - lo)) / (hi - lo);
  };

  /** Cg from Table 4C1, or Table 4C2 where the cables are buried. */
  const getGroupingFactor = (numCables: string, method: string): number => {
    const n = parseInt(numCables, 10);
    if (method.includes('d')) return lookupStepDown(TABLE_4C2[burialClearance] ?? TABLE_4C2.touching, n);
    if (method === 'method-c') return lookupStepDown(TABLE_4C1.singleLayer, n);
    if (method === 'method-e') return lookupStepDown(TABLE_4C1.tray, n);
    if (method === 'method-f') return lookupStepDown(TABLE_4C1.tray, n);
    if (method === 'method-g') return lookupStepDown(TABLE_4C1.ladder, n);
    // Methods A and B — enclosed in conduit or trunking, i.e. bunched.
    return lookupStepDown(TABLE_4C1.bunched, n);
  };

  /**
   * Ci — Appendix 4, Section 2.6, verified against the printed standard.
   * Applicable to conductor sizes up to 10 mm² in insulation with thermal
   * conductivity greater than 0.04 W/m·K. Reg 523.9 floors it at 0.5 for any
   * length of 0.5 m or more.
   */
  const getThermalInsulationFactor = (insulation: string): number => {
    const factors: Record<string, number> = {
      none: 1.0,
      '50': 0.88,
      '100': 0.78,
      '200': 0.63,
      '400': 0.51,
      '500': 0.5,
    };
    return factors[insulation] ?? 1.0;
  };

  /**
   * TABLE 4B3 — rating factors (Cs) for soil thermal resistivities other than
   * 2.5 K·m/W. Two separate rows: cables in buried ducts, and direct buried.
   *
   * ⚠️ WHAT WAS WRONG: this was computed as √(2.5 / ρ). At ρ = 0.5 that returns
   * 2.24 against the printed 1.28 for ducts and 1.88 for direct burial — it
   * nearly doubled the cable's rating. It also under-stated above 2.5 K·m/W
   * (0.91 against the printed 0.96). The relationship is not a square root and
   * the two installation cases are not the same curve.
   */
  const TABLE_4B3: Record<string, Record<number, number>> = {
    duct: { 0.5: 1.28, 0.8: 1.2, 1: 1.18, 1.2: 1.13, 1.5: 1.1, 2: 1.05, 2.5: 1.0, 3: 0.96 },
    direct: { 0.5: 1.88, 0.8: 1.62, 1: 1.5, 1.2: 1.4, 1.5: 1.28, 2: 1.12, 2.5: 1.0, 3: 0.9 },
  };

  const getSoilCorrectionFactor = (resistivity: number, method: string): number => {
    if (!method.includes('d')) return 1.0; // buried cables only
    // D1 is in a conduit or duct in the ground; D2 is direct in the ground.
    const row = method === 'method-d2' ? TABLE_4B3.direct : TABLE_4B3.duct;
    const keys = Object.keys(row)
      .map(Number)
      .sort((a, b) => a - b);
    if (row[resistivity] !== undefined) return row[resistivity];
    // Outside the printed range, hold the end value rather than extrapolating.
    if (resistivity <= keys[0]) return row[keys[0]];
    if (resistivity >= keys[keys.length - 1]) return row[keys[keys.length - 1]];
    const hiIdx = keys.findIndex((k) => k > resistivity);
    const lo = keys[hiIdx - 1];
    const hi = keys[hiIdx];
    return row[lo] + ((row[hi] - row[lo]) * (resistivity - lo)) / (hi - lo);
  };

  /**
   * Cf — Appendix 4, Section 5.1.1(i). A semi-enclosed fuse to BS 3036 does not
   * protect the cable as closely as a cartridge fuse or circuit-breaker, so the
   * cable must be rated 0.725 of the device rating. This factor was absent
   * entirely, so every BS 3036 circuit was over-rated by 27.5 %.
   */
  const getDeviceFactor = (device: string): number => (device === 'bs3036' ? 0.725 : 1.0);

  /**
   * Cc — Appendix 4, Section 5.1.1(ii). 0.9 where the installation method is in
   * a duct in the ground or buried direct, 1 above ground. Also absent before.
   */
  const getBuriedFactor = (method: string): number => (method.includes('d') ? 0.9 : 1.0);

  const calculateDerating = () => {
    if (!baseRating) return;

    const baseRatingValue = parseFloat(baseRating);
    const ambientValue = parseFloat(ambientTemp);
    const soilResistivity = parseFloat(soilThermalResistivity);

    // Calculate all derating factors
    const tempFactor = calculateTemperatureFactor(ambientValue, cableType);
    const groupFactor = getGroupingFactor(numberOfCables, installationMethod);
    const thermalFactor = getThermalInsulationFactor(thermalInsulation);
    const soilFactor = getSoilCorrectionFactor(soilResistivity, installationMethod);
    const deviceFactor = getDeviceFactor(deviceType);
    const buriedFactor = getBuriedFactor(installationMethod);

    // Appendix 4, Section 5.1.1 — every applicable factor multiplies together.
    const totalDerating =
      tempFactor * groupFactor * thermalFactor * soilFactor * deviceFactor * buriedFactor;

    // Final current rating
    const finalRating = baseRatingValue * totalDerating;

    // Calculate percentage reduction
    const deratingPercentage = ((baseRatingValue - finalRating) / baseRatingValue) * 100;

    // Calculate compliance if design current and device rating are provided
    let compliance = null;
    if (designCurrent && deviceRating) {
      const Ib = parseFloat(designCurrent);
      const In = parseFloat(deviceRating);
      const Iz = finalRating;

      const ibInCompliant = Ib <= In;
      const inIzCompliant = In <= Iz;
      const overallCompliant = ibInCompliant && inIzCompliant;
      const safetyMargin = Iz > 0 ? ((Iz - In) / Iz) * 100 : 0;

      compliance = { Ib, In, Iz, ibInCompliant, inIzCompliant, overallCompliant, safetyMargin };
    }

    // Generate warnings
    const warnings: string[] = [];

    if (totalDerating < 0.5) {
      warnings.push('Severe derating detected - consider larger cable or alternative installation');
    }
    if (tempFactor < 0.8) {
      warnings.push('High ambient temperature significantly reducing capacity');
    }
    if (groupFactor < 0.7) {
      warnings.push('Cable grouping causing significant derating');
    }
    if (deviceFactor < 1) {
      warnings.push(
        'Semi-enclosed fuse to BS 3036 — the cable must be rated at 0.725 of the device rating (Appendix 4, 5.1.1)'
      );
    }
    if (thermalFactor < 0.7) {
      warnings.push('Thermal insulation causing significant derating');
    }
    if (soilFactor < 0.9 && soilFactor !== 1.0) {
      warnings.push('Poor soil thermal conditions reducing capacity');
    }
    if (compliance && !compliance.overallCompliant) {
      if (!compliance.ibInCompliant) warnings.push('Design current exceeds device rating');
      if (!compliance.inIzCompliant) warnings.push('Device rating exceeds derated cable capacity');
    }

    setResult({
      temperatureFactor: tempFactor,
      groupingFactor: groupFactor,
      thermalInsulationFactor: thermalFactor,
      soilFactor: soilFactor,
      deviceFactor: deviceFactor,
      buriedFactor: buriedFactor,
      totalDerating: totalDerating,
      finalRating: finalRating,
      deratingPercentage: deratingPercentage,
      warnings: warnings,
      compliance,
    });
  };

  const reset = () => {
    setBaseRating('');
    setCableType('tp70');
    setBurialClearance('touching');
    setDeviceType('other');
    setInstallationMethod('method-c');
    setAmbientTemp('30');
    setNumberOfCables('1');
    setThermalInsulation('none');
    setSoilThermalResistivity('2.5');
    setDesignCurrent('');
    setDeviceRating('32');
    setResult(null);
  };

  const hasValidInputs = () => {
    return !!baseRating;
  };

  return (
    <CalculatorCard
      category="cable"
      title="Cable Derating Calculator"
      description="Calculate cable current carrying capacity with BS 7671 derating factors"
    >
      {/* Circuit Design Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Circuit Design (Optional)</h4>
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Design Current (Ib)"
            unit="A"
            type="text"
            inputMode="decimal"
            value={designCurrent}
            onChange={setDesignCurrent}
            placeholder="Enter design current"
          />
          <CalculatorSelect
            label="Device Rating (In)"
            value={deviceRating}
            onChange={setDeviceRating}
            options={deviceRatingOptions}
          />
        </CalculatorInputGrid>
      </div>

      {/* Cable Parameters */}
      <CalculatorInput
        label="Base Current Rating"
        unit="A"
        type="text"
        inputMode="decimal"
        value={baseRating}
        onChange={setBaseRating}
        placeholder="e.g., 32"
        hint="From BS 7671 current capacity tables"
      />

      <CalculatorSelect
        label="Cable Type"
        value={cableType}
        onChange={setCableType}
        options={cableTypes.map((t) => ({ value: t.value, label: t.label }))}
      />

      <CalculatorSelect
        label="Installation Method"
        value={installationMethod}
        onChange={setInstallationMethod}
        options={installationMethods.map((m) => ({ value: m.value, label: m.label }))}
      />

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Ambient Temperature"
          value={ambientTemp}
          onChange={setAmbientTemp}
          options={ambientTemperatures.map((t) => ({
            value: t,
            label: `${t}°C${t === '30' ? ' (Reference)' : ''}`,
          }))}
        />
        <CalculatorSelect
          label="Number of Cables"
          value={numberOfCables}
          onChange={setNumberOfCables}
          options={cableQuantities.map((q) => ({ value: q.value, label: q.label }))}
        />
      </CalculatorInputGrid>

      <CalculatorSelect
        label="Thermal Insulation"
        value={thermalInsulation}
        onChange={setThermalInsulation}
        options={thermalInsulationTypes.map((t) => ({ value: t.value, label: t.label }))}
      />

      {installationMethod.includes('d') && (
        <CalculatorSelect
          label="Cable-to-Cable Clearance"
          value={burialClearance}
          onChange={setBurialClearance}
          options={burialClearances.map((c) => ({ value: c.value, label: c.label }))}
        />
      )}

      {installationMethod.includes('d') && (
        <CalculatorInput
          label="Soil Thermal Resistivity"
          unit="K·m/W"
          type="text"
          inputMode="decimal"
          value={soilThermalResistivity}
          onChange={setSoilThermalResistivity}
          placeholder="e.g., 2.5"
          hint="Standard is 2.5 K·m/W"
        />
      )}

      <CalculatorSelect
        label="Protective Device Type"
        value={deviceType}
        onChange={setDeviceType}
        options={deviceTypes.map((d) => ({ value: d.value, label: d.label }))}
      />

      <CalculatorActions
        category="cable"
        onCalculate={calculateDerating}
        onReset={reset}
        isDisabled={!hasValidInputs()}
      />

      {result && (
        <>
          <CalculatorDivider category="cable" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <span className="text-xs font-semibold text-emerald-300">
                Derating: -{result.deratingPercentage.toFixed(1)}%
              </span>
            </div>

            {/* Hero Value */}
            <div className="rounded-xl p-4 bg-white/[0.04]">
              <p className="text-sm text-white mb-1">Derated Cable Capacity</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.finalRating.toFixed(1)} A
              </div>
              <p className="text-sm text-white mt-2">Base: {baseRating}A</p>
            </div>

            {/* Derating Factors */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">Derating Factors</h4>

              {/* Temperature Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Temperature (Ca)</span>
                  <span className="font-mono text-emerald-400">
                    {result.temperatureFactor.toFixed(3)}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.temperatureFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />
                </div>
              </div>

              {/* Grouping Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Grouping (Cg)</span>
                  <span className="font-mono text-emerald-400">
                    {result.groupingFactor.toFixed(3)}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.groupingFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />
                </div>
              </div>

              {/* Thermal Insulation Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Thermal Insulation (Ci)</span>
                  <span className="font-mono text-emerald-400">
                    {result.thermalInsulationFactor.toFixed(3)}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.thermalInsulationFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />
                </div>
              </div>

              {/* Soil Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Soil (Cs)</span>
                  <span className="font-mono text-emerald-400">{result.soilFactor.toFixed(3)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.soilFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  />
                </div>
              </div>

              {/* Protective device (Cf) — only when it bites, i.e. BS 3036 */}
              {result.deviceFactor < 1 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">BS 3036 fuse (Cf)</span>
                    <span className="font-mono text-emerald-400">
                      {result.deviceFactor.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.max(result.deviceFactor * 100, 5)}%`,
                        background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Buried installation (Cc) — only when buried */}
              {result.buriedFactor < 1 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Buried (Cc)</span>
                    <span className="font-mono text-emerald-400">
                      {result.buriedFactor.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.max(result.buriedFactor * 100, 5)}%`,
                        background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Compliance Check */}
            {result.compliance && (
              <div
                className={cn(
                  'p-3 rounded-xl border',
                  result.compliance.overallCompliant
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.compliance.overallCompliant ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <span
                    className={cn(
                      'font-medium',
                      result.compliance.overallCompliant ? 'text-green-300' : 'text-red-300'
                    )}
                  >
                    Ib ≤ In ≤ Iz:{' '}
                    {result.compliance.overallCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-white text-xs">Ib</div>
                    <div className="text-white font-mono">{result.compliance.Ib}A</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">In</div>
                    <div className="text-white font-mono">{result.compliance.In}A</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-xs">Iz</div>
                    <div className="text-white font-mono">{result.compliance.Iz.toFixed(1)}A</div>
                  </div>
                </div>
                <div className="text-xs text-white text-center mt-2">
                  Safety margin: {result.compliance.safetyMargin.toFixed(1)}%
                </div>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <div className="space-y-1 text-sm text-white">
                    {result.warnings.map((warning, index) => (
                      <p key={index}>{warning}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <CalculatorDivider category="cable" />

          {/* How It Worked Out - Collapsible */}
          <Collapsible open={showFormula} onOpenChange={setShowFormula}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showFormula && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="text-sm font-mono text-white space-y-2 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs text-purple-400">Derated capacity formula:</div>
                <div>Iz = It × Ca × Cg × Ci × Cs</div>
                <div className="pt-2 border-t border-purple-500/20">
                  Iz = {baseRating} × {result.temperatureFactor.toFixed(3)} ×{' '}
                  {result.groupingFactor.toFixed(3)} × {result.thermalInsulationFactor.toFixed(3)} ×{' '}
                  {result.soilFactor.toFixed(3)}
                </div>
                <div className="text-white font-bold">Iz = {result.finalRating.toFixed(1)}A</div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means - Collapsible */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Derating factors</strong> reduce cable capacity
                    based on installation conditions.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Multiple factors</strong> combine to determine
                    safe operating current.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Ib ≤ In ≤ Iz</strong> ensures proper circuit
                    protection per BS 7671.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Safety margin</strong> should be positive for
                    compliant design.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  BS 7671 Reference
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Table 4C1:</strong> Grouping factors for cables
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Appendix 4, 2.6:</strong> Cable surrounded by
                    thermal insulation (Ci)
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Tables 4B1 to 4B3:</strong> Ambient temperature
                    and soil resistivity factors
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Appendix 4, 5.1.1:</strong> Cf for BS 3036 fuses
                    (0.725) and Cc for buried cables (0.9)
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Iz = It × Ca × Cg × Ci × Cs × Cf × Cc</strong> — the tabulated current from
            Appendix 4, reduced by every rating factor that applies. Size the cable so Iz is not
            less than the rating of the protective device (In).
          </p>
        </div>
      </div>
      <CalculatorEditorial content={cableDeratingContent} category="cable" />
    </CalculatorCard>
  );
};

export default CableDeratingCalculator;
