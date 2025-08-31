import { useMemo } from 'react';
import { useToolsData, type ToolItem } from './useToolsData';
import { Wrench, Calculator, FileText, Package, Zap } from 'lucide-react';

export interface ToolCategory {
  name: string;
  icon: any;
  description: string;
  count: number;
  priceRange?: string;
  trending?: boolean;
}

const categorizeToolByName = (toolName: string): string => {
  const name = toolName.toLowerCase();
  
  if (name.includes('drill') || name.includes('driver') || name.includes('saw') || name.includes('grinder')) {
    return 'Power Tools';
  } else if (name.includes('test') || name.includes('meter') || name.includes('detector') || name.includes('measure')) {
    return 'Test Equipment';
  } else if (name.includes('safety') || name.includes('helmet') || name.includes('glove') || name.includes('ppe')) {
    return 'Safety Equipment';
  } else if (name.includes('bag') || name.includes('box') || name.includes('case') || name.includes('storage')) {
    return 'Tool Storage';
  } else if (name.includes('wire') || name.includes('cable') || name.includes('conduit') || name.includes('specialist')) {
    return 'Specialist Tools';
  } else {
    return 'Hand Tools';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Power Tools': return Zap;
    case 'Test Equipment': return Calculator;
    case 'Safety Equipment': return FileText;
    case 'Tool Storage': return Package;
    case 'Specialist Tools': return Wrench;
    default: return Wrench;
  }
};

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'Power Tools': return 'Power tools and accessories';
    case 'Test Equipment': return 'Testing and measurement equipment';
    case 'Safety Equipment': return 'PPE and safety equipment';
    case 'Tool Storage': return 'Tool bags, boxes and storage';
    case 'Specialist Tools': return 'Specialist electrical tools';
    default: return 'Essential hand tools for electrical work';
  }
};

const getDefaultCategories = (): ToolCategory[] => [
  { name: 'Hand Tools', icon: Wrench, description: 'Essential hand tools for electrical work', count: 0 },
  { name: 'Test Equipment', icon: Calculator, description: 'Testing and measurement equipment', count: 0 },
  { name: 'Power Tools', icon: Zap, description: 'Power tools and accessories', count: 0 },
  { name: 'Safety Equipment', icon: FileText, description: 'PPE and safety equipment', count: 0 },
  { name: 'Specialist Tools', icon: Wrench, description: 'Specialist electrical tools', count: 0 },
  { name: 'Tool Storage', icon: Package, description: 'Tool bags, boxes and storage', count: 0 }
];

const analyzeCategoryData = (tools: ToolItem[]): ToolCategory[] => {
  const categoryMap = new Map<string, { count: number; prices: number[]; tools: ToolItem[] }>();
  
  // Analyze tools and group by category
  tools.forEach(tool => {
    const category = categorizeToolByName(tool.name || '');
    if (!categoryMap.has(category)) {
      categoryMap.set(category, { count: 0, prices: [], tools: [] });
    }
    
    const categoryData = categoryMap.get(category)!;
    categoryData.count++;
    categoryData.tools.push(tool);
    
    // Extract price for range calculation
    const priceMatch = tool.price?.match(/£([\d,]+\.?\d*)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1].replace(',', ''));
      categoryData.prices.push(price);
    }
  });

  // Convert to ToolCategory array
  return Array.from(categoryMap.entries()).map(([name, data]) => {
    const minPrice = data.prices.length > 0 ? Math.min(...data.prices) : 0;
    const maxPrice = data.prices.length > 0 ? Math.max(...data.prices) : 0;
    const priceRange = minPrice > 0 ? `£${minPrice}-£${maxPrice}` : 'Price varies';
    
    return {
      name,
      icon: getCategoryIcon(name),
      description: getCategoryDescription(name),
      count: data.count,
      priceRange,
      trending: data.count > 5 // Mark as trending if more than 5 tools
    };
  }).sort((a, b) => b.count - a.count); // Sort by count descending
};

export const useToolCategories = () => {
  const { data: tools, isLoading, error, refetch } = useToolsData();

  const categories = useMemo(() => {
    if (!tools || tools.length === 0) {
      return getDefaultCategories();
    }
    return analyzeCategoryData(tools);
  }, [tools]);

  return {
    categories,
    isLoading,
    error,
    refetch
  };
};