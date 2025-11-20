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

  const [elStatus, setElStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [elResult, setElResult] = useState<any>(null);
  const [elError, setElError] = useState<string>('');

  const [book1Status, setBook1Status] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [book1Result, setBook1Result] = useState<any>(null);
  const [book1Error, setBook1Error] = useState<string>('');

  const [book2Status, setBook2Status] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [book2Result, setBook2Result] = useState<any>(null);
  const [book2Error, setBook2Error] = useState<string>('');

  const [bs7671Status, setBs7671Status] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bs7671Result, setBs7671Result] = useState<any>(null);
  const [bs7671Error, setBs7671Error] = useState<string>('');

  const processBS7671 = async () => {
    setBs7671Status('loading');
    setBs7671Error('');
    setBs7671Result(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('parse-bs7671');

      if (invokeError) {
        throw invokeError;
      }

      setBs7671Result(data);
      setBs7671Status('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setBs7671Error(err instanceof Error ? err.message : 'Unknown error');
      setBs7671Status('error');
    }
  };

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
      const { data, error: invokeError } = await supabase.functions.invoke('parse-guidance-note-3');

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

  const processEmergencyLighting = async () => {
    setElStatus('loading');
    setElError('');
    setElResult(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('parse-emergency-lighting');

      if (invokeError) {
        throw invokeError;
      }

      setElResult(data);
      setElStatus('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setElError(err instanceof Error ? err.message : 'Unknown error');
      setElStatus('error');
    }
  };

  const processBook1 = async () => {
    setBook1Status('loading');
    setBook1Error('');
    setBook1Result(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('parse-city-guilds-book-1');

      if (invokeError) {
        throw invokeError;
      }

      setBook1Result(data);
      setBook1Status('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setBook1Error(err instanceof Error ? err.message : 'Unknown error');
      setBook1Status('error');
    }
  };

  const processBook2 = async () => {
    setBook2Status('loading');
    setBook2Error('');
    setBook2Result(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('parse-city-guilds-book-2');

      if (invokeError) {
        throw invokeError;
      }

      setBook2Result(data);
      setBook2Status('success');
      
    } catch (err) {
      console.error('Processing error:', err);
      setBook2Error(err instanceof Error ? err.message : 'Unknown error');
      setBook2Status('error');
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

        {/* Emergency Lighting */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Emergency Lighting Guide (BS 5266)</p>
                <p className="text-sm text-muted-foreground">
                  Emergency escape lighting, exit signs, testing & maintenance - ~30 seconds
                </p>
              </div>
            </div>

            <Button 
              onClick={processEmergencyLighting} 
              disabled={elStatus === 'loading'}
              className="w-full"
              size="lg"
            >
              {elStatus === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing Emergency Lighting...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process Emergency Lighting
                </>
              )}
            </Button>

            {elStatus === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~1,000 lines...</p>
                <p>Quick processing - less than 1 minute...</p>
              </div>
            )}

            {elStatus === 'success' && elResult && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Processed: <strong>{elResult.chunksProcessed}</strong></p>
                </div>
              </div>
            )}

            {elStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{elError}</p>
              </div>
            )}
          </div>
        </Card>

        {/* City & Guilds Book 1 */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">City & Guilds Book 1 (Level 2/3)</p>
                <p className="text-sm text-muted-foreground">
                  H&S, cable selection, safe isolation, testing methods - ~10-11 minutes
                </p>
              </div>
            </div>

            <Button 
              onClick={processBook1} 
              disabled={book1Status === 'loading'}
              className="w-full"
              size="lg"
            >
              {book1Status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing Book 1...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process City & Guilds Book 1
                </>
              )}
            </Button>

            {book1Status === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~26,000 lines...</p>
                <p>Creating ~217 chunks with embeddings...</p>
                <p>This may take 10-11 minutes...</p>
              </div>
            )}

            {book1Status === 'success' && book1Result && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Processed: <strong>{book1Result.chunksProcessed}</strong></p>
                </div>
              </div>
            )}

            {book1Status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{book1Error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* City & Guilds Book 2 */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">City & Guilds Book 2 (Level 3 Advanced)</p>
                <p className="text-sm text-muted-foreground">
                  Motor control, distribution design, 3-phase systems, renewables - ~12-14 minutes
                </p>
              </div>
            </div>

            <Button 
              onClick={processBook2} 
              disabled={book2Status === 'loading'}
              className="w-full"
              size="lg"
            >
              {book2Status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing Book 2...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process City & Guilds Book 2
                </>
              )}
            </Button>

            {book2Status === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~30,000 lines...</p>
                <p>Creating ~252 chunks with embeddings...</p>
                <p>This may take 12-14 minutes...</p>
              </div>
            )}

            {book2Status === 'success' && book2Result && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Processing Complete!
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Processed: <strong>{book2Result.chunksProcessed}</strong></p>
                </div>
              </div>
            )}

            {book2Status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{book2Error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* BS 7671 Wiring Regulations */}
        <Card className="p-6 border-2 border-primary/50">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-primary">BS 7671:2018+A3:2024 (Wiring Regulations)</p>
                <p className="text-sm text-muted-foreground">
                  🔥 FOUNDATIONAL DOCUMENT - The legal basis for all electrical installations
                </p>
              </div>
            </div>

            <Button 
              onClick={processBS7671} 
              disabled={bs7671Status === 'loading'}
              className="w-full"
              size="lg"
              variant="default"
            >
              {bs7671Status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing BS 7671...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Process BS 7671 Wiring Regulations
                </>
              )}
            </Button>

            {bs7671Status === 'loading' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing ~20,000 lines...</p>
                <p>Extracting regulation numbers, parts, chapters, sections...</p>
                <p>Creating intelligent chunks with metadata...</p>
                <p className="font-semibold text-primary mt-2">This may take 15-20 minutes...</p>
              </div>
            )}

            {bs7671Status === 'success' && bs7671Result && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    BS 7671 Successfully Processed! 🎉
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>✅ Chunks Created: <strong>{bs7671Result.chunks_created}</strong></p>
                  <p>✅ Embeddings Processed: <strong>{bs7671Result.chunks_processed}</strong></p>
                  <p className="text-xs text-muted-foreground mt-3">
                    All agents now have access to BS 7671 regulations via RAG search
                  </p>
                </div>
              </div>
            )}

            {bs7671Status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Processing Failed
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">{bs7671Error}</p>
              </div>
            )}
          </div>
        </Card>

        <div className="text-sm text-muted-foreground text-center">
          <p>After processing, these guides will be available to:</p>
          <p className="font-semibold mt-1">
            Designer Agent • Installer Agent • Commissioning Agent • Cost Engineer • Apprentice Learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessOnsiteGuide;
