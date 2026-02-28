import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

// Panel specifications
const panelSpecs = {
  wattage: [
    { value: '300', label: '300W (Budget)' },
    { value: '350', label: '350W (Standard)' },
    { value: '400', label: '400W (Popular)' },
    { value: '450', label: '450W (Premium)' },
    { value: '500', label: '500W (High-end)' },
    { value: '550', label: '550W (Commercial)' },
  ],
  dimensions: [
    { length: '1.65', width: '1.0', label: '1.65m × 1.0m (60-cell)' },
    { length: '2.0', width: '1.0', label: '2.0m × 1.0m (72-cell)' },
    { length: '2.1', width: '1.05', label: '2.1m × 1.05m (Modern)' },
    { length: '2.3', width: '1.1', label: '2.3m × 1.1m (Large)' },
  ],
  electrical: [
    { voc: '49.5', vmpp: '40.6', impp: '9.85', label: '400W Mono PERC' },
    { voc: '45.0', vmpp: '37.5', impp: '9.33', label: '350W Poly' },
    { voc: '55.0', vmpp: '46.0', impp: '9.78', label: '450W Bifacial' },
    { voc: '60.0', vmpp: '50.0', impp: '11.0', label: '550W Commercial' },
  ],
};

const inverterSpecs = [
  { maxVdc: '1000', minVdc: '200', maxIdc: '20', power: '5000', label: '5kW String' },
  { maxVdc: '1000', minVdc: '200', maxIdc: '30', power: '8000', label: '8kW String' },
  { maxVdc: '1100', minVdc: '250', maxIdc: '40', power: '10000', label: '10kW String' },
  { maxVdc: '1500', minVdc: '200', maxIdc: '50', power: '15000', label: '15kW Commercial' },
];

interface PVResult {
  panelsPerRow: number;
  numberOfRows: number;
  totalPanels: number;
  totalWattage: number;
  usedArea: number;
  areaEfficiency: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  performanceRatio: number;
  stringsRequired: number;
  panelsPerString: number;
  totalStrings: number;
  stringVocCold: number;
  stringVmppHot: number;
  stringCurrent: number;
  inverterSizing: number;
  voltageDropDC: number;
  voltageDropAC: number;
  complianceChecks: {
    stringVoltageOK: boolean;
    inverterSizingOK: boolean;
    voltageDropOK: boolean;
    isolationDistanceOK: boolean;
    mcsSizingOK: boolean;
  };
}

const locationData: Record<string, { irradiance: number; tempAmbient: number; name: string }> = {
  'uk-south': { irradiance: 1100, tempAmbient: 15, name: 'UK South' },
  'uk-central': { irradiance: 1000, tempAmbient: 13, name: 'UK Central' },
  'uk-north': { irradiance: 900, tempAmbient: 11, name: 'UK North' },
  'uk-scotland': { irradiance: 850, tempAmbient: 9, name: 'Scotland' },
};

const SolarArrayCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

  // Basic inputs
  const [panelWattage, setPanelWattage] = useState('');
  const [panelLength, setPanelLength] = useState('');
  const [panelWidth, setPanelWidth] = useState('');
  const [availableLength, setAvailableLength] = useState('');
  const [availableWidth, setAvailableWidth] = useState('');
  const [location, setLocation] = useState('uk-south');

  // Advanced inputs
  const [panelVoc, setPanelVoc] = useState('');
  const [panelVmpp, setPanelVmpp] = useState('');
  const [panelImpp, setPanelImpp] = useState('');
  const [panelTempCoeff, setPanelTempCoeff] = useState('-0.38');
  const [tiltAngle, setTiltAngle] = useState('35');
  const [azimuthAngle, setAzimuthAngle] = useState('180');
  const [shadingLoss, setShadingLoss] = useState('5');
  const [soilingLoss, setSoilingLoss] = useState('3');
  const [inverterEfficiency, setInverterEfficiency] = useState('97');
  const [dcCableLoss, setDcCableLoss] = useState('1.5');
  const [acCableLoss, setAcCableLoss] = useState('1');
  const [inverterMaxVdc, setInverterMaxVdc] = useState('1000');
  const [inverterMinVdc, setInverterMinVdc] = useState('200');
  const [inverterNominalPower, setInverterNominalPower] = useState('');
  const [dcCableLength, setDcCableLength] = useState('30');
  const [acCableLength, setAcCableLength] = useState('50');
  const [systemVoltage, setSystemVoltage] = useState('230');

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const [result, setResult] = useState<PVResult | null>(null);

  const handlePanelSize = (value: string) => {
    const [length, width] = value.split(',');
    setPanelLength(length);
    setPanelWidth(width);
  };

  const handleElectricalPreset = (label: string) => {
    const spec = panelSpecs.electrical.find((s) => s.label === label);
    if (spec) {
      setPanelVoc(spec.voc);
      setPanelVmpp(spec.vmpp);
      setPanelImpp(spec.impp);
    }
  };

  const handleInverterPreset = (label: string) => {
    const spec = inverterSpecs.find((s) => s.label === label);
    if (spec) {
      setInverterMaxVdc(spec.maxVdc);
      setInverterMinVdc(spec.minVdc);
      setInverterNominalPower(spec.power);
    }
  };

  const handleCalculate = useCallback(() => {
    const panelW = parseFloat(panelWattage);
    const panelL = parseFloat(panelLength);
    const panelWd = parseFloat(panelWidth);
    const availL = parseFloat(availableLength);
    const availW = parseFloat(availableWidth);

    if (!panelW || !panelL || !panelWd || !availL || !availW) {
      toast({
        title: 'Missing inputs',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const voc = parseFloat(panelVoc) || panelW * 0.08;
    const vmpp = parseFloat(panelVmpp) || voc * 0.82;
    const impp = parseFloat(panelImpp) || panelW / vmpp;
    const tempCoeff = parseFloat(panelTempCoeff) / 100;
    const tilt = parseFloat(tiltAngle);
    const azimuth = parseFloat(azimuthAngle);
    const invMaxVdc = parseFloat(inverterMaxVdc);
    const invMinVdc = parseFloat(inverterMinVdc);
    const invNomPower = parseFloat(inverterNominalPower) || panelW * 20;
    const dcLength = parseFloat(dcCableLength);
    const acLength = parseFloat(acCableLength);
    const sysVoltage = parseFloat(systemVoltage);

    const spacing = Math.max(0.5, panelL * 0.3);
    const rowSpacing = Math.max(2.0, panelL * Math.sin((Math.PI * tilt) / 180) * 2.5);

    const panelsPerRow = Math.floor(availL / (panelL + 0.2));
    const numberOfRows = Math.floor(availW / rowSpacing);
    const totalPanels = panelsPerRow * numberOfRows;
    const totalWattage = totalPanels * panelW;

    const tempCold = -10;
    const tempHot = 70;
    const vocCold = voc * (1 + tempCoeff * (tempCold - 25));
    const vmppHot = vmpp * (1 + tempCoeff * (tempHot - 25));

    const maxPanelsPerString = Math.floor(invMaxVdc / vocCold);
    const minPanelsPerString = Math.ceil(invMinVdc / vmppHot);
    const panelsPerString = Math.min(
      maxPanelsPerString,
      Math.max(minPanelsPerString, Math.floor(totalPanels / 4))
    );
    const totalStrings = Math.ceil(totalPanels / panelsPerString);
    const stringCurrent = impp;
    const stringVocCold = vocCold * panelsPerString;
    const stringVmppHot = vmppHot * panelsPerString;

    const locationInfo = locationData[location];
    const annualIrradiance = locationInfo.irradiance;

    const shadingFactor = (100 - parseFloat(shadingLoss)) / 100;
    const soilingFactor = (100 - parseFloat(soilingLoss)) / 100;
    const inverterEff = parseFloat(inverterEfficiency) / 100;
    const dcLossFactor = (100 - parseFloat(dcCableLoss)) / 100;
    const acLossFactor = (100 - parseFloat(acCableLoss)) / 100;
    const tiltFactor = Math.max(0.8, 1 - Math.abs(tilt - 35) / 100);
    // FIX: Azimuth factor — north-facing (0° or 360°) should be ~55-65%, not capped at 85%
    const azimuthFactor = Math.max(0.55, 1 - Math.abs(azimuth - 180) * 0.0025);

    const systemEfficiency =
      shadingFactor *
      soilingFactor *
      inverterEff *
      dcLossFactor *
      acLossFactor *
      tiltFactor *
      azimuthFactor;
    // FIX: Performance ratio IS the system efficiency — remove the double-counting × 0.85
    const performanceRatio = systemEfficiency;

    const yearlyGeneration = (totalWattage * annualIrradiance * systemEfficiency) / 1000;
    const dailyGeneration = yearlyGeneration / 365;
    const monthlyGeneration = yearlyGeneration / 12;

    const dcCurrent = totalStrings * impp;
    const dcVoltage = stringVmppHot;
    const dcPower = dcVoltage * dcCurrent;
    const acCurrent = dcPower / (sysVoltage * Math.sqrt(3) * 0.9);

    const dcVoltDropPercentage = ((dcCurrent * dcLength * 0.0044) / dcVoltage) * 100;
    const acVoltDropPercentage = ((acCurrent * acLength * 0.0029) / sysVoltage) * 100;

    const usedArea = totalPanels * panelL * panelWd;
    const totalArea = availL * availW;
    const areaEfficiency = (usedArea / totalArea) * 100;
    const inverterSizing = (invNomPower / totalWattage) * 100;

    const complianceChecks = {
      stringVoltageOK: stringVocCold <= invMaxVdc && stringVmppHot >= invMinVdc,
      inverterSizingOK: inverterSizing >= 90 && inverterSizing <= 120,
      voltageDropOK: dcVoltDropPercentage <= 3 && acVoltDropPercentage <= 2.5,
      isolationDistanceOK: spacing >= 0.5,
      mcsSizingOK: totalPanels >= 4 && totalWattage >= 1000,
    };

    setResult({
      panelsPerRow,
      numberOfRows,
      totalPanels,
      totalWattage,
      usedArea,
      areaEfficiency,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      performanceRatio,
      stringsRequired: totalStrings,
      panelsPerString,
      totalStrings,
      stringVocCold,
      stringVmppHot,
      stringCurrent,
      inverterSizing,
      voltageDropDC: dcVoltDropPercentage,
      voltageDropAC: acVoltDropPercentage,
      complianceChecks,
    });
  }, [
    panelWattage,
    panelLength,
    panelWidth,
    availableLength,
    availableWidth,
    panelVoc,
    panelVmpp,
    panelImpp,
    panelTempCoeff,
    tiltAngle,
    azimuthAngle,
    shadingLoss,
    soilingLoss,
    inverterEfficiency,
    dcCableLoss,
    acCableLoss,
    inverterMaxVdc,
    inverterMinVdc,
    inverterNominalPower,
    dcCableLength,
    acCableLength,
    systemVoltage,
    location,
    toast,
  ]);

  const handleReset = useCallback(() => {
    setPanelWattage('');
    setPanelLength('');
    setPanelWidth('');
    setAvailableLength('');
    setAvailableWidth('');
    setLocation('uk-south');
    setPanelVoc('');
    setPanelVmpp('');
    setPanelImpp('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'PV System Designer',
      `System Capacity: ${(result.totalWattage / 1000).toFixed(1)} kWp`,
      `Panels: ${result.totalPanels} (${result.panelsPerRow} × ${result.numberOfRows})`,
      `Strings: ${result.totalStrings} (${result.panelsPerString} panels each)`,
      `Voc Cold: ${result.stringVocCold.toFixed(0)}V | Vmpp Hot: ${result.stringVmppHot.toFixed(0)}V`,
      `Yearly Generation: ${result.yearlyGeneration.toFixed(0)} kWh`,
      `Performance Ratio: ${(result.performanceRatio * 100).toFixed(1)}%`,
      `Inverter Sizing: ${result.inverterSizing.toFixed(0)}%`,
      `DC Voltage Drop: ${result.voltageDropDC.toFixed(2)}% | AC: ${result.voltageDropAC.toFixed(2)}%`,
      `Area Efficiency: ${result.areaEfficiency.toFixed(1)}%`,
      `All Compliance Checks: ${Object.values(result.complianceChecks).every((v) => v) ? 'PASS' : 'ISSUES FOUND'}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs = () =>
    panelWattage && panelLength && panelWidth && availableLength && availableWidth;

  const allChecksPass = result && Object.values(result.complianceChecks).every((v) => v);

  return (
    <CalculatorCard
      category={CAT}
      title="PV System Designer"
      description="Professional solar array design with BS 7671 compliance"
    >
      {/* Mode Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAdvancedMode(!advancedMode)}
          className="gap-2 h-11 text-xs border-white/20 hover:bg-white/10 text-white touch-manipulation"
        >
          {advancedMode ? 'Basic Mode' : 'Advanced Mode'}
        </Button>
      </div>

      {/* Panel Selection */}
      <CalculatorSection title="Panel Selection">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Panel Wattage"
            value={panelWattage}
            onChange={setPanelWattage}
            options={panelSpecs.wattage.map((s) => ({ value: s.value, label: s.label }))}
            placeholder="Select wattage"
          />
          <CalculatorSelect
            label="Panel Dimensions"
            value={panelLength ? `${panelLength},${panelWidth}` : ''}
            onChange={handlePanelSize}
            options={panelSpecs.dimensions.map((s) => ({
              value: `${s.length},${s.width}`,
              label: s.label,
            }))}
            placeholder="Select size"
          />
          <CalculatorSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={Object.entries(locationData).map(([key, data]) => ({
              value: key,
              label: data.name,
            }))}
          />
          <CalculatorInput
            label="Custom Wattage"
            unit="W"
            inputMode="numeric"
            value={panelWattage}
            onChange={setPanelWattage}
            placeholder="Or enter custom"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorSection title="Available Roof Area">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Available Length"
            unit="m"
            inputMode="decimal"
            value={availableLength}
            onChange={setAvailableLength}
            placeholder="e.g., 12"
          />
          <CalculatorInput
            label="Available Width"
            unit="m"
            inputMode="decimal"
            value={availableWidth}
            onChange={setAvailableWidth}
            placeholder="e.g., 8"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Advanced Options */}
      {advancedMode && (
        <>
          <CalculatorSection title="Panel Electrical">
            <CalculatorSelect
              label="Electrical Preset"
              value=""
              onChange={handleElectricalPreset}
              options={panelSpecs.electrical.map((s) => ({ value: s.label, label: s.label }))}
              placeholder="Select preset"
            />
            <CalculatorInputGrid columns={3}>
              <CalculatorInput
                label="Voc"
                unit="V"
                inputMode="decimal"
                value={panelVoc}
                onChange={setPanelVoc}
                placeholder="49.5"
              />
              <CalculatorInput
                label="Vmpp"
                unit="V"
                inputMode="decimal"
                value={panelVmpp}
                onChange={setPanelVmpp}
                placeholder="40.6"
              />
              <CalculatorInput
                label="Impp"
                unit="A"
                inputMode="decimal"
                value={panelImpp}
                onChange={setPanelImpp}
                placeholder="9.85"
              />
            </CalculatorInputGrid>
          </CalculatorSection>

          <CalculatorSection title="Inverter">
            <CalculatorSelect
              label="Inverter Preset"
              value=""
              onChange={handleInverterPreset}
              options={inverterSpecs.map((s) => ({ value: s.label, label: s.label }))}
              placeholder="Select inverter"
            />
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Max Vdc"
                unit="V"
                inputMode="numeric"
                value={inverterMaxVdc}
                onChange={setInverterMaxVdc}
                placeholder="1000"
              />
              <CalculatorInput
                label="Min Vdc"
                unit="V"
                inputMode="numeric"
                value={inverterMinVdc}
                onChange={setInverterMinVdc}
                placeholder="200"
              />
              <CalculatorInput
                label="Nominal Power"
                unit="W"
                inputMode="numeric"
                value={inverterNominalPower}
                onChange={setInverterNominalPower}
                placeholder="8000"
              />
              <CalculatorInput
                label="Efficiency"
                unit="%"
                inputMode="decimal"
                value={inverterEfficiency}
                onChange={setInverterEfficiency}
                placeholder="97"
              />
            </CalculatorInputGrid>
          </CalculatorSection>

          <CalculatorSection title="System Config">
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Tilt Angle"
                unit="°"
                inputMode="numeric"
                value={tiltAngle}
                onChange={setTiltAngle}
                placeholder="35"
              />
              <CalculatorInput
                label="Azimuth"
                unit="°"
                inputMode="numeric"
                value={azimuthAngle}
                onChange={setAzimuthAngle}
                placeholder="180"
              />
              <CalculatorInput
                label="Shading Loss"
                unit="%"
                inputMode="decimal"
                value={shadingLoss}
                onChange={setShadingLoss}
                placeholder="5"
              />
              <CalculatorInput
                label="Soiling Loss"
                unit="%"
                inputMode="decimal"
                value={soilingLoss}
                onChange={setSoilingLoss}
                placeholder="3"
              />
            </CalculatorInputGrid>
          </CalculatorSection>
        </>
      )}

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs()}
        calculateLabel="Design System"
        showReset={!!result}
      />

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={allChecksPass ? 'pass' : 'warning'}
              label={allChecksPass ? 'All Checks Pass' : 'Issues Found'}
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
            <p className="text-sm font-medium text-white mb-1">System Capacity</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {(result.totalWattage / 1000).toFixed(1)} kWp
            </p>
            <p className="text-sm text-white mt-2">
              {result.totalPanels} panels | {result.totalStrings} strings
            </p>
          </div>

          {/* Array Layout */}
          <CalculatorSection title="Array Layout">
            <ResultsGrid columns={2}>
              <ResultValue
                category={CAT}
                label="Panels per Row"
                value={result.panelsPerRow.toString()}
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Number of Rows"
                value={result.numberOfRows.toString()}
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Panels per String"
                value={result.panelsPerString.toString()}
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Area Efficiency"
                value={result.areaEfficiency.toFixed(1)}
                unit="%"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* Annual Performance */}
          <CalculatorSection title="Annual Performance">
            <ResultsGrid columns={2}>
              <ResultValue
                category={CAT}
                label="Yearly Generation"
                value={result.yearlyGeneration.toFixed(0)}
                unit="kWh"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Performance Ratio"
                value={(result.performanceRatio * 100).toFixed(1)}
                unit="%"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Daily Average"
                value={result.dailyGeneration.toFixed(1)}
                unit="kWh"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Inverter Sizing"
                value={result.inverterSizing.toFixed(0)}
                unit="%"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* String Configuration */}
          <CalculatorSection title="String Configuration">
            <ResultsGrid columns={2}>
              <ResultValue
                category={CAT}
                label="Voc (Cold)"
                value={result.stringVocCold.toFixed(0)}
                unit="V"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Vmpp (Hot)"
                value={result.stringVmppHot.toFixed(0)}
                unit="V"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="DC Voltage Drop"
                value={result.voltageDropDC.toFixed(2)}
                unit="%"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="AC Voltage Drop"
                value={result.voltageDropAC.toFixed(2)}
                unit="%"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* Compliance Checks */}
          <CalculatorSection title="BS 7671 Compliance">
            <div className="space-y-2">
              {[
                {
                  check: result.complianceChecks.stringVoltageOK,
                  label: 'String voltage within inverter limits',
                  detail: `Voc: ${result.stringVocCold.toFixed(0)}V`,
                },
                {
                  check: result.complianceChecks.inverterSizingOK,
                  label: 'Inverter sizing (90-120%)',
                  detail: `${result.inverterSizing.toFixed(0)}%`,
                },
                {
                  check: result.complianceChecks.voltageDropOK,
                  label: 'Voltage drop within limits',
                  detail: `DC: ${result.voltageDropDC.toFixed(2)}%, AC: ${result.voltageDropAC.toFixed(2)}%`,
                },
                {
                  check: result.complianceChecks.isolationDistanceOK,
                  label: 'Isolation distances',
                  detail: 'BS 7671 compliant',
                },
                {
                  check: result.complianceChecks.mcsSizingOK,
                  label: 'MCS requirements',
                  detail: `${result.totalPanels} panels, ${(result.totalWattage / 1000).toFixed(1)}kWp`,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  {item.check ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-xs text-white">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Array layout',
                formula: `${result.panelsPerRow} × ${result.numberOfRows} = ${result.totalPanels} panels`,
                value: `${(result.totalWattage / 1000).toFixed(1)} kWp`,
              },
              {
                label: 'String configuration',
                formula: `${result.panelsPerString} panels × ${result.totalStrings} strings`,
                value: `Voc cold: ${result.stringVocCold.toFixed(0)}V | Vmpp hot: ${result.stringVmppHot.toFixed(0)}V`,
              },
              {
                label: 'Performance ratio',
                formula: `Product of all derating factors (shading, soiling, inverter, cable, tilt, azimuth)`,
                value: `${(result.performanceRatio * 100).toFixed(1)}%`,
              },
              {
                label: 'Annual yield',
                formula: `${(result.totalWattage / 1000).toFixed(1)}kWp × ${locationData[location].irradiance} kWh/m²/yr × ${(result.performanceRatio * 100).toFixed(1)}%`,
                value: `${result.yearlyGeneration.toFixed(0)} kWh/year`,
              },
              {
                label: 'Voltage drop',
                formula: `DC: ${result.voltageDropDC.toFixed(2)}% (limit 3%) | AC: ${result.voltageDropAC.toFixed(2)}% (limit 2.5%)`,
                value: result.complianceChecks.voltageDropOK
                  ? 'PASS'
                  : 'FAIL — cable upgrade needed',
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <p className="text-sm text-white">
                  Performance ratio of{' '}
                  <span className="font-medium">{(result.performanceRatio * 100).toFixed(1)}%</span>{' '}
                  is{' '}
                  {result.performanceRatio > 0.8
                    ? 'excellent'
                    : result.performanceRatio > 0.75
                      ? 'good'
                      : 'below average'}{' '}
                  for UK installations.
                </p>
                <p className="text-sm text-white">
                  Annual yield:{' '}
                  <span className="font-medium">
                    {((result.yearlyGeneration / result.totalWattage) * 1000).toFixed(0)} kWh/kWp
                  </span>
                </p>
                <p className="text-sm text-white">
                  Area utilisation of{' '}
                  <span className="font-medium">{result.areaEfficiency.toFixed(1)}%</span> optimises
                  available space.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Reference */}
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
                    { reg: 'Section 712', desc: 'Solar PV power supply systems' },
                    { reg: 'Section 534', desc: 'Type 2 SPDs at DC and AC sides' },
                    { reg: 'DC isolation', desc: 'Min 6mm air gap, 4mm creepage' },
                    { reg: 'Fire safety', desc: '1m setback from roof edges' },
                    { reg: 'MCS sizing', desc: 'Professional design to MCS standards required' },
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
        name="PV Annual Yield"
        formula="E_annual = P_peak × G_annual × PR / 1000"
        variables={[
          { symbol: 'P_peak', description: 'System peak power (Wp)' },
          { symbol: 'G_annual', description: 'Annual irradiance (kWh/m²/yr)' },
          { symbol: 'PR', description: 'Performance ratio = product of all derating factors' },
        ]}
      />
    </CalculatorCard>
  );
};

export default SolarArrayCalculator;
