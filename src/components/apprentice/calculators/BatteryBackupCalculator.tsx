import React, { useState } from 'react';
import { Calculator, Battery, Zap, Clock, AlertTriangle, Settings, Thermometer, Plus, X, Info, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileInput } from '@/components/ui/mobile-input';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  calculateBatteryBackup, 
  BATTERY_CHEMISTRIES, 
  INVERTER_TYPES, 
  LOAD_PRESETS,
  formatRuntime,
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
  const [nominalVoltage, setNominalVoltage] = useState('12');
  const [capacityAh, setCapacityAh] = useState('');
  const [seriesStrings, setSeriesStrings] = useState(1);
  const [parallelStrings, setParallelStrings] = useState(1);
  const [customDoD, setCustomDoD] = useState('');
  
  // Environmental
  const [ambientTemp, setAmbientTemp] = useState('20');
  const [batteryHealth, setBatteryHealth] = useState('100');
  
  // Inverter
  const [inverterType, setInverterType] = useState('line-interactive');
  const [customEfficiency, setCustomEfficiency] = useState('');
  const [customHeadroom, setCustomHeadroom] = useState('');
  
  // DC system
  const [dcCableLength, setDcCableLength] = useState('2');
  const [maxVoltDrop, setMaxVoltDrop] = useState('3');
  
  // Loads
  const [loads, setLoads] = useState<Load[]>([]);
  const [newLoadName, setNewLoadName] = useState('');
  const [newLoadWatts, setNewLoadWatts] = useState('');
  const [newLoadPriority, setNewLoadPriority] = useState<'essential' | 'important' | 'convenience'>('essential');
  
  // For sizing mode
  const [requiredRuntime, setRequiredRuntime] = useState('');
  
  // Results
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleLoadPresetSelect = (preset: typeof LOAD_PRESETS[0]) => {
    setNewLoadName(preset.name);
    setNewLoadWatts(preset.watts.toString());
    setNewLoadPriority(preset.category);
  };

  const addLoad = () => {
    if (!newLoadName || !newLoadWatts || parseFloat(newLoadWatts) <= 0) return;
    
    const newLoad: Load = {
      name: newLoadName,
      watts: parseFloat(newLoadWatts),
      dutyCycle: 1.0,
      surgeMultiplier: 1.0,
      priority: newLoadPriority
    };
    
    setLoads([...loads, newLoad]);
    setNewLoadName('');
    setNewLoadWatts('');
    setNewLoadPriority('essential');
  };

  const removeLoad = (index: number) => {
    setLoads(loads.filter((_, i) => i !== index));
  };

  const calculateBackup = () => {
    if (!capacityAh || loads.length === 0) return;
    
    const inputs: BatteryInputs = {
      mode,
      chemistry,
      nominalVoltage: parseFloat(nominalVoltage),
      capacityAh: parseFloat(capacityAh),
      seriesStrings,
      parallelStrings,
      customDoD: customDoD ? parseFloat(customDoD) / 100 : undefined,
      ambientTemp: parseFloat(ambientTemp),
      batteryHealth: parseFloat(batteryHealth),
      loads,
      inverterType,
      customEfficiency: customEfficiency ? parseFloat(customEfficiency) / 100 : undefined,
      customHeadroom: customHeadroom ? parseFloat(customHeadroom) / 100 : undefined,
      dcCableLength: parseFloat(dcCableLength),
      maxVoltDrop: parseFloat(maxVoltDrop),
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
    setNewLoadName('');
    setNewLoadWatts('');
  };

  const selectedChemistry = BATTERY_CHEMISTRIES[chemistry];
  const selectedInverter = INVERTER_TYPES[inverterType];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Battery Backup Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate runtime for battery backup systems with accurate chemistry modelling. Enter battery specs and loads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Calculation Mode</label>
              <div className="flex gap-2">
                <MobileButton
                  variant={mode === 'runtime' ? 'elec' : 'elec-outline'}
                  size="sm"
                  onClick={() => setMode('runtime')}
                  icon={<Clock className="h-4 w-4" />}
                >
                  Runtime
                </MobileButton>
                <MobileButton
                  variant={mode === 'sizing' ? 'elec' : 'elec-outline'}
                  size="sm"
                  onClick={() => setMode('sizing')}
                  icon={<Battery className="h-4 w-4" />}
                >
                  Sizing
                </MobileButton>
              </div>
            </div>

            {/* Battery Configuration */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Battery Chemistry</label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MobileInput
                label="Voltage (V)"
                type="number"
                value={nominalVoltage}
                onChange={(e) => setNominalVoltage(e.target.value)}
                placeholder="12"
                unit="V"
              />
              
              <MobileInput
                label="Capacity (Ah)"
                type="number"
                value={capacityAh}
                onChange={(e) => setCapacityAh(e.target.value)}
                placeholder="100"
                unit="Ah"
              />
            </div>

            {/* Inverter Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Inverter Type</label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Quick Load Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Add Loads</label>
              <div className="flex flex-wrap gap-2">
                {LOAD_PRESETS.slice(0, 6).map((preset, index) => (
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
            <div className="space-y-3">
              <MobileInput
                label="Load Name"
                value={newLoadName}
                onChange={(e) => setNewLoadName(e.target.value)}
                placeholder="e.g., LED Lights"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <MobileInput
                  label="Power (W)"
                  type="number"
                  value={newLoadWatts}
                  onChange={(e) => setNewLoadWatts(e.target.value)}
                  placeholder="50"
                  unit="W"
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <div className="flex gap-1">
                    {(['essential', 'important', 'convenience'] as const).map((priority) => (
                      <Badge
                        key={priority}
                        variant={newLoadPriority === priority ? 'default' : 'outline'}
                        className={`cursor-pointer text-xs ${newLoadPriority === priority ? 'bg-elec-yellow text-black' : ''}`}
                        onClick={() => setNewLoadPriority(priority)}
                      >
                        {priority}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <MobileButton 
                onClick={addLoad} 
                disabled={!newLoadName || !newLoadWatts || parseFloat(newLoadWatts) <= 0}
                variant="elec-outline"
                icon={<Plus className="h-4 w-4" />}
                className="w-full"
              >
                Add Load
              </MobileButton>
            </div>

            {/* Sizing Mode Input */}
            {mode === 'sizing' && (
              <MobileInput
                label="Required Runtime (hours)"
                type="number"
                value={requiredRuntime}
                onChange={(e) => setRequiredRuntime(e.target.value)}
                placeholder="8"
                unit="hours"
              />
            )}

            {/* Advanced Settings Toggle */}
            <MobileButton
              variant="elec-outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full"
              icon={<Settings className="h-4 w-4" />}
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </MobileButton>

            {showAdvanced && (
              <div className="space-y-3 border border-elec-yellow/10 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Temperature (°C)"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                    unit="°C"
                  />
                  
                  <MobileInput
                    label="Battery Health (%)"
                    type="number"
                    value={batteryHealth}
                    onChange={(e) => setBatteryHealth(e.target.value)}
                    unit="%"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculateBackup} 
                className="flex-1" 
                variant="elec" 
                icon={<Calculator className="h-4 w-4" />}
                disabled={!capacityAh || loads.length === 0}
              >
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {results ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">
                      {mode === 'runtime' ? 'Estimated Runtime' : 'Required Battery'}
                    </h3>
                    <Badge variant="secondary" className="mb-4">
                      {selectedChemistry.name} • {selectedInverter.name}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    {mode === 'runtime' ? (
                      <div>
                        <span className="text-muted-foreground">Runtime:</span>
                        <div className="font-mono text-elec-yellow text-lg">{formatRuntime(results.runtime)}</div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">Required Capacity:</span>
                        <div className="font-mono text-elec-yellow text-lg">{results.requiredAh?.toFixed(0) || 'N/A'} Ah</div>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-muted-foreground">Usable Energy:</span>
                      <div className="font-mono text-elec-yellow">{results.usableEnergyWh.toFixed(0)} Wh</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">DC Current:</span>
                      <div className="font-mono text-elec-yellow">{results.dcCurrent.toFixed(1)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">C-Rate:</span>
                      <div className="font-mono text-elec-yellow">{results.cRate.toFixed(2)}C</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Add battery specs and loads to calculate runtime
                </div>
              )}
            </div>

            {/* Current Loads Display */}
            {loads.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Connected Loads ({loads.length})</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {loads.map((load, index) => (
                    <div key={index} className="flex items-center justify-between bg-elec-dark/30 p-2 rounded text-xs">
                      <div className="flex-1">
                        <span className="font-medium">{load.name}</span>
                        <div className="text-muted-foreground">
                          {load.watts}W • {load.priority}
                        </div>
                      </div>
                      <MobileButton
                        variant="elec-outline"
                        size="sm"
                        onClick={() => removeLoad(index)}
                      >
                        <X className="h-3 w-3" />
                      </MobileButton>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Battery runtime calculated using Peukert's equation for accuracy. DoD and chemistry affect usable capacity.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryBackupCalculator;