import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToolsDeals } from './useToolsDeals';

export interface ToolItem {
  id?: number;
  name: string;
  category?: string;
  price: string;
  supplier?: string;
  brand?: string;
  image?: string;
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  originalPrice?: string; // Competitor's higher price for comparison
  competitorCount?: number; // Number of competitors found
  highlights?: string[];
  view_product_url?: string;
  productUrl?: string;
  description?: string;
  reviews?: string;
}

// Tool categories in marketplace_products
const TOOL_CATEGORIES = ['power-tools', 'hand-tools', 'test-equipment', 'tool-storage'];

const fetchToolsData = async (): Promise<ToolItem[]> => {
  console.log('🔧 Fetching tools data from marketplace_products...');

  // Fetch only TOOLS from marketplace_products (filter by tool categories)
  const { data, error } = await supabase
    .from('marketplace_products')
    .select('id, name, brand, category, current_price, regular_price, is_on_sale, discount_percentage, image_url, product_url, stock_status, description, highlights')
    .in('category', TOOL_CATEGORIES)
    .order('current_price', { ascending: true });

  if (error) {
    console.error('❌ Error fetching marketplace products:', error);
    throw new Error(error.message || 'Failed to fetch marketplace products');
  }

  if (!data || data.length === 0) {
    console.log('📊 No marketplace products found');
    return [];
  }

  console.log(`✅ Found ${data.length} products in marketplace`);

  // Transform marketplace_products to ToolItem format
  const allTools: ToolItem[] = data.map((product: any, index: number) => {
    // Derive supplier from product URL
    const supplier = product.product_url?.includes('toolstation') ? 'Toolstation'
                   : product.product_url?.includes('screwfix') ? 'Screwfix'
                   : product.product_url?.includes('cef') ? 'CEF'
                   : product.product_url?.includes('edmundson') ? 'Edmundson'
                   : 'Unknown';

    // Format price as string with £
    const formatPrice = (price: number | string | null) => {
      if (!price) return '£0.00';
      const num = typeof price === 'string' ? parseFloat(price) : price;
      return `£${num.toFixed(2)}`;
    };

    return {
      id: index + 1,
      name: product.name || 'Unknown Product',
      category: product.category || 'Tools',
      price: formatPrice(product.current_price),
      supplier,
      brand: product.brand,
      image: product.image_url || '/placeholder.svg',
      stockStatus: (product.stock_status || 'In Stock') as 'In Stock' | 'Out of Stock' | 'Low Stock',
      isOnSale: product.is_on_sale || false,
      salePrice: product.is_on_sale ? formatPrice(product.current_price) : undefined,
      originalPrice: product.regular_price ? formatPrice(product.regular_price) : undefined,
      highlights: product.highlights || [],
      productUrl: product.product_url,
      description: product.description,
    };
  });

  console.log(`✅ Total tools loaded: ${allTools.length}`);
  return allTools;
};

export const useToolsData = () => {
  const query = useQuery({
    queryKey: ['tools', 'cache-data'],
    queryFn: fetchToolsData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const dealsData = useToolsDeals(query.data || []);

  return {
    ...query,
    data: dealsData.tools,
    deals: dealsData.deals,
    dealOfTheDay: dealsData.dealOfTheDay,
    topDiscounts: dealsData.topDiscounts,
    dealsCount: dealsData.dealsCount
  };
};