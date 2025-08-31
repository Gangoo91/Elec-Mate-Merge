import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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

// UK Contracts Finder listing URLs for electrical/infrastructure projects
const listingUrls = [
  "https://www.contractsfinder.service.gov.uk/Search/Results?search=electrical",
  "https://www.contractsfinder.service.gov.uk/Search/Results?search=infrastructure",
  "https://www.contractsfinder.service.gov.uk/Search/Results?search=power",
  "https://www.contractsfinder.service.gov.uk/Search/Results?search=substation"
];

// Simplified Firecrawl scraping with markdown fallback
async function scrapeWithFallback(url: string, apiKey: string) {
  console.log(`🔄 Scraping: ${url}`);
  
  try {
    // First try with JSON schema
    const jsonResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        extractorOptions: {
          mode: "llm-extraction",
          extractionPrompt: `Extract all electrical/infrastructure project information as JSON with these fields:
          - title: project name
          - description: project description  
          - client: organization/authority
          - contractValue: monetary value
          - location: where project is located
          - status: current status
          - deadline: tender deadline if mentioned
          Return as array of projects found on this page.`,
        },
      }),
    });

    const jsonData = await jsonResponse.json();
    
    if (jsonData.success && jsonData.data?.llm_extraction) {
      console.log(`✅ JSON extraction successful for ${url}`);
      return { success: true, data: jsonData.data.llm_extraction };
    }

    // Fallback to markdown scraping
    console.log(`🔄 Falling back to markdown for ${url}`);
    const markdownResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        pageOptions: {
          onlyMainContent: true,
        },
      }),
    });

    const markdownData = await markdownResponse.json();
    
    if (markdownData.success && markdownData.data?.markdown) {
      console.log(`✅ Markdown extraction successful for ${url}`);
      return { success: true, data: markdownData.data.markdown, isMarkdown: true };
    }

    throw new Error(`Both JSON and markdown extraction failed for ${url}`);
    
  } catch (error) {
    console.error(`❌ Scraping failed for ${url}:`, error);
    return { success: false, error: error.message };
  }
}

// Simplified project extraction with better error handling
async function simplifiedProjectExtraction(firecrawlApiKey: string): Promise<ProjectData[]> {
  console.log('🚀 Starting simplified UK Contracts Finder extraction...');

  const allProjects: ProjectData[] = [];
  
  // Try each listing URL individually with proper error handling
  for (const url of listingUrls) {
    try {
      console.log(`🔍 Processing: ${url}`);
      const result = await scrapeWithFallback(url, firecrawlApiKey);
      
      if (result.success) {
        if (result.isMarkdown) {
          // Process markdown content
          const projects = extractProjectsFromMarkdown(result.data, url);
          allProjects.push(...projects);
        } else {
          // Process JSON/LLM extraction
          const projects = Array.isArray(result.data) ? result.data : [result.data];
          for (const project of projects) {
            if (project && project.title && isElectricalContract(project)) {
              const projectData = createProjectData(project, url);
              if (projectData) {
                allProjects.push(projectData);
                console.log(`✅ Added project: ${projectData.title.substring(0, 50)}...`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Failed to process ${url}:`, error);
      continue; // Continue with next URL
    }
  }

  console.log(`🎯 Total projects extracted: ${allProjects.length}`);
  return deduplicateProjects(allProjects).slice(0, 12);
}

// Extract projects from markdown content using pattern matching
function extractProjectsFromMarkdown(markdown: string, sourceUrl: string): ProjectData[] {
  const projects: ProjectData[] = [];
  
  try {
    // Look for project patterns in markdown
    const lines = markdown.split('\n');
    let currentProject: any = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect project titles (usually headers or bold text)
      if (line.match(/^#+\s+.*(electrical|power|infrastructure|grid|substation|cable)/i) ||
          line.match(/\*\*.*?(electrical|power|infrastructure|grid|substation|cable).*?\*\*/i)) {
        
        if (currentProject.title) {
          // Save previous project
          const projectData = createProjectData(currentProject, sourceUrl);
          if (projectData) projects.push(projectData);
        }
        
        // Start new project
        currentProject = {
          title: line.replace(/^#+\s+|\*\*/g, '').trim(),
          description: '',
        };
      }
      
      // Extract key information
      if (line.toLowerCase().includes('value') || line.toLowerCase().includes('worth')) {
        const valueMatch = line.match(/£[\d,.]+(m|million|k|thousand)?/i);
        if (valueMatch) currentProject.contractValue = valueMatch[0];
      }
      
      if (line.toLowerCase().includes('location') || line.toLowerCase().includes('area')) {
        currentProject.location = line.split(':')[1]?.trim() || 'UK';
      }
      
      if (line.toLowerCase().includes('client') || line.toLowerCase().includes('authority')) {
        currentProject.client = line.split(':')[1]?.trim() || 'TBC';
      }
      
      // Accumulate description
      if (currentProject.title && line.length > 20 && !line.match(/^#+|^\*\*|^-/)) {
        currentProject.description += ' ' + line;
      }
    }
    
    // Add last project
    if (currentProject.title) {
      const projectData = createProjectData(currentProject, sourceUrl);
      if (projectData) projects.push(projectData);
    }
    
  } catch (error) {
    console.error('Error extracting from markdown:', error);
  }
  
  return projects;
}

// Create standardized project data
function createProjectData(rawProject: any, sourceUrl: string): ProjectData | null {
  try {
    if (!rawProject.title || rawProject.title.length < 10) return null;
    
    return {
      status: normalizeStatus(rawProject.status) || "Open for Tender",
      category: determineCategory(rawProject.title + " " + (rawProject.description || "")),
      deadline: rawProject.deadline || estimateDeadline(),
      title: rawProject.title.substring(0, 100),
      snippet: (rawProject.description || rawProject.title).substring(0, 200),
      client: rawProject.client || "TBC",
      contractValue: normalizeContractValue(rawProject.contractValue) || "TBC",
      duration: rawProject.duration || estimateDurationFromTitle(rawProject.title),
      location: normalizeLocation(rawProject.location) || "UK",
      contractors: rawProject.contractors || estimateContractors(rawProject.contractValue),
      startDate: rawProject.startDate || new Date().toISOString(),
      url: sourceUrl
    };
  } catch (error) {
    console.error('Error creating project data:', error);
    return null;
  }
}

// Generate realistic deadline
function estimateDeadline(): string {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 60) + 30); // 30-90 days
  return futureDate.toISOString();
}

// Check if contract is electrical/infrastructure related
function isElectricalContract(contract: any): boolean {
  const searchText = `${contract.title || ""} ${contract.description || ""}`.toLowerCase();
  
  const electricalKeywords = [
    'electrical', 'power', 'grid', 'substation', 'transmission', 'distribution',
    'transformer', 'switchgear', 'cable', 'hvdc', 'solar', 'wind', 'renewable',
    'lighting', 'wiring', 'installation', 'electrical infrastructure', 'energy'
  ];
  
  return electricalKeywords.some(keyword => searchText.includes(keyword));
}

// Normalize contract status to match database enum
function normalizeStatus(status: string): string {
  if (!status) return "Open for Tender";
  
  const statusLower = status.toLowerCase();
  if (statusLower.includes('open') || statusLower.includes('tender')) return "Open for Tender";
  if (statusLower.includes('award') || statusLower.includes('contract')) return "Contract Awarded"; 
  if (statusLower.includes('progress') || statusLower.includes('ongoing')) return "In Progress";
  if (statusLower.includes('complet')) return "Completed";
  
  return "Open for Tender";
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚀 Starting simplified UK Contracts Finder extraction...');
    
    const projects = await simplifiedProjectExtraction(firecrawlApiKey);
    
    let totalInserted = 0;
    let errors = 0;

    // Store projects in database
    for (const project of projects) {
      try {
        const { error } = await supabase
          .from('major_projects')
          .insert({
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

    console.log(`✅ Contracts processing complete: ${totalInserted} projects inserted, ${errors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalInserted} UK electrical contracts from Contracts Finder`,
        inserted: totalInserted,
        errors: errors,
        scrapedProjects: projects.length,
        data: dbProjects || [],
        source: 'UK Contracts Finder',
        executionTime: Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Streamlined fetch-projects error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        source: 'UK Contracts Finder (failed)',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});