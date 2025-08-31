import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface WindPowerResult {
  grossAEP: number;
  netAEP: number;
  capacityFactor: number;
  averagePower: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  yearlyValue: number;
  selfConsumption: number;
  gridExport: number;
  co2Savings: number;
  paybackPeriod: number;
  windSpeedAtHub: number;
}

export function WindPowerCalculator() {
  const [turbineModel, setTurbineModel] = useState('');
  const [hubHeight, setHubHeight] = useState('');
  const [averageWindSpeed, setAverageWindSpeed] = useState('');
  const [windClass, setWindClass] = useState('');
  const [terrain, setTerrain] = useState('');
  const [altitude, setAltitude] = useState('');
  const [losses, setLosses] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [annualConsumption, setAnnualConsumption] = useState('');
  const [selfConsumptionRate, setSelfConsumptionRate] = useState('');
  const [result, setResult] = useState<WindPowerResult | null>(null);

  const turbineModels = [
    { value: '2.5kW', label: '2.5 kW Domestic (Cut-in: 3m/s, Rated: 12m/s)' },
    { value: '5kW', label: '5 kW Small Commercial (Cut-in: 2.5m/s, Rated: 11m/s)' },
    { value: '10kW', label: '10 kW Farm/Estate (Cut-in: 3m/s, Rated: 12m/s)' },
    { value: '20kW', label: '20 kW Small Wind Farm (Cut-in: 2.5m/s, Rated: 11m/s)' },
    { value: '50kW', label: '50 kW Commercial (Cut-in: 3m/s, Rated: 12m/s)' },
    { value: 'custom', label: 'Custom Turbine' }
  ];

  const hubHeights = [
    { value: '10', label: '10m (Domestic/Small)' },
    { value: '15', label: '15m (Standard Domestic)' },
    { value: '20', label: '20m (Small Commercial)' },
    { value: '25', label: '25m (Farm Installation)' },
    { value: '30', label: '30m (Commercial)' },
    { value: '40', label: '40m (Large Commercial)' },
    { value: '50', label: '50m (Wind Farm)' }
  ];

  const windClasses = [
    { value: '1', label: 'Class 1 (Poor - <14.3 mph annual average)' },
    { value: '2', label: 'Class 2 (Marginal - 14.3-15.7 mph)' },
    { value: '3', label: 'Class 3 (Fair - 15.7-16.8 mph)' },
    { value: '4', label: 'Class 4 (Good - 16.8-17.9 mph)' },
    { value: '5', label: 'Class 5 (Excellent - 17.9-19.7 mph)' },
    { value: '6', label: 'Class 6 (Outstanding - 19.7-21.0 mph)' },
    { value: '7', label: 'Class 7 (Superb - >21.0 mph)' }
  ];

  const terrainTypes = [
    { value: 'smooth', label: 'Smooth (Water, Ice, Flat Desert)' },
    { value: 'open', label: 'Open Country (Grassland, Few Obstacles)' },
    { value: 'rough', label: 'Rough Open (Farmland, Some Buildings)' },
    { value: 'wooded', label: 'Wooded Country (Many Trees, Buildings)' },
    { value: 'urban', label: 'Urban/Suburban (Cities, Industrial Areas)' }
  ];

  const altitudeBands = [
    { value: '0', label: 'Sea Level (0-100m)' },
    { value: '200', label: 'Low Hills (100-300m)' },
    { value: '500', label: 'Moderate Hills (300-700m)' },
    { value: '1000', label: 'High Hills (700-1500m)' },
    { value: '1500', label: 'Mountains (>1500m)' }
  ];

  const lossesPresets = [
    { value: 'low', label: 'Low Losses (5%) - New Equipment, Good Maintenance' },
    { value: 'medium', label: 'Medium Losses (10%) - Standard Installation' },
    { value: 'high', label: 'High Losses (15%) - Older Equipment, Harsh Environment' }
  ];

  const electricityPrices = [
    { value: '0.20', label: '£0.20/kWh (Economy Rate)' },
    { value: '0.25', label: '£0.25/kWh (Standard Rate)' },
    { value: '0.30', label: '£0.30/kWh (Peak Rate)' },
    { value: '0.35', label: '£0.35/kWh (Premium Rate)' }
  ];

  const annualConsumptions = [
    { value: '2900', label: '2,900 kWh (1-2 bed flat)' },
    { value: '3800', label: '3,800 kWh (3 bed house)' },
    { value: '4600', label: '4,600 kWh (4 bed house)' },
    { value: '5500', label: '5,500 kWh (5+ bed house)' },
    { value: '10000', label: '10,000 kWh (Small business)' },
    { value: '25000', label: '25,000 kWh (Medium business)' }
  ];

  const selfConsumptionRates = [
    { value: '30', label: '30% (Standard household)' },
    { value: '50', label: '50% (Home office/High daytime use)' },
    { value: '70', label: '70% (Battery storage/EV charging)' },
    { value: '90', label: '90% (Commercial/Industrial)' }
  ];

  const getTurbineRating = () => {
    if (turbineModel === 'custom') return 0;
    return parseFloat(turbineModel.split('kW')[0]);
  };

  const calculateWindPower = () => {
    const rating = getTurbineRating();
    const height = parseFloat(hubHeight);
    const windSpeedMph = parseFloat(averageWindSpeed);
    const windSpeed = windSpeedMph * 0.44704; // Convert MPH to m/s for calculations
    const price = parseFloat(electricityPrice);
    const windClassNum = parseInt(windClass);
    const altitudeM = parseFloat(altitude);
    const consumption = parseFloat(annualConsumption);
    const selfConsRate = parseFloat(selfConsumptionRate) / 100;

    if (!rating || !height || !windSpeed || !windClassNum || !price || !terrain || !losses) {
      return;
    }

    // Enhanced physics calculations
    
    // 1. Air density correction for altitude (affects power output)
    const airDensity = 1.225 * Math.exp(-altitudeM / 8400); // Standard atmosphere model
    const densityFactor = airDensity / 1.225;

    // 2. Terrain roughness factors for wind shear
    const roughnessFactors = {
      smooth: 0.10,
      open: 0.15,
      rough: 0.20,
      wooded: 0.25,
      urban: 0.30
    };
    const alpha = roughnessFactors[terrain as keyof typeof roughnessFactors] || 0.15;

    // 3. Height-adjusted wind speed using power law
    const referenceHeight = 10; // Standard measurement height
    const windSpeedAtHub = windSpeed * Math.pow(height / referenceHeight, alpha);

    // 4. Weibull distribution parameters for wind resource
    const weibullK = 2.0; // Shape parameter (typical for wind)
    const weibullC = windSpeedAtHub / 0.887; // Scale parameter
    
    // 5. Power curve integration using simplified turbine characteristics
    const cutIn = 3.0; // Cut-in wind speed
    const rated = turbineModel.includes('2.5') ? 12 : turbineModel.includes('5') ? 11 : 12;
    const cutOut = 25; // Cut-out wind speed

    // 6. Capacity factor calculation using power curve
    let capacityFactor = 0;
    for (let v = 0; v <= 30; v += 0.5) {
      const probability = (weibullK / weibullC) * Math.pow(v / weibullC, weibullK - 1) * 
                         Math.exp(-Math.pow(v / weibullC, weibullK)) * 0.5;
      
      let powerRatio = 0;
      if (v >= cutIn && v < rated) {
        powerRatio = Math.pow((v - cutIn) / (rated - cutIn), 3);
      } else if (v >= rated && v < cutOut) {
        powerRatio = 1.0;
      }
      
      capacityFactor += probability * powerRatio;
    }

    // 7. Apply losses
    const lossFactors = { low: 0.95, medium: 0.90, high: 0.85 };
    const lossFactor = lossFactors[losses as keyof typeof lossFactors] || 0.90;

    // 8. Calculate energy outputs
    const grossAEP = rating * capacityFactor * 8760 * densityFactor; // Gross Annual Energy Production
    const netAEP = grossAEP * lossFactor; // Net after losses
    
    const averagePower = netAEP / 8760;
    const dailyGeneration = netAEP / 365;
    const monthlyGeneration = netAEP / 12;
    
    // 9. Financial calculations
    const selfConsumption = Math.min(netAEP, consumption * selfConsRate);
    const gridExport = netAEP - selfConsumption;
    const exportPrice = price * 0.75; // Assume 75% of import price for export
    const yearlyValue = (selfConsumption * price) + (gridExport * exportPrice);
    
    // 10. Environmental impact
    const co2Savings = netAEP * 0.193; // kg CO2 per kWh (UK grid factor 2024)
    
    // 11. Simple payback (assuming £3000/kW installed cost)
    const installCost = rating * 3000;
    const paybackPeriod = installCost / yearlyValue;

    setResult({
      grossAEP,
      netAEP,
      capacityFactor: capacityFactor * 100,
      averagePower,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration: netAEP,
      yearlyValue,
      selfConsumption,
      gridExport,
      co2Savings,
      paybackPeriod,
      windSpeedAtHub
    });
  };

  const reset = () => {
    setTurbineModel('');
    setHubHeight('');
    setAverageWindSpeed('');
    setWindClass('');
    setTerrain('');
    setAltitude('');
    setLosses('');
    setElectricityPrice('');
    setAnnualConsumption('');
    setSelfConsumptionRate('');
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
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Turbine Specification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileSelect
              label="Turbine Model"
              placeholder="Select turbine type"
              value={turbineModel}
              onValueChange={setTurbineModel}
              options={turbineModels}
            />
            
            <MobileSelect
              label="Hub Height"
              placeholder="Select hub height"
              value={hubHeight}
              onValueChange={setHubHeight}
              options={hubHeights}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Site Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              type="number"
              label="Average Wind Speed (at 10m)"
              placeholder="Enter wind speed"
              value={averageWindSpeed}
              onChange={(e) => setAverageWindSpeed(e.target.value)}
              unit="mph"
              step="0.1"
            />
            
            <MobileSelect
              label="Wind Resource Class"
              placeholder="Select wind class"
              value={windClass}
              onValueChange={setWindClass}
              options={windClasses}
            />
            
            <MobileSelect
              label="Terrain Type"
              placeholder="Select terrain"
              value={terrain}
              onValueChange={setTerrain}
              options={terrainTypes}
            />
            
            <MobileSelect
              label="Site Altitude"
              placeholder="Select altitude band"
              value={altitude}
              onValueChange={setAltitude}
              options={altitudeBands}
            />
            
            <MobileSelect
              label="System Losses"
              placeholder="Select loss category"
              value={losses}
              onValueChange={setLosses}
              options={lossesPresets}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Economic Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileSelect
              label="Electricity Import Price"
              placeholder="Select electricity price"
              value={electricityPrice}
              onValueChange={setElectricityPrice}
              options={electricityPrices}
            />
            
            <MobileSelect
              label="Annual Electricity Consumption"
              placeholder="Select consumption"
              value={annualConsumption}
              onValueChange={setAnnualConsumption}
              options={annualConsumptions}
            />
            
            <MobileSelect
              label="Self-Consumption Rate"
              placeholder="Select consumption rate"
              value={selfConsumptionRate}
              onValueChange={setSelfConsumptionRate}
              options={selfConsumptionRates}
            />
          </div>
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
          <div className="space-y-6">
            {/* Technical Performance */}
            <div className="p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Technical Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <span className="font-medium">Wind Speed at Hub Height:</span>
                  <span className="float-right">{(result.windSpeedAtHub * 2.23694).toFixed(1)} mph ({result.windSpeedAtHub.toFixed(1)} m/s)</span>
                </div>
                <div>
                  <span className="font-medium">Capacity Factor:</span>
                  <span className="float-right">{result.capacityFactor.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="font-medium">Gross AEP (P50):</span>
                  <span className="float-right">{result.grossAEP.toFixed(0)} kWh/year</span>
                </div>
                <div>
                  <span className="font-medium">Net AEP (after losses):</span>
                  <span className="float-right">{result.netAEP.toFixed(0)} kWh/year</span>
                </div>
                <div>
                  <span className="font-medium">Average Power Output:</span>
                  <span className="float-right">{result.averagePower.toFixed(2)} kW</span>
                </div>
                <div>
                  <span className="font-medium">Daily Average Generation:</span>
                  <span className="float-right">{result.dailyGeneration.toFixed(1)} kWh</span>
                </div>
              </div>
            </div>

            {/* Economic Analysis */}
            <div className="p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Economic Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <span className="font-medium">Self-Consumed Energy:</span>
                  <span className="float-right">{result.selfConsumption.toFixed(0)} kWh/year</span>
                </div>
                <div>
                  <span className="font-medium">Grid Export:</span>
                  <span className="float-right">{result.gridExport.toFixed(0)} kWh/year</span>
                </div>
                <div>
                  <span className="font-medium">Annual Savings:</span>
                  <span className="float-right">£{result.yearlyValue.toFixed(0)}</span>
                </div>
                <div>
                  <span className="font-medium">Simple Payback Period:</span>
                  <span className="float-right">{result.paybackPeriod.toFixed(1)} years</span>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Environmental Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <span className="font-medium">Annual CO₂ Savings:</span>
                  <span className="float-right">{result.co2Savings.toFixed(0)} kg CO₂</span>
                </div>
                <div>
                  <span className="font-medium">Equivalent Trees Planted:</span>
                  <span className="float-right">{(result.co2Savings / 21.8).toFixed(0)} trees/year</span>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-400/20">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">What This Means</h3>
              <div className="space-y-3 text-sm text-white">
                <p>
                  <strong>Capacity Factor ({result.capacityFactor.toFixed(1)}%):</strong> {
                    result.capacityFactor < 20 ? "Poor wind resource - turbine will run at low efficiency. Consider alternative location or technology." :
                    result.capacityFactor < 30 ? "Moderate wind resource - viable but not optimal. Ensure proper feasibility study." :
                    result.capacityFactor < 40 ? "Good wind resource - commercially viable installation with reasonable returns." :
                    "Excellent wind resource - highly profitable installation with strong returns."
                  }
                </p>
                <p>
                  <strong>Wind Speed at Hub:</strong> Your {hubHeight}m hub height increases wind speed from {averageWindSpeed}mph to {(result.windSpeedAtHub * 2.23694).toFixed(1)}mph, 
                  demonstrating the importance of turbine height for energy capture.
                </p>
                <p>
                  <strong>Financial Viability:</strong> With a {result.paybackPeriod.toFixed(1)}-year payback period, this installation {
                    result.paybackPeriod > 15 ? "may not be financially viable without grants or subsidies." :
                    result.paybackPeriod > 10 ? "shows moderate returns - consider incentives and long-term electricity price trends." :
                    "shows strong financial returns over the turbine's 20-25 year lifespan."
                  }
                </p>
              </div>
            </div>

            {/* BS 7671 & Planning Requirements */}
            <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-400/20">
              <h3 className="text-lg font-semibold mb-3 text-amber-400">BS 7671 & Planning Considerations</h3>
              <div className="space-y-3 text-sm text-white">
                <p><strong>Electrical Installation (BS 7671:2018+A2:2022):</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Install appropriate DC and AC isolators as per Section 537</li>
                  <li>Earthing and bonding must comply with Chapter 54</li>
                  <li>Surge protection required for wind installations (Chapter 44)</li>
                  <li>Cable sizing for voltage drop limits (Appendix 4)</li>
                  <li>RCD protection for final circuits (Chapter 41)</li>
                </ul>
                
                <p><strong>Planning Permission:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Turbines {'>'}15m height typically require full planning permission</li>
                  <li>Permitted development rights may apply for smaller installations</li>
                  <li>Noise assessment required - typically 45dB limit at nearest property</li>
                  <li>Shadow flicker analysis may be required</li>
                  <li>Consider aviation lighting requirements for installations {'>'}15m</li>
                </ul>

                <p><strong>Grid Connection:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>G98 application for systems ≤16A per phase</li>
                  <li>G99 application for larger systems - DNO approval required</li>
                  <li>Export limitation may be required in weak grid areas</li>
                  <li>Consider power quality requirements (voltage, frequency, harmonics)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            <strong>Important:</strong> This calculator provides preliminary estimates only. Professional wind resource assessment 
            with anemometer data over 12+ months is essential for commercial viability. Consider local planning restrictions, 
            noise regulations, and grid connection requirements. All electrical work must be carried out by qualified electricians 
            in accordance with BS 7671:2018+A2:2022.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default WindPowerCalculator;