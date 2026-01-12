import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Zap, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const CalculationTools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCalc = searchParams.get("calc") || "zs";
  const setActiveCalc = (calc: string) => setSearchParams({ calc }, { replace: false });

  const [zsValues, setZsValues] = useState({ ze: '', r1r2: '' });
  const [currentValues, setCurrentValues] = useState({ voltage: '230', resistance: '' });
  const [voltageDropValues, setVoltageDropValues] = useState({
    current: '', length: '', resistance: ''
  });

  const calculateZs = () => {
    const ze = parseFloat(zsValues.ze);
    const r1r2 = parseFloat(zsValues.r1r2);
    if (isNaN(ze) || isNaN(r1r2)) return null;
    return (ze + r1r2).toFixed(3);
  };

  const calculateCurrent = () => {
    const voltage = parseFloat(currentValues.voltage);
    const resistance = parseFloat(currentValues.resistance);
    if (isNaN(voltage) || isNaN(resistance) || resistance === 0) return null;
    return (voltage / resistance).toFixed(2);
  };

  const calculateVoltageDrop = () => {
    const current = parseFloat(voltageDropValues.current);
    const length = parseFloat(voltageDropValues.length);
    const resistance = parseFloat(voltageDropValues.resistance);
    if (isNaN(current) || isNaN(length) || isNaN(resistance)) return null;
    return (current * length * resistance).toFixed(3);
  };

  const zsResult = calculateZs();
  const currentResult = calculateCurrent();
  const voltageDropResult = calculateVoltageDrop();

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          Interactive Calculation Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCalc} onValueChange={setActiveCalc} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-elec-dark">
            <TabsTrigger value="zs" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
              Zs Calculation
            </TabsTrigger>
            <TabsTrigger value="current" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
              Fault Current
            </TabsTrigger>
            <TabsTrigger value="voltage" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
              Voltage Drop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="zs" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md space-y-4">
              <h3 className="text-foreground font-medium mb-3">
                Earth Fault Loop Impedance (Zs = Ze + R1 + R2)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ze" className="text-gray-300">External Impedance (Ze) - Ω</Label>
                  <Input
                    id="ze"
                    type="number"
                    step="0.001"
                    placeholder="e.g., 0.35"
                    value={zsValues.ze}
                    onChange={(e) => setZsValues(prev => ({ ...prev, ze: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="r1r2" className="text-gray-300">Circuit Resistance (R1+R2) - Ω</Label>
                  <Input
                    id="r1r2"
                    type="number"
                    step="0.001"
                    placeholder="e.g., 1.2"
                    value={zsValues.r1r2}
                    onChange={(e) => setZsValues(prev => ({ ...prev, r1r2: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
              </div>

              {zsResult && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-md">
                  <p className="text-green-400 font-medium">
                    Calculated Zs: {zsResult} Ω
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Compare this value against BS7671 maximum limits for your protective device
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="current" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md space-y-4">
              <h3 className="text-foreground font-medium mb-3">
                Fault Current Calculation (I = U / Zs)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage" className="text-gray-300">Nominal Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={currentValues.voltage}
                    onChange={(e) => setCurrentValues(prev => ({ ...prev, voltage: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resistance" className="text-gray-300">Total Impedance (Zs) - Ω</Label>
                  <Input
                    id="resistance"
                    type="number"
                    step="0.001"
                    placeholder="e.g., 1.555"
                    value={currentValues.resistance}
                    onChange={(e) => setCurrentValues(prev => ({ ...prev, resistance: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
              </div>

              {currentResult && (
                <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded-md">
                  <p className="text-blue-400 font-medium">
                    Fault Current: {currentResult} A
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    This current must be sufficient to operate the protective device within required disconnection times
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="voltage" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md space-y-4">
              <h3 className="text-foreground font-medium mb-3">
                Voltage Drop Calculation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-vd" className="text-gray-300">Current (A)</Label>
                  <Input
                    id="current-vd"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 20"
                    value={voltageDropValues.current}
                    onChange={(e) => setVoltageDropValues(prev => ({ ...prev, current: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-gray-300">Length (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25"
                    value={voltageDropValues.length}
                    onChange={(e) => setVoltageDropValues(prev => ({ ...prev, length: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resistance-vd" className="text-gray-300">Resistance (Ω/m)</Label>
                  <Input
                    id="resistance-vd"
                    type="number"
                    step="0.0001"
                    placeholder="e.g., 0.0187"
                    value={voltageDropValues.resistance}
                    onChange={(e) => setVoltageDropValues(prev => ({ ...prev, resistance: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-foreground"
                  />
                </div>
              </div>

              {voltageDropResult && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-md">
                  <p className="text-yellow-400 font-medium">
                    Voltage Drop: {voltageDropResult} V
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Should not exceed 3% (6.9V) for lighting or 5% (11.5V) for other uses at 230V
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Alert className="mt-4 bg-blue-900/20 border-blue-600">
          <Zap className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            These calculations are for educational purposes. Always verify results and consult BS7671 for specific requirements.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};