/**
 * On-Site Guide RAG Processor
 * Reads the On-Site Guide text file and sends it to the edge function for chunking and embedding
 */

import { supabase } from "@/integrations/supabase/client";

export async function processOnSiteGuide() {
  try {
    console.log('🚀 Starting On-Site Guide RAG processing...');
    
    // Fetch the On-Site Guide text file from public folder
    const response = await fetch('/data/ONSITEGUIDE.txt');
    if (!response.ok) {
      throw new Error('Failed to load On-Site Guide file');
    }
    
    const fileContent = await response.text();
    console.log(`📄 Loaded file: ${fileContent.length} characters`);
    
    // Send to edge function for processing
    const { data, error } = await supabase.functions.invoke('parse-onsite-guide', {
      body: { fileContent }
    });
    
    if (error) {
      console.error('❌ Error processing On-Site Guide:', error);
      throw error;
    }
    
    console.log('✅ On-Site Guide processing complete:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Failed to process On-Site Guide:', error);
    throw error;
  }
}

// Example usage:
// import { processOnSiteGuide } from '@/utils/onsiteGuideProcessor';
// await processOnSiteGuide();
