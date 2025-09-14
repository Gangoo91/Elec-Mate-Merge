import { useMemo } from 'react';
import { type ToolItem } from './useToolsData';

// Similarity threshold for product matching (0-1, higher = more similar)
const SIMILARITY_THRESHOLD = 0.6;

interface ProductGroup {
  tools: ToolItem[];
  lowestPrice: number;
  lowestPriceSupplier: string;
  lowestPriceTool: ToolItem;
  savings: number;
}

// Calculate string similarity using Jaccard index
const calculateSimilarity = (str1: string, str2: string): number => {
  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const words1 = new Set(normalize(str1).split(/\s+/));
  const words2 = new Set(normalize(str2).split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
};

// Extract key product identifiers for better matching
const extractProductKey = (tool: ToolItem): string => {
  const name = tool.name.toLowerCase();
  // Remove common supplier-specific words and focus on product type
  return name
    .replace(/\b(screwfix|toolstation|city electrical|electricaldirect)\b/g, '')
    .replace(/\b(professional|trade|value|basic|premium)\b/g, '')
    .replace(/[^\w\s]/g, '')
    .trim();
};

// Group similar products from different suppliers
const groupSimilarProducts = (tools: ToolItem[]): ProductGroup[] => {
  const groups: ProductGroup[] = [];
  const processed = new Set<number>();

  tools.forEach((tool, index) => {
    if (processed.has(index)) return;

    const currentGroup: ToolItem[] = [tool];
    processed.add(index);

    // Find similar products from other suppliers
    tools.forEach((otherTool, otherIndex) => {
      if (processed.has(otherIndex) || 
          otherTool.supplier === tool.supplier ||
          !otherTool.supplier ||
          !tool.supplier) return;

      const similarity = calculateSimilarity(
        extractProductKey(tool),
        extractProductKey(otherTool)
      );

      if (similarity >= SIMILARITY_THRESHOLD) {
        currentGroup.push(otherTool);
        processed.add(otherIndex);
      }
    });

    // Only create groups with multiple suppliers
    if (currentGroup.length > 1) {
      const prices = currentGroup.map(t => {
        const cleanPrice = t.price.replace(/[£$€,]/g, '');
        return parseFloat(cleanPrice);
      }).filter(p => !isNaN(p));

      if (prices.length > 1) {
        const lowestPrice = Math.min(...prices);
        const highestPrice = Math.max(...prices);
        const lowestPriceTool = currentGroup.find(t => {
          const price = parseFloat(t.price.replace(/[£$€,]/g, ''));
          return price === lowestPrice;
        })!;

        groups.push({
          tools: currentGroup,
          lowestPrice,
          lowestPriceSupplier: lowestPriceTool.supplier || '',
          lowestPriceTool,
          savings: highestPrice - lowestPrice
        });
      }
    }
  });

  return groups;
};

// Parse price string to number
const parsePrice = (priceStr: string): number => {
  const cleanPrice = priceStr.replace(/[£$€,]/g, '');
  return parseFloat(cleanPrice);
};

export const useToolsDeals = (tools: ToolItem[]) => {
  const enhancedTools = useMemo(() => {
    if (!tools || tools.length === 0) {
      console.log('🔧 No tools data for deals processing');
      return [];
    }

    console.log(`🔧 Processing ${tools.length} tools for price comparison...`);
    
    // Group similar products across suppliers
    const productGroups = groupSimilarProducts(tools);
    console.log(`📊 Found ${productGroups.length} product groups for comparison`);
    
    // Create a map to track which tools are best prices
    const bestPriceToolIds = new Set<string>();
    const toolSavingsMap = new Map<string, { originalPrice: string; savings: number; competitorCount: number }>();
    
    productGroups.forEach(group => {
      // Mark the lowest price tool as a deal
      const bestToolKey = `${group.lowestPriceTool.name}-${group.lowestPriceTool.supplier}`;
      bestPriceToolIds.add(bestToolKey);
      
      // Find the highest price in the group for savings calculation
      const prices = group.tools.map(t => parsePrice(t.price)).filter(p => !isNaN(p));
      const highestPrice = Math.max(...prices);
      const originalPriceStr = group.tools.find(t => parsePrice(t.price) === highestPrice)?.price || group.lowestPriceTool.price;
      
      toolSavingsMap.set(bestToolKey, {
        originalPrice: originalPriceStr,
        savings: group.savings,
        competitorCount: group.tools.length - 1
      });
      
      console.log(`💰 Best price: ${group.lowestPriceTool.name} at ${group.lowestPriceSupplier} - £${group.lowestPrice.toFixed(2)} (saves £${group.savings.toFixed(2)} vs ${group.tools.length - 1} competitors)`);
    });

    // Process all tools and mark best prices as deals
    const processedTools = tools.map((tool) => {
      const toolKey = `${tool.name}-${tool.supplier}`;
      const savingsData = toolSavingsMap.get(toolKey);
      const isBestPrice = bestPriceToolIds.has(toolKey);
      
      let enhancedTool = { ...tool };
      
      if (isBestPrice && savingsData && savingsData.savings > 0.50) { // Only show deals with meaningful savings (>50p)
        enhancedTool.isOnSale = true;
        enhancedTool.salePrice = tool.price; // The current price IS the best price
        enhancedTool.originalPrice = savingsData.originalPrice; // Store the higher competitor price
        enhancedTool.competitorCount = savingsData.competitorCount;
      } else {
        enhancedTool.isOnSale = false;
        enhancedTool.salePrice = undefined;
      }
      
      return enhancedTool;
    });

    const dealsCount = processedTools.filter(tool => tool.isOnSale).length;
    console.log(`🎯 Price comparison complete: ${dealsCount}/${processedTools.length} tools are best prices`);
    
    return processedTools;
  }, [tools]);

  const deals = useMemo(() => {
    return enhancedTools.filter(tool => tool.isOnSale);
  }, [enhancedTools]);

  const dealOfTheDay = useMemo(() => {
    if (deals.length === 0) return null;
    
    // Find the deal with the highest absolute savings
    let bestDeal = deals[0];
    let bestSavings = 0;
    
    deals.forEach(deal => {
      if (deal.originalPrice) {
        const originalPrice = parsePrice(deal.originalPrice);
        const currentPrice = parsePrice(deal.price);
        const savings = originalPrice - currentPrice;
        
        if (savings > bestSavings) {
          bestSavings = savings;
          bestDeal = deal;
        }
      }
    });
    
    console.log(`👑 Deal of the Day: ${bestDeal.name} at ${bestDeal.supplier} - saves £${bestSavings.toFixed(2)}`);
    return bestDeal;
  }, [deals]);

  const topDiscounts = useMemo(() => {
    return deals
      .map(deal => {
        if (!deal.originalPrice) return { ...deal, savingsPercent: 0, savingsAmount: 0 };
        
        const originalPrice = parsePrice(deal.originalPrice);
        const currentPrice = parsePrice(deal.price);
        const savingsAmount = originalPrice - currentPrice;
        const savingsPercent = (savingsAmount / originalPrice) * 100;
        
        return { 
          ...deal, 
          savingsPercent: isNaN(savingsPercent) ? 0 : savingsPercent,
          savingsAmount: isNaN(savingsAmount) ? 0 : savingsAmount
        };
      })
      .sort((a, b) => b.savingsAmount - a.savingsAmount) // Sort by absolute savings amount
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