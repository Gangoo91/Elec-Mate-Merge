import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting live courses scraper...');

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }

    // Check if we have recent data (within 6 hours)
    const { data: existingCache } = await supabase
      .from('live_course_cache')
      .select('*')
      .eq('source', 'firecrawl-batch')
      .gt('created_at', new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (existingCache && existingCache.length > 0) {
      console.log('Returning cached data');
      return new Response(JSON.stringify({
        success: true,
        cached: true,
        data: existingCache[0].course_data,
        lastUpdated: existingCache[0].created_at
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching fresh data from Firecrawl...');

    // Start batch scraping
    const batchUrl = "https://api.firecrawl.dev/v2/batch/scrape";
    const batchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: [
          "https://www.tradeskills4u.co.uk/electrical-courses",
          "https://www.serc.ac.uk/course/Electrical-Upskilling/165",
          "https://www.mcptechnicaltraining.com/electrical-skills-training",
          "https://www.harringtonsafety.co.uk/ipaf-operator-training-courses",
          "https://eruditetrainingltd.co.uk/electrical-courses/",
          "https://www.southessex.ac.uk/search",
          "https://www.cpengineering.co.uk/service/compex-electrical-industrial-training"
        ],
        onlyMainContent: false,
        maxAge: 0,
        parsers: [],
        formats: [
          {
            type: "json",
            prompt:
              "List practical upskilling courses and certifications for electricians, including safety, technical, and specialized areas (e.g., MEWP, First Aid, Electrical Safety, EV Charging, Fire Alarms, PAT Testing, Renewable Energy, BMS, CompEx, ECS Test). Provide course name and brief focus area.",
            schema: {
              type: "array",
              items: {
                type: "object",
                required: ["title", "description", "location", "price", "visit_link"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  provider: { type: "string" },
                  mode: { type: "string", description: "Full-time, Part-time, Online, Classroom etc." },
                  rating: { type: "string" },
                  location: { type: "string" },
                  price: { type: "string" },
                  tags: { type: "string" },
                  image_url: { type: "string" },
                  visit_link: { type: "string", description: "link of the course" },
                },
              },
            },
          },
        ],
      }),
    };

    const batchResponse = await fetch(batchUrl, batchOptions);
    const job = await batchResponse.json();
    console.log("Batch job created:", job);

    if (!job.url) {
      throw new Error('Failed to create batch job');
    }

    // Poll for completion
    let status;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    do {
      await new Promise((r) => setTimeout(r, 5000));
      const res = await fetch(job.url, {
        headers: { Authorization: `Bearer ${FIRECRAWL_API_KEY}` },
      });

      status = await res.json();
      console.log("Polling attempt", attempts + 1, "Status:", status.status);
      attempts++;
    } while (status.status !== "completed" && status.status !== "failed" && attempts < maxAttempts);

    if (status.status === "failed" || attempts >= maxAttempts) {
      throw new Error(`Batch job failed or timed out: ${status.status}`);
    }

    // Transform data to match our schema
    const rawData = status.data?.map((article: any) => article.json).flat() || [];
    console.log(`Scraped ${rawData.length} courses`);

    const transformedCourses = rawData.map((course: any, index: number) => ({
      id: `live-${index + 1}`,
      title: course.title || 'Unknown Course',
      provider: course.provider || 'Unknown Provider',
      description: course.description || '',
      duration: course.mode || 'Contact provider',
      level: 'Professional',
      price: course.price || 'Contact for pricing',
      format: course.mode || 'Mixed',
      nextDates: ['Contact provider'],
      rating: course.rating ? parseFloat(course.rating) : 4.0,
      locations: course.location ? [course.location] : ['UK'],
      category: 'Electrical',
      industryDemand: 'Medium' as const,
      futureProofing: 'Good' as const,
      salaryImpact: '5-15%',
      careerOutcomes: ['Professional Development'],
      accreditation: course.provider || 'Professional',
      employerSupport: 'High',
      prerequisites: ['Electrical experience recommended'],
      courseOutline: course.description ? [course.description] : ['Course details available on enquiry'],
      assessmentMethod: 'Practical and theoretical',
      continuousAssessment: true,
      source: 'live',
      isLive: true,
      tags: course.tags ? course.tags.split(',').map((t: string) => t.trim()) : [],
      visitLink: course.visit_link || '',
      external_url: course.visit_link || '',
      image_url: course.image_url || null
    }));

    // Cache the results
    const { error: cacheError } = await supabase
      .from('live_course_cache')
      .insert({
        source: 'firecrawl-batch',
        search_query: 'electrical-courses-uk',
        course_data: transformedCourses,
        expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6 hours
      });

    if (cacheError) {
      console.error('Error caching data:', cacheError);
    }

    return new Response(JSON.stringify({
      success: true,
      cached: false,
      data: transformedCourses,
      lastUpdated: new Date().toISOString(),
      totalCourses: transformedCourses.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in live-courses-scraper:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      cached: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});