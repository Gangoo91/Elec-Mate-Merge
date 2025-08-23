import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = "electrician", location = "United Kingdom", page = 1 } = await req.json();
    
    console.log(`Starting live course aggregation for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const searchParams = { keywords, location, page };
    
    // Fetch from all course sources in parallel
    const promises = [
      supabase.functions.invoke('reed-courses-search', { body: searchParams }),
      supabase.functions.invoke('findcourses-scraper', { body: searchParams })
    ];

    const results = await Promise.allSettled(promises);
    
    // Process results from each source
    const sourceResults = [];
    const allCourses = [];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const sources = ['Reed', 'Findcourses'];
      const sourceName = sources[i];
      
      if (result.status === 'fulfilled' && result.value.data) {
        const { courses = [], total = 0 } = result.value.data;
        sourceResults.push({
          source: sourceName,
          courseCount: courses.length,
          success: true,
          error: null
        });
        allCourses.push(...courses);
        console.log(`✅ ${sourceName}: ${courses.length} courses`);
      } else {
        const error = result.status === 'rejected' ? result.reason?.message : 'Unknown error';
        sourceResults.push({
          source: sourceName,
          courseCount: 0,
          success: false,
          error
        });
        console.log(`❌ ${sourceName}: ${error}`);
      }
    }

    // Remove duplicates based on title + provider
    const uniqueCourses = removeDuplicates(allCourses);
    
    // Sort by relevance and rating
    uniqueCourses.sort((a, b) => {
      // Featured courses first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by trending
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      // Then by rating
      if (b.rating !== a.rating) return b.rating - a.rating;
      
      // Finally by demand
      const demandOrder = { high: 3, medium: 2, low: 1 };
      const aDemand = demandOrder[a.demand as keyof typeof demandOrder] || 1;
      const bDemand = demandOrder[b.demand as keyof typeof demandOrder] || 1;
      return bDemand - aDemand;
    });

    const summary = {
      totalCourses: uniqueCourses.length,
      originalCourses: allCourses.length,
      duplicatesRemoved: allCourses.length - uniqueCourses.length,
      sourceBreakdown: sourceResults,
      searchCriteria: { keywords, location, page }
    };

    console.log(`📊 Course aggregation complete: ${uniqueCourses.length} unique courses from ${sourceResults.filter(s => s.success).length} sources`);

    return new Response(JSON.stringify({
      courses: uniqueCourses,
      total: uniqueCourses.length,
      page,
      summary,
      sourceResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in live course aggregator:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      courses: [],
      total: 0,
      page: 1,
      summary: null,
      sourceResults: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function removeDuplicates(courses: any[]) {
  const seen = new Set();
  return courses.filter(course => {
    const key = `${course.title?.toLowerCase().trim()}-${course.provider?.toLowerCase().trim()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}