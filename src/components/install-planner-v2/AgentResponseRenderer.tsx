import { parseAgentResponse, ParsedSection } from "@/utils/agentTextProcessor";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Brain, BookOpen } from "lucide-react";
import { useMemo, memo, useState } from "react";
import { AgentFeedbackButtons } from "./AgentFeedbackButtons";
import {
  CircuitSpecCard,
  RiskMatrixCard,
  InstallationStepsCard,
  TestSequenceCard
} from "./response-cards";
import { DesignerCircuitCards } from "./DesignerCircuitCards";
import { AgentReasoningDrawer } from "./AgentReasoningDrawer";
import { CitationBadge } from "./CitationBadge";
import { MultiCircuitRenderer } from "./MultiCircuitRenderer";

interface AgentResponseRendererProps {
  content: string;
  agentId?: string;
  structuredData?: any;
  conversationId?: string;
  question?: string;
}

export const AgentResponseRenderer = memo(({ content, agentId, structuredData, conversationId, question }: AgentResponseRendererProps) => {
  const [showFullText, setShowFullText] = useState(false);
  const [showReasoningDrawer, setShowReasoningDrawer] = useState(false);
  
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
  
  const agentNames: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Planner',
    'commissioning': 'Commissioning Expert',
    'health-safety': 'Health & Safety Officer'
  };
  
  return (
    <div className="space-y-4 text-left max-w-full overflow-hidden">
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
        <div className="space-y-3 max-w-full overflow-hidden">
          {/* Designer Agent - Multi-Circuit Renderer (NEW) */}
          {agentId === 'designer' && structuredData.design?.circuits && Array.isArray(structuredData.design.circuits) && structuredData.design.circuits.length > 1 && (
            <MultiCircuitRenderer data={structuredData.design} />
          )}
          
          {/* Designer Agent - Legacy Multi-Circuit Cards (fallback for single structured circuit) */}
        {agentId === 'designer' && structuredData.design?.circuits && Array.isArray(structuredData.design.circuits) && structuredData.design.circuits.length === 1 && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-3">
              {structuredData.design.circuits.length} circuit designed • 
              Total Load: {structuredData.design.totalLoadKW ? `${structuredData.design.totalLoadKW}kW` : 'Data missing'}
              {structuredData.design.diversifiedLoad && ` • Diversified: ${(structuredData.design.diversifiedLoad/1000).toFixed(1)}kW`}
            </div>
            <DesignerCircuitCards circuits={structuredData.design.circuits.filter(c => c.id && c.name && c.calculations)} />
          </div>
        )}
          
          {/* Designer Agent - Single Circuit Spec Card */}
          {agentId === 'designer' && structuredData.design?.cableSize && !structuredData.design?.circuits && (
            <CircuitSpecCard 
              data={{
                ...structuredData.design,
                voltageDrop: typeof structuredData.design.voltageDrop === 'number' 
                  ? {
                      percentage: structuredData.design.voltageDrop,
                      actual: (structuredData.design.voltageDrop / 100) * (structuredData.design?.voltage || 230),
                      limit: 5,
                      compliant: structuredData.design.voltageDrop <= 5
                    }
                  : structuredData.design.voltageDrop
              }}
              planData={structuredData.design?.planData}
            />
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
        // Designer with structured data: Show fallback if response is empty
        !content.trim() ? (
          <p className="text-sm text-muted-foreground">
            ✅ Circuit design complete. Review the technical specifications in the card above.
          </p>
        ) : null
      ) : hasStructuredData ? (
        // Other agents with structured data: show collapsible full text
        <Collapsible open={showFullText} onOpenChange={setShowFullText}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8 text-muted-foreground"
            >
              <span className="truncate"><span className="hidden sm:inline">View Full Agent Response & Reasoning</span><span className="sm:hidden">Details</span></span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFullText ? 'rotate-180' : ''} flex-shrink-0`} />
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
      
      {/* Agent Reasoning Button */}
      {hasStructuredData && (structuredData.reasoningSteps || structuredData.regulationsConsulted || structuredData.assumptionsMade) && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowReasoningDrawer(true)}
          className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10 mt-4 text-xs sm:text-sm"
        >
          <Brain className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="hidden sm:inline ml-1.5 truncate">Full Agent Reasoning</span>
          <span className="sr-only">Agent Reasoning</span>
        </Button>
      )}
      
      {/* Citations Section */}
      {structuredData?.citations && structuredData.citations.length > 0 && (
        <div className="border-t border-border/50 pt-3 mt-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <BookOpen className="h-3 w-3" />
            Regulations & Knowledge Consulted
          </p>
          <div className="flex flex-wrap gap-2">
            {structuredData.citations.map((cite: any, idx: number) => (
              <CitationBadge key={idx} citation={cite} />
            ))}
          </div>
        </div>
      )}
      
      {/* Agent Reasoning Drawer */}
      {agentId && (
        <AgentReasoningDrawer
          open={showReasoningDrawer}
          onClose={() => setShowReasoningDrawer(false)}
          agentName={agentNames[agentId] || agentId}
          data={structuredData || {}}
        />
      )}
      
      {/* Feedback Buttons */}
      {agentId && question && (
        <AgentFeedbackButtons
          agentId={agentId}
          agentName={agentNames[agentId] || agentId}
          question={question}
          response={content}
          structuredData={structuredData}
          conversationId={conversationId}
        />
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
