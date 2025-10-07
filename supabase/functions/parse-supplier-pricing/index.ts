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

    // Read Excel file with memory-efficient approach
    console.log('📥 Reading Excel file with memory optimization...');
    const arrayBuffer = await file.arrayBuffer();
    
    // Use sheetRows to limit initial memory footprint
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { 
      type: 'array', 
      sheetRows: 100,  // Only read first 100 rows initially
      cellDates: false,
      cellNF: false,
      cellHTML: false
    });
    
    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Parse just the first row to detect columns
    const headerRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    if (headerRow.length === 0) {
      throw new Error('Could not read Excel headers');
    }

    const headers = headerRow[0] as string[];
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

    // Clear initial workbook from memory
    worksheet['!ref'] = null;
    
    // Now re-read without row limit to get full data
    console.log('📊 Loading full dataset...');
    const fullWorkbook = XLSX.read(new Uint8Array(arrayBuffer), { 
      type: 'array',
      cellDates: false,
      cellNF: false,
      cellHTML: false
    });
    
    const fullWorksheet = fullWorkbook.Sheets[fullWorkbook.SheetNames[0]];
    
    // Get row count
    const range = XLSX.utils.decode_range(fullWorksheet['!ref'] || 'A1');
    const totalRows = range.e.r;
    
    console.log(`📊 Total rows: ${totalRows}`);

    // Process in very small chunks to minimize memory
    const CHUNK_SIZE = 100;  // Smaller chunks
    const allProducts: any[] = [];
    let totalSkipped = 0;

    console.log(`🔄 Processing ${totalRows} rows in chunks of ${CHUNK_SIZE}...`);

    for (let startRow = 1; startRow <= totalRows; startRow += CHUNK_SIZE) {
      const endRow = Math.min(startRow + CHUNK_SIZE - 1, totalRows);
      
      // Parse small chunk
      const chunk = XLSX.utils.sheet_to_json(fullWorksheet, { 
        range: startRow,
        header: headers
      }).slice(0, CHUNK_SIZE);

      console.log(`📦 Chunk ${Math.floor(startRow/CHUNK_SIZE) + 1}: rows ${startRow}-${endRow} (${chunk.length} rows)`);

      // Process chunk immediately
      for (const row of chunk) {
        const rawPrice = row[priceCol];
        const name = row[nameCol];
        
        if (!name || !rawPrice) {
          totalSkipped++;
          continue;
        }

        let price = 0;
        if (typeof rawPrice === 'number') {
          price = rawPrice;
        } else if (typeof rawPrice === 'string') {
          price = parseFloat(rawPrice.replace(/[£,]/g, ''));
        }

        if (isNaN(price) || price === 0) {
          totalSkipped++;
          continue;
        }

        const sku = skuCol ? String(row[skuCol] || '') : '';
        const brand = brandCol ? String(row[brandCol] || supplier) : supplier;
        const packQty = packCol ? (parseInt(row[packCol]) || 1) : 1;

        allProducts.push({
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

      // Clear chunk from memory
      chunk.length = 0;
      
      console.log(`✓ Total processed: ${allProducts.length} products`);
    }

    console.log(`✅ Completed: ${allProducts.length} products (skipped ${totalSkipped} invalid rows)`);

    // Clear workbook from memory before database insert
    fullWorksheet['!ref'] = null;

    // Insert into materials_weekly_cache
    const { data: cacheEntry, error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert({
        category: 'Electrical Components',
        source: `${supplier} Trade Pricing`,
        materials_data: allProducts,
        total_products: allProducts.length,
        last_updated: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
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
      products_found: allProducts.length,
      products_skipped: totalSkipped,
      total_rows: totalRows,
      message: `Successfully processed ${allProducts.length} products from ${supplier}. Embeddings generating in background.`
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
