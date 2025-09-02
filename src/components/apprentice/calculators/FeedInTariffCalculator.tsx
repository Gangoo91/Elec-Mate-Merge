import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, TrendingUp, Zap, PoundSterling, Clock, Info, AlertTriangle } from "lucide-react";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";

interface FeedInResult {
  yearlyGeneration: number;
  generationPayment: number;
  exportPayment: number;
  selfConsumptionSaving: number;
  totalAnnualReturn: number;
  totalReturn20Years: number;
  simplePayback: number;
  roi: number;
  fitRate: number;
  exportRate: number;
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
    { value: 'solar_pv', label: 'Solar PV (Photovoltaic)' },
    { value: 'wind', label: 'Wind Power Turbine' },
    { value: 'hydro', label: 'Hydro Power' },
    { value: 'anaerobic_digestion', label: 'Anaerobic Digestion' },
    { value: 'micro_chp', label: 'Micro Combined Heat & Power' }
  ];

  const installationPeriods = [
    { value: 'before_2012', label: 'Before April 2012 (Premium rates)' },
    { value: '2012_2013', label: 'April 2012 - March 2013' },
    { value: '2013_2014', label: 'April 2013 - March 2014' },
    { value: '2014_2015', label: 'April 2014 - March 2015' },
    { value: '2015_2016', label: 'April 2015 - March 2016' },
    { value: '2016_2017', label: 'April 2016 - March 2017' },
    { value: '2017_2018', label: 'April 2017 - March 2018' },
    { value: '2018_2019', label: 'April 2018 - March 2019' },
    { value: 'after_2019', label: 'After March 2019 (SEG only)' }
  ];

  const getFeedInRates = (period: string, technology: string, size: number) => {
    // Historical FIT rates (generation payments in £/kWh)
    const rates: any = {
      'before_2012': { solar_pv: 0.431, wind: 0.341, hydro: 0.199, export: 0.032 },
      '2012_2013': { solar_pv: 0.214, wind: 0.262, hydro: 0.199, export: 0.032 },
      '2013_2014': { solar_pv: 0.147, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2014_2015': { solar_pv: 0.128, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2015_2016': { solar_pv: 0.124, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2016_2017': { solar_pv: 0.043, wind: 0.088, hydro: 0.199, export: 0.047 },
      '2017_2018': { solar_pv: 0.039, wind: 0.088, hydro: 0.199, export: 0.047 },
      '2018_2019': { solar_pv: 0.037, wind: 0.088, hydro: 0.199, export: 0.047 },
      'after_2019': { solar_pv: 0.000, wind: 0.000, hydro: 0.000, export: 0.055 } // SEG rates only
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
    
    // Calculate annual generation based on technology
    let yearlyGeneration;
    if (technologyType === 'solar_pv') {
      yearlyGeneration = size * sunHours * 365;
    } else if (technologyType === 'wind') {
      yearlyGeneration = size * 24 * 365 * 0.25; // 25% capacity factor for wind
    } else if (technologyType === 'hydro') {
      yearlyGeneration = size * 24 * 365 * 0.40; // 40% capacity factor for hydro
    } else {
      yearlyGeneration = size * 24 * 365 * 0.60; // 60% for AD/CHP
    }

    // Calculate payments and savings
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
      roi,
      fitRate: rates.generation,
      exportRate: rates.export
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

  const getPaybackColor = (years: number) => {
    if (years <= 8) return 'text-elec-green';
    if (years <= 12) return 'text-elec-yellow';
    return 'text-elec-orange';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 10) return 'text-elec-green';
    if (roi >= 5) return 'text-elec-yellow';
    return 'text-elec-orange';
  };

  const isSchemeActive = installationDate && installationDate !== 'after_2019';

  return (
    <div className="w-full space-y-6">
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-elec-light flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            Feed-in Tariff Calculator
          </CardTitle>
          <CardDescription className="text-elec-light/80">
            Calculate historical Feed-in Tariff payments and returns for existing installations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              System Details
            </h3>
            
            <div className="space-y-4">
              <MobileInputWrapper
                type="number"
                label="System Size"
                placeholder="Enter installed capacity"
                value={systemSize}
                onChange={setSystemSize}
                unit="kW"
                step="0.1"
                hint="Total installed capacity of your renewable energy system"
                icon={<Zap className="h-4 w-4" />}
              />
              
              <MobileSelectWrapper
                label="Installation Period"
                placeholder="When was your system installed?"
                value={installationDate}
                onValueChange={setInstallationDate}
                options={installationPeriods}
                hint="FIT rates varied significantly by installation date"
              />
              
              <MobileSelectWrapper
                label="Technology Type"
                placeholder="Select your renewable technology"
                value={technologyType}
                onValueChange={setTechnologyType}
                options={technologyTypes}
                hint="Different technologies had different FIT rates and generation patterns"
              />
              
              {technologyType === 'solar_pv' && (
                <MobileInputWrapper
                  type="number"
                  label="Peak Sun Hours"
                  placeholder="UK average: 2.5-4.5 hrs"
                  value={peakSunHours}
                  onChange={setPeakSunHours}
                  unit="hrs/day"
                  step="0.1"
                  hint="Average daily peak sun hours for your location in the UK"
                  icon={<Zap className="h-4 w-4" />}
                />
              )}
            </div>
          </div>

          {/* Financial Parameters */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
              Financial Details
            </h3>
            
            <div className="space-y-4">
              <MobileInputWrapper
                type="number"
                label="Installation Cost"
                placeholder="Total system cost"
                value={installationCost}
                onChange={setInstallationCost}
                unit="£"
                step="100"
                hint="Total cost including equipment, installation, and commissioning"
                icon={<PoundSterling className="h-4 w-4" />}
              />
              
              <MobileInputWrapper
                type="number"
                label="Self Consumption"
                placeholder="% of generation used on-site"
                value={selfConsumption}
                onChange={setSelfConsumption}
                unit="%"
                step="5"
                hint="Percentage of generated energy used directly rather than exported"
                icon={<TrendingUp className="h-4 w-4" />}
              />
              
              <MobileInputWrapper
                type="number"
                label="Electricity Price"
                placeholder="Current electricity rate"
                value={electricityPrice}
                onChange={setElectricityPrice}
                unit="£/kWh"
                step="0.01"
                hint="Your current electricity tariff rate for calculating self-consumption savings"
                icon={<PoundSterling className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <MobileButton 
              onClick={calculateFeedInTariff} 
              variant="elec" 
              size="wide"
              className="flex-1"
            >
              <Calculator className="h-4 w-4" />
              Calculate Returns
            </MobileButton>
            <MobileButton 
              onClick={reset} 
              variant="outline" 
              size="default"
              className="px-4"
            >
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Generation & Rate Information */}
          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light flex items-center justify-between">
                <span>Feed-in Tariff Results</span>
                {isSchemeActive ? (
                  <span className="text-sm font-medium text-elec-green">Active FIT</span>
                ) : (
                  <span className="text-sm font-medium text-elec-orange">SEG Only</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Generation Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Annual Generation</p>
                      <p className="text-xs text-elec-light/70">Expected yearly output</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">{result.yearlyGeneration.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">kWh/year</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Generation Payment</p>
                      <p className="text-xs text-elec-light/70">FIT rate: {result.fitRate.toFixed(3)}p/kWh</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">£{result.generationPayment.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">per year</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Export Payment</p>
                      <p className="text-xs text-elec-light/70">Export rate: {result.exportRate.toFixed(3)}p/kWh</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">£{result.exportPayment.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">per year</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Self-consumption Saving</p>
                      <p className="text-xs text-elec-light/70">Energy used on-site</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">£{result.selfConsumptionSaving.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">per year</p>
                  </div>
                </div>
              </div>

              {/* Total Returns */}
              <div className="border-t border-elec-yellow/20 pt-3">
                <div className="flex items-center justify-between p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
                  <div>
                    <p className="text-base font-semibold text-elec-light">Total Annual Return</p>
                    <p className="text-xs text-elec-light/70">All income streams combined</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-elec-yellow">£{result.totalAnnualReturn.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">per year</p>
                  </div>
                </div>
              </div>

              {/* Investment Analysis */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="text-center p-3 bg-elec-dark/20 rounded-lg">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-elec-light/70" />
                  <p className="font-medium text-elec-light">Payback Period</p>
                  <p className={`text-lg font-bold ${getPaybackColor(result.simplePayback)}`}>
                    {result.simplePayback.toFixed(1)} years
                  </p>
                </div>
                <div className="text-center p-3 bg-elec-dark/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-elec-light/70" />
                  <p className="font-medium text-elec-light">Annual ROI</p>
                  <p className={`text-lg font-bold ${getROIColor(result.roi)}`}>
                    {result.roi.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-3 bg-elec-dark/20 rounded-lg">
                  <PoundSterling className="h-4 w-4 mx-auto mb-1 text-elec-light/70" />
                  <p className="font-medium text-elec-light">20-Year Total</p>
                  <p className="text-lg font-bold text-elec-yellow">£{(result.totalReturn20Years/1000).toFixed(0)}k</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <InfoBox
            title="Feed-in Tariff Scheme Information"
            icon={<Info className="h-4 w-4" />}
            points={[
              "The Feed-in Tariff scheme closed to new applicants in March 2019",
              "Existing installations continue to receive payments for their full 20-year term",
              "These calculations show historical rates and are subject to annual inflation adjustments (RPI)",
              "Always verify current rates with your energy supplier or check the latest Ofgem tariff tables"
            ]}
          />

          {!isSchemeActive && (
            <Alert className="border-elec-orange/40 bg-elec-orange/10">
              <AlertTriangle className="h-4 w-4 text-elec-orange" />
              <AlertDescription className="text-elec-light">
                <strong>New Installations:</strong> Systems installed after March 2019 are not eligible for FIT. 
                However, you may be eligible for the Smart Export Guarantee (SEG), which pays for exported 
                electricity. Current SEG rates are typically 3-7p/kWh, significantly lower than historical FIT rates.
              </AlertDescription>
            </Alert>
          )}

          <WhyThisMatters
            title="Understanding Your Returns"
            points={[
              "Feed-in Tariff returns come from three sources: generation payments (paid for all electricity produced), export payments (for surplus electricity), and self-consumption savings (reduced electricity bills)",
              "Higher self-consumption generally improves overall returns, especially for post-2016 installations with lower FIT rates",
              "Generation payments are inflation-linked and guaranteed for 20 years from installation date",
              "Export rates may vary by supplier, especially for SEG-eligible installations"
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default FeedInTariffCalculator;