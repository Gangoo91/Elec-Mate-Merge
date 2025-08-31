import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle, AlertTriangle, Info, Droplets, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Preset data
const TURBINE_TYPES = [
  { value: 'pelton', label: 'Pelton Wheel', specs: { efficiency: 0.88, headRange: '50-1500m', flow: 'Low', cost: 'High' } },
  { value: 'turgo', label: 'Turgo', specs: { efficiency: 0.85, headRange: '30-300m', flow: 'Medium', cost: 'Medium' } },
  { value: 'crossflow', label: 'Cross-flow (Banki)', specs: { efficiency: 0.75, headRange: '3-200m', flow: 'Variable', cost: 'Low' } },
  { value: 'kaplan', label: 'Kaplan', specs: { efficiency: 0.90, headRange: '2-40m', flow: 'High', cost: 'High' } },
  { value: 'francis', label: 'Francis', specs: { efficiency: 0.87, headRange: '10-350m', flow: 'Medium', cost: 'Medium' } },
  { value: 'propeller', label: 'Propeller', specs: { efficiency: 0.85, headRange: '1-10m', flow: 'High', cost: 'Low' } },
  { value: 'archimedes', label: 'Archimedes Screw', specs: { efficiency: 0.82, headRange: '1-10m', flow: 'High', cost: 'Medium' } },
  { value: 'waterwheel', label: 'Water Wheel', specs: { efficiency: 0.25, headRange: '1-5m', flow: 'Low', cost: 'Low' } },
];

const SITE_CATEGORIES = [
  { value: 'rural_stream', label: 'Rural Stream' },
  { value: 'river_weir', label: 'River with Weir' },
  { value: 'mill_race', label: 'Mill Race/Leat' },
  { value: 'canal_drop', label: 'Canal Drop' },
  { value: 'spring_fed', label: 'Spring Fed' },
  { value: 'irrigation', label: 'Irrigation Channel' },
  { value: 'custom', label: 'Custom Site' },
];

const FLOW_MEASUREMENT_METHODS = [
  { value: 'float_timing', label: 'Float Timing Method' },
  { value: 'bucket_timing', label: 'Bucket & Stopwatch' },
  { value: 'weir_measurement', label: 'Weir Measurement' },
  { value: 'flow_meter', label: 'Electronic Flow Meter' },
  { value: 'estimated', label: 'Visual Estimation' },
  { value: 'gauging_station', label: 'Gauging Station Data' },
];

const HEAD_MEASUREMENT_METHODS = [
  { value: 'water_level', label: 'Water Level & GPS' },
  { value: 'pressure_gauge', label: 'Pressure Gauge' },
  { value: 'surveying', label: 'Professional Survey' },
  { value: 'manometer', label: 'Manometer' },
  { value: 'estimated', label: 'Visual Estimation' },
];

const SEASONAL_VARIATIONS = [
  { value: 'stable', label: 'Stable year-round (Springs)' },
  { value: 'moderate', label: 'Moderate variation (±30%)' },
  { value: 'high', label: 'High variation (±50%)' },
  { value: 'extreme', label: 'Extreme variation (>±70%)' },
  { value: 'unknown', label: 'Unknown variation' },
];

const GRID_CONNECTION_OPTIONS = [
  { value: 'grid_tie', label: 'Grid-tie with export' },
  { value: 'grid_backup', label: 'Grid-tie backup only' },
  { value: 'off_grid', label: 'Off-grid with batteries' },
  { value: 'direct_use', label: 'Direct use (heating/pumping)' },
  { value: 'hybrid', label: 'Hybrid system' },
];

const INSTALLATION_COMPLEXITY = [
  { value: 'simple', label: 'Simple (existing structure)', multiplier: 1.0 },
  { value: 'moderate', label: 'Moderate (minor civil works)', multiplier: 1.3 },
  { value: 'complex', label: 'Complex (major civil works)', multiplier: 1.8 },
  { value: 'extreme', label: 'Extreme (remote/difficult access)', multiplier: 2.5 },
];

const PERMIT_REQUIREMENTS = [
  { value: 'none', label: 'No permits needed' },
  { value: 'planning', label: 'Planning permission only' },
  { value: 'abstraction', label: 'Abstraction licence (>20m³/day)' },
  { value: 'environmental', label: 'Environmental permits' },
  { value: 'flood_defence', label: 'Flood defence consent' },
  { value: 'all', label: 'Multiple permits required' },
];

const ELECTRICITY_PRICES = [
  { value: '0.22', label: '22p/kWh (Economy rate)' },
  { value: '0.28', label: '28p/kWh (Standard rate)' },
  { value: '0.35', label: '35p/kWh (Premium rate)' },
  { value: '0.45', label: '45p/kWh (Rural/remote rate)' },
  { value: 'custom', label: 'Custom price' },
];

const SYSTEM_COSTS = [
  { value: '5000', label: '£5,000 (Micro system)' },
  { value: '15000', label: '£15,000 (Small system)' },
  { value: '35000', label: '£35,000 (Medium system)' },
  { value: '75000', label: '£75,000 (Large system)' },
  { value: 'custom', label: 'Custom cost' },
];

interface MicroHydroResult {
  // Technical results
  theoreticalPower: number;
  turbineEfficiency: number;
  actualPower: number;
  turbineRecommendation: string;
  
  // Generation
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  capacityFactor: number;
  seasonalAdjustment: number;
  
  // Economics
  yearlyValue: number;
  paybackPeriod: number;
  costPerKw: number;
  levelisedCost: number;
  
  // Engineering
  flowVelocity: number;
  specificSpeed: number;
  reynoldsNumber: number;
  
  // Environmental & Regulatory
  abstractionRequired: boolean;
  environmentalImpact: string;
  permitComplexity: string;
  fishMigrationConcern: boolean;
}

export function MicroHydroCalculator() {
  // Basic site characteristics
  const [siteCategory, setSiteCategory] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [flowMeasurementMethod, setFlowMeasurementMethod] = useState('');
  const [head, setHead] = useState('');
  const [headMeasurementMethod, setHeadMeasurementMethod] = useState('');
  const [seasonalVariation, setSeasonalVariation] = useState('moderate');
  
  // Turbine selection
  const [turbineType, setTurbineType] = useState('');
  const [turbineEfficiency, setTurbineEfficiency] = useState('');
  
  // System configuration
  const [gridConnection, setGridConnection] = useState('');
  const [installationComplexity, setInstallationComplexity] = useState('moderate');
  const [systemCost, setSystemCost] = useState('');
  const [customSystemCost, setCustomSystemCost] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.28');
  const [customElectricityPrice, setCustomElectricityPrice] = useState('');
  
  // Regulatory
  const [permitRequirements, setPermitRequirements] = useState('');
  
  // Advanced settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pipeLength, setPipeLength] = useState('50');
  const [pipeDiameter, setPipeDiameter] = useState('0.5');
  const [roughnessCoeff, setRoughnessCoeff] = useState('0.012');
  const [generatorEfficiency, setGeneratorEfficiency] = useState('95');
  const [transmissionLosses, setTransmissionLosses] = useState('2');
  const [maintenanceCost, setMaintenanceCost] = useState('3');
  
  const [result, setResult] = useState<MicroHydroResult | null>(null);

  const getRecommendedTurbine = (head: number, flow: number) => {
    if (head > 50) return 'pelton';
    if (head > 30) return 'turgo';
    if (head > 10) return 'francis';
    if (head > 2) return 'kaplan';
    return 'propeller';
  };

  const getTurbineSpecs = (turbineType: string) => {
    return TURBINE_TYPES.find(t => t.value === turbineType)?.specs || 
           { efficiency: 0.75, headRange: 'Unknown', flow: 'Unknown', cost: 'Unknown' };
  };

  const calculateMicroHydro = () => {
    try {
      const flow = parseFloat(flowRate);
      const headNum = parseFloat(head);
      const actualSystemCost = parseFloat(systemCost === 'custom' ? customSystemCost : systemCost);
      const actualElectricityPrice = parseFloat(electricityPrice === 'custom' ? customElectricityPrice : electricityPrice);
      const genEff = parseFloat(generatorEfficiency) / 100;
      const transmissionEff = 1 - (parseFloat(transmissionLosses) / 100);
      
      if (!flow || !headNum || !turbineType || !actualSystemCost || !actualElectricityPrice) {
        toast({
          title: "Missing inputs",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      // Get turbine specifications
      const turbineSpecs = getTurbineSpecs(turbineType);
      const turbineEff = turbineEfficiency ? parseFloat(turbineEfficiency) / 100 : turbineSpecs.efficiency;
      
      // Hydraulic calculations
      const pipeLen = parseFloat(pipeLength);
      const pipeDiam = parseFloat(pipeDiameter);
      const roughness = parseFloat(roughnessCoeff);
      
      // Flow velocity in penstock
      const flowVelocity = (4 * flow) / (Math.PI * pipeDiam * pipeDiam);
      
      // Head losses (Darcy-Weisbach equation simplified)
      const frictionFactor = 0.02; // Simplified assumption
      const headLoss = frictionFactor * (pipeLen / pipeDiam) * (flowVelocity * flowVelocity) / (2 * 9.81);
      const netHead = headNum - headLoss;
      
      // Theoretical power (kW) = ρ × g × Q × H / 1000
      const theoreticalPower = 9.81 * flow * netHead / 1000;
      
      // Actual power with all efficiencies
      const actualPower = theoreticalPower * turbineEff * genEff * transmissionEff;
      
      // Seasonal adjustment factors
      const seasonalFactors = {
        'stable': 1.0,
        'moderate': 0.85,
        'high': 0.7,
        'extreme': 0.5,
        'unknown': 0.75
      };
      const seasonalAdjustment = seasonalFactors[seasonalVariation as keyof typeof seasonalFactors];
      
      // Generation calculations
      const baseCapacityFactor = 0.9; // High for hydro
      const adjustedCapacityFactor = baseCapacityFactor * seasonalAdjustment;
      const dailyGeneration = actualPower * 24 * adjustedCapacityFactor;
      const monthlyGeneration = dailyGeneration * 30;
      const yearlyGeneration = dailyGeneration * 365;
      
      // Economics
      const complexityMultiplier = INSTALLATION_COMPLEXITY.find(c => c.value === installationComplexity)?.multiplier || 1.3;
      const adjustedSystemCost = actualSystemCost * complexityMultiplier;
      const yearlyValue = yearlyGeneration * actualElectricityPrice;
      const maintenanceAnnual = adjustedSystemCost * (parseFloat(maintenanceCost) / 100);
      const netYearlyValue = yearlyValue - maintenanceAnnual;
      const paybackPeriod = adjustedSystemCost / netYearlyValue;
      const costPerKw = adjustedSystemCost / actualPower;
      const levelisedCost = adjustedSystemCost / (yearlyGeneration * 20); // 20 year lifespan
      
      // Engineering calculations
      const specificSpeed = (flow * Math.sqrt(flow)) / Math.pow(netHead, 0.75);
      const reynoldsNumber = (flowVelocity * pipeDiam * 1000) / 0.001; // Water viscosity ≈ 0.001 Pa·s
      
      // Environmental and regulatory assessments
      const dailyAbstraction = flow * 86400; // m³/day
      const abstractionRequired = dailyAbstraction > 20;
      
      let environmentalImpact = 'Low';
      if (flow > 5) environmentalImpact = 'High';
      else if (flow > 1) environmentalImpact = 'Medium';
      
      const fishMigrationConcern = headNum > 1.5; // Generally concerns above 1.5m
      
      let permitComplexity = 'Simple';
      if (permitRequirements === 'all') permitComplexity = 'Complex';
      else if (permitRequirements === 'environmental' || permitRequirements === 'abstraction') permitComplexity = 'Moderate';
      
      const turbineRecommendation = actualPower > 0 ? 
        `${getTurbineSpecs(turbineType).efficiency * 100}% efficient ${TURBINE_TYPES.find(t => t.value === turbineType)?.label}` :
        'Insufficient flow/head';

      setResult({
        theoreticalPower,
        turbineEfficiency: turbineEff * 100,
        actualPower,
        turbineRecommendation,
        dailyGeneration,
        monthlyGeneration,
        yearlyGeneration,
        capacityFactor: adjustedCapacityFactor * 100,
        seasonalAdjustment,
        yearlyValue,
        paybackPeriod,
        costPerKw,
        levelisedCost,
        flowVelocity,
        specificSpeed,
        reynoldsNumber,
        abstractionRequired,
        environmentalImpact,
        permitComplexity,
        fishMigrationConcern
      });

      toast({
        title: "Calculation complete",
        description: "Micro-hydro system analysis completed",
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
    setSiteCategory('');
    setFlowRate('');
    setFlowMeasurementMethod('');
    setHead('');
    setHeadMeasurementMethod('');
    setSeasonalVariation('moderate');
    setTurbineType('');
    setTurbineEfficiency('');
    setGridConnection('');
    setInstallationComplexity('moderate');
    setSystemCost('');
    setCustomSystemCost('');
    setElectricityPrice('0.28');
    setCustomElectricityPrice('');
    setPermitRequirements('');
    setShowAdvanced(false);
    setResult(null);
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Micro-Hydro Calculator
          </CardTitle>
          <CardDescription>
            Professional micro-hydro system design with comprehensive analysis, environmental considerations, and regulatory guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Site Characteristics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Site Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Site Category"
                placeholder="Select site type"
                value={siteCategory}
                onValueChange={setSiteCategory}
                options={SITE_CATEGORIES}
              />
              
              <MobileInputWrapper
                type="number"
                label="Flow Rate"
                placeholder="Enter flow rate"
                value={flowRate}
                onChange={setFlowRate}
                unit="m³/s"
                step="0.01"
                hint="Annual average flow rate"
              />
              
              <MobileSelectWrapper
                label="Flow Measurement Method"
                placeholder="How was flow measured?"
                value={flowMeasurementMethod}
                onValueChange={setFlowMeasurementMethod}
                options={FLOW_MEASUREMENT_METHODS}
              />
              
              <MobileInputWrapper
                type="number"
                label="Head (Gross Height)"
                placeholder="Enter head height"
                value={head}
                onChange={setHead}
                unit="m"
                step="0.1"
                hint="Vertical drop from intake to turbine"
              />
              
              <MobileSelectWrapper
                label="Head Measurement Method"
                placeholder="How was head measured?"
                value={headMeasurementMethod}
                onValueChange={setHeadMeasurementMethod}
                options={HEAD_MEASUREMENT_METHODS}
              />
              
              <MobileSelectWrapper
                label="Seasonal Flow Variation"
                placeholder="Select flow pattern"
                value={seasonalVariation}
                onValueChange={setSeasonalVariation}
                options={SEASONAL_VARIATIONS}
              />
            </div>
          </div>

          {/* Turbine Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Turbine Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Turbine Type"
                placeholder="Select turbine type"
                value={turbineType}
                onValueChange={setTurbineType}
                options={TURBINE_TYPES}
              />
              
              {turbineType && (
                <div className="p-3 bg-elec-dark/20 rounded-lg">
                  <div className="text-sm font-medium text-elec-light mb-2">Turbine Specifications</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Efficiency: {(getTurbineSpecs(turbineType).efficiency * 100).toFixed(0)}%</div>
                    <div>Head Range: {getTurbineSpecs(turbineType).headRange}</div>
                    <div>Flow Suitability: {getTurbineSpecs(turbineType).flow}</div>
                    <div>Relative Cost: {getTurbineSpecs(turbineType).cost}</div>
                  </div>
                </div>
              )}
              
              <MobileInputWrapper
                type="number"
                label="Custom Turbine Efficiency (optional)"
                placeholder="Override efficiency"
                value={turbineEfficiency}
                onChange={setTurbineEfficiency}
                unit="%"
                step="1"
                hint="Leave blank to use turbine default"
              />
            </div>
          </div>

          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Grid Connection Type"
                placeholder="Select connection type"
                value={gridConnection}
                onValueChange={setGridConnection}
                options={GRID_CONNECTION_OPTIONS}
              />
              
              <MobileSelectWrapper
                label="Installation Complexity"
                placeholder="Select complexity"
                value={installationComplexity}
                onValueChange={setInstallationComplexity}
                options={INSTALLATION_COMPLEXITY}
              />
              
              <MobileSelectWrapper
                label="System Cost"
                placeholder="Select system cost"
                value={systemCost}
                onValueChange={setSystemCost}
                options={SYSTEM_COSTS}
              />
              
              {systemCost === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom System Cost"
                  placeholder="Enter total cost"
                  value={customSystemCost}
                  onChange={setCustomSystemCost}
                  unit="£"
                  step="1000"
                />
              )}
              
              <MobileSelectWrapper
                label="Electricity Price"
                placeholder="Select electricity price"
                value={electricityPrice}
                onValueChange={setElectricityPrice}
                options={ELECTRICITY_PRICES}
              />
              
              {electricityPrice === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Electricity Price"
                  placeholder="Enter price"
                  value={customElectricityPrice}
                  onChange={setCustomElectricityPrice}
                  unit="£/kWh"
                  step="0.01"
                />
              )}
              
              <MobileSelectWrapper
                label="Permit Requirements"
                placeholder="Select permit needs"
                value={permitRequirements}
                onValueChange={setPermitRequirements}
                options={PERMIT_REQUIREMENTS}
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="flex items-center gap-2 text-elec-light hover:text-elec-yellow transition-colors">
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              Advanced Engineering Parameters
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MobileInputWrapper
                  type="number"
                  label="Penstock Length"
                  placeholder="Pipe length"
                  value={pipeLength}
                  onChange={setPipeLength}
                  unit="m"
                  step="1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Penstock Diameter"
                  placeholder="Pipe diameter"
                  value={pipeDiameter}
                  onChange={setPipeDiameter}
                  unit="m"
                  step="0.05"
                />
                <MobileInputWrapper
                  type="number"
                  label="Roughness Coefficient"
                  placeholder="Manning's n"
                  value={roughnessCoeff}
                  onChange={setRoughnessCoeff}
                  unit=""
                  step="0.001"
                />
                <MobileInputWrapper
                  type="number"
                  label="Generator Efficiency"
                  placeholder="Generator efficiency"
                  value={generatorEfficiency}
                  onChange={setGeneratorEfficiency}
                  unit="%"
                  step="1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Transmission Losses"
                  placeholder="Cable/transformer losses"
                  value={transmissionLosses}
                  onChange={setTransmissionLosses}
                  unit="%"
                  step="0.5"
                />
                <MobileInputWrapper
                  type="number"
                  label="Annual Maintenance Cost"
                  placeholder="% of system cost"
                  value={maintenanceCost}
                  onChange={setMaintenanceCost}
                  unit="% p.a."
                  step="0.5"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <MobileButton 
              onClick={calculateMicroHydro} 
              variant="elec"
              size="wide"
              className="sm:flex-1"
            >
              Calculate Micro-Hydro System
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
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Zap className="h-5 w-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{result.actualPower.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">kW Output</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.turbineEfficiency.toFixed(0)}% turbine efficiency
                  </div>
                </div>
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{result.capacityFactor.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">% Capacity Factor</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.seasonalAdjustment < 1 ? 'Seasonal adjusted' : 'Year-round stable'}
                  </div>
                </div>
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{result.yearlyGeneration.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">kWh/year</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.dailyGeneration.toFixed(1)} kWh/day avg
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economic Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Economic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Annual energy value:</span>
                    <span className="font-semibold text-green-400">£{result.yearlyValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System cost per kW:</span>
                    <span className="font-semibold">£{result.costPerKw.toFixed(0)}/kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Levelised cost of energy:</span>
                    <span className="font-semibold">£{result.levelisedCost.toFixed(3)}/kWh</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Simple payback period:</span>
                    <span className="font-bold text-elec-yellow">
                      {result.paybackPeriod > 50 ? '50+ years' : `${result.paybackPeriod.toFixed(1)} years`}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Payback calculation includes installation complexity multiplier and annual maintenance costs
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engineering Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Engineering Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">Flow Characteristics</div>
                  <div className="text-2xl font-bold">{result.flowVelocity.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">m/s flow velocity</div>
                  <div className="text-xs text-elec-light">
                    Reynolds: {result.reynoldsNumber.toExponential(2)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">Turbine Selection</div>
                  <div className="text-sm font-bold text-elec-yellow">
                    {result.turbineRecommendation}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Specific Speed: {result.specificSpeed.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">System Efficiency</div>
                  <div className="text-2xl font-bold text-elec-yellow">
                    {((result.actualPower / result.theoreticalPower) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall efficiency</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental & Regulatory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Environmental & Regulatory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-semibold text-elec-light">Regulatory Status</div>
                    <div className="space-y-1">
                      <Badge variant={result.abstractionRequired ? "destructive" : "default"}>
                        {result.abstractionRequired ? 'Abstraction Licence Required' : 'No Abstraction Licence'}
                      </Badge>
                      <Badge variant="outline">{result.permitComplexity} Permitting</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-elec-light">Environmental Impact</div>
                    <div className="space-y-1">
                      <Badge variant={
                        result.environmentalImpact === 'Low' ? 'default' :
                        result.environmentalImpact === 'Medium' ? 'secondary' : 'destructive'
                      }>
                        {result.environmentalImpact} Environmental Impact
                      </Badge>
                      {result.fishMigrationConcern && (
                        <Badge variant="secondary">Fish Migration Concern</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What This Means */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Info className="h-5 w-5" />
                What This Means
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm text-elec-light max-w-none">
                <p>
                  <strong>System Viability:</strong> Your micro-hydro system would generate {result.actualPower.toFixed(2)} kW 
                  with a {result.capacityFactor.toFixed(0)}% capacity factor, providing 
                  {result.dailyGeneration > 50 ? ' substantial' : result.dailyGeneration > 20 ? ' moderate' : ' limited'} 
                  daily energy output of {result.dailyGeneration.toFixed(1)} kWh.
                </p>
                <p>
                  <strong>Economic Outlook:</strong> With a {result.paybackPeriod.toFixed(1)}-year payback period, 
                  this system is {result.paybackPeriod < 10 ? 'highly economical' : 
                                 result.paybackPeriod < 20 ? 'moderately viable' : 'challenging economically'}. 
                  The levelised cost of £{result.levelisedCost.toFixed(3)}/kWh compares 
                  {result.levelisedCost < 0.20 ? 'favourably' : 'unfavourably'} to grid electricity.
                </p>
                <p>
                  <strong>Environmental Considerations:</strong> Your site shows {result.environmentalImpact.toLowerCase()} environmental impact. 
                  {result.fishMigrationConcern && ' Fish passage requirements may apply due to the head height.'} 
                  {result.abstractionRequired && ' Water abstraction licensing will be required due to daily extraction volumes.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Regulations & Next Steps */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Regulatory Requirements & Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Environment Agency:</div>
                    <div className="text-elec-light text-sm">
                      {result.abstractionRequired ? 
                        'Abstraction licence required (>20m³/day). Application process 13-16 weeks.' :
                        'No abstraction licence needed, but still notify EA of works.'}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Planning Permission:</div>
                    <div className="text-elec-light text-sm">
                      Usually required for new structures. Check with local authority.
                    </div>
                  </div>
                  
                  {result.fishMigrationConcern && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                      <div className="font-semibold text-elec-yellow min-w-fit">Fish Passage:</div>
                      <div className="text-elec-light text-sm">
                        Measures required for heads &gt;1.5m. Consider fish ladder or bypass.
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Flood Risk Activity Permit:</div>
                    <div className="text-elec-light text-sm">
                      Required for works within 8m of watercourse.
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Grid Connection:</div>
                    <div className="text-elec-light text-sm">
                      {gridConnection === 'grid_tie' ? 
                        'G98/G99 application required for export systems.' :
                        'Notify DNO of connection even if no export.'}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Professional Services:</div>
                    <div className="text-elec-light text-sm">
                      Hydrological survey, environmental impact assessment, and structural engineering required.
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-elec-dark/30 rounded-lg">
                    <div className="font-semibold text-elec-yellow min-w-fit">Insurance:</div>
                    <div className="text-elec-light text-sm">
                      Specialist hydro insurance for flood damage and environmental liability.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MicroHydroCalculator;