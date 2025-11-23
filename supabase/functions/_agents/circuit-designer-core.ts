/**
 * Circuit Designer Agent Core
 * Wrapper that calls designer-agent-v2 edge function
 * Mirrors health-safety-core.ts and installer-core.ts pattern
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { lovableAICircuit } from '../_shared/circuit-breaker.ts';

// Internal function for single design attempt
async function designCircuitsInternal(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  const startTime = Date.now();
  
  // PHASE 4: Check circuit breaker before proceeding
  if (lovableAICircuit.isOpen()) {
    throw new Error(
      `Circuit breaker OPEN for Designer Agent - service temporarily unavailable. ` +
      `Too many recent failures. Will retry automatically in 60 seconds.`
    );
  }
  
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
    
    // PHASE 1: Enhanced error propagation - Call designer-agent-v3 via Supabase client
    try {
      const { data, error } = await supabase.functions.invoke('designer-agent-v3', {
        body: designRequest
      });
      
      // Capture actual error details from response with defensive checks
      if (error) {
        console.error('❌ Designer v3 failed, attempting v2 fallback...', {
          message: error?.message || 'Unknown error',
          context: error?.context || {},
          name: error?.name || 'Error',
          code: (error as any)?.code || 'UNKNOWN',
          timestamp: new Date().toISOString(),
          fullError: JSON.stringify(error).substring(0, 500) // Capture full error for debugging
        });
        
        // FALLBACK: Try designer-agent-v2 (proven stable)
        await progressCallback(30, 'Designer: Retrying with backup system...');
        
        const { data: v2Data, error: v2Error } = await supabase.functions.invoke('designer-agent-v2', {
          body: designRequest
        });
        
        if (v2Error || !v2Data?.success) {
          console.error('❌ Designer v2 fallback also failed:', {
            v2Error: v2Error?.message,
            v2Data: v2Data
          });
          
          throw new Error(
            `Both v3 and v2 designers failed.\n` +
            `V3 Error: ${error.message}\n` +
            `V2 Error: ${v2Error?.message || v2Data?.error || 'Unknown v2 error'}`
          );
        }
        
        console.warn('⚠️ V3 failed but V2 fallback succeeded');
        
        await progressCallback(70, 'Designer: Verifying voltage drop...');
        await progressCallback(90, 'Designer: Finalising calculations...');
        await progressCallback(100, 'Designer: Complete ✓ (via v2 fallback)');
        
        const duration = Date.now() - startTime;
        console.log(`✅ Designer completed ${v2Data.circuits.length} circuits via V2 fallback in ${(duration/1000).toFixed(1)}s`);
        
        lovableAICircuit.onSuccess();
        
        return {
          circuits: v2Data.circuits,
          supply: v2Data.supply,
          reasoning: v2Data.reasoning,
          validationPassed: v2Data.validationPassed,
          validationIssues: v2Data.validationIssues,
          autoFixSuggestions: v2Data.autoFixSuggestions,
          fromCache: v2Data.fromCache || false,
          processingTime: duration,
          usedFallback: true
        };
      }
      
      // Check if response indicates failure
      if (!data || !data.success) {
        const failureReason = data?.error || data?.message || 'Unknown failure';
        const errorCode = data?.code || 'NO_RESPONSE';
        
        console.error('❌ Designer returned unsuccessful response:', {
          success: data?.success,
          error: failureReason,
          code: errorCode,
          hasCircuits: !!data?.circuits,
          dataKeys: data ? Object.keys(data) : []
        });
        
        throw new Error(
          `Designer agent returned failure: ${failureReason} [Code: ${errorCode}]`
        );
      }
      
      // Verify we have circuits
      if (!data.circuits || !Array.isArray(data.circuits) || data.circuits.length === 0) {
        console.error('❌ Designer returned no circuits:', {
          hasData: !!data,
          hasCircuits: !!data?.circuits,
          circuitsIsArray: Array.isArray(data?.circuits),
          circuitCount: data?.circuits?.length || 0,
          dataKeys: data ? Object.keys(data) : []
        });
        
        throw new Error(
          `Designer agent returned no circuits. Response structure: ${JSON.stringify(data).substring(0, 300)}`
        );
      }
      
      await progressCallback(70, 'Designer: Verifying voltage drop...');
      await progressCallback(90, 'Designer: Finalising calculations...');
      await progressCallback(100, 'Designer: Complete ✓');
      
      const duration = Date.now() - startTime;
      console.log(`✅ Designer completed ${data.circuits.length} circuit designs in ${(duration/1000).toFixed(1)}s`);
      
      // PHASE 4: Record success in circuit breaker
      lovableAICircuit.onSuccess();
      
      return {
        circuits: data.circuits,
        supply: data.supply,
        reasoning: data.reasoning,
        validationPassed: data.validationPassed,
        validationIssues: data.validationIssues,
        autoFixSuggestions: data.autoFixSuggestions,
        fromCache: data.fromCache || false,
        processingTime: duration
      };
      
    } catch (caughtError) {
      // PHASE 4: Record failure in circuit breaker
      lovableAICircuit.onFailure();
      
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

// PHASE 3: Smart retry with circuit splitting
export async function designCircuits(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[],
  attemptNumber: number = 1
): Promise<any> {
  
  console.log(`🔧 Circuit Designer Agent starting (attempt ${attemptNumber})...`);
  
  try {
    // Use retry wrapper for retryable errors (timeout, rate limit, 502/503)
    return await withRetry(
      () => designCircuitsInternal(jobInputs, progressCallback, sharedRegulations),
      {
        ...RetryPresets.STANDARD,
        shouldRetry: (error: unknown) => {
          if (error instanceof Error) {
            const message = error.message.toLowerCase();
            return message.includes('timeout') ||
                   message.includes('rate limit') ||
                   message.includes('502') ||
                   message.includes('503') ||
                   message.includes('429') ||
                   message.includes('econnreset');
          }
          return false;
        }
      }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    // PHASE 3: If first attempt failed and we have many circuits, split and retry
    if (attemptNumber === 1 && jobInputs.circuits && jobInputs.circuits.length > 5) {
      console.warn(`⚠️ Design failed with ${jobInputs.circuits.length} circuits. Splitting into batches...`);
      
      await progressCallback(15, 'Designer: Retrying with split batches...');
      
      const halfLength = Math.ceil(jobInputs.circuits.length / 2);
      const firstHalf = jobInputs.circuits.slice(0, halfLength);
      const secondHalf = jobInputs.circuits.slice(halfLength);
      
      console.log(`🔄 Splitting: Batch 1 (${firstHalf.length} circuits), Batch 2 (${secondHalf.length} circuits)`);
      
      // Process both batches in parallel
      const [firstResult, secondResult] = await Promise.all([
        designCircuits(
          { ...jobInputs, circuits: firstHalf },
          progressCallback,
          sharedRegulations,
          2
        ),
        designCircuits(
          { ...jobInputs, circuits: secondHalf },
          progressCallback,
          sharedRegulations,
          2
        )
      ]);
      
      console.log(`✅ Split design completed: ${firstResult.circuits.length + secondResult.circuits.length} total circuits`);
      
      return {
        circuits: [...firstResult.circuits, ...secondResult.circuits],
        metadata: {
          completedAt: new Date().toISOString(),
          regulationsUsed: sharedRegulations?.length || 0,
          totalCircuits: firstResult.circuits.length + secondResult.circuits.length,
          retriedWithSplit: true,
          batchCount: 2
        }
      };
    }
    
    // No more retries, throw final error
    console.error(`❌ All design attempts failed after ${attemptNumber} attempt(s):`, errorMsg);
    throw error;
  }
}
