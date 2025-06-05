
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
    
    // Build proper search URL with electrical keywords
    const searchUrl = buildSearchUrl(source);
    console.log(`Using search URL: ${searchUrl}`);
    
    // Fetch with proper headers and error handling
    const response = await fetchWithRetry(searchUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    console.log(`Received ${html.length} characters of HTML`);
    
    // Parse projects based on source configuration
    const projects = await parseProjectsFromHtml(html, source);
    projectsFound = projects.length;
    
    console.log(`Found ${projectsFound} potential projects from ${source.name}`);
    
    // Process and save projects
    for (const project of projects) {
      try {
        const added = await saveProject(project, source.name);
        if (added) projectsAdded++;
      } catch (error) {
        console.error(`Error saving project "${project.title}":`, error);
      }
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

function buildSearchUrl(source: ScrapingSource): string {
  const electricalKeywords = [
    'electrical', 'power', 'energy', 'lighting', 'wiring', 
    'installation', 'substation', 'transformer', 'cable'
  ];
  
  if (source.name === 'Contracts Finder') {
    // Build search URL for Contracts Finder with electrical keywords
    const keyword = electricalKeywords[Math.floor(Math.random() * electricalKeywords.length)];
    return `https://www.contractsfinder.service.gov.uk/Search/Results?&keywords=${encodeURIComponent(keyword)}&isSubcontract=&publishedFrom=&publishedTo=&updatedFrom=&updatedTo=&awardedFrom=&awardedTo=&valueFrom=&valueTo=&postcode=&distance=0&lot=&organisation=&cpv=&stage%5B%5D=4&stage%5B%5D=6&stage%5B%5D=7&stage%5B%5D=8`;
  } else if (source.name === 'Find a Tender') {
    // Build search URL for Find a Tender with electrical keywords
    const keyword = electricalKeywords[Math.floor(Math.random() * electricalKeywords.length)];
    return `https://www.find-tender.service.gov.uk/Search?keywords=${encodeURIComponent(keyword)}`;
  }
  
  return source.url;
}

async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-GB,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0'
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to fetch ${url}`);
      
      const response = await fetch(url, {
        headers,
        redirect: 'follow'
      });
      
      if (response.ok) {
        return response;
      }
      
      console.log(`Attempt ${attempt} failed with status: ${response.status}`);
      
      if (attempt === maxRetries) {
        return response; // Return the last response for error handling
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw new Error(`Failed to fetch after ${maxRetries} attempts`);
}

async function parseProjectsFromHtml(html: string, source: ScrapingSource): Promise<ScrapedProject[]> {
  const projects: ScrapedProject[] = [];
  
  try {
    console.log(`Starting to parse HTML for ${source.name}`);
    
    if (source.name === 'Contracts Finder') {
      await parseContractsFinderProjects(html, projects, source.name);
    } else if (source.name === 'Find a Tender') {
      await parseFindTenderProjects(html, projects, source.name);
    }
    
    console.log(`Parsed ${projects.length} projects from ${source.name}`);
    
  } catch (error) {
    console.error(`Error parsing HTML for ${source.name}:`, error);
  }
  
  return projects;
}

async function parseContractsFinderProjects(html: string, projects: ScrapedProject[], sourceName: string) {
  // Look for multiple patterns that might indicate project listings
  const patterns = [
    // Search result items
    /<article[^>]*class="[^"]*search-result[^"]*"[^>]*>([\s\S]*?)<\/article>/gi,
    /<div[^>]*class="[^"]*result[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<li[^>]*class="[^"]*opportunity[^"]*"[^>]*>([\s\S]*?)<\/li>/gi,
    // Table rows
    /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  ];

  for (const pattern of patterns) {
    const matches = html.match(pattern) || [];
    console.log(`Found ${matches.length} potential matches with pattern`);
    
    for (const match of matches.slice(0, 15)) { // Limit processing
      const project = extractProjectFromMatch(match, sourceName, 'contracts-finder');
      if (project && isElectricalProject(project)) {
        projects.push(project);
      }
    }
    
    if (projects.length > 0) break; // Use first successful pattern
  }
}

async function parseFindTenderProjects(html: string, projects: ScrapedProject[], sourceName: string) {
  // Look for multiple patterns for Find a Tender
  const patterns = [
    /<div[^>]*class="[^"]*tender[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<article[^>]*class="[^"]*notice[^"]*"[^>]*>([\s\S]*?)<\/article>/gi,
    /<li[^>]*class="[^"]*opportunity[^"]*"[^>]*>([\s\S]*?)<\/li>/gi,
    /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  ];

  for (const pattern of patterns) {
    const matches = html.match(pattern) || [];
    console.log(`Found ${matches.length} potential matches with pattern`);
    
    for (const match of matches.slice(0, 15)) { // Limit processing
      const project = extractProjectFromMatch(match, sourceName, 'find-tender');
      if (project && isElectricalProject(project)) {
        projects.push(project);
      }
    }
    
    if (projects.length > 0) break; // Use first successful pattern
  }
}

function extractProjectFromMatch(html: string, sourceName: string, sourceType: string): ScrapedProject | null {
  try {
    // Extract text content from HTML
    const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (textContent.length < 50) return null; // Skip very short content
    
    // Extract potential title (first significant text or link text)
    const titleMatch = html.match(/<a[^>]*>([^<]+)<\/a>/) || 
                      html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/) ||
                      html.match(/^([^.!?]{10,100})/);
    
    const title = titleMatch ? titleMatch[1].trim() : textContent.substring(0, 100) + '...';
    
    if (!title || title.length < 10) return null;
    
    // Extract summary (first portion of text content)
    const summary = textContent.substring(0, 300).trim();
    
    // Extract potential value information
    const valuePatterns = [
      /£[\d,]+(?:\.\d{2})?(?:\s*(?:million|m|k|thousand))?/gi,
      /value[:\s]*£?[\d,]+/gi,
      /worth[:\s]*£?[\d,]+/gi,
      /\b\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:pounds?|gbp)\b/gi
    ];
    
    let projectValue = 'Not specified';
    for (const pattern of valuePatterns) {
      const match = textContent.match(pattern);
      if (match) {
        projectValue = match[0];
        break;
      }
    }
    
    // Extract location information
    const locationPatterns = [
      /\b(?:London|Birmingham|Manchester|Liverpool|Leeds|Sheffield|Bristol|Newcastle|Nottingham|Leicester|Cardiff|Edinburgh|Glasgow|Belfast)\b/gi,
      /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/g, // UK postcodes
      /location[:\s]*([^,.\n]{5,50})/gi
    ];
    
    let location = 'UK';
    for (const pattern of locationPatterns) {
      const match = textContent.match(pattern);
      if (match) {
        location = match[0].replace(/location[:\s]*/gi, '').trim();
        break;
      }
    }
    
    // Determine status based on source and content
    let status = 'open_tender';
    if (textContent.toLowerCase().includes('awarded') || textContent.toLowerCase().includes('won')) {
      status = 'awarded';
    } else if (textContent.toLowerCase().includes('closed') || textContent.toLowerCase().includes('expired')) {
      status = 'closed';
    }
    
    const project: ScrapedProject = {
      title: title.substring(0, 200), // Limit title length
      summary: summary.substring(0, 500), // Limit summary length
      content: `${summary}\n\nSource: ${sourceName}\nExtracted from: ${sourceType}`,
      awarded_to: status === 'awarded' ? 'To be confirmed' : 'To be announced',
      project_value: projectValue,
      location: location.substring(0, 100), // Limit location length
      status,
      external_id: generateExternalId(title, sourceName),
      source_name: sourceName
    };
    
    console.log(`Extracted project: ${title.substring(0, 50)}...`);
    return project;
    
  } catch (error) {
    console.error('Error extracting project from match:', error);
    return null;
  }
}

function isElectricalProject(project: ScrapedProject): boolean {
  const keywords = [
    'electrical', 'power', 'energy', 'electric', 'lighting', 'wiring', 
    'installation', 'cable', 'substation', 'transformer', 'grid', 
    'renewable', 'solar', 'wind', 'battery', 'inverter', 'switchgear',
    'distribution', 'transmission', 'circuit', 'meter', 'panel',
    'conduit', 'earthing', 'protection', 'automation', 'control'
  ];
  
  const text = `${project.title} ${project.summary}`.toLowerCase();
  const hasKeyword = keywords.some(keyword => text.includes(keyword));
  
  if (hasKeyword) {
    console.log(`Project "${project.title.substring(0, 50)}..." matches electrical keywords`);
  }
  
  return hasKeyword;
}

function generateExternalId(title: string, sourceName: string): string {
  // Create a consistent ID based on title and source
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanSource = sourceName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits for uniqueness
  return `${cleanSource}_${cleanTitle.substring(0, 40)}_${timestamp}`;
}

async function saveProject(project: ScrapedProject, sourceName: string): Promise<boolean> {
  try {
    // Check if project already exists
    const { data: existing } = await supabase
      .from('scraped_project_tracking')
      .select('id')
      .eq('external_id', project.external_id)
      .eq('source_name', sourceName)
      .maybeSingle();
    
    if (existing) {
      console.log(`Project already exists: ${project.title.substring(0, 50)}...`);
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
    
    console.log(`Successfully added project: ${project.title.substring(0, 50)}...`);
    return true;
    
  } catch (error) {
    console.error('Error saving project:', error);
    return false;
  }
}
