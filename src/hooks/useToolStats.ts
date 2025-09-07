import { useMemo } from 'react';
import { useToolsData, type ToolItem } from './useToolsData';

export interface ToolStats {
  totalTools: number;
  categories: {
    name: string;
    count: number;
    percentage: number;
  }[];
  priceDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  averagePrice: number;
  suppliers: {
    name: string;
    count: number;
    percentage: number;
  }[];
  trending: {
    name: string;
    count: number;
  }[];
}

const mapDatabaseCategoryToUI = (dbCategory: string): string => {
  switch (dbCategory) {
    case 'Safety Equipment':
      return 'PPE';
    case 'Measuring & Marking':
      return 'Measuring & Marking';
    case 'Power Tools':
      return 'Power Tools';
    case 'Testing Equipment':
      return 'Testing Equipment';
    case 'Hand Tools':
      return 'Hand Tools';
    case 'Cutting Tools':
      return 'Cutting Tools';
    case 'Installation Tools':
      return 'Installation Tools';
    default:
      return dbCategory || 'Hand Tools';
  }
};

const categorizeToolByName = (toolName: string): string => {
  const name = toolName.toLowerCase();
  
  if (name.includes('drill') || name.includes('driver') || name.includes('saw') || name.includes('grinder')) {
    return 'Power Tools';
  } else if (name.includes('test') || name.includes('meter') || name.includes('detector') || name.includes('measure')) {
    return 'Testing Equipment';
  } else if (name.includes('safety') || name.includes('helmet') || name.includes('glove') || name.includes('ppe')) {
    return 'PPE';
  } else if (name.includes('bag') || name.includes('box') || name.includes('case') || name.includes('storage')) {
    return 'Tool Storage';
  } else if (name.includes('wire') || name.includes('cable') || name.includes('conduit') || name.includes('specialist') || name.includes('access') || name.includes('ladder') || name.includes('platform')) {
    return 'Specialist Tools';
  } else if (name.includes('cutting') || name.includes('knife') || name.includes('blade')) {
    return 'Cutting Tools';
  } else if (name.includes('install') || name.includes('mount') || name.includes('bracket')) {
    return 'Installation Tools';
  } else {
    return 'Hand Tools';
  }
};

const calculateToolStats = (tools: ToolItem[]): ToolStats => {
  if (!tools || tools.length === 0) {
    return {
      totalTools: 0,
      categories: [],
      priceDistribution: [],
      averagePrice: 0,
      suppliers: [],
      trending: []
    };
  }

  const totalTools = tools.length;
  
  // Calculate categories
  const categoryMap = new Map<string, number>();
  const supplierMap = new Map<string, number>();
  const prices: number[] = [];
  
  tools.forEach(tool => {
    // Categories - use database category first, fallback to name-based categorization
    const category = tool.category 
      ? mapDatabaseCategoryToUI(tool.category)
      : categorizeToolByName(tool.name || '');
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    
    // Suppliers
    const supplier = tool.supplier || 'Unknown';
    supplierMap.set(supplier, (supplierMap.get(supplier) || 0) + 1);
    
    // Prices
    const priceMatch = tool.price?.match(/£([\d,]+\.?\d*)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1].replace(',', ''));
      prices.push(price);
    }
  });

  // Categories with percentages
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalTools) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Suppliers with percentages
  const suppliers = Array.from(supplierMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalTools) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Price distribution
  const priceRanges = [
    { range: 'Under £25', min: 0, max: 25 },
    { range: '£25-£50', min: 25, max: 50 },
    { range: '£50-£100', min: 50, max: 100 },
    { range: '£100-£250', min: 100, max: 250 },
    { range: 'Over £250', min: 250, max: Infinity }
  ];

  const priceDistribution = priceRanges.map(({ range, min, max }) => {
    const count = prices.filter(price => price >= min && price < max).length;
    return {
      range,
      count,
      percentage: prices.length > 0 ? Math.round((count / prices.length) * 100) : 0
    };
  });

  // Average price
  const averagePrice = prices.length > 0 
    ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
    : 0;

  // Trending categories (top 3 by count)
  const trending = categories.slice(0, 3).map(cat => ({
    name: cat.name,
    count: cat.count
  }));

  return {
    totalTools,
    categories,
    priceDistribution,
    averagePrice,
    suppliers,
    trending
  };
};

export const useToolStats = () => {
  const { data: tools, isLoading, error, refetch } = useToolsData();

  const stats = useMemo(() => {
    return calculateToolStats(tools || []);
  }, [tools]);

  return {
    stats,
    isLoading,
    error,
    refetch
  };
};