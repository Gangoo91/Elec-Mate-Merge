import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Plus,
  Check,
  ShoppingCart,
  Award,
  Zap,
  Package,
  Shield,
  Cable,
} from "lucide-react";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

interface PremiumMaterialCardProps {
  item: MaterialItem;
  variant?: "default" | "compact";
  onAddToCompare?: (item: MaterialItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const PremiumMaterialCard = ({
  item,
  variant = "default",
  onAddToCompare,
  onRemoveFromCompare,
  isSelected = false,
  isCompareDisabled = false,
}: PremiumMaterialCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Extract cable-specific information
  const getCableInfo = () => {
    const name = (item.name || "").toLowerCase();
    const info: {
      type?: string;
      size?: string;
      length?: string;
      cores?: string;
      voltage?: string;
      standard?: string;
    } = {};

    // Cable type detection
    if (name.includes("twin") && name.includes("earth")) info.type = "Twin & Earth";
    else if (name.includes("swa")) info.type = "SWA Armoured";
    else if (name.includes("flex") || name.includes("flexible")) info.type = "Flexible";
    else if (name.includes("cat6") || name.includes("cat5")) info.type = "Data Cable";
    else if (name.includes("coax")) info.type = "Coaxial";
    else if (name.includes("fire")) info.type = "Fire Resistant";

    // Size detection
    const sizeMatch = name.match(/(\d+(?:\.\d+)?)\s*mm(?:2|²)?/);
    if (sizeMatch) info.size = `${sizeMatch[1]}mm²`;

    // Length detection
    const lengthMatch = name.match(/(\d+)\s*m(?:etre)?(?:s?)?\b/);
    if (lengthMatch) info.length = `${lengthMatch[1]}m`;

    // Core count detection
    const coreMatch = name.match(/(\d+)\s*core/);
    if (coreMatch) info.cores = `${coreMatch[1]} core`;

    // Voltage rating
    if (name.includes("1kv") || name.includes("1000v")) info.voltage = "1kV";
    else if (name.includes("300/500v")) info.voltage = "300/500V";
    else if (name.includes("450/750v")) info.voltage = "450/750V";

    // Standards
    if (name.includes("bs6724") || name.includes("6724")) info.standard = "BS6724";
    else if (name.includes("bs7671") || name.includes("7671")) info.standard = "BS7671";

    return info;
  };

  const cableInfo = getCableInfo();
  const isCable = (item.category || "").toLowerCase().includes("cable") || cableInfo.type;

  // Generate features from highlights or cable info
  const getFeatures = () => {
    const features: string[] = [];

    if (item.highlights && item.highlights.length > 0) {
      features.push(...item.highlights.slice(0, 2));
    } else if (isCable) {
      if (cableInfo.type) features.push(cableInfo.type);
      if (cableInfo.size) features.push(`Size: ${cableInfo.size}`);
      if (cableInfo.cores) features.push(cableInfo.cores);
      if (cableInfo.standard) features.push(`${cableInfo.standard} compliant`);
    } else {
      features.push("High quality electrical component");
      features.push("BS7671 compliant");
    }

    return features.slice(0, 2);
  };

  const features = getFeatures();

  // Generate product URL
  const getProductUrl = () => {
    const supplier = (item.supplier || "").toLowerCase();
    const term = encodeURIComponent(item.name);

    if (item.productUrl) {
      try {
        const url = new URL(item.productUrl);
        if (/^https?:$/.test(url.protocol)) return item.productUrl;
      } catch {
        // Fall through to search URL
      }
    }

    if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
    if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
    if (supplier.includes("city") || supplier.includes("cef")) return `https://www.cef.co.uk/search?q=${term}`;
    if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;

    return "#";
  };

  // Normalize image
  const imageSrc = useMemo(() => {
    if (imageError) return "/placeholder.svg";
    const src = item.image;
    if (!src) return "/placeholder.svg";
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) return `/${src}`;
    return src;
  }, [item.image, imageError]);

  // Calculate discount
  const discount = useMemo(() => {
    if (!item.isOnSale || !item.salePrice) return null;
    const original = parseFloat((item.price || "0").replace(/[£,]/g, ""));
    const sale = parseFloat((item.salePrice || "0").replace(/[£,]/g, ""));
    if (original <= 0) return null;
    return Math.round(((original - sale) / original) * 100);
  }, [item.price, item.salePrice, item.isOnSale]);

  // Compact variant
  if (variant === "compact") {
    return (
      <div className="group relative rounded-xl border border-border/50 bg-gradient-to-br from-elec-gray to-elec-card overflow-hidden touch-manipulation active:scale-[0.98] active:border-primary/40 sm:hover:border-primary/40 transition-all duration-300">
        {/* Sale Badge */}
        {discount && discount > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-0.5">
              -{discount}%
            </Badge>
          </div>
        )}

        {/* Image */}
        <div className="h-24 bg-white flex items-center justify-center p-2">
          <img
            src={imageSrc}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h4 className="text-xs font-semibold text-white line-clamp-2 leading-tight">
            {item.name}
          </h4>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-primary">
              {item.salePrice || item.price}
            </span>
            {item.isOnSale && item.salePrice && (
              <span className="text-xs text-muted-foreground line-through">
                {item.price}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group relative h-full rounded-xl border border-border/50 bg-gradient-to-br from-elec-gray to-elec-card overflow-hidden touch-manipulation active:scale-[0.98] active:border-primary/40 sm:hover:border-primary/40 sm:hover:shadow-xl sm:hover:shadow-primary/10 sm:hover:-translate-y-1 transition-all duration-300">
      {/* Sale Ribbon */}
      {discount && discount > 0 && (
        <div className="absolute top-3 -right-8 z-10 rotate-45">
          <div className="bg-red-500 text-white text-xs font-bold px-8 py-1 shadow-lg">
            {discount}% OFF
          </div>
        </div>
      )}

      {/* Low Stock Badge */}
      {item.stockStatus === "Low Stock" && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-amber-500/90 text-white text-xs font-semibold">
            Low Stock
          </Badge>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-40 sm:h-48 bg-white flex items-center justify-center p-4">
        <img
          src={imageSrc}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Supplier Badge */}
        {item.supplier && (
          <div className="absolute bottom-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/60 text-white text-xs backdrop-blur-sm border-0"
            >
              {item.supplier}
            </Badge>
          </div>
        )}

        {/* Cable Type Badge */}
        {cableInfo.type && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-blue-500/90 text-white text-xs border-0">
              <Cable className="h-3 w-3 mr-1" />
              {cableInfo.type}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        {item.brand && (
          <Badge
            variant="outline"
            className="bg-white/5 border-white/10 text-xs"
          >
            <Award className="h-3 w-3 mr-1" />
            {item.brand}
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-1.5">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Cable Specs */}
        {isCable && (cableInfo.size || cableInfo.voltage) && (
          <div className="flex flex-wrap gap-2">
            {cableInfo.size && (
              <Badge variant="outline" className="bg-white/5 border-white/10 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                {cableInfo.size}
              </Badge>
            )}
            {cableInfo.voltage && (
              <Badge variant="outline" className="bg-white/5 border-white/10 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {cableInfo.voltage}
              </Badge>
            )}
            {cableInfo.length && (
              <Badge variant="outline" className="bg-white/5 border-white/10 text-xs">
                <Package className="h-3 w-3 mr-1" />
                {cableInfo.length}
              </Badge>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {item.salePrice || item.price}
            </span>
            {item.isOnSale && item.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {item.price}
              </span>
            )}
            <span className="text-xs text-muted-foreground">inc. VAT</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(getProductUrl(), "_blank");
              }}
              className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 font-semibold touch-manipulation active:scale-[0.98]"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                if (isSelected && onRemoveFromCompare) {
                  onRemoveFromCompare(String(item.id || item.name));
                } else if (onAddToCompare) {
                  onAddToCompare(item);
                }
              }}
              disabled={isCompareDisabled && !isSelected}
              className="h-11 w-11 px-0 rounded-xl border-white/10 hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              {isSelected ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>BS7671 Compliant</span>
          <span className="text-white/20">|</span>
          <span>UK Supplier</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumMaterialCard;
