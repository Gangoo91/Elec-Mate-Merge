/**
 * Design Pattern Learning & Caching
 * Phase 3: Learning Loop
 * UPGRADE: Feedback-driven confidence adjustment
 */

import { createClient } from './deps.ts';

/**
 * Create a deterministic hash using Web Crypto API
 */
async function createPatternHash(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface DesignPattern {
  circuitType: string;
  powerRating: number;
  voltage: number;
  cableLength?: number;
  designSolution: any;
  regulationsCited: string[];
}

export async function searchDesignPattern(
  circuitType: string,
  powerRating: number,
  voltage: number,
  cableLength?: number
): Promise<{ found: boolean; pattern?: any; confidence: number }> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Search for similar patterns
  const { data, error } = await supabase
    .from('design_patterns')
    .select('*')
    .eq('circuit_type', circuitType)
    .gte('power_rating', powerRating * 0.95) // ±5% tolerance
    .lte('power_rating', powerRating * 1.05)
    .eq('voltage', voltage)
    .order('success_count', { ascending: false })
    .order('confidence_score', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return { found: false, confidence: 0 };
  }

  const pattern = data[0];
  
  // Check if cable length is similar (if provided)
  if (cableLength && pattern.cable_length) {
    const lengthDiff = Math.abs(cableLength - pattern.cable_length) / cableLength;
    if (lengthDiff > 0.2) { // More than 20% different
      return { found: false, confidence: 0 };
    }
  }

  // Calculate confidence based on success count and recency
  const daysSinceLastUse = (Date.now() - new Date(pattern.last_used).getTime()) / (1000 * 60 * 60 * 24);
  const recencyFactor = Math.max(0, 1 - (daysSinceLastUse / 365)); // Decay over 1 year
  const successFactor = Math.min(1, pattern.success_count / 10); // Cap at 10 uses
  const confidence = (pattern.confidence_score * 0.5) + (recencyFactor * 0.3) + (successFactor * 0.2);

  console.log(`🎯 Found pattern match: ${pattern.success_count} uses, ${confidence.toFixed(2)} confidence`);

  return {
    found: true,
    pattern: pattern.design_solution,
    confidence: Math.round(confidence * 100),
  };
}

export async function storeDesignPattern(
  pattern: DesignPattern,
  responseTimeMs: number
): Promise<void> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Create deterministic hash
  const patternKey = `${pattern.circuitType}-${pattern.powerRating}-${pattern.voltage}-${pattern.cableLength || 0}`;
  const patternHash = await createPatternHash(patternKey);

  const { data, error } = await supabase.rpc('upsert_design_pattern', {
    p_pattern_hash: patternHash,
    p_circuit_type: pattern.circuitType,
    p_power_rating: pattern.powerRating,
    p_voltage: pattern.voltage,
    p_cable_length: pattern.cableLength || null,
    p_design_solution: pattern.designSolution,
    p_regulations_cited: pattern.regulationsCited,
    p_response_time: responseTimeMs,
  });

  if (error) {
    console.error('❌ Failed to store pattern:', error);
  } else {
    console.log(`💾 Pattern stored/updated: ${patternHash}`);
  }
}

/**
 * IMPROVEMENT #5: Pattern Feedback Loop
 * Adjusts pattern confidence based on actual usage success/failure
 */
export async function recordPatternFeedback(
  patternId: string,
  wasSuccessful: boolean,
  userComment?: string
): Promise<void> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Positive feedback: small confidence boost
  // Negative feedback: larger confidence penalty
  const adjustment = wasSuccessful ? 0.05 : -0.10;
  
  console.log(`📊 Pattern feedback: ${wasSuccessful ? 'SUCCESS' : 'FAILURE'} (adjustment: ${adjustment})`);
  
  // Fetch current values
  const { data: pattern, error: fetchError } = await supabase
    .from('design_patterns')
    .select('confidence_score, success_count')
    .eq('id', patternId)
    .single();
  
  if (fetchError) {
    console.error('❌ Failed to fetch pattern:', fetchError);
    return;
  }
  
  // Calculate new values (clamped between 0.3 and 1.0)
  const newConfidence = Math.max(0.3, Math.min(1.0, (pattern?.confidence_score ?? 0.3) + adjustment));
  const newSuccessCount = wasSuccessful ? (pattern?.success_count ?? 0) + 1 : (pattern?.success_count ?? 0);
  
  // Update pattern
  const { error } = await supabase
    .from('design_patterns')
    .update({
      confidence_score: newConfidence,
      success_count: newSuccessCount,
      last_used: new Date().toISOString(),
    })
    .eq('id', patternId);
  
  if (error) {
    console.error('❌ Failed to record pattern feedback:', error);
  } else {
    console.log(`✅ Pattern confidence updated: ${wasSuccessful ? '+5%' : '-10%'}`);
  }
  
  // Optional: Store feedback comment for learning review
  if (userComment) {
    console.log(`💬 User feedback: "${userComment}"`);
    // Could store in learning_review_queue for manual review
  }
}

/**
 * Record pattern usage (when pattern is retrieved, before knowing if successful)
 */
export async function recordPatternUsage(patternId: string): Promise<void> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  await supabase
    .from('design_patterns')
    .update({ last_used: new Date().toISOString() })
    .eq('id', patternId);
}
