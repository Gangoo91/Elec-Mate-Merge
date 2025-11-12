/**
 * Hazard Usage Tracking
 * Self-optimization: Learn from which hazards are actually used
 */

import { SupabaseClient } from 'jsr:@supabase/supabase-js@2';

/**
 * Track which retrieved hazards were actually used in final RAMS
 * Updates confidence scores and usage counts for self-optimization
 */
export async function trackHazardUsage(params: {
  retrievedHazardIds: string[];
  usedHazardIds: string[];
  supabase: SupabaseClient;
}) {
  
  console.log('🧠 Tracking hazard usage for self-optimization');
  
  try {
    // Track each retrieved hazard
    for (const hazardId of params.retrievedHazardIds) {
      const wasUsed = params.usedHazardIds.includes(hazardId);
      
      if (wasUsed) {
        // Increment usage count and boost confidence
        await params.supabase.rpc('increment_hazard_usage', { 
          hazard_id: hazardId 
        });
        
        console.log(`✅ Hazard ${hazardId} was used - boosting confidence`);
      } else {
        // Skip penalty - regulation_hazards_extracted table doesn't exist
        // Using regulations_intelligence which doesn't support this feature yet
        console.log(`➖ Hazard ${hazardId} not used (tracking skipped)`);
      }
    }
    
    console.log('✅ Hazard usage tracking complete');
  } catch (error) {
    console.error('❌ Hazard tracking error:', error);
  }
}

/**
 * Extract hazard IDs from RAMS data
 */
export function extractUsedHazardIds(ramsData: any): string[] {
  if (!ramsData || !Array.isArray(ramsData.hazards)) {
    return [];
  }
  
  return ramsData.hazards
    .filter((h: any) => h.regulation_id)
    .map((h: any) => h.regulation_id);
}
