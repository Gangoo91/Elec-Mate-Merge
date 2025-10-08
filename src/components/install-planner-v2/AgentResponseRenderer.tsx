import { parseAgentResponse, ParsedSection } from "@/utils/agentTextProcessor";
import { Separator } from "@/components/ui/separator";

interface AgentResponseRendererProps {
  content: string;
  agentId?: string;
}

export const AgentResponseRenderer = ({ content, agentId }: AgentResponseRendererProps) => {
  const sections = parseAgentResponse(content);
  
  return (
    <div className="space-y-4 text-left">
      {sections.map((section, index) => (
        <SectionRenderer key={index} section={section} agentId={agentId} />
      ))}
    </div>
  );
};

const SectionRenderer = ({ section, agentId }: { section: ParsedSection; agentId?: string }) => {
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
        <div className="px-4 py-3 bg-elec-card/50 border border-elec-yellow/20 rounded-lg">
          <code className="text-sm text-elec-yellow font-mono">
            {section.content}
          </code>
        </div>
      );
    
    case 'citation':
      return (
        <div className="px-4 py-2 bg-amber-500/10 border-l-4 border-amber-500 rounded-r">
          <p className="text-sm text-amber-200 font-medium">
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
};
