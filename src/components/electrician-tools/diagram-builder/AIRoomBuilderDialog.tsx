import { useState, useRef, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Loader2, ArrowLeft, Mic, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { cn } from '@/lib/utils';
import { HubQuickStart, HubToolGrid } from '@/components/hub/HubPrimitives';
import { RoomScheduleForm } from './RoomScheduleForm';
import { planFromSchedule, ROOM_PRESETS } from './roomSchedule';
import { scheduleFromObjects } from './circuitDesign';
import { cableTakeOff, runLengths } from './wiring';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';
import { compressImageForUpload, validateImageSize } from '@/utils/imageUploadUtils';
import { nativePickPhoto } from '@/utils/pickPhotos';
import { preparePlan, unsupportedPlanReason, type PlanPageImage } from '@/utils/planImage';
import {
  generatePlan,
  EMPTY_PROGRESS,
  type PlanProgress,
  type PlanProgressState,
} from './generatePlan';
import { PlanProgressPanel } from './PlanProgressPanel';
import { buildUnderlays, snapRoomsToLines, type ReaderUnderlay } from './underlay';
import {
  PrimaryAction,
  ResultActions,
  ResultRow,
  ResultSection,
  ToolIntro,
  ToolLoading,
  TotalLine,
} from './aiToolUi';
import { formatCurrency } from '@/lib/format';

/** The house £ formatter, tolerant of the strings and nulls the tools return. */
const gbp = (n: unknown) => formatCurrency(Number(n) || 0);
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';

/**
 * Fallback only: used when a photo cannot be decoded by `preparePlan`
 * (a HEIC on a desktop browser, say). 1 MB keeps the call short on iOS.
 */
const PLAN_PHOTO_TARGET_KB = 1024;

type Mode =
  | 'hub'
  | 'templates'
  | 'schedule'
  | 'describe'
  | 'review'
  | 'autoplace'
  | 'suggestions'
  | 'spec'
  | 'quote'
  | 'photo';

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
  hub: 'AI tools',
  templates: 'Room templates',
  schedule: 'Room by room',
  describe: 'Describe it',
  review: 'Compliance review',
  autoplace: 'Auto-place symbols',
  suggestions: 'Smart suggestions',
  spec: 'Specification writer',
  quote: 'Quote generator',
  photo: 'Plan to floor plan',
};

const modeSubtitle: Record<Mode, string> = {
  hub: 'Choose a tool to get started',
  templates: 'Choose a room type to generate',
  schedule: 'Each room, its size and what goes in it',
  describe: 'One room or the whole property, in your own words',
  review: 'Check your drawing against BS 7671',
  autoplace: 'Quick-add typical symbols for a room type',
  suggestions: "AI finds what's missing or could be better",
  spec: 'AI generates professional electrical specification',
  quote: 'Price the job from your floor plan',
  photo: 'A PDF, screenshot or photo — every room on every floor',
};

interface AIRoomBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomGenerated: (roomData: any) => void;
  canvasObjects?: CanvasObject[];
  savedRooms?: import('@/hooks/useFloorPlanRooms').SavedRoom[];
  onSymbolsAutoPlaced?: (symbols: CanvasObject[]) => void;
  /**
   * A plan dropped or pasted onto the planner page itself. The dialog opens
   * straight into Plan to Floor Plan with it loaded — drop it and it goes.
   */
  initialPlanFile?: File | null;
  onInitialPlanFileConsumed?: () => void;
}

export const AIRoomBuilderDialog = ({
  open,
  onOpenChange,
  onRoomGenerated,
  canvasObjects,
  savedRooms,
  onSymbolsAutoPlaced,
  initialPlanFile,
  onInitialPlanFileConsumed,
}: AIRoomBuilderDialogProps) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<Mode>('hub');
  const [isListening, setIsListening] = useState(false);
  const [reviewResults, setReviewResults] = useState<
    { type: 'warning' | 'info' | 'pass'; message: string }[] | null
  >(null);
  const [selectedAutoPlaceRoom, setSelectedAutoPlaceRoom] = useState<string | null>(null);
  const [suggestionsResult, setSuggestionsResult] = useState<any>(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [specResult, setSpecResult] = useState<any>(null);
  const [specLoading, setSpecLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  /** Every page to be read (one for an image), with its true size. */
  const [photoPages, setPhotoPages] = useState<PlanPageImage[]>([]);
  /** Where the plan came from, and how many pages the PDF had in total. */
  const [photoMeta, setPhotoMeta] = useState<{
    pageCount: number;
    source: 'pdf' | 'image';
    name?: string;
  } | null>(null);
  /** Anything the electrician wants on top of the drawing — "EV charger in the garage". */
  const [planNotes, setPlanNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const isNativeApp = Capacitor.isNativePlatform();
  const [photoPreparing, setPhotoPreparing] = useState(false);
  const [photoGenerating, setPhotoGenerating] = useState(false);
  /** Live progress from the reader — see PlanProgressPanel. */
  const [planProgress, setPlanProgress] = useState<PlanProgressState>(EMPTY_PROGRESS);
  const onPlanProgress = (p: PlanProgress) =>
    setPlanProgress((prev) =>
      p.stage === 'rooms'
        ? { ...prev, found: { rooms: p.rooms, floors: p.floors } }
        : p.stage === 'electrics'
          ? { ...prev, electrics: { done: p.done, total: p.total } }
          : prev
    );
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

  /*
   * Each read belongs to one opening of the sheet. Closing (or reopening) it
   * cancels the read in flight: a 45-second read finishing after the user had
   * swiped the sheet away used to replace whatever they had drawn since, and
   * close a sheet they had reopened.
   */
  const runRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const startRun = () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    return { run: ++runRef.current, signal: abortRef.current.signal };
  };

  // Reset to hub when dialog opens/closes
  useEffect(() => {
    runRef.current++;
    prepRef.current++; // a file still being prepared is for the old opening
    abortRef.current?.abort();
    abortRef.current = null;
    setIsGenerating(false);
    if (open) {
      setMode('hub');
      setReviewResults(null);
      setSuggestionsResult(null);
      setSpecResult(null);
      setQuoteResult(null);
      setSelectedAutoPlaceRoom(null);
      setPhotoPreview(null);
      setPhotoPages([]);
      setPhotoMeta(null);
      setPlanNotes('');
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
    setPlanProgress(EMPTY_PROGRESS);
    haptic.light();

    const { run, signal } = startRun();
    try {
      const roomData = await generatePlan({ description: roomDescription }, onPlanProgress, signal);
      if (run !== runRef.current) return; // the sheet was closed: drop it
      haptic.success();
      // The page announces the result (room count and a reminder to check it).
      onRoomGenerated(roomData);
      onOpenChange(false);
    } catch (error) {
      if (run !== runRef.current) return;
      dismissLoadingToast();
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate room');
    } finally {
      if (run === runRef.current) setIsGenerating(false);
    }
  };

  // Voice input now handled by useSpeechToText hook

  // Combine current canvas symbols + all saved rooms' symbols for full analysis
  const getAllSymbolIds = (): string[] => {
    const canvasSymbols = (canvasObjects || [])
      .filter((o) => o.type === 'symbol' && o.symbolId)
      .map((o) => o.symbolId!);
    const savedSymbols = (savedRooms || []).flatMap((r) => r.symbolIds || []);
    return [...canvasSymbols, ...savedSymbols];
  };

  const getAllSymbolCounts = () => {
    const allIds = getAllSymbolIds();
    const counts = new Map<string, { id: string; name: string; count: number }>();
    allIds.forEach((id) => {
      const existing = counts.get(id);
      if (existing) existing.count++;
      else {
        const sym = symbolRegistry.find((s) => s.id === id);
        counts.set(id, { id, name: sym?.name || id, count: 1 });
      }
    });
    return Array.from(counts.values());
  };

  const getRoomNames = (): string[] => {
    return (savedRooms || []).map((r) => r.name);
  };

  // --- Review (client-side) ---
  const reviewFloorPlan = () => {
    const symbolIds = getAllSymbolIds();
    const symbols = symbolIds.map((id) => ({ symbolId: id, type: 'symbol' as const }));
    const items: { type: 'warning' | 'info' | 'pass'; message: string }[] = [];

    if (symbols.length === 0) {
      items.push({ type: 'warning', message: 'No symbols placed — add electrical symbols first' });
      setReviewResults(items);
      return;
    }

    const has = (pattern: string) => symbolIds.some((id) => id.includes(pattern));
    const count = (pattern: string) => symbolIds.filter((id) => id.includes(pattern)).length;

    // Smoke/CO
    if (!has('smoke'))
      items.push({
        type: 'warning',
        message:
          'No smoke detector — Building Regs Part B requires detection in habitable rooms and escape routes',
      });
    else items.push({ type: 'pass', message: `Smoke detector present (×${count('smoke')})` });

    // Lights + switches
    if (count('light-') > 0 && count('switch-') === 0)
      items.push({
        type: 'warning',
        message: 'Lights without switches — add switches to control the lighting',
      });
    if (count('light-') > 12)
      items.push({
        type: 'info',
        message: `${count('light-')} lighting points — consider splitting into two circuits (L1 + L2)`,
      });

    // Sockets
    const socketCount = count('socket-') - count('fused') - count('shaver');
    if (socketCount > 10)
      items.push({
        type: 'info',
        message: `${socketCount} sockets — consider splitting across two ring finals`,
      });

    // Bathroom checks
    if (has('shaver') || has('pull-cord')) {
      if (has('switch-1way') || has('switch-2way') || has('switch-dimmer')) {
        items.push({
          type: 'warning',
          message:
            'Bathroom detected with plate switches — BS 7671 Section 701 requires pull-cord or switches outside the room',
        });
      }
      if (!has('extractor'))
        items.push({
          type: 'info',
          message:
            'Bathroom without extractor fan — Building Regs Part F requires mechanical ventilation',
        });
    }

    // Cooker
    if (has('cooker'))
      items.push({
        type: 'pass',
        message: 'Cooker circuit identified — dedicated 32A/45A circuit',
      });

    // EV
    if (has('ev-charger'))
      items.push({
        type: 'pass',
        message: 'EV charger — dedicated circuit with Type B RCBO recommended',
      });

    // CO
    if (has('co-detector')) items.push({ type: 'pass', message: 'CO detector present' });
    else
      items.push({
        type: 'info',
        message: 'No CO detector — required where combustion appliances are present',
      });

    // SPD
    if (!has('spd'))
      items.push({
        type: 'info',
        message: 'No SPD specified — now required for most new installations per BS 7671 AMD2',
      });

    if (items.filter((i) => i.type === 'warning').length === 0) {
      items.unshift({ type: 'pass', message: 'No critical issues found' });
    }

    setReviewResults(items);
  };

  // --- Build symbol summary from canvas ---
  const buildSymbolSummary = () => {
    const symbolCounts = new Map<string, { id: string; name: string; count: number }>();
    getAllSymbolIds().forEach((id) => {
      const existing = symbolCounts.get(id);
      if (existing) existing.count++;
      else {
        const sym = symbolRegistry.find((s) => s.id === id);
        symbolCounts.set(id, { id, name: sym?.name || id, count: 1 });
      }
    });
    return Array.from(symbolCounts.values());
  };

  // --- Suggestions (API) ---
  /*
   * The three analysis tools answer `{ success, data }`. The screens read their
   * fields straight off that wrapper, so even once the functions worked every
   * result rendered empty. Unwrap once here, and surface the function's own
   * error message rather than "non-2xx status code".
   */
  const callTool = async (fn: string, body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke(fn, { body });
    if (error) {
      const detail = await (error as { context?: Response }).context?.json?.().catch(() => null);
      throw new Error(detail?.error || error.message);
    }
    if (data?.success === false) throw new Error(data.error || 'That did not work — try again');
    return data?.data ?? data;
  };

  const runSuggestions = async () => {
    const symbols = buildSymbolSummary();
    if (symbols.length === 0) {
      toast.error('No symbols on the canvas — add some symbols first');
      return;
    }
    setSuggestionsLoading(true);
    setSuggestionsResult(null);
    try {
      setSuggestionsResult(
        await callTool('floor-plan-ai-suggestions', {
          room_name: 'Floor Plan',
          symbols,
          room_type: 'general',
        })
      );
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
      setSpecResult(
        await callTool('floor-plan-ai-spec', {
          room_name: 'Floor Plan',
          symbols,
          room_type: 'general',
        })
      );
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
      /*
       * The quote function reads `materials` (count, name, category), not the
       * `symbols` the other tools take — it was sent `symbols` and answered
       * "No materials to quote" for every plan. Room names come from the text
       * labels the plan reader puts in each room.
       */
      const roomNames = (canvasObjects || [])
        .filter((o) => o.type === 'text' && o.id.startsWith('ai-title-') && o.text)
        .map((o) => String(o.text).split('\n')[0]);
      setQuoteResult(
        await callTool('floor-plan-ai-quote', {
          materials: [
            ...symbols.map((sym) => ({
              name: sym.name,
              count: sym.count,
              category: symbolRegistry.find((r) => r.id === sym.id)?.category ?? 'other',
            })),
            // With the cable runs drawn, the cable itself — priced from the
            // drawing instead of guessed from a count of accessories.
            ...cableTakeOff(
              scheduleFromObjects(canvasObjects ?? []).circuits,
              runLengths(canvasObjects ?? [])
            ).map((t) => ({
              // "2.5/1.5 mm² T&E cable (m)" — the sizing caveats are for the
              // sheet, not for a line on a price list.
              name: `${t.cable.replace(/\s*\(.*\)$/, '')} cable (m)`,
              count: t.metres,
              category: 'cable',
            })),
          ],
          total_items: symbols.reduce((n, sym) => n + sym.count, 0),
          room_count: roomNames.length || savedRooms?.length || 1,
          rooms: roomNames.map((name) => ({ name })),
        })
      );
      haptic.success();
    } catch (error) {
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Failed to generate quote');
    } finally {
      setQuoteLoading(false);
    }
  };

  // --- Photo to Plan ---
  /*
   * The photo is compressed BEFORE it becomes a data URL, and that fixes two
   * separate causes of Patrick's "it randomly works" (ELE-1745).
   *
   * 1. SIZE. This used to read the camera file straight to base64. A current
   *    phone photo is 4-8 MB, and base64 inflates it by a third — so a 5-11 MB
   *    body went to an edge function that then does slow vision analysis. On
   *    iOS/WKWebView that combination is exactly what gets the fetch killed.
   *
   * 2. FORMAT. iPhones shoot HEIC by default, and the function hardcoded
   *    `mimeType: 'image/jpeg'` when handing the bytes to Gemini. A HEIC or PNG
   *    photo was therefore announced as something it was not. `compressImage-
   *    ForUpload` re-encodes through a canvas, so what leaves here really is a
   *    JPEG.
   *
   * Compression failing must not block the user — a photo that cannot be
   * re-encoded is still worth a try at the original size.
   */
  /**
   * Choose a plan photo.
   *
   * `source: 'library'` is the important one. Patrick's plan already existed as
   * a photo — "I have taken a picture of a floorplan" — and the only control
   * here was a file input marked `capture="environment"`, which on iOS pushes
   * the camera rather than the camera roll. Hence "I can't on the app".
   *
   * The app already has a native picker used by the survey and test-sheet
   * scanners; the planner simply never used it. On web this returns null and we
   * fall through to the file input, which is what works there.
   */
  const choosePlanPhoto = async (source: 'camera' | 'library') => {
    const nativeFile = await nativePickPhoto(source);
    if (nativeFile) {
      await acceptPlanPhoto(nativeFile);
      return;
    }
    photoInputRef.current?.click();
  };

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await acceptPlanPhoto(file);
  };

  /*
   * Accept a plan — an architect's PDF (a sheet or a whole pack), a screenshot
   * or a photo — however it arrives: picked, dropped, pasted or handed over by
   * the page.
   *
   * PDFs used to be refused outright (`accept="image/*"`), which is the worst
   * possible outcome: Paddy's CAD export was the sharpest input anyone could
   * give us, so he screenshotted it and got a partial floor instead.
   */
  // Only the latest file dropped counts: two drops in quick succession used to
  // race, the slower one landing last and the spinner clearing on the first.
  const prepRef = useRef(0);
  const photoGeneratingRef = useRef(false);
  photoGeneratingRef.current = photoGenerating;
  const acceptPlanPhoto = async (file: File) => {
    const unsupported = unsupportedPlanReason(file);
    if (unsupported) {
      toast.error(unsupported);
      return;
    }
    // From a ref: the paste listener is registered once per opening and would
    // otherwise always see the value from when the sheet opened.
    if (photoGeneratingRef.current) {
      toast.info('Still reading the last plan — it will be ready in a moment.');
      return;
    }
    const prep = ++prepRef.current;
    setMode('photo');
    setPhotoPreparing(true);
    try {
      const plan = await preparePlan(file);
      if (prep !== prepRef.current) return;
      setPhotoPages(plan.pages);
      setPhotoMeta({ pageCount: plan.pageCount, source: plan.source, name: file.name });
      setPhotoPreview(plan.pages[0].dataUrl);
      if (plan.pageCount > plan.pages.length) {
        toast.info(
          `That PDF has ${plan.pageCount} pages — reading the first ${plan.pages.length}.`
        );
      }
    } catch (err) {
      if (prep !== prepRef.current) return;
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        toast.error(err instanceof Error ? err.message : 'That PDF could not be opened');
        return;
      }
      // A photo the browser cannot decode itself (HEIC on desktop, say) still
      // gets the older compress-and-send path rather than a dead end.
      const sizeCheck = validateImageSize(file);
      if (!sizeCheck.valid) {
        toast.error(sizeCheck.error ?? 'That image is too large');
        return;
      }
      let forUpload = file;
      try {
        forUpload = await compressImageForUpload(file, PLAN_PHOTO_TARGET_KB);
      } catch {
        // Keep the original; the upload may still succeed.
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (prep !== prepRef.current) return;
        const dataUrl = reader.result as string;
        setPhotoPages([{ dataUrl, width: 0, height: 0 }]);
        setPhotoMeta({ pageCount: 1, source: 'image', name: file.name });
        setPhotoPreview(dataUrl);
      };
      reader.readAsDataURL(forUpload);
    } finally {
      if (prep === prepRef.current) setPhotoPreparing(false);
    }
  };

  // A plan handed over by the page (dropped or pasted onto the canvas).
  useEffect(() => {
    if (!open || !initialPlanFile) return;
    void acceptPlanPhoto(initialPlanFile);
    onInitialPlanFileConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialPlanFile]);

  /*
   * Paste a plan straight in (a screenshot on the clipboard is the commonest
   * way a plan exists on a desktop). Only while the dialog is open, and never
   * while typing — a paste into the notes box is text, not a plan.
   */
  useEffect(() => {
    if (!open) return;
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) return;
      const file = Array.from(e.clipboardData?.files ?? [])[0];
      if (!file) return;
      e.preventDefault();
      void acceptPlanPhoto(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [open]);

  const dropHandlers = {
    onDragOver: (e: React.DragEvent) => {
      if (!Array.from(e.dataTransfer.types).includes('Files')) return;
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (e: React.DragEvent) => {
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      setIsDragging(false);
    },
    onDrop: (e: React.DragEvent) => {
      const file = e.dataTransfer.files?.[0];
      setIsDragging(false);
      if (!file) return;
      e.preventDefault();
      void acceptPlanPhoto(file);
    },
  };

  /** Straight to the file picker — the only route to a PDF on every platform. */
  const choosePlanFile = () => photoInputRef.current?.click();

  /*
   * How long the photo has been analysing, in seconds.
   *
   * A whole floor genuinely takes a while — a measured 25-room nursing-home
   * wing came back in 46 seconds. Forty-six seconds of an unchanging spinner
   * reads as "hung", and someone who kills it and retries is a good part of
   * why this felt like it "randomly works". Saying what is happening, and that
   * a big plan takes about a minute, costs nothing and is true.
   */
  const [analysingFor, setAnalysingFor] = useState(0);

  useEffect(() => {
    if (!photoGenerating && !isGenerating) {
      setAnalysingFor(0);
      return;
    }
    const started = Date.now();
    const id = window.setInterval(() => {
      setAnalysingFor(Math.round((Date.now() - started) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [photoGenerating, isGenerating]);

  const handlePhotoGenerate = async () => {
    if (!photoPreview) return;
    setPhotoGenerating(true);
    setPlanProgress(EMPTY_PROGRESS);
    haptic.light();

    const { run, signal } = startRun();
    try {
      const roomData = await generatePlan(
        photoPages.length
          ? {
              // Pages only: sending page one again as `image_base64` doubled
              // the first page's share of the body, and a big body is what
              // iOS drops. The deployed function reads `pages`.
              pages: photoPages.map((p) => ({
                image_base64: p.dataUrl,
                width: p.width || undefined,
                height: p.height || undefined,
              })),
              notes: planNotes.trim() || undefined,
            }
          : { image_base64: photoPreview, notes: planNotes.trim() || undefined },
        onPlanProgress,
        signal
      );
      if (run !== runRef.current) return; // the sheet was closed: drop it

      /*
       * A CAD PDF: put the architect's own drawing underneath, and move every
       * room onto its real walls first so the electrics land on them. Any
       * failure here keeps the plan as drawn boxes — never an error.
       */
      const underlays: ReaderUnderlay[] = roomData?.underlays ?? [];
      if (photoMeta?.source === 'pdf' && underlays.length && Array.isArray(roomData?.rooms)) {
        try {
          const linesByPage = new Map(
            photoPages.map((p, i) => [i, p.lines ?? []] as const).filter(([, l]) => l.length > 0)
          );
          if (linesByPage.size) {
            const snapped = snapRoomsToLines(roomData.rooms, underlays, linesByPage);
            roomData.rooms = snapped.rooms;
          }
          const { data: session } = await supabase.auth.getSession();
          const userId = session.session?.user.id;
          if (userId) {
            const underlayObjects = await buildUnderlays(underlays, photoPages, userId);
            if (underlayObjects.length) roomData.underlayObjects = underlayObjects;
          }
        } catch (err) {
          console.warn('[plan] drawing not laid underneath, keeping the boxed plan:', err);
        }
      }

      if (run !== runRef.current) return;
      onRoomGenerated(roomData);
      haptic.success();
      // The page announces the result (room count and a reminder to check it).
      setPhotoPreview(null);
      setPhotoPages([]);
      setPhotoMeta(null);
      setPlanNotes('');
      onOpenChange(false);
    } catch (error) {
      if (run !== runRef.current) return;
      haptic.error();
      toast.error(error instanceof Error ? error.message : 'Could not read the plan');
    } finally {
      if (run === runRef.current) setPhotoGenerating(false);
    }
  };

  /*
   * A template is a known room, so it is drawn straight from the room-list
   * engine: instant, and the same every time. It used to be sent to the AI as
   * a paragraph and took half a minute to come back slightly different.
   */
  const TEMPLATE_PRESET: Record<string, string> = {
    kitchen: 'Kitchen',
    bedroom: 'Bedroom',
    'living-room': 'Lounge',
    bathroom: 'Bathroom',
    office: 'Office',
    garage: 'Garage',
    'utility-room': 'Utility',
    hallway: 'Hall',
    'en-suite': 'En-suite',
    wc: 'WC',
    conservatory: 'Conservatory',
    'dining-room': 'Dining room',
  };
  const drawTemplate = (template: (typeof QUICK_TEMPLATES)[number]) => {
    const preset = ROOM_PRESETS.find((p) => p.name === TEMPLATE_PRESET[template.id]);
    const size = /([\d.]+)\s*m?\s*x\s*([\d.]+)/i.exec(template.dimensions);
    if (!preset || !size) {
      generateRoom(template.description, template.name);
      return;
    }
    haptic.success();
    onRoomGenerated(
      planFromSchedule([
        {
          name: template.name,
          floor: '',
          width: Number(size[1]),
          length: Number(size[2]),
          sockets: preset.sockets,
          lights: preset.lights,
          extras: { ...preset.extras },
        },
      ])
    );
    onOpenChange(false);
  };

  // --- Auto-place symbols (inside room walls if present) ---
  const handleAutoPlace = (roomType: string) => {
    const pack = ROOM_SYMBOL_PACKS[roomType];
    if (!pack || !onSymbolsAutoPlaced) return;

    // Detect room wall bounding box from canvasObjects
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    const walls = (canvasObjects || []).filter((o) => o.type === 'wall');
    for (const w of walls) {
      if (w.points) {
        for (const p of w.points) {
          minX = Math.min(minX, p.x);
          minY = Math.min(minY, p.y);
          maxX = Math.max(maxX, p.x);
          maxY = Math.max(maxY, p.y);
        }
      }
    }

    // If walls found, place inside them with padding; otherwise use default area
    const hasRoom = isFinite(minX);
    const pad = 30;
    const areaX = hasRoom ? minX + pad : 80;
    const areaY = hasRoom ? minY + pad : 80;
    const areaW = hasRoom ? maxX - minX - pad * 2 : 300;
    const areaH = hasRoom ? maxY - minY - pad * 2 : 300;

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

  /*
   * Built on the house hub cards (HubQuickStart / HubToolGrid): text-only, the
   * one solid volt card on the action most people open this for. The old list
   * gave every row its own icon in its own colour — six hues on one screen,
   * which is decoration, not information.
   */
  const startItems = [
    {
      title: 'Plan to floor plan',
      description: 'PDF, screenshot or photo — every floor read',
      onClick: () => setMode('photo'),
      primary: true,
    },
    {
      title: 'Room by room',
      description: 'List each room and what goes in it — drawn exactly',
      onClick: () => setMode('schedule'),
    },
    {
      title: 'Describe it',
      description: 'One room or the whole property, in your words',
      onClick: () => setMode('describe'),
    },
    {
      title: 'Room templates',
      description: 'Pick a room, then adjust the sizes',
      onClick: () => setMode('templates'),
    },
  ];
  const checkTools = [
    {
      id: 'autoplace',
      title: 'Auto-place symbols',
      description: 'Sockets, lights and switches for a room',
      onClick: () => setMode('autoplace'),
    },
    {
      id: 'review',
      title: 'Compliance check',
      description: 'Your layout against BS 7671',
      onClick: () => setMode('review'),
    },
    {
      id: 'suggestions',
      title: 'Smart suggestions',
      description: 'Missing sockets, lights and safety items',
      onClick: () => setMode('suggestions'),
    },
  ];
  const outputTools = [
    {
      id: 'spec',
      title: 'Write specification',
      description: 'A client-ready spec sheet',
      onClick: () => setMode('spec'),
    },
    {
      id: 'quote',
      title: 'Price this job',
      description: 'Labour and materials estimate',
      onClick: () => setMode('quote'),
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        {/* The whole sheet is a drop target: drop a plan anywhere, in any mode,
            and it goes straight to Plan to Floor Plan. */}
        <div className="relative flex flex-col h-full bg-background" {...dropHandlers}>
          {isDragging && (
            <div className="pointer-events-none absolute inset-2 z-20 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-elec-yellow bg-background/90">
              <FileText className="h-9 w-9 text-elec-yellow mb-2" />
              <p className="text-sm font-semibold text-white">Drop the plan to read it</p>
              <p className="text-xs text-white mt-1">PDF, screenshot or photo</p>
            </div>
          )}
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
                  aria-label="Back"
                  className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </button>
              )}
              <div>
                <h2 className="text-base font-semibold text-white">{modeTitle[mode]}</h2>
                <p className="text-xs text-white">{modeSubtitle[mode]}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* ==================== HUB ==================== */}
            {mode === 'hub' && (
              <div className="space-y-7 px-4 py-5 sm:px-5">
                <HubQuickStart label="Start a plan" items={startItems} leadSpans />
                <HubToolGrid label="Check and improve" cards={checkTools} />
                <HubToolGrid label="Output" cards={outputTools} columns="two" />
                <p className="hidden text-[11px] text-white sm:block">
                  Tip: drop a plan PDF anywhere on this sheet, or paste a screenshot, to go straight
                  to reading it.
                </p>
              </div>
            )}

            {/* ==================== TEMPLATES ==================== */}
            {mode === 'templates' && (
              <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-5 sm:px-5">
                <ToolIntro>
                  A ready-made room with its electrics laid out. Pick one, then adjust the walls and
                  items on the canvas.
                </ToolIntro>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {QUICK_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => drawTemplate(template)}
                      disabled={isGenerating}
                      className={cn(CARD_BASE, CARD_NEUTRAL, 'min-h-[84px] p-4')}
                    >
                      <span className="text-[15px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow">
                        {template.name}
                      </span>
                      <span className="mt-1 text-[12px] tabular-nums text-white">
                        {template.dimensions}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== DESCRIBE ==================== */}
            {mode === 'schedule' && (
              <RoomScheduleForm
                onDraw={(plan, count) => {
                  // The page announces the result.
                  onRoomGenerated(plan);
                  onOpenChange(false);
                }}
              />
            )}

            {mode === 'describe' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                <ToolIntro>
                  Say it or type it — one room or the whole property. Sizes you give are used;
                  anything you ask for is put in.
                </ToolIntro>

                {/* Voice — the mic is the control itself, so it keeps its glyph. */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
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
                    aria-label={speech.isListening ? 'Stop recording' : 'Start recording'}
                    className={cn(
                      'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full touch-manipulation transition-transform active:scale-90',
                      speech.isListening ? 'bg-red-500' : 'bg-elec-yellow'
                    )}
                  >
                    <Mic
                      className={cn('h-6 w-6', speech.isListening ? 'text-white' : 'text-black')}
                    />
                  </button>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">
                      {speech.isListening ? 'Listening — tap to stop' : 'Tap to speak'}
                    </p>
                    <p className="text-[12px] text-white">
                      {speech.isListening
                        ? 'Talk it through room by room.'
                        : 'Or type below. Both work.'}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="describe-text"
                    className="mb-1 block text-[12px] font-medium text-white"
                  >
                    Description
                  </label>
                  <Textarea
                    id="describe-text"
                    placeholder="e.g. Three-bed semi. Lounge 4 by 5 at the front, kitchen-diner across the back…"
                    value={
                      speech.isListening && speech.interimTranscript
                        ? `${description || speech.transcript} ${speech.interimTranscript}`.trim()
                        : description || speech.transcript
                    }
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="min-h-[96px] resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
                    disabled={isGenerating}
                  />
                </div>

                <PrimaryAction
                  onClick={() => generateRoom((description || speech.transcript).trim(), 'Room')}
                  disabled={!(description || speech.transcript).trim()}
                  loading={isGenerating}
                >
                  Draw the floor plan
                </PrimaryAction>

                <ResultSection title="Examples">
                  {[
                    {
                      t: 'A whole house',
                      d: '“Three-bed semi. Lounge 4 by 5 at the front, kitchen-diner across the back, WC under the stairs. Upstairs three bedrooms, en-suite off the main, family bathroom.”',
                    },
                    {
                      t: 'One room',
                      d: '“Kitchen, 4 by 3 metres, window on the north wall, door on the east.”',
                    },
                    {
                      t: 'With what you need',
                      d: '“…EV charger in the garage, USB doubles in every bedroom.”',
                    },
                  ].map((ex) => (
                    <ResultRow key={ex.t} title={ex.t} detail={ex.d} />
                  ))}
                </ResultSection>
              </div>
            )}

            {/* ==================== REVIEW ==================== */}
            {mode === 'review' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                {!reviewResults ? (
                  <>
                    <ToolIntro>
                      Checks what is on your plan against BS 7671, Building Regulations Parts B and
                      F, and common installation practice.
                    </ToolIntro>
                    <PrimaryAction
                      onClick={() => {
                        haptic.light();
                        reviewFloorPlan();
                      }}
                    >
                      Run the check
                    </PrimaryAction>
                  </>
                ) : (
                  <>
                    <ToolIntro
                      title={(() => {
                        const n = reviewResults.filter((r) => r.type === 'warning').length;
                        return n === 0
                          ? 'Nothing to change'
                          : `${n} thing${n === 1 ? '' : 's'} to look at`;
                      })()}
                    >
                      Against BS 7671, Building Regulations Parts B and F, and common practice.
                    </ToolIntro>
                    <ResultSection title="Findings" count={reviewResults.length}>
                      {reviewResults.map((item, idx) => (
                        <ResultRow
                          key={idx}
                          title={item.message}
                          tone={
                            item.type === 'warning'
                              ? 'action'
                              : item.type === 'pass'
                                ? 'pass'
                                : 'advice'
                          }
                        />
                      ))}
                    </ResultSection>
                    <ResultActions
                      againLabel="Check again"
                      onAgain={() => {
                        setReviewResults(null);
                        reviewFloorPlan();
                      }}
                      onDone={() => setMode('hub')}
                    />
                  </>
                )}
              </div>
            )}

            {/* ==================== AUTO-PLACE ==================== */}
            {mode === 'autoplace' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                <ToolIntro>
                  Choose the room type and the usual sockets, lights and switches for it are placed
                  inside the room on the canvas.
                </ToolIntro>
                <div className="border-t border-white/[0.12]">
                  {Object.entries(ROOM_SYMBOL_PACKS).map(([roomType, pack]) => {
                    const open = selectedAutoPlaceRoom === roomType;
                    const grouped = Object.entries(
                      pack.reduce<Record<string, number>>((acc, item) => {
                        acc[item.name] = (acc[item.name] ?? 0) + 1;
                        return acc;
                      }, {})
                    );
                    return (
                      <div key={roomType} className="border-b border-white/[0.12]">
                        <button
                          type="button"
                          onClick={() => setSelectedAutoPlaceRoom(open ? null : roomType)}
                          aria-expanded={open}
                          className="flex h-14 w-full items-center justify-between gap-3 text-left touch-manipulation"
                        >
                          <span
                            className={cn(
                              'text-[15px] font-semibold capitalize',
                              open ? 'text-elec-yellow' : 'text-white'
                            )}
                          >
                            {roomType}
                          </span>
                          <span className="text-[12px] tabular-nums text-white">
                            {pack.length} items
                          </span>
                        </button>
                        {open && (
                          <div className="space-y-3 pb-4">
                            <ul className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                              {grouped.map(([name, n]) => (
                                <li
                                  key={name}
                                  className="flex justify-between text-[13px] text-white"
                                >
                                  <span>{name}</span>
                                  <span className="tabular-nums">× {n}</span>
                                </li>
                              ))}
                            </ul>
                            <PrimaryAction
                              onClick={() => handleAutoPlace(roomType)}
                              disabled={!onSymbolsAutoPlaced}
                            >
                              Place {pack.length} items
                            </PrimaryAction>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== SUGGESTIONS ==================== */}
            {mode === 'suggestions' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                {!suggestionsResult && !suggestionsLoading && (
                  <>
                    <ToolIntro>
                      Reads your plan and lists what is missing, anything that would not comply, and
                      improvements worth offering the client.
                    </ToolIntro>
                    <PrimaryAction
                      onClick={() => {
                        haptic.light();
                        runSuggestions();
                      }}
                    >
                      Analyse the plan
                    </PrimaryAction>
                  </>
                )}
                {suggestionsLoading && (
                  <ToolLoading label="Analysing your plan…" hint="Usually a few seconds." />
                )}
                {suggestionsResult && (
                  <>
                    <ToolIntro title="What stands out">
                      {suggestionsResult.summary || undefined}
                    </ToolIntro>
                    {suggestionsResult.compliance?.length > 0 && (
                      <ResultSection title="Compliance" count={suggestionsResult.compliance.length}>
                        {suggestionsResult.compliance.map((item: any, idx: number) => (
                          <ResultRow
                            key={idx}
                            title={item.issue}
                            detail={[item.regulation, item.severity].filter(Boolean).join(' · ')}
                            tone={
                              /high|critical|fail/i.test(String(item.severity)) ? 'fail' : 'action'
                            }
                          />
                        ))}
                      </ResultSection>
                    )}
                    {suggestionsResult.missing?.length > 0 && (
                      <ResultSection title="Missing" count={suggestionsResult.missing.length}>
                        {suggestionsResult.missing.map((item: any, idx: number) => (
                          <ResultRow
                            key={idx}
                            title={item.name || item.symbol}
                            detail={item.reason}
                            tone="action"
                          />
                        ))}
                      </ResultSection>
                    )}
                    {suggestionsResult.improvements?.length > 0 && (
                      <ResultSection
                        title="Worth offering"
                        count={suggestionsResult.improvements.length}
                      >
                        {suggestionsResult.improvements.map((item: any, idx: number) => (
                          <ResultRow
                            key={idx}
                            title={item.suggestion}
                            detail={item.benefit}
                            tone="advice"
                          />
                        ))}
                      </ResultSection>
                    )}
                    <ResultActions
                      onAgain={() => {
                        setSuggestionsResult(null);
                        runSuggestions();
                      }}
                      onDone={() => setMode('hub')}
                    />
                  </>
                )}
              </div>
            )}

            {/* ==================== SPEC ==================== */}
            {mode === 'spec' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                {!specResult && !specLoading && (
                  <>
                    <ToolIntro>
                      A client-ready specification of the electrical work, written from what is on
                      your plan — circuits, cables and protection.
                    </ToolIntro>
                    <PrimaryAction
                      onClick={() => {
                        haptic.light();
                        runSpec();
                      }}
                    >
                      Write the specification
                    </PrimaryAction>
                  </>
                )}
                {specLoading && (
                  <ToolLoading label="Writing the specification…" hint="Usually a few seconds." />
                )}
                {specResult && (
                  <>
                    <ToolIntro title={specResult.title || 'Specification'}>
                      Written from the items on your plan. Check it before it goes to the client.
                    </ToolIntro>
                    {specResult.items?.length > 0 && (
                      <ResultSection title="Scope of work" count={specResult.items.length}>
                        {specResult.items.map((item: any, idx: number) => (
                          <ResultRow
                            key={idx}
                            index={Number(item.number) || idx + 1}
                            title={item.description}
                            detail={[item.circuit, item.cable, item.protection]
                              .filter(Boolean)
                              .join(' · ')}
                          />
                        ))}
                      </ResultSection>
                    )}
                    {specResult.generalNotes && (
                      <ResultSection title="General notes">
                        <p className="py-3 text-[13px] leading-relaxed text-white">
                          {specResult.generalNotes}
                        </p>
                      </ResultSection>
                    )}
                    {specResult.regulations?.length > 0 && (
                      <ResultSection title="Regulations referenced">
                        <p className="py-3 text-[13px] leading-relaxed text-white">
                          {specResult.regulations.join(' · ')}
                        </p>
                      </ResultSection>
                    )}
                    <ResultActions
                      againLabel="Write again"
                      onAgain={() => {
                        setSpecResult(null);
                        runSpec();
                      }}
                      onDone={() => setMode('hub')}
                    />
                  </>
                )}
              </div>
            )}

            {/* ==================== QUOTE ==================== */}
            {mode === 'quote' && (
              <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-5 sm:px-5">
                {!quoteResult && !quoteLoading && (
                  <>
                    <ToolIntro>
                      An estimate from your plan: materials, labour, sundries and certification,
                      with VAT.
                    </ToolIntro>
                    <PrimaryAction
                      onClick={() => {
                        haptic.light();
                        runQuote();
                      }}
                    >
                      Price it
                    </PrimaryAction>
                  </>
                )}
                {quoteLoading && (
                  <ToolLoading label="Pricing the job…" hint="Usually a few seconds." />
                )}
                {quoteResult && (
                  <>
                    {quoteResult.materials ? (
                      <div className="space-y-5">
                        <ToolIntro
                          title={
                            quoteResult.totalIncVat != null || quoteResult.total != null
                              ? `${gbp(quoteResult.totalIncVat || quoteResult.total)} inc VAT`
                              : 'Estimate'
                          }
                        >
                          {quoteResult.quoteRef ? `Ref ${quoteResult.quoteRef}. ` : ''}
                          {quoteResult.estimatedDuration
                            ? `About ${quoteResult.estimatedDuration} on site.`
                            : 'Check the rates before it goes to the client.'}
                        </ToolIntro>
                        <ResultSection
                          title="Materials"
                          count={
                            Array.isArray(quoteResult.materials)
                              ? quoteResult.materials.length
                              : undefined
                          }
                        >
                          {(Array.isArray(quoteResult.materials) ? quoteResult.materials : []).map(
                            (item: any, idx: number) => (
                              <ResultRow
                                key={idx}
                                title={item.item || item.name}
                                detail={item.qty ? `Qty ${item.qty}` : undefined}
                                value={item.total != null ? gbp(item.total) : undefined}
                              />
                            )
                          )}
                        </ResultSection>
                        <div>
                          {quoteResult.materialsSubtotal != null && (
                            <TotalLine
                              label="Materials"
                              value={gbp(quoteResult.materialsSubtotal)}
                            />
                          )}
                          {quoteResult.labour && (
                            <TotalLine
                              label={
                                quoteResult.labour.hours
                                  ? `Labour — ${quoteResult.labour.hours} hrs at £${quoteResult.labour.rate}/hr`
                                  : 'Labour'
                              }
                              value={gbp(quoteResult.labour.total || 0)}
                            />
                          )}
                          {quoteResult.sundries && (
                            <TotalLine
                              label={quoteResult.sundries.description || 'Sundries'}
                              value={gbp(quoteResult.sundries.total || 0)}
                            />
                          )}
                          {quoteResult.certification && (
                            <TotalLine
                              label={quoteResult.certification.description || 'Certification'}
                              value={gbp(quoteResult.certification.total || 0)}
                            />
                          )}
                          {quoteResult.subtotalExVat != null && (
                            <TotalLine
                              label="Subtotal (ex VAT)"
                              value={gbp(quoteResult.subtotalExVat)}
                            />
                          )}
                          {quoteResult.vat != null && (
                            <TotalLine label="VAT (20%)" value={gbp(quoteResult.vat)} />
                          )}
                          {(quoteResult.totalIncVat != null || quoteResult.total != null) && (
                            <TotalLine
                              strong
                              label="Total (inc VAT)"
                              value={gbp(quoteResult.totalIncVat || quoteResult.total)}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <ToolIntro title="Nothing to price yet">
                        {typeof quoteResult === 'string'
                          ? quoteResult
                          : quoteResult?.error ||
                            'Add sockets, lights and switches to the plan, then price it.'}
                      </ToolIntro>
                    )}
                    <ResultActions
                      againLabel="Price again"
                      onAgain={() => {
                        setQuoteResult(null);
                        runQuote();
                      }}
                      onDone={() => setMode('hub')}
                    />
                  </>
                )}
              </div>
            )}

            {/* ==================== PHOTO TO PLAN ==================== */}
            {mode === 'photo' && (
              <div className="space-y-4 px-4 py-5 sm:px-5">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*,application/pdf,.pdf"
                  onChange={(e) => {
                    void handlePhotoCapture(e);
                    // Let the same file be chosen again after "Choose another".
                    e.target.value = '';
                  }}
                  className="hidden"
                />

                {!photoPreview && !photoGenerating && !photoPreparing && (
                  <div className="mx-auto w-full max-w-2xl space-y-4">
                    {/* The drop zone IS the upload control on the web — one
                        large target instead of a card explaining a button. */}
                    <button
                      type="button"
                      onClick={isNativeApp ? () => choosePlanPhoto('library') : choosePlanFile}
                      className="group w-full touch-manipulation rounded-2xl border border-dashed border-white/[0.2] bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 py-8 text-left transition-colors hover:border-elec-yellow active:scale-[0.99] sm:py-10"
                    >
                      <span className="block text-[20px] font-bold leading-tight tracking-tight text-white group-hover:text-elec-yellow sm:text-[22px]">
                        {isNativeApp ? 'Add the plan' : 'Drop the plan here'}
                      </span>
                      <span className="mt-2 block text-[13px] leading-relaxed text-white">
                        The architect&apos;s PDF, a screenshot or a photo — hand-drawn is fine.
                        Every room on every floor is laid out with a suggested electrical layout.
                      </span>
                      <span className="mt-3 hidden text-[12px] text-white sm:block">
                        Or click to choose a file · paste a screenshot with Ctrl/⌘ V
                      </span>
                    </button>

                    {isNativeApp ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Library first: a plan is nearly always a photo you
                            already took (ELE-1745). The file picker is the one
                            route to a PDF in the app. */}
                        <Button
                          onClick={() => choosePlanPhoto('library')}
                          className="col-span-2 h-12 touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black hover:bg-elec-yellow/90 md:h-12"
                        >
                          Choose a photo of the plan
                        </Button>
                        <Button
                          onClick={choosePlanFile}
                          variant="outline"
                          className="h-11 touch-manipulation rounded-xl border-white/[0.14] text-sm font-semibold text-white hover:bg-white/10"
                        >
                          Upload a PDF
                        </Button>
                        <Button
                          onClick={() => choosePlanPhoto('camera')}
                          variant="outline"
                          className="h-11 touch-manipulation rounded-xl border-white/[0.14] text-sm font-semibold text-white hover:bg-white/10"
                        >
                          Take a photo
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={choosePlanFile}
                        className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black hover:bg-elec-yellow/90 md:h-12"
                      >
                        Choose a file
                      </Button>
                    )}

                    <div className="border-t border-white/[0.1] pt-4">
                      <p className="text-[13px] font-semibold text-white">Best results</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white">
                        The original PDF from CAD. A pack with a floor on each page is read page by
                        page. Title blocks, legends and notes are ignored.
                      </p>
                    </div>
                  </div>
                )}

                {photoPreparing && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="mb-3 h-6 w-6 animate-spin text-elec-yellow" />
                    <p className="text-sm font-semibold text-white">Preparing the plan…</p>
                  </div>
                )}

                {photoPreview && !photoGenerating && (
                  /* Plan large on the left, everything about it on the right.
                     Stacked on phones. A plan in a thin full-width strip with
                     empty space either side said nothing about what happens
                     next. */
                  <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:gap-7">
                    <div className="space-y-2.5">
                      <div className="overflow-hidden rounded-2xl border border-white/[0.14] bg-white">
                        <img
                          src={photoPreview}
                          alt="Your floor plan"
                          className="h-64 w-full object-contain sm:h-80 lg:h-[26rem]"
                        />
                      </div>
                      {photoPages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {photoPages.map((p, i) => (
                            <div
                              key={i}
                              className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/[0.14] bg-white"
                            >
                              <img
                                src={p.dataUrl}
                                alt={`Page ${i + 1}`}
                                className="h-full w-full object-contain"
                              />
                              <span className="absolute bottom-0.5 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">
                                {i + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-5">
                      <div>
                        <p
                          className="truncate text-[17px] font-bold tracking-tight text-white"
                          title={photoMeta?.name}
                        >
                          {photoMeta?.name || 'Your plan'}
                        </p>
                        <p className="mt-0.5 text-[13px] text-white">
                          {photoMeta?.source === 'pdf'
                            ? photoPages.length > 1
                              ? `PDF · ${photoPages.length} pages${
                                  photoMeta.pageCount > photoPages.length
                                    ? ` of ${photoMeta.pageCount}`
                                    : ''
                                }, read side by side`
                              : 'PDF drawing · every floor on the sheet'
                            : 'Image · every room on it'}
                        </p>
                      </div>

                      <ol className="border-t border-white/[0.12]">
                        {[
                          ['Finds every room', 'Named as on the drawing, floor by floor.'],
                          ['Lays out the walls', 'Rooms sized and placed as drawn.'],
                          ['Designs the electrics', 'Sockets, lighting, switching and detection.'],
                        ].map(([t, d], i) => (
                          <li key={t} className="flex gap-3 border-b border-white/[0.12] py-2.5">
                            <span className="w-5 flex-shrink-0 pt-px text-[12px] font-semibold tabular-nums text-elec-yellow">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <p className="text-[13.5px] font-semibold text-white">{t}</p>
                              <p className="text-[12px] text-white">{d}</p>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <div>
                        <label
                          htmlFor="plan-notes"
                          className="mb-1 block text-[12px] font-medium text-white"
                        >
                          Anything to add? (optional)
                        </label>
                        <Textarea
                          id="plan-notes"
                          value={planNotes}
                          onChange={(e) => setPlanNotes(e.target.value)}
                          placeholder="e.g. Full rewire. EV charger in the garage, USB sockets in every bedroom."
                          rows={2}
                          className="textarea-soft min-h-[56px] resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
                        />
                      </div>

                      <div className="mt-auto grid grid-cols-[1fr_2fr] gap-2.5">
                        <Button
                          onClick={() => {
                            setPhotoPreview(null);
                            setPhotoPages([]);
                            setPhotoMeta(null);
                            if (photoMeta?.source === 'pdf') choosePlanFile();
                            else void choosePlanPhoto('library');
                          }}
                          variant="outline"
                          className="h-12 touch-manipulation rounded-xl border-white/[0.14] text-sm font-semibold text-white hover:bg-white/10 md:h-12"
                        >
                          Change
                        </Button>
                        <Button
                          onClick={handlePhotoGenerate}
                          className="h-12 touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black hover:bg-elec-yellow/90 md:h-12 md:text-[15px]"
                        >
                          Read the plan
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {photoGenerating && (
                  <PlanProgressPanel
                    progress={planProgress}
                    elapsed={analysingFor}
                    source="plan"
                    previewUrl={photoPreview}
                    fileName={photoMeta?.name}
                  />
                )}
              </div>
            )}
          </div>

          {/* Loading overlay */}
          {isGenerating && (
            <div className="absolute inset-0 z-10 overflow-y-auto bg-background/95 backdrop-blur-sm">
              <div className="mx-auto max-w-md px-5 py-8">
                <PlanProgressPanel
                  progress={planProgress}
                  elapsed={analysingFor}
                  source="describe"
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
