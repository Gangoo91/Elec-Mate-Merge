import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, FileText, Database } from "lucide-react";
import { processOnSiteGuide } from "@/utils/onsiteGuideProcessor";
import { toast } from "sonner";

export const OnSiteGuideProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResult(null);
    
    try {
      toast.info("Starting On-Site Guide processing...", {
        description: "This may take 5-10 minutes to chunk and embed all content"
      });
      
      const data = await processOnSiteGuide();
      
      setResult(data);
      toast.success(`Successfully processed ${data.chunksCreated} chunks!`, {
        description: `${data.embeddingsProcessed} embeddings added to RAG database`
      });
      
    } catch (error) {
      console.error('Processing error:', error);
      toast.error("Failed to process On-Site Guide", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">On-Site Guide RAG Integration</h3>
            <p className="text-sm text-muted-foreground">
              Process the On-Site Guide and add it to the installation_knowledge RAG database
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4" />
                Process On-Site Guide
              </>
            )}
          </Button>
          
          {isProcessing && (
            <span className="text-sm text-muted-foreground">
              This will take 5-10 minutes...
            </span>
          )}
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <div className="font-semibold text-green-600">✅ Processing Complete</div>
            <div className="text-sm space-y-1">
              <p>Chunks Created: <strong>{result.chunksCreated}</strong></p>
              <p>Embeddings Processed: <strong>{result.embeddingsProcessed}</strong></p>
              
              {result.sampleChunks && (
                <div className="mt-3">
                  <p className="font-semibold mb-2">Sample Chunks:</p>
                  {result.sampleChunks.map((chunk: any, idx: number) => (
                    <div key={idx} className="text-xs p-2 bg-background rounded mb-2">
                      <div className="font-semibold">{chunk.section}</div>
                      <div className="text-muted-foreground">{chunk.contentPreview}</div>
                      <div className="text-xs mt-1">
                        Regs: {chunk.metadata.regulation_refs.join(', ') || 'none'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
