import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const MATERIALS = ['cables', 'consumer-units', 'circuit-protection', 'wiring-accessories', 'lighting', 'containment', 'earthing', 'fire-security', 'ev-charging', 'data-networking', 'fixings'];
const TOOLS = ['hand-tools', 'power-tools', 'test-equipment', 'ppe', 'tool-storage'];

async function main() {
  // Get counts by category using RPC or multiple queries
  const counts: Record<string, number> = {};
  const allCategories = [...MATERIALS, ...TOOLS];

  for (const cat of allCategories) {
    const { count, error } = await supabase
      .from('marketplace_products')
      .select('*', { count: 'exact', head: true })
      .eq('category', cat);

    if (error) {
      console.error(`Error getting ${cat}:`, error);
      continue;
    }
    counts[cat] = count || 0;
  }

  console.log('\n📊 Products by Category:');
  console.log('========================\n');

  let materialsTotal = 0;
  let toolsTotal = 0;

  console.log('MATERIALS:');
  for (const cat of MATERIALS) {
    const count = counts[cat] || 0;
    materialsTotal += count;
    if (count > 0) console.log(`  ${cat}: ${count}`);
  }
  console.log(`  TOTAL MATERIALS: ${materialsTotal}`);

  console.log('\nTOOLS:');
  for (const cat of TOOLS) {
    const count = counts[cat] || 0;
    toolsTotal += count;
    if (count > 0) console.log(`  ${cat}: ${count}`);
  }
  console.log(`  TOTAL TOOLS: ${toolsTotal}`);

  console.log('\n📈 Summary:');
  console.log(`  Materials: ${materialsTotal}`);
  console.log(`  Tools: ${toolsTotal}`);
  console.log(`  Total: ${materialsTotal + toolsTotal}`);
}

main();
