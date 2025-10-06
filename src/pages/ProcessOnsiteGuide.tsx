import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ProcessOnsiteGuide = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const processFile = async () => {
    setStatus('loading');
    setError('');
    setResult(null);

    try {
      // Fetch the file
      const response = await fetch('/data/ONSITEGUIDE.txt');
      if (!response.ok) {
        throw new Error('Failed to load On-Site Guide file');
      }
      
      const fileContent = await response.text();
      console.log(`📄 Loaded ${fileContent.length} characters`);

      // Process through edge function
      const { data, error: invokeError } = await supabase.functions.invoke('parse-onsite-guide', {
        body: { fileContent }
      });

      if (invokeError) {
        throw invokeError;
      }

      setResult(data);
      setStatus('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Process On-Site Guide</h1>
          <p className="text-muted-foreground">
            Add the On-Site Guide to the RAG database for AI agents
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Ready to Process</p>
                <p className="text-sm text-muted-foreground">
                  This will chunk the On-Site Guide into ~150 sections and add them to installation_knowledge
                </p>
              </div>
            </div>

            <Button 
              onClick={processFile} 
              disabled={status === 'loading'}
              className="w-full"
              size="lg"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing... (5-10 minutes)
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Start Processing
                </>
              )}
            </Button>

            {status === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Parsing 10,652 lines...</p>
                <p>Creating chunks with embeddings...</p>
                <p>This may take several minutes, please wait...</p>
              </div>
            )}

            {status === 'success' && result && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Created: <strong>{result.chunksCreated}</strong></p>
                  <p>✅ Embeddings Processed: <strong>{result.embeddingsProcessed}</strong></p>
                  
                  {result.sampleChunks && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Sample Chunks:</p>
                      {result.sampleChunks.map((chunk: any, idx: number) => (
                        <div key={idx} className="text-xs p-2 bg-background rounded mb-2">
                          <div className="font-semibold">{chunk.section}</div>
                          <div className="text-muted-foreground line-clamp-2">
                            {chunk.contentPreview}
                          </div>
                          <div className="text-xs mt-1 text-muted-foreground">
                            Regs: {chunk.metadata.regulation_refs.slice(0, 5).join(', ') || 'none'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        </Card>

        <div className="text-sm text-muted-foreground text-center">
          <p>After processing, the On-Site Guide will be available to:</p>
          <p className="font-semibold mt-1">
            Designer Agent • Installer Agent • Commissioning Agent • Cost Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessOnsiteGuide;
