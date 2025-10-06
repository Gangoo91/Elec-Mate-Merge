import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Chunk {
  section: string;
  content: string;
  metadata: {
    section_number?: string;
    regulation_refs: string[];
    tables: string[];
    topic: string;
    test_methods?: string[];
    equipment_required?: string[];
    test_category?: string;
    chapter?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent } = await req.json() as { fileContent: string };
    
    console.log('Starting Guidance Note 3 parsing...');
    
    const lines = fileContent.split('\n');
    const chunks: Chunk[] = [];
    
    let currentChunk: string[] = [];
    let currentSection = 'Introduction';
    let currentSectionNumber = '';
    let currentChapter = '';
    let chunkCount = 0;
    
    // Regex patterns
    const chapterPattern = /^Chapter\s+(\d+)\s+(.+)/i;
    const sectionPattern = /^(\d+\.\d+(?:\.\d+)?)\s+(.+)/;
    const tablePattern = /Table\s+(\d+(?:\.\d+)+)/i;
    const regPattern = /\b(\d{3}(?:\.\d+)+)\b/g;
    const appendixPattern = /^Appendix\s+([A-Z])\s*[:-]?\s*(.+)/i;
    const testMethodPattern = /\b([E]\d+)\b/g;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip copyright and boilerplate
      if (i < 200 || line.includes('© The Institution') || line.includes('©The Institution')) {
        continue;
      }
      
      // Detect chapter headers
      const chapterMatch = line.match(chapterPattern);
      if (chapterMatch) {
        if (currentChunk.length > 50) {
          chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber, currentChapter));
          chunkCount++;
        }
        
        currentChapter = chapterMatch[1];
        currentSection = chapterMatch[2].trim();
        currentSectionNumber = chapterMatch[1];
        currentChunk = [line];
        continue;
      }
      
      // Detect section headers (e.g., "2.6.15 Earth fault loop impedance")
      const sectionMatch = line.match(sectionPattern);
      if (sectionMatch) {
        if (currentChunk.length > 50) {
          chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber, currentChapter));
          chunkCount++;
        }
        
        currentSectionNumber = sectionMatch[1];
        currentSection = sectionMatch[2].trim();
        currentChunk = [line];
        continue;
      }
      
      // Detect appendix
      const appendixMatch = line.match(appendixPattern);
      if (appendixMatch) {
        if (currentChunk.length > 50) {
          chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber, currentChapter));
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
      
      // Create chunk if it's getting large (120 lines for complete test procedures)
      if (currentChunk.length >= 120) {
        chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber, currentChapter));
        chunkCount++;
        currentChunk = [];
      }
    }
    
    // Add final chunk
    if (currentChunk.length > 50) {
      chunks.push(createChunk(currentChunk, currentSection, currentSectionNumber, currentChapter));
      chunkCount++;
    }
    
    console.log(`Created ${chunks.length} chunks from Guidance Note 3`);
    
    // Process embeddings
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const formattedChunks = chunks.map(chunk => ({
      section: chunk.section,
      content: chunk.content,
      metadata: chunk.metadata,
      source: 'guidance-note-3' as const
    }));
    
    const { data, error } = await supabase.functions.invoke('process-pdf-embeddings', {
      body: {
        chunks: formattedChunks,
        source: 'guidance-note-3'
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
    console.error('Error parsing Guidance Note 3:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to parse Guidance Note 3' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createChunk(lines: string[], section: string, sectionNumber: string, chapter: string): Chunk {
  const content = lines.join('\n');
  
  // Extract regulation references
  const regPattern = /\b(\d{3}(?:\.\d+)+)\b/g;
  const regMatches = [...content.matchAll(regPattern)];
  const regulationRefs = [...new Set(regMatches.map(m => m[1]))];
  
  // Extract table references
  const tablePattern = /Table\s+(\d+(?:\.\d+)+|[A-Z]\d+)/gi;
  const tableMatches = [...content.matchAll(tablePattern)];
  const tables = [...new Set(tableMatches.map(m => m[0]))];
  
  // Extract test method references (E1, E2, E3, etc.)
  const testMethodPattern = /\b([E]\d+)\b/g;
  const testMethodMatches = [...content.matchAll(testMethodPattern)];
  const testMethods = [...new Set(testMethodMatches.map(m => m[1]))];
  
  // Extract equipment mentions
  const equipment: string[] = [];
  const equipmentKeywords = [
    'EFLI tester', 'earth fault loop impedance tester',
    'RCD tester', 'residual current device tester',
    'insulation resistance tester', 'megger',
    'earth electrode tester',
    'continuity tester', 'multimeter',
    'proving unit', 'voltage indicator',
    'phase rotation tester'
  ];
  
  const lowerContent = content.toLowerCase();
  equipmentKeywords.forEach(keyword => {
    if (lowerContent.includes(keyword.toLowerCase())) {
      equipment.push(keyword);
    }
  });
  
  // Determine topic and test category from section
  let topic = section;
  let testCategory = '';
  
  const sectionLower = section.toLowerCase();
  
  // Categorize by testing type
  if (sectionLower.includes('continuity')) {
    topic = 'Continuity Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('insulation resistance')) {
    topic = 'Insulation Resistance Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('earth fault loop') || sectionLower.includes('efli')) {
    topic = 'Earth Fault Loop Impedance Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('rcd') || sectionLower.includes('residual current')) {
    topic = 'RCD Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('polarity')) {
    topic = 'Polarity Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('earth electrode')) {
    topic = 'Earth Electrode Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('functional')) {
    topic = 'Functional Testing';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('visual inspection')) {
    topic = 'Visual Inspection';
    testCategory = chapter === '2' ? 'initial_verification' : 'periodic_testing';
  } else if (sectionLower.includes('periodic')) {
    topic = 'Periodic Inspection and Testing';
    testCategory = 'periodic_testing';
  } else if (sectionLower.includes('initial')) {
    topic = 'Initial Verification';
    testCategory = 'initial_verification';
  } else if (sectionLower.includes('test instrument')) {
    topic = 'Test Instruments and Equipment';
    testCategory = 'equipment';
  } else if (chapter === '2') {
    testCategory = 'initial_verification';
  } else if (chapter === '3') {
    testCategory = 'periodic_testing';
  }
  
  return {
    section,
    content: content.trim(),
    metadata: {
      section_number: sectionNumber,
      regulation_refs: regulationRefs,
      tables,
      topic,
      test_methods: testMethods.length > 0 ? testMethods : undefined,
      equipment_required: equipment.length > 0 ? equipment : undefined,
      test_category: testCategory || undefined,
      chapter: chapter || undefined
    }
  };
}
