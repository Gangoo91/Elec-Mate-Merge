import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ZoomIn, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
}

interface CircuitDrawingsDisplayProps {
  messages: Message[];
  projectName: string;
}

interface GeneratedDiagram {
  type: 'single-line' | 'schematic';
  title: string;
  imageUrl: string;
  description: string;
}

export const CircuitDrawingsDisplay = ({ messages, projectName }: CircuitDrawingsDisplayProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [diagrams, setDiagrams] = useState<GeneratedDiagram[]>([]);

  const getDesignerData = () => {
    const designerMessages = messages.filter(m => m.agentName === 'designer');
    if (designerMessages.length === 0) return null;
    
    const lastMessage = designerMessages[designerMessages.length - 1].content;
    return lastMessage;
  };

  const handleGenerateDiagrams = async () => {
    const designerData = getDesignerData();
    if (!designerData) {
      toast.error("No circuit design data available");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-circuit-diagrams', {
        body: { 
          designerResponse: designerData,
          projectName 
        }
      });

      if (error) throw error;

      if (data?.diagrams) {
        setDiagrams(data.diagrams);
        toast.success(`Generated ${data.diagrams.length} circuit diagram(s)`);
      } else {
        toast.error("No diagrams were generated");
      }
    } catch (error) {
      console.error('Error generating diagrams:', error);
      toast.error("Failed to generate circuit diagrams");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDiagram = (diagram: GeneratedDiagram, index: number) => {
    try {
      const link = document.createElement('a');
      link.href = diagram.imageUrl;
      link.download = `${projectName}_${diagram.type}_${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloaded ${diagram.title}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download diagram");
    }
  };

  const hasDesignerData = getDesignerData() !== null;

  if (!hasDesignerData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Circuit Drawings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No circuit design data available.</p>
            <p className="text-sm mt-2">The Circuit Designer agent must be consulted first.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            BS 7671 Compliant Circuit Drawings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-sm mb-2">About These Drawings</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Generated using BS 7671:2018+A2:2022 standards</li>
                <li>✓ Professional single-line diagrams</li>
                <li>✓ Includes regulation references and symbol legends</li>
                <li>✓ Suitable for submission to Building Control</li>
              </ul>
            </div>

            {diagrams.length === 0 ? (
              <Button 
                onClick={handleGenerateDiagrams} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating BS 7671 Diagrams...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Circuit Diagrams
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleGenerateDiagrams} 
                disabled={isGenerating}
                variant="outline"
                className="w-full"
              >
                <Loader2 className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate Diagrams
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {diagrams.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {diagrams.map((diagram, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{diagram.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative bg-white rounded-lg border border-border overflow-hidden">
                  <img 
                    src={diagram.imageUrl} 
                    alt={diagram.title}
                    className="w-full h-auto"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => window.open(diagram.imageUrl, '_blank')}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{diagram.description}</p>
                <Button 
                  onClick={() => handleDownloadDiagram(diagram, index)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
