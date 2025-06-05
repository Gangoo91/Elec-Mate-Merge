
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const reedApiKey = Deno.env.get('REEDJOB_API');
const adzunaAppId = Deno.env.get('ADZUNA_APP_ID');
const adzunaAppKey = Deno.env.get('ADZUNA_APP_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, location, filters } = await req.json();
    console.log('Starting intelligent job search for:', { query, location, filters });
    
    // Generate enhanced search queries with AI (if available)
    let searchQueries = [query];
    if (openAIApiKey) {
      try {
        const enhancedQueries = await generateSearchQueries(query, location, filters);
        searchQueries = enhancedQueries;
        console.log('Generated search queries:', enhancedQueries);
      } catch (error) {
        console.warn('AI query generation failed, using original query:', error.message);
      }
    }
    
    // Aggregate jobs from multiple sources
    const allJobs = [];
    
    // Search Reed Jobs (if API available)
    if (reedApiKey) {
      for (const searchQuery of searchQueries.slice(0, 2)) {
        try {
          const reedJobs = await searchReedJobs(searchQuery, location, filters);
          allJobs.push(...reedJobs);
        } catch (error) {
          console.warn('Reed search failed for query:', searchQuery, error.message);
        }
      }
    }
    
    // Search Adzuna UK (real job data)
    if (adzunaAppId && adzunaAppKey) {
      for (const searchQuery of searchQueries.slice(0, 3)) {
        try {
          const adzunaJobs = await searchAdzunaJobs(searchQuery, location, filters);
          allJobs.push(...adzunaJobs);
        } catch (error) {
          console.warn('Adzuna search failed for query:', searchQuery, error.message);
        }
      }
    }
    
    // Deduplicate jobs
    const uniqueJobs = deduplicateJobs(allJobs);
    console.log(`Found ${allJobs.length} total jobs, ${uniqueJobs.length} unique`);
    
    // AI enhancement (optional, only if we have jobs and OpenAI key)
    let enhancedJobs = uniqueJobs;
    if (openAIApiKey && uniqueJobs.length > 0) {
      try {
        const enhancement = await enhanceJobsWithAI(uniqueJobs.slice(0, 12), query, filters);
        enhancedJobs = enhancement.enhancedJobs;
      } catch (error) {
        console.warn('AI enhancement failed:', error.message);
      }
    }
    
    // Sort by relevance or date
    enhancedJobs.sort((a, b) => {
      if (a.relevanceScore && b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
    });
    
    return new Response(
      JSON.stringify({ 
        jobs: enhancedJobs.slice(0, 50),
        totalFound: enhancedJobs.length,
        searchQueries: searchQueries,
        sources: getActiveSources()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in intelligent job search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        jobs: [],
        totalFound: 0
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateSearchQueries(query: string, location: string, filters: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Generate effective UK job search queries. Return ONLY a JSON array of strings.

Consider:
- UK electrical terminology
- Alternative job titles
- Skills-based searches
- Regional variations`
        },
        {
          role: 'user',
          content: `Generate 4 search queries for:
Query: "${query}"
Location: "${location}"

Return JSON array only.`
        }
      ],
      temperature: 0.3,
      max_tokens: 400,
    }),
  });
  
  const data = await response.json();
  try {
    const content = data.choices[0].message.content.trim();
    const cleanContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    return JSON.parse(cleanContent);
  } catch (error) {
    console.warn('Failed to parse AI queries, using fallback');
    return [query, `${query} electrician`, `${query} electrical`, 'electrician jobs'];
  }
}

async function searchReedJobs(query: string, location: string, filters: any) {
  if (!reedApiKey) return [];
  
  const params = new URLSearchParams({
    keywords: query,
    location: location || 'United Kingdom',
    resultsToTake: '20'
  });
  
  const response = await fetch(`https://www.reed.co.uk/api/1.0/search?${params}`, {
    headers: {
      'Authorization': `Basic ${btoa(reedApiKey + ':')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Reed API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return (data.results || []).map((job: any) => ({
    id: `reed-${job.jobId}`,
    title: job.jobTitle,
    company: job.employerName,
    location: job.locationName,
    salary: job.minimumSalary && job.maximumSalary ? 
      `£${job.minimumSalary.toLocaleString()} - £${job.maximumSalary.toLocaleString()}` : null,
    type: job.jobType || 'Full-time',
    description: job.jobDescription,
    external_url: job.jobUrl,
    posted_date: job.date,
    source: 'Reed'
  }));
}

async function searchAdzunaJobs(query: string, location: string, filters: any) {
  if (!adzunaAppId || !adzunaAppKey) return [];
  
  const params = new URLSearchParams({
    app_id: adzunaAppId,
    app_key: adzunaAppKey,
    what: query,
    where: location || 'UK',
    results_per_page: '20',
    content_type: 'application/json'
  });
  
  // Add job type filter if specified
  if (filters.jobType === 'contract') {
    params.append('contract', 'true');
  } else if (filters.jobType === 'part-time') {
    params.append('part_time', 'true');
  } else if (filters.jobType === 'full-time') {
    params.append('full_time', 'true');
  }
  
  const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?${params}`);
  
  if (!response.ok) {
    throw new Error(`Adzuna API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return (data.results || []).map((job: any) => ({
    id: `adzuna-${job.id}`,
    title: job.title,
    company: job.company?.display_name || 'Company not specified',
    location: job.location?.display_name || location,
    salary: job.salary_min && job.salary_max ? 
      `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()}` : 
      job.salary_min ? `£${Math.round(job.salary_min).toLocaleString()}+` : null,
    type: job.contract_type || 'Full-time',
    description: job.description || 'No description available',
    external_url: job.redirect_url,
    posted_date: job.created,
    source: 'Adzuna'
  }));
}

function deduplicateJobs(jobs: any[]) {
  const seen = new Set();
  const unique = [];
  
  for (const job of jobs) {
    const key = `${job.title?.toLowerCase()}-${job.company?.toLowerCase()}-${job.location?.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(job);
    }
  }
  
  return unique;
}

async function enhanceJobsWithAI(jobs: any[], query: string, filters: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Enhance UK electrical job listings with AI scoring. Return ONLY valid JSON array.

Add to each job:
- relevanceScore: number (1-100) based on query match
- aiTags: string array (max 3 relevant tags)
- skillsRequired: string array (max 4 key skills)
- experienceLevel: "entry" | "intermediate" | "senior" | "lead"

Keep all original fields. Return valid JSON only.`
        },
        {
          role: 'user',
          content: `Enhance these jobs for search: "${query}"
Jobs: ${JSON.stringify(jobs)}

Return enhanced JSON array only.`
        }
      ],
      temperature: 0.2,
      max_tokens: 2500,
    }),
  });
  
  const data = await response.json();
  try {
    const content = data.choices[0].message.content.trim();
    const cleanContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const enhanced = JSON.parse(cleanContent);
    
    return { enhancedJobs: Array.isArray(enhanced) ? enhanced : jobs };
  } catch (error) {
    console.warn('AI enhancement parsing failed:', error.message);
    return { enhancedJobs: jobs };
  }
}

function getActiveSources() {
  const sources = [];
  if (reedApiKey) sources.push('Reed');
  if (adzunaAppId && adzunaAppKey) sources.push('Adzuna');
  return sources;
}
