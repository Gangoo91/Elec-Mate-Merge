import { useMemo } from 'react';
import { useToolsData, type ToolItem } from './useToolsData';

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

const transformToolsToMaterials = (tools: ToolItem[]): MaterialItem[] => {
  return tools.map((tool, index) => ({
    id: tool.id || index + 1000,
    name: tool.name,
    category: tool.category || 'Tools',
    price: tool.price,
    supplier: tool.supplier || 'Screwfix',
    image: tool.image || '/placeholder.svg',
    stockStatus: tool.stockStatus || 'In Stock',
    isOnSale: tool.isOnSale,
    salePrice: tool.salePrice,
    highlights: tool.highlights,
    productUrl: tool.productUrl || tool.view_product_url
  }));
};

export const useToolsForMaterials = () => {
  const { data: tools, isLoading, error, refetch } = useToolsData();

  const materialItems = useMemo(() => {
    if (!tools || tools.length === 0) {
      return [];
    }
    return transformToolsToMaterials(tools);
  }, [tools]);

  return {
    materials: materialItems,
    isLoading,
    error,
    refetch
  };
};