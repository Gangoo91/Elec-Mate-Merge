import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle, AlertTriangle, Info, Droplets, Zap, Calculator, Wrench } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Pipe material data with hydraulic properties
const PIPE_MATERIALS = [
  { value: 'hdpe', label: 'HDPE', roughness: 0.0000015, hwCoeff: 150, manning: 0.011 },
  { value: 'upvc', label: 'uPVC', roughness: 0.0000015, hwCoeff: 150, manning: 0.011 },
  { value: 'steel', label: 'Steel', roughness: 0.000045, hwCoeff: 120, manning: 0.013 },
  { value: 'grp', label: 'GRP/Fibreglass', roughness: 0.000005, hwCoeff: 145, manning: 0.012 },
  { value: 'concrete', label: 'Concrete', roughness: 0.0003, hwCoeff: 100, manning: 0.015 },
];

// Flow unit options
const FLOW_UNITS = [
  { value: 'm3s', label: 'm³/s', factor: 1 },
  { value: 'ls', label: 'L/s', factor: 0.001 },
  { value: 'gpm', label: 'US gpm', factor: 0.0000630902 },
];

// Loss model options
const LOSS_MODELS = [
  { value: 'darcy', label: 'Darcy-Weisbach (Recommended)' },
  { value: 'hazen', label: 'Hazen-Williams' },
  { value: 'manning', label: 'Manning Equation' },
];

// Seasonal patterns with capacity factors
const SEASONAL_PATTERNS = [
  { value: 'stable', label: 'Stable (Springs/regulated)', capacityFactor: 0.8 },
  { value: 'moderate', label: 'Moderate variation (±30%)', capacityFactor: 0.65 },
  { value: 'high', label: 'High variation (±50%)', capacityFactor: 0.5 },
  { value: 'extreme', label: 'Extreme variation (>±70%)', capacityFactor: 0.35 },
];

// Turbine types with realistic efficiency ranges
const TURBINE_TYPES = [
  { 
    value: 'pelton', 
    label: 'Pelton Wheel', 
    efficiency: 0.88, 
    headMin: 50, 
    headMax: 1500,
    description: 'High head, low flow'
  },
  { 
    value: 'turgo', 
    label: 'Turgo', 
    efficiency: 0.85, 
    headMin: 30, 
    headMax: 300,
    description: 'Medium-high head'
  },
  { 
    value: 'crossflow', 
    label: 'Cross-flow (Banki)', 
    efficiency: 0.75, 
    headMin: 3, 
    headMax: 200,
    description: 'Variable flow tolerance'
  },
  { 
    value: 'francis', 
    label: 'Francis', 
    efficiency: 0.87, 
    headMin: 10, 
    headMax: 350,
    description: 'Medium head and flow'
  },
  { 
    value: 'kaplan', 
    label: 'Kaplan', 
    efficiency: 0.90, 
    headMin: 2, 
    headMax: 40,
    description: 'Low head, high flow'
  },
  { 
    value: 'propeller', 
    label: 'Propeller', 
    efficiency: 0.85, 
    headMin: 1, 
    headMax: 10,
    description: 'Very low head'
  },
  { 
    value: 'archimedes', 
    label: 'Archimedes Screw', 
    efficiency: 0.82, 
    headMin: 1, 
    headMax: 10,
    description: 'Fish-friendly, debris tolerant'
  },
];

// Grid connection types
const GRID_CONNECTIONS = [
  { value: 'grid_tie', label: 'Grid-tie with export' },
  { value: 'off_grid', label: 'Off-grid with batteries' },
  { value: 'direct_use', label: 'Direct use (heating/pumping)' },
];

// Electricity price presets
const ELECTRICITY_PRICES = [
  { value: '0.22', label: '22p/kWh (Economy rate)' },
  { value: '0.28', label: '28p/kWh (Standard rate)' },
  { value: '0.35', label: '35p/kWh (Premium rate)' },
  { value: 'custom', label: 'Custom price' },
];

// System cost presets
const SYSTEM_COSTS = [
  { value: '5000', label: '£5,000 (Micro system)' },
  { value: '15000', label: '£15,000 (Small system)' },
  { value: '35000', label: '£35,000 (Medium system)' },
  { value: '75000', label: '£75,000 (Large system)' },
  { value: 'custom', label: 'Custom cost' },
];

// Quick presets for common scenarios
const QUICK_PRESETS = [
  {
    name: 'High-head Pelton (Mountain stream)',
    flow: '0.05',
    flowUnit: 'm3s',
    head: '150',
    length: '200',
    diameter: '0.3',
    material: 'hdpe',
    seasonal: 'moderate',
    turbine: 'pelton',
  },
  {
    name: 'Medium-head Francis (River weir)',
    flow: '0.5',
    flowUnit: 'm3s',
    head: '25',
    length: '50',
    diameter: '0.8',
    material: 'steel',
    seasonal: 'high',
    turbine: 'francis',
  },
  {
    name: 'Low-head Kaplan (Mill race)',
    flow: '2.0',
    flowUnit: 'm3s',
    head: '5',
    length: '20',
    diameter: '1.2',
    material: 'concrete',
    seasonal: 'stable',
    turbine: 'kaplan',
  },
];

interface HydraulicResult {
  velocity: number;
  reynolds: number;
  frictionFactor: number;
  frictionLoss: number;
  minorLoss: number;
  totalLoss: number;
  netHead: number;
  warnings: string[];
}

interface CalculationResult {
  hydraulics: HydraulicResult;
  power: number;
  generation: {
    daily: number;
    monthly: number;
    yearly: number;
    capacityFactor: number;
  };
  economics: {
    annualValue: number;
    lcoe: number;
    payback: number;
    costPerKw: number;
  };
  turbineRecommendation: {
    type: string;
    reason: string;
    efficiency: number;
  };
  warnings: string[];
}

export function MicroHydroCalculator() {
  // Input states
  const [flowRate, setFlowRate] = useState('');
  const [flowUnit, setFlowUnit] = useState('ls');
  const [head, setHead] = useState('');
  const [pipeLength, setPipeLength] = useState('50');
  const [pipeDiameter, setPipeDiameter] = useState('0.5');
  const [autoSizePipe, setAutoSizePipe] = useState(false);
  const [pipeMaterial, setPipeMaterial] = useState('hdpe');
  const [lossModel, setLossModel] = useState('darcy');
  const [minorLossesK, setMinorLossesK] = useState('1.5');
  const [seasonalPattern, setSeasonalPattern] = useState('moderate');
  const [customCapacityFactor, setCustomCapacityFactor] = useState('');
  const [turbineType, setTurbineType] = useState('');
  const [customEfficiency, setCustomEfficiency] = useState('');
  const [generatorEfficiency, setGeneratorEfficiency] = useState('95');
  const [transmissionLosses, setTransmissionLosses] = useState('2');
  const [electricityPrice, setElectricityPrice] = useState('0.28');
  const [customPrice, setCustomPrice] = useState('');
  const [systemCost, setSystemCost] = useState('15000');
  const [customCost, setCustomCost] = useState('');
  const [omCost, setOmCost] = useState('2');
  const [analysisLifetime, setAnalysisLifetime] = useState('20');
  const [discountRate, setDiscountRate] = useState('5');
  const [gridConnection, setGridConnection] = useState('grid_tie');
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Hydraulic calculations
  const calculateHydraulics = (
    flowM3s: number,
    headM: number,
    lengthM: number,
    diameterM: number,
    material: any,
    modelType: string,
    minorK: number
  ): HydraulicResult => {
    const warnings: string[] = [];
    
    // Basic flow parameters
    const area = Math.PI * diameterM * diameterM / 4;
    const velocity = flowM3s / area;
    const reynolds = velocity * diameterM / 1.0e-6; // kinematic viscosity of water
    
    // Velocity warnings
    if (velocity > 3.0) {
      warnings.push(`High velocity (${velocity.toFixed(1)} m/s) - consider larger diameter`);
    }
    if (velocity < 0.5) {
      warnings.push(`Very low velocity (${velocity.toFixed(1)} m/s) - check flow rate`);
    }
    
    let frictionLoss = 0;
    let frictionFactor = 0;
    
    if (modelType === 'darcy') {
      // Swamee-Jain friction factor for turbulent flow
      if (reynolds > 2300) {
        const roughness = material.roughness;
        const term1 = roughness / (3.7 * diameterM);
        const term2 = 5.74 / Math.pow(reynolds, 0.9);
        frictionFactor = 0.25 / Math.pow(Math.log10(term1 + term2), 2);
      } else {
        frictionFactor = 64 / reynolds; // Laminar flow
      }
      frictionLoss = frictionFactor * (lengthM / diameterM) * (velocity * velocity) / (2 * 9.81);
    } else if (modelType === 'hazen') {
      frictionLoss = 10.67 * lengthM * Math.pow(flowM3s, 1.852) / 
                    (Math.pow(material.hwCoeff, 1.852) * Math.pow(diameterM, 4.87));
    } else if (modelType === 'manning') {
      const hydraulicRadius = diameterM / 4; // For circular pipe
      frictionLoss = (lengthM * material.manning * material.manning * flowM3s * flowM3s) /
                    (Math.pow(hydraulicRadius, 4/3) * Math.pow(area, 2) * 2 * 9.81);
    }
    
    // Minor losses
    const minorLoss = minorK * velocity * velocity / (2 * 9.81);
    const totalLoss = frictionLoss + minorLoss;
    const netHead = Math.max(0, headM - totalLoss);
    
    if (netHead < 0.5) {
      warnings.push('Insufficient net head after losses');
    }
    
    return {
      velocity,
      reynolds,
      frictionFactor,
      frictionLoss,
      minorLoss,
      totalLoss,
      netHead,
      warnings
    };
  };

  // Auto-recommend turbine based on head and flow
  const recommendTurbine = (head: number, flow: number) => {
    for (const turbine of TURBINE_TYPES) {
      if (head >= turbine.headMin && head <= turbine.headMax) {
        return {
          type: turbine.value,
          reason: `Optimal for ${head}m head (${turbine.description})`,
          efficiency: turbine.efficiency
        };
      }
    }
    return {
      type: 'crossflow',
      reason: 'Default choice for variable conditions',
      efficiency: 0.75
    };
  };

  // Apply quick preset
  const applyPreset = (preset: any) => {
    setFlowRate(preset.flow);
    setFlowUnit(preset.flowUnit);
    setHead(preset.head);
    setPipeLength(preset.length);
    setPipeDiameter(preset.diameter);
    setPipeMaterial(preset.material);
    setSeasonalPattern(preset.seasonal);
    setTurbineType(preset.turbine);
  };

  // Auto-size pipe for target velocity
  const autoSizePipeForVelocity = (flowM3s: number, targetVelocity: number = 2.0) => {
    const area = flowM3s / targetVelocity;
    const diameter = Math.sqrt(4 * area / Math.PI);
    return Math.round(diameter * 1000) / 1000; // Round to mm precision
  };

  // Main calculation function
  const calculate = () => {
    try {
      const warnings: string[] = [];
      
      // Parse and validate inputs
      const flowValue = parseFloat(flowRate);
      const headValue = parseFloat(head);
      const lengthValue = parseFloat(pipeLength);
      let diameterValue = parseFloat(pipeDiameter);
      
      if (!flowValue || !headValue || !lengthValue || !diameterValue) {
        toast({
          title: "Missing inputs",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (flowValue <= 0 || headValue <= 0 || lengthValue <= 0 || diameterValue <= 0) {
        toast({
          title: "Invalid inputs",
          description: "All values must be greater than zero",
          variant: "destructive"
        });
        return;
      }
      
      // Convert flow to m³/s
      const flowUnit_factor = FLOW_UNITS.find(u => u.value === flowUnit)?.factor || 1;
      const flowM3s = flowValue * flowUnit_factor;
      
      // Check if flow looks like it was entered in L/s but unit says m³/s
      if (flowUnit === 'm3s' && flowValue > 5) {
        warnings.push('Flow rate seems high for m³/s - did you mean L/s?');
      }
      
      // Auto-size pipe if requested
      if (autoSizePipe) {
        diameterValue = autoSizePipeForVelocity(flowM3s);
        setPipeDiameter(diameterValue.toString());
      }
      
      // Get material properties
      const material = PIPE_MATERIALS.find(m => m.value === pipeMaterial) || PIPE_MATERIALS[0];
      const minorK = parseFloat(minorLossesK);
      
      // Calculate hydraulics
      const hydraulics = calculateHydraulics(
        flowM3s, headValue, lengthValue, diameterValue, material, lossModel, minorK
      );
      
      warnings.push(...hydraulics.warnings);
      
      // Turbine selection and efficiency
      let selectedTurbine;
      let turbineEff;
      
      if (turbineType) {
        selectedTurbine = TURBINE_TYPES.find(t => t.value === turbineType);
        turbineEff = customEfficiency ? parseFloat(customEfficiency) / 100 : selectedTurbine?.efficiency || 0.75;
      } else {
        const recommendation = recommendTurbine(headValue, flowM3s);
        selectedTurbine = TURBINE_TYPES.find(t => t.value === recommendation.type);
        turbineEff = recommendation.efficiency;
        setTurbineType(recommendation.type);
      }
      
      const genEff = parseFloat(generatorEfficiency) / 100;
      const transmissionEff = 1 - parseFloat(transmissionLosses) / 100;
      
      // Power calculation: P = ρ × g × Q × H × η / 1000
      const power = 9.81 * flowM3s * hydraulics.netHead * turbineEff * genEff * transmissionEff / 1000;
      
      if (power <= 0) {
        warnings.push('No power generation possible with current inputs');
      }
      
      // Generation calculations
      const pattern = SEASONAL_PATTERNS.find(p => p.value === seasonalPattern);
      const capacityFactor = customCapacityFactor ? 
        parseFloat(customCapacityFactor) / 100 : 
        pattern?.capacityFactor || 0.65;
      
      const daily = power * 24 * capacityFactor;
      const monthly = daily * 30.44; // Average month
      const yearly = daily * 365.25; // Including leap years
      
      // Economics
      const pricePerKwh = electricityPrice === 'custom' ? 
        parseFloat(customPrice) : parseFloat(electricityPrice);
      const totalSystemCost = systemCost === 'custom' ? 
        parseFloat(customCost) : parseFloat(systemCost);
      const omAnnual = totalSystemCost * parseFloat(omCost) / 100;
      const lifetime = parseFloat(analysisLifetime);
      const discount = parseFloat(discountRate) / 100;
      
      const annualValue = yearly * pricePerKwh - omAnnual;
      
      // Capital Recovery Factor for LCOE
      const crf = discount * Math.pow(1 + discount, lifetime) / (Math.pow(1 + discount, lifetime) - 1);
      const lcoe = yearly > 0 ? (totalSystemCost * crf + omAnnual) / yearly : Infinity;
      
      const payback = annualValue > 0 ? totalSystemCost / annualValue : Infinity;
      const costPerKw = power > 0 ? totalSystemCost / power : Infinity;
      
      // Create result
      const calculationResult: CalculationResult = {
        hydraulics,
        power,
        generation: {
          daily,
          monthly,
          yearly,
          capacityFactor: capacityFactor * 100
        },
        economics: {
          annualValue,
          lcoe,
          payback,
          costPerKw
        },
        turbineRecommendation: {
          type: selectedTurbine?.label || 'Unknown',
          reason: selectedTurbine?.description || '',
          efficiency: turbineEff * 100
        },
        warnings
      };
      
      setResult(calculationResult);
      
      toast({
        title: "Calculation complete",
        description: "Micro-hydro analysis completed successfully",
        variant: "success"
      });
      
    } catch (error) {
      toast({
        title: "Calculation error",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setFlowRate('');
    setHead('');
    setPipeLength('50');
    setPipeDiameter('0.5');
    setAutoSizePipe(false);
    setPipeMaterial('hdpe');
    setTurbineType('');
    setCustomEfficiency('');
    setResult(null);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="bg-elec-grey">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Micro-Hydro Calculator
          </CardTitle>
          <CardDescription>
            Professional micro-hydro system analysis with accurate hydraulics and economics
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Presets */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Quick Start Presets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {QUICK_PRESETS.map((preset, index) => (
                <Card key={index} className="bg-elec-card border-elec-yellow/10 cursor-pointer hover:border-elec-yellow/30 transition-colors"
                      onClick={() => applyPreset(preset)}>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-elec-light mb-2">{preset.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Flow: {preset.flow} {FLOW_UNITS.find(u => u.value === preset.flowUnit)?.label}</div>
                      <div>Head: {preset.head}m</div>
                      <div>Turbine: {TURBINE_TYPES.find(t => t.value === preset.turbine)?.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Flow and Head Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Site Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-elec-light">Flow Rate</label>
                <div className="flex gap-2">
                  <MobileInputWrapper
                    type="number"
                    placeholder="Enter flow rate"
                    value={flowRate}
                    onChange={setFlowRate}
                    step="0.01"
                  />
                  <MobileSelectWrapper
                    placeholder="Unit"
                    value={flowUnit}
                    onValueChange={setFlowUnit}
                    options={FLOW_UNITS}
                  />
                </div>
              </div>
              
              <MobileInputWrapper
                type="number"
                label="Gross Head"
                placeholder="Enter head height"
                value={head}
                onChange={setHead}
                unit="m"
                step="0.1"
                hint="Vertical drop from intake to turbine"
              />
            </div>
          </div>

          {/* Penstock Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Penstock Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MobileSelectWrapper
                label="Loss Model"
                placeholder="Select calculation method"
                value={lossModel}
                onValueChange={setLossModel}
                options={LOSS_MODELS}
              />
              
              <MobileSelectWrapper
                label="Pipe Material"
                placeholder="Select material"
                value={pipeMaterial}
                onValueChange={setPipeMaterial}
                options={PIPE_MATERIALS}
              />
              
              <MobileInputWrapper
                type="number"
                label="Pipe Length"
                placeholder="Enter length"
                value={pipeLength}
                onChange={setPipeLength}
                unit="m"
                step="1"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-elec-light">Pipe Diameter</label>
                <div className="flex gap-2">
                  <MobileInputWrapper
                    type="number"
                    placeholder="Enter diameter"
                    value={pipeDiameter}
                    onChange={setPipeDiameter}
                    unit="m"
                    step="0.01"
                    disabled={autoSizePipe}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={autoSizePipe}
                      onChange={(e) => setAutoSizePipe(e.target.checked)}
                      className="rounded border-elec-yellow/20"
                    />
                    Auto-size
                  </label>
                </div>
              </div>
              
              <MobileInputWrapper
                type="number"
                label="Minor Loss Coefficient (K)"
                placeholder="Total K value"
                value={minorLossesK}
                onChange={setMinorLossesK}
                step="0.1"
                hint="Bends, valves, screen losses"
              />
            </div>
          </div>

          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MobileSelectWrapper
                label="Seasonal Pattern"
                placeholder="Select pattern"
                value={seasonalPattern}
                onValueChange={setSeasonalPattern}
                options={SEASONAL_PATTERNS}
              />
              
              <MobileInputWrapper
                type="number"
                label="Custom Capacity Factor"
                placeholder="Auto from pattern"
                value={customCapacityFactor}
                onChange={setCustomCapacityFactor}
                unit="%"
                step="1"
                hint="Override seasonal preset"
              />
              
              <MobileSelectWrapper
                label="Turbine Type"
                placeholder="Auto-recommend"
                value={turbineType}
                onValueChange={setTurbineType}
                options={TURBINE_TYPES}
              />
              
              <MobileInputWrapper
                type="number"
                label="Custom Turbine Efficiency"
                placeholder="Auto from type"
                value={customEfficiency}
                onChange={setCustomEfficiency}
                unit="%"
                step="1"
                hint="Override type default"
              />
              
              <MobileInputWrapper
                type="number"
                label="Generator Efficiency"
                placeholder="95"
                value={generatorEfficiency}
                onChange={setGeneratorEfficiency}
                unit="%"
                step="1"
              />
              
              <MobileInputWrapper
                type="number"
                label="Transmission Losses"
                placeholder="2"
                value={transmissionLosses}
                onChange={setTransmissionLosses}
                unit="%"
                step="0.1"
              />
            </div>
          </div>

          {/* Economics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Economic Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-elec-light">Electricity Price</label>
                <div className="flex gap-2">
                  <MobileSelectWrapper
                    placeholder="Select price"
                    value={electricityPrice}
                    onValueChange={setElectricityPrice}
                    options={ELECTRICITY_PRICES}
                  />
                  {electricityPrice === 'custom' && (
                    <MobileInputWrapper
                      type="number"
                      placeholder="£/kWh"
                      value={customPrice}
                      onChange={setCustomPrice}
                      step="0.01"
                      
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-elec-light">System Cost</label>
                <div className="flex gap-2">
                  <MobileSelectWrapper
                    placeholder="Select cost"
                    value={systemCost}
                    onValueChange={setSystemCost}
                    options={SYSTEM_COSTS}
                    
                  />
                  {systemCost === 'custom' && (
                    <MobileInputWrapper
                      type="number"
                      placeholder="£"
                      value={customCost}
                      onChange={setCustomCost}
                      step="1000"
                      
                    />
                  )}
                </div>
              </div>
              
              <MobileInputWrapper
                type="number"
                label="O&M Cost"
                placeholder="2"
                value={omCost}
                onChange={setOmCost}
                unit="% annually"
                step="0.1"
              />
              
              <MobileInputWrapper
                type="number"
                label="Analysis Lifetime"
                placeholder="20"
                value={analysisLifetime}
                onChange={setAnalysisLifetime}
                unit="years"
                step="1"
              />
              
              <MobileInputWrapper
                type="number"
                label="Discount Rate"
                placeholder="5"
                value={discountRate}
                onChange={setDiscountRate}
                unit="%"
                step="0.1"
              />
              
              <MobileSelectWrapper
                label="Grid Connection"
                placeholder="Select type"
                value={gridConnection}
                onValueChange={setGridConnection}
                options={GRID_CONNECTIONS}
                
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MobileButton onClick={calculate} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate System
            </MobileButton>
            <MobileButton onClick={reset} variant="outline" className="flex-1">
              Reset All
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Alert className="bg-yellow-500/10 border-yellow-500/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <div key={index}>• {warning}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* System Performance */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Zap className="h-5 w-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{result.power.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">kW Power</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{result.generation.daily.toFixed(0)}</div>
                    <div className="text-sm text-muted-foreground">kWh/day</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{(result.generation.yearly/1000).toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">MWh/year</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{result.generation.capacityFactor.toFixed(0)}</div>
                    <div className="text-sm text-muted-foreground">% Capacity Factor</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Hydraulic Analysis */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Hydraulic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Gross Head</div>
                  <div className="text-lg font-semibold">{head}m</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Friction Loss</div>
                  <div className="text-lg font-semibold">{result.hydraulics.frictionLoss.toFixed(2)}m</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Minor Loss</div>
                  <div className="text-lg font-semibold">{result.hydraulics.minorLoss.toFixed(2)}m</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Net Head</div>
                  <div className="text-lg font-semibold text-elec-yellow">{result.hydraulics.netHead.toFixed(2)}m</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Velocity</div>
                  <div className="text-lg font-semibold">{result.hydraulics.velocity.toFixed(2)}m/s</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Reynolds No.</div>
                  <div className="text-lg font-semibold">{result.hydraulics.reynolds.toExponential(2)}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Friction Factor</div>
                  <div className="text-lg font-semibold">{result.hydraulics.frictionFactor.toFixed(4)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economics */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Economic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">£{result.economics.annualValue.toFixed(0)}</div>
                    <div className="text-sm text-muted-foreground">Annual Value</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">
                      {isFinite(result.economics.lcoe) ? `£${(result.economics.lcoe).toFixed(3)}` : 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">LCOE (£/kWh)</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">
                      {isFinite(result.economics.payback) ? `${result.economics.payback.toFixed(1)}` : 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Payback (years)</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">
                      {isFinite(result.economics.costPerKw) ? `£${(result.economics.costPerKw/1000).toFixed(0)}k` : 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Cost per kW</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Turbine Recommendation */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Turbine Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">{result.turbineRecommendation.type}</span>
                  <Badge variant="outline">{result.turbineRecommendation.efficiency.toFixed(0)}% efficient</Badge>
                </div>
                <p className="text-muted-foreground">{result.turbineRecommendation.reason}</p>
              </div>
            </CardContent>
          </Card>

          {/* What This Means */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow">What This Means</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-muted-foreground">
                {result.power > 0 ? (
                  <>
                    <p>✅ This micro-hydro system can generate approximately <strong>{result.generation.yearly.toFixed(0)} kWh annually</strong>, equivalent to the electricity needs of {Math.round(result.generation.yearly / 4000)} average UK homes.</p>
                    
                    {result.economics.annualValue > 0 ? (
                      <p>💰 With current electricity prices, this system could provide <strong>£{result.economics.annualValue.toFixed(0)} annual value</strong>, paying for itself in {isFinite(result.economics.payback) ? result.economics.payback.toFixed(1) : 'many'} years.</p>
                    ) : (
                      <p>⚠️ The system does not appear economically viable with current electricity prices and O&M costs.</p>
                    )}
                    
                    {result.economics.lcoe < 0.28 ? (
                      <p>📊 The levelised cost of electricity ({result.economics.lcoe.toFixed(3)} £/kWh) compares favourably to grid electricity prices.</p>
                    ) : (
                      <p>📊 The levelised cost of electricity ({isFinite(result.economics.lcoe) ? result.economics.lcoe.toFixed(3) : 'very high'} £/kWh) is higher than typical grid prices.</p>
                    )}
                  </>
                ) : (
                  <p>❌ This configuration does not generate usable power. Consider increasing head, flow, or reducing pipe losses.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Requirements */}
          <Card className="bg-elec-grey">
            <CardHeader>
              <CardTitle className="text-elec-yellow">UK Regulatory Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-elec-light mb-2">Environment Agency</h4>
                    <p className="text-sm text-muted-foreground">Abstraction licence required if taking {'>'}20m³/day. Impoundment licence needed for weirs/dams.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-elec-light mb-2">Planning Permission</h4>
                    <p className="text-sm text-muted-foreground">Required for new structures. Check with local planning authority for permitted development rights.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-elec-light mb-2">Fish & Wildlife</h4>
                    <p className="text-sm text-muted-foreground">Fish passage requirements may apply. Consider screening to prevent fish injury.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-elec-card border-elec-yellow/10">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-elec-light mb-2">Grid Connection</h4>
                    <p className="text-sm text-muted-foreground">DNO application required for grid-tie systems. G59 protection equipment mandatory.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MicroHydroCalculator;