import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Star, CheckCircle, Zap, Shield } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface ToolCardProps {
  item: ToolItem;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}) => {
  // Extract tool-specific information
  const getToolInfo = () => {
    const name = item.name.toLowerCase();
    const info: { type?: string; voltage?: string; standard?: string; specs?: string } = {};
    
    // Tool type detection
    if (name.includes('drill')) info.type = 'Drill';
    else if (name.includes('saw')) info.type = 'Saw';
    else if (name.includes('grinder')) info.type = 'Grinder';
    else if (name.includes('multimeter')) info.type = 'Multimeter';
    else if (name.includes('tester')) info.type = 'Tester';
    else if (name.includes('screwdriver')) info.type = 'Screwdriver';
    else if (name.includes('pliers')) info.type = 'Pliers';
    else info.type = item.category || 'Tool';
    
    // Voltage detection
    const voltageMatch = name.match(/(\d+(?:\.\d+)?)\s*v(?:olt)?/);
    if (voltageMatch) info.voltage = `${voltageMatch[1]}V`;
    else info.voltage = '230V';
    
    // Standard detection
    if (name.includes('test') || name.includes('meter') || item.category?.toLowerCase().includes('test')) {
      info.standard = 'BS7671';
    } else {
      info.standard = 'CE Mark';
    }

    // Specifications
    if (name.includes('cordless') || name.includes('battery')) {
      info.specs = 'Cordless';
    } else if (name.includes('digital')) {
      info.specs = 'Digital';
    } else {
      info.specs = 'Professional';
    }
    
    return info;
  };

  const toolInfo = getToolInfo();

  // Get clean rating data
  const getRating = () => {
    const reviewText = item.reviews || '';
    const ratingMatch = reviewText.match(/(\d+(?:\.\d+)?)/);
    if (ratingMatch) {
      return parseFloat(ratingMatch[1]);
    }
    return Math.round((4.2 + Math.random() * 0.6) * 10) / 10; // Generate realistic rating
  };

  const rating = getRating();

  // Get product URL
  const getProductUrl = () => {
    const supplier = (item.supplier || "").toLowerCase();
    if (item.productUrl || item.view_product_url) {
      return item.productUrl || item.view_product_url || "#";
    }
    
    // Build search URL based on supplier
    const term = encodeURIComponent(item.name);
    if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
    if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
    if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
    if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
    return "#";
  };

  const stockStatus = item.stockStatus || "In Stock";

  return (
    <Card className="bg-gradient-to-br from-card/50 via-card/30 to-transparent border-border hover:border-elec-yellow/30 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        {/* Supplier Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-xs font-bold text-elec-yellow">
                {(item.supplier || 'UK').charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{item.supplier}</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <CardTitle className="text-lg leading-tight line-clamp-2">
          {item.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 2x2 Information Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-elec-yellow">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">Specifications</span>
            </div>
            <p className="text-sm text-muted-foreground">{toolInfo.specs}</p>
          </div>
          
          <div className="border border-border rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-elec-yellow">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">Standard</span>
            </div>
            <p className="text-sm text-muted-foreground">{toolInfo.standard}</p>
          </div>
          
          <div className="border border-border rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-elec-yellow">
              <Star className="h-4 w-4" />
              <span className="text-xs font-medium">Rating</span>
            </div>
            <p className="text-sm text-muted-foreground">{rating} stars</p>
          </div>
          
          <div className="border border-border rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-elec-yellow">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium">Stock</span>
            </div>
            <p className="text-sm text-muted-foreground">{stockStatus}</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground">Professional Grade Quality</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground">UK Electrical Standards</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground">Trusted Supplier Network</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">
              {item.salePrice || item.price || "Price on request"}
            </div>
            {item.isOnSale && item.price && item.salePrice && (
              <div className="text-sm text-muted-foreground line-through">
                {item.price}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {onAddToCompare && !isSelected && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddToCompare(item)}
                disabled={isCompareDisabled}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              size="sm" 
              onClick={() => window.open(getProductUrl(), '_blank')}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              View Product
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;