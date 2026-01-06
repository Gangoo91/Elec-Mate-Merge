import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Info, AlertTriangle, CheckCircle2, BookOpen, ChevronDown, Settings, XCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
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
import { toast } from "@/hooks/use-toast";

// Panel specifications
const panelSpecs = {
  wattage: [
    { value: "300", label: "300W (Budget)" },
    { value: "350", label: "350W (Standard)" },
    { value: "400", label: "400W (Popular)" },
    { value: "450", label: "450W (Premium)" },
    { value: "500", label: "500W (High-end)" },
    { value: "550", label: "550W (Commercial)" }
  ],
  dimensions: [
    { length: "1.65", width: "1.0", label: "1.65m × 1.0m (60-cell)" },
    { length: "2.0", width: "1.0", label: "2.0m × 1.0m (72-cell)" },
    { length: "2.1", width: "1.05", label: "2.1m × 1.05m (Modern)" },
    { length: "2.3", width: "1.1", label: "2.3m × 1.1m (Large)" }
  ],
  electrical: [
    { voc: "49.5", vmpp: "40.6", impp: "9.85", label: "400W Mono PERC" },
    { voc: "45.0", vmpp: "37.5", impp: "9.33", label: "350W Poly" },
    { voc: "55.0", vmpp: "46.0", impp: "9.78", label: "450W Bifacial" },
    { voc: "60.0", vmpp: "50.0", impp: "11.0", label: "550W Commercial" }
  ]
};

const inverterSpecs = [
  { maxVdc: "1000", minVdc: "200", maxIdc: "20", power: "5000", label: "5kW String" },
  { maxVdc: "1000", minVdc: "200", maxIdc: "30", power: "8000", label: "8kW String" },
  { maxVdc: "1100", minVdc: "250", maxIdc: "40", power: "10000", label: "10kW String" },
  { maxVdc: "1500", minVdc: "200", maxIdc: "50", power: "15000", label: "15kW Commercial" }
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

const SolarArrayCalculator = () => {
  const config = CALCULATOR_CONFIG['renewable'];

  const [advancedMode, setAdvancedMode] = useState(false);

  // Basic inputs
  const [panelWattage, setPanelWattage] = useState("");
  const [panelLength, setPanelLength] = useState("");
  const [panelWidth, setPanelWidth] = useState("");
  const [availableLength, setAvailableLength] = useState("");
  const [availableWidth, setAvailableWidth] = useState("");
  const [location, setLocation] = useState("uk-south");

  // Advanced inputs
  const [panelVoc, setPanelVoc] = useState("");
  const [panelVmpp, setPanelVmpp] = useState("");
  const [panelImpp, setPanelImpp] = useState("");
  const [panelTempCoeff, setPanelTempCoeff] = useState("-0.38");
  const [tiltAngle, setTiltAngle] = useState("35");
  const [azimuthAngle, setAzimuthAngle] = useState("180");
  const [shadingLoss, setShadingLoss] = useState("5");
  const [soilingLoss, setSoilingLoss] = useState("3");
  const [inverterEfficiency, setInverterEfficiency] = useState("97");
  const [dcCableLoss, setDcCableLoss] = useState("1.5");
  const [acCableLoss, setAcCableLoss] = useState("1");
  const [inverterMaxVdc, setInverterMaxVdc] = useState("1000");
  const [inverterMinVdc, setInverterMinVdc] = useState("200");
  const [inverterMaxIdc, setInverterMaxIdc] = useState("20");
  const [inverterNominalPower, setInverterNominalPower] = useState("");
  const [dcCableLength, setDcCableLength] = useState("30");
  const [acCableLength, setAcCableLength] = useState("50");
  const [systemVoltage, setSystemVoltage] = useState("230");

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const [result, setResult] = useState<PVResult | null>(null);

  const locationData = {
    'uk-south': { irradiance: 1100, tempAmbient: 15, name: 'UK South' },
    'uk-central': { irradiance: 1000, tempAmbient: 13, name: 'UK Central' },
    'uk-north': { irradiance: 900, tempAmbient: 11, name: 'UK North' },
    'uk-scotland': { irradiance: 850, tempAmbient: 9, name: 'Scotland' }
  };

  const calculatePVSystem = () => {
    const panelW = parseFloat(panelWattage);
    const panelL = parseFloat(panelLength);
    const panelWd = parseFloat(panelWidth);
    const availL = parseFloat(availableLength);
    const availW = parseFloat(availableWidth);

    if (!panelW || !panelL || !panelWd || !availL || !availW) {
      toast({ title: "Missing inputs", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const voc = parseFloat(panelVoc) || (panelW * 0.08);
    const vmpp = parseFloat(panelVmpp) || (voc * 0.82);
    const impp = parseFloat(panelImpp) || (panelW / vmpp);
    const tempCoeff = parseFloat(panelTempCoeff) / 100;
    const tilt = parseFloat(tiltAngle);
    const azimuth = parseFloat(azimuthAngle);
    const invMaxVdc = parseFloat(inverterMaxVdc);
    const invMinVdc = parseFloat(inverterMinVdc);
    const invNomPower = parseFloat(inverterNominalPower) || (panelW * 20);
    const dcLength = parseFloat(dcCableLength);
    const acLength = parseFloat(acCableLength);
    const sysVoltage = parseFloat(systemVoltage);

    const spacing = Math.max(0.5, panelL * 0.3);
    const rowSpacing = Math.max(2.0, panelL * Math.sin(Math.PI * tilt / 180) * 2.5);

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
    const panelsPerString = Math.min(maxPanelsPerString, Math.max(minPanelsPerString, Math.floor(totalPanels / 4)));
    const totalStrings = Math.ceil(totalPanels / panelsPerString);
    const stringCurrent = impp;
    const stringVocCold = vocCold * panelsPerString;
    const stringVmppHot = vmppHot * panelsPerString;

    const locationInfo = locationData[location as keyof typeof locationData];
    const annualIrradiance = locationInfo.irradiance;

    const shadingFactor = (100 - parseFloat(shadingLoss)) / 100;
    const soilingFactor = (100 - parseFloat(soilingLoss)) / 100;
    const inverterEff = parseFloat(inverterEfficiency) / 100;
    const dcLossFactor = (100 - parseFloat(dcCableLoss)) / 100;
    const acLossFactor = (100 - parseFloat(acCableLoss)) / 100;
    const tiltFactor = Math.max(0.8, 1 - Math.abs(tilt - 35) / 100);
    const azimuthFactor = Math.max(0.85, 1 - Math.abs(azimuth - 180) / 180);

    const systemEfficiency = shadingFactor * soilingFactor * inverterEff * dcLossFactor * acLossFactor * tiltFactor * azimuthFactor;
    const performanceRatio = systemEfficiency * 0.85;

    const yearlyGeneration = (totalWattage * annualIrradiance * systemEfficiency) / 1000;
    const dailyGeneration = yearlyGeneration / 365;
    const monthlyGeneration = yearlyGeneration / 12;

    const dcCurrent = totalStrings * impp;
    const dcVoltage = stringVmppHot;
    const dcPower = dcVoltage * dcCurrent;
    const acCurrent = dcPower / (sysVoltage * Math.sqrt(3) * 0.9);

    const dcVoltDropPercentage = (dcCurrent * dcLength * 0.0044) / dcVoltage * 100;
    const acVoltDropPercentage = (acCurrent * acLength * 0.0029) / sysVoltage * 100;

    const usedArea = totalPanels * panelL * panelWd;
    const totalArea = availL * availW;
    const areaEfficiency = (usedArea / totalArea) * 100;
    const inverterSizing = (invNomPower / totalWattage) * 100;

    const complianceChecks = {
      stringVoltageOK: stringVocCold <= invMaxVdc && stringVmppHot >= invMinVdc,
      inverterSizingOK: inverterSizing >= 90 && inverterSizing <= 120,
      voltageDropOK: dcVoltDropPercentage <= 3 && acVoltDropPercentage <= 2.5,
      isolationDistanceOK: spacing >= 0.5,
      mcsSizingOK: totalPanels >= 4 && totalWattage >= 1000
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
      complianceChecks
    });
  };

  const reset = () => {
    setPanelWattage("");
    setPanelLength("");
    setPanelWidth("");
    setAvailableLength("");
    setAvailableWidth("");
    setLocation("uk-south");
    setPanelVoc("");
    setPanelVmpp("");
    setPanelImpp("");
    setResult(null);
  };

  const hasValidInputs = () => {
    return panelWattage && panelLength && panelWidth && availableLength && availableWidth;
  };

  const handlePanelSize = (value: string) => {
    const [length, width] = value.split(',');
    setPanelLength(length);
    setPanelWidth(width);
  };

  const handleElectricalPreset = (label: string) => {
    const spec = panelSpecs.electrical.find(s => s.label === label);
    if (spec) {
      setPanelVoc(spec.voc);
      setPanelVmpp(spec.vmpp);
      setPanelImpp(spec.impp);
    }
  };

  const handleInverterPreset = (label: string) => {
    const spec = inverterSpecs.find(s => s.label === label);
    if (spec) {
      setInverterMaxVdc(spec.maxVdc);
      setInverterMinVdc(spec.minVdc);
      setInverterMaxIdc(spec.maxIdc);
      setInverterNominalPower(spec.power);
    }
  };

  const allChecksPass = result && Object.values(result.complianceChecks).every(v => v);

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="PV System Designer"
        description="Professional solar array design with BS 7671 compliance"
        badge="MCS"
        headerAction={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAdvancedMode(!advancedMode)}
            className="gap-2 h-8 text-xs border-white/20 hover:bg-white/10"
          >
            <Settings className="h-3 w-3" />
            {advancedMode ? 'Basic' : 'Advanced'}
          </Button>
        }
      >
        {/* Panel Selection */}
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Panel Wattage"
            value={panelWattage}
            onChange={setPanelWattage}
            options={panelSpecs.wattage.map(s => ({ value: s.value, label: s.label }))}
            placeholder="Select wattage"
          />
          <CalculatorSelect
            label="Panel Dimensions"
            value={panelLength ? `${panelLength},${panelWidth}` : ""}
            onChange={handlePanelSize}
            options={panelSpecs.dimensions.map(s => ({ value: `${s.length},${s.width}`, label: s.label }))}
            placeholder="Select size"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={Object.entries(locationData).map(([key, data]) => ({ value: key, label: data.name }))}
          />
          <CalculatorInput
            label="Custom Wattage"
            unit="W"
            type="text"
            inputMode="numeric"
            value={panelWattage}
            onChange={setPanelWattage}
            placeholder="Or enter custom"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Available Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={availableLength}
            onChange={setAvailableLength}
            placeholder="e.g., 12"
          />
          <CalculatorInput
            label="Available Width"
            unit="m"
            type="text"
            inputMode="decimal"
            value={availableWidth}
            onChange={setAvailableWidth}
            placeholder="e.g., 8"
          />
        </CalculatorInputGrid>

        {/* Advanced Options */}
        {advancedMode && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium text-white/80">Panel Electrical</h4>
            <CalculatorSelect
              label="Electrical Preset"
              value=""
              onChange={handleElectricalPreset}
              options={panelSpecs.electrical.map(s => ({ value: s.label, label: s.label }))}
              placeholder="Select preset"
            />
            <CalculatorInputGrid columns={3}>
              <CalculatorInput label="Voc" unit="V" type="text" inputMode="decimal" value={panelVoc} onChange={setPanelVoc} placeholder="49.5" />
              <CalculatorInput label="Vmpp" unit="V" type="text" inputMode="decimal" value={panelVmpp} onChange={setPanelVmpp} placeholder="40.6" />
              <CalculatorInput label="Impp" unit="A" type="text" inputMode="decimal" value={panelImpp} onChange={setPanelImpp} placeholder="9.85" />
            </CalculatorInputGrid>

            <h4 className="text-sm font-medium text-white/80 pt-2">Inverter</h4>
            <CalculatorSelect
              label="Inverter Preset"
              value=""
              onChange={handleInverterPreset}
              options={inverterSpecs.map(s => ({ value: s.label, label: s.label }))}
              placeholder="Select inverter"
            />
            <CalculatorInputGrid columns={2}>
              <CalculatorInput label="Max Vdc" unit="V" type="text" inputMode="numeric" value={inverterMaxVdc} onChange={setInverterMaxVdc} placeholder="1000" />
              <CalculatorInput label="Min Vdc" unit="V" type="text" inputMode="numeric" value={inverterMinVdc} onChange={setInverterMinVdc} placeholder="200" />
              <CalculatorInput label="Nominal Power" unit="W" type="text" inputMode="numeric" value={inverterNominalPower} onChange={setInverterNominalPower} placeholder="8000" />
              <CalculatorInput label="Efficiency" unit="%" type="text" inputMode="decimal" value={inverterEfficiency} onChange={setInverterEfficiency} placeholder="97" />
            </CalculatorInputGrid>

            <h4 className="text-sm font-medium text-white/80 pt-2">System Config</h4>
            <CalculatorInputGrid columns={2}>
              <CalculatorInput label="Tilt Angle" unit="°" type="text" inputMode="numeric" value={tiltAngle} onChange={setTiltAngle} placeholder="35" />
              <CalculatorInput label="Azimuth" unit="°" type="text" inputMode="numeric" value={azimuthAngle} onChange={setAzimuthAngle} placeholder="180" />
              <CalculatorInput label="Shading Loss" unit="%" type="text" inputMode="decimal" value={shadingLoss} onChange={setShadingLoss} placeholder="5" />
              <CalculatorInput label="Soiling Loss" unit="%" type="text" inputMode="decimal" value={soilingLoss} onChange={setSoilingLoss} placeholder="3" />
            </CalculatorInputGrid>
          </div>
        )}

        <CalculatorActions
          category="renewable"
          onCalculate={calculatePVSystem}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Design System"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="renewable">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">System Capacity</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {(result.totalWattage / 1000).toFixed(1)} kWp
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  {result.totalPanels} panels
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  {result.totalStrings} strings
                </Badge>
              </div>
            </div>

            {/* Layout */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-white/80 mb-3">Array Layout</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="Panels per Row" value={result.panelsPerRow.toString()} category="renewable" size="sm" />
                <ResultValue label="Number of Rows" value={result.numberOfRows.toString()} category="renewable" size="sm" />
                <ResultValue label="Panels per String" value={result.panelsPerString.toString()} category="renewable" size="sm" />
                <ResultValue label="Area Efficiency" value={result.areaEfficiency.toFixed(1)} unit="%" category="renewable" size="sm" />
              </ResultsGrid>
            </div>

            {/* Performance */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-white/80 mb-3">Annual Performance</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="Yearly Generation" value={(result.yearlyGeneration).toFixed(0)} unit="kWh" category="renewable" size="sm" />
                <ResultValue label="Performance Ratio" value={(result.performanceRatio * 100).toFixed(1)} unit="%" category="renewable" size="sm" />
                <ResultValue label="Daily Average" value={result.dailyGeneration.toFixed(1)} unit="kWh" category="renewable" size="sm" />
                <ResultValue label="Inverter Sizing" value={result.inverterSizing.toFixed(0)} unit="%" category="renewable" size="sm" />
              </ResultsGrid>
            </div>

            {/* String Voltages */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-white/80 mb-3">String Configuration</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="Voc (Cold)" value={result.stringVocCold.toFixed(0)} unit="V" category="renewable" size="sm" />
                <ResultValue label="Vmpp (Hot)" value={result.stringVmppHot.toFixed(0)} unit="V" category="renewable" size="sm" />
                <ResultValue label="DC Voltage Drop" value={result.voltageDropDC.toFixed(2)} unit="%" category="renewable" size="sm" />
                <ResultValue label="AC Voltage Drop" value={result.voltageDropAC.toFixed(2)} unit="%" category="renewable" size="sm" />
              </ResultsGrid>
            </div>
          </CalculatorResult>

          {/* Compliance Checks */}
          <div className="calculator-card p-4" style={{ borderColor: allChecksPass ? '#22c55e20' : '#ef444420' }}>
            <div className="flex items-center gap-2 mb-4">
              {allChecksPass ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-400" />
              )}
              <span className="font-semibold text-white">BS 7671 Compliance</span>
            </div>
            <div className="space-y-2">
              {[
                { check: result.complianceChecks.stringVoltageOK, label: "String voltage within inverter limits", detail: `Voc: ${result.stringVocCold.toFixed(0)}V` },
                { check: result.complianceChecks.inverterSizingOK, label: "Inverter sizing (90-120%)", detail: `${result.inverterSizing.toFixed(0)}%` },
                { check: result.complianceChecks.voltageDropOK, label: "Voltage drop within limits", detail: `DC: ${result.voltageDropDC.toFixed(2)}%, AC: ${result.voltageDropAC.toFixed(2)}%` },
                { check: result.complianceChecks.isolationDistanceOK, label: "Isolation distances", detail: "BS 7671 compliant" },
                { check: result.complianceChecks.mcsSizingOK, label: "MCS requirements", detail: `${result.totalPanels} panels, ${(result.totalWattage/1000).toFixed(1)}kWp` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  {item.check ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-xs text-white/60">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voltage Drop Warning */}
          {!result.complianceChecks.voltageDropOK && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <div className="space-y-1 text-sm text-red-200">
                  <p className="font-medium">Voltage drop exceeds limits</p>
                  <p>Consider larger cable CSA or shorter runs</p>
                </div>
              </div>
            </div>
          )}

          {/* Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">System Analysis</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  Performance ratio of <strong className="text-blue-300">{(result.performanceRatio * 100).toFixed(1)}%</strong> is {result.performanceRatio > 0.8 ? 'excellent' : result.performanceRatio > 0.75 ? 'good' : 'below average'} for UK installations.
                </p>
                <p className="text-sm text-blue-200/80">
                  Annual yield: <strong className="text-blue-300">{(result.yearlyGeneration / result.totalWattage * 1000).toFixed(0)} kWh/kWp</strong>
                </p>
                <p className="text-sm text-blue-200/80">
                  Area utilisation of <strong className="text-blue-300">{result.areaEfficiency.toFixed(1)}%</strong> optimises available space.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Reference */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Requirements</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">DC isolation:</strong> Min 6mm air gap, 4mm creepage</p>
                  <p><strong className="text-amber-300">Section 712:</strong> Solar PV power supply systems</p>
                  <p><strong className="text-amber-300">Section 534:</strong> Type 2 SPDs at DC and AC sides</p>
                  <p><strong className="text-amber-300">Fire safety:</strong> 1m setback from roof edges</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Assumptions */}
          <Collapsible open={showAssumptions} onOpenChange={setShowAssumptions}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">Calculation Assumptions</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showAssumptions && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-purple-200/80">
                  <p>Cold temp: -10°C, Hot cell temp: 70°C</p>
                  <p>STC: 1000 W/m², 25°C, AM 1.5</p>
                  <p>DC cable: 4mm² copper, AC: 6mm² copper</p>
                  <p>Annual degradation not included</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-200">
            <strong>Annual Yield</strong> = Capacity × Irradiance × PR. UK typical: 850-1000 kWh/kWp/year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolarArrayCalculator;
