import { parseAgentResponse, ParsedSection } from "@/utils/agentTextProcessor";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useMemo, memo, useState } from "react";
import {
  CircuitSpecCard,
  CostBreakdownCard,
  RiskMatrixCard,
  InstallationStepsCard,
  TestSequenceCard
} from "./response-cards";
import { DesignerCircuitCards } from "./DesignerCircuitCards";

interface AgentResponseRendererProps {
  content: string;
  agentId?: string;
  structuredData?: any;
}

export const AgentResponseRenderer = memo(({ content, agentId, structuredData }: AgentResponseRendererProps) => {
  const [showFullText, setShowFullText] = useState(false);
  
  // Detect opening line for visual separation
  const openingLine = useMemo(() => {
    if (agentId === 'commissioning') {
      const match = content.match(/^(Right then.*?(?:\.|$))/i);
      return match ? match[1] : null;
    }
    if (agentId === 'health-safety') {
      const match = content.match(/^(Alright team.*?(?:\.|$))/i);
      return match ? match[1] : null;
    }
    return null;
  }, [content, agentId]);
  
  // Strip opening line from content to avoid duplication
  const contentWithoutOpening = useMemo(() => {
    if (openingLine) {
      return content.replace(openingLine, '').trim();
    }
    return content;
  }, [content, openingLine]);
  
  // Memoize parsed sections - only re-parse if content changes (use stripped content)
  const sections = useMemo(() => parseAgentResponse(contentWithoutOpening || content), [contentWithoutOpening, content]);
  
  // Determine which structured card to show based on agent and data
  const hasStructuredData = structuredData && Object.keys(structuredData).length > 0;
  
  return (
    <div className="space-y-4 text-left">
      {/* Opening Line Badge */}
      {openingLine && (
        <div className="px-4 py-3 bg-elec-yellow/10 border-l-4 border-elec-yellow rounded-r">
          <p className="text-base font-semibold text-elec-yellow">
            {openingLine}
          </p>
        </div>
      )}
      
      {/* Structured Visual Cards (if available) */}
      {hasStructuredData && (
        <div className="space-y-3">
          {/* Designer Agent - Multi-Circuit Cards */}
          {agentId === 'designer' && structuredData.circuits && Array.isArray(structuredData.circuits) && structuredData.circuits.length > 0 && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-3">
                {structuredData.circuits.length} circuits designed • 
                Total Load: {structuredData.totalLoadKW || (structuredData.totalLoad/1000).toFixed(1)}kW
                {structuredData.diversifiedLoad && ` • Diversified: ${(structuredData.diversifiedLoad/1000).toFixed(1)}kW`}
              </div>
              <DesignerCircuitCards circuits={structuredData.circuits} />
            </div>
          )}
          
          {/* Designer Agent - Single Circuit Spec Card (legacy) */}
          {agentId === 'designer' && structuredData.cableSize && !structuredData.circuits && (
            <CircuitSpecCard 
              data={structuredData}
              planData={structuredData.planData}
            />
          )}
          
          {/* Cost Engineer - Cost Breakdown Card */}
          {agentId === 'cost-engineer' && (structuredData.materials || structuredData.totalCost) && (
            <CostBreakdownCard data={structuredData} />
          )}
          
          {/* Health & Safety - Risk Matrix Card */}
          {agentId === 'health-safety' && structuredData.riskAssessment && (
            <RiskMatrixCard data={structuredData} />
          )}
          
          {/* Installer - Installation Steps Card */}
          {agentId === 'installer' && structuredData.installationSteps && (
            <InstallationStepsCard data={structuredData} />
          )}
          
          {/* Commissioning - Test Sequence Card */}
          {agentId === 'commissioning' && structuredData.testSequence && (
            <TestSequenceCard data={structuredData} />
          )}
        </div>
      )}
      
      {/* Full Text Response (collapsible if structured data exists) */}
      {hasStructuredData && agentId === 'designer' ? (
        // Designer with structured data: ONLY show cards, hide text completely
        null
      ) : hasStructuredData ? (
        // Other agents with structured data: show collapsible full text
        <Collapsible open={showFullText} onOpenChange={setShowFullText}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8 text-muted-foreground"
            >
              <span>View Full Agent Response & Reasoning</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFullText ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-3">
            {sections.map((section, index) => (
              <SectionRenderer key={index} section={section} agentId={agentId} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        // No structured data - show text as normal
        sections.map((section, index) => (
          <SectionRenderer key={index} section={section} agentId={agentId} />
        ))
      )}
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
