import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AIRoomBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomGenerated: (roomData: any) => void;
}

export const AIRoomBuilderDialog = ({ open, onOpenChange, onRoomGenerated }: AIRoomBuilderDialogProps) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please describe your room");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
        body: { description: description.trim() }
      });

      if (error) throw error;

      if (data.success) {
        toast.success("Room generated successfully!");
        onRoomGenerated(data.roomData);
        onOpenChange(false);
        setDescription("");
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

  const exampleText = `Kitchen - 4m north wall with window centered, 3m east wall with door on right, 4m south wall with 2x double sockets (1.5m apart), 3m west wall with light switch near door`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-elec-card border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-elec-light">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            AI Room Builder
          </DialogTitle>
          <DialogDescription className="text-elec-light/70">
            Describe your room in plain English and let AI generate the diagram
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Example */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
            <div className="flex items-start gap-2 mb-2">
              <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-xs font-semibold text-elec-yellow">Example Format:</p>
            </div>
            <p className="text-xs text-elec-light/80 font-mono bg-elec-dark/50 p-2 rounded">
              {exampleText}
            </p>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-elec-light">Room Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your room layout, walls, doors, windows, and electrical components..."
              className="min-h-[150px] bg-elec-dark border-elec-yellow/20 text-elec-light resize-none"
              disabled={isGenerating}
            />
            <p className="text-xs text-elec-light/60">
              Include: room name, wall lengths (m), wall orientation (north/south/east/west), 
              doors, windows, sockets, switches, lights
            </p>
          </div>

          {/* Tips */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-elec-yellow">Tips:</p>
            <ul className="text-xs text-elec-light/70 space-y-1 ml-4 list-disc">
              <li>Specify wall lengths in metres (e.g., "4m north wall")</li>
              <li>Mention doors and windows positions (e.g., "door on left", "window centered")</li>
              <li>Describe socket quantities (e.g., "2x double sockets", "3x single sockets")</li>
              <li>Indicate switch positions (e.g., "light switch near door")</li>
              <li>Use compass directions for clarity (north, south, east, west)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Room...
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
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
