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

    // Define course websites to scrape
    const courseWebsites = {
      findcourses: `https://www.findcourses.co.uk/search?q=${encodeURIComponent(keywords)}`,
      cityandguilds: 'https://www.cityandguilds.com/qualifications/construction-and-the-built-environment/electrical-installation',
      niceic: 'https://www.niceic.com/find-an-installer/electrical-training-courses',
      stanmore: 'https://certificates.stanmoreuk.org/Home/Courses/6026646/Electrical-Career-Courses-%26-Training'
    };

    const targetUrl = courseWebsites[source as keyof typeof courseWebsites] || courseWebsites.findcourses;
    
    console.log('Scraping course data from:', targetUrl);

    // Use Firecrawl v2 API to scrape the website
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        onlyMainContent: true,
        maxAge: 172800000,
        parsers: ["pdf"],
        formats: [
          {
            type: "json",
            schema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "The main category or tag of the course (e.g., Emerging Technologies)"
                },
                rating: {
                  type: "number",
                  description: "Star rating of the course"
                },
                courseTitle: {
                  type: "string",
                  description: "Title of the course"
                },
                provider: {
                  type: "string",
                  description: "Training provider name"
                },
                description: {
                  type: "string",
                  description: "Short description of the course"
                },
                duration: {
                  type: "string",
                  description: "Course duration (e.g., 2 days)"
                },
                level: {
                  type: "string",
                  description: "Course difficulty level (e.g., Intermediate)"
                },
                learningMode: {
                  type: "string",
                  description: "Learning mode (e.g., Blended learning with hands-on practical sessions)"
                },
                futureScope: {
                  type: "string",
                  description: "Future career outlook or rating (e.g., Future: 5/5)"
                },
                industryDemand: {
                  type: "string",
                  description: "Industry demand level (e.g., High)"
                },
                salaryImpact: {
                  type: "object",
                  properties: {
                    min: {
                      type: "number",
                      description: "Minimum salary impact"
                    },
                    max: {
                      type: "number",
                      description: "Maximum salary impact"
                    },
                    unit: {
                      type: "string",
                      description: "Unit (e.g., annual increase)"
                    }
                  }
                },
                careerOutcomes: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "List of career outcomes"
                },
                locations: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "Available course locations"
                },
                accreditations: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "List of accreditations"
                },
                upcomingDates: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "date"
                  },
                  description: "Upcoming course start dates"
                },
                priceRange: {
                  type: "string",
                  description: "Price range of the course (e.g., £425 - £525)"
                },
                employerSupport: {
                  type: "boolean",
                  description: "Whether employer support is available"
                },
                detailsUrl: {
                  type: "string",
                  description: "Direct link to the course details page"
                }
              },
              required: [
                "category",
                "courseTitle",
                "provider",
                "description",
                "duration",
                "level",
                "learningMode",
                "industryDemand",
                "salaryImpact",
                "careerOutcomes",
                "locations",
                "accreditations",
                "upcomingDates",
                "priceRange",
                "detailsUrl"
              ]
            }
          }
        ]
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
    console.log('Firecrawl v2 extraction result:', firecrawlData);

    let extractedCourses: any[] = [];
    
    try {
      // Parse v2 API response format
      if (firecrawlData.success && firecrawlData.data?.extract) {
        const extractData = firecrawlData.data.extract;
        
        // Handle both single course and array of courses
        if (Array.isArray(extractData)) {
          extractedCourses = extractData;
        } else if (extractData.courseTitle || extractData.title) {
          extractedCourses = [extractData];
        }
        
        console.log(`✅ Extracted ${extractedCourses.length} courses from ${source} using v2 API`);
      }
      
      // If no courses found, try to extract from markdown content
      if (extractedCourses.length === 0 && firecrawlData.data?.markdown) {
        const markdown = firecrawlData.data.markdown;
        if (markdown.includes('course') || markdown.includes('training') || markdown.includes('electrical')) {
          console.log(`📝 Found content but no structured courses from ${source}, creating fallback course`);
          extractedCourses = [{
            courseTitle: `${keywords} Training`,
            provider: source.charAt(0).toUpperCase() + source.slice(1),
            description: 'Course information available - visit website for details',
            duration: 'Various durations',
            level: 'Various levels'
          }];
        }
      }
      
    } catch (parseError) {
      console.error('Error parsing v2 extracted course data:', parseError);
      extractedCourses = [];
    }

    // Transform extracted data with enhanced course scoring
    const courses = extractedCourses.map((course: any, index: number) => {
      // Calculate relevance score for better ranking
      const title = course.courseTitle || course.title || '';
      const titleRelevance = calculateRelevanceScore(title, keywords);
      const providerRelevance = calculateProviderRelevance(course.provider || '');
      const overallScore = titleRelevance + providerRelevance;
      
      return {
        id: `firecrawl-${source}-${index}`,
        title: title || `${keywords} Course`,
        provider: course.provider || source.charAt(0).toUpperCase() + source.slice(1),
        description: course.description || 'Course details available from provider',
        duration: course.duration || 'Contact provider',
        level: course.level || 'Various levels',
        price: course.priceRange || 'Contact for pricing',
        format: course.learningMode || 'Contact provider',
        nextDates: course.upcomingDates && course.upcomingDates.length > 0 ? course.upcomingDates : ['Contact provider'],
        rating: course.rating || (4.2 + (overallScore * 0.3)),
        locations: course.locations && course.locations.length > 0 ? course.locations : ['Various locations'],
        category: course.category || 'Professional Development',
        industryDemand: course.industryDemand || 'High' as const,
        futureProofing: parseFutureScope(course.futureScope) || calculateFutureProofing(title, course.description),
        salaryImpact: course.salaryImpact || 'Contact provider',
        careerOutcomes: course.careerOutcomes && course.careerOutcomes.length > 0 ? course.careerOutcomes : extractCareerOutcomes(course.description),
        accreditation: course.accreditations && course.accreditations.length > 0 ? course.accreditations : ['Industry recognised'],
        employerSupport: course.employerSupport !== undefined ? course.employerSupport : true,
        prerequisites: ['Contact provider'],
        courseOutline: ['Contact provider for details'],
        assessmentMethod: 'Contact provider',
        continuousAssessment: false,
        external_url: course.detailsUrl || course.url || targetUrl,
        source: source.charAt(0).toUpperCase() + source.slice(1),
        isLive: true,
        relevanceScore: overallScore,
        learningMode: course.learningMode || null,
        futureScope: course.futureScope || null
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
      error: error instanceof Error ? error.message : 'Unknown error occurred',
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

function parseFutureScope(futureScope: string = ''): number | null {
  if (!futureScope) return null;
  
  // Extract number from patterns like "Future: 5/5" or "5/5"
  const match = futureScope.match(/(\d+)\/(\d+)/);
  if (match) {
    const [, numerator, denominator] = match;
    return (parseInt(numerator) / parseInt(denominator)) * 5;
  }
  
  // Look for standalone numbers
  const numberMatch = futureScope.match(/\d+/);
  if (numberMatch) {
    return Math.min(5, parseInt(numberMatch[0]));
  }
  
  return null;
}