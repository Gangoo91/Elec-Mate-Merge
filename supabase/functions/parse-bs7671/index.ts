import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BS7671Chunk {
  regulation_number: string;
  section: string;
  content: string;
  metadata: {
    part?: string;
    chapter?: string;
    amendment?: string;
    page?: number;
    topic?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting BS 7671 parsing...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get file content from request body
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      throw new Error('No file content provided in request body');
    }
    
    console.log('Processing BS 7671 content...');
    const lines = fileContent.split('\n');
    console.log(`Loaded ${lines.length} lines from BS 7671`);

    // Parse the document into structured chunks
    const chunks: BS7671Chunk[] = [];
    let currentPart = '';
    let currentChapter = '';
    let currentSection = '';
    let currentRegNumber = '';
    let currentContent: string[] = [];
    let currentTopic = '';
    
    const CHUNK_SIZE = 120; // Lines per chunk for optimal embedding
    let lineBuffer: string[] = [];
    let bufferMetadata = {
      part: '',
      chapter: '',
      section: '',
      regulation_number: '',
      topic: ''
    };

    const flushChunk = () => {
      if (lineBuffer.length === 0) return;
      
      const content = lineBuffer.join('\n').trim();
      if (content.length < 50) {
        lineBuffer = [];
        return;
      }

      chunks.push({
        regulation_number: bufferMetadata.regulation_number || 'General',
        section: bufferMetadata.section || bufferMetadata.chapter || bufferMetadata.part || 'BS 7671',
        content: content,
        metadata: {
          part: bufferMetadata.part,
          chapter: bufferMetadata.chapter,
          amendment: 'A2:2022',
          topic: bufferMetadata.topic
        }
      });
      
      lineBuffer = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect structural elements
      if (line.match(/^PART\s+(\d+)/i)) {
        flushChunk();
        const match = line.match(/^PART\s+(\d+)\s+(.*)/i);
        currentPart = match ? `Part ${match[1]}` : line;
        currentTopic = match?.[2] || '';
        bufferMetadata.part = currentPart;
        bufferMetadata.topic = currentTopic;
        lineBuffer.push(line);
        continue;
      }
      
      if (line.match(/^CHAPTER\s+(\d+)/i)) {
        flushChunk();
        const match = line.match(/^CHAPTER\s+(\d+)\s+(.*)/i);
        currentChapter = match ? `Chapter ${match[1]}` : line;
        currentTopic = match?.[2] || currentTopic;
        bufferMetadata.chapter = currentChapter;
        bufferMetadata.topic = currentTopic;
        lineBuffer.push(line);
        continue;
      }
      
      if (line.match(/^SECTION\s+(\d+)/i)) {
        flushChunk();
        const match = line.match(/^SECTION\s+(\d+)\s+(.*)/i);
        currentSection = match ? `Section ${match[1]}` : line;
        currentTopic = match?.[2] || currentTopic;
        bufferMetadata.section = currentSection;
        bufferMetadata.topic = currentTopic;
        lineBuffer.push(line);
        continue;
      }
      
      // Detect regulation numbers (e.g., 411.3.2, 522.6.6)
      const regMatch = line.match(/^(\d{3}\.\d+(?:\.\d+)?)/);
      if (regMatch) {
        if (lineBuffer.length > CHUNK_SIZE * 0.8) {
          flushChunk();
        }
        currentRegNumber = regMatch[1];
        bufferMetadata.regulation_number = currentRegNumber;
      }
      
      // Add line to buffer
      if (line.length > 0) {
        lineBuffer.push(line);
      }
      
      // Flush when chunk is full
      if (lineBuffer.length >= CHUNK_SIZE) {
        flushChunk();
        // Carry forward metadata for next chunk
        bufferMetadata.regulation_number = currentRegNumber;
      }
    }
    
    // Flush any remaining content
    flushChunk();

    console.log(`Created ${chunks.length} chunks from BS 7671`);

    // Now send chunks to process-pdf-embeddings for embedding generation
    const embeddingResponse = await fetch(
      `${supabaseUrl}/functions/v1/process-pdf-embeddings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          chunks: chunks,
          source: 'bs7671'
        })
      }
    );

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      throw new Error(`Failed to process embeddings: ${errorText}`);
    }

    const embeddingResult = await embeddingResponse.json();
    console.log(`Successfully processed ${embeddingResult.processed} chunks`);

    return new Response(JSON.stringify({
      success: true,
      chunks_created: chunks.length,
      chunks_processed: embeddingResult.processed,
      message: 'BS 7671 successfully parsed and embedded'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error parsing BS 7671:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
