import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface GridTieResult {
  inverterSize: number;
  efficiency: number;
  maxACOutput: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  feedInIncome: number;
  savingsValue: number;
  totalValue: number;
}

export function GridTieInverterCalculator() {
  const [arrayPower, setArrayPower] = useState('');
  const [inverterEfficiency, setInverterEfficiency] = useState('96');
  const [systemVoltage, setSystemVoltage] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [feedInTariff, setFeedInTariff] = useState('0.05');
  const [electricityPrice, setElectricityPrice] = useState('0.25');
  const [selfConsumption, setSelfConsumption] = useState('50');
  const [result, setResult] = useState<GridTieResult | null>(null);

  const voltageOptions = [
    { value: '230', label: '230V Single Phase' },
    { value: '400', label: '400V Three Phase' }
  ];

  const calculateGridTie = () => {
    const arrayPowerNum = parseFloat(arrayPower);
    const efficiency = parseFloat(inverterEfficiency) / 100;
    const voltage = parseFloat(systemVoltage);
    const sunHours = parseFloat(peakSunHours);
    const tariff = parseFloat(feedInTariff);
    const price = parseFloat(electricityPrice);
    const selfCons = parseFloat(selfConsumption) / 100;

    if (!arrayPowerNum || !efficiency || !voltage || !sunHours || !tariff || !price || !selfCons) {
      return;
    }

    // Inverter sizing typically 0.8-1.2 times array power
    const inverterSize = arrayPowerNum * 1.1; // 110% oversizing
    const maxACOutput = arrayPowerNum * efficiency;
    const dailyGeneration = maxACOutput * sunHours;
    const monthlyGeneration = dailyGeneration * 30;
    const yearlyGeneration = dailyGeneration * 365;
    
    // Financial calculations
    const selfConsumedEnergy = yearlyGeneration * selfCons;
    const exportedEnergy = yearlyGeneration * (1 - selfCons);
    const feedInIncome = exportedEnergy * tariff;
    const savingsValue = selfConsumedEnergy * price;
    const totalValue = feedInIncome + savingsValue;

    setResult({
      inverterSize,
      efficiency: efficiency * 100,
      maxACOutput,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      feedInIncome,
      savingsValue,
      totalValue
    });
  };

  const reset = () => {
    setArrayPower('');
    setInverterEfficiency('96');
    setSystemVoltage('');
    setPeakSunHours('3.5');
    setFeedInTariff('0.05');
    setElectricityPrice('0.25');
    setSelfConsumption('50');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grid-Tie Inverter Calculator</CardTitle>
        <CardDescription>
          Calculate grid-tie inverter sizing and financial returns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            type="number"
            label="Solar Array Power"
            placeholder="Enter array power"
            value={arrayPower}
            onChange={(e) => setArrayPower(e.target.value)}
            unit="kW"
            step="0.1"
          />
          
          <MobileInput
            type="number"
            label="Inverter Efficiency"
            placeholder="Enter efficiency"
            value={inverterEfficiency}
            onChange={(e) => setInverterEfficiency(e.target.value)}
            unit="%"
            step="0.1"
          />
          
          <MobileSelect
            label="System Voltage"
            placeholder="Select voltage"
            value={systemVoltage}
            onValueChange={setSystemVoltage}
            options={voltageOptions}
          />
          
          <MobileInput
            type="number"
            label="Peak Sun Hours"
            placeholder="Enter peak sun hours"
            value={peakSunHours}
            onChange={(e) => setPeakSunHours(e.target.value)}
            unit="hrs/day"
            step="0.1"
          />
          
          <MobileInput
            type="number"
            label="Feed-in Tariff"
            placeholder="Enter feed-in rate"
            value={feedInTariff}
            onChange={(e) => setFeedInTariff(e.target.value)}
            unit="£/kWh"
            step="0.01"
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
          
          <MobileInput
            type="number"
            label="Self Consumption"
            placeholder="Enter self consumption"
            value={selfConsumption}
            onChange={(e) => setSelfConsumption(e.target.value)}
            unit="%"
            step="1"
          />
        </div>

        <div className="flex gap-2">
          <MobileButton 
            onClick={calculateGridTie} 
            variant="elec"
            size="wide"
            className="flex-1"
          >
            Calculate Grid-Tie System
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
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Grid-Tie System Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Recommended Inverter Size:</span>
                <span className="float-right">{result.inverterSize.toFixed(1)} kW</span>
              </div>
              <div>
                <span className="font-medium">System Efficiency:</span>
                <span className="float-right">{result.efficiency.toFixed(1)}%</span>
              </div>
              <div>
                <span className="font-medium">Max AC Output:</span>
                <span className="float-right">{result.maxACOutput.toFixed(2)} kW</span>
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
                <span className="font-medium">Feed-in Income:</span>
                <span className="float-right">£{result.feedInIncome.toFixed(0)}/year</span>
              </div>
              <div>
                <span className="font-medium">Self-consumption Savings:</span>
                <span className="float-right">£{result.savingsValue.toFixed(0)}/year</span>
              </div>
              <div className="col-span-2 font-semibold border-t pt-2">
                <span>Total Annual Value:</span>
                <span className="float-right text-elec-yellow">£{result.totalValue.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            Grid-tie systems must comply with G98/G99 regulations. Inverter sizing affects system performance 
            and economics. Consider DC:AC ratios between 1.1-1.3 for optimal performance. Professional design 
            and MCS certification required for feed-in tariffs.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default GridTieInverterCalculator;