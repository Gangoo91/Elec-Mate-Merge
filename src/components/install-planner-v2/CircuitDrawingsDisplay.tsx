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

  // Parse circuits from designer response - check for structured data first
  const parsedCircuits = useMemo(() => {
    const designerMessages = messages.filter(m => m.agentName === 'designer');
    if (designerMessages.length === 0) return [];
    
    // NEW: Check if messages contain structured circuit data
    const structuredCircuits: CircuitData[] = [];
    designerMessages.forEach(msg => {
      try {
        // Check if message has structured data (from designer agent JSON response)
        const msgData = typeof msg === 'object' && 'structuredData' in msg ? (msg as any).structuredData : null;
        if (msgData?.circuits) {
          structuredCircuits.push(...msgData.circuits);
        }
      } catch (e) {
        // Not structured data, will parse from text
      }
    });
    
    if (structuredCircuits.length > 0) {
      console.log('✅ Using structured circuit data:', structuredCircuits);
      return structuredCircuits;
    }
    
    // Fallback: Combine ALL designer messages and parse from text
    const combinedContent = designerMessages.map(m => m.content).join('\n\n');
    return parseCircuitsFromDesigner(combinedContent);
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
    const designerMessageCount = messages.filter(m => m.agentName === 'designer').length;
    
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
          <div className="text-center py-6 md:py-8">
            <p className="text-white/70 text-sm md:text-base mb-4">No circuit design data available.</p>
            
            {designerMessageCount > 0 ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm text-left max-w-md mx-auto">
                <p className="font-semibold mb-2 text-yellow-500">⚠️ Designer responded but data couldn't be parsed.</p>
                <p className="text-xs text-white/60">
                  Found {designerMessageCount} designer message(s). 
                  The circuit parser may need updating to match the designer's output format.
                </p>
              </div>
            ) : (
              <p className="text-xs md:text-sm text-white/60">The Circuit Designer agent must be consulted first.</p>
            )}
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
  
  // NEW: Try to parse structured CIRCUIT SPECIFICATION format first
  const sections = designerResponse.split(/CIRCUIT SPECIFICATION/i).filter(s => s.trim());
  
  sections.forEach((section, idx) => {
    // Extract data from structured format
    const loadMatch = section.match(/Load:\s*(\d+)W/i);
    const distanceMatch = section.match(/Distance from board:\s*(\d+)m/i);
    const voltageMatch = section.match(/Supply:\s*(\d+)V\s*(\w+)-phase/i);
    const circuitTypeMatch = section.match(/Circuit type:\s*(.+)/i);
    
    // Extract from CALCULATIONS section
    const ibMatch = section.match(/Design current \(Ib\):\s*([\d.]+)A/i);
    const protectionMatch = section.match(/Protection device:\s*(\d+)A\s*MCB\s*Type\s*([ABC])/i);
    const cableMatch = section.match(/Cable specification:\s*([\d.]+)mm²/i);
    const cpcMatch = section.match(/CPC:\s*([\d.]+)mm²/i);
    
    if (!loadMatch || !cableMatch) return; // Skip invalid sections
    
    const circuitNum = idx + 1;
    const power = parseInt(loadMatch[1]);
    const cableSize = parseFloat(cableMatch[1]);
    const cpcSize = cpcMatch ? parseFloat(cpcMatch[1]) : (cableSize >= 2.5 ? 1.5 : 1.0);
    const mcbRating = protectionMatch ? parseInt(protectionMatch[1]) : 16;
    const mcbType = protectionMatch ? protectionMatch[2] : 'B';
    
    // Determine circuit name from type
    const circuitType = circuitTypeMatch ? circuitTypeMatch[1].trim() : 'General';
    let name = `Circuit ${circuitNum}`;
    if (/socket/i.test(circuitType)) name = `Socket Outlet Circuit ${circuitNum}`;
    if (/lighting/i.test(circuitType)) name = `Lighting Circuit ${circuitNum}`;
    if (/cooker|oven/i.test(circuitType)) name = `Cooker Circuit ${circuitNum}`;
    if (/shower/i.test(circuitType)) name = `Shower Circuit ${circuitNum}`;
    if (/ev|charger/i.test(circuitType)) name = `EV Charger Circuit ${circuitNum}`;
    
    circuits.push({
      circuitNumber: circuitNum,
      name,
      voltage: voltageMatch ? parseInt(voltageMatch[1]) : 230,
      cableSize,
      cpcSize,
      cableLength: distanceMatch ? parseInt(distanceMatch[1]) : 15,
      loadType: detectLoadType(circuitType),
      loadPower: power,
      protectionDevice: {
        type: 'MCB',
        rating: mcbRating,
        curve: mcbType,
        kaRating: 6
      },
      rcdProtected: /rcd|rcbo/i.test(section),
      rcdRating: 30,
      ze: 0.35
    });
  });
  
  // Fallback: If no "CIRCUIT SPECIFICATION" headers found, try old regex pattern
  if (circuits.length === 0) {
    const singleCircuit = parseSingleCircuitFormat(designerResponse);
    if (singleCircuit) circuits.push(singleCircuit);
  }
  
  return circuits;
}

function parseSingleCircuitFormat(text: string): CircuitData | null {
  const loadMatch = text.match(/Load:\s*(\d+)W/i);
  const cableMatch = text.match(/Cable specification:\s*([\d.]+)mm²/i);
  const protectionMatch = text.match(/Protection device:\s*(\d+)A\s*MCB\s*Type\s*([ABC])/i);
  const lengthMatch = text.match(/Distance from board:\s*(\d+)m/i);
  
  if (!loadMatch || !cableMatch) {
    // Last resort: try very basic pattern matching
    const basicCircuit = text.match(/Circuit (\d+)[:\-\s]+([^\n]+)/i);
    const basicCable = text.match(/([\d.]+)\s*mm[²2]/i);
    const basicMCB = text.match(/(\d+)A/i);
    
    if (basicCircuit && basicCable) {
      return {
        circuitNumber: 1,
        name: basicCircuit[2]?.trim() || 'Circuit 1',
        voltage: 230,
        cableSize: parseFloat(basicCable[1]),
        cpcSize: 1.5,
        cableLength: 15,
        loadType: detectLoadType(basicCircuit[2] || ''),
        loadPower: (basicMCB ? parseInt(basicMCB[1]) : 16) * 230 * 0.8,
        protectionDevice: {
          type: 'MCB',
          rating: basicMCB ? parseInt(basicMCB[1]) : 16,
          curve: 'B',
          kaRating: 6
        },
        rcdProtected: false,
        rcdRating: 30,
        ze: 0.35
      };
    }
    return null;
  }
  
  return {
    circuitNumber: 1,
    name: 'Circuit 1',
    voltage: 230,
    cableSize: parseFloat(cableMatch[1]),
    cpcSize: 1.5,
    cableLength: lengthMatch ? parseInt(lengthMatch[1]) : 15,
    loadType: 'socket',
    loadPower: parseInt(loadMatch[1]),
    protectionDevice: {
      type: 'MCB',
      rating: protectionMatch ? parseInt(protectionMatch[1]) : 16,
      curve: protectionMatch ? protectionMatch[2] : 'B',
      kaRating: 6
    },
    rcdProtected: false,
    rcdRating: 30,
    ze: 0.35
  };
}

function detectLoadType(circuitType: string): string {
  if (/socket/i.test(circuitType)) return 'socket';
  if (/lighting|light/i.test(circuitType)) return 'lighting';
  if (/cooker|oven/i.test(circuitType)) return 'cooker';
  if (/shower/i.test(circuitType)) return 'shower';
  if (/ev|charger/i.test(circuitType)) return 'ev-charger';
  if (/heat pump/i.test(circuitType)) return 'heat-pump';
  if (/motor/i.test(circuitType)) return 'motor';
  if (/outdoor|outside|external/i.test(circuitType)) return 'outdoor-lighting';
  return 'socket';
}
