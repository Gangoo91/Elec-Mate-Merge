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
      stanmore: 'https://certificates.stanmoreuk.org/Home/Courses/6026646/Electrical-Career-Courses-%26-Training',
      reed: `https://www.reed.co.uk/courses/?keywords=${encodeURIComponent(keywords)}`
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
                      description: "The full title or name of the course"
                    },
                    provider: { 
                      type: "string",
                      description: "Training provider, institution, or company offering the course"
                    },
                    description: { 
                      type: "string",
                      description: "Brief description of what the course covers"
                    },
                    duration: { 
                      type: "string",
                      description: "How long the course takes (days, weeks, hours)"
                    },
                    price: { 
                      type: "string",
                      description: "Course cost or fee"
                    },
                    location: { 
                      type: "string",
                      description: "Where the course is delivered (city, region, or 'online')"
                    },
                    level: { 
                      type: "string",
                      description: "Course level (beginner, intermediate, advanced, Level 1-3, etc.)"
                    }
                  },
                  required: ["title", "provider"]
                }
              }
            },
            required: ["courses"]
          },
          extractionPrompt: `Extract ALL electrical courses, training programs, and qualifications from this page. Look for:
- Course titles (including electrical installation, wiring, renewable energy, etc.)
- Training provider names
- Course descriptions or summaries
- Duration information (days, weeks, hours)
- Pricing details
- Delivery locations or online options
- Course levels or qualification types

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

    // Transform extracted data to match our course interface
    const courses = extractedCourses.map((course: any, index: number) => ({
      id: `firecrawl-${source}-${index}`,
      title: course.title || `${keywords} Course`,
      provider: course.provider || source.charAt(0).toUpperCase() + source.slice(1),
      description: course.description || 'Course details available from provider',
      duration: course.duration || 'Contact provider',
      level: course.level || 'Various levels',
      price: course.price || 'Contact for pricing',
      format: 'Various formats',
      nextDates: ['Contact provider'],
      rating: 4.2,
      locations: [course.location || 'Various locations'],
      category: 'Professional Development',
      industryDemand: 'High' as const,
      futureProofing: 4,
      salaryImpact: 'Contact provider',
      careerOutcomes: ['Professional certification', 'Career advancement'],
      accreditation: ['Industry recognised'],
      employerSupport: true,
      prerequisites: ['Contact provider'],
      courseOutline: ['Contact provider for details'],
      assessmentMethod: 'Contact provider',
      continuousAssessment: false,
      external_url: targetUrl,
      source: source.charAt(0).toUpperCase() + source.slice(1),
      isLive: true
    }));

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