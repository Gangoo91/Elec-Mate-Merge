import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  ExternalLink,
} from "lucide-react";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

interface InlineMaterialCompareSectionProps {
  items: MaterialItem[];
  onRemoveItem: (itemId: string) => void;
  onClearAll: () => void;
}

const InlineMaterialCompareSection = ({
  items,
  onRemoveItem,
  onClearAll,
}: InlineMaterialCompareSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (items.length === 0) return null;

  // Get product URL
  const getProductUrl = (item: MaterialItem) => {
    const supplier = (item.supplier || "").toLowerCase();
    const term = encodeURIComponent(item.name);
    if (supplier.includes("screwfix"))
      return `https://www.screwfix.com/search?search=${term}`;
    if (supplier.includes("toolstation"))
      return `https://www.toolstation.com/search?q=${term}`;
    if (supplier.includes("city") || supplier.includes("cef"))
      return `https://www.cef.co.uk/search?q=${term}`;
    return item.productUrl || "#";
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl
                   bg-gradient-to-r from-primary/10 to-primary/5
                   border border-primary/20 hover:border-primary/40
                   transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white">Compare Materials</h2>
            <p className="text-sm text-muted-foreground">
              {items.length}/4 materials selected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
            className="text-muted-foreground hover:text-white"
          >
            Clear All
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <CompareCard
              key={item.id || item.name}
              item={item}
              onRemove={() => onRemoveItem(String(item.id || item.name))}
              productUrl={getProductUrl(item)}
            />
          ))}

          {/* Add More Placeholder */}
          {items.length < 4 && (
            <div className="flex items-center justify-center min-h-[200px] rounded-xl border-2 border-dashed border-white/20 bg-white/5">
              <div className="text-center p-4">
                <Scale className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Add more materials to compare
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click the + button on any product card
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Compare Card Component
interface CompareCardProps {
  item: MaterialItem;
  onRemove: () => void;
  productUrl: string;
}

const CompareCard = ({ item, onRemove, productUrl }: CompareCardProps) => {
  // Normalize image
  const imageSrc = (() => {
    const src = item.image;
    if (!src) return "/placeholder.svg";
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) return `/${src}`;
    return src;
  })();

  return (
    <div className="relative rounded-xl bg-gradient-to-br from-elec-gray to-elec-card border border-border/50 overflow-hidden">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-destructive/20 hover:border-destructive/50 transition-all"
      >
        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </button>

      {/* Image */}
      <div className="h-32 bg-white flex items-center justify-center p-4">
        <img
          src={imageSrc}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Supplier */}
        <Badge
          variant="outline"
          className="bg-white/5 border-white/10 text-xs"
        >
          {item.supplier || "Unknown"}
        </Badge>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            {item.salePrice || item.price}
          </span>
          {item.isOnSale && item.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {item.price}
            </span>
          )}
        </div>

        {/* Features */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="space-y-1">
            {item.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-green-500 shrink-0" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Buy Button */}
        <Button
          size="sm"
          className="w-full rounded-lg"
          onClick={() => window.open(productUrl, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View at {item.supplier?.split(" ")[0] || "Supplier"}
        </Button>
      </div>
    </div>
  );
};

export default InlineMaterialCompareSection;
