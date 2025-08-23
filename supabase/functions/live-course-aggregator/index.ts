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
    
    // Fetch from all course sources in parallel
    const promises = [
      supabase.functions.invoke('reed-courses-search', { 
        body: { keywords, location } 
      }),
      supabase.functions.invoke('firecrawl-courses-scraper', { 
        body: { keywords, source: 'findcourses' } 
      }),
      supabase.functions.invoke('firecrawl-courses-scraper', { 
        body: { keywords, source: 'cityandguilds' } 
      }),
      supabase.functions.invoke('firecrawl-courses-scraper', { 
        body: { keywords, source: 'niceic' } 
      })
    ];

    const results = await Promise.allSettled(promises);
    
    // Process results from each source
    const sourceResults = [];
    const allCourses = [];
    
    const sources = ['Reed', 'FindCourses', 'City & Guilds', 'NICEIC'];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const sourceName = sources[i];
      
      if (result.status === 'fulfilled' && result.value.data) {
        const { courses = [], total = 0 } = result.value.data;
        sourceResults.push({
          source: sourceName,
          courseCount: courses.length,
          success: true,
          error: null,
          lastUpdated: new Date().toISOString()
        });
        allCourses.push(...courses);
        console.log(`✅ ${sourceName}: ${courses.length} courses`);
      } else {
        const error = result.status === 'rejected' ? result.reason?.message : 'Unknown error';
        sourceResults.push({
          source: sourceName,
          courseCount: 0,
          success: false,
          error,
          lastUpdated: new Date().toISOString()
        });
        console.log(`❌ ${sourceName}: ${error}`);
      }
    }

    // Remove duplicates based on title + provider
    const uniqueCourses = removeDuplicates(allCourses);
    
    // Sort by rating and future-proofing (live courses first)
    uniqueCourses.sort((a, b) => {
      // Prioritize live courses
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      
      // Then by rating and future-proofing
      const scoreA = (a.rating || 0) * (a.futureProofing || 1);
      const scoreB = (b.rating || 0) * (b.futureProofing || 1);
      return scoreB - scoreA;
    });

    const summary = {
      totalCourses: uniqueCourses.length,
      originalCourses: allCourses.length,
      duplicatesRemoved: allCourses.length - uniqueCourses.length,
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