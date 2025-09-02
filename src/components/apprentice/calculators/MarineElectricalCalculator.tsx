import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/ui/result-card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Calculator, RotateCcw, Anchor, Battery, Zap, Cable, Ship, Settings, Clock, Home } from "lucide-react";
import { calculateMarine, MarineInputs, MarineResults, vesselTypeOptions, batteryTypeOptions, systemVoltageOptions } from "@/lib/marine";
import MarineGuidance from "./marine/MarineGuidance";
import WhyThisMatters from "@/components/common/WhyThisMatters";

const MarineElectricalCalculator = () => {
  // Vessel details
  const [vesselType, setVesselType] = useState("yacht");
  const [vesselLength, setVesselLength] = useState("");
  const [systemVoltage, setSystemVoltage] = useState(12);
  
  // Load inputs
  const [navigationLights, setNavigationLights] = useState("");
  const [cabinLights, setCabinLights] = useState("");
  const [galleyLoad, setGalleyLoad] = useState("");
  const [freshWaterPump, setFreshWaterPump] = useState("");
  const [bilgePump, setBilgePump] = useState("");
  const [ventilationFans, setVentilationFans] = useState("");
  const [electronics, setElectronics] = useState("");
  const [winch, setWinch] = useState("");
  const [additionalLoad, setAdditionalLoad] = useState("");
  
  // Usage patterns
  const [dailyUsageHours, setDailyUsageHours] = useState("12");
  const [motoring, setMotoring] = useState("30");
  const [anchored, setAnchored] = useState("70");
  
  // Battery specifications
  const [batteryType, setBatteryType] = useState("agm");
  const [batteryVoltage, setBatteryVoltage] = useState("12");
  const [maxDischarge, setMaxDischarge] = useState("80");
  
  // Charging systems
  const [alternatorRating, setAlternatorRating] = useState("");
  const [solarPanels, setSolarPanels] = useState("");
  const [windGenerator, setWindGenerator] = useState("");
  const [shoreCharger, setShoreCharger] = useState("");
  
  // Cabling & environment
  const [cableLength, setCableLength] = useState("5");
  const [voltageDropLimit, setVoltageDropLimit] = useState("3");
  const [temperature, setTemperature] = useState("15");
  const [saltwaterExposure, setSaltwaterExposure] = useState(true);
  
  const [results, setResults] = useState<MarineResults | null>(null);

  // Quick preset scenarios
  const quickPresets = [
    {
      name: "Small Sailing Yacht",
      description: "25ft sailing yacht with basic systems",
      values: {
        vesselLength: "7.6", navigationLights: "15", cabinLights: "60", galleyLoad: "120",
        freshWaterPump: "50", bilgePump: "30", electronics: "80", alternatorRating: "60",
        solarPanels: "100", dailyUsageHours: "10"
      }
    },
    {
      name: "Motor Cruiser",
      description: "35ft motor cruiser with full equipment",
      values: {
        vesselLength: "10.7", navigationLights: "25", cabinLights: "120", galleyLoad: "200",
        freshWaterPump: "80", bilgePump: "50", electronics: "150", winch: "800",
        alternatorRating: "120", solarPanels: "200", dailyUsageHours: "14"
      }
    },
    {
      name: "Offshore Fishing",
      description: "Commercial fishing vessel setup",
      values: {
        vesselType: "fishing", vesselLength: "12", navigationLights: "40", electronics: "300",
        winch: "1200", alternatorRating: "200", batteryType: "lithium", systemVoltage: "24"
      }
    }
  ];

  const applyPreset = (preset: any) => {
    Object.entries(preset.values).forEach(([key, value]) => {
      switch (key) {
        case "vesselType": setVesselType(value as string); break;
        case "vesselLength": setVesselLength(value as string); break;
        case "navigationLights": setNavigationLights(value as string); break;
        case "cabinLights": setCabinLights(value as string); break;
        case "galleyLoad": setGalleyLoad(value as string); break;
        case "freshWaterPump": setFreshWaterPump(value as string); break;
        case "bilgePump": setBilgePump(value as string); break;
        case "electronics": setElectronics(value as string); break;
        case "winch": setWinch(value as string); break;
        case "alternatorRating": setAlternatorRating(value as string); break;
        case "solarPanels": setSolarPanels(value as string); break;
        case "dailyUsageHours": setDailyUsageHours(value as string); break;
        case "batteryType": setBatteryType(value as string); break;
        case "systemVoltage": setSystemVoltage(Number(value)); break;
      }
    });
  };

  const calculateMarineElectrical = () => {
    const length = parseFloat(vesselLength);
    if (!length) return;

    const inputs: MarineInputs = {
      vesselType,
      vesselLength: length,
      systemVoltage,
      navigationLights: parseFloat(navigationLights) || 0,
      cabinLights: parseFloat(cabinLights) || 0,
      galleyLoad: parseFloat(galleyLoad) || 0,
      freshWaterPump: parseFloat(freshWaterPump) || 0,
      bilgePump: parseFloat(bilgePump) || 0,
      ventilationFans: parseFloat(ventilationFans) || 0,
      electronics: parseFloat(electronics) || 0,
      winch: parseFloat(winch) || 0,
      additionalLoad: parseFloat(additionalLoad) || 0,
      dailyUsageHours: parseFloat(dailyUsageHours) || 12,
      motoring: parseFloat(motoring) || 30,
      anchored: parseFloat(anchored) || 70,
      batteryType,
      batteryVoltage: parseFloat(batteryVoltage) || systemVoltage,
      maxDischarge: parseFloat(maxDischarge) || 80,
      alternatorRating: parseFloat(alternatorRating) || 0,
      solarPanels: parseFloat(solarPanels) || 0,
      windGenerator: parseFloat(windGenerator) || 0,
      shoreCharger: parseFloat(shoreCharger) || 0,
      cableLength: parseFloat(cableLength) || 5,
      voltageDropLimit: parseFloat(voltageDropLimit) || 3,
      temperature: parseFloat(temperature) || 15,
      saltwaterExposure
    };

    const calculationResults = calculateMarine(inputs);
    setResults(calculationResults);
  };

  const reset = () => {
    setVesselType("yacht");
    setVesselLength("");
    setSystemVoltage(12);
    setNavigationLights("");
    setCabinLights("");
    setGalleyLoad("");
    setFreshWaterPump("");
    setBilgePump("");
    setVentilationFans("");
    setElectronics("");
    setWinch("");
    setAdditionalLoad("");
    setDailyUsageHours("12");
    setMotoring("30");
    setAnchored("70");
    setBatteryType("agm");
    setBatteryVoltage("12");
    setMaxDischarge("80");
    setAlternatorRating("");
    setSolarPanels("");
    setWindGenerator("");
    setShoreCharger("");
    setCableLength("5");
    setVoltageDropLimit("3");
    setTemperature("15");
    setSaltwaterExposure(true);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5 text-elec-yellow" />
            Marine Electrical Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Presets */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              Quick Setup Presets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickPresets.map((preset, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:border-elec-yellow/40 transition-colors p-3 bg-elec-card"
                  onClick={() => applyPreset(preset)}
                >
                  <h4 className="font-medium text-sm text-elec-yellow">{preset.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{preset.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Vessel Details */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Ship className="h-4 w-4 text-elec-yellow" />
              Vessel Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileSelect value={vesselType} onValueChange={setVesselType}>
                <MobileSelectTrigger label="Vessel Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {vesselTypeOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileInput
                label="Vessel Length"
                type="number"
                value={vesselLength}
                onChange={(e) => setVesselLength(e.target.value)}
                placeholder="e.g., 12"
                unit="m"
              />
              <MobileSelect value={systemVoltage.toString()} onValueChange={(value) => setSystemVoltage(Number(value))}>
                <MobileSelectTrigger label="System Voltage">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {systemVoltageOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>

          {/* Electrical Loads */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Electrical Loads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileInput
                label="Navigation Lights"
                type="number"
                value={navigationLights}
                onChange={(e) => setNavigationLights(e.target.value)}
                placeholder="e.g., 25"
                unit="W"
              />
              <MobileInput
                label="Cabin Lighting"
                type="number"
                value={cabinLights}
                onChange={(e) => setCabinLights(e.target.value)}
                placeholder="e.g., 120"
                unit="W"
              />
              <MobileInput
                label="Galley Equipment"
                type="number"
                value={galleyLoad}
                onChange={(e) => setGalleyLoad(e.target.value)}
                placeholder="e.g., 200"
                unit="W"
              />
              <MobileInput
                label="Fresh Water Pump"
                type="number"
                value={freshWaterPump}
                onChange={(e) => setFreshWaterPump(e.target.value)}
                placeholder="e.g., 80"
                unit="W"
              />
              <MobileInput
                label="Bilge Pump"
                type="number"
                value={bilgePump}
                onChange={(e) => setBilgePump(e.target.value)}
                placeholder="e.g., 50"
                unit="W"
              />
              <MobileInput
                label="Ventilation Fans"
                type="number"
                value={ventilationFans}
                onChange={(e) => setVentilationFans(e.target.value)}
                placeholder="e.g., 30"
                unit="W"
              />
              <MobileInput
                label="Electronics"
                type="number"
                value={electronics}
                onChange={(e) => setElectronics(e.target.value)}
                placeholder="e.g., 150"
                unit="W"
              />
              <MobileInput
                label="Winch/Windlass"
                type="number"
                value={winch}
                onChange={(e) => setWinch(e.target.value)}
                placeholder="e.g., 800"
                unit="W"
              />
              <MobileInput
                label="Additional Load"
                type="number"
                value={additionalLoad}
                onChange={(e) => setAdditionalLoad(e.target.value)}
                placeholder="e.g., 100"
                unit="W"
              />
            </div>
          </div>

          {/* Usage Profile */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Usage Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileInput
                label="Daily Usage Hours"
                type="number"
                value={dailyUsageHours}
                onChange={(e) => setDailyUsageHours(e.target.value)}
                placeholder="e.g., 12"
                unit="hours"
              />
              <MobileInput
                label="Motoring Time"
                type="number"
                value={motoring}
                onChange={(e) => setMotoring(e.target.value)}
                placeholder="e.g., 30"
                unit="%"
              />
              <MobileInput
                label="Anchored Time"
                type="number"
                value={anchored}
                onChange={(e) => setAnchored(e.target.value)}
                placeholder="e.g., 70"
                unit="%"
              />
            </div>
          </div>

          {/* Battery System */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Battery className="h-4 w-4 text-elec-yellow" />
              Battery System
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileSelect value={batteryType} onValueChange={setBatteryType}>
                <MobileSelectTrigger label="Battery Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {batteryTypeOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileInput
                label="Battery Voltage"
                type="number"
                value={batteryVoltage}
                onChange={(e) => setBatteryVoltage(e.target.value)}
                placeholder="e.g., 12"
                unit="V"
              />
              <MobileInput
                label="Max Discharge"
                type="number"
                value={maxDischarge}
                onChange={(e) => setMaxDischarge(e.target.value)}
                placeholder="e.g., 80"
                unit="%"
              />
            </div>
          </div>

          {/* Charging Systems */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Charging Systems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MobileInput
                label="Alternator"
                type="number"
                value={alternatorRating}
                onChange={(e) => setAlternatorRating(e.target.value)}
                placeholder="e.g., 120"
                unit="W"
              />
              <MobileInput
                label="Solar Panels"
                type="number"
                value={solarPanels}
                onChange={(e) => setSolarPanels(e.target.value)}
                placeholder="e.g., 200"
                unit="W"
              />
              <MobileInput
                label="Wind Generator"
                type="number"
                value={windGenerator}
                onChange={(e) => setWindGenerator(e.target.value)}
                placeholder="e.g., 100"
                unit="W"
              />
              <MobileInput
                label="Shore Charger"
                type="number"
                value={shoreCharger}
                onChange={(e) => setShoreCharger(e.target.value)}
                placeholder="e.g., 80"
                unit="W"
              />
            </div>
          </div>

          {/* Cable & Environment */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Cable className="h-4 w-4 text-elec-yellow" />
              Cabling & Environment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MobileInput
                label="Cable Length"
                type="number"
                value={cableLength}
                onChange={(e) => setCableLength(e.target.value)}
                placeholder="e.g., 5"
                unit="m"
              />
              <MobileInput
                label="Voltage Drop Limit"
                type="number"
                value={voltageDropLimit}
                onChange={(e) => setVoltageDropLimit(e.target.value)}
                placeholder="e.g., 3"
                unit="%"
              />
              <MobileInput
                label="Temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="e.g., 15"
                unit="°C"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saltwater"
                  checked={saltwaterExposure}
                  onChange={(e) => setSaltwaterExposure(e.target.checked)}
                  className="rounded border-elec-yellow/20"
                />
                <label htmlFor="saltwater" className="text-sm">Saltwater Exposure</label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <MobileButton onClick={calculateMarineElectrical} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Marine System
            </MobileButton>
            <MobileButton onClick={reset} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Main Results in elec-gray background */}
          <Card className="bg-elec-gray border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Marine System Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultCard
                  title="Total Continuous Load"
                  value={results.totalContinuousLoad}
                  unit="W"
                  subtitle="Always-on equipment"
                  status="info"
                  icon={<Zap className="h-5 w-5" />}
                />
                <ResultCard
                  title="Peak Load"
                  value={results.peakLoad}
                  unit="W"
                  subtitle="Maximum system demand"
                  status="info"
                  icon={<Zap className="h-5 w-5" />}
                />
                <ResultCard
                  title="Daily Energy Consumption"
                  value={Math.round(results.dailyEnergyConsumption)}
                  unit="Ah"
                  subtitle="Per 24-hour period"
                  status="info"
                  icon={<Battery className="h-5 w-5" />}
                />
                <ResultCard
                  title="Battery Bank Required"
                  value={results.recommendedBatteryCapacity}
                  unit="Ah"
                  subtitle={`${results.numberOfBatteries} x 100Ah batteries`}
                  status={results.energyBalance > 0 ? "success" : "warning"}
                  icon={<Battery className="h-5 w-5" />}
                />
                <ResultCard
                  title="Inverter Size"
                  value={results.recommendedInverterSize}
                  unit="W"
                  subtitle={results.inverterType}
                  status="info"
                  icon={<Zap className="h-5 w-5" />}
                />
                <ResultCard
                  title="Cable Size"
                  value={results.recommendedCableSize}
                  unit="mm²"
                  subtitle={`${results.actualVoltageDropPercentage.toFixed(1)}% voltage drop`}
                  status={results.actualVoltageDropPercentage <= 3 ? "success" : "warning"}
                  icon={<Cable className="h-5 w-5" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Why This Matters */}
          <WhyThisMatters
            title="Why Marine Electrical Systems Matter"
            points={[
              "Vessel safety depends on reliable electrical systems for navigation, communication, and safety equipment",
              "Proper load calculation prevents battery failure and equipment damage in marine environments",
              "Compliance with marine standards (ISO 13297, MCA regulations) is legally required for UK waters",
              "Adequate charging capacity ensures vessel autonomy during extended cruising or emergencies",
              "Correct cable sizing prevents dangerous voltage drops and potential fire hazards at sea"
            ]}
          />

          {/* Detailed Guidance */}
          <MarineGuidance results={results} inputs={{
            vesselType,
            vesselLength: parseFloat(vesselLength) || 0,
            systemVoltage,
            navigationLights: parseFloat(navigationLights) || 0,
            cabinLights: parseFloat(cabinLights) || 0,
            galleyLoad: parseFloat(galleyLoad) || 0,
            freshWaterPump: parseFloat(freshWaterPump) || 0,
            bilgePump: parseFloat(bilgePump) || 0,
            ventilationFans: parseFloat(ventilationFans) || 0,
            electronics: parseFloat(electronics) || 0,
            winch: parseFloat(winch) || 0,
            additionalLoad: parseFloat(additionalLoad) || 0,
            dailyUsageHours: parseFloat(dailyUsageHours) || 12,
            motoring: parseFloat(motoring) || 30,
            anchored: parseFloat(anchored) || 70,
            batteryType,
            batteryVoltage: parseFloat(batteryVoltage) || systemVoltage,
            maxDischarge: parseFloat(maxDischarge) || 80,
            alternatorRating: parseFloat(alternatorRating) || 0,
            solarPanels: parseFloat(solarPanels) || 0,
            windGenerator: parseFloat(windGenerator) || 0,
            shoreCharger: parseFloat(shoreCharger) || 0,
            cableLength: parseFloat(cableLength) || 5,
            voltageDropLimit: parseFloat(voltageDropLimit) || 3,
            temperature: parseFloat(temperature) || 15,
            saltwaterExposure
          }} />
        </div>
      )}
    </div>
  );
};

export default MarineElectricalCalculator;