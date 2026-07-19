import { Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { ExperienceLevel } from './schema';
import { SecondaryButton } from '@/components/employer/editorial';

interface AIDescriptionGeneratorProps {
  jobTitle: string;
  requirements: string[];
  experienceLevel?: ExperienceLevel;
  onGenerated: (description: string) => void;
}

/**
 * Drafts a structured job description from the role details already entered.
 * Honest by design: this is a template built from the employer's own inputs —
 * the previous version invoked an edge function that has never existed, so
 * every "AI" generation silently fell back to this template anyway while
 * claiming AI authorship.
 */
export function AIDescriptionGenerator({
  jobTitle,
  requirements,
  experienceLevel,
  onGenerated,
}: AIDescriptionGeneratorProps) {
  const handleGenerate = () => {
    if (!jobTitle) {
      toast({
        title: 'Job title required',
        description: 'Please enter a job title first',
        variant: 'destructive',
      });
      return;
    }

    onGenerated(buildDescription(jobTitle, requirements, experienceLevel));

    toast({
      title: 'Draft description added',
      description: 'Built from your role details — customise it before publishing.',
    });
  };

  return (
    <SecondaryButton
      type="button"
      onClick={handleGenerate}
      disabled={!jobTitle}
      size="sm"
      className="gap-2 text-elec-yellow border-elec-yellow/25 hover:bg-elec-yellow/10"
    >
      <Sparkles className="h-4 w-4" />
      Draft description
    </SecondaryButton>
  );
}

function buildDescription(
  jobTitle: string,
  requirements: string[],
  experienceLevel?: ExperienceLevel
): string {
  const levelText: Record<ExperienceLevel, string> = {
    Entry: 'entry-level',
    Mid: 'experienced',
    Senior: 'senior',
    Lead: 'lead',
  };

  const level = levelText[experienceLevel || 'Mid'];

  return `<h2>About the Role</h2>
<p>We are looking for a ${level} ${jobTitle} to join our growing team. This is an excellent opportunity for someone who is passionate about delivering high-quality electrical work and wants to be part of a professional, supportive team.</p>

<h2>Key Responsibilities</h2>
<ul>
<li>Carry out electrical installations, maintenance, and repairs to the highest standards</li>
<li>Ensure all work complies with BS 7671 and relevant regulations</li>
<li>Complete accurate documentation and certification</li>
<li>Communicate effectively with clients and team members</li>
<li>Maintain a clean and safe working environment</li>
</ul>

<h2>What We're Looking For</h2>
<ul>
${requirements.map((req) => `<li>${req}</li>`).join('\n')}
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
