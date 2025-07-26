import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface FeedInResult {
  yearlyGeneration: number;
  generationPayment: number;
  exportPayment: number;
  selfConsumptionSaving: number;
  totalAnnualReturn: number;
  totalReturn20Years: number;
  simplePayback: number;
  roi: number;
}

export function FeedInTariffCalculator() {
  const [systemSize, setSystemSize] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [technologyType, setTechnologyType] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [selfConsumption, setSelfConsumption] = useState('50');
  const [installationCost, setInstallationCost] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.25');
  const [result, setResult] = useState<FeedInResult | null>(null);

  const technologyTypes = [
    { value: 'solar_pv', label: 'Solar PV' },
    { value: 'wind', label: 'Wind Power' },
    { value: 'hydro', label: 'Hydro Power' },
    { value: 'anaerobic_digestion', label: 'Anaerobic Digestion' },
    { value: 'micro_chp', label: 'Micro CHP' }
  ];

  const installationPeriods = [
    { value: 'before_2012', label: 'Before April 2012' },
    { value: '2012_2013', label: 'April 2012 - March 2013' },
    { value: '2013_2014', label: 'April 2013 - March 2014' },
    { value: '2014_2015', label: 'April 2014 - March 2015' },
    { value: '2015_2016', label: 'April 2015 - March 2016' },
    { value: '2016_2017', label: 'April 2016 - March 2017' },
    { value: '2017_2018', label: 'April 2017 - March 2018' },
    { value: '2018_2019', label: 'April 2018 - March 2019' },
    { value: 'after_2019', label: 'After March 2019 (Closed)' }
  ];

  const getFeedInRates = (period: string, technology: string, size: number) => {
    // Simplified FIT rates (historical rates in £/kWh)
    const rates: any = {
      'before_2012': { solar_pv: 0.431, wind: 0.341, hydro: 0.199, export: 0.032 },
      '2012_2013': { solar_pv: 0.214, wind: 0.262, hydro: 0.199, export: 0.032 },
      '2013_2014': { solar_pv: 0.147, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2014_2015': { solar_pv: 0.128, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2015_2016': { solar_pv: 0.124, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2016_2017': { solar_pv: 0.043, wind: 0.088, hydro: 0.199, export: 0.047 },
      '2017_2018': { solar_pv: 0.039, wind: 0.088, hydro: 0.199, export: 0.047 },
      '2018_2019': { solar_pv: 0.037, wind: 0.088, hydro: 0.199, export: 0.047 },
      'after_2019': { solar_pv: 0.000, wind: 0.000, hydro: 0.000, export: 0.055 } // SEG rates
    };

    return {
      generation: rates[period]?.[technology] || 0,
      export: rates[period]?.export || 0.055
    };
  };

  const calculateFeedInTariff = () => {
    const size = parseFloat(systemSize);
    const sunHours = parseFloat(peakSunHours);
    const selfCons = parseFloat(selfConsumption) / 100;
    const cost = parseFloat(installationCost);
    const price = parseFloat(electricityPrice);

    if (!size || !sunHours || !selfCons || !cost || !price || !installationDate || !technologyType) {
      return;
    }

    const rates = getFeedInRates(installationDate, technologyType, size);
    
    // Calculate annual generation
    let yearlyGeneration;
    if (technologyType === 'solar_pv') {
      yearlyGeneration = size * sunHours * 365;
    } else if (technologyType === 'wind') {
      yearlyGeneration = size * 24 * 365 * 0.25; // 25% capacity factor
    } else {
      yearlyGeneration = size * 24 * 365 * 0.40; // 40% capacity factor for hydro/AD
    }

    // Calculate payments
    const generationPayment = yearlyGeneration * rates.generation;
    const exportedEnergy = yearlyGeneration * (1 - selfCons);
    const exportPayment = exportedEnergy * rates.export;
    const selfConsumedEnergy = yearlyGeneration * selfCons;
    const selfConsumptionSaving = selfConsumedEnergy * price;
    
    const totalAnnualReturn = generationPayment + exportPayment + selfConsumptionSaving;
    const totalReturn20Years = totalAnnualReturn * 20; // FIT guaranteed for 20 years
    const simplePayback = cost / totalAnnualReturn;
    const roi = (totalAnnualReturn / cost) * 100;

    setResult({
      yearlyGeneration,
      generationPayment,
      exportPayment,
      selfConsumptionSaving,
      totalAnnualReturn,
      totalReturn20Years,
      simplePayback,
      roi
    });
  };

  const reset = () => {
    setSystemSize('');
    setInstallationDate('');
    setTechnologyType('');
    setPeakSunHours('3.5');
    setSelfConsumption('50');
    setInstallationCost('');
    setElectricityPrice('0.25');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feed-in Tariff Calculator</CardTitle>
        <CardDescription>
          Calculate Feed-in Tariff payments and returns (legacy scheme)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            type="number"
            label="System Size"
            placeholder="Enter system capacity"
            value={systemSize}
            onChange={(e) => setSystemSize(e.target.value)}
            unit="kW"
            step="0.1"
          />
          
          <MobileSelect
            label="Installation Period"
            placeholder="Select installation date"
            value={installationDate}
            onValueChange={setInstallationDate}
            options={installationPeriods}
          />
          
          <MobileSelect
            label="Technology Type"
            placeholder="Select technology"
            value={technologyType}
            onValueChange={setTechnologyType}
            options={technologyTypes}
          />
          
          <MobileInput
            type="number"
            label="Peak Sun Hours (Solar only)"
            placeholder="Enter peak sun hours"
            value={peakSunHours}
            onChange={(e) => setPeakSunHours(e.target.value)}
            unit="hrs/day"
            step="0.1"
          />
          
          <MobileInput
            type="number"
            label="Self Consumption"
            placeholder="Enter self consumption"
            value={selfConsumption}
            onChange={(e) => setSelfConsumption(e.target.value)}
            unit="%"
            step="5"
          />
          
          <MobileInput
            type="number"
            label="Installation Cost"
            placeholder="Enter installation cost"
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
            onClick={calculateFeedInTariff} 
            variant="elec"
            size="wide"
            className="flex-1"
          >
            Calculate FIT Returns
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
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Feed-in Tariff Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Annual Generation:</span>
                <span className="float-right">{result.yearlyGeneration.toFixed(0)} kWh</span>
              </div>
              <div>
                <span className="font-medium">Generation Payment:</span>
                <span className="float-right">£{result.generationPayment.toFixed(0)}/year</span>
              </div>
              <div>
                <span className="font-medium">Export Payment:</span>
                <span className="float-right">£{result.exportPayment.toFixed(0)}/year</span>
              </div>
              <div>
                <span className="font-medium">Self-consumption Saving:</span>
                <span className="float-right">£{result.selfConsumptionSaving.toFixed(0)}/year</span>
              </div>
              <div className="col-span-2 font-semibold border-t pt-2">
                <span>Total Annual Return:</span>
                <span className="float-right text-elec-yellow">£{result.totalAnnualReturn.toFixed(0)}</span>
              </div>
              <div>
                <span className="font-medium">20-Year Total Return:</span>
                <span className="float-right">£{result.totalReturn20Years.toFixed(0)}</span>
              </div>
              <div>
                <span className="font-medium">Simple Payback:</span>
                <span className="float-right">{result.simplePayback.toFixed(1)} years</span>
              </div>
              <div>
                <span className="font-medium">Annual ROI:</span>
                <span className="float-right">{result.roi.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            The Feed-in Tariff scheme closed to new applications in March 2019. Existing installations 
            continue to receive payments for 20 years. New installations may be eligible for the Smart 
            Export Guarantee (SEG). Rates shown are historical and subject to inflation indexing. 
            Consult Ofgem for current rates and eligibility.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default FeedInTariffCalculator;