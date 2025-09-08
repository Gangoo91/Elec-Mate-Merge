import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MaterialItem {
  id: string | number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
  description?: string;
}

export const useMaterialsFromCache = (category?: string) => {
  return useQuery({
    queryKey: ['materials-cache', category],
    queryFn: async () => {
      console.log('Fetching materials from cache for category:', category);
      
      // Fetch from materials_weekly_cache
      const { data: cacheData, error } = await supabase
        .from('materials_weekly_cache')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !cacheData) {
        console.log('No materials cache found, returning empty array');
        return [];
      }

      const materials = Array.isArray(cacheData.materials_data) ? cacheData.materials_data as unknown as MaterialItem[] : [];
      
      // Filter by category if specified
      if (category && category !== 'all') {
        const filtered = materials.filter((material: MaterialItem) => 
          material.category.toLowerCase() === category.toLowerCase()
        );
        console.log(`Filtered ${filtered.length} materials for category ${category}`);
        return filtered;
      }
      
      console.log(`Returning ${materials.length} total materials`);
      return materials;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// Keep the old hook for backward compatibility
export const useToolsForMaterials = () => {
  const { data: materials, isLoading, error, refetch } = useMaterialsFromCache();

  return {
    materials: materials || [],
    isLoading,
    error,
    refetch
  };
};