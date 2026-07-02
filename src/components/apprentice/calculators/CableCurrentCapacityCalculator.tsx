import {
  Zap,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Shield,
  ArrowRight,
  ChevronDown,
  Info,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorInputGrid,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { cableCurrentCapacityContent } from './content/cable-current-capacity';
import {
  getTemperatureFactor,
  getGroupingFactor,
  type GroupingArrangement,
} from '@/lib/calculators/bs7671-data/temperatureFactors';
import {
  capacityTables,
  METHOD_LABELS,
  getSoilResistivityFactor,
  type CableTypeKey,
  type PhaseKey,
} from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';

const CableCurrentCapacityCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [cableSize, setCableSize] = useState<string>('');
  const [cableType, setCableType] = useState<CableTypeKey>('twin-earth');
  const [phase, setPhase] = useState<PhaseKey>('singlePhase');
  const [installationMethod, setInstallationMethod] = useState<string>('method-c');
  const [ambientTemp, setAmbientTemp] = useState<string>('30');
  // Grouping per Table 4C1 — number of circuits + arrangement, factor derived
  const [numberOfCircuits, setNumberOfCircuits] = useState<string>('1');
  const [arrangement, setArrangement] = useState<GroupingArrangement>('bunched');
  const [soilThermalResistivity, setSoilThermalResistivity] = useState<string>('2.5');

  const groupingFactor = getGroupingFactor(parseInt(numberOfCircuits, 10), arrangement);

  // Enhanced inputs for design verification
  const [designCurrent, setDesignCurrent] = useState<string>('');
  const [deviceRating, setDeviceRating] = useState<string>('32');

  const [showWhyMatters, setShowWhyMatters] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const [result, setResult] = useState<{
    referenceMethod: string;
    baseCapacity: number;
    tempCorrectionFactor: number;
    groupingCorrectionFactor: number;
    soilCorrectionFactor: number;
    finalCapacity: number;
    voltageRating: string;
    standard: string;
    compliance: {
      Ib: number;
      In: number;
      Iz: number;
      ibInCompliant: boolean;
      inIzCompliant: boolean;
      overallCompliant: boolean;
      safetyMargin: number;
    } | null;
    warnings: string[];
    actionableGuidance?: {
      failureMode: string;
      suggestions: string[];
    } | null;
  } | null>(null);

  // Cable sizes dropdown options
  // Cable types, sizes and installation methods all come from the verified
  // Appendix 4 data module (see appendix4CurrentCapacity.ts) — every value
  // transcribed from the standard for ELE-1256. Dropdowns are filtered so
  // only combinations that exist in BS 7671 can be selected.
  const cableTypes = (Object.keys(capacityTables) as CableTypeKey[]).map((key) => ({
    value: key,
    label: capacityTables[key].label,
  }));

  // Extended device ratings for better selection
  const deviceRatings = [
    { value: '6', label: '6A' },
    { value: '10', label: '10A' },
    { value: '16', label: '16A' },
    { value: '20', label: '20A' },
    { value: '25', label: '25A' },
    { value: '32', label: '32A' },
    { value: '40', label: '40A' },
    { value: '45', label: '45A' },
    { value: '50', label: '50A' },
    { value: '63', label: '63A' },
    { value: '80', label: '80A' },
    { value: '100', label: '100A' },
  ];

  const phaseOptions = [
    { value: 'singlePhase', label: 'Single-phase' },
    { value: 'threePhase', label: 'Three-phase' },
  ];

  // Ambient temperature options (Table 4B1 air temperatures)
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
  ].map((t) => ({ value: t, label: `${t}°C` }));

  // Grouping — number of circuits (Table 4C1 columns) + arrangement rows.
  // The factor itself comes from the verified getGroupingFactor lookup.
  const circuitCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 16, 20].map((n) => ({
    value: String(n),
    label: n === 1 ? '1 (single circuit)' : `${n} circuits/cables`,
  }));

  const arrangementOptions: { value: GroupingArrangement; label: string }[] = [
    { value: 'bunched', label: 'Bunched / enclosed (conduit, trunking)' },
    { value: 'single-layer-wall', label: 'Single layer on wall or floor' },
    { value: 'single-layer-tray', label: 'Single layer on perforated tray' },
    { value: 'single-layer-ladder', label: 'Single layer on ladder / cleats' },
  ];

  // Soil thermal resistivity options — Table 4B3 columns
  const soilResistivityOptions = ['0.5', '0.8', '1.0', '1.2', '1.5', '2.0', '2.5', '3.0'].map(
    (r) => ({ value: r, label: `${r} K·m/W${r === '2.5' ? ' (standard)' : ''}` })
  );

  // Legacy shape consumed throughout this component: type → size → method → It.
  // Derived from the verified module for the selected phase.
  const cableCapacities: Record<string, Record<string, Record<string, number>>> = useMemo(() => {
    const out: Record<string, Record<string, Record<string, number>>> = {};
    for (const key of Object.keys(capacityTables) as CableTypeKey[]) {
      out[key] = {};
      for (const [method, col] of Object.entries(capacityTables[key].methods)) {
        const values = col[phase];
        if (!values) continue;
        for (const [size, it] of Object.entries(values)) {
          (out[key][size] ||= {})[method] = it;
        }
      }
    }
    return out;
  }, [phase]);

  const installationMethods = Object.keys(METHOD_LABELS).map((value) => ({
    value,
    label: METHOD_LABELS[value],
  }));

  const cableSizes = Object.keys(cableCapacities[cableType] || {}).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );

  const cableSizeOptions = cableSizes.map((s) => ({ value: s, label: `${s} mm²` }));

  // Helper function to get next cable size that works
  const getNextCableSize = (currentSize: string, targetIz: number) => {
    const currentIndex = cableSizes.indexOf(currentSize);
    const capacityData = cableCapacities[cableType];

    for (let i = currentIndex + 1; i < cableSizes.length; i++) {
      const size = cableSizes[i];
      const sizeData = capacityData?.[size];
      const baseCapacity = sizeData?.[installationMethod];

      if (baseCapacity) {
        const ambient = parseFloat(ambientTemp);
        const grouping = groupingFactor;
        const soilResistivity = parseFloat(soilThermalResistivity);

        let tempFactor = 1.0;
        if (ambient !== 30) {
          tempFactor = getTemperatureFactor(ambient, capacityTables[cableType].insulation);
        }

        let soilFactor = 1.0;
        if (installationMethod === 'method-d1' || installationMethod === 'method-d2') {
          soilFactor = getSoilResistivityFactor(soilResistivity, installationMethod);
        }

        const finalCapacity = baseCapacity * tempFactor * grouping * soilFactor;
        if (finalCapacity >= targetIz) {
          return { size, capacity: finalCapacity };
        }
      }
    }
    return null;
  };

  // Helper to get the next valid device rating
  const getNextDeviceRating = (currentIn: number, maxIz: number) => {
    const deviceValues = deviceRatings.map((d) => parseFloat(d.value));
    return deviceValues.find((rating) => rating > currentIn && rating <= maxIz);
  };

  // Filter installation methods to what the standard actually tabulates for
  // this cable type (and phase), narrowed further once a size is picked.
  const getAvailableInstallationMethods = () => {
    const typeMethods = capacityTables[cableType]?.methods || {};
    const typeFiltered = installationMethods.filter((m) => !!typeMethods[m.value]?.[phase]);
    if (!cableSize) return typeFiltered;
    const sizeData = cableCapacities[cableType]?.[cableSize];
    if (!sizeData) return typeFiltered;
    return typeFiltered.filter((method) => sizeData[method.value] !== undefined);
  };

  // Validation helper
  const isValidForCalculation = () => {
    return cableSize && designCurrent && deviceRating && parseFloat(designCurrent) > 0;
  };

  const calculateCapacity = () => {
    const size = parseFloat(cableSize);
    const ambient = Math.max(10, Math.min(60, parseFloat(ambientTemp)));
    const grouping = groupingFactor;
    const soilResistivity = Math.max(0.5, Math.min(3.0, parseFloat(soilThermalResistivity)));

    if (size > 0 && ambient > 0 && grouping > 0) {
      const capacityData = cableCapacities[cableType];
      const sizeKey = size.toFixed(1);

      if (capacityData && capacityData[sizeKey]) {
        const sizeData = capacityData[sizeKey];
        const baseCapacity = sizeData[installationMethod] || 0;

        if (baseCapacity > 0) {
          let tempFactor = 1.0;
          if (ambient !== 30) {
            tempFactor = getTemperatureFactor(ambient, capacityTables[cableType].insulation);
          }

          let soilFactor = 1.0;
          if (installationMethod === 'method-d1' || installationMethod === 'method-d2') {
            soilFactor = getSoilResistivityFactor(soilResistivity, installationMethod);
          }

          const finalCapacity = baseCapacity * tempFactor * grouping * soilFactor;

          let compliance = null;
          const warnings: string[] = [];
          let actionableGuidance: { failureMode: string; suggestions: string[] } | null = null;

          if (designCurrent && deviceRating) {
            const Ib = parseFloat(designCurrent);
            const In = parseFloat(deviceRating);
            const Iz = finalCapacity;

            const ibInCompliant = Ib <= In;
            const inIzCompliant = In <= Iz;
            const overallCompliant = ibInCompliant && inIzCompliant;
            const safetyMargin = Iz > 0 ? ((Iz - In) / Iz) * 100 : 0;

            compliance = {
              Ib,
              In,
              Iz,
              ibInCompliant,
              inIzCompliant,
              overallCompliant,
              safetyMargin,
            };

            if (!overallCompliant) {
              if (!ibInCompliant && !inIzCompliant) {
                const nextCable = getNextCableSize(cableSize, In);
                actionableGuidance = {
                  failureMode: 'Both design current and device rating fail',
                  suggestions: [
                    nextCable
                      ? `Upsize cable to ${nextCable.size}mm² (Iz ≈ ${nextCable.capacity.toFixed(0)}A)`
                      : 'Consider larger cable size',
                    'Switch to XLPE 90°C cable for higher capacity',
                    'Reduce grouping factor by separating circuits',
                    'Improve installation method (e.g., free air)',
                    'Reassess device rating requirements',
                  ],
                };
              } else if (!ibInCompliant) {
                const nextIn = getNextDeviceRating(Ib, Iz);
                actionableGuidance = {
                  failureMode: 'Design current exceeds device rating',
                  suggestions: nextIn
                    ? [
                        `Increase device rating to ${nextIn}A (if Iz allows)`,
                        'Verify protective coordination still works',
                        'Check if higher device rating affects selectivity',
                      ]
                    : [
                        'Split load across multiple circuits',
                        'Reduce design current if possible',
                        'Upsize cable to allow higher device rating',
                      ],
                };
              } else if (!inIzCompliant) {
                const nextCable = getNextCableSize(cableSize, In);
                actionableGuidance = {
                  failureMode: 'Device rating exceeds cable capacity',
                  suggestions: nextCable
                    ? [
                        `Upsize cable to ${nextCable.size}mm² (Iz ≈ ${nextCable.capacity.toFixed(0)}A)`,
                        'Consider XLPE 90°C for higher capacity',
                        'Improve installation conditions (reduce grouping/temp)',
                      ]
                    : [
                        'Consider XLPE 90°C cable',
                        'Improve installation method',
                        'Reduce ambient temperature if possible',
                      ],
                };
              }

              if (!ibInCompliant) warnings.push('Design current exceeds device rating');
              if (!inIzCompliant) warnings.push('Device rating exceeds cable capacity');
            }
            if (safetyMargin < 10) {
              warnings.push('Low safety margin - consider larger cable or lower device rating');
            }
          }

          if (tempFactor < 0.8) {
            warnings.push('High ambient temperature significantly reducing capacity');
          }
          if (grouping < 0.7) {
            warnings.push('Cable grouping causing significant derating');
          }

          let voltageRating = '600/1000V';
          if (cableType.includes('swa')) voltageRating = '600/1000V or 1900/3300V';
          if (cableType.includes('mineral')) voltageRating = '500V or 750V';

          setResult({
            referenceMethod:
              installationMethods.find((m) => m.value === installationMethod)?.label ||
              installationMethod,
            baseCapacity,
            tempCorrectionFactor: tempFactor,
            groupingCorrectionFactor: grouping,
            soilCorrectionFactor: soilFactor,
            finalCapacity,
            voltageRating,
            // Show the working — cite the exact table the tabulated It came from
            standard: `BS 7671:2018+A4:2026 · ${capacityTables[cableType].sourceTable}`,
            compliance,
            warnings,
            actionableGuidance,
          });
        } else {
          setResult({
            referenceMethod:
              installationMethods.find((m) => m.value === installationMethod)?.label ||
              installationMethod,
            baseCapacity: 0,
            tempCorrectionFactor: 0,
            groupingCorrectionFactor: 0,
            soilCorrectionFactor: 0,
            finalCapacity: 0,
            voltageRating: '',
            standard: 'BS 7671:2018+A4:2026',
            compliance: null,
            warnings: [
              `No capacity data for ${cableSize}mm² ${cableTypes.find((t) => t.value === cableType)?.label} with ${installationMethods.find((m) => m.value === installationMethod)?.label}`,
            ],
            actionableGuidance: {
              failureMode: 'No data available',
              suggestions: [
                'Try a different installation method',
                'Consider switching to XLPE cable type',
                'Select a different cable size',
              ],
            },
          });
        }
      } else {
        setResult({
          referenceMethod:
            installationMethods.find((m) => m.value === installationMethod)?.label ||
            installationMethod,
          baseCapacity: 0,
          tempCorrectionFactor: 0,
          groupingCorrectionFactor: 0,
          soilCorrectionFactor: 0,
          finalCapacity: 0,
          voltageRating: '',
          standard: 'BS 7671:2018+A4:2026',
          compliance: null,
          warnings: [`${cableSize}mm² not available for selected cable type`],
          actionableGuidance: {
            failureMode: 'Cable size not available',
            suggestions: ['Select a different cable size', 'Try a different cable type'],
          },
        });
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setCableSize('');
    setCableType('twin-earth');
    setPhase('singlePhase');
    setInstallationMethod('method-c');
    setAmbientTemp('30');
    setNumberOfCircuits('1');
    setArrangement('bunched');
    setSoilThermalResistivity('2.5');
    setDesignCurrent('');
    setDeviceRating('32');
    setResult(null);
  };

  // Keep selections valid when cable type or phase changes — a method or size
  // that doesn't exist in the new table must not linger in state.
  useEffect(() => {
    const available = Object.keys(capacityTables[cableType]?.methods || {}).filter(
      (m) => !!capacityTables[cableType].methods[m][phase]
    );
    if (available.length && !available.includes(installationMethod)) {
      setInstallationMethod(available.includes('method-c') ? 'method-c' : available[0]);
    }
    if (cableSize && !cableSizes.includes(cableSize)) {
      setCableSize('');
    }
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cableType, phase]);

  const getSafetyChip = (margin: number, isCompliant: boolean) => {
    if (!isCompliant) {
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400">
          Non-compliant
        </span>
      );
    }
    if (margin >= 25) {
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
          Excellent ({margin.toFixed(1)}%)
        </span>
      );
    }
    if (margin >= 10) {
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400">
          Adequate ({margin.toFixed(1)}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400">
        Low ({margin.toFixed(1)}%)
      </span>
    );
  };

  return (
    <CalculatorCard
      category="cable"
      title="Cable Current Capacity Calculator"
      description="Calculate current carrying capacity with BS 7671 compliance verification"
    >
      {/* Circuit Design Section */}
      <div className="space-y-3">
        <h4 className="font-medium text-white text-sm sm:text-base">Circuit Design</h4>
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Design Current Ib (A)"
            type="text"
            inputMode="decimal"
            value={designCurrent}
            onChange={setDesignCurrent}
            placeholder="Enter design current"
          />
          <CalculatorSelect
            label="Device Rating In (A)"
            value={deviceRating}
            onChange={setDeviceRating}
            options={deviceRatings}
          />
        </CalculatorInputGrid>
      </div>

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Cable Type"
          value={cableType}
          onChange={(v) => setCableType(v as CableTypeKey)}
          options={cableTypes}
        />
        <CalculatorSelect
          label="Phase"
          value={phase}
          onChange={(v) => setPhase(v as PhaseKey)}
          options={phaseOptions}
        />
      </CalculatorInputGrid>

      {phase === 'threePhase' && cableType === 'twin-earth' && (
        <p className="text-xs text-amber-400 px-1">
          Flat twin &amp; earth is a single-phase cable — Table 4D5 has no three-phase ratings.
          Choose a multicore or SWA type for three-phase circuits.
        </p>
      )}

      <CalculatorSelect
        label="Cable Size (mm²)"
        value={cableSize}
        onChange={setCableSize}
        options={cableSizeOptions}
      />

      <CalculatorSelect
        label="Installation Method"
        value={installationMethod}
        onChange={setInstallationMethod}
        options={getAvailableInstallationMethods()}
      />

      <CalculatorSelect
        label="Ambient Temp (°C)"
        value={ambientTemp}
        onChange={setAmbientTemp}
        options={ambientTemperatures}
      />

      {/* Grouping per Table 4C1 — ask for circuits + arrangement, derive the factor */}
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Grouped Circuits"
          value={numberOfCircuits}
          onChange={setNumberOfCircuits}
          options={circuitCountOptions}
        />
        <CalculatorSelect
          label="Arrangement"
          value={arrangement}
          onChange={(v) => setArrangement(v as GroupingArrangement)}
          options={arrangementOptions}
        />
      </CalculatorInputGrid>
      {parseInt(numberOfCircuits, 10) > 1 && (
        <p className="text-xs text-white/70 px-1">
          Grouping factor Cg = {groupingFactor.toFixed(2)} (Table 4C1). Circuits loaded at 30% or
          less of their grouped rating may be ignored when counting.
        </p>
      )}

      {/* Soil Thermal Resistivity - only for buried cables (Table 4B3) */}
      {(installationMethod === 'method-d1' || installationMethod === 'method-d2') && (
        <CalculatorSelect
          label="Soil Thermal Resistivity (K·m/W)"
          value={soilThermalResistivity}
          onChange={setSoilThermalResistivity}
          options={soilResistivityOptions}
        />
      )}

      <CalculatorActions
        category="cable"
        onCalculate={calculateCapacity}
        onReset={reset}
        isDisabled={!isValidForCalculation()}
        calculateLabel="Calculate"
      />

      {!isValidForCalculation() && !result && (
        <p className="text-xs text-white text-center px-2">
          Please enter design current, device rating, and select cable details to calculate
        </p>
      )}

      {/* Results */}
      {result && (
        <>
          <CalculatorDivider category="cable" />

          <div className="space-y-4 animate-fade-in">
            {/* Hero: Final Capacity */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 text-center">
              <p className="text-sm text-white mb-1">Final Capacity (Iz)</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.finalCapacity.toFixed(1)}A
              </div>
              <p className="text-sm text-white mt-1">Base: {result.baseCapacity}A</p>
            </div>

            {/* Correction Factors */}
            <ResultsGrid columns={3}>
              <ResultValue
                label="Temp Factor"
                value={result.tempCorrectionFactor.toFixed(3)}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Group Factor"
                value={result.groupingCorrectionFactor.toFixed(2)}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Soil Factor"
                value={result.soilCorrectionFactor.toFixed(3)}
                category="cable"
                size="sm"
              />
            </ResultsGrid>

            {/* Formula */}
            <div className="text-xs text-white p-3 rounded-xl bg-white/[0.04] border border-white/5 font-mono">
              Iz = {result.baseCapacity} × {result.tempCorrectionFactor.toFixed(3)} ×{' '}
              {result.groupingCorrectionFactor} × {result.soilCorrectionFactor.toFixed(3)} ={' '}
              {result.finalCapacity.toFixed(1)}A
            </div>

            {/* Compliance Status */}
            {result.compliance && (
              <div
                className={`p-4 rounded-xl border ${
                  result.compliance.overallCompliant
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.compliance.overallCompliant ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm text-white">
                    {result.compliance.overallCompliant
                      ? 'Ib ≤ In ≤ Iz: COMPLIANT'
                      : 'Ib ≤ In ≤ Iz: NON-COMPLIANT'}
                  </span>
                </div>
                <div className="text-sm grid grid-cols-3 gap-2 mb-2 text-white">
                  <div>Ib = {result.compliance.Ib}A</div>
                  <div>In = {result.compliance.In}A</div>
                  <div>Iz = {result.compliance.Iz.toFixed(1)}A</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white">
                    {result.compliance.overallCompliant ? 'Safety margin:' : 'Status:'}
                  </span>
                  {getSafetyChip(
                    result.compliance.safetyMargin,
                    result.compliance.overallCompliant
                  )}
                </div>
              </div>
            )}

            {/* Actionable Guidance */}
            {result.actionableGuidance && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="font-medium text-sm text-white">What to do next:</span>
                </div>
                <p className="text-xs text-white mb-2">{result.actionableGuidance.failureMode}</p>
                <ul className="text-xs space-y-1">
                  {result.actionableGuidance.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-white">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span className="font-medium text-sm text-white">Warnings</span>
                </div>
                <ul className="text-xs space-y-1">
                  {result.warnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2 text-white">
                      <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Why This Matters */}
          <Collapsible open={showWhyMatters} onOpenChange={setShowWhyMatters}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="text-sm sm:text-base font-medium text-white">
                  Why This Matters
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showWhyMatters && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2">
              <div className="space-y-2">
                {[
                  'The Ib ≤ In ≤ Iz principle ensures protection from overloads whilst preventing nuisance trips',
                  'Derating factors account for real installation conditions - heat buildup and circuit grouping reduce capacity',
                  'Adequate safety margin helps accommodate real-world variability and future load growth',
                  'Proper cable sizing prevents overheating, fire risk, and voltage drop issues',
                ].map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/[0.04] border-l-2 text-sm text-white"
                    style={{ borderLeftColor: config.gradientFrom }}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Grounded standards + worked example */}
          <CalculatorEditorial content={cableCurrentCapacityContent} category="cable" />

          {/* Practical Guidance */}
          {result.actionableGuidance && (
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
                  <span className="text-sm sm:text-base font-medium text-white">
                    Practical Guidance
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showGuidance && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-2">
                <div className="space-y-2">
                  {[
                    result.compliance?.overallCompliant
                      ? 'Installation meets BS 7671 requirements - proceed with confidence'
                      : 'Non-compliance detected - follow the suggestions above before installation',
                    'Always verify device characteristics and Zs comply for the selected protective device',
                    'Consider future load expansion when selecting cable sizes',
                    'Document all calculations and assumptions for inspection and compliance records',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/[0.04] border-l-2 text-sm text-white"
                      style={{ borderLeftColor: config.gradientFrom }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </>
      )}
    </CalculatorCard>
  );
};

export default CableCurrentCapacityCalculator;
