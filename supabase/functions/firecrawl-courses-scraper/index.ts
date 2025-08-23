import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrical course", source = "findcourses" } = await req.json();
    
    console.log(`Starting Firecrawl course scraping for: ${keywords} from ${source}`);
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check cache first
    const cacheKey = `${keywords}-${source}`;
    const { data: cachedData } = await supabase
      .from('live_course_cache')
      .select('course_data')
      .eq('source', 'firecrawl')
      .eq('search_query', cacheKey)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedData) {
      console.log('Returning cached Firecrawl course data');
      return new Response(JSON.stringify(cachedData.course_data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!firecrawlApiKey) {
      console.error('Firecrawl API key not configured');
      return new Response(JSON.stringify({
        error: "Firecrawl API key not configured",
        courses: [],
        total: 0,
        source: 'firecrawl'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Define course websites to scrape with Reed-specific optimizations
    const courseWebsites = {
      findcourses: `https://www.findcourses.co.uk/search?q=${encodeURIComponent(keywords)}`,
      cityandguilds: 'https://www.cityandguilds.com/qualifications/construction-and-the-built-environment/electrical-installation',
      niceic: 'https://www.niceic.com/find-an-installer/electrical-training-courses',
      stanmore: 'https://certificates.stanmoreuk.org/Home/Courses/6026646/Electrical-Career-Courses-%26-Training',
      reed: keywords.toLowerCase().includes('electrical') || keywords.toLowerCase().includes('electrician') 
        ? 'https://www.reed.co.uk/courses/electrician'
        : `https://www.reed.co.uk/courses/${encodeURIComponent(keywords.replace(/\s+/g, '-').toLowerCase())}`
    };

    const targetUrl = courseWebsites[source as keyof typeof courseWebsites] || courseWebsites.findcourses;
    
    console.log('Scraping course data from:', targetUrl);

    // Use Firecrawl to scrape the website
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
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
                    title: { 
                      type: "string",
                      description: "The complete course title or qualification name"
                    },
                    provider: { 
                      type: "string",
                      description: "Training provider, college, or institution name"
                    },
                    description: { 
                      type: "string",
                      description: "Course overview, content, or learning outcomes"
                    },
                    duration: { 
                      type: "string",
                      description: "Course length (e.g., '5 days', '12 weeks', '40 hours')"
                    },
                    price: { 
                      type: "string",
                      description: "Course fee or cost (including currency if shown)"
                    },
                    location: { 
                      type: "string",
                      description: "Delivery location, city, or 'Online'"
                    },
                    level: { 
                      type: "string",
                      description: "Qualification level (e.g., 'Level 2', 'Beginner', 'Advanced')"
                    },
                    startDate: {
                      type: "string",
                      description: "Next start date or availability"
                    },
                    accreditation: {
                      type: "string",
                      description: "Awarding body or certification type"
                    }
                  },
                  required: ["title", "provider"]
                }
              }
            },
            required: ["courses"]
          },
          extractionPrompt: source === 'reed' 
            ? `Extract ALL electrical and engineering courses from this Reed.co.uk page. Focus on:
- Complete course titles including qualifications (Level 1, 2, 3, NVQ, City & Guilds numbers)
- Training provider names (colleges, academies, training centres)
- Course descriptions and what's covered
- Duration (days, weeks, hours, or months)
- Pricing in GBP (look for £ symbols and "from £" patterns)
- Delivery locations or online options
- Course levels and progression paths
- Start dates and availability
- Awarding bodies (City & Guilds, EAL, NICEIC, etc.)

Pay special attention to Reed's course listing format and extract comprehensive information.`
            : `Extract ALL electrical courses, training programs, and qualifications from this page. Look for:
- Course titles (including electrical installation, wiring, renewable energy, etc.)
- Training provider names
- Course descriptions or summaries
- Duration information (days, weeks, hours)
- Pricing details
- Delivery locations or online options
- Course levels or qualification types
- Start dates and availability
- Accreditation details

Return a comprehensive list of all courses found, even if some information is missing.`
        }
      }),
    });

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      console.error('Firecrawl API Error:', firecrawlResponse.status, errorText);
      return new Response(JSON.stringify({
        error: `Firecrawl API error: ${firecrawlResponse.statusText}`,
        courses: [],
        total: 0,
        source: 'firecrawl'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const firecrawlData = await firecrawlResponse.json();
    console.log('Firecrawl extraction result:', firecrawlData);

    let extractedCourses: any[] = [];
    
    try {
      // Try to parse the extracted data
      if (firecrawlData.llm_extraction) {
        const extracted = typeof firecrawlData.llm_extraction === 'string' 
          ? JSON.parse(firecrawlData.llm_extraction)
          : firecrawlData.llm_extraction;
        
        extractedCourses = extracted.courses || [];
        console.log(`✅ Extracted ${extractedCourses.length} courses from ${source}`);
      } else if (firecrawlData.data && firecrawlData.data.llm_extraction) {
        // Try alternative extraction path
        const extracted = typeof firecrawlData.data.llm_extraction === 'string' 
          ? JSON.parse(firecrawlData.data.llm_extraction)
          : firecrawlData.data.llm_extraction;
        
        extractedCourses = extracted.courses || [];
        console.log(`✅ Extracted ${extractedCourses.length} courses from ${source} (alt path)`);
      }
      
      // If no courses found, try to extract basic info from content
      if (extractedCourses.length === 0 && firecrawlData.data?.content) {
        const content = firecrawlData.data.content;
        if (content.includes('course') || content.includes('training') || content.includes('electrical')) {
          console.log(`📝 Found content but no structured courses from ${source}, creating fallback course`);
          extractedCourses = [{
            title: `${keywords} Training`,
            provider: source.charAt(0).toUpperCase() + source.slice(1),
            description: 'Course information available - visit website for details',
            duration: 'Various durations',
            price: 'Contact for pricing',
            location: 'Multiple locations',
            level: 'Various levels'
          }];
        }
      }
      
    } catch (parseError) {
      console.error('Error parsing extracted course data:', parseError);
      extractedCourses = [];
    }

    // Transform extracted data with enhanced course scoring
    const courses = extractedCourses.map((course: any, index: number) => {
      // Calculate relevance score for better ranking
      const titleRelevance = calculateRelevanceScore(course.title || '', keywords);
      const providerRelevance = calculateProviderRelevance(course.provider || '');
      const overallScore = titleRelevance + providerRelevance;
      
      return {
        id: `firecrawl-${source}-${index}`,
        title: course.title || `${keywords} Course`,
        provider: course.provider || source.charAt(0).toUpperCase() + source.slice(1),
        description: course.description || 'Course details available from provider',
        duration: course.duration || 'Contact provider',
        level: course.level || 'Various levels',
        price: course.price || 'Contact for pricing',
        format: detectCourseFormat(course.description, course.location),
        nextDates: course.startDate ? [course.startDate] : ['Contact provider'],
        rating: 4.2 + (overallScore * 0.3), // Boost rating based on relevance
        locations: [course.location || 'Various locations'],
        category: 'Professional Development',
        industryDemand: 'High' as const,
        futureProofing: calculateFutureProofing(course.title, course.description),
        salaryImpact: 'Contact provider',
        careerOutcomes: extractCareerOutcomes(course.description),
        accreditation: course.accreditation ? [course.accreditation] : ['Industry recognised'],
        employerSupport: true,
        prerequisites: ['Contact provider'],
        courseOutline: ['Contact provider for details'],
        assessmentMethod: 'Contact provider',
        continuousAssessment: false,
        external_url: targetUrl,
        source: source.charAt(0).toUpperCase() + source.slice(1),
        isLive: true,
        relevanceScore: overallScore
      };
    });

    const result = {
      courses,
      total: courses.length,
      source: 'firecrawl',
      searchCriteria: { keywords, source },
      lastUpdated: new Date().toISOString()
    };

    // Cache the results
    await supabase
      .from('live_course_cache')
      .insert({
        source: 'firecrawl',
        search_query: cacheKey,
        course_data: result
      });

    console.log(`✅ Returning ${courses.length} courses from Firecrawl (${source})`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in firecrawl-courses-scraper:', error);
    return new Response(JSON.stringify({
      error: error.message,
      courses: [],
      total: 0,
      source: 'firecrawl'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Enhanced utility functions for better course analysis
function calculateRelevanceScore(title: string, keywords: string): number {
  const titleLower = title.toLowerCase();
  const keywordsLower = keywords.toLowerCase();
  let score = 0;
  
  // Direct keyword match
  if (titleLower.includes(keywordsLower)) score += 3;
  
  // Electrical-specific terms
  const electricalTerms = ['electrical', 'electrician', 'wiring', 'installation', 'city & guilds', 'nvq', '18th edition', 'bs7671'];
  electricalTerms.forEach(term => {
    if (titleLower.includes(term)) score += 2;
  });
  
  // Level indicators
  const levelTerms = ['level 2', 'level 3', 'level 1', 'advanced', 'beginner'];
  levelTerms.forEach(term => {
    if (titleLower.includes(term)) score += 1;
  });
  
  return score;
}

function calculateProviderRelevance(provider: string): number {
  const providerLower = provider.toLowerCase();
  let score = 0;
  
  // Reputable training providers
  const goodProviders = ['college', 'academy', 'training', 'centre', 'university', 'institute'];
  goodProviders.forEach(term => {
    if (providerLower.includes(term)) score += 1;
  });
  
  return score;
}

function detectCourseFormat(description: string = '', location: string = ''): string {
  const descLower = description.toLowerCase();
  const locLower = location.toLowerCase();
  
  if (locLower.includes('online') || descLower.includes('online')) return 'Online';
  if (descLower.includes('classroom') || descLower.includes('face-to-face')) return 'Classroom';
  if (descLower.includes('blended') || descLower.includes('hybrid')) return 'Blended';
  return 'Various formats';
}

function calculateFutureProofing(title: string = '', description: string = ''): number {
  const content = `${title} ${description}`.toLowerCase();
  let score = 3; // Base score
  
  // Future-focused terms
  const modernTerms = ['smart', 'renewable', 'solar', 'ev', 'electric vehicle', 'automation', 'digital'];
  modernTerms.forEach(term => {
    if (content.includes(term)) score += 0.5;
  });
  
  // Recent standards
  if (content.includes('18th edition') || content.includes('bs7671')) score += 1;
  
  return Math.min(5, score); // Cap at 5
}

function extractCareerOutcomes(description: string = ''): string[] {
  const outcomes = ['Professional certification'];
  const descLower = description.toLowerCase();
  
  if (descLower.includes('employment') || descLower.includes('job')) {
    outcomes.push('Employment opportunities');
  }
  if (descLower.includes('career') || descLower.includes('progression')) {
    outcomes.push('Career advancement');
  }
  if (descLower.includes('qualification') || descLower.includes('certified')) {
    outcomes.push('Industry certification');
  }
  
  return outcomes;
}