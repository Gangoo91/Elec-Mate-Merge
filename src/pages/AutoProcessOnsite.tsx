import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const AutoProcessOnsite = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const process = async () => {
      try {
        console.log('🚀 Loading On-Site Guide...');
        
        const response = await fetch('/data/ONSITEGUIDE.txt');
        if (!response.ok) throw new Error('Failed to load file');
        
        const fileContent = await response.text();
        console.log(`📄 Loaded ${fileContent.length} characters`);
        
        console.log('🔄 Processing chunks and embeddings...');
        const { data, error: invokeError } = await supabase.functions.invoke('parse-onsite-guide', {
          body: { fileContent }
        });
        
        if (invokeError) throw invokeError;
        
        console.log('✅ Processing complete!', data);
        setResult(data);
        setStatus('success');
        
      } catch (err) {
        console.error('❌ Processing failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('error');
      }
    };
    
    process();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          {status === 'processing' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Processing On-Site Guide</h2>
                <p className="text-muted-foreground mt-2">
                  Chunking and embedding content...
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will take 5-10 minutes
                </p>
              </div>
            </div>
          )}

          {status === 'success' && result && (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Processing Complete!
                </h2>
                <div className="mt-4 space-y-2 text-left">
                  <p>✅ Chunks Created: <strong>{result.chunksCreated}</strong></p>
                  <p>✅ Embeddings: <strong>{result.embeddingsProcessed}</strong></p>
                  
                  {result.sampleChunks && (
                    <div className="mt-4 text-xs space-y-2">
                      <p className="font-semibold">Sample chunks:</p>
                      {result.sampleChunks.map((chunk: any, i: number) => (
                        <div key={i} className="p-2 bg-muted rounded">
                          <div className="font-semibold">{chunk.section}</div>
                          <div className="text-muted-foreground">{chunk.contentPreview}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
              <div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Processing Failed
                </h2>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {error}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AutoProcessOnsite;
