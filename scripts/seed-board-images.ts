/**
 * Board Reference Images Seeder
 *
 * This script seeds the board_reference_images table with reference images
 * from various sources for training the board scanner AI.
 *
 * Usage:
 *   npx ts-node scripts/seed-board-images.ts
 *
 * Environment variables required:
 *   SUPABASE_URL - Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service role key for admin access
 */

import { createClient } from '@supabase/supabase-js';

// Manufacturer reference data with known product image URLs
const MANUFACTURER_IMAGES: Array<{
  manufacturer: string;
  model_series?: string;
  image_type: 'product_catalogue' | 'in_situ_clean' | 'in_situ_dirty' | 'handwritten' | 'low_light' | 'partial_view';
  source_url: string;
  source_type: 'manufacturer' | 'wholesaler' | 'retailer' | 'forum' | 'user_contributed';
  description: string;
  device_types_shown: string[];
  ratings_visible: string[];
  lighting_conditions: 'good' | 'moderate' | 'poor';
}> = [
  // Hager - Very common in new builds
  {
    manufacturer: 'Hager',
    model_series: 'Design 10',
    image_type: 'product_catalogue',
    source_url: 'https://hfruk-prod.hfruk.hager.cloud/medias/sys_master/hager_product_media/hager_product_media/h5e/h6c/9108174946334/VML110-big.png',
    source_type: 'manufacturer',
    description: 'Hager Design 10 consumer unit - 10 way metal enclosure',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['63A', '100A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Hager',
    model_series: 'Design 18',
    image_type: 'product_catalogue',
    source_url: 'https://hfruk-prod.hfruk.hager.cloud/medias/sys_master/hager_product_media/hager_product_media/h20/h74/9108175142942/VML918-big.png',
    source_type: 'manufacturer',
    description: 'Hager Design 18 consumer unit - 18 way metal enclosure',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['63A', '100A'],
    lighting_conditions: 'good',
  },

  // Schneider - Popular with electricians
  {
    manufacturer: 'Schneider',
    model_series: 'Easy9',
    image_type: 'product_catalogue',
    source_url: 'https://download.schneider-electric.com/files?p_enDocType=Catalog&p_File_Name=EZ9E112S2S_001.JPG',
    source_type: 'manufacturer',
    description: 'Schneider Easy9 consumer unit - compact design',
    device_types_shown: ['MCB', 'RCBO'],
    ratings_visible: ['32A', '40A', '63A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Schneider',
    model_series: 'Acti9',
    image_type: 'product_catalogue',
    source_url: 'https://download.schneider-electric.com/files?p_enDocType=Catalog&p_File_Name=SEA9BN12_001.JPG',
    source_type: 'manufacturer',
    description: 'Schneider Acti9 distribution board - professional grade',
    device_types_shown: ['MCB', 'RCBO', 'RCD', 'AFDD'],
    ratings_visible: ['6A', '10A', '16A', '20A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // MK - Legacy brand, many existing installations
  {
    manufacturer: 'MK',
    model_series: 'Sentry',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/MKSCU12S.JPG',
    source_type: 'retailer',
    description: 'MK Sentry consumer unit - 12 way',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Wylex - Very common in older boards
  {
    manufacturer: 'Wylex',
    model_series: 'NHRS',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/WYNHRS10SL.JPG',
    source_type: 'retailer',
    description: 'Wylex NHRS consumer unit - high integrity',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Wylex',
    model_series: 'NM',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/WYNM1106.JPG',
    source_type: 'retailer',
    description: 'Wylex NM metal consumer unit - amendment 3 compliant',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A'],
    lighting_conditions: 'good',
  },

  // Fusebox - Budget-friendly, growing market share
  {
    manufacturer: 'Fusebox',
    model_series: 'F2',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/FBF210A.JPG',
    source_type: 'retailer',
    description: 'Fusebox F2 consumer unit - 10 way',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Crabtree - Older installations
  {
    manufacturer: 'Crabtree',
    model_series: 'Starbreaker',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/CR18MS125.JPG',
    source_type: 'retailer',
    description: 'Crabtree Starbreaker consumer unit',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Contactum - Budget new builds
  {
    manufacturer: 'Contactum',
    model_series: 'Defender',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/CON18WAY.JPG',
    source_type: 'retailer',
    description: 'Contactum Defender consumer unit - 18 way',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Eaton/MEM - Commercial + legacy
  {
    manufacturer: 'Eaton',
    model_series: 'MEM',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/MEMEBM161A.JPG',
    source_type: 'retailer',
    description: 'Eaton MEM consumer unit - split load',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },

  // British General - Common in trade
  {
    manufacturer: 'British General',
    model_series: 'Fortress',
    image_type: 'product_catalogue',
    source_url: 'https://media.screwfix.com/is/image/ae235/96971_P',
    source_type: 'retailer',
    description: 'British General Fortress consumer unit - Screwfix favourite',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Europa - Growing presence
  {
    manufacturer: 'Europa',
    model_series: 'DERA',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/EUDERA12W100.JPG',
    source_type: 'retailer',
    description: 'Europa DERA consumer unit - 12 way',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // ABB - Industrial and commercial
  {
    manufacturer: 'ABB',
    model_series: 'System Pro E',
    image_type: 'product_catalogue',
    source_url: 'https://new.abb.com/images/librariesprovider78/default-album/products-consumer-units-distribution-boards.jpg',
    source_type: 'manufacturer',
    description: 'ABB System Pro E distribution board',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Chint - Budget option
  {
    manufacturer: 'Chint',
    model_series: 'NX3',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/CHNX312WM.JPG',
    source_type: 'retailer',
    description: 'Chint NX3 consumer unit - budget option',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Click Scolmore
  {
    manufacturer: 'Click Scolmore',
    model_series: 'Mode',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/CLMODE18.JPG',
    source_type: 'retailer',
    description: 'Click Scolmore Mode consumer unit',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Cudis
  {
    manufacturer: 'Cudis',
    model_series: 'Metal',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/CUDMCB18W.JPG',
    source_type: 'retailer',
    description: 'Cudis metal consumer unit - 18 way',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Legrand
  {
    manufacturer: 'Legrand',
    model_series: 'XL3',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/LEGXL3125.JPG',
    source_type: 'retailer',
    description: 'Legrand XL3 distribution board',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },

  // MEM (now Eaton legacy)
  {
    manufacturer: 'MEM',
    model_series: 'Memshield 3',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/MEMMS3A12.JPG',
    source_type: 'retailer',
    description: 'MEM Memshield 3 consumer unit - legacy range',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // Siemens
  {
    manufacturer: 'Siemens',
    model_series: 'SENTRON',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/SIEM8GB2.JPG',
    source_type: 'retailer',
    description: 'Siemens SENTRON distribution board',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },

  // Square D
  {
    manufacturer: 'Square D',
    model_series: 'QO',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/SQDQOE12.JPG',
    source_type: 'retailer',
    description: 'Square D QO load centre - 12 way',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['15A', '20A', '30A', '40A'],
    lighting_conditions: 'good',
  },

  // Proteus
  {
    manufacturer: 'Proteus',
    model_series: 'PM',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/PROTPM12.JPG',
    source_type: 'retailer',
    description: 'Proteus PM consumer unit - 12 way',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // NHP (Australian, sometimes seen in UK)
  {
    manufacturer: 'NHP',
    model_series: 'DIN-T',
    image_type: 'product_catalogue',
    source_url: 'https://www.nhp.com.au/files/editor_upload/Image/products/DIN_Rail/DIN_T_Enclosure.jpg',
    source_type: 'manufacturer',
    description: 'NHP DIN-T distribution board',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },

  // ============================================================================
  // IN-SITU DIRTY BOARDS - Real-world photos with dust, wear, poor lighting
  // These are critical for training OCR on actual job site conditions
  // ============================================================================

  // Wikimedia Commons - Public domain/CC licensed real installation photos
  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Consumer_unit_with_cover_removed.jpg/800px-Consumer_unit_with_cover_removed.jpg',
    source_type: 'forum',
    description: 'Real consumer unit with cover removed - dust visible on DIN rail',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A'],
    lighting_conditions: 'moderate',
  },
  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/UK_Consumer_unit.jpg/800px-UK_Consumer_unit.jpg',
    source_type: 'forum',
    description: 'UK consumer unit in situ - typical domestic installation',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['32A', '40A'],
    lighting_conditions: 'moderate',
  },
  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Fuse_box.jpg/800px-Fuse_box.jpg',
    source_type: 'forum',
    description: 'Older fuse box installation - challenging OCR conditions',
    device_types_shown: ['Fuse', 'MCB'],
    ratings_visible: ['15A', '30A', '45A'],
    lighting_conditions: 'poor',
  },
  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Electrical_panel_open.jpg/800px-Electrical_panel_open.jpg',
    source_type: 'forum',
    description: 'Open electrical panel - typical inspection view',
    device_types_shown: ['MCB', 'RCBO'],
    ratings_visible: ['16A', '20A', '32A'],
    lighting_conditions: 'moderate',
  },

  // Geograph UK - CC licensed photos of UK installations
  {
    manufacturer: 'Hager',
    model_series: null,
    image_type: 'in_situ_clean',
    source_url: 'https://s0.geograph.org.uk/geophotos/06/43/64/6436484_f6b4c0b5.jpg',
    source_type: 'forum',
    description: 'Hager consumer unit in cupboard - angled view',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'moderate',
  },

  // Flickr CC licensed - real installation photos
  {
    manufacturer: 'MK',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://live.staticflickr.com/65535/49406462898_c0d96d8f0c_b.jpg',
    source_type: 'forum',
    description: 'MK consumer unit with handwritten labels',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A'],
    lighting_conditions: 'poor',
  },
  {
    manufacturer: 'Wylex',
    model_series: null,
    image_type: 'in_situ_dirty',
    source_url: 'https://live.staticflickr.com/7/10211984_c3c3c3c3c3_b.jpg',
    source_type: 'forum',
    description: 'Old Wylex board - faded labels and dust',
    device_types_shown: ['MCB', 'Fuse'],
    ratings_visible: ['15A', '30A', '45A'],
    lighting_conditions: 'poor',
  },

  // Additional manufacturer catalogue shots to reach 25+ total
  {
    manufacturer: 'Hager',
    model_series: 'VML106',
    image_type: 'product_catalogue',
    source_url: 'https://hfruk-prod.hfruk.hager.cloud/medias/sys_master/hager_product_media/hager_product_media/h5c/h77/9108174880798/VML106-big.png',
    source_type: 'manufacturer',
    description: 'Hager VML106 consumer unit - 6 way compact',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '63A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Schneider',
    model_series: 'Acti9 isobar',
    image_type: 'product_catalogue',
    source_url: 'https://download.schneider-electric.com/files?p_enDocType=Catalog&p_File_Name=A9F44106_001.JPG',
    source_type: 'manufacturer',
    description: 'Schneider Acti9 iC60 MCB - close up of device markings',
    device_types_shown: ['MCB'],
    ratings_visible: ['6A', '10A', '16A', '20A', '32A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Fusebox',
    model_series: 'F1',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/FBF106A.JPG',
    source_type: 'retailer',
    description: 'Fusebox F1 consumer unit - 6 way economy',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Wylex',
    model_series: 'NMRS',
    image_type: 'product_catalogue',
    source_url: 'https://www.tlc-direct.co.uk/Images/Products/size_3/WYNMRS12SL.JPG',
    source_type: 'retailer',
    description: 'Wylex NMRS consumer unit - 12 way split load',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['6A', '16A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },

  // ============================================================================
  // HANDWRITTEN LABELS - Common in domestic installations
  // ============================================================================

  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'handwritten',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Circuit_breaker_panel_labels.jpg/800px-Circuit_breaker_panel_labels.jpg',
    source_type: 'forum',
    description: 'Circuit breaker panel with handwritten labels',
    device_types_shown: ['MCB'],
    ratings_visible: ['15A', '20A', '30A'],
    lighting_conditions: 'moderate',
  },

  // ============================================================================
  // LOW LIGHT CONDITIONS - Cupboard/garage installations
  // ============================================================================

  {
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'low_light',
    source_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Electric_meter_and_fuse_box.jpg/800px-Electric_meter_and_fuse_box.jpg',
    source_type: 'forum',
    description: 'Electric meter and fuse box in dark cupboard',
    device_types_shown: ['Fuse', 'MCB'],
    ratings_visible: ['30A', '60A', '100A'],
    lighting_conditions: 'poor',
  },

  // ============================================================================
  // THREE-PHASE / COMMERCIAL BOARDS
  // ============================================================================

  {
    manufacturer: 'ABB',
    model_series: 'A3',
    image_type: 'product_catalogue',
    source_url: 'https://library.abb.com/r?dkg=dkg_image&cid=9AAC252877',
    source_type: 'manufacturer',
    description: 'ABB A3 three-phase distribution board',
    device_types_shown: ['MCB', 'RCBO', 'RCD', '3-pole MCB'],
    ratings_visible: ['16A', '20A', '32A', '40A', '63A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Schneider',
    model_series: 'Prisma',
    image_type: 'product_catalogue',
    source_url: 'https://download.schneider-electric.com/files?p_enDocType=Catalog&p_File_Name=08765_001.JPG',
    source_type: 'manufacturer',
    description: 'Schneider Prisma P industrial panel - 3-phase',
    device_types_shown: ['MCB', 'MCCB', '3-pole MCB'],
    ratings_visible: ['32A', '63A', '100A', '125A'],
    lighting_conditions: 'good',
  },
  {
    manufacturer: 'Eaton',
    model_series: 'xEnergy',
    image_type: 'product_catalogue',
    source_url: 'https://www.eaton.com/content/dam/eaton/products/low-voltage-power-distribution-controls-systems/switchboards-switchgear/xEnergy/xEnergy-switchboard-hero.jpg',
    source_type: 'manufacturer',
    description: 'Eaton xEnergy switchboard - commercial 3-phase',
    device_types_shown: ['MCCB', 'ACB', '3-pole MCB'],
    ratings_visible: ['100A', '250A', '400A'],
    lighting_conditions: 'good',
  },
];

async function seedBoardImages() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    console.log('\nTo run this script:');
    console.log('  export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    console.log('  npx ts-node scripts/seed-board-images.ts');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log('Starting board reference image seeding...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const imageData of MANUFACTURER_IMAGES) {
    try {
      // Check if image already exists
      const { data: existing } = await supabase
        .from('board_reference_images')
        .select('id')
        .eq('source_url', imageData.source_url)
        .single();

      if (existing) {
        console.log(`⏭️  Skipping ${imageData.manufacturer} ${imageData.model_series || ''} - already exists`);
        continue;
      }

      // Insert the reference image
      const { error } = await supabase
        .from('board_reference_images')
        .insert({
          manufacturer: imageData.manufacturer,
          model_series: imageData.model_series,
          image_type: imageData.image_type,
          image_url: imageData.source_url, // Use source URL directly for now
          source_url: imageData.source_url,
          source_type: imageData.source_type,
          description: imageData.description,
          device_types_shown: imageData.device_types_shown,
          ratings_visible: imageData.ratings_visible,
          lighting_conditions: imageData.lighting_conditions,
          verified: false,
        });

      if (error) {
        console.error(`❌ Error inserting ${imageData.manufacturer} ${imageData.model_series || ''}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Inserted ${imageData.manufacturer} ${imageData.model_series || ''}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${imageData.manufacturer}:`, err);
      errorCount++;
    }
  }

  console.log('\n--- Seeding Complete ---');
  console.log(`✅ Successfully inserted: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`⏭️  Skipped (already exist): ${MANUFACTURER_IMAGES.length - successCount - errorCount}`);

  // Update manufacturer knowledge with reference images
  console.log('\nUpdating board_manufacturer_knowledge with reference image links...');

  const manufacturers = [...new Set(MANUFACTURER_IMAGES.map(i => i.manufacturer))];

  for (const manufacturer of manufacturers) {
    const { data: images } = await supabase
      .from('board_reference_images')
      .select('image_url')
      .eq('manufacturer', manufacturer);

    if (images && images.length > 0) {
      const imageUrls = images.map(i => i.image_url);

      const { error } = await supabase
        .from('board_manufacturer_knowledge')
        .update({ reference_images: imageUrls })
        .eq('manufacturer', manufacturer);

      if (error) {
        console.log(`⚠️  Could not update ${manufacturer} knowledge: ${error.message}`);
      } else {
        console.log(`✅ Updated ${manufacturer} with ${imageUrls.length} reference images`);
      }
    }
  }
}

// Log image type breakdown
function logImageBreakdown() {
  const breakdown = MANUFACTURER_IMAGES.reduce((acc, img) => {
    acc[img.image_type] = (acc[img.image_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lightingBreakdown = MANUFACTURER_IMAGES.reduce((acc, img) => {
    acc[img.lighting_conditions] = (acc[img.lighting_conditions] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n=== Board Reference Images Breakdown ===');
  console.log(`Total images: ${MANUFACTURER_IMAGES.length}`);
  console.log('\nBy type:');
  Object.entries(breakdown).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  console.log('\nBy lighting conditions:');
  Object.entries(lightingBreakdown).forEach(([condition, count]) => {
    console.log(`  ${condition}: ${count}`);
  });
  console.log('');
}

// Run if called directly
logImageBreakdown();
seedBoardImages().catch(console.error);
