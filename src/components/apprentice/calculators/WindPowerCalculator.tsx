import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface WindPowerResult {
  averagePower: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  capacityFactor: number;
  yearlyValue: number;
}

export function WindPowerCalculator() {
  const [turbineRating, setTurbineRating] = useState('');
  const [hubHeight, setHubHeight] = useState('');
  const [averageWindSpeed, setAverageWindSpeed] = useState('');
  const [windClass, setWindClass] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.25');
  const [result, setResult] = useState<WindPowerResult | null>(null);

  const windClasses = [
    { value: '1', label: 'Class 1 (Low wind - <6.4 m/s)' },
    { value: '2', label: 'Class 2 (Moderate - 6.4-7.0 m/s)' },
    { value: '3', label: 'Class 3 (Good - 7.0-7.5 m/s)' },
    { value: '4', label: 'Class 4 (Excellent - 7.5-8.0 m/s)' },
    { value: '5', label: 'Class 5 (Outstanding - 8.0-8.8 m/s)' },
    { value: '6', label: 'Class 6 (Superb - 8.8-9.4 m/s)' },
    { value: '7', label: 'Class 7 (Exceptional - >9.4 m/s)' }
  ];

  const calculateWindPower = () => {
    const rating = parseFloat(turbineRating);
    const height = parseFloat(hubHeight);
    const windSpeed = parseFloat(averageWindSpeed);
    const price = parseFloat(electricityPrice);
    const windClassNum = parseInt(windClass);

    if (!rating || !height || !windSpeed || !windClassNum || !price) {
      return;
    }

    // Wind power follows cubic law: P = 0.5 * ρ * A * V³ * Cp
    // Simplified calculation for practical estimates
    const windPowerDensity = Math.pow(windSpeed, 3) / 100; // Simplified factor
    const heightFactor = Math.pow(height / 10, 0.14); // Wind shear factor
    const capacityFactor = Math.min(0.45, windClassNum * 0.06); // Based on wind class
    
    const averagePower = rating * capacityFactor * heightFactor;
    const dailyGeneration = averagePower * 24;
    const monthlyGeneration = dailyGeneration * 30;
    const yearlyGeneration = dailyGeneration * 365;
    const yearlyValue = yearlyGeneration * price;

    setResult({
      averagePower,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      capacityFactor: capacityFactor * 100,
      yearlyValue
    });
  };

  const reset = () => {
    setTurbineRating('');
    setHubHeight('');
    setAverageWindSpeed('');
    setWindClass('');
    setElectricityPrice('0.25');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Wind Power Calculator</CardTitle>
        <CardDescription>
          Calculate wind turbine power generation and energy output
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            type="number"
            label="Turbine Rating"
            placeholder="Enter rated power"
            value={turbineRating}
            onChange={(e) => setTurbineRating(e.target.value)}
            unit="kW"
          />
          
          <MobileInput
            type="number"
            label="Hub Height"
            placeholder="Enter hub height"
            value={hubHeight}
            onChange={(e) => setHubHeight(e.target.value)}
            unit="m"
          />
          
          <MobileInput
            type="number"
            label="Average Wind Speed"
            placeholder="Enter wind speed"
            value={averageWindSpeed}
            onChange={(e) => setAverageWindSpeed(e.target.value)}
            unit="m/s"
            step="0.1"
          />
          
          <MobileSelect
            label="Wind Resource Class"
            placeholder="Select wind class"
            value={windClass}
            onValueChange={setWindClass}
            options={windClasses}
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

        <div className="flex flex-col sm:flex-row gap-2">
          <MobileButton 
            onClick={calculateWindPower} 
            variant="elec"
            size="wide"
            className="sm:flex-1"
          >
            Calculate Wind Power
          </MobileButton>
          <MobileButton 
            onClick={reset} 
            variant="outline" 
            size="default"
            className="sm:w-auto"
          >
            Reset
          </MobileButton>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Wind Power Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Average Power Output:</span>
                <span className="float-right">{result.averagePower.toFixed(2)} kW</span>
              </div>
              <div>
                <span className="font-medium">Capacity Factor:</span>
                <span className="float-right">{result.capacityFactor.toFixed(1)}%</span>
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
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            Wind power generation depends heavily on site-specific conditions. Consider factors like 
            turbulence, obstacles, and local planning regulations. Professional wind resource assessment 
            is recommended for commercial installations.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default WindPowerCalculator;