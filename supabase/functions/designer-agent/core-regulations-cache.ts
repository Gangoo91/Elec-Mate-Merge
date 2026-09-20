/**
 * Core Regulations Cache Loader
 * Emergency fallback when RAG pipeline fails
 */

export async function loadCoreRegulationsCache(supabase: any) {
  const coreRegNumbers = [
    '433.1.1', '433.1.204', // Cable sizing fundamentals
    '525', '525.1', '525.2', // Voltage drop
    '411.3.2', '411.3.3', // Protection & RCD
    '543.1.1', '543.1.3', '543.7', // Earth fault loop
    '701.410.3.5', '701.411.3.3', // Bathroom RCD & bonding
    '522.8.10', '522.6', // Outdoor/buried cables
    '531.3.3', '531.3.4', // Protection device selection
    '559.10.3.1' // Three-phase circuits
  ];
  
  const { data, error } = await supabase
    .from('bs7671_embeddings')
    .select('*')
    .in('regulation_number', coreRegNumbers);
  
  if (error) {
    console.error('Failed to load core regulations cache:', error);
    return [];
  }
  
  return data || [];
}
