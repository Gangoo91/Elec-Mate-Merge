
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Plus } from "lucide-react";
import { MaterialItem } from "@/data/electrician/productData";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

interface ProductCardProps {
  item: MaterialItem;
  onAddToQuote?: (material: MaterialToQuoteItem, quantity?: number) => void;
}

const ProductCard = ({ item, onAddToQuote }: ProductCardProps) => {
  const handleAddToQuote = () => {
    if (onAddToQuote) {
      const materialToAdd: MaterialToQuoteItem = {
        id: item.id,
        name: item.name,
        price: parseFloat(item.price.replace('£', '')),
        category: item.category,
        supplier: item.supplier,
        description: item.description,
        stock: item.stock
      };
      onAddToQuote(materialToAdd, 1);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-lg text-white flex-1 min-w-0">{item.name}</CardTitle>
          <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs whitespace-nowrap">
            {item.supplier}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-elec-light/80">{item.description}</p>
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-current" />
              <span className="text-xs text-muted-foreground">{item.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-green-400">{item.stock}</span>
          </div>
          
          <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="border-elec-yellow/30 flex-1 min-w-0"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          
          {onAddToQuote && (
            <Button 
              size="sm" 
              onClick={handleAddToQuote}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1 min-w-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Quote
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
