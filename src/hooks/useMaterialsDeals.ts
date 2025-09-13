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

    // Filter sale items and calculate discounts
    const saleItems = materials
      .filter(material => material.isOnSale && material.salePrice)
      .map(material => {
        const originalPrice = parseFloat(material.price.replace(/[£,]/g, ''));
        const salePrice = parseFloat(material.salePrice.replace(/[£,]/g, ''));
        const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
        
        return {
          ...material,
          discount
        };
      })
      .filter(material => material.discount > 0)
      .sort((a, b) => b.discount - a.discount);

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