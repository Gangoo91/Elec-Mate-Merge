/**
 * One-time script to process On-Site Guide and add to RAG
 * Run this from browser console or as a standalone script
 */

import { supabase } from "@/integrations/supabase/client";

export async function processOnsiteGuideNow() {
  console.log('🚀 Starting On-Site Guide RAG processing...');
  
  try {
    // Fetch the uploaded file
    const response = await fetch('/data/ONSITEGUIDE.txt');
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.statusText}`);
    }
    
    const fileContent = await response.text();
    console.log(`📄 Loaded ${fileContent.length} characters from On-Site Guide`);
    
    // Invoke the edge function
    console.log('🔄 Calling parse-onsite-guide edge function...');
    const { data, error } = await supabase.functions.invoke('parse-onsite-guide', {
      body: { fileContent }
    });
    
    if (error) {
      console.error('❌ Error:', error);
      throw error;
    }
    
    console.log('✅ Processing complete!');
    console.log(`📊 Chunks created: ${data.chunksCreated}`);
    console.log(`💾 Embeddings processed: ${data.embeddingsProcessed}`);
    
    if (data.sampleChunks) {
      console.log('\n📝 Sample chunks:');
      data.sampleChunks.forEach((chunk: any, idx: number) => {
        console.log(`\n${idx + 1}. ${chunk.section}`);
        console.log(`   ${chunk.contentPreview}`);
        console.log(`   Regs: ${chunk.metadata.regulation_refs.join(', ') || 'none'}`);
      });
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Failed to process On-Site Guide:', error);
    throw error;
  }
}

// Auto-run if imported directly
if (typeof window !== 'undefined') {
  console.log('Run processOnsiteGuideNow() to start processing');
}
