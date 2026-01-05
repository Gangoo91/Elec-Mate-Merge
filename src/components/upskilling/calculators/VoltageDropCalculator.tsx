import { useState } from 'react';
import { Calculator, Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CableSizeData {
  csa: number; // Cross-sectional area in mm²
  resistance: number; // Resistance in mΩ/m for copper conductor at 70°C
  currentCapacity: {
    method1: number; // Enclosed in conduit
    method2: number; // Clipped direct
    method3: number; // Underground
  };
  cost: number; // Relative cost factor
}

const cableSizes: CableSizeData[] = [
  { csa: 1.5, resistance: 14.8, currentCapacity: { method1: 20, method2: 23, method3: 27 }, cost: 1.0 },
  { csa: 2.5, resistance: 8.9, currentCapacity: { method1: 27, method2: 31, method3: 36 }, cost: 1.4 },
  { csa: 4, resistance: 5.6, currentCapacity: { method1: 37, method2: 42, method3: 49 }, cost: 2.0 },
  { csa: 6, resistance: 3.7, currentCapacity: { method1: 47, method2: 54, method3: 62 }, cost: 2.8 },
  { csa: 10, resistance: 2.2, currentCapacity: { method1: 64, method2: 73, method3: 83 }, cost: 4.2 },
  { csa: 16, resistance: 1.4, currentCapacity: { method1: 85, method2: 97, method3: 110 }, cost: 6.5 },
  { csa: 25, resistance: 0.89, currentCapacity: { method1: 112, method2: 129, method3: 147 }, cost: 9.8 },
  { csa: 35, resistance: 0.64, currentCapacity: { method1: 138, method2: 158, method3: 179 }, cost: 13.5 },
  { csa: 50, resistance: 0.45, currentCapacity: { method1: 168, method2: 192, method3: 218 }, cost: 18.7 },
];

export const VoltageDropCalculator = () => {
  const [power, setPower] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('230');
  const [length, setLength] = useState<string>('');
  const [phases, setPhases] = useState<string>('1');
  const [installationMethod, setInstallationMethod] = useState<string>('method1');
  const [ambientTemp, setAmbientTemp] = useState<string>('30');
  const [powerFactor, setPowerFactor] = useState<string>('1.0');
  const [results, setResults] = useState<any>(null);

  const getTemperatureDerating = (temp: number): number => {
    if (temp <= 25) return 1.0;
    if (temp <= 30) return 0.94;
    if (temp <= 35) return 0.87;
    if (temp <= 40) return 0.79;
    if (temp <= 45) return 0.71;
    if (temp <= 50) return 0.61;
    return 0.5;
  };

  const calculateVoltageDropAndCableSize = () => {
    const powerNum = parseFloat(power);
    const voltageNum = parseFloat(voltage);
    const lengthNum = parseFloat(length);
    const phasesNum = parseInt(phases);
    const ambientTempNum = parseFloat(ambientTemp);
    const powerFactorNum = parseFloat(powerFactor);

    if (!powerNum || !voltageNum || !lengthNum) return;

    // Calculate design current with proper three-phase voltage handling
    let actualVoltage = voltageNum;
    if (phasesNum === 3 && voltageNum === 230) {
      // For three-phase, use 400V line voltage if 230V is selected
      actualVoltage = 400;
    }

    const designCurrent = phasesNum === 1 
      ? (powerNum * 1000) / (actualVoltage * powerFactorNum)  // Convert kW to W
      : (powerNum * 1000) / (Math.sqrt(3) * actualVoltage * powerFactorNum);

    // Add 125% factor for continuous loads (EV charging)
    const adjustedCurrent = designCurrent * 1.25;

    // Apply temperature derating
    const tempDerating = getTemperatureDerating(ambientTempNum);

    const methodKey = installationMethod as keyof CableSizeData['currentCapacity'];
    
    const cableAnalysis = cableSizes.map(cable => {
      // Check current capacity
      const deratedCapacity = cable.currentCapacity[methodKey] * tempDerating;
      const currentOk = deratedCapacity >= adjustedCurrent;

      // Calculate voltage drop using actual voltage for calculations
      let voltageDrop: number;
      if (phasesNum === 1) {
        voltageDrop = 2 * designCurrent * cable.resistance * lengthNum / 1000; // 2 for line + neutral
      } else {
        voltageDrop = Math.sqrt(3) * designCurrent * cable.resistance * lengthNum / 1000;
      }

      const voltageDropPercent = (voltageDrop / actualVoltage) * 100;
      const voltageDropOk = voltageDropPercent <= 5.0; // 5% limit for power circuits

      return {
        actualVoltage,
        ...cable,
        adjustedCurrent,
        deratedCapacity,
        currentOk,
        voltageDrop,
        voltageDropPercent,
        voltageDropOk,
        suitable: currentOk && voltageDropOk,
        marginalCurrent: deratedCapacity >= adjustedCurrent && deratedCapacity < adjustedCurrent * 1.1,
        marginalVoltage: voltageDropPercent > 4.5 && voltageDropPercent <= 5.0
      };
    });

    // Find recommended cable
    const suitableCables = cableAnalysis.filter(c => c.suitable);
    const recommendedCable = suitableCables.length > 0 ? suitableCables[0] : null;

    // Generate warnings and recommendations
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (!recommendedCable) {
      warnings.push("No standard cable size meets both current capacity and voltage drop requirements!");
      recommendations.push("Consider reducing cable length, increasing supply voltage, or using larger non-standard cables.");
    } else {
      if (recommendedCable.marginalCurrent) {
        warnings.push("Cable current capacity is marginal - consider next size up for safety margin.");
      }
      if (recommendedCable.marginalVoltage) {
        warnings.push("Voltage drop is close to the 5% limit - consider next size up for better regulation.");
      }
    }

    // Cost analysis
    if (suitableCables.length > 1) {
      const costDifference = ((suitableCables[1].cost - suitableCables[0].cost) / suitableCables[0].cost) * 100;
      if (costDifference < 50) {
        recommendations.push(`Consider ${suitableCables[1].csa}mm² cable - only ${costDifference.toFixed(0)}% more expensive but provides better margin.`);
      }
    }

    // Environmental considerations
    if (ambientTempNum > 40) {
      warnings.push("High ambient temperature significantly reduces cable capacity - ensure adequate ventilation.");
    }

    if (lengthNum > 50) {
      recommendations.push("Long cable run detected - consider three-phase supply or local transformer for better efficiency.");
    }

    // Power-specific recommendations
    if (powerNum >= 22000) {
      recommendations.push("High power installation - ensure adequate earthing and consider RCD protection requirements.");
    }

    // BS 7671 compliance checks
    const complianceIssues: string[] = [];
    if (recommendedCable && recommendedCable.voltageDropPercent > 5.0) {
      complianceIssues.push("Voltage drop exceeds BS 7671 5% limit for power circuits");
    }
    if (designCurrent < adjustedCurrent / 1.25 * 0.8) {
      complianceIssues.push("Consider protective device coordination per BS 7671 Section 433");
    }

    setResults({
      designCurrent,
      adjustedCurrent,
      actualVoltage,
      powerKW: powerNum,
      cableAnalysis,
      recommendedCable,
      warnings,
      recommendations,
      complianceIssues,
      tempDerating,
      powerFactorImpact: powerFactorNum < 0.95 ? "Poor power factor increases current requirements" : null
    });
  };

  const clearResults = () => {
    setPower('');
    setVoltage('230');
    setLength('');
    setPhases('1');
    setInstallationMethod('method1');
    setAmbientTemp('30');
    setPowerFactor('1.0');
    setResults(null);
  };

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-6 w-6 text-elec-yellow" />
          Smart Voltage Drop & Cable Sizing Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="power" className="text-foreground">Power (kW)</Label>
            <Input
              id="power"
              type="number"
              placeholder="e.g., 7"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voltage" className="text-foreground">Voltage (V)</Label>
            <Select value={voltage} onValueChange={setVoltage}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600 text-foreground">
                <SelectItem value="230" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">230V (Single Phase)</SelectItem>
                <SelectItem value="400" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">400V (Three Phase)</SelectItem>
                <SelectItem value="230_3ph" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">230V (Three Phase - Line to Neutral)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length" className="text-foreground">Cable Length (m)</Label>
            <Input
              id="length"
              type="number"
              placeholder="e.g., 25"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phases" className="text-foreground">Supply Type</Label>
            <Select value={phases} onValueChange={setPhases}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600 text-foreground">
                <SelectItem value="1" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">Single Phase</SelectItem>
                <SelectItem value="3" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="installation" className="text-foreground">Installation Method</Label>
            <Select value={installationMethod} onValueChange={setInstallationMethod}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600 text-foreground">
                <SelectItem value="method1" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">Enclosed in Conduit</SelectItem>
                <SelectItem value="method2" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">Clipped Direct</SelectItem>
                <SelectItem value="method3" className="text-foreground hover:bg-elec-gray hover:text-foreground focus:bg-elec-gray focus:text-foreground data-[highlighted]:bg-elec-gray data-[highlighted]:text-foreground">Underground/SWA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ambient" className="text-foreground">Ambient Temp (°C)</Label>
            <Input
              id="ambient"
              type="number"
              placeholder="e.g., 30"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="powerfactor" className="text-foreground">Power Factor</Label>
            <Input
              id="powerfactor"
              type="number"
              step="0.01"
              min="0.5"
              max="1.0"
              placeholder="e.g., 1.0"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculateVoltageDropAndCableSize}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            disabled={!power || !length}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Cable Size
          </Button>
          <Button 
            variant="outline" 
            onClick={clearResults}
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Clear
          </Button>
        </div>

        {results && (
          <div className="space-y-6 mt-6">
            {/* Key Results */}
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold text-foreground mb-4">Calculation Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300"><strong>Input Power:</strong> {results.powerKW}kW</p>
                  <p className="text-gray-300"><strong>Calculation Voltage:</strong> {results.actualVoltage}V</p>
                  <p className="text-gray-300"><strong>Design Current:</strong> {results.designCurrent.toFixed(1)}A</p>
                  <p className="text-gray-300"><strong>Adjusted Current (125%):</strong> {results.adjustedCurrent.toFixed(1)}A</p>
                  <p className="text-gray-300"><strong>Temperature Derating:</strong> {(results.tempDerating * 100).toFixed(0)}%</p>
                </div>
                <div>
                  {results.recommendedCable ? (
                    <div className="bg-green-900/30 border border-green-500/50 p-3 rounded">
                      <p className="text-green-300 font-semibold">✓ Recommended Cable: {results.recommendedCable.csa}mm²</p>
                      <p className="text-green-200 text-sm">Voltage Drop: {results.recommendedCable.voltageDropPercent.toFixed(2)}%</p>
                      <p className="text-green-200 text-sm">Current Capacity: {results.recommendedCable.deratedCapacity.toFixed(0)}A</p>
                    </div>
                  ) : (
                    <div className="bg-red-900/30 border border-red-500/50 p-3 rounded">
                      <p className="text-red-300 font-semibold">⚠ No suitable cable found!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Compliance Issues */}
            {results.complianceIssues.length > 0 && (
              <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  BS 7671 Compliance Issues
                </h4>
                <ul className="space-y-1 text-red-200">
                  {results.complianceIssues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span className="text-sm">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {results.warnings.length > 0 && (
              <div className="bg-amber-900/30 border border-amber-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings
                </h4>
                <ul className="space-y-1 text-amber-200">
                  {results.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-400">⚠</span>
                      <span className="text-sm">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {results.recommendations.length > 0 && (
              <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Smart Recommendations
                </h4>
                <ul className="space-y-1 text-blue-200">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400">💡</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cable Analysis Table */}
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-semibold text-foreground mb-3">Cable Size Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-gray-300 pb-2">Size (mm²)</th>
                      <th className="text-left text-gray-300 pb-2">Capacity (A)</th>
                      <th className="text-left text-gray-300 pb-2">Voltage Drop</th>
                      <th className="text-left text-gray-300 pb-2">Status</th>
                      <th className="text-left text-gray-300 pb-2">Cost Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.cableAnalysis.slice(0, 8).map((cable: any, index: number) => (
                      <tr key={index} className={`border-b border-gray-700 ${cable.suitable ? 'bg-green-900/20' : ''}`}>
                        <td className="py-2 text-foreground font-medium">{cable.csa}</td>
                        <td className="py-2">
                          <span className={cable.currentOk ? 'text-green-300' : 'text-red-300'}>
                            {cable.deratedCapacity.toFixed(0)}A
                          </span>
                        </td>
                        <td className="py-2">
                          <span className={cable.voltageDropOk ? 'text-green-300' : 'text-red-300'}>
                            {cable.voltageDropPercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-2">
                          {cable.suitable ? (
                            <Badge variant="secondary" className="bg-green-600/40 text-green-300">
                              ✓ Suitable
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-600/40 text-red-300">
                              ✗ Not suitable
                            </Badge>
                          )}
                        </td>
                        <td className="py-2 text-gray-300">{cable.cost.toFixed(1)}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Calculator Notes
          </h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Calculations based on BS 7671:2018+A2:2022 requirements</li>
            <li>• 125% continuous load factor applied for EV charging</li>
            <li>• Copper conductors at 70°C operating temperature assumed</li>
            <li>• Protective device coordination should be verified separately</li>
            <li>• Consider earth fault loop impedance and shock protection requirements</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};