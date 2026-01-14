import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface GenerateBriefingInput {
  jobDescription?: string;
  siteType?: "domestic" | "commercial" | "industrial";
  hazards?: string[];
  templateContent?: string;
  location?: string;
  weather?: string;
  teamSize?: number;
  specialConsiderations?: string;
  targetDuration?: number;
}

export interface BriefingHazard {
  hazard: string;
  whyItMatters: string;
  controlMeasure: string;
}

export interface GeneratedBriefing {
  title: string;
  introduction: string;
  keyHazards: BriefingHazard[];
  discussionPoints: string[];
  keyTakeaway: string;
  estimatedDuration: number;
}

export interface GenerateBriefingResponse {
  success: boolean;
  briefing: GeneratedBriefing;
  htmlContent: string;
  generatedAt: string;
  targetDuration: number;
  error?: string;
}

/**
 * Hook to generate AI-powered toolbox talk briefing content
 */
export function useGenerateBriefing() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: GenerateBriefingInput): Promise<GenerateBriefingResponse> => {
      const { data, error } = await supabase.functions.invoke("generate-toolbox-talk", {
        body: input,
      });

      if (error) throw error;
      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      return data as GenerateBriefingResponse;
    },
    onSuccess: () => {
      toast({
        title: "Briefing generated",
        description: "AI has created your toolbox talk content.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation failed",
        description: error.message || "Could not generate briefing content.",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to generate briefing content from a template
 */
export function useGenerateFromTemplate() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      templateContent,
      customContext,
    }: {
      templateContent: string;
      customContext?: Partial<GenerateBriefingInput>;
    }): Promise<GenerateBriefingResponse> => {
      const { data, error } = await supabase.functions.invoke("generate-toolbox-talk", {
        body: {
          templateContent,
          ...customContext,
        },
      });

      if (error) throw error;
      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      return data as GenerateBriefingResponse;
    },
    onSuccess: () => {
      toast({
        title: "Content customised",
        description: "Template has been adapted for your context.",
      });
    },
    onError: (error) => {
      toast({
        title: "Customisation failed",
        description: error.message || "Could not adapt template.",
        variant: "destructive",
      });
    },
  });
}
