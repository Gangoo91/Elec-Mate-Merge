import { useCallback } from 'react';
import { QuoteItem } from '@/types/quote';
import { toast } from "@/hooks/use-toast";

export interface MaterialToQuoteItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
  highlights?: string[];
}

export const useQuoteMaterialIntegration = (
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void
) => {
  const addMaterialToQuote = useCallback((material: MaterialToQuoteItem, quantity: number = 1) => {
    // Extract price from string format (£X.XX)
    const priceMatch = material.price.match(/£?(\d+\.?\d*)/);
    const unitPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;

    if (unitPrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Unable to add item with invalid price to quote.",
        variant: "destructive"
      });
      return;
    }

    const quoteItem: Omit<QuoteItem, 'id' | 'totalPrice'> = {
      description: material.name,
      quantity,
      unit: "each",
      unitPrice,
      category: "materials",
      subcategory: material.category,
      notes: `Supplier: ${material.supplier} | Stock: ${material.stockStatus}${material.productUrl ? ` | URL: ${material.productUrl}` : ''}`
    };

    onAdd(quoteItem);

    toast({
      title: "Added to Quote",
      description: `${material.name} added to quote (£${unitPrice.toFixed(2)} each)`,
    });
  }, [onAdd]);

  const addMultipleMaterialsToQuote = useCallback((materials: MaterialToQuoteItem[]) => {
    let successCount = 0;
    
    materials.forEach(material => {
      const priceMatch = material.price.match(/£?(\d+\.?\d*)/);
      const unitPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;

      if (unitPrice > 0) {
        const quoteItem: Omit<QuoteItem, 'id' | 'totalPrice'> = {
          description: material.name,
          quantity: 1,
          unit: "each",
          unitPrice,
          category: "materials",
          subcategory: material.category,
          notes: `Supplier: ${material.supplier} | Stock: ${material.stockStatus}${material.productUrl ? ` | URL: ${material.productUrl}` : ''}`
        };

        onAdd(quoteItem);
        successCount++;
      }
    });

    if (successCount > 0) {
      toast({
        title: "Materials Added",
        description: `${successCount} materials added to quote`,
      });
    }
  }, [onAdd]);

  return {
    addMaterialToQuote,
    addMultipleMaterialsToQuote
  };
};