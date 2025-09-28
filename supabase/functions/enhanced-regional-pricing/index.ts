import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, jobType, includeNearby = true, maxDistance = 10 } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`Enhanced pricing search for location: ${location}, jobType: ${jobType || 'all'}`);

    // Extract postcode district if it's a full postcode
    let postcodeDistrict = location.toUpperCase().trim();
    const { data: extractedDistrict } = await supabase.rpc('extract_postcode_district', { 
      full_postcode: location 
    });
    
    if (extractedDistrict) {
      postcodeDistrict = extractedDistrict;
      console.log(`Extracted postcode district: ${postcodeDistrict}`);
    }

    // First, try to find exact postcode district matches
    let query = supabase
      .from('enhanced_regional_pricing')
      .select(`
        *,
        pricing_data_sources (
          source_name,
          source_type,
          reliability_score
        ),
        uk_postcode_districts!enhanced_regional_pricing_postcode_district_fkey (
          district_code,
          region,
          county,
          local_authority,
          avg_household_income,
          contractor_density,
          transport_score
        )
      `)
      .eq('postcode_district', postcodeDistrict)
      .gt('expires_at', new Date().toISOString())
      .order('confidence_score', { ascending: false });

    if (jobType && jobType !== 'all') {
      query = query.ilike('job_type', `%${jobType}%`);
    }

    const { data: exactMatches, error: exactError } = await query;
    console.log(`Found ${exactMatches?.length || 0} exact matches for ${postcodeDistrict}`);

    let results = exactMatches || [];
    let searchStrategy = 'exact_postcode';

    // If no exact matches or we want nearby data, expand search
    if (results.length === 0 || includeNearby) {
      // Get postcode district info for geographic expansion
      const { data: postcodeInfo } = await supabase
        .from('uk_postcode_districts')
        .select('*')
        .eq('district_code', postcodeDistrict)
        .single();

      if (postcodeInfo && includeNearby) {
        // Find nearby postcode districts using lat/lng
        const { data: nearbyDistricts } = await supabase
          .from('uk_postcode_districts')
          .select('district_code')
          .neq('district_code', postcodeDistrict)
          .gte('latitude', postcodeInfo.latitude - maxDistance * 0.01) // Rough conversion
          .lte('latitude', postcodeInfo.latitude + maxDistance * 0.01)
          .gte('longitude', postcodeInfo.longitude - maxDistance * 0.01)
          .lte('longitude', postcodeInfo.longitude + maxDistance * 0.01)
          .limit(10);

        if (nearbyDistricts && nearbyDistricts.length > 0) {
          const nearbyDistrictCodes = nearbyDistricts.map(d => d.district_code);
          
          let nearbyQuery = supabase
            .from('enhanced_regional_pricing')
            .select(`
              *,
              pricing_data_sources (
                source_name,
                source_type,
                reliability_score
              ),
              uk_postcode_districts!enhanced_regional_pricing_postcode_district_fkey (
                district_code,
                region,
                county,
                local_authority,
                avg_household_income,
                contractor_density,
                transport_score
              )
            `)
            .in('postcode_district', nearbyDistrictCodes)
            .gt('expires_at', new Date().toISOString())
            .order('confidence_score', { ascending: false })
            .limit(20);

          if (jobType && jobType !== 'all') {
            nearbyQuery = nearbyQuery.ilike('job_type', `%${jobType}%`);
          }

          const { data: nearbyMatches } = await nearbyQuery;
          
          if (nearbyMatches && nearbyMatches.length > 0) {
            // Add nearby results with distance indicator
            const nearbyWithDistance = nearbyMatches.map(item => ({
              ...item,
              is_nearby: true,
              distance_indicator: 'within_area'
            }));
            
            results = [...results, ...nearbyWithDistance];
            searchStrategy = results.length > (exactMatches?.length || 0) ? 'expanded_geographic' : 'exact_postcode';
            console.log(`Added ${nearbyMatches.length} nearby results`);
          }
        }
      }

      // If still no results, try regional fallback
      if (results.length === 0 && postcodeInfo) {
        console.log('No postcode matches, trying regional fallback');
        
        // Use baseline pricing with regional multipliers
        const { data: baselineData } = await supabase
          .from('job_pricing_baseline')
          .select('*')
          .limit(20);

        const { data: multiplierData } = await supabase
          .from('regional_multipliers')
          .select('*')
          .ilike('region', `%${postcodeInfo.region}%`)
          .single();

        const multiplier = multiplierData?.multiplier || 1.0;
        
        // Apply demographic adjustments
        let demographicMultiplier = 1.0;
        if (postcodeInfo.avg_household_income) {
          if (postcodeInfo.avg_household_income > 50000) demographicMultiplier = 1.2;
          else if (postcodeInfo.avg_household_income < 25000) demographicMultiplier = 0.9;
        }

        const finalMultiplier = multiplier * demographicMultiplier;

        results = (baselineData || [])
          .filter(item => !jobType || jobType === 'all' || item.job_type.toLowerCase().includes(jobType.toLowerCase()))
          .map(item => ({
            id: `computed-${item.id}`,
            postcode_district: postcodeDistrict,
            job_type: item.job_type,
            job_category: item.job_category,
            min_price: Math.round(item.base_price * finalMultiplier * 0.8),
            max_price: Math.round(item.base_price * finalMultiplier * 1.2),
            avg_price: Math.round(item.base_price * finalMultiplier),
            median_price: Math.round(item.base_price * finalMultiplier),
            sample_size: 1,
            confidence_score: 65,
            currency: item.currency,
            unit: item.unit,
            complexity_level: item.complexity_level,
            data_source_id: null,
            raw_data: { source: 'computed_baseline', multiplier: finalMultiplier },
            market_factors: {
              income_adjustment: demographicMultiplier,
              regional_multiplier: multiplier,
              postcode_info: postcodeInfo
            },
            seasonal_adjustment: 1.0,
            last_verified_at: null,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            pricing_data_sources: {
              source_name: 'Computed Baseline',
              source_type: 'computed',
              reliability_score: 65
            },
            uk_postcode_districts: postcodeInfo,
            is_computed: true
          }));
        
        searchStrategy = 'computed_baseline';
        console.log(`Generated ${results.length} computed baseline results`);
      }
    }

    // Enhance results with additional metadata
    const enhancedResults = results.map(result => ({
      ...result,
      search_strategy: searchStrategy,
      confidence_level: result.confidence_score >= 80 ? 'high' : 
                       result.confidence_score >= 60 ? 'medium' : 'low',
      data_freshness: result.expires_at ? 
        Math.max(0, Math.round((new Date(result.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))) : 0,
      market_context: {
        avg_income: result.uk_postcode_districts?.avg_household_income,
        contractor_density: result.uk_postcode_districts?.contractor_density,
        transport_score: result.uk_postcode_districts?.transport_score
      }
    }));

    // Get community statistics
    const { data: communityStats } = await supabase
      .from('community_pricing_submissions')
      .select('verification_status')
      .eq('postcode_district', postcodeDistrict);

    const communitySubmissions = communityStats?.length || 0;
    const verifiedSubmissions = communityStats?.filter(s => s.verification_status === 'approved').length || 0;

    console.log(`Returning ${enhancedResults.length} enhanced pricing results for ${postcodeDistrict}`);

    return new Response(
      JSON.stringify({
        success: true,
        results: enhancedResults,
        search_metadata: {
          postcode_district: postcodeDistrict,
          original_location: location,
          search_strategy: searchStrategy,
          result_count: enhancedResults.length,
          job_type: jobType || 'all',
          community_stats: {
            total_submissions: communitySubmissions,
            verified_submissions: verifiedSubmissions
          }
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhanced-regional-pricing function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});