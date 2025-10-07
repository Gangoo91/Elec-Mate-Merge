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
    chunk_index?: number;
    total_chunks?: number;
  };
}

// Estimate tokens (rough approximation: 1 token ≈ 4 characters)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Split content into chunks that fit within token limits
function splitContent(content: string, maxTokens: number = 6000): string[] {
  const estimatedTokens = estimateTokens(content);
  
  if (estimatedTokens <= maxTokens) {
    return [content];
  }
  
  // Split on paragraph boundaries (double newlines)
  const paragraphs = content.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    const testChunk = currentChunk + (currentChunk ? '\n\n' : '') + paragraph;
    
    if (estimateTokens(testChunk) > maxTokens && currentChunk) {
      // Current chunk is full, save it and start new one
      chunks.push(currentChunk.trim());
      currentChunk = paragraph;
    } else {
      currentChunk = testChunk;
    }
  }
  
  // Add final chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  // Ensure minimum chunk size (500 tokens) by merging small chunks
  const mergedChunks: string[] = [];
  let buffer = '';
  
  for (const chunk of chunks) {
    const combined = buffer + (buffer ? '\n\n' : '') + chunk;
    if (estimateTokens(combined) >= 500 || chunk === chunks[chunks.length - 1]) {
      mergedChunks.push(combined.trim());
      buffer = '';
    } else {
      buffer = combined;
    }
  }
  
  return mergedChunks.length > 0 ? mergedChunks : [content];
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

    // Parse individual regulations
    const chunks: BS7671Chunk[] = [];
    let currentPart = '';
    let currentChapter = '';
    let currentSection = '';
    let currentTopic = '';
    
    // For tracking individual regulations
    let currentRegNumber = '';
    let currentRegContent: string[] = [];
    let currentRegTitle = '';

    const flushRegulation = () => {
      if (!currentRegNumber || currentRegContent.length === 0) return;
      
      const content = currentRegContent.join('\n').trim();
      if (content.length < 30) {
        currentRegContent = [];
        return;
      }

      // Build section context
      const sectionContext = currentSection || currentChapter || currentPart || 'BS 7671';
      const fullSection = currentRegTitle 
        ? `${sectionContext} - ${currentRegTitle}`
        : sectionContext;

      // Split large regulations into multiple chunks
      const contentChunks = splitContent(content, 6000);
      
      contentChunks.forEach((chunkContent, index) => {
        const chunkNumber = contentChunks.length > 1 
          ? `${currentRegNumber} (Part ${index + 1} of ${contentChunks.length})`
          : currentRegNumber;
        
        chunks.push({
          regulation_number: chunkNumber,
          section: fullSection,
          content: chunkContent,
          metadata: {
            part: currentPart,
            chapter: currentChapter,
            amendment: 'A3:2024',
            topic: currentTopic,
            page: undefined,
            chunk_index: contentChunks.length > 1 ? index + 1 : undefined,
            total_chunks: contentChunks.length > 1 ? contentChunks.length : undefined
          }
        });
      });
      
      currentRegContent = [];
      currentRegTitle = '';
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Detect structural elements
      if (line.match(/^PART\s+(\d+)/i)) {
        flushRegulation();
        const match = line.match(/^PART\s+(\d+)\s+(.*)/i);
        currentPart = match ? `Part ${match[1]}` : line;
        currentTopic = match?.[2] || '';
        continue;
      }
      
      if (line.match(/^CHAPTER\s+(\d+)/i)) {
        flushRegulation();
        const match = line.match(/^CHAPTER\s+(\d+)\s+(.*)/i);
        currentChapter = match ? `Chapter ${match[1]}` : line;
        currentTopic = match?.[2] || currentTopic;
        continue;
      }
      
      if (line.match(/^SECTION\s+(\d+)/i)) {
        flushRegulation();
        const match = line.match(/^SECTION\s+(\d+)\s+(.*)/i);
        currentSection = match ? `Section ${match[1]}` : line;
        currentTopic = match?.[2] || currentTopic;
        continue;
      }
      
      // Detect regulation numbers (e.g., 411.3.2, 522.6.6, 433.1.1)
      const regMatch = line.match(/^(\d{3}(?:\.\d+)+)\s*(.*)/);
      if (regMatch) {
        // Flush previous regulation
        flushRegulation();
        
        // Start new regulation
        currentRegNumber = regMatch[1];
        currentRegTitle = regMatch[2] || '';
        currentRegContent.push(line);
        continue;
      }
      
      // Accumulate content for current regulation
      if (currentRegNumber) {
        currentRegContent.push(line);
      }
    }
    
    // Flush final regulation
    flushRegulation();

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
