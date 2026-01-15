#!/usr/bin/env node
/**
 * Apply marketplace tables migration directly to Supabase
 * Run with: node scripts/apply-migration.js
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function applyMigration() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    console.log('   Add these to your .env file');
    process.exit(1);
  }

  console.log('🔄 Connecting to Supabase...');
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check if tables already exist
  const { data: existingTable } = await supabase
    .from('marketplace_suppliers')
    .select('id')
    .limit(1);

  if (existingTable !== null) {
    console.log('✅ Marketplace tables already exist!');

    // Check supplier count
    const { count } = await supabase
      .from('marketplace_suppliers')
      .select('*', { count: 'exact', head: true });

    console.log(`   Found ${count} suppliers configured`);
    return;
  }

  console.log('📦 Tables not found, applying migration...');

  // Read migration file
  const migrationPath = path.resolve(__dirname, '../../..', 'supabase/migrations/20260115120000_marketplace_tables.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  const migrationSql = fs.readFileSync(migrationPath, 'utf-8');

  // Split into statements and execute
  // Note: This is a simplified approach - for complex migrations, use Supabase CLI
  console.log('⚠️  Cannot apply migration directly via JS client.');
  console.log('   Please run this SQL in Supabase Dashboard SQL Editor:');
  console.log('   https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/sql/new');
  console.log('');
  console.log('   Or use: npx supabase db push');

  process.exit(0);
}

applyMigration().catch(console.error);
