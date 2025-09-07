import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { staticToolsData, getAllCategories, type StaticToolItem } from '@/data/staticToolsData';
import type { ToolItem } from './useToolsData';

interface OptimizedToolsReturn {
  tools: StaticToolItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  isUsingStaticData: boolean;
  lastUpdated: Date | null;
  refreshTools: () => Promise<void>;
}

const transformCachedToolToStatic = (tool: any): StaticToolItem => ({
  id: tool.id || Math.floor(Math.random() * 10000),
  name: tool.name || 'Unknown Tool',
  category: tool.category || 'Tools',
  price: tool.price || '£0.00',
  supplier: tool.supplier || 'Supplier',
  image: tool.image || '/placeholder.svg',
  stockStatus: tool.stockStatus || 'In Stock',
  isOnSale: tool.isOnSale || false,
  salePrice: tool.salePrice,
  highlights: tool.highlights || [],
  productUrl: tool.productUrl || tool.view_product_url,
  description: tool.description
});

export const useOptimizedToolsData = (): OptimizedToolsReturn => {
  const [isUsingStaticData, setIsUsingStaticData] = useState(true);
  
  // Fetch cached data with React Query
  const { 
    data: cachedData, 
    isLoading, 
    error: queryError,
    refetch 
  } = useQuery({
    queryKey: ['optimized-tools-data'],
    queryFn: async () => {
      console.log('🔍 Fetching cached tools data...');
      
      const { data, error } = await supabase
        .from('materials_weekly_cache')
        .select('materials_data, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.log('📊 No cached data available, using static data');
        throw new Error('No cached data available');
      }
      
      if (data?.materials_data && Array.isArray(data.materials_data)) {
        console.log(`✅ Found ${data.materials_data.length} cached tools`);
        return {
          tools: data.materials_data.map(transformCachedToolToStatic),
          lastUpdated: new Date(data.created_at)
        };
      }
      
      throw new Error('Invalid cached data format');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Determine which data to use
  const tools = useMemo(() => {
    if (cachedData?.tools && cachedData.tools.length > 0) {
      setIsUsingStaticData(false);
      return cachedData.tools;
    }
    setIsUsingStaticData(true);
    return staticToolsData;
  }, [cachedData]);

  const categories = useMemo(() => {
    if (tools.length > 0) {
      return [...new Set(tools.map(tool => tool.category))].sort();
    }
    return getAllCategories();
  }, [tools]);

  const refreshTools = async () => {
    console.log('🔄 Triggering background tools refresh...');
    try {
      // Trigger background refresh without waiting
      supabase.functions.invoke('tools-weekly-refresh', {
        body: { forceRefresh: true }
      }).then(() => {
        console.log('🔄 Background refresh initiated');
        // Refetch data after a short delay
        setTimeout(() => refetch(), 2000);
      }).catch(err => {
        console.warn('⚠️ Background refresh failed:', err);
      });
    } catch (error) {
      console.warn('⚠️ Could not trigger refresh:', error);
    }
  };

  // Auto-refresh cached data periodically
  useEffect(() => {
    if (!isUsingStaticData) {
      const interval = setInterval(() => {
        refetch();
      }, 10 * 60 * 1000); // Check every 10 minutes
      
      return () => clearInterval(interval);
    }
  }, [isUsingStaticData, refetch]);

  return {
    tools,
    categories,
    isLoading: isLoading && isUsingStaticData, // Only show loading for static data initially
    error: queryError?.message || null,
    isUsingStaticData,
    lastUpdated: cachedData?.lastUpdated || null,
    refreshTools
  };
};