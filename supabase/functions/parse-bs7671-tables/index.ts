import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface TableChunk {
  table_number: string;
  title: string;
  content: string;
  keywords: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent } = await req.json();

    if (!fileContent) {
      throw new Error("No file content provided");
    }

    console.log("Starting BS 7671 Tables parsing...");

    // Split content by table headers (e.g., "Table 41.2", "Table 41.3")
    const tablePattern = /Table\s+(\d+\.\d+)/gi;
    const chunks: TableChunk[] = [];
    
    const lines = fileContent.split('\n');
    let currentTable: TableChunk | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const match = line.match(/Table\s+(\d+\.\d+)\s*[:\-–]?\s*(.*)/i);
      
      if (match) {
        // Save previous table if exists
        if (currentTable && currentTable.content.trim()) {
          chunks.push(currentTable);
        }
        
        // Start new table
        const tableNumber = match[1];
        const title = match[2] || '';
        
        console.log(`Found table: ${tableNumber} - ${title}`);
        
        currentTable = {
          table_number: tableNumber,
          title: title.trim(),
          content: line + '\n',
          keywords: generateKeywords(tableNumber, title)
        };
      } else if (currentTable && line) {
        // Add content to current table
        currentTable.content += line + '\n';
      }
    }
    
    // Don't forget the last table
    if (currentTable && currentTable.content.trim()) {
      chunks.push(currentTable);
    }

    console.log(`Created ${chunks.length} chunks from BS 7671 Tables`);

    // Store chunks and trigger embedding generation
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Prepare chunks for installation_knowledge table
    const knowledgeChunks = chunks.map(chunk => ({
      topic: `Table ${chunk.table_number}: ${chunk.title}`,
      content: chunk.content,
      source: 'bs7671-tables',
      metadata: {
        table_number: chunk.table_number,
        title: chunk.title,
        keywords: chunk.keywords
      }
    }));

    // Insert into installation_knowledge
    const { error: insertError } = await supabase
      .from('installation_knowledge')
      .insert(knowledgeChunks);

    if (insertError) {
      console.error("Error inserting chunks:", insertError);
      throw insertError;
    }

    console.log(`Inserted ${chunks.length} table chunks into installation_knowledge`);

    // Trigger embedding generation
    const { error: embeddingError } = await supabase.functions.invoke('process-pdf-embeddings', {
      body: { 
        source: 'bs7671-tables',
        chunks: knowledgeChunks 
      }
    });

    if (embeddingError) {
      console.error("Error generating embeddings:", embeddingError);
      throw embeddingError;
    }

    console.log("Successfully processed BS 7671 Tables");

    return new Response(
      JSON.stringify({
        success: true,
        chunks_created: chunks.length,
        chunks_processed: chunks.length,
        message: `Processed ${chunks.length} BS 7671 reference tables`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in parse-bs7671-tables:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function generateKeywords(tableNumber: string, title: string): string[] {
  const keywords = ['table', 'reference', 'bs7671'];
  
  // Add table-specific keywords
  if (tableNumber.startsWith('41.2')) {
    keywords.push('zs', 'maximum', 'impedance', 'disconnection', '0.4s', '5s');
  } else if (tableNumber.startsWith('41.3')) {
    keywords.push('zs', 'maximum', 'impedance', 'disconnection', '0.1s', '0.2s', '0.4s', '1s', '5s');
  } else if (tableNumber.startsWith('41.4')) {
    keywords.push('disconnection', 'times', 'ac', 'dc', 'voltage');
  }
  
  // Add keywords from title
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  keywords.push(...titleWords);
  
  return [...new Set(keywords)]; // Remove duplicates
}
