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

  // Merge cached and static data - always include static as base
  const tools = useMemo(() => {
    if (cachedData?.tools && cachedData.tools.length > 0) {
      console.log('🔀 Merging cached data with static data...');
      
      // Get categories that exist in cached data
      const cachedCategories = new Set(cachedData.tools.map(tool => tool.category));
      
      // Start with static data for categories not in cache
      const staticToolsForMissingCategories = staticToolsData.filter(
        tool => !cachedCategories.has(tool.category)
      );
      
      // Combine cached tools with static tools for missing categories
      const mergedTools = [...cachedData.tools, ...staticToolsForMissingCategories];
      
      console.log(`✅ Merged data: ${cachedData.tools.length} cached + ${staticToolsForMissingCategories.length} static = ${mergedTools.length} total tools`);
      console.log('📋 Available categories:', [...new Set(mergedTools.map(t => t.category))].sort());
      
      setIsUsingStaticData(false);
      return mergedTools;
    }
    
    console.log('📊 Using static data only');
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
    console.log('🔄 Starting tools data refresh...');
    
    try {
      console.log('📡 Invoking tools-weekly-refresh edge function...');
      
      const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
        body: { forceRefresh: true }
      });
      
      console.log('📥 Edge function response:', { data, error });
      
      if (error) {
        console.error('❌ Edge function error:', error);
        throw new Error(`Edge function failed: ${error.message}`);
      }
      
      if (data && !data.success) {
        console.error('❌ Edge function returned failure:', data);
        throw new Error(data.error || 'Unknown error from edge function');
      }
      
      console.log('✅ Edge function succeeded:', data);
      
      // Wait a moment for the data to be written to the database
      console.log('⏳ Waiting 3 seconds for database update...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Refetch the cached data
      console.log('🔄 Refetching cached data...');
      await refetch();
      
      console.log('✅ Tools refresh completed successfully');
      
    } catch (error) {
      console.error('❌ Tools refresh failed:', error);
      console.error('🔍 Error details:', error);
      throw error; // Re-throw so the UI can handle it
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