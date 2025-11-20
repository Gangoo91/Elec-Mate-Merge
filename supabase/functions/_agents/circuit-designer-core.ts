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
  
  await progressCallback(10, 'Designer: Analyzing circuit requirements...');
  
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
  
  // Call designer-agent-v2 via Supabase client
  const { data, error } = await supabase.functions.invoke('designer-agent-v2', {
    body: designRequest
  });
  
  if (error) {
    throw new Error(`Designer agent failed: ${error.message}`);
  }
  
  if (!data || !data.success || !data.design) {
    throw new Error('Designer agent returned no design');
  }
  
  await progressCallback(70, 'Designer: Verifying voltage drop...');
  await progressCallback(90, 'Designer: Finalizing calculations...');
  await progressCallback(100, 'Designer: Complete ✓');
  
  console.log(`✅ Designer completed ${data.design.circuits.length} circuit designs`);
  
  return {
    circuits: data.design.circuits,
    metadata: {
      completedAt: new Date().toISOString(),
      regulationsUsed: sharedRegulations?.length || 0,
      totalCircuits: data.design.circuits.length
    }
  };
}
