/**
 * Offline Regulation Intelligence Enrichment - UNIVERSAL RAG
 * 
 * Extracts universal RAG metadata from BS 7671 regulations
 * Used by ALL agents (not just health-safety)
 * 
 * Target: regulations_intelligence table
 * Cost: ~£2 one-time (2,557 regs × £0.0008), ~£0.50/quarter for updates
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ENRICHMENT_VERSION = 'v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { batchSize = 50, startFrom = 0, jobId } = await req.json().catch(() => ({}));
    
    console.log(`🚀 Starting enrichment: batch=${batchSize}, startFrom=${startFrom}, jobId=${jobId}`);
    
    // Fetch batch of regulations
    const { data: regulations, error: fetchError } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .order('created_at', { ascending: true })
      .range(startFrom, startFrom + batchSize - 1);
    
    if (fetchError) throw fetchError;
    
    if (!regulations || regulations.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No regulations to process',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for checkpoint to resume from
    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
    let startIndex = resumeFromId ? regulations.findIndex(r => r.id === resumeFromId) + 1 : 0;
    
    console.log(resumeFromId ? `▶️ Resuming from checkpoint at reg ${startIndex}` : '🆕 Starting fresh batch');
    
    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0;
    let totalProcessingTime = 0;
    
    for (let i = startIndex; i < regulations.length; i++) {
      const reg = regulations[i];
      const regStartTime = Date.now();
      
      console.log(`\n📖 [${i + 1}/${regulations.length}] Processing: ${reg.regulation_number}`);
      
      try {
        // Check if already enriched with current version
        const contentHash = await hashContent(reg.content);
        const { data: existing } = await supabase
          .from('regulations_intelligence')
          .select('enrichment_version, source_hash')
          .eq('regulation_id', reg.id)
          .limit(1);
        
        if (existing && existing.length > 0) {
          const first = existing[0];
          if (first.enrichment_version === ENRICHMENT_VERSION && first.source_hash === contentHash) {
            console.log(`⏭️ Skipping ${reg.regulation_number} - already enriched`);
            skipped++;
            continue;
          }
        }
        
        // Extract RAG intelligence using GPT-5 Mini
        const intelligence = await extractRegulationIntelligence(reg, OPENAI_API_KEY);
        
        if (!intelligence) {
          console.log(`⚠️ No intelligence extracted from ${reg.regulation_number}`);
          qualityFailed++;
          failed++;
          continue;
        }
        
        // Quality validation
        if (!validateIntelligenceQuality(intelligence)) {
          console.warn(`⚠️ Quality check failed for ${reg.regulation_number}`);
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;
        
        console.log(`✅ Extracted intelligence: ${intelligence.primary_topic} (quality passed)`);
        
        // Delete old enrichment if updating
        if (existing && existing.length > 0) {
          await supabase
            .from('regulations_intelligence')
            .delete()
            .eq('regulation_id', reg.id);
        }
        
        // Insert intelligence
        const { error: insertError } = await supabase
          .from('regulations_intelligence')
          .insert({
            regulation_id: reg.id,
            regulation_number: reg.regulation_number,
            keywords: intelligence.keywords || [],
            category: intelligence.category,
            subcategory: intelligence.subcategory || null,
            technical_level: intelligence.technical_level || 3,
            primary_topic: intelligence.primary_topic,
            related_regulations: intelligence.related_regulations || [],
            applies_to: intelligence.applies_to || ['domestic', 'commercial', 'industrial'],
            confidence_score: 0.90,
            enrichment_version: ENRICHMENT_VERSION,
            source_hash: contentHash
          });
        
        if (insertError) {
          console.error(`❌ Insert error for intelligence:`, insertError);
          failed++;
          continue;
        }
        
        processed++;
        const regProcessingTime = Date.now() - regStartTime;
        totalProcessingTime += regProcessingTime;
        
        // Save checkpoint every 25 docs
        if ((i + 1) % 25 === 0 || i === regulations.length - 1) {
          await supabase.from('batch_progress').update({
            last_checkpoint: {
              last_processed_id: reg.id,
              processed_count: i + 1,
              timestamp: new Date().toISOString()
            },
            items_processed: startFrom + i + 1,
            data: {
              quality_passed: qualityPassed,
              quality_failed: qualityFailed,
              avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1),
              api_cost_gbp: (i - startIndex + 1) * 0.0017,
              last_updated: new Date().toISOString()
            }
          }).eq('job_id', jobId).eq('batch_number', Math.floor(startFrom / batchSize));
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${reg.regulation_number}:`, error);
        failed++;
      }
    }
    
    console.log(`\n✅ Batch complete: ${processed} processed, ${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed`);
    
    return new Response(JSON.stringify({
      success: true,
      processed,
      failed,
      skipped,
      qualityPassed,
      qualityFailed,
      total: regulations.length,
      nextStartFrom: startFrom + batchSize,
      hasMore: regulations.length === batchSize
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Enrichment pipeline error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

/**
 * Extract universal RAG intelligence using GPT-5 Mini
 * Simplified 6-field extraction for higher success rate
 */
async function extractRegulationIntelligence(regulation: any, apiKey: string) {
  const prompt = `Extract metadata from this electrical regulation for RAG search.

REGULATION:
${regulation.regulation_number}: ${regulation.section}
${regulation.content}

Return JSON with EXACTLY this structure:
{
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "category": "Protection | Installation | Testing | Design | Equipment | Safety",
  "subcategory": "Specific topic within category",
  "technical_level": 1-5,
  "primary_topic": "One sentence summary of what this regulation covers",
  "related_regulations": ["522.8", "433.1.1"],
  "applies_to": ["domestic", "commercial", "industrial"]
}

Technical levels: 1=Basic apprentice, 2=Qualified electrician, 3=Experienced electrician, 4=Designer/Engineer, 5=Expert

Return ONLY valid JSON. No additional text.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [{
        role: 'system',
        content: 'You are an electrical regulation expert. Extract structured RAG metadata. Return valid JSON only.'
      }, {
        role: 'user',
        content: prompt
      }],
      max_completion_tokens: 1000,
      response_format: { type: 'json_object' },
      temperature: 0.1
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GPT-5 Mini API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    console.error('Failed to parse GPT-5 Mini response:', content);
    return null;
  }
}

/**
 * Validate quality of extracted intelligence
 */
function validateIntelligenceQuality(intelligence: any): boolean {
  if (!intelligence) return false;
  return intelligence.keywords?.length >= 3 &&
         intelligence.category?.length > 0 &&
         intelligence.primary_topic?.length > 20 &&
         Array.isArray(intelligence.applies_to) && intelligence.applies_to.length > 0;
}

/**
 * Hash content for change detection
 */
async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
