import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { courseUrl, providerId } = await req.json();
    
    if (!courseUrl) {
      throw new Error('Course URL is required');
    }

    console.log(`Starting contact extraction for: ${courseUrl}`);
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check cache first
    const cacheKey = `contact-${providerId || btoa(courseUrl).slice(0, 50)}`;
    const { data: cachedData } = await supabase
      .from('live_course_cache')
      .select('course_data')
      .eq('search_query', cacheKey)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedData?.course_data) {
      console.log('✅ Contact details found in cache');
      return new Response(JSON.stringify({
        success: true,
        contactInfo: cachedData.course_data
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    // Extract contact information using Firecrawl
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: courseUrl,
        formats: ['extract'],
        extract: {
          schema: {
            type: 'object',
            properties: {
              contactInfo: {
                type: 'object',
                properties: {
                  phone: {
                    type: 'string',
                    description: 'Phone number or telephone contact'
                  },
                  email: {
                    type: 'string',
                    description: 'Email address for inquiries'
                  },
                  address: {
                    type: 'string',
                    description: 'Physical address or location'
                  },
                  contactPerson: {
                    type: 'string',
                    description: 'Contact person or department name'
                  },
                  officeHours: {
                    type: 'string',
                    description: 'Office hours or availability times'
                  },
                  website: {
                    type: 'string',
                    description: 'Main website URL'
                  },
                  socialLinks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        platform: { type: 'string' },
                        url: { type: 'string' }
                      }
                    },
                    description: 'Social media links'
                  }
                }
              },
              providerName: {
                type: 'string',
                description: 'Training provider company name'
              },
              description: {
                type: 'string',
                description: 'Brief description of the training provider'
              }
            }
          }
        }
      }),
    });

    if (!firecrawlResponse.ok) {
      throw new Error(`Firecrawl API error: ${firecrawlResponse.statusText}`);
    }

    const firecrawlData = await firecrawlResponse.json();
    console.log('📊 Firecrawl response:', JSON.stringify(firecrawlData, null, 2));

    const extractedData = firecrawlData.data?.extract || {};
    
    // Structure the contact information
    const contactInfo = {
      phone: extractedData.contactInfo?.phone || null,
      email: extractedData.contactInfo?.email || null,
      address: extractedData.contactInfo?.address || null,
      contactPerson: extractedData.contactInfo?.contactPerson || null,
      officeHours: extractedData.contactInfo?.officeHours || null,
      website: extractedData.contactInfo?.website || courseUrl,
      socialLinks: extractedData.contactInfo?.socialLinks || [],
      providerName: extractedData.providerName || null,
      description: extractedData.description || null,
      extractedAt: new Date().toISOString()
    };

    // Cache the contact information for 7 days
    await supabase
      .from('live_course_cache')
      .insert({
        search_query: cacheKey,
        source: 'contact-extraction',
        course_data: contactInfo,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });

    console.log(`✅ Contact extraction complete for ${courseUrl}`);

    return new Response(JSON.stringify({
      success: true,
      contactInfo
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in contact extraction:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      contactInfo: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});