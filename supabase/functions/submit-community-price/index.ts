
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { job_type, location, price, unit, complexity_level, notes, attributes } = await req.json();

    // Validation
    if (!job_type || !location || !price) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: job_type, location, price' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof price !== 'number' || price <= 0) {
      return new Response(
        JSON.stringify({ error: 'Price must be a positive number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing community price submission: ${job_type} in ${location} for £${price}`);
    console.log('Attributes received:', attributes);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get client info for abuse prevention
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Try to geocode the location
    let region = location;
    let county = null;
    let postcode = null;
    let lat = null;
    let lng = null;

    try {
      const geocodeResponse = await supabase.functions.invoke('geocode-location', {
        body: { location }
      });

      if (geocodeResponse.data?.success) {
        const locationData = geocodeResponse.data.location;
        region = locationData.region || region;
        county = locationData.county;
        postcode = locationData.postcode;
        lat = locationData.lat;
        lng = locationData.lng;
      }
    } catch (geocodeError) {
      console.log('Geocoding failed, using raw location:', geocodeError);
    }

    // Auto-approve if price seems reasonable (within 3x of typical baseline)
    let autoApprove = false;
    try {
      const { data: baselineData } = await supabase
        .from('job_pricing_baseline')
        .select('base_price')
        .eq('job_type', job_type)
        .eq('complexity_level', complexity_level)
        .single();

      if (baselineData?.base_price) {
        const baseline = baselineData.base_price;
        // Auto-approve if within reasonable range (0.3x to 3x baseline)
        if (price >= baseline * 0.3 && price <= baseline * 3) {
          autoApprove = true;
          console.log(`Auto-approving price ${price} (baseline: ${baseline})`);
        }
      }
    } catch (error) {
      console.log('Could not check baseline for auto-approval:', error);
    }

    // Prepare attributes for storage (ensure it's a valid JSON object)
    const attributesData = attributes && typeof attributes === 'object' ? attributes : {};

    // Insert the submission
    const { error: insertError } = await supabase
      .from('price_reports')
      .insert({
        job_type,
        region,
        county,
        postcode,
        lat,
        lng,
        price,
        currency: 'GBP',
        unit: unit || 'per job',
        complexity_level: complexity_level || 'standard',
        notes,
        status: autoApprove ? 'approved' : 'pending',
        ip_address: clientIP,
        user_agent: userAgent,
        data_source: 'user_submission',
        attributes: attributesData
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully submitted price report for ${job_type}${autoApprove ? ' (auto-approved)' : ' (pending review)'}`);
    if (Object.keys(attributesData).length > 0) {
      console.log('Stored attributes:', attributesData);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: autoApprove 
          ? 'Price submitted and approved automatically'
          : 'Price submitted for review',
        auto_approved: autoApprove,
        attributes_stored: Object.keys(attributesData).length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in submit-community-price function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
