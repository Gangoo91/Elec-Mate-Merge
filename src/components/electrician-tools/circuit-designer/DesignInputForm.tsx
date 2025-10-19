import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CircuitInput, DesignInputs } from '@/types/installation-design';
import { CircuitBuilderCard } from './CircuitBuilderCard';
import { MobileInput } from '@/components/ui/mobile-input';
import BackButton from '@/components/common/BackButton';
import { Plus, Zap, FileText, Plug, MessageSquare, Home, Building, Factory, Info } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface DesignInputFormProps {
  onGenerate: (inputs: DesignInputs) => void;
  isProcessing: boolean;
}

export const DesignInputForm = ({ onGenerate, isProcessing }: DesignInputFormProps) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [propertyType, setPropertyType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-S');
  const [ambientTemp, setAmbientTemp] = useState(30);
  const [installationMethod, setInstallationMethod] = useState<'clipped-direct' | 'in-conduit' | 'in-trunking' | 'buried-direct' | 'in-insulation'>('clipped-direct');
  const [groupingFactor, setGroupingFactor] = useState(1);
  const [propertyAge, setPropertyAge] = useState<'new-build' | 'modern' | 'older' | 'very-old'>('modern');
  const [existingInstallation, setExistingInstallation] = useState(false);
  const [budgetLevel, setBudgetLevel] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const [supplyOpen, setSupplyOpen] = useState(false);

  const addCircuit = () => {
    const newCircuit: CircuitInput = {
      id: uuidv4(),
      name: `Circuit ${circuits.length + 1}`,
      loadType: 'socket',
      phases: 'single',
      specialLocation: 'none'
    };
    setCircuits([...circuits, newCircuit]);
  };

  const addQuickCircuit = (type: 'socket' | 'lighting' | 'cooker' | 'shower' | 'ev-charger') => {
    const presets: Record<typeof type, Partial<CircuitInput>> = {
      socket: { name: 'Socket Ring Main', loadType: 'socket', loadPower: 7360 },
      lighting: { name: 'Lighting Circuit', loadType: 'lighting', loadPower: 1000 },
      cooker: { name: 'Cooker', loadType: 'cooker', loadPower: 9200, specialLocation: 'kitchen' },
      shower: { name: 'Electric Shower', loadType: 'shower', loadPower: 10000, specialLocation: 'bathroom', cableLength: 15 },
      'ev-charger': { name: 'EV Charger', loadType: 'ev-charger', loadPower: 7400, specialLocation: 'outdoor', cableLength: 20 }
    };

    const preset = presets[type];
    const newCircuit: CircuitInput = {
      id: uuidv4(),
      phases: 'single',
      specialLocation: 'none',
      ...preset
    } as CircuitInput;

    setCircuits([...circuits, newCircuit]);
  };

  const updateCircuit = (id: string, updated: CircuitInput) => {
    setCircuits(circuits.map(c => c.id === id ? updated : c));
  };

  const deleteCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id));
  };

  const loadPreset = (preset: 'house-rewire' | 'kitchen' | 'ev-charger') => {
    if (preset === 'house-rewire') {
      setCircuits([
        { id: uuidv4(), name: 'Kitchen Ring', loadType: 'socket', phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Living Room Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Upstairs Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Downstairs Lights', loadType: 'lighting', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Upstairs Lights', loadType: 'lighting', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Cooker', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Shower', loadType: 'shower', loadPower: 10000, cableLength: 15, phases: 'single', specialLocation: 'bathroom' },
        { id: uuidv4(), name: 'Immersion Heater', loadType: 'immersion', phases: 'single', specialLocation: 'none' }
      ]);
    } else if (preset === 'kitchen') {
      setCircuits([
        { id: uuidv4(), name: 'Kitchen Ring', loadType: 'socket', phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Cooker', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' }
      ]);
    } else if (preset === 'ev-charger') {
      setCircuits([
        { id: uuidv4(), name: 'EV Charger', loadType: 'ev-charger', loadPower: 7400, cableLength: 20, phases: 'single', specialLocation: 'outdoor' }
      ]);
    }
  };

  const handleSubmit = () => {
    if (!projectName || circuits.length === 0) {
      return;
    }

    const inputs: DesignInputs = {
      projectName,
      location,
      clientName,
      electricianName,
      propertyType,
      voltage,
      phases,
      ze,
      earthingSystem,
      ambientTemp,
      installationMethod,
      groupingFactor,
      propertyAge,
      existingInstallation,
      budgetLevel,
      circuits,
      additionalPrompt
    };

    onGenerate(inputs);
  };

  const requiredFieldsComplete = projectName && circuits.length > 0;
  const completionPercent = Math.round(((projectName ? 1 : 0) + (circuits.length > 0 ? 1 : 0)) / 2 * 100);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-6">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <BackButton customUrl="/electrical-hub" />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">AI Circuit Designer</h1>
              <p className="text-sm text-muted-foreground mt-1">BS 7671:2018 Compliant Design</p>
            </div>
          </div>
          {/* Progress Bar */}
          {!requiredFieldsComplete && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Required fields</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Project Information */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Project Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <MobileInput
              label="Project Name *"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., 123 High Street Rewire"
            />
            <MobileInput
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Manchester"
            />
            <MobileInput
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Optional"
            />
            <MobileInput
              label="Electrician Name"
              value={electricianName}
              onChange={(e) => setElectricianName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Property Age</Label>
              <Select value={propertyAge} onValueChange={(v: any) => setPropertyAge(v)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-build">New Build</SelectItem>
                  <SelectItem value="modern">Modern (Post-2008)</SelectItem>
                  <SelectItem value="older">Older (1980-2008)</SelectItem>
                  <SelectItem value="very-old">Very Old (Pre-1980)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Budget Level</Label>
              <Select value={budgetLevel} onValueChange={(v: any) => setBudgetLevel(v)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Minimum Compliant)</SelectItem>
                  <SelectItem value="standard">Standard (RCBOs)</SelectItem>
                  <SelectItem value="premium">Premium (AFDDs + Surge)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              id="existing"
              checked={existingInstallation}
              onChange={(e) => setExistingInstallation(e.target.checked)}
              className="h-4 w-4 rounded border-primary/30"
            />
            <Label htmlFor="existing" className="text-sm cursor-pointer">
              Adding to existing installation
            </Label>
          </div>
        </Card>

        {/* Incoming Supply - Collapsible on Mobile */}
        <Card className="p-4 md:p-6">
          <Collapsible open={supplyOpen} onOpenChange={setSupplyOpen}>
            <CollapsibleTrigger className="w-full flex items-center justify-between mb-4 md:cursor-default md:pointer-events-none">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Incoming Supply Details
              </h2>
              <ChevronDown className={`h-5 w-5 transition-transform md:hidden ${supplyOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="md:block">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Property Type</Label>
                  <Select value={propertyType} onValueChange={(v: any) => setPropertyType(v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Domestic
                        </div>
                      </SelectItem>
                      <SelectItem value="commercial">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Commercial
                        </div>
                      </SelectItem>
                      <SelectItem value="industrial">
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4" />
                          Industrial
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Voltage / Phases</Label>
                  <Select
                    value={`${voltage}-${phases}`}
                    onValueChange={(v) => {
                      const [volt, phase] = v.split('-');
                      setVoltage(Number(volt));
                      setPhases(phase as 'single' | 'three');
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="230-single">230V Single Phase</SelectItem>
                      <SelectItem value="400-three">400V Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Earthing System</Label>
                  <Select value={earthingSystem} onValueChange={(v: any) => setEarthingSystem(v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TN-S">TN-S</SelectItem>
                      <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                      <SelectItem value="TT">TT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <MobileInput
                  label="Ze (Ω)"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={ze.toString()}
                  onChange={(e) => setZe(Number(e.target.value))}
                  hint="External earth fault loop impedance"
                />
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Ambient Temp
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={ambientTemp.toString()} onValueChange={(v) => setAmbientTemp(Number(v))}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20°C</SelectItem>
                      <SelectItem value="25">25°C</SelectItem>
                      <SelectItem value="30">30°C (Standard)</SelectItem>
                      <SelectItem value="35">35°C</SelectItem>
                      <SelectItem value="40">40°C</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Affects cable derating</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Installation Method
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={installationMethod} onValueChange={(v: any) => setInstallationMethod(v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clipped-direct">Clipped Direct (Method C)</SelectItem>
                      <SelectItem value="in-conduit">In Conduit/Trunking</SelectItem>
                      <SelectItem value="in-trunking">In Trunking (Perforated)</SelectItem>
                      <SelectItem value="buried-direct">Buried Direct</SelectItem>
                      <SelectItem value="in-insulation">In Insulation</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How cables will be installed</p>
                </div>
              </div>
              <div className="mt-4">
                <MobileInput
                  label="Grouping Factor"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="10"
                  value={groupingFactor.toString()}
                  onChange={(e) => setGroupingFactor(Number(e.target.value))}
                  hint="Number of circuits grouped together (1-10)"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Circuit Builder */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Plug className="h-5 w-5 text-primary" />
              Circuit Builder {circuits.length > 0 && <span className="text-sm font-normal text-muted-foreground">({circuits.length} circuits)</span>}
            </h2>
            
            {/* Quick Add Buttons - Mobile Optimized */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => addQuickCircuit('socket')} className="flex-1 min-w-[100px] h-10">
                <Plus className="h-3 w-3 mr-1" />
                Socket
              </Button>
              <Button variant="outline" size="sm" onClick={() => addQuickCircuit('lighting')} className="flex-1 min-w-[100px] h-10">
                <Plus className="h-3 w-3 mr-1" />
                Lighting
              </Button>
              <Button variant="outline" size="sm" onClick={() => addQuickCircuit('cooker')} className="flex-1 min-w-[100px] h-10">
                <Plus className="h-3 w-3 mr-1" />
                Cooker
              </Button>
              <Button variant="outline" size="sm" onClick={() => addQuickCircuit('shower')} className="flex-1 min-w-[100px] h-10">
                <Plus className="h-3 w-3 mr-1" />
                Shower
              </Button>
              <Button variant="outline" size="sm" onClick={() => addQuickCircuit('ev-charger')} className="flex-1 min-w-[100px] h-10">
                <Plus className="h-3 w-3 mr-1" />
                EV Charger
              </Button>
            </div>

            {/* Preset Templates */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center hidden md:inline">Presets:</span>
              <Button variant="secondary" size="sm" onClick={() => loadPreset('house-rewire')} className="h-9">
                House Rewire
              </Button>
              <Button variant="secondary" size="sm" onClick={() => loadPreset('kitchen')} className="h-9">
                Kitchen
              </Button>
              <Button variant="secondary" size="sm" onClick={() => loadPreset('ev-charger')} className="h-9">
                EV Install
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {circuits.map((circuit, index) => (
              <CircuitBuilderCard
                key={circuit.id}
                circuit={circuit}
                circuitNumber={index + 1}
                onUpdate={(updated) => updateCircuit(circuit.id, updated)}
                onDelete={() => deleteCircuit(circuit.id)}
              />
            ))}

            {circuits.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Plug className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No circuits added yet</p>
                <p className="text-xs mt-1">Use quick add buttons or presets above</p>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={addCircuit}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Circuit
            </Button>
          </div>
        </Card>

        {/* Additional Context */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Additional Requirements (Optional)
          </h2>
          <Textarea
            value={additionalPrompt}
            onChange={(e) => setAdditionalPrompt(e.target.value)}
            placeholder="e.g., Use fire-rated cable, Client wants AFDDs, Old installation has no RCD..."
            rows={3}
            className="text-base"
          />
        </Card>
      </div>

      {/* Sticky Generate Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t md:relative md:bg-transparent md:border-0 md:container md:max-w-4xl md:mx-auto md:px-4">
        <Button
          size="lg"
          className="w-full h-12 md:h-14 text-base md:text-lg"
          onClick={handleSubmit}
          disabled={!requiredFieldsComplete || isProcessing}
        >
          <Zap className="h-5 w-5 mr-2" />
          {isProcessing ? 'Designing...' : circuits.length === 0 ? 'Add circuits to continue' : `Generate Design (${circuits.length} circuit${circuits.length !== 1 ? 's' : ''})`}
        </Button>
      </div>
    </div>
  );
};
