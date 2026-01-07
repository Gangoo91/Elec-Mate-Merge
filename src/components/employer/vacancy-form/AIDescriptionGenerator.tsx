import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ExperienceLevel } from "./schema";

interface AIDescriptionGeneratorProps {
  jobTitle: string;
  requirements: string[];
  experienceLevel?: ExperienceLevel;
  onGenerated: (description: string) => void;
}

export function AIDescriptionGenerator({
  jobTitle,
  requirements,
  experienceLevel,
  onGenerated,
}: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle) {
      toast({
        title: "Job title required",
        description: "Please enter a job title first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-job-description",
        {
          body: {
            jobTitle,
            requirements,
            experienceLevel: experienceLevel || "Mid",
          },
        }
      );

      if (error) throw error;

      if (data?.description) {
        onGenerated(data.description);
        toast({
          title: "Description generated",
          description: "AI has created a job description for you to customize",
        });
      } else {
        throw new Error("No description returned");
      }
    } catch (error) {
      console.error("AI generation error:", error);

      // Fallback to a template if AI fails
      const fallbackDescription = generateFallbackDescription(
        jobTitle,
        requirements,
        experienceLevel
      );
      onGenerated(fallbackDescription);

      toast({
        title: "Template applied",
        description: "Using a template description. Customize it for your role.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleGenerate}
      disabled={isGenerating || !jobTitle}
      className="gap-2 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/10"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </>
      )}
    </Button>
  );
}

// Fallback template generator
function generateFallbackDescription(
  jobTitle: string,
  requirements: string[],
  experienceLevel?: ExperienceLevel
): string {
  const levelText = {
    Entry: "entry-level",
    Mid: "experienced",
    Senior: "senior",
    Lead: "lead",
  };

  const level = levelText[experienceLevel || "Mid"];

  return `<h2>About the Role</h2>
<p>We are looking for a ${level} ${jobTitle} to join our growing team. This is an excellent opportunity for someone who is passionate about delivering high-quality electrical work and wants to be part of a professional, supportive team.</p>

<h2>Key Responsibilities</h2>
<ul>
<li>Carry out electrical installations, maintenance, and repairs to the highest standards</li>
<li>Ensure all work complies with BS7671 and relevant regulations</li>
<li>Complete accurate documentation and certification</li>
<li>Communicate effectively with clients and team members</li>
<li>Maintain a clean and safe working environment</li>
</ul>

<h2>What We're Looking For</h2>
<ul>
${requirements.map((req) => `<li>${req}</li>`).join("\n")}
</ul>

<h2>What We Offer</h2>
<ul>
<li>Competitive salary based on experience</li>
<li>Ongoing training and development opportunities</li>
<li>Supportive team environment</li>
<li>Modern tools and equipment</li>
</ul>

<p>If you're ready to take the next step in your career, we'd love to hear from you. Apply now!</p>`;
}
