import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Camera,
  Upload,
  Wrench,
  X,
  Loader2,
  Sparkles,
  Zap,
  Home,
  Building,
  Factory,
  Car,
  Lightbulb,
  Flame,
  Plug,
  AirVent,
  Server,
  Warehouse,
  ShowerHead,
  Microwave,
  Fan,
  BatteryCharging,
  Sun,
  Heater,
  Refrigerator,
  Monitor,
  ChevronRight,
  Info,
  Shield,
  CircuitBoard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import WiringGuidanceDisplay from '@/components/electrician-tools/ai-tools/WiringGuidanceDisplay';

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
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: Building,
    desc: 'Offices, shops, restaurants',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500/20 to-purple-500/5',
  },
  {
    id: 'industrial',
    label: 'Industrial',
    icon: Factory,
    desc: 'Factories, warehouses, workshops',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    gradient: 'from-orange-500/20 to-orange-500/5',
  },
];

// Circuit types by property type
const circuitsByProperty: Record<
  string,
  Array<{
    id: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    color: string;
    border: string;
    text: string;
    gradient: string;
  }>
> = {
  domestic: [
    {
      id: 'consumer-unit',
      label: 'Consumer Unit',
      icon: Zap,
      color: 'from-emerald-500/20 to-green-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500/20 to-green-500/10',
    },
    {
      id: 'lighting',
      label: 'Lighting Circuit',
      icon: Lightbulb,
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      gradient: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      id: 'ring-main',
      label: 'Ring Main',
      icon: Plug,
      color: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      id: 'cooker',
      label: 'Cooker/Hob',
      icon: Flame,
      color: 'from-orange-500/20 to-red-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      gradient: 'from-orange-500/20 to-red-500/10',
    },
    {
      id: 'shower',
      label: 'Electric Shower',
      icon: ShowerHead,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      gradient: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      id: 'ev-charger',
      label: 'EV Charger',
      icon: Car,
      color: 'from-green-500/20 to-teal-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      gradient: 'from-green-500/20 to-teal-500/10',
    },
    {
      id: 'immersion',
      label: 'Immersion Heater',
      icon: Heater,
      color: 'from-red-500/20 to-orange-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      gradient: 'from-red-500/20 to-orange-500/10',
    },
    {
      id: 'solar-pv',
      label: 'Solar PV',
      icon: Sun,
      color: 'from-amber-500/20 to-yellow-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500/20 to-yellow-500/10',
    },
    {
      id: 'other',
      label: 'Other',
      icon: Wrench,
      color: 'from-slate-500/20 to-gray-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-400',
      gradient: 'from-slate-500/20 to-gray-500/10',
    },
  ],
  commercial: [
    {
      id: 'distribution-board',
      label: 'Distribution Board',
      icon: CircuitBoard,
      color: 'from-purple-500/20 to-violet-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      gradient: 'from-purple-500/20 to-violet-500/10',
    },
    {
      id: 'three-phase',
      label: '3-Phase Supply',
      icon: Zap,
      color: 'from-emerald-500/20 to-green-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500/20 to-green-500/10',
    },
    {
      id: 'commercial-lighting',
      label: 'Commercial Lighting',
      icon: Lightbulb,
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      gradient: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      id: 'hvac',
      label: 'HVAC Systems',
      icon: AirVent,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      gradient: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      id: 'commercial-kitchen',
      label: 'Commercial Kitchen',
      icon: Microwave,
      color: 'from-orange-500/20 to-red-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      gradient: 'from-orange-500/20 to-red-500/10',
    },
    {
      id: 'server-room',
      label: 'Server Room/IT',
      icon: Server,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500/20 to-indigo-500/10',
    },
    {
      id: 'emergency-lighting',
      label: 'Emergency Lighting',
      icon: Shield,
      color: 'from-red-500/20 to-orange-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      gradient: 'from-red-500/20 to-orange-500/10',
    },
    {
      id: 'refrigeration',
      label: 'Refrigeration',
      icon: Refrigerator,
      color: 'from-teal-500/20 to-cyan-500/10',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      gradient: 'from-teal-500/20 to-cyan-500/10',
    },
    {
      id: 'other',
      label: 'Other',
      icon: Wrench,
      color: 'from-slate-500/20 to-gray-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-400',
      gradient: 'from-slate-500/20 to-gray-500/10',
    },
  ],
  industrial: [
    {
      id: 'main-switchgear',
      label: 'Main Switchgear',
      icon: CircuitBoard,
      color: 'from-orange-500/20 to-amber-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      gradient: 'from-orange-500/20 to-amber-500/10',
    },
    {
      id: 'motor-control',
      label: 'Motor Control Centre',
      icon: Fan,
      color: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      id: 'high-voltage',
      label: 'HV Systems',
      icon: Zap,
      color: 'from-red-500/20 to-orange-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      gradient: 'from-red-500/20 to-orange-500/10',
    },
    {
      id: 'industrial-lighting',
      label: 'Industrial Lighting',
      icon: Lightbulb,
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      gradient: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      id: 'ups-systems',
      label: 'UPS Systems',
      icon: BatteryCharging,
      color: 'from-green-500/20 to-emerald-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      gradient: 'from-green-500/20 to-emerald-500/10',
    },
    {
      id: 'plc-automation',
      label: 'PLC/Automation',
      icon: Monitor,
      color: 'from-purple-500/20 to-violet-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      gradient: 'from-purple-500/20 to-violet-500/10',
    },
    {
      id: 'crane-hoist',
      label: 'Crane/Hoist Systems',
      icon: Warehouse,
      color: 'from-slate-500/20 to-gray-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-400',
      gradient: 'from-slate-500/20 to-gray-500/10',
    },
    {
      id: 'welding',
      label: 'Welding Equipment',
      icon: Flame,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500/20 to-orange-500/10',
    },
    {
      id: 'other',
      label: 'Other',
      icon: Wrench,
      color: 'from-slate-500/20 to-gray-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-400',
      gradient: 'from-slate-500/20 to-gray-500/10',
    },
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

// Static mapping for dynamic property-based classes (Tailwind requires full class names at build time)
const propertyGradients: Record<
  string,
  { heroFrom: string; progressBg: string; captureBg: string }
> = {
  'text-blue-400': {
    heroFrom: 'from-blue-400/10 via-card to-card/90',
    progressBg: 'bg-blue-500',
    captureBg: 'bg-blue-400 hover:opacity-90',
  },
  'text-purple-400': {
    heroFrom: 'from-purple-400/10 via-card to-card/90',
    progressBg: 'bg-purple-500',
    captureBg: 'bg-purple-400 hover:opacity-90',
  },
  'text-orange-400': {
    heroFrom: 'from-orange-400/10 via-card to-card/90',
    progressBg: 'bg-orange-500',
    captureBg: 'bg-orange-400 hover:opacity-90',
  },
};

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
  const [textDescription, setTextDescription] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const [inputTab, setInputTab] = useState<'photo' | 'describe'>('describe');

  const currentCircuits = circuitsByProperty[selectedProperty] || circuitsByProperty.domestic;
  const selectedPropertyData = propertyTypes.find((p) => p.id === selectedProperty);
  const selectedCircuitData = currentCircuits.find((c) => c.id === selectedCircuit);

  const currentStep = useMemo(() => {
    if (!selectedCircuit) return 2;
    return 3;
  }, [selectedCircuit]);

  const hasInput = images.length > 0 || textDescription.trim().length > 0;
  const canGenerate = selectedCircuit && hasInput;

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({
        title: 'Camera Error',
        description: 'Unable to access camera',
        variant: 'destructive',
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
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
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setImages((prev) => [
              ...prev,
              new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }),
            ]);
            stopCamera();
          }
        },
        'image/jpeg',
        0.9
      );
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setImages((prev) =>
        [...prev, ...Array.from(files).filter((f) => f.type.startsWith('image/'))].slice(0, 4)
      );
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setSelectedCircuit(null); // Reset circuit when property changes
  };

  const handleAnalysis = async () => {
    const hasImage = images.length > 0;
    const hasText = textDescription.trim().length > 0;

    if (!hasImage && !hasText) {
      toast({
        title: 'No Input',
        description: 'Upload a photo or describe the component',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + Math.random() * 12, 90));
    }, 600);

    try {
      let publicUrl: string | null = null;

      // Upload image if provided
      if (hasImage) {
        const image = images[0];
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const fileName = `${user?.id}/visual-analysis/wiring-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, image);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);
        publicUrl = urlData.publicUrl;
      }

      const circuitLabel = currentCircuits.find((c) => c.id === selectedCircuit)?.label || '';
      const earthingLabel = earthingSystems.find((e) => e.id === selectedEarthing)?.label || '';

      // Call the RAG-powered wiring guidance generator
      const { data, error } = await supabase.functions.invoke('wiring-diagram-generator-rag', {
        body: {
          component_image_url: publicUrl,
          component_description: hasText
            ? `${textDescription.trim()}${additionalNotes ? `. ${additionalNotes}` : ''}`
            : null,
          property_type: selectedProperty,
          circuit_type: circuitLabel,
          earthing_system: earthingLabel,
          supply_amps: supplyAmps || null,
        },
      });

      if (error) {
        throw error;
      }

      const wiringData = data?.wiring_schematic;

      if (!wiringData) {
        toast({
          title: 'Invalid Response',
          description: "The analysis didn't return wiring instructions. Please try again.",
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      setAnalysisResult(data);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: 'Analysis Failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setImages([]);
    setTextDescription('');
    setSelectedCircuit(null);
    setAnalysisProgress(0);
  };

  const stepLabels = ['Property', 'Circuit', 'Component'];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11 max-w-5xl mx-auto">
            <Button variant="ghost" size="icon" onClick={() => navigate('/electrician-tools/ai-tooling')} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5 flex-1">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Wrench className="h-4 w-4 text-emerald-500" />
              </div>
              <h1 className="text-base font-semibold text-white">Wiring Guide</h1>
            </div>

            {/* Step indicator */}
            {!analysisResult && !isAnalyzing && (
              <div className="flex items-center gap-1.5">
                {stepLabels.map((label, i) => {
                  const stepNum = i + 1;
                  const isActive = currentStep >= stepNum;
                  const isCurrent = currentStep === stepNum;
                  return (
                    <div key={label} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <div
                          className={cn('w-4 h-px', isActive ? 'bg-emerald-500' : 'bg-white/20')}
                        />
                      )}
                      <div className="flex items-center gap-1">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            isCurrent
                              ? 'bg-emerald-500 scale-125'
                              : isActive
                                ? 'bg-emerald-500/60'
                                : 'bg-white/20'
                          )}
                        />
                        <span
                          className={cn(
                            'text-[10px] font-medium hidden sm:inline',
                            isCurrent
                              ? 'text-emerald-500'
                              : isActive
                                ? 'text-white'
                                : 'text-white'
                          )}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <main
        className={cn(
          'px-4 py-4 space-y-5 max-w-5xl mx-auto',
          canGenerate && !analysisResult && !isAnalyzing && 'pb-28'
        )}
      >
        {/* Results */}
        {analysisResult?.wiring_schematic ? (
          <div className="space-y-4">
            <WiringGuidanceDisplay
              componentName={analysisResult.wiring_schematic.component_name}
              componentDetails={analysisResult.wiring_schematic.component_details}
              wiringScenarios={
                analysisResult.wiring_schematic.wiring_scenarios || [
                  {
                    scenario_id: 'default',
                    scenario_name: 'Standard Installation',
                    use_case: 'Standard BS 7671 compliant installation',
                    complexity: 'simple',
                    recommended: true,
                    wiring_steps: analysisResult.wiring_schematic.wiring_steps,
                    terminal_connections: analysisResult.wiring_schematic.terminal_connections,
                    safety_warnings: analysisResult.wiring_schematic.safety_warnings,
                    required_tests: analysisResult.wiring_schematic.required_tests,
                  },
                ]
              }
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
          /* Loading state */
          <div className="bg-transparent border border-white/[0.08] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'p-3 rounded-xl',
                  selectedPropertyData?.bg,
                  selectedPropertyData?.border
                )}
              >
                <Loader2 className={cn('h-6 w-6 animate-spin', selectedPropertyData?.color)} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Generating Wiring Guide</h3>
                <p className="text-sm text-white mt-0.5">
                  {analysisProgress < 30
                    ? 'Analysing component...'
                    : analysisProgress < 60
                      ? 'Searching BS 7671 regulations...'
                      : analysisProgress < 90
                        ? 'Creating step-by-step guide...'
                        : 'Finalising...'}
                </p>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  selectedProperty === 'domestic'
                    ? 'bg-blue-500'
                    : selectedProperty === 'commercial'
                      ? 'bg-purple-500'
                      : 'bg-orange-500'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Property Type */}
            <section className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                Property Type
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.map((prop) => {
                  const isSelected = selectedProperty === prop.id;
                  const accentColors: Record<string, string> = {
                    domestic: 'from-blue-500 via-blue-400 to-cyan-400',
                    commercial: 'from-purple-500 via-violet-400 to-indigo-400',
                    industrial: 'from-orange-500 via-amber-400 to-red-400',
                  };
                  return (
                    <button
                      key={prop.id}
                      onClick={() => handlePropertyChange(prop.id)}
                      className={cn(
                        'group relative overflow-hidden touch-manipulation active:scale-[0.98] transition-all duration-200',
                        'bg-transparent border border-white/[0.08] rounded-2xl min-h-[130px] flex flex-col items-center justify-center gap-3 p-4 hover:bg-white/[0.04] hover:border-white/[0.15]',
                        isSelected &&
                          cn('border-2', prop.border, 'bg-gradient-to-br', prop.gradient)
                      )}
                    >
                      {/* Top accent line */}
                      <div
                        className={cn(
                          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r transition-opacity duration-200',
                          accentColors[prop.id],
                          isSelected ? 'opacity-80' : 'opacity-20 group-hover:opacity-50'
                        )}
                      />

                      <div
                        className={cn(
                          'p-2.5 rounded-xl border transition-all duration-200',
                          isSelected
                            ? cn(prop.bg, prop.border)
                            : 'bg-white/[0.03] border-white/[0.08] group-hover:scale-110'
                        )}
                      >
                        <prop.icon
                          className={cn('h-6 w-6', isSelected ? prop.color : 'text-white')}
                        />
                      </div>
                      <div className="text-center">
                        <span
                          className={cn(
                            'text-sm font-semibold block',
                            'text-white'
                          )}
                        >
                          {prop.label}
                        </span>
                        <span className="text-[10px] text-white mt-0.5 block">{prop.desc}</span>
                      </div>
                      {isSelected && (
                        <div
                          className={cn(
                            'absolute top-2.5 right-2.5 w-2 h-2 rounded-full animate-pulse',
                            prop.color?.replace('text-', 'bg-')
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Circuit Type */}
            <motion.section
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="flex items-center justify-between px-0.5">
                <h2 className="text-xs font-medium text-white uppercase tracking-wider">
                  What are you wiring?
                </h2>
                <Badge variant="secondary" className="text-[10px] capitalize">
                  {selectedProperty}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currentCircuits.map((circuit) => {
                  const isSelected = selectedCircuit === circuit.id;
                  return (
                    <button
                      key={circuit.id}
                      onClick={() => setSelectedCircuit(circuit.id)}
                      className={cn(
                        'group relative overflow-hidden touch-manipulation active:scale-[0.98] transition-all duration-200',
                        'bg-transparent border border-white/[0.08] rounded-2xl min-h-[100px] flex flex-col items-center justify-center gap-2.5 p-4 hover:bg-white/[0.04] hover:border-white/[0.15]',
                        isSelected &&
                          cn('border-2', circuit.border, 'bg-gradient-to-br', circuit.gradient)
                      )}
                    >
                      {/* Top accent */}
                      <div
                        className={cn(
                          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r transition-opacity duration-200',
                          circuit.gradient?.replace('/20', '').replace('/10', ''),
                          isSelected ? 'opacity-80' : 'opacity-0 group-hover:opacity-40'
                        )}
                      />

                      <div
                        className={cn(
                          'p-2 rounded-xl border transition-all',
                          isSelected
                            ? cn(`bg-gradient-to-br ${circuit.gradient}`, circuit.border)
                            : 'bg-white/[0.03] border-white/[0.08] group-hover:scale-110'
                        )}
                      >
                        <circuit.icon
                          className={cn('h-5 w-5', isSelected ? circuit.text : 'text-white')}
                        />
                      </div>
                      <span
                        className={cn(
                          'text-xs font-semibold text-center leading-tight',
                          'text-white'
                        )}
                      >
                        {circuit.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.section>

            {/* Step 3: Component Input (appears after circuit selected) */}
            <AnimatePresence>
              {currentStep >= 3 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  {/* Input method tabs */}
                  <section className="space-y-3">
                    <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                      Describe or Photograph Component
                    </h2>
                    <div className="bg-transparent border border-white/[0.08] rounded-2xl p-1.5 flex gap-1">
                      <button
                        onClick={() => setInputTab('describe')}
                        className={cn(
                          'flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation flex items-center justify-center gap-2',
                          inputTab === 'describe'
                            ? 'bg-emerald-500 text-white'
                            : 'text-white hover:bg-white/[0.06]'
                        )}
                      >
                        <Sparkles className="h-4 w-4" />
                        Describe It
                      </button>
                      <button
                        onClick={() => setInputTab('photo')}
                        className={cn(
                          'flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation flex items-center justify-center gap-2',
                          inputTab === 'photo'
                            ? 'bg-emerald-500 text-white'
                            : 'text-white hover:bg-white/[0.06]'
                        )}
                      >
                        <Camera className="h-4 w-4" />
                        Take Photo
                      </button>
                    </div>

                    {/* Describe tab */}
                    {inputTab === 'describe' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-transparent border border-white/[0.08] rounded-2xl p-4 space-y-3"
                      >
                        <Textarea
                          value={textDescription}
                          onChange={(e) => setTextDescription(e.target.value)}
                          placeholder="e.g. 2-gang 2-way light switch, Hager 18-way dual RCD consumer unit, shower pull cord isolator..."
                          className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-emerald-500/20 border-white/[0.08] focus:border-emerald-500 bg-transparent text-white"
                        />
                        <p className="text-[11px] text-white">
                          Be specific — include manufacturer, model, or terminal markings if known
                        </p>
                      </motion.div>
                    )}

                    {/* Photo tab */}
                    {inputTab === 'photo' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-transparent border border-white/[0.08] rounded-2xl p-4 space-y-4"
                      >
                        <AnimatePresence>
                          {isCameraActive && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="space-y-3 overflow-hidden"
                            >
                              <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                                <video
                                  ref={videoRef}
                                  autoPlay
                                  playsInline
                                  muted
                                  className="w-full h-full object-cover"
                                />
                                <div
                                  className={cn(
                                    'absolute inset-0 border-2 rounded-xl pointer-events-none',
                                    selectedPropertyData?.border
                                  )}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={captureImage}
                                  className={cn(
                                    'flex-1 h-12 text-white',
                                    selectedProperty === 'domestic'
                                      ? 'bg-blue-500 hover:bg-blue-600'
                                      : selectedProperty === 'commercial'
                                        ? 'bg-purple-500 hover:bg-purple-600'
                                        : 'bg-orange-500 hover:bg-orange-600'
                                  )}
                                >
                                  <Camera className="h-5 w-5 mr-2" />
                                  Capture
                                </Button>
                                <Button onClick={stopCamera} variant="outline" className="h-12">
                                  <X className="h-5 w-5" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isCameraActive && (
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              onClick={startCamera}
                              className={cn(
                                'h-14 text-white',
                                selectedProperty === 'domestic'
                                  ? 'bg-blue-500 hover:bg-blue-600'
                                  : selectedProperty === 'commercial'
                                    ? 'bg-purple-500 hover:bg-purple-600'
                                    : 'bg-orange-500 hover:bg-orange-600'
                              )}
                            >
                              <Camera className="h-5 w-5 mr-2" />
                              Camera
                            </Button>
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                              className="h-14 bg-white/[0.06] ring-1 ring-white/[0.08] text-white hover:bg-white/[0.1]"
                            >
                              <Upload className="h-5 w-5 mr-2" />
                              Upload
                            </Button>
                          </div>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e.target.files)}
                          className="hidden"
                        />

                        {images.length > 0 && (
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((img, idx) => (
                              <div
                                key={idx}
                                className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-500/30"
                              >
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <button
                                  onClick={() => removeImage(idx)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                                >
                                  <X className="h-3 w-3 text-white" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </section>

                  {/* Technical Details — collapsible */}
                  <div className="bg-transparent border border-white/[0.08] rounded-2xl overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none touch-manipulation">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-white text-sm">Technical Details</span>
                          <Badge variant="secondary" className="text-[10px]">
                            Optional
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-4">
                        {/* Installation Type */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-white">
                            Installation Type
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {installContexts.map((ctx) => (
                              <button
                                key={ctx.id}
                                onClick={() => setSelectedContext(ctx.id)}
                                className={cn(
                                  'px-3 py-2 rounded-xl border text-xs font-medium transition-all min-h-[44px] touch-manipulation',
                                  selectedContext === ctx.id
                                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                    : 'border-white/[0.08] text-white hover:border-white/[0.15] bg-transparent'
                                )}
                              >
                                {ctx.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Earthing System */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-white">
                            Earthing System
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {earthingSystems.map((sys) => (
                              <button
                                key={sys.id}
                                onClick={() => setSelectedEarthing(sys.id)}
                                className={cn(
                                  'px-3 py-2 rounded-lg border text-xs font-medium transition-all min-h-[44px] touch-manipulation',
                                  selectedEarthing === sys.id
                                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                    : 'border-white/[0.08] text-white hover:border-white/[0.15] bg-transparent'
                                )}
                              >
                                {sys.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Supply Rating */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-white">
                            Supply Rating (Amps)
                          </label>
                          <input
                            type="text"
                            placeholder={
                              selectedProperty === 'domestic'
                                ? 'e.g., 100A'
                                : selectedProperty === 'commercial'
                                  ? 'e.g., 200A'
                                  : 'e.g., 400A'
                            }
                            value={supplyAmps}
                            onChange={(e) => setSupplyAmps(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-white/[0.08] bg-transparent text-white text-sm touch-manipulation"
                            style={{ fontSize: '16px' }}
                          />
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-white">
                            Additional Details
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., existing circuit details, special requirements..."
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-white/[0.08] bg-transparent text-white text-sm touch-manipulation"
                            style={{ fontSize: '16px' }}
                          />
                        </div>
                      </div>
                    </details>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>

      {/* Sticky generate button */}
      <AnimatePresence>
        {canGenerate && !analysisResult && !isAnalyzing && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-0 inset-x-0 z-40 p-4 bg-background/95 backdrop-blur-xl border-t border-white/[0.06]"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <Button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className={cn(
                'w-full h-14 rounded-xl text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg max-w-5xl mx-auto flex',
                selectedProperty === 'domestic'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-blue-500/20'
                  : selectedProperty === 'commercial'
                    ? 'bg-gradient-to-r from-purple-500 to-violet-400 shadow-purple-500/20'
                    : 'bg-gradient-to-r from-orange-500 to-amber-400 shadow-orange-500/20'
              )}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate {selectedCircuitData?.label || ''} Wiring Guide
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WiringInstructionPage;
