import React, { useState } from 'react';
import { Calculator, Battery, Zap, Clock, AlertTriangle, Settings, Thermometer, Plus, X, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileInputWrapper } from '@/components/ui/mobile-input-wrapper';
import { MobileSelectWrapper } from '@/components/ui/mobile-select-wrapper';
import { MobileButton } from '@/components/ui/mobile-button';
import { ResultCard } from '@/components/ui/result-card';
import { Badge } from '@/components/ui/badge';
import SmartInputSuggestions from './smart-features/SmartInputSuggestions';
import { 
  calculateBatteryBackup, 
  BATTERY_CHEMISTRIES, 
  INVERTER_TYPES, 
  LOAD_PRESETS,
  formatRuntime,
  getChemistryColor,
  getStatusColor,
  type BatteryInputs,
  type CalculationResults 
} from '@/lib/battery-backup-calcs';

interface Load {
  name: string;
  watts: number;
  dutyCycle: number;
  surgeMultiplier: number;
  priority: 'essential' | 'important' | 'convenience';
}

const BatteryBackupCalculator = () => {
  // Mode and basic inputs
  const [mode, setMode] = useState<'runtime' | 'sizing'>('runtime');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Battery configuration
  const [chemistry, setChemistry] = useState('lead-acid-agm');
  const [nominalVoltage, setNominalVoltage] = useState(12);
  const [capacityAh, setCapacityAh] = useState('');
  const [seriesStrings, setSeriesStrings] = useState(1);
  const [parallelStrings, setParallelStrings] = useState(1);
  const [customDoD, setCustomDoD] = useState('');
  
  // Environmental
  const [ambientTemp, setAmbientTemp] = useState(20);
  const [batteryHealth, setBatteryHealth] = useState(100);
  
  // Inverter
  const [inverterType, setInverterType] = useState('line-interactive');
  const [customEfficiency, setCustomEfficiency] = useState('');
  const [customHeadroom, setCustomHeadroom] = useState('');
  
  // DC system
  const [dcCableLength, setDcCableLength] = useState(2);
  const [maxVoltDrop, setMaxVoltDrop] = useState(3);
  
  // Loads
  const [loads, setLoads] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState<Load>({
    name: '',
    watts: 0,
    dutyCycle: 1.0,
    surgeMultiplier: 1.0,
    priority: 'essential'
  });
  
  // For sizing mode
  const [requiredRuntime, setRequiredRuntime] = useState('');
  
  // Results
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleLoadPresetSelect = (preset: typeof LOAD_PRESETS[0]) => {
    setNewLoad({
      name: preset.name,
      watts: preset.watts,
      dutyCycle: preset.dutyCycle,
      surgeMultiplier: preset.surgeMultiplier,
      priority: preset.category
    });
  };

  const addLoad = () => {
    if (!newLoad.name || newLoad.watts <= 0) return;
    setLoads([...loads, { ...newLoad }]);
    setNewLoad({
      name: '',
      watts: 0,
      dutyCycle: 1.0,
      surgeMultiplier: 1.0,
      priority: 'essential'
    });
  };

  const removeLoad = (index: number) => {
    setLoads(loads.filter((_, i) => i !== index));
  };

  const calculateBackup = () => {
    if (!capacityAh || loads.length === 0) return;
    
    const inputs: BatteryInputs = {
      mode,
      chemistry,
      nominalVoltage,
      capacityAh: parseFloat(capacityAh),
      seriesStrings,
      parallelStrings,
      customDoD: customDoD ? parseFloat(customDoD) / 100 : undefined,
      ambientTemp,
      batteryHealth,
      loads,
      inverterType,
      customEfficiency: customEfficiency ? parseFloat(customEfficiency) / 100 : undefined,
      customHeadroom: customHeadroom ? parseFloat(customHeadroom) / 100 : undefined,
      dcCableLength,
      maxVoltDrop,
      requiredRuntime: mode === 'sizing' && requiredRuntime ? parseFloat(requiredRuntime) : undefined
    };

    try {
      const calculationResults = calculateBatteryBackup(inputs);
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const reset = () => {
    setCapacityAh('');
    setLoads([]);
    setResults(null);
    setRequiredRuntime('');
  };

  const selectedChemistry = BATTERY_CHEMISTRIES[chemistry];
  const selectedInverter = INVERTER_TYPES[inverterType];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-elec-yellow/10 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Battery Backup Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate runtime for battery backup systems with accurate chemistry modelling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Calculation Mode</label>
            <div className="flex gap-2">
              <MobileButton
                variant={mode === 'runtime' ? 'elec' : 'outline'}
                size="sm"
                onClick={() => setMode('runtime')}
              >
                <Clock className="mr-2 h-4 w-4" />
                Calculate Runtime
              </MobileButton>
              <MobileButton
                variant={mode === 'sizing' ? 'elec' : 'outline'}
                size="sm"
                onClick={() => setMode('sizing')}
              >
                <Battery className="mr-2 h-4 w-4" />
                Size Battery
              </MobileButton>
            </div>
          </div>

          {/* Battery Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Battery System</h3>
            
            {/* Chemistry Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Battery Chemistry</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(BATTERY_CHEMISTRIES).map(([key, chem]) => (
                  <Badge
                    key={key}
                    variant={chemistry === key ? 'default' : 'outline'}
                    className={`cursor-pointer ${chemistry === key ? 'bg-elec-yellow text-black' : ''}`}
                    onClick={() => setChemistry(key)}
                  >
                    {chem.name}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                DoD: {(selectedChemistry.defaultDoD * 100).toFixed(0)}%, 
                Peukert: {selectedChemistry.peukertExponent}, 
                Max C-rate: {selectedChemistry.maxCRate}C
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileSelectWrapper
                label="Voltage"
                value={nominalVoltage.toString()}
                onValueChange={(value) => setNominalVoltage(parseInt(value))}
                options={[
                  { value: '12', label: '12V' },
                  { value: '24', label: '24V' },
                  { value: '48', label: '48V' }
                ]}
              />
              
              <MobileInputWrapper
                label="Capacity (Ah)"
                type="number"
                value={capacityAh}
                onChange={setCapacityAh}
                placeholder="e.g., 100"
              />
              
              <MobileInputWrapper
                label="Parallel Strings"
                type="number"
                value={parallelStrings.toString()}
                onChange={(value) => setParallelStrings(parseInt(value) || 1)}
                hint="Number of parallel battery strings"
              />
            </div>
          </div>

          {/* Inverter Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Inverter/UPS</h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(INVERTER_TYPES).map(([key, inv]) => (
                <Badge
                  key={key}
                  variant={inverterType === key ? 'default' : 'outline'}
                  className={`cursor-pointer ${inverterType === key ? 'bg-elec-yellow text-black' : ''}`}
                  onClick={() => setInverterType(key)}
                >
                  {inv.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Efficiency: {(selectedInverter.efficiency * 100).toFixed(0)}%, 
              Headroom: {(selectedInverter.defaultHeadroom * 100).toFixed(0)}%
            </p>
          </div>

          {/* Loads Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Loads</h3>
            
            {/* Load Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Add (Common Loads)</label>
              <div className="flex flex-wrap gap-2">
                {LOAD_PRESETS.map((preset, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-elec-yellow/10"
                    onClick={() => handleLoadPresetSelect(preset)}
                  >
                    {preset.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Manual Load Entry */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <MobileInputWrapper
                label="Load Name"
                value={newLoad.name}
                onChange={(value) => setNewLoad({...newLoad, name: value})}
                placeholder="e.g., LED Lights"
              />
              
              <div className="space-y-2">
                <MobileInputWrapper
                  label="Power (W)"
                  type="number"
                  value={newLoad.watts.toString()}
                  onChange={(value) => setNewLoad({...newLoad, watts: parseFloat(value) || 0})}
                  placeholder="e.g., 50"
                />
                <SmartInputSuggestions
                  fieldType="power"
                  currentValue={newLoad.watts.toString()}
                  onSuggestionSelect={(value) => setNewLoad({...newLoad, watts: parseFloat(value) || 0})}
                  calculatorType="battery-backup"
                />
              </div>
              
              <MobileSelectWrapper
                label="Priority"
                value={newLoad.priority}
                onValueChange={(value) => setNewLoad({...newLoad, priority: value as any})}
                options={[
                  { value: 'essential', label: 'Essential' },
                  { value: 'important', label: 'Important' },
                  { value: 'convenience', label: 'Convenience' }
                ]}
              />
              
              <div className="flex items-end">
                <MobileButton onClick={addLoad} disabled={!newLoad.name || newLoad.watts <= 0}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Load
                </MobileButton>
              </div>
            </div>
          </div>

          {/* Current Loads */}
          {loads.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-md font-medium">Connected Loads</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {loads.map((load, index) => (
                  <div key={index} className="flex items-center justify-between bg-elec-dark/30 p-3 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{load.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {load.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {load.watts}W × {(load.dutyCycle * 100).toFixed(0)}% = {(load.watts * load.dutyCycle).toFixed(0)}W avg
                        {load.surgeMultiplier > 1 && ` (${(load.watts * load.surgeMultiplier).toFixed(0)}W surge)`}
                      </div>
                    </div>
                    <MobileButton
                      variant="outline"
                      size="sm"
                      onClick={() => removeLoad(index)}
                    >
                      <X className="h-4 w-4" />
                    </MobileButton>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          <div className="space-y-4">
            <MobileButton
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </MobileButton>

            {showAdvanced && (
              <div className="space-y-4 border border-elec-yellow/10 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInputWrapper
                    label="Ambient Temperature (°C)"
                    type="number"
                    value={ambientTemp.toString()}
                    onChange={(value) => setAmbientTemp(parseFloat(value) || 20)}
                    icon={<Thermometer />}
                  />
                  
                  <MobileInputWrapper
                    label="Battery Health (%)"
                    type="number"
                    value={batteryHealth.toString()}
                    onChange={(value) => setBatteryHealth(parseFloat(value) || 100)}
                    hint="100% = new battery, 70% = end of life"
                  />
                  
                  <MobileInputWrapper
                    label="Custom DoD (%)"
                    type="number"
                    value={customDoD}
                    onChange={setCustomDoD}
                    placeholder={`Default: ${(selectedChemistry.defaultDoD * 100).toFixed(0)}%`}
                  />
                  
                  <MobileInputWrapper
                    label="DC Cable Length (m)"
                    type="number"
                    value={dcCableLength.toString()}
                    onChange={(value) => setDcCableLength(parseFloat(value) || 2)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sizing Mode Additional Input */}
          {mode === 'sizing' && (
            <MobileInputWrapper
              label="Required Runtime (hours)"
              type="number"
              value={requiredRuntime}
              onChange={setRequiredRuntime}
              placeholder="e.g., 8"
              hint="How long do you need the system to run?"
            />
          )}

          {/* Calculate Button */}
          <div className="flex gap-3">
            <MobileButton
              onClick={calculateBackup}
              disabled={!capacityAh || loads.length === 0}
              className="flex-1"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Analyse Battery System
            </MobileButton>
            <MobileButton variant="outline" onClick={reset}>
              Reset
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Key Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mode === 'runtime' ? (
              <ResultCard
                title="Estimated Runtime"
                value={formatRuntime(results.runtime)}
                subtitle="All loads average power"
                status={getStatusColor(results.runtime, 8, 2)}
                icon={<Clock />}
              />
            ) : (
              <ResultCard
                title="Required Battery"
                value={results.requiredAh?.toFixed(0) || 'N/A'}
                unit="Ah"
                subtitle="Per string"
                status={results.requiredAh ? 'success' : 'error'}
                icon={<Battery />}
              />
            )}
            
            <ResultCard
              title="Usable Energy"
              value={results.usableEnergyWh.toFixed(0)}
              unit="Wh"
              subtitle={`${(results.usableEnergyWh / results.bankEnergyWh * 100).toFixed(0)}% of total capacity`}
              status="info"
              icon={<Zap />}
            />
            
            <ResultCard
              title="DC Current"
              value={results.dcCurrent.toFixed(1)}
              unit="A"
              subtitle={`${results.cRate.toFixed(2)}C discharge rate`}
              status={getStatusColor(selectedChemistry.maxCRate - results.cRate, 0.2, 0.1)}
              icon={<Battery />}
            />
          </div>

          {/* Load Analysis */}
          <Card className="border-elec-yellow/10 bg-elec-card">
            <CardHeader>
              <CardTitle>Load Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Essential Loads</span>
                    <Badge variant="destructive">{results.loadsByPriority.essential.toFixed(0)}W</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Runtime: {formatRuntime(results.loadsByPriority.essential > 0 ? results.usableEnergyWh / results.loadsByPriority.essential : 0)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">+ Important</span>
                    <Badge variant="secondary">{(results.loadsByPriority.essential + results.loadsByPriority.important).toFixed(0)}W</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Runtime: {formatRuntime((results.loadsByPriority.essential + results.loadsByPriority.important) > 0 ? results.usableEnergyWh / (results.loadsByPriority.essential + results.loadsByPriority.important) : 0)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">All Loads</span>
                    <Badge>{results.averagePower.toFixed(0)}W</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Peak: {results.peakPower.toFixed(0)}W, Surge: {results.surgePower.toFixed(0)}W
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard
              title="Recommended Inverter"
              value={results.recommendedWatts.toFixed(0)}
              unit="W"
              subtitle={`${results.recommendedVA.toFixed(0)}VA, surge: ${results.surgeCapability.toFixed(0)}W`}
              status="info"
              icon={<Zap />}
            />
            
            <ResultCard
              title="Charger & Recharge"
              value={results.recommendedChargeAmps.toFixed(1)}
              unit="A"
              subtitle={`Recharge time: ${formatRuntime(results.rechargeTime)}`}
              status="info"
              icon={<Battery />}
            />
            
            <ResultCard
              title="DC Protection"
              value={results.recommendedFuse.toString()}
              unit="A"
              subtitle="Fuse/MCB rating"
              status="info"
              icon={<Settings />}
            />
            
            <ResultCard
              title="DC Cable"
              value={results.recommendedCableSize}
              subtitle={`Volt drop: ${results.actualVoltDrop.toFixed(1)}%`}
              status={getStatusColor(maxVoltDrop - results.actualVoltDrop, 1, 0.5)}
              icon={<Settings />}
            />
          </div>

          {/* Warnings and Recommendations */}
          {(results.warnings.length > 0 || results.recommendations.length > 0) && (
            <Card className="border-elec-yellow/10 bg-elec-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Warnings & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-amber-500">⚠️ Warnings</h4>
                    {results.warnings.map((warning, index) => (
                      <p key={index} className="text-sm bg-amber-500/10 border border-amber-500/20 rounded p-2">
                        {warning}
                      </p>
                    ))}
                  </div>
                )}
                
                {results.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-400">💡 Recommendations</h4>
                    {results.recommendations.map((rec, index) => (
                      <p key={index} className="text-sm bg-blue-500/10 border border-blue-500/20 rounded p-2">
                        {rec}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Compliance Notes */}
          <Card className="border-elec-yellow/10 bg-elec-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-elec-yellow" />
                BS 7671 Compliance Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.complianceNotes.map((note, index) => (
                  <p key={index} className="text-sm bg-elec-dark/30 border border-elec-yellow/10 rounded p-2">
                    • {note}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BatteryBackupCalculator;