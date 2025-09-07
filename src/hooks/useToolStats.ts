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

// Map database categories to frontend display categories (must match useToolCategories)
const mapDatabaseToFrontendCategory = (dbCategory: string): string => {
  const categoryMappings: Record<string, string> = {
    // Handle legacy category names from database
    'Testing Equipment': 'Test Equipment',
    'Test & Measurement': 'Test Equipment',
    'Testers': 'Test Equipment',
    'Safety Equipment': 'PPE',
    'Personal Protective Equipment': 'PPE',
    'Electric Tools': 'Power Tools',
    'Cordless Tools': 'Power Tools', 
    'Battery Tools': 'Power Tools',
    'Manual Tools': 'Hand Tools',
    'Basic Tools': 'Hand Tools',
    'Access Equipment': 'Access Tools & Equipment',
    'Ladders & Steps': 'Access Tools & Equipment',
    'Access': 'Access Tools & Equipment',
    'Storage': 'Tool Storage',
    'Tool Bags': 'Tool Storage',
    'Cases & Bags': 'Tool Storage',
    'Electrical Tools': 'Specialist Tools',
    'Cable Tools': 'Specialist Tools',
    'Wiring Tools': 'Specialist Tools',
    // Legacy categories that need to be mapped to current 8 categories
    'Measuring & Marking': 'Hand Tools',
    'Cutting Tools': 'Hand Tools',
    'Installation Tools': 'Specialist Tools'
  };
  
  return categoryMappings[dbCategory] || dbCategory;
};

const categorizeToolByName = (toolName: string): string => {
  const name = toolName.toLowerCase();
  
  // Power Tools
  if (name.includes('drill') || name.includes('driver') || name.includes('saw') || name.includes('grinder') || 
      name.includes('sander') || name.includes('router') || name.includes('impact') || name.includes('cordless') ||
      name.includes('battery') || name.includes('charger') || name.includes('angle grinder')) {
    return 'Power Tools';
  }
  
  // Test Equipment
  else if (name.includes('test') || name.includes('meter') || name.includes('detector') || name.includes('measure') ||
           name.includes('multimeter') || name.includes('voltage') || name.includes('current') || name.includes('earth') ||
           name.includes('loop') || name.includes('rcd') || name.includes('pat') || name.includes('insulation')) {
    return 'Test Equipment';
  }
  
  // PPE (Personal Protective Equipment)
  else if (name.includes('helmet') || name.includes('glove') || name.includes('boot') || name.includes('goggle') ||
           name.includes('mask') || name.includes('vest') || name.includes('harness') || name.includes('ear') ||
           name.includes('protection') || name.includes('ppe')) {
    return 'PPE';
  }
  
  // Safety Tools
  else if (name.includes('safety') || name.includes('warning') || name.includes('sign') || name.includes('barrier') ||
           name.includes('lock') || name.includes('tag') || name.includes('isolator') || name.includes('fuse')) {
    return 'Safety Tools';
  }
  
  // Access Tools & Equipment
  else if (name.includes('ladder') || name.includes('scaffold') || name.includes('platform') || name.includes('steps') ||
           name.includes('tower') || name.includes('access') || name.includes('height') || name.includes('lift') ||
           name.includes('trestle') || name.includes('hop up')) {
    return 'Access Tools & Equipment';
  }
  
  // Tool Storage
  else if (name.includes('bag') || name.includes('box') || name.includes('case') || name.includes('storage') ||
           name.includes('organiser') || name.includes('pouch') || name.includes('belt') || name.includes('trolley')) {
    return 'Tool Storage';
  }
  
  // Specialist Tools (including legacy cutting and installation tools)
  else if (name.includes('wire') || name.includes('cable') || name.includes('conduit') || name.includes('specialist') ||
           name.includes('crimper') || name.includes('stripper') || name.includes('puller') || name.includes('fish') ||
           name.includes('knockout') || name.includes('bender') || name.includes('cutting') || name.includes('knife') || 
           name.includes('blade') || name.includes('install') || name.includes('mount') || name.includes('bracket')) {
    return 'Specialist Tools';
  }
  
  // Default to Hand Tools
  else {
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
      ? mapDatabaseToFrontendCategory(tool.category)
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