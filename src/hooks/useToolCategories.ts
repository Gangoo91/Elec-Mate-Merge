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
      name.includes('battery') || name.includes('charger') || name.includes('angle grinder') ||
      name.includes('nail gun') || name.includes('chisel') || name.includes('electrical box') ||
      name.includes('sds') || name.includes('hammer drill')) {
    return 'Power Tools';
  }
  
  // Test Equipment
  else if (name.includes('test') || name.includes('meter') || name.includes('detector') || name.includes('measure') ||
           name.includes('multimeter') || name.includes('voltage') || name.includes('current') || name.includes('earth') ||
           name.includes('loop') || name.includes('rcd') || name.includes('pat') || name.includes('insulation') ||
           name.includes('electrical tester') || name.includes('clamp') || name.includes('continuity') ||
           name.includes('resistance') || name.includes('digital') || name.includes('true rms') ||
           name.includes('open-jaw') || name.includes('fork meter') || name.includes('circuit tester')) {
    return 'Test Equipment';
  }
  
  // Safety Tools (including PPE and safety equipment)
  else if (name.includes('helmet') || name.includes('glove') || name.includes('boot') || name.includes('goggle') ||
           name.includes('mask') || name.includes('vest') || name.includes('harness') || name.includes('ear') ||
           name.includes('protection') || name.includes('ppe') || name.includes('safety') || 
           name.includes('warning') || name.includes('sign') || name.includes('barrier') ||
           name.includes('lock') || name.includes('tag') || name.includes('isolator') || name.includes('fuse') ||
           name.includes('poster') || name.includes('resuscitation') || name.includes('emergency') ||
           name.includes('danger') || name.includes('maintenance') || name.includes('label')) {
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
           name.includes('organiser') || name.includes('pouch') || name.includes('belt') || name.includes('trolley') ||
           name.includes('fold-out')) {
    return 'Tool Storage';
  }
  
  // Specialist Tools
  else if (name.includes('wire') || name.includes('cable') || name.includes('conduit') || name.includes('specialist') ||
           name.includes('crimper') || name.includes('crimp') || name.includes('stripper') || name.includes('puller') || 
           name.includes('fish') || name.includes('knockout') || name.includes('bender') ||
           name.includes('threading') || name.includes('lamp removal') || name.includes('gu10')) {
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
    case 'Safety Tools': return 'Safety equipment and PPE';
    case 'Access Tools & Equipment': return 'Ladders, scaffolding and access equipment';
    case 'Tool Storage': return 'Tool bags, boxes and storage';
    case 'Specialist Tools': return 'Specialist electrical tools';
    default: return 'Essential electrical tools';
  }
};

const getDefaultCategories = (): ToolCategory[] => [
  { name: 'Hand Tools', icon: Wrench, description: 'Essential hand tools for electrical work', count: 0 },
  { name: 'Power Tools', icon: Zap, description: 'Power tools and accessories', count: 0 },
  { name: 'Test Equipment', icon: Calculator, description: 'Testing and measurement equipment', count: 0 },
  { name: 'Safety Tools', icon: Shield, description: 'Safety equipment and PPE', count: 0 },
  { name: 'Access Tools & Equipment', icon: ArrowUp, description: 'Ladders, scaffolding and access equipment', count: 0 },
  { name: 'Tool Storage', icon: Package, description: 'Tool bags, boxes and storage', count: 0 },
  { name: 'Specialist Tools', icon: Settings, description: 'Specialist electrical tools', count: 0 }
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