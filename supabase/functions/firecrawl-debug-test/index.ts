import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Test URLs for debugging
const TEST_URLS = [
  'https://www.screwfix.com/search?search=wire+strippers&page_size=20',
  'https://www.toolstation.com/search?q=multimeter',
  'https://www.screwfix.com/c/electrical/electrical-hand-tools/p1'
];

// Simple product schema for testing
const simpleProductSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Product name or title" },
          price: { type: "string", description: "Product price" },
          link: { type: "string", description: "Product page URL" }
        }
      }
    },
    pageTitle: { type: "string", description: "Page title" },
    totalProductsFound: { type: "number", description: "Number of products on page" }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('🧪 [FIRECRAWL-DEBUG-TEST] Starting debug test...');

  try {
    const { testUrl, extractionMode = 'extract' } = await req.json();
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    const urlToTest = testUrl || TEST_URLS[0];
    
    console.log(`🔍 Testing URL: ${urlToTest}`);
    console.log(`📋 Extraction mode: ${extractionMode}`);

    // Test different extraction methods
    const results = [];

    // 1. Test basic scraping (markdown + html)
    console.log('📄 Testing basic scraping...');
    try {
      const basicResponse = await firecrawl.scrapeUrl(urlToTest, {
        formats: ['markdown', 'html']
      }) as any;
      
      results.push({
        method: 'basic_scraping',
        success: !!basicResponse.success,
        contentLength: basicResponse.success ? (basicResponse.data?.markdown?.length || 0) : 0,
        htmlLength: basicResponse.success ? (basicResponse.data?.html?.length || 0) : 0,
        preview: basicResponse.success ? (basicResponse.data?.markdown?.substring(0, 500) || 'No content') : 'No content',
        error: basicResponse.success ? null : (basicResponse.error || 'Unknown error')
      });
    } catch (error) {
      results.push({
        method: 'basic_scraping',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }

    // 2. Test structured extraction
    console.log('🎯 Testing structured extraction...');
    try {
      const extractResponse = await firecrawl.scrapeUrl(urlToTest, {
        formats: ['extract'],
        extract: {
          schema: simpleProductSchema as any,
          prompt: "Extract all product listings from this page. Look for product names, prices, and links. Products might be in cards, lists, or grid layouts."
        }
      }) as any;
      
      results.push({
        method: 'structured_extraction',
        success: !!extractResponse.success,
        extractedData: extractResponse.success ? (extractResponse.data?.extract || null) : null,
        productsFound: extractResponse.success ? (extractResponse.data?.extract?.products?.length || 0) : 0,
        error: extractResponse.success ? null : (extractResponse.error || 'Unknown error')
      });
    } catch (error) {
      results.push({
        method: 'structured_extraction',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }

    // 3. Test with screenshot for visual debugging
    console.log('📸 Testing with screenshot...');
    try {
      const screenshotResponse = await firecrawl.scrapeUrl(urlToTest, {
        formats: ['screenshot', 'markdown']
      }) as any;
      
      results.push({
        method: 'screenshot_test',
        success: !!screenshotResponse.success,
        hasScreenshot: screenshotResponse.success ? !!screenshotResponse.data?.screenshot : false,
        contentLength: screenshotResponse.success ? (screenshotResponse.data?.markdown?.length || 0) : 0,
        error: screenshotResponse.success ? null : (screenshotResponse.error || 'Unknown error')
      });
    } catch (error) {
      results.push({
        method: 'screenshot_test',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }

    // Analyze results
    const successfulMethods = results.filter(r => r.success).length;
    const analysis = {
      url: urlToTest,
      overallSuccess: successfulMethods > 0,
      successfulMethods: successfulMethods,
      totalMethods: results.length,
      recommendations: [] as string[]
    };

    // Generate recommendations
    if (successfulMethods === 0) {
      analysis.recommendations.push("All extraction methods failed - check if the website is blocking Firecrawl or if there are network issues");
    }
    
    const basicResult = results.find(r => r.method === 'basic_scraping');
    if (basicResult?.success && basicResult.contentLength === 0) {
      analysis.recommendations.push("Website returned empty content - likely anti-bot protection or JavaScript-heavy content");
    }
    
    const extractResult = results.find(r => r.method === 'structured_extraction');
    if (extractResult?.success && extractResult.productsFound === 0) {
      analysis.recommendations.push("Structured extraction succeeded but found no products - schema may need updating or different extraction prompt");
    }

    console.log('✅ Debug test completed');
    console.log(`📊 Results: ${successfulMethods}/${results.length} methods successful`);

    return new Response(JSON.stringify({
      success: true,
      analysis,
      detailedResults: results,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Debug test failed:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});