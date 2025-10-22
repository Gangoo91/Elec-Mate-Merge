import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, Download, ChevronDown, ChevronUp, Play } from "lucide-react";
import { generateProjectPDFs } from "@/utils/project-pdf-generator";

interface ConsultationResult {
  id: string;
  agent_type: string;
  output_data: any;
  completed_at: string;
}

const AGENT_INFO: Record<string, { name: string; emoji: string; color: string }> = {
  'designer': { name: 'Circuit Designer', emoji: '📐', color: 'bg-blue-500/10 border-blue-500/30' },
  'cost-engineer': { name: 'Cost Engineer', emoji: '💷', color: 'bg-green-500/10 border-green-500/30' },
  'installer': { name: 'Installation Specialist', emoji: '🔧', color: 'bg-orange-500/10 border-orange-500/30' },
  'health-safety': { name: 'Health & Safety', emoji: '⚠️', color: 'bg-red-500/10 border-red-500/30' },
  'commissioning': { name: 'Testing & Commissioning', emoji: '✅', color: 'bg-purple-500/10 border-purple-500/30' },
  'project-manager': { name: 'Project Manager', emoji: '📋', color: 'bg-cyan-500/10 border-cyan-500/30' }
};

export const ConsultationResults = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // PHASE 5: Resume conversation with agent
  const resumeWithAgent = (agentType: string, messages: any[], planData: any) => {
    navigate('/electrician/install-planner?mode=ai', {
      state: {
        resumeMessages: messages,
        resumePlanData: planData,
        targetAgent: agentType
      }
    });
  };
  const [results, setResults] = useState<ConsultationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchResults();
  }, [conversationId]);

  const fetchResults = async () => {
    if (!conversationId) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('consultation_results')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('completed_at', { ascending: true });

      if (error) throw error;
      setResults(data || []);
      
      // Expand all agents by default
      if (data) {
        setExpandedAgents(new Set(data.map(r => r.agent_type)));
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      toast({
        title: "Error",
        description: "Failed to load consultation results",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Build agent outputs
      const agentOutputs: any = {};
      results.forEach(result => {
        if (result.agent_type === 'designer') agentOutputs.installer = result.output_data;
        if (result.agent_type === 'cost-engineer') agentOutputs.costEngineer = result.output_data;
        if (result.agent_type === 'health-safety') agentOutputs.healthSafety = result.output_data;
      });

      const projectDetails = {
        conversationId,
        generatedAt: new Date().toISOString()
      };

      const projectExport: any = { generatedPDFs: [] };

      await generateProjectPDFs(session.user.id, agentOutputs, projectDetails, projectExport);

      toast({
        title: "PDFs Generated",
        description: `${projectExport.generatedPDFs.length} documents created successfully`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to generate PDFs",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };

  const toggleAgent = (agentType: string) => {
    setExpandedAgents(prev => {
      const next = new Set(prev);
      if (next.has(agentType)) {
        next.delete(agentType);
      } else {
        next.add(agentType);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <div className="text-muted-foreground">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Consultation Results
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {results.length} {results.length === 1 ? 'specialist' : 'specialists'} completed
              </p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            disabled={exporting || results.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Exporting...' : 'Export PDFs'}
          </Button>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <Card className="bg-elec-card border-elec-border">
            <CardContent className="py-12 text-center text-muted-foreground">
              No consultation results available yet
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result) => {
              const agentInfo = AGENT_INFO[result.agent_type];
              const isExpanded = expandedAgents.has(result.agent_type);
              
              return (
                <Card key={result.id} className={`bg-elec-card border ${agentInfo?.color || 'border-elec-border'}`}>
                  <Collapsible open={isExpanded} onOpenChange={() => toggleAgent(result.agent_type)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <span className="text-2xl">{agentInfo?.emoji}</span>
                            <div>
                              <div className="text-lg">{agentInfo?.name || result.agent_type}</div>
                              <div className="text-xs text-muted-foreground font-normal">
                                Completed {new Date(result.completed_at).toLocaleString()}
                              </div>
                            </div>
                          </CardTitle>
                          <Button variant="ghost" size="sm">
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-4">
                        {/* Render agent output with better formatting */}
                        {result.output_data?.response ? (
                          <div className="prose prose-invert prose-sm max-w-none">
                            <div 
                              className="text-sm leading-relaxed whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ 
                                __html: result.output_data.response
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n\n/g, '</p><p class="mt-3">')
                                  .replace(/^(.+)$/, '<p>$1</p>')
                              }}
                            />
                          </div>
                        ) : (
                          <div className="p-4 bg-white/5 rounded-lg">
                            <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(result.output_data, null, 2)}
                            </pre>
                          </div>
                        )}
                        
                        {/* PHASE 5: Resume with Agent Button */}
                        <Button
                          onClick={() => resumeWithAgent(result.agent_type, [], result.output_data)}
                          className="w-full bg-elec-yellow/10 hover:bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow"
                          variant="outline"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume with {agentInfo?.name}
                        </Button>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
