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
  costEstimate: {
    totalCost: number;
    breakdown: {
      turbine: number;
      tower: number;
      foundation: number;
      electrical: number;
      planning: number;
      installation: number;
      commissioning: number;
      vat: number;
    };
    costPerKw: number;
    category: string;
    annualMaintenance: number;
  };
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

  const calculateCostEstimate = (rating: number, height: number) => {
    // 2025 UK Wind Turbine Cost Estimates
    let baseCostPerKw = 0;
    let category = "";
    
    // Cost per kW based on turbine size (economies of scale)
    if (rating <= 5) {
      baseCostPerKw = 4500; // Small domestic turbines
      category = "Small Domestic System";
    } else if (rating <= 15) {
      baseCostPerKw = 3500; // Medium domestic/small commercial
      category = "Medium Domestic System";
    } else if (rating <= 30) {
      baseCostPerKw = 2800; // Small commercial
      category = "Small Commercial System";
    } else {
      baseCostPerKw = 2200; // Large commercial
      category = "Commercial System";
    }

    // Component breakdown (2025 costs)
    const turbine = rating * baseCostPerKw * 0.45; // 45% turbine cost
    const tower = Math.max(15000, height * 800); // Minimum £15k or £800/m
    const foundation = Math.max(8000, rating * 600); // Minimum £8k or £600/kW
    const electrical = 5000 + (rating * 400); // Base £5k + £400/kW
    const planning = rating <= 10 ? 3000 : 8000; // Planning costs
    const installation = rating * 800; // Installation labour
    const commissioning = Math.max(2000, rating * 150); // Commissioning
    
    const subtotal = turbine + tower + foundation + electrical + planning + installation + commissioning;
    const vat = subtotal * 0.20; // 20% VAT on wind installations
    const totalCost = subtotal + vat;

    // Annual maintenance (2-4% of CAPEX)
    const annualMaintenance = totalCost * 0.03;

    return {
      totalCost: Math.round(totalCost),
      breakdown: {
        turbine: Math.round(turbine),
        tower: Math.round(tower),
        foundation: Math.round(foundation),
        electrical: Math.round(electrical),
        planning: Math.round(planning),
        installation: Math.round(installation),
        commissioning: Math.round(commissioning),
        vat: Math.round(vat)
      },
      costPerKw: Math.round(totalCost / rating),
      category,
      annualMaintenance: Math.round(annualMaintenance)
    };
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
    
    // 10. Get realistic cost estimate
    const costEstimate = calculateCostEstimate(rating, height);
    
    // 11. Environmental impact
    const co2Savings = netAEP * 0.193; // kg CO2 per kWh (UK grid factor 2024)
    
    // 12. Payback calculation using realistic costs
    const paybackPeriod = costEstimate.totalCost / yearlyValue;

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
      windSpeedAtHub,
      costEstimate
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
            <div className="p-6 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold mb-6 text-elec-yellow flex items-center gap-2">
                <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                Technical Performance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Wind Speed at Hub Height</div>
                  <div className="text-lg font-semibold text-white">
                    {(result.windSpeedAtHub * 2.23694).toFixed(1)} mph
                  </div>
                  <div className="text-xs text-muted-foreground">({result.windSpeedAtHub.toFixed(1)} m/s)</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Capacity Factor</div>
                  <div className="text-lg font-semibold text-white">{result.capacityFactor.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">
                    {result.capacityFactor < 20 ? "Poor" : result.capacityFactor < 30 ? "Moderate" : result.capacityFactor < 40 ? "Good" : "Excellent"}
                  </div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Average Power Output</div>
                  <div className="text-lg font-semibold text-white">{result.averagePower.toFixed(2)} kW</div>
                  <div className="text-xs text-muted-foreground">Continuous average</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Gross AEP (P50)</div>
                  <div className="text-lg font-semibold text-white">{result.grossAEP.toLocaleString()} kWh/year</div>
                  <div className="text-xs text-muted-foreground">Before losses</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Net AEP</div>
                  <div className="text-lg font-semibold text-white">{result.netAEP.toLocaleString()} kWh/year</div>
                  <div className="text-xs text-muted-foreground">After losses</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Daily Average</div>
                  <div className="text-lg font-semibold text-white">{result.dailyGeneration.toFixed(1)} kWh</div>
                  <div className="text-xs text-muted-foreground">Per day</div>
                </div>
              </div>
            </div>

            {/* Economic Analysis */}
            <div className="p-6 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold mb-6 text-elec-yellow flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Economic Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Self-Consumed Energy</div>
                  <div className="text-lg font-semibold text-white">{result.selfConsumption.toLocaleString()} kWh/year</div>
                  <div className="text-xs text-green-400">Maximum value</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Grid Export</div>
                  <div className="text-lg font-semibold text-white">{result.gridExport.toLocaleString()} kWh/year</div>
                  <div className="text-xs text-muted-foreground">To grid</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Annual Savings</div>
                  <div className="text-lg font-semibold text-green-400">£{result.yearlyValue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Per year</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                  <div className="text-lg font-semibold text-white">{result.paybackPeriod.toFixed(1)} years</div>
                  <div className="text-xs text-muted-foreground">
                    {result.paybackPeriod > 15 ? "Poor ROI" : result.paybackPeriod > 10 ? "Moderate ROI" : "Good ROI"}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Cost Estimate Section */}
            <div className="p-6 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold mb-6 text-elec-yellow flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                2025 Installation Cost Estimate
              </h3>
              
              {/* Mobile-First Stacked Layout */}
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-elec-yellow mb-1">£{result.costEstimate.totalCost.toLocaleString()}</p>
                  <p className="text-base text-white font-medium">Total System Cost</p>
                  <p className="text-sm text-white/60">{result.costEstimate.category}</p>
                </div>
                
                <div className="text-center pt-2">
                  <p className="text-2xl font-bold text-yellow-400 mb-1">£{result.costEstimate.costPerKw.toLocaleString()}</p>
                  <p className="text-base text-white font-medium">Cost per kW</p>
                  <p className="text-sm text-white/60">Including VAT & installation</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-base font-semibold text-white mb-3">Cost Breakdown:</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Turbine:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.turbine.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Tower:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.tower.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Foundation:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.foundation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Electrical:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.electrical.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Planning:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.planning.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Installation:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.installation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/80">Commissioning:</span>
                    <span className="text-white font-semibold">£{result.costEstimate.breakdown.commissioning.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-elec-yellow/20">
                  <span className="text-white font-medium">VAT (20%):</span>
                  <span className="text-elec-yellow font-bold text-lg">£{result.costEstimate.breakdown.vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/80">Annual Maintenance:</span>
                  <span className="text-yellow-400 font-semibold">£{result.costEstimate.annualMaintenance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="p-6 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold mb-6 text-elec-yellow flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Environmental Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Annual CO₂ Savings</div>
                  <div className="text-lg font-semibold text-green-400">{result.co2Savings.toLocaleString()} kg CO₂</div>
                  <div className="text-xs text-muted-foreground">Per year</div>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg border border-border/20">
                  <div className="text-sm text-muted-foreground mb-1">Equivalent Trees Planted</div>
                  <div className="text-lg font-semibold text-green-400">{(result.co2Savings / 21.8).toFixed(0)} trees/year</div>
                  <div className="text-xs text-muted-foreground">Carbon offset equivalent</div>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-400/20">
              <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                What This Means
              </h3>
              <div className="space-y-4">
                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-white mb-2">Capacity Factor ({result.capacityFactor.toFixed(1)}%)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.capacityFactor < 20 ? "Poor wind resource - turbine will run at low efficiency. Consider alternative location or technology." :
                    result.capacityFactor < 30 ? "Moderate wind resource - viable but not optimal. Ensure proper feasibility study." :
                    result.capacityFactor < 40 ? "Good wind resource - commercially viable installation with reasonable returns." :
                    "Excellent wind resource - highly profitable installation with strong returns."}
                  </p>
                </div>
                
                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-white mb-2">Wind Speed Enhancement</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your {hubHeight}m hub height increases wind speed from {averageWindSpeed}mph to {(result.windSpeedAtHub * 2.23694).toFixed(1)}mph, 
                    demonstrating the importance of turbine height for energy capture.
                  </p>
                </div>
                
                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-white mb-2">Financial Viability</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With a {result.paybackPeriod.toFixed(1)}-year payback period, this installation {
                      result.paybackPeriod > 15 ? "may not be financially viable without grants or subsidies." :
                      result.paybackPeriod > 10 ? "shows moderate returns - consider incentives and long-term electricity price trends." :
                      "shows strong financial returns over the turbine's 20-25 year lifespan."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* BS 7671 & Planning Requirements */}
            <div className="p-6 bg-amber-900/20 rounded-lg border border-amber-400/20">
              <h3 className="text-xl font-semibold mb-6 text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                BS 7671 & Planning Considerations
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-amber-400 mb-3">Electrical Installation (BS 7671:2018+A3:2024)</h4>
                  <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
                    <li>Install appropriate DC and AC isolators as per Section 537</li>
                    <li>Earthing and bonding must comply with Chapter 54</li>
                    <li>Surge protection required for wind installations (Chapter 44)</li>
                    <li>Cable sizing for voltage drop limits (Appendix 4)</li>
                    <li>RCD protection for final circuits (Chapter 41)</li>
                  </ul>
                </div>

                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-amber-400 mb-3">Planning Permission</h4>
                  <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
                    <li>Turbines {'>'}15m height typically require full planning permission</li>
                    <li>Permitted development rights may apply for smaller installations</li>
                    <li>Noise assessment required - typically 45dB limit at nearest property</li>
                    <li>Shadow flicker analysis may be required</li>
                    <li>Consider aviation lighting requirements for installations {'>'}15m</li>
                  </ul>
                </div>

                <div className="bg-background/30 p-4 rounded-lg border border-border/10">
                  <h4 className="font-semibold text-amber-400 mb-3">Grid Connection</h4>
                  <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
                    <li>G98 application for systems ≤16A per phase</li>
                    <li>G99 application for larger systems - DNO approval required</li>
                    <li>Export limitation may be required in weak grid areas</li>
                    <li>Consider power quality requirements (voltage, frequency, harmonics)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            <strong>Important:</strong> This calculator provides preliminary estimates only. Professional wind resource assessment 
            with anemometer data over 12+ months is essential for commercial viability. Consider local planning restrictions, 
            noise regulations, and grid connection requirements. All electrical work must be carried out by qualified electricians 
            in accordance with BS 7671:2018+A3:2024.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default WindPowerCalculator;