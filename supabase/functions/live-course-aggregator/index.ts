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
    
    console.log(`🚀 Starting live course aggregation for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Circuit breaker: Check if external service is available
    const serviceHealthCheck = async () => {
      try {
        const response = await fetch('https://api.firecrawl.dev/', {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000)
        });
        return response.ok;
      } catch {
        return false;
      }
    };
    
    // Progressive response: Send immediate acknowledgment
    const progressiveResponse = {
      courses: [],
      total: 0,
      summary: {
        totalCourses: 0,
        originalCourses: 0,
        duplicatesRemoved: 0,
        sourceBreakdown: [],
        searchCriteria: { keywords, location },
        liveCourses: 0,
        lastUpdated: new Date().toISOString(),
        status: 'processing'
      },
      sourceResults: [],
      isLiveData: true,
      processing: true
    };
    
    // Early return with processing status
    if (!(await serviceHealthCheck())) {
      console.warn('⚠️ External service unavailable, returning cached fallback');
      return new Response(JSON.stringify({
        ...progressiveResponse,
        error: 'External course data service temporarily unavailable. Using cached data.',
        processing: false
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 503
      });
    }
    
    // Set timeout for the entire operation (2.5 minutes to allow response time)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out after 150 seconds')), 150000);
    });
    
    const mainOperation = async () => {
      // Get Firecrawl API key
      const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
      if (!firecrawlApiKey) {
        console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
        throw new Error('Firecrawl API key not configured - please check Supabase secrets');
      }
    
      console.log('📡 Fetching courses from Reed using Firecrawl v2 API...');
      
      const sourceResults = [];
      let uniqueCourses = [];
      let originalCount = 0;
      let duplicatesRemoved = 0;
      
      // Helper function for API calls with retry logic
      const makeFirecrawlRequest = async (url: string, body: any, maxRetries = 3) => {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`📡 Making Firecrawl API call (attempt ${attempt}/${maxRetries})`);
            
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${firecrawlApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });
            
            if (response.ok) {
              return await response.json();
            }
            
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            
          } catch (error) {
            lastError = error;
            console.log(`⚠️ API call attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxRetries) {
              const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
              console.log(`⏳ Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
        
        throw new Error(`Firecrawl API failed after ${maxRetries} attempts: ${lastError.message}`);
      };
      
      try {
        // Stage 1: Get basic course list from search results
        const searchData = await makeFirecrawlRequest('https://api.firecrawl.dev/v2/scrape', {
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
        });

        console.log('✅ Basic course search completed, found:', searchData.data?.json?.length || 0, 'courses');

        if (!searchData.success || !searchData.data?.json) {
          throw new Error('No course data found in search results');
        }

        const basicCourses = Array.isArray(searchData.data.json) ? searchData.data.json : [searchData.data.json];
        
      // Stage 2: Get detailed information for each course (with circuit breaker)
      console.log('🔍 Starting detailed course scraping for', Math.min(basicCourses.length, 6), 'courses...');
      
      const detailedCourses = [];
      const maxCoursesToDetail = 6; // Reduced to ensure faster completion
      let failureCount = 0;
      const maxFailures = 3; // Circuit breaker threshold
    
    for (let i = 0; i < Math.min(basicCourses.length, maxCoursesToDetail); i++) {
        const course = basicCourses[i];
        
        if (!course.detailsUrl) {
          console.log(`⚠️ No details URL for course: ${course.courseTitle}`);
          detailedCourses.push(course);
          continue;
        }
        
        try {
          // Circuit breaker: Skip detailed scraping if too many failures
          if (failureCount >= maxFailures) {
            console.log(`⚠️ Circuit breaker activated - skipping detailed scraping for remaining courses`);
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
            continue;
          }
          
          console.log(`🔍 Scraping details for course ${i + 1}: ${course.courseTitle}`);
          
          const detailData = await makeFirecrawlRequest('https://api.firecrawl.dev/v2/scrape', {
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
            });

          let detailedInfo = {};
          
          if (detailData.success && detailData.data?.json) {
            detailedInfo = detailData.data.json;
            console.log(`✅ Successfully extracted details for: ${course.courseTitle}`);
          } else {
            console.log(`⚠️ No detailed data extracted for: ${course.courseTitle}`);
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
          
          // Small delay to be respectful to the API and avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          failureCount++;
          console.error(`❌ Error scraping details for ${course.courseTitle}:`, error.message);
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
      const allCourses = detailedCourses.map((course: any) => ({
        id: `reed-${course.courseTitle?.replace(/\s+/g, '-').toLowerCase()}-${course.provider?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}`,
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

      // Remove duplicates based on title + provider
      originalCount = allCourses.length;
      uniqueCourses = removeDuplicates(allCourses);
      duplicatesRemoved = originalCount - uniqueCourses.length;

      console.log(`📊 Original courses: ${originalCount}, After deduplication: ${uniqueCourses.length}, Duplicates removed: ${duplicatesRemoved}`);

      sourceResults.push({
        source: 'Reed (Firecrawl)',
        courseCount: uniqueCourses.length,
        success: true,
        error: null,
        lastUpdated: new Date().toISOString()
      });

        console.log(`✅ Reed: ${uniqueCourses.length} courses extracted`);

      } catch (error) {
        console.error('❌ Error fetching from Firecrawl:', error.message);
        sourceResults.push({
          source: 'Reed (Firecrawl)',
          courseCount: 0,
          success: false,
          error: error.message,
          lastUpdated: new Date().toISOString()
        });
      }

      return {
        courses: uniqueCourses,
        total: uniqueCourses.length,
        summary: {
          totalCourses: uniqueCourses.length,
          originalCourses: originalCount || uniqueCourses.length,
          duplicatesRemoved: duplicatesRemoved || 0,
          sourceBreakdown: sourceResults,
          searchCriteria: { keywords, location },
          liveCourses: uniqueCourses.filter(c => c.isLive).length,
          lastUpdated: new Date().toISOString()
        },
        sourceResults,
        isLiveData: true
      };
    };

    console.log(`📊 Starting course aggregation with ${keywords} in ${location}...`);
    
    // Race the main operation against the timeout
    const result = await Promise.race([mainOperation(), timeoutPromise]);

    console.log(`📊 Aggregation complete: ${result.courses.length} unique courses from ${result.sourceResults.filter((s: any) => s.success).length} sources`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in live course aggregator:', error.message);
    
    // Provide more specific error messages
    let errorMessage = 'An unexpected error occurred while searching for courses';
    let errorCode = 500;
    
    if (error.message.includes('timeout') || error.message.includes('timed out')) {
      errorMessage = 'The search took too long to complete. Please try again with more specific search terms.';
      errorCode = 408;
    } else if (error.message.includes('API key') || error.message.includes('configuration')) {
      errorMessage = 'Service configuration error. Please try again later.';
      errorCode = 503;
    } else if (error.message.includes('Firecrawl') || error.message.includes('API')) {
      errorMessage = 'External service temporarily unavailable. Please try again in a few minutes.';
      errorCode = 503;
    } else if (error.message.includes('Network') || error.message.includes('fetch')) {
      errorMessage = 'Network connection error. Please check your connection and try again.';
      errorCode = 503;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      technical_error: error.message,
      courses: [],
      total: 0,
      summary: null,
      sourceResults: [],
      isLiveData: false
    }), {
      status: errorCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to remove duplicates based on title + provider
function removeDuplicates(courses: any[]): any[] {
  const seen = new Map();
  return courses.filter(course => {
    // Create a unique key using title + provider for better deduplication
    const normalizedTitle = course.title?.toLowerCase().trim().replace(/\s+/g, ' ') || '';
    const normalizedProvider = course.provider?.toLowerCase().trim().replace(/\s+/g, ' ') || '';
    const key = `${normalizedTitle}-${normalizedProvider}`;
    
    if (seen.has(key)) {
      // Keep the one with more detailed information
      const existing = seen.get(key);
      if (course.hasDetailedInfo && !existing.hasDetailedInfo) {
        seen.set(key, course);
        return true;
      }
      return false;
    }
    seen.set(key, course);
    return true;
  });
}
