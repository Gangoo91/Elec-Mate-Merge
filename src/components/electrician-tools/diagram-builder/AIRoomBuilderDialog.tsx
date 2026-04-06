import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sparkles, Loader2, ArrowLeft, Mic, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

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

interface AIRoomBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomGenerated: (roomData: any) => void;
}

export const AIRoomBuilderDialog = ({
  open,
  onOpenChange,
  onRoomGenerated,
}: AIRoomBuilderDialogProps) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'templates' | 'describe'>('templates');
  const [isListening, setIsListening] = useState(false);
  const haptic = useHaptic();
  const toastIdRef = useRef<string | number | null>(null);

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

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice input not supported');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setDescription(event.results[0][0].transcript);
      haptic.success();
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      toast.error('Voice input failed');
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              {mode === 'describe' && (
                <button
                  onClick={() => setMode('templates')}
                  className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </button>
              )}
              <div>
                <h2 className="text-base font-semibold text-white">
                  {mode === 'templates' ? 'AI Room Builder' : 'Describe Your Room'}
                </h2>
                <p className="text-xs text-white/60">
                  {mode === 'templates'
                    ? 'Choose a room type or describe your own'
                    : 'Tell us about the room in your own words'}
                </p>
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {mode === 'templates' ? (
              <div className="p-4 space-y-4">
                {/* Room templates grid */}
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
                      <p className="text-[11px] text-white/50 mt-0.5">{template.dimensions}</p>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    </button>
                  ))}
                </div>

                {/* Describe your own */}
                <div className="pt-2">
                  <button
                    onClick={() => setMode('describe')}
                    className="w-full p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 hover:bg-elec-yellow/20 active:scale-[0.98] transition-all touch-manipulation text-left"
                  >
                    <p className="text-sm font-semibold text-elec-yellow">Describe your own room</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      Use natural language or voice input
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Description input */}
                <div className="relative">
                  <Textarea
                    placeholder="e.g. Kitchen, 4m by 3m. Window on the north wall. Door on the east wall. 4 double sockets along the south wall. Cooker point. Light switch by the door."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[140px] bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 text-sm touch-manipulation pr-12 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={handleVoiceInput}
                    disabled={isListening || isGenerating}
                    className={cn(
                      'absolute bottom-3 right-3 h-9 w-9 rounded-full flex items-center justify-center touch-manipulation',
                      isListening
                        ? 'bg-red-500/20 border border-red-500/40'
                        : 'bg-white/[0.06] border border-white/10 hover:bg-white/10'
                    )}
                  >
                    <Mic className={cn('h-4 w-4', isListening ? 'text-red-400' : 'text-white/60')} />
                  </button>
                </div>

                {/* Tips */}
                <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs font-medium text-white/70 mb-2">Tips for best results</p>
                  <ul className="text-[11px] text-white/50 space-y-1">
                    <li>Include room dimensions (e.g. 4m by 3m)</li>
                    <li>Mention where doors and windows are</li>
                    <li>Say how many sockets and where</li>
                    <li>Specify lighting type (ceiling, downlights, pendant)</li>
                  </ul>
                </div>

                {/* Generate button */}
                <Button
                  onClick={() => generateRoom(description.trim(), 'Room')}
                  disabled={isGenerating || !description.trim()}
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
          </div>

          {/* Loading overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-3" />
              <p className="text-sm font-medium text-white">Generating floor plan...</p>
              <p className="text-xs text-white/50 mt-1">This takes a few seconds</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
