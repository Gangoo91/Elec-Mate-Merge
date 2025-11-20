/**
 * Circuit Designer Agent Core
 * Wrapper around designer-agent-v2 that accepts progress callbacks and shared RAG
 * Mirrors health-safety-core.ts and installer-core.ts pattern
 */

import { handleBatchDesign } from '../designer-agent-v2/batch-design-handler.ts';

export async function designCircuits(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  
  console.log('🔧 Circuit Designer Agent starting...');
  
  await progressCallback(10, 'Designer: Analyzing circuit requirements...');
  
  // Build request body for designer-agent-v2
  const designRequest = {
    mode: 'batch-design',
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
  
  // Call existing designer-agent-v2 batch handler
  const logger = {
    info: (msg: string, data?: any) => console.log(`[Designer] ${msg}`, data),
    error: (msg: string, data?: any) => console.error(`[Designer] ${msg}`, data)
  };
  
  await progressCallback(40, 'Designer: Calculating cable sizes & protection...');
  
  const response = await handleBatchDesign(designRequest, logger);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Designer agent failed: ${errorText}`);
  }
  
  const result = await response.json();
  
  await progressCallback(70, 'Designer: Verifying voltage drop...');
  await progressCallback(90, 'Designer: Finalizing calculations...');
  
  if (!result.success || !result.designs) {
    throw new Error('Designer agent returned no designs');
  }
  
  await progressCallback(100, 'Designer: Complete ✓');
  
  console.log(`✅ Designer completed ${result.designs.length} circuit designs`);
  
  return {
    circuits: result.designs,
    metadata: {
      completedAt: new Date().toISOString(),
      regulationsUsed: sharedRegulations?.length || 0,
      totalCircuits: result.designs.length
    }
  };
}
