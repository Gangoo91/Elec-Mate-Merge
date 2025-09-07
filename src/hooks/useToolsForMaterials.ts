import { useMemo } from 'react';
import { useOptimizedToolsData } from './useOptimizedToolsData';
import type { StaticToolItem } from '@/data/staticToolsData';

export interface MaterialItem {
  id: number;
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
}

const transformToolsToMaterials = (tools: StaticToolItem[]): MaterialItem[] => {
  return tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    category: tool.category,
    price: tool.price,
    supplier: tool.supplier,
    image: tool.image,
    stockStatus: tool.stockStatus,
    isOnSale: tool.isOnSale,
    salePrice: tool.salePrice,
    highlights: tool.highlights,
    productUrl: tool.productUrl
  }));
};

export const useToolsForMaterials = () => {
  const { 
    tools, 
    isLoading, 
    error, 
    isUsingStaticData, 
    lastUpdated, 
    refreshTools 
  } = useOptimizedToolsData();

  const materialItems = useMemo(() => {
    return transformToolsToMaterials(tools);
  }, [tools]);

  return {
    materials: materialItems,
    isLoading,
    error,
    isUsingStaticData,
    lastUpdated,
    refetch: refreshTools
  };
};