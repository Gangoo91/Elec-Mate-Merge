import { useMemo } from 'react';
import { useToolsData, type ToolItem } from './useToolsData';
import { Wrench, Calculator, FileText, Package, Zap, HardHat, Shield, Settings, ArrowUp } from 'lucide-react';

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
  else if (name.includes('helmet') || name.includes('hard hat') || name.includes('glove') || name.includes('boot') || 
           name.includes('goggle') || name.includes('glasses') || name.includes('mask') || name.includes('respirator') ||
           name.includes('vest') || name.includes('hi-vis') || name.includes('harness') || name.includes('ear') ||
           name.includes('earmuff') || name.includes('earplug') || name.includes('protection') || name.includes('ppe')) {
    return 'PPE';
  }
  
  // Safety Tools (excluding PPE items)
  else if ((name.includes('safety') && !name.includes('helmet') && !name.includes('glove') && !name.includes('boot') && 
            !name.includes('goggle') && !name.includes('vest') && !name.includes('harness')) ||
           name.includes('warning') || name.includes('sign') || name.includes('barrier') ||
           name.includes('lock') || name.includes('tag') || name.includes('isolator') || name.includes('fuse') ||
           name.includes('mat') || name.includes('lockout')) {
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
  
  // Specialist Tools
  else if (name.includes('wire') || name.includes('cable') || name.includes('conduit') || name.includes('specialist') ||
           name.includes('crimper') || name.includes('stripper') || name.includes('puller') || name.includes('fish') ||
           name.includes('knockout') || name.includes('bender')) {
    return 'Specialist Tools';
  }
  
  // Default to Hand Tools
  else {
    return 'Hand Tools';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Hand Tools': return Wrench;
    case 'Power Tools': return Zap;
    case 'Test Equipment': return Calculator;
    case 'PPE': return HardHat;
    case 'Safety Tools': return Shield;
    case 'Access Tools & Equipment': return ArrowUp;
    case 'Tool Storage': return Package;
    case 'Specialist Tools': return Settings;
    default: return Wrench;
  }
};

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'Hand Tools': return 'Essential hand tools for electrical work';
    case 'Power Tools': return 'Power tools and accessories';
    case 'Test Equipment': return 'Testing and measurement equipment';
    case 'PPE': return 'Personal protective equipment';
    case 'Safety Tools': return 'Safety tools and equipment';
    case 'Access Tools & Equipment': return 'Ladders, scaffolding and access equipment';
    case 'Tool Storage': return 'Tool bags, boxes and storage';
    case 'Specialist Tools': return 'Specialist electrical tools';
    default: return 'Essential hand tools for electrical work';
  }
};

const getDefaultCategories = (): ToolCategory[] => [
  { name: 'Hand Tools', icon: Wrench, description: 'Essential hand tools for electrical work', count: 0 },
  { name: 'Power Tools', icon: Zap, description: 'Power tools and accessories', count: 0 },
  { name: 'Test Equipment', icon: Calculator, description: 'Testing and measurement equipment', count: 0 },
  { name: 'PPE', icon: HardHat, description: 'Personal protective equipment', count: 0 },
  { name: 'Safety Tools', icon: Shield, description: 'Safety tools and equipment', count: 0 },
  { name: 'Access Tools & Equipment', icon: ArrowUp, description: 'Ladders, scaffolding and access equipment', count: 0 },
  { name: 'Tool Storage', icon: Package, description: 'Tool bags, boxes and storage', count: 0 },
  { name: 'Specialist Tools', icon: Settings, description: 'Specialist electrical tools', count: 0 }
];

// Map database categories to frontend display categories
const mapDatabaseToFrontendCategory = (dbCategory: string): string => {
  const categoryMappings: Record<string, string> = {
    'Testing Equipment': 'Test Equipment',
    'Test & Measurement': 'Test Equipment',
    'Testers': 'Test Equipment',
    'Safety Equipment': 'PPE',
    'Personal Protective Equipment': 'PPE',
    'PPE': 'PPE',
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
    'Wiring Tools': 'Specialist Tools'
  };
  
  return categoryMappings[dbCategory] || dbCategory;
};

const analyzeCategoryData = (tools: ToolItem[]): ToolCategory[] => {
  const categoryMap = new Map<string, { count: number; prices: number[]; tools: ToolItem[] }>();
  
  // Analyze tools and group by category using both database category and name-based categorization
  tools.forEach(tool => {
    let category: string;
    
    // Special handling for "Safety Tools" database category - split by name
    if (tool.category === 'Safety Tools') {
      category = categorizeToolByName(tool.name || '');
    } else {
      // First try to use the database category, then fall back to name-based categorization
      category = tool.category ? mapDatabaseToFrontendCategory(tool.category) : categorizeToolByName(tool.name || '');
    }
    
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
    const defaultCategories = getDefaultCategories();
    
    if (!tools || tools.length === 0) {
      return defaultCategories;
    }
    
    // Get dynamic categories from tools data
    const dynamicCategories = analyzeCategoryData(tools);
    
    // Merge default categories with dynamic data
    const categoryMap = new Map(dynamicCategories.map(cat => [cat.name, cat]));
    
    return defaultCategories.map(defaultCat => {
      const dynamicCat = categoryMap.get(defaultCat.name);
      return dynamicCat || defaultCat;
    });
  }, [tools]);

  return {
    categories,
    isLoading,
    error,
    refetch
  };
};