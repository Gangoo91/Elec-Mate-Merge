import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InstallPlanDataV2 } from "./types";

interface SmartInputProps {
  onParsed: (data: Partial<InstallPlanDataV2>) => void;
}

export const SmartInput = ({ onParsed }: SmartInputProps) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleParse = async () => {
    if (!description.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-circuit-description', {
        body: { description }
      });

      if (error) throw error;

      onParsed(data);
      toast({
        title: "Description parsed",
        description: "Form fields updated with your requirements",
      });
      setDescription("");
    } catch (error) {
      console.error('Parse error:', error);
      toast({
        title: "Parse failed",
        description: "Could not understand the description. Try being more specific.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2 mb-6">
      <div className="flex gap-2">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your circuit (e.g., '10kW shower, 30m run, buried underground')"
          onKeyDown={(e) => e.key === 'Enter' && handleParse()}
          className="flex-1"
        />
        <Button 
          onClick={handleParse} 
          disabled={isLoading || !description.trim()}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
          Parse
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Describe your installation in plain English to auto-fill the form
      </p>
    </div>
  );
};
