#!/usr/bin/env tsx
/**
 * Test Supabase connection and check if marketplace tables exist
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function testConnection() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('🔍 Testing Supabase connection...\n');

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables:');
    if (!supabaseUrl) console.error('   - SUPABASE_URL');
    if (!supabaseKey) console.error('   - SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  console.log(`📡 URL: ${supabaseUrl}`);
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test 1: Check suppliers table
  console.log('\n📋 Checking marketplace_suppliers...');
  const { data: suppliers, error: supplierError } = await supabase
    .from('marketplace_suppliers')
    .select('slug, name, scrape_enabled')
    .order('name');

  if (supplierError) {
    console.error('❌ Error:', supplierError.message);
    console.log('\n⚠️  Tables may not exist. Run the migration:');
    console.log('   Go to: https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/sql/new');
    console.log('   Paste contents of: supabase/migrations/20260115120000_marketplace_tables.sql');
    process.exit(1);
  }

  console.log('✅ Found suppliers:');
  suppliers?.forEach(s => {
    console.log(`   ${s.scrape_enabled ? '🟢' : '⚪'} ${s.name} (${s.slug})`);
  });

  // Test 2: Check products count
  console.log('\n📦 Checking marketplace_products...');
  const { count: productCount, error: productError } = await supabase
    .from('marketplace_products')
    .select('*', { count: 'exact', head: true });

  if (productError) {
    console.error('❌ Error:', productError.message);
  } else {
    console.log(`✅ Products in database: ${productCount || 0}`);
  }

  // Test 3: Check deals count
  console.log('\n🏷️  Checking marketplace_deals...');
  const { count: dealCount, error: dealError } = await supabase
    .from('marketplace_deals')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  if (dealError) {
    console.error('❌ Error:', dealError.message);
  } else {
    console.log(`✅ Active deals: ${dealCount || 0}`);
  }

  // Test 4: Check coupons count
  console.log('\n🎟️  Checking marketplace_coupon_codes...');
  const { count: couponCount, error: couponError } = await supabase
    .from('marketplace_coupon_codes')
    .select('*', { count: 'exact', head: true });

  if (couponError) {
    console.error('❌ Error:', couponError.message);
  } else {
    console.log(`✅ Coupon codes: ${couponCount || 0}`);
  }

  console.log('\n========================================');
  console.log('✅ Connection test complete!');
  console.log('========================================\n');

  if ((productCount || 0) === 0) {
    console.log('💡 No products yet. Run a scrape to populate:');
    console.log('   npm run scrape:all');
  }
}

testConnection().catch(console.error);
