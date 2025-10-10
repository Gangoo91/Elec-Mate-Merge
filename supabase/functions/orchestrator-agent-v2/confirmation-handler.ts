// PRIORITY 1: Confirmation Handler
// Handles user confirmation of AI assumptions and resumes agent execution

import { corsHeaders } from '../_shared/deps.ts';

// Cleanup expired confirmation sessions
export function cleanupExpiredConfirmations() {
  const now = Date.now();
  const CONFIRMATION_TTL = 30 * 60 * 1000; // 30 minutes
  
  for (const [id, session] of pendingConfirmations.entries()) {
    if (now - session.timestamp > CONFIRMATION_TTL) {
      pendingConfirmations.delete(id);
      console.log(`🗑️ Cleaned up expired confirmation session: ${id}`);
    }
  }
}

// Handle confirmation POST request
export async function handleConfirmation(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { confirmationId, confirmedAnalysis } = body;
    
    if (!confirmationId || !confirmedAnalysis) {
      return new Response(JSON.stringify({
        error: 'Missing confirmationId or confirmedAnalysis'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Retrieve session
    const session = pendingConfirmations.get(confirmationId);
    
    if (!session) {
      return new Response(JSON.stringify({
        error: 'Confirmation session expired or not found',
        message: 'Please start a new consultation'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`✅ Confirmation received for ${confirmationId}:`, confirmedAnalysis);
    
    // Delete session (one-time use)
    pendingConfirmations.delete(confirmationId);
    
    // Resume execution with confirmed parameters
    // We'll stream the response like normal, but use confirmed analysis
    const { sessionData } = session;
    const { 
      agentPlan, 
      messages, 
      currentDesign, 
      conversationSummary, 
      conversationState,
      latestMessage
    } = sessionData;
    
    // Update the latest message with confirmed params
    const updatedMessage = enhanceMessageWithConfirmedParams(latestMessage, confirmedAnalysis);
    
    // Import handleConversationalMode from main file
    const { handleConversationalMode } = await import('./index.ts');
    
    // Resume with confirmed data
    return await handleConversationalMode(
      agentPlan,
      messages,
      currentDesign,
      conversationSummary,
      conversationState,
      updatedMessage,
      Date.now()
    );
    
  } catch (error) {
    console.error('❌ Confirmation handler error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process confirmation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Helper to enhance message with confirmed parameters
function enhanceMessageWithConfirmedParams(originalMessage: string, confirmedAnalysis: any): string {
  const { interpretedRequirements } = confirmedAnalysis;
  
  let enhanced = originalMessage;
  
  // Append confirmed parameters to message
  const params: string[] = [];
  
  if (interpretedRequirements.load) {
    params.push(`Load: ${interpretedRequirements.load} kW`);
  }
  if (interpretedRequirements.distance) {
    params.push(`Distance: ${interpretedRequirements.distance}m`);
  }
  if (interpretedRequirements.voltage) {
    params.push(`Voltage: ${interpretedRequirements.voltage}V`);
  }
  if (interpretedRequirements.phases) {
    params.push(`Phases: ${interpretedRequirements.phases}-phase`);
  }
  if (interpretedRequirements.environment) {
    params.push(`Environment: ${interpretedRequirements.environment}`);
  }
  
  if (params.length > 0) {
    enhanced += `\n\n[Confirmed parameters: ${params.join(', ')}]`;
  }
  
  return enhanced;
}

// Export for use in main file
declare global {
  var pendingConfirmations: Map<string, any>;
}

if (!globalThis.pendingConfirmations) {
  globalThis.pendingConfirmations = new Map();
}

export const pendingConfirmations = globalThis.pendingConfirmations;
