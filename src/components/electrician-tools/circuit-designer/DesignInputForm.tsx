import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileInput } from '@/components/ui/mobile-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { QuickAddCircuitBuilder } from './QuickAddCircuitBuilder';
import { GenerationSummaryCard } from './GenerationSummaryCard';
import { CircuitBuilderCard } from './CircuitBuilderCard';
import { DesignInputs, CircuitInput } from '@/types/installation-design';
import { Sparkles, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface DesignInputFormProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
}

export const DesignInputForm = ({ onGenerate, isProcessing }: DesignInputFormProps) => {
  const isMobile = useIsMobile();
  
  // Prompt-first state
  const [promptDescription, setPromptDescription] = useState('');
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');

  // Project info
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');

  // Supply details
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-S');

  // Circuits
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);

  // Auto-detect installation type from prompt
  useEffect(() => {
    if (!promptDescription.trim()) return;
    
    const lower = promptDescription.toLowerCase();
    if (lower.includes('industrial') || lower.includes('factory') || lower.includes('workshop')) {
      setInstallationType('industrial');
    } else if (lower.includes('commercial') || lower.includes('office') || lower.includes('shop')) {
      setInstallationType('commercial');
    } else if (lower.includes('domestic') || lower.includes('house') || lower.includes('home')) {
      setInstallationType('domestic');
    }
  }, [promptDescription]);

  const handleAddCircuit = (circuit: Omit<CircuitInput, 'id'>) => {
    const newCircuit: CircuitInput = {
      ...circuit,
      id: `circuit-${Date.now()}`
    };
    setCircuits([...circuits, newCircuit]);
    toast.success(`Added ${circuit.name}`);
  };

  const handleRemoveCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id));
  };

  const handleGenerate = async () => {
    // Validation
    const errors: string[] = [];
    if (!projectName.trim()) errors.push('Project name is required');
    if (!location.trim()) errors.push('Location is required');
    if (!promptDescription.trim() && circuits.length === 0) {
      errors.push('Either provide a description or add circuits manually');
    }

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }

    const inputs: DesignInputs = {
      projectName,
      location,
      clientName,
      electricianName,
      propertyType: installationType,
      voltage,
      phases,
      ze,
      earthingSystem,
      circuits,
      additionalPrompt: promptDescription
    };

    await onGenerate(inputs);
  };

  const isValid = Boolean(projectName && location && (promptDescription || circuits.length > 0));

  // Mobile view - keep existing stacked layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Mobile layout - existing code continues... */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Describe Your Installation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., Domestic rewire with 8 socket rings, 4 lighting circuits, shower, cooker..."
              value={promptDescription}
              onChange={(e) => setPromptDescription(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="space-y-3">
              <MobileInput label="Project Name *" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <MobileInput label="Location *" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <QuickAddCircuitBuilder onAddCircuit={handleAddCircuit} circuitCount={circuits.length} />
            {circuits.map((circuit) => (
              <CircuitBuilderCard key={circuit.id} circuit={circuit} onRemove={() => handleRemoveCircuit(circuit.id)} />
            ))}
            <Button onClick={handleGenerate} disabled={!isValid || isProcessing} className="w-full" size="lg">
              {isProcessing ? 'Generating...' : `Generate Design (${circuits.length} circuits)`}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Desktop layout - NEW 2-column design
  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
      {/* LEFT COLUMN - Main Content */}
      <div className="space-y-6">
        {/* Hero Prompt Section */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Describe Your Installation
            </CardTitle>
            <CardDescription>
              Tell the AI what you need designed - be as detailed or brief as you like
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: Three-bedroom house rewire - 8 socket rings (downstairs x4, upstairs x4), 6 lighting circuits, 9.5kW shower in main bathroom, 7.2kW cooker, outdoor socket, garage circuit with lights and sockets..."
              value={promptDescription}
              onChange={(e) => setPromptDescription(e.target.value)}
              className="min-h-[150px] text-base"
            />
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {installationType}
              </Badge>
              {promptDescription && (
                <span className="text-sm text-muted-foreground">
                  Auto-detected from description
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Circuit Builder */}
        <QuickAddCircuitBuilder onAddCircuit={handleAddCircuit} circuitCount={circuits.length} />

        {/* Current Circuits */}
        {circuits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Circuits to Design ({circuits.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {circuits.map((circuit) => (
                <CircuitBuilderCard
                  key={circuit.id}
                  circuit={circuit}
                  onRemove={() => handleRemoveCircuit(circuit.id)}
                />
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* RIGHT COLUMN - Sticky Sidebar */}
      <div className="space-y-4">
        {/* Project Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Project Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <MobileInput value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g., Smith Residence Rewire" />
            </div>
            <div className="space-y-2">
              <Label>Location *</Label>
              <MobileInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 123 Main St, Manchester" />
            </div>
            <div className="space-y-2">
              <Label>Client Name</Label>
              <MobileInput value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Optional" />
            </div>
            <div className="space-y-2">
              <Label>Electrician Name</Label>
              <MobileInput value={electricianName} onChange={(e) => setElectricianName(e.target.value)} placeholder="Optional" />
            </div>
            <div className="space-y-2">
              <Label>Installation Type</Label>
              <Select value={installationType} onValueChange={(v: any) => setInstallationType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Supply Parameters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Supply Parameters</CardTitle>
              <Badge variant="secondary" className="text-xs">Using Defaults</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Voltage</span>
              <span className="font-medium">{voltage}V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phases</span>
              <span className="font-medium capitalize">{phases === 'three' ? '3-Phase' : 'Single Phase'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ze</span>
              <span className="font-medium">{ze}Ω</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Earthing</span>
              <span className="font-medium">{earthingSystem}</span>
            </div>
          </CardContent>
        </Card>

        {/* Generation Summary */}
        <GenerationSummaryCard
          circuits={circuits}
          projectName={projectName}
          location={location}
          isValid={isValid}
          validationErrors={[
            ...(!projectName ? ['Project name required'] : []),
            ...(!location ? ['Location required'] : []),
            ...(!promptDescription && circuits.length === 0 ? ['Add description or circuits'] : [])
          ]}
        />

        {/* Generate Button - Sticky */}
        <Button
          onClick={handleGenerate}
          disabled={!isValid || isProcessing}
          className="w-full h-12 text-lg sticky bottom-4"
          size="lg"
        >
          {isProcessing ? (
            'Generating...'
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Design
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
