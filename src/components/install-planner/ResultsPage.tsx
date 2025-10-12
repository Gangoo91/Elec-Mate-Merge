import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Lightbulb, MessageSquare } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { parseAgentResponse } from "@/utils/agentTextProcessor";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
  agentEmoji?: string;
}

interface ResultsPageProps {
  messages: Message[];
  selectedAgents: string[];
  onExport: () => void;
  onNewConsultation: () => void;
  onReEngageAgent?: (agentId: string) => void;
}

const AGENT_INFO: Record<string, { name: string; emoji: string }> = {
  designer: { name: 'Circuit Designer', emoji: '📐' },
  'cost-engineer': { name: 'Cost Engineer', emoji: '💷' },
  installer: { name: 'Installation Specialist', emoji: '🔧' },
  'health-safety': { name: 'Health & Safety Officer', emoji: '⚠️' },
  commissioning: { name: 'Testing & Commissioning', emoji: '✅' },
  compliance: { name: 'Compliance Specialist', emoji: '📋' }
};

export const ResultsPage = ({ messages, selectedAgents, onExport, onNewConsultation, onReEngageAgent }: ResultsPageProps) => {
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set(selectedAgents));
  
  // Extract agent responses from messages
  const agentResponses = messages.filter(
    m => m.role === 'assistant' && m.agentName
  );

  // Extract project overview from messages
  const userMessages = messages.filter(m => m.role === 'user');
  const projectDescription = userMessages[0]?.content || "Installation project";

  const toggleAgent = (agentId: string) => {
    setExpandedAgents(prev => {
      const next = new Set(prev);
      if (next.has(agentId)) {
        next.delete(agentId);
      } else {
        next.add(agentId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <Card className="p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
        <div className="space-y-3">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              Design Consultation Complete
            </h1>
            <p className="text-sm text-muted-foreground">
              {selectedAgents.length} specialist{selectedAgents.length !== 1 ? 's' : ''} consulted
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onExport} className="flex-1 sm:flex-none">
              <Download className="w-3 h-3 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onNewConsultation} className="flex-1 sm:flex-none">
              <RotateCcw className="w-3 h-3 mr-2" />
              New
            </Button>
          </div>
        </div>
      </Card>

      {/* Project Overview */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">Project Summary</h2>
        <p className="text-sm text-muted-foreground">{projectDescription}</p>
      </Card>

      {/* Specialist Contributions - Expandable Cards */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Specialist Contributions</h2>
        
        {selectedAgents.length > 0 ? (
          selectedAgents.map((agentId) => {
            const agent = AGENT_INFO[agentId];
            const agentMessages = messages.filter(m => m.agentName === agentId);
            const hasContent = agentMessages.length > 0;
            const isExpanded = expandedAgents.has(agentId);
            
            // Extract structured info from agent responses
            const lastResponse = agentMessages[agentMessages.length - 1]?.content || '';
            
            return (
              <Card key={agentId} className="overflow-hidden">
                <Collapsible open={isExpanded} onOpenChange={() => toggleAgent(agentId)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground">{agent?.name || agentId}</h3>
                          <p className="text-xs text-muted-foreground">
                            {hasContent ? 'Tap to view details' : 'No response recorded'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={hasContent ? 'default' : 'secondary'} className="ml-2">
                        {hasContent ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                      {hasContent ? (
                        <>
                          <div className="max-w-none text-sm space-y-3">
                            {parseAgentResponse(lastResponse).map((section, idx) => {
                              switch (section.type) {
                                case 'header':
                                  return (
                                    <h3 key={idx} className="text-base font-semibold text-foreground mt-4 first:mt-0 mb-2">
                                      {section.content}
                                    </h3>
                                  );
                                case 'paragraph':
                                  return (
                                    <p key={idx} className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                      {section.content}
                                    </p>
                                  );
                                case 'list':
                                  return (
                                    <ul key={idx} className="text-sm text-muted-foreground mb-3 space-y-1 pl-5">
                                      {section.items?.map((item, i) => (
                                        <li key={i} className="list-disc">{item}</li>
                                      ))}
                                    </ul>
                                  );
                                case 'calculation':
                                  return (
                                    <div key={idx} className="text-sm font-mono bg-muted/30 rounded px-3 py-2 mb-3 text-foreground">
                                      {section.content}
                                    </div>
                                  );
                                case 'citation':
                                  return (
                                    <p key={idx} className="text-xs italic text-muted-foreground border-l-2 border-elec-yellow/50 pl-3 mb-3">
                                      {section.content}
                                    </p>
                                  );
                                default:
                                  return null;
                              }
                            })}
                          </div>
                          
                          {onReEngageAgent && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onReEngageAgent(agentId)}
                              className="w-full"
                            >
                              <MessageSquare className="w-3 h-3 mr-2" />
                              Ask {agent?.name} a Follow-up
                            </Button>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          This specialist was not consulted during this session.
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No specialists selected for this consultation.</p>
          </Card>
        )}
      </div>
    </div>
  );
};
