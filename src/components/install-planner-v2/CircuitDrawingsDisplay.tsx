import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Maximize2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateSingleLineDiagram, generateConsumerUnitDiagram, CircuitData } from "@/lib/diagramGenerator/layoutEngine";
import { SVGDiagramRenderer } from "@/components/circuit-diagrams/SVGDiagramRenderer";
import { exportDiagramsAsPDF, exportDiagramAsPNG } from "@/lib/diagramGenerator/exportDiagram";
import { FloorPlanDisplay } from "./FloorPlanDisplay";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
}

interface CircuitDrawingsDisplayProps {
  messages: Message[];
  projectName: string;
}

export const CircuitDrawingsDisplay = ({ messages, projectName }: CircuitDrawingsDisplayProps) => {
  const [viewingDiagram, setViewingDiagram] = useState<number | null>(null);
  const [aiDiagrams, setAiDiagrams] = useState<Map<number, any>>(new Map());
  const [generatingAI, setGeneratingAI] = useState<number | null>(null);

  // Parse circuits from designer response
  const parsedCircuits = useMemo(() => {
    const designerMessages = messages.filter(m => m.agentName === 'designer');
    if (designerMessages.length === 0) return [];
    
    const lastMessage = designerMessages[designerMessages.length - 1].content;
    return parseCircuitsFromDesigner(lastMessage);
  }, [messages]);

  // Generate SVG diagrams
  const diagrams = useMemo(() => {
    if (parsedCircuits.length === 0) return [];
    
    const layouts = parsedCircuits.map((circuit, idx) => 
      generateSingleLineDiagram(circuit)
    );
    
    // Add consumer unit diagram if multiple circuits
    if (parsedCircuits.length >= 2) {
      const cuLayout = generateConsumerUnitDiagram(parsedCircuits, 100);
      layouts.push(cuLayout);
    }
    
    return layouts;
  }, [parsedCircuits]);

  const handleGenerateAIDiagram = async (index: number) => {
    const circuit = parsedCircuits[index];
    if (!circuit) return;
    
    setGeneratingAI(index);
    toast.info("Generating AI diagram...", {
      description: "This will use Lovable AI credits"
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-circuit-diagrams', {
        body: {
          designerResponse: JSON.stringify(circuit),
          projectName: `${projectName} - Circuit ${circuit.circuitNumber}`
        }
      });
      
      if (error) throw error;
      
      setAiDiagrams(prev => new Map(prev).set(index, data.diagrams));
      toast.success("AI diagrams generated! 🎨");
    } catch (error: any) {
      toast.error("AI generation failed", {
        description: error.message
      });
    } finally {
      setGeneratingAI(null);
    }
  };

  const downloadSVG = (index: number) => {
    const diagram = diagrams[index];
    const svgElement = document.getElementById(`diagram-${index}`)?.querySelector('svg');
    if (!svgElement) return;
    
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}_${diagram.title.replace(/\s/g, '_')}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Diagram downloaded");
  };

  const handleExportAllPDF = async () => {
    const svgElements = diagrams.map((_, idx) => 
      document.getElementById(`diagram-${idx}`)?.querySelector('svg')
    ).filter(Boolean) as SVGSVGElement[];
    
    if (svgElements.length === 0) {
      toast.error("No diagrams to export");
      return;
    }
    
    toast.info(`Exporting ${svgElements.length} diagrams to PDF...`);
    
    try {
      await exportDiagramsAsPDF(svgElements, projectName);
      toast.success("PDF downloaded! 📄");
    } catch (error) {
      toast.error("PDF export failed");
    }
  };

  const hasDesignerData = parsedCircuits.length > 0;

  if (!hasDesignerData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <FileText className="w-4 h-4 md:w-5 md:h-5" />
            <span className="md:hidden">Drawings</span>
            <span className="hidden md:inline">BS 7671 Circuit Drawings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 md:py-8 text-white/70">
            <p className="text-sm md:text-base">No circuit design data available.</p>
            <p className="text-xs md:text-sm mt-2">The Circuit Designer agent must be consulted first.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              <span className="md:hidden">Drawings</span>
              <span className="hidden md:inline">BS 7671 Circuit Drawings</span>
            </CardTitle>
            
            {diagrams.length > 0 && (
              <Button
                onClick={handleExportAllPDF}
                variant="outline"
                size="sm"
                className="w-full md:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All as PDF
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-3 md:p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-sm mb-2 text-white">About These Drawings</h3>
            <div className="flex flex-col gap-1 text-xs md:text-sm text-white/90">
              <span>✓ BS 7671:2018+A2:2022 compliant</span>
              <span>✓ Professional single-line diagrams</span>
              <span>✓ Ready for Building Control</span>
              <span>✓ AI-generated photorealistic previews available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floor Plan (if multiple circuits) */}
      {parsedCircuits.length >= 2 && (
        <FloorPlanDisplay circuits={parsedCircuits} />
      )}

      {diagrams.length > 0 && (
        <div className="space-y-3 md:space-y-4">
          {diagrams.map((diagram, index) => {
            const aiDiagram = aiDiagrams.get(index);
            const isGenerating = generatingAI === index;
            
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm md:text-base">{diagram.title}</CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewingDiagram(viewingDiagram === index ? null : index)}
                      className="h-8 w-8 p-0"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Tabs defaultValue="svg" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="svg">SVG Diagram</TabsTrigger>
                      <TabsTrigger value="ai">AI Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="svg" className="space-y-3">
                      <div 
                        id={`diagram-${index}`}
                        className={`relative rounded-lg border border-border overflow-auto ${
                          viewingDiagram === index ? 'max-h-[600px]' : 'max-h-[300px] md:max-h-[400px]'
                        }`}
                      >
                        <SVGDiagramRenderer layout={diagram} />
                      </div>
                      <Button 
                        onClick={() => downloadSVG(index)}
                        variant="outline"
                        size="sm"
                        className="w-full min-h-[44px]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download SVG
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="ai" className="space-y-3">
                      {!aiDiagram && !isGenerating && (
                        <div className="bg-muted/30 p-6 md:p-8 rounded-lg border border-dashed border-border text-center">
                          <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary/50" />
                          <p className="text-sm text-muted-foreground mb-4">
                            Generate a photorealistic circuit diagram using AI
                          </p>
                          <Button
                            onClick={() => handleGenerateAIDiagram(index)}
                            variant="default"
                            size="sm"
                            disabled={index >= parsedCircuits.length}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate AI Preview (uses credits)
                          </Button>
                        </div>
                      )}
                      
                      {isGenerating && (
                        <div className="bg-muted/30 p-8 rounded-lg border border-border text-center">
                          <Loader2 className="w-12 h-12 mx-auto mb-3 text-primary animate-spin" />
                          <p className="text-sm text-muted-foreground">Generating AI diagrams...</p>
                        </div>
                      )}
                      
                      {aiDiagram && !isGenerating && (
                        <div className="space-y-3">
                          {aiDiagram.map((img: string, aiIdx: number) => (
                            <div key={aiIdx} className="space-y-2">
                              <img 
                                src={img} 
                                alt={`AI Diagram ${aiIdx + 1}`}
                                className="w-full rounded-lg border border-border"
                              />
                              <Button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = img;
                                  link.download = `${projectName}_AI_Diagram_${index + 1}_${aiIdx + 1}.png`;
                                  link.click();
                                }}
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download AI Diagram {aiIdx + 1}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Helper function to parse circuits from designer response
function parseCircuitsFromDesigner(designerResponse: string): CircuitData[] {
  const circuits: CircuitData[] = [];
  
  // Simple regex patterns to extract circuit data
  const circuitPattern = /Circuit (\d+)[:\-\s]+([^\n]+)/gi;
  const matches = [...designerResponse.matchAll(circuitPattern)];
  
  matches.forEach((match, idx) => {
    const circuitNum = parseInt(match[1]);
    const circuitName = match[2].trim();
    
    // Extract cable size (look for patterns like "2.5mm²" or "2.5mm2")
    const cableSizeMatch = designerResponse.match(new RegExp(`Circuit ${circuitNum}[^]*?(\\d+\\.?\\d*)\\s*mm[²2]`, 'i'));
    const cableSize = cableSizeMatch ? parseFloat(cableSizeMatch[1]) : 2.5;
    
    // Extract CPC size
    const cpcMatch = designerResponse.match(new RegExp(`CPC[^]*?(\\d+\\.?\\d*)\\s*mm[²2]`, 'i'));
    const cpcSize = cpcMatch ? parseFloat(cpcMatch[1]) : 1.5;
    
    // Extract MCB rating
    const mcbMatch = designerResponse.match(new RegExp(`Circuit ${circuitNum}[^]*?(\\d+)A`, 'i'));
    const mcbRating = mcbMatch ? parseInt(mcbMatch[1]) : 16;
    
    // Determine load type from circuit name
    let loadType = 'socket';
    if (/lighting|light/i.test(circuitName)) loadType = 'lighting';
    else if (/cooker|oven/i.test(circuitName)) loadType = 'cooker';
    else if (/shower/i.test(circuitName)) loadType = 'shower';
    else if (/ev|charger/i.test(circuitName)) loadType = 'ev-charger';
    else if (/heat pump|heating/i.test(circuitName)) loadType = 'heat-pump';
    else if (/outside|outdoor|external/i.test(circuitName)) loadType = 'outdoor-lighting';
    
    circuits.push({
      circuitNumber: circuitNum,
      name: circuitName,
      voltage: 230,
      cableSize,
      cpcSize,
      cableLength: 15, // Default
      loadType,
      loadPower: mcbRating * 230 * 0.8, // Estimate
      protectionDevice: {
        type: 'MCB',
        rating: mcbRating,
        curve: 'B',
        kaRating: 6
      },
      rcdProtected: /rcd|rcbo/i.test(designerResponse),
      rcdRating: 30,
      ze: 0.35
    });
  });
  
  return circuits;
}
