/**
 * Upload Dirty Board Photos Script
 *
 * Uploads real-world board photos to Supabase storage and adds metadata
 * to the board_reference_images table for OCR training.
 *
 * Usage:
 *   npx ts-node scripts/upload-dirty-boards.ts
 *
 * Environment variables required:
 *   SUPABASE_URL - Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service role key for admin access
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Photo metadata - classified from visual inspection
const DIRTY_BOARD_PHOTOS: Array<{
  filename: string;
  manufacturer: string;
  model_series: string | null;
  image_type: 'in_situ_dirty' | 'in_situ_clean' | 'handwritten' | 'low_light' | 'partial_view';
  description: string;
  device_types_shown: string[];
  ratings_visible: string[];
  lighting_conditions: 'good' | 'moderate' | 'poor';
  has_handwritten_labels: boolean;
  is_three_phase: boolean;
  has_pictograms: boolean;
}> = [
  {
    filename: '2f80d016-df89-4ce5-bb77-b17514a49d54.jpg',
    manufacturer: 'Contactum',
    model_series: 'Defender',
    image_type: 'in_situ_dirty',
    description: 'Contactum board with handwritten labels - COOKER, SOCKETS, SHOWER, EXTENTION SPOT LIGHTS. Dusty real-world installation.',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['B16', 'B32', '80A'],
    lighting_conditions: 'moderate',
    has_handwritten_labels: true,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: 'aff7f9cf-403b-4ce2-8f8f-8ae36fe567a8.jpg',
    manufacturer: 'Unknown',
    model_series: null,
    image_type: 'in_situ_dirty',
    description: 'Three-phase commercial distribution board with handwritten L1/L2/L3 phase labels. Grey enclosure, 100A main switch.',
    device_types_shown: ['MCB', '3-pole MCB'],
    ratings_visible: ['100A'],
    lighting_conditions: 'moderate',
    has_handwritten_labels: true,
    is_three_phase: true,
    has_pictograms: false,
  },
  {
    filename: '6138d165-3006-4692-82b2-4c9596cbc2f5.jpg',
    manufacturer: 'Siemens',
    model_series: '5SX21',
    image_type: 'in_situ_dirty',
    description: 'Siemens 12-way board with handwritten label chart. B6, B16, B20, B32 ratings visible. Main switch on right.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['B6', 'B16', 'B20', 'B32'],
    lighting_conditions: 'good',
    has_handwritten_labels: true,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: '846aef99-07ea-4907-aa50-bce1646b623d.jpg',
    manufacturer: 'Eaton',
    model_series: null,
    image_type: 'in_situ_clean',
    description: 'Three-phase commercial board "Distribution Board 2" with typed labels. L1/L2/L3 phase markings, detailed circuit descriptions.',
    device_types_shown: ['MCB', '3-pole MCB'],
    ratings_visible: ['100A'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: true,
    has_pictograms: false,
  },
  {
    filename: '3af5db5b-3a12-4a60-bcca-2c13d52ca177.jpg',
    manufacturer: 'Unknown',
    model_series: 'LN5500',
    image_type: 'low_light',
    description: 'Very old dirty board in dark cupboard. Yellowed plastic, visible old wiring colours (red/black). Handwritten labels barely visible.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['5A', '15A', '20A', '30A'],
    lighting_conditions: 'poor',
    has_handwritten_labels: true,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: 'df7cb658-5845-4f19-a5de-6cee0d1abeb0.jpg',
    manufacturer: 'MEM',
    model_series: 'Memera 2000',
    image_type: 'in_situ_dirty',
    description: 'MEM Memera 2000 legacy board. Yellowed/aged plastic, faded labels. Mix of MEM and Sector MCBs. 100A main switch.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['B6', '100A'],
    lighting_conditions: 'poor',
    has_handwritten_labels: true,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: '861e72ad-cff5-442c-a54e-592b7a96fa25.jpg',
    manufacturer: 'Wylex',
    model_series: 'NHRS504',
    image_type: 'in_situ_clean',
    description: 'Wylex NHRS504 split load board. Clean installation with RCD and MCBs visible. Important safety notice label.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['6A', '16A', '32A'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: 'c87e2762-afcf-48af-9bfa-54c6e035c190.jpg',
    manufacturer: 'Contactum',
    model_series: 'Defender',
    image_type: 'in_situ_clean',
    description: 'Contactum 11-way with pictogram labels (socket, light bulb, cooker icons). Clean new installation.',
    device_types_shown: ['MCB', 'RCBO', 'RCD'],
    ratings_visible: ['B6', 'B16', 'B32'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: false,
    has_pictograms: true,
  },
  {
    filename: '12daccbe-1723-46a5-8a5a-52ccabb63039.jpg',
    manufacturer: 'Hager',
    model_series: 'Design',
    image_type: 'in_situ_clean',
    description: 'Hager board with mains smoke/heat alarm info sticker. Grey RCDs, dual RCD split load design.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['B6', 'B16', 'B32', '63A'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: 'ca72e386-0f73-48fe-9f8c-1612464542ad.jpg',
    manufacturer: 'Chint',
    model_series: 'NX3',
    image_type: 'in_situ_dirty',
    description: 'Chint board in dusty cupboard with multiple warning stickers. Faded/aged labels. Blue RCDs visible.',
    device_types_shown: ['MCB', 'RCD'],
    ratings_visible: ['B6', 'B16', 'B32', '63A'],
    lighting_conditions: 'moderate',
    has_handwritten_labels: true,
    is_three_phase: false,
    has_pictograms: false,
  },
  {
    filename: '5c6def9a-9f64-47c3-8eb6-73889edcaf90.jpg',
    manufacturer: 'Contactum',
    model_series: 'Defender',
    image_type: 'in_situ_clean',
    description: 'Contactum 16-way with pictograms and printed labels. SPD visible at position 1. Sockets, Oven/Cooker, Lighting icons.',
    device_types_shown: ['MCB', 'RCBO', 'RCD', 'SPD'],
    ratings_visible: ['B6', 'B16', 'B32', 'C63'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: false,
    has_pictograms: true,
  },
  {
    filename: 'c44370f5-c56f-4768-88dc-2cacda8eb8d4.jpg',
    manufacturer: 'Contactum',
    model_series: 'Defender',
    image_type: 'in_situ_clean',
    description: 'Contactum with pictograms - CCTV camera, garage, socket, heat/smoke alarm icons. Yellow test buttons on RCBOs.',
    device_types_shown: ['MCB', 'RCBO', 'RCD', 'SPD'],
    ratings_visible: ['B6', 'B16', 'B32'],
    lighting_conditions: 'good',
    has_handwritten_labels: false,
    is_three_phase: false,
    has_pictograms: true,
  },
];

async function uploadDirtyBoards() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    console.log('\nTo run this script:');
    console.log('  export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    console.log('  npx ts-node scripts/upload-dirty-boards.ts');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const desktopPath = '/Users/andrewmoore/Desktop';

  console.log('=== Uploading Dirty Board Photos ===\n');

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const photo of DIRTY_BOARD_PHOTOS) {
    const filePath = path.join(desktopPath, photo.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${photo.filename} - file not found`);
      skippedCount++;
      continue;
    }

    try {
      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `training/dirty-boards/${photo.filename}`;

      // Check if already uploaded
      const { data: existingFile } = await supabase.storage
        .from('board-reference-images')
        .list('training/dirty-boards', {
          search: photo.filename,
        });

      if (existingFile && existingFile.length > 0) {
        console.log(`⏭️  Skipping ${photo.manufacturer} - already uploaded`);
        skippedCount++;
        continue;
      }

      // Upload to storage
      console.log(`📤 Uploading ${photo.manufacturer} ${photo.model_series || ''} (${photo.image_type})...`);

      const { error: uploadError } = await supabase.storage
        .from('board-reference-images')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('board-reference-images')
        .getPublicUrl(storagePath);

      // Insert metadata into board_reference_images table
      const { error: dbError } = await supabase
        .from('board_reference_images')
        .insert({
          manufacturer: photo.manufacturer,
          model_series: photo.model_series,
          image_type: photo.image_type,
          image_url: publicUrl,
          source_url: `file://${filePath}`,
          source_type: 'user_contributed',
          description: photo.description,
          device_types_shown: photo.device_types_shown,
          ratings_visible: photo.ratings_visible,
          lighting_conditions: photo.lighting_conditions,
          verified: true, // These are manually verified
          metadata: {
            has_handwritten_labels: photo.has_handwritten_labels,
            is_three_phase: photo.is_three_phase,
            has_pictograms: photo.has_pictograms,
          },
        });

      if (dbError) {
        console.error(`⚠️  Uploaded but failed to save metadata: ${dbError.message}`);
      } else {
        console.log(`✅ Uploaded ${photo.manufacturer} ${photo.model_series || ''}`);
        successCount++;
      }

    } catch (error) {
      console.error(`❌ Error with ${photo.filename}:`, error);
      errorCount++;
    }
  }

  console.log('\n=== Upload Complete ===');
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);

  // Log summary by type
  console.log('\n=== Photos by Type ===');
  const byType = DIRTY_BOARD_PHOTOS.reduce((acc, p) => {
    acc[p.image_type] = (acc[p.image_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  // Log special features
  const handwritten = DIRTY_BOARD_PHOTOS.filter(p => p.has_handwritten_labels).length;
  const threePhase = DIRTY_BOARD_PHOTOS.filter(p => p.is_three_phase).length;
  const pictograms = DIRTY_BOARD_PHOTOS.filter(p => p.has_pictograms).length;

  console.log('\n=== Special Features ===');
  console.log(`  Handwritten labels: ${handwritten}`);
  console.log(`  Three-phase boards: ${threePhase}`);
  console.log(`  With pictograms: ${pictograms}`);
}

// Run
uploadDirtyBoards().catch(console.error);
