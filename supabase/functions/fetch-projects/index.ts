import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProjectData {
  status: string;
  category: string;
  deadline?: string;
  title: string;
  snippet: string;
  client: string;
  contractValue: string;
  duration: string;
  location: string;
  contractors?: number;
  startDate?: string;
  url: string;
}

async function enhancedProjectExtraction(firecrawlApiKey: string, openaiApiKey: string): Promise<ProjectData[]> {
  const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
  const allProjects: ProjectData[] = [];

  // Comprehensive UK electrical project sources
  const sources = [
    {
      url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=electrical',
      name: 'Contracts Finder - Electrical',
      category: 'Government'
    },
    {
      url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=substation',
      name: 'Contracts Finder - Substation',
      category: 'Infrastructure'
    },
    {
      url: 'https://www.constructionnews.co.uk/sectors/infrastructure/',
      name: 'Construction News',
      category: 'Infrastructure'
    },
    {
      url: 'https://www.newcivilengineer.com/latest/infrastructure-news/',
      name: 'New Civil Engineer',
      category: 'Infrastructure'
    },
    {
      url: 'https://www.electricalreview.co.uk/news/',
      name: 'Electrical Review',
      category: 'Electrical'
    },
    {
      url: 'https://tfl.gov.uk/corporate/procurement-and-commercial/procurement-opportunities',
      name: 'TfL Procurement',
      category: 'Transport'
    }
  ];

  console.log(`Starting batch scraping of ${sources.length} sources...`);

  for (const source of sources) {
    try {
      console.log(`Scraping: ${source.name}`);
      
      const scrapeResult = await firecrawl.scrapeUrl(source.url, {
        formats: ['markdown', 'html'],
        includeTags: ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'span', 'a', 'li'],
        waitFor: 3000,
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: `Extract electrical infrastructure projects, tenders, and contracts from this page. Look for:
          - Project titles containing: electrical, power, grid, substation, transmission, infrastructure, energy
          - Contract values in £ (millions/thousands)
          - Client/authority names
          - Locations in UK
          - Tender deadlines or project start dates
          - Current status (tender, awarded, ongoing)
          
          Focus on projects suitable for electrical contractors.`
        }
      });

      if (scrapeResult.success && scrapeResult.data?.markdown) {
        const extractedProjects = await intelligentProjectExtraction(
          scrapeResult.data.markdown,
          source,
          openaiApiKey
        );
        
        console.log(`Extracted ${extractedProjects.length} projects from ${source.name}`);
        allProjects.push(...extractedProjects);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
    }
  }

  // Deduplicate by title similarity
  const deduplicatedProjects = deduplicateProjects(allProjects);
  console.log(`Final count: ${deduplicatedProjects.length} unique projects`);
  
  return deduplicatedProjects;
}

async function intelligentProjectExtraction(
  content: string,
  source: any,
  openaiApiKey: string
): Promise<ProjectData[]> {
  try {
    // Use OpenAI to intelligently extract and structure project data
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert at extracting UK electrical infrastructure project data. Extract projects from web content and return ONLY a valid JSON array. Each project must have this exact structure:
            {
              "status": "Open for Tender" | "Contract Awarded" | "In Progress" | "Completed",
              "category": "Healthcare" | "Energy" | "Transport" | "Infrastructure" | "Education",
              "deadline": "YYYY-MM-DD" (if tender deadline available),
              "title": "clear project title",
              "snippet": "1-2 sentence summary focused on electrical scope",
              "client": "client/authority name",
              "contractValue": "£XXM" or "£XXK" or "TBC",
              "duration": "XX months",
              "location": "City, UK",
              "contractors": estimated number,
              "startDate": "YYYY-MM-DD" (if known),
              "url": "direct project URL if available, otherwise source URL"
            }
            
            Focus on electrical projects: power systems, substations, grid connections, hospital electrical, transport electrification, renewable energy connections, etc.`
          },
          {
            role: 'user',
            content: `Extract electrical infrastructure projects from this content. Source: ${source.name}\nContent: ${content.substring(0, 8000)}`
          }
        ],
        max_tokens: 2000,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.choices[0]?.message?.content;
    
    if (!extractedText) {
      return [];
    }

    // Parse JSON response
    try {
      const jsonMatch = extractedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const projects = JSON.parse(jsonMatch[0]);
        return projects.map((p: any) => ({
          ...p,
          url: p.url || source.url // Fallback to source URL
        }));
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
    }

    return [];

  } catch (error) {
    console.error('OpenAI extraction error:', error);
    // Fallback to basic extraction
    return basicProjectExtraction(content, source);
  }
}

function basicProjectExtraction(content: string, source: any): ProjectData[] {
  const projects: ProjectData[] = [];
  
  // Enhanced regex patterns for electrical projects
  const electricalKeywords = [
    'electrical', 'power', 'grid', 'substation', 'transmission', 'distribution',
    'transformer', 'switchgear', 'cable', 'hvdc', 'solar', 'wind', 'renewable'
  ];
  
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for project titles containing electrical keywords
    if (line.length > 20 && line.length < 200) {
      const hasElectricalKeyword = electricalKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      );
      
      if (hasElectricalKeyword && !line.toLowerCase().includes('cookie')) {
        const contextLines = lines.slice(i, Math.min(i + 5, lines.length)).join(' ');
        
        // Extract value
        const valueMatch = contextLines.match(/£([\d,]+(?:\.\d+)?)\s*(?:million|m|k|thousand)?/i);
        let contractValue = 'TBC';
        if (valueMatch) {
          const unit = valueMatch[0].toLowerCase();
          contractValue = unit.includes('million') || unit.includes('m') 
            ? `£${valueMatch[1]}M` 
            : `£${valueMatch[1]}K`;
        }
        
        // Extract location
        const locationMatch = contextLines.match(/(?:in|at|for|across)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
        const location = locationMatch ? `${locationMatch[1]}, UK` : 'UK';
        
        projects.push({
          status: 'Open for Tender',
          category: determineCategory(line),
          title: line.replace(/^#+\s*/, '').trim(),
          snippet: `${line.substring(0, 100)}...`,
          client: 'TBC',
          contractValue,
          duration: '18 months',
          location,
          contractors: estimateContractors(contractValue),
          url: source.url
        });
      }
    }
  }
  
  return projects.slice(0, 3); // Limit basic extraction
}

function determineCategory(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('hospital') || titleLower.includes('health')) return 'Healthcare';
  if (titleLower.includes('transport') || titleLower.includes('railway') || titleLower.includes('underground')) return 'Transport';
  if (titleLower.includes('school') || titleLower.includes('university')) return 'Education';
  if (titleLower.includes('wind') || titleLower.includes('solar') || titleLower.includes('renewable')) return 'Energy';
  return 'Infrastructure';
}

function estimateContractors(value: string): number {
  const numValue = parseFloat(value.replace(/[£,KM]/g, ''));
  if (value.includes('M') && numValue > 50) return 15;
  if (value.includes('M') && numValue > 20) return 10;
  if (value.includes('M')) return 8;
  return 5;
}

function deduplicateProjects(projects: ProjectData[]): ProjectData[] {
  const seen = new Set();
  return projects.filter(project => {
    const key = project.title.toLowerCase().substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }
    
    if (!openaiApiKey) {
      console.warn('OPENAI_API_KEY not configured, using basic extraction');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting enhanced UK electrical projects extraction...');
    
    const projects = await enhancedProjectExtraction(firecrawlApiKey, openaiApiKey || '');
    
    let totalInserted = 0;
    let errors = 0;

    // Store projects in database
    for (const project of projects) {
      try {
        const { error } = await supabase
          .from('major_projects')
          .upsert({
            title: project.title,
            summary: project.snippet,
            content: `${project.snippet}\n\nCategory: ${project.category}\nDuration: ${project.duration}\nContractors: ${project.contractors || 'TBC'}`,
            awarded_to: project.client,
            project_value: project.contractValue,
            location: project.location,
            status: project.status.toLowerCase().replace(' ', '_'),
            date_awarded: project.startDate || new Date().toISOString(),
            category: project.category,
            electrical_scope: 'General Electrical',
            source_url: project.url,
            external_project_url: project.url,
            tender_deadline: project.deadline || null,
          }, { 
            onConflict: 'title',
            ignoreDuplicates: false 
          });

        if (!error) {
          totalInserted++;
        } else {
          console.error('Database insert error:', error);
          errors++;
        }
      } catch (insertError) {
        console.error('Project processing error:', insertError);
        errors++;
      }
    }

    // Fetch updated database projects
    const { data: dbProjects, error: dbError } = await supabase
      .from('major_projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalInserted} UK electrical projects`,
        inserted: totalInserted,
        errors: errors,
        scrapedProjects: projects.length,
        data: dbProjects || [],
        projectDetails: projects.slice(0, 5) // Sample for debugging
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Enhanced fetch-projects error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        fallback: 'Using static project data'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});