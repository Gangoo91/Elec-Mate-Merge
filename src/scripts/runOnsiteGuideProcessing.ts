import { supabase } from "@/integrations/supabase/client";

async function run() {
  console.log('🚀 Starting On-Site Guide processing...');
  
  try {
    // Load the file
    const response = await fetch('/data/ONSITEGUIDE.txt');
    const fileContent = await response.text();
    console.log(`📄 Loaded ${fileContent.length} characters`);
    
    // Process via edge function
    console.log('🔄 Calling edge function...');
    const { data, error } = await supabase.functions.invoke('parse-onsite-guide', {
      body: { fileContent }
    });
    
    if (error) throw error;
    
    console.log('✅ SUCCESS!');
    console.log(`Chunks: ${data.chunksCreated}`);
    console.log(`Embeddings: ${data.embeddingsProcessed}`);
    console.log('Sample:', data.sampleChunks);
    
    return data;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// Execute immediately
run().then(() => {
  console.log('✅ Done!');
}).catch(err => {
  console.error('Failed:', err);
});
