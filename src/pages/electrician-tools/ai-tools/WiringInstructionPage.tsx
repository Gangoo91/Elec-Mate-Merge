import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Camera, Upload, Wrench, X, Loader2, Sparkles,
  Zap, Home, Building, Factory, Car, Lightbulb, Flame, Plug,
  AirVent, Server, Warehouse, ShowerHead, Microwave, Fan,
  BatteryCharging, Sun, Heater, Refrigerator, Monitor, ChevronRight,
  Info, Shield, CircuitBoard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import WiringGuidanceDisplay from "@/components/electrician-tools/ai-tools/WiringGuidanceDisplay";

// Property types with detailed info
const propertyTypes = [
  {
    id: 'domestic',
    label: 'Domestic',
    icon: Home,
    desc: 'Houses, flats, apartments',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500/20 to-blue-500/5'
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: Building,
    desc: 'Offices, shops, restaurants',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500/20 to-purple-500/5'
  },
  {
    id: 'industrial',
    label: 'Industrial',
    icon: Factory,
    desc: 'Factories, warehouses, workshops',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    gradient: 'from-orange-500/20 to-orange-500/5'
  },
];

// Circuit types by property type
const circuitsByProperty: Record<string, Array<{ id: string; label: string; icon: any; color: string; border: string; text: string; gradient: string }>> = {
  domestic: [
    { id: 'consumer-unit', label: 'Consumer Unit', icon: Zap, color: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', gradient: 'from-emerald-500/20 to-green-500/10' },
    { id: 'lighting', label: 'Lighting Circuit', icon: Lightbulb, color: 'from-yellow-500/20 to-amber-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', gradient: 'from-yellow-500/20 to-amber-500/10' },
    { id: 'ring-main', label: 'Ring Main', icon: Plug, color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/10' },
    { id: 'cooker', label: 'Cooker/Hob', icon: Flame, color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/10' },
    { id: 'shower', label: 'Electric Shower', icon: ShowerHead, color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/10' },
    { id: 'ev-charger', label: 'EV Charger', icon: Car, color: 'from-green-500/20 to-teal-500/10', border: 'border-green-500/30', text: 'text-green-400', gradient: 'from-green-500/20 to-teal-500/10' },
    { id: 'immersion', label: 'Immersion Heater', icon: Heater, color: 'from-red-500/20 to-orange-500/10', border: 'border-red-500/30', text: 'text-red-400', gradient: 'from-red-500/20 to-orange-500/10' },
    { id: 'solar-pv', label: 'Solar PV', icon: Sun, color: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/30', text: 'text-amber-400', gradient: 'from-amber-500/20 to-yellow-500/10' },
    { id: 'other', label: 'Other', icon: Wrench, color: 'from-slate-500/20 to-gray-500/10', border: 'border-slate-500/30', text: 'text-slate-400', gradient: 'from-slate-500/20 to-gray-500/10' },
  ],
  commercial: [
    { id: 'distribution-board', label: 'Distribution Board', icon: CircuitBoard, color: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/30', text: 'text-purple-400', gradient: 'from-purple-500/20 to-violet-500/10' },
    { id: 'three-phase', label: '3-Phase Supply', icon: Zap, color: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', gradient: 'from-emerald-500/20 to-green-500/10' },
    { id: 'commercial-lighting', label: 'Commercial Lighting', icon: Lightbulb, color: 'from-yellow-500/20 to-amber-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', gradient: 'from-yellow-500/20 to-amber-500/10' },
    { id: 'hvac', label: 'HVAC Systems', icon: AirVent, color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/10' },
    { id: 'commercial-kitchen', label: 'Commercial Kitchen', icon: Microwave, color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/10' },
    { id: 'server-room', label: 'Server Room/IT', icon: Server, color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500/20 to-indigo-500/10' },
    { id: 'emergency-lighting', label: 'Emergency Lighting', icon: Shield, color: 'from-red-500/20 to-orange-500/10', border: 'border-red-500/30', text: 'text-red-400', gradient: 'from-red-500/20 to-orange-500/10' },
    { id: 'refrigeration', label: 'Refrigeration', icon: Refrigerator, color: 'from-teal-500/20 to-cyan-500/10', border: 'border-teal-500/30', text: 'text-teal-400', gradient: 'from-teal-500/20 to-cyan-500/10' },
    { id: 'other', label: 'Other', icon: Wrench, color: 'from-slate-500/20 to-gray-500/10', border: 'border-slate-500/30', text: 'text-slate-400', gradient: 'from-slate-500/20 to-gray-500/10' },
  ],
  industrial: [
    { id: 'main-switchgear', label: 'Main Switchgear', icon: CircuitBoard, color: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500/20 to-amber-500/10' },
    { id: 'motor-control', label: 'Motor Control Centre', icon: Fan, color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/10' },
    { id: 'high-voltage', label: 'HV Systems', icon: Zap, color: 'from-red-500/20 to-orange-500/10', border: 'border-red-500/30', text: 'text-red-400', gradient: 'from-red-500/20 to-orange-500/10' },
    { id: 'industrial-lighting', label: 'Industrial Lighting', icon: Lightbulb, color: 'from-yellow-500/20 to-amber-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', gradient: 'from-yellow-500/20 to-amber-500/10' },
    { id: 'ups-systems', label: 'UPS Systems', icon: BatteryCharging, color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/30', text: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/10' },
    { id: 'plc-automation', label: 'PLC/Automation', icon: Monitor, color: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/30', text: 'text-purple-400', gradient: 'from-purple-500/20 to-violet-500/10' },
    { id: 'crane-hoist', label: 'Crane/Hoist Systems', icon: Warehouse, color: 'from-slate-500/20 to-gray-500/10', border: 'border-slate-500/30', text: 'text-slate-400', gradient: 'from-slate-500/20 to-gray-500/10' },
    { id: 'welding', label: 'Welding Equipment', icon: Flame, color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/30', text: 'text-amber-400', gradient: 'from-amber-500/20 to-orange-500/10' },
    { id: 'other', label: 'Other', icon: Wrench, color: 'from-slate-500/20 to-gray-500/10', border: 'border-slate-500/30', text: 'text-slate-400', gradient: 'from-slate-500/20 to-gray-500/10' },
  ],
};

// Installation context
const installContexts = [
  { id: 'new', label: 'New Install', desc: 'First time installation' },
  { id: 'replacement', label: 'Replacement', desc: 'Like for like swap' },
  { id: 'upgrade', label: 'Upgrade', desc: 'Improving capacity' },
  { id: 'extension', label: 'Extension', desc: 'Adding to existing' },
  { id: 'fault-repair', label: 'Fault Repair', desc: 'Fixing issues' },
];

// Earthing systems
const earthingSystems = [
  { id: 'tn-c-s', label: 'TN-C-S (PME)' },
  { id: 'tn-s', label: 'TN-S' },
  { id: 'tt', label: 'TT' },
  { id: 'unknown', label: 'Unknown' },
];

const WiringInstructionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [images, setImages] = useState<File[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('domestic');
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState<string>('new');
  const [selectedEarthing, setSelectedEarthing] = useState<string>('unknown');
  const [supplyAmps, setSupplyAmps] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const currentCircuits = circuitsByProperty[selectedProperty] || circuitsByProperty.domestic;
  const selectedPropertyData = propertyTypes.find(p => p.id === selectedProperty);

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({ title: "Camera Error", description: "Unable to access camera", variant: "destructive" });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setImages(prev => [...prev, new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })]);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setImages(prev => [...prev, ...Array.from(files).filter(f => f.type.startsWith('image/'))].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setSelectedCircuit(null); // Reset circuit when property changes
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({ title: "No Image", description: "Please upload a photo of the component", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + Math.random() * 12, 90));
    }, 600);

    try {
      const image = images[0];
      const { data: { user } } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/wiring-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage.from('visual-uploads').upload(fileName, image);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

      const circuitLabel = currentCircuits.find(c => c.id === selectedCircuit)?.label || 'component';
      const contextLabel = installContexts.find(c => c.id === selectedContext)?.label || '';
      const earthingLabel = earthingSystems.find(e => e.id === selectedEarthing)?.label || '';

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: publicUrl,
          analysis_settings: {
            mode: 'wiring_instruction',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [`Property: ${selectedProperty}`, `Circuit: ${circuitLabel}`, `Context: ${contextLabel}`, `Earthing: ${earthingLabel}`, `Supply: ${supplyAmps || 'Not specified'}A`, additionalNotes].filter(Boolean),
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false
          }
        }
      });

      if (error) throw error;
      setAnalysisProgress(100);
      setAnalysisResult(data);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: "Analysis Failed", description: "Please try again", variant: "destructive" });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setImages([]);
    setSelectedCircuit(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 pt-safe">
        <div className="px-4 py-2">
          <button onClick={() => navigate('/electrician-tools/ai-tooling')} className="flex items-center gap-2 text-foreground h-11 touch-manipulation active:scale-[0.98] transition-all -ml-2 px-2 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-2xl mx-auto">
        {/* Hero - Changes based on property type */}
        <div className={cn(
          "rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-5 overflow-hidden relative",
          selectedPropertyData?.border || 'border-emerald-500/30',
          `from-${selectedPropertyData?.color.replace('text-', '')}/10 via-card to-card/90`
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl border",
              selectedPropertyData?.bg,
              selectedPropertyData?.border
            )}>
              <Wrench className={cn("h-7 w-7", selectedPropertyData?.color || 'text-emerald-400')} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Wiring Instructions</h1>
              <p className="text-sm text-muted-foreground">Step-by-step UK wiring guidance</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {analysisResult?.wiring_schematic ? (
          <div className="space-y-4">
            <WiringGuidanceDisplay
              componentName={analysisResult.wiring_schematic.component_name}
              componentDetails={analysisResult.wiring_schematic.component_details}
              wiringScenarios={analysisResult.wiring_schematic.wiring_scenarios || [{
                scenario_id: 'default',
                scenario_name: 'Standard Installation',
                use_case: 'Standard BS 7671 compliant installation',
                complexity: 'simple',
                recommended: true,
                wiring_steps: analysisResult.wiring_schematic.wiring_steps,
                terminal_connections: analysisResult.wiring_schematic.terminal_connections,
                safety_warnings: analysisResult.wiring_schematic.safety_warnings,
                required_tests: analysisResult.wiring_schematic.required_tests
              }]}
              comparison={analysisResult.wiring_schematic.comparison}
              ragSourcesCount={analysisResult.wiring_schematic.rag_sources}
              preInstallationTasks={analysisResult.wiring_schematic.pre_installation_tasks}
              boardLayoutGuide={analysisResult.wiring_schematic.board_layout_guide}
              wiringSequenceStrategy={analysisResult.wiring_schematic.wiring_sequence_strategy}
              practicalTips={analysisResult.wiring_schematic.practical_tips}
              commonMistakes={analysisResult.wiring_schematic.common_mistakes}
            />
            <Button onClick={resetAnalysis} variant="outline" className="w-full h-12">
              Get New Wiring Guide
            </Button>
          </div>
        ) : isAnalyzing ? (
          <div className={cn(
            "rounded-xl border bg-card/50 p-6 space-y-4",
            selectedPropertyData?.border
          )}>
            <div className="flex items-center gap-3">
              <Loader2 className={cn("h-6 w-6 animate-spin", selectedPropertyData?.color)} />
              <div>
                <h3 className="font-semibold text-foreground">Generating Wiring Guide...</h3>
                <p className="text-xs text-muted-foreground">Creating {selectedProperty} installation instructions</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full", selectedPropertyData?.bg?.replace('/10', ''))}
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Property Type Selection - Large Visual Cards */}
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground px-1">Property Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.map(prop => {
                  const isSelected = selectedProperty === prop.id;
                  return (
                    <button
                      key={prop.id}
                      onClick={() => handlePropertyChange(prop.id)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all overflow-hidden",
                        "min-h-[100px] flex flex-col items-center justify-center gap-2",
                        isSelected
                          ? cn(prop.bg, prop.border)
                          : "border-border/30 bg-card/50 hover:border-border/50"
                      )}
                    >
                      <div className={cn(
                        "p-2.5 rounded-lg transition-colors",
                        isSelected ? cn(prop.bg, prop.border) : "bg-muted/50"
                      )}>
                        <prop.icon className={cn("h-6 w-6", isSelected ? prop.color : "text-muted-foreground")} />
                      </div>
                      <div className="text-center">
                        <span className={cn(
                          "text-sm font-semibold block",
                          isSelected ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {prop.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{prop.desc}</span>
                      </div>
                      {isSelected && (
                        <div className={cn("absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse", prop.bg?.replace('/10', ''))} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Circuit Type Selection - Dynamic based on property */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="font-semibold text-foreground">What are you wiring?</h2>
                <Badge variant="secondary" className="text-xs capitalize">{selectedProperty}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {currentCircuits.map(circuit => {
                  const isSelected = selectedCircuit === circuit.id;
                  return (
                    <button
                      key={circuit.id}
                      onClick={() => setSelectedCircuit(circuit.id)}
                      className={cn(
                        "relative p-3 rounded-xl border-2 transition-all overflow-hidden",
                        "min-h-[80px] flex flex-col items-center justify-center gap-1.5",
                        isSelected
                          ? cn(`bg-gradient-to-br ${circuit.gradient}`, circuit.border)
                          : "border-border/30 bg-card/50 hover:border-border/50"
                      )}
                    >
                      <circuit.icon className={cn("h-5 w-5", isSelected ? circuit.text : "text-muted-foreground")} />
                      <span className={cn(
                        "text-xs font-medium text-center leading-tight",
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {circuit.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Installation Context Pills */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm">Installation Type</h3>
              <div className="flex flex-wrap gap-2">
                {installContexts.map(ctx => (
                  <button
                    key={ctx.id}
                    onClick={() => setSelectedContext(ctx.id)}
                    className={cn(
                      "px-3 py-2 rounded-xl border-2 text-xs font-medium transition-all min-h-[40px]",
                      selectedContext === ctx.id
                        ? cn(selectedPropertyData?.bg, selectedPropertyData?.border, selectedPropertyData?.color)
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    {ctx.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Details - Collapsible */}
            <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <div className="flex items-center gap-2">
                    <Info className={cn("h-4 w-4", selectedPropertyData?.color)} />
                    <span className="font-medium text-foreground text-sm">Technical Details</span>
                    <Badge variant="secondary" className="text-[10px]">Optional</Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4 space-y-4 border-t border-border/30 pt-4">
                  {/* Earthing System */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Earthing System</label>
                    <div className="flex flex-wrap gap-2">
                      {earthingSystems.map(sys => (
                        <button
                          key={sys.id}
                          onClick={() => setSelectedEarthing(sys.id)}
                          className={cn(
                            "px-3 py-2 rounded-lg border text-xs font-medium transition-all min-h-[36px]",
                            selectedEarthing === sys.id
                              ? cn(selectedPropertyData?.bg, selectedPropertyData?.border, selectedPropertyData?.color)
                              : "border-border/30 text-muted-foreground hover:border-border/50"
                          )}
                        >
                          {sys.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supply Rating */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Supply Rating (Amps)</label>
                    <input
                      type="text"
                      placeholder={selectedProperty === 'domestic' ? "e.g., 100A" : selectedProperty === 'commercial' ? "e.g., 200A" : "e.g., 400A"}
                      value={supplyAmps}
                      onChange={(e) => setSupplyAmps(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-border/30 bg-background/50 text-foreground text-sm"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Additional Details</label>
                    <input
                      type="text"
                      placeholder="e.g., existing circuit details, special requirements..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-border/30 bg-background/50 text-foreground text-sm"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
              </details>
            </div>

            {/* Image Capture */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Camera className={cn("h-5 w-5", selectedPropertyData?.color)} />
                <h3 className="font-semibold text-foreground">Photo of Component</h3>
              </div>

              <AnimatePresence>
                {isCameraActive && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="space-y-3 overflow-hidden">
                    <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      <div className={cn("absolute inset-0 border-2 rounded-xl pointer-events-none", selectedPropertyData?.border)} />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={captureImage} className={cn("flex-1 h-12", `bg-${selectedPropertyData?.color?.replace('text-', '')} hover:opacity-90`)}>
                        <Camera className="h-5 w-5 mr-2" />Capture
                      </Button>
                      <Button onClick={stopCamera} variant="outline" className="h-12"><X className="h-5 w-5" /></Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={startCamera}
                    className={cn(
                      "h-14 text-white",
                      selectedProperty === 'domestic' ? "bg-blue-500 hover:bg-blue-600" :
                      selectedProperty === 'commercial' ? "bg-purple-500 hover:bg-purple-600" :
                      "bg-orange-500 hover:bg-orange-600"
                    )}
                  >
                    <Camera className="h-5 w-5 mr-2" />Camera
                  </Button>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className={cn("h-14", selectedPropertyData?.border)}>
                    <Upload className="h-5 w-5 mr-2" />Upload
                  </Button>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />

              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div key={idx} className={cn("relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2", selectedPropertyData?.border)}>
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Button */}
            {images.length > 0 && selectedCircuit && (
              <Button
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-xl text-white shadow-lg",
                  selectedProperty === 'domestic' ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25" :
                  selectedProperty === 'commercial' ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/25" :
                  "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25"
                )}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate {selectedProperty.charAt(0).toUpperCase() + selectedProperty.slice(1)} Wiring Guide
              </Button>
            )}

            {/* Hint if no circuit selected */}
            {images.length > 0 && !selectedCircuit && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">Select a circuit type above to continue</span>
                </div>
              </div>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default WiringInstructionPage;
