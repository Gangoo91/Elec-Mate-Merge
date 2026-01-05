import React, { useState } from 'react';
import { Calculator, TrendingUp, PoundSterling, Lightbulb, Percent, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RenewableEnergyFinancialCalculators = () => {
  // Active calculator state
  const [activeCalculator, setActiveCalculator] = useState('roi');

  // ROI & Payback Calculator State (2025/26 values)
  const [roiValues, setRoiValues] = useState({
    systemCost: 9500, // Updated 2025/26 average domestic system cost
    annualSavings: 950, // Increased with higher electricity prices
    segPayments: 320, // Updated to reflect current SEG rates (12p/kWh average)
    maintenanceCosts: 120, // Slight increase for inflation
    inflationRate: 3,
    systemLifespan: 25,
    discountRate: 4.5 // Updated base rate
  });

  // System Sizing & Cost Comparison State (2025/26 values)
  const [sizingValues, setSizingValues] = useState({
    propertyType: 'domestic',
    annualUsage: 4200, // Average UK domestic usage
    roofSpace: 40,
    location: 'central',
    systemSize: 4.2 // Updated average system size
  });

  // NPV & IRR Calculator State (2025/26 values)
  const [npvValues, setNpvValues] = useState({
    initialInvestment: 9500, // Updated 2025/26 system cost
    annualCashFlow: 1070, // Higher cash flow with updated rates
    systemLife: 25,
    discountRate: 4.5, // Updated discount rate
    inverterReplacementYear: 12,
    inverterCost: 2200 // Inflation-adjusted inverter cost
  });

  // Yield Estimation Calculator State
  const [yieldValues, setYieldValues] = useState({
    systemSize: 4,
    location: 'central',
    orientation: 'south',
    tilt: 35,
    shadingFactor: 95
  });

  // Grant & Incentive Calculator State (2025/26 values)
  const [grantValues, setGrantValues] = useState({
    baseSystemCost: 9500, // Updated 2025/26 system cost
    propertyType: 'domestic',
    businessType: 'none',
    availableGrants: 0,
    vatRegistered: false
  });

  // ROI & Payback Calculations
  const calculateROI = () => {
    const annualBenefit = roiValues.annualSavings + roiValues.segPayments - roiValues.maintenanceCosts;
    const totalBenefit = annualBenefit * roiValues.systemLifespan;
    const roi = ((totalBenefit - roiValues.systemCost) / roiValues.systemCost) * 100;
    const simplePayback = roiValues.systemCost / annualBenefit;
    
    // Discounted payback calculation
    let cumulativeCashFlow = -roiValues.systemCost;
    let discountedPayback = 0;
    for (let year = 1; year <= roiValues.systemLifespan; year++) {
      const discountedCashFlow = annualBenefit / Math.pow(1 + roiValues.discountRate / 100, year);
      cumulativeCashFlow += discountedCashFlow;
      if (cumulativeCashFlow >= 0 && discountedPayback === 0) {
        discountedPayback = year;
      }
    }

    return {
      roi: roi.toFixed(1),
      simplePayback: simplePayback.toFixed(1),
      discountedPayback: discountedPayback || '>25',
      annualBenefit: annualBenefit.toFixed(0),
      totalBenefit: totalBenefit.toFixed(0)
    };
  };

  // System Sizing Calculations (Updated for 2025/26)
  const calculateSystemSizing = () => {
    // Updated 2025/26 pricing per kW
    const costPerKw = sizingValues.propertyType === 'domestic' ? 2250 : 1650;
    const estimatedCost = sizingValues.systemSize * costPerKw;
    const annualGeneration = sizingValues.systemSize * 900; // kWh per kW
    const selfConsumption = sizingValues.propertyType === 'domestic' ? 0.4 : 0.7;
    // Updated electricity rates: 32p/kWh consumption, 12p/kWh SEG export
    const annualSavings = (annualGeneration * selfConsumption * 0.32) + (annualGeneration * (1 - selfConsumption) * 0.12);
    
    return {
      estimatedCost: estimatedCost.toLocaleString(),
      costPerKw: costPerKw.toLocaleString(),
      annualGeneration: annualGeneration.toLocaleString(),
      annualSavings: annualSavings.toFixed(0),
      payback: (estimatedCost / annualSavings).toFixed(1)
    };
  };

  // NPV Calculation
  const calculateNPV = () => {
    let npv = -npvValues.initialInvestment;
    let totalCashFlow = 0;
    
    for (let year = 1; year <= npvValues.systemLife; year++) {
      let cashFlow = npvValues.annualCashFlow;
      
      // Inverter replacement
      if (year === npvValues.inverterReplacementYear) {
        cashFlow -= npvValues.inverterCost;
      }
      
      // Panel degradation (0.5% per year)
      cashFlow *= (1 - (year - 1) * 0.005);
      
      const discountedCashFlow = cashFlow / Math.pow(1 + npvValues.discountRate / 100, year);
      npv += discountedCashFlow;
      totalCashFlow += cashFlow;
    }

    // IRR calculation (simplified)
    const irr = ((totalCashFlow / npvValues.initialInvestment) ** (1 / npvValues.systemLife) - 1) * 100;

    return {
      npv: npv.toFixed(0),
      irr: irr.toFixed(1),
      totalCashFlow: totalCashFlow.toFixed(0)
    };
  };

  // Yield Estimation Calculation (Updated for 2025/26)
  const calculateYield = () => {
    const baseYield = 900; // kWh per kW for central UK
    const locationMultiplier = yieldValues.location === 'north' ? 0.9 : yieldValues.location === 'south' ? 1.1 : 1.0;
    const orientationMultiplier = yieldValues.orientation === 'south' ? 1.0 : yieldValues.orientation === 'southeast' ? 0.95 : 0.85;
    const tiltMultiplier = Math.abs(yieldValues.tilt - 35) < 10 ? 1.0 : 0.95;
    const shadingMultiplier = yieldValues.shadingFactor / 100;
    
    const annualYield = baseYield * locationMultiplier * orientationMultiplier * tiltMultiplier * shadingMultiplier * yieldValues.systemSize;
    const monthlyYield = annualYield / 12;
    // Updated 2025/26 UK grid carbon intensity: 0.193 kg CO2/kWh
    const co2Savings = annualYield * 0.193;
    
    return {
      annualYield: annualYield.toFixed(0),
      monthlyYield: monthlyYield.toFixed(0),
      co2Savings: co2Savings.toFixed(0),
      equivalentTrees: (co2Savings / 22).toFixed(0)
    };
  };

  // Grant & Incentive Calculation (Updated for 2025/26)
  const calculateIncentives = () => {
    let netCost = grantValues.baseSystemCost - grantValues.availableGrants;
    
    // Updated VAT rules for 2025/26: 0% VAT on domestic solar systems under 12kW
    if (grantValues.propertyType === 'domestic') {
      // Domestic systems qualify for 0% VAT
      netCost = netCost; // No VAT to remove as it's already 0%
    } else if (grantValues.vatRegistered && grantValues.propertyType === 'commercial') {
      netCost *= 0.83; // Remove VAT for VAT-registered commercial
    }

    const vatSavings = grantValues.propertyType === 'domestic' ? 
      grantValues.baseSystemCost * 0.20 : // 20% VAT saving on domestic
      (grantValues.vatRegistered && grantValues.propertyType === 'commercial' ? 
        grantValues.baseSystemCost * 0.17 : 0);

    return {
      grossCost: grantValues.baseSystemCost.toLocaleString(),
      grantReduction: grantValues.availableGrants.toLocaleString(),
      vatSavings: vatSavings.toFixed(0),
      netCost: netCost.toFixed(0),
      totalSavings: (grantValues.baseSystemCost - netCost + vatSavings).toFixed(0)
    };
  };

  const roiResults = calculateROI();
  const sizingResults = calculateSystemSizing();
  const npvResults = calculateNPV();
  const yieldResults = calculateYield();
  const incentiveResults = calculateIncentives();

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-6 w-6 text-elec-yellow" />
          Financial Calculator Suite
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="calculator-select" className="text-gray-300 mb-2 block">Select Calculator</Label>
          <Select value={activeCalculator} onValueChange={setActiveCalculator}>
            <SelectTrigger className="w-full bg-elec-dark border-gray-600 text-gray-300">
              <SelectValue placeholder="Choose a calculator" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-gray-600 z-50">
              <SelectItem value="roi" className="text-gray-300 focus:bg-elec-yellow focus:text-elec-dark">
                ROI & Payback
              </SelectItem>
              <SelectItem value="sizing" className="text-gray-300 focus:bg-elec-yellow focus:text-elec-dark">
                System Sizing
              </SelectItem>
              <SelectItem value="npv" className="text-gray-300 focus:bg-elec-yellow focus:text-elec-dark">
                NPV & IRR
              </SelectItem>
              <SelectItem value="yield" className="text-gray-300 focus:bg-elec-yellow focus:text-elec-dark">
                Yield Estimation
              </SelectItem>
              <SelectItem value="incentives" className="text-gray-300 focus:bg-elec-yellow focus:text-elec-dark">
                Grants & Incentives
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeCalculator === 'roi' && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="systemCost" className="text-gray-300">System Cost (£)</Label>
                  <Input
                    id="systemCost"
                    type="number"
                    value={roiValues.systemCost}
                    onChange={(e) => setRoiValues({...roiValues, systemCost: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualSavings" className="text-gray-300">Annual Electricity Savings (£)</Label>
                  <Input
                    id="annualSavings"
                    type="number"
                    value={roiValues.annualSavings}
                    onChange={(e) => setRoiValues({...roiValues, annualSavings: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="segPayments" className="text-gray-300">Annual SEG Payments (£)</Label>
                  <Input
                    id="segPayments"
                    type="number"
                    value={roiValues.segPayments}
                    onChange={(e) => setRoiValues({...roiValues, segPayments: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenanceCosts" className="text-gray-300">Annual Maintenance (£)</Label>
                  <Input
                    id="maintenanceCosts"
                    type="number"
                    value={roiValues.maintenanceCosts}
                    onChange={(e) => setRoiValues({...roiValues, maintenanceCosts: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountRate" className="text-gray-300">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.1"
                    value={roiValues.discountRate}
                    onChange={(e) => setRoiValues({...roiValues, discountRate: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Financial Results</h3>
                
                <div className="bg-elec-dark p-4 rounded border border-gray-600 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">25-Year ROI:</span>
                    <span className="text-elec-yellow font-semibold text-lg">{roiResults.roi}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Simple Payback:</span>
                    <span className="text-foreground font-semibold">{roiResults.simplePayback} years</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Discounted Payback:</span>
                    <span className="text-foreground font-semibold">{roiResults.discountedPayback} years</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Benefit:</span>
                    <span className="text-green-400 font-semibold">£{roiResults.annualBenefit}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total 25-Year Benefit:</span>
                    <span className="text-green-400 font-semibold">£{roiResults.totalBenefit}</span>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/20 rounded-md p-3">
                  <p className="text-blue-400 text-sm">
                    <strong>2025/26 Update:</strong> Calculations reflect current SEG rates (12p/kWh average), electricity prices (32p/kWh), and include 0.5% annual panel degradation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'sizing' && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Design</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-gray-300">Property Type</Label>
                  <select
                    id="propertyType"
                    value={sizingValues.propertyType}
                    onChange={(e) => setSizingValues({...sizingValues, propertyType: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-elec-dark px-3 py-2 text-gray-300"
                  >
                    <option value="domestic">Domestic</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systemSize" className="text-gray-300">System Size (kW)</Label>
                  <Input
                    id="systemSize"
                    type="number"
                    step="0.5"
                    value={sizingValues.systemSize}
                    onChange={(e) => setSizingValues({...sizingValues, systemSize: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualUsage" className="text-gray-300">Annual Electricity Usage (kWh)</Label>
                  <Input
                    id="annualUsage"
                    type="number"
                    value={sizingValues.annualUsage}
                    onChange={(e) => setSizingValues({...sizingValues, annualUsage: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <select
                    id="location"
                    value={sizingValues.location}
                    onChange={(e) => setSizingValues({...sizingValues, location: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-elec-dark px-3 py-2 text-gray-300"
                  >
                    <option value="north">Northern England</option>
                    <option value="central">Central England</option>
                    <option value="south">Southern England</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Cost Analysis</h3>
                
                <div className="bg-elec-dark p-4 rounded border border-gray-600 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Estimated Cost:</span>
                    <span className="text-elec-yellow font-semibold text-lg">£{sizingResults.estimatedCost}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cost per kW:</span>
                    <span className="text-foreground font-semibold">£{sizingResults.costPerKw}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Generation:</span>
                    <span className="text-green-400 font-semibold">{sizingResults.annualGeneration} kWh</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Savings:</span>
                    <span className="text-green-400 font-semibold">£{sizingResults.annualSavings}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Payback Period:</span>
                    <span className="text-blue-400 font-semibold">{sizingResults.payback} years</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h4 className="text-green-400 font-medium mb-2">Domestic Systems</h4>
                    <ul className="text-gray-300 space-y-1 text-xs">
                      <li>• £2,000-2,500 per kW</li>
                      <li>• 40% self-consumption</li>
                      <li>• Evening peak demand</li>
                      <li>• Simple planning</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                    <h4 className="text-blue-400 font-medium mb-2">Commercial Systems</h4>
                    <ul className="text-gray-300 space-y-1 text-xs">
                      <li>• £1,500-2,000 per kW</li>
                      <li>• 70% self-consumption</li>
                      <li>• Daytime peak demand</li>
                      <li>• Complex planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'npv' && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Investment Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="initialInvestment" className="text-gray-300">Initial Investment (£)</Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={npvValues.initialInvestment}
                    onChange={(e) => setNpvValues({...npvValues, initialInvestment: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualCashFlow" className="text-gray-300">Annual Cash Flow (£)</Label>
                  <Input
                    id="annualCashFlow"
                    type="number"
                    value={npvValues.annualCashFlow}
                    onChange={(e) => setNpvValues({...npvValues, annualCashFlow: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="npvDiscountRate" className="text-gray-300">Discount Rate (%)</Label>
                  <Input
                    id="npvDiscountRate"
                    type="number"
                    step="0.1"
                    value={npvValues.discountRate}
                    onChange={(e) => setNpvValues({...npvValues, discountRate: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inverterReplacementYear" className="text-gray-300">Inverter Replacement Year</Label>
                  <Input
                    id="inverterReplacementYear"
                    type="number"
                    value={npvValues.inverterReplacementYear}
                    onChange={(e) => setNpvValues({...npvValues, inverterReplacementYear: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inverterCost" className="text-gray-300">Inverter Replacement Cost (£)</Label>
                  <Input
                    id="inverterCost"
                    type="number"
                    value={npvValues.inverterCost}
                    onChange={(e) => setNpvValues({...npvValues, inverterCost: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Financial Metrics</h3>
                
                <div className="bg-elec-dark p-4 rounded border border-gray-600 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Net Present Value:</span>
                    <span className={`font-semibold text-lg ${Number(npvResults.npv) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      £{npvResults.npv}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Internal Rate of Return:</span>
                    <span className="text-elec-yellow font-semibold">{npvResults.irr}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Cash Flow:</span>
                    <span className="text-green-400 font-semibold">£{npvResults.totalCashFlow}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-3">
                    <h4 className="text-purple-400 font-medium mb-2">NPV Interpretation:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Positive NPV = Profitable investment</li>
                      <li>• Higher NPV = Better investment</li>
                      <li>• Includes time value of money</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-3">
                    <h4 className="text-orange-400 font-medium mb-2">IRR Interpretation:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Compare to cost of capital</li>
                      <li>• Higher IRR = Better return</li>
                      <li>• Accounts for project risk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'yield' && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Configuration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="yieldSystemSize" className="text-gray-300">System Size (kW)</Label>
                  <Input
                    id="yieldSystemSize"
                    type="number"
                    step="0.5"
                    value={yieldValues.systemSize}
                    onChange={(e) => setYieldValues({...yieldValues, systemSize: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yieldLocation" className="text-gray-300">Location</Label>
                  <select
                    id="yieldLocation"
                    value={yieldValues.location}
                    onChange={(e) => setYieldValues({...yieldValues, location: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-elec-dark px-3 py-2 text-gray-300"
                  >
                    <option value="north">Northern England (810 kWh/kW)</option>
                    <option value="central">Central England (900 kWh/kW)</option>
                    <option value="south">Southern England (990 kWh/kW)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orientation" className="text-gray-300">Panel Orientation</Label>
                  <select
                    id="orientation"
                    value={yieldValues.orientation}
                    onChange={(e) => setYieldValues({...yieldValues, orientation: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-elec-dark px-3 py-2 text-gray-300"
                  >
                    <option value="south">South (Optimal)</option>
                    <option value="southeast">Southeast/Southwest</option>
                    <option value="east">East/West</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tilt" className="text-gray-300">Tilt Angle (degrees)</Label>
                  <Input
                    id="tilt"
                    type="number"
                    min="0"
                    max="90"
                    value={yieldValues.tilt}
                    onChange={(e) => setYieldValues({...yieldValues, tilt: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shadingFactor" className="text-gray-300">Shading Factor (%)</Label>
                  <Input
                    id="shadingFactor"
                    type="number"
                    min="0"
                    max="100"
                    value={yieldValues.shadingFactor}
                    onChange={(e) => setYieldValues({...yieldValues, shadingFactor: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Yield Estimation Results</h3>
                
                <div className="bg-elec-dark p-4 rounded border border-gray-600 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Generation:</span>
                    <span className="text-elec-yellow font-semibold text-lg">{yieldResults.annualYield} kWh</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monthly Average:</span>
                    <span className="text-foreground font-semibold">{yieldResults.monthlyYield} kWh</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">CO₂ Savings:</span>
                    <span className="text-green-400 font-semibold">{yieldResults.co2Savings} kg/year</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Tree Equivalent:</span>
                    <span className="text-green-400 font-semibold">{yieldResults.equivalentTrees} trees</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-md p-3">
                    <h4 className="text-green-400 font-medium mb-2">Optimisation Tips:</h4>
                    <ul className="text-gray-300 space-y-1 text-xs">
                      <li>• South-facing orientation is optimal</li>
                      <li>• 30-40° tilt angle for UK</li>
                      <li>• Minimise shading for best yield</li>
                      <li>• Consider seasonal shading patterns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-md p-3">
                    <h4 className="text-blue-400 font-medium mb-2">Environmental Impact:</h4>
                    <ul className="text-gray-300 space-y-1 text-xs">
                      <li>• 0.2 kg CO₂ saved per kWh</li>
                      <li>• 22 kg CO₂ absorbed per tree/year</li>
                      <li>• Payback carbon debt in 2-3 years</li>
                      <li>• 25-year carbon benefit significant</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'incentives' && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Grant & Incentive Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="baseSystemCost" className="text-gray-300">Base System Cost (£)</Label>
                  <Input
                    id="baseSystemCost"
                    type="number"
                    value={grantValues.baseSystemCost}
                    onChange={(e) => setGrantValues({...grantValues, baseSystemCost: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grantPropertyType" className="text-gray-300">Property Type</Label>
                  <select
                    id="grantPropertyType"
                    value={grantValues.propertyType}
                    onChange={(e) => setGrantValues({...grantValues, propertyType: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-elec-dark px-3 py-2 text-gray-300"
                  >
                    <option value="domestic">Domestic</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availableGrants" className="text-gray-300">Available Grants (£)</Label>
                  <Input
                    id="availableGrants"
                    type="number"
                    value={grantValues.availableGrants}
                    onChange={(e) => setGrantValues({...grantValues, availableGrants: Number(e.target.value)})}
                    className="bg-elec-dark border-gray-600 text-gray-300"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vatRegistered"
                    checked={grantValues.vatRegistered}
                    onChange={(e) => setGrantValues({...grantValues, vatRegistered: e.target.checked})}
                    className="h-4 w-4 text-elec-yellow border-gray-600 bg-elec-dark"
                  />
                  <Label htmlFor="vatRegistered" className="text-gray-300">VAT Registered Business</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown</h3>
                
                <div className="bg-elec-dark p-4 rounded border border-gray-600 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Gross System Cost:</span>
                    <span className="text-foreground font-semibold">£{incentiveResults.grossCost}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Grant Reduction:</span>
                    <span className="text-green-400 font-semibold">-£{incentiveResults.grantReduction}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">VAT Savings:</span>
                    <span className="text-green-400 font-semibold">-£{incentiveResults.vatSavings}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Net Cost:</span>
                      <span className="text-elec-yellow font-semibold text-lg">£{incentiveResults.netCost}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Savings:</span>
                    <span className="text-green-400 font-semibold">£{incentiveResults.totalSavings}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-3">
                    <h4 className="text-yellow-400 font-medium mb-2">Available Grants 2025/26:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• ECO4 scheme (eligible households)</li>
                      <li>• Local Authority grants (varies by region)</li>
                      <li>• Business energy efficiency grants</li>
                      <li>• Community energy funding schemes</li>
                      <li>• Renewable Heat Incentive (where applicable)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-3">
                    <h4 className="text-purple-400 font-medium mb-2">VAT Rules 2025/26:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Domestic solar: 0% VAT (systems under 12kW)</li>
                      <li>• Commercial: 20% VAT (reclaimable if VAT registered)</li>
                      <li>• Installation must be MCS certified</li>
                      <li>• Storage systems: 0% VAT when installed with solar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RenewableEnergyFinancialCalculators;