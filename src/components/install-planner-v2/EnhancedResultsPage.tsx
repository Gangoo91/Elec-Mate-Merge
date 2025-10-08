import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Lightbulb, MessageSquare, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WhatsAppShareButton } from "./WhatsAppShareButton";
import { AgentResponseRenderer } from "./AgentResponseRenderer";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
}

interface Circuit {
  id: string;
  name: string;
  load: number;
  mcbRating?: string;
  cableSize?: string;
  protection?: string;
}

interface EnhancedResultsPageProps {
  messages: Message[];
  selectedAgents: string[];
  circuits?: Circuit[];
  projectId?: string;
  projectName?: string;
  onExport: () => void;
  onNewConsultation: () => void;
  onReEngageAgent?: (agentId: string) => void;
}

const AGENT_INFO: Record<string, { name: string; emoji: string; color: string }> = {
  designer: { name: 'Circuit Designer', emoji: '📐', color: 'bg-blue-500/10 text-blue-500' },
  'cost-engineer': { name: 'Cost Engineer', emoji: '💷', color: 'bg-green-500/10 text-green-500' },
  installer: { name: 'Installation Specialist', emoji: '🔧', color: 'bg-orange-500/10 text-orange-500' },
  'health-safety': { name: 'Health & Safety Officer', emoji: '⚠️', color: 'bg-red-500/10 text-red-500' },
  commissioning: { name: 'Testing & Commissioning', emoji: '✅', color: 'bg-purple-500/10 text-purple-500' },
  compliance: { name: 'Compliance Specialist', emoji: '📋', color: 'bg-yellow-500/10 text-yellow-500' }
};

export const EnhancedResultsPage = ({
  messages,
  selectedAgents,
  circuits = [],
  projectId,
  projectName = "Installation Design",
  onExport,
  onNewConsultation,
  onReEngageAgent
}: EnhancedResultsPageProps) => {
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set(selectedAgents));
  const [activeTab, setActiveTab] = useState("overview");

  const agentResponses = messages.filter(m => m.role === 'assistant' && m.agentName);
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
    <div className="space-y-4 md:space-y-6">
      {/* Mobile-First Header */}
      <Card className="p-4 md:p-6 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{projectName}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedAgents.length} specialist{selectedAgents.length !== 1 ? 's' : ''} consulted
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="default" 
              size="default" 
              onClick={onExport} 
              className="flex-1 sm:flex-none min-h-[44px]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Package
            </Button>
            {projectId && (
              <WhatsAppShareButton
                projectId={projectId}
                projectName={projectName}
              />
            )}
            <Button 
              variant="outline" 
              size="default" 
              onClick={onNewConsultation} 
              className="flex-1 sm:flex-none min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Consultation
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobile-Optimized Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="circuits" className="text-xs sm:text-sm py-2.5">
            Circuits ({circuits.length})
          </TabsTrigger>
          <TabsTrigger value="specialists" className="text-xs sm:text-sm py-2.5">Specialists</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed text-foreground">
                {projectDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4">
                <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                  <div className="text-3xl font-bold text-elec-yellow">{circuits.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Circuits Designed</div>
                </div>
                <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                  <div className="text-3xl font-bold text-elec-yellow">{selectedAgents.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Specialists Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Circuits Tab */}
        <TabsContent value="circuits" className="space-y-3 mt-4">
          {circuits.length > 0 ? (
            circuits.map((circuit, idx) => (
              <Card key={circuit.id} className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base">
                      Circuit {idx + 1}: {circuit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Load: {circuit.load}W</p>
                  </div>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {circuit.mcbRating || 'N/A'}
                  </Badge>
                </div>
                
                <div className="space-y-2.5 text-sm md:text-base">
                  {circuit.cableSize && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">Cable Size:</span>
                      <span className="font-medium text-foreground">{circuit.cableSize}</span>
                    </div>
                  )}
                  {circuit.protection && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">Protection:</span>
                      <span className="font-medium text-foreground">{circuit.protection}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 md:p-12 text-center">
              <p className="text-muted-foreground text-base">No circuits designed yet.</p>
            </Card>
          )}
        </TabsContent>

        {/* Specialists Tab - Mobile-First Design */}
        <TabsContent value="specialists" className="space-y-3 mt-4">
          {selectedAgents.length > 0 ? (
            selectedAgents.map((agentId) => {
              const agent = AGENT_INFO[agentId];
              const agentMessages = messages.filter(m => m.agentName === agentId);
              const hasContent = agentMessages.length > 0;
              const isExpanded = expandedAgents.has(agentId);
              const lastResponse = agentMessages[agentMessages.length - 1]?.content || '';
              
              return (
                <Card key={agentId} className="overflow-hidden">
                  <Collapsible open={isExpanded} onOpenChange={() => toggleAgent(agentId)}>
                    <CollapsibleTrigger className="w-full min-h-[60px] touch-manipulation">
                      <div className="p-4 md:p-5 flex items-center justify-between hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-full ${agent?.color || 'bg-muted'} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-2xl">{agent?.emoji || '👤'}</span>
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h3 className="font-semibold text-base text-foreground">
                              {agent?.name || agentId}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {hasContent ? 'Tap to view details' : 'No response recorded'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <Badge variant={hasContent ? 'default' : 'secondary'}>
                            {hasContent ? 'Complete' : 'Pending'}
                          </Badge>
                          <ChevronDown 
                            className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-4 border-t border-border pt-4">
                        {hasContent ? (
                          <>
                            <AgentResponseRenderer 
                              content={lastResponse} 
                              agentId={agentId}
                            />
                            
                            {onReEngageAgent && (
                              <Button
                                variant="outline"
                                size="default"
                                onClick={() => onReEngageAgent(agentId)}
                                className="w-full min-h-[44px] mt-4"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask {agent?.name} a Follow-up
                              </Button>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-6">
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
            <Card className="p-8 md:p-12 text-center">
              <p className="text-muted-foreground text-base">No specialists selected for this consultation.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
