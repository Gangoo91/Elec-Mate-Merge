import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileInput } from '@/components/ui/mobile-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CircuitBuilderCard } from './CircuitBuilderCard';
import { SmartSuggestionPanel } from './SmartSuggestionPanel';
import { InstallationTypeDetection } from './InstallationTypeDetection';
import { PromptExamples } from './PromptExamples';
import { DesignInputSummary } from './DesignInputSummary';
import { DesignInputs, CircuitInput } from '@/types/installation-design';
import { DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES, SMART_DEFAULTS } from '@/lib/circuit-templates';
import { Sparkles, Zap, ChevronDown, Plus, Info, Lightbulb, Building2, House, Building, Factory, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const QUICK_ADD_BUTTONS = {
  domestic: [
    { label: 'Socket Ring', value: 'socket' },
    { label: 'Lighting', value: 'lighting' },
    { label: 'Cooker', value: 'cooker' },
    { label: 'Shower', value: 'shower' },
    { label: 'EV Charger', value: 'ev-charger' }
  ],
  commercial: [
    { label: 'Office Sockets', value: 'office-sockets' },
    { label: 'Lighting', value: 'lighting' },
    { label: 'Emergency Lights', value: 'emergency-lighting' },
    { label: 'Server Room', value: 'server-room' },
    { label: 'HVAC', value: 'hvac' }
  ],
  industrial: [
    { label: '3-Phase Motor', value: 'three-phase-motor' },
    { label: 'Machine Tool', value: 'machine-tool' },
    { label: 'Welding', value: 'welding' },
    { label: 'Workshop Sockets', value: 'workshop-sockets' },
    { label: 'Lighting', value: 'overhead-lighting' }
  ]
};

interface DesignInputFormProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
}

export const DesignInputForm = ({ onGenerate, isProcessing }: DesignInputFormProps) => {
  const isMobile = useIsMobile();
  
  // Prompt-first state
  const [promptDescription, setPromptDescription] = useState('');
  const [detectedType, setDetectedType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [detectionConfidence, setDetectionConfidence] = useState(0);

  // Project info
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');

  // Supply details (collapsible) - Default closed
  const [supplyOpen, setSupplyOpen] = useState(false);
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-S');
  const [ambientTemp, setAmbientTemp] = useState(25);
  const [installationMethod, setInstallationMethod] = useState<'clipped-direct' | 'in-conduit' | 'in-trunking'>('clipped-direct');
  const [groupingFactor, setGroupingFactor] = useState(1);

  // Emergency contacts (collapsible) - Default closed
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Circuits (collapsible) - Default closed
  const [circuitsOpen, setCircuitsOpen] = useState(false);
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);

  // Auto-detect installation type from prompt
  useEffect(() => {
    if (!promptDescription.trim()) {
      setDetectionConfidence(0);
      return;
    }

    const lower = promptDescription.toLowerCase();
    let type: 'domestic' | 'commercial' | 'industrial' = 'domestic';
    let confidence = 50;

    // Industrial keywords
    if (/(factory|workshop|machine|welding|crane|motor|conveyor|manufacturing|cnc|lathe|compressor|three.?phase)/i.test(lower)) {
      type = 'industrial';
      confidence = 85;
    }
    // Commercial keywords
    else if (/(office|shop|retail|restaurant|café|cafe|commercial|warehouse|server|hvac|emergency.?light|fire.?alarm)/i.test(lower)) {
      type = 'commercial';
      confidence = 80;
    }
    // Domestic keywords
    else if (/(house|home|flat|apartment|bedroom|kitchen|bathroom|shower|garage|rewire|consumer.?unit|ev.?charg)/i.test(lower)) {
      type = 'domestic';
      confidence = 75;
    }

    setDetectedType(type);
    setDetectionConfidence(confidence);

    // Auto-update installation type if confidence is high
    if (confidence >= 75) {
      setInstallationType(type);
    }
  }, [promptDescription]);

  // Apply smart defaults when installation type changes
  useEffect(() => {
    const defaults = SMART_DEFAULTS[installationType];
    setVoltage(defaults.voltage);
    setPhases(defaults.phases);
    setZe(defaults.ze);
    setEarthingSystem(defaults.earthingSystem);
    setAmbientTemp(defaults.ambientTemp);
    setInstallationMethod(defaults.installationMethod);
    setGroupingFactor(defaults.groupingFactor);
  }, [installationType]);

  // Auto-update voltage when phases change
  useEffect(() => {
    if (phases === 'three') {
      setVoltage(400);
    } else if (phases === 'single') {
      setVoltage(230);
    }
  }, [phases]);

  // Auto-update Ze when earthing system changes (BS 7671 typical maximum values)
  useEffect(() => {
    const zeValues = {
      'TN-S': 0.8,
      'TN-C-S': 0.35,
      'TT': 21
    };
    setZe(zeValues[earthingSystem]);
  }, [earthingSystem]);

  const addQuickCircuit = (loadType: string) => {
    const newCircuit: CircuitInput = {
      id: `circuit-${Date.now()}`,
      name: `New ${loadType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      loadType: loadType as any,
      phases: installationType === 'industrial' ? 'three' : 'single',
      specialLocation: 'none'
    };
    setCircuits([...circuits, newCircuit]);
    setCircuitsOpen(true);
  };

  const applyTemplate = (templateId: string) => {
    // Search all template arrays
    const allTemplates = [
      ...DOMESTIC_TEMPLATES,
      ...COMMERCIAL_TEMPLATES,
      ...INDUSTRIAL_TEMPLATES
    ];
    
    const template = allTemplates.find(t => t.id === templateId);
    if (template) {
      const circuitsWithIds = template.circuits.map((circuit, idx) => ({
        ...circuit,
        id: `circuit-${Date.now()}-${idx}`
      }));
      setCircuits(circuitsWithIds);
      setCircuitsOpen(true);
      toast.success(`Applied: ${template.name}`, {
        description: `${template.circuits.length} circuits added`
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleGenerate();
  };

  const handleGenerate = async () => {
    if (!projectName.trim()) {
      toast.error('Project name required', {
        description: 'Please enter a project name to continue'
      });
      return;
    }

    if (circuits.length === 0 && !promptDescription.trim()) {
      toast.error('Circuits or description required', {
        description: 'Use the AI prompt field at the top to describe your requirements, or manually add circuits below'
      });
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
      ambientTemp,
      installationMethod,
      groupingFactor,
      circuits,
      additionalPrompt: promptDescription
    };

    await onGenerate(inputs);
  };

  const getButtonText = () => {
    if (circuits.length === 0 && promptDescription.trim()) {
      return 'Generate Design from AI Description';
    }
    if (circuits.length > 0 && !promptDescription.trim()) {
      return `Generate Design (${circuits.length} circuit${circuits.length !== 1 ? 's' : ''})`;
    }
    if (circuits.length > 0 && promptDescription.trim()) {
      return `Generate Enhanced Design (${circuits.length} circuits + AI)`;
    }
    return 'Describe requirements or add circuits';
  };

  const canGenerate = projectName.trim() && (circuits.length > 0 || promptDescription.trim().length > 0);

  // VALIDATION HELPER: Show what's missing
  const getMissingRequirements = () => {
    const missing: string[] = [];
    if (!projectName.trim()) missing.push('Project Name');
    if (circuits.length === 0 && !promptDescription.trim()) missing.push('Description or Circuits');
    return missing;
  };

  // FILL WITH TEST DATA
  const fillTestData = () => {
    setProjectName('Test Project - 3 Bed House Rewire');
    setLocation('123 Test Street, London, SW1A 1AA');
    setClientName('John Smith');
    setElectricianName('Test Electrician');
    setInstallationType('domestic');
    setPromptDescription('Complete rewire for 3-bedroom house. Include 4 socket rings, 6 lighting circuits, 10.5kW shower, 7.4kW EV charger, cooker circuit, and outdoor socket for garden.');
    
    toast.success('Form filled with test data', {
      description: 'You can now generate the design'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-6">
      {/* 1. HERO PROMPT SECTION */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 via-background to-background border-primary/20">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Sparkles className="h-6 w-6 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-snug">
                What electrical work do you need designed?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                Describe your requirements in plain English - AI will handle the rest
              </p>
            </div>
          </div>

          <Textarea
            value={promptDescription}
            onChange={(e) => setPromptDescription(e.target.value)}
            placeholder={isMobile 
              ? "e.g., 3-bed house rewire, kitchen extension, 2 showers, EV charger..."
              : "Example: 3-bed house complete rewire with new consumer unit, kitchen extension with integrated appliances, 2 bathrooms with 10.5kW showers, EV charger on driveway, outdoor sockets for garden..."
            }
            className="min-h-[160px] sm:min-h-[180px] text-base resize-none touch-manipulation"
            style={{ fontSize: '16px' }}
          />

          <InstallationTypeDetection
            detectedType={detectedType}
            selectedType={installationType}
            onTypeChange={setInstallationType}
            confidence={detectionConfidence}
          />

          <PromptExamples
            installationType={installationType}
            onSelectExample={setPromptDescription}
          />
        </div>
      </Card>

      {/* Design Preview Summary */}
      <DesignInputSummary
        promptDescription={promptDescription}
        installationType={installationType}
        circuits={circuits}
        detectionConfidence={detectionConfidence}
      />

      {/* 2. PROJECT INFORMATION */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold">Project Information</h3>
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <MobileInput
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Smith Residence Rewire"
              required
            />
            <MobileInput
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., 123 High Street, London"
            />
            <MobileInput
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., John Smith"
            />
            <MobileInput
              label="Electrician Name"
              value={electricianName}
              onChange={(e) => setElectricianName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
      </Card>

      {/* 3. SUPPLY DETAILS (Collapsible) */}
      <Collapsible open={supplyOpen} onOpenChange={setSupplyOpen}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-4 sm:p-6 min-h-[56px] flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation active:scale-[0.98]">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-left">Supply Details</h3>
              </div>
              <Badge variant="secondary" className="text-xs whitespace-nowrap">Smart defaults applied</Badge>
            </div>
            <ChevronDown className={`h-6 w-6 sm:h-5 sm:w-5 transition-transform flex-shrink-0 ml-2 ${supplyOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInput
                  label="Voltage (V)"
                  type="number"
                  value={voltage.toString()}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                />
                <div className="space-y-2">
                  <Label>Phases</Label>
                  <Select value={phases} onValueChange={(v: any) => setPhases(v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Phase</SelectItem>
                      <SelectItem value="three">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <MobileInput
                  label="Ze (Ω)"
                  type="number"
                  step="0.01"
                  value={ze.toString()}
                  onChange={(e) => setZe(Number(e.target.value))}
                />
                <div className="space-y-2">
                  <Label>Earthing System</Label>
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
                  label="Ambient Temp (°C)"
                  type="number"
                  value={ambientTemp.toString()}
                  onChange={(e) => setAmbientTemp(Number(e.target.value))}
                />
                <div className="space-y-2">
                  <Label>Installation Method</Label>
                  <Select value={installationMethod} onValueChange={(v: any) => setInstallationMethod(v)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                      <SelectItem value="in-conduit">In Conduit</SelectItem>
                      <SelectItem value="in-trunking">In Trunking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <MobileInput
                  label="Grouping Factor"
                  type="number"
                  value={groupingFactor.toString()}
                  onChange={(e) => setGroupingFactor(Number(e.target.value))}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 4. EMERGENCY CONTACTS (Collapsible) */}
      <Collapsible open={emergencyOpen} onOpenChange={setEmergencyOpen}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-4 sm:p-6 min-h-[56px] flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation active:scale-[0.98]">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-left">Emergency Contacts</h3>
              </div>
              <Badge variant="outline" className="text-xs whitespace-nowrap">Optional</Badge>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform flex-shrink-0 ml-2 ${emergencyOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInput
                  label="Emergency Contact Name"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g., Site Manager"
                />
                <MobileInput
                  label="Emergency Phone"
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="e.g., 07700 900000"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 5. MANUAL CIRCUIT OVERRIDE (Collapsible) */}
      <Collapsible open={circuitsOpen} onOpenChange={setCircuitsOpen}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-3 sm:p-6 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-semibold text-left">Manual Circuit Override</h3>
              </div>
              <Badge variant="outline" className="text-xs whitespace-nowrap">Optional</Badge>
              {circuits.length > 0 && (
                <Badge variant="secondary" className="text-xs whitespace-nowrap">{circuits.length} circuit{circuits.length !== 1 ? 's' : ''}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform flex-shrink-0 ml-2 ${circuitsOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="bg-accent/50 p-3 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground text-left">
                  Want to manually specify circuits? Add them below. Otherwise, AI will design them from your description above.
                </p>
              </div>

              {/* Quick Add Circuits - Enhanced Tabbed Design */}
              <Card className="border-elec-yellow/20 bg-elec-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    Quick Add Circuits
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Add common circuits with smart defaults
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="domestic" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 h-11">
                      <TabsTrigger value="domestic" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <House className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Domestic</span>
                        <span className="sm:hidden">Home</span>
                      </TabsTrigger>
                      <TabsTrigger value="commercial" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Commercial</span>
                        <span className="sm:hidden">Comm</span>
                      </TabsTrigger>
                      <TabsTrigger value="industrial" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <Factory className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Industrial</span>
                        <span className="sm:hidden">Ind</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="domestic" className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {QUICK_ADD_BUTTONS.domestic.map(btn => (
                          <Button
                            key={btn.value}
                            type="button"
                            variant="outline"
                            onClick={() => addQuickCircuit(btn.value)}
                            className="h-12 gap-2 touch-manipulation text-sm font-medium hover:bg-elec-yellow/5 hover:border-elec-yellow/50 transition-all active:scale-95"
                          >
                            <Plus className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{btn.label}</span>
                          </Button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="commercial" className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {QUICK_ADD_BUTTONS.commercial.map(btn => (
                          <Button
                            key={btn.value}
                            type="button"
                            variant="outline"
                            onClick={() => addQuickCircuit(btn.value)}
                            className="h-12 gap-2 touch-manipulation text-sm font-medium hover:bg-elec-yellow/5 hover:border-elec-yellow/50 transition-all active:scale-95"
                          >
                            <Plus className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{btn.label}</span>
                          </Button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="industrial" className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {QUICK_ADD_BUTTONS.industrial.map(btn => (
                          <Button
                            key={btn.value}
                            type="button"
                            variant="outline"
                            onClick={() => addQuickCircuit(btn.value)}
                            className="h-12 gap-2 touch-manipulation text-sm font-medium hover:bg-elec-yellow/5 hover:border-elec-yellow/50 transition-all active:scale-95"
                          >
                            <Plus className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{btn.label}</span>
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Template Presets - Enhanced Tabbed Design */}
              <Card className="border-elec-yellow/20 bg-elec-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                    Template Presets
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Start with pre-configured installation designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="domestic" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 h-11">
                      <TabsTrigger value="domestic" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <House className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Domestic</span>
                        <span className="sm:hidden">Home</span>
                      </TabsTrigger>
                      <TabsTrigger value="commercial" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Commercial</span>
                        <span className="sm:hidden">Comm</span>
                      </TabsTrigger>
                      <TabsTrigger value="industrial" className="text-xs sm:text-sm gap-1 sm:gap-2">
                        <Factory className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Industrial</span>
                        <span className="sm:hidden">Ind</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="domestic" className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {DOMESTIC_TEMPLATES.map(template => (
                          <Card 
                            key={template.id}
                            className="cursor-pointer hover:border-elec-yellow/40 hover:shadow-lg transition-all hover:-translate-y-1 group"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base group-hover:text-elec-yellow transition-colors">
                                  {template.name}
                                </CardTitle>
                                <Badge variant="secondary" className="shrink-0">
                                  {template.circuits.length}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm leading-relaxed">
                                {template.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="commercial" className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {COMMERCIAL_TEMPLATES.map(template => (
                          <Card 
                            key={template.id}
                            className="cursor-pointer hover:border-elec-yellow/40 hover:shadow-lg transition-all hover:-translate-y-1 group"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base group-hover:text-elec-yellow transition-colors">
                                  {template.name}
                                </CardTitle>
                                <Badge variant="secondary" className="shrink-0">
                                  {template.circuits.length}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm leading-relaxed">
                                {template.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="industrial" className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {INDUSTRIAL_TEMPLATES.map(template => (
                          <Card 
                            key={template.id}
                            className="cursor-pointer hover:border-elec-yellow/40 hover:shadow-lg transition-all hover:-translate-y-1 group"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base group-hover:text-elec-yellow transition-colors">
                                  {template.name}
                                </CardTitle>
                                <Badge variant="secondary" className="shrink-0">
                                  {template.circuits.length}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm leading-relaxed">
                                {template.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Circuit List */}
              {circuits.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Circuits ({circuits.length})</Label>
                  {circuits.map((circuit, idx) => (
                    <CircuitBuilderCard
                      key={idx}
                      circuit={circuit}
                      circuitNumber={idx + 1}
                      installationType={installationType}
                      onUpdate={(updated) => {
                        const newCircuits = [...circuits];
                        newCircuits[idx] = updated;
                        setCircuits(newCircuits);
                      }}
                      onDelete={() => setCircuits(circuits.filter((_, i) => i !== idx))}
                    />
                  ))}
                </div>
              )}

              {circuits.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No circuits added yet</p>
                  <p className="mt-1">Use Quick Add buttons or Template Presets above, or let AI design from your description</p>
                </div>
              )}

              {/* Smart Suggestions */}
              {circuits.length > 0 && (
                <SmartSuggestionPanel
                  installationType={installationType}
                />
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* GENERATE BUTTON */}
      <div className="space-y-2">
        {!canGenerate && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
            <p className="font-medium">Missing required fields:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {getMissingRequirements().map(req => (
                <li key={req}>{req}</li>
              ))}
            </ul>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillTestData}
              className="mt-3 gap-2 hover:bg-primary/10 hover:border-primary transition-all"
            >
              <FlaskConical className="h-4 w-4" />
              Fill Form with Test Data
            </Button>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={!canGenerate || isProcessing}
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold gap-2"
        >
          <Sparkles className="h-5 w-5" />
          {isProcessing ? 'Generating...' : getButtonText()}
        </Button>
      </div>
    </form>
  );
};
