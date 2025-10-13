import { parseAgentResponse, ParsedSection, cleanAgentText } from "@/utils/agentTextProcessor";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Brain, BookOpen, Loader2 } from "lucide-react";
import { useMemo, memo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { AgentFeedbackButtons } from "./AgentFeedbackButtons";
import {
  CircuitSpecCard,
  RiskMatrixCard,
  InstallationStepsCard,
  TestSequenceCard
} from "./response-cards";
import { DesignerCircuitCards } from "./DesignerCircuitCards";
import { CostEngineerCards } from "./CostEngineerCards";
import { AgentReasoningDrawer } from "./AgentReasoningDrawer";
import { CitationBadge } from "./CitationBadge";
import { MultiCircuitRenderer } from "./MultiCircuitRenderer";
import { AgentSuggestions } from "./AgentSuggestions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AgentResponseRendererProps {
  content: string;
  agentId?: string;
  structuredData?: any;
  enrichment?: any;
  citations?: any[];
  rendering?: any;
  conversationId?: string;
  question?: string;
  onSelectAgent?: (agentId: string) => void;
  isThinking?: boolean;
}

export const AgentResponseRenderer = memo(({ content, agentId, structuredData, enrichment, citations, rendering, conversationId, question, onSelectAgent, isThinking }: AgentResponseRendererProps) => {
  // ✅ ALL HOOKS FIRST - before any conditional logic
  const [showFullText, setShowFullText] = useState(false);
  const [showReasoningDrawer, setShowReasoningDrawer] = useState(false);
  
  // Extract enrichment data
  const displayHints = enrichment?.displayHints;
  const highlightTerms = displayHints?.highlightTerms || [];
  const callouts = rendering?.callouts || [];
  const enrichedCitations = citations || [];
  
  // Helper function to highlight terms in text
  const highlightText = (text: string, terms: string[]): React.ReactNode => {
    if (!terms || terms.length === 0 || !text) return text;
    
    let result: (string | JSX.Element)[] = [text];
    terms.forEach(term => {
      const newResult: (string | JSX.Element)[] = [];
      result.forEach((part) => {
        if (typeof part !== 'string') {
          newResult.push(part);
          return;
        }
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = part.split(regex);
        parts.forEach((chunk, i) => {
          if (regex.test(chunk)) {
            newResult.push(<mark key={`${term}-${i}`} className="bg-elec-yellow/30 px-1 rounded">{chunk}</mark>);
          } else if (chunk) {
            newResult.push(chunk);
          }
        });
      });
      result = newResult;
    });
    return <>{result}</>;
  };
  // ROBUST NARRATIVE TEXT - Try multiple sources with clear priority and clean markdown
  const narrativeText = useMemo(() => {
    const sources = [
      content?.trim(),
      structuredData?.response?.trim(),
      structuredData?.design?.narrative?.trim(),
      structuredData?.explanation?.trim()
    ];
    
    const found = sources.find(s => s && s.length > 0);
    if (!found && agentId === 'designer') {
      console.warn('⚠️ AgentResponseRenderer: No narrative text found for designer', { 
        hasContent: !!content, 
        hasStructuredResponse: !!structuredData?.response,
        structuredDataKeys: Object.keys(structuredData || {})
      });
    }
    // Clean markdown asterisks and formatting
    return cleanAgentText(found || '');
  }, [content, structuredData, agentId]);
  
  // Detect opening line for visual separation
  const openingLine = useMemo(() => {
    if (agentId === 'commissioning') {
      const match = narrativeText.match(/^(Right then.*?(?:\.|$))/i);
      return match ? match[1] : null;
    }
    if (agentId === 'health-safety') {
      const match = narrativeText.match(/^(Alright team.*?(?:\.|$))/i);
      return match ? match[1] : null;
    }
    return null;
  }, [narrativeText, agentId]);
  
  // Strip opening line from content to avoid duplication
  const contentWithoutOpening = useMemo(() => {
    if (openingLine) {
      return narrativeText.replace(openingLine, '').trim();
    }
    return narrativeText;
  }, [narrativeText, openingLine]);
  
  // Memoize parsed sections - use narrativeText, not content
  const sections = useMemo(() => parseAgentResponse(contentWithoutOpening || narrativeText), [contentWithoutOpening, narrativeText]);
  
  // Determine which structured card to show based on agent and data
  const hasStructuredData = structuredData && Object.keys(structuredData).length > 0;
  
  const agentNames: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Planner',
    'commissioning': 'Commissioning Expert',
    'health-safety': 'Health & Safety Officer'
  };
  
  // ✅ CONDITIONAL RENDER - After all hooks
  if (isThinking) {
    return (
      <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary/40 rounded-r-lg animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin text-primary mt-1" />
        <p className="text-sm text-muted-foreground italic">{content}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 text-left max-w-full overflow-hidden">
      {/* Enriched Callouts/Warnings */}
      {callouts.length > 0 && callouts.filter((c: any) => c.placement === 'top').map((callout: any, idx: number) => (
        <Alert key={`callout-${idx}`} variant={callout.type === 'warning' ? 'destructive' : 'default'} className="border-l-4">
          <AlertDescription>{callout.content}</AlertDescription>
        </Alert>
      ))}
      
      {/* PHASE 3: Safety Warnings */}
      {structuredData?.safetyWarnings && structuredData.safetyWarnings.length > 0 && (
        <div className="space-y-2">
          {structuredData.safetyWarnings.map((warning: any, idx: number) => (
            <div 
              key={idx}
              className={`px-4 py-3 border-l-4 rounded-r ${
                warning.severity === 'critical' ? 'bg-red-500/10 border-red-500' :
                warning.severity === 'warning' ? 'bg-orange-500/10 border-orange-500' :
                'bg-blue-500/10 border-blue-500'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{warning.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{warning.message}</p>
              {warning.checklistItems && (
                <ul className="text-xs space-y-1 mt-2">
                  {warning.checklistItems.slice(0, 3).map((item: string, i: number) => (
                    <li key={i} className="text-foreground/80">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Opening Line Badge */}
      {openingLine && (
        <div className="px-4 py-3 bg-elec-yellow/10 border-l-4 border-elec-yellow rounded-r">
          <p className="text-base font-semibold text-elec-yellow">
            {openingLine}
          </p>
        </div>
      )}
      
      
      {/* Designer: Show RAG results if no narrative but citations exist */}
      {agentId === 'designer' && narrativeText.length <= 10 && structuredData?.citations && structuredData.citations.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-yellow/5">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              RAG Results - Referenced Regulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {structuredData.citations.slice(0, 5).map((citation: any, idx: number) => (
              <div key={idx} className="text-sm border-l-2 border-elec-yellow/40 pl-3 py-1">
                <p className="font-semibold text-elec-yellow">{citation.section}</p>
                <p className="text-xs text-muted-foreground">{citation.content?.slice(0, 150)}...</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {/* Designer: Warning if no narrative AND no citations */}
      {agentId === 'designer' && narrativeText.length <= 10 && (!structuredData?.citations || structuredData.citations.length === 0) && (
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="py-3">
            <p className="text-sm text-orange-500">
              ⚠️ No response returned from designer. Check edge function logs.
            </p>
          </CardContent>
        </Card>
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
                designCurrent: structuredData.design?.designCurrent || structuredData.calculations?.Ib,
                deviceRating: structuredData.design?.mcbRating || 
                  (structuredData.design?.protectionDevice 
                    ? parseInt(structuredData.design.protectionDevice.match(/(\d+)A/)?.[1] || '0', 10) || undefined
                    : structuredData.design?.deviceRating),
                correctedCapacity: structuredData.calculations?.Iz || structuredData.design?.correctedCapacity,
                correctionFactors: structuredData.design?.correctionFactors,
                earthFault: structuredData.design?.earthFault,
                voltageDrop: structuredData.design?.voltageDrop
              }}
              planData={structuredData.design?.planData}
              citations={structuredData.citations}
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
      
      {/* Installer - RAG Sources Preview */}
      {agentId === 'installer' && structuredData.ragPreview && structuredData.ragPreview.length > 0 && (
        <Collapsible className="mt-3">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-between text-xs border-elec-yellow/30">
              <span className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                Sources from BS 7671 ({structuredData.ragPreview.length})
              </span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {structuredData.ragPreview.map((source: any, idx: number) => (
              <Card key={idx} className="border-muted/30 bg-muted/10">
                <CardContent className="p-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-elec-yellow truncate">
                        {source.number || `Reference ${idx + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">{source.section}</p>
                      <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{source.excerpt}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 px-2 text-xs flex-shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText(`${source.number} - ${source.section}\n${source.excerpt}`);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
          
          {/* Commissioning - Test Sequence Card */}
          {agentId === 'commissioning' && structuredData.testSequence && (
            <TestSequenceCard data={structuredData} />
          )}
          
          {/* Cost Engineer - Cost Breakdown Cards */}
          {agentId === 'cost-engineer' && structuredData.materials && structuredData.labour && structuredData.summary && (
            <CostEngineerCards data={{
              materials: structuredData.materials,
              labour: structuredData.labour,
              valueEngineering: structuredData.valueEngineering,
              summary: structuredData.summary
            }} />
          )}
        </div>
      )}
      
      
      {/* Full Text Response (collapsible if structured data exists) */}
      {hasStructuredData && agentId !== 'designer' ? (
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
      
      {/* Agent Suggestions - Next Steps */}
      {agentId === 'designer' && structuredData?.suggestedNextAgents && structuredData.suggestedNextAgents.length > 0 && onSelectAgent && (
        <div className="mt-4">
          <AgentSuggestions 
            suggestions={structuredData.suggestedNextAgents} 
            onSelectAgent={onSelectAgent}
          />
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
