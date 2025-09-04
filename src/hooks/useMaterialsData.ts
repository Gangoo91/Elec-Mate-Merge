import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MaterialItem {
  id?: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  searched_product: string;
  productUrl?: string;
  view_product_url?: string;
  highlights?: string[];
  description?: string;
  reviews?: string;
}

export interface ProcessedCategoryData {
  id: string;
  title: string;
  productCount: number;
  priceRange: string;
  topBrands: string[];
  popularItems: Array<{
    name: string;
    price: string;
    rating: number;
    sales?: number;
  }>;
  trending: boolean;
}

const categoryMapping = {
  "Cables & Wiring": "cables",
  "Electrical Components": "components", 
  "Protection Equipment": "protection",
  "Installation Accessories": "accessories",
  "Lighting Solutions": "lighting",
  "Electrical Tools": "tools"
};

const defaultCategoryData: ProcessedCategoryData[] = [
  {
    id: "cables",
    title: "Cables & Wiring",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Prysmian", "Nexans", "Excel"],
    popularItems: [],
    trending: true
  },
  {
    id: "components", 
    title: "Electrical Components",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Schneider", "Hager", "Wylex"],
    popularItems: [],
    trending: false
  },
  {
    id: "protection",
    title: "Protection Equipment",
    productCount: 0,
    priceRange: "Loading...", 
    topBrands: ["Furse", "Dehn", "Phoenix"],
    popularItems: [],
    trending: true
  },
  {
    id: "accessories",
    title: "Installation Accessories", 
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Wiska", "Gewiss", "Marshall Tufflex"],
    popularItems: [],
    trending: false
  },
  {
    id: "lighting",
    title: "Lighting Solutions",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Ansell", "Kosnic", "Aurora"],
    popularItems: [],
    trending: true
  },
  {
    id: "tools",
    title: "Testing & Tools",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Fluke", "Megger", "Kewtech"],
    popularItems: [],
    trending: false
  }
];

function extractPriceNumber(priceStr: string): number {
  const match = priceStr.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

function processMaterialsData(materials: MaterialItem[]): ProcessedCategoryData[] {
  if (!materials || materials.length === 0) {
    return defaultCategoryData;
  }

  return defaultCategoryData.map(defaultCategory => {
    const categoryMaterials = materials.filter(material => {
      const mappedId = categoryMapping[material.category as keyof typeof categoryMapping];
      return mappedId === defaultCategory.id;
    });

    if (categoryMaterials.length === 0) {
      return defaultCategory;
    }

    // Calculate price range
    const prices = categoryMaterials
      .map(m => extractPriceNumber(m.price))
      .filter(p => p > 0);
    
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const priceRange = prices.length > 0 ? `£${minPrice} - £${maxPrice}` : "Price on request";

    // Extract suppliers as brands
    const suppliers = [...new Set(categoryMaterials.map(m => m.supplier))];
    const topBrands = suppliers.slice(0, 4);

    // Get popular items (top 3 by price relevance)
    const popularItems = categoryMaterials
      .slice(0, 3)
      .map(material => ({
        name: material.name,
        price: material.price,
        rating: 4.5 + Math.random() * 0.4, // Simulate rating between 4.5-4.9
        sales: Math.floor(Math.random() * 200) + 50 // Simulate sales data
      }));

    return {
      ...defaultCategory,
      productCount: categoryMaterials.length,
      priceRange,
      topBrands: topBrands.length > 0 ? topBrands : defaultCategory.topBrands,
      popularItems
    };
  });
}

// Cache-first approach using weekly cache
const fetchMaterialsFromCache = async (category?: string, supplier?: string, searchTerm?: string): Promise<{ data: ProcessedCategoryData[]; rawMaterials: MaterialItem[] }> => {
  console.log('🔧 Fetching materials with cache-first strategy...');
  
  const { data, error } = await supabase.functions.invoke('materials-weekly-cache', {
    body: { category, supplier, searchTerm }
  });
  
  if (error) {
    console.error('❌ Error fetching materials from cache:', error);
    throw new Error(error.message || 'Failed to fetch materials data');
  }

  console.log(`✅ Materials fetched from ${data.source} with ${data.materials?.length || 0} items`);
  
  if (data.success && data.materials && Array.isArray(data.materials)) {
    const processed = processMaterialsData(data.materials);
    return {
      data: processed,
      rawMaterials: data.materials
    };
  }

  console.log('📊 No materials data received');
  return { data: defaultCategoryData, rawMaterials: [] };
};

export const useMaterialsData = (category?: string, supplier?: string, searchTerm?: string) => {
  const query = useQuery({
    queryKey: ['materials', 'weekly-cache', category, supplier, searchTerm],
    queryFn: () => fetchMaterialsFromCache(category, supplier, searchTerm),
    staleTime: 60 * 60 * 1000, // 1 hour (longer since we have weekly cache)
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
    refetchOnWindowFocus: false, // Disable since we have weekly cache
    refetchOnReconnect: true,
  });

  return {
    data: query.data?.data || defaultCategoryData,
    rawMaterials: query.data?.rawMaterials || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};