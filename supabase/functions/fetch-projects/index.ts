import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Project {
  title: string;
  description: string;
  value: string;
  location: string;
  deadline: string;
  client: string;
  source: string;
  external_id: string;
  url: string;
  status: string;
  sector: string;
  date_awarded?: string;
}

async function scrapeProjectsWithFirecrawl(firecrawlApiKey: string): Promise<Project[]> {
  const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
  const projects: Project[] = [];

  const sources = [
    {
      url: 'https://www.contractsfinder.service.gov.uk/Search/Results?SearchType=1&Keywords=electrical',
      name: 'Contracts Finder',
      sector: 'Government'
    },
    {
      url: 'https://www.constructionnews.co.uk/sectors/infrastructure/',
      name: 'Construction News',
      sector: 'Infrastructure'
    }
  ];

  for (const source of sources) {
    try {
      console.log(`Scraping projects from: ${source.url}`);
      
      const scrapeResult = await firecrawl.scrapeUrl(source.url, {
        formats: ['markdown'],
        includeTags: ['h1', 'h2', 'h3', 'p', 'div', 'span'],
        waitFor: 3000
      });

      if (!scrapeResult.success) {
        console.error(`Failed to scrape ${source.name}:`, scrapeResult.error);
        continue;
      }

      const content = scrapeResult.data?.markdown || '';
      
      // Enhanced project extraction from scraped content
      const projectMatches = extractProjectsFromContent(content, source);
      projects.push(...projectMatches);
      
      console.log(`Extracted ${projectMatches.length} projects from ${source.name}`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
    }
  }

  return projects;
}

function extractProjectsFromContent(content: string, source: any): Project[] {
  const projects: Project[] = [];
  
  // Enhanced regex patterns for electrical projects
  const titlePatterns = [
    /(?:electrical|power|grid|energy|infrastructure|substation|transmission)[\w\s]*project/gi,
    /(?:hospital|school|university|transport|railway|underground)[\w\s]*electrical/gi,
    /(?:tender|contract|award)[\w\s]*(?:electrical|power|energy)/gi
  ];

  const lines = content.split('\n');
  let currentProject: Partial<Project> = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for project titles
    for (const pattern of titlePatterns) {
      const match = line.match(pattern);
      if (match && line.length > 20 && line.length < 200) {
        // Found a potential project title
        const title = line.replace(/^#+\s*/, '').trim();
        
        if (title && !title.toLowerCase().includes('cookie') && !title.toLowerCase().includes('privacy')) {
          currentProject = {
            title,
            source: source.name,
            url: source.url,
            external_id: `${source.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sector: determineSector(title),
            status: determineStatus(title)
          };
          
          // Look for additional details in nearby lines
          const contextLines = lines.slice(i, Math.min(i + 10, lines.length));
          const contextText = contextLines.join(' ');
          
          // Extract value
          const valueMatch = contextText.match(/£([\d,]+(?:\.\d+)?)\s*(?:million|m|k|thousand)?/i);
          if (valueMatch) {
            let value = valueMatch[1];
            const unit = valueMatch[0].toLowerCase();
            if (unit.includes('million') || unit.includes('m')) {
              value += 'M';
            } else if (unit.includes('thousand') || unit.includes('k')) {
              value += 'K';
            }
            currentProject.value = `£${value}`;
          }
          
          // Extract location
          const locationMatch = contextText.match(/(?:in|at|for|across)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]*)*(?:\s*,\s*UK)?)/);
          if (locationMatch) {
            currentProject.location = locationMatch[1];
          }
          
          // Extract client
          const clientMatch = contextText.match(/(?:client|awarded to|contractor):\s*([A-Z][^.]*)/i);
          if (clientMatch) {
            currentProject.client = clientMatch[1].trim();
          }
          
          // Set defaults
          currentProject.description = contextText.substring(0, 300).trim() || 'Project details to be confirmed';
          currentProject.deadline = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
          currentProject.date_awarded = new Date().toISOString();
          
          if (currentProject.title && currentProject.title.length > 10) {
            projects.push(currentProject as Project);
          }
        }
      }
    }
  }
  
  return projects;
}

function determineSector(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('hospital') || titleLower.includes('health') || titleLower.includes('nhs')) return 'Healthcare';
  if (titleLower.includes('transport') || titleLower.includes('railway') || titleLower.includes('underground') || titleLower.includes('station')) return 'Transport';
  if (titleLower.includes('school') || titleLower.includes('university') || titleLower.includes('education')) return 'Education';
  if (titleLower.includes('wind') || titleLower.includes('solar') || titleLower.includes('renewable')) return 'Renewable Energy';
  if (titleLower.includes('data') || titleLower.includes('tech') || titleLower.includes('digital')) return 'Technology';
  return 'Infrastructure';
}

function determineStatus(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('tender') || titleLower.includes('bidding')) return 'active';
  if (titleLower.includes('awarded') || titleLower.includes('contract')) return 'active';
  return 'active';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting Firecrawl-based project scraping...');
    
    // Use Firecrawl to scrape real-time project data
    const projects = await scrapeProjectsWithFirecrawl(firecrawlApiKey);
    
    let totalInserted = 0;
    let errors = 0;

    for (const project of projects) {
      try {
        const { error } = await supabase
          .from('major_projects')
          .upsert({
            title: project.title,
            summary: project.description,
            content: project.description,
            awarded_to: project.client || 'To be confirmed',
            project_value: project.value || 'TBC',
            location: project.location || 'UK',
            status: project.status,
            date_awarded: project.date_awarded || new Date().toISOString(),
          }, { 
            onConflict: 'title',
            ignoreDuplicates: false 
          });

        if (!error) {
          totalInserted++;
        } else {
          console.error('Error inserting project:', error);
          errors++;
        }
      } catch (insertError) {
        console.error('Error processing project:', insertError);
        errors++;
      }
    }

    // Also fetch existing database projects to return
    const { data: dbProjects, error: dbError } = await supabase
      .from('major_projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (dbError) {
      console.error('Error fetching database projects:', dbError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalInserted} new projects`,
        inserted: totalInserted,
        errors: errors,
        data: dbProjects || [],
        scrapedProjects: projects.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-projects function:', error);
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