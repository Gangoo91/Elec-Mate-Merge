import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REED_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrical course", location = "United Kingdom" } = await req.json();
    
    console.log(`Starting Reed course search for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check cache first
    const cacheKey = `${keywords}-${location}`;
    const { data: cachedData } = await supabase
      .from('live_course_cache')
      .select('course_data')
      .eq('source', 'reed')
      .eq('search_query', cacheKey)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedData) {
      console.log('Returning cached Reed course data');
      return new Response(JSON.stringify(cachedData.course_data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!reedApiKey) {
      console.error('Reed API key not configured');
      return new Response(JSON.stringify({ 
        error: "Reed API key not configured",
        courses: [],
        total: 0,
        source: 'reed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Search Reed course API
    const apiUrl = new URL("https://www.reed.co.uk/api/1.0/search");
    apiUrl.searchParams.append("keywords", `${keywords} course training`);
    apiUrl.searchParams.append("locationName", location);
    apiUrl.searchParams.append("resultsToTake", "50");

    console.log('Fetching courses from Reed API:', apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(reedApiKey + ':')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reed API Error:', response.status, errorText);
      return new Response(JSON.stringify({
        error: `Reed API error: ${response.statusText}`,
        courses: [],
        total: 0,
        source: 'reed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log(`Retrieved ${data.totalResults} courses from Reed API`);

    // Transform Reed job listings that are actually courses
    const courses = data.results
      .filter((item: any) => 
        item.jobTitle.toLowerCase().includes('course') ||
        item.jobTitle.toLowerCase().includes('training') ||
        item.jobTitle.toLowerCase().includes('qualification') ||
        item.employerName.toLowerCase().includes('college') ||
        item.employerName.toLowerCase().includes('training') ||
        item.employerName.toLowerCase().includes('academy')
      )
      .map((item: any) => ({
        id: `reed-${item.jobId}`,
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
        source: 'Reed',
        isLive: true
      }));

    const result = {
      courses,
      total: courses.length,
      source: 'reed',
      searchCriteria: { keywords, location },
      lastUpdated: new Date().toISOString()
    };

    // Cache the results
    await supabase
      .from('live_course_cache')
      .insert({
        source: 'reed',
        search_query: cacheKey,
        course_data: result
      });

    console.log(`✅ Returning ${courses.length} courses from Reed`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in reed-courses-search:', error);
    return new Response(JSON.stringify({
      error: error.message,
      courses: [],
      total: 0,
      source: 'reed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});