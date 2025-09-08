import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ToolItem {
  id?: number;
  name: string;
  category?: string;
  price: string;
  supplier?: string;
  image?: string;
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  view_product_url?: string;
  productUrl?: string;
  description?: string;
  reviews?: string;
}

const fetchToolsData = async (): Promise<ToolItem[]> => {
  console.log('🔧 Fetching tools data from tools cache...');
  
  const { data, error } = await supabase
    .from('tools_weekly_cache' as any)
    .select('tools_data')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error) {
    console.error('❌ Error fetching cached tools:', error);
    throw new Error(error.message || 'Failed to fetch cached tools data');
  }

  if ((data as any)?.tools_data && Array.isArray((data as any).tools_data)) {
    // Transform the cached data to ensure consistent interface
    const transformedTools = (data as any).tools_data.map((tool: any, index: number) => ({
      id: tool.id || index + 1000,
      name: tool.name || 'Unknown Tool',
      category: tool.category || 'Tools',
      price: tool.price || '£0.00',
      supplier: tool.supplier || 'Screwfix',
      image: tool.image || '/placeholder.svg',
      stockStatus: tool.stockStatus || 'In Stock' as const,
      isOnSale: tool.isOnSale || false,
      salePrice: tool.salePrice,
      highlights: tool.highlights || [],
      productUrl: tool.view_product_url || tool.productUrl,
      description: tool.description,
      reviews: tool.reviews
    }));

    console.log(`✅ Loaded ${transformedTools.length} tools from cache`);
    return transformedTools;
  }

  console.log('📊 No cached tools data found');
  return [];
};

export const useToolsData = () => {
  return useQuery({
    queryKey: ['tools', 'cache-data'],
    queryFn: fetchToolsData,
    staleTime: 5 * 60 * 1000, // 5 minutes - allow more frequent updates
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 2,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnReconnect: false, // Prevent refetch on network reconnect
  });
};