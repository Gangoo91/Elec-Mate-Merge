import { parseAgentResponse, ParsedSection } from "@/utils/agentTextProcessor";
import { Separator } from "@/components/ui/separator";
import { useMemo, memo } from "react";

interface AgentResponseRendererProps {
  content: string;
  agentId?: string;
}

export const AgentResponseRenderer = memo(({ content, agentId }: AgentResponseRendererProps) => {
  // Memoize parsed sections - only re-parse if content changes
  const sections = useMemo(() => parseAgentResponse(content), [content]);
  
  return (
    <div className="space-y-4 text-left">
      {sections.map((section, index) => (
        <SectionRenderer key={index} section={section} agentId={agentId} />
      ))}
    </div>
  );
});

const SectionRenderer = memo(({ section, agentId }: { section: ParsedSection; agentId?: string }) => {
  switch (section.type) {
    case 'header':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-elec-yellow rounded-full" />
            <h3 className="text-base font-semibold text-elec-yellow uppercase tracking-wide">
              {section.content}
            </h3>
          </div>
          <Separator className="bg-elec-yellow/20" />
        </div>
      );
    
    case 'list':
      return (
        <ul className="space-y-2 ml-0">
          {section.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elec-yellow flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      );
    
    case 'calculation':
      return (
        <div className="px-4 py-3 bg-muted/30 border-l-2 border-elec-yellow/40 rounded">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {section.content}
          </p>
        </div>
      );
    
    case 'citation':
      return (
        <div className="px-4 py-2 border-l-2 border-muted-foreground/30 bg-muted/20 rounded-r">
          <p className="text-sm text-white/70 italic">
            {section.content}
          </p>
        </div>
      );
    
    case 'paragraph':
      return (
        <p className="text-sm leading-relaxed text-foreground">
          {section.content}
        </p>
      );
    
    default:
      return null;
  }
});
