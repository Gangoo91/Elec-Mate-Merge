import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REED_API_KEY');
const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrical course", location = "United Kingdom" } = await req.json();
    
    console.log(`Starting Reed hybrid course search for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check cache first
    const cacheKey = `hybrid-${keywords}-${location}`;
    const { data: cachedData } = await supabase
      .from('live_course_cache')
      .select('course_data')
      .eq('source', 'reed-hybrid')
      .eq('search_query', cacheKey)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedData) {
      console.log('Returning cached Reed hybrid course data');
      return new Response(JSON.stringify(cachedData.course_data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Run both approaches in parallel
    const promises = [];
    
    // 1. Firecrawl scraping (primary)
    if (firecrawlApiKey) {
      promises.push(scrapeReedCourses(keywords));
    }
    
    // 2. Reed API with enhanced filtering (supplementary)
    if (reedApiKey) {
      promises.push(fetchReedApiCourses(keywords, location));
    }

    const results = await Promise.allSettled(promises);
    
    let allCourses: any[] = [];
    let firecrawlCourses: any[] = [];
    let apiCourses: any[] = [];
    
    // Process Firecrawl results
    if (results[0] && results[0].status === 'fulfilled') {
      firecrawlCourses = results[0].value || [];
      console.log(`✅ Firecrawl: ${firecrawlCourses.length} courses`);
    } else {
      console.log(`❌ Firecrawl failed: ${results[0]?.status === 'rejected' ? results[0].reason : 'Unknown error'}`);
    }
    
    // Process API results
    if (results[1] && results[1].status === 'fulfilled') {
      apiCourses = results[1].value || [];
      console.log(`✅ Reed API: ${apiCourses.length} courses`);
    } else {
      console.log(`❌ Reed API failed: ${results[1]?.status === 'rejected' ? results[1].reason : 'Unknown error'}`);
    }
    
    // Combine and prioritize Firecrawl results
    allCourses = [...firecrawlCourses, ...apiCourses];
    
    // Remove duplicates and enhance scoring
    const uniqueCourses = removeDuplicatesAndScore(allCourses, keywords);
    
    // Sort by relevance and source priority
    uniqueCourses.sort((a, b) => {
      // Prioritize Firecrawl results
      if (a.source === 'Reed Courses' && b.source !== 'Reed Courses') return -1;
      if (a.source !== 'Reed Courses' && b.source === 'Reed Courses') return 1;
      
      // Then by relevance score
      return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    });

    const result = {
      courses: uniqueCourses,
      total: uniqueCourses.length,
      source: 'reed-hybrid',
      searchCriteria: { keywords, location },
      sourceBreakdown: {
        firecrawl: firecrawlCourses.length,
        api: apiCourses.length,
        unique: uniqueCourses.length
      },
      lastUpdated: new Date().toISOString()
    };

    // Cache the results
    await supabase
      .from('live_course_cache')
      .insert({
        source: 'reed-hybrid',
        search_query: cacheKey,
        course_data: result
      });

    console.log(`✅ Returning ${uniqueCourses.length} hybrid Reed courses`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reed-courses-hybrid:', error);
    return new Response(JSON.stringify({
      error: error.message,
      courses: [],
      total: 0,
      source: 'reed-hybrid'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function scrapeReedCourses(keywords: string): Promise<any[]> {
  const targetUrl = keywords.toLowerCase().includes('electrical') || keywords.toLowerCase().includes('electrician') 
    ? 'https://www.reed.co.uk/courses/electrician'
    : `https://www.reed.co.uk/courses/${encodeURIComponent(keywords.replace(/\s+/g, '-').toLowerCase())}`;
  
  console.log('Scraping Reed courses from:', targetUrl);

  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        pageOptions: {
          onlyMainContent: true
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionSchema: {
            type: "object",
            properties: {
              courses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string", description: "Complete course title" },
                    provider: { type: "string", description: "Training provider name" },
                    description: { type: "string", description: "Course description" },
                    duration: { type: "string", description: "Course duration" },
                    price: { type: "string", description: "Course price in GBP" },
                    location: { type: "string", description: "Course location" },
                    level: { type: "string", description: "Course level" },
                    startDate: { type: "string", description: "Next start date" },
                    accreditation: { type: "string", description: "Awarding body" }
                  },
                  required: ["title", "provider"]
                }
              }
            }
          },
          extractionPrompt: `Extract ALL electrical courses from this Reed.co.uk courses page. Focus on:
- Complete course titles with qualification details
- Training provider names (colleges, academies)
- Course descriptions and content
- Duration and pricing in GBP
- Locations and start dates
- Qualification levels and awarding bodies
Extract comprehensive course information from Reed's structured course listings.`
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.statusText}`);
    }

    const data = await response.json();
    let courses: any[] = [];
    
    if (data.llm_extraction) {
      const extracted = typeof data.llm_extraction === 'string' 
        ? JSON.parse(data.llm_extraction)
        : data.llm_extraction;
      courses = extracted.courses || [];
    } else if (data.data?.llm_extraction) {
      const extracted = typeof data.data.llm_extraction === 'string' 
        ? JSON.parse(data.data.llm_extraction)
        : data.data.llm_extraction;
      courses = extracted.courses || [];
    }

    return courses.map((course: any, index: number) => ({
      id: `reed-firecrawl-${index}`,
      title: course.title,
      provider: course.provider,
      description: course.description || 'Course details available',
      duration: course.duration || 'Contact provider',
      level: course.level || 'Various levels',
      price: course.price || 'Contact for pricing',
      format: course.location?.toLowerCase().includes('online') ? 'Online' : 'Classroom',
      nextDates: course.startDate ? [course.startDate] : ['Contact provider'],
      rating: 4.3,
      locations: [course.location || 'Various locations'],
      category: 'Professional Development',
      industryDemand: 'High' as const,
      futureProofing: 4,
      salaryImpact: 'Contact provider',
      careerOutcomes: ['Professional certification', 'Career advancement'],
      accreditation: course.accreditation ? [course.accreditation] : ['Industry recognised'],
      employerSupport: true,
      prerequisites: ['Contact provider'],
      courseOutline: ['Contact provider for details'],
      assessmentMethod: 'Contact provider',
      continuousAssessment: false,
      external_url: targetUrl,
      source: 'Reed Courses',
      isLive: true,
      relevanceScore: calculateRelevanceScore(course.title || '', keywords)
    }));

  } catch (error) {
    console.error('Firecrawl scraping error:', error);
    return [];
  }
}

async function fetchReedApiCourses(keywords: string, location: string): Promise<any[]> {
  console.log('Fetching from Reed API with enhanced filtering');
  
  try {
    const apiUrl = new URL("https://www.reed.co.uk/api/1.0/search");
    apiUrl.searchParams.append("keywords", `${keywords} course training qualification`);
    apiUrl.searchParams.append("locationName", location);
    apiUrl.searchParams.append("resultsToTake", "100");

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(reedApiKey + ':')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Reed API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Enhanced filtering for course-related listings
    const courses = data.results
      .filter((item: any) => {
        const title = item.jobTitle.toLowerCase();
        const employer = item.employerName.toLowerCase();
        const description = (item.jobDescription || '').toLowerCase();
        
        // Course indicators
        const courseKeywords = ['course', 'training', 'qualification', 'diploma', 'certificate', 'nvq', 'apprenticeship'];
        const hasKeyword = courseKeywords.some(keyword => 
          title.includes(keyword) || employer.includes(keyword) || description.includes(keyword)
        );
        
        // Educational provider indicators
        const educationProviders = ['college', 'academy', 'training', 'centre', 'university', 'institute', 'school'];
        const isEducationProvider = educationProviders.some(provider => employer.includes(provider));
        
        return hasKeyword || isEducationProvider;
      })
      .map((item: any, index: number) => ({
        id: `reed-api-${item.jobId}`,
        title: item.jobTitle,
        provider: item.employerName,
        description: item.jobDescription?.substring(0, 300) + '...' || 'Course details available',
        duration: 'Contact provider',
        level: 'Various levels',
        price: 'Contact for pricing',
        format: 'Contact provider',
        nextDates: ['Contact provider'],
        rating: 4.0,
        locations: [item.locationName],
        category: 'Professional Development',
        industryDemand: 'High' as const,
        futureProofing: 4,
        salaryImpact: 'Contact provider',
        careerOutcomes: ['Professional development', 'Industry certification'],
        accreditation: ['Industry recognised'],
        employerSupport: true,
        prerequisites: ['Contact provider'],
        courseOutline: ['Contact provider for details'],
        assessmentMethod: 'Contact provider',
        continuousAssessment: false,
        external_url: item.jobUrl,
        source: 'Reed API',
        isLive: true,
        relevanceScore: calculateRelevanceScore(item.jobTitle || '', keywords)
      }));

    return courses;

  } catch (error) {
    console.error('Reed API error:', error);
    return [];
  }
}

function calculateRelevanceScore(title: string, keywords: string): number {
  const titleLower = title.toLowerCase();
  const keywordsLower = keywords.toLowerCase();
  let score = 0;
  
  // Direct keyword match
  if (titleLower.includes(keywordsLower)) score += 5;
  
  // Electrical-specific terms
  const electricalTerms = ['electrical', 'electrician', 'wiring', 'installation', 'city & guilds', 'nvq', '18th edition', 'bs7671'];
  electricalTerms.forEach(term => {
    if (titleLower.includes(term)) score += 3;
  });
  
  // Course indicators
  const courseTerms = ['course', 'training', 'qualification', 'certificate', 'diploma'];
  courseTerms.forEach(term => {
    if (titleLower.includes(term)) score += 2;
  });
  
  return score;
}

function removeDuplicatesAndScore(courses: any[], keywords: string): any[] {
  const seen = new Map();
  
  courses.forEach(course => {
    const key = `${course.title?.toLowerCase().trim()}-${course.provider?.toLowerCase().trim()}`;
    
    if (!seen.has(key)) {
      seen.set(key, course);
    } else {
      // Keep the one with higher relevance score or from better source
      const existing = seen.get(key);
      if (course.source === 'Reed Courses' && existing.source !== 'Reed Courses') {
        seen.set(key, course);
      } else if (course.relevanceScore > existing.relevanceScore) {
        seen.set(key, course);
      }
    }
  });
  
  return Array.from(seen.values());
}
