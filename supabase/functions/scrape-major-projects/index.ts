
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

// Initialize Supabase client
const supabaseUrl = 'https://jtwygbeceundfgnkirof.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapingSource {
  id: string;
  name: string;
  url: string;
  selector_config: any;
  scrape_frequency_hours: number;
  last_scraped_at: string | null;
}

interface ScrapedProject {
  title: string;
  summary: string;
  content: string;
  awarded_to: string;
  project_value: string;
  location: string;
  status: string;
  external_id: string;
  source_name: string;
}

// Main handler for the edge function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting major projects scraping process...');

    // Get active scraping sources that need updating
    const { data: sources, error: sourcesError } = await supabase
      .from('scraping_sources')
      .select('*')
      .eq('is_active', true);

    if (sourcesError) {
      console.error('Error fetching scraping sources:', sourcesError);
      throw sourcesError;
    }

    console.log(`Found ${sources?.length || 0} active scraping sources`);

    const results = [];

    for (const source of sources || []) {
      console.log(`Processing source: ${source.name}`);
      
      // Check if source needs scraping based on frequency
      const shouldScrape = checkIfShouldScrape(source);
      
      if (!shouldScrape) {
        console.log(`Skipping ${source.name} - not due for scraping yet`);
        continue;
      }

      const result = await scrapeSource(source);
      results.push(result);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${results.length} sources`,
        results 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in scraping process:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

function checkIfShouldScrape(source: ScrapingSource): boolean {
  if (!source.last_scraped_at) return true;
  
  const lastScraped = new Date(source.last_scraped_at);
  const now = new Date();
  const hoursSinceLastScrape = (now.getTime() - lastScraped.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceLastScrape >= source.scrape_frequency_hours;
}

async function scrapeSource(source: ScrapingSource) {
  const startTime = Date.now();
  let projectsFound = 0;
  let projectsAdded = 0;
  let errorMessage = null;
  
  try {
    console.log(`Scraping ${source.name} from ${source.url}`);
    
    // Since we can't use external libraries for web scraping in edge functions,
    // we'll use a simplified approach with fetch and basic text parsing
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse projects based on source configuration
    const projects = parseProjectsFromHtml(html, source);
    projectsFound = projects.length;
    
    console.log(`Found ${projectsFound} potential projects from ${source.name}`);
    
    // Process and save projects
    for (const project of projects) {
      const added = await saveProject(project, source.name);
      if (added) projectsAdded++;
    }
    
    // Update last scraped timestamp
    await supabase
      .from('scraping_sources')
      .update({ last_scraped_at: new Date().toISOString() })
      .eq('id', source.id);
    
    console.log(`Successfully processed ${source.name}: ${projectsAdded}/${projectsFound} projects added`);
    
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    errorMessage = error.message;
  }
  
  const executionTime = Date.now() - startTime;
  
  // Log the scraping attempt
  await supabase.from('scraping_logs').insert({
    source_id: source.id,
    status: errorMessage ? 'error' : 'success',
    projects_found: projectsFound,
    projects_added: projectsAdded,
    error_message: errorMessage,
    execution_time_ms: executionTime
  });
  
  return {
    source: source.name,
    status: errorMessage ? 'error' : 'success',
    projects_found: projectsFound,
    projects_added: projectsAdded,
    error_message: errorMessage,
    execution_time_ms: executionTime
  };
}

function parseProjectsFromHtml(html: string, source: ScrapingSource): ScrapedProject[] {
  const projects: ScrapedProject[] = [];
  
  try {
    // Simple regex-based parsing for demonstration
    // In a real implementation, you'd want to use a proper HTML parser
    
    if (source.name === 'Contracts Finder') {
      // Parse Contracts Finder format
      const projectMatches = html.match(/<div[^>]*class="[^"]*search-result[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
      
      for (const match of projectMatches.slice(0, 10)) { // Limit to 10 projects per scrape
        const project = parseContractsFinderProject(match, source.name);
        if (project && isElectricalProject(project)) {
          projects.push(project);
        }
      }
    } else if (source.name === 'Find a Tender') {
      // Parse Find a Tender format
      const projectMatches = html.match(/<div[^>]*class="[^"]*tender-result[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
      
      for (const match of projectMatches.slice(0, 10)) {
        const project = parseFindTenderProject(match, source.name);
        if (project && isElectricalProject(project)) {
          projects.push(project);
        }
      }
    }
  } catch (error) {
    console.error('Error parsing HTML:', error);
  }
  
  return projects;
}

function parseContractsFinderProject(html: string, sourceName: string): ScrapedProject | null {
  try {
    // Extract title
    const titleMatch = html.match(/<a[^>]*class="[^"]*search-result-title[^"]*"[^>]*>(.*?)<\/a>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    
    // Extract summary
    const summaryMatch = html.match(/<div[^>]*class="[^"]*search-result-summary[^"]*"[^>]*>(.*?)<\/div>/i);
    const summary = summaryMatch ? summaryMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    
    // Extract value
    const valueMatch = html.match(/<div[^>]*class="[^"]*search-result-value[^"]*"[^>]*>(.*?)<\/div>/i);
    const projectValue = valueMatch ? valueMatch[1].replace(/<[^>]*>/g, '').trim() : 'Not specified';
    
    // Extract location
    const locationMatch = html.match(/<div[^>]*class="[^"]*search-result-location[^"]*"[^>]*>(.*?)<\/div>/i);
    const location = locationMatch ? locationMatch[1].replace(/<[^>]*>/g, '').trim() : 'UK';
    
    if (!title) return null;
    
    return {
      title,
      summary,
      content: `${summary}\n\nSource: ${sourceName}`,
      awarded_to: 'To be announced',
      project_value: projectValue,
      location,
      status: 'open_tender',
      external_id: generateExternalId(title, sourceName),
      source_name: sourceName
    };
  } catch (error) {
    console.error('Error parsing Contracts Finder project:', error);
    return null;
  }
}

function parseFindTenderProject(html: string, sourceName: string): ScrapedProject | null {
  try {
    // Extract title
    const titleMatch = html.match(/<div[^>]*class="[^"]*tender-title[^"]*"[^>]*>(.*?)<\/div>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    
    // Extract description
    const descMatch = html.match(/<div[^>]*class="[^"]*tender-description[^"]*"[^>]*>(.*?)<\/div>/i);
    const summary = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    
    // Extract value
    const valueMatch = html.match(/<div[^>]*class="[^"]*tender-value[^"]*"[^>]*>(.*?)<\/div>/i);
    const projectValue = valueMatch ? valueMatch[1].replace(/<[^>]*>/g, '').trim() : 'Not specified';
    
    // Extract location
    const locationMatch = html.match(/<div[^>]*class="[^"]*tender-location[^"]*"[^>]*>(.*?)<\/div>/i);
    const location = locationMatch ? locationMatch[1].replace(/<[^>]*>/g, '').trim() : 'UK';
    
    if (!title) return null;
    
    return {
      title,
      summary,
      content: `${summary}\n\nSource: ${sourceName}`,
      awarded_to: 'To be announced',
      project_value: projectValue,
      location,
      status: 'open_tender',
      external_id: generateExternalId(title, sourceName),
      source_name: sourceName
    };
  } catch (error) {
    console.error('Error parsing Find a Tender project:', error);
    return null;
  }
}

function isElectricalProject(project: ScrapedProject): boolean {
  const keywords = ['electrical', 'power', 'energy', 'electric', 'lighting', 'wiring', 'installation', 'cable', 'substation', 'transformer', 'grid', 'renewable'];
  const text = `${project.title} ${project.summary}`.toLowerCase();
  
  return keywords.some(keyword => text.includes(keyword));
}

function generateExternalId(title: string, sourceName: string): string {
  // Create a consistent ID based on title and source
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanSource = sourceName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanSource}_${cleanTitle.substring(0, 50)}`;
}

async function saveProject(project: ScrapedProject, sourceName: string): Promise<boolean> {
  try {
    // Check if project already exists
    const { data: existing } = await supabase
      .from('scraped_project_tracking')
      .select('id')
      .eq('external_id', project.external_id)
      .eq('source_name', sourceName)
      .single();
    
    if (existing) {
      console.log(`Project already exists: ${project.title}`);
      return false;
    }
    
    // Insert new major project
    const { data: newProject, error: projectError } = await supabase
      .from('major_projects')
      .insert({
        title: project.title,
        summary: project.summary,
        content: project.content,
        awarded_to: project.awarded_to,
        project_value: project.project_value,
        location: project.location,
        status: project.status,
        date_awarded: new Date().toISOString().split('T')[0]
      })
      .select('id')
      .single();
    
    if (projectError) {
      console.error('Error inserting project:', projectError);
      return false;
    }
    
    // Track the scraped project
    const { error: trackingError } = await supabase
      .from('scraped_project_tracking')
      .insert({
        external_id: project.external_id,
        source_name: sourceName,
        project_id: newProject.id
      });
    
    if (trackingError) {
      console.error('Error tracking project:', trackingError);
      // Don't return false here, as the project was still added
    }
    
    console.log(`Successfully added project: ${project.title}`);
    return true;
    
  } catch (error) {
    console.error('Error saving project:', error);
    return false;
  }
}
