import { useState } from 'react';
import {
  Info,
  CheckCircle2,
  RotateCcw,
  Zap,
  Plus,
  BarChart3,
  Calculator,
  Lightbulb,
  TrendingDown,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorSelect,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { useMultiLoadDiversityCalculator } from './diversity-factor/useMultiLoadDiversityCalculator';
import { LoadEntry } from './diversity-factor/LoadEntry';

const DiversityFactorCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const {
    loads,
    location,
    supplyVoltage,
    supplyType,
    inputMode,
    result,
    errors,
    showResults,
    addLoad,
    removeLoad,
    updateLoad,
    setLocation,
    setSupplyVoltage,
    setSupplyType,
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,
    loadTypes,
  } = useMultiLoadDiversityCalculator();

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showPractical, setShowPractical] = useState(false);
  const [showWorkings, setShowWorkings] = useState(false);

  const getMainDeviceRecommendation = () => {
    if (!result) return '';
    const current = result.diversifiedCurrent;

    if (current <= 6) return '6A MCB/RCBO';
    if (current <= 10) return '10A MCB/RCBO';
    if (current <= 16) return '16A MCB/RCBO';
    if (current <= 20) return '20A MCB/RCBO';
    if (current <= 25) return '25A MCB/RCBO';
    if (current <= 32) return '32A MCB/RCBO';
    if (current <= 40) return '40A MCB/RCBO';
    if (current <= 50) return '50A MCB/RCBO';
    if (current <= 63) return '63A Main Switch';
    if (current <= 80) return '80A Main Switch';
    if (current <= 100) return '100A Main Switch';
    return '125A+ Main Switch';
  };

  const locationOptions = [
    { value: 'domestic', label: 'Domestic Installation' },
    { value: 'commercial', label: 'Commercial Installation' },
    { value: 'industrial', label: 'Industrial Installation' },
  ];

  const voltageOptions = [
    { value: '230', label: '230V' },
    { value: '400', label: '400V' },
  ];

  const supplyTypeOptions = [
    { value: 'single-phase', label: 'Single Phase' },
    { value: 'three-phase', label: 'Three Phase' },
  ];

  return (
    <CalculatorCard
      category="power"
      title="Diversity Factor Calculator"
      description="Calculate electrical demand after applying IET On-Site Guide diversity allowances"
    >
      {/* Input Mode Toggle */}
      <div className="space-y-2">
        <p className="text-sm text-white">Input Mode</p>
        <div className="flex gap-2">
          <button
            onClick={() => toggleInputMode('amperage')}
            className={cn(
              'flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation',
              inputMode === 'amperage'
                ? 'text-black'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            )}
            style={
              inputMode === 'amperage'
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <div className="flex flex-col items-center">
              <span className="font-semibold">Amperage</span>
              <span className="text-xs opacity-80">(A)</span>
            </div>
          </button>
          <button
            onClick={() => toggleInputMode('kw')}
            className={cn(
              'flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation',
              inputMode === 'kw'
                ? 'text-black'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            )}
            style={
              inputMode === 'kw'
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <div className="flex flex-col items-center">
              <span className="font-semibold">Power</span>
              <span className="text-xs opacity-80">(kW)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CalculatorSelect
          label="Installation Type"
          value={location}
          onChange={setLocation}
          options={locationOptions}
        />
        <CalculatorSelect
          label="Supply Type"
          value={supplyType}
          onChange={setSupplyType}
          options={supplyTypeOptions}
        />
        <CalculatorSelect
          label="Supply Voltage"
          value={supplyVoltage}
          onChange={setSupplyVoltage}
          options={voltageOptions}
        />
      </div>

      <CalculatorDivider category="power" />

      {/* Loads Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              Circuit Loads
            </h3>
            <p className="text-xs text-white mt-1">
              Add loads for comprehensive diversity calculation
            </p>
          </div>
          <button
            onClick={addLoad}
            className="h-10 px-3 flex items-center gap-2 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 text-sm font-medium hover:bg-amber-400/30 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            Add Load
          </button>
        </div>

        <div className="space-y-3">
          {loads.map((load, index) => (
            <LoadEntry
              key={load.id}
              load={load}
              index={index}
              canRemove={loads.length > 1}
              loadTypes={loadTypes}
              errors={errors}
              inputMode={inputMode}
              supplyVoltage={supplyVoltage}
              onUpdate={updateLoad}
              onRemove={removeLoad}
              onClearError={clearError}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculateDemand}
            disabled={loads.some((load) => !load.type || !load.connectedLoad)}
            className={cn(
              'flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation',
              !loads.some((load) => !load.type || !load.connectedLoad)
                ? 'text-black'
                : 'bg-white/10 text-white cursor-not-allowed'
            )}
            style={
              !loads.some((load) => !load.type || !load.connectedLoad)
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate Diversity
          </button>
          <button
            onClick={resetCalculator}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && result ? (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-300">Diversity Results</span>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Total Installed Load"
                value={`${result.totalInstalledLoad.toFixed(2)} kW`}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Diversified Load"
                value={`${result.diversifiedLoad.toFixed(2)} kW`}
                category="power"
                size="lg"
              />
              <ResultValue
                label="Design Current"
                value={`${result.totalDesignCurrent.toFixed(1)} A`}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Diversified Current"
                value={`${result.diversifiedCurrent.toFixed(1)} A`}
                category="power"
                size="lg"
              />
            </ResultsGrid>

            {/* Diversity Factor */}
            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">Overall Diversity Factor:</span>
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {(result.overallDiversityFactor * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Per-Circuit-Type Breakdown */}
            {result.breakdownByType.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Load Breakdown by Type</span>
                </div>
                <div className="space-y-2">
                  {result.breakdownByType.map((breakdown, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white/[0.04] border border-white/5"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-white">
                          {breakdown.displayName}
                          {breakdown.count > 1 ? ` (${breakdown.count})` : ''}
                        </span>
                        <span className="text-sm font-semibold text-amber-400">
                          {(breakdown.diversityFactor * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-xs text-white space-y-1">
                        <div className="flex justify-between">
                          <span>
                            {breakdown.installedCurrent.toFixed(1)}A /{' '}
                            {breakdown.installedLoad.toFixed(2)} kW installed
                          </span>
                          <span className="font-medium">
                            {breakdown.diversifiedCurrent.toFixed(1)}A /{' '}
                            {breakdown.diversifiedLoad.toFixed(2)} kW diversified
                          </span>
                        </div>
                        <p className="text-white font-mono text-xs">{breakdown.formula}</p>
                        <p className="text-white text-xs">{breakdown.regulation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Protection Recommendation */}
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">Protection Device:</span>
                <span className="text-sm text-white">{getMainDeviceRecommendation()}</span>
              </div>
            </div>

            {/* Load Reduction Summary */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-white">
                <span className="font-medium">Total Load Reduction:</span>{' '}
                {(result.totalInstalledLoad - result.diversifiedLoad).toFixed(2)} kW (
                {(
                  ((result.totalInstalledLoad - result.diversifiedLoad) /
                    result.totalInstalledLoad) *
                  100
                ).toFixed(1)}
                % reduction)
              </p>
            </div>
          </div>

          <CalculatorDivider category="power" />

          {/* How It Worked Out — step-by-step */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showWorkings && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="text-sm font-mono text-white space-y-4 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                {/* Step 1: List circuits */}
                <div>
                  <p className="text-xs text-purple-400 mb-2">Step 1: Circuit loads by type</p>
                  {result.breakdownByType.map((b, i) => (
                    <div key={i} className="pl-3 border-l-2 border-purple-500/30 mb-1">
                      {b.displayName}: {b.installedCurrent.toFixed(1)}A (
                      {b.installedLoad.toFixed(2)} kW)
                    </div>
                  ))}
                </div>

                {/* Step 2: Per-type diversity with formulas */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-2">Step 2: Apply diversity per type</p>
                  {result.breakdownByType.map((b, i) => (
                    <div key={i} className="pl-3 border-l-2 border-purple-500/30 mb-2">
                      <p className="font-semibold text-white">{b.displayName}:</p>
                      {b.steps.map((step, si) => (
                        <p key={si} className="text-white text-xs ml-2">
                          {step}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Step 3: Sum */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 3: Sum diversified demand</p>
                  <p>
                    Total diversified ={' '}
                    {result.breakdownByType
                      .map((b) => `${b.diversifiedCurrent.toFixed(1)}`)
                      .join(' + ')}
                  </p>
                  <p>
                    ={' '}
                    <span className="text-white font-bold">
                      {result.breakdownByType
                        .reduce((sum, b) => sum + b.diversifiedCurrent, 0)
                        .toFixed(1)}
                      A
                    </span>
                  </p>
                </div>

                {/* Step 4: Convert to current */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 4: Overall current (
                    {supplyType === 'three-phase' ? '3-phase' : 'single-phase'})
                  </p>
                  {supplyType === 'three-phase' ? (
                    <>
                      <p>I = (P × 1000) / (sqrt(3) × V)</p>
                      <p>
                        I = ({result.diversifiedLoad.toFixed(2)} × 1000) / (1.732 × {supplyVoltage})
                      </p>
                    </>
                  ) : (
                    <>
                      <p>I = (P × 1000) / V</p>
                      <p>
                        I = ({result.diversifiedLoad.toFixed(2)} × 1000) / {supplyVoltage}
                      </p>
                    </>
                  )}
                  <p>
                    I ={' '}
                    <span className="text-white font-bold">
                      {result.diversifiedCurrent.toFixed(1)}A
                    </span>
                  </p>
                </div>

                {/* Step 5: Protection sizing */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 5: Protection device sizing</p>
                  <p>Diversified current: {result.diversifiedCurrent.toFixed(1)}A</p>
                  <p>
                    Recommended:{' '}
                    <span className="text-white font-bold">{getMainDeviceRecommendation()}</span>
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Practical Impact:</h4>
                  <div className="space-y-2">
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>Cable Savings:</strong> Use smaller cables than total load suggests
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>Protection:</strong> {getMainDeviceRecommendation()} recommended
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>Cost Reduction:</strong>{' '}
                        {(
                          ((result.totalInstalledLoad - result.diversifiedLoad) /
                            result.totalInstalledLoad) *
                          100
                        ).toFixed(1)}
                        % load reduction saves on installation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Engineering Basis:</h4>
                  <div className="space-y-2">
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>Diversity Factor:</strong> Not all loads operate simultaneously
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>IET On-Site Guide:</strong> Based on Table 1B diversity allowances
                        (domestic) and Table H2 (commercial/industrial)
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-400/40 pl-3">
                      <p className="text-white">
                        <strong>Note:</strong> Diversity allowances are published in the IET On-Site
                        Guide, not BS 7671 directly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Practical Recommendations */}
          <Collapsible open={showPractical} onOpenChange={setShowPractical}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-4 w-4 text-green-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  Next Steps & Recommendations
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showPractical && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Cable Sizing:</h4>
                  <div className="space-y-2">
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">
                        Design for {result.diversifiedCurrent.toFixed(1)}A, not{' '}
                        {result.totalDesignCurrent.toFixed(1)}A
                      </p>
                    </div>
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">Consider voltage drop at diversified current</p>
                    </div>
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">Apply derating factors for installation method</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Future Considerations:</h4>
                  <div className="space-y-2">
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">Plan for 20-30% future load growth</p>
                    </div>
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">Review diversity if load patterns change</p>
                    </div>
                    <div className="border-l-2 border-green-400/40 pl-3">
                      <p className="text-white">Document assumptions for future reference</p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Compliance Notes */}
          {result.complianceNotes.length > 0 && (
            <>
              <CalculatorDivider category="power" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Compliance Notes</span>
                </div>
                <div className="space-y-1">
                  {result.complianceNotes.map((note, index) => (
                    <p key={index} className="text-xs text-white flex items-start gap-2">
                      <span className="text-white">•</span>
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <CalculatorDivider category="power" />
          <div className="p-8 text-center rounded-xl bg-white/[0.04]">
            <Calculator className="h-12 w-12 mx-auto mb-3 text-white" />
            <p className="text-lg font-medium text-white mb-2">Ready to Calculate</p>
            <p className="text-sm text-white">
              Add your circuit loads and click "Calculate Diversity" to see results
            </p>
            <div className="mt-4 text-xs text-white space-y-1">
              <p>• Configure installation type and voltage</p>
              <p>• Add circuit loads with their types</p>
              <p>• Choose between kW or Amperage input</p>
              <p>• Get IET On-Site Guide compliant diversity calculations</p>
            </div>
          </div>
        </>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span className="text-sm sm:text-base font-medium text-white">
              IET Diversity Reference
            </span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-white transition-transform duration-200',
              showReference && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-2">
          <div className="space-y-3 pl-1">
            <div className="border-l-2 border-amber-400/40 pl-3">
              <p className="text-sm text-white">
                <strong className="text-white">IET On-Site Guide Table 1B:</strong> Diversity
                allowances for domestic installations
              </p>
            </div>
            <div className="border-l-2 border-amber-400/40 pl-3">
              <p className="text-sm text-white">
                <strong className="text-white">IET On-Site Guide Table H2:</strong> Diversity
                allowances for commercial and industrial installations
              </p>
            </div>
            <div className="border-l-2 border-amber-400/40 pl-3">
              <p className="text-sm text-white">
                <strong className="text-white">Note:</strong> Diversity allowances are not published
                in BS 7671 directly. They appear in the IET On-Site Guide (a companion publication).
              </p>
            </div>
            <div className="border-l-2 border-amber-400/40 pl-3">
              <p className="text-sm text-white">
                Consider simultaneity and load patterns when applying diversity
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </CalculatorCard>
  );
};

export default DiversityFactorCalculator;
