import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import * as XLSX from 'https://deno.land/x/sheetjs@v0.18.3/xlsx.mjs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔄 Starting Excel pricing parser...');

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string || file?.name || 'unknown';

    if (!file) {
      throw new Error('No file provided');
    }

    console.log(`📂 Processing file: ${filename} (${file.size} bytes)`);

    // Extract supplier from filename (e.g., "ABB_-_Electrika..." -> "ABB")
    const supplierMatch = filename.match(/^([^_-]+)/);
    const supplier = supplierMatch ? supplierMatch[1].trim() : 'Unknown Supplier';

    console.log(`🏢 Detected supplier: ${supplier}`);

    // Read Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    
    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log(`📊 Found ${jsonData.length} rows in Excel file`);

    if (jsonData.length === 0) {
      throw new Error('Excel file is empty or could not be parsed');
    }

    // Detect column mappings
    const firstRow = jsonData[0] as Record<string, any>;
    const headers = Object.keys(firstRow);
    
    console.log('📋 Detected columns:', headers);

    // Flexible column detection
    const priceHeaders = ['TRADE2', 'TRADE1', 'TRADE', 'Price', 'Unit Price', 'Trade Price', 'Cost', 'PRICE'];
    const nameHeaders = ['DESCRIPTION', 'Description', 'Product Name', 'Product', 'Item', 'NAME'];
    const skuHeaders = ['CAT NUMBER', 'Code', 'SKU', 'Part Number', 'Product Code', 'PART NO', 'ITEM CODE'];
    const brandHeaders = ['MANUF', 'Manufacturer', 'Brand', 'BRAND', 'MFG'];
    const packHeaders = ['PACK QTY', 'Pack Qty', 'Pack', 'Quantity', 'QTY'];

    const priceCol = headers.find(h => priceHeaders.some(ph => h.toUpperCase().includes(ph.toUpperCase())));
    const nameCol = headers.find(h => nameHeaders.some(nh => h.toUpperCase().includes(nh.toUpperCase())));
    const skuCol = headers.find(h => skuHeaders.some(sh => h.toUpperCase().includes(sh.toUpperCase())));
    const brandCol = headers.find(h => brandHeaders.some(bh => h.toUpperCase().includes(bh.toUpperCase())));
    const packCol = headers.find(h => packHeaders.some(ph => h.toUpperCase().includes(ph.toUpperCase())));

    console.log('🎯 Column mapping:', {
      price: priceCol,
      name: nameCol,
      sku: skuCol,
      brand: brandCol,
      pack: packCol
    });

    if (!priceCol || !nameCol) {
      throw new Error('Could not detect required columns (price and product name)');
    }

    // Process products
    const products: any[] = [];
    let skipped = 0;

    for (const row of jsonData) {
      const rawPrice = row[priceCol];
      const name = row[nameCol];
      
      // Skip if missing essential data
      if (!name || !rawPrice) {
        skipped++;
        continue;
      }

      // Normalize price (remove £, convert to number)
      let price = 0;
      if (typeof rawPrice === 'number') {
        price = rawPrice;
      } else if (typeof rawPrice === 'string') {
        price = parseFloat(rawPrice.replace(/[£,]/g, ''));
      }

      if (isNaN(price) || price === 0) {
        skipped++;
        continue;
      }

      const sku = skuCol ? String(row[skuCol] || '') : '';
      const brand = brandCol ? String(row[brandCol] || supplier) : supplier;
      const packQty = packCol ? (parseInt(row[packCol]) || 1) : 1;

      products.push({
        name: String(name).trim(),
        sku: sku.trim(),
        price: price.toFixed(2),
        price_per_unit: `£${price.toFixed(2)} per ${packQty} EA`,
        brand: brand.trim(),
        supplier: supplier,
        pack_qty: packQty,
        in_stock: true,
        specifications: `Pack of ${packQty}`
      });
    }

    console.log(`✅ Processed ${products.length} products (skipped ${skipped} invalid rows)`);

    // Insert into materials_weekly_cache
    const { data: cacheEntry, error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert({
        category: 'Electrical Components',
        source: `${supplier} Trade Pricing`,
        materials_data: products,
        total_products: products.length,
        last_updated: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log('💾 Inserted into materials_weekly_cache with ID:', cacheEntry?.id);

    const cacheId = cacheEntry?.id;
    let jobId: string | null = null;

    // Trigger embeddings generation in background (non-blocking)
    console.log('🧠 Triggering embeddings generation in background...');
    
    // @ts-ignore - EdgeRuntime.waitUntil is available in Deno Deploy
    EdgeRuntime.waitUntil(
      supabase.functions.invoke('populate-pricing-embeddings', {
        body: { cache_id: cacheId, supplier }
      }).then(({ data, error }) => {
        if (error) {
          console.error('Background embedding error:', error);
        } else {
          jobId = data?.job_id;
          console.log('✅ Background embeddings started with job_id:', jobId);
        }
      })
    );

    return new Response(JSON.stringify({
      success: true,
      supplier: supplier,
      cache_id: cacheId,
      job_id: jobId,
      products_found: products.length,
      products_skipped: skipped,
      total_rows: jsonData.length,
      message: `Successfully processed ${products.length} products from ${supplier}. Embeddings generating in background.`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in parse-supplier-pricing:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to process Excel file',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
