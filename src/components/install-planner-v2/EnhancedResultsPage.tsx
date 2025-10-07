import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Lightbulb, MessageSquare, Share2, History } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WhatsAppShareButton } from "./WhatsAppShareButton";

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
    <div className="space-y-4">
      {/* Compact Header */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{projectName}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedAgents.length} specialist{selectedAgents.length !== 1 ? 's' : ''} consulted
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onExport} className="flex-1 sm:flex-none">
              <Download className="w-3 h-3 mr-2" />
              Export
            </Button>
            {projectId && (
              <WhatsAppShareButton
                projectId={projectId}
                projectName={projectName}
              />
            )}
            <Button variant="outline" size="sm" onClick={onNewConsultation} className="flex-1 sm:flex-none">
              <RotateCcw className="w-3 h-3 mr-2" />
              New
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="circuits">Circuits ({circuits.length})</TabsTrigger>
          <TabsTrigger value="specialists">Specialists</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{projectDescription}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">{circuits.length}</div>
                  <div className="text-xs text-muted-foreground">Circuits Designed</div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">{selectedAgents.length}</div>
                  <div className="text-xs text-muted-foreground">Specialists Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Circuits Tab */}
        <TabsContent value="circuits" className="space-y-3">
          {circuits.length > 0 ? (
            circuits.map((circuit, idx) => (
              <Card key={circuit.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Circuit {idx + 1}: {circuit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Load: {circuit.load}W</p>
                  </div>
                  <Badge variant="secondary">{circuit.mcbRating || 'N/A'}</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  {circuit.cableSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cable Size:</span>
                      <span className="font-medium">{circuit.cableSize}</span>
                    </div>
                  )}
                  {circuit.protection && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protection:</span>
                      <span className="font-medium">{circuit.protection}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No circuits designed yet.</p>
            </Card>
          )}
        </TabsContent>

        {/* Specialists Tab */}
        <TabsContent value="specialists" className="space-y-3">
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
                    <CollapsibleTrigger className="w-full">
                      <div className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${agent?.color || 'bg-muted'} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-xl">{agent?.emoji || '👤'}</span>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold">{agent?.name || agentId}</h3>
                            <p className="text-xs text-muted-foreground">
                              {hasContent ? 'Tap to view details' : 'No response recorded'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={hasContent ? 'default' : 'secondary'}>
                          {hasContent ? 'Complete' : 'Pending'}
                        </Badge>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                        {hasContent ? (
                          <>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
                              {lastResponse}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
