import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EnhancedProject {
  title: string;
  summary: string;
  content: string;
  awarded_to: string;
  project_value: string;
  location: string;
  status: string;
  category: string;
  source: string;
  source_url: string;
  external_project_url?: string;
  value_estimate: string;
  published_date: string;
  electrical_scope: string;
  technologies: string[];
  tender_deadline?: string;
}

const UK_ELECTRICAL_SOURCES = [
  {
    url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=electrical',
    name: 'Contracts Finder - Electrical',
    type: 'government'
  },
  {
    url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=substation',
    name: 'Contracts Finder - Substation',
    type: 'government'
  },
  {
    url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=power+distribution',
    name: 'Contracts Finder - Power Distribution',
    type: 'government'
  },
  {
    url: 'https://www.find-tender.service.gov.uk/Search?keywords=electrical',
    name: 'Find a Tender - Electrical',
    type: 'government'
  },
  {
    url: 'https://www.constructionnews.co.uk/sectors/infrastructure/',
    name: 'Construction News - Infrastructure',
    type: 'industry'
  },
  {
    url: 'https://www.newcivilengineer.com/latest/electrical',
    name: 'New Civil Engineer - Electrical',
    type: 'industry'
  },
  {
    url: 'https://www.electricalreview.co.uk/news',
    name: 'Electrical Review - News',
    type: 'industry'
  },
  {
    url: 'https://www.nationalgrid.com/about-us/news',
    name: 'National Grid - News',
    type: 'company'
  },
  {
    url: 'https://sse.com/news-and-views/',
    name: 'SSE - News',
    type: 'company'
  }
];

const ELECTRICAL_KEYWORDS = [
  'substation', 'transformer', 'grid', 'electrification', 'HV', 'LV', 'cable', 'switchgear',
  'power distribution', 'transmission lines', 'electrical installation', 'lighting', 'wiring',
  'renewable energy', 'solar', 'wind', 'battery storage', 'smart grid', 'control systems',
  'data centre power', 'hospital electrical', 'school upgrades', 'rail electrification',
  'EV charging', 'underground systems', 'industrial electrical', 'automation', 'SCADA'
];

async function enhancedProjectScraping(firecrawlApiKey: string, openaiApiKey: string): Promise<EnhancedProject[]> {
  const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
  const projects: EnhancedProject[] = [];

  console.log('Starting Firecrawl batch scraping of UK electrical sources...');

  try {
    // Use Firecrawl batch_scrape for multiple sources
    const batchResult = await firecrawl.batchScrapeUrls(
      UK_ELECTRICAL_SOURCES.map(source => source.url),
      {
        formats: ['markdown', 'extract'],
        onlyMainContent: true,
        includeTags: ['h1', 'h2', 'h3', 'p', 'div', 'span', 'a', 'time'],
        removeTags: ['nav', 'footer', 'aside', 'script', 'style'],
        waitFor: 3000,
        timeout: 30000,
        extract: {
          schema: {
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  value: { type: "string" },
                  location: { type: "string" },
                  client: { type: "string" },
                  deadline: { type: "string" },
                  url: { type: "string" }
                }
              }
            }
          }
        }
      }
    );

    console.log(`Batch scrape completed. Processing ${batchResult.length} sources...`);

    for (let i = 0; i < batchResult.length; i++) {
      const result = batchResult[i];
      const source = UK_ELECTRICAL_SOURCES[i];

      if (!result.success) {
        console.error(`Failed to scrape ${source.name}:`, result.error);
        continue;
      }

      const extractedProjects = extractProjectsFromFirecrawlData(result.data, source);
      
      // Filter for electrical projects
      const electricalProjects = extractedProjects.filter(project => 
        isElectricalProject(project.title + ' ' + project.summary)
      );

      console.log(`Found ${electricalProjects.length} electrical projects from ${source.name}`);
      
      // AI-enhance each project with 2-sentence summaries
      for (const project of electricalProjects) {
        try {
          const enhancedProject = await enhanceProjectWithAI(project, openaiApiKey);
          projects.push(enhancedProject);
        } catch (aiError) {
          console.error('AI enhancement failed for project:', aiError);
          projects.push(project); // Add without AI enhancement
        }
      }

      // Rate limit between sources
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

  } catch (error) {
    console.error('Error during batch scraping:', error);
    throw error;
  }

  return projects;
}

function extractProjectsFromFirecrawlData(data: any, source: any): EnhancedProject[] {
  const projects: EnhancedProject[] = [];

  try {
    // Try structured extraction first
    if (data.extract?.projects && Array.isArray(data.extract.projects)) {
      for (const extracted of data.extract.projects) {
        if (extracted.title && extracted.title.length > 10) {
          projects.push(createProjectFromExtracted(extracted, source));
        }
      }
    }

    // Fallback to markdown parsing
    if (projects.length === 0 && data.markdown) {
      const markdownProjects = parseProjectsFromMarkdown(data.markdown, source);
      projects.push(...markdownProjects);
    }

  } catch (error) {
    console.error(`Error extracting projects from ${source.name}:`, error);
  }

  return projects;
}

function createProjectFromExtracted(extracted: any, source: any): EnhancedProject {
  return {
    title: extracted.title,
    summary: extracted.description || 'Project details to be confirmed',
    content: extracted.description || '',
    awarded_to: extracted.client || 'To be confirmed',
    project_value: parseProjectValue(extracted.value),
    location: extracted.location || 'UK',
    status: determineProjectStatus(extracted.title, extracted.description),
    category: determineProjectCategory(extracted.title, extracted.description),
    source: source.name,
    source_url: source.url,
    external_project_url: extracted.url,
    value_estimate: parseProjectValue(extracted.value),
    published_date: new Date().toISOString().split('T')[0],
    electrical_scope: extractElectricalScope(extracted.title, extracted.description),
    technologies: extractTechnologies(extracted.title, extracted.description),
    tender_deadline: extracted.deadline
  };
}

function parseProjectsFromMarkdown(markdown: string, source: any): EnhancedProject[] {
  const projects: EnhancedProject[] = [];
  const lines = markdown.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for headings that might be project titles
    if (line.startsWith('#') && line.length > 20 && line.length < 200) {
      const title = line.replace(/^#+\s*/, '').trim();
      
      if (isElectricalProject(title)) {
        // Collect context from following lines
        const contextLines = lines.slice(i + 1, Math.min(i + 8, lines.length));
        const context = contextLines.join(' ').trim();
        
        projects.push({
          title,
          summary: context.substring(0, 300) || 'Project details to be confirmed',
          content: context,
          awarded_to: extractClient(context) || 'To be confirmed',
          project_value: extractValue(context) || 'Not specified',
          location: extractLocation(context) || 'UK',
          status: determineProjectStatus(title, context),
          category: determineProjectCategory(title, context),
          source: source.name,
          source_url: source.url,
          value_estimate: extractValue(context) || 'TBC',
          published_date: new Date().toISOString().split('T')[0],
          electrical_scope: extractElectricalScope(title, context),
          technologies: extractTechnologies(title, context)
        });
      }
    }
  }
  
  return projects;
}

async function enhanceProjectWithAI(project: EnhancedProject, openaiApiKey: string): Promise<EnhancedProject> {
  try {
    const prompt = `As an expert electrician, write exactly 2 sentences summarizing this electrical project for fellow electricians. Focus on technical scope, opportunities, and practical relevance:

Project: ${project.title}
Details: ${project.content}
Value: ${project.project_value}
Location: ${project.location}

Response format: Two clear sentences only, no intro text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert electrician helping other electricians understand project opportunities. Always respond with exactly 2 sentences.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.3
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiSummary = data.choices[0].message.content.trim();
      
      return {
        ...project,
        summary: aiSummary
      };
    }
  } catch (error) {
    console.error('AI enhancement error:', error);
  }
  
  return project; // Return original if AI fails
}

function isElectricalProject(text: string): boolean {
  const textLower = text.toLowerCase();
  return ELECTRICAL_KEYWORDS.some(keyword => textLower.includes(keyword));
}

function parseProjectValue(value: string | undefined): string {
  if (!value) return 'Not specified';
  
  const matches = value.match(/£?[\d,]+(?:\.\d{2})?(?:\s*(?:million|m|k|thousand|billion))?/i);
  if (matches) {
    return matches[0].startsWith('£') ? matches[0] : `£${matches[0]}`;
  }
  
  return value;
}

function determineProjectStatus(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('tender') || text.includes('bidding') || text.includes('opportunity')) return 'open_tender';
  if (text.includes('awarded') || text.includes('contract signed')) return 'awarded';
  if (text.includes('construction') || text.includes('in progress')) return 'in_progress';
  if (text.includes('completed') || text.includes('commissioned')) return 'completed';
  
  return 'active';
}

function determineProjectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('hospital') || text.includes('healthcare') || text.includes('nhs')) return 'Healthcare';
  if (text.includes('transport') || text.includes('railway') || text.includes('underground')) return 'Transport';
  if (text.includes('school') || text.includes('university') || text.includes('education')) return 'Education';
  if (text.includes('renewable') || text.includes('wind') || text.includes('solar')) return 'Renewable Energy';
  if (text.includes('data centre') || text.includes('technology') || text.includes('digital')) return 'Technology';
  if (text.includes('residential') || text.includes('housing') || text.includes('homes')) return 'Residential';
  
  return 'Infrastructure';
}

function extractElectricalScope(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  const scopes = [];
  
  if (text.includes('hv') || text.includes('high voltage')) scopes.push('High Voltage');
  if (text.includes('lv') || text.includes('low voltage')) scopes.push('Low Voltage');
  if (text.includes('lighting')) scopes.push('Lighting');
  if (text.includes('power distribution')) scopes.push('Power Distribution');
  if (text.includes('cable')) scopes.push('Cable Installation');
  if (text.includes('substation')) scopes.push('Substation Work');
  if (text.includes('automation') || text.includes('control')) scopes.push('Automation & Control');
  
  return scopes.join(', ') || 'General Electrical';
}

function extractTechnologies(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const techs = [];
  
  if (text.includes('switchgear')) techs.push('Switchgear');
  if (text.includes('transformer')) techs.push('Transformers');
  if (text.includes('led')) techs.push('LED Systems');
  if (text.includes('solar')) techs.push('Solar PV');
  if (text.includes('battery')) techs.push('Battery Storage');
  if (text.includes('smart grid')) techs.push('Smart Grid');
  if (text.includes('scada')) techs.push('SCADA');
  if (text.includes('plc')) techs.push('PLC Systems');
  
  return techs;
}

function extractClient(text: string): string | null {
  const patterns = [
    /client[:\s]+([^,.\n]{5,50})/gi,
    /awarded to[:\s]+([^,.\n]{5,50})/gi,
    /contractor[:\s]+([^,.\n]{5,50})/gi
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  
  return null;
}

function extractValue(text: string): string | null {
  const patterns = [
    /£[\d,]+(?:\.\d{2})?(?:\s*(?:million|m|k|thousand|billion))?/gi,
    /value[:\s]*£?[\d,]+/gi,
    /worth[:\s]*£?[\d,]+/gi
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  
  return null;
}

function extractLocation(text: string): string | null {
  const ukLocations = [
    'London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Sheffield', 
    'Bristol', 'Newcastle', 'Nottingham', 'Leicester', 'Cardiff', 'Edinburgh', 
    'Glasgow', 'Belfast', 'Southampton', 'Portsmouth', 'Brighton', 'Plymouth',
    'Hull', 'Stoke', 'Coventry', 'Sunderland', 'Middlesbrough', 'Bolton',
    'Wigan', 'Preston', 'Huddersfield', 'York', 'Carlisle', 'Chester'
  ];
  
  for (const location of ukLocations) {
    if (text.toLowerCase().includes(location.toLowerCase())) {
      return location;
    }
  }
  
  // Check for postcode patterns
  const postcodeMatch = text.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/g);
  if (postcodeMatch) return postcodeMatch[0];
  
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }
    
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting enhanced electrical projects scraping...');
    
    const projects = await enhancedProjectScraping(firecrawlApiKey, openaiApiKey);
    
    let totalInserted = 0;
    let totalUpdated = 0;
    let errors = 0;

    for (const project of projects) {
      try {
        const { data, error } = await supabase
          .from('major_projects')
          .upsert({
            title: project.title,
            summary: project.summary,
            content: project.content,
            awarded_to: project.awarded_to,
            project_value: project.project_value,
            location: project.location,
            status: project.status,
            date_awarded: project.published_date,
            source_url: project.source_url,
            external_project_url: project.external_project_url
          }, { 
            onConflict: 'title',
            ignoreDuplicates: false 
          })
          .select('id');

        if (!error) {
          if (data && data.length > 0) {
            totalInserted++;
          } else {
            totalUpdated++;
          }
        } else {
          console.error('Error upserting project:', error);
          errors++;
        }
      } catch (insertError) {
        console.error('Error processing project:', insertError);
        errors++;
      }
    }

    // Fetch final results for return
    const { data: finalProjects, error: fetchError } = await supabase
      .from('major_projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (fetchError) {
      console.error('Error fetching final projects:', fetchError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Enhanced scraping completed: ${totalInserted} new, ${totalUpdated} updated`,
        stats: {
          scraped: projects.length,
          inserted: totalInserted,
          updated: totalUpdated,
          errors: errors,
          sources: UK_ELECTRICAL_SOURCES.length
        },
        data: finalProjects || []
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in enhanced-projects-scraper function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});