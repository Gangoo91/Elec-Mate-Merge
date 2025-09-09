import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ToolProduct {
  id?: string;
  name: string;
  category: string;
  subcategory?: string;
  supplier: string;
  price: string;
  originalPrice?: string;
  availability: string;
  image: string;
  productUrl: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  lastUpdated: string;
}

const normalizePrice = (price: string): string => {
  // Remove extra whitespace and normalize currency format
  return price.replace(/\s+/g, ' ').trim();
};

const generateProductId = (product: ToolProduct): string => {
  // Generate consistent ID based on name and supplier
  const normalized = `${product.name}-${product.supplier}`.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return normalized;
};

const validateProduct = (product: any): product is ToolProduct => {
  return (
    typeof product.name === 'string' &&
    typeof product.category === 'string' &&
    typeof product.supplier === 'string' &&
    typeof product.price === 'string' &&
    product.name.length > 0 &&
    product.category.length > 0
  );
};

const detectDuplicates = (products: ToolProduct[]): ToolProduct[] => {
  const seen = new Map<string, ToolProduct>();
  const unique: ToolProduct[] = [];

  for (const product of products) {
    const key = `${product.name.toLowerCase()}-${product.supplier.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.set(key, product);
      unique.push(product);
    } else {
      // If we find a duplicate, keep the one with more complete data
      const existing = seen.get(key)!;
      const hasMoreData = (product.description?.length || 0) > (existing.description?.length || 0) ||
                         (product.features?.length || 0) > (existing.features?.length || 0);
      
      if (hasMoreData) {
        seen.set(key, product);
        const index = unique.findIndex(p => p === existing);
        if (index >= 0) {
          unique[index] = product;
        }
      }
    }
  }

  return unique;
};

const categorizeProduct = (product: ToolProduct): ToolProduct => {
  const name = product.name.toLowerCase();
  const description = product.description?.toLowerCase() || '';
  
  // Enhanced category validation and correction
  const categoryMappings: Record<string, string[]> = {
    'Power Tools': ['drill', 'cordless', 'battery', 'grinder', 'saw', 'impact', 'sds', 'angle grinder', 'circular saw'],
    'Hand Tools': ['screwdriver', 'pliers', 'wire stripper', 'cable cutter', 'spanner', 'wrench', 'crimping'],
    'Test Equipment': ['multimeter', 'tester', 'meter', 'clamp', 'voltage', 'continuity', 'insulation', 'pat'],
    'Safety Tools': ['helmet', 'gloves', 'glasses', 'boots', 'harness', 'vest', 'safety', 'protection'],
    'Installation Tools': ['cable management', 'conduit', 'trunking', 'clips', 'ties', 'boxes', 'junction'],
    'Specialist Tools': ['cable', 'wire', 'stripper', 'cutter', 'puller', 'crimper', 'bender', 'knockout']
  };

  // Check if current category makes sense, if not, try to categorize based on keywords
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    if (keywords.some(keyword => name.includes(keyword) || description.includes(keyword))) {
      if (product.category === 'Unknown' || !product.category) {
        product.category = category;
      }
      break;
    }
  }

  return product;
};

const batchUpsertProducts = async (supabase: any, products: ToolProduct[]) => {
  const batchSize = 100;
  const results = [];

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('tools_weekly_cache')
        .upsert(
          batch.map(product => ({
            ...product,
            id: generateProductId(product),
            updated_at: new Date().toISOString()
          })),
          { 
            onConflict: 'id',
            ignoreDuplicates: false 
          }
        );

      if (error) {
        console.error(`❌ Batch upsert error for items ${i}-${i + batch.length}:`, error);
        throw error;
      }

      results.push(...(data || batch));
      console.log(`✅ Processed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(products.length/batchSize)}`);
      
      // Small delay between batches to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Failed to process batch starting at index ${i}:`, error);
      throw error;
    }
  }

  return results;
};

serve(async (req) => {
  console.log('🔧 [TOOLS-DATA-PROCESSOR] Starting request...');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tools, operation = 'upsert' } = await req.json();
    
    if (!tools || !Array.isArray(tools)) {
      throw new Error('Invalid tools data provided');
    }

    console.log(`📊 Processing ${tools.length} tools with operation: ${operation}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Data validation and cleaning
    console.log('🧹 Validating and cleaning product data...');
    const validProducts = tools
      .filter(validateProduct)
      .map(product => ({
        ...product,
        price: normalizePrice(product.price),
        lastUpdated: new Date().toISOString(),
        features: Array.isArray(product.features) ? product.features : [],
        specifications: typeof product.specifications === 'object' ? product.specifications : {}
      }))
      .map(categorizeProduct);

    console.log(`✅ ${validProducts.length} valid products after validation`);

    // Remove duplicates
    console.log('🔍 Detecting and removing duplicates...');
    const uniqueProducts = detectDuplicates(validProducts);
    console.log(`✅ ${uniqueProducts.length} unique products after deduplication`);

    // Process data based on operation
    let processedProducts = [];

    if (operation === 'upsert') {
      console.log('💾 Upserting products to database...');
      processedProducts = await batchUpsertProducts(supabase, uniqueProducts);
    } else if (operation === 'insert') {
      console.log('💾 Inserting new products to database...');
      const { data, error } = await supabase
        .from('tools_weekly_cache')
        .insert(uniqueProducts.map(product => ({
          ...product,
          id: generateProductId(product)
        })));
      
      if (error) throw error;
      processedProducts = data || uniqueProducts;
    }

    // Generate processing report
    const categoryBreakdown = uniqueProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const supplierBreakdown = uniqueProducts.reduce((acc, product) => {
      acc[product.supplier] = (acc[product.supplier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('✅ Tools data processing completed successfully');

    return new Response(JSON.stringify({
      success: true,
      processed: processedProducts.length,
      validated: validProducts.length,
      duplicatesRemoved: validProducts.length - uniqueProducts.length,
      categoryBreakdown,
      supplierBreakdown,
      operation,
      processedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in tools-data-processor:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      processed: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
