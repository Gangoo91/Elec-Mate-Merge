import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Plus,
  Check,
  Star,
  ShoppingCart,
  Shield,
  Award,
  CheckCircle,
  Package,
} from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface PremiumToolCardProps {
  item: ToolItem;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
  onCardClick?: (item: ToolItem) => void;
  variant?: "default" | "compact";
}

const PremiumToolCard = ({
  item,
  onAddToCompare,
  onRemoveFromCompare,
  isSelected = false,
  isCompareDisabled = false,
  onCardClick,
  variant = "default",
}: PremiumToolCardProps) => {
  const isCompact = variant === "compact";

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!item.isOnSale || !item.salePrice || !item.price) return null;
    const originalPrice = parseFloat(item.price.replace(/[£,]/g, ""));
    const salePrice = parseFloat(item.salePrice.replace(/[£,]/g, ""));
    if (originalPrice > salePrice) {
      return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    }
    return null;
  };

  // Calculate savings amount
  const getSavingsAmount = () => {
    if (!item.isOnSale || !item.salePrice || !item.price) return null;
    const originalPrice = parseFloat(item.price.replace(/[£,]/g, ""));
    const salePrice = parseFloat(item.salePrice.replace(/[£,]/g, ""));
    if (originalPrice > salePrice) {
      return `£${(originalPrice - salePrice).toFixed(2)}`;
    }
    return null;
  };

  // Clean and validate rating/review data
  const getCleanReviewData = () => {
    const reviewText = item.reviews || "";
    const emptyPatterns = [
      /^0\s*out\s*of\s*5\s*stars?\s*total\s*0\s*ratings?/i,
      /^0\s*stars?\s*out\s*of\s*5/i,
      /^no\s*ratings?/i,
      /^0\s*reviews?/i,
      /^\s*0\s*$/,
    ];
    const isEmptyReview = emptyPatterns.some((pattern) =>
      pattern.test(reviewText)
    );
    if (isEmptyReview || !reviewText.trim()) return null;

    const ratingMatch = reviewText.match(
      /(\d+(?:\.\d+)?)\s*(?:stars?\s*)?(?:out\s*of\s*\d+)?\s*\((\d+)\)/i
    );
    if (ratingMatch) {
      return {
        rating: parseFloat(ratingMatch[1]),
        count: parseInt(ratingMatch[2]),
      };
    }

    const countMatch = reviewText.match(/(\d+)\s*reviews?/i);
    if (countMatch) {
      const count = parseInt(countMatch[1]);
      if (count > 0) return { count };
    }
    return null;
  };

  // Get product URL
  const getProductUrl = () => {
    const supplier = (item.supplier || "").toLowerCase();
    const hosts: Record<string, string> = {
      screwfix: "screwfix.com",
      "city electrical factors": "cef.co.uk",
      "city-electrical-factors": "cef.co.uk",
      electricaldirect: "electricaldirect.co.uk",
      toolstation: "toolstation.com",
    };
    const expectedHost = hosts[supplier];

    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect"))
        return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city"))
        return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix"))
        return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation"))
        return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    if (item.productUrl || item.view_product_url) {
      try {
        const url = item.productUrl || item.view_product_url;
        const base = expectedHost ? `https://www.${expectedHost}/` : undefined;
        const fullUrl = base ? new URL(url!, base) : new URL(url!);
        const isHttp = /^https?:$/.test(fullUrl.protocol);
        const hostOk = expectedHost
          ? fullUrl.hostname.endsWith(expectedHost)
          : true;
        if (isHttp && hostOk) return fullUrl.toString();
      } catch {
        // Fall through to search
      }
    }
    return buildSearch(item.name);
  };

  // Normalize image paths
  const imageSrc = (() => {
    const src = item.image;
    if (!src) return "/placeholder.svg";
    let finalSrc = src;
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) {
      finalSrc = `/${src}`;
    }
    if (finalSrc.includes("wid=136") && finalSrc.includes("hei=136")) {
      finalSrc = finalSrc
        .replace(/wid=136/g, "wid=236")
        .replace(/hei=136/g, "hei=236");
    }
    return finalSrc;
  })();

  const discount = getDiscountPercentage();
  const savingsAmount = getSavingsAmount();
  const reviewData = getCleanReviewData();
  const isTestEquipment =
    item.category?.toLowerCase().includes("test") ||
    item.name.toLowerCase().includes("tester") ||
    item.name.toLowerCase().includes("meter");

  return (
    <div
      className="product-card-premium h-full flex flex-col group touch-manipulation active:scale-[0.98]"
      onClick={() => onCardClick?.(item)}
    >
      {/* Image Section */}
      <div
        className={
          isCompact ? "product-image-container-compact" : "product-image-container"
        }
      >
        {/* Supplier Badge */}
        {item.supplier && (
          <div className="supplier-badge">{item.supplier}</div>
        )}

        {/* Sale Ribbon */}
        {discount && discount > 0 && (
          <div className="sale-ribbon">SAVE {discount}%</div>
        )}

        {/* Product Image */}
        <img
          src={imageSrc}
          alt={`${item.name} from ${item.supplier}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        {/* Star Rating */}
        {reviewData && (
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  reviewData.rating && star <= Math.round(reviewData.rating)
                    ? "star-filled"
                    : "star-empty"
                }`}
              />
            ))}
            {reviewData.count && (
              <span className="text-xs text-muted-foreground ml-1">
                ({reviewData.count})
              </span>
            )}
          </div>
        )}

        {/* Product Title */}
        <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        {/* Key Features */}
        {!isCompact && item.highlights && item.highlights.length > 0 && (
          <div className="product-features">
            {item.highlights.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="product-feature">
                <Check className="product-feature-icon" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Block */}
        <div className="price-block border-t border-border/30 pt-3">
          {item.isOnSale && item.salePrice && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="price-original">{item.price}</span>
              {savingsAmount && (
                <span className="price-savings">Save {savingsAmount}</span>
              )}
            </div>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="price-primary">
              {item.salePrice || item.price}
            </span>
            <span className="price-vat">inc. VAT</span>
          </div>
        </div>

        {/* Trust Badges */}
        {!isCompact && (
          <div className="trust-badge-strip">
            {isTestEquipment && (
              <span className="trust-badge trust-badge-success">
                <Shield className="h-3 w-3" />
                BS7671
              </span>
            )}
            {item.brand && (
              <span className="trust-badge trust-badge-primary">
                <Award className="h-3 w-3" />
                {item.brand}
              </span>
            )}
            <span className="trust-badge trust-badge-success">
              <CheckCircle className="h-3 w-3" />
              {item.stockStatus === "Low Stock" ? "Low Stock" : "In Stock"}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            size={isCompact ? "sm" : "default"}
            className="btn-buy-now h-11 touch-manipulation active:scale-[0.98]"
            onClick={(e) => {
              e.stopPropagation();
              window.open(getProductUrl(), "_blank");
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isCompact ? "Buy" : "Buy Now"}
          </Button>
          <Button
            size={isCompact ? "sm" : "default"}
            variant="outline"
            className="btn-compare h-11 w-11 px-0 touch-manipulation active:scale-[0.98]"
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected && onRemoveFromCompare) {
                onRemoveFromCompare(item.id.toString());
              } else if (onAddToCompare) {
                onAddToCompare(item);
              }
            }}
            disabled={isCompareDisabled && !isSelected}
          >
            {isSelected ? (
              <Check className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumToolCard;
