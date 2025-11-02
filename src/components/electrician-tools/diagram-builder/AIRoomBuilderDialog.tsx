import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, ArrowLeft, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SimplifiedRoomForm } from "./SimplifiedRoomForm";

const QUICK_TEMPLATES = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    dimensions: '4m × 3m',
    description: 'Kitchen - 4m north wall with window centred, 3m east wall with door on right, 4m south wall with 2x double sockets 1.5m apart, 3m west wall with light switch near door, ceiling light in centre'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    dimensions: '3m × 4m',
    description: 'Bedroom - 3m north wall with window centred, 4m east wall, 3m south wall with door on left and 2x double sockets, 4m west wall with 1x double socket, 2-way light switches on east and west walls near door, ceiling light in centre'
  },
  {
    id: 'office',
    name: 'Office',
    icon: '💼',
    dimensions: '5m × 4m',
    description: 'Office - 5m north wall with 2x windows, 4m east wall, 5m south wall with door on left and 4x double sockets evenly spaced, 4m west wall with 2x double sockets, light switch near door, 2x ceiling lights'
  }
];

interface AIRoomBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomGenerated: (roomData: any) => void;
}

export const AIRoomBuilderDialog = ({ open, onOpenChange, onRoomGenerated }: AIRoomBuilderDialogProps) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'quickstart' | 'advanced'>('quickstart');
  const [isListening, setIsListening] = useState(false);

  const handleQuickGenerate = async (template: typeof QUICK_TEMPLATES[0]) => {
    setIsGenerating(true);
    toast.loading(`Generating ${template.name}...`);
    
    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { description: template.description }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(`${template.name} generated!`);
        onRoomGenerated(data.roomData);
        onOpenChange(false);
      } else {
        throw new Error(data.error || 'Failed to generate room');
      }
    } catch (error) {
      console.error('Room generation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate room");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimpleFormGenerate = async (generatedDescription: string) => {
    setIsGenerating(true);
    toast.loading('Generating your room...');
    
    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { description: generatedDescription }
      });

      if (error) throw error;

      if (data.success) {
        toast.success('Room generated!');
        onRoomGenerated(data.roomData);
        onOpenChange(false);
      } else {
        throw new Error(data.error || 'Failed to generate room');
      }
    } catch (error) {
      console.error('Room generation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate room");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please describe your room first");
      return;
    }

    setIsGenerating(true);
    toast.loading('Understanding your room...');

    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { description: description.trim() }
      });

      if (error) throw error;

      toast.loading('Drawing walls and symbols...');
      await new Promise(resolve => setTimeout(resolve, 500));

      if (data.success && data.roomData) {
        toast.success('Room diagram generated!');
        onRoomGenerated(data.roomData);
        setDescription("");
        onOpenChange(false);
      } else {
        throw new Error(data.error || 'Failed to generate room diagram');
      }
    } catch (error) {
      console.error('Room generation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate room diagram");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info('Listening... speak now!');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDescription(transcript);
      toast.success('Voice input captured!');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      toast.error('Voice input failed');
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-elec-card border-elec-yellow/30 max-h-[90vh] overflow-y-auto">
        {mode === 'quickstart' ? (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-elec-light">
                ✨ Build Your Room in 5 Seconds
              </DialogTitle>
              <DialogDescription className="text-center text-elec-light/70">
                Choose a template or describe your room
              </DialogDescription>
            </DialogHeader>

            {/* Quick Start Templates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {QUICK_TEMPLATES.map((template) => (
                <Button
                  key={template.id}
                  onClick={() => handleQuickGenerate(template)}
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-elec-dark border-2 border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 transition-all"
                  disabled={isGenerating}
                >
                  <span className="text-3xl">{template.icon}</span>
                  <span className="font-semibold text-elec-light">{template.name}</span>
                  <span className="text-xs text-elec-light/60">{template.dimensions}</span>
                </Button>
              ))}
            </div>

            {/* OR Separator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-elec-yellow/20"></div>
              <span className="text-xs text-elec-light/60 uppercase">Or</span>
              <div className="flex-1 border-t border-elec-yellow/20"></div>
            </div>

            {/* Simple Form */}
            <SimplifiedRoomForm onGenerate={handleSimpleFormGenerate} isGenerating={isGenerating} />

            {/* Advanced Mode Link */}
            <button
              onClick={() => setMode('advanced')}
              className="w-full text-center text-xs text-elec-yellow hover:underline pt-2"
            >
              Advanced: Describe room in natural language →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <DialogHeader>
              <button 
                onClick={() => setMode('quickstart')} 
                className="text-xs text-elec-yellow mb-2 flex items-center gap-1 hover:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Quick Start
              </button>
              <DialogTitle className="text-elec-light">AI Room Builder - Advanced</DialogTitle>
              <DialogDescription className="text-elec-light/70">
                Describe your room in natural language and let AI create the electrical diagram
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-elec-light">Room Description</label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Kitchen - 4m x 3m, north wall has a window, east wall has a door, need 3 double sockets on south wall, 1 ceiling light, light switch near door"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] bg-elec-dark border-elec-yellow/30 text-elec-light placeholder:text-elec-light/40 pr-12"
                  disabled={isGenerating}
                />
                <Button
                  onClick={handleVoiceInput}
                  disabled={isListening || isGenerating}
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0"
                  variant="outline"
                  title="Voice input"
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="text-sm font-semibold text-elec-yellow mb-2">Example Format:</h4>
              <p className="text-xs text-elec-light/70 leading-relaxed">
                "Living room - 5m by 4m. North wall (5m) has two windows. East wall (4m) has the door on the right side. 
                South wall (5m) needs 4 double sockets evenly spaced. West wall (4m) needs 1 double socket. 
                Put a light switch near the door and 2 ceiling lights."
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-elec-light">Tips:</h4>
              <ul className="text-xs text-elec-light/70 space-y-1 list-disc list-inside">
                <li>Specify room dimensions (width x height in metres)</li>
                <li>Mention wall orientations (north/south/east/west) and features (windows/doors)</li>
                <li>Indicate socket quantities and positions along walls</li>
                <li>Specify lighting (ceiling lights, wall lights) and switch locations</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !description.trim()}
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Room Diagram
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isGenerating}
                className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
