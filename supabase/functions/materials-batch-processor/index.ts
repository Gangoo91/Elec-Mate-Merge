import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BatchJob {
  id: string;
  job_type: string;
  status: string;
  total_batches: number;
  completed_batches: number;
  failed_batches: number;
  current_batch: number;
  progress_percentage: number;
  metadata: any;
}

interface SupplierConfig {
  name: string;
  baseUrl: string;
  searchParams: any;
}

const SUPPLIERS: SupplierConfig[] = [
  {
    name: "Screwfix",
    baseUrl: "https://www.screwfix.com/search",
    searchParams: { search: "electrical+cables+mcb+rcd+sockets+switches", page_size: 50 }
  },
  {
    name: "Toolstation", 
    baseUrl: "https://www.toolstation.com/search",
    searchParams: { q: "electrical+cables+conduit+mcb+switches+sockets", limit: 50 }
  },
  {
    name: "City Electrical Factors",
    baseUrl: "https://www.cef.co.uk/search",
    searchParams: { q: "electrical+cables+mcb+rcd+consumer+units", rows: 50 }
  },
  {
    name: "TLC Direct",
    baseUrl: "https://www.tlc-direct.co.uk/Search/Index.html",
    searchParams: { search: "electrical+cables+mcb+switches", pageSize: 50 }
  },
  {
    name: "RS Components",
    baseUrl: "https://uk.rs-online.com/web/c/cables-wires",
    searchParams: { applied: "true", relevancy: "bestMatch" }
  }
];

const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: { type: "string", description: "The name or title of the product" },
      category: { type: "string", description: "The category or type of electrical material/cable" },
      price: { type: "string", description: "The price of the product, including currency and VAT info" },
      description: { type: "string", description: "Key features or details of the product" },
      image: { type: "string", format: "uri", description: "URL of the product image" },
      view_product_url: { type: "string", format: "uri", description: "Direct URL to the product page" },
      supplier: { type: "string", description: "The supplier name (e.g., Screwfix, Toolstation)" },
      in_stock: { type: "boolean", description: "Whether the product is in stock" },
      brand: { type: "string", description: "The brand or manufacturer" },
      technical_specs: { type: "string", description: "Technical specifications if available" }
    },
  },
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeSupplierBatch(supplier: SupplierConfig, batchSize: number = 1) {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY not found');
  }

  const url = "https://api.firecrawl.dev/v2/scrape";
  const searchUrl = new URL(supplier.baseUrl);
  Object.entries(supplier.searchParams).forEach(([key, value]) => {
    searchUrl.searchParams.set(key, String(value));
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: searchUrl.toString(),
      onlyMainContent: true,
      maxAge: 0,
      formats: [
        {
          type: "json",
          prompt: `Extract electrical materials from ${supplier.name}. Focus on: cables (twin & earth, flex, armoured), protection devices (MCBs, RCDs, consumer units), switches & sockets, lighting (LED, downlights), conduits & trunking, junction boxes, electrical tools, and other electrical components. Include product name, price, description, category, and availability.`,
          schema: productSchema,
        },
      ],
    }),
  };

  try {
    console.log(`🔧 Scraping ${supplier.name} - ${searchUrl.toString()}`);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed for ${supplier.name}: ${response.status}`);
    }

    const data = await response.json();
    const products = data.data?.json || [];
    
    // Add supplier info to each product
    const enrichedProducts = products.map((product: any) => ({
      ...product,
      supplier: supplier.name,
      scraped_at: new Date().toISOString()
    }));

    console.log(`✅ ${supplier.name}: Found ${enrichedProducts.length} products`);
    return enrichedProducts;
  } catch (error) {
    console.error(`⚠️ Error scraping ${supplier.name}:`, error);
    throw error;
  }
}

async function processBatch(supabase: any, jobId: string, suppliers: SupplierConfig[], batchNumber: number) {
  console.log(`📦 Processing batch ${batchNumber} with ${suppliers.length} suppliers`);
  
  // Update batch progress
  await supabase.from('batch_progress').insert({
    job_id: jobId,
    batch_number: batchNumber,
    status: 'processing',
    total_items: suppliers.length,
    started_at: new Date().toISOString()
  });

  const results = [];
  let processed = 0;
  
  for (const supplier of suppliers) {
    try {
      const products = await scrapeSupplierBatch(supplier);
      results.push(...products);
      processed++;
      
      console.log(`✅ Batch ${batchNumber}: Processed ${supplier.name} (${processed}/${suppliers.length})`);
      
      // Add delay between requests to respect rate limits
      if (processed < suppliers.length) {
        await delay(2000); // 2 second delay between suppliers
      }
    } catch (error) {
      console.error(`❌ Batch ${batchNumber}: Failed to process ${supplier.name}:`, error);
      processed++;
    }
  }

  // Update batch progress as completed
  await supabase.from('batch_progress')
    .update({
      status: 'completed',
      items_processed: processed,
      completed_at: new Date().toISOString(),
      data: { product_count: results.length }
    })
    .eq('job_id', jobId)
    .eq('batch_number', batchNumber);

  return results;
}

async function updateJobProgress(supabase: any, jobId: string, completedBatches: number, totalBatches: number, failedBatches: number = 0) {
  const progressPercentage = Math.round((completedBatches / totalBatches) * 100);
  
  await supabase.from('batch_jobs')
    .update({
      completed_batches: completedBatches,
      failed_batches: failedBatches,
      current_batch: completedBatches + 1,
      progress_percentage: progressPercentage,
      updated_at: new Date().toISOString()
    })
    .eq('id', jobId);
}

async function processAllBatches(supabase: any, jobId: string) {
  try {
    console.log('🚀 Starting batch processing for materials scraping...');
    
    // Validate FIRECRAWL_API_KEY early
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }
    
    // Split suppliers into batches of 2 (to avoid overwhelming the API)
    const BATCH_SIZE = 2;
    const batches = [];
    for (let i = 0; i < SUPPLIERS.length; i += BATCH_SIZE) {
      batches.push(SUPPLIERS.slice(i, i + BATCH_SIZE));
    }

    console.log(`📊 Created ${batches.length} batches of max ${BATCH_SIZE} suppliers each`);

    // Update job status - only update if batch_jobs table exists and has these fields
    try {
      const { error: updateError } = await supabase.from('batch_jobs')
        .update({
          status: 'processing',
          total_batches: batches.length,
          started_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (updateError) {
        console.warn('Could not update batch_jobs table:', updateError.message);
      }
    } catch (error) {
      console.warn('batch_jobs table may not exist, continuing with processing:', error);
    }

    const allProducts = [];
    let completedBatches = 0;
    let failedBatches = 0;

    // Process batches sequentially
    for (let i = 0; i < batches.length; i++) {
      try {
        console.log(`🔄 Processing batch ${i + 1}/${batches.length}`);
        const batchProducts = await processBatch(supabase, jobId, batches[i], i + 1);
        allProducts.push(...batchProducts);
        completedBatches++;
        
        await updateJobProgress(supabase, jobId, completedBatches, batches.length, failedBatches);
        
        // Add delay between batches
        if (i < batches.length - 1) {
          console.log('⏳ Waiting 5 seconds before next batch...');
          await delay(5000);
        }
      } catch (error) {
        console.error(`❌ Batch ${i + 1} failed:`, error);
        failedBatches++;
        await updateJobProgress(supabase, jobId, completedBatches, batches.length, failedBatches);
      }
    }

    // Store final results in materials cache
    if (allProducts.length > 0) {
      console.log(`💾 Storing ${allProducts.length} products in materials cache...`);
      
      try {
        // Clear existing cache
        const { error: deleteError } = await supabase
          .from('materials_weekly_cache')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
        
        if (deleteError) {
          console.warn('Could not clear existing cache:', deleteError.message);
        } else {
          console.log('✅ Cleared existing cache');
        }

        // Group products by category with improved categorization
        const categorizedData = {};
        const usedProducts = new Set();

        // More inclusive categorization logic
        const categories = {
          'cables': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('cable') || text.includes('conduit') || text.includes('wire') || 
                   text.includes('twin') || text.includes('earth') || text.includes('flex') ||
                   text.includes('trunking') || text.includes('sleeving');
          },
          'switches-sockets': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('switch') || text.includes('socket') || text.includes('outlet') ||
                   text.includes('dimmer') || text.includes('plug') || text.includes('gang');
          },
          'protection': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('protection') || text.includes('mcb') || text.includes('rcd') || 
                   text.includes('breaker') || text.includes('fuse') || text.includes('isolator') ||
                   text.includes('consumer') || text.includes('rcbo');
          },
          'lighting': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('light') || text.includes('led') || text.includes('lamp') ||
                   text.includes('bulb') || text.includes('spot') || text.includes('downlight');
          },
          'tools': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('tool') || text.includes('test') || text.includes('meter') ||
                   text.includes('tape') && text.includes('draw') || text.includes('fish') ||
                   text.includes('crimper') || text.includes('stripper');
          },
          'accessories': (p) => {
            const text = `${p.category || ''} ${p.name || ''}`.toLowerCase();
            return text.includes('junction') || text.includes('connector') || text.includes('terminal') ||
                   text.includes('bracket') || text.includes('clip') || text.includes('fixing') ||
                   text.includes('gland') || text.includes('box');
          }
        };

        // Categorize products (each product can only belong to one category)
        for (const [category, filterFn] of Object.entries(categories)) {
          categorizedData[category] = allProducts.filter(p => !usedProducts.has(p) && filterFn(p));
          categorizedData[category].forEach(p => usedProducts.add(p));
        }

        // Assign remaining products to 'general'
        const remainingProducts = allProducts.filter(p => !usedProducts.has(p));
        if (remainingProducts.length > 0) {
          categorizedData['general'] = remainingProducts;
        }

        // Log categorization results
        console.log('📊 Product categorization results:');
        Object.entries(categorizedData).forEach(([category, products]) => {
          console.log(`  ${category}: ${products.length} products`);
        });

        // Insert categorized data
        const insertPromises = [];
        for (const [category, products] of Object.entries(categorizedData)) {
          if (products && products.length > 0) {
            console.log(`📦 Inserting ${products.length} products for category: ${category}`);
            const insertPromise = supabase.from('materials_weekly_cache').insert({
              category,
              materials_data: products,
              total_products: products.length,
              expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
              update_status: 'completed'
            });
            insertPromises.push(insertPromise);
          }
        }

        // Execute all inserts
        const insertResults = await Promise.allSettled(insertPromises);
        let successCount = 0;
        let errorCount = 0;

        insertResults.forEach((result, index) => {
          const category = Object.keys(categorizedData)[index];
          if (result.status === 'fulfilled' && !result.value.error) {
            successCount++;
            console.log(`✅ Successfully inserted ${category} products`);
          } else {
            errorCount++;
            const error = result.status === 'rejected' ? result.reason : result.value.error;
            console.error(`❌ Failed to insert ${category} products:`, error);
          }
        });

        console.log(`💾 Cache storage summary: ${successCount} categories succeeded, ${errorCount} failed`);
        console.log(`✅ Stored ${allProducts.length} products in cache across ${successCount} categories`);
        
      } catch (error) {
        console.error('❌ Error storing products in cache:', error);
        // Don't throw - let the job complete even if cache storage fails
      }
    } else {
      console.warn('⚠️ No products found to store in cache');
    }

    // Mark job as completed
    try {
      const { error: jobUpdateError } = await supabase.from('batch_jobs')
        .update({
          status: 'completed',
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          metadata: { 
            total_products: allProducts.length,
            successful_batches: completedBatches,
            failed_batches: failedBatches
          }
        })
        .eq('id', jobId);
      
      if (jobUpdateError) {
        console.warn('Could not update job completion status:', jobUpdateError.message);
      } else {
        console.log('✅ Job marked as completed');
      }
    } catch (error) {
      console.warn('Failed to update job status:', error);
    }

    console.log(`🎉 Batch processing completed! Total products: ${allProducts.length}`);
    return allProducts;

  } catch (error) {
    console.error('❌ Batch processing failed:', error);
    
    // Mark job as failed
    try {
      const { error: jobFailError } = await supabase.from('batch_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (jobFailError) {
        console.warn('Could not update job failure status:', jobFailError.message);
      }
    } catch (updateError) {
      console.warn('Failed to update job failure status:', updateError);
    }
    
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Materials Batch Processor function invoked');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for FIRECRAWL_API_KEY early
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    // Try to create a batch job, but don't fail if the table doesn't exist
    let jobId = `materials-job-${Date.now()}`;
    try {
      const { data: job, error: jobError } = await supabase
        .from('batch_jobs')
        .insert({
          job_type: 'materials_scraping',
          status: 'pending',
          metadata: { suppliers: SUPPLIERS.map(s => s.name) }
        })
        .select()
        .single();

      if (!jobError && job) {
        jobId = job.id;
        console.log(`📝 Created batch job ${job.id}`);
      } else {
        console.warn('Could not create batch job, using generated ID:', jobError?.message);
      }
    } catch (error) {
      console.warn('batch_jobs table may not be available, continuing with generated ID:', error);
    }

    // Start background processing
    try {
      if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
        EdgeRuntime.waitUntil(
          processAllBatches(supabase, jobId).catch(error => {
            console.error('Background processing failed:', error);
          })
        );
      } else {
        // Fallback: start processing without waitUntil
        processAllBatches(supabase, jobId).catch(error => {
          console.error('Background processing failed:', error);
        });
      }
    } catch (error) {
      console.error('Failed to start background processing:', error);
      // Try direct processing as fallback
      processAllBatches(supabase, jobId).catch(err => {
        console.error('Direct processing also failed:', err);
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      job_id: jobId,
      message: 'Batch processing started',
      estimated_time: '5-10 minutes',
      suppliers_count: SUPPLIERS.length
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('❌ Error in materials-batch-processor:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to start batch processing', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});