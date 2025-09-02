
import { useState } from "react";
import { Calculator, Thermometer, Zap, PoundSterling, Home, AlertTriangle, CheckCircle, Info, Lightbulb, BookOpen, Settings } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { 
  INSULATION_LEVELS, 
  AIR_TIGHTNESS_LEVELS, 
  UK_REGIONS, 
  HEAT_PUMP_TYPES, 
  EMITTER_TYPES, 
  DHW_OPTIONS 
} from "@/lib/heat-pump-constants";
import { 
  calculateHeatPumpLoad, 
  getRecommendations, 
  getRegulatoryGuidance,
  type HeatPumpInputs,
  type HeatPumpResults,
  type ReviewFinding 
} from "@/lib/heat-pump-calculations";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface FormInputs {
  floorArea: string;
  insulationLevel: keyof typeof INSULATION_LEVELS;
  airTightness: keyof typeof AIR_TIGHTNESS_LEVELS;
  region: keyof typeof UK_REGIONS;
  designTemp: string;
  indoorTemp: string;
  heatPumpType: keyof typeof HEAT_PUMP_TYPES;
  emitterType: keyof typeof EMITTER_TYPES;
  dhwOption: keyof typeof DHW_OPTIONS;
  electricityRate: string;
}

const HeatPumpCalculator = () => {
  const [inputs, setInputs] = useState<FormInputs>({
    floorArea: "",
    insulationLevel: "average",
    airTightness: "average",
    region: "midlands",
    designTemp: "",
    indoorTemp: "21",
    heatPumpType: "air-source",
    emitterType: "radiators",
    dhwOption: "cylinder",
    electricityRate: "0.30"
  });

  const [results, setResults] = useState<HeatPumpResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReviewSummary, setShowReviewSummary] = useState(false);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!inputs.floorArea || parseFloat(inputs.floorArea as string) <= 0) {
      newErrors.floorArea = "Floor area must be greater than 0";
    }
    
    if (!inputs.designTemp) {
      newErrors.designTemp = "Design temperature is required";
    }
    
    if (!inputs.indoorTemp || parseFloat(inputs.indoorTemp as string) < 18 || parseFloat(inputs.indoorTemp as string) > 25) {
      newErrors.indoorTemp = "Indoor temperature should be between 18°C and 25°C";
    }
    
    if (!inputs.electricityRate || parseFloat(inputs.electricityRate as string) <= 0) {
      newErrors.electricityRate = "Electricity rate must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateHeatPump = () => {
    if (!validateInputs()) return;

    const calculationInputs: HeatPumpInputs = {
      floorArea: parseFloat(inputs.floorArea as string),
      insulationLevel: inputs.insulationLevel as keyof typeof INSULATION_LEVELS,
      airTightness: inputs.airTightness as keyof typeof AIR_TIGHTNESS_LEVELS,
      designTemp: parseFloat(inputs.designTemp as string),
      indoorTemp: parseFloat(inputs.indoorTemp as string),
      heatPumpType: inputs.heatPumpType as keyof typeof HEAT_PUMP_TYPES,
      emitterType: inputs.emitterType as keyof typeof EMITTER_TYPES,
      dhwOption: inputs.dhwOption as keyof typeof DHW_OPTIONS,
      electricityRate: parseFloat(inputs.electricityRate as string)
    };

    const calculationResults = calculateHeatPumpLoad(calculationInputs);
    setResults(calculationResults);
  };

  const resetCalculator = () => {
    setInputs({
      floorArea: "",
      insulationLevel: "average",
      airTightness: "average",
      region: "midlands",
      designTemp: "",
      indoorTemp: "21",
      heatPumpType: "air-source",
      emitterType: "radiators",
      dhwOption: "cylinder",
      electricityRate: "0.30"
    });
    setResults(null);
    setErrors({});
  };

  const handleRegionChange = (region: string) => {
    const regionData = UK_REGIONS[region as keyof typeof UK_REGIONS];
    setInputs(prev => ({
      ...prev,
      region: region as keyof typeof UK_REGIONS,
      designTemp: regionData.designTemp.toString()
    }));
  };

  // Transform data for mobile select components
  const insulationOptions = Object.entries(INSULATION_LEVELS).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  const airTightnessOptions = Object.entries(AIR_TIGHTNESS_LEVELS).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  const regionOptions = Object.entries(UK_REGIONS).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  const heatPumpOptions = Object.entries(HEAT_PUMP_TYPES).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  const emitterOptions = Object.entries(EMITTER_TYPES).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  const dhwOptions = Object.entries(DHW_OPTIONS).map(([key, value]) => ({
    value: key,
    label: value.label,
    description: value.description
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2 text-elec-yellow">
          <Thermometer className="h-6 w-6" />
          <h1 className="text-xl font-bold text-elec-light">Heat Pump Load Calculator</h1>
        </div>
        <p className="text-sm text-elec-light/80 max-w-md mx-auto">
          Calculate heat pump sizing, performance, and costs with detailed analysis and recommendations
        </p>
      </div>

      {/* Input Form */}
      <div className="space-y-6">
        {/* Building Details */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
            <Home className="h-4 w-4 text-elec-yellow" />
            Building Details
          </h3>
          
          <div className="space-y-4">
            <MobileInputWrapper
              label="Floor Area"
              placeholder="Enter total floor area"
              value={inputs.floorArea || ""}
              onChange={(value) => setInputs(prev => ({ ...prev, floorArea: value }))}
              type="number"
              unit="m²"
              icon={<Home className="h-4 w-4" />}
              error={errors.floorArea}
              hint="Total heated floor area of the property"
            />

            <MobileSelectWrapper
              label="Insulation Level"
              value={inputs.insulationLevel}
              onValueChange={(value) => setInputs(prev => ({ ...prev, insulationLevel: value as keyof typeof INSULATION_LEVELS }))}
              options={insulationOptions}
              hint="Building age and insulation standard"
            />

            <MobileSelectWrapper
              label="Air Tightness"
              value={inputs.airTightness}
              onValueChange={(value) => setInputs(prev => ({ ...prev, airTightness: value as keyof typeof AIR_TIGHTNESS_LEVELS }))}
              options={airTightnessOptions}
              hint="How well sealed the building is"
            />
          </div>
        </div>

        {/* Location & Climate */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
            <Settings className="h-4 w-4 text-elec-yellow" />
            Location & Climate
          </h3>
          
          <div className="space-y-4">
            <MobileSelectWrapper
              label="UK Region"
              value={inputs.region}
              onValueChange={handleRegionChange}
              options={regionOptions}
              hint="Your location affects design temperature"
            />

            <MobileInputWrapper
              label="Design Temperature"
              placeholder="Coldest expected temperature"
              value={inputs.designTemp}
              onChange={(value) => setInputs(prev => ({ ...prev, designTemp: value }))}
              type="number"
              unit="°C"
              icon={<Thermometer className="h-4 w-4" />}
              error={errors.designTemp}
              hint="Automatically set based on region selection"
            />

            <MobileInputWrapper
              label="Indoor Target Temperature"
              placeholder="Desired indoor temperature"
              value={inputs.indoorTemp}
              onChange={(value) => setInputs(prev => ({ ...prev, indoorTemp: value }))}
              type="number"
              unit="°C"
              icon={<Thermometer className="h-4 w-4" />}
              error={errors.indoorTemp}
              hint="Recommended: 21°C for living areas"
            />
          </div>
        </div>

        {/* System Details */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            System Configuration
          </h3>
          
          <div className="space-y-4">
            <MobileSelectWrapper
              label="Heat Pump Type"
              value={inputs.heatPumpType}
              onValueChange={(value) => setInputs(prev => ({ ...prev, heatPumpType: value as keyof typeof HEAT_PUMP_TYPES }))}
              options={heatPumpOptions}
              hint="Type of heat pump system"
            />

            <MobileSelectWrapper
              label="Heat Emitter Type"
              value={inputs.emitterType}
              onValueChange={(value) => setInputs(prev => ({ ...prev, emitterType: value as keyof typeof EMITTER_TYPES }))}
              options={emitterOptions}
              hint="How heat is distributed in the building"
            />

            <MobileSelectWrapper
              label="Hot Water Option"
              value={inputs.dhwOption}
              onValueChange={(value) => setInputs(prev => ({ ...prev, dhwOption: value as keyof typeof DHW_OPTIONS }))}
              options={dhwOptions}
              hint="Domestic hot water provision"
            />

            <MobileInputWrapper
              label="Electricity Rate"
              placeholder="Cost per kWh"
              value={inputs.electricityRate}
              onChange={(value) => setInputs(prev => ({ ...prev, electricityRate: value }))}
              type="number"
              step="0.01"
              unit="£/kWh"
              icon={<PoundSterling className="h-4 w-4" />}
              error={errors.electricityRate}
              hint="Your electricity tariff rate"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex gap-3 pt-4">
          <MobileButton
            onClick={calculateHeatPump}
            variant="elec"
            size="default"
            className="flex-1"
            icon={<Calculator className="h-4 w-4" />}
          >
            Calculate Heat Pump Load
          </MobileButton>
          <MobileButton
            onClick={resetCalculator}
            variant="outline"
            size="default"
          >
            Reset
          </MobileButton>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Key Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Calculation Results
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                title="Total Heat Load"
                value={results.totalHeatLoad}
                unit="kW"
                subtitle={`Space: ${results.spaceHeatingLoad.toFixed(1)}kW + DHW: ${results.dhwLoad.toFixed(1)}kW`}
                status={results.totalHeatLoad > 15 ? "warning" : "success"}
                icon={<Thermometer className="h-4 w-4" />}
              />

              <ResultCard
                title="Heat Pump COP"
                value={results.cop}
                unit=""
                subtitle={`Seasonal COP: ${results.performance.seasonalCOP.toFixed(1)}`}
                status={results.cop > 3.5 ? "success" : results.cop > 2.5 ? "warning" : "error"}
                icon={<Zap className="h-4 w-4" />}
                onBadgeClick={() => setShowReviewSummary(true)}
              />

              <ResultCard
                title="Electrical Power"
                value={results.electricalPower}
                unit="kW"
                subtitle={`Flow temp: ${results.flowTemperature}°C`}
                status={results.sizing.withinMCS ? "success" : "warning"}
                icon={<Zap className="h-4 w-4" />}
                onBadgeClick={() => setShowReviewSummary(true)}
              />

              <ResultCard
                title="Annual Running Cost"
                value={formatCurrency(results.annualCost, 0)}
                unit=""
                subtitle={`Daily: ${formatCurrency(results.dailyCost)}`}
                status="info"
                icon={<PoundSterling className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Review Summary */}
          {showReviewSummary && results.reviewFindings.length > 0 && (
            <InfoBox
              title="Review Summary"
              icon={<AlertTriangle className="h-5 w-5 text-elec-yellow" />}
              as="section"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-elec-light/80">
                    {results.reviewFindings.length} finding{results.reviewFindings.length !== 1 ? 's' : ''} require attention
                  </p>
                  <MobileButton
                    onClick={() => setShowReviewSummary(false)}
                    variant="outline"
                    size="sm"
                  >
                    Close
                  </MobileButton>
                </div>
                
                <div className="space-y-3">
                  {results.reviewFindings.map((finding) => (
                    <div key={finding.id} className="border-l-2 border-elec-yellow/30 pl-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          finding.type === 'critical' ? "bg-red-500" :
                          finding.type === 'warning' ? "bg-yellow-500" : "bg-blue-500"
                        )} />
                        <h4 className="font-medium text-elec-light text-sm">{finding.title}</h4>
                      </div>
                      <p className="text-xs text-elec-light/70">{finding.description}</p>
                      <p className="text-xs text-elec-light/80 font-medium">
                        Recommendation: {finding.recommendation}
                      </p>
                      {finding.regulation && (
                        <p className="text-xs text-elec-yellow/80 italic">
                          Regulation: {finding.regulation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </InfoBox>
          )}

          {/* Performance Analysis */}
          <InfoBox
            title="Performance Analysis"
            icon={<CheckCircle className="h-5 w-5 text-elec-yellow" />}
            as="section"
          >
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-elec-light">System Efficiency:</span>
                  <p className="text-elec-light/80">{results.performance.efficiency}</p>
                </div>
                <div>
                  <span className="font-medium text-elec-light">Suitability:</span>
                  <p className="text-elec-light/80">{results.performance.suitability}</p>
                </div>
                <div>
                  <span className="font-medium text-elec-light">Carbon Savings:</span>
                  <p className="text-elec-light/80">{results.carbonSavings.toFixed(0)} kg CO₂/year vs gas</p>
                </div>
                <div>
                  <span className="font-medium text-elec-light">MCS Compliance:</span>
                  <p className="text-elec-light/80">
                    {results.sizing.withinMCS ? "✓ Within guidelines" : "⚠ Outside recommended range"}
                  </p>
                </div>
              </div>
            </div>
          </InfoBox>

          {/* Recommendations */}
          {(() => {
            const calculationInputs: HeatPumpInputs = {
              floorArea: parseFloat(inputs.floorArea),
              insulationLevel: inputs.insulationLevel,
              airTightness: inputs.airTightness,
              designTemp: parseFloat(inputs.designTemp),
              indoorTemp: parseFloat(inputs.indoorTemp),
              heatPumpType: inputs.heatPumpType,
              emitterType: inputs.emitterType,
              dhwOption: inputs.dhwOption,
              electricityRate: parseFloat(inputs.electricityRate)
            };
            const recommendations = getRecommendations(calculationInputs, results);
            
            return recommendations.length > 0 ? (
              <InfoBox
                title="Recommendations"
                icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
                points={recommendations}
                as="section"
              />
            ) : null;
          })()}

          {/* Why This Matters */}
          <WhyThisMatters
            title="Why Accurate Heat Pump Sizing Matters"
            points={[
              "Oversized heat pumps cycle frequently, reducing efficiency and increasing wear",
              "Undersized systems cannot maintain comfort during cold weather",
              "Proper sizing ensures optimal COP and lowest running costs",
              "MCS requirements must be met for warranty and RHI eligibility",
              "Flow temperatures affect efficiency - lower is better for heat pumps",
              "Building fabric improvements often more cost-effective than larger heat pumps"
            ]}
          />

          {/* Regulatory Guidance */}
          <InfoBox
            title="UK Regulatory Guidance & Standards"
            icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
            points={getRegulatoryGuidance()}
            as="section"
          />

          {/* Installation Considerations */}
          <InfoBox
            title="Installation Considerations"
            icon={<Settings className="h-5 w-5 text-elec-yellow" />}
            as="section"
          >
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-elec-light mb-2">Electrical Requirements:</h4>
                <ul className="space-y-1 text-elec-light/80">
                  <li>• Single phase suitable up to 12kW electrical input</li>
                  <li>• Three-phase required for larger systems</li>
                  <li>• Dedicated circuit with appropriate protective devices</li>
                  <li>• Emergency controls and isolation switches required</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-elec-light mb-2">System Design:</h4>
                <ul className="space-y-1 text-elec-light/80">
                  <li>• Weather compensation controls improve efficiency</li>
                  <li>• Buffer tanks may be required for short cycling</li>
                  <li>• Defrost provision essential for air source systems</li>
                  <li>• Backup heating consideration for extreme weather</li>
                </ul>
              </div>
            </div>
          </InfoBox>
        </div>
      )}
    </div>
  );
};

export default HeatPumpCalculator;
