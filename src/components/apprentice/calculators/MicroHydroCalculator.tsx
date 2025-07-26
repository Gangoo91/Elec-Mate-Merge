import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface MicroHydroResult {
  theoreticalPower: number;
  actualPower: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  capacityFactor: number;
  yearlyValue: number;
  paybackPeriod: number;
}

export function MicroHydroCalculator() {
  const [flowRate, setFlowRate] = useState('');
  const [head, setHead] = useState('');
  const [turbineType, setTurbineType] = useState('');
  const [systemEfficiency, setSystemEfficiency] = useState('70');
  const [installationCost, setInstallationCost] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.25');
  const [result, setResult] = useState<MicroHydroResult | null>(null);

  const turbineTypes = [
    { value: 'pelton', label: 'Pelton Wheel (High head: >50m)' },
    { value: 'turgo', label: 'Turgo (Medium head: 30-300m)' },
    { value: 'crossflow', label: 'Cross-flow (Low-medium head: 3-200m)' },
    { value: 'kaplan', label: 'Kaplan (Low head: <10m)' },
    { value: 'francis', label: 'Francis (Medium head: 10-350m)' },
    { value: 'propeller', label: 'Propeller (Very low head: <4m)' }
  ];

  const calculateMicroHydro = () => {
    const flow = parseFloat(flowRate);
    const headNum = parseFloat(head);
    const efficiency = parseFloat(systemEfficiency) / 100;
    const cost = parseFloat(installationCost);
    const price = parseFloat(electricityPrice);

    if (!flow || !headNum || !efficiency || !cost || !price || !turbineType) {
      return;
    }

    // Hydro power formula: P = ρ × g × Q × H × η
    // Where: ρ = 1000 kg/m³, g = 9.81 m/s², Q = flow rate (m³/s), H = head (m), η = efficiency
    const theoreticalPower = 9.81 * flow * headNum / 1000; // kW
    const actualPower = theoreticalPower * efficiency;
    
    // Micro-hydro typically has high capacity factor (80-95%)
    const capacityFactor = 0.85; // 85% average
    const dailyGeneration = actualPower * 24 * capacityFactor;
    const monthlyGeneration = dailyGeneration * 30;
    const yearlyGeneration = dailyGeneration * 365;
    const yearlyValue = yearlyGeneration * price;
    const paybackPeriod = cost / yearlyValue;

    setResult({
      theoreticalPower,
      actualPower,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      capacityFactor: capacityFactor * 100,
      yearlyValue,
      paybackPeriod
    });
  };

  const reset = () => {
    setFlowRate('');
    setHead('');
    setTurbineType('');
    setSystemEfficiency('70');
    setInstallationCost('');
    setElectricityPrice('0.25');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Micro-Hydro Calculator</CardTitle>
        <CardDescription>
          Calculate micro-hydro power generation and economics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            type="number"
            label="Flow Rate"
            placeholder="Enter flow rate"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            unit="m³/s"
            step="0.01"
          />
          
          <MobileInput
            type="number"
            label="Head (Height)"
            placeholder="Enter head height"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            unit="m"
            step="0.1"
          />
          
          <MobileSelect
            label="Turbine Type"
            placeholder="Select turbine type"
            value={turbineType}
            onValueChange={setTurbineType}
            options={turbineTypes}
          />
          
          <MobileInput
            type="number"
            label="System Efficiency"
            placeholder="Enter system efficiency"
            value={systemEfficiency}
            onChange={(e) => setSystemEfficiency(e.target.value)}
            unit="%"
            step="1"
          />
          
          <MobileInput
            type="number"
            label="Installation Cost"
            placeholder="Enter total cost"
            value={installationCost}
            onChange={(e) => setInstallationCost(e.target.value)}
            unit="£"
            step="100"
          />
          
          <MobileInput
            type="number"
            label="Electricity Price"
            placeholder="Enter electricity price"
            value={electricityPrice}
            onChange={(e) => setElectricityPrice(e.target.value)}
            unit="£/kWh"
            step="0.01"
          />
        </div>

        <div className="flex gap-2">
          <MobileButton 
            onClick={calculateMicroHydro} 
            variant="elec"
            size="wide"
            className="flex-1"
          >
            Calculate Micro-Hydro
          </MobileButton>
          <MobileButton 
            onClick={reset} 
            variant="outline" 
            size="default"
          >
            Reset
          </MobileButton>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Micro-Hydro Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Theoretical Power:</span>
                <span className="float-right">{result.theoreticalPower.toFixed(2)} kW</span>
              </div>
              <div>
                <span className="font-medium">Actual Power Output:</span>
                <span className="float-right">{result.actualPower.toFixed(2)} kW</span>
              </div>
              <div>
                <span className="font-medium">Capacity Factor:</span>
                <span className="float-right">{result.capacityFactor.toFixed(0)}%</span>
              </div>
              <div>
                <span className="font-medium">Daily Generation:</span>
                <span className="float-right">{result.dailyGeneration.toFixed(1)} kWh</span>
              </div>
              <div>
                <span className="font-medium">Monthly Generation:</span>
                <span className="float-right">{result.monthlyGeneration.toFixed(0)} kWh</span>
              </div>
              <div>
                <span className="font-medium">Yearly Generation:</span>
                <span className="float-right">{result.yearlyGeneration.toFixed(0)} kWh</span>
              </div>
              <div>
                <span className="font-medium">Annual Value:</span>
                <span className="float-right">£{result.yearlyValue.toFixed(0)}</span>
              </div>
              <div>
                <span className="font-medium">Payback Period:</span>
                <span className="float-right">{result.paybackPeriod.toFixed(1)} years</span>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            Micro-hydro requires consistent water flow and environmental permits. Consider seasonal 
            variations, fish migration, and downstream users. Professional hydrological assessment 
            is essential. Installation must comply with Environment Agency regulations and abstraction 
            licenses may be required.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default MicroHydroCalculator;