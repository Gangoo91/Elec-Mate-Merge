import { useMemo } from 'react';
import { type ToolItem } from './useToolsData';

const SALE_KEYWORDS = [
  'sale', 'clearance', 'reduced', 'discount', 'special', 'offer', 'deal',
  'promotion', 'bargain', 'value', 'save', 'promo'
];

const SUPPLIER_SALE_PATTERNS = {
  'screwfix': (name: string, price: string) => 
    name.toLowerCase().includes('value') || price.includes('.99') || price.includes('.95'),
  'toolstation': (name: string, price: string) => 
    name.toLowerCase().includes('professional') || price.includes('.49'),
  'city-electrical-factors': (name: string) => 
    name.toLowerCase().includes('trade') || name.toLowerCase().includes('bulk'),
  'electricaldirect': (name: string) => 
    name.toLowerCase().includes('electric') || name.toLowerCase().includes('cable')
};

const detectSaleFromName = (name: string): boolean => {
  const lowerName = name.toLowerCase();
  return SALE_KEYWORDS.some(keyword => lowerName.includes(keyword));
};

const detectSaleFromPrice = (price: string): boolean => {
  const cleanPrice = price.replace(/[£$€,]/g, '');
  const numPrice = parseFloat(cleanPrice);
  
  if (isNaN(numPrice)) return false;
  
  // Items ending in .99, .95, .49 are often sale prices
  const decimal = numPrice % 1;
  return decimal === 0.99 || decimal === 0.95 || decimal === 0.49;
};

const detectSaleFromSupplier = (tool: ToolItem): boolean => {
  const supplier = tool.supplier?.toLowerCase() || '';
  const pattern = SUPPLIER_SALE_PATTERNS[supplier as keyof typeof SUPPLIER_SALE_PATTERNS];
  
  if (pattern && typeof pattern === 'function') {
    return pattern(tool.name, tool.price);
  }
  
  return false;
};

const generateSalePrice = (originalPrice: string, toolName: string): string => {
  const cleanPrice = originalPrice.replace(/[£$€,]/g, '');
  const numPrice = parseFloat(cleanPrice);
  
  if (isNaN(numPrice)) return originalPrice;
  
  // Use deterministic discount based on tool name for consistency
  const nameHash = toolName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const discountPercent = 10 + (nameHash % 21); // 10-30% discount, but consistent per tool
  const salePrice = numPrice * (1 - discountPercent / 100);
  
  // Round to realistic pricing (e.g., £19.99, £24.95, etc.)
  let roundedPrice;
  if (salePrice < 10) {
    roundedPrice = Math.floor(salePrice * 100) / 100; // Keep exact for low prices
  } else if (salePrice < 50) {
    roundedPrice = Math.floor(salePrice) + 0.99; // End in .99
  } else if (salePrice < 100) {
    roundedPrice = Math.floor(salePrice) + 0.95; // End in .95
  } else {
    roundedPrice = Math.floor(salePrice / 5) * 5 + 0.99; // Round to nearest £5 + .99
  }
  
  // Format and add currency symbol
  const currency = originalPrice.charAt(0);
  return `${currency}${roundedPrice.toFixed(2)}`;
};

const shouldMarkAsOnSale = (tool: ToolItem, index: number): boolean => {
  // First check if item has obvious sale indicators
  if (detectSaleFromName(tool.name) || 
      detectSaleFromPrice(tool.price) || 
      detectSaleFromSupplier(tool)) {
    return true;
  }
  
  // For demonstration, randomly mark some items as on sale
  // Use deterministic randomness based on tool properties
  const seed = (tool.name.length + tool.price.length + index) % 100;
  return seed < 25; // ~25% of tools will be on sale
};

export const useToolsDeals = (tools: ToolItem[]) => {
  const enhancedTools = useMemo(() => {
    if (!tools || tools.length === 0) {
      console.log('🔧 No tools data for deals processing');
      return [];
    }

    const processedTools = tools.map((tool, index) => {
      const isOnSale = shouldMarkAsOnSale(tool, index);
      
      let enhancedTool = { ...tool };
      
      if (isOnSale) {
        enhancedTool.isOnSale = true;
        enhancedTool.salePrice = generateSalePrice(tool.price, tool.name);
        
        console.log(`🏷️ Tool on sale: ${tool.name} - ${tool.price} → ${enhancedTool.salePrice}`);
      } else {
        enhancedTool.isOnSale = false;
        enhancedTool.salePrice = undefined;
      }
      
      return enhancedTool;
    });

    const dealsCount = processedTools.filter(tool => tool.isOnSale).length;
    console.log(`🎯 Tools deals processing complete: ${dealsCount}/${processedTools.length} tools on sale`);
    
    return processedTools;
  }, [tools]);

  const deals = useMemo(() => {
    return enhancedTools.filter(tool => tool.isOnSale && tool.salePrice);
  }, [enhancedTools]);

  const dealOfTheDay = useMemo(() => {
    if (deals.length === 0) return null;
    
    // Find the best deal (highest percentage savings)
    let bestDeal = deals[0];
    let bestSavings = 0;
    
    deals.forEach(deal => {
      const originalPrice = parseFloat(deal.price.replace(/[£$€,]/g, ''));
      const salePrice = parseFloat(deal.salePrice!.replace(/[£$€,]/g, ''));
      
      if (!isNaN(originalPrice) && !isNaN(salePrice)) {
        const savings = ((originalPrice - salePrice) / originalPrice) * 100;
        if (savings > bestSavings) {
          bestSavings = savings;
          bestDeal = deal;
        }
      }
    });
    
    console.log(`👑 Deal of the Day: ${bestDeal.name} with ${bestSavings.toFixed(1)}% savings`);
    return bestDeal;
  }, [deals]);

  const topDiscounts = useMemo(() => {
    return deals
      .map(deal => {
        const originalPrice = parseFloat(deal.price.replace(/[£$€,]/g, ''));
        const salePrice = parseFloat(deal.salePrice!.replace(/[£$€,]/g, ''));
        const savings = !isNaN(originalPrice) && !isNaN(salePrice) 
          ? ((originalPrice - salePrice) / originalPrice) * 100 
          : 0;
        return { ...deal, savingsPercent: savings };
      })
      .sort((a, b) => b.savingsPercent - a.savingsPercent)
      .slice(0, 5);
  }, [deals]);

  return {
    tools: enhancedTools,
    deals,
    dealOfTheDay,
    topDiscounts,
    dealsCount: deals.length
  };
};