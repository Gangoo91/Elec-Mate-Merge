import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolItem } from "@/hooks/useToolsData";
import { ExternalLink, Plus, Check, Star, Package, Shield, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ToolDetailModalProps {
  tool: ToolItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const ToolDetailModal = ({
  tool,
  isOpen,
  onClose,
  onAddToCompare,
  onRemoveFromCompare,
  isSelected = false,
  isCompareDisabled = false
}: ToolDetailModalProps) => {
  if (!tool) return null;

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!tool.isOnSale || !tool.salePrice || !tool.price) return null;
    
    const originalPrice = parseFloat(tool.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(tool.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice > salePrice) {
      return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    }
    return null;
  };

  const discount = getDiscountPercentage();

  // Get product URL
  const getProductUrl = () => {
    const supplier = (tool.supplier || "").toLowerCase();
    const hosts: Record<string, string> = {
      "screwfix": "screwfix.com",
      "city electrical factors": "cef.co.uk",
      "city-electrical-factors": "cef.co.uk",
      "electricaldirect": "electricaldirect.co.uk",
      "toolstation": "toolstation.com",
    };
    const expectedHost = hosts[supplier];

    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    if (tool.productUrl || tool.view_product_url) {
      try {
        const url = tool.productUrl || tool.view_product_url;
        const base = expectedHost ? `https://www.${expectedHost}/` : undefined;
        const fullUrl = base ? new URL(url!, base) : new URL(url!);
        const isHttp = /^https?:$/.test(fullUrl.protocol);
        const hostOk = expectedHost ? fullUrl.hostname.endsWith(expectedHost) : true;
        if (isHttp && hostOk) return fullUrl.toString();
      } catch {
        // ignore and fall back
      }
    }

    return buildSearch(tool.name);
  };

  // Normalise image
  const imageSrc = (() => {
    const src = tool.image;
    if (!src) return "/placeholder.svg";
    
    let finalSrc = src;
    
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) {
      finalSrc = `/${src}`;
    }
    
    if (finalSrc.includes("wid=136") && finalSrc.includes("hei=136")) {
      finalSrc = finalSrc.replace(/wid=136/g, "wid=400").replace(/hei=136/g, "hei=400");
    }
    
    return finalSrc;
  })();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-elec-card border-elec-yellow/20 overflow-hidden pb-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-elec-light pr-8">
            {tool.name}
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            Full product details and specifications
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4 overflow-hidden mb-4">
          <div className="space-y-6">
            {/* Image and basic info */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-background/50">
                  <img
                    src={imageSrc}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
                {discount && (
                  <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                {/* Supplier */}
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-elec-yellow" />
                  <span className="text-sm font-medium text-foreground">Supplier: {tool.supplier}</span>
                </div>

                {/* Category */}
                <div>
                  <Badge variant="outline" className="bg-background/50">
                    {tool.category}
                  </Badge>
                </div>

                {/* Price */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-elec-yellow">
                      {tool.salePrice || tool.price}
                    </span>
                    {tool.isOnSale && tool.salePrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {tool.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">inc. VAT</p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      tool.stockStatus === "In Stock" ? "success" : 
                      tool.stockStatus === "Low Stock" ? "warning" : 
                      "destructive"
                    }
                    className="text-sm px-3 py-1"
                  >
                    {tool.stockStatus || "In Stock"}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => window.open(getProductUrl(), '_blank')}
                    className="flex-1 bg-elec-yellow text-background hover:bg-elec-yellow/90"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on {tool.supplier}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (isSelected && onRemoveFromCompare) {
                        onRemoveFromCompare(tool.id.toString());
                      } else if (onAddToCompare) {
                        onAddToCompare(tool);
                      }
                    }}
                    disabled={isCompareDisabled && !isSelected}
                    className="px-4"
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Compare
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Features */}
            {tool.highlights && tool.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-elec-light flex items-center gap-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  Key Features
                </h3>
                <div className="grid gap-2">
                  {tool.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-elec-light flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Compliance & Standards
              </h3>
              <div className="grid gap-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">BS7671 18th Edition Compliant</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Professional Quality Construction</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Suitable for Commercial Use</span>
                </div>
              </div>
            </div>

            {/* Description if available */}
            {tool.description && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-elec-light">Description</h3>
                <p className="text-sm text-foreground leading-relaxed">{tool.description}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetailModal;
