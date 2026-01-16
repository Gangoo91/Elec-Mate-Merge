import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

async function check() {
  const { data, error } = await supabase
    .from('marketplace_suppliers')
    .select('slug, name, last_scraped_at, scrape_enabled')
    .order('name');

  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Suppliers:');
    data?.forEach(s => {
      const lastScraped = s.last_scraped_at ? new Date(s.last_scraped_at).toLocaleString() : 'Never';
      console.log(`  ${s.slug}: ${s.name} - Last scraped: ${lastScraped}`);
    });
  }
}

check();
