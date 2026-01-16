import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

async function test() {
  console.log('Testing edge function with productType=materials...\n');

  const { data, error } = await supabase.functions.invoke('marketplace-search', {
    body: {
      productType: 'materials',
      page: 1,
      pageSize: 5
    }
  });

  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Total returned:', data.total);
    console.log('Products returned:', data.products?.length);
    if (data.products?.[0]) {
      console.log('\nSample products:');
      data.products.forEach((p: any) => console.log(' -', p.name, '|', p.category));
    }
  }
}

test();
