import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface CourseDatesRequest {
  courseUrl: string;
  courseId: string;
  provider: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { courseUrl, courseId, provider }: CourseDatesRequest = await req.json();
    
    console.log('🔍 Scraping course dates for:', { courseId, provider, courseUrl });

    // Check cache first
    const { data: cachedDates } = await supabase
      .from('course_dates_cache')
      .select('*')
      .eq('course_url', courseUrl)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedDates) {
      console.log('✅ Returning cached course dates');
      return new Response(JSON.stringify({
        success: true,
        dates: cachedDates.dates_data,
        cached: true,
        lastUpdated: cachedDates.created_at
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get Firecrawl API key
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    console.log('📡 Fetching course dates from:', courseUrl);

    // Scrape course dates using Firecrawl
    const response = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: courseUrl,
        onlyMainContent: true,
        formats: [{
          type: "json",
          schema: {
            type: "object",
            properties: {
              upcomingDates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startDate: {
                      type: "string",
                      description: "Course start date in YYYY-MM-DD format"
                    },
                    endDate: {
                      type: "string", 
                      description: "Course end date in YYYY-MM-DD format"
                    },
                    location: {
                      type: "string",
                      description: "Training location or 'Online'"
                    },
                    availability: {
                      type: "string",
                      description: "Available spaces (e.g., '5 spaces left', 'Available')"
                    },
                    price: {
                      type: "string",
                      description: "Course price for this date"
                    },
                    bookingUrl: {
                      type: "string",
                      description: "Direct booking URL for this specific date"
                    }
                  },
                  required: ["startDate", "location"]
                },
                description: "List of upcoming course start dates with availability"
              },
              nextIntakeDate: {
                type: "string",
                description: "Next available intake date"
              },
              bookingInstructions: {
                type: "string",
                description: "How to book onto the course"
              },
              contactInfo: {
                type: "object",
                properties: {
                  phone: { type: "string" },
                  email: { type: "string" },
                  bookingUrl: { type: "string" }
                }
              }
            }
          }
        }]
      })
    });

    const scrapedData = await response.json();
    
    let datesData = {
      upcomingDates: [],
      nextIntakeDate: null,
      bookingInstructions: '',
      contactInfo: {}
    };

    if (scrapedData.success && scrapedData.data?.json) {
      datesData = {
        upcomingDates: scrapedData.data.json.upcomingDates || [],
        nextIntakeDate: scrapedData.data.json.nextIntakeDate || null,
        bookingInstructions: scrapedData.data.json.bookingInstructions || '',
        contactInfo: scrapedData.data.json.contactInfo || {}
      };
    }

    // Cache the results for 12 hours
    await supabase
      .from('course_dates_cache')
      .upsert({
        course_url: courseUrl,
        course_id: courseId,
        provider: provider,
        dates_data: datesData,
        expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      });

    console.log('✅ Course dates scraped and cached:', {
      upcomingDatesCount: datesData.upcomingDates.length,
      nextIntakeDate: datesData.nextIntakeDate
    });

    return new Response(JSON.stringify({
      success: true,
      dates: datesData,
      cached: false,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in course dates scraper:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to scrape course dates'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});