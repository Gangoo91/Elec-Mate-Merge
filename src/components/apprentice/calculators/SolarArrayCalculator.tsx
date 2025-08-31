import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw, Sun, Settings, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PVResult {
  // Layout
  panelsPerRow: number;
  numberOfRows: number;
  totalPanels: number;
  totalWattage: number;
  usedArea: number;
  areaEfficiency: number;
  
  // Generation
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  performanceRatio: number;
  
  // String sizing
  stringsRequired: number;
  panelsPerString: number;
  totalStrings: number;
  stringVocCold: number;
  stringVmppHot: number;
  stringCurrent: number;
  
  // System checks
  inverterSizing: number;
  voltageDropDC: number;
  voltageDropAC: number;
  
  // Compliance
  complianceChecks: {
    stringVoltageOK: boolean;
    inverterSizingOK: boolean;
    voltageDropOK: boolean;
    isolationDistanceOK: boolean;
    mcsSizingOK: boolean;
  };
}

const SolarArrayCalculator = () => {
  // Mode
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // Basic inputs
  const [panelWattage, setPanelWattage] = useState("");
  const [panelLength, setPanelLength] = useState("");
  const [panelWidth, setPanelWidth] = useState("");
  const [availableLength, setAvailableLength] = useState("");
  const [availableWidth, setAvailableWidth] = useState("");
  const [location, setLocation] = useState("uk-south");
  
  // Advanced inputs
  const [panelVoc, setPanelVoc] = useState(""); // Open circuit voltage
  const [panelVmpp, setPanelVmpp] = useState(""); // Max power point voltage
  const [panelImpp, setPanelImpp] = useState(""); // Max power point current
  const [panelTempCoeff, setPanelTempCoeff] = useState("-0.38"); // Temp coefficient Voc
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
  
  const [result, setResult] = useState<PVResult | null>(null);

  // Location data for solar irradiance (simplified)
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

    // Advanced parameters with defaults
    const voc = parseFloat(panelVoc) || (panelW * 0.08); // Estimate if not provided
    const vmpp = parseFloat(panelVmpp) || (voc * 0.82);
    const impp = parseFloat(panelImpp) || (panelW / vmpp);
    const tempCoeff = parseFloat(panelTempCoeff) / 100;
    const tilt = parseFloat(tiltAngle);
    const azimuth = parseFloat(azimuthAngle);
    const invMaxVdc = parseFloat(inverterMaxVdc);
    const invMinVdc = parseFloat(inverterMinVdc);
    const invMaxIdc = parseFloat(inverterMaxIdc);
    const invNomPower = parseFloat(inverterNominalPower) || (panelW * 20); // Default estimate
    const dcLength = parseFloat(dcCableLength);
    const acLength = parseFloat(acCableLength);
    const sysVoltage = parseFloat(systemVoltage);

    // Calculate panel layout with proper spacing
    const spacing = Math.max(0.5, panelL * 0.3); // Minimum 0.5m or 30% of panel length
    const rowSpacing = Math.max(2.0, panelL * Math.sin(Math.PI * tilt / 180) * 2.5); // Row spacing for shading
    
    const panelsPerRow = Math.floor(availL / (panelL + 0.2)); // 0.2m side spacing
    const numberOfRows = Math.floor(availW / rowSpacing);
    const totalPanels = panelsPerRow * numberOfRows;
    const totalWattage = totalPanels * panelW;

    // String sizing calculations
    const tempCold = -10; // UK cold temperature
    const tempHot = 70; // Cell temperature at high irradiance
    const vocCold = voc * (1 + tempCoeff * (tempCold - 25));
    const vmppHot = vmpp * (1 + tempCoeff * (tempHot - 25));
    
    const maxPanelsPerString = Math.floor(invMaxVdc / vocCold);
    const minPanelsPerString = Math.ceil(invMinVdc / vmppHot);
    const panelsPerString = Math.min(maxPanelsPerString, Math.max(minPanelsPerString, Math.floor(totalPanels / 4)));
    const totalStrings = Math.ceil(totalPanels / panelsPerString);
    const stringCurrent = impp;
    const stringVocCold = vocCold * panelsPerString;
    const stringVmppHot = vmppHot * panelsPerString;

    // Performance calculations
    const locationInfo = locationData[location as keyof typeof locationData];
    const annualIrradiance = locationInfo.irradiance;
    
    // System losses
    const shadingFactor = (100 - parseFloat(shadingLoss)) / 100;
    const soilingFactor = (100 - parseFloat(soilingLoss)) / 100;
    const inverterEff = parseFloat(inverterEfficiency) / 100;
    const dcLossFactor = (100 - parseFloat(dcCableLoss)) / 100;
    const acLossFactor = (100 - parseFloat(acCableLoss)) / 100;
    const tiltFactor = Math.max(0.8, 1 - Math.abs(tilt - 35) / 100); // Optimal at 35°
    const azimuthFactor = Math.max(0.85, 1 - Math.abs(azimuth - 180) / 180); // Optimal at 180° (South)
    
    const systemEfficiency = shadingFactor * soilingFactor * inverterEff * dcLossFactor * acLossFactor * tiltFactor * azimuthFactor;
    const performanceRatio = systemEfficiency * 0.85; // Account for other losses
    
    const yearlyGeneration = (totalWattage * annualIrradiance * systemEfficiency) / 1000;
    const dailyGeneration = yearlyGeneration / 365;
    const monthlyGeneration = yearlyGeneration / 12;

    // Voltage drop calculations
    const dcCurrent = totalStrings * impp;
    const dcVoltage = stringVmppHot;
    const dcPower = dcVoltage * dcCurrent;
    const acCurrent = dcPower / (sysVoltage * Math.sqrt(3) * 0.9); // Assuming 3-phase, 0.9 PF
    
    // Simplified voltage drop (assuming 4mm² DC, 6mm² AC)
    const dcVoltDropPercentage = (dcCurrent * dcLength * 0.0044) / dcVoltage * 100; // 4mm² copper
    const acVoltDropPercentage = (acCurrent * acLength * 0.0029) / sysVoltage * 100; // 6mm² copper

    // Area calculations
    const usedArea = totalPanels * panelL * panelWd;
    const totalArea = availL * availW;
    const areaEfficiency = (usedArea / totalArea) * 100;

    // Inverter sizing ratio
    const inverterSizing = (invNomPower / totalWattage) * 100;

    // Compliance checks
    const complianceChecks = {
      stringVoltageOK: stringVocCold <= invMaxVdc && stringVmppHot >= invMinVdc,
      inverterSizingOK: inverterSizing >= 90 && inverterSizing <= 120,
      voltageDropOK: dcVoltDropPercentage <= 3 && acVoltDropPercentage <= 2.5,
      isolationDistanceOK: spacing >= 0.5, // BS 7671 minimum
      mcsSizingOK: totalPanels >= 4 && totalWattage >= 1000 // Typical MCS requirements
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
    setPanelTempCoeff("-0.38");
    setTiltAngle("35");
    setAzimuthAngle("180");
    setShadingLoss("5");
    setSoilingLoss("3");
    setInverterEfficiency("97");
    setDcCableLoss("1.5");
    setAcCableLoss("1");
    setInverterMaxVdc("1000");
    setInverterMinVdc("200");
    setInverterMaxIdc("20");
    setInverterNominalPower("");
    setDcCableLength("30");
    setAcCableLength("50");
    setSystemVoltage("230");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-elec-yellow" />
            PV System Designer
          </div>
          <MobileButton
            onClick={() => setAdvancedMode(!advancedMode)}
            variant="outline"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            {advancedMode ? 'Basic' : 'Advanced'}
          </MobileButton>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Professional PV system design tool with string sizing, performance analysis, and BS 7671 compliance checks.
          </AlertDescription>
        </Alert>

        {/* Basic Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Panel & Site Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Panel Wattage"
              type="number"
              value={panelWattage}
              onChange={(e) => setPanelWattage(e.target.value)}
              placeholder="e.g., 400"
              unit="W"
            />
            <MobileInput
              label="Panel Length"
              type="number"
              value={panelLength}
              onChange={(e) => setPanelLength(e.target.value)}
              placeholder="e.g., 2.0"
              unit="m"
            />
            <MobileInput
              label="Panel Width"
              type="number"
              value={panelWidth}
              onChange={(e) => setPanelWidth(e.target.value)}
              placeholder="e.g., 1.0"
              unit="m"
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-card border-elec-yellow/20">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-elec-card border-elec-yellow/30">
                  {Object.entries(locationData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>{data.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <MobileInput
              label="Available Length"
              type="number"
              value={availableLength}
              onChange={(e) => setAvailableLength(e.target.value)}
              placeholder="e.g., 12"
              unit="m"
            />
            <MobileInput
              label="Available Width"
              type="number"
              value={availableWidth}
              onChange={(e) => setAvailableWidth(e.target.value)}
              placeholder="e.g., 8"
              unit="m"
            />
          </div>
        </div>

        {/* Advanced Inputs */}
        {advancedMode && (
          <MobileAccordion type="multiple" className="space-y-2">
            <MobileAccordionItem value="panel-specs">
              <MobileAccordionTrigger>Panel Electrical Specifications</MobileAccordionTrigger>
              <MobileAccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MobileInput
                    label="Voc (Open Circuit)"
                    type="number"
                    value={panelVoc}
                    onChange={(e) => setPanelVoc(e.target.value)}
                    placeholder="e.g., 49.5"
                    unit="V"
                  />
                  <MobileInput
                    label="Vmpp (Max Power Point)"
                    type="number"
                    value={panelVmpp}
                    onChange={(e) => setPanelVmpp(e.target.value)}
                    placeholder="e.g., 40.6"
                    unit="V"
                  />
                  <MobileInput
                    label="Impp (Max Power Current)"
                    type="number"
                    value={panelImpp}
                    onChange={(e) => setPanelImpp(e.target.value)}
                    placeholder="e.g., 9.85"
                    unit="A"
                  />
                  <MobileInput
                    label="Temp Coeff Voc"
                    type="number"
                    value={panelTempCoeff}
                    onChange={(e) => setPanelTempCoeff(e.target.value)}
                    placeholder="e.g., -0.38"
                    unit="%/°C"
                  />
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="system-config">
              <MobileAccordionTrigger>System Configuration</MobileAccordionTrigger>
              <MobileAccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInput
                    label="Tilt Angle"
                    type="number"
                    value={tiltAngle}
                    onChange={(e) => setTiltAngle(e.target.value)}
                    placeholder="e.g., 35"
                    unit="°"
                  />
                  <MobileInput
                    label="Azimuth Angle"
                    type="number"
                    value={azimuthAngle}
                    onChange={(e) => setAzimuthAngle(e.target.value)}
                    placeholder="e.g., 180 (South)"
                    unit="°"
                  />
                  <MobileInput
                    label="Shading Loss"
                    type="number"
                    value={shadingLoss}
                    onChange={(e) => setShadingLoss(e.target.value)}
                    placeholder="e.g., 5"
                    unit="%"
                  />
                  <MobileInput
                    label="Soiling Loss"
                    type="number"
                    value={soilingLoss}
                    onChange={(e) => setSoilingLoss(e.target.value)}
                    placeholder="e.g., 3"
                    unit="%"
                  />
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="inverter-specs">
              <MobileAccordionTrigger>Inverter Specifications</MobileAccordionTrigger>
              <MobileAccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInput
                    label="Max DC Voltage"
                    type="number"
                    value={inverterMaxVdc}
                    onChange={(e) => setInverterMaxVdc(e.target.value)}
                    placeholder="e.g., 1000"
                    unit="V"
                  />
                  <MobileInput
                    label="Min DC Voltage"
                    type="number"
                    value={inverterMinVdc}
                    onChange={(e) => setInverterMinVdc(e.target.value)}
                    placeholder="e.g., 200"
                    unit="V"
                  />
                  <MobileInput
                    label="Max DC Current"
                    type="number"
                    value={inverterMaxIdc}
                    onChange={(e) => setInverterMaxIdc(e.target.value)}
                    placeholder="e.g., 20"
                    unit="A"
                  />
                  <MobileInput
                    label="Nominal Power"
                    type="number"
                    value={inverterNominalPower}
                    onChange={(e) => setInverterNominalPower(e.target.value)}
                    placeholder="e.g., 8000"
                    unit="W"
                  />
                  <MobileInput
                    label="Efficiency"
                    type="number"
                    value={inverterEfficiency}
                    onChange={(e) => setInverterEfficiency(e.target.value)}
                    placeholder="e.g., 97"
                    unit="%"
                  />
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="system-losses">
              <MobileAccordionTrigger>System Losses & Cabling</MobileAccordionTrigger>
              <MobileAccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInput
                    label="DC Cable Loss"
                    type="number"
                    value={dcCableLoss}
                    onChange={(e) => setDcCableLoss(e.target.value)}
                    placeholder="e.g., 1.5"
                    unit="%"
                  />
                  <MobileInput
                    label="AC Cable Loss"
                    type="number"
                    value={acCableLoss}
                    onChange={(e) => setAcCableLoss(e.target.value)}
                    placeholder="e.g., 1"
                    unit="%"
                  />
                  <MobileInput
                    label="DC Cable Length"
                    type="number"
                    value={dcCableLength}
                    onChange={(e) => setDcCableLength(e.target.value)}
                    placeholder="e.g., 30"
                    unit="m"
                  />
                  <MobileInput
                    label="AC Cable Length"
                    type="number"
                    value={acCableLength}
                    onChange={(e) => setAcCableLength(e.target.value)}
                    placeholder="e.g., 50"
                    unit="m"
                  />
                  <MobileInput
                    label="System Voltage"
                    type="number"
                    value={systemVoltage}
                    onChange={(e) => setSystemVoltage(e.target.value)}
                    placeholder="e.g., 230"
                    unit="V"
                  />
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <MobileButton onClick={calculatePVSystem} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate System
          </MobileButton>
          <MobileButton onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </MobileButton>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* System Layout */}
            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Sun className="h-4 w-4" />
                System Layout & Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-elec-light">Array Configuration:</p>
                  <p>Panels per row: <span className="text-elec-yellow font-medium">{result.panelsPerRow}</span></p>
                  <p>Number of rows: <span className="text-elec-yellow font-medium">{result.numberOfRows}</span></p>
                  <p>Total panels: <span className="text-elec-yellow font-medium">{result.totalPanels}</span></p>
                  <p>Total capacity: <span className="text-elec-yellow font-medium">{(result.totalWattage/1000).toFixed(1)} kWp</span></p>
                </div>
                <div>
                  <p className="text-elec-light">String Configuration:</p>
                  <p>Total strings: <span className="text-elec-yellow font-medium">{result.totalStrings}</span></p>
                  <p>Panels per string: <span className="text-elec-yellow font-medium">{result.panelsPerString}</span></p>
                  <p>String Voc (cold): <span className="text-elec-yellow font-medium">{result.stringVocCold.toFixed(0)} V</span></p>
                  <p>String Vmpp (hot): <span className="text-elec-yellow font-medium">{result.stringVmppHot.toFixed(0)} V</span></p>
                </div>
                <div>
                  <p className="text-elec-light">Annual Performance:</p>
                  <p>Yearly generation: <span className="text-elec-yellow font-medium">{result.yearlyGeneration.toFixed(0)} kWh</span></p>
                  <p>Performance ratio: <span className="text-elec-yellow font-medium">{(result.performanceRatio * 100).toFixed(1)}%</span></p>
                  <p>Area efficiency: <span className="text-elec-yellow font-medium">{result.areaEfficiency.toFixed(1)}%</span></p>
                  <p>Inverter sizing: <span className="text-elec-yellow font-medium">{result.inverterSizing.toFixed(0)}%</span></p>
                </div>
              </div>
            </div>

            {/* Compliance Checks */}
            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                BS 7671 Compliance Checks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {result.complianceChecks.stringVoltageOK ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                    <span>String voltage within inverter limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.complianceChecks.inverterSizingOK ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    }
                    <span>Inverter sizing (90-120% recommended)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.complianceChecks.voltageDropOK ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                    <span>Voltage drop within limits (3% DC, 2.5% AC)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {result.complianceChecks.isolationDistanceOK ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                    <span>Minimum isolation distances</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.complianceChecks.mcsSizingOK ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    }
                    <span>MCS sizing requirements</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-medium text-elec-yellow mb-2">Voltage Drop Analysis:</h4>
                <p className="text-sm">DC voltage drop: <span className="text-elec-yellow font-medium">{result.voltageDropDC.toFixed(2)}%</span></p>
                <p className="text-sm">AC voltage drop: <span className="text-elec-yellow font-medium">{result.voltageDropAC.toFixed(2)}%</span></p>
              </div>
            </div>

            {/* Professional Analysis */}
            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                System Analysis & Recommendations
              </h3>
              <div className="space-y-3 text-sm text-elec-light">
                <div>
                  <h4 className="font-medium text-elec-yellow">Performance Analysis:</h4>
                  <p>• Performance ratio of {(result.performanceRatio * 100).toFixed(1)}% is {result.performanceRatio > 0.8 ? 'excellent' : result.performanceRatio > 0.75 ? 'good' : 'below average'} for UK installations</p>
                  <p>• Annual yield of {(result.yearlyGeneration / result.totalWattage * 1000).toFixed(0)} kWh/kWp is {result.yearlyGeneration / result.totalWattage * 1000 > 900 ? 'above average' : 'typical'} for the selected location</p>
                  <p>• Area utilisation of {result.areaEfficiency.toFixed(1)}% optimises available space effectively</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-elec-yellow">Regulatory Compliance (BS 7671):</h4>
                  <p>• DC isolation: Ensure minimum 6mm air gap and 4mm creepage for safety disconnection</p>
                  <p>• Earth fault protection: Install residual current monitoring device (RCMD) for enhanced safety</p>
                  <p>• Surge protection: Type 2 SPDs required at DC and AC sides as per Section 534</p>
                  <p>• Cable sizing: Verify current-carrying capacity with installation method and ambient temperature</p>
                </div>

                <div>
                  <h4 className="font-medium text-elec-yellow">Installation Considerations:</h4>
                  <p>• String configuration allows for future expansion with additional MPPT inputs</p>
                  <p>• Consider MC4 connector specifications for outdoor weatherproofing (IP67 minimum)</p>
                  <p>• Fire safety: Maintain 1m setback from roof edges and 3m between arrays on large installations</p>
                  <p>• Bird/vermin guards recommended for roof-mounted installations</p>
                </div>

                {!result.complianceChecks.voltageDropOK && (
                  <div className="p-3 bg-red-900/20 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-400">Action Required:</h4>
                    <p className="text-red-300">Voltage drop exceeds regulatory limits. Consider:</p>
                    <p>• Larger cable cross-sectional area (6mm² DC, 10mm² AC minimum)</p>
                    <p>• Shorter cable runs or intermediate junction boxes</p>
                    <p>• Higher DC operating voltage with series string configuration</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Assumptions */}
        <MobileAccordion type="single" collapsible>
          <MobileAccordionItem value="assumptions">
            <MobileAccordionTrigger>Calculation Assumptions</MobileAccordionTrigger>
            <MobileAccordionContent className="space-y-2 text-sm text-elec-light">
              <p>• Panel spacing includes 0.5m minimum for maintenance access</p>
              <p>• Row spacing calculated to prevent shading at winter solstice</p>
              <p>• Cold temperature: -10°C, Hot cell temperature: 70°C</p>
              <p>• Standard Test Conditions (STC): 1000 W/m², 25°C, AM 1.5</p>
              <p>• DC cable: 4mm² copper, AC cable: 6mm² copper (adjustable in advanced mode)</p>
              <p>• System grounding and earthing as per BS 7671 requirements</p>
              <p>• Annual degradation not included (typically 0.5-0.8% per year)</p>
              <p>• Irradiance data based on UK regional averages</p>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </CardContent>
    </Card>
  );
};

export default SolarArrayCalculator;