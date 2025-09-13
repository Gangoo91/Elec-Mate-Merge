import { useMemo } from 'react';

interface MaterialDeal {
  id: string | number;
  name: string;
  category: string;
  price: string;
  salePrice?: string;
  supplier: string;
  image: string;
  discount?: number;
  isOnSale?: boolean;
  stockStatus?: string;
  productUrl?: string;
}

interface DealsData {
  dealOfTheDay: MaterialDeal | null;
  topDiscounts: MaterialDeal[];
  saleItems: MaterialDeal[];
}

export const useMaterialsDeals = (materials: any[]): DealsData => {
  return useMemo(() => {
    if (!materials || materials.length === 0) {
      return {
        dealOfTheDay: null,
        topDiscounts: [],
        saleItems: []
      };
    }

    console.log('🔍 Processing materials for deals detection:', materials.length);
    
    // Enhanced deals detection - check for explicit sales and price variations
    const materialsWithDeals = materials.map(material => {
      let isOnSale = false;
      let salePrice = material.salePrice;
      let discount = 0;

      // Check explicit sale status
      if (material.isOnSale && material.salePrice) {
        isOnSale = true;
      }
      // Enhanced: Look for price patterns suggesting deals
      else if (material.price) {
        const priceStr = material.price.toString();
        // Check for crossed-out prices or "was/now" patterns in description
        if (material.name?.toLowerCase().includes('sale') || 
            material.name?.toLowerCase().includes('clearance') ||
            material.highlights?.some((h: string) => h.toLowerCase().includes('sale')) ||
            priceStr.includes('was') || priceStr.includes('now')) {
          // Extract sale price from name or highlights if available
          const priceMatch = material.name?.match(/£(\d+\.?\d*)/g);
          if (priceMatch && priceMatch.length > 1) {
            salePrice = priceMatch[priceMatch.length - 1]; // Last price is usually sale price
            isOnSale = true;
          }
        }
      }

      // Calculate discount if we have both prices
      if (isOnSale && salePrice && material.price) {
        try {
          const originalPrice = parseFloat(material.price.replace(/[£,]/g, ''));
          const salePriceNum = parseFloat(salePrice.replace(/[£,]/g, ''));
          if (originalPrice > salePriceNum && originalPrice > 0) {
            discount = Math.round(((originalPrice - salePriceNum) / originalPrice) * 100);
          }
        } catch (error) {
          console.warn('Error calculating discount for:', material.name, error);
        }
      }

      return {
        ...material,
        isOnSale,
        salePrice,
        discount
      };
    });

    // Filter items with actual discounts and sales
    const saleItems = materialsWithDeals
      .filter(material => material.isOnSale && material.discount > 0)
      .sort((a, b) => b.discount - a.discount);

    console.log('📊 Found sale items:', saleItems.length, saleItems.slice(0, 3).map(s => ({ name: s.name, discount: s.discount })));

    // Find deal of the day (highest discount)
    const dealOfTheDay = saleItems.length > 0 ? saleItems[0] : null;

    // Get top 5 discounts (excluding deal of the day)
    const topDiscounts = saleItems.slice(1, 6);

    return {
      dealOfTheDay,
      topDiscounts,
      saleItems
    };
  }, [materials]);
};

export default useMaterialsDeals;