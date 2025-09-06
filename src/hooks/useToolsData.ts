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
  console.log('🔧 Fetching live tool data via React Query...');
  
  const { data, error } = await supabase.functions.invoke('firecrawl-tools-scraper');
  
  if (error) {
    console.error('❌ Error fetching tools:', error);
    throw new Error(error.message || 'Failed to fetch tools data');
  }

  if (Array.isArray(data) && data.length > 0) {
    // Transform the data to ensure consistent interface
    const transformedTools = data.map((tool: any, index: number) => ({
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

    console.log(`✅ Transformed ${transformedTools.length} tools`);
    return transformedTools;
  }

  console.log('📊 No tools data received');
  return [];
};

export const useToolsData = () => {
  return useQuery({
    queryKey: ['tools', 'firecrawl-data'],
    queryFn: fetchToolsData,
    staleTime: 30 * 60 * 1000, // 30 minutes - tool data doesn't change frequently
    gcTime: 60 * 60 * 1000, // 1 hour cache time
    retry: 2,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnReconnect: false, // Prevent refetch on network reconnect
  });
};