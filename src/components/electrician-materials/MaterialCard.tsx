
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  isOnSale?: boolean;
  salePrice?: string;
  stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
}

interface MaterialCardProps {
  item: MaterialItem;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ item }) => {
  // Default URLs if not provided in the data
  const getProductUrl = () => {
    if (item.productUrl) return item.productUrl;
    
    // Fallback URLs based on supplier
    switch (item.supplier.toLowerCase()) {
      case "screwfix":
        return "https://www.screwfix.com/search?search=" + encodeURIComponent(item.name);
      case "city electrical factors":
        return "https://www.cef.co.uk/search?q=" + encodeURIComponent(item.name);
      case "electricaldirect":
        return "https://www.electricaldirect.co.uk/search?q=" + encodeURIComponent(item.name);
      case "toolstation":
        return "https://www.toolstation.com/search?q=" + encodeURIComponent(item.name);
      default:
        return "#";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray flex flex-col h-full hover:border-elec-yellow/50 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded">
            {item.category}
          </span>
          {item.stockStatus && (
            <span className={`text-xs px-2 py-1 rounded ${
              item.stockStatus === "In Stock" ? "bg-green-500/20 text-green-500" :
              item.stockStatus === "Low Stock" ? "bg-orange-500/20 text-orange-500" :
              "bg-red-500/20 text-red-500"
            }`}>
              {item.stockStatus}
            </span>
          )}
        </div>
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        <div className="bg-elec-card/50 h-32 rounded-md mb-4 flex items-center justify-center">
          <span className="text-elec-yellow/40">Product Image</span>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Supplier: {item.supplier}</div>
          
          <div className="flex items-baseline gap-2">
            {item.isOnSale ? (
              <>
                <span className="font-bold text-elec-yellow">{item.salePrice}</span>
                <span className="line-through text-muted-foreground text-sm">{item.price}</span>
              </>
            ) : (
              <span className="font-bold text-elec-yellow">{item.price}</span>
            )}
          </div>
          
          <div className="mt-auto">
            <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full flex items-center gap-2">
                View Deal <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
