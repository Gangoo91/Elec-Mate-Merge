import { useState, useMemo, memo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Lightbulb, MessageSquare, ChevronDown, FileDown, Send, ExternalLink, Shield, ClipboardCheck, Maximize2, Minimize2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WhatsAppShareButton } from "./WhatsAppShareButton";
import { AgentResponseRenderer } from "./AgentResponseRenderer";
import { generateDesignerPDF, generateRAMSFromAgents, prepareTestSheetData } from "@/utils/agent-pdf-generator";
import { toast } from "sonner";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { parseQuoteFromCostAgent } from "@/utils/parseQuoteFromCostAgent";
import { useNavigate } from "react-router-dom";
import { Quote } from "@/types/quote";
import { ProjectDetailsForm } from "./ProjectDetailsForm";
import { CircuitDrawingsDisplay } from "./CircuitDrawingsDisplay";
import { 
  MobileAccordion, 
  MobileAccordionItem, 
  MobileAccordionTrigger, 
  MobileAccordionContent 
} from "@/components/ui/mobile-accordion";
import { FileText, Zap, Users, ClipboardList, Wrench } from "lucide-react";

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
  onExport: (selectedDocs?: string[], clientDetails?: any, companyDetails?: any) => void;
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
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(
    new Set(['design', 'quote', 'rams', 'checklist', 'test', 'eic'])
  );
  const { saveQuote } = useQuoteStorage();
  const navigate = useNavigate();
  const [clientDetails, setClientDetails] = useState<any>(null);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [detailsComplete, setDetailsComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Load saved details and handle resize
  useEffect(() => {
    const storageKey = `elecmate_project_details_${projectId || 'temp'}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const { clientDetails: savedClient, companyDetails: savedCompany } = JSON.parse(saved);
      setClientDetails(savedClient);
      setCompanyDetails(savedCompany);
      setDetailsComplete(!!savedClient?.clientName && !!savedClient?.propertyAddress && !!savedCompany?.companyName);
    }
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projectId]);

  // Memoize filtered messages
  const agentResponses = useMemo(() => messages.filter(m => m.role === 'assistant' && m.agentName), [messages]);
  const userMessages = useMemo(() => messages.filter(m => m.role === 'user'), [messages]);
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

  // Expand/Collapse All functionality
  const expandAll = () => {
    setExpandedAgents(new Set(selectedAgents));
  };

  const collapseAll = () => {
    setExpandedAgents(new Set());
  };

  const allExpanded = selectedAgents.every(id => expandedAgents.has(id));

  // Document selection handlers
  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleAllDocuments = () => {
    if (selectedDocuments.size === 6) {
      setSelectedDocuments(new Set());
    } else {
      setSelectedDocuments(new Set(['design', 'quote', 'rams', 'checklist', 'test', 'eic']));
    }
  };

  const getAgentResponse = (agentId: string): string => {
    const agentMessages = messages.filter(m => m.agentName === agentId);
    return agentMessages[agentMessages.length - 1]?.content || '';
  };

  const handleDownloadDesignPDF = () => {
    try {
      const designerResponse = getAgentResponse('designer');
      const pdf = generateDesignerPDF(designerResponse, projectName, "ElecMate User");
      pdf.save(`${projectName}_Cable_Design.pdf`);
      toast.success("Cable design PDF downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }
  };

  const handleDownloadRAMS = () => {
    try {
      const hsResponse = getAgentResponse('health-safety');
      const installerResponse = getAgentResponse('installer');
      const pdfDataUri = generateRAMSFromAgents(
        hsResponse,
        installerResponse,
        projectName,
        "Project Site",
        "Site Manager",
        "ElecMate User"
      );
      
      // Convert data URI to downloadable link
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `${projectName}_RAMS.pdf`;
      link.click();
      
      toast.success("RAMS document downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate RAMS document");
    }
  };

  const handleSendToQuoteHub = async () => {
    // Find cost engineer response
    const costEngineerResponse = messages.find(m => m.agentName === 'cost-engineer');
    
    if (!costEngineerResponse) {
      toast.error("No pricing data available", {
        description: "Cost Engineer hasn't provided pricing yet."
      });
      return;
    }

    try {
      // Parse the cost engineer's response to extract quote data
      const quoteData = parseQuoteFromCostAgent(
        costEngineerResponse.content,
        {
          name: "Client Name"
        },
        {
          title: projectName
        }
      );

      // Save to database
      const saved = await saveQuote(quoteData as Quote);
      
      if (saved) {
        toast.success("Quote saved to Quote Hub! 📋", {
          description: "Opening Quote Hub..."
        });
        
        // Navigate to quote hub
        setTimeout(() => {
          navigate('/quote-hub');
        }, 1000);
      } else {
        toast.error("Failed to save quote", {
          description: "Please try again or contact support."
        });
      }
    } catch (error) {
      console.error('Error saving quote:', error);
      toast.error("Failed to parse quote data", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const handleSendToTestSheet = () => {
    try {
      const commissioningResponse = getAgentResponse('commissioning');
      const testData = prepareTestSheetData(commissioningResponse, projectName, "Project Site");
      
      // For now, download as JSON
      const dataStr = JSON.stringify(testData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName}_TestSheet.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.info("Test sheet data prepared", {
        description: "Integration with Inspection & Testing app coming soon"
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to prepare test sheet data");
    }
  };

  const handleDetailsSaved = (client: any, company: any) => {
    setClientDetails(client);
    setCompanyDetails(company);
    setDetailsComplete(!!client?.clientName && !!client?.propertyAddress && !!company?.companyName);
  };

  const handleExportWithValidation = () => {
    if (!detailsComplete) {
      toast.error("Complete Project Details first", {
        description: "Switch to Project Details tab to fill required fields"
      });
      setActiveTab("details");
      return;
    }
    onExport(Array.from(selectedDocuments), clientDetails, companyDetails);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile-First Header */}
      <Card className="p-4 md:p-5 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{projectName}</h1>
              <p className="text-sm text-white/70 mt-1">
                {selectedAgents.length} specialist{selectedAgents.length !== 1 ? 's' : ''} consulted
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Document Selection */}
            <div className="bg-elec-card border border-elec-yellow/20 rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Select Documents to Export</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAllDocuments}
                  className="h-7 text-xs"
                >
                  {selectedDocuments.size === 6 ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('design')}
                    onChange={() => toggleDocument('design')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">Design Spec</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('quote')}
                    onChange={() => toggleDocument('quote')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">Quote</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('rams')}
                    onChange={() => toggleDocument('rams')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">RAMS</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('checklist')}
                    onChange={() => toggleDocument('checklist')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">Checklist</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('test')}
                    onChange={() => toggleDocument('test')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">Test Schedule</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has('eic')}
                    onChange={() => toggleDocument('eic')}
                    className="w-4 h-4 rounded border-elec-yellow/30 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-foreground">EIC Template</span>
                </label>
              </div>
            </div>

            {/* Action Buttons - Redesigned */}
            <div className="space-y-2">
              {/* Primary Action - Full Width */}
              <Button 
                variant="default" 
                size="lg" 
                onClick={handleExportWithValidation} 
                disabled={selectedDocuments.size === 0}
                className="w-full min-h-[48px] bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Package ({selectedDocuments.size} of 6)
              </Button>
              
              {/* Secondary Actions - Side by Side on Desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <WhatsAppShareButton
                  projectId={projectId || 'temp'}
                  projectName={projectName}
                />
                <Button 
                  variant="outline" 
                  size="default" 
                  onClick={onNewConsultation} 
                  className="min-h-[44px] w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Responsive Navigation: Accordion on Mobile, Tabs on Desktop */}
      {isMobile ? (
        <MobileAccordion type="single" collapsible defaultValue="overview" className="w-full space-y-2">
          {/* Overview Section */}
          <MobileAccordionItem value="overview">
            <MobileAccordionTrigger icon={<Lightbulb className="w-5 h-5" />}>
              Overview
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{projectDescription}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                      <div className="text-3xl font-bold text-elec-yellow">{circuits.length}</div>
                      <div className="text-xs text-white/90 mt-1">Circuits</div>
                    </div>
                    <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                      <div className="text-3xl font-bold text-elec-yellow">{selectedAgents.length}</div>
                      <div className="text-xs text-white/90 mt-1">Specialists</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Details Section */}
          <MobileAccordionItem value="details">
            <MobileAccordionTrigger icon={<FileText className="w-5 h-5" />}>
              Details {detailsComplete && "✓"}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <ProjectDetailsForm projectId={projectId} onDetailsSaved={handleDetailsSaved} />
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Circuits Section */}
          <MobileAccordionItem value="circuits">
            <MobileAccordionTrigger icon={<Zap className="w-5 h-5" />}>
              Circuits ({circuits.length})
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-3">
                {circuits.length > 0 ? (
                  circuits.map((circuit, idx) => (
                    <Card key={circuit.id} className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base">Circuit {idx + 1}: {circuit.name}</h3>
                          <p className="text-sm text-white/70 mt-1">Load: {circuit.load}W</p>
                        </div>
                        <Badge variant="secondary" className="ml-2 flex-shrink-0">{circuit.mcbRating || 'N/A'}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        {circuit.cableSize && (
                          <div className="flex justify-between items-center py-1">
                            <span className="text-white/70">Cable Size:</span>
                            <span className="font-medium">{circuit.cableSize}</span>
                          </div>
                        )}
                        {circuit.protection && (
                          <div className="flex justify-between items-center py-1">
                            <span className="text-white/70">Protection:</span>
                            <span className="font-medium">{circuit.protection}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-white/70">No circuits designed yet.</p>
                  </Card>
                )}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Diagrams Section */}
          <MobileAccordionItem value="drawings">
            <MobileAccordionTrigger icon={<ClipboardList className="w-5 h-5" />}>
              Diagrams
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <CircuitDrawingsDisplay messages={messages} projectName={projectName} />
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Testing Section */}
          <MobileAccordionItem value="testing">
            <MobileAccordionTrigger icon={<Shield className="w-5 h-5" />}>
              Testing
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Testing & Commissioning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-white/70">
                    EIC schedule generation and testing guidance coming soon.
                  </p>
                  <div className="p-3 rounded-lg bg-elec-card border border-elec-yellow/20">
                    <h4 className="font-medium text-sm mb-2">Available Soon:</h4>
                    <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                      <li>Pre-populated EIC test schedule</li>
                      <li>R1+R2 calculations</li>
                      <li>Zs verification</li>
                      <li>Insulation resistance tests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Specialists Section */}
          <MobileAccordionItem value="specialists">
            <MobileAccordionTrigger icon={<Users className="w-5 h-5" />}>
              Specialists
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-3">
                {selectedAgents.length > 0 ? (
                  selectedAgents.map((agentId) => {
                    const agent = AGENT_INFO[agentId];
                    const agentMessages = messages.filter(m => m.agentName === agentId);
                    const hasContent = agentMessages.length > 0;
                    const isExpanded = expandedAgents.has(agentId);
                    const lastResponse = agentMessages[agentMessages.length - 1]?.content || '';
                    
                    return (
                      <Card key={agentId}>
                        <Collapsible open={isExpanded} onOpenChange={() => toggleAgent(agentId)}>
                          <CollapsibleTrigger className="w-full min-h-[60px]">
                            <div className="p-4 flex items-center justify-between hover:bg-accent/50">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-10 h-10 rounded-full ${agent?.color || 'bg-muted'} flex items-center justify-center`}>
                                  <span className="text-xl">{agent?.emoji || '👤'}</span>
                                </div>
                                <div className="text-left flex-1">
                                  <h3 className="font-semibold text-sm">{agent?.name || agentId}</h3>
                                  <p className="text-xs text-white/70">{hasContent ? 'View details' : 'No response'}</p>
                                </div>
                              </div>
                              <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="px-4 pb-4 space-y-3 border-t pt-3">
                              {hasContent ? (
                                <>
                                  <AgentResponseRenderer content={lastResponse} agentId={agentId} />
                                  {agentId === 'designer' && (
                                    <Button onClick={handleDownloadDesignPDF} className="w-full min-h-[44px]">
                                      <FileDown className="w-4 h-4 mr-2" />Download Design PDF
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <p className="text-sm text-white/70 text-center py-4">Not consulted</p>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-white/70">No specialists selected.</p>
                  </Card>
                )}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="text-sm py-2.5">Overview</TabsTrigger>
            <TabsTrigger value="details" className="text-sm py-2.5">Details {detailsComplete && "✓"}</TabsTrigger>
            <TabsTrigger value="circuits" className="text-sm py-2.5">Circuits ({circuits.length})</TabsTrigger>
            <TabsTrigger value="drawings" className="text-sm py-2.5">Diagrams</TabsTrigger>
            <TabsTrigger value="testing" className="text-sm py-2.5">Testing</TabsTrigger>
            <TabsTrigger value="specialists" className="text-sm py-2.5">Specialists</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{projectDescription}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                    <div className="text-3xl font-bold text-elec-yellow">{circuits.length}</div>
                    <div className="text-xs text-white/90 mt-1">Circuits Designed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                    <div className="text-3xl font-bold text-elec-yellow">{selectedAgents.length}</div>
                    <div className="text-xs text-white/90 mt-1">Specialists Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-4">
            <ProjectDetailsForm projectId={projectId} onDetailsSaved={handleDetailsSaved} />
          </TabsContent>

          <TabsContent value="circuits" className="space-y-3 mt-4">
            {circuits.length > 0 ? (
              circuits.map((circuit, idx) => (
                <Card key={circuit.id} className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base">Circuit {idx + 1}: {circuit.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Load: {circuit.load}W</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">{circuit.mcbRating || 'N/A'}</Badge>
                  </div>
                  <div className="space-y-2.5 text-base">
                    {circuit.cableSize && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Cable Size:</span>
                        <span className="font-medium">{circuit.cableSize}</span>
                      </div>
                    )}
                    {circuit.protection && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Protection:</span>
                        <span className="font-medium">{circuit.protection}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-white/70">No circuits designed yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="drawings" className="mt-4">
            <CircuitDrawingsDisplay messages={messages} projectName={projectName} />
          </TabsContent>

          <TabsContent value="testing" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Testing & Commissioning Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  EIC schedule generation and testing guidance coming soon.
                </p>
                <div className="p-4 rounded-lg bg-elec-card border border-elec-yellow/20">
                  <h4 className="font-medium text-sm mb-2">Available Soon:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Pre-populated EIC test schedule</li>
                    <li>R1+R2 calculations for each circuit</li>
                    <li>Zs verification and disconnection times</li>
                    <li>Insulation resistance test guidance</li>
                    <li>RCD testing parameters</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialists" className="space-y-3 mt-4">
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={allExpanded ? collapseAll : expandAll}>
                {allExpanded ? <><Minimize2 className="h-4 w-4 mr-2" />Collapse All</> : <><Maximize2 className="h-4 w-4 mr-2" />Expand All</>}
              </Button>
            </div>
            {selectedAgents.length > 0 ? (
              selectedAgents.map((agentId) => {
                const agent = AGENT_INFO[agentId];
                const agentMessages = messages.filter(m => m.agentName === agentId);
                const hasContent = agentMessages.length > 0;
                const isExpanded = expandedAgents.has(agentId);
                const lastResponse = agentMessages[agentMessages.length - 1]?.content || '';
                
                return (
                  <Card key={agentId}>
                    <Collapsible open={isExpanded} onOpenChange={() => toggleAgent(agentId)}>
                      <CollapsibleTrigger className="w-full">
                        <div className="p-5 flex items-center justify-between hover:bg-accent/50">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-12 h-12 rounded-full ${agent?.color || 'bg-muted'} flex items-center justify-center`}>
                              <span className="text-2xl">{agent?.emoji || '👤'}</span>
                            </div>
                            <div className="text-left flex-1">
                              <h3 className="font-semibold text-base">{agent?.name || agentId}</h3>
                              <p className="text-xs text-white/70">{hasContent ? 'Tap to view' : 'No response'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={hasContent ? 'default' : 'secondary'}>{hasContent ? 'Complete' : 'Pending'}</Badge>
                            <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5 pb-5 space-y-4 border-t pt-4">
                          {hasContent ? (
                            <>
                              <AgentResponseRenderer content={lastResponse} agentId={agentId} />
                              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
                                {agentId === 'designer' && (
                                  <Button onClick={handleDownloadDesignPDF} className="flex-1">
                                    <FileDown className="w-4 h-4 mr-2" />Download Cable Design PDF
                                  </Button>
                                )}
                                {agentId === 'cost-engineer' && (
                                  <>
                                    <Button onClick={handleSendToQuoteHub} className="flex-1">
                                      <Send className="w-4 h-4 mr-2" />Send to Quote Hub
                                    </Button>
                                    <Button variant="outline" onClick={() => window.open('/quote-hub', '_blank')} className="flex-1">
                                      <ExternalLink className="w-4 h-4 mr-2" />Open Quote Hub
                                    </Button>
                                  </>
                                )}
                                {(agentId === 'installer' || agentId === 'health-safety') && (
                                  <Button onClick={handleDownloadRAMS} className="flex-1">
                                    <Shield className="w-4 h-4 mr-2" />Download RAMS PDF
                                  </Button>
                                )}
                                {agentId === 'commissioning' && (
                                  <Button onClick={handleSendToTestSheet} className="flex-1">
                                    <ClipboardCheck className="w-4 h-4 mr-2" />Send to Test Sheet
                                  </Button>
                                )}
                              </div>
                              {onReEngageAgent && (
                                <Button variant="outline" onClick={() => onReEngageAgent(agentId)} className="w-full">
                                  <MessageSquare className="w-4 h-4 mr-2" />Ask {agent?.name} a Follow-up
                                </Button>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-white/70 text-center py-6">Not consulted in this session.</p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-white/70">No specialists selected.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
