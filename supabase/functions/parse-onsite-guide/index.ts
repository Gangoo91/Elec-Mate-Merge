import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface Chunk {
  section: string;
  content: string;
  metadata: {
    section_number?: string;
    regulation_refs: string[];
    tables: string[];
    topic: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent } = await req.json() as { fileContent: string };
    
    console.log('Starting On-Site Guide parsing...');
    
    // Split into lines
    const lines = fileContent.split('\n');
    const chunks: Chunk[] = [];
    
    let currentChunk: string[] = [];
    let currentSection = 'Introduction';
    let currentSectionNumber = '';
    let chunkCount = 0;
    
    // Regex patterns
    const sectionPattern = /^(?:Section|Chapter)\s+(\d+(?:\.\d+)?)\s+(.+)/i;
    const tablePattern = /Table\s+(\d+(?:\.\d+)+)/i;
    const regPattern = /\b(\d{3}(?:\.\d+)+)\b/g;
    const appendixPattern = /^Appendix\s+([A-Z])\s*[:-]?\s*(.+)/i;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip copyright and boilerplate
      if (i < 200 || line.includes('© The Institution') || line.includes('©The Institution')) {
        continue;
      }
      
      // Detect section headers
      const sectionMatch = line.match(sectionPattern);
      const appendixMatch = line.match(appendixPattern);
      
      if (sectionMatch) {
        // Save previous chunk
        if (currentChunk.length > 50) {
          chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber));
          chunkCount++;
        }
        
        currentSectionNumber = sectionMatch[1];
        currentSection = sectionMatch[2].trim();
        currentChunk = [line];
        continue;
      }
      
      if (appendixMatch) {
        // Save previous chunk
        if (currentChunk.length > 50) {
          chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber));
          chunkCount++;
        }
        
        currentSectionNumber = `Appendix ${appendixMatch[1]}`;
        currentSection = appendixMatch[2].trim();
        currentChunk = [line];
        continue;
      }
      
      // Add line to current chunk
      if (line.length > 0) {
        currentChunk.push(line);
      }
      
      // Create chunk if it's getting large (800 tokens ≈ 600 words ≈ 120 lines)
      if (currentChunk.length >= 120) {
        chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber));
        chunkCount++;
        currentChunk = [];
      }
    }
    
    // Add final chunk
    if (currentChunk.length > 50) {
      chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber));
      chunkCount++;
    }
    
    console.log(`Created ${chunks.length} chunks from On-Site Guide`);
    
    // Now process embeddings in batches
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Convert chunks to format expected by process-pdf-embeddings
    const formattedChunks = chunks.map(chunk => ({
      section: chunk.section,
      content: chunk.content,
      metadata: chunk.metadata,
      source: 'on-site-guide' as const
    }));
    
    // Call process-pdf-embeddings function
    const { data, error } = await supabase.functions.invoke('process-pdf-embeddings', {
      body: {
        chunks: formattedChunks,
        source: 'on-site-guide'
      }
    });
    
    if (error) {
      console.error('Error processing embeddings:', error);
      throw error;
    }
    
    console.log(`Successfully processed ${chunks.length} chunks`);
    
    return new Response(JSON.stringify({ 
      success: true,
      chunksCreated: chunks.length,
      embeddingsProcessed: data?.processed || 0,
      sampleChunks: chunks.slice(0, 3).map(c => ({
        section: c.section,
        contentPreview: c.content.substring(0, 200) + '...',
        metadata: c.metadata
      }))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error parsing On-Site Guide:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to parse On-Site Guide' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createChunk(lines: string[], section: string, sectionNumber: string): Chunk {
  const content = lines.join('\n');
  
  // Extract regulation references
  const regPattern = /\b(\d{3}(?:\.\d+)+)\b/g;
  const regMatches = [...content.matchAll(regPattern)];
  const regulationRefs = [...new Set(regMatches.map(m => m[1]))];
  
  // Extract table references
  const tablePattern = /Table\s+(\d+(?:\.\d+)+)/gi;
  const tableMatches = [...content.matchAll(tablePattern)];
  const tables = [...new Set(tableMatches.map(m => m[0]))];
  
  // Determine topic from section name
  let topic = section;
  if (section.toLowerCase().includes('earthing')) topic = 'Earthing & Bonding';
  else if (section.toLowerCase().includes('protection')) topic = 'Protection';
  else if (section.toLowerCase().includes('cable')) topic = 'Cable Selection';
  else if (section.toLowerCase().includes('test')) topic = 'Testing & Inspection';
  else if (section.toLowerCase().includes('rcd')) topic = 'RCD Protection';
  else if (section.toLowerCase().includes('voltage drop')) topic = 'Voltage Drop';
  else if (section.toLowerCase().includes('install')) topic = 'Installation Methods';
  
  return {
    section,
    content: content.trim(),
    metadata: {
      section_number: sectionNumber,
      regulation_refs: regulationRefs,
      tables,
      topic
    }
  };
}
