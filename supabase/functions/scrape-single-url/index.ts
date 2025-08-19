import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProjectData {
  title: string;
  snippet: string;
  client: string;
  contractValue: string;
  duration: string;
  location: string;
  status: string;
  category: string;
  url: string;
  startDate?: string;
  deadline?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apiKey, url, keywords, attempt = 1 } = await req.json();
    
    if (!apiKey || !url) {
      return new Response(
        JSON.stringify({ success: false, error: 'API key and URL required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Scraping URL (attempt ${attempt}): ${url}`);

    const firecrawl = new FirecrawlApp({ apiKey });
    
    const scrapeResult = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      includeTags: ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'span', 'a', 'li'],
      waitFor: 3000,
      timeout: 15000
    });

    if (!scrapeResult.success || !scrapeResult.data?.markdown) {
      throw new Error('Failed to scrape content from URL');
    }

    const content = scrapeResult.data.markdown;
    const projects = await extractProjectsFromContent(content, url, keywords);

    console.log(`Extracted ${projects.length} projects from ${url}`);

    return new Response(
      JSON.stringify({
        success: true,
        projects,
        sourceUrl: url,
        contentLength: content.length,
        extractedCount: projects.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Single URL scrape error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Scraping failed',
        projects: []
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function extractProjectsFromContent(
  content: string, 
  sourceUrl: string, 
  keywords: string[]
): Promise<ProjectData[]> {
  const projects: ProjectData[] = [];
  
  // Enhanced extraction logic for electrical projects
  const lines = content.split('\n');
  const electricalKeywords = keywords || [
    'electrical', 'power', 'grid', 'substation', 'transmission', 'distribution',
    'transformer', 'switchgear', 'cable', 'renewable', 'solar', 'wind', 'LED'
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for project titles containing electrical keywords
    if (line.length > 20 && line.length < 200) {
      const hasElectricalKeyword = electricalKeywords.some(keyword => 
        line.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (hasElectricalKeyword && !line.toLowerCase().includes('cookie')) {
        const contextLines = lines.slice(i, Math.min(i + 5, lines.length)).join(' ');
        
        // Extract contract value
        const valueMatch = contextLines.match(/£([\d,]+(?:\.\d+)?)\s*(?:million|m|k|thousand|billion|b)?/i);
        let contractValue = 'TBC';
        if (valueMatch) {
          const unit = valueMatch[0].toLowerCase();
          if (unit.includes('billion') || unit.includes('b')) {
            contractValue = `£${valueMatch[1]}B`;
          } else if (unit.includes('million') || unit.includes('m')) {
            contractValue = `£${valueMatch[1]}M`;
          } else if (unit.includes('thousand') || unit.includes('k')) {
            contractValue = `£${valueMatch[1]}K`;
          } else {
            contractValue = `£${valueMatch[1]}`;
          }
        }
        
        // Extract location
        const locationMatch = contextLines.match(/(?:in|at|for|across)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
        const location = locationMatch ? `${locationMatch[1]}, UK` : 'UK';
        
        // Extract client/authority
        const clientMatch = contextLines.match(/(?:by|for|awarded to)\s+([A-Z][a-zA-Z\s&]+(?:Ltd|Limited|Council|Authority|Trust|plc)?)/i);
        const client = clientMatch ? clientMatch[1].trim() : 'TBC';
        
        // Determine project category
        const category = determineCategory(line);
        
        // Extract duration
        const durationMatch = contextLines.match(/(\d+)\s*(?:month|year)/i);
        const duration = durationMatch ? 
          (durationMatch[0].toLowerCase().includes('year') ? 
           `${parseInt(durationMatch[1]) * 12} months` : 
           `${durationMatch[1]} months`) : 
          '18 months';
        
        // Determine status
        const status = contextLines.toLowerCase().includes('tender') ? 'active' : 'awarded';
        
        projects.push({
          title: line.replace(/^#+\s*/, '').trim(),
          snippet: `${line.substring(0, 150)}...`,
          client,
          contractValue,
          duration,
          location,
          status,
          category,
          url: sourceUrl,
          startDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      }
    }
  }
  
  return projects.slice(0, 5); // Limit results per URL
}

function determineCategory(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('hospital') || titleLower.includes('health')) return 'Healthcare';
  if (titleLower.includes('transport') || titleLower.includes('railway') || titleLower.includes('underground')) return 'Transport';
  if (titleLower.includes('school') || titleLower.includes('university') || titleLower.includes('education')) return 'Education';
  if (titleLower.includes('wind') || titleLower.includes('solar') || titleLower.includes('renewable')) return 'Energy';
  if (titleLower.includes('data') || titleLower.includes('digital') || titleLower.includes('tech')) return 'Technology';
  return 'Infrastructure';
}