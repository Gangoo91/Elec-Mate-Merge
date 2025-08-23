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
      // Stage 1: Get basic course list from search results
      const searchResponse = await fetch('https://api.firecrawl.dev/v2/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: "www.reed.co.uk/courses/?keywords=Electrical%20Career%20Courses%20%26%20Training",
          onlyMainContent: true,
          maxAge: 172800000,
          formats: [{
            type: "json",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
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
                    description: "Learning mode (e.g., Online, In-person)"
                  },
                  priceRange: {
                    type: "string",
                    description: "Price range of the course (e.g., £425 - £525)"
                  },
                  detailsUrl: {
                    type: "string",
                    description: "Direct link to the course details page"
                  },
                  category: {
                    type: "string",
                    description: "The main category or tag of the course"
                  },
                  rating: {
                    type: "number",
                    description: "Star rating of the course"
                  }
                },
                required: [
                  "courseTitle",
                  "provider",
                  "detailsUrl"
                ]
              }
            }
          }]
        })
      });

      if (!searchResponse.ok) {
        throw new Error(`Firecrawl search API error: ${searchResponse.status} ${searchResponse.statusText}`);
      }

      const searchData = await searchResponse.json();
      console.log('Basic course search completed, found:', searchData.data?.json?.length || 0, 'courses');

      if (!searchData.success || !searchData.data?.json) {
        throw new Error('No course data found in search results');
      }

      const basicCourses = Array.isArray(searchData.data.json) ? searchData.data.json : [searchData.data.json];
      
      // Stage 2: Get detailed information for each course
      console.log('Starting detailed course scraping for', Math.min(basicCourses.length, 8), 'courses...');
      
      const detailedCourses = [];
      const maxCoursesToDetail = 8; // Limit to avoid timeout and API costs
      
      for (let i = 0; i < Math.min(basicCourses.length, maxCoursesToDetail); i++) {
        const course = basicCourses[i];
        
        if (!course.detailsUrl) {
          console.log(`⚠️ No details URL for course: ${course.courseTitle}`);
          detailedCourses.push(course);
          continue;
        }
        
        try {
          console.log(`Scraping details for course ${i + 1}: ${course.courseTitle}`);
          
          const detailResponse = await fetch('https://api.firecrawl.dev/v2/scrape', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${firecrawlApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: course.detailsUrl,
              onlyMainContent: true,
              maxAge: 172800000,
              formats: [{
                type: "json",
                schema: {
                  type: "object",
                  properties: {
                    prerequisites: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Course entry requirements, prerequisites, qualifications needed, or experience required"
                    },
                    courseOutline: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Course modules, units, topics, curriculum structure, syllabus, or learning outcomes"
                    },
                    assessmentMethod: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "How students are assessed - exams, coursework, assignments, practical assessments, quizzes"
                    },
                    continuousAssessment: {
                      type: "boolean",
                      description: "Whether the course uses ongoing assessment throughout or final assessment only"
                    },
                    accreditations: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Professional accreditations, certifications, qualifications awarded, or industry recognition"
                    },
                    careerOutcomes: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Career paths, job roles, employment opportunities, or career progression after completion"
                    },
                    upcomingDates: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Available course start dates, intake dates, scheduled sessions, next available dates, course timetable - look for dates in formats like 'January 15, 2024', '15/01/24', 'Next Monday', 'Weekly starts', etc."
                    },
                    nextStartDate: {
                      type: "string",
                      description: "Next available start date or intake date for this course"
                    },
                    locations: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Available course locations or delivery methods"
                    },
                    employerSupport: {
                      type: "boolean",
                      description: "Whether employer support or funding is available"
                    },
                    futureScope: {
                      type: "string",
                      description: "Future career outlook or industry growth prospects"
                    },
                    industryDemand: {
                      type: "string",
                      description: "Industry demand level for skills taught"
                    },
                    detailedDescription: {
                      type: "string",
                      description: "Complete detailed course description with all information"
                    }
                  }
                }
              }]
            })
          });

          let detailedInfo = {};
          
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            if (detailData.success && detailData.data?.json) {
              detailedInfo = detailData.data.json;
              console.log(`✅ Successfully extracted details for: ${course.courseTitle}`);
            } else {
              console.log(`⚠️ No detailed data extracted for: ${course.courseTitle}`);
            }
          } else {
            console.log(`❌ Failed to scrape details for: ${course.courseTitle} (${detailResponse.status})`);
          }

          // Merge basic and detailed information
          const enhancedCourse = {
            ...course,
            prerequisites: detailedInfo.prerequisites || [],
            courseOutline: detailedInfo.courseOutline || [],
            assessmentMethod: detailedInfo.assessmentMethod || [],
            continuousAssessment: detailedInfo.continuousAssessment || false,
            accreditations: detailedInfo.accreditations || [],
            careerOutcomes: detailedInfo.careerOutcomes || [],
            upcomingDates: detailedInfo.upcomingDates || [],
            locations: detailedInfo.locations || [],
            employerSupport: detailedInfo.employerSupport || false,
            futureScope: detailedInfo.futureScope || '',
            industryDemand: detailedInfo.industryDemand || 'Not specified',
            description: detailedInfo.detailedDescription || course.description || '',
            hasDetailedInfo: Object.keys(detailedInfo).length > 0
          };

          detailedCourses.push(enhancedCourse);
          
          // Small delay to be respectful to the API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`Error scraping details for ${course.courseTitle}:`, error);
          // Add course with basic info only if detail scraping fails
          detailedCourses.push({
            ...course,
            prerequisites: [],
            courseOutline: [],
            assessmentMethod: [],
            continuousAssessment: false,
            accreditations: [],
            careerOutcomes: [],
            upcomingDates: [],
            locations: [],
            employerSupport: false,
            futureScope: '',
            industryDemand: 'Not specified',
            hasDetailedInfo: false
          });
        }
      }

      // Add remaining courses without detailed scraping if we hit the limit
      for (let i = maxCoursesToDetail; i < basicCourses.length; i++) {
        const course = basicCourses[i];
        detailedCourses.push({
          ...course,
          prerequisites: [],
          courseOutline: [],
          assessmentMethod: [],
          continuousAssessment: false,
          accreditations: [],
          careerOutcomes: [],
          upcomingDates: [],
          locations: [],
          employerSupport: false,
          futureScope: '',
          industryDemand: 'Not specified',
          hasDetailedInfo: false
        });
      }

      // Helper function to extract future proofing rating from futureScope string
      const extractFutureProofing = (futureScope: string): number => {
        if (!futureScope) return 3; // Default to 3/5 if not specified
        const match = futureScope.match(/(\d+)\/5/);
        return match ? parseInt(match[1]) : 3;
      };

      // Map to final format
      uniqueCourses = detailedCourses.map((course: any) => ({
        id: `reed-${course.courseTitle?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}`,
        title: course.courseTitle || 'Untitled Course',
        provider: course.provider || 'Reed',
        description: course.description || 'Course description not available',
        duration: course.duration || 'Duration not specified',
        level: course.level || 'Level not specified',
        category: course.category || 'Electrical',
        rating: course.rating || 0,
        format: course.learningMode || 'Format not specified',
        futureProofing: extractFutureProofing(course.futureScope),
        industryDemand: course.industryDemand || 'Not specified',
        salaryImpact: 'Contact provider for details', // Not extracting from detail pages
        careerOutcomes: course.careerOutcomes?.length > 0 ? course.careerOutcomes : ['Contact provider for details'],
        locations: course.locations?.length > 0 ? course.locations : ['Contact provider for details'],
        accreditation: course.accreditations?.length > 0 ? course.accreditations : ['Not specified by provider'],
        nextDates: course.upcomingDates?.length > 0 ? course.upcomingDates : ['Contact provider for dates'],
        price: course.priceRange || 'Contact for pricing',
        employerSupport: course.employerSupport || false,
        detailsUrl: course.detailsUrl || '',
        // Enhanced fields from detailed scraping
        prerequisites: course.prerequisites?.length > 0 ? course.prerequisites : ['Not specified by provider'],
        courseOutline: course.courseOutline?.length > 0 ? course.courseOutline : ['Contact provider for details'],
        assessmentMethod: course.assessmentMethod?.length > 0 ? course.assessmentMethod : ['Contact provider for details'],
        continuousAssessment: course.continuousAssessment || false,
        source: 'Reed',
        isLive: true,
        hasDetailedInfo: course.hasDetailedInfo || false,
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
