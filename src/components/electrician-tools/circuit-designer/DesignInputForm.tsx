import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CircuitInput, DesignInputs, CircuitPreset } from '@/types/installation-design';
import { CircuitBuilderCard } from './CircuitBuilderCard';
import { MobileInput } from '@/components/ui/mobile-input';
import BackButton from '@/components/common/BackButton';
import { Plus, Zap, FileText, Plug, MessageSquare, Home, Building, Factory, Info } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES, SMART_DEFAULTS } from '@/lib/circuit-templates';
import { SmartSuggestionPanel } from './SmartSuggestionPanel';

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

  // Apply smart defaults when property type changes
  useEffect(() => {
    const defaults = SMART_DEFAULTS[propertyType];
    setVoltage(defaults.voltage);
    setPhases(defaults.phases);
    setZe(defaults.ze);
    setEarthingSystem(defaults.earthingSystem);
    setAmbientTemp(defaults.ambientTemp || 25);
    setInstallationMethod(defaults.installationMethod);
    setGroupingFactor(defaults.groupingFactor || 1);
    setBudgetLevel(defaults.budgetLevel);
  }, [propertyType]);

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

  const addQuickCircuit = (loadType: string) => {
    const quickPresets: Record<string, Partial<CircuitInput>> = {
      socket: { name: 'Socket Ring Main', loadType: 'socket' as any, loadPower: 7360 },
      lighting: { name: 'Lighting Circuit', loadType: 'lighting' as any, loadPower: 1000 },
      cooker: { name: 'Cooker', loadType: 'cooker' as any, loadPower: 9200, specialLocation: 'kitchen' },
      shower: { name: 'Electric Shower', loadType: 'shower' as any, loadPower: 10000, specialLocation: 'bathroom', cableLength: 15 },
      'ev-charger': { name: 'EV Charger', loadType: 'ev-charger' as any, loadPower: 7400, specialLocation: 'outdoor', cableLength: 20 },
      'office-sockets': { name: 'Office Sockets', loadType: 'office-sockets' as any, loadPower: 5000 },
      'emergency-lighting': { name: 'Emergency Lighting', loadType: 'emergency-lighting' as any, loadPower: 500 },
      hvac: { name: 'HVAC Unit', loadType: 'hvac' as any, loadPower: 3000 },
      'server-room': { name: 'Server Room', loadType: 'server-room' as any, loadPower: 5000, notes: 'UPS required' },
      'kitchen-equipment': { name: 'Kitchen Equipment', loadType: 'kitchen-equipment' as any, loadPower: 3000, specialLocation: 'kitchen' },
      'three-phase-motor': { name: '3Φ Motor', loadType: 'three-phase-motor' as any, loadPower: 11000, phases: 'three', notes: 'Type D MCB for motor starting' },
      'machine-tool': { name: 'Machine Tool', loadType: 'machine-tool' as any, loadPower: 7500, phases: 'three' },
      welding: { name: 'Welding Equipment', loadType: 'welding' as any, loadPower: 15000, phases: 'three', notes: 'High inrush current' },
      conveyor: { name: 'Conveyor System', loadType: 'conveyor' as any, loadPower: 5500, phases: 'three' },
      'workshop-sockets': { name: 'Workshop Sockets', loadType: 'workshop-sockets' as any, loadPower: 5000 }
    };

    const preset = quickPresets[loadType] || { name: `Circuit ${circuits.length + 1}`, loadType: loadType as any };
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

  const loadPreset = (template: CircuitPreset) => {
    const circuitsWithIds = template.circuits.map(c => ({
      ...c,
      id: uuidv4()
    })) as CircuitInput[];
    setCircuits(circuitsWithIds);
  };

  const getTemplatesForType = () => {
    switch (propertyType) {
      case 'domestic':
        return DOMESTIC_TEMPLATES;
      case 'commercial':
        return COMMERCIAL_TEMPLATES;
      case 'industrial':
        return INDUSTRIAL_TEMPLATES;
    }
  };

  const getQuickAddButtons = () => {
    switch (propertyType) {
      case 'domestic':
        return [
          { value: 'socket', label: 'Socket Ring', icon: '⭐' },
          { value: 'lighting', label: 'Lighting', icon: '✅' },
          { value: 'cooker', label: 'Cooker', icon: '' },
          { value: 'shower', label: 'Shower', icon: '⚡' },
          { value: 'ev-charger', label: 'EV Charger', icon: '🔌' }
        ];
      case 'commercial':
        return [
          { value: 'office-sockets', label: 'Office Sockets', icon: '⭐' },
          { value: 'emergency-lighting', label: 'Emergency Lights', icon: '✅' },
          { value: 'hvac', label: 'HVAC', icon: '' },
          { value: 'server-room', label: 'Server Room', icon: '' },
          { value: 'kitchen-equipment', label: 'Kitchen Equip', icon: '' }
        ];
      case 'industrial':
        return [
          { value: 'three-phase-motor', label: '3Φ Motor', icon: '⭐' },
          { value: 'machine-tool', label: 'Machine Tool', icon: '' },
          { value: 'welding', label: 'Welding', icon: '⚡⚡' },
          { value: 'conveyor', label: 'Conveyor', icon: '' },
          { value: 'workshop-sockets', label: 'Workshop', icon: '' }
        ];
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
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-background border-b">
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

        {/* Smart Suggestion Panel */}
        <SmartSuggestionPanel 
          installationType={propertyType}
          propertyAge={propertyAge}
          budgetLevel={budgetLevel}
        />

        {/* Circuit Builder */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Plug className="h-5 w-5 text-primary" />
              Circuit Builder {circuits.length > 0 && <span className="text-sm font-normal text-muted-foreground">({circuits.length} circuits)</span>}
            </h2>
            
            {/* Context-Aware Quick Add Buttons */}
            <div className="flex flex-wrap gap-2">
              {getQuickAddButtons().map(btn => (
                <Button 
                  key={btn.value}
                  variant="outline" 
                  size="sm" 
                  onClick={() => addQuickCircuit(btn.value)} 
                  className="flex-1 min-w-[100px] h-10"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {btn.label} {btn.icon && <span className="ml-1 text-xs">{btn.icon}</span>}
                </Button>
              ))}
            </div>

            {/* Context-Aware Preset Templates */}
            <div className="flex flex-wrap gap-2">
              {getTemplatesForType().map(template => (
                <Button 
                  key={template.id}
                  variant="secondary" 
                  size="sm" 
                  onClick={() => loadPreset(template)} 
                  className="flex-1 min-w-[140px] h-9"
                >
                  {propertyType === 'domestic' && <Home className="h-4 w-4 mr-2" />}
                  {propertyType === 'commercial' && <Building className="h-4 w-4 mr-2" />}
                  {propertyType === 'industrial' && <Factory className="h-4 w-4 mr-2" />}
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {circuits.map((circuit, index) => (
              <CircuitBuilderCard
                key={circuit.id}
                circuit={circuit}
                circuitNumber={index + 1}
                installationType={propertyType}
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

        {/* Generate Button */}
        <div className="pb-4">
          <Button
            size="lg"
            className="w-full h-14 text-base md:text-lg touch-manipulation"
            onClick={handleSubmit}
            disabled={!requiredFieldsComplete || isProcessing}
          >
            <Zap className="h-5 w-5 mr-2" />
            {isProcessing ? 'Designing...' : circuits.length === 0 ? 'Add circuits to continue' : `Generate Design (${circuits.length} circuit${circuits.length !== 1 ? 's' : ''})`}
          </Button>
        </div>
      </div>
    </div>
  );
};
