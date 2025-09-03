import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, RotateCcw, Calculator, AlertTriangle, Zap, BookOpen, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";

interface CalculationResult {
  current: number;
  percentage: number;
  engineeringValue: number;
  tripPoints: { low: number; high: number };
  shuntVoltage?: number;
  supplyMargin?: number;
  cableDrop?: number;
  powerInShunt?: number;
  status: 'success' | 'warning' | 'error';
}

const InstrumentationCalculator = () => {
  // Core inputs
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [inputType, setInputType] = useState<"engineering" | "percentage">("percentage");
  const [inputValue, setInputValue] = useState("");
  const [targetCurrent, setTargetCurrent] = useState("");
  const [unit, setUnit] = useState("bar");
  
  // Loop analysis inputs (optional)
  const [supplyVoltage, setSupplyVoltage] = useState("24");
  const [shuntResistor, setShuntResistor] = useState("250");
  const [cableLength, setCableLength] = useState("");
  const [cableResistance, setCableResistance] = useState("0.1");
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!minScale) newErrors.minScale = "Minimum scale required";
    if (!maxScale) newErrors.maxScale = "Maximum scale required";
    
    if (minScale && maxScale) {
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (min >= max) newErrors.maxScale = "Maximum must be greater than minimum";
    }
    
    if (inputType === "engineering" && inputValue && minScale && maxScale) {
      const value = parseFloat(inputValue);
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (value < min || value > max) {
        newErrors.inputValue = `Value must be between ${min} and ${max} ${unit}`;
      }
    }
    
    if (inputType === "percentage" && inputValue) {
      const value = parseFloat(inputValue);
      if (value < 0 || value > 100) {
        newErrors.inputValue = "Percentage must be between 0-100%";
      }
    }
    
    if (targetCurrent) {
      const current = parseFloat(targetCurrent);
      if (current < 4 || current > 20) {
        newErrors.targetCurrent = "Current must be between 4-20 mA";
      }
    }
    
    if (supplyVoltage) {
      const voltage = parseFloat(supplyVoltage);
      if (voltage < 12 || voltage > 48) {
        newErrors.supplyVoltage = "Supply voltage typically 12-48V";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const result = useMemo((): CalculationResult | null => {
    if (!minScale || !maxScale) return null;
    
    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const span = max - min;
    
    let percentage: number;
    let engineeringValue: number;
    let current: number;
    
    if (inputValue) {
      const value = parseFloat(inputValue);
      
      if (inputType === "percentage") {
        percentage = value;
        engineeringValue = min + (span * value / 100);
        current = 4 + (16 * value / 100);
      } else {
        engineeringValue = value;
        percentage = ((value - min) / span) * 100;
        current = 4 + (16 * (value - min) / span);
      }
    } else if (targetCurrent) {
      current = parseFloat(targetCurrent);
      percentage = ((current - 4) / 16) * 100;
      engineeringValue = min + (span * (current - 4) / 16);
    } else {
      return null;
    }
    
    // Trip points
    const tripPoints = {
      low: 4 + (16 * 0.1), // 10% = 5.6mA
      high: 4 + (16 * 0.9) // 90% = 18.4mA
    };
    
    // Loop analysis calculations
    let shuntVoltage: number | undefined;
    let supplyMargin: number | undefined;
    let cableDrop: number | undefined;
    let powerInShunt: number | undefined;
    
    if (shuntResistor) {
      const shuntR = parseFloat(shuntResistor);
      shuntVoltage = (current / 1000) * shuntR; // mA to A, then V = IR
      powerInShunt = Math.pow(current / 1000, 2) * shuntR * 1000; // P = I²R in mW
    }
    
    if (supplyVoltage && shuntVoltage) {
      const supply = parseFloat(supplyVoltage);
      supplyMargin = supply - shuntVoltage;
      
      if (cableLength && cableResistance) {
        const length = parseFloat(cableLength);
        const resistance = parseFloat(cableResistance);
        cableDrop = (current / 1000) * (resistance * length * 2); // 2-wire
        supplyMargin -= cableDrop;
      }
    }
    
    // Determine status
    let status: 'success' | 'warning' | 'error' = 'success';
    if (current < 4 || current > 20) status = 'error';
    else if (current < 4.5 || current > 19.5) status = 'warning';
    else if (supplyMargin && supplyMargin < 5) status = 'warning';
    else if (supplyMargin && supplyMargin < 2) status = 'error';
    
    return {
      current,
      percentage,
      engineeringValue,
      tripPoints,
      shuntVoltage,
      supplyMargin,
      cableDrop,
      powerInShunt,
      status
    };
  }, [minScale, maxScale, inputValue, inputType, targetCurrent, supplyVoltage, shuntResistor, cableLength, cableResistance]);

  const reset = () => {
    setMinScale("");
    setMaxScale("");
    setInputValue("");
    setTargetCurrent("");
    setInputType("percentage");
    setUnit("bar");
    setSupplyVoltage("24");
    setShuntResistor("250");
    setCableLength("");
    setCableResistance("0.1");
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const formatNumber = (num: number | undefined, decimals = 2): string => {
    if (num === undefined) return "0";
    return num.toFixed(decimals);
  };

  const getWhatThisMeans = (): string[] => {
    if (!result) return [];
    
    const points = [
      `${formatNumber(result.current, 1)}mA represents ${formatNumber(result.percentage, 1)}% of your measurement range`,
      `This corresponds to ${formatNumber(result.engineeringValue, 2)} ${unit} on your instrument scale`
    ];
    
    if (result.shuntVoltage) {
      points.push(`The voltage across your shunt resistor will be ${formatNumber(result.shuntVoltage * 1000, 1)}mV`);
    }
    
    if (result.supplyMargin) {
      points.push(`Your loop has ${formatNumber(result.supplyMargin, 1)}V available for the transmitter`);
    }
    
    return points;
  };

  const getWhyThisMatters = (): string[] => [
    "4-20mA loops are industry standard for process control and safety systems",
    "Live zero (4mA) allows detection of broken wires vs. zero reading",
    "Current signals are immune to voltage drops over long cable runs",
    "Proper loop design ensures reliable operation and accurate measurements",
    "Understanding signal percentages helps with calibration and troubleshooting"
  ];

  const getGuidancePoints = (): string[] => {
    const points = [
      "BS 7671 requires proper earthing and isolation for instrumentation circuits",
      "Use screened cables for 4-20mA signals to prevent interference",
      "Maximum loop resistance typically 300-600Ω depending on transmitter",
      "Install surge protection devices for outdoor instrumentation"
    ];
    
    if (result?.status === 'warning' || result?.status === 'error') {
      points.unshift("⚠️ Check your calculations - values may be outside normal operating range");
    }
    
    return points;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          <CardTitle>4-20mA Instrumentation Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate current requirements or device trip points for 4-20mA instrumentation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6">
        {/* Core Inputs */}
        <div className="space-y-4">
          <MobileInputWrapper
            label="Min Scale"
            type="number"
            value={minScale}
            onChange={(value) => {
              setMinScale(value);
              clearError('minScale');
            }}
            placeholder="0"
            error={errors.minScale}
            step="any"
          />
          
          <MobileInputWrapper
            label="Max Scale"
            type="number"
            value={maxScale}
            onChange={(value) => {
              setMaxScale(value);
              clearError('maxScale');
            }}
            placeholder="100"
            error={errors.maxScale}
            step="any"
          />

          <MobileSelect value={unit} onValueChange={setUnit}>
            <MobileSelectTrigger label="Units">
              <MobileSelectValue placeholder="Select units" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="bar">bar (Pressure)</MobileSelectItem>
              <MobileSelectItem value="°C">°C (Temperature)</MobileSelectItem>
              <MobileSelectItem value="°F">°F (Temperature)</MobileSelectItem>
              <MobileSelectItem value="L/min">L/min (Flow)</MobileSelectItem>
              <MobileSelectItem value="m³/h">m³/h (Flow)</MobileSelectItem>
              <MobileSelectItem value="rpm">rpm (Speed)</MobileSelectItem>
              <MobileSelectItem value="pH">pH (Acidity)</MobileSelectItem>
              <MobileSelectItem value="%">% (Level/Humidity)</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          <MobileSelect value={inputType} onValueChange={(value) => setInputType(value as "engineering" | "percentage")}>
            <MobileSelectTrigger label="Input Type">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="percentage">Percentage</MobileSelectItem>
              <MobileSelectItem value="engineering">Engineering Units</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          <MobileInputWrapper
            label={inputType === "percentage" ? "Percentage" : `Value (${unit})`}
            type="number"
            value={inputValue}
            onChange={(value) => {
              setInputValue(value);
              clearError('inputValue');
            }}
            placeholder={inputType === "percentage" ? "0-100%" : "Enter value"}
            error={errors.inputValue}
            unit={inputType === "percentage" ? "%" : unit}
            step="any"
          />
          
          <MobileSelect value={targetCurrent} onValueChange={(value) => {
            if (value === "custom") {
              setTargetCurrent("");
            } else {
              setTargetCurrent(value);
            }
            clearError('targetCurrent');
          }}>
            <MobileSelectTrigger label="Or Target Current" error={errors.targetCurrent}>
              <MobileSelectValue placeholder="Select current (mA)" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="4">4.0 mA (0%)</MobileSelectItem>
              <MobileSelectItem value="6">6.0 mA (12.5%)</MobileSelectItem>
              <MobileSelectItem value="8">8.0 mA (25%)</MobileSelectItem>
              <MobileSelectItem value="10">10.0 mA (37.5%)</MobileSelectItem>
              <MobileSelectItem value="12">12.0 mA (50%)</MobileSelectItem>
              <MobileSelectItem value="14">14.0 mA (62.5%)</MobileSelectItem>
              <MobileSelectItem value="16">16.0 mA (75%)</MobileSelectItem>
              <MobileSelectItem value="18">18.0 mA (87.5%)</MobileSelectItem>
              <MobileSelectItem value="20">20.0 mA (100%)</MobileSelectItem>
              <MobileSelectItem value="custom">Custom...</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>
          
          {(targetCurrent === "" || targetCurrent === "custom") && (
            <MobileInputWrapper
              label="Custom Current"
              type="number"
              value={targetCurrent === "custom" ? "" : targetCurrent}
              onChange={(value) => {
                setTargetCurrent(value);
                clearError('targetCurrent');
              }}
              placeholder="4-20"
              error={errors.targetCurrent}
              unit="mA"
              min="4"
              max="20"
              step="0.1"
            />
          )}
        </div>

        {/* Loop Analysis Inputs (Optional) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap className="h-4 w-4 text-elec-yellow" />
            <span>Loop Analysis (Optional)</span>
          </div>
          
          <MobileSelect value={supplyVoltage} onValueChange={(value) => {
            if (value === "custom") {
              setSupplyVoltage("");
            } else {
              setSupplyVoltage(value);
            }
            clearError('supplyVoltage');
          }}>
            <MobileSelectTrigger label="Supply Voltage" error={errors.supplyVoltage}>
              <MobileSelectValue placeholder="Select voltage" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="12">12V DC</MobileSelectItem>
              <MobileSelectItem value="15">15V DC</MobileSelectItem>
              <MobileSelectItem value="18">18V DC</MobileSelectItem>
              <MobileSelectItem value="24">24V DC (Standard)</MobileSelectItem>
              <MobileSelectItem value="30">30V DC</MobileSelectItem>
              <MobileSelectItem value="36">36V DC</MobileSelectItem>
              <MobileSelectItem value="42">42V DC</MobileSelectItem>
              <MobileSelectItem value="48">48V DC</MobileSelectItem>
              <MobileSelectItem value="custom">Custom...</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>
          
          {(supplyVoltage === "" || supplyVoltage === "custom") && (
            <MobileInputWrapper
              label="Custom Voltage"
              type="number"
              value={supplyVoltage === "custom" ? "" : supplyVoltage}
              onChange={(value) => {
                setSupplyVoltage(value);
                clearError('supplyVoltage');
              }}
              placeholder="12-48"
              error={errors.supplyVoltage}
              unit="V"
              min="12"
              max="48"
              step="0.1"
            />
          )}
          
          <MobileSelect value={shuntResistor} onValueChange={(value) => {
            if (value === "custom") {
              setShuntResistor("");
            } else {
              setShuntResistor(value);
            }
            clearError('shuntResistor');
          }}>
            <MobileSelectTrigger label="Shunt Resistor">
              <MobileSelectValue placeholder="Select resistor" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="100">100Ω (2V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="125">125Ω (2.5V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="150">150Ω (3V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="200">200Ω (4V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="250">250Ω (5V @ 20mA) - Standard</MobileSelectItem>
              <MobileSelectItem value="300">300Ω (6V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="500">500Ω (10V @ 20mA)</MobileSelectItem>
              <MobileSelectItem value="custom">Custom...</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>
          
          {(shuntResistor === "" || shuntResistor === "custom") && (
            <MobileInputWrapper
              label="Custom Resistor"
              type="number"
              value={shuntResistor === "custom" ? "" : shuntResistor}
              onChange={(value) => {
                setShuntResistor(value);
                clearError('shuntResistor');
              }}
              placeholder="100-1000"
              unit="Ω"
              step="1"
            />
          )}

          <MobileInputWrapper
            label="Cable Length"
            type="number"
            value={cableLength}
            onChange={(value) => {
              setCableLength(value);
              clearError('cableLength');
            }}
            placeholder="Optional"
            unit="m"
            step="1"
          />
          
          <MobileInputWrapper
            label="Cable Resistance"
            type="number"
            value={cableResistance}
            onChange={(value) => {
              setCableResistance(value);
              clearError('cableResistance');
            }}
            placeholder="0.1"
            unit="Ω/m"
            step="0.01"
          />
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 pt-2">
          <MobileButton 
            variant="elec"
            disabled={!minScale || !maxScale || (!inputValue && !targetCurrent)}
            icon={<Calculator className="h-4 w-4" />}
            className="w-full h-12 text-base font-medium"
          >
            Calculate 4-20mA Values
          </MobileButton>
          <MobileButton 
            variant="elec-outline" 
            onClick={reset}
            className="w-full h-12 flex items-center justify-center gap-2 text-base"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="sm:hidden">Reset</span>
            <span className="hidden sm:inline">Reset Calculator</span>
          </MobileButton>
        </div>

        {/* Primary Results */}
        {result ? (
          <div className="space-y-4">
            {/* Main Results Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ResultCard
                title="Current Output"
                value={formatNumber(result.current, 1)}
                unit="mA"
                subtitle={`${formatNumber(result.percentage, 1)}% of scale`}
                status={result.status}
              />
              <ResultCard
                title="Engineering Value"
                value={formatNumber(result.engineeringValue, 2)}
                unit={unit}
                subtitle={`At ${formatNumber(result.current, 1)}mA`}
                status={result.status}
              />
            </div>

            {/* Trip Points */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ResultCard
                title="Low Trip Point"
                value={formatNumber(result.tripPoints.low, 1)}
                unit="mA"
                subtitle="10% of scale"
                status="success"
              />
              <ResultCard
                title="High Trip Point"
                value={formatNumber(result.tripPoints.high, 1)}
                unit="mA"
                subtitle="90% of scale"
                status="success"
              />
            </div>

            {/* Loop Analysis Results (if calculated) */}
            {(result.shuntVoltage || result.supplyMargin || result.cableDrop || result.powerInShunt) && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {result.shuntVoltage && (
                  <ResultCard
                    title="Shunt Voltage"
                    value={formatNumber(result.shuntVoltage * 1000, 1)}
                    unit="mV"
                    subtitle="Voltage drop across shunt"
                    status={result.shuntVoltage > 5 ? 'warning' : 'success'}
                  />
                )}
                {result.supplyMargin && (
                  <ResultCard
                    title="Supply Margin"
                    value={formatNumber(result.supplyMargin, 1)}
                    unit="V"
                    subtitle="Available for transmitter"
                    status={result.supplyMargin < 5 ? 'warning' : result.supplyMargin < 2 ? 'error' : 'success'}
                  />
                )}
                {result.cableDrop && (
                  <ResultCard
                    title="Cable Drop"
                    value={formatNumber(result.cableDrop, 2)}
                    unit="V"
                    subtitle={`Over ${cableLength}m cable`}
                    status={result.cableDrop > 2 ? 'warning' : 'success'}
                  />
                )}
                {result.powerInShunt && (
                  <ResultCard
                    title="Power in Shunt"
                    value={formatNumber(result.powerInShunt, 1)}
                    unit="mW"
                    subtitle="Power dissipated"
                    status={result.powerInShunt > 100 ? 'warning' : 'success'}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground min-h-[200px] text-center px-4">
            <div className="space-y-2">
              <Calculator className="h-8 w-8 mx-auto text-elec-yellow/50" />
              <p className="text-sm lg:text-base">Enter measurement range and value to calculate 4-20mA signals</p>
            </div>
          </div>
        )}

        {/* What This Means */}
        {result && getWhatThisMeans().length > 0 && (
          <InfoBox
            title="What this means"
            icon={<CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
            points={getWhatThisMeans()}
            className="border-elec-yellow/20 bg-elec-yellow/5"
          />
        )}

        {/* Why This Matters */}
        <WhyThisMatters points={getWhyThisMatters()} />

        {/* BS 7671 Guidance */}
        <InfoBox
          title="BS 7671 & Safety Guidance"
          icon={<BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
          points={getGuidancePoints()}
          className="border-elec-yellow/20 bg-elec-yellow/5"
        />

        {/* Status Warnings */}
        {result?.status === 'warning' && (
          <Alert className="border-orange-500/20 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-200">
              <strong>Warning:</strong> Check your values - some parameters may be outside typical operating ranges.
            </AlertDescription>
          </Alert>
        )}

        {result?.status === 'error' && (
          <Alert className="border-red-500/20 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              <strong>Error:</strong> Values are outside acceptable 4-20mA operating range. Please check your inputs.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;