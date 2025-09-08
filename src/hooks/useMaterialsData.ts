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
  "Electrical Tools": "tools",
  "Fixings & Consumables": "fixings",
  "Cable Management & Conduit": "cable-management",
  "Smart Home & Controls": "smart-home",
  "Data & Networking": "data-networking",
  "Heating Controls": "heating-controls",
  "EV Charging": "ev-charging",
  "Fire & Security": "fire-security"
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
    title: "Electrical Tools",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Fluke", "Megger", "DeWalt"],
    popularItems: [],
    trending: false
  },
  {
    id: "fixings",
    title: "Fixings & Consumables",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Fischer", "Rawlplug", "Hellermann"],
    popularItems: [],
    trending: true
  },
  {
    id: "cable-management",
    title: "Cable Management & Conduit",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Marshall Tufflex", "Legrand", "Deta"],
    popularItems: [],
    trending: false
  },
  {
    id: "smart-home",
    title: "Smart Home & Controls",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Philips Hue", "Nest", "Schneider"],
    popularItems: [],
    trending: true
  },
  {
    id: "data-networking",
    title: "Data & Networking",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Panduit", "Excel", "Connectix"],
    popularItems: [],
    trending: false
  },
  {
    id: "heating-controls",
    title: "Heating Controls",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Honeywell", "Drayton", "Salus"],
    popularItems: [],
    trending: true
  },
  {
    id: "ev-charging",
    title: "EV Charging",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Zappi", "Pod Point", "Rolec"],
    popularItems: [],
    trending: true
  },
  {
    id: "fire-security",
    title: "Fire & Security",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Aico", "Apollo", "Texecom"],
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
      console.log('🔍 Fetching materials from cache-first strategy...');
      
      try {
        // First check the materials_weekly_cache table directly
        console.log('📞 Checking materials_weekly_cache table...');
        const { data: cacheEntries, error: cacheError } = await supabase
          .from('materials_weekly_cache')
          .select('materials_data, expires_at, created_at')
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false });
        
        if (!cacheError && cacheEntries && cacheEntries.length > 0) {
          // Combine all materials from different categories
          const allMaterials = cacheEntries.flatMap((entry: any) => entry.materials_data || []) as MaterialItem[];
          if (allMaterials.length > 0) {
            console.log(`✅ Got ${allMaterials.length} materials from weekly cache table`);
            const processedData = processMaterialsData(allMaterials);
            return {
              data: processedData,
              rawMaterials: allMaterials,
              fromCache: true,
              totalMaterials: allMaterials.length
            };
          }
        }
        
        // If no valid cache data, fall back to the cache function
        console.log('⚠️ No valid cache found, trying materials-weekly-cache function...');
        const { data, error } = await supabase.functions.invoke('materials-weekly-cache', {
          body: {}
        });
        
        if (!error && data && data.data && data.data.length > 0) {
          console.log(`✅ Received ${data.data?.length || 0} categories from cache function`);
          return {
            data: data.data || defaultCategoryData,
            rawMaterials: data.rawMaterials || [],
            fromCache: data.fromCache || false,
            totalMaterials: data.totalMaterials || 0
          };
        }

        // Final fallback to cables cache or defaults
        console.log('⚠️ Cache sources empty, checking cables cache...');
        const { data: cablesCache, error: cablesCacheError } = await supabase
          .from('cables_materials_cache')
          .select('product_data')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (!cablesCacheError && cablesCache?.product_data && Array.isArray(cablesCache.product_data)) {
          const materialsData = cablesCache.product_data as unknown as MaterialItem[];
          console.log(`✅ Got ${materialsData.length} materials from cables cache fallback`);
          const processedData = processMaterialsData(materialsData);
          return {
            data: processedData,
            rawMaterials: materialsData,
            fromCache: true,
            totalMaterials: materialsData.length
          };
        }

        console.log('📊 All cache sources failed, using default categories');
        return {
          data: defaultCategoryData,
          rawMaterials: [],
          fromCache: false,
          totalMaterials: 0
        };
        
      } catch (error) {
        console.error('❌ Error in fetchMaterialsData:', error);
        return {
          data: defaultCategoryData,
          rawMaterials: [],
          fromCache: false,
          totalMaterials: 0
        };
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutes - longer since we're using cache
    gcTime: 1000 * 60 * 30, // 30 minutes
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