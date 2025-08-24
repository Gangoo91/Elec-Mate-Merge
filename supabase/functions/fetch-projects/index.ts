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

  console.log('Starting enhanced Firecrawl search strategy...');

  // Enhanced search queries for better UK electrical project coverage
  const searchQueries = [
    "UK electrical infrastructure tenders awarded OR open site:gov.uk OR site:constructionnews.co.uk/contracts OR site:ted.europa.eu",
    "electrical substation construction contracts UK 2024 2025",
    "renewable energy grid connection projects UK tender",
    "hospital electrical upgrade contracts UK NHS",
    "transport electrical infrastructure UK railway underground"
  ];

  const searchUrl = "https://api.firecrawl.dev/v2/search";
  const scrapeUrl = "https://api.firecrawl.dev/v2/scrape";

  for (const query of searchQueries) {
    try {
      console.log(`Searching for: ${query.substring(0, 50)}...`);
      
      // Step 1: Search for relevant URLs
      const searchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firecrawlApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          sources: ["web"],
          limit: 3, // Increased for better coverage
        }),
      };

      const searchResponse = await fetch(searchUrl, searchOptions);
      if (!searchResponse.ok) {
        throw new Error(`Search API error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      
      if (!searchData?.data?.web?.length) {
        console.log(`No results for query: ${query}`);
        continue;
      }

      console.log(`Found ${searchData.data.web.length} URLs for query`);

      // Step 2: Scrape each URL with enhanced schema
      for (const item of searchData.data.web) {
        try {
          const scrapeOptions = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${firecrawlApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: item.url,
              onlyMainContent: true,
              maxAge: 172800000,
              parsers: ["pdf"],
              formats: [
                {
                  type: "json",
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      client: { type: "string" },
                      contract_value: { type: "string" },
                      duration: { type: "string" },
                      location: { type: "string" },
                      contractors: { type: "number" },
                      start_date: { type: "string" },
                      deadline: { type: "string" },
                      url_tender: { type: "string" },
                      url_project: { type: "string" },
                      status: { type: "string" },
                      tender_reference: { type: "string" },
                      cpv_codes: { type: "string" },
                      project_stage: { type: "string" },
                      electrical_scope: { type: "string" },
                      estimated_contractors: { type: "number" }
                    },
                  },
                },
              ],
            }),
          };

          const response = await fetch(scrapeUrl, scrapeOptions);
          if (!response.ok) {
            console.error(`Scrape API error for ${item.url}: ${response.status}`);
            continue;
          }

          const data = await response.json();
          
          if (data?.data?.json) {
            // Validate and enhance the extracted data
            const project = data.data.json;
            
            // Data validation and enrichment
            if (project.title && project.title.length > 10) {
              const enrichedProject: ProjectData = {
                status: intelligentStatusDetection(project.status, project.deadline, project.start_date) || "Open for Tender",
                category: determineCategory(project.title + " " + (project.description || "")),
                deadline: project.deadline,
                title: project.title.substring(0, 100),
                snippet: (project.description || project.title).substring(0, 200),
                client: project.client || "TBC",
                contractValue: normalizeContractValue(project.contract_value) || "TBC",
                duration: project.duration || estimateDurationFromTitle(project.title),
                location: normalizeLocation(project.location) || "UK",
                contractors: project.estimated_contractors || estimateContractors(project.contract_value),
                startDate: project.start_date,
                url: item.url
              };

              // Filter out non-UK or non-electrical projects
              if (isValidElectricalProject(enrichedProject)) {
                allProjects.push(enrichedProject);
                console.log(`Added project: ${enrichedProject.title.substring(0, 50)}...`);
              }
            }
          }

          // Rate limiting between scrapes
          await new Promise(resolve => setTimeout(resolve, 1500));

        } catch (scrapeError) {
          console.error(`Error scraping ${item.url}:`, scrapeError);
        }
      }

      // Rate limiting between search queries
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (searchError) {
      console.error(`Search error for query "${query}":`, searchError);
    }
  }

  // Deduplicate and filter results
  const deduplicatedProjects = deduplicateProjects(allProjects);
  console.log(`Final count: ${deduplicatedProjects.length} unique projects from ${allProjects.length} total extracted`);
  
  return deduplicatedProjects.slice(0, 15); // Limit to top 15 projects
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
            content: `You are an expert at extracting UK electrical infrastructure project data. Extract projects from web content and return ONLY a valid JSON array. Look for:

- Electrical infrastructure projects, tenders, and contracts
- Projects mentioning: electrical, power, substation, transmission, renewable energy, grid connections
- UK-based projects only
- Current or recently awarded contracts

Return ONLY a JSON array with this exact structure (no additional text):
[
  {
    "status": "Open for Tender" | "Contract Awarded" | "In Progress" | "Completed",
    "category": "Healthcare" | "Energy" | "Transport" | "Infrastructure" | "Education",
    "deadline": "YYYY-MM-DD" (if tender deadline available),
    "title": "clear project title (max 100 chars)",
    "snippet": "1-2 sentence summary focused on electrical scope (max 200 chars)",
    "client": "client/authority name",
    "contractValue": "£XXM" or "£XXK" or "TBC",
    "duration": "XX months",
    "location": "City, UK",
    "contractors": 5,
    "startDate": "YYYY-MM-DD" (if known),
    "url": "direct project URL if available"
  }
]

Focus on real electrical projects with actual values and clients. Ignore general news or non-project content.`
          },
          {
            role: 'user',
            content: `Extract electrical infrastructure projects from this content. Source: ${source.name}\nContent: ${content.substring(0, 8000)}`
          }
        ],
        max_tokens: 1500,
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
  const titleSimilarityThreshold = 0.8;
  
  return projects.filter(project => {
    const currentTitle = project.title.toLowerCase();
    
    // Check against existing titles for similarity
    for (const existingTitle of seen) {
      const similarity = calculateStringSimilarity(currentTitle, existingTitle);
      if (similarity > titleSimilarityThreshold) {
        return false; // Skip similar project
      }
    }
    
    seen.add(currentTitle);
    return true;
  });
}

function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

function intelligentStatusDetection(status: string, deadline: string, startDate: string): string {
  if (!status) {
    // Intelligent status detection based on dates
    const now = new Date();
    
    if (deadline) {
      const deadlineDate = new Date(deadline);
      if (deadlineDate > now) {
        return "Open for Tender";
      }
    }
    
    if (startDate) {
      const start = new Date(startDate);
      if (start > now) {
        return "Contract Awarded";
      } else if (start <= now) {
        return "In Progress";
      }
    }
    
    return "Open for Tender";
  }
  
  const statusLower = status.toLowerCase();
  if (statusLower.includes('open') || statusLower.includes('tender')) return "Open for Tender";
  if (statusLower.includes('award') || statusLower.includes('contract')) return "Contract Awarded";
  if (statusLower.includes('progress') || statusLower.includes('ongoing')) return "In Progress";
  if (statusLower.includes('complet')) return "Completed";
  
  return status;
}

function normalizeContractValue(value: string): string {
  if (!value) return "TBC";
  
  // Extract numbers and handle various formats
  const numMatch = value.match(/[\d,]+\.?\d*/);
  if (!numMatch) return value;
  
  const num = parseFloat(numMatch[0].replace(/,/g, ''));
  
  if (value.toLowerCase().includes('million') || value.includes('M')) {
    return `£${num}M`;
  } else if (value.toLowerCase().includes('thousand') || value.includes('K')) {
    return `£${num}K`;
  } else if (num > 1000000) {
    return `£${(num / 1000000).toFixed(1)}M`;
  } else if (num > 1000) {
    return `£${(num / 1000).toFixed(0)}K`;
  }
  
  return `£${num}`;
}

function normalizeLocation(location: string): string {
  if (!location) return "UK";
  
  // Ensure UK is mentioned
  if (!location.toLowerCase().includes('uk') && !location.toLowerCase().includes('united kingdom')) {
    return `${location}, UK`;
  }
  
  return location;
}

function estimateDurationFromTitle(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('hospital') || titleLower.includes('major')) return "24 months";
  if (titleLower.includes('upgrade') || titleLower.includes('modernisation')) return "18 months";
  if (titleLower.includes('installation')) return "12 months";
  if (titleLower.includes('maintenance')) return "6 months";
  
  return "18 months";
}

function isValidElectricalProject(project: ProjectData): boolean {
  const searchText = `${project.title} ${project.snippet}`.toLowerCase();
  
  // Must contain electrical keywords
  const electricalKeywords = [
    'electrical', 'power', 'grid', 'substation', 'transmission', 'distribution',
    'transformer', 'switchgear', 'cable', 'hvdc', 'solar', 'wind', 'renewable',
    'lighting', 'wiring', 'installation', 'electrical infrastructure'
  ];
  
  const hasElectricalKeyword = electricalKeywords.some(keyword => 
    searchText.includes(keyword)
  );
  
  // Must be UK-based
  const ukKeywords = ['uk', 'united kingdom', 'england', 'scotland', 'wales', 'northern ireland', 'britain'];
  const hasUkKeyword = ukKeywords.some(keyword => 
    searchText.includes(keyword) || project.location.toLowerCase().includes(keyword)
  );
  
  // Filter out unwanted content
  const excludeKeywords = ['cookie', 'privacy', 'terms', 'disclaimer', 'advertisement'];
  const hasExcludeKeyword = excludeKeywords.some(keyword => 
    searchText.includes(keyword)
  );
  
  return hasElectricalKeyword && hasUkKeyword && !hasExcludeKeyword && project.title.length >= 20;
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