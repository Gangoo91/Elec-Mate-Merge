import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { productsBySupplier } from '@/data/electrician/productData';

export interface MaterialItem {
  id?: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  searched_product?: string;
  productUrl?: string;
  view_product_url?: string;
  highlights?: string[];
  description?: string;
  reviews?: string;
  salePrice?: string;
  isOnSale?: boolean;
  stockStatus?: string;
  discount?: number;
  inStock?: boolean;
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

// Updated category mapping to match backend logic (All 12 Categories)
const categoryMapping: Record<string, string> = {
  "Cables & Wiring": "cables",
  "Electrical Components": "components", 
  "Protection Equipment": "protection",
  "Installation Accessories": "accessories",
  "Lighting Solutions": "lighting",
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
    id: "fixings",
    title: "Fixings & Consumables",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Fischer", "Rawlplug", "Hellermann"],
    popularItems: [],
    trending: false
  },
  {
    id: "cable-management",
    title: "Cable Management & Conduit",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Marshall Tufflex", "Schneider", "Legrand"],
    popularItems: [],
    trending: false
  },
  {
    id: "smart-home",
    title: "Smart Home & Controls",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Schneider Wiser", "Hive", "Lightwave"],
    popularItems: [],
    trending: true
  },
  {
    id: "data-networking",
    title: "Data & Networking",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Excel", "Panduit", "CommScope"],
    popularItems: [],
    trending: true
  },
  {
    id: "heating-controls",
    title: "Heating Controls",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Honeywell", "Danfoss", "Nest"],
    popularItems: [],
    trending: false
  },
  {
    id: "ev-charging",
    title: "EV Charging",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Pod Point", "Zappi", "Rolec"],
    popularItems: [],
    trending: true
  },
  {
    id: "fire-security",
    title: "Fire & Security",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Aico", "Honeywell", "Texecom"],
    popularItems: [],
    trending: false
  }
];

function extractPriceNumber(priceStr: string): number {
  const match = priceStr.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

// Simple function to add stock status if missing
function ensureStockStatus(materials: MaterialItem[]): MaterialItem[] {
  return materials.map(material => ({
    ...material,
    stockStatus: material.stockStatus || (material.inStock !== false ? 'In Stock' : 'Out of Stock')
  }));
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

// Material categories in marketplace_products (excludes tool categories)
const MATERIAL_CATEGORIES = [
  'lighting', 'circuit-protection', 'wiring-accessories', 'containment',
  'cables', 'fixings', 'ppe', 'fire-security', 'data-networking',
  'consumer-units', 'ev-charging', 'earthing'
];

// Map marketplace_products categories to our display categories
const marketplaceToCategoryMap: Record<string, string> = {
  'cables': 'cables',
  'lighting': 'lighting',
  'fixings': 'fixings',
  'fire-security': 'fire-security',
  'data-networking': 'data-networking',
  'ev-charging': 'ev-charging',
  'circuit-protection': 'protection',
  'wiring-accessories': 'accessories',
  'containment': 'cable-management',
  'consumer-units': 'components',
  'ppe': 'protection',
  'earthing': 'components'
};

export const useMaterialsData = () => {
  const rawQuery = useQuery({
    queryKey: ['comprehensive-materials'],
    queryFn: async () => {
      console.log('🔍 Fetching materials from marketplace_products...');

      try {
        // Fetch MATERIALS from marketplace_products (filter by material categories)
        const { data, error } = await supabase
          .from('marketplace_products')
          .select('id, name, brand, category, current_price, regular_price, is_on_sale, discount_percentage, image_url, product_url, stock_status, description, highlights')
          .in('category', MATERIAL_CATEGORIES)
          .order('current_price', { ascending: true });

        if (error) {
          console.error('❌ Error fetching materials:', error);
          throw error;
        }

        if (!data || data.length === 0) {
          console.log('📊 No materials found in marketplace_products');
          return {
            data: defaultCategoryData,
            rawMaterials: [],
            fromCache: false,
            totalMaterials: 0
          };
        }

        console.log(`✅ Found ${data.length} materials in marketplace_products`);

        // Transform marketplace_products to MaterialItem format
        const materials: MaterialItem[] = data.map((product: any, index: number) => {
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

          // Map to our display category
          const displayCategory = Object.entries(categoryMapping).find(
            ([, id]) => id === marketplaceToCategoryMap[product.category]
          )?.[0] || product.category;

          return {
            id: index + 1,
            name: product.name || 'Unknown Product',
            category: displayCategory,
            price: formatPrice(product.current_price),
            supplier,
            image: product.image_url || '/placeholder.svg',
            productUrl: product.product_url,
            view_product_url: product.product_url,
            highlights: product.highlights || [],
            description: product.description,
            isOnSale: product.is_on_sale || false,
            salePrice: product.is_on_sale ? formatPrice(product.current_price) : undefined,
            stockStatus: product.stock_status || 'In Stock',
            inStock: product.stock_status !== 'Out of Stock'
          };
        });

        const processedData = processMaterialsData(materials);

        return {
          data: processedData,
          rawMaterials: materials,
          fromCache: true,
          totalMaterials: materials.length
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData, // Show previous data while refetching
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