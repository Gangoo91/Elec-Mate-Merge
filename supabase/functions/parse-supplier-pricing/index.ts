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

    // Smart column detection - find best match by checking data quality
    const nameHeaders = ['DESCRIPTION', 'Description', 'Product Name', 'Product', 'Item', 'NAME'];
    const skuHeaders = ['CAT NUMBER', 'Code', 'SKU', 'Part Number', 'Product Code', 'PART NO', 'ITEM CODE'];
    const brandHeaders = ['MANUF', 'MANU', 'Manufacturer', 'Brand', 'BRAND', 'MFG'];
    const packHeaders = ['PACK QTY', 'Pack Qty', 'Pack', 'Quantity', 'QTY'];
    const unitHeaders = ['UNIT', 'PER', 'Unit', 'Per'];
    const discGroupHeaders = ['DISC GROUP', 'Disc Group', 'Group'];

    // Find non-price columns first
    const nameCol = headers.find(h => nameHeaders.some(nh => h.toUpperCase().includes(nh.toUpperCase())));
    const skuCol = headers.find(h => skuHeaders.some(sh => h.toUpperCase().includes(sh.toUpperCase())));
    const brandCol = headers.find(h => brandHeaders.some(bh => h.toUpperCase().includes(bh.toUpperCase())));
    const packCol = headers.find(h => packHeaders.some(ph => h.toUpperCase().includes(ph.toUpperCase())));
    const unitCol = headers.find(h => unitHeaders.some(uh => h.toUpperCase().includes(uh.toUpperCase())));
    const discGroupCol = headers.find(h => discGroupHeaders.some(dh => h.toUpperCase().includes(dh.toUpperCase())));

    // Smart price column detection - check which has most valid numbers
    const priceHeaders = ['TRADE2', 'TRADE1 (SPLIT PACK)', 'TRADE1', 'TRADE', 'Price', 'Unit Price', 'Trade Price', 'Cost', 'PRICE'];
    const potentialPriceCols = headers.filter(h => 
      priceHeaders.some(ph => h.toUpperCase().includes(ph.toUpperCase()))
    );

    console.log('🔍 Found potential price columns:', potentialPriceCols);

    // Sample first 50 rows to find best price column
    const sampleData = XLSX.utils.sheet_to_json(worksheet, { 
      header: headers,
      range: 1,
      defval: ''
    }).slice(0, 50);

    let priceCol = potentialPriceCols[0]; // Default to first
    let maxValidPrices = 0;

    for (const col of potentialPriceCols) {
      let validCount = 0;
      for (const row of sampleData) {
        const val = row[col];
        if (val && val !== '-' && val !== '') {
          const numVal = typeof val === 'number' ? val : parseFloat(String(val).replace(/[£,\s]/g, ''));
          if (!isNaN(numVal) && numVal > 0) {
            validCount++;
          }
        }
      }
      console.log(`  ${col}: ${validCount} valid prices in sample`);
      if (validCount > maxValidPrices) {
        maxValidPrices = validCount;
        priceCol = col;
      }
    }

    console.log('🎯 Column mapping:', {
      price: priceCol,
      name: nameCol,
      sku: skuCol,
      brand: brandCol,
      pack: packCol,
      unit: unitCol,
      discGroup: discGroupCol
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
    let skippedReasons = {
      noName: 0,
      noSku: 0,
      noPrice: 0,
      invalidPrice: 0,
      obsolete: 0
    };

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
        // Check for obsolete items
        if (discGroupCol) {
          const discGroup = String(row[discGroupCol] || '').toUpperCase();
          if (discGroup === 'OBSOLETE' || discGroup.includes('DISCONTINUED')) {
            skippedReasons.obsolete++;
            continue;
          }
        }

        const name = row[nameCol];
        const sku = skuCol ? row[skuCol] : null;
        const rawPrice = row[priceCol];
        
        // Require name, sku, and price
        if (!name || String(name).trim() === '') {
          skippedReasons.noName++;
          continue;
        }
        
        if (!sku || String(sku).trim() === '') {
          skippedReasons.noSku++;
          continue;
        }

        if (!rawPrice || rawPrice === '-' || rawPrice === '') {
          skippedReasons.noPrice++;
          continue;
        }

        // Parse price - handle various formats
        let price = 0;
        if (typeof rawPrice === 'number') {
          price = rawPrice;
        } else if (typeof rawPrice === 'string') {
          // Remove £, commas, spaces, and handle dashes
          const cleanPrice = rawPrice.replace(/[£,\s]/g, '').replace(/-/g, '');
          price = parseFloat(cleanPrice);
        }

        if (isNaN(price) || price <= 0) {
          skippedReasons.invalidPrice++;
          continue;
        }

        // Parse pack quantity
        const packQty = packCol ? (parseInt(String(row[packCol]).replace(/\D/g, '')) || 1) : 1;
        
        // Get unit type
        const unit = unitCol ? String(row[unitCol] || 'EA').trim() : 'EA';
        
        // Calculate unit price if pack > 1
        const unitPrice = packQty > 1 ? price / packQty : price;

        const brand = brandCol ? String(row[brandCol] || supplier).trim() : supplier;

        allProducts.push({
          name: String(name).trim(),
          sku: String(sku).trim(),
          price: price.toFixed(2),
          price_per_unit: packQty > 1 
            ? `£${unitPrice.toFixed(2)} per ${unit} (£${price.toFixed(2)} per pack of ${packQty})`
            : `£${price.toFixed(2)} per ${unit}`,
          brand: brand,
          supplier: supplier,
          pack_qty: packQty,
          in_stock: true,
          specifications: packQty > 1 ? `Pack of ${packQty} ${unit}` : `Single ${unit}`
        });
      }

      // Clear chunk from memory
      chunk.length = 0;
      
      console.log(`✓ Total processed: ${allProducts.length} products`);
    }

    const totalSkipped = Object.values(skippedReasons).reduce((a, b) => a + b, 0);
    console.log(`✅ Completed: ${allProducts.length} products | Skipped: ${totalSkipped} (${JSON.stringify(skippedReasons)})`);

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
