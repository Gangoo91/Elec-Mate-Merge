import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Sparkles, Loader2, ArrowLeft, Mic, ChevronRight, Camera,
  LayoutGrid, Shield, Zap, Lightbulb, FileText, PoundSterling,
  AlertTriangle, Info, CheckCircle2,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { cn } from '@/lib/utils';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';

type Mode = 'hub' | 'templates' | 'describe' | 'review' | 'autoplace' | 'suggestions' | 'spec' | 'quote' | 'photo';

const QUICK_TEMPLATES = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    dimensions: '4m x 3m',
    description:
      'Kitchen - 4m x 3m. 4m north wall with window centred. 3m east wall with door on right. 4m south wall with 6 double sockets evenly spaced along worktop height (1.15m). 3m west wall with 1-way switch near door. Dedicated cooker-45a socket on south wall. Switched fused spur for extractor fan on north wall near window. Ceiling light in centre.',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    dimensions: '3m x 4m',
    description:
      'Bedroom - 3m x 4m. 3m north wall with window centred. 4m east wall. 3m south wall with door on left and 2x double sockets. 4m west wall with 1x double socket. 2-way light switches on east and west walls near door. Ceiling light in centre. Smoke detector on ceiling.',
  },
  {
    id: 'living-room',
    name: 'Living Room',
    dimensions: '5m x 4m',
    description:
      'Living room - 5m x 4m. 5m north wall with large window centred. 4m east wall with door on right and 1x double socket. 5m south wall with 3x double sockets evenly spaced and 1x TV aerial socket. 4m west wall with 2x double sockets. 2-way switches near door and far wall. 2x ceiling lights evenly spaced. Smoke detector on ceiling.',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    dimensions: '2.5m x 3m',
    description:
      'Bathroom - 2.5m x 3m. 2.5m north wall with window centred. 3m east wall with door on right. 2.5m south wall. 3m west wall with shaver socket at 1.5m height. Pull-cord switch on ceiling near door. 4x IP-rated downlights evenly spaced on ceiling. Extractor fan on north wall near ceiling. No 13A sockets allowed. Smoke detector on ceiling.',
  },
  {
    id: 'office',
    name: 'Office',
    dimensions: '5m x 4m',
    description:
      'Office - 5m x 4m. 5m north wall with 2x windows. 4m east wall with 2x double sockets and 1x data socket. 5m south wall with door on left and 4x double sockets evenly spaced. 4m west wall with 2x double sockets and 1x data socket. 1-way switch near door. 2x ceiling lights evenly spaced. Smoke detector on ceiling.',
  },
  {
    id: 'garage',
    name: 'Garage',
    dimensions: '6m x 3m',
    description:
      'Garage - 6m x 3m. 6m north wall with up-and-over door. 3m east wall with consumer unit at 1.5m height. 6m south wall with 2x double sockets evenly spaced. 3m west wall with 1x outdoor IP66 socket outside. 1-way switch near side door on east wall. 2x fluorescent lights on ceiling evenly spaced. Smoke detector on ceiling.',
  },
  {
    id: 'utility-room',
    name: 'Utility',
    dimensions: '2m x 3m',
    description:
      'Utility room - 2m x 3m. 2m north wall. 3m east wall with door on right. 2m south wall with 2x double sockets at worktop height (1.15m). 3m west wall with 1x switched fused spur for washing machine and 1x switched fused spur for dryer. 1-way switch near door. Ceiling light in centre. Extractor fan on north wall.',
  },
  {
    id: 'hallway',
    name: 'Hallway',
    dimensions: '6m x 1.5m',
    description:
      'Hallway - 6m x 1.5m. 6m north wall. 1.5m east wall with front door. 6m south wall with 1x double socket at midpoint. 1.5m west wall. 2-way switches at both ends of hallway. 2x ceiling lights evenly spaced. Smoke detector on ceiling at midpoint.',
  },
  {
    id: 'en-suite',
    name: 'En-Suite',
    dimensions: '2m x 2.5m',
    description:
      'En-suite bathroom - 2m x 2.5m. 2m north wall. 2.5m east wall with door on right. 2m south wall with shaver socket at 1.5m height. 2.5m west wall. Pull-cord switch on ceiling near door. 3x IP-rated downlights on ceiling. Extractor fan on north wall near ceiling. No 13A sockets allowed.',
  },
  {
    id: 'wc',
    name: 'WC',
    dimensions: '1.5m x 2m',
    description:
      'WC/cloakroom - 1.5m x 2m. 1.5m north wall. 2m east wall with door on right. 1.5m south wall. 2m west wall. Pull-cord switch on ceiling near door. 1x ceiling light in centre. Extractor fan on north wall near ceiling. No 13A sockets.',
  },
  {
    id: 'conservatory',
    name: 'Conservatory',
    dimensions: '4m x 3m',
    description:
      'Conservatory - 4m x 3m. 4m north wall (glazed). 3m east wall (glazed). 4m south wall with double doors centred. 3m west wall connecting to house with door on left. 2x double sockets on west wall. 1-way switch near house door. 2x ceiling lights evenly spaced. Smoke detector on ceiling.',
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    dimensions: '4m x 3.5m',
    description:
      'Dining room - 4m x 3.5m. 4m north wall with window centred. 3.5m east wall with door on right. 4m south wall with 2x double sockets evenly spaced. 3.5m west wall with 1x double socket. 2-way switches near door and far wall. Pendant light in centre of ceiling. Dimmer switch near door. Smoke detector on ceiling.',
  },
];

const ROOM_SYMBOL_PACKS: Record<string, { symbolId: string; name: string }[]> = {
  kitchen: [
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-cooker-45a', name: 'Cooker 45A' },
    { symbolId: 'socket-fused-spur', name: 'Fused Spur (Dishwasher)' },
    { symbolId: 'socket-fused-spur', name: 'Fused Spur (Washing Machine)' },
    { symbolId: 'socket-switched-fused-spur', name: 'Switched Fused Spur (Boiler)' },
    { symbolId: 'socket-switched-fused-spur', name: 'Switched Fused Spur (Extractor)' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'light-downlight', name: 'Downlight (over worktop)' },
    { symbolId: 'switch-1way', name: '1-Way Switch' },
    { symbolId: 'extractor-fan', name: 'Extractor Fan' },
    { symbolId: 'smoke-detector', name: 'Heat Detector' },
  ],
  bedroom: [
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'switch-2way', name: '2-Way Switch (door)' },
    { symbolId: 'switch-2way', name: '2-Way Switch (bed)' },
    { symbolId: 'smoke-detector', name: 'Smoke Detector' },
    { symbolId: 'socket-tv-aerial', name: 'TV Aerial' },
    { symbolId: 'socket-usb', name: 'USB Socket (bedside)' },
  ],
  bathroom: [
    { symbolId: 'light-downlight', name: 'Downlight' },
    { symbolId: 'light-downlight', name: 'Downlight' },
    { symbolId: 'light-downlight', name: 'Downlight' },
    { symbolId: 'light-downlight', name: 'Downlight' },
    { symbolId: 'switch-pull-cord', name: 'Pull Cord' },
    { symbolId: 'socket-shaver', name: 'Shaver Socket' },
    { symbolId: 'extractor-fan', name: 'Extractor Fan' },
    { symbolId: 'socket-switched-fused-spur', name: 'Switched Fused Spur (Towel Rail)' },
  ],
  living: [
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'switch-dimmer', name: 'Dimmer Switch' },
    { symbolId: 'socket-tv-aerial', name: 'TV Aerial' },
    { symbolId: 'socket-data', name: 'Data Socket' },
    { symbolId: 'socket-telephone', name: 'Telephone Socket' },
    { symbolId: 'smoke-detector', name: 'Smoke Detector' },
  ],
  hallway: [
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'switch-2way', name: '2-Way Switch' },
    { symbolId: 'switch-2way', name: '2-Way Switch' },
    { symbolId: 'smoke-detector', name: 'Smoke Detector' },
    { symbolId: 'co-detector', name: 'CO Detector' },
    { symbolId: 'consumer-unit', name: 'Consumer Unit' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
  ],
  garage: [
    { symbolId: 'light-fluorescent', name: 'Fluorescent' },
    { symbolId: 'light-fluorescent', name: 'Fluorescent' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-outdoor', name: 'Outdoor IP66' },
    { symbolId: 'switch-1way', name: '1-Way Switch' },
    { symbolId: 'consumer-unit', name: 'Consumer Unit' },
    { symbolId: 'smoke-detector', name: 'Smoke Detector' },
    { symbolId: 'socket-switched-fused-spur', name: 'Switched Fused Spur (Freezer)' },
  ],
  utility: [
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-fused-spur', name: 'Fused Spur (Washing Machine)' },
    { symbolId: 'socket-fused-spur', name: 'Fused Spur (Tumble Dryer)' },
    { symbolId: 'socket-switched-fused-spur', name: 'Switched Fused Spur (Boiler)' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light' },
    { symbolId: 'switch-1way', name: '1-Way Switch' },
    { symbolId: 'extractor-fan', name: 'Extractor Fan' },
    { symbolId: 'smoke-detector', name: 'Heat Detector' },
  ],
  dining: [
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'socket-double-13a', name: 'Double Socket' },
    { symbolId: 'light-ceiling', name: 'Ceiling Light (pendant)' },
    { symbolId: 'switch-dimmer', name: 'Dimmer Switch' },
    { symbolId: 'socket-floor', name: 'Floor Socket (table)' },
    { symbolId: 'smoke-detector', name: 'Smoke Detector' },
  ],
};

const modeTitle: Record<Mode, string> = {
  hub: 'AI Tools',
  templates: 'Room Templates',
  describe: 'Describe Room',
  review: 'Compliance Review',
  autoplace: 'Auto-Place Symbols',
  suggestions: 'Smart Suggestions',
  spec: 'Specification Writer',
  quote: 'Quote Generator',
  photo: 'Photo to Plan',
};

const modeSubtitle: Record<Mode, string> = {
  hub: 'Choose a tool to get started',
  templates: 'Choose a room type to generate',
  describe: 'Tell us about the room in your own words',
  review: 'Check your drawing against BS 7671',
  autoplace: 'Quick-add typical symbols for a room type',
  suggestions: 'AI finds what\'s missing or could be better',
  spec: 'AI generates professional electrical specification',
  quote: 'Price the job from your floor plan',
  photo: 'Take a photo and AI generates the floor plan',
};

interface AIRoomBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomGenerated: (roomData: any) => void;
  canvasObjects?: CanvasObject[];
  savedRooms?: import('@/hooks/useFloorPlanRooms').SavedRoom[];
  onSymbolsAutoPlaced?: (symbols: CanvasObject[]) => void;
}

export const AIRoomBuilderDialog = ({
  open,
  onOpenChange,
  onRoomGenerated,
  canvasObjects,
  savedRooms,
  onSymbolsAutoPlaced,
}: AIRoomBuilderDialogProps) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<Mode>('hub');
  const [isListening, setIsListening] = useState(false);
  const [reviewResults, setReviewResults] = useState<{ type: 'warning' | 'info' | 'pass'; message: string }[] | null>(null);
  const [selectedAutoPlaceRoom, setSelectedAutoPlaceRoom] = useState<string | null>(null);
  const [suggestionsResult, setSuggestionsResult] = useState<any>(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [specResult, setSpecResult] = useState<any>(null);
  const [specLoading, setSpecLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoGenerating, setPhotoGenerating] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const haptic = useHaptic();
  const toastIdRef = useRef<string | number | null>(null);

  // Speech-to-text hook (same as site visit voice capture)
  const speech = useSpeechToText({
    continuous: true,
    interimResults: true,
    lang: 'en-GB',
    onFinalChunk: (chunk) => {
      // Append to description as speech is captured
      setDescription((prev) => (prev ? prev + ' ' + chunk : chunk));
    },
  });

  // Reset to hub when dialog opens/closes
  useEffect(() => {
    if (open) {
      setMode('hub');
      setReviewResults(null);
      setSuggestionsResult(null);
      setSpecResult(null);
      setQuoteResult(null);
      setSelectedAutoPlaceRoom(null);
      setPhotoPreview(null);
      setPhotoGenerating(false);
    } else {
      // Clean up speech when dialog closes
      if (speech.isListening) speech.stopListening();
      speech.resetTranscript();
    }
  }, [open]);

  const dismissLoadingToast = () => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  const generateRoom = async (roomDescription: string, roomName: string) => {
    setIsGenerating(true);
    haptic.light();
    toastIdRef.current = toast.loading(`Generating ${roomName}...`);

    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { description: roomDescription },
      });

      dismissLoadingToast();

      if (error) throw error;

      if (data.success) {
        haptic.success();
        toast.success(`${roomName} generated`);
        onRoomGenerated(data.roomData);
        onOpenChange(false);
      } else {
        throw new Error(data.error || 'Failed to generate room');
      }
    } catch (error) {
      dismissLoadingToast();
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate room');
    } finally {
      setIsGenerating(false);
    }
  };

  // Voice input now handled by useSpeechToText hook

  // Combine current canvas symbols + all saved rooms' symbols for full analysis
  const getAllSymbolIds = (): string[] => {
    const canvasSymbols = (canvasObjects || [])
      .filter(o => o.type === 'symbol' && o.symbolId)
      .map(o => o.symbolId!);
    const savedSymbols = (savedRooms || []).flatMap(r => r.symbolIds || []);
    return [...canvasSymbols, ...savedSymbols];
  };

  const getAllSymbolCounts = () => {
    const allIds = getAllSymbolIds();
    const counts = new Map<string, { id: string; name: string; count: number }>();
    allIds.forEach(id => {
      const existing = counts.get(id);
      if (existing) existing.count++;
      else {
        const sym = symbolRegistry.find(s => s.id === id);
        counts.set(id, { id, name: sym?.name || id, count: 1 });
      }
    });
    return Array.from(counts.values());
  };

  const getRoomNames = (): string[] => {
    return (savedRooms || []).map(r => r.name);
  };

  // --- Review (client-side) ---
  const reviewFloorPlan = () => {
    const symbolIds = getAllSymbolIds();
    const symbols = symbolIds.map(id => ({ symbolId: id, type: 'symbol' as const }));
    const items: { type: 'warning' | 'info' | 'pass'; message: string }[] = [];

    if (symbols.length === 0) {
      items.push({ type: 'warning', message: 'No symbols placed — add electrical symbols first' });
      setReviewResults(items);
      return;
    }

    const has = (pattern: string) => symbolIds.some(id => id.includes(pattern));
    const count = (pattern: string) => symbolIds.filter(id => id.includes(pattern)).length;

    // Smoke/CO
    if (!has('smoke')) items.push({ type: 'warning', message: 'No smoke detector — Building Regs Part B requires detection in habitable rooms and escape routes' });
    else items.push({ type: 'pass', message: `Smoke detector present (×${count('smoke')})` });

    // Lights + switches
    if (count('light-') > 0 && count('switch-') === 0) items.push({ type: 'warning', message: 'Lights without switches — add switches to control the lighting' });
    if (count('light-') > 12) items.push({ type: 'info', message: `${count('light-')} lighting points — consider splitting into two circuits (L1 + L2)` });

    // Sockets
    const socketCount = count('socket-') - count('fused') - count('shaver');
    if (socketCount > 10) items.push({ type: 'info', message: `${socketCount} sockets — consider splitting across two ring finals` });

    // Bathroom checks
    if (has('shaver') || has('pull-cord')) {
      if (has('switch-1way') || has('switch-2way') || has('switch-dimmer')) {
        items.push({ type: 'warning', message: 'Bathroom detected with plate switches — BS 7671 Section 701 requires pull-cord or switches outside the room' });
      }
      if (!has('extractor')) items.push({ type: 'info', message: 'Bathroom without extractor fan — Building Regs Part F requires mechanical ventilation' });
    }

    // Cooker
    if (has('cooker')) items.push({ type: 'pass', message: 'Cooker circuit identified — dedicated 32A/45A circuit' });

    // EV
    if (has('ev-charger')) items.push({ type: 'pass', message: 'EV charger — dedicated circuit with Type B RCBO recommended' });

    // CO
    if (has('co-detector')) items.push({ type: 'pass', message: 'CO detector present' });
    else items.push({ type: 'info', message: 'No CO detector — required where combustion appliances are present' });

    // SPD
    if (!has('spd')) items.push({ type: 'info', message: 'No SPD specified — now required for most new installations per BS 7671 AMD2' });

    if (items.filter(i => i.type === 'warning').length === 0) {
      items.unshift({ type: 'pass', message: 'No critical issues found' });
    }

    setReviewResults(items);
  };

  // --- Build symbol summary from canvas ---
  const buildSymbolSummary = () => {
    const symbolCounts = new Map<string, { id: string; name: string; count: number }>();
    getAllSymbolIds().forEach(id => {
      const existing = symbolCounts.get(id);
      if (existing) existing.count++;
      else {
        const sym = symbolRegistry.find(s => s.id === id);
        symbolCounts.set(id, { id, name: sym?.name || id, count: 1 });
      }
    });
    return Array.from(symbolCounts.values());
  };

  // --- Suggestions (API) ---
  const runSuggestions = async () => {
    const symbols = buildSymbolSummary();
    if (symbols.length === 0) {
      toast.error('No symbols on the canvas — add some symbols first');
      return;
    }
    setSuggestionsLoading(true);
    setSuggestionsResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('floor-plan-ai-suggestions', {
        body: { room_name: 'Floor Plan', symbols, room_type: 'general' },
      });
      if (error) throw error;
      setSuggestionsResult(data);
      haptic.success();
    } catch (error) {
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to get suggestions');
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // --- Spec (API) ---
  const runSpec = async () => {
    const symbols = buildSymbolSummary();
    if (symbols.length === 0) {
      toast.error('No symbols on the canvas — add some symbols first');
      return;
    }
    setSpecLoading(true);
    setSpecResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('floor-plan-ai-spec', {
        body: { room_name: 'Floor Plan', symbols, room_type: 'general' },
      });
      if (error) throw error;
      setSpecResult(data);
      haptic.success();
    } catch (error) {
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate specification');
    } finally {
      setSpecLoading(false);
    }
  };

  // --- Quote (API) ---
  const runQuote = async () => {
    const symbols = buildSymbolSummary();
    if (symbols.length === 0) {
      toast.error('No symbols on the canvas — add some symbols first');
      return;
    }
    setQuoteLoading(true);
    setQuoteResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('floor-plan-ai-quote', {
        body: { room_name: 'Floor Plan', symbols, room_type: 'general' },
      });
      if (error) throw error;
      setQuoteResult(data);
      haptic.success();
    } catch (error) {
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate quote');
    } finally {
      setQuoteLoading(false);
    }
  };

  // --- Photo to Plan ---
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoGenerate = async () => {
    if (!photoPreview) return;
    setPhotoGenerating(true);
    haptic.light();

    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { image_base64: photoPreview },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to analyse photo');

      onRoomGenerated(data.roomData || data);
      haptic.success();
      toast.success('Room generated from photo');
      setPhotoPreview(null);
      onOpenChange(false);
    } catch (error) {
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate from photo');
    } finally {
      setPhotoGenerating(false);
    }
  };

  // --- Auto-place symbols (inside room walls if present) ---
  const handleAutoPlace = (roomType: string) => {
    const pack = ROOM_SYMBOL_PACKS[roomType];
    if (!pack || !onSymbolsAutoPlaced) return;

    // Detect room wall bounding box from canvasObjects
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const walls = (canvasObjects || []).filter((o) => o.type === 'wall');
    for (const w of walls) {
      if (w.points) {
        for (const p of w.points) {
          minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
          maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
        }
      }
    }

    // If walls found, place inside them with padding; otherwise use default area
    const hasRoom = isFinite(minX);
    const pad = 30;
    const areaX = hasRoom ? minX + pad : 80;
    const areaY = hasRoom ? minY + pad : 80;
    const areaW = hasRoom ? (maxX - minX) - pad * 2 : 300;
    const areaH = hasRoom ? (maxY - minY) - pad * 2 : 300;

    const cols = Math.min(pack.length, Math.max(3, Math.floor(areaW / 55)));
    const spacingX = Math.min(55, areaW / cols);
    const spacingY = Math.min(55, areaH / Math.ceil(pack.length / cols));

    const newObjects: CanvasObject[] = pack.map((item, idx) => ({
      id: `auto-${roomType}-${idx}-${Date.now()}`,
      type: 'symbol' as const,
      x: areaX + (idx % cols) * spacingX,
      y: areaY + Math.floor(idx / cols) * spacingY,
      symbolId: item.symbolId,
      rotation: 0,
    }));

    onSymbolsAutoPlaced(newObjects);
    haptic.success();
    toast.success(`${pack.length} symbols added — drag them into position`);
    onOpenChange(false);
  };

  const hubToolsQuickStart = [
    { id: 'templates' as Mode, icon: LayoutGrid, title: 'Room Templates', desc: 'Pick a room type, adjust dimensions', color: 'bg-elec-yellow/10 text-elec-yellow' },
    { id: 'describe' as Mode, icon: Mic, title: 'Describe Room', desc: 'Tell us about it — we draw it', color: 'bg-blue-500/10 text-blue-400' },
    { id: 'photo' as Mode, icon: Camera, title: 'Photo to Plan', desc: 'Snap a photo, AI generates the plan', color: 'bg-pink-500/10 text-pink-400' },
  ];
  const hubToolsDesign = [
    { id: 'autoplace' as Mode, icon: Zap, title: 'Auto-Place Symbols', desc: 'Quick-add sockets, lights, switches', color: 'bg-green-500/10 text-green-400' },
    { id: 'review' as Mode, icon: Shield, title: 'Compliance Check', desc: 'Verify against BS 7671 regulations', color: 'bg-orange-500/10 text-orange-400' },
    { id: 'suggestions' as Mode, icon: Lightbulb, title: 'Smart Suggestions', desc: 'Find missing sockets, lights, or safety items', color: 'bg-purple-500/10 text-purple-400' },
  ];
  const hubToolsOutput = [
    { id: 'spec' as Mode, icon: FileText, title: 'Write Specification', desc: 'Generate a client spec sheet', color: 'bg-cyan-500/10 text-cyan-400' },
    { id: 'quote' as Mode, icon: PoundSterling, title: 'Price This Job', desc: 'Labour + materials cost estimate', color: 'bg-emerald-500/10 text-emerald-400' },
  ];

  const reviewItemIcon = (type: 'warning' | 'info' | 'pass') => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />;
      case 'info': return <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />;
      case 'pass': return <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />;
    }
  };

  const reviewItemBg = (type: 'warning' | 'info' | 'pass') => {
    switch (type) {
      case 'warning': return 'bg-orange-500/10 border-orange-500/20';
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
      case 'pass': return 'bg-green-500/10 border-green-500/20';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              {mode !== 'hub' && (
                <button
                  onClick={() => {
                    setMode('hub');
                    setReviewResults(null);
                    setSuggestionsResult(null);
                    setSpecResult(null);
                    setQuoteResult(null);
                    setSelectedAutoPlaceRoom(null);
                  }}
                  className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </button>
              )}
              <div>
                <h2 className="text-base font-semibold text-white">{modeTitle[mode]}</h2>
                <p className="text-xs text-white">{modeSubtitle[mode]}</p>
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* ==================== HUB ==================== */}
            {mode === 'hub' && (
              <div className="p-4 space-y-4">
                {[
                  { label: 'Quick Start', tools: hubToolsQuickStart },
                  { label: 'Design Tools', tools: hubToolsDesign },
                  { label: 'Output', tools: hubToolsOutput },
                ].map((section) => (
                  <div key={section.label}>
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-2">{section.label}</p>
                    <div className="space-y-2">
                      {section.tools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => setMode(tool.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                        >
                          <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center shrink-0', tool.color)}>
                            <tool.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-white">{tool.title}</p>
                            <p className="text-xs text-white">{tool.desc}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==================== TEMPLATES ==================== */}
            {mode === 'templates' && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => generateRoom(template.description, template.name)}
                      disabled={isGenerating}
                      className={cn(
                        'relative overflow-hidden text-left p-3.5 rounded-xl',
                        'bg-white/[0.04] border border-white/[0.08]',
                        'hover:bg-white/[0.08] hover:border-elec-yellow/30',
                        'active:scale-[0.97] transition-all duration-150 touch-manipulation',
                        isGenerating && 'opacity-50 pointer-events-none'
                      )}
                    >
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/40 to-amber-400/40" />
                      <p className="text-sm font-semibold text-white">{template.name}</p>
                      <p className="text-[11px] text-white mt-0.5">{template.dimensions}</p>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== DESCRIBE ==================== */}
            {mode === 'describe' && (
              <div className="p-4 space-y-4">
                {/* Voice recording area */}
                <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-white">
                      {speech.isListening ? 'Listening...' : 'Tap the microphone to speak'}
                    </p>
                    {speech.isListening && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-red-400 font-medium">Recording</span>
                      </div>
                    )}
                  </div>

                  {/* Big mic button */}
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => {
                        if (speech.isListening) {
                          speech.stopListening();
                          haptic.light();
                        } else {
                          speech.resetTranscript();
                          speech.startListening();
                          haptic.medium();
                        }
                      }}
                      disabled={isGenerating}
                      className={cn(
                        'h-16 w-16 rounded-full flex items-center justify-center touch-manipulation transition-all active:scale-90',
                        speech.isListening
                          ? 'bg-red-500 shadow-lg shadow-red-500/30'
                          : 'bg-elec-yellow shadow-lg shadow-elec-yellow/20'
                      )}
                    >
                      <Mic className={cn('h-7 w-7', speech.isListening ? 'text-white' : 'text-black')} />
                    </button>
                  </div>

                  {/* Live transcript */}
                  {(speech.transcript || speech.interimTranscript) && (
                    <div className="bg-white/[0.04] rounded-lg p-3 min-h-[60px]">
                      <p className="text-sm text-white">
                        {speech.transcript}
                        {speech.interimTranscript && (
                          <span className="text-white/50"> {speech.interimTranscript}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Text input as fallback */}
                <Textarea
                  placeholder="Or type your room description here..."
                  value={description || speech.transcript}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] bg-white/[0.04] border-white/10 text-white placeholder:text-white/50 text-sm touch-manipulation focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
                  disabled={isGenerating}
                />

                <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs font-medium text-white mb-2">Tips</p>
                  <ul className="text-[11px] text-white space-y-1">
                    <li>Say the room type and size: "Kitchen, 4 by 3 metres"</li>
                    <li>Describe walls: "Window on the north wall, door on the east"</li>
                    <li>List what you need: "6 double sockets, cooker point, ceiling light"</li>
                  </ul>
                </div>

                <Button
                  onClick={() => generateRoom((description || speech.transcript).trim(), 'Room')}
                  disabled={isGenerating || !(description || speech.transcript).trim()}
                  className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm touch-manipulation"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Floor Plan
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* ==================== REVIEW ==================== */}
            {mode === 'review' && (
              <div className="p-4 space-y-4">
                {!reviewResults ? (
                  <>
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                      <Shield className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">Compliance Review</p>
                      <p className="text-xs text-white">
                        Checks your placed symbols against BS 7671, Building Regs Part B/F, and common installation standards.
                      </p>
                    </div>
                    <Button
                      onClick={() => { haptic.light(); reviewFloorPlan(); }}
                      className="w-full h-12 bg-orange-500 text-white hover:bg-orange-600 font-semibold text-sm touch-manipulation"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Run Compliance Check
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      {reviewResults.map((item, idx) => (
                        <div key={idx} className={cn('flex items-start gap-3 p-3 rounded-xl border', reviewItemBg(item.type))}>
                          {reviewItemIcon(item.type)}
                          <p className="text-sm text-white">{item.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => { setReviewResults(null); reviewFloorPlan(); }}
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation border-white/10 text-white hover:bg-white/10"
                      >
                        Re-check
                      </Button>
                      <Button
                        onClick={() => setMode('hub')}
                        className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                      >
                        Done
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ==================== AUTO-PLACE ==================== */}
            {mode === 'autoplace' && (
              <div className="p-4 space-y-3">
                <p className="text-xs text-white mb-2">Select a room type to auto-place its typical symbols onto the canvas.</p>
                {Object.entries(ROOM_SYMBOL_PACKS).map(([roomType, pack]) => (
                  <div key={roomType}>
                    <button
                      onClick={() => setSelectedAutoPlaceRoom(selectedAutoPlaceRoom === roomType ? null : roomType)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-green-500/10 text-green-400">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-white capitalize">{roomType}</p>
                          <p className="text-xs text-white">{pack.length} symbols</p>
                        </div>
                      </div>
                      <ChevronRight className={cn('h-4 w-4 text-white shrink-0 transition-transform', selectedAutoPlaceRoom === roomType && 'rotate-90')} />
                    </button>
                    {selectedAutoPlaceRoom === roomType && (
                      <div className="mt-2 ml-4 space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {pack.map((item, idx) => (
                            <span key={idx} className="text-[11px] text-white bg-white/[0.06] px-2 py-1 rounded-lg">
                              {item.name}
                            </span>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleAutoPlace(roomType)}
                          disabled={!onSymbolsAutoPlaced}
                          className="w-full h-11 bg-green-600 text-white hover:bg-green-700 font-semibold text-sm touch-manipulation"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Place {pack.length} Symbols
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ==================== SUGGESTIONS ==================== */}
            {mode === 'suggestions' && (
              <div className="p-4 space-y-4">
                {!suggestionsResult && !suggestionsLoading && (
                  <>
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                      <Lightbulb className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">Smart Suggestions</p>
                      <p className="text-xs text-white">
                        AI analyses your floor plan and suggests missing items, compliance issues, and improvements.
                      </p>
                    </div>
                    <Button
                      onClick={() => { haptic.light(); runSuggestions(); }}
                      className="w-full h-12 bg-purple-600 text-white hover:bg-purple-700 font-semibold text-sm touch-manipulation"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Analyse Floor Plan
                    </Button>
                  </>
                )}
                {suggestionsLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-purple-400 animate-spin mb-3" />
                    <p className="text-sm font-medium text-white">Analysing your floor plan...</p>
                    <p className="text-xs text-white mt-1">This may take a few seconds</p>
                  </div>
                )}
                {suggestionsResult && (
                  <>
                    <div className="space-y-3">
                      {suggestionsResult.summary && (
                        <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                          <p className="text-sm font-semibold text-white">{suggestionsResult.summary}</p>
                        </div>
                      )}
                      {suggestionsResult.missing?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-orange-400 uppercase mb-1.5">Missing Items</p>
                          {suggestionsResult.missing.map((item: any, idx: number) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-1.5">
                              <p className="text-sm font-medium text-white">{item.name || item.symbol}</p>
                              <p className="text-xs text-white mt-0.5">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {suggestionsResult.compliance?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-400 uppercase mb-1.5">Compliance Issues</p>
                          {suggestionsResult.compliance.map((item: any, idx: number) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 mb-1.5">
                              <p className="text-sm font-medium text-white">{item.issue}</p>
                              <p className="text-xs text-white mt-0.5">{item.regulation} — {item.severity}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {suggestionsResult.improvements?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-blue-400 uppercase mb-1.5">Improvements</p>
                          {suggestionsResult.improvements.map((item: any, idx: number) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-1.5">
                              <p className="text-sm font-medium text-white">{item.suggestion}</p>
                              <p className="text-xs text-white mt-0.5">{item.benefit}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => { setSuggestionsResult(null); runSuggestions(); }}
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation border-white/10 text-white hover:bg-white/10"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={() => setMode('hub')}
                        className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                      >
                        Done
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ==================== SPEC ==================== */}
            {mode === 'spec' && (
              <div className="p-4 space-y-4">
                {!specResult && !specLoading && (
                  <>
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                      <FileText className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">Specification Writer</p>
                      <p className="text-xs text-white">
                        Generates a professional electrical specification from your floor plan symbols.
                      </p>
                    </div>
                    <Button
                      onClick={() => { haptic.light(); runSpec(); }}
                      className="w-full h-12 bg-cyan-600 text-white hover:bg-cyan-700 font-semibold text-sm touch-manipulation"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Specification
                    </Button>
                  </>
                )}
                {specLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-3" />
                    <p className="text-sm font-medium text-white">Writing specification...</p>
                    <p className="text-xs text-white mt-1">This may take a few seconds</p>
                  </div>
                )}
                {specResult && (
                  <>
                    <div className="space-y-3">
                      {specResult.title && (
                        <p className="text-sm font-bold text-cyan-400">{specResult.title}</p>
                      )}
                      {specResult.items?.length > 0 && (
                        <div className="space-y-2">
                          {specResult.items.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                              <p className="text-sm text-white font-semibold mb-1">{item.number || idx + 1}. {item.description}</p>
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                {item.circuit && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{item.circuit}</span>}
                                {item.cable && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{item.cable}</span>}
                                {item.protection && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{item.protection}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {specResult.generalNotes && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <p className="text-xs font-semibold text-cyan-400 uppercase mb-1">General Notes</p>
                          <p className="text-sm text-white">{specResult.generalNotes}</p>
                        </div>
                      )}
                      {specResult.regulations?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {specResult.regulations.map((reg: string, idx: number) => (
                            <span key={idx} className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400">{reg}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => { setSpecResult(null); runSpec(); }}
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation border-white/10 text-white hover:bg-white/10"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={() => setMode('hub')}
                        className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                      >
                        Done
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ==================== QUOTE ==================== */}
            {mode === 'quote' && (
              <div className="p-4 space-y-4">
                {!quoteResult && !quoteLoading && (
                  <>
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                      <PoundSterling className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">Quote Generator</p>
                      <p className="text-xs text-white">
                        Generates a quote breakdown with materials, labour, and total from your floor plan.
                      </p>
                    </div>
                    <Button
                      onClick={() => { haptic.light(); runQuote(); }}
                      className="w-full h-12 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-sm touch-manipulation"
                    >
                      <PoundSterling className="h-4 w-4 mr-2" />
                      Generate Quote
                    </Button>
                  </>
                )}
                {quoteLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mb-3" />
                    <p className="text-sm font-medium text-white">Generating quote...</p>
                    <p className="text-xs text-white mt-1">This may take a few seconds</p>
                  </div>
                )}
                {quoteResult && (
                  <>
                    {quoteResult.materials ? (
                      <div className="space-y-3">
                        {quoteResult.quoteRef && (
                          <p className="text-xs text-white font-medium">Ref: {quoteResult.quoteRef}</p>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-white mb-2">Materials</p>
                          <div className="space-y-1.5">
                            {(Array.isArray(quoteResult.materials) ? quoteResult.materials : []).map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <div className="flex-1 mr-2">
                                  <p className="text-sm text-white">{item.item || item.name}</p>
                                  {item.qty && <p className="text-xs text-white">Qty: {item.qty}</p>}
                                </div>
                                <p className="text-sm font-semibold text-emerald-400 shrink-0">
                                  {item.total != null ? `£${Number(item.total).toFixed(2)}` : ''}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {quoteResult.materialsSubtotal != null && (
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <p className="text-xs text-white">Materials subtotal</p>
                            <p className="text-sm font-semibold text-white">£{Number(quoteResult.materialsSubtotal).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.labour && (
                          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div>
                              <p className="text-sm font-semibold text-white">Labour</p>
                              {quoteResult.labour.hours && <p className="text-xs text-white">{quoteResult.labour.hours}hrs @ £{quoteResult.labour.rate}/hr</p>}
                            </div>
                            <p className="text-sm font-semibold text-white">£{Number(quoteResult.labour.total || 0).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.sundries && (
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <p className="text-xs text-white">{quoteResult.sundries.description || 'Sundries'}</p>
                            <p className="text-sm text-white">£{Number(quoteResult.sundries.total || 0).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.certification && (
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <p className="text-xs text-white">{quoteResult.certification.description || 'Certification'}</p>
                            <p className="text-sm text-white">£{Number(quoteResult.certification.total || 0).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.subtotalExVat != null && (
                          <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/10">
                            <p className="text-sm text-white">Subtotal (ex VAT)</p>
                            <p className="text-sm font-semibold text-white">£{Number(quoteResult.subtotalExVat).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.vat != null && (
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <p className="text-xs text-white">VAT (20%)</p>
                            <p className="text-sm text-white">£{Number(quoteResult.vat).toFixed(2)}</p>
                          </div>
                        )}
                        {(quoteResult.totalIncVat != null || quoteResult.total != null) && (
                          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                            <p className="text-base font-bold text-white">Total (inc VAT)</p>
                            <p className="text-base font-bold text-emerald-400">£{Number(quoteResult.totalIncVat || quoteResult.total).toFixed(2)}</p>
                          </div>
                        )}
                        {quoteResult.estimatedDuration && (
                          <p className="text-xs text-white">Estimated duration: {quoteResult.estimatedDuration}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <p className="text-sm text-white whitespace-pre-wrap">{typeof quoteResult === 'string' ? quoteResult : JSON.stringify(quoteResult, null, 2)}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => { setQuoteResult(null); runQuote(); }}
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation border-white/10 text-white hover:bg-white/10"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={() => setMode('hub')}
                        className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                      >
                        Done
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            {/* ==================== PHOTO TO PLAN ==================== */}
            {mode === 'photo' && (
              <div className="p-4 space-y-4">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />

                {!photoPreview && !photoGenerating && (
                  <>
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-center">
                      <Camera className="h-10 w-10 text-pink-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">Photo to Floor Plan</p>
                      <p className="text-xs text-white">
                        Take a photo of a room and AI will estimate dimensions and suggest an electrical layout.
                      </p>
                    </div>
                    <Button
                      onClick={() => photoInputRef.current?.click()}
                      className="w-full h-12 bg-pink-600 text-white hover:bg-pink-700 font-semibold text-sm touch-manipulation"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </>
                )}

                {photoPreview && !photoGenerating && (
                  <>
                    <div className="rounded-xl overflow-hidden border border-white/10">
                      <img src={photoPreview} alt="Room photo" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => { setPhotoPreview(null); photoInputRef.current?.click(); }}
                        variant="outline"
                        className="flex-1 h-11 border-white/10 text-white hover:bg-white/10 touch-manipulation"
                      >
                        Retake
                      </Button>
                      <Button
                        onClick={handlePhotoGenerate}
                        className="flex-1 h-11 bg-pink-600 text-white hover:bg-pink-700 font-semibold touch-manipulation"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Plan
                      </Button>
                    </div>
                  </>
                )}

                {photoGenerating && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-pink-400 animate-spin mb-3" />
                    <p className="text-sm font-medium text-white">Analysing photo...</p>
                    <p className="text-xs text-white mt-1">AI is estimating dimensions and electrical layout</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Loading overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-3" />
              <p className="text-sm font-medium text-white">Generating floor plan...</p>
              <p className="text-xs text-white mt-1">This takes a few seconds</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
