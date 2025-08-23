import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrical course", location = "United Kingdom" } = await req.json();
    
    console.log(`Starting live course aggregation for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get Firecrawl API key
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }
    
    console.log('Fetching courses from Reed using Firecrawl v2 API...');
    
    const sourceResults = [];
    let uniqueCourses = [];
    
    try {
      // Firecrawl v2 API call to scrape Reed courses
      const firecrawlResponse = await fetch('https://api.firecrawl.dev/v2/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: "www.reed.co.uk/courses/?keywords=Electrical%20Career%20Courses%20%26%20Training",
          onlyMainContent: true,
          maxAge: 172800000,
          parsers: ["pdf"],
          formats: [{
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
          }]
        })
      });

      if (!firecrawlResponse.ok) {
        throw new Error(`Firecrawl API error: ${firecrawlResponse.status} ${firecrawlResponse.statusText}`);
      }

      const firecrawlData = await firecrawlResponse.json();
      console.log('Firecrawl response received:', JSON.stringify(firecrawlData, null, 2));

      // Extract courses from Firecrawl response
      if (firecrawlData.success && firecrawlData.data && firecrawlData.data.json) {
        const extractedData = firecrawlData.data.json;
        
        // Handle both single course object and array of courses
        const coursesArray = Array.isArray(extractedData) ? extractedData : [extractedData];
        
        uniqueCourses = coursesArray.map((course: any) => ({
          id: `reed-${course.courseTitle?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}`,
          title: course.courseTitle || 'Untitled Course',
          provider: course.provider || 'Reed',
          description: course.description || '',
          duration: course.duration || 'Not specified',
          level: course.level || 'Not specified',
          category: course.category || 'Electrical',
          rating: course.rating || 0,
          learningMode: course.learningMode || 'Not specified',
          futureScope: course.futureScope || '',
          industryDemand: course.industryDemand || 'Unknown',
          salaryImpact: course.salaryImpact || {},
          careerOutcomes: course.careerOutcomes || [],
          locations: course.locations || [],
          accreditations: course.accreditations || [],
          upcomingDates: course.upcomingDates || [],
          priceRange: course.priceRange || 'Contact for pricing',
          employerSupport: course.employerSupport || false,
          detailsUrl: course.detailsUrl || '',
          source: 'Reed',
          isLive: true,
          lastUpdated: new Date().toISOString()
        }));

        sourceResults.push({
          source: 'Reed (Firecrawl)',
          courseCount: uniqueCourses.length,
          success: true,
          error: null,
          lastUpdated: new Date().toISOString()
        });

        console.log(`✅ Reed: ${uniqueCourses.length} courses extracted`);
      } else {
        throw new Error('No course data found in Firecrawl response');
      }

    } catch (error) {
      console.error('Error fetching from Firecrawl:', error);
      sourceResults.push({
        source: 'Reed (Firecrawl)',
        courseCount: 0,
        success: false,
        error: error.message,
        lastUpdated: new Date().toISOString()
      });
    }

    const summary = {
      totalCourses: uniqueCourses.length,
      originalCourses: uniqueCourses.length,
      duplicatesRemoved: 0,
      sourceBreakdown: sourceResults,
      searchCriteria: { keywords, location },
      liveCourses: uniqueCourses.filter(c => c.isLive).length,
      lastUpdated: new Date().toISOString()
    };

    console.log(`📊 Aggregation complete: ${uniqueCourses.length} unique courses from ${sourceResults.filter(s => s.success).length} sources`);

    return new Response(JSON.stringify({
      courses: uniqueCourses,
      total: uniqueCourses.length,
      summary,
      sourceResults,
      isLiveData: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in live course aggregator:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      courses: [],
      total: 0,
      summary: null,
      sourceResults: [],
      isLiveData: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
