import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Separator } from "@/components/ui/separator";
import { Car, Calculator, RotateCcw, Plus, Trash2, Info, Zap } from "lucide-react";
import { ResultCard } from "@/components/ui/result-card";
import { useToast } from "@/hooks/use-toast";
import { calculateEVSELoad, type ChargingPoint, type CalculationInputs, type CalculationResult } from "@/lib/evse-calculations";
import { CHARGER_TYPES, EARTHING_SYSTEMS, DIVERSITY_FACTORS } from "@/lib/ev-constants";

const EVSELoadCalculator = () => {
  const { toast } = useToast();
  
  // Form state
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [supplyVoltage, setSupplyVoltage] = useState('415');
  const [earthingSystem, setEarthingSystem] = useState('tn-c-s');
  const [availableCapacity, setAvailableCapacity] = useState('100');
  const [cableLength, setCableLength] = useState('50');
  const [diversityScenario, setDiversityScenario] = useState('domestic_multiple');
  const [powerFactor, setPowerFactor] = useState('0.95');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const addChargingPoint = () => {
    const newPoint: ChargingPoint = {
      chargerType: '7kw-ac', // Fixed to match actual key
      quantity: 1
    };
    setChargingPoints([...chargingPoints, newPoint]);
  };

  const removeChargingPoint = (index: number) => {
    setChargingPoints(chargingPoints.filter((_, i) => i !== index));
  };

  const updateChargingPoint = (index: number, field: keyof ChargingPoint, value: string | number) => {
    const updatedPoints = [...chargingPoints];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    setChargingPoints(updatedPoints);
  };

  const handleCalculate = () => {
    if (chargingPoints.length === 0) {
      toast({
        title: "No Charging Points",
        description: "Please add at least one charging point before calculating.",
        variant: "destructive"
      });
      return;
    }

    const inputs: CalculationInputs = {
      chargingPoints,
      supplyVoltage: parseFloat(supplyVoltage),
      earthingSystem,
      availableCapacity: parseFloat(availableCapacity),
      cableLength: parseFloat(cableLength),
      diversityScenario,
      powerFactor: parseFloat(powerFactor)
    };
    
    try {
      const calculations = calculateEVSELoad(inputs);
      setResult(calculations);
      toast({
        title: "Calculation Complete",
        description: "EVSE load calculations have been completed successfully."
      });
    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "An error occurred during calculation.",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setChargingPoints([]);
    setSupplyVoltage('415');
    setEarthingSystem('tn-c-s');
    setAvailableCapacity('100');
    setCableLength('50');
    setDiversityScenario('domestic_multiple');
    setPowerFactor('0.95');
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-elec-yellow" />
          <CardTitle>EVSE Load Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate electrical load and infrastructure requirements for Electric Vehicle Supply Equipment installations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-6">
          {/* Charging Points Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow flex items-center gap-2">
              <Car className="h-5 w-5" />
              Charging Points
            </h3>
            
            <MobileButton 
              onClick={addChargingPoint}
              variant="elec"
              icon={<Plus className="h-4 w-4" />}
              className="w-full"
            >
              Add Charging Point
            </MobileButton>

            {chargingPoints.length > 0 && (
              <div className="space-y-3">
                {chargingPoints.map((point, index) => (
                  <div key={index} className="bg-elec-dark/50 p-3 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Point {index + 1}</span>
                      <MobileButton
                        variant="elec-outline"
                        size="sm"
                        onClick={() => removeChargingPoint(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </MobileButton>
                    </div>
                    
                    <MobileSelect 
                      value={point.chargerType} 
                      onValueChange={(value) => updateChargingPoint(index, 'chargerType', value)}
                    >
                      <MobileSelectTrigger label="Charger Type">
                        <MobileSelectValue />
                      </MobileSelectTrigger>
                      <MobileSelectContent>
                        {Object.entries(CHARGER_TYPES).map(([key, charger]) => (
                          <MobileSelectItem key={key} value={key}>
                            {charger.label}
                          </MobileSelectItem>
                        ))}
                      </MobileSelectContent>
                    </MobileSelect>

                    <MobileInput
                      label="Quantity"
                      type="number"
                      min="1"
                      value={point.quantity.toString()}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty value temporarily while typing
                        if (value === '') {
                          updateChargingPoint(index, 'quantity', 1);
                          return;
                        }
                        const numValue = parseInt(value);
                        if (!isNaN(numValue) && numValue > 0) {
                          updateChargingPoint(index, 'quantity', numValue);
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value === '' || parseInt(value) < 1) {
                          updateChargingPoint(index, 'quantity', 1);
                          toast({
                            title: "Quantity Reset",
                            description: "Quantity must be at least 1, reset to 1",
                            variant: "default"
                          });
                        }
                      }}
                      placeholder="1"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Supply Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Supply & Installation Details
            </h3>
            
            <div className="space-y-3">
              <MobileInput
                label="Supply Voltage"
                type="number"
                value={supplyVoltage}
                onChange={(e) => setSupplyVoltage(e.target.value)}
                placeholder="415"
                unit="V"
              />

              <MobileInput
                label="Available Capacity"
                type="number"
                value={availableCapacity}
                onChange={(e) => setAvailableCapacity(e.target.value)}
                placeholder="100"
                unit="kW"
              />

              <MobileSelect value={earthingSystem} onValueChange={setEarthingSystem}>
                <MobileSelectTrigger label="Earthing System">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {Object.entries(EARTHING_SYSTEMS).map(([key, system]) => (
                    <MobileSelectItem key={key} value={key}>
                      {system.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>

              <div className="grid grid-cols-2 gap-3">
                <MobileInput
                  label="Cable Length"
                  type="number"
                  value={cableLength}
                  onChange={(e) => setCableLength(e.target.value)}
                  placeholder="50"
                  unit="m"
                />

                <MobileInput
                  label="Power Factor"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="1"
                  value={powerFactor}
                  onChange={(e) => setPowerFactor(e.target.value)}
                  placeholder="0.95"
                />
              </div>

              <MobileSelect value={diversityScenario} onValueChange={setDiversityScenario}>
                <MobileSelectTrigger label="Diversity Scenario">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {Object.entries(DIVERSITY_FACTORS).map(([key, factor]) => (
                    <MobileSelectItem key={key} value={key}>
                      {factor.label} ({(factor.value * 100).toFixed(0)}%)
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <MobileButton 
              onClick={handleCalculate}
              variant="elec"
              disabled={chargingPoints.length === 0}
              icon={<Calculator className="h-4 w-4" />}
              className="flex-1"
            >
              Calculate Load
            </MobileButton>
            <MobileButton variant="elec-outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultCard
                  title="Total Nominal Power"
                  value={result.totalNominalPower}
                  unit="kW"
                  subtitle="Connected load without diversity"
                />
                
                <ResultCard
                  title="Total Diversified Load"
                  value={result.totalDiversifiedLoad}
                  unit="kW"
                  subtitle="Load with diversity factor applied"
                />
                
                <ResultCard
                  title="Design Current"
                  value={result.designCurrent}
                  unit="A"
                  subtitle="Per phase current requirement"
                />
                
                <ResultCard
                  title="Cable Size"
                  value={result.selectedCable || "Not determined"}
                  subtitle="Minimum conductor size"
                />
                
                <ResultCard
                  title="Protection Device"
                  value={result.selectedProtection || "Not determined"}
                  subtitle="Required protection"
                />
                
                <ResultCard
                  title="Voltage Drop"
                  value={result.voltageDropPercent}
                  unit="%"
                  subtitle="At maximum load"
                  status={result.voltageDropPercent <= 5 ? "success" : "error"}
                />
                
                <ResultCard
                  title="Available Headroom"
                  value={result.headroom}
                  unit="A"
                  subtitle="Remaining capacity"
                  status={result.headroom > 0 ? "success" : "warning"}
                />
              </div>

              {/* Enhanced Feedback Section */}
              <div className="space-y-4">
                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-elec-yellow">Recommendations</h4>
                    <div className="bg-elec-dark/30 p-3 rounded-lg">
                      <ul className="space-y-1 text-sm">
                        {result.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Why This Matters */}
                <div className="space-y-2">
                  <h4 className="font-medium text-elec-yellow">Why This Matters</h4>
                  <div className="bg-elec-dark/30 p-3 rounded-lg text-sm space-y-2">
                    <p><strong>Design Current:</strong> Determines cable sizing and protection device rating. Too low = potential overload, too high = oversized installation.</p>
                    <p><strong>Voltage Drop:</strong> Must stay below 5% (BS 7671). Excessive drop causes inefficient charging and potential equipment damage.</p>
                    <p><strong>Diversity Factor:</strong> Accounts for realistic usage patterns. Multiple chargers rarely operate at full load simultaneously.</p>
                    {result.headroom < 10 && (
                      <p className="text-orange-400"><strong>Low Headroom Warning:</strong> Consider future expansion needs and load growth.</p>
                    )}
                  </div>
                </div>

                {/* Regulations & Guidance */}
                <div className="space-y-2">
                  <h4 className="font-medium text-elec-yellow">Regulations & Guidance</h4>
                  <div className="bg-elec-dark/30 p-3 rounded-lg text-sm space-y-2">
                    <p><strong>BS 7671 (18th Edition):</strong> Section 722 covers EV charging installations. RCD protection mandatory (30mA Type A minimum).</p>
                    <p><strong>IET Code of Practice:</strong> Provides specific guidance on EV supply equipment installation and earthing arrangements.</p>
                    <p><strong>Earthing System:</strong> {EARTHING_SYSTEMS[earthingSystem]?.description} - {EARTHING_SYSTEMS[earthingSystem]?.considerations}</p>
                    {result.compliance.voltageDrop === false && (
                      <p className="text-red-400"><strong>Voltage Drop Compliance:</strong> Exceeds 5% limit. Consider larger cable or reduced cable length.</p>
                    )}
                    {result.selectedProtection?.includes('DC') && (
                      <p className="text-blue-400"><strong>DC Protection:</strong> Required for installations &gt;32A. Consult manufacturer specifications.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && chargingPoints.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Add charging points to calculate EVSE load requirements</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EVSELoadCalculator;