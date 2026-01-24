/**
 * Enrich Design Intelligence Fields
 * 
 * Programmatically extracts cable_sizes and load_types from existing
 * design_knowledge_intelligence records using regex and keyword mapping.
 * 
 * No GPT required - pure regex/keyword extraction for fast, reliable enrichment.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// CABLE SIZE EXTRACTION (Regex-based)
// ============================================================================

function extractCableSizes(content: string): string[] {
  const sizes = new Set<string>();
  
  // Pattern matches: 1.5mm², 1.5 mm2, 1.5mm2, 1.5 mm^2, etc.
  const patterns = [
    /(\d+(?:\.\d+)?)\s*mm²/gi,           // 1.5mm², 2.5mm²
    /(\d+(?:\.\d+)?)\s*mm2/gi,           // 1.5mm2, 2.5mm2
    /(\d+(?:\.\d+)?)\s*mm\^2/gi,         // 1.5mm^2
    /(\d+(?:\.\d+)?)\s+mm²/gi,           // 1.5 mm²
    /(\d+(?:\.\d+)?)\s+mm2/gi,           // 1.5 mm2
    /S\s*=\s*(\d+(?:\.\d+)?)\s*mm/gi,    // S = 4 mm
  ];
  
  // Valid standard cable sizes to filter by
  const validSizes = new Set([
    '1', '1.5', '2.5', '4', '6', '10', '16', '25', 
    '35', '50', '70', '95', '120', '150', '185', '240', '300'
  ]);
  
  for (const pattern of patterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const size = match[1];
      if (validSizes.has(size)) {
        sizes.add(`${size}mm²`);  // Normalise to standard format
      }
    }
  }
  
  return Array.from(sizes);
}

// ============================================================================
// LOAD TYPE EXTRACTION (Keyword Mapping)
// ============================================================================

const LOAD_TYPE_KEYWORDS: Record<string, string[]> = {
  'socket': ['socket', 'socket outlet', 'socket-outlet', 'ring final', 'radial socket'],
  'lighting': ['lighting', 'luminaire', 'lamp', 'light fitting', 'LED'],
  'motor': ['motor', 'pump', 'fan', 'compressor', 'drive'],
  'heating': ['heating', 'heater', 'immersion', 'thermal', 'electric heating'],
  'cooker': ['cooker', 'hob', 'oven', 'cooking appliance'],
  'shower': ['shower', 'electric shower', 'instantaneous water heater'],
  'electric_vehicle_charger': ['EV charger', 'electric vehicle', 'charging point', 'EVCP'],
  'general': ['general load', 'general circuit', 'final circuit'],
  'control circuits': ['control circuit', 'control system', 'automation'],
  'discharge lighting': ['discharge lamp', 'fluorescent', 'HID'],
};

function extractLoadTypes(content: string): string[] {
  const loadTypes = new Set<string>();
  const lowerContent = content.toLowerCase();
  
  for (const [loadType, keywords] of Object.entries(LOAD_TYPE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerContent.includes(keyword.toLowerCase())) {
        loadTypes.add(loadType);
        break;  // Found match, move to next load type
      }
    }
  }
  
  return Array.from(loadTypes);
}

// ============================================================================
// BATCH PROCESSING
// ============================================================================

async function enrichBatch(
  supabase: any,
  startFrom: number,
  batchSize: number = 100
): Promise<{ processed: number; updated: number; errors: number }> {
  console.log(`Processing batch starting at ${startFrom}...`);
  
  // Query records needing enrichment
  const { data: records, error: fetchError } = await supabase
    .from('design_knowledge_intelligence')
    .select('id, content, cable_sizes, load_types')
    .range(startFrom, startFrom + batchSize - 1);
  
  if (fetchError) {
    console.error('Fetch error:', fetchError);
    return { processed: 0, updated: 0, errors: 1 };
  }
  
  if (!records || records.length === 0) {
    console.log('No more records to process');
    return { processed: 0, updated: 0, errors: 0 };
  }
  
  let updated = 0;
  let errors = 0;
  
  for (const record of records) {
    try {
      const extractedCables = extractCableSizes(record.content || '');
      const extractedLoads = extractLoadTypes(record.content || '');
      
      // Only update if we found new data
      const needsCableUpdate = extractedCables.length > 0 && 
        (!record.cable_sizes || record.cable_sizes.length === 0);
      const needsLoadUpdate = extractedLoads.length > 0 && 
        (!record.load_types || record.load_types.length === 0);
      
      if (needsCableUpdate || needsLoadUpdate) {
        const updateData: any = {};
        if (needsCableUpdate) updateData.cable_sizes = extractedCables;
        if (needsLoadUpdate) updateData.load_types = extractedLoads;
        
        const { error: updateError } = await supabase
          .from('design_knowledge_intelligence')
          .update(updateData)
          .eq('id', record.id);
        
        if (updateError) {
          console.error(`Update error for record ${record.id}:`, updateError);
          errors++;
        } else {
          updated++;
          console.log(`✓ Updated record ${record.id}: cables=${extractedCables.join(', ')}, loads=${extractedLoads.join(', ')}`);
        }
      }
    } catch (err) {
      console.error(`Processing error for record ${record.id}:`, err);
      errors++;
    }
  }
  
  return { processed: records.length, updated, errors };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { batchSize = 100, maxBatches = 100 } = await req.json().catch(() => ({}));
    
    console.log(`Starting enrichment: batchSize=${batchSize}, maxBatches=${maxBatches}`);
    
    let totalProcessed = 0;
    let totalUpdated = 0;
    let totalErrors = 0;
    let currentBatch = 0;
    
    // Process batches
    while (currentBatch < maxBatches) {
      const result = await enrichBatch(supabase, currentBatch * batchSize, batchSize);
      
      totalProcessed += result.processed;
      totalUpdated += result.updated;
      totalErrors += result.errors;
      
      console.log(`Batch ${currentBatch + 1} complete: processed=${result.processed}, updated=${result.updated}, errors=${result.errors}`);
      
      // Stop if we processed fewer records than batch size (end of data)
      if (result.processed < batchSize) {
        break;
      }
      
      currentBatch++;
      
      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const summary = {
      success: true,
      totalProcessed,
      totalUpdated,
      totalErrors,
      batchesRun: currentBatch + 1,
      message: `Enrichment complete: ${totalUpdated} records updated out of ${totalProcessed} processed`
    };
    
    console.log('Final summary:', summary);
    
    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
  } catch (error) {
    console.error('Handler error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
