import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Calculator, RotateCcw, Shield, Info, Lightbulb, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RequiredFieldTooltip } from "@/components/ui/required-field-tooltip";
import { Slider } from "@/components/ui/slider";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { 
  calculateArcFlash, 
  getEquipmentDefaults, 
  EQUIPMENT_TYPE_LABELS, 
  ELECTRODE_CONFIG_LABELS,
  type EquipmentType,
  type ElectrodeConfig,
  type EnclosureType,
  type ArcFlashResult 
} from "@/lib/arcflash";

// Voltage options for UK electrical systems (IEEE 1584 compliant: 208-15000V)
const voltageOptions = [
  { value: "230", label: "230V", description: "Single phase domestic/commercial" },
  { value: "400", label: "400V", description: "3-phase standard (new)" },
  { value: "415", label: "415V", description: "3-phase standard (legacy)" },
  { value: "690", label: "690V", description: "3-phase industrial" },
  { value: "1000", label: "1000V", description: "LV maximum" },
  { value: "3300", label: "3.3kV", description: "HV distribution" },
  { value: "6600", label: "6.6kV", description: "HV distribution" },
  { value: "11000", label: "11kV", description: "HV primary (IEEE 1584 max)" }
];

const ArcFlashCalculator = () => {
  const [voltage, setVoltage] = useState<string>("415");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [clearingTime, setClearingTime] = useState<string>("");
  const [workingDistance, setWorkingDistance] = useState<string>("450");
  const [equipmentType, setEquipmentType] = useState<EquipmentType>("panelboard");
  const [electrodeConfig, setElectrodeConfig] = useState<ElectrodeConfig>("VCB");
  const [enclosureType, setEnclosureType] = useState<EnclosureType>("box");
  const [conductorGap, setConductorGap] = useState<string>("");
  const [useAutoGap, setUseAutoGap] = useState<boolean>(true);
  const [result, setResult] = useState<ArcFlashResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatIfDistance, setWhatIfDistance] = useState<number>(450);
  const [whatIfTime, setWhatIfTime] = useState<number>(0.1);

  // Equipment type change handler
  useEffect(() => {
    const defaults = getEquipmentDefaults(equipmentType);
    setWorkingDistance(defaults.workingDistance.toString());
    setEnclosureType(defaults.enclosureType);
    setElectrodeConfig(defaults.defaultConfig);
  }, [equipmentType]);

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    const V = parseFloat(voltage);
    const I = parseFloat(faultCurrent);
    const t = parseFloat(clearingTime);
    const D = parseFloat(workingDistance);
    
    if (!V || V <= 0) newErrors.voltage = "Voltage must be positive";
    if (V < 208 || V > 15000) newErrors.voltage = "Voltage outside IEEE 1584 range (208-15000V)";
    
    if (!I || I <= 0) newErrors.faultCurrent = "Fault current must be positive";
    if (I < 700 || I > 106000) newErrors.faultCurrent = "Fault current outside typical range (700-106000A)";
    
    if (!t || t <= 0) newErrors.clearingTime = "Clearing time must be positive";
    if (t > 2.0) newErrors.clearingTime = "Clearing time >2s indicates sustained arc risk";
    
    if (!D || D <= 0) newErrors.workingDistance = "Working distance must be positive";
    if (D < 200) newErrors.workingDistance = "Working distance below 200mm not recommended";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const performCalculation = () => {
    if (!validateInputs()) return;
    
    const inputs = {
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: parseFloat(clearingTime),
      workingDistance: parseFloat(workingDistance),
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap)
    };
    
    const calcResult = calculateArcFlash(inputs);
    setResult(calcResult);
    setWhatIfDistance(parseFloat(workingDistance));
    setWhatIfTime(parseFloat(clearingTime));
  };

  const calculateWhatIf = (newDistance?: number, newTime?: number) => {
    if (!result) return null;
    
    const inputs = {
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: newTime ?? whatIfTime,
      workingDistance: newDistance ?? whatIfDistance,
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap)
    };
    
    return calculateArcFlash(inputs);
  };

  const getMostImpactfulLever = () => {
    if (!result) return "";
    
    const baseEnergy = result.incidentEnergy;
    const timeReduced = calculateWhatIf(undefined, whatIfTime * 0.5);
    const distanceIncreased = calculateWhatIf(whatIfDistance * 1.5, undefined);
    
    if (!timeReduced || !distanceIncreased) return "";
    
    const timeReduction = ((baseEnergy - timeReduced.incidentEnergy) / baseEnergy) * 100;
    const distanceReduction = ((baseEnergy - distanceIncreased.incidentEnergy) / baseEnergy) * 100;
    
    return timeReduction > distanceReduction 
      ? `Reducing clearing time by 50% would decrease energy by ${timeReduction.toFixed(0)}%`
      : `Increasing working distance by 50% would decrease energy by ${distanceReduction.toFixed(0)}%`;
  };

  const reset = () => {
    setVoltage("415");
    setFaultCurrent("");
    setClearingTime("");
    setWorkingDistance("450");
    setEquipmentType("panelboard");
    setElectrodeConfig("VCB");
    setEnclosureType("box");
    setConductorGap("");
    setUseAutoGap(true);
    setResult(null);
    setErrors({});
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Arc Flash Energy Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate arc flash incident energy and determine minimum arc rating requirements according to IEEE 1584-2018 and BS 7671 18th Edition.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">System Voltage (V)</span>
                  <RequiredFieldTooltip content="System line-to-line voltage. IEEE 1584 valid range: 208-15000V. Common UK values: 415V (3-phase), 230V (single-phase)." />
                </div>
                <MobileSelect
                  label=""
                  placeholder="Select voltage"
                  value={voltage}
                  onValueChange={setVoltage}
                  options={voltageOptions}
                  error={errors.voltage}
                />
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Equipment Type</span>
                <MobileSelect
                  label=""
                  placeholder="Select equipment"
                  value={equipmentType}
                  onValueChange={(value) => setEquipmentType(value as EquipmentType)}
                  options={Object.entries(EQUIPMENT_TYPE_LABELS).map(([key, label]) => ({
                    value: key,
                    label
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Prospective Fault Current (A)</span>
                <RequiredFieldTooltip content="Available short-circuit current at the point of work. Obtain from electrical drawings or fault studies. Typical range: 1-100kA." />
              </div>
              <MobileInput
                label=""
                type="number"
                value={faultCurrent}
                onChange={(e) => setFaultCurrent(e.target.value)}
                placeholder="25000"
                unit="A"
                error={errors.faultCurrent}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Arc Clearing Time (s)</span>
                  <RequiredFieldTooltip content="Time for protective device to clear the arc fault. Check device time-current curves. Values >2s indicate sustained arc risk." />
                </div>
                <MobileInput
                  label=""
                  type="number"
                  step="0.01"
                  value={clearingTime}
                  onChange={(e) => setClearingTime(e.target.value)}
                  placeholder="0.1"
                  unit="s"
                  error={errors.clearingTime}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Working Distance (mm)</span>
                  <RequiredFieldTooltip content="Distance from worker's face/chest to potential arc source. Minimum 200mm recommended. Equipment defaults applied automatically." />
                </div>
                <MobileInput
                  label=""
                  type="number"
                  value={workingDistance}
                  onChange={(e) => setWorkingDistance(e.target.value)}
                  placeholder="450"
                  unit="mm"
                  error={errors.workingDistance}
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Electrode Configuration</span>
              <MobileSelect
                label=""
                placeholder="Select configuration"
                value={electrodeConfig}
                onValueChange={(value) => setElectrodeConfig(value as ElectrodeConfig)}
                options={Object.entries(ELECTRODE_CONFIG_LABELS).map(([key, label]) => ({
                  value: key,
                  label
                }))}
              />
            </div>

            <div className="bg-elec-dark/30 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conductor Gap</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Auto</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAutoGap}
                      onChange={(e) => setUseAutoGap(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-elec-yellow"></div>
                  </label>
                </div>
              </div>
              
              {!useAutoGap && (
                <MobileInput
                  label="Conductor Gap (mm)"
                  type="number"
                  value={conductorGap}
                  onChange={(e) => setConductorGap(e.target.value)}
                  placeholder="25"
                  unit="mm"
                />
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <MobileButton 
                onClick={performCalculation} 
                variant="elec"
                size="wide"
                className="w-full"
                disabled={Object.keys(errors).length > 0}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Arc Flash
              </MobileButton>
              <MobileButton 
                onClick={reset} 
                variant="outline" 
                size="default"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-lg bg-elec-dark p-4 sm:p-6 min-h-[400px]">
              {result ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-elec-yellow mb-2">Arc Flash Analysis</h3>
                      <div className="flex flex-col gap-2 mb-4">
                        <Badge 
                          variant={result.incidentEnergy <= 8 ? "default" : result.incidentEnergy <= 25 ? "secondary" : "destructive"}
                          className="mx-auto"
                        >
                          {result.isUnrealistic ? "Dangerous Energy Level" : `Min Arc Rating: ${result.minArcRatingRequired} cal/cm²`}
                        </Badge>
                        {result.isUnrealistic && (
                          <Badge variant="destructive" className="mx-auto text-xs">
                            ⚠ Exceeds practical PPE limits
                          </Badge>
                        )}
                      </div>
                      
                      {result.warnings.length > 0 && (
                        <div className="text-xs text-orange-400 mb-2">
                          {result.warnings.map((warning, i) => (
                            <div key={i}>⚠ {warning}</div>
                          ))}
                        </div>
                      )}
                      
                      {result.advisoryMessages.length > 0 && (
                        <div className="text-xs text-blue-400 mb-2">
                          {result.advisoryMessages.map((message, i) => (
                            <div key={i}>💡 {message}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  
                  <Separator />
                  
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-center sm:text-left">
                        <span className="text-muted-foreground block mb-1">Incident Energy:</span>
                        <div className="font-mono text-elec-yellow text-xl sm:text-2xl font-bold">
                          {result.incidentEnergy.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          cal/cm² ({result.incidentEnergyJoules.toFixed(1)} J/cm²)
                        </div>
                      </div>
                      
                      <div className="text-center sm:text-left">
                        <span className="text-muted-foreground block mb-1">Arc Flash Boundary:</span>
                        <div className="font-mono text-elec-yellow text-xl sm:text-2xl font-bold">
                          {Math.round(result.arcFlashBoundary)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          mm ({(result.arcFlashBoundary/1000).toFixed(2)} m)
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="text-center sm:text-left">
                        <span className="text-muted-foreground block mb-1">Arcing Current:</span>
                        <div className="font-mono text-elec-yellow text-lg font-semibold">
                          {result.arcingCurrent.toFixed(1)} kA
                        </div>
                      </div>

                      <div className="text-center sm:text-left">
                        <span className="text-muted-foreground block mb-1">Method:</span>
                        <div className="text-xs text-muted-foreground">
                          {result.calculationMethod}
                        </div>
                      </div>
                    </div>
                  </div>

                   <Separator />

                   <div>
                     <div className="flex items-center gap-2 mb-2">
                       <Shield className="h-4 w-4 text-blue-400" />
                       <span className="font-medium">PPE Requirements:</span>
                     </div>
                     {result.isUnrealistic ? (
                       <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                         <p className="text-sm text-red-300 mb-2">
                           ⚠ <strong>Energy level exceeds safe PPE limits</strong>
                         </p>
                         <p className="text-xs text-red-400">
                           Consider: De-energisation • Remote operation • Engineering controls
                         </p>
                       </div>
                     ) : (
                       <ul className="space-y-2 text-sm">
                         {result.ppeRecommendations.map((rec, index) => (
                           <li key={index} className="flex items-start gap-3">
                             <span className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                             <span className="text-muted-foreground">{rec}</span>
                           </li>
                         ))}
                       </ul>
                     )}
                     {result.incidentEnergy > 8 && !result.isUnrealistic && (
                       <div className="mt-2 text-xs text-yellow-400">
                         Note: PPE rating is thermal protection only. Blast pressure effects not included.
                       </div>
                     )}
                   </div>

                  {getMostImpactfulLever() && (
                    <>
                      <Separator />
                      <div className="bg-elec-yellow/10 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                          <span className="text-sm font-medium">Most Impactful Change:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {getMostImpactfulLever()}
                        </p>
                      </div>
                    </>
                  )}

                  {/* What-if Section */}
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-elec-yellow" />
                      What-if Analysis
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Working Distance:</span>
                          <span className="font-mono text-elec-yellow">{whatIfDistance}mm</span>
                        </div>
                        <Slider
                          value={[whatIfDistance]}
                          onValueChange={(value) => setWhatIfDistance(value[0])}
                          min={200}
                          max={1200}
                          step={50}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Clearing Time:</span>
                          <span className="font-mono text-elec-yellow">{whatIfTime.toFixed(2)}s</span>
                        </div>
                        <Slider
                          value={[whatIfTime]}
                          onValueChange={(value) => setWhatIfTime(value[0])}
                          min={0.02}
                          max={2.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                      
                      {(() => {
                        const whatIfResult = calculateWhatIf(whatIfDistance, whatIfTime);
                        return whatIfResult ? (
                          <div className="bg-elec-dark/50 p-3 rounded-lg border border-elec-yellow/20">
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground mb-1">What-if Energy:</div>
                              <div className="font-mono text-elec-yellow text-lg font-semibold">
                                {whatIfResult.incidentEnergy.toFixed(2)} cal/cm²
                              </div>
                              <div className="text-xs text-muted-foreground">
                                PPE Category {whatIfResult.ppeCategory}
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter system parameters to calculate arc flash energy
                </div>
              )}
            </div>

            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <AlertDescription className="text-red-200">
                <strong>Warning:</strong> This calculation is for estimation only. 
                Formal arc flash studies must be conducted by qualified engineers for safety compliance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        
        {/* Educational Content */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          <WhyThisMatters
            title="BS 7671 18th Edition Compliance"
            points={[
              "Arc flash assessment required for electrical work on live systems above 50V AC",
              "Energy calculations determine minimum PPE requirements and safe working procedures", 
              "Arc flash boundary calculated at 1.2 cal/cm² threshold per UK standards",
              "High energy readings (>40 cal/cm²) indicate potential calculation errors or extremely hazardous conditions",
              "Results should be reviewed by competent person and documented",
              "Consider de-energisation as primary control measure for high-energy situations"
            ]}
          />
          
          <InfoBox
            title="Regulations & Standards"
            icon={<Info className="h-5 w-5 text-elec-yellow" />}
            as="section"
          >
            <div className="space-y-4 text-sm text-elec-light">
              <div className="space-y-2">
                <div><strong className="text-elec-yellow">IEEE 1584-2018:</strong> International standard for arc flash calculations providing empirical models for incident energy and arc flash boundary determination.</div>
                <div><strong className="text-elec-yellow">NFPA 70E:</strong> PPE categories and safety requirements for electrical work (US standard, often referenced in UK).</div>
                <div><strong className="text-elec-yellow">UK EAWR 1989:</strong> Electrical safety regulations requiring competent persons and appropriate precautions.</div>
                <div><strong className="text-elec-yellow">BS 7671 (18th Edition):</strong> UK wiring regulations requiring protective devices for fault clearing.</div>
              </div>
              <div className="border-t border-elec-yellow/20 pt-3">
                <p className="text-xs text-elec-light/70">
                  <strong>Important:</strong> This tool provides estimates only. Professional arc flash studies by qualified engineers are required for safety-critical applications and formal risk assessments.
                </p>
              </div>
            </div>
          </InfoBox>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArcFlashCalculator;