/**
 * Circuit Designer Agent Core
 * Wrapper that calls designer-agent-v2 edge function
 * Mirrors health-safety-core.ts and installer-core.ts pattern
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export async function designCircuits(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  
  console.log('🔧 Circuit Designer Agent starting...');
  const startTime = Date.now();
  
  // PHASE 2: Explicit timeout handling (280s = 4m 40s)
  const FUNCTION_TIMEOUT_MS = 280000;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(
        `Designer agent timeout after ${FUNCTION_TIMEOUT_MS/1000}s. ` +
        `This may indicate: 1) Complex circuits requiring more time, ` +
        `2) OpenAI API slowness, 3) RAG search delays. Try simplifying the design or splitting circuits.`
      ));
    }, FUNCTION_TIMEOUT_MS);
  });
  
  const designPromise = (async () => {
    await progressCallback(10, 'Designer: Analysing circuit requirements...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // Build request body for designer-agent-v2
    const designRequest = {
      mode: 'direct-design',
      projectInfo: jobInputs.projectInfo || {
        projectName: jobInputs.projectName || 'Circuit Design',
        location: jobInputs.location || 'Not specified'
      },
      supply: jobInputs.supply,
      circuits: jobInputs.circuits || [],
      additionalPrompt: jobInputs.additionalPrompt || '',
      specialRequirements: jobInputs.specialRequirements || [],
      sharedRegulations // Pass shared RAG if available
    };
    
    await progressCallback(20, 'Designer: Searching regulations...');
    await progressCallback(40, 'Designer: Calculating cable sizes & protection...');
    
    // PHASE 1: Enhanced error propagation - Call designer-agent-v2 via Supabase client
    try {
      const { data, error } = await supabase.functions.invoke('designer-agent-v2', {
        body: designRequest
      });
      
      // Capture actual error details from response
      if (error) {
        console.error('❌ Designer agent invocation failed:', {
          message: error.message,
          context: error.context,
          name: error.name,
          timestamp: new Date().toISOString()
        });
        
        // Extract detailed error information
        const errorDetails = {
          message: error.message || 'Unknown error',
          code: (error as any).code || 'INVOCATION_ERROR',
          context: error.context || 'No additional context'
        };
        
        throw new Error(
          `Designer agent failed: ${errorDetails.message} ` +
          `[Code: ${errorDetails.code}] ` +
          `[Context: ${JSON.stringify(errorDetails.context)}]`
        );
      }
      
      // Check if response indicates failure
      if (!data || !data.success) {
        const failureReason = data?.error || data?.message || 'Unknown failure';
        const errorCode = data?.code || 'NO_RESPONSE';
        
        console.error('❌ Designer returned unsuccessful response:', {
          success: data?.success,
          error: failureReason,
          code: errorCode,
          hasDesign: !!data?.design,
          dataKeys: data ? Object.keys(data) : []
        });
        
        throw new Error(
          `Designer agent returned failure: ${failureReason} [Code: ${errorCode}]`
        );
      }
      
      // Verify we have design data
      if (!data.design || !data.design.circuits) {
        console.error('❌ Designer returned no design data:', {
          hasData: !!data,
          hasDesign: !!data?.design,
          dataKeys: data ? Object.keys(data) : [],
          designKeys: data?.design ? Object.keys(data.design) : []
        });
        
        throw new Error(
          `Designer agent returned no design data. Response structure: ${JSON.stringify(data).substring(0, 200)}`
        );
      }
      
      await progressCallback(70, 'Designer: Verifying voltage drop...');
      await progressCallback(90, 'Designer: Finalising calculations...');
      await progressCallback(100, 'Designer: Complete ✓');
      
      const duration = Date.now() - startTime;
      console.log(`✅ Designer completed ${data.design.circuits.length} circuit designs in ${(duration/1000).toFixed(1)}s`);
      
      return {
        circuits: data.design.circuits,
        metadata: {
          completedAt: new Date().toISOString(),
          regulationsUsed: sharedRegulations?.length || 0,
          totalCircuits: data.design.circuits.length,
          durationMs: duration
        }
      };
      
    } catch (caughtError) {
      // Log full error for debugging
      console.error('❌ Circuit Designer Core caught error:', {
        error: caughtError,
        message: caughtError instanceof Error ? caughtError.message : 'Unknown',
        stack: caughtError instanceof Error ? caughtError.stack : undefined,
        type: caughtError instanceof Error ? caughtError.constructor.name : typeof caughtError
      });
      
      // Re-throw with context preserved
      throw caughtError;
    }
  })();
  
  // Race timeout against design promise
  return await Promise.race([timeoutPromise, designPromise]);
}
