import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

async function test() {
  // Direct query to check data
  const { data, error, count } = await supabase
    .from('marketplace_products')
    .select('name, category', { count: 'exact' })
    .in('category', ['cables', 'consumer-units', 'circuit-protection', 'wiring-accessories', 'lighting', 'containment'])
    .limit(5);

  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Total materials in DB:', count);
    console.log('Sample products:');
    data?.forEach(p => console.log(' -', p.name, '|', p.category));
  }
}

test();
