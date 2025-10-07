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
    // Strict pack column detection - must be exact match, no TRADE columns
    const packCol = headers.find(h => {
      const upper = h.toUpperCase();
      if (upper.includes('TRADE')) return false;
      return packHeaders.some(ph => upper === ph.toUpperCase() || upper.includes('PACK QTY'));
    });
    const unitCol = headers.find(h => unitHeaders.some(uh => h.toUpperCase().includes(uh.toUpperCase())));
    const discGroupCol = headers.find(h => discGroupHeaders.some(dh => h.toUpperCase().includes(dh.toUpperCase())));

    // Map price columns - we'll use per-row fallback
    const priceHeaders = ['TRADE2', 'TRADE1', 'TRADE', 'Price', 'Unit Price', 'Trade Price', 'Cost', 'PRICE'];
    const potentialPriceCols = headers.filter(h => {
      const upper = h.toUpperCase();
      // Exclude SPLIT PACK columns from price detection
      if (upper.includes('SPLIT') || upper.includes('PACK')) return false;
      return priceHeaders.some(ph => upper.includes(ph.toUpperCase()));
    });

    console.log('🔍 Smart column mapping - Found potential price columns:', potentialPriceCols);

    console.log('🎯 Smart column mapping:', {
      priceColumns: potentialPriceCols,
      name: nameCol,
      sku: skuCol,
      brand: brandCol,
      pack: packCol,
      unit: unitCol,
      discGroup: discGroupCol
    });

    if (potentialPriceCols.length === 0 || !nameCol) {
      throw new Error('Could not detect required columns (price columns and product name)');
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
      
      // Parse ONLY this chunk's rows (efficient - no redundant parsing)
      const chunk = XLSX.utils.sheet_to_json(fullWorksheet, { 
        range: XLSX.utils.encode_range({
          s: { c: 0, r: startRow },
          e: { c: range.e.c, r: endRow }
        }),
        header: headers
      });

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
        
        // Require name and sku
        if (!name || String(name).trim() === '') {
          skippedReasons.noName++;
          continue;
        }
        
        if (!sku || String(sku).trim() === '') {
          skippedReasons.noSku++;
          continue;
        }

        // Per-row price fallback: try TRADE2 → TRADE1 → TRADE → PRICE
        let rawPrice = null;
        let priceSource = '';
        for (const col of potentialPriceCols) {
          const val = row[col];
          if (val && val !== '-' && val !== '') {
            rawPrice = val;
            priceSource = col;
            break;
          }
        }

        if (!rawPrice) {
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

    // Insert into materials_weekly_cache in chunks to reduce memory pressure
    const INSERT_CHUNK_SIZE = 1000; // Insert 1000 products at a time
    const productChunks = [];
    for (let i = 0; i < allProducts.length; i += INSERT_CHUNK_SIZE) {
      productChunks.push(allProducts.slice(i, i + INSERT_CHUNK_SIZE));
    }

    console.log(`💾 Inserting ${allProducts.length} products in ${productChunks.length} cache chunks...`);

    const cacheIds: string[] = [];
    for (let i = 0; i < productChunks.length; i++) {
      const chunk = productChunks[i];
      const { data: cacheEntry, error: insertError } = await supabase
        .from('materials_weekly_cache')
        .insert({
          category: 'Electrical Components',
          source: `${supplier} Trade Pricing${productChunks.length > 1 ? ` (Part ${i + 1}/${productChunks.length})` : ''}`,
          materials_data: chunk,
          total_products: chunk.length,
          last_updated: new Date().toISOString(),
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error(`Insert error for chunk ${i + 1}:`, insertError);
        throw insertError;
      }

      cacheIds.push(cacheEntry.id);
      console.log(`✅ Chunk ${i + 1}/${productChunks.length} inserted (${chunk.length} products)`);
    }

    console.log(`💾 All chunks inserted with IDs: ${cacheIds.join(', ')}`);

    // Trigger embeddings generation by supplier (picks up all chunks)
    console.log('🧠 Triggering embeddings generation in background...');
    
    const { data: embedData, error: embedError } = await supabase.functions.invoke('populate-pricing-embeddings', {
      body: { supplier }
    });

    const jobId = embedData?.job_id || null;
    if (embedError) {
      console.error('Embeddings trigger error:', embedError);
    } else {
      console.log('✅ Embeddings generation started with job_id:', jobId);
    }

    return new Response(JSON.stringify({
      success: true,
      supplier: supplier,
      cache_ids: cacheIds,
      job_id: jobId,
      products_found: allProducts.length,
      products_skipped: totalSkipped,
      total_rows: totalRows,
      chunks_created: productChunks.length,
      message: `Successfully processed ${allProducts.length} products from ${supplier} in ${productChunks.length} chunk(s). Embeddings generating in background.`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in parse-supplier-pricing:', error);
    
    // Better error messages for users
    let errorMessage = 'Failed to process Excel file';
    if (error instanceof Error) {
      if (error.message.includes('CPU')) {
        errorMessage = 'File too large - processing exceeded CPU limits. Try splitting into smaller files.';
      } else if (error.message.includes('memory')) {
        errorMessage = 'File too large - exceeded memory limits. Try splitting into smaller files.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : String(error),
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
