import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface EnhancedStepContentProps {
  content: string;
}

export const EnhancedStepContent = ({ content }: EnhancedStepContentProps) => {
  // Parse content into sections (for backwards compatibility with flat content)
  const sections = parseStepContent(content);
  
  return (
    <div className="space-y-4">
      {/* Overview */}
      {sections.overview && (
        <p className="text-base text-foreground leading-relaxed font-medium text-left">
          {highlightMeasurements(sections.overview)}
        </p>
      )}
      
      {/* Detailed Sub-Steps (flat format) */}
      {sections.subSteps.length > 0 && (
        <div className="space-y-3 pl-2 border-l-2 border-primary/30">
          {sections.subSteps.map((subStep, idx) => (
            <div key={idx} className="pl-4">
              <div className="font-semibold text-foreground mb-1.5 flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span>{subStep.title}</span>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground ml-8">
                {subStep.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{highlightMeasurements(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
      {/* BS 7671 References */}
      {sections.regulations.length > 0 && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-400 mb-1">Regulatory References</p>
              <div className="flex flex-wrap gap-2">
                {sections.regulations.map((reg, idx) => (
                  <Badge key={idx} className="bg-blue-500/20 text-blue-100 border-blue-400/30">
                    {reg}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper: Parse step content into structured sections
function parseStepContent(content: string) {
  if (!content || typeof content !== 'string') {
    return { overview: '', subSteps: [], regulations: [] };
  }
  const lines = content.split('\n').filter(l => l.trim());
  
  let overview = '';
  const subSteps: Array<{ title: string; items: string[] }> = [];
  const regulations: string[] = [];
  let currentSubStep: { title: string; items: string[] } | null = null;
  
  for (const line of lines) {
    // BS 7671 references
    if (line.match(/BS 7671|Reg \d+|Section \d+|Table \d+|Appendix \d+/i)) {
      const regMatch = line.match(/(BS 7671[^.]+|Reg \d+\.\d+\.\d+|Section \d+|Table \d+[A-Z]*\d*)/i);
      if (regMatch) regulations.push(regMatch[0]);
    }
    
    // Numbered sub-step title (e.g., "1. Mark Fixing Positions")
    if (line.match(/^\d+\.\s+[A-Z]/)) {
      if (currentSubStep) subSteps.push(currentSubStep);
      currentSubStep = {
        title: line.replace(/^\d+\.\s+/, ''),
        items: []
      };
    }
    // Bullet point item
    else if (line.match(/^[•\-\*]\s+/) && currentSubStep) {
      currentSubStep.items.push(line.replace(/^[•\-\*]\s+/, ''));
    }
    // Overview (first non-empty lines before first numbered step)
    else if (!currentSubStep && subSteps.length === 0 && !line.match(/^#/)) {
      overview += (overview ? ' ' : '') + line.trim();
    }
  }
  
  if (currentSubStep) subSteps.push(currentSubStep);
  
  return { overview, subSteps, regulations: [...new Set(regulations)] };
}

// Helper: Highlight measurements and technical terms
function highlightMeasurements(text: string) {
  const parts = text.split(/(\d+(?:\.\d+)?(?:mm|m|A|V|W|kW|Ω|MΩ|mA|°C|Hz))/g);
  
  return (
    <>
      {parts.map((part, idx) => {
        if (part.match(/\d+(?:\.\d+)?(?:mm|m|A|V|W|kW|Ω|MΩ|mA|°C|Hz)/)) {
          return (
            <Badge key={idx} variant="outline" className="mx-1 bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 font-mono">
              {part}
            </Badge>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}
