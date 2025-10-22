import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { enhancedMaterials, EnhancedMaterialItem } from '@/data/electrician/enhancedPricingData';

export interface LiveMaterialItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  supplierPrice: number;
  yourPrice: number; // With markup applied
  supplier: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  productUrl?: string;
  code?: string;
  brand?: string;
  isLive: boolean; // True if from cache, false if fallback
  lastUpdated?: string;
}

const fetchLiveMaterialsData = async (): Promise<LiveMaterialItem[]> => {
  console.log('🔍 Fetching live materials pricing from cache...');
  
  try {
    // Fetch from materials_weekly_cache
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('materials_data, category, created_at')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('❌ Error fetching cached materials:', error);
      throw error;
    }

    if (!data || data.length === 0 || !data[0].materials_data) {
      console.log('📊 No cached materials found, using static fallback');
      return transformStaticMaterials();
    }

    const cacheData = data[0];
    const materialsData = cacheData.materials_data as any[];
    
    if (!Array.isArray(materialsData)) {
      console.log('⚠️ Invalid materials data format, using static fallback');
      return transformStaticMaterials();
    }
    
    console.log(`✅ Found ${materialsData.length} cached materials from ${cacheData.created_at}`);

    // Transform cached materials to LiveMaterialItem format
    const liveMaterials = materialsData.map((item: any, index: number) => {
      const priceMatch = item.price?.match(/£?(\d+\.?\d*)/);
      const supplierPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
      
      return {
        id: item.id?.toString() || `live-${index}`,
        name: item.name || 'Unknown Material',
        category: mapScrapedCategoryToQuoteCategory(item.category || 'materials'),
        subcategory: item.category || 'General',
        unit: 'each', // Default to 'each', could be enhanced
        supplierPrice,
        yourPrice: supplierPrice, // No markup by default, applied in UI
        supplier: item.supplier || 'Unknown',
        stockStatus: item.stockStatus || 'In Stock',
        productUrl: item.view_product_url || item.productUrl,
        code: item.code,
        brand: item.brand,
        isLive: true,
        lastUpdated: cacheData.created_at
      } as LiveMaterialItem;
    });

    // Filter out items with invalid prices
    return liveMaterials.filter(m => m.supplierPrice > 0);
  } catch (error) {
    console.error('Failed to fetch live materials, using static fallback:', error);
    return transformStaticMaterials();
  }
};

// Transform static enhanced materials as fallback
const transformStaticMaterials = (): LiveMaterialItem[] => {
  return enhancedMaterials.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    subcategory: item.subcategory,
    unit: item.unit,
    supplierPrice: item.defaultPrice,
    yourPrice: item.defaultPrice,
    supplier: item.brand || 'Trade',
    stockStatus: 'In Stock',
    code: item.code,
    brand: item.brand,
    isLive: false,
    lastUpdated: item.lastUpdated
  }));
};

// Map scraped categories to quote builder categories
const mapScrapedCategoryToQuoteCategory = (scrapedCategory: string): string => {
  const lowerCategory = scrapedCategory.toLowerCase();
  
  if (lowerCategory.includes('cable') || lowerCategory.includes('wire')) {
    return 'cables';
  }
  if (lowerCategory.includes('socket') || lowerCategory.includes('switch') || lowerCategory.includes('accessory')) {
    return 'accessories';
  }
  if (lowerCategory.includes('consumer') || lowerCategory.includes('mcb') || lowerCategory.includes('rcbo') || lowerCategory.includes('rcd')) {
    return 'distribution';
  }
  if (lowerCategory.includes('light') || lowerCategory.includes('led') || lowerCategory.includes('downlight')) {
    return 'lighting';
  }
  if (lowerCategory.includes('conduit') || lowerCategory.includes('trunking') || lowerCategory.includes('containment')) {
    return 'containment';
  }
  
  return 'materials';
};

export const useLiveMaterialsPricing = () => {
  return useQuery({
    queryKey: ['live-materials-pricing'],
    queryFn: fetchLiveMaterialsData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// Helper function to apply markup
export const applyMarkup = (supplierPrice: number, markupPercent: number): number => {
  return supplierPrice * (1 + markupPercent / 100);
};
