
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Check } from "lucide-react";
import { MaterialItem, PriceComparisonItem } from "@/types/materials";

// Export the type for other files to use
export type { PriceComparisonItem } from "@/types/materials";

interface ProductCardProps {
  material?: MaterialItem;
  product?: PriceComparisonItem;
  onAddToQuote?: (material: any, quantity?: number) => void;
  isAddedToQuote?: boolean;
  isCheapest?: boolean;
  savings?: number;
}

export const ProductCard = ({ material, product, onAddToQuote, isAddedToQuote, isCheapest, savings }: ProductCardProps) => {
  // Use either material or product prop
  const item = material || product;
  
  if (!item) {
    return null;
  }

  const handleAddToQuote = () => {
    if (onAddToQuote) {
      onAddToQuote({
        id: item.id,
        name: item.name,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace('£', '')) : item.price,
        supplier: item.supplier,
        description: 'description' in item ? item.description || '' : '',
        category: item.category || 'General'
      });
    }
  };

  const handleViewProduct = () => {
    const url = 'url' in item ? item.url : item.productUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getSupplierBadgeColor = (supplier: string) => {
    const colors: Record<string, string> = {
      'Screwfix': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Toolstation': 'bg-red-500/20 text-red-400 border-red-500/30',
      'CEF': 'bg-green-500/20 text-green-400 border-green-500/30',
      'TLC Electrical': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Electrical Counter': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[supplier] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const stockStatus = 'inStock' in item 
    ? (item.inStock ? 'In Stock' : 'Out of Stock')
    : item.stockStatus;

  return (
    <div className="bg-elec-card border border-elec-yellow/20 rounded-lg p-4 hover:border-elec-yellow/40 transition-colors">
      {/* Header with supplier badge */}
      <div className="flex justify-between items-start mb-3">
        <Badge 
          variant="outline" 
          className={`text-xs ${getSupplierBadgeColor(item.supplier)}`}
        >
          {item.supplier}
        </Badge>
        {stockStatus && (
          <span className={`text-xs px-2 py-1 rounded ${
            stockStatus === 'In Stock' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {stockStatus}
          </span>
        )}
      </div>

      {/* Product image placeholder */}
      <div className="bg-elec-dark/50 rounded-lg h-32 mb-3 flex items-center justify-center">
        <span className="text-elec-yellow/50 text-sm">Product Image</span>
      </div>

      {/* Product details */}
      <div className="space-y-2 mb-4">
        <h3 className="font-medium text-white break-words">{item.name}</h3>
        {'description' in item && item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
        {item.category && (
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        )}
        {isCheapest && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            Best Price
          </Badge>
        )}
      </div>

      {/* Price and actions */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
          {'originalPrice' in item && item.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {item.originalPrice}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {onAddToQuote && (
            <Button
              size="sm"
              onClick={handleAddToQuote}
              disabled={isAddedToQuote}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              {isAddedToQuote ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Quote
                </>
              )}
            </Button>
          )}
          
          {(('url' in item && item.url) || item.productUrl) && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewProduct}
              className="flex-shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
