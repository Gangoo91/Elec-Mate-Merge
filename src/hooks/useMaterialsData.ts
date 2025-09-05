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

// Updated category mapping to match backend logic
const categoryMapping: Record<string, string> = {
  "Cables & Wiring": "cables",
  "Electrical Components": "components", 
  "Protection Equipment": "protection",
  "Installation Accessories": "accessories",
  "Lighting Solutions": "lighting",
  "Testing & Tools": "tools"
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

export const useMaterialsData = () => {
  const rawQuery = useQuery({
    queryKey: ['materials-weekly-cache'],
    queryFn: async () => {
      console.log('🔍 Fetching materials via weekly cache...');
      
      const { data, error } = await supabase.functions.invoke('materials-weekly-cache', {
        body: {}
      });
      
      if (error) {
        console.error('Error fetching cached materials:', error);
        throw error;
      }
      
      const rawMaterials = data?.rawMaterials || [];
      const totalMaterials = data?.totalMaterials || 0;
      const fromCache = data?.fromCache || false;

      // Process raw materials into category data on the frontend
      const processedData = rawMaterials.length > 0 ? processMaterialsData(rawMaterials) : defaultCategoryData;

      console.log(`✅ Processed ${processedData.length} categories from ${totalMaterials} materials (cache: ${fromCache})`);
      
      return {
        data: processedData,
        rawMaterials,
        fromCache,
        totalMaterials
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour (data is cached weekly)
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch on focus since data is cached
  });

  return {
    data: rawQuery.data?.data || defaultCategoryData,
    rawMaterials: rawQuery.data?.rawMaterials || [],
    isLoading: rawQuery.isLoading,
    error: rawQuery.error,
    refetch: rawQuery.refetch,
    isRefetching: rawQuery.isRefetching,
    fromCache: rawQuery.data?.fromCache || false,
    totalMaterials: rawQuery.data?.totalMaterials || 0,
  };
};