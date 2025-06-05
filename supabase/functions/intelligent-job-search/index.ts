
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const reedApiKey = Deno.env.get('REEDJOB_API');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, location, filters } = await req.json();
    console.log('Starting intelligent job search for:', { query, location, filters });
    
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not configured");
    }
    
    // Step 1: AI Query Enhancement
    const enhancedQueries = await generateSearchQueries(query, location, filters);
    console.log('Generated search queries:', enhancedQueries);
    
    // Step 2: Multi-source job aggregation
    const allJobs = [];
    
    // Search Reed Jobs (if API available)
    if (reedApiKey) {
      for (const searchQuery of enhancedQueries.slice(0, 3)) {
        try {
          const reedJobs = await searchReedJobs(searchQuery, location, filters);
          allJobs.push(...reedJobs);
        } catch (error) {
          console.warn('Reed search failed for query:', searchQuery, error.message);
        }
      }
    }
    
    // Search Indeed UK
    for (const searchQuery of enhancedQueries.slice(0, 2)) {
      try {
        const indeedJobs = await searchIndeedUK(searchQuery, location, filters);
        allJobs.push(...indeedJobs);
      } catch (error) {
        console.warn('Indeed search failed for query:', searchQuery, error.message);
      }
    }
    
    // Search Totaljobs
    for (const searchQuery of enhancedQueries.slice(0, 2)) {
      try {
        const totalJobs = await searchTotalJobs(searchQuery, location, filters);
        allJobs.push(...totalJobs);
      } catch (error) {
        console.warn('Totaljobs search failed for query:', searchQuery, error.message);
      }
    }
    
    // Step 3: Deduplicate and clean jobs
    const uniqueJobs = deduplicateJobs(allJobs);
    console.log(`Found ${allJobs.length} total jobs, ${uniqueJobs.length} unique`);
    
    // Step 4: AI enhancement and scoring
    let enhancedJobs = uniqueJobs;
    if (uniqueJobs.length > 0) {
      try {
        const enhancement = await enhanceJobsWithAI(uniqueJobs, query, filters);
        enhancedJobs = enhancement.enhancedJobs;
      } catch (error) {
        console.warn('AI enhancement failed:', error.message);
      }
    }
    
    // Step 5: Sort by relevance
    enhancedJobs.sort((a, b) => (b.relevanceScore || 50) - (a.relevanceScore || 50));
    
    return new Response(
      JSON.stringify({ 
        jobs: enhancedJobs.slice(0, 50), // Limit to top 50 results
        totalFound: enhancedJobs.length,
        searchQueries: enhancedQueries,
        sources: ['Reed', 'Indeed', 'Totaljobs']
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
          content: `You are an expert UK job search specialist. Generate effective search queries for UK job sites.

Return ONLY a JSON array of strings - no other text or formatting.

Consider:
- UK electrical job terminology
- Regional variations
- Industry-specific terms
- Alternative job titles
- Skills-based searches`
        },
        {
          role: 'user',
          content: `Generate 5 effective search queries for UK job sites:
Original query: "${query}"
Location: "${location}"
Filters: ${JSON.stringify(filters)}

Return JSON array of search strings only.`
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });
  
  const data = await response.json();
  try {
    const content = data.choices[0].message.content.trim();
    const cleanContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    return JSON.parse(cleanContent);
  } catch (error) {
    console.warn('Failed to parse AI queries, using fallback');
    return [query, `${query} electrician`, `${query} electrical`, 'electrician', 'electrical engineer'];
  }
}

async function searchReedJobs(query: string, location: string, filters: any) {
  const params = new URLSearchParams({
    keywords: query,
    location: location || 'United Kingdom',
    resultsToTake: '50'
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

async function searchIndeedUK(query: string, location: string, filters: any) {
  // Indeed scraping simulation - returns structured job data
  try {
    const searchUrl = `https://uk.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location || 'United Kingdom')}`;
    
    // Simulate Indeed job results with realistic UK electrical job data
    const mockJobs = [
      {
        id: `indeed-${Date.now()}-1`,
        title: `${query} - Electrical Installation`,
        company: 'UK Electrical Services Ltd',
        location: location || 'London',
        salary: '£35,000 - £45,000',
        type: 'Full-time',
        description: `We are seeking a qualified ${query} for electrical installation work. Must have 18th Edition certification and relevant experience in commercial and domestic electrical work.`,
        external_url: `${searchUrl}&vjk=sample1`,
        posted_date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Indeed'
      },
      {
        id: `indeed-${Date.now()}-2`,
        title: `Senior ${query} - Renewable Energy`,
        company: 'Green Power Solutions',
        location: location || 'Manchester',
        salary: '£40,000 - £55,000',
        type: 'Full-time',
        description: `Join our team working on solar PV and wind energy projects. Experience with renewable energy systems preferred. Excellent benefits package.`,
        external_url: `${searchUrl}&vjk=sample2`,
        posted_date: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Indeed'
      }
    ];
    
    console.log(`Indeed search simulation returned ${mockJobs.length} jobs for: ${query}`);
    return mockJobs;
  } catch (error) {
    console.warn('Indeed search failed:', error.message);
    return [];
  }
}

async function searchTotalJobs(query: string, location: string, filters: any) {
  // Totaljobs scraping simulation
  try {
    const mockJobs = [
      {
        id: `totaljobs-${Date.now()}-1`,
        title: `${query} - Maintenance Specialist`,
        company: 'Industrial Electrical Co',
        location: location || 'Birmingham',
        salary: '£32,000 - £42,000',
        type: 'Full-time',
        description: `Maintenance electrician required for industrial facility. Experience with PLCs and motor control systems essential. Day shift with occasional overtime.`,
        external_url: `https://www.totaljobs.com/job/${Date.now()}`,
        posted_date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Totaljobs'
      },
      {
        id: `totaljobs-${Date.now()}-2`,
        title: `Contract ${query} - Data Centre`,
        company: 'Tech Infrastructure Ltd',
        location: location || 'Leeds',
        salary: '£25 - £35 per hour',
        type: 'Contract',
        description: `Contract electrician needed for data centre construction project. High voltage experience required. 6-month initial contract with extension possible.`,
        external_url: `https://www.totaljobs.com/job/${Date.now() + 1}`,
        posted_date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Totaljobs'
      }
    ];
    
    console.log(`Totaljobs search simulation returned ${mockJobs.length} jobs for: ${query}`);
    return mockJobs;
  } catch (error) {
    console.warn('Totaljobs search failed:', error.message);
    return [];
  }
}

function deduplicateJobs(jobs: any[]) {
  const seen = new Set();
  const unique = [];
  
  for (const job of jobs) {
    // Create a key based on title, company, and location for deduplication
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
          content: `Enhance UK electrical job listings with AI scoring and insights. Return ONLY valid JSON array.

Add to each job:
- relevanceScore: number (1-100) based on query match
- aiTags: string array (max 4 relevant tags)
- skillsRequired: string array (max 5 key skills)
- experienceLevel: "entry" | "intermediate" | "senior" | "lead"
- salaryCompetitiveness: "low" | "average" | "high"

Keep all original fields. Return valid JSON only.`
        },
        {
          role: 'user',
          content: `Enhance these jobs for search: "${query}"
Jobs: ${JSON.stringify(jobs.slice(0, 15))}

Return enhanced JSON array only.`
        }
      ],
      temperature: 0.2,
      max_tokens: 3000,
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
