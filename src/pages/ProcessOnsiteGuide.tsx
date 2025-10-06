import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ProcessOnsiteGuide = () => {
  const [onsiteStatus, setOnsiteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [onsiteResult, setOnsiteResult] = useState<any>(null);
  const [onsiteError, setOnsiteError] = useState<string>('');

  const [gn3Status, setGn3Status] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gn3Result, setGn3Result] = useState<any>(null);
  const [gn3Error, setGn3Error] = useState<string>('');

  const processOnsiteGuide = async () => {
    setOnsiteStatus('loading');
    setOnsiteError('');
    setOnsiteResult(null);

    try {
      const response = await fetch('/data/ONSITEGUIDE.txt');
      if (!response.ok) {
        throw new Error('Failed to load On-Site Guide file');
      }
      
      const fileContent = await response.text();
      console.log(`📄 Loaded On-Site Guide: ${fileContent.length} characters`);

      const { data, error: invokeError } = await supabase.functions.invoke('parse-onsite-guide', {
        body: { fileContent }
      });

      if (invokeError) {
        throw invokeError;
      }

      setOnsiteResult(data);
      setOnsiteStatus('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setOnsiteError(err instanceof Error ? err.message : 'Unknown error');
      setOnsiteStatus('error');
    }
  };

  const processGuidanceNote3 = async () => {
    setGn3Status('loading');
    setGn3Error('');
    setGn3Result(null);

    try {
      const response = await fetch('/data/GUIDANCE-NOTE-3.txt');
      if (!response.ok) {
        throw new Error('Failed to load Guidance Note 3 file');
      }
      
      const fileContent = await response.text();
      console.log(`📄 Loaded Guidance Note 3: ${fileContent.length} characters`);

      const { data, error: invokeError } = await supabase.functions.invoke('parse-guidance-note-3', {
        body: { fileContent }
      });

      if (invokeError) {
        throw invokeError;
      }

      setGn3Result(data);
      setGn3Status('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setGn3Error(err instanceof Error ? err.message : 'Unknown error');
      setGn3Status('error');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Process Installation Guides</h1>
          <p className="text-muted-foreground">
            Add installation and testing guides to the RAG database for AI agents
          </p>
        </div>

        {/* On-Site Guide */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">On-Site Guide (BS 7671)</p>
                <p className="text-sm text-muted-foreground">
                  Installation methods, cable selection, earthing & bonding guidance
                </p>
              </div>
            </div>

            <Button 
              onClick={processOnsiteGuide} 
              disabled={onsiteStatus === 'loading'}
              className="w-full"
              size="lg"
            >
              {onsiteStatus === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing On-Site Guide...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process On-Site Guide
                </>
              )}
            </Button>

            {onsiteStatus === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~10,000 lines...</p>
                <p>Creating chunks with embeddings...</p>
                <p>This may take 5-8 minutes...</p>
              </div>
            )}

            {onsiteStatus === 'success' && onsiteResult && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Created: <strong>{onsiteResult.chunksCreated}</strong></p>
                  <p>✅ Embeddings Processed: <strong>{onsiteResult.embeddingsProcessed}</strong></p>
                  
                  {onsiteResult.sampleChunks && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Sample Chunks:</p>
                      {onsiteResult.sampleChunks.map((chunk: any, idx: number) => (
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

            {onsiteStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{onsiteError}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Guidance Note 3 */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Guidance Note 3: Inspection & Testing</p>
                <p className="text-sm text-muted-foreground">
                  Testing procedures, EFLI, RCD testing, initial verification & periodic inspection
                </p>
              </div>
            </div>

            <Button 
              onClick={processGuidanceNote3} 
              disabled={gn3Status === 'loading'}
              className="w-full"
              size="lg"
            >
              {gn3Status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing Guidance Note 3...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process Guidance Note 3
                </>
              )}
            </Button>

            {gn3Status === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~12,000 lines...</p>
                <p>Extracting test procedures with metadata...</p>
                <p>This may take 6-8 minutes...</p>
              </div>
            )}

            {gn3Status === 'success' && gn3Result && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Created: <strong>{gn3Result.chunksCreated}</strong></p>
                  <p>✅ Embeddings Processed: <strong>{gn3Result.embeddingsProcessed}</strong></p>
                  
                  {gn3Result.sampleChunks && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Sample Testing Procedures:</p>
                      {gn3Result.sampleChunks.map((chunk: any, idx: number) => (
                        <div key={idx} className="text-xs p-2 bg-background rounded mb-2">
                          <div className="font-semibold">{chunk.section}</div>
                          <div className="text-muted-foreground line-clamp-2">
                            {chunk.contentPreview}
                          </div>
                          <div className="text-xs mt-1 text-muted-foreground">
                            {chunk.metadata.test_category && (
                              <span className="mr-2">Category: {chunk.metadata.test_category}</span>
                            )}
                            {chunk.metadata.test_methods && chunk.metadata.test_methods.length > 0 && (
                              <span>Methods: {chunk.metadata.test_methods.join(', ')}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {gn3Status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{gn3Error}</p>
              </div>
            )}
          </div>
        </Card>

        <div className="text-sm text-muted-foreground text-center">
          <p>After processing, these guides will be available to:</p>
          <p className="font-semibold mt-1">
            Designer Agent • Installer Agent • Commissioning Agent • Cost Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessOnsiteGuide;
