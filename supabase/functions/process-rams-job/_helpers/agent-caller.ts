/**
 * Call Health & Safety and Installer agents in parallel with timeouts
 */
export async function callAgentsParallel(
  supabase: any,
  jobId: string,
  projectDetails: any,
  description: string
) {
  const AGENT_TIMEOUT = 420000; // 7 minutes
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AGENT_TIMEOUT);

  try {
    const [hsResult, installerResult] = await Promise.allSettled([
      supabase.functions.invoke('health-safety-v3', {
        body: {
          query: description,
          projectDetails,
          jobId
        },
        signal: controller.signal
      }),
      supabase.functions.invoke('installer-rag-direct', {
        body: {
          query: description,
          projectDetails,
          jobId
        },
        signal: controller.signal
      })
    ]);

    clearTimeout(timeoutId);
    return { hsResult, installerResult };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Extract and validate agent results
 */
export function extractAgentResults(hsResult: any, installerResult: any) {
  let hsData, hsError, installerData, installerError;

  // Extract H&S data
  if (hsResult.status === 'fulfilled') {
    const result = hsResult.value as any;
    
    console.log('🔍 [DIAGNOSTIC] Full H&S result object:', {
      hasData: !!result.data,
      hasError: !!result.error,
      dataType: typeof result.data,
      errorType: typeof result.error,
      dataKeys: result.data ? Object.keys(result.data) : [],
      dataSuccess: result.data?.success,
      errorMessage: result.error?.message || result.error,
      rawResultSample: JSON.stringify(result).slice(0, 500)
    });
    
    if (result.data && result.data.success === false) {
      console.error('❌ H&S edge function returned error in .data:', result.data.error);
      hsError = new Error(result.data.error || 'Health & Safety generation failed');
      hsData = null;
    } else {
      hsData = result.data;
      hsError = result.error;
    }
  } else {
    hsError = hsResult.reason;
  }

  // Extract Installer data
  if (installerResult.status === 'fulfilled') {
    const result = installerResult.value as any;
    installerData = result.data;
    installerError = result.error;
  } else {
    installerError = installerResult.reason;
  }

  return { hsData, hsError, installerData, installerError };
}
