import { useState } from "react";
import { HelpCircle, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RegulationTooltipProps {
  topic: string;
  context: any;
}

export const RegulationTooltip = ({ topic, context }: RegulationTooltipProps) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchExplanation = async () => {
    if (explanation) return; // Already loaded

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('explain-regulation', {
        body: { topic, context }
      });

      if (error) throw error;
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Failed to fetch explanation:', error);
      setExplanation("Unable to load explanation at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation && !isLoading) {
      fetchExplanation();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-muted-foreground hover:text-primary"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading explanation...
          </div>
        ) : (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-foreground">Why {topic}?</h4>
            <p className="text-xs text-foreground/90 leading-relaxed">
              {explanation || "Click to load explanation"}
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
